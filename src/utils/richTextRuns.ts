import { NotebookTextBox, NotebookTextRun, NotebookTextStyle } from '../types/notebook';

export interface ResolvedTextStyle {
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

export const ZERO_WIDTH_SPACE = '\u200B';

export function normalizeColorString(color: string | undefined, fallback: string): string {
  if (!color || typeof color !== 'string') return fallback;
  const trimmed = color.trim();
  if (!trimmed) return fallback;
  const rgbMatch = trimmed.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
    return `#${toHex(Number(rgbMatch[1]))}${toHex(Number(rgbMatch[2]))}${toHex(Number(rgbMatch[3]))}`.toLowerCase();
  }
  return trimmed.toLowerCase();
}

export function getBoxBaseStyle(box: NotebookTextBox): ResolvedTextStyle {
  return {
    color: normalizeColorString(box.color, '#0f172a'),
    bold: Boolean(box.bold),
    italic: Boolean(box.italic),
    underline: Boolean(box.underline),
    strikethrough: Boolean(box.strikethrough),
  };
}

export function resolveRunStyle(
  run: Partial<NotebookTextStyle>,
  base: ResolvedTextStyle
): ResolvedTextStyle {
  return {
    color: normalizeColorString(run.color, base.color),
    bold: run.bold !== undefined ? Boolean(run.bold) : base.bold,
    italic: run.italic !== undefined ? Boolean(run.italic) : base.italic,
    underline: run.underline !== undefined ? Boolean(run.underline) : base.underline,
    strikethrough:
      run.strikethrough !== undefined ? Boolean(run.strikethrough) : base.strikethrough,
  };
}

export function stylesEqual(a: ResolvedTextStyle, b: ResolvedTextStyle): boolean {
  return (
    normalizeColorString(a.color, '#0f172a') === normalizeColorString(b.color, '#0f172a') &&
    a.bold === b.bold &&
    a.italic === b.italic &&
    a.underline === b.underline &&
    a.strikethrough === b.strikethrough
  );
}

export function mergeAdjacentRuns(
  runs: NotebookTextRun[],
  base: ResolvedTextStyle
): NotebookTextRun[] {
  const merged: NotebookTextRun[] = [];
  for (const run of runs) {
    const cleanText = (run.text || '').replace(/\u200B/g, '');
    if (!cleanText) continue;
    const style = resolveRunStyle(run, base);
    const prev = merged[merged.length - 1];
    if (prev && stylesEqual(resolveRunStyle(prev, base), style)) {
      prev.text += cleanText;
    } else {
      merged.push({
        text: cleanText,
        color: style.color,
        bold: style.bold,
        italic: style.italic,
        underline: style.underline,
        strikethrough: style.strikethrough,
      });
    }
  }
  return merged;
}

export function getEffectiveRuns(box: NotebookTextBox): NotebookTextRun[] {
  const base = getBoxBaseStyle(box);
  if (Array.isArray(box.runs) && box.runs.length > 0) {
    const merged = mergeAdjacentRuns(box.runs, base);
    if (merged.length > 0) return merged;
  }
  const plain = (box.text || '').replace(/\u200B/g, '');
  if (!plain) return [];
  return [{ text: plain, ...base }];
}

export function serializeRunsSignature(runs: NotebookTextRun[], base: ResolvedTextStyle): string {
  const merged = mergeAdjacentRuns(runs, base);
  return JSON.stringify(merged);
}

export function applyStyleToRange(
  runs: NotebookTextRun[],
  startOffset: number,
  endOffset: number,
  patch: Partial<ResolvedTextStyle>,
  base: ResolvedTextStyle
): NotebookTextRun[] {
  const merged = mergeAdjacentRuns(runs, base);
  const lo = Math.max(0, Math.min(startOffset, endOffset));
  const hi = Math.max(lo, Math.max(startOffset, endOffset));
  if (lo === hi) return merged;

  const out: NotebookTextRun[] = [];
  let cursor = 0;

  for (const run of merged) {
    const len = run.text.length;
    const runStart = cursor;
    const runEnd = cursor + len;
    cursor = runEnd;

    if (runEnd <= lo || runStart >= hi) {
      out.push(run);
      continue;
    }

    const beforeLen = Math.max(0, lo - runStart);
    const afterStart = Math.min(len, hi - runStart);
    const runStyle = resolveRunStyle(run, base);
    const updatedStyle: ResolvedTextStyle = {
      color: patch.color !== undefined ? normalizeColorString(patch.color, runStyle.color) : runStyle.color,
      bold: patch.bold !== undefined ? patch.bold : runStyle.bold,
      italic: patch.italic !== undefined ? patch.italic : runStyle.italic,
      underline: patch.underline !== undefined ? patch.underline : runStyle.underline,
      strikethrough:
        patch.strikethrough !== undefined ? patch.strikethrough : runStyle.strikethrough,
    };

    if (beforeLen > 0) {
      out.push({ text: run.text.slice(0, beforeLen), ...runStyle });
    }
    const mid = run.text.slice(beforeLen, afterStart);
    if (mid.length > 0) {
      out.push({ text: mid, ...updatedStyle });
    }
    if (afterStart < len) {
      out.push({ text: run.text.slice(afterStart), ...runStyle });
    }
  }

  return mergeAdjacentRuns(out, base);
}

export function getStyleAtOffset(
  runs: NotebookTextRun[],
  offset: number,
  base: ResolvedTextStyle
): ResolvedTextStyle {
  const merged = mergeAdjacentRuns(runs, base);
  if (merged.length === 0) return { ...base };

  let cursor = 0;
  for (let i = 0; i < merged.length; i++) {
    const run = merged[i];
    const nextCursor = cursor + run.text.length;
    // Prefer style of character immediately preceding caret when offset > 0
    if (offset > 0 && offset <= nextCursor) {
      return resolveRunStyle(run, base);
    }
    if (offset === 0 && i === 0) {
      return resolveRunStyle(run, base);
    }
    cursor = nextCursor;
  }
  return resolveRunStyle(merged[merged.length - 1], base);
}

export function buildTextDecorationCss(style: {
  underline?: boolean;
  strikethrough?: boolean;
}): string {
  const parts: string[] = [];
  if (style.underline) parts.push('underline');
  if (style.strikethrough) parts.push('line-through');
  return parts.length > 0 ? parts.join(' ') : 'none';
}

export function renderRunsIntoElement(
  container: HTMLElement,
  runs: NotebookTextRun[],
  base: ResolvedTextStyle,
  caretAnchor?: { offset: number; style: ResolvedTextStyle }
): void {
  container.innerHTML = '';
  const merged = mergeAdjacentRuns(runs, base);

  const createStyledSpan = (text: string, style: ResolvedTextStyle): HTMLSpanElement => {
    const span = document.createElement('span');
    span.style.color = style.color;
    span.style.fontWeight = style.bold ? '700' : '500';
    span.style.fontStyle = style.italic ? 'italic' : 'normal';
    span.style.textDecorationLine = buildTextDecorationCss(style);
    span.textContent = text;
    return span;
  };

  if (caretAnchor) {
    let cursor = 0;
    let anchorInserted = false;
    let anchorSpan: HTMLSpanElement | null = null;

    for (const run of merged) {
      const style = resolveRunStyle(run, base);
      const len = run.text.length;
      if (!anchorInserted && caretAnchor.offset >= cursor && caretAnchor.offset <= cursor + len) {
        const splitAt = caretAnchor.offset - cursor;
        const left = run.text.slice(0, splitAt);
        const right = run.text.slice(splitAt);
        if (left) container.appendChild(createStyledSpan(left, style));
        anchorSpan = createStyledSpan(ZERO_WIDTH_SPACE, caretAnchor.style);
        anchorSpan.setAttribute('data-typing-anchor', '1');
        container.appendChild(anchorSpan);
        if (right) container.appendChild(createStyledSpan(right, style));
        anchorInserted = true;
      } else {
        container.appendChild(createStyledSpan(run.text, style));
      }
      cursor += len;
    }

    if (!anchorInserted) {
      anchorSpan = createStyledSpan(ZERO_WIDTH_SPACE, caretAnchor.style);
      anchorSpan.setAttribute('data-typing-anchor', '1');
      container.appendChild(anchorSpan);
    }

    const fullText = merged.map((r) => r.text).join('');
    if (fullText.endsWith('\n')) {
      container.appendChild(document.createElement('br'));
    }

    if (anchorSpan && anchorSpan.firstChild) {
      const sel = window.getSelection();
      if (sel) {
        const range = document.createRange();
        range.setStart(anchorSpan.firstChild, 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
    return;
  }

  for (const run of merged) {
    const style = resolveRunStyle(run, base);
    container.appendChild(createStyledSpan(run.text, style));
  }

  const fullText = merged.map((r) => r.text).join('');
  if (fullText.endsWith('\n')) {
    container.appendChild(document.createElement('br'));
  }
}

export function extractRunsFromElement(
  container: HTMLElement,
  base: ResolvedTextStyle
): { text: string; runs: NotebookTextRun[] } {
  const rawRuns: NotebookTextRun[] = [];

  const readElementStyle = (el: HTMLElement, inherited: ResolvedTextStyle): ResolvedTextStyle => {
    const tag = el.tagName.toLowerCase();
    const s = el.style;
    let color = inherited.color;
    if (s?.color) {
      color = normalizeColorString(s.color, color);
    } else if (el.getAttribute('color')) {
      color = normalizeColorString(el.getAttribute('color') || '', color);
    }

    let bold = inherited.bold;
    if (tag === 'b' || tag === 'strong') bold = true;
    if (s?.fontWeight) {
      const fw = s.fontWeight.toLowerCase();
      if (fw === 'bold' || parseInt(fw, 10) >= 600) bold = true;
      else if (fw === 'normal' || (parseInt(fw, 10) > 0 && parseInt(fw, 10) < 600)) bold = false;
    }

    let italic = inherited.italic;
    if (tag === 'i' || tag === 'em') italic = true;
    if (s?.fontStyle) {
      if (s.fontStyle.toLowerCase() === 'italic') italic = true;
      else if (s.fontStyle.toLowerCase() === 'normal') italic = false;
    }

    let underline = inherited.underline;
    let strikethrough = inherited.strikethrough;
    if (tag === 'u') underline = true;
    if (tag === 's' || tag === 'strike' || tag === 'del') strikethrough = true;

    const deco = (s?.textDecorationLine || s?.textDecoration || '').toLowerCase();
    if (deco) {
      if (deco === 'none') {
        underline = false;
        strikethrough = false;
      } else {
        underline = deco.includes('underline');
        strikethrough = deco.includes('line-through');
      }
    }

    return { color, bold, italic, underline, strikethrough };
  };

  const pushText = (txt: string, style: ResolvedTextStyle) => {
    const clean = txt.replace(/\u200B/g, '');
    if (!clean) return;
    rawRuns.push({
      text: clean,
      color: style.color,
      bold: style.bold,
      italic: style.italic,
      underline: style.underline,
      strikethrough: style.strikethrough,
    });
  };

  const walk = (node: Node, currentStyle: ResolvedTextStyle, isRootChild: boolean, indexInParent: number) => {
    if (node.nodeType === Node.TEXT_NODE) {
      pushText(node.textContent || '', currentStyle);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    if (tag === 'br') {
      // Ignore trailing sentinel <br> when container ends with newline + sentinel
      const isTrailingBr =
        el.parentElement === container &&
        el === container.lastElementChild &&
        rawRuns.length > 0 &&
        rawRuns[rawRuns.length - 1].text.endsWith('\n');
      if (!isTrailingBr) {
        pushText('\n', currentStyle);
      }
      return;
    }

    const nextStyle = readElementStyle(el, currentStyle);
    const isBlock = tag === 'div' || tag === 'p';
    if (isBlock && isRootChild && indexInParent > 0) {
      // Block elements created by browser Enter key separate lines
      const last = rawRuns[rawRuns.length - 1];
      if (!last || !last.text.endsWith('\n')) {
        pushText('\n', currentStyle);
      }
    }

    const childNodes = Array.from(el.childNodes);
    childNodes.forEach((child, idx) => walk(child, nextStyle, false, idx));
  };

  Array.from(container.childNodes).forEach((child, idx) => walk(child, base, true, idx));

  const merged = mergeAdjacentRuns(rawRuns, base);
  const text = merged.map((r) => r.text).join('');
  return { text, runs: merged };
}

export function getSelectionOffsetsInElement(
  container: HTMLElement
): { start: number; end: number; hasSelection: boolean } | null {
  if (typeof window === 'undefined') return null;
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0);
  if (!container.contains(range.startContainer) || !container.contains(range.endContainer)) {
    return null;
  }

  const measureOffsetTo = (targetNode: Node, targetOffset: number): number => {
    let count = 0;
    let found = false;

    const visit = (node: Node) => {
      if (found) return;
      if (node === targetNode) {
        if (node.nodeType === Node.TEXT_NODE) {
          const slice = (node.textContent || '').slice(0, targetOffset).replace(/\u200B/g, '');
          count += slice.length;
          found = true;
          return;
        }
        const children = Array.from(node.childNodes);
        for (let i = 0; i < Math.min(targetOffset, children.length); i++) {
          visit(children[i]);
          if (found) return;
        }
        found = true;
        return;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        count += (node.textContent || '').replace(/\u200B/g, '').length;
        return;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName.toLowerCase();
        if (tag === 'br') {
          const isTrailingBr =
            el.parentElement === container &&
            el === container.lastElementChild &&
            count > 0;
          if (!isTrailingBr) count += 1;
          return;
        }
        if ((tag === 'div' || tag === 'p') && el.parentElement === container && el !== container.firstChild) {
          count += 1;
        }
        for (const child of Array.from(el.childNodes)) {
          visit(child);
          if (found) return;
        }
      }
    };

    visit(container);
    return count;
  };

  const a = measureOffsetTo(range.startContainer, range.startOffset);
  const b = measureOffsetTo(range.endContainer, range.endOffset);
  const start = Math.min(a, b);
  const end = Math.max(a, b);
  return { start, end, hasSelection: start !== end };
}

export function restoreSelectionOffsetsInElement(
  container: HTMLElement,
  startOffset: number,
  endOffset: number
): void {
  if (typeof window === 'undefined') return;
  const sel = window.getSelection();
  if (!sel) return;

  const findDomPoint = (targetCharOffset: number): { node: Node; offset: number } => {
    let remaining = Math.max(0, targetCharOffset);
    let lastNode: Node = container;
    let lastOffset = container.childNodes.length;

    const visit = (node: Node): { node: Node; offset: number } | null => {
      if (node.nodeType === Node.TEXT_NODE) {
        const raw = node.textContent || '';
        let cleanLen = 0;
        for (let i = 0; i < raw.length; i++) {
          if (raw[i] !== ZERO_WIDTH_SPACE) cleanLen++;
        }
        lastNode = node;
        lastOffset = raw.length;
        if (remaining <= cleanLen) {
          let seenClean = 0;
          for (let i = 0; i < raw.length; i++) {
            if (seenClean === remaining) {
              return { node, offset: i };
            }
            if (raw[i] !== ZERO_WIDTH_SPACE) seenClean++;
          }
          return { node, offset: raw.length };
        }
        remaining -= cleanLen;
        return null;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.tagName.toLowerCase() === 'br') {
          if (remaining === 0) {
            const parent = el.parentNode || container;
            const idx = Array.from(parent.childNodes).indexOf(el);
            return { node: parent, offset: Math.max(0, idx) };
          }
          remaining = Math.max(0, remaining - 1);
          return null;
        }
        for (const child of Array.from(el.childNodes)) {
          const hit = visit(child);
          if (hit) return hit;
        }
      }
      return null;
    };

    const hit = visit(container);
    return hit ?? { node: lastNode, offset: lastOffset };
  };

  const p1 = findDomPoint(startOffset);
  const p2 = startOffset === endOffset ? p1 : findDomPoint(endOffset);
  const range = document.createRange();
  range.setStart(p1.node, p1.offset);
  range.setEnd(p2.node, p2.offset);
  sel.removeAllRanges();
  sel.addRange(range);
}
