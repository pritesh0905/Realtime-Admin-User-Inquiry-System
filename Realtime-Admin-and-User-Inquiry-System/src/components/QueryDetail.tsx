import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useQueryStore } from '../store/queryStore';
import { MessageCircle, CheckCircle, Clock, Eye } from 'lucide-react';
import ChatBox from './ChatBox';

const QueryDetail: React.FC = () => {
  const { queryId } = useParams<{ queryId: string }>();
  const { currentUser } = useAuthStore();
  const { queries, updateQueryStatus } = useQueryStore();
  const [adminResponse, setAdminResponse] = useState('');
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  if (!queryId || !currentUser) {
    return <div>Invalid query or not authenticated</div>;
  }

  const query = queries.find((q) => q.id === queryId);

  if (!query) {
    return <div>Query not found</div>;
  }

  const isAdmin = currentUser.role === 'admin';
  const isSupervisor = currentUser.role === 'supervisor';
  const isUser = currentUser.role === 'user';

  const handleMarkAsRead = () => {
    if (isAdmin && query.status === 'pending') {
      updateQueryStatus(queryId, 'read');
    }
  };

  const handleResolve = () => {
    if (isAdmin && (query.status === 'pending' || query.status === 'read')) {
      if (!adminResponse.trim()) {
        alert('Please provide a response before resolving the query');
        return;
      }
      updateQueryStatus(queryId, 'resolved', adminResponse, currentUser.id);
    }
  };

  const getStatusBadge = () => {
    switch (query.status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock size={14} className="mr-1" />
            Pending
          </span>
        );
      case 'read':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Eye size={14} className="mr-1" />
            Read by Admin
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={14} className="mr-1" />
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-900">{query.title}</h2>
          {getStatusBadge()}
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Created on {new Date(query.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Description</h3>
          <p className="mt-2 text-gray-600">{query.description}</p>
        </div>
        
        {query.status === 'resolved' && query.adminResponse && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">Admin Response</h3>
            <p className="mt-2 text-gray-600">{query.adminResponse}</p>
          </div>
        )}
        
        {isAdmin && query.status !== 'resolved' && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Respond to Query</h3>
            <textarea
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              placeholder="Type your response here..."
            />
            <div className="mt-4 flex space-x-4">
              {query.status === 'pending' && (
                <button
                  onClick={handleMarkAsRead}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={handleResolve}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Resolve Query
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            &larr; Back
          </button>
          
          <button
            onClick={() => setShowChat(!showChat)}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <MessageCircle size={20} className="mr-2" />
            {showChat ? 'Hide Chat' : 'Open Chat'}
          </button>
        </div>
      </div>
      
      {showChat && (
        <div className="border-t border-gray-200 p-6">
          <ChatBox queryId={queryId} />
        </div>
      )}
    </div>
  );
};

export default QueryDetail;