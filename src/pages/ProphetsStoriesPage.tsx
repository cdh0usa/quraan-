import React, { useState } from 'react';
import { Book, Star, Heart, Search, ChevronDown, ChevronUp, Play, Pause, Volume2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProphetStory {
  id: string;
  name: string;
  arabicName: string;
  title: string;
  shortDescription: string;
  fullStory: string;
  quranReferences: string[];
  hadithReferences: string[];
  lessons: string[];
  timeline: string;
  location: string;
  tribe: string;
  specialMiracles: string[];
  coverImage: string;
  isFavorite?: boolean;
}

const prophetStories: ProphetStory[] = [
  {
    id: 'adam',
    name: 'Adam',
    arabicName: 'آدم عليه السلام',
    title: 'أبو البشر',
    shortDescription: 'أول إنسان خلقه الله تعالى، وأول الأنبياء والرسل',
    fullStory: `خلق الله تعالى آدم عليه السلام من تراب، ثم نفخ فيه من روحه فأصبح بشراً سوياً. قال الله للملائكة إنه جاعل في الأرض خليفة، فتساءلت الملائكة عن حكمة ذلك، فعلَّم الله آدم الأسماء كلها وأظهر فضله على الملائكة.

أسكن الله آدم وزوجه حواء الجنة، وأباح لهما كل شيء إلا شجرة واحدة نهاهما عن الاقتراب منها. لكن الشيطان وسوس لهما وأغواهما، فأكلا من الشجرة المحرمة، فأهبطهما الله إلى الأرض.

تاب آدم وحواء إلى الله، فتاب الله عليهما. عاش آدم في الأرض وأنجب ذرية كثيرة، وعلّمهم التوحيد والعبادة. كان أول من زرع وحرث الأرض، وعلّم أبناءه الحرف والصناعات.`,
    quranReferences: [
      'سورة البقرة: الآيات 30-39',
      'سورة الأعراف: الآيات 11-25',
      'سورة طه: الآيات 115-123'
    ],
    hadithReferences: [
      'صحيح البخاري: خلق آدم على صورته',
      'صحيح مسلم: أول من يدعى يوم القيامة آدم'
    ],
    lessons: [
      'فضل الإنسان على سائر المخلوقات',
      'أهمية التوبة والاستغفار',
      'خطر الشيطان ووساوسه',
      'حكمة الله في خلق الإنسان',
      'بداية البشرية والحضارة'
    ],
    timeline: 'أول البشر',
    location: 'الجنة ثم الأرض',
    tribe: 'أبو البشر جميعاً',
    specialMiracles: [
      'خلقه من تراب بيد الله',
      'نفخ الروح فيه من الله',
      'تعليمه الأسماء كلها',
      'سجود الملائكة له'
    ],
    coverImage: '🌍'
  },
  {
    id: 'nuh',
    name: 'Nuh',
    arabicName: 'نوح عليه السلام',
    title: 'أبو البشر الثاني',
    shortDescription: 'النبي الذي دعا قومه 950 سنة، ونجّاه الله من الطوفان العظيم',
    fullStory: `بعث الله نوحاً عليه السلام إلى قومه الذين كانوا يعبدون الأصنام. دعاهم نوح إلى عبادة الله وحده وترك الشرك، لكنهم كذبوه واستكبروا.

دعا نوح قومه 950 سنة بالحكمة والموعظة الحسنة، تارة بالترغيب وأخرى بالترهيب، لكن أكثرهم لم يؤمنوا. آمن معه قلة من الناس، ولم يؤمن حتى ابنه وزوجته.

أوحى الله إلى نوح أن يصنع السفينة، فصنعها بوحي من الله. لما جاء أمر الله، فار التنور، وأمر الله نوحاً أن يحمل في السفينة من كل زوجين اثنين، وأهله إلا من سبق عليه القول، والذين آمنوا.

أرسل الله الطوفان العظيم فغرق الكافرون جميعاً، ونجّى الله نوحاً ومن معه من المؤمنين. استوت السفينة على جبل الجودي، وأصبح نوح ومن معه هم البقية الباقية من البشر.`,
    quranReferences: [
      'سورة نوح: كاملة',
      'سورة هود: الآيات 25-49',
      'سورة المؤمنون: الآيات 23-30'
    ],
    hadithReferences: [
      'صحيح البخاري: ذكر نوح في الشفاعة',
      'صحيح مسلم: قصة نوح مع قومه'
    ],
    lessons: [
      'الصبر في الدعوة إلى الله',
      'عاقبة الكفر والعناد',
      'أهمية الإيمان والتوحيد',
      'رحمة الله بالمؤمنين',
      'حكمة الله في إهلاك الظالمين'
    ],
    timeline: 'بعد آدم بقرون كثيرة',
    location: 'بلاد ما بين النهرين',
    tribe: 'قوم نوح',
    specialMiracles: [
      'طول العمر (950 سنة في الدعوة)',
      'بناء السفينة بوحي من الله',
      'النجاة من الطوفان العظيم',
      'تكلم مع الطيور والحيوانات'
    ],
    coverImage: '🚢'
  },
  {
    id: 'ibrahim',
    name: 'Ibrahim',
    arabicName: 'إبراهيم عليه السلام',
    title: 'أبو الأنبياء وخليل الرحمن',
    shortDescription: 'النبي الذي حطم الأصنام وألقي في النار فجعلها الله براداً وسلاماً',
    fullStory: `وُلد إبراهيم عليه السلام في بابل في زمن الملك النمرود. كان قومه يعبدون الأصنام والكواكب. منذ صغره تفكر إبراهيم في خالق هذا الكون، ورفض عبادة الأصنام.

تدرج إبراهيم في دعوة قومه، فبدأ بأبيه آزر، لكنه رفض الدعوة. ثم دعا قومه إلى التوحيد بالحجة والبرهان. حطم أصنامهم وترك الكبير منها، فلما سألوه قال لهم أن يسألوا كبير الأصنام إن كان ينطق.

غضب النمرود وقومه، فقرروا إحراق إبراهيم. جمعوا الحطب الكثير وأشعلوا ناراً عظيمة، وألقوا فيها إبراهيم بالمنجنيق. لكن الله قال للنار: "كوني برداً وسلاماً على إبراهيم"، فلم تحرقه النار.

هاجر إبراهيم إلى فلسطين، ثم إلى مصر، ثم عاد إلى فلسطين. تزوج سارة وهاجر، ورُزق بإسماعيل من هاجر وإسحاق من سارة. أمره الله أن يأخذ هاجر وإسماعيل إلى مكة، ثم أمره ببناء الكعبة مع إسماعيل.

ابتلى الله إبراهيم بذبح ابنه إسماعيل، فلما سلّما وتلّه للجبين، فداه الله بذبح عظيم. أصبح إبراهيم أباً للأنبياء، فمن ذريته جاء إسماعيل وإسحاق ويعقوب ومن بعدهم كثير من الأنبياء.`,
    quranReferences: [
      'سورة البقرة: الآيات 124-141',
      'سورة الأنعام: الآيات 74-84',
      'سورة الأنبياء: الآيات 51-73',
      'سورة الصافات: الآيات 83-113'
    ],
    hadithReferences: [
      'صحيح البخاري: قصة إبراهيم مع النمرود',
      'صحيح مسلم: بناء البيت الحرام'
    ],
    lessons: [
      'التوكل على الله في المحن',
      'الثبات على الحق مهما كانت التضحيات',
      'أهمية الدعوة بالحكمة والحجة',
      'فضل التوحيد الخالص',
      'بركة الطاعة والتسليم لله'
    ],
    timeline: 'حوالي 2000 ق.م',
    location: 'بابل، فلسطين، مصر، مكة',
    tribe: 'من نسل سام بن نوح',
    specialMiracles: [
      'النجاة من النار العظيمة',
      'الغربان التي أحياها الله أمامه',
      'نبع زمزم لهاجر وإسماعيل',
      'الرؤيا الصادقة في المنام'
    ],
    coverImage: '🕋'
  },
  {
    id: 'musa',
    name: 'Musa',
    arabicName: 'موسى عليه السلام',
    title: 'كليم الله',
    shortDescription: 'النبي الذي كلمه الله مباشرة وأنجى بني إسرائيل من فرعون',
    fullStory: `وُلد موسى في مصر في زمن فرعون الذي كان يضطهد بني إسرائيل ويقتل أطفالهم الذكور. أوحى الله إلى أم موسى أن تضعه في تابوت وتلقيه في النهر، فالتقطه آل فرعون وربّوه في قصر فرعون.

لما كبر موسى، قتل رجلاً مصرياً خطأً، فهرب إلى مدين. هناك تزوج ابنة شعيب وعاش عشر سنين. في طريق عودته إلى مصر، رأى ناراً عند جبل الطور، فلما اقترب منها كلمه الله وأوحى إليه بالرسالة.

أرسل الله موسى وأخاه هارون إلى فرعون يدعوانه إلى التوحيد وإطلاق بني إسرائيل. أيّد الله موسى بآيات عظيمة: العصا التي تتحول إلى ثعبان، واليد التي تخرج بيضاء من غير سوء، والطوفان والجراد والقمل والضفادع والدم.

رفض فرعون الإيمان وزعم الألوهية، فأهلكه الله غرقاً في البحر. شق الله البحر لموسى وبني إسرائيل فعبروا، ولما دخله فرعون وجنوده أطبقه عليهم.

أنزل الله على موسى التوراة في جبل الطور، وجعل فيها هدى ونور لبني إسرائيل. لكن بني إسرائيل عصوا موسى كثيراً وعبدوا العجل في غيابه، فعاقبهم الله وأمرهم أن يتوبوا.`,
    quranReferences: [
      'سورة البقرة: الآيات 49-61',
      'سورة الأعراف: الآيات 103-162',
      'سورة طه: الآيات 9-98',
      'سورة القصص: الآيات 3-43'
    ],
    hadithReferences: [
      'صحيح البخاري: تكليم الله لموسى',
      'صحيح مسلم: قصة موسى مع الخضر'
    ],
    lessons: [
      'قدرة الله على تغيير الأقدار',
      'عاقبة الظلم والطغيان',
      'أهمية الصبر في الدعوة',
      'فضل التوحيد والإيمان',
      'حفظ الله لأوليائه'
    ],
    timeline: 'حوالي 1300 ق.م',
    location: 'مصر، مدين، سيناء',
    tribe: 'بنو إسرائيل',
    specialMiracles: [
      'العصا التي تتحول إلى ثعبان',
      'اليد البيضاء',
      'شق البحر',
      'إنزال المن والسلوى',
      'تكليم الله له مباشرة',
      'تفجير الماء من الحجر'
    ],
    coverImage: '🌊'
  },
  {
    id: 'isa',
    name: 'Isa',
    arabicName: 'عيسى عليه السلام',
    title: 'المسيح كلمة الله',
    shortDescription: 'النبي الذي وُلد من غير أب وأيده الله بالمعجزات العظيمة',
    fullStory: `وُلد عيسى عليه السلام من أم بلا أب، بقدرة الله العظيمة. بشّر الملائكة مريم العذراء بولادة عيسى، فقالوا لها: "إن الله يبشرك بكلمة منه اسمه المسيح عيسى ابن مريم".

حملت مريم بعيسى بكلمة من الله "كن فيكون"، وولدته تحت جذع النخلة. أنطق الله عيسى وهو في المهد، فبرّأ أمه مما اتهمها به قومها، وأخبرهم أنه عبد الله ورسوله.

أيّد الله عيسى بمعجزات عظيمة: إحياء الموتى بإذن الله، إبراء الأكمه والأبرص، إخبار الناس بما يأكلون وما يدخرون في بيوتهم، وإنزال المائدة من السماء لتلاميذه.

دعا عيسى بني إسرائيل إلى التوحيد وعبادة الله وحده، وجاء مصدقاً لما بين يديه من التوراة. آمن به الحواريون وطائفة من بني إسرائيل، لكن أكثرهم كفروا وحاولوا قتله.

لما أراد اليهود صلبه، رفعه الله إليه ونجّاه منهم، وألقى شبهه على آخر فظنوا أنهم قتلوه. سينزل عيسى في آخر الزمان فيحكم بشريعة محمد صلى الله عليه وسلم.`,
    quranReferences: [
      'سورة آل عمران: الآيات 42-63',
      'سورة المائدة: الآيات 110-120',
      'سورة مريم: الآيات 16-40'
    ],
    hadithReferences: [
      'صحيح البخاري: نزول عيسى آخر الزمان',
      'صحيح مسلم: صفة المسيح الدجال وعيسى'
    ],
    lessons: [
      'قدرة الله على خلق الإنسان بلا أب',
      'أهمية البراءة والطهارة',
      'فضل الصبر على الابتلاء',
      'خطر الغلو في الدين',
      'البشارة بخاتم الأنبياء'
    ],
    timeline: 'حوالي 0 م',
    location: 'فلسطين',
    tribe: 'بنو إسرائيل',
    specialMiracles: [
      'الولادة من غير أب',
      'الكلام في المهد',
      'إحياء الموتى بإذن الله',
      'إبراء الأكمه والأبرص',
      'إنزال المائدة من السماء',
      'الرفع إلى السماء'
    ],
    coverImage: '✨'
  },
  {
    id: 'muhammad',
    name: 'Muhammad',
    arabicName: 'محمد صلى الله عليه وسلم',
    title: 'خاتم الأنبياء والمرسلين',
    shortDescription: 'النبي الأمي الذي أنزل عليه القرآن وختم به الرسالات',
    fullStory: `وُلد محمد صلى الله عليه وسلم في مكة من بني هاشم، وكان أشرف العرب نسباً. يتّم من أبيه قبل ولادته، ومن أمه وهو في السادسة. كفله جده عبد المطلب ثم عمه أبو طالب.

نشأ النبي معروفاً بالصدق والأمانة، حتى لقبه قومه بـ"الصادق الأمين". تزوج خديجة بنت خويلد وهو في الخامسة والعشرين. كان يتعبد في غار حراء يتفكر في خلق الله.

في سن الأربعين، جاءه الملك جبريل في غار حراء وقال له: "اقرأ". فقال: "ما أنا بقارئ". ضمه جبريل حتى بلغ منه الجهد، ثم قال: "اقرأ باسم ربك الذي خلق". كانت هذه بداية الوحي.

دعا النبي قومه إلى التوحيد وترك عبادة الأصنام. آمنت خديجة أولاً، ثم أبو بكر وعلي وزيد بن حارثة. اشتدت معاداة قريش له، فهاجر إلى المدينة حيث أسس دولة الإسلام.

أيّد الله نبيه بمعجزات كثيرة، أعظمها القرآن الكريم. انتشر الإسلام في جزيرة العرب، ثم في العالم. توفي النبي في المدينة وقد بلّغ الرسالة وأدّى الأمانة.`,
    quranReferences: [
      'سورة العلق: الآيات 1-5',
      'سورة المدثر: الآيات 1-7',
      'سورة الأحزاب: الآية 40',
      'سورة الإسراء: الآية 1'
    ],
    hadithReferences: [
      'صحيح البخاري: بدء الوحي',
      'صحيح مسلم: الإسراء والمعراج'
    ],
    lessons: [
      'ختم الرسالات بالإسلام',
      'أهمية الصدق والأمانة',
      'فضل القرآن الكريم',
      'الصبر في سبيل الدعوة',
      'الرحمة للعالمين'
    ],
    timeline: '570-632 م',
    location: 'مكة المكرمة والمدينة المنورة',
    tribe: 'قريش - بنو هاشم',
    specialMiracles: [
      'القرآن الكريم',
      'الإسراء والمعراج',
      'انشقاق القمر',
      'نبع الماء من بين أصابعه',
      'إطعام الكثير من الطعام القليل',
      'شفاء المرضى ببركته'
    ],
    coverImage: '🌙'
  }
];

const ProphetsStoriesPage: React.FC = () => {
  const [selectedProphet, setSelectedProphet] = useState<ProphetStory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isReading, setIsReading] = useState(false);

  const filteredProphets = prophetStories.filter(prophet =>
    prophet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prophet.arabicName.includes(searchQuery) ||
    prophet.title.includes(searchQuery)
  );

  const toggleFavorite = (prophetId: string) => {
    const newFavorites = favorites.includes(prophetId)
      ? favorites.filter(id => id !== prophetId)
      : [...favorites, prophetId];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteProphets', JSON.stringify(newFavorites));
    toast.success(
      favorites.includes(prophetId) 
        ? 'تم حذف القصة من المفضلة' 
        : 'تم إضافة القصة للمفضلة'
    );
  };

  const readStory = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isReading) {
        speechSynthesis.cancel();
        setIsReading(false);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.7;
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
      setIsReading(true);
      toast.success('جاري قراءة القصة صوتياً');
    } else {
      toast.error('المتصفح لا يدعم القراءة الصوتية');
    }
  };

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 font-amiri flex items-center">
          <Book className="w-10 h-10 ml-3" />
          قصص الأنبياء والمرسلين
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-noto-arabic">
          قصص الأنبياء والرسل كما وردت في القرآن الكريم والسنة النبوية المطهرة
        </p>
      </div>

      {/* البحث */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن نبي أو رسول..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
          />
          <Search className="absolute top-4 left-4 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {!selectedProphet ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProphets.map(prophet => (
            <div 
              key={prophet.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProphet(prophet)}
            >
              <div className="h-32 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <span className="text-6xl">{prophet.coverImage}</span>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 font-amiri">
                      {prophet.arabicName}
                    </h3>
                    <p className="text-sm text-emerald-600 dark:text-emerald-500 font-medium">
                      {prophet.title}
                    </p>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(prophet.id);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      favorites.includes(prophet.id)
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(prophet.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {prophet.shortDescription}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{prophet.timeline}</span>
                  <span>{prophet.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="h-48 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center relative">
            <span className="text-8xl">{selectedProphet.coverImage}</span>
            <button
              onClick={() => setSelectedProphet(null)}
              className="absolute top-4 left-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              ← العودة للقائمة
            </button>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-400 font-amiri mb-2">
                  {selectedProphet.arabicName}
                </h1>
                <p className="text-lg text-emerald-600 dark:text-emerald-500 font-medium">
                  {selectedProphet.title}
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => toggleFavorite(selectedProphet.id)}
                  className={`p-3 rounded-lg transition-colors ${
                    favorites.includes(selectedProphet.id)
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${favorites.includes(selectedProphet.id) ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={() => readStory(selectedProphet.fullStory)}
                  className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
                >
                  {isReading ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* معلومات أساسية */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                <h3 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2">الزمان</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedProphet.timeline}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-2">المكان</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedProphet.location}</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h3 className="font-bold text-orange-800 dark:text-orange-400 mb-2">القوم</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedProphet.tribe}</p>
              </div>
            </div>

            {/* القصة */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-amiri">القصة</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                  {selectedProphet.fullStory}
                </p>
              </div>
            </div>

            {/* المعجزات */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-amiri">المعجزات</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProphet.specialMiracles.map((miracle, index) => (
                  <div key={index} className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400 ml-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{miracle}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* المراجع القرآنية */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-amiri">المراجع القرآنية</h2>
              <div className="space-y-2">
                {selectedProphet.quranReferences.map((ref, index) => (
                  <div key={index} className="flex items-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <Book className="w-5 h-5 text-emerald-600 dark:text-emerald-400 ml-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{ref}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* الدروس والعبر */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-amiri">الدروس والعبر</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProphet.lessons.map((lesson, index) => (
                  <div key={index} className="flex items-start p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold ml-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{lesson}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProphetsStoriesPage;