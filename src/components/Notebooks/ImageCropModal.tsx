import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Check, RotateCw, RotateCcw, Crop as CropIcon, Loader2, AlertCircle } from 'lucide-react';
import { soundEffects } from '../../services/audioService';

interface Props {
  isOpen: boolean;
  imageSrc: string;
  imageName?: string;
  confirmLabel?: string;
  skipLabel?: string;
  initialRotation?: number;
  onClose: () => void;
  onCropCompleted: (croppedBlob: Blob) => Promise<void> | void;
  onSkipCrop?: () => void;
}

export type AspectRatioMode = 'free' | '1:1' | '4:3' | '16:9' | 'portrait';

const FULL_CROP = { x: 0, y: 0, width: 100, height: 100 };

function getTargetAspectRatio(mode: AspectRatioMode): number | null {
  switch (mode) {
    case '1:1':
      return 1;
    case '4:3':
      return 4 / 3;
    case '16:9':
      return 16 / 9;
    case 'portrait':
      return 3 / 4;
    default:
      return null;
  }
}

function clampCrop(c: { x: number; y: number; width: number; height: number }) {
  const width = Math.max(8, Math.min(100, c.width));
  const height = Math.max(8, Math.min(100, c.height));
  const x = Math.max(0, Math.min(100 - width, c.x));
  const y = Math.max(0, Math.min(100 - height, c.y));
  return {
    x: +x.toFixed(1),
    y: +y.toFixed(1),
    width: +width.toFixed(1),
    height: +height.toFixed(1),
  };
}

export const ImageCropModal: React.FC<Props> = ({
  isOpen,
  imageSrc,
  imageName = 'Foto',
  confirmLabel = 'Zuschneiden anwenden',
  skipLabel = 'Ohne Zuschnitt einfügen',
  initialRotation = 0,
  onClose,
  onCropCompleted,
  onSkipCrop,
}) => {
  const [rotation, setRotation] = useState<number>(initialRotation);
  const [aspectMode, setAspectMode] = useState<AspectRatioMode>('free');
  const [hasEdited, setHasEdited] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active object URL for previewing the upright/rotated canvas image
  const [previewBlobUrl, setPreviewBlobUrl] = useState<string>('');
  const [sourceDimensions, setSourceDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // Keep reference to the fully rendered rotated source canvas in memory
  const rotCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backdropPointerDownRef = useRef<boolean>(false);

  // Crop box in percentages (0..100) of displayed image container
  // Start at full frame when skipping is offered so any drag/format/rotate clearly transitions into crop mode
  const hasSkipOption = Boolean(onSkipCrop);
  const initialCropBox = hasSkipOption ? FULL_CROP : { x: 8, y: 8, width: 84, height: 84 };
  const [crop, setCrop] = useState<{ x: number; y: number; width: number; height: number }>(
    initialCropBox
  );

  const imageBoxRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<string | null>(null);
  const dragStartRef = useRef<{ clientX: number; clientY: number; crop: typeof crop } | null>(null);

  // Clean up object URLs on unmount or replacement
  useEffect(() => {
    return () => {
      if (previewBlobUrl && previewBlobUrl.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(previewBlobUrl);
        } catch {}
      }
    };
  }, [previewBlobUrl]);

  // Initialize or reset when modal opens or imageSrc changes
  useEffect(() => {
    if (isOpen) {
      setRotation(initialRotation);
      setAspectMode('free');
      setCrop(hasSkipOption ? FULL_CROP : { x: 8, y: 8, width: 84, height: 84 });
      setHasEdited(false);
      setErrorMessage(null);
      setIsProcessing(false);
    }
  }, [isOpen, initialRotation, imageSrc, hasSkipOption]);

  // Escape key closes modal when idle
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isProcessing) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, isProcessing, onClose]);

  // Build the rotated canvas and display preview whenever imageSrc or rotation changes
  useEffect(() => {
    if (!isOpen || !imageSrc) return;
    let active = true;
    setIsLoading(true);
    setErrorMessage(null);

    const img = new Image();
    if (!imageSrc.startsWith('blob:') && !imageSrc.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }

    img.onload = () => {
      if (!active) return;
      try {
        const nw = img.naturalWidth || 800;
        const nh = img.naturalHeight || 600;
        const rot = ((rotation % 360) + 360) % 360;
        const isQuarter = rot === 90 || rot === 270;
        const targetW = isQuarter ? nh : nw;
        const targetH = isQuarter ? nw : nh;

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D-Kontext nicht verfügbar');

        ctx.translate(targetW / 2, targetH / 2);
        ctx.rotate((rot * Math.PI) / 180);
        ctx.drawImage(img, -nw / 2, -nh / 2, nw, nh);

        rotCanvasRef.current = canvas;
        setSourceDimensions({ width: targetW, height: targetH });

        canvas.toBlob(
          (blob) => {
            if (!active) return;
            if (blob) {
              const url = URL.createObjectURL(blob);
              setPreviewBlobUrl(url);
            } else {
              setPreviewBlobUrl(canvas.toDataURL('image/jpeg', 0.92));
            }
            setIsLoading(false);
          },
          'image/jpeg',
          0.92
        );
      } catch (err) {
        if (!active) return;
        console.warn('Fallback bei Bildvorschau:', err);
        setPreviewBlobUrl(imageSrc);
        setSourceDimensions({ width: img.naturalWidth || 800, height: img.naturalHeight || 600 });
        setIsLoading(false);
      }
    };

    img.onerror = () => {
      if (!active) return;
      setErrorMessage('Das Foto konnte nicht geladen werden.');
      setIsLoading(false);
    };

    img.src = imageSrc;

    return () => {
      active = false;
    };
  }, [isOpen, imageSrc, rotation]);

  // Keep crop box strictly aligned to locked aspect ratio (also after 90° rotation swaps dimensions)
  useEffect(() => {
    const targetRatio = getTargetAspectRatio(aspectMode);
    if (!targetRatio || sourceDimensions.width <= 0 || sourceDimensions.height <= 0) return;

    const imgAspect = sourceDimensions.width / sourceDimensions.height;
    const pctRatio = targetRatio / imgAspect;

    setCrop((prev) => {
      let newW = prev.width > 92 ? 86 : prev.width;
      let newH = newW / pctRatio;
      if (newH > 92) {
        newH = 92;
        newW = newH * pctRatio;
      }
      if (newW > 92) {
        newW = 92;
        newH = newW / pctRatio;
      }
      const centerX = prev.x + prev.width / 2;
      const centerY = prev.y + prev.height / 2;
      const newX = centerX - newW / 2;
      const newY = centerY - newH / 2;
      return clampCrop({ x: newX, y: newY, width: newW, height: newH });
    });
  }, [aspectMode, sourceDimensions.width, sourceDimensions.height]);

  // Adjust crop box when aspect mode changes
  const handleSelectAspectMode = useCallback((mode: AspectRatioMode) => {
    setAspectMode(mode);
    if (getTargetAspectRatio(mode)) {
      setHasEdited(true);
    }
  }, []);

  const handleResetEdits = () => {
    setRotation(initialRotation);
    setAspectMode('free');
    setCrop(onSkipCrop ? FULL_CROP : { x: 8, y: 8, width: 84, height: 84 });
    setHasEdited(false);
    soundEffects.playClick();
  };

  // Global window pointermove and pointerup listeners ensure fluid dragging
  useEffect(() => {
    if (!isOpen) return;

    const onPointerMove = (e: PointerEvent) => {
      if (!dragHandleRef.current || !dragStartRef.current || !imageBoxRef.current) return;
      const rect = imageBoxRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const dx = ((e.clientX - dragStartRef.current.clientX) / rect.width) * 100;
      const dy = ((e.clientY - dragStartRef.current.clientY) / rect.height) * 100;
      const orig = dragStartRef.current.crop;
      const handle = dragHandleRef.current;

      let nextX = orig.x;
      let nextY = orig.y;
      let nextW = orig.width;
      let nextH = orig.height;

      if (handle === 'move') {
        nextX = Math.max(0, Math.min(100 - orig.width, orig.x + dx));
        nextY = Math.max(0, Math.min(100 - orig.height, orig.y + dy));
      } else {
        if (handle.includes('l')) {
          const right = orig.x + orig.width;
          nextX = Math.max(0, Math.min(right - 8, orig.x + dx));
          nextW = right - nextX;
        }
        if (handle.includes('r')) {
          nextW = Math.max(8, Math.min(100 - orig.x, orig.width + dx));
        }
        if (handle.includes('t')) {
          const bottom = orig.y + orig.height;
          nextY = Math.max(0, Math.min(bottom - 8, orig.y + dy));
          nextH = bottom - nextY;
        }
        if (handle.includes('b')) {
          nextH = Math.max(8, Math.min(100 - orig.y, orig.height + dy));
        }

        const targetRatio = getTargetAspectRatio(aspectMode);
        if (targetRatio) {
          const imgAspect =
            sourceDimensions.width > 0 && sourceDimensions.height > 0
              ? sourceDimensions.width / sourceDimensions.height
              : 1;
          const pctRatio = targetRatio / imgAspect;

          if (handle === 't' || handle === 'b') {
            const maxW = 100 - nextX;
            nextW = Math.min(maxW, nextH * pctRatio);
            nextH = nextW / pctRatio;
            if (handle === 't') {
              nextY = orig.y + orig.height - nextH;
            }
          } else {
            const maxH = handle.includes('t') ? orig.y + orig.height : 100 - nextY;
            nextH = nextW / pctRatio;
            if (nextH > maxH) {
              nextH = maxH;
              nextW = nextH * pctRatio;
              if (handle.includes('l')) {
                nextX = orig.x + orig.width - nextW;
              }
            }
            if (handle.includes('t')) {
              nextY = orig.y + orig.height - nextH;
            }
          }
        }
      }

      const clamped = clampCrop({ x: nextX, y: nextY, width: nextW, height: nextH });
      setCrop(clamped);

      if (
        Math.abs(clamped.x - orig.x) > 0.2 ||
        Math.abs(clamped.y - orig.y) > 0.2 ||
        Math.abs(clamped.width - orig.width) > 0.2 ||
        Math.abs(clamped.height - orig.height) > 0.2
      ) {
        setHasEdited(true);
      }
    };

    const onPointerUp = () => {
      dragHandleRef.current = null;
      dragStartRef.current = null;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isOpen, aspectMode, sourceDimensions]);

  const handlePointerDown = (handle: string, e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dragHandleRef.current = handle;
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      crop: { ...crop },
    };
  };

  // Perform crop directly from the in-memory rotated canvas
  const handleApplyCrop = async () => {
    if (isProcessing || isLoading) return;
    setIsProcessing(true);
    setErrorMessage(null);
    soundEffects.playClick();

    try {
      let sourceCanvas = rotCanvasRef.current;
      if (!sourceCanvas) {
        const fallbackImg = new Image();
        await new Promise<void>((resolve, reject) => {
          fallbackImg.onload = () => resolve();
          fallbackImg.onerror = () => reject(new Error('Bild konnte nicht geladen werden'));
          fallbackImg.src = previewBlobUrl || imageSrc;
        });
        const fbCanvas = document.createElement('canvas');
        fbCanvas.width = fallbackImg.naturalWidth || 800;
        fbCanvas.height = fallbackImg.naturalHeight || 600;
        const fbCtx = fbCanvas.getContext('2d');
        if (!fbCtx) throw new Error('Canvas 2D nicht verfügbar');
        fbCtx.drawImage(fallbackImg, 0, 0);
        sourceCanvas = fbCanvas;
      }

      const srcW = sourceCanvas.width;
      const srcH = sourceCanvas.height;

      const safeX = Math.max(0, Math.min(srcW - 1, Math.round((crop.x / 100) * srcW)));
      const safeY = Math.max(0, Math.min(srcH - 1, Math.round((crop.y / 100) * srcH)));
      const safeW = Math.max(1, Math.min(srcW - safeX, Math.round((crop.width / 100) * srcW)));
      const safeH = Math.max(1, Math.min(srcH - safeY, Math.round((crop.height / 100) * srcH)));

      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = safeW;
      exportCanvas.height = safeH;
      const exportCtx = exportCanvas.getContext('2d');
      if (!exportCtx) throw new Error('Canvas 2D-Kontext nicht verfügbar');

      exportCtx.drawImage(sourceCanvas, safeX, safeY, safeW, safeH, 0, 0, safeW, safeH);

      let blob: Blob | null = await new Promise((resolve) => {
        try {
          exportCanvas.toBlob((b) => resolve(b), 'image/jpeg', 0.92);
        } catch {
          resolve(null);
        }
      });

      if (!blob || blob.size === 0) {
        const dataUrl = exportCanvas.toDataURL('image/jpeg', 0.92);
        const res = await fetch(dataUrl);
        blob = await res.blob();
      }

      if (!blob || blob.size === 0) {
        throw new Error('Das zugeschnittene Foto konnte nicht generiert werden.');
      }

      soundEffects.playLevelUp();
      await onCropCompleted(blob);
    } catch (err) {
      console.error('Fehler beim Bestätigen des Foto-Zuschnitts:', err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Foto konnte nicht zugeschnitten werden. Bitte versuche es erneut.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  const isCropChanged =
    hasEdited ||
    rotation !== initialRotation ||
    aspectMode !== 'free' ||
    crop.x > 0.5 ||
    crop.y > 0.5 ||
    crop.width < 99.5 ||
    crop.height < 99.5;

  const shouldSkipOnConfirm = Boolean(onSkipCrop && !isCropChanged);

  return (
    <div
      onPointerDown={(e) => {
        backdropPointerDownRef.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && backdropPointerDownRef.current && !isProcessing) {
          onClose();
        }
        backdropPointerDownRef.current = false;
      }}
      className="fixed inset-0 z-[80] bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-xl w-full flex flex-col overflow-hidden max-h-[92vh]"
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center shrink-0">
              <CropIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Foto zuschneiden
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">
                {imageName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            title="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Aspect Ratio Options */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-slate-600 dark:text-slate-300 mr-1">Format:</span>
            {(
              [
                { id: 'free', label: 'Frei' },
                { id: '1:1', label: '1:1' },
                { id: '4:3', label: '4:3' },
                { id: '16:9', label: '16:9' },
                { id: 'portrait', label: 'Porträt' },
              ] as { id: AspectRatioMode; label: string }[]
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectAspectMode(opt.id)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  aspectMode === opt.id
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {isCropChanged && (
              <button
                type="button"
                onClick={handleResetEdits}
                disabled={isLoading || isProcessing}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors disabled:opacity-50"
                title="Zuschnitt zurücksetzen"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Zurücksetzen</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setRotation((r) => (r + 90) % 360);
                setHasEdited(true);
                soundEffects.playClick();
              }}
              disabled={isLoading || isProcessing}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors disabled:opacity-50"
              title="Um 90° im Uhrzeigersinn drehen"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>90° drehen</span>
            </button>
          </div>
        </div>

        {/* Cropping Canvas / Image Area */}
        <div className="relative flex-1 min-h-[220px] bg-slate-950 flex items-center justify-center p-5 sm:p-7 overflow-hidden select-none touch-none">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <Loader2 className="w-7 h-7 animate-spin text-indigo-400" />
              <span className="text-xs">Foto wird vorbereitet…</span>
            </div>
          ) : previewBlobUrl ? (
            <div
              ref={imageBoxRef}
              className="relative max-h-full max-w-full inline-block"
              style={{ lineHeight: 0 }}
            >
              <img
                src={previewBlobUrl}
                alt="Zuschneiden Vorschau"
                draggable={false}
                className="max-h-[48vh] max-w-full w-auto h-auto block select-none pointer-events-none object-contain"
              />

              {/* Dimming backdrop clipped cleanly to image dimensions */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  style={{
                    left: `${crop.x}%`,
                    top: `${crop.y}%`,
                    width: `${crop.width}%`,
                    height: `${crop.height}%`,
                    boxShadow: '0 0 0 9999px rgba(2, 6, 23, 0.58)',
                  }}
                  className="absolute"
                />
              </div>

              {/* Crop Box Overlay (unclipped so corner & edge handles at 0%/100% stay easy to grab) */}
              <div
                style={{
                  left: `${crop.x}%`,
                  top: `${crop.y}%`,
                  width: `${crop.width}%`,
                  height: `${crop.height}%`,
                }}
                onPointerDown={(e) => handlePointerDown('move', e)}
                className="absolute border-2 border-indigo-400 bg-transparent cursor-move box-border group"
              >
                {/* Rule of thirds grid lines */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-60">
                  <div className="border-r border-b border-white/60" />
                  <div className="border-r border-b border-white/60" />
                  <div className="border-b border-white/60" />
                  <div className="border-r border-b border-white/60" />
                  <div className="border-r border-b border-white/60" />
                  <div className="border-b border-white/60" />
                  <div className="border-r border-b border-white/60" />
                  <div className="border-r border-b border-white/60" />
                  <div />
                </div>

                {/* Corner Handles */}
                <div
                  onPointerDown={(e) => handlePointerDown('tl', e)}
                  className="absolute -top-2.5 -left-2.5 w-5 h-5 rounded-full bg-indigo-600 border-2 border-white shadow-md cursor-nwse-resize touch-none flex items-center justify-center hover:scale-110 transition-transform"
                />
                <div
                  onPointerDown={(e) => handlePointerDown('tr', e)}
                  className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-indigo-600 border-2 border-white shadow-md cursor-nesw-resize touch-none flex items-center justify-center hover:scale-110 transition-transform"
                />
                <div
                  onPointerDown={(e) => handlePointerDown('bl', e)}
                  className="absolute -bottom-2.5 -left-2.5 w-5 h-5 rounded-full bg-indigo-600 border-2 border-white shadow-md cursor-nesw-resize touch-none flex items-center justify-center hover:scale-110 transition-transform"
                />
                <div
                  onPointerDown={(e) => handlePointerDown('br', e)}
                  className="absolute -bottom-2.5 -right-2.5 w-5 h-5 rounded-full bg-indigo-600 border-2 border-white shadow-md cursor-nwse-resize touch-none flex items-center justify-center hover:scale-110 transition-transform"
                />

                {/* Edge Handles for easy resizing */}
                <div
                  onPointerDown={(e) => handlePointerDown('t', e)}
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-3 rounded-full bg-indigo-500/95 border border-white cursor-ns-resize touch-none hover:bg-indigo-400"
                />
                <div
                  onPointerDown={(e) => handlePointerDown('b', e)}
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-3 rounded-full bg-indigo-500/95 border border-white cursor-ns-resize touch-none hover:bg-indigo-400"
                />
                <div
                  onPointerDown={(e) => handlePointerDown('l', e)}
                  className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-10 rounded-full bg-indigo-500/95 border border-white cursor-ew-resize touch-none hover:bg-indigo-400"
                />
                <div
                  onPointerDown={(e) => handlePointerDown('r', e)}
                  className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-10 rounded-full bg-indigo-500/95 border border-white cursor-ew-resize touch-none hover:bg-indigo-400"
                />
              </div>
            </div>
          ) : (
            <div className="text-slate-400 text-xs">Vorschau nicht verfügbar</div>
          )}
        </div>

        {/* Error Notification Banner if any */}
        {errorMessage && (
          <div className="px-4 py-2 bg-rose-50 dark:bg-rose-950/50 border-t border-rose-200 dark:border-rose-900/60 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span className="flex-1 font-medium">{errorMessage}</span>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="underline hover:text-rose-900 dark:hover:text-rose-100 cursor-pointer text-[11px]"
            >
              Ausblenden
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            Ziehe an den Ecken oder Kanten, um den Bildausschnitt zuzuschneiden.
          </span>
          <div className="flex flex-wrap items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer transition-colors disabled:opacity-50"
            >
              Abbrechen
            </button>
            {shouldSkipOnConfirm ? (
              <button
                type="button"
                onClick={onSkipCrop}
                disabled={isProcessing || isLoading}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold cursor-pointer transition-colors shadow-xs disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>{skipLabel}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleApplyCrop}
                disabled={isProcessing || isLoading}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold cursor-pointer disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Wird angewendet…</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{confirmLabel}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
