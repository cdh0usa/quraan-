import React, { useState } from 'react';
import { GraduationCap, Star, Heart, BookOpen, Award, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

interface EducationItem {
  id: string;
  title: string;
  content: string;
  ageGroup: string;
  icon: string;
  lesson: string;
  activities: string[];
}

interface EducationCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  items: EducationItem[];
}

const educationCategories: EducationCategory[] = [
  {
    id: 'aqeedah',
    name: 'العقيدة المبسطة',
    description: 'تعليم أركان الإيمان والتوحيد بطريقة مبسطة',
    icon: <Star className="w-6 h-6" />,
    color: 'emerald',
    items: [
      {
        id: 'allah',
        title: 'من هو الله؟',
        content: 'الله هو ربنا الذي خلقنا وخلق كل شيء. الله واحد لا شريك له. الله يحبنا ويرزقنا ويحمينا. الله يرى كل شيء ويعلم كل شيء.',
        ageGroup: '3-6 سنوات',
        icon: '☪️',
        lesson: 'الله ربي وخالقي، أحبه وأطيعه',
        activities: [
          'انظر للسماء والأشجار واعرف أن الله خلقها',
          'قل "الحمد لله" عندما تأكل أو تشرب',
          'اذكر الله قبل النوم وعند الاستيقاظ',
          'قل "بسم الله" قبل أي عمل'
        ]
      },
      {
        id: 'muhammad',
        title: 'محمد رسول الله',
        content: 'محمد صلى الله عليه وسلم هو رسولنا الحبيب. كان صادقاً وأميناً ورحيماً. علمنا كيف نعبد الله. نحبه ونتبع تعاليمه.',
        ageGroup: '4-8 سنوات',
        icon: '🌙',
        lesson: 'محمد رسولي، أحبه وأقتدي به',
        activities: [
          'تعلم قول "صلى الله عليه وسلم" عند ذكر النبي',
          'اقرأ قصص النبي المبسطة',
          'كن صادقاً مثل النبي',
          'كن رحيماً مع الحيوانات والناس'
        ]
      },
      {
        id: 'angels',
        title: 'الملائكة الكرام',
        content: 'الملائكة مخلوقات نورانية خلقها الله من النور. جبريل يأتي بالوحي للأنبياء، وميكائيل ينزل المطر والرزق، وإسرافيل ينفخ في الصور يوم القيامة. الملائكة تحرسنا وتكتب أعمالنا الطيبة والسيئة.',
        ageGroup: '5-10 سنوات',
        icon: '',
        lesson: 'الملائكة تحرسني وتدعو لي وتكتب أعمالي',
        activities: [
          'تذكر أن الملك الحافظ معك دائماً يحميك',
          'اعمل أعمالاً طيبة لتفرح الملائكة الكاتبين',
          'ادع الله أن يرسل ملائكته لحمايتك',
          'اعرف أسماء الملائكة: جبريل وميكائيل وإسرافيل',
          'قل الأذكار لتستغفر لك الملائكة',
          'احترم الملائكة فهي لا تعصي الله أبداً'
        ]
      },
      {
        id: 'quran',
        title: 'القرآن كتابنا المقدس',
        content: 'القرآن هو كلام الله الذي أنزله على النبي محمد. فيه كل الخير والهداية. نقرأه ونحفظه ونعمل بما فيه.',
        ageGroup: '4-10 سنوات',
        icon: '📖',
        lesson: 'القرآن نور قلبي ودليل حياتي',
        activities: [
          'احفظ سورة الفاتحة وافهم معناها',
          'اقرأ سورة الإخلاص يومياً قبل النوم',
          'استمع لتلاوة القرآن بصوت جميل',
          'تعلم آداب حمل المصحف وتقبيله',
          'احفظ المعوذتين (الفلق والناس)',
          'تعلم سورة الكوثر وسورة النصر'
        ]
      },
      {
        id: 'pillars_islam',
        title: 'أركان الإسلام الخمسة',
        content: 'الإسلام له خمسة أركان مهمة: الشهادتان (لا إله إلا الله محمد رسول الله)، الصلاة، الزكاة، الصوم، والحج. هذه الأركان هي أساس ديننا الجميل.',
        ageGroup: '6-12 سنة',
        icon: '🕌',
        lesson: 'أركان الإسلام تجعلني مسلماً حقيقياً',
        activities: [
          'احفظ أركان الإسلام بالترتيب',
          'تعلم معنى كل ركن',
          'اشرح لأصدقائك أركان الإسلام',
          'اعمل مجسماً للكعبة من الورق المقوى',
          'تدرب على الوضوء والصلاة',
          'ساعد الفقراء (الزكاة المبسطة)'
        ]
      },
      {
        id: 'day_judgment',
        title: 'اليوم الآخر',
        content: 'نؤمن أن هناك يوماً آخر بعد الموت. في هذا اليوم سيحاسبنا الله على أعمالنا. من عمل خيراً سيذهب للجنة، ومن عمل شراً سيذهب للنار. لذلك نعمل الخير دائماً.',
        ageGroup: '8-12 سنة',
        icon: '⚖️',
        lesson: 'أعمل الخير لأدخل الجنة',
        activities: [
          'اعمل خيراً كل يوم (ولو بسيطاً)',
          'استغفر الله من الذنوب',
          'ادع الله أن يدخلك الجنة',
          'تعلم وصف الجنة والنار المبسط',
          'ساعد المحتاجين',
          'كن صادقاً وأميناً'
        ]
      }
    ]
  },
  {
    id: 'worship',
    name: 'العبادات الأساسية',
    description: 'تعليم الصلاة والوضوء والأذكار بطريقة عملية',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'blue',
    items: [
      {
        id: 'wudu',
        title: 'الوضوء الصحيح',
        content: 'الوضوء هو التطهر قبل الصلاة. نغسل الوجه واليدين والرأس والقدمين. الوضوء ينظف الجسم ويطهر القلب.',
        ageGroup: '5-10 سنوات',
        icon: '💧',
        lesson: 'الطهارة نصف الإيمان',
        activities: [
          'تعلم خطوات الوضوء بالترتيب',
          'قل "بسم الله" قبل الوضوء',
          'احرص على عدم إسراف الماء',
          'ادع الله بعد الوضوء'
        ]
      },
      {
        id: 'prayer',
        title: 'الصلاة صلتي بالله',
        content: 'الصلاة هي التحدث مع الله. نصلي خمس مرات في اليوم. في الصلاة نقف أمام الله ونحمده ونسأله.',
        ageGroup: '6-12 سنوات',
        icon: '🕌',
        lesson: 'الصلاة عماد الدين',
        activities: [
          'تعلم أوقات الصلوات الخمس',
          'تدرب على حركات الصلاة',
          'احفظ سورة الفاتحة والمعوذتين',
          'استخدم سجادة الصلاة الخاصة بك'
        ]
      },
      {
        id: 'dhikr',
        title: 'الأذكار الجميلة',
        content: 'الذكر هو تذكر الله في كل وقت. نقول "سبحان الله" و"الحمد لله" و"الله أكبر". الذكر يملأ القلب بالسعادة.',
        ageGroup: '4-10 سنوات',
        icon: '🤲',
        lesson: 'أذكر الله كثيراً',
        activities: [
          'قل "سبحان الله" 10 مرات صباحاً',
          'قل "الحمد لله" عند الأكل والشرب',
          'قل "الله أكبر" عند رؤية شيء جميل',
          'تعلم أذكار النوم والاستيقاظ',
          'احفظ دعاء دخول الخلاء والخروج منه',
          'قل "أستغفر الله" عند الخطأ'
        ]
      },
      {
        id: 'islamic_months',
        title: 'الشهور الهجرية',
        content: 'للمسلمين تقويم خاص يسمى التقويم الهجري. يبدأ من هجرة النبي محمد إلى المدينة. الشهور الهجرية 12 شهراً، منها رمضان شهر الصوم، وذو الحجة شهر الحج.',
        ageGroup: '7-12 سنة',
        icon: '🌙',
        lesson: 'أعرف تقويم ديني وأفتخر به',
        activities: [
          'احفظ أسماء الشهور الهجرية',
          'اعرف في أي شهر هجري نحن الآن',
          'تعلم قصة الهجرة النبوية',
          'اعمل تقويماً هجرياً بيديك',
          'احتفل برأس السنة الهجرية',
          'صم يوماً في شهر رمضان (للأطفال الكبار)'
        ]
      },
      {
        id: 'islamic_greetings',
        title: 'التحيات الإسلامية',
        content: 'المسلمون يحيون بعضهم بتحية الإسلام "السلام عليكم ورحمة الله وبركاته" والرد "وعليكم السلام ورحمة الله وبركاته". هذه التحية تعني السلام والأمان والبركة.',
        ageGroup: '4-10 سنوات',
        icon: '🤝',
        lesson: 'تحية الإسلام تنشر المحبة والسلام',
        activities: [
          'قل "السلام عليكم" عند دخول البيت',
          'رد التحية بأحسن منها',
          'حيّ أصدقاءك بتحية الإسلام',
          'تعلم آداب السلام والمصافحة',
          'ابتسم عند إلقاء السلام',
          'علّم الصغار تحية الإسلام'
        ]
      }
    ]
  },
  {
    id: 'morals',
    name: 'الأخلاق الحسنة',
    description: 'تعليم الآداب والأخلاق الإسلامية العملية',
    icon: <Heart className="w-6 h-6" />,
    color: 'rose',
    items: [
      {
        id: 'honesty',
        title: 'الصدق والأمانة',
        content: 'المسلم صادق دائماً. لا نكذب أبداً حتى لو خفنا. الأمانة تعني المحافظة على أشياء الآخرين. النبي كان يسمى الصادق الأمين.',
        ageGroup: '5-12 سنوات',
        icon: '💎',
        lesson: 'الصدق منجاة والكذب مهلكة',
        activities: [
          'قل الحقيقة دائماً',
          'احتفظ بأسرار أصدقائك',
          'أعد الأشياء لأصحابها',
          'اعتذر إذا أخطأت'
        ]
      },
      {
        id: 'kindness',
        title: 'الرحمة والطيبة',
        content: 'نكون لطفاء مع جميع الناس والحيوانات. نساعد المحتاجين ونبتسم للآخرين. الرحمة تجعل القلب سعيداً.',
        ageGroup: '3-10 سنوات',
        icon: '🌸',
        lesson: 'ارحموا من في الأرض يرحمكم من في السماء',
        activities: [
          'ابتسم للناس',
          'ساعد أمك في البيت',
          'اطعم القطط والطيور',
          'زر المرضى وادع لهم'
        ]
      },
      {
        id: 'respect',
        title: 'احترام الوالدين',
        content: 'والدانا أغلى الناس. نطيعهما ونحبهما ولا نزعجهما. بر الوالدين طريق إلى الجنة.',
        ageGroup: '4-12 سنوات',
        icon: '👨‍👩‍👧‍👦',
        lesson: 'الجنة تحت أقدام الأمهات',
        activities: [
          'قل "من فضلك" و"شكراً" لوالديك',
          'ساعدهما في أعمال البيت',
          'لا ترفع صوتك عليهما أبداً',
          'ادع لهما بالخير دائماً',
          'قبّل يد والديك عند رؤيتهما',
          'اطلب السماح قبل الخروج من البيت'
        ]
      },
      {
        id: 'cleanliness',
        title: 'النظافة والطهارة',
        content: 'النظافة من الإيمان. المسلم نظيف في جسمه وملبسه وبيته. نغسل أيدينا قبل الأكل وبعده، ونغسل أسناننا، ونحافظ على نظافة البيت والشارع.',
        ageGroup: '4-10 سنوات',
        icon: '🧼',
        lesson: 'النظافة من الإيمان',
        activities: [
          'اغسل يديك قبل الأكل وبعده',
          'نظف أسنانك صباحاً ومساءً',
          'رتب غرفتك كل يوم',
          'لا ترمِ القمامة في الشارع',
          'اغتسل واستحم بانتظام',
          'نظف ملابسك وحذاءك'
        ]
      },
      {
        id: 'helping_others',
        title: 'مساعدة الآخرين',
        content: 'المسلم يحب الخير للناس. نساعد الفقراء والمحتاجين، نزور المرضى، نساعد الجيران، ونكون عوناً لكل من يحتاج المساعدة.',
        ageGroup: '5-12 سنة',
        icon: '🤲',
        lesson: 'من لا يرحم الناس لا يرحمه الله',
        activities: [
          'ساعد أمك في أعمال البيت',
          'أعط الصدقة للفقراء',
          'زر المرضى في المستشفى',
          'ساعد زملاءك في الدراسة',
          'احمل الأكياس الثقيلة للكبار',
          'اطعم القطط والكلاب في الشارع'
        ]
      },
      {
        id: 'good_manners',
        title: 'الآداب والسلوك الحسن',
        content: 'المسلم مؤدب ومهذب. نقول "من فضلك" و"شكراً" و"آسف". نحترم الكبار ونحب الصغار. نأكل باليمين ونجلس بأدب.',
        ageGroup: '3-10 سنوات',
        icon: '🎯',
        lesson: 'الأدب يزين الإنسان',
        activities: [
          'قل "من فضلك" عند الطلب',
          'قل "شكراً" عند العطاء',
          'قل "آسف" عند الخطأ',
          'كل باليد اليمنى',
          'اجلس بأدب واحترام',
          'لا تقاطع الكبار عند الحديث'
        ]
      }
    ]
  },
  {
    id: 'stories',
    name: 'قصص تعليمية',
    description: 'قصص الأنبياء والصحابة المبسطة للأطفال',
    icon: <Gift className="w-6 h-6" />,
    color: 'amber',
    items: [
      {
        id: 'prophet_stories',
        title: 'قصص الأنبياء المبسطة',
        content: 'تعلم من قصص الأنبياء: صبر أيوب، صدق إبراهيم، رحمة محمد صلى الله عليه وسلم. كل نبي علمنا درساً مهماً.',
        ageGroup: '4-12 سنوات',
        icon: '📚',
        lesson: 'الأنبياء قدوتنا الحسنة',
        activities: [
          'استمع لقصة نوح والطوفان',
          'تعلم قصة يوسف وإخوته',
          'اقرأ عن معجزات موسى',
          'تذكر أخلاق النبي محمد'
        ]
      },
      {
        id: 'companions',
        title: 'حكايات الصحابة الكرام',
        content: 'الصحابة هم أصدقاء النبي. كانوا شجعاناً وكرماء وصادقين. تعلم من أبي بكر وعمر وعثمان وعلي.',
        ageGroup: '6-12 سنوات',
        icon: '⚔️',
        lesson: 'الصحابة خير القرون',
        activities: [
          'تعرف على أبي بكر الصديق وصدقه',
          'تعلم عن عدل عمر بن الخطاب',
          'اقرأ عن كرم عثمان بن عفان وحيائه',
          'تذكر شجاعة علي بن أبي طالب وعلمه',
          'تعرف على أم المؤمنين عائشة وعلمها',
          'تعلم عن حمزة عم النبي وشجاعته'
        ]
      },
      {
        id: 'islamic_heroes',
        title: 'أبطال الإسلام',
        content: 'في تاريخ الإسلام أبطال عظماء: خالد بن الوليد سيف الله المسلول، صلاح الدين الأيوبي محرر القدس، عمر بن عبد العزيز الخليفة العادل. كلهم قدوة في الشجاعة والعدل.',
        ageGroup: '8-14 سنة',
        icon: '⚔️',
        lesson: 'التاريخ الإسلامي مليء بالأبطال',
        activities: [
          'اقرأ عن خالد بن الوليد وانتصاراته',
          'تعرف على صلاح الدين وتحرير القدس',
          'تعلم عن عدل عمر بن عبد العزيز',
          'اقرأ قصة فتح مكة والعفو العام',
          'تذكر معركة بدر وانتصار المسلمين',
          'تعرف على العلماء المسلمين العظام'
        ]
      },
      {
        id: 'beautiful_names',
        title: 'أسماء الله الحسنى',
        content: 'لله تسعة وتسعون اسماً حسناً. كل اسم يدل على صفة جميلة من صفات الله. مثل: الرحمن الرحيم، الغفار، الشكور، الصبور. نحفظها وندعو الله بها.',
        ageGroup: '6-12 سنة',
        icon: '✨',
        lesson: 'أدعو الله بأسمائه الحسنى',
        activities: [
          'احفظ عشرة من أسماء الله الحسنى',
          'تعلم معنى كل اسم تحفظه',
          'ادع الله باسم مناسب لحاجتك',
          'قل "يا رحمان يا رحيم" عند الحاجة للرحمة',
          'قل "يا غفار" عند الاستغفار',
          'اعمل سبحة بأسماء الله الحسنى'
        ]
      }
    ]
  },
  {
    id: 'fun_activities',
    name: 'أنشطة ممتعة',
    description: 'ألعاب وأنشطة تعليمية إسلامية',
    icon: <Award className="w-6 h-6" />,
    color: 'purple',
    items: [
      {
        id: 'islamic_games',
        title: 'ألعاب إسلامية تعليمية',
        content: 'تعلم الإسلام باللعب! ألعاب الذاكرة للآيات، ألغاز عن الأنبياء، مسابقات الأذكار، وأنشطة التلوين الإسلامية.',
        ageGroup: '5-12 سنوات',
        icon: '🎮',
        lesson: 'التعلم باللعب أجمل وأسهل',
        activities: [
          'لعبة مطابقة أسماء الأنبياء',
          'تلوين المسجد الحرام والمسجد النبوي',
          'مسابقة حفظ الأذكار',
          'أحجية كلمات إسلامية'
        ]
      },
      {
        id: 'crafts',
        title: 'الأعمال اليدوية الإسلامية',
        content: 'اصنع بيديك أشياء جميلة! مصحف صغير من الورق، مسجد من الكرتون، تقويم إسلامي، وزينة رمضانية.',
        ageGroup: '6-12 سنوات',
        icon: '✂️',
        lesson: 'العمل باليد عبادة وإبداع',
        activities: [
          'اصنع مسجداً من الكرتون',
          'زين غرفتك بالآيات القرآنية الجميلة',
          'اعمل تقويماً هجرياً ملوناً',
          'اصنع كتيب أذكاري صغير مزين',
          'اعمل لوحة بأسماء الله الحسنى',
          'زين المصحف بغلاف جميل'
        ]
      },
      {
        id: 'learning_through_play',
        title: 'التعلم باللعب',
        content: 'نتعلم الإسلام بطرق ممتعة: لعبة الأسئلة الدينية، مسرح العرائس لقصص الأنبياء، الرسم الإسلامي، والأناشيد الدينية الجميلة.',
        ageGroup: '4-12 سنة',
        icon: '🎪',
        lesson: 'التعلم الممتع أبقى في الذاكرة',
        activities: [
          'العب لعبة "من أنا؟" مع الأنبياء',
          'ارسم المسجد الحرام والكعبة',
          'انشد أناشيد دينية جميلة',
          'اعمل مسرحية عن قصة نبي',
          'العب لعبة "أسرع إجابة" الدينية',
          'اصنع أحجية بآيات قرآنية'
        ]
      },
      {
        id: 'nature_and_islam',
        title: 'الطبيعة في الإسلام',
        content: 'خلق الله الطبيعة جميلة لنستمتع بها ونحافظ عليها. الأشجار والزهور والطيور كلها تسبح الله. نحافظ على البيئة ولا نلوثها.',
        ageGroup: '5-12 سنة',
        icon: '🌿',
        lesson: 'المؤمن يحافظ على خلق الله',
        activities: [
          'ازرع شجرة أو زهرة',
          'لا ترم القمامة في الطبيعة',
          'اطعم الطيور والحيوانات',
          'تأمل في خلق الله واحمده',
          'وفر الماء والكهرباء',
          'نظف الحديقة أو الشارع'
        ]
      }
    ]
  }
];

const ChildrenEducationPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(educationCategories[0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<EducationItem | null>(null);

  // تم إزالة التشغيل الصوتي

  const markAsCompleted = (itemId: string) => {
    const newCompleted = completedItems.includes(itemId)
      ? completedItems.filter(id => id !== itemId)
      : [...completedItems, itemId];
    setCompletedItems(newCompleted);
    localStorage.setItem('completedEducationItems', JSON.stringify(newCompleted));
    
    if (!completedItems.includes(itemId)) {
      toast.success('🎉 أحسنت! تم إنجاز الدرس!');
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'from-emerald-500 to-emerald-600 border-emerald-200 dark:border-emerald-700',
      blue: 'from-blue-500 to-blue-600 border-blue-200 dark:border-blue-700',
      rose: 'from-rose-500 to-rose-600 border-rose-200 dark:border-rose-700',
      amber: 'from-amber-500 to-amber-600 border-amber-200 dark:border-amber-700',
      purple: 'from-purple-500 to-purple-600 border-purple-200 dark:border-purple-700'
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 font-amiri flex items-center">
          <GraduationCap className="w-10 h-10 ml-3" />
          تعليم الأطفال
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-noto-arabic">
          تعليم إسلامي مبسط وممتع للأطفال مع أنشطة تفاعلية ومكافآت تحفيزية
        </p>
      </div>

      {/* نصيحة تعليمية */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-8 border border-emerald-200 dark:border-emerald-700">
        <div className="flex items-center">
          <div className="text-emerald-600 dark:text-emerald-400 ml-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 mb-2">
              💡 نصيحة تعليمية
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300">
              تعلم مع والديك واجعل التعلم ممتعاً. اقرأ كل يوم واسأل عما لا تفهم. الممارسة اليومية للدروس تجعل التعلم أسهل وأمتع!
            </p>
          </div>
        </div>
      </div>

      {!selectedItem ? (
        <>
          {/* التصنيفات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {educationCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  selectedCategory.id === category.id
                    ? `bg-gradient-to-br ${getColorClasses(category.color)} text-white shadow-lg`
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center mb-3">
                  <div className={`${selectedCategory.id === category.id ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'} ml-3`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold font-amiri">{category.name}</h3>
                </div>
                <p className={`text-sm ${selectedCategory.id === category.id ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                  {category.description}
                </p>
                <div className="mt-4">
                  <span className={`text-sm font-medium ${selectedCategory.id === category.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                    📚 {category.items.length} دروس تعليمية ممتعة
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* الدروس */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedCategory.items.map(item => (
              <div 
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transform hover:scale-105 transition-all cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className={`h-32 bg-gradient-to-br ${getColorClasses(selectedCategory.color)} flex items-center justify-center relative`}>
                  <span className="text-6xl">{item.icon}</span>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-amiri mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-2">
                        {item.ageGroup}
                      </p>
                    </div>
                    

                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {item.content}
                  </p>
                  
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
                    <p className="text-emerald-800 dark:text-emerald-400 font-medium text-sm">
                      💡 {item.lesson}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* عرض الدرس التفصيلي */
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className={`h-48 bg-gradient-to-br ${getColorClasses(selectedCategory.color)} flex items-center justify-center relative`}>
            <span className="text-8xl">{selectedItem.icon}</span>
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 left-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              ← العودة
            </button>

          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 font-amiri mb-2">
                  {selectedItem.title}
                </h1>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {selectedItem.ageGroup}
                </p>
              </div>
              

            </div>

            {/* المحتوى */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-amiri">📖 الدرس</h2>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg border border-emerald-200 dark:border-emerald-700">
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
                  {selectedItem.content}
                </p>
              </div>
            </div>

            {/* الدرس المستفاد */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-amiri">💡 الدرس المستفاد</h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <p className="text-yellow-800 dark:text-yellow-400 font-medium">
                  {selectedItem.lesson}
                </p>
              </div>
            </div>

            {/* الأنشطة */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-amiri">🎯 الأنشطة التطبيقية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedItem.activities.map((activity, index) => (
                  <div key={index} className="flex items-start p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold ml-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* دعاء ختام الدرس */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-emerald-200 dark:border-emerald-700">
                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 mb-3">🤲 دعاء ختام الدرس</h3>
                <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                  "رب اشرح لي صدري ويسر لي أمري واحلل عقدة من لساني يفقهوا قولي"
                </p>
                <p className="text-emerald-600 dark:text-emerald-400 mt-2 text-sm">
                  اللهم علمنا ما ينفعنا وانفعنا بما علمتنا وزدنا علماً
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* نصائح للوالدين */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4 font-amiri">
          👨‍👩‍👧‍👦 نصائح للوالدين
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-green-700 dark:text-green-300">
          <div>
            <h4 className="font-bold mb-2">🎯 التعليم الفعال:</h4>
            <ul className="space-y-1">
              <li>• اجعل التعلم ممتعاً وتفاعلياً</li>
              <li>• استخدم القصص والأمثلة البسيطة</li>
              <li>• كرر الدروس بطرق مختلفة</li>
              <li>• احتفل بإنجازات طفلك الصغيرة</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">❤️ التحفيز والتشجيع:</h4>
            <ul className="space-y-1">
              <li>• امدح الجهد وليس فقط النتيجة</li>
              <li>• استخدم نظام المكافآت المعنوية</li>
              <li>• كن قدوة حسنة في التطبيق</li>
              <li>• اصبر على تكرار الأسئلة</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrenEducationPage;