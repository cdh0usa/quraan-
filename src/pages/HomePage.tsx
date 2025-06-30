import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Headphones, BookOpen, MessageSquare, Heart, Users, BookMarked } from 'lucide-react';
import SEO from '../components/SEO';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; link: string }> = ({ 
  icon, 
  title, 
  description, 
  link 
}) => {
  return (
    <Link 
      to={link} 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex flex-col items-center text-center"
    >
      <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-emerald-800 dark:text-emerald-400" style={{ fontFamily: 'Amiri, serif' }}>
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Noto Sans Arabic, sans-serif' }}>
        {description}
      </p>
    </Link>
  );
};

const HomePage: React.FC = () => {
  return (
    <>
      <SEO title="الموقع الإسلامي - الصفحة الرئيسية" description="موقع إسلامي شامل يقدم القرآن الكريم، الأحاديث النبوية، قصص الأنبياء، الرقية الشرعية، والمزيد من المحتوى الإسلامي الموثوق." />
      <div>
        {/* Hero Section */}
        <section className="relative mb-12 bg-gradient-to-b from-emerald-600 to-emerald-800 text-white rounded-lg overflow-hidden">
          <div className="absolute inset-0 opacity-10 pattern-islamic"></div>
          <div className="relative z-10 px-6 py-12 md:py-20 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Amiri, serif' }}>
              هنا نبدأ و في الجنة نلتقي
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-emerald-100" style={{ fontFamily: 'Noto Sans Arabic, sans-serif' }}>
              موقع إسلامي شامل يقدم القرآن الكريم، الأحاديث النبوية، قصص الأنبياء، الرقية الشرعية، والمزيد من المحتوى الإسلامي الموثوق.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/quran" 
                className="bg-white text-emerald-800 px-6 py-3 rounded-md font-medium hover:bg-emerald-50 transition-colors duration-300"
                style={{ fontFamily: 'Noto Sans Arabic, sans-serif' }}
              >
                تصفح القرآن الكريم
              </Link>
              <Link 
                to="/audio-quran" 
                className="bg-emerald-700 text-white px-6 py-3 rounded-md font-medium hover:bg-emerald-600 transition-colors duration-300 border border-emerald-500"
                style={{ fontFamily: 'Noto Sans Arabic, sans-serif' }}
              >
                استمع للقرآن
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-emerald-800 dark:text-emerald-400" style={{ fontFamily: 'Amiri, serif' }}>
            محتويات الموقع
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Book className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />} 
              title="القرآن الكريم" 
              description="قراءة القرآن الكريم كاملاً مع التفسير وترجمة المعاني" 
              link="/quran" 
            />
            <FeatureCard 
              icon={<Headphones className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />} 
              title="المصحف المسموع" 
              description="استمع إلى القرآن الكريم بأصوات كبار القراء مع إمكانية التحميل" 
              link="/audio-quran" 
            />
            <FeatureCard 
              icon={<BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />} 
              title="قصص الأنبياء" 
              description="قصص الأنبياء والرسل كاملة من القرآن الكريم والسنة النبوية" 
              link="/prophets-stories" 
            />
            <FeatureCard 
              icon={<MessageSquare className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />} 
              title="الأحاديث الصحيحة" 
              description="مجموعة من الأحاديث النبوية الصحيحة مصنفة حسب الموضوع" 
              link="/hadith" 
            />
            <FeatureCard 
              icon={<Heart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />} 
              title="الرقية الشرعية" 
              description="الرقية الشرعية الصحيحة من القرآن الكريم والسنة النبوية" 
              link="/ruqyah" 
            />
            <FeatureCard 
              icon={<Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />} 
              title="تعليم الأطفال" 
              description="تعليم الوضوء والصلاة للأطفال بطريقة مبسطة وسهلة" 
              link="/children-education" 
            />
            <FeatureCard 
              icon={<BookMarked className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />} 
              title="الأذكار" 
              description="أذكار الصباح والمساء وأذكار الصلاة وأذكار متنوعة" 
              link="/adhkar" 
            />
          </div>
        </section>

        {/* Quote Section */}
        <section className="mb-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl mb-4 text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Amiri, serif' }}>
              "وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ"
            </p>
            <footer className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Noto Sans Arabic, sans-serif' }}>
              سورة الذاريات - الآية 56
            </footer>
          </blockquote>
        </section>
      </div>
    </>
  );
};

export default HomePage;