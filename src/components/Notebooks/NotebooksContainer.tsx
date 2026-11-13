import React, { useState, useEffect } from 'react';
import {
  BlankPageTemplate,
  BlankPaperColor,
  NotebookDocument,
  NotebookStore,
  PageAnnotations,
} from '../../types/notebook';
import {
  deleteNotebookAnnotations,
  deleteNotebookPageAnnotations,
  getPageAnnotations,
  loadNotebookStore,
  reorderNotebookPageAnnotations,
  saveLastPageForBook,
  savePageAnnotations,
} from '../../services/notebookStorageService';
import {
  appendQuickBlankPageToCustomNotebook,
  cleanupUnusedEmbeddedMedia,
  deleteCustomNotebook,
  deleteCustomNotebookPage,
  listCustomNotebooks,
  reorderCustomNotebookPages,
  updateCustomPageTemplate,
} from '../../services/customNotebookDbService';
import { NotebookLibraryView } from './NotebookLibraryView';
import { NotebookReaderWorkspace } from './NotebookReaderWorkspace';
import {
  CustomNotebookModal,
  CustomNotebookModalMode,
} from './CustomNotebookModal';

interface Props {
  onBack: () => void;
  backupVersion?: number;
}

export const NotebooksContainer: React.FC<Props> = ({ onBack, backupVersion = 0 }) => {
  const [store, setStore] = useState<NotebookStore>(() => loadNotebookStore());
  const [customNotebooks, setCustomNotebooks] = useState<NotebookDocument[]>([]);
  const [selection, setSelection] = useState<{
    notebook: NotebookDocument;
    page?: number;
  } | null>(null);
  const [jumpSignal, setJumpSignal] = useState<{ page: number; seq: number } | undefined>(
    undefined
  );

  const [modalState, setModalState] = useState<{
    mode: CustomNotebookModalMode;
    targetNotebook?: NotebookDocument;
    fromReader?: boolean;
  } | null>(null);

  const collectActiveEmbeddedMediaIds = (notebookStore: NotebookStore): Set<string> => {
    const activeEmbedMediaIds = new Set<string>();
    for (const page of Object.values(notebookStore.pages)) {
      for (const img of page.images || []) {
        if (img.mediaId) {
          activeEmbedMediaIds.add(img.mediaId);
        }
      }
    }
    return activeEmbedMediaIds;
  };

  useEffect(() => {
    const loadedStore = loadNotebookStore();
    setStore(loadedStore);
    let active = true;
    listCustomNotebooks().then((books) => {
      if (!active) return;
      setCustomNotebooks(books);
      setSelection((prev) => {
        if (!prev || !prev.notebook.isCustom) return prev;
        const updated = books.find((b) => b.id === prev.notebook.id);
        return updated ? { ...prev, notebook: updated } : prev;
      });
    });
    return () => {
      active = false;
    };
  }, [backupVersion]);

  // Clean up orphaned embedded media only when back in Library (no open reader session Undo stack)
  useEffect(() => {
    if (selection !== null) return;
    const latestStore = loadNotebookStore();
    cleanupUnusedEmbeddedMedia(collectActiveEmbeddedMediaIds(latestStore)).catch(() => {});
  }, [selection, backupVersion]);

  const handleUpdatePageAnnotations = (
    notebookId: string,
    pageNumber: number,
    annotations: PageAnnotations
  ) => {
    setStore((prev) => savePageAnnotations(prev, notebookId, pageNumber, annotations));
  };

  const handlePageChange = (notebookId: string, pageNumber: number) => {
    setStore((prev) => {
      if (prev.lastPageByBook[notebookId] === pageNumber) return prev;
      return saveLastPageForBook(prev, notebookId, pageNumber);
    });
  };

  const handleDeleteCustomNotebook = async (notebookId: string) => {
    await deleteCustomNotebook(notebookId);
    setCustomNotebooks((prev) => prev.filter((b) => b.id !== notebookId));
    const nextStore = deleteNotebookAnnotations(loadNotebookStore(), notebookId);
    setStore(nextStore);
    setSelection((prev) => (prev && prev.notebook.id === notebookId ? null : prev));
    await cleanupUnusedEmbeddedMedia(collectActiveEmbeddedMediaIds(nextStore));
  };

  const handleDeletePage = async (notebook: NotebookDocument, pageNumber: number) => {
    const latestStore = loadNotebookStore();
    const isBuiltInBlank = !notebook.isCustom && notebook.sourceType === 'blatt-blanko';
    const oldTotalPages = isBuiltInBlank
      ? latestStore.blankPageCountByBook?.[notebook.id] ?? notebook.totalPages
      : notebook.totalPages;

    if (oldTotalPages <= 1) return;

    if (notebook.isCustom) {
      const updated = await deleteCustomNotebookPage(notebook.id, pageNumber);
      if (updated) {
        setCustomNotebooks((prev) =>
          prev.map((b) => (b.id === updated.id ? updated : b))
        );
        setSelection((prev) =>
          prev && prev.notebook.id === updated.id ? { ...prev, notebook: updated } : prev
        );
      }
    }

    const nextStore = deleteNotebookPageAnnotations(
      latestStore,
      notebook.id,
      pageNumber,
      oldTotalPages,
      isBuiltInBlank
    );
    setStore(nextStore);
    await cleanupUnusedEmbeddedMedia(collectActiveEmbeddedMediaIds(nextStore));
  };

  const handleChangePageLayout = async (
    notebook: NotebookDocument,
    pageNumber: number,
    template: BlankPageTemplate,
    applyToAllBlank: boolean = false,
    paperColor?: BlankPaperColor,
    showDateHeader?: boolean
  ) => {
    const latestStore = loadNotebookStore();

    if (notebook.isCustom) {
      const updated = await updateCustomPageTemplate(
        notebook.id,
        pageNumber,
        template,
        applyToAllBlank,
        paperColor,
        showDateHeader
      );
      if (updated) {
        setCustomNotebooks((prev) =>
          prev.map((b) => (b.id === updated.id ? updated : b))
        );
        setSelection((prev) =>
          prev && prev.notebook.id === updated.id ? { ...prev, notebook: updated } : prev
        );
      }

      // Keep localStorage annotations in sync (clear any legacy overrides on affected blank pages)
      let workingStore = latestStore;
      const pagesToClear = applyToAllBlank
        ? (updated?.customPages ?? notebook.customPages ?? [])
            .filter((pg) => pg.kind === 'blank')
            .map((pg) => pg.pageNumber)
        : [pageNumber];

      for (const pNum of pagesToClear) {
        const existingAnn = getPageAnnotations(workingStore, notebook.id, pNum);
        if (
          existingAnn.templateOverride !== undefined ||
          existingAnn.paperColorOverride !== undefined ||
          existingAnn.showDateHeader !== undefined
        ) {
          workingStore = savePageAnnotations(workingStore, notebook.id, pNum, {
            ...existingAnn,
            templateOverride: undefined,
            paperColorOverride: undefined,
            showDateHeader: undefined,
          });
        }
      }
      setStore(workingStore);
      return;
    }

    if (notebook.sourceType === 'blatt-blanko') {
      const effectiveTotal = Math.max(
        1,
        latestStore.blankPageCountByBook?.[notebook.id] ?? notebook.totalPages
      );
      const targetPages = applyToAllBlank
        ? Array.from({ length: effectiveTotal }, (_, idx) => idx + 1)
        : [pageNumber];

      let workingStore = latestStore;
      const refAnn = getPageAnnotations(workingStore, notebook.id, pageNumber);
      const overrideVal = template === 'blank' ? undefined : template;
      const nextColor = paperColor ?? refAnn.paperColorOverride;
      const colorOverrideVal = !nextColor || nextColor === 'white' ? undefined : nextColor;
      const nextHeader =
        showDateHeader !== undefined ? showDateHeader : Boolean(refAnn.showDateHeader);
      const headerOverrideVal = nextHeader ? true : undefined;

      for (const pNum of targetPages) {
        const existingAnn = getPageAnnotations(workingStore, notebook.id, pNum);
        workingStore = savePageAnnotations(workingStore, notebook.id, pNum, {
          ...existingAnn,
          templateOverride: overrideVal,
          paperColorOverride: colorOverrideVal,
          showDateHeader: headerOverrideVal,
        });
      }
      setStore(workingStore);
    }
  };

  const handleQuickAddBlankPage = async (
    notebook: NotebookDocument,
    options: {
      template: BlankPageTemplate;
      paperColor: BlankPaperColor;
      showDateHeader: boolean;
    }
  ) => {
    const latestStore = loadNotebookStore();
    if (!notebook.isCustom && notebook.sourceType === 'blatt-blanko') {
      const currentTotal = Math.max(
        1,
        latestStore.blankPageCountByBook?.[notebook.id] ?? notebook.totalPages
      );
      const newPageNumber = currentTotal + 1;
      const nextStoreWithCount: NotebookStore = {
        ...latestStore,
        blankPageCountByBook: {
          ...(latestStore.blankPageCountByBook ?? {}),
          [notebook.id]: newPageNumber,
        },
      };
      const initialAnn: PageAnnotations = {
        strokes: [],
        stickyNotes: [],
        stickers: [],
        textBoxes: [],
        images: [],
        templateOverride: options.template === 'blank' ? undefined : options.template,
        paperColorOverride:
          options.paperColor === 'white' ? undefined : options.paperColor,
        showDateHeader: options.showDateHeader ? true : undefined,
      };
      const savedStore = savePageAnnotations(
        nextStoreWithCount,
        notebook.id,
        newPageNumber,
        initialAnn
      );
      setStore(savedStore);
      setJumpSignal((prev) => ({ page: newPageNumber, seq: (prev?.seq ?? 0) + 1 }));
      return;
    }

    if (notebook.isCustom) {
      const res = await appendQuickBlankPageToCustomNotebook(notebook.id, options);
      if (res) {
        setCustomNotebooks((prev) =>
          prev.map((b) => (b.id === res.notebook.id ? res.notebook : b))
        );
        setSelection((prev) =>
          prev && prev.notebook.id === res.notebook.id
            ? { ...prev, notebook: res.notebook }
            : prev
        );
        setJumpSignal((prev) => ({
          page: res.firstNewPageNumber,
          seq: (prev?.seq ?? 0) + 1,
        }));
      }
    }
  };

  const handleMovePage = async (
    notebook: NotebookDocument,
    fromPage: number,
    toPage: number
  ) => {
    const latestStore = loadNotebookStore();
    const isBuiltInBlank = !notebook.isCustom && notebook.sourceType === 'blatt-blanko';
    const effectiveTotal = isBuiltInBlank
      ? latestStore.blankPageCountByBook?.[notebook.id] ?? notebook.totalPages
      : notebook.totalPages;

    if (
      effectiveTotal <= 1 ||
      fromPage === toPage ||
      fromPage < 1 ||
      toPage < 1 ||
      fromPage > effectiveTotal ||
      toPage > effectiveTotal
    ) {
      return;
    }

    if (notebook.isCustom) {
      const updated = await reorderCustomNotebookPages(notebook.id, fromPage, toPage);
      if (updated) {
        setCustomNotebooks((prev) =>
          prev.map((b) => (b.id === updated.id ? updated : b))
        );
        setSelection((prev) =>
          prev && prev.notebook.id === updated.id ? { ...prev, notebook: updated } : prev
        );
      }
    }

    const nextStore = reorderNotebookPageAnnotations(
      latestStore,
      notebook.id,
      fromPage,
      toPage,
      effectiveTotal
    );
    setStore(nextStore);
  };

  const handleModalCompleted = ({
    notebook,
    jumpToPage,
  }: {
    notebook: NotebookDocument;
    jumpToPage?: number;
  }) => {
    const wasCreate = modalState?.mode === 'create';
    const wasFromReader = Boolean(modalState?.fromReader);
    setModalState(null);

    setCustomNotebooks((prev) => {
      const exists = prev.some((b) => b.id === notebook.id);
      if (exists) {
        return prev.map((b) => (b.id === notebook.id ? notebook : b));
      }
      return [notebook, ...prev];
    });

    if (wasCreate) {
      setSelection({ notebook, page: 1 });
      return;
    }

    setSelection((prev) => {
      if (!prev || prev.notebook.id !== notebook.id) return prev;
      return { ...prev, notebook };
    });

    if (wasFromReader && jumpToPage) {
      setJumpSignal((prev) => ({ page: jumpToPage, seq: (prev?.seq ?? 0) + 1 }));
    } else if (!wasFromReader && modalState?.mode === 'append') {
      setSelection({ notebook, page: jumpToPage ?? notebook.totalPages });
    }
  };

  return (
    <>
      {selection ? (
        <NotebookReaderWorkspace
          notebook={selection.notebook}
          initialPage={selection.page}
          jumpSignal={jumpSignal}
          store={store}
          onUpdatePageAnnotations={handleUpdatePageAnnotations}
          onPageChange={handlePageChange}
          onDeletePage={handleDeletePage}
          onMovePage={handleMovePage}
          onChangePageLayout={handleChangePageLayout}
          onQuickAddBlankPage={handleQuickAddBlankPage}
          onOpenAppendPages={
            selection.notebook.isCustom
              ? () =>
                  setModalState({
                    mode: 'append',
                    targetNotebook: selection.notebook,
                    fromReader: true,
                  })
              : undefined
          }
          onBackToLibrary={() => {
            setSelection(null);
            setJumpSignal(undefined);
          }}
        />
      ) : (
        <NotebookLibraryView
          store={store}
          customNotebooks={customNotebooks}
          onSelectNotebook={(notebook, page) => {
            setJumpSignal(undefined);
            setSelection({ notebook, page });
          }}
          onCreateCustomNotebook={() => setModalState({ mode: 'create' })}
          onEditCustomNotebook={(notebook) =>
            setModalState({ mode: 'edit-meta', targetNotebook: notebook })
          }
          onAppendPagesToNotebook={(notebook) =>
            setModalState({
              mode: 'append',
              targetNotebook: notebook,
              fromReader: false,
            })
          }
          onDeleteCustomNotebook={handleDeleteCustomNotebook}
          onBack={onBack}
        />
      )}

      {modalState && (
        <CustomNotebookModal
          mode={modalState.mode}
          targetNotebook={modalState.targetNotebook}
          defaultJumpToNewPage={Boolean(modalState.fromReader)}
          onClose={() => setModalState(null)}
          onCompleted={handleModalCompleted}
        />
      )}
    </>
  );
};
