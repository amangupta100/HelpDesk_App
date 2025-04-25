// src/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;

