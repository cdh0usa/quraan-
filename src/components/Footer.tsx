import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-2" style={{ fontFamily: 'Amiri, serif' }}>
              هنا نبدأ و في الجنة نلتقي
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Noto Sans Arabic, sans-serif' }}>
              موقع إسلامي شامل للقرآن الكريم والأحاديث والأذكار
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1" style={{ fontFamily: 'Noto Sans Arabic, sans-serif' }}>
                تم إنشاؤه بكل
              </span>
              <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" />
              <span className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Noto Sans Arabic, sans-serif' }}>
                لخدمة الإسلام
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500" style={{ fontFamily: 'Noto Sans Arabic, sans-serif' }}>
              جميع الحقوق محفوظة &copy; {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;