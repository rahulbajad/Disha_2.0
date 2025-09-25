import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { DataProvider } from './contexts/DataContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Colleges from './pages/Colleges';
import CollegeProfile from './pages/CollegeProfile';
import CareerGuidance from './pages/CareerGuidance';
import CareerQuiz from './pages/CareerQuiz';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <DataProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                } />
                <Route path="/*" element={
                  <>
                    <Navigation />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/colleges" element={<Colleges />} />
                      <Route path="/college/:id" element={<CollegeProfile />} />
                      <Route path="/career-guidance" element={<CareerGuidance />} />
                      <Route path="/career-quiz" element={<CareerQuiz />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                  </>
                } />
              </Routes>
            </div>
          </Router>
        </DataProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;