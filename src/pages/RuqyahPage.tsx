import React, { useState } from 'react';
import { Shield, Play, Pause, Volume2, Copy, Heart, BookOpen, Star } from 'lucide-react';
import toast from 'react-hot-toast';

interface RuqyahItem {
  id: string;
  title: string;
  arabic: string;
  transliteration?: string;
  translation: string;
  source: string;
  category: 'quran' | 'dua' | 'hadith';
  benefits: string[];
  audioUrl?: string;
}

interface RuqyahCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: RuqyahItem[];
}

const ruqyahCategories: RuqyahCategory[] = [
  {
    id: 'ayat_ruqyah',
    name: 'آيات الرقية الأساسية',
    description: 'الآيات الأساسية للرقية الشرعية من القرآن الكريم',
    icon: '📖',
    items: [
      {
        id: 'fatiha',
        title: 'سورة الفاتحة',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ * الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ * الرَّحْمَٰنِ الرَّحِيمِ * مَالِكِ يَوْمِ الدِّينِ * إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ * اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ * صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        translation: 'بسم الله الرحمن الرحيم، الحمد لله رب العالمين، الرحمن الرحيم، مالك يوم الدين، إياك نعبد وإياك نستعين، اهدنا الصراط المستقيم، صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين',
        source: 'سورة الفاتحة',
        category: 'quran',
        benefits: ['أم الكتاب وفاتحة القرآن', 'رقية شاملة لكل الأمراض', 'تقرأ في كل علاج']
      },
      {
        id: 'ayat_kursi',
        title: 'آية الكرسي',
        arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        translation: 'الله لا إله إلا هو الحي القيوم، لا تأخذه سنة ولا نوم، له ما في السماوات وما في الأرض، من ذا الذي يشفع عنده إلا بإذنه، يعلم ما بين أيديهم وما خلفهم، ولا يحيطون بشيء من علمه إلا بما شاء، وسع كرسيه السماوات والأرض، ولا يئوده حفظهما، وهو العلي العظيم',
        source: 'سورة البقرة: 255',
        category: 'quran',
        benefits: ['أعظم آية في القرآن', 'حفظ من الشياطين', 'قراءتها تطرد الشيطان من البيت']
      },
      {
        id: 'ikhlas',
        title: 'سورة الإخلاص',
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ * اللَّهُ الصَّمَدُ * لَمْ يَلِدْ وَلَمْ يُولَدْ * وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
        translation: 'قل هو الله أحد، الله الصمد، لم يلد ولم يولد، ولم يكن له كفوا أحد',
        source: 'سورة الإخلاص',
        category: 'quran',
        benefits: ['تعدل ثلث القرآن', 'تطهر القلب من الشرك', 'من المعوذات الثلاث']
      },
      {
        id: 'falaq',
        title: 'سورة الفلق',
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ * مِنْ شَرِّ مَا خَلَقَ * وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ * وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ * وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        translation: 'قل أعوذ برب الفلق، من شر ما خلق، ومن شر غاسق إذا وقب، ومن شر النفاثات في العقد، ومن شر حاسد إذا حسد',
        source: 'سورة الفلق',
        category: 'quran',
        benefits: ['الاستعاذة من السحر', 'الحماية من الحسد', 'من المعوذتين']
      },
      {
        id: 'nas',
        title: 'سورة الناس',
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ * مَلِكِ النَّاسِ * إِلَٰهِ النَّاسِ * مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ * الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ * مِنَ الْجِنَّةِ وَالنَّاسِ',
        translation: 'قل أعوذ برب الناس، ملك الناس، إله الناس، من شر الوسواس الخناس، الذي يوسوس في صدور الناس، من الجنة والناس',
        source: 'سورة الناس',
        category: 'quran',
        benefits: ['الحماية من وساوس الشياطين', 'علاج الوسواس القهري', 'من المعوذتين']
      }
    ]
  },
  {
    id: 'ayat_sihr',
    name: 'آيات إبطال السحر',
    description: 'آيات قرآنية خاصة لعلاج السحر وإبطاله',
    icon: '⚡',
    items: [
      {
        id: 'yunus_81',
        title: 'آية إبطال السحر',
        arabic: 'وَقَالَ مُوسَىٰ مَا جِئْتُمْ بِهِ السِّحْرُ ۖ إِنَّ اللَّهَ سَيُبْطِلُهُ ۖ إِنَّ اللَّهَ لَا يُصْلِحُ عَمَلَ الْمُفْسِدِينَ',
        translation: 'وقال موسى ما جئتم به السحر، إن الله سيبطله، إن الله لا يصلح عمل المفسدين',
        source: 'سورة يونس: 81',
        category: 'quran',
        benefits: ['إبطال السحر', 'إظهار بطلان عمل السحرة', 'تأكيد قدرة الله على إبطال السحر']
      },
      {
        id: 'aaraf_117',
        title: 'آية ابتلاع السحر',
        arabic: 'وَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنْ أَلْقِ عَصَاكَ ۖ فَإِذَا هِيَ تَلْقَفُ مَا يَأْفِكُونَ',
        translation: 'وأوحينا إلى موسى أن ألق عصاك فإذا هي تلقف ما يأفكون',
        source: 'سورة الأعراف: 117',
        category: 'quran',
        benefits: ['إبطال السحر بقدرة الله', 'الثقة في قدرة الله', 'زوال أثر السحر']
      },
      {
        id: 'taha_69',
        title: 'آية فلاح الساحر',
        arabic: 'وَأَلْقِ مَا فِي يَمِينِكَ تَلْقَفْ مَا صَنَعُوا ۖ إِنَّمَا صَنَعُوا كَيْدُ سَاحِرٍ ۖ وَلَا يُفْلِحُ السَّاحِرُ حَيْثُ أَتَىٰ',
        translation: 'وألق ما في يمينك تلقف ما صنعوا، إنما صنعوا كيد ساحر، ولا يفلح الساحر حيث أتى',
        source: 'سورة طه: 69',
        category: 'quran',
        benefits: ['بيان أن السحر كيد باطل', 'أن الساحر لا يفلح أبداً', 'تقوية يقين المصاب']
      }
    ]
  },
  {
    id: 'duas_protection',
    name: 'أدعية الحماية',
    description: 'أدعية مأثورة من السنة للحماية والاستعاذة',
    icon: '🤲',
    items: [
      {
        id: 'dua_protection_1',
        title: 'دعاء الحماية الشامل',
        arabic: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        transliteration: 'A\'ūdhu bi-kalimāti l-lāhi t-tāmmāti min sharri mā khalaq',
        translation: 'أعوذ بكلمات الله التامات من شر ما خلق',
        source: 'صحيح مسلم',
        category: 'dua',
        benefits: ['حماية شاملة من كل شر', 'يُقال ثلاث مرات صباحاً ومساءً', 'يحمي من شر كل مخلوق']
      },
      {
        id: 'dua_protection_2',
        title: 'دعاء الاستعاذة الكامل',
        arabic: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّةِ مِنْ غَضَبِهِ وَعِقَابِهِ، وَشَرِّ عِبَادِهِ، وَمِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ',
        translation: 'أعوذ بكلمات الله التامة من غضبه وعقابه، وشر عباده، ومن همزات الشياطين وأن يحضرون',
        source: 'سنن أبي داود',
        category: 'dua',
        benefits: ['الاستعاذة من غضب الله', 'الحماية من شر العباد', 'منع حضور الشياطين']
      },
      {
        id: 'dua_morning',
        title: 'دعاء الصباح',
        arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
        translation: 'اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور',
        source: 'سنن الترمذي',
        category: 'dua',
        benefits: ['التوكل على الله في كل الأحوال', 'الاعتراف بالافتقار إلى الله', 'حماية اليوم كله']
      }
    ]
  },
  {
    id: 'treatment_methods',
    name: 'طرق العلاج',
    description: 'الطرق المشروعة في الرقية والعلاج',
    icon: '💧',
    items: [
      {
        id: 'water_treatment',
        title: 'الرقية بالماء',
        arabic: 'يُقرأ على الماء آيات الرقية والأدعية المأثورة، ثم يشرب منه المريض ويغتسل بالباقي',
        translation: 'طريقة مشروعة ثبتت في السنة لعلاج السحر والحسد والمس',
        source: 'السنة النبوية',
        category: 'hadith',
        benefits: ['طريقة مجربة وفعالة', 'ثابتة في السنة', 'آمنة وبلا أضرار جانبية']
      },
      {
        id: 'oil_treatment',
        title: 'الرقية بالزيت',
        arabic: 'يُقرأ على زيت الزيتون أو زيت الحبة السوداء آيات الرقية، ثم يُدهن به المريض',
        translation: 'استخدام الزيت المقروء عليه في الدهان والتدليك',
        source: 'العلماء المعاصرون',
        category: 'hadith',
        benefits: ['مفيد للأمراض الجلدية', 'يخفف الآلام', 'بركة الزيت والقراءة']
      }
    ]
  }
];

const RuqyahPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(ruqyahCategories[0]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const playAudio = (item: RuqyahItem) => {
    if ('speechSynthesis' in window) {
      if (playingId === item.id) {
        speechSynthesis.cancel();
        setPlayingId(null);
        return;
      }
      
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.arabic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.6;
      utterance.onend = () => setPlayingId(null);
      speechSynthesis.speak(utterance);
      setPlayingId(item.id);
      toast.success('جاري تشغيل الآية صوتياً');
    } else {
      toast.error('المتصفح لا يدعم التشغيل الصوتي');
    }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('تم نسخ النص');
  };

  const toggleFavorite = (itemId: string) => {
    const newFavorites = favorites.includes(itemId)
      ? favorites.filter(id => id !== itemId)
      : [...favorites, itemId];
    setFavorites(newFavorites);
    localStorage.setItem('ruqyahFavorites', JSON.stringify(newFavorites));
    toast.success(
      favorites.includes(itemId) 
        ? 'تم حذف من المفضلة' 
        : 'تم إضافة للمفضلة'
    );
  };

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 font-amiri flex items-center">
          <Shield className="w-10 h-10 ml-3" />
          الرقية الشرعية
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-noto-arabic">
          آيات وأدعية الرقية الشرعية من القرآن الكريم والسنة النبوية لعلاج السحر والحسد والمس
        </p>
      </div>

      {/* تحذير مهم */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6 mb-8">
        <div className="flex items-start">
          <Shield className="w-6 h-6 text-yellow-600 dark:text-yellow-400 ml-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-400 mb-2">
              تنبيهات مهمة
            </h3>
            <ul className="text-yellow-700 dark:text-yellow-300 space-y-2 text-sm">
              <li>• الرقية الشرعية علاج بإذن الله، وليست علاجاً مضموناً بذاتها</li>
              <li>• يجب الأخذ بالأسباب الطبية إلى جانب الرقية</li>
              <li>• احذر من الدجالين والمشعوذين الذين يدّعون العلاج</li>
              <li>• الرقية تكون بالقرآن والأدعية المأثورة فقط</li>
              <li>• لا تشرك مع الله أحداً في الدعاء والعلاج</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* القائمة الجانبية */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 border-b border-emerald-100 dark:border-emerald-900/50">
              <h2 className="font-bold text-lg text-emerald-800 dark:text-emerald-400 font-amiri">
                تصنيفات الرقية
              </h2>
            </div>
            <div className="p-2">
              {ruqyahCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-right p-4 rounded-lg mb-2 transition-colors ${
                    selectedCategory.id === category.id
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl ml-3">{category.icon}</span>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {category.items.length} عنصر
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/30 border-b border-emerald-100 dark:border-emerald-900/50">
              <div className="flex items-center mb-2">
                <span className="text-3xl ml-4">{selectedCategory.icon}</span>
                <h2 className="font-bold text-xl text-emerald-800 dark:text-emerald-400 font-amiri">
                  {selectedCategory.name}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedCategory.description}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {selectedCategory.items.map((item) => (
              <div 
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 font-amiri mb-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          item.category === 'quran' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : item.category === 'dua'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                        }`}>
                          {item.category === 'quran' ? 'قرآن' : item.category === 'dua' ? 'دعاء' : 'حديث'}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.source}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          favorites.includes(item.id)
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        title="إضافة للمفضلة"
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        onClick={() => playAudio(item)}
                        className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
                        title="تشغيل صوتي"
                      >
                        {playingId === item.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      
                      <button
                        onClick={() => copyText(item.arabic)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="نسخ النص"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* النص العربي */}
                  <div className="mb-6">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg border border-emerald-200 dark:border-emerald-700">
                      <p className="text-gray-900 dark:text-gray-100 text-2xl leading-relaxed font-amiri text-center">
                        {item.arabic}
                      </p>
                    </div>
                  </div>

                  {/* النقحرة إن وجدت */}
                  {item.transliteration && (
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">النقحرة:</h4>
                      <p className="text-gray-600 dark:text-gray-400 italic">
                        {item.transliteration}
                      </p>
                    </div>
                  )}

                  {/* الترجمة */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">المعنى:</h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.translation}
                    </p>
                  </div>

                  {/* الفوائد */}
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">الفوائد:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <Star className="w-4 h-4 text-blue-600 dark:text-blue-400 ml-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* إرشادات الاستخدام */}
      <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-4 font-amiri">
          إرشادات الاستخدام
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-700 dark:text-blue-300">
          <div>
            <h4 className="font-bold mb-2">قبل الرقية:</h4>
            <ul className="space-y-1">
              <li>• تطهر وتوضأ</li>
              <li>• استقبل القبلة إن أمكن</li>
              <li>• ادع الله بصدق وخشوع</li>
              <li>• تذكر أن الشفاء بيد الله</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">أثناء الرقية:</h4>
            <ul className="space-y-1">
              <li>• اقرأ بصوت واضح</li>
              <li>• ضع يدك على مكان الألم</li>
              <li>• كرر الآيات ثلاث مرات</li>
              <li>• انفث على المريض برفق</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuqyahPage;