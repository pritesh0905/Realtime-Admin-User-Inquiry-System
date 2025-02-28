
import Navbar from './components/ChatBox'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
    <Navbar/>
    <Login/>
    <Register/>
    <Home/>
    import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import QueryDetail from './components/QueryDetail';
import UserProfile from './components/UserProfile';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { HelpCircle, User, Shield } from 'lucide-react';

function App() {
  const { currentUser, isAuthenticated } = useAuthStore();

  // Protected route component
  const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
    if (!isAuthenticated || !currentUser || !allowedRoles.includes(currentUser.role)) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <Routes>
        {/* Home/Login Selection Page */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to={/${currentUser?.role}/dashboard} replace />
            ) : (
              <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full space-y-8">
                  <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Query Management System</h1>
                    <p className="mt-2 text-gray-600">Choose your login type or register as a new user</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                      <User size={48} className="mx-auto text-indigo-600 mb-4" />
                      <h2 className="text-xl font-bold text-gray-900 mb-2">User</h2>
                      <p className="text-gray-600 mb-4">Submit and track your queries</p>
                      <a 
                        href="/user/login" 
                        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        Login as User
                      </a>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                      <Shield size={48} className="mx-auto text-indigo-600 mb-4" />
                      <h2 className="text-xl font-bold text-gray-900 mb-2">Admin</h2>
                      <p className="text-gray-600 mb-4">Manage and respond to queries</p>
                      <a 
                        href="/admin/login" 
                        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        Login as Admin
                      </a>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                      <HelpCircle size={48} className="mx-auto text-indigo-600 mb-4" />
                      <h2 className="text-xl font-bold text-gray-900 mb-2">New User?</h2>
                      <p className="text-gray-600 mb-4">Create a new account</p>
                      <a 
                        href="/register" 
                        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        Register
                      </a>
                    </div>
                  </div>
                  
                  <div className="text-center mt-4">
                    <a 
                      href="/supervisor/login" 
                      className="text-indigo-600 hover:text-indigo-800 text-sm"
                    >
                      Login as Supervisor
                    </a>
                  </div>
                </div>
              </div>
            )
          } 
        />

        {/* Login Routes */}
        <Route path="/user/login" element={<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"><LoginForm role="user" /></div>} />
        <Route path="/admin/login" element={<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"><LoginForm role="admin" /></div>} />
        <Route path="/supervisor/login" element={<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"><LoginForm role="supervisor" /></div>} />
        <Route path="/register" element={<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"><RegisterForm /></div>} />

        {/* Protected Routes */}
        <Route path="/" element={<Layout />}>
          {/* User Routes */}
          <Route 
            path="user/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="user/query/:queryId" 
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <QueryDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="user/profile" 
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserProfile />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="admin/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="admin/query/:queryId" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <QueryDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="admin/profile" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserProfile />
              </ProtectedRoute>
            } 
          />

          {/* Supervisor Routes */}
          <Route 
            path="supervisor/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['supervisor']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="supervisor/query/:queryId" 
            element={
              <ProtectedRoute allowedRoles={['supervisor']}>
                <QueryDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="supervisor/profile" 
            element={
              <ProtectedRoute allowedRoles={['supervisor']}>
                <UserProfile />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;


    </div>
  )
}

export default App