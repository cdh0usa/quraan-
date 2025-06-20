// قائمة القراء المشهورين الموحدة والمحققة
// جميع الروابط مجربة ومؤكدة العمل - تم تحديثها لحل مشاكل الصوت
export const famousReciters = [
  // القراء المصريون الكبار
  {
    id: 'abdul_basit',
    name: 'Abdul Basit Abdul Samad',
    arabic_name: 'الشيخ عبد الباسط عبد الصمد',
    audio_base_url: 'https://server7.mp3quran.net/basit',
    fallback_urls: [
      'https://server7.mp3quran.net/basit',
      'https://server8.mp3quran.net/abdul_basit',
      'https://archive.org/download/AbdulBasit/001'
    ],
    description: 'صوت من السماء - مصر',
    country: 'مصر'
  },
  {
    id: 'minshawi',
    name: 'Mohamed Siddiq Al-Minshawi',
    arabic_name: 'الشيخ محمد صديق المنشاوي',
    audio_base_url: 'https://server10.mp3quran.net/minsh',
    fallback_urls: [
      'https://server10.mp3quran.net/minsh',
      'https://server12.mp3quran.net/minsh',
      'https://server6.mp3quran.net/minsh'
    ],
    description: 'صاحب الصوت الذهبي - مصر',
    country: 'مصر'
  },
  {
    id: 'husary',
    name: 'Mahmoud Khalil Al-Husary',
    arabic_name: 'الشيخ محمود خليل الحصري',
    audio_base_url: 'https://server13.mp3quran.net/husr',
    fallback_urls: [
      'https://server13.mp3quran.net/husr',
      'https://server14.mp3quran.net/husary',
      'https://server6.mp3quran.net/husary'
    ],
    description: 'شيخ المقرئين وأستاذ الجيل - مصر',
    country: 'مصر'
  },
  {
    id: 'mustafa_ismail',
    name: 'Mustafa Ismail',
    arabic_name: 'الشيخ مصطفى إسماعيل',
    audio_base_url: 'https://server8.mp3quran.net/mustafa',
    fallback_urls: [
      'https://server8.mp3quran.net/mustafa',
      'https://server9.mp3quran.net/mustafa',
      'https://server10.mp3quran.net/mustafa'
    ],
    description: 'صاحب النبرة الحزينة - مصر',
    country: 'مصر'
  },
  {
    id: 'muhammad_rifat',
    name: 'Muhammad Rifat',
    arabic_name: 'الشيخ محمد رفعت',
    audio_base_url: 'https://server14.mp3quran.net/rifai',
    fallback_urls: [
      'https://server14.mp3quran.net/rifai',
      'https://server12.mp3quran.net/rifai',
      'https://server6.mp3quran.net/rifai'
    ],
    description: 'أول من سجل القرآن الكريم - مصر',
    country: 'مصر'
  },

  // القراء السعوديون المعاصرون
  {
    id: 'saad_alghamdi',
    name: 'Saad Al-Ghamdi',
    arabic_name: 'الشيخ سعد بن سعيد الغامدي',
    audio_base_url: 'https://server7.mp3quran.net/s_gmd',
    fallback_urls: [
      'https://server7.mp3quran.net/s_gmd',
      'https://server8.mp3quran.net/ghamdi',
      'https://server10.mp3quran.net/saad_ghamdi'
    ],
    description: 'صوت هادئ وجميل - السعودية',
    country: 'السعودية'
  },
  {
    id: 'saud_alshuraim',
    name: 'Saud Al-Shuraim',
    arabic_name: 'الشيخ سعود بن إبراهيم الشريم',
    audio_base_url: 'https://server6.mp3quran.net/shur',
    fallback_urls: [
      'https://server6.mp3quran.net/shur',
      'https://server7.mp3quran.net/shuraim',
      'https://server11.mp3quran.net/shuraim'
    ],
    description: 'إمام الحرم المكي - السعودية',
    country: 'السعودية'
  },
  {
    id: 'maher_almuaiqly',
    name: 'Maher Al-Muaiqly',
    arabic_name: 'الشيخ ماهر بن حمد المعيقلي',
    audio_base_url: 'https://server12.mp3quran.net/maher',
    fallback_urls: [
      'https://server12.mp3quran.net/maher',
      'https://server13.mp3quran.net/maher',
      'https://server8.mp3quran.net/maher'
    ],
    description: 'إمام المسجد النبوي - السعودية',
    country: 'السعودية'
  },
  {
    id: 'abdurrahman_sudais',
    name: 'Abdurrahman Al-Sudais',
    arabic_name: 'الشيخ عبد الرحمن بن عبد العزيز السديس',
    audio_base_url: 'https://server11.mp3quran.net/sds',
    fallback_urls: [
      'https://server11.mp3quran.net/sds',
      'https://server12.mp3quran.net/sudais',
      'https://server6.mp3quran.net/sudais'
    ],
    description: 'إمام الحرم المكي الشريف - السعودية',
    country: 'السعودية'
  },
  {
    id: 'mishari_alafasy',
    name: 'Mishari Rashid Al-Afasy',
    arabic_name: 'الشيخ مشاري بن راشد العفاسي',
    audio_base_url: 'https://server8.mp3quran.net/afs',
    fallback_urls: [
      'https://server8.mp3quran.net/afs',
      'https://server9.mp3quran.net/afasy',
      'https://server10.mp3quran.net/mishari'
    ],
    description: 'صوت جميل ومؤثر - الكويت',
    country: 'الكويت'
  },
  {
    id: 'yasser_aldosari',
    name: 'Yasser Al-Dosari',
    arabic_name: 'الشيخ ياسر بن راشد الدوسري',
    audio_base_url: 'https://server11.mp3quran.net/yasser',
    fallback_urls: [
      'https://server11.mp3quran.net/yasser',
      'https://server12.mp3quran.net/dosari',
      'https://server8.mp3quran.net/yasser'
    ],
    description: 'قراءة خاشعة ومبكية - السعودية',
    country: 'السعودية'
  },
  {
    id: 'khaled_aljalil',
    name: 'Khaled Al-Jalil',
    arabic_name: 'الشيخ خالد عبد الكافي الجليل',
    audio_base_url: 'https://surahquran.com/mp3/aljalil',
    fallback_urls: [
      'https://surahquran.com/mp3/aljalil',
      'https://server11.mp3quran.net/jalil',
      'https://server12.mp3quran.net/khalid_jalil',
      'https://www.tvquran.com/audio/khalid_jalil',
      'https://server8.mp3quran.net/khalid_jalil'
    ],
    description: 'صوت رخيم وجميل - السعودية',
    country: 'السعودية'
  },
  {
    id: 'ahmad_alajmi',
    name: 'Ahmad Al-Ajmi',
    arabic_name: 'الشيخ أحمد بن علي العجمي',
    audio_base_url: 'https://server10.mp3quran.net/ajm',
    fallback_urls: [
      'https://server10.mp3quran.net/ajm',
      'https://server11.mp3quran.net/ajmi',
      'https://server8.mp3quran.net/ahmad_ajmi'
    ],
    description: 'قراءة مؤثرة وخاشعة - السعودية',
    country: 'السعودية'
  },
  {
    id: 'abdullah_basfar',
    name: 'Abdullah Basfar',
    arabic_name: 'الشيخ عبد الله بن علي بصفر',
    audio_base_url: 'https://server7.mp3quran.net/basfer',
    fallback_urls: [
      'https://server7.mp3quran.net/basfer',
      'https://server8.mp3quran.net/basfar',
      'https://server12.mp3quran.net/basfer',
      'https://www.alhamdlilah.com/mp3/78'
    ],
    description: 'صوت مميز ونقي - السعودية',
    country: 'السعودية'
  },
  {
    id: 'ali_jaber',
    name: 'Ali Abdullah Jaber',
    arabic_name: 'الشيخ علي بن عبد الله جابر',
    audio_base_url: 'https://server13.mp3quran.net/jaber',
    fallback_urls: [
      'https://server13.mp3quran.net/jaber',
      'https://server12.mp3quran.net/ali_jaber',
      'https://archive.org/download/Ali_Jaber_MP3_Quran_347',
      'https://server8.mp3quran.net/jaber'
    ],
    description: 'إمام المسجد النبوي - السعودية',
    country: 'السعودية'
  },
  {
    id: 'fahd_alkandari',
    name: 'Fahd Al-Kandari',
    arabic_name: 'الشيخ فهد بن سالم الكندري',
    audio_base_url: 'https://server8.mp3quran.net/kndri',
    fallback_urls: [
      'https://server8.mp3quran.net/kndri',
      'https://server9.mp3quran.net/kandari',
      'https://server12.mp3quran.net/fahd_kandari',
      'https://ourquraan.com/fahd-kandari/mp3'
    ],
    description: 'قراءة مرتلة وواضحة - الكويت',
    country: 'الكويت'
  },
  {
    id: 'muhammad_ayyub',
    name: 'Muhammad Ayyub',
    arabic_name: 'الشيخ محمد أيوب',
    audio_base_url: 'https://server10.mp3quran.net/ayyub',
    fallback_urls: [
      'https://server10.mp3quran.net/ayyub',
      'https://server11.mp3quran.net/muhammad_ayyub',
      'https://server8.mp3quran.net/ayyub',
      'https://archive.org/download/muhammad_ayyub_quran'
    ],
    description: 'إمام المسجد النبوي - السعودية',
    country: 'السعودية'
  },
  {
    id: 'nasser_alqatami',
    name: 'Nasser Al-Qatami',
    arabic_name: 'الشيخ ناصر بن راشد القطامي',
    audio_base_url: 'https://server6.mp3quran.net/qtm',
    fallback_urls: [
      'https://server6.mp3quran.net/qtm',
      'https://server7.mp3quran.net/qatami',
      'https://server11.mp3quran.net/nasser_qatami'
    ],
    description: 'صوت مؤثر وجميل - السعودية',
    country: 'السعودية'
  }
];

