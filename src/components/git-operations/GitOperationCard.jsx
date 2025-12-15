// src/components/git-operations/GitOperationCard.jsx
import { GitCommit, FileText, GitBranch, Clock } from 'lucide-react';
import { GitOperationStatusBadge } from './GitOperationStatusBadge';

export const GitOperationCard = ({ operation, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-gray-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <GitCommit className="h-4 w-4 text-gray-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{operation.operacaoTipo}</h3>
            {operation.branch && (
              <p className="text-sm text-gray-500">{operation.branch}</p>
            )}
          </div>
        </div>
        <GitOperationStatusBadge status={operation.status} />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {operation.arquivoCaminho && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FileText className="h-3.5 w-3.5" />
            <span className="truncate">{operation.arquivoCaminho}</span>
          </div>
        )}

        {operation.hashResultante && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-mono text-xs">{operation.hashResultante.substring(0, 7)}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          <span>{new Date(operation.dataOperacao).toLocaleString()}</span>
        </div>
      </div>

      {operation.commitMensagem && (
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {operation.commitMensagem}
        </p>
      )}
    </div>
  );
};
