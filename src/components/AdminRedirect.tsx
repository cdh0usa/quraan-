import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AdminRedirect: React.FC = () => {
  const adminUser = localStorage.getItem('adminUser');
  
  if (adminUser) {
    try {
      const user = JSON.parse(adminUser);
      if (user.isAuthenticated) {
        // إذا كان مسجل دخول، اتركه في نفس الصفحة
        return null;
      }
    } catch (error) {
      console.error('Error parsing admin user:', error);
      localStorage.removeItem('adminUser');
    }
  }
  
  // إذا لم يكن مسجل دخول، وجه إلى صفحة تسجيل الدخول
  return <Navigate to="/admin/login" replace />;
};

export default AdminRedirect; 