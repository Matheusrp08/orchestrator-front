import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';

const Fluxos = () => {
  const [fluxos, setFluxos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFluxo, setCurrentFluxo] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    versao: '',
    definicao: '',
  });

  useEffect(() => {
    fetchFluxos();
  }, []);

  const fetchFluxos = async () => {
    try {
      const response = await fetch('/api/fluxos');
      const data = await response.json();
      setFluxos(data);
    } catch (error) {
      console.error('Erro ao buscar fluxos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/fluxos/${id}`, { method: 'DELETE' });
      fetchFluxos();
    } catch (error) {
      console.error('Erro ao deletar fluxo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentFluxo) {
        await fetch(`/api/fluxos/${currentFluxo.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('/api/fluxos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      fetchFluxos();
      setIsModalOpen(false);
      setFormData({ nome: '', versao: '', definicao: '' });
    } catch (error) {
      console.error('Erro ao salvar fluxo:', error);
    }
  };

  const openModal = (fluxo = null) => {
    setCurrentFluxo(fluxo);
    if (fluxo) {
      setFormData({
        nome: fluxo.nome,
        versao: fluxo.versao,
        definicao: fluxo.definicao,
      });
    }
    setIsModalOpen(true);
  };

  const filteredFluxos = fluxos.filter(
    (fluxo) =>
      fluxo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fluxo.versao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Fluxos</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> Novo Fluxo
        </button>
      </div>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Buscar fluxos..."
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
      ) : filteredFluxos.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">Nenhum fluxo encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFluxos.map((fluxo) => (
            <div key={fluxo.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{fluxo.nome}</h3>
                  <p className="text-sm text-gray-500">Versão: {fluxo.versao}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(fluxo)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(fluxo.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <Dialog.Title className="text-xl font-bold mb-4">
                {currentFluxo ? 'Editar Fluxo' : 'Novo Fluxo'}
              </Dialog.Title>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Versão</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.versao}
                    onChange={(e) => setFormData({ ...formData, versao: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Definição</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.definicao}
                    onChange={(e) => setFormData({ ...formData, definicao: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Fluxos;