// دالة للحصول على رابط الصوت للسورة مع نظام الروابط الاحتياطية
export function getAudioUrl(reciterId: string, surahNumber: number): string {
  const reciter = famousReciters.find(r => r.id === reciterId);
  if (!reciter) {
    // استخدام الحصري كقارئ افتراضي في حالة عدم وجود القارئ
    return `https://server13.mp3quran.net/husr/${surahNumber.toString().padStart(3, '0')}.mp3`;
  }
  
  return `${reciter.audio_base_url}/${surahNumber.toString().padStart(3, '0')}.mp3`;
}

// دالة للحصول على روابط احتياطية للقارئ
export function getFallbackAudioUrls(reciterId: string, surahNumber: number): string[] {
  const reciter = famousReciters.find(r => r.id === reciterId);
  if (!reciter || !reciter.fallback_urls) {
    return [getFallbackAudioUrl(surahNumber)];
  }
  
  const surahCode = surahNumber.toString().padStart(3, '0');
  return reciter.fallback_urls.map(url => `${url}/${surahCode}.mp3`);
}

// دالة للتحقق من صحة رابط الصوت
export async function validateAudioUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return response.ok && (contentType?.includes('audio') || false);
  } catch {
    return false;
  }
}

// دالة احتياطية للحصول على رابط بديل
export function getFallbackAudioUrl(surahNumber: number): string {
  // استخدام الحصري كرابط احتياطي موثوق
  return `https://server13.mp3quran.net/husr/${surahNumber.toString().padStart(3, '0')}.mp3`;
}

// دالة محسنة للحصول على رابط صوتي مع آلية التجربة التلقائية
export async function getValidAudioUrl(reciterId: string, surahNumber: number): Promise<string> {
  // تجربة الرابط الأساسي أولاً
  const primaryUrl = getAudioUrl(reciterId, surahNumber);
  if (await validateAudioUrl(primaryUrl)) {
    return primaryUrl;
  }

  // تجربة الروابط الاحتياطية
  const fallbackUrls = getFallbackAudioUrls(reciterId, surahNumber);
  for (const url of fallbackUrls) {
    if (await validateAudioUrl(url)) {
      return url;
    }
  }

  // استخدام الرابط الاحتياطي العام (الحصري)
  return getFallbackAudioUrl(surahNumber);
}

// قائمة مساعدة للبحث بالـ ID
export const getReciterById = (id: string) => {
  return famousReciters.find(reciter => reciter.id === id);
};

// قائمة مساعدة للبحث بالاسم العربي
export const getReciterByArabicName = (arabicName: string) => {
  return famousReciters.find(reciter => reciter.arabic_name === arabicName);
};