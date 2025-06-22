// دوال مساعدة للمصادقة

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  isAuthenticated: boolean;
}

// التحقق من حالة تسجيل الدخول
export const isAuthenticated = (): boolean => {
  const adminUser = localStorage.getItem('adminUser');
  if (!adminUser) return false;
  
  try {
    const user: AdminUser = JSON.parse(adminUser);
    return user.isAuthenticated === true;
  } catch (error) {
    console.error('Error parsing admin user:', error);
    localStorage.removeItem('adminUser');
    return false;
  }
};

// الحصول على بيانات المستخدم المسجل
export const getAuthenticatedUser = (): AdminUser | null => {
  const adminUser = localStorage.getItem('adminUser');
  if (!adminUser) return null;
  
  try {
    const user: AdminUser = JSON.parse(adminUser);
    return user.isAuthenticated ? user : null;
  } catch (error) {
    console.error('Error parsing admin user:', error);
    localStorage.removeItem('adminUser');
    return null;
  }
};

// تسجيل الخروج
export const logout = (): void => {
  localStorage.removeItem('adminUser');
};

// تسجيل الدخول
export const login = (userData: Omit<AdminUser, 'isAuthenticated'>): void => {
  const user: AdminUser = {
    ...userData,
    isAuthenticated: true
  };
  localStorage.setItem('adminUser', JSON.stringify(user));
}; 