import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useQueryStore } from '../store/queryStore';
import { PlusCircle, MessageSquare, CheckCircle } from 'lucide-react';
import QueryForm from './QueryForm';
import QueryList from './QueryList';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { getUserQueries, getAdminQueries, getAllQueries } = useQueryStore();
  const [activeTab, setActiveTab] = useState<'new' | 'pending' | 'resolved' | 'all'>('