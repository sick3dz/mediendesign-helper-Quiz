import React, { useState, useEffect } from 'react';
import { NotebookDocument, NotebookStore, PageAnnotations } from '../../types/notebook';
import {
  loadNotebookStore,
  saveLastPageForBook,
  savePageAnnotations,
} from '../../services/notebookStorageService';
import { NotebookLibraryView } from './NotebookLibraryView';
import { NotebookReaderWorkspace } from './NotebookReaderWorkspace';

interface Props {
  onBack: () => void;
  backupVersion?: number;
}

export const NotebooksContainer: React.FC<Props> = ({ onBack, backupVersion = 0 }) => {
  const [store, setStore] = useState<NotebookStore>(() => loadNotebookStore());
  const [selectedNotebook, setSelectedNotebook] = useState<NotebookDocument | null>(null);

  useEffect(() => {
    setStore(loadNotebookStore());
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

  if (selectedNotebook) {
    return (
      <NotebookReaderWorkspace
        notebook={selectedNotebook}
        store={store}
        onUpdatePageAnnotations={handleUpdatePageAnnotations}
        onPageChange={handlePageChange}
        onBackToLibrary={() => setSelectedNotebook(null)}
      />
    );
  }

  return (
    <NotebookLibraryView
      store={store}
      onSelectNotebook={setSelectedNotebook}
      onBack={onBack}
    />
  );
};
