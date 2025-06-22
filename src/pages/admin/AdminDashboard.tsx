import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  MessageSquare, 
  Users, 
  BookMarked, 
  Settings,
  PlusCircle,
  Mic,
  BarChart3,
  Shield,
  LogOut,
  User
} from 'lucide-react';
import { getTableCount, testDatabaseConnection } from '../../services/supabase';
import { getAuthenticatedUser, logout } from '../../utils/auth';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    hadiths: 0,
    prophets: 0,
    adhkar: 0,
    reciters: 0,
  });

  const [loadingStats, setLoadingStats] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);

  // جلب معلومات المستخدم المسجل
  useEffect(() => {
    const user = getAuthenticatedUser();
    setAdminUser(user);
  }, []);

  // دالة تسجيل الخروج
  const handleLogout = () => {
    logout();
    toast.success('تم تسجيل الخروج بنجاح');
    navigate('/admin/login');
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const [hadiths, prophets, adhkar, reciters] = await Promise.all([
          getTableCount('hadiths'),
          getTableCount('prophet_stories'),
          getTableCount('adhkar'),
          getTableCount('reciters'),
        ]);

        setStats({ hadiths, prophets, adhkar, reciters });

        // اختبار الاتصال بقاعدة البيانات مرة واحدة عند الدخول للوحة التحكم
        const isConnected = await testDatabaseConnection();
        if (isConnected) {
          toast.success('✅ تم الاتصال بقاعدة البيانات بنجاح');
        } else {
          toast.error('⚠️ فشل الاتصال بقاعدة البيانات');
        }
      } catch (error) {
        console.error('خطأ في جلب الإحصائيات:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const adminSections = [
    {
      title: 'الأحاديث النبوية',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'إدارة الأحاديث النبوية الشريفة',
      link: '/admin/hadiths',
      color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    },
    {
      title: 'قصص الأنبياء',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'إدارة قصص الأنبياء والرسل',
      link: '/admin/prophets',
      color: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    },
    {
      title: 'الأذكار والأدعية',
      icon: <BookMarked className="w-6 h-6" />,
      description: 'إدارة أذكار الصباح والمساء والأدعية',
      link: '/admin/adhkar',
      color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
    },
    {
      title: 'قراء القرآن',
      icon: <Mic className="w-6 h-6" />,
      description: 'إدارة قراء القرآن الكريم والتلاوات',
      link: '/admin/reciters',
      color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'تعليم الأطفال',
      icon: <Users className="w-6 h-6" />,
      description: 'إدارة محتوى تعليم الأطفال',
      link: '/admin/children',
      color: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
    },
    {
      title: 'إعدادات الموقع',
      icon: <Settings className="w-6 h-6" />,
      description: 'إدارة إعدادات الموقع العامة',
      link: '/admin/settings',
      color: 'bg-gray-50 dark:bg-gray-700/30 text-gray-600 dark:text-gray-400'
    }
  ];

  const quickActions = [
    {
      title: 'إضافة حديث جديد',
      icon: <MessageSquare className="w-5 h-5" />,
      link: '/admin/hadiths',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'إضافة قصة نبي',
      icon: <BookOpen className="w-5 h-5" />,
      link: '/admin/prophets',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'إضافة ذكر جديد',
      icon: <BookMarked className="w-5 h-5" />,
      link: '/admin/adhkar',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'إضافة قارئ جديد',
      icon: <Mic className="w-5 h-5" />,
      link: '/admin/reciters',
      color: 'bg-emerald-500 hover:bg-emerald-600'
    }
  ];

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-lg p-8 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Shield className="w-10 h-10 ml-4" />
              <div>
                <h1 className="text-3xl font-bold font-amiri">
                  لوحة التحكم الإدارية
                </h1>
                <p className="text-emerald-100 text-lg font-noto-arabic">
                  إدارة شاملة لمحتوى الموقع الإسلامي
                </p>
              </div>
            </div>
            
            {/* معلومات المستخدم وزر الخروج */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <User className="w-5 h-5 ml-2" />
                <span className="text-sm font-medium">
                  {adminUser?.email || 'مدير النظام'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                title="تسجيل الخروج"
              >
                <LogOut className="w-5 h-5 ml-2" />
                <span className="text-sm font-medium">خروج</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center">
                <BarChart3 className="w-8 h-8 ml-3" />
                <div>
                  <p className="text-2xl font-bold">
                    {loadingStats ? '...' : stats.hadiths + stats.prophets + stats.adhkar + stats.reciters}
                  </p>
                  <p className="text-emerald-100 text-sm">إجمالي المحتوى</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 ml-3" />
                <div>
                  <p className="text-2xl font-bold">{loadingStats ? '...' : stats.reciters}</p>
                  <p className="text-emerald-100 text-sm">عدد القراء</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 ml-3" />
                <div>
                  <p className="text-2xl font-bold">{loadingStats ? '...' : stats.hadiths}</p>
                  <p className="text-emerald-100 text-sm">عدد الأحاديث</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-6 font-amiri">
          أقسام الإدارة الرئيسية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => (
            <Link
              key={section.title}
              to={section.link}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start">
                <div className={`p-3 rounded-lg ${section.color}`}>
                  {section.icon}
                </div>
                <div className="mr-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-amiri">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-6 font-amiri">
          إجراءات سريعة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.link}
              className={`${action.color} text-white p-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg`}
            >
              <div className="flex items-center justify-center mb-3">
                {action.icon}
              </div>
              <p className="text-center font-medium text-sm">
                {action.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-amiri">
          النشاط الأخير
        </h2>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full ml-3">
              <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                تم إضافة حديث جديد
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                منذ ساعتين
              </p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-full ml-3">
              <Mic className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                تم إضافة قارئ جديد
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                منذ 4 ساعات
              </p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full ml-3">
              <BookMarked className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                تم تحديث الأذكار
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                أمس
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;