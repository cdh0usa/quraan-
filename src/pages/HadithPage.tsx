import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Star, Share2, Copy, Filter, ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Hadith {
  id: number;
  text: string;
  source: string;
  narrator: string;
  category: string;
  book: string;
  number: string;
  grade: string;
  explanation?: string;
  benefits?: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const categories: Category[] = [
  { id: 'faith', name: 'الإيمان والعقيدة', description: 'أحاديث في أصول الإيمان وأركان الإسلام', icon: '☪️' },
  { id: 'prayer', name: 'الصلاة', description: 'أحاديث في فضل الصلاة وأحكامها', icon: '🕌' },
  { id: 'zakat', name: 'الزكاة', description: 'أحاديث في فضل الزكاة والصدقة', icon: '💰' },
  { id: 'fasting', name: 'الصيام', description: 'أحاديث في فضل الصيام وأحكامه', icon: '🌙' },
  { id: 'hajj', name: 'الحج', description: 'أحاديث في فضل الحج والعمرة', icon: '🕋' },
  { id: 'morals', name: 'الأخلاق والآداب', description: 'أحاديث في حسن الخلق والآداب الإسلامية', icon: '❤️' },
  { id: 'knowledge', name: 'العلم', description: 'أحاديث في فضل العلم والتعلم', icon: '📚' },
  { id: 'family', name: 'الأسرة', description: 'أحاديث في بر الوالدين والأسرة', icon: '👨‍👩‍👧‍👦' },
  { id: 'dua', name: 'الدعاء والذكر', description: 'أحاديث في فضل الدعاء والأذكار', icon: '🤲' },
  { id: 'paradise', name: 'الجنة والآخرة', description: 'أحاديث في وصف الجنة والآخرة', icon: '🌟' }
];

const hadiths: Hadith[] = [
  // أحاديث الإيمان والعقيدة
  {
    id: 1,
    text: 'عن عمر بن الخطاب رضي الله عنه قال: بينما نحن عند رسول الله صلى الله عليه وسلم ذات يوم إذ طلع علينا رجل شديد بياض الثياب شديد سواد الشعر لا يرى عليه أثر السفر ولا يعرفه منا أحد، حتى جلس إلى النبي صلى الله عليه وسلم فأسند ركبتيه إلى ركبتيه ووضع كفيه على فخذيه وقال: يا محمد أخبرني عن الإسلام. فقال رسول الله صلى الله عليه وسلم: الإسلام أن تشهد أن لا إله إلا الله وأن محمداً رسول الله وتقيم الصلاة وتؤتي الزكاة وتصوم رمضان وتحج البيت إن استطعت إليه سبيلاً.',
    source: 'صحيح مسلم',
    narrator: 'عمر بن الخطاب',
    category: 'faith',
    book: 'مسلم',
    number: '8',
    grade: 'صحيح',
    explanation: 'هذا حديث جبريل المشهور الذي بين فيه أركان الإسلام والإيمان والإحسان',
    benefits: ['بيان أركان الإسلام الخمسة', 'أهمية العلم والتعلم', 'آداب السؤال والجواب']
  },
  {
    id: 2,
    text: 'عن أبي هريرة رضي الله عنه أن رسول الله صلى الله عليه وسلم قال: الإيمان بضع وسبعون شعبة، فأفضلها قول لا إله إلا الله، وأدناها إماطة الأذى عن الطريق، والحياء شعبة من الإيمان.',
    source: 'صحيح مسلم',
    narrator: 'أبو هريرة',
    category: 'faith',
    book: 'مسلم',
    number: '35',
    grade: 'صحيح',
    explanation: 'بيان أن الإيمان شعب كثيرة، منها القولية والعملية والقلبية',
    benefits: ['شمولية الإيمان لجميع جوانب الحياة', 'أهمية الحياء في الإسلام', 'التدرج في الأعمال الصالحة']
  },
  
  // أحاديث الصلاة
  {
    id: 3,
    text: 'عن أبي هريرة رضي الله عنه أن رسول الله صلى الله عليه وسلم قال: أول ما يحاسب عليه العبد يوم القيامة من عمله صلاته، فإن صلحت فقد أفلح وأنجح، وإن فسدت فقد خاب وخسر.',
    source: 'سنن الترمذي',
    narrator: 'أبو هريرة',
    category: 'prayer',
    book: 'الترمذي',
    number: '413',
    grade: 'حسن',
    explanation: 'بيان عظم شأن الصلاة وأنها أول ما يحاسب عليه العبد',
    benefits: ['أهمية الصلاة في الإسلام', 'الصلاة مقياس صلاح الأعمال', 'ضرورة المحافظة على الصلاة']
  },
  {
    id: 4,
    text: 'عن أبي موسى الأشعري رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: من صلى البردين دخل الجنة.',
    source: 'صحيح البخاري',
    narrator: 'أبو موسى الأشعري',
    category: 'prayer',
    book: 'البخاري',
    number: '574',
    grade: 'صحيح',
    explanation: 'البردان هما صلاة الفجر والعصر، وفي هذا بيان فضلهما العظيم',
    benefits: ['فضل صلاة الفجر والعصر', 'الجنة جزاء المحافظين على الصلاة', 'أهمية المداومة على العبادة']
  },

  // أحاديث الزكاة
  {
    id: 5,
    text: 'عن أبي هريرة رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: ما من يوم يصبح العباد فيه إلا ملكان ينزلان، فيقول أحدهما: اللهم أعط منفقاً خلفاً، ويقول الآخر: اللهم أعط ممسكاً تلفاً.',
    source: 'صحيح البخاري',
    narrator: 'أبو هريرة',
    category: 'zakat',
    book: 'البخاري',
    number: '1442',
    grade: 'صحيح',
    explanation: 'بيان البركة في الإنفاق في سبيل الله وأن الله يخلف على المنفق',
    benefits: ['البركة في الإنفاق', 'دعاء الملائكة للمنفقين', 'عاقبة البخل والشح']
  },

  // أحاديث الصيام
  {
    id: 6,
    text: 'عن أبي هريرة رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: قال الله عز وجل: كل عمل ابن آدم له إلا الصيام فإنه لي وأنا أجزي به.',
    source: 'صحيح البخاري',
    narrator: 'أبو هريرة',
    category: 'fasting',
    book: 'البخاري',
    number: '1904',
    grade: 'صحيح',
    explanation: 'بيان عظم فضل الصيام وأن الله تولى جزاءه بنفسه',
    benefits: ['عظم فضل الصيام', 'الصيام عبادة خاصة بالله', 'الأجر العظيم للصائمين']
  },

  // أحاديث الأخلاق
  {
    id: 7,
    text: 'عن أبي هريرة رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: إنما بعثت لأتمم مكارم الأخلاق.',
    source: 'الأدب المفرد للبخاري',
    narrator: 'أبو هريرة',
    category: 'morals',
    book: 'الأدب المفرد',
    number: '273',
    grade: 'حسن',
    explanation: 'بيان أن مقصد الرسالة المحمدية إتمام مكارم الأخلاق',
    benefits: ['أهمية الأخلاق في الإسلام', 'الهدف الأسمى للرسالة المحمدية', 'ضرورة التحلي بالأخلاق الحسنة']
  },
  {
    id: 8,
    text: 'عن عائشة رضي الله عنها قالت: ما خُيِّر رسول الله صلى الله عليه وسلم بين أمرين قط إلا أخذ أيسرهما ما لم يكن إثماً، فإن كان إثماً كان أبعد الناس منه.',
    source: 'صحيح البخاري',
    narrator: 'عائشة',
    category: 'morals',
    book: 'البخاري',
    number: '3560',
    grade: 'صحيح',
    explanation: 'بيان خلق النبي صلى الله عليه وسلم في اختيار الأيسر والابتعاد عن الإثم',
    benefits: ['اختيار التيسير على الناس', 'الابتعاد عن المحرمات', 'حسن خلق النبي صلى الله عليه وسلم']
  },

  // أحاديث العلم
  {
    id: 9,
    text: 'عن أبي هريرة رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: من سلك طريقاً يلتمس فيه علماً سهل الله له به طريقاً إلى الجنة.',
    source: 'صحيح مسلم',
    narrator: 'أبو هريرة',
    category: 'knowledge',
    book: 'مسلم',
    number: '2699',
    grade: 'صحيح',
    explanation: 'بيان فضل طلب العلم وأن الله يسهل لطالب العلم طريق الجنة',
    benefits: ['فضل طلب العلم', 'العلم طريق إلى الجنة', 'تسهيل الله لطالب العلم']
  },

  // أحاديث الأسرة
  {
    id: 10,
    text: 'عن أبي هريرة رضي الله عنه قال: جاء رجل إلى رسول الله صلى الله عليه وسلم فقال: يا رسول الله من أحق الناس بحسن صحابتي؟ قال: أمك. قال: ثم من؟ قال: ثم أمك. قال: ثم من؟ قال: ثم أمك. قال: ثم من؟ قال: ثم أبوك.',
    source: 'صحيح البخاري',
    narrator: 'أبو هريرة',
    category: 'family',
    book: 'البخاري',
    number: '5971',
    grade: 'صحيح',
    explanation: 'بيان عظم حق الأم وأولويتها في البر والإحسان',
    benefits: ['عظم حق الوالدين', 'أولوية الأم في البر', 'أهمية حسن الصحبة للوالدين']
  }
];

const HadithPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHadiths, setFilteredHadiths] = useState<Hadith[]>(hadiths);
  const [favoriteHadiths, setFavoriteHadiths] = useState<number[]>([]);
  const [expandedHadith, setExpandedHadith] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteHadiths');
    if (savedFavorites) {
      setFavoriteHadiths(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    let filtered = hadiths;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(hadith => hadith.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(hadith => 
        hadith.text.includes(searchQuery) ||
        hadith.narrator.includes(searchQuery) ||
        hadith.source.includes(searchQuery)
      );
    }

    setFilteredHadiths(filtered);
  }, [selectedCategory, searchQuery]);

  const toggleFavorite = (hadithId: number) => {
    const newFavorites = favoriteHadiths.includes(hadithId)
      ? favoriteHadiths.filter(id => id !== hadithId)
      : [...favoriteHadiths, hadithId];
    
    setFavoriteHadiths(newFavorites);
    localStorage.setItem('favoriteHadiths', JSON.stringify(newFavorites));
    
    toast.success(
      favoriteHadiths.includes(hadithId) 
        ? 'تم حذف الحديث من المفضلة' 
        : 'تم إضافة الحديث للمفضلة'
    );
  };

  const copyHadith = (hadith: Hadith) => {
    const text = `${hadith.text}\n\n📚 المصدر: ${hadith.source}\n👤 الراوي: ${hadith.narrator}\n📖 رقم الحديث: ${hadith.number}`;
    navigator.clipboard.writeText(text);
    toast.success('تم نسخ الحديث');
  };

  const shareHadith = (hadith: Hadith) => {
    if (navigator.share) {
      navigator.share({
        title: `حديث شريف - ${hadith.narrator}`,
        text: hadith.text,
        url: window.location.href
      });
    } else {
      copyHadith(hadith);
    }
  };

  const speakHadith = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
      toast.success('جاري تشغيل الحديث صوتياً');
    } else {
      toast.error('المتصفح لا يدعم التشغيل الصوتي');
    }
  };

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 font-amiri flex items-center">
          <BookOpen className="w-10 h-10 ml-3" />
          الأحاديث النبوية الشريفة
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-noto-arabic">
          مجموعة مختارة من الأحاديث الصحيحة من كتب السنة المعتبرة، مرتبة حسب الموضوعات
        </p>
      </div>

      {/* البحث والفلاتر */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث في الأحاديث..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
              />
              <Search className="absolute top-4 left-4 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="lg:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-6 py-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors font-medium"
            >
              <Filter className="w-5 h-5 ml-2" />
              الفئات
              {showFilters ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`p-3 rounded-lg text-center transition-colors font-medium ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">📚</div>
                <div className="text-sm">جميع الأحاديث</div>
              </button>
              
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-3 rounded-lg text-center transition-colors font-medium ${
                    selectedCategory === category.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{category.icon}</div>
                  <div className="text-sm">{category.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* إحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-700">
          <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 mb-2">
            إجمالي الأحاديث
          </h3>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-500">
            {hadiths.length}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-400 mb-2">
            المفضلة
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-500">
            {favoriteHadiths.length}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
          <h3 className="text-lg font-bold text-orange-800 dark:text-orange-400 mb-2">
            الفئات
          </h3>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-500">
            {categories.length}
          </p>
        </div>
      </div>

      {/* قائمة الأحاديث */}
      <div className="space-y-6">
        {filteredHadiths.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              لا توجد أحاديث مطابقة لبحثك
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              جرب البحث بكلمات أخرى أو اختر فئة أخرى
            </p>
          </div>
        ) : (
          filteredHadiths.map(hadith => (
            <div 
              key={hadith.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">
                        {categories.find(c => c.id === hadith.category)?.icon || '📖'}
                      </span>
                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                        {categories.find(c => c.id === hadith.category)?.name}
                      </span>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        hadith.grade === 'صحيح' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }`}>
                        {hadith.grade}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(hadith.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        favoriteHadiths.includes(hadith.id)
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      title="إضافة للمفضلة"
                    >
                      <Star className={`w-5 h-5 ${favoriteHadiths.includes(hadith.id) ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button
                      onClick={() => speakHadith(hadith.text)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="تشغيل صوتي"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => copyHadith(hadith)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="نسخ الحديث"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => shareHadith(hadith)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="مشاركة الحديث"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-900 dark:text-gray-100 leading-relaxed font-noto-arabic text-lg mb-6">
                    {hadith.text}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <BookOpen className="w-4 h-4 ml-2" />
                    <span className="font-medium">المصدر:</span>
                    <span className="mr-2">{hadith.source}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="font-medium">الراوي:</span>
                    <span className="mr-2">{hadith.narrator}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="font-medium">رقم الحديث:</span>
                    <span className="mr-2">{hadith.number}</span>
                  </div>
                </div>

                {(hadith.explanation || hadith.benefits) && (
                  <div className="mt-4">
                    <button
                      onClick={() => setExpandedHadith(expandedHadith === hadith.id ? null : hadith.id)}
                      className="flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors"
                    >
                      <span>عرض التفاصيل والفوائد</span>
                      {expandedHadith === hadith.id ? 
                        <ChevronUp className="w-4 h-4 mr-2" /> : 
                        <ChevronDown className="w-4 h-4 mr-2" />
                      }
                    </button>

                    {expandedHadith === hadith.id && (
                      <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
                        {hadith.explanation && (
                          <div className="mb-4">
                            <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2">الشرح:</h4>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {hadith.explanation}
                            </p>
                          </div>
                        )}
                        
                        {hadith.benefits && hadith.benefits.length > 0 && (
                          <div>
                            <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2">الفوائد:</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                              {hadith.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HadithPage;