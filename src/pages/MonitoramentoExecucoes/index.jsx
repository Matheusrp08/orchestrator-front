import { useState, useEffect } from 'react';
import { Search, Eye, PlayCircle, Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MonitoramentoExecucoes = () => {
  const [execucoes, setExecucoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchExecucoes();
  }, []);

  const fetchExecucoes = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/execucoes`);
      const data = await response.json();
      setExecucoes(data);
    } catch (error) {
      console.error('Erro ao buscar execuções:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'EM_ANDAMENTO':
        return <PlayCircle className="text-yellow-500" size={16} />;
      case 'CONCLUIDO':
        return <CheckCircle2 className="text-green-500" size={16} />;
      case 'ERRO':
        return <XCircle className="text-red-500" size={16} />;
      case 'AGUARDANDO':
        return <Clock className="text-gray-500" size={16} />;
      default:
        return <AlertCircle className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'EM_ANDAMENTO':
        return 'bg-yellow-50 text-yellow-800';
      case 'CONCLUIDO':
        return 'bg-green-50 text-green-800';
      case 'ERRO':
        return 'bg-red-50 text-red-800';
      case 'AGUARDANDO':
        return 'bg-gray-50 text-gray-800';
      default:
        return 'bg-gray-50 text-gray-800';
    }
  };

  const filteredExecucoes = execucoes.filter(
    (execucao) =>
      execucao.fluxo_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      execucao.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Monitoramento de Execuções</h1>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Buscar execuções..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredExecucoes.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">Nenhuma execução encontrada.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fluxo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Início</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fim</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExecucoes.map((execucao) => (
                <tr key={execucao.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{execucao.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{execucao.fluxo_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(execucao.status)}`}>
                      {getStatusIcon(execucao.status)}
                      <span className="ml-1">{execucao.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(execucao.data_inicio).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {execucao.data_fim ? new Date(execucao.data_fim).toLocaleString() : '--'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => navigate(`/execucoes/${execucao.id}`)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <Eye size={16} className="mr-1" /> Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MonitoramentoExecucoes;
