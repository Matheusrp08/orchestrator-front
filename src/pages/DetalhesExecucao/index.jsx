import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, AlertCircle, XCircle, ArrowLeft, FileText } from 'lucide-react';

const DetalhesExecucao = () => {
  const { id } = useParams();
  const [execucao, setExecucao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExecucao();
    fetchLogs();
  }, [id]);

  const fetchExecucao = async () => {
    try {
      const response = await fetch(`/api/execucoes/${id}`);
      const data = await response.json();
      setExecucao(data);
    } catch (error) {
      console.error('Erro ao buscar execução:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch(`/api/log-execucoes?execucao_id=${id}`);
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
    }
  };

  const getStatusInfo = () => {
    if (!execucao) return {};

    const icons = {
      'EM_ANDAMENTO': <PlayCircle className="text-yellow-500" size={20} />,
      'CONCLUIDO': <CheckCircle2 className="text-green-500" size={20} />,
      'ERRO': <XCircle className="text-red-500" size={20} />,
      'AGUARDANDO': <Clock className="text-gray-500" size={20} />,
    };

    const colors = {
      'EM_ANDAMENTO': 'bg-yellow-50 text-yellow-800',
      'CONCLUIDO': 'bg-green-50 text-green-800',
      'ERRO': 'bg-red-50 text-red-800',
      'AGUARDANDO': 'bg-gray-50 text-gray-800',
    };

    return {
      icon: icons[execucao.status] || <AlertCircle className="text-gray-500" size={20} />,
      color: colors[execucao.status] || 'bg-gray-50 text-gray-800',
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!execucao) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">Execução não encontrada.</p>
          <button
            onClick={() => navigate('/execucoes')}
            className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={16} /> Voltar para execuções
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/execucoes')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={16} /> Voltar
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Detalhes da Execução #{execucao.id}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Informações Básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">ID do Fluxo</p>
                <p className="font-medium text-gray-800">{execucao.fluxo_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo().color}`}>
                  {getStatusInfo().icon}
                  <span className="ml-2">{execucao.status}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Início</p>
                <p className="font-medium text-gray-800">{new Date(execucao.data_inicio).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fim</p>
                <p className="font-medium text-gray-800">
                  {execucao.data_fim ? new Date(execucao.data_fim).toLocaleString() : '--'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Inputs</h2>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(execucao.inputs, null, 2)}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Outputs</h2>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(execucao.outputs, null, 2)}
            </pre>
          </div>

          {execucao.erros && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Erros</h2>
              <pre className="bg-red-50 p-4 rounded-lg text-sm overflow-x-auto text-red-800">
                {JSON.stringify(execucao.erros, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
          <h2 className="text-xl font-semibold mb-4">Logs</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500 text-center">Nenhum log encontrado.</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="p-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{new Date(log.data_criacao).toLocaleString()}</span>
                    <span className={`text-xs font-medium ${log.nivel === 'ERROR' ? 'text-red-500' : 'text-gray-500'}`}>
                      {log.nivel}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800">{log.mensagem}</p>
                  {log.metadata && (
                    <pre className="bg-gray-50 p-2 rounded text-xs overflow-x-auto mt-2">
                      {JSON.stringify(log.metadata, null, 2)}
                    </pre>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesExecucao;
