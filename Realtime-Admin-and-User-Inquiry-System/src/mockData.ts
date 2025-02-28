import { User, Query, Message } from './types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'user1',
    password: 'password',
    email: 'user1@example.com',
    fullName: 'John Doe',
    phone: '1234567890',
    role: 'user',
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'admin-1',
    username: 'admin1',
    password: 'password',
    email: 'admin1@example.com',
    fullName: 'Admin User',
    phone: '0987654321',
    role: 'admin',
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'supervisor-1',
    username: 'supervisor1',
    password: 'password',
    email: 'supervisor1@example.com',
    fullName: 'Supervisor User',
    phone: '1122334455',
    role: 'supervisor',
    createdAt: new Date('2023-01-01'),
  },
];

export const mockQueries: Query[] = [
  {
    id: 'query-1',
    userId: 'user-1',
    title: 'Technical Issue with Login',
    description: 'I am unable to login to my account after changing my password.',
    status: 'pending',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-06-15'),
  },
  {
    id: 'query-2',
    userId: 'user-1',
    title: 'Billing Question',
    description: 'I was charged twice for my last subscription payment.',
    status: 'read',
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-11'),
  },
  {
    id: 'query-3',
    userId: 'user-1',
    title: 'Feature Request',
    description: 'Could you add dark mode to the application?',
    status: 'resolved',
    createdAt: new Date('2023-05-20'),
    updatedAt: new Date('2023-05-25'),
    adminResponse: 'Thank you for your suggestion. We have added dark mode to our roadmap.',
    adminId: 'admin-1',
  },
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    queryId: 'query-1',
    senderId: 'user-1',
    content: 'Hi, I need help with my login issue.',
    timestamp: new Date('2023-06-15T10:00:00'),
    isRead: true,
  },
  {
    id: 'msg-2',
    queryId: 'query-1',
    senderId: 'admin-1',
    content: 'Hello, I\'m here to help. Could you provide more details?',
    timestamp: new Date('2023-06-15T10:05:00'),
    isRead: true,
  },
  {
    id: 'msg-3',
    queryId: 'query-1',
    senderId: 'user-1',
    content: 'I changed my password yesterday and now I can\'t login.',
    timestamp: new Date('2023-06-15T10:10:00'),
    isRead: false,
  },
];