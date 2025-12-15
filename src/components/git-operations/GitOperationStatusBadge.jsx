import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { GitOperationStatus } from '../../types/git-operation';

const statusConfig = {
  [GitOperationStatus.SUCCESS]: {
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    color: 'bg-green-50 text-green-600 ring-green-500/10',
    text: 'Sucesso'
  },
  [GitOperationStatus.ERROR]: {
    icon: <XCircle className="h-3.5 w-3.5" />,
    color: 'bg-red-50 text-red-600 ring-red-500/10',
    text: 'Erro'
  },
  [GitOperationStatus.PENDING]: {
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    color: 'bg-yellow-50 text-yellow-600 ring-yellow-500/10',
    text: 'Pendente'
  }
};

export const GitOperationStatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig[GitOperationStatus.PENDING];

  return (
    <span className={`inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${config.color}`}>
      {config.icon}
      {config.text}
    </span>
  );
};