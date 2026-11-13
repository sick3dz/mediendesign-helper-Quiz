import React, { useState, useEffect } from 'react';
import { NotebookDocument, NotebookStore, PageAnnotations } from '../../types/notebook';
import {
  deleteNotebookAnnotations,
  loadNotebookStore,
  saveLastPageForBook,
  savePageAnnotations,
} from '../../services/notebookStorageService';
import {
  cleanupUnusedEmbeddedMedia,
  createQuickBlankNotebook,
  deleteCustomNotebook,
  listCustomNotebooks,
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

  useEffect(() => {
    setStore(loadNotebookStore());
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

    const activeEmbedMediaIds = new Set<string>();
    for (const page of Object.values(nextStore.pages)) {
      for (const img of page.images || []) {
        if (img.mediaId) {
          activeEmbedMediaIds.add(img.mediaId);
        }
      }
    }
    await cleanupUnusedEmbeddedMedia(activeEmbedMediaIds);
  };

  const handleCreateBlankNotebook = async () => {
    const created = await createQuickBlankNotebook();
    setCustomNotebooks((prev) => [created, ...prev]);
    setJumpSignal(undefined);
    setSelection({ notebook: created, page: 1 });
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
          onCreateBlankNotebook={handleCreateBlankNotebook}
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
