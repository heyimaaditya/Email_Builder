

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow'; 
import FlowBuilder from './components/FlowBuilder';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import useAuth from './hooks/useAuth';


const ProtectedRoute = ({ children }) => { 
  const { isAuthenticated, checkAuth } = useAuth();

   useEffect(() => {
        checkAuth();
   }, [checkAuth]);


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>; 
};


function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
             <Link to="/" style={{ marginRight: '10px' }}>Flow Builder</Link>
          </div>
          <div>
          {isAuthenticated ? (
             <>
                <span style={{ marginRight: '10px' }}>Welcome!</span>
                <button onClick={logout}>Logout</button>
             </>
           ) : (
             <>
               <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
               <Link to="/register">Register</Link>
             </>
           )}
           </div>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ReactFlowProvider> {/* Wrap FlowBuilder with Provider */}
                   <FlowBuilder />
                </ReactFlowProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

