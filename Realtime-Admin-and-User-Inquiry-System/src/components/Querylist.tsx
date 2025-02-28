import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from '../types';
import { MessageCircle, CheckCircle, Clock, Eye } from 'lucide-react';

interface QueryListProps {
  queries: Query[];
  userRole: 'user' | 'admin' | 'supervisor';
}

const QueryList: React.FC<QueryListProps> = ({ queries, userRole }) => {
  if (queries.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No queries found.</p>
      </div>
    );
  }

  const getStatusIcon = (status: Query['status']) => {
    switch (status) {
      case 'pending':
        return <Clock size={18} className="text-yellow-500" />;
      case 'read':
        return <Eye size={18} className="text-blue-500" />;
      case 'resolved':
        return <CheckCircle size={18} className="text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: Query['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'read':
        return 'Read by Admin';
      case 'resolved':
        return 'Resolved';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {queries.map((query) => (
          <li key={query.id} className="p-4 hover:bg-gray-50">
            <Link to={/${userRole}/query/${query.id}} className="block">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{query.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{query.description}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="mr-2">
                      {new Date(query.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      {getStatusIcon(query.status)}
                      <span className="ml-1">{getStatusText(query.status)}</span>
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <MessageCircle size={20} className="text-indigo-500" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryList;