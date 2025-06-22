import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setAuthStatus(authenticated);
    };

    checkAuth();
  }, []);

  // إظهار شاشة تحميل أثناء التحقق من الهوية
  if (authStatus === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحقق من الهوية...</p>
        </div>
      </div>
    );
  }

  // إعادة توجيه إلى صفحة تسجيل الدخول إذا لم يكن مسجل دخول
  if (!authStatus) {
    return <Navigate to="/admin/login" replace />;
  }

  // إظهار المحتوى المحمي
  return <>{children}</>;
};

export default ProtectedRoute; 