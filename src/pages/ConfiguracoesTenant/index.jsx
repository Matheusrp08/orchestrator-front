import { useState, useEffect } from 'react';
import { Save, Settings, Users, Workflow, Key } from 'lucide-react';

const ConfiguracoesTenant = () => {
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    configuracoes: '',
  });

  useEffect(() => {
    fetchTenant();
  }, []);

  const fetchTenant = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/tenants/1`); // Assume tenant_id=1 para demo
      const data = await response.json();
      setTenant(data);
      setFormData({
        nome: data.nome,
        configuracoes: JSON.stringify(data.configuracoes, null, 2),
      });
    } catch (error) {
      console.error('Erro ao buscar tenant:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/tenants/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...tenant,
          nome: formData.nome,
          configuracoes: JSON.parse(formData.configuracoes),
        }),
      });

      if (response.ok) {
        alert('Configurações salvas com sucesso!');
      } else {
        alert('Erro ao salvar configurações.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <Settings size={20} className="text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-800">Configurações do Tenant</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Tenant</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID do Tenant</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              value={tenant?.id || ''}
              disabled
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Configurações (JSON)</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            rows={10}
            value={formData.configuracoes}
            onChange={(e) => setFormData({ ...formData, configuracoes: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Users size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Usuários</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{tenant?.usuarios_count || 0}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Workflow size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Fluxos</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{tenant?.fluxos_count || 0}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Key size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">API Key</span>
            </div>
            <p className="text-sm font-medium text-gray-800">{tenant?.api_key || 'Não gerada'}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Save size={16} /> Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfiguracoesTenant;
