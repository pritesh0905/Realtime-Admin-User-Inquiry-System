export type UserRole = 'user' | 'admin' | 'supervisor';

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
}

export interface Query {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: 'pending' | 'read' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
  adminResponse?: string;
  adminId?: string;
}

export interface Message {
  id: string;
  queryId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}