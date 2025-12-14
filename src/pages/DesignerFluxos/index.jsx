import { useState } from 'react';
import { Plus, Trash2, Save, Move, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DesignerFluxos = () => {
  const [fluxo, setFluxo] = useState({
    nome: 'Novo Fluxo',
    passos: [
      { id: 'passo-1', nome: 'Início', tipo: 'inicio', ordem: 1 },
      { id: 'passo-2', nome: 'Processamento', tipo: 'processo', ordem: 2 },
      { id: 'passo-3', nome: 'Fim', tipo: 'fim', ordem: 3 },
    ],
  });

  const [novoPasso, setNovoPasso] = useState({ nome: '', tipo: 'processo' });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const novosPassos = Array.from(fluxo.passos);
    const [removido] = novosPassos.splice(result.source.index, 1);
    novosPassos.splice(result.destination.index, 0, removido);

    setFluxo({ ...fluxo, passos: novosPassos });
  };

  const adicionarPasso = () => {
    if (!novoPasso.nome.trim()) return;

    const id = `passo-${Date.now()}`;
    const ordem = fluxo.passos.length + 1;

    setFluxo({
      ...fluxo,
      passos: [...fluxo.passos, { id, ...novoPasso, ordem }],
    });

    setNovoPasso({ nome: '', tipo: 'processo' });
  };

  const removerPasso = (id) => {
    setFluxo({
      ...fluxo,
      passos: fluxo.passos.filter((passo) => passo.id !== id),
    });
  };

  const salvarFluxo = async () => {
    try {
      const response = await fetch('/api/fluxos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fluxo),
      });

      if (response.ok) {
        alert('Fluxo salvo com sucesso!');
      } else {
        alert('Erro ao salvar fluxo.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Designer de Fluxos</h1>
        <div className="flex gap-2">
          <button
            onClick={salvarFluxo}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Save size={16} /> Salvar Fluxo
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">Configurações do Fluxo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Fluxo</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fluxo.nome}
              onChange={(e) => setFluxo({ ...fluxo, nome: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Passos do Fluxo</h2>

        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Nome do passo"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={novoPasso.nome}
            onChange={(e) => setNovoPasso({ ...novoPasso, nome: e.target.value })}
          />
          <select
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={novoPasso.tipo}
            onChange={(e) => setNovoPasso({ ...novoPasso, tipo: e.target.value })}
          >
            <option value="processo">Processo</option>
            <option value="decisao">Decisão</option>
            <option value="inicio">Início</option>
            <option value="fim">Fim</option>
          </select>
          <button
            onClick={adicionarPasso}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} /> Adicionar
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="passos">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fluxo.passos.map((passo, index) => (
                  <Draggable key={passo.id} draggableId={passo.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="bg-gray-50 p-4 mb-2 rounded-lg border border-gray-200 flex justify-between items-center"
                      >
                        <div className="flex items-center gap-3">
                          <div {...provided.dragHandleProps} className="cursor-move">
                            <GripVertical size={16} className="text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{passo.nome}</p>
                            <p className="text-sm text-gray-500">Tipo: {passo.tipo}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removerPasso(passo.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DesignerFluxos;
