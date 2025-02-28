import { create } from 'zustand';
import { Query, Message } from '../types';
import { mockQueries, mockMessages } from '../mockData';

interface QueryState {
  queries: Query[];
  messages: Message[];
  
  // Query actions
  createQuery: (query: Omit<Query, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Query;
  updateQueryStatus: (queryId: string, status: Query['status'], adminResponse?: string, adminId?: string) => void;
  getUserQueries: (userId: string) => Query[];
  getAdminQueries: () => Query[];
  getAllQueries: () => Query[];
  
  // Chat actions
  sendMessage: (queryId: string, senderId: string, content: string) => void;
  getQueryMessages: (queryId: string) => Message[];
  markMessagesAsRead: (queryId: string, userId: string) => void;
  hasUnreadMessages: (queryId: string, userId: string) => boolean;
}

export const useQueryStore = create<QueryState>((set, get) => ({
  queries: mockQueries,
  messages: mockMessages,
  
  createQuery: (queryData) => {
    const newQuery: Query = {
      id: query-${get().queries.length + 1},
      ...queryData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      queries: [...state.queries, newQuery],
    }));
    
    return newQuery;
  },
  
  updateQueryStatus: (queryId, status, adminResponse, adminId) => {
    set((state) => ({
      queries: state.queries.map((q) => 
        q.id === queryId 
          ? { 
              ...q, 
              status, 
              updatedAt: new Date(), 
              adminResponse: adminResponse || q.adminResponse,
              adminId: adminId || q.adminId
            } 
          : q
      ),
    }));
  },
  
  getUserQueries: (userId) => {
    return get().queries.filter((q) => q.userId === userId);
  },
  
  getAdminQueries: () => {
    return get().queries;
  },
  
  getAllQueries: () => {
    return get().queries;
  },
  
  sendMessage: (queryId, senderId, content) => {
    const newMessage: Message = {
      id: msg-${get().messages.length + 1},
      queryId,
      senderId,
      content,
      timestamp: new Date(),
      isRead: false,
    };
    
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
  
  getQueryMessages: (queryId) => {
    return get().messages.filter((m) => m.queryId === queryId);
  },
  
  markMessagesAsRead: (queryId, userId) => {
    set((state) => ({
      messages: state.messages.map((m) => 
        m.queryId === queryId && m.senderId !== userId 
          ? { ...m, isRead: true } 
          : m
      ),
    }));
  },
  
  hasUnreadMessages: (queryId, userId) => {
    return get().messages.some(
      (m) => m.queryId === queryId && m.senderId !== userId && !m.isRead
    );
  },
}));