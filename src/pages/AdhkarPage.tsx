import React, { useState, useEffect } from 'react';
import { Sun, Moon, Home, Utensils, Car, Heart, Copy, Star, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface Dhikr {
  id: string;
  arabic: string;
  transliteration?: string;
  translation: string;
  source: string;
  repetitions: number;
  benefits: string[];
  category: string;
}

interface DhikrCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  time?: string;
  dhikrs: Dhikr[];
}

const dhikrCategories: DhikrCategory[] = [
  {
    id: 'morning',
    name: 'أذكار الصباح',
    description: 'أذكار تُقال بعد صلاة الفجر حتى الشروق',
    time: 'من بعد الفجر حتى الشروق',
    icon: <Sun className="w-6 h-6" />,
    dhikrs: [
      {
        id: 'morning_1',
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ',
        translation: 'أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، رب أسألك خير ما في هذا اليوم وخير ما بعده، وأعوذ بك من شر ما في هذا اليوم وشر ما بعده',
        source: 'سنن أبي داود',
        repetitions: 1,
        benefits: ['حماية طوال اليوم', 'طلب الخير من الله', 'الاستعاذة من الشر'],
        category: 'morning'
      },
      {
        id: 'morning_2',
        arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
        translation: 'اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور',
        source: 'سنن الترمذي',
        repetitions: 1,
        benefits: ['الإقرار بالافتقار إلى الله', 'التوكل الكامل على الله'],
        category: 'morning'
      },
      {
        id: 'morning_3',
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
        translation: 'اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت',
        source: 'صحيح البخاري',
        repetitions: 1,
        benefits: ['سيد الاستغفار', 'من قالها موقناً ومات في نهاره دخل الجنة'],
        category: 'morning'
      },
      {
        id: 'morning_4',
        arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        translation: 'أعوذ بكلمات الله التامات من شر ما خلق',
        source: 'صحيح مسلم',
        repetitions: 3,
        benefits: ['حماية من كل شر', 'لم يضره شيء حتى يمسي'],
        category: 'morning'
      },
      {
        id: 'morning_5',
        arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
        translation: 'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم',
        source: 'سنن أبي داود',
        repetitions: 3,
        benefits: ['حماية من جميع المضار', 'لم يضره شيء حتى يمسي'],
        category: 'morning'
      }
    ]
  },
  {
    id: 'evening',
    name: 'أذكار المساء',
    description: 'أذكار تُقال بعد صلاة العصر حتى المغرب',
    time: 'من بعد العصر حتى المغرب',
    icon: <Moon className="w-6 h-6" />,
    dhikrs: [
      {
        id: 'evening_1',
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا',
        translation: 'أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، رب أسألك خير ما في هذه الليلة وخير ما بعدها، وأعوذ بك من شر ما في هذه الليلة وشر ما بعدها',
        source: 'سنن أبي داود',
        repetitions: 1,
        benefits: ['حماية طوال الليل', 'طلب الخير من الله'],
        category: 'evening'
      },
      {
        id: 'evening_2',
        arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
        translation: 'اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير',
        source: 'سنن الترمذي',
        repetitions: 1,
        benefits: ['التوكل على الله', 'تذكر المعاد والآخرة'],
        category: 'evening'
      },
      {
        id: 'evening_3',
        arabic: 'اللَّهُمَّ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ',
        translation: 'اللهم فاطر السماوات والأرض، عالم الغيب والشهادة، رب كل شيء ومليكه، أشهد أن لا إله إلا أنت، أعوذ بك من شر نفسي، ومن شر الشيطان وشركه',
        source: 'سنن أبي داود',
        repetitions: 1,
        benefits: ['الاستعاذة من شر النفس والشيطان', 'حماية من الشرك'],
        category: 'evening'
      }
    ]
  },
  {
    id: 'sleep',
    name: 'أذكار النوم',
    description: 'أذكار تُقال عند النوم',
    time: 'عند النوم',
    icon: <Moon className="w-6 h-6" />,
    dhikrs: [
      {
        id: 'sleep_1',
        arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
        translation: 'باسمك ربي وضعت جنبي، وبك أرفعه، فإن أمسكت نفسي فارحمها، وإن أرسلتها فاحفظها بما تحفظ به عبادك الصالحين',
        source: 'صحيح البخاري',
        repetitions: 1,
        benefits: ['الاستعانة بالله عند النوم', 'طلب الرحمة والحفظ'],
        category: 'sleep'
      },
      {
        id: 'sleep_2',
        arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
        translation: 'اللهم قني عذابك يوم تبعث عبادك',
        source: 'سنن أبي داود',
        repetitions: 3,
        benefits: ['الاستعاذة من عذاب الآخرة', 'تذكر يوم القيامة'],
        category: 'sleep'
      },
      {
        id: 'sleep_3',
        arabic: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ',
        translation: 'سبحان الله، والحمد لله، والله أكبر',
        source: 'صحيح البخاري',
        repetitions: 33,
        benefits: ['خير من الدنيا وما فيها', 'تسبيح يكفر الذنوب'],
        category: 'sleep'
      }
    ]
  },
  {
    id: 'prayer',
    name: 'أذكار بعد الصلاة',
    description: 'أذكار تُقال بعد كل صلاة فريضة',
    time: 'بعد كل صلاة',
    icon: <Star className="w-6 h-6" />,
    dhikrs: [
      {
        id: 'prayer_1',
        arabic: 'أَسْتَغْفِرُ اللَّهَ',
        translation: 'أستغفر الله',
        source: 'صحيح مسلم',
        repetitions: 3,
        benefits: ['تكفير ذنوب الصلاة', 'طلب المغفرة من الله'],
        category: 'prayer'
      },
      {
        id: 'prayer_2',
        arabic: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
        translation: 'اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام',
        source: 'صحيح مسلم',
        repetitions: 1,
        benefits: ['تعظيم الله وتنزيهه', 'الثناء على الله'],
        category: 'prayer'
      },
      {
        id: 'prayer_3',
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        translation: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير',
        source: 'صحيح مسلم',
        repetitions: 1,
        benefits: ['تحقيق التوحيد', 'تعظيم الله وإفراده بالعبادة'],
        category: 'prayer'
      },
      {
        id: 'prayer_4',
        arabic: 'سُبْحَانَ اللَّهِ',
        translation: 'سبحان الله',
        source: 'صحيح البخاري',
        repetitions: 33,
        benefits: ['تنزيه الله عن النقائص', 'أجر عظيم'],
        category: 'prayer'
      },
      {
        id: 'prayer_5',
        arabic: 'الْحَمْدُ لِلَّهِ',
        translation: 'الحمد لله',
        source: 'صحيح البخاري',
        repetitions: 33,
        benefits: ['حمد الله على نعمه', 'شكر الله على فضله'],
        category: 'prayer'
      },
      {
        id: 'prayer_6',
        arabic: 'اللَّهُ أَكْبَرُ',
        translation: 'الله أكبر',
        source: 'صحيح البخاري',
        repetitions: 34,
        benefits: ['تعظيم الله وتكبيره', 'إقرار بعظمة الله'],
        category: 'prayer'
      }
    ]
  },
  {
    id: 'home',
    name: 'أذكار دخول المنزل',
    description: 'أذكار تُقال عند دخول المنزل والخروج منه',
    time: 'عند دخول وخروج المنزل',
    icon: <Home className="w-6 h-6" />,
    dhikrs: [
      {
        id: 'home_enter',
        arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
        translation: 'بسم الله ولجنا، وبسم الله خرجنا، وعلى الله ربنا توكلنا',
        source: 'سنن أبي داود',
        repetitions: 1,
        benefits: ['بركة في المنزل', 'حماية من الشيطان'],
        category: 'home'
      },
      {
        id: 'home_exit',
        arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
        translation: 'بسم الله توكلت على الله، ولا حول ولا قوة إلا بالله',
        source: 'سنن أبي داود',
        repetitions: 1,
        benefits: ['الحماية في الطريق', 'التوفيق في الأمور'],
        category: 'home'
      }
    ]
  },
  {
    id: 'eating',
    name: 'أذكار الطعام والشراب',
    description: 'أذكار تُقال قبل وبعد الطعام والشراب',
    time: 'عند الأكل والشرب',
    icon: <Utensils className="w-6 h-6" />,
    dhikrs: [
      {
        id: 'eating_before',
        arabic: 'بِسْمِ اللَّهِ',
        translation: 'بسم الله',
        source: 'صحيح البخاري',
        repetitions: 1,
        benefits: ['بركة في الطعام', 'طرد الشيطان'],
        category: 'eating'
      },
      {
        id: 'eating_after',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
        translation: 'الحمد لله الذي أطعمني هذا ورزقنيه من غير حول مني ولا قوة',
        source: 'سنن أبي داود',
        repetitions: 1,
        benefits: ['غفران الذنوب المتقدمة', 'شكر الله على نعمة الطعام'],
        category: 'eating'
      }
    ]
  },
  {
    id: 'travel',
    name: 'أذكار السفر',
    description: 'أذكار تُقال عند السفر وركوب المواصلات',
    time: 'عند السفر والركوب',
    icon: <Car className="w-6 h-6" />,
    dhikrs: [
      {
        id: 'travel_1',
        arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
        translation: 'سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون',
        source: 'سنن أبي داود',
        repetitions: 1,
        benefits: ['السلامة في السفر', 'تذكر نعمة الله'],
        category: 'travel'
      },
      {
        id: 'travel_2',
        arabic: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ',
        translation: 'اللهم إنا نسألك في سفرنا هذا البر والتقوى، ومن العمل ما ترضى، اللهم هون علينا سفرنا هذا واطو عنا بعده',
        source: 'صحيح مسلم',
        repetitions: 1,
        benefits: ['تيسير السفر', 'طلب التوفيق والبر'],
        category: 'travel'
      }
    ]
  }
];

const AdhkarPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(dhikrCategories[0]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [counters, setCounters] = useState<{[key: string]: number}>({});

  useEffect(() => {
    const savedFavorites = localStorage.getItem('adhkarFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    const savedCounters = localStorage.getItem('adhkarCounters');
    if (savedCounters) {
      setCounters(JSON.parse(savedCounters));
    }
  }, []);

  // تم إزالة التشغيل الصوتي

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('تم نسخ النص');
  };

  const toggleFavorite = (dhikrId: string) => {
    const newFavorites = favorites.includes(dhikrId)
      ? favorites.filter(id => id !== dhikrId)
      : [...favorites, dhikrId];
    setFavorites(newFavorites);
    localStorage.setItem('adhkarFavorites', JSON.stringify(newFavorites));
    toast.success(
      favorites.includes(dhikrId) 
        ? 'تم حذف من المفضلة' 
        : 'تم إضافة للمفضلة'
    );
  };

  const incrementCounter = (dhikrId: string) => {
    const newCounters = {
      ...counters,
      [dhikrId]: (counters[dhikrId] || 0) + 1
    };
    setCounters(newCounters);
    localStorage.setItem('adhkarCounters', JSON.stringify(newCounters));
  };

  const resetCounter = (dhikrId: string) => {
    const newCounters = { ...counters };
    delete newCounters[dhikrId];
    setCounters(newCounters);
    localStorage.setItem('adhkarCounters', JSON.stringify(newCounters));
    toast.success('تم إعادة تعيين العداد');
  };

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 font-amiri flex items-center">
          <Star className="w-10 h-10 ml-3" />
          الأذكار اليومية
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-noto-arabic">
          أذكار الصباح والمساء وجميع المناسبات من السنة النبوية المطهرة
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* القائمة الجانبية */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden sticky top-6">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 border-b border-emerald-100 dark:border-emerald-900/50">
              <h2 className="font-bold text-lg text-emerald-800 dark:text-emerald-400 font-amiri">
                تصنيفات الأذكار
              </h2>
            </div>
            <div className="p-2">
              {dhikrCategories.map((category) => (
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
                    <div className="ml-3 text-emerald-600 dark:text-emerald-500">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {category.dhikrs.length} ذكر
                      </div>
                      {category.time && (
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                          {category.time}
                        </div>
                      )}
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
                <div className="text-emerald-600 dark:text-emerald-500 ml-4">
                  {selectedCategory.icon}
                </div>
                <div>
                  <h2 className="font-bold text-xl text-emerald-800 dark:text-emerald-400 font-amiri">
                    {selectedCategory.name}
                  </h2>
                  {selectedCategory.time && (
                    <p className="text-emerald-600 dark:text-emerald-500 text-sm flex items-center mt-1">
                      <Clock className="w-4 h-4 ml-1" />
                      {selectedCategory.time}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedCategory.description}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {selectedCategory.dhikrs.map((dhikr, index) => (
              <div 
                key={dhikr.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm text-emerald-600 dark:text-emerald-400">
                          {dhikr.source}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          يُكرر {dhikr.repetitions} {dhikr.repetitions === 1 ? 'مرة' : 'مرات'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFavorite(dhikr.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          favorites.includes(dhikr.id)
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        title="إضافة للمفضلة"
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(dhikr.id) ? 'fill-current' : ''}`} />
                      </button>
                      

                      
                      <button
                        onClick={() => copyText(dhikr.arabic)}
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
                      <p className="text-gray-900 dark:text-gray-100 text-xl leading-relaxed font-amiri text-center">
                        {dhikr.arabic}
                      </p>
                    </div>
                  </div>

                  {/* النقحرة إن وجدت */}
                  {dhikr.transliteration && (
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">النقحرة:</h4>
                      <p className="text-gray-600 dark:text-gray-400 italic">
                        {dhikr.transliteration}
                      </p>
                    </div>
                  )}

                  {/* الترجمة */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">المعنى:</h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {dhikr.translation}
                    </p>
                  </div>

                  {/* العداد */}
                  {dhikr.repetitions > 1 && (
                    <div className="mb-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-blue-800 dark:text-blue-400">العداد:</h4>
                            <p className="text-blue-600 dark:text-blue-300 text-sm">
                              {counters[dhikr.id] || 0} من {dhikr.repetitions}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => incrementCounter(dhikr.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              +1
                            </button>
                            <button
                              onClick={() => resetCounter(dhikr.id)}
                              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              إعادة تعيين
                            </button>
                          </div>
                        </div>
                        
                        {/* شريط التقدم */}
                        <div className="mt-3">
                          <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${Math.min(((counters[dhikr.id] || 0) / dhikr.repetitions) * 100, 100)}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* الفوائد */}
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">الفوائد:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {dhikr.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400 ml-2 mt-0.5 flex-shrink-0" />
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

      {/* نصائح وإرشادات */}
      <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-4 font-amiri">
          آداب الذكر
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-700 dark:text-blue-300">
          <div>
            <h4 className="font-bold mb-2">آداب عامة:</h4>
            <ul className="space-y-1">
              <li>• استحضر معنى الذكر</li>
              <li>• اذكر الله بخشوع وحضور قلب</li>
              <li>• تطهر قبل الذكر إن أمكن</li>
              <li>• استقبل القبلة إن تيسر</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">فوائد الذكر:</h4>
            <ul className="space-y-1">
              <li>• طمأنينة القلب وسكينته</li>
              <li>• طرد الوساوس والهموم</li>
              <li>• زيادة الإيمان واليقين</li>
              <li>• حماية من الشياطين</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdhkarPage;