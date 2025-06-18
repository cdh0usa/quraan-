import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, BookOpen } from 'lucide-react';
import Footer from '../components/Footer';

const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { path: '/', label: 'الرئيسية' },
    { path: '/quran', label: 'القرآن الكريم' },
    { path: '/audio-quran', label: 'المصحف المسموع' },
    { path: '/prophets-stories', label: 'قصص الأنبياء' },
    { path: '/hadith', label: 'الأحاديث الصحيحة' },
    { path: '/ruqyah', label: 'الرقية الشرعية' },
    { path: '/children-education', label: 'تعليم الأطفال' },
    { path: '/adhkar', label: 'الأذكار' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="w-8 h-8 text-emerald-700 dark:text-emerald-500" />
              <span className="mr-2 font-bold text-xl text-emerald-800 dark:text-emerald-400" style={{ fontFamily: 'Amiri, serif' }}>
                هنا نبدأ و في الجنة نلتقي
              </span>
            </Link>
            
            <div className="flex items-center">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button 
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <nav className="hidden lg:flex space-x-1 mr-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 mx-1 
                      ${location.pathname === item.path 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium text-right 
                    ${location.pathname === item.path 
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;