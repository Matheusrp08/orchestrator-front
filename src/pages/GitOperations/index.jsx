// src/pages/GitOperations/index.jsx (completo)
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GitOperationsList } from '../../components/git-operations/GitOperationsList';

const GitOperationsPage = () => {
  const { workspaceId } = useParams();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Operações Git</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <GitOperationsList workspaceId={workspaceId} />
      </div>
    </div>
  );
};

export default GitOperationsPage;
