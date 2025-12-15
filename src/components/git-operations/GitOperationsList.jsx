// src/components/git-operations/GitOperationsList.jsx
import { useState, useEffect } from 'react';
import { GitOperationCard } from './GitOperationCard';
import { GitOperationDetailsModal } from './GitOperationDetailsModal';
import { Loader2, AlertCircle } from 'lucide-react';

export const GitOperationsList = ({ workspaceId, execucaoId }) => {
  const [operations, setOperations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        setIsLoading(true);
        let url = '';

        if (execucaoId) {
          url = `/api/git-operations/execucao/${execucaoId}`;
        } else if (workspaceId) {
          url = `/api/git-operations/workspace/${workspaceId}`;
        } else {
          url = '/api/git-operations';
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha ao buscar operações Git');

        const data = await response.json();
        setOperations(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setOperations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOperations();
  }, [workspaceId, execucaoId]);

  const handleOperationClick = (operation) => {
    setSelectedOperation(operation);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="text-sm text-gray-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (operations.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <AlertCircle className="h-10 w-10 text-gray-400" />
        <p className="text-sm text-gray-500">
          {execucaoId
            ? "Nenhuma operação Git encontrada para esta execução"
            : workspaceId
              ? "Nenhuma operação Git encontrada para este workspace"
              : "Nenhuma operação Git encontrada"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {operations.map((operation) => (
          <GitOperationCard
            key={operation.id}
            operation={operation}
            onClick={() => handleOperationClick(operation)}
          />
        ))}
      </div>

      <GitOperationDetailsModal
        operation={selectedOperation}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
