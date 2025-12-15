// src/components/git-operations/GitOperationDetailsModal.jsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { GitCommit, FileText, GitBranch, Clock, Copy, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { GitOperationStatusBadge } from './GitOperationStatusBadge';

export const GitOperationDetailsModal = ({ operation, isOpen, onClose }) => {
  if (!operation) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Poderia adicionar um toast aqui se você tiver um componente de toast
  };

  const getStatusIcon = () => {
    switch (operation.status) {
      case 'SUCCESS': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'ERROR': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex items-center gap-2 text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    {getStatusIcon()}
                  </div>
                  Detalhes da Operação Git
                </Dialog.Title>

                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tipo de Operação</p>
                    <p className="mt-1 text-sm text-gray-900">{operation.operacaoTipo}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <div className="mt-1">
                      <GitOperationStatusBadge status={operation.status} />
                    </div>
                  </div>

                  {operation.branch && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Branch</p>
                      <p className="mt-1 text-sm text-gray-900">{operation.branch}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-gray-500">Data</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(operation.dataOperacao).toLocaleString()}
                    </p>
                  </div>
                </div>

                {operation.arquivoCaminho && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500">Arquivo</p>
                    <div className="mt-1 flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <code className="text-sm">{operation.arquivoCaminho}</code>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(operation.arquivoCaminho)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {operation.commitMensagem && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500">Mensagem do Commit</p>
                    <div className="mt-1 rounded-md border border-gray-200 bg-gray-50 p-3">
                      <p className="whitespace-pre-wrap text-sm">{operation.commitMensagem}</p>
                    </div>
                  </div>
                )}

                {operation.hashResultante && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500">Hash Resultante</p>
                    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-3">
                      <code className="font-mono text-sm">{operation.hashResultante}</code>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(operation.hashResultante)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200"
                    onClick={onClose}
                  >
                    Fechar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};