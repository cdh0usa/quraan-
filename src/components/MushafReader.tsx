import React, { useState, useEffect, useRef } from 'react';
import { Ayah, Tafseer } from '../types';
import { fetchTafseer } from '../api/quranApi';
import { Book, X, ChevronLeft, ChevronRight, Loader2, Volume2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface MushafReaderProps {
  ayahs: Ayah[];
  surahNumber: number;
  surahName: string;
  loading: boolean;
}

const MushafReader: React.FC<MushafReaderProps> = ({ 
  ayahs, 
  surahNumber, 
  surahName,
  loading 
}) => {
  const [selectedAyah, setSelectedAyah] = useState<number | null>(null);
  const [tafseer, setTafseer] = useState<Tafseer | null>(null);
  const [tafseerLoading, setTafseerLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // تقسيم الآيات حسب صفحات المصحف الحقيقية
  // كل صفحة تحتوي على عدد مختلف من الآيات حسب طولها
  const getAyahsForPage = (pageNum: number) => {
    if (!ayahs.length) return [];
    
    // تقسيم بسيط - يمكن تحسينه لاحقاً باستخدام API صفحات المصحف
    const ayahsPerPage = Math.ceil(ayahs.length / Math.min(10, ayahs.length));
    const startIndex = (pageNum - 1) * ayahsPerPage;
    const endIndex = Math.min(startIndex + ayahsPerPage, ayahs.length);
    
    return ayahs.slice(startIndex, endIndex);
  };
  
  const totalPages = Math.min(10, ayahs.length > 0 ? Math.ceil(ayahs.length / Math.ceil(ayahs.length / 10)) : 1);
  const currentAyahs = getAyahsForPage(currentPage);
  
  // إنشاء عنصر الصوت
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('ended', () => {
        setIsAudioLoading(false);
      });
      audioRef.current.addEventListener('loadstart', () => {
        setIsAudioLoading(true);
      });
      audioRef.current.addEventListener('canplay', () => {
        setIsAudioLoading(false);
      });
      audioRef.current.addEventListener('error', (e) => {
        setIsAudioLoading(false);
        console.error('Audio error:', e);
        toast.error('تعذر تشغيل الآية');
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);
  
  // التعامل مع النقر على الآية - تشغيل الصوت وإظهار التفسير
  const handleAyahClick = async (ayahNumber: number) => {
    // إظهار/إخفاء التفسير
    if (selectedAyah === ayahNumber) {
      setSelectedAyah(null);
      setTafseer(null);
      // إيقاف الصوت إذا كان يعمل
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setSelectedAyah(ayahNumber);
      
      // تحميل التفسير
      setTafseerLoading(true);
      try {
        const tafseerData = await fetchTafseer(surahNumber, ayahNumber);
        setTafseer(tafseerData);
      } catch (error) {
        console.error('Error fetching tafseer:', error);
        toast.error('تعذر تحميل التفسير');
      } finally {
        setTafseerLoading(false);
      }

      // تشغيل الصوت
      if (audioRef.current) {
        try {
          // إيقاف أي تشغيل سابق
          audioRef.current.pause();
          
          // استخدام API صوت موثوق للآيات المفردة - الشيخ الحصري
          const formattedSurah = surahNumber.toString().padStart(3, '0');
          const formattedAyah = ayahNumber.toString().padStart(3, '0');
          const audioUrl = `https://everyayah.com/data/Husary_64kbps/${formattedSurah}${formattedAyah}.mp3`;
          
          audioRef.current.src = audioUrl;
          audioRef.current.load(); // إجبار التحميل
          setIsAudioLoading(true);
          
          // إضافة تأخير قصير للتحميل
          setTimeout(async () => {
            try {
              const playPromise = audioRef.current?.play();
              if (playPromise !== undefined) {
                await playPromise;
                console.log(`Playing: ${audioUrl}`);
              }
            } catch (error) {
              console.error('Error playing audio:', error);
              setIsAudioLoading(false);
              // جرب رابط بديل
              tryAlternativeAudio(ayahNumber);
            }
          }, 100);
          
        } catch (error) {
          console.error('Error playing ayah:', error);
          setIsAudioLoading(false);
          tryAlternativeAudio(ayahNumber);
        }
      }
    }
  };
  
  // محاولة روابط صوت بديلة متعددة
  const tryAlternativeAudio = async (ayahNumber: number) => {
    if (!audioRef.current) return;
    
    const formattedSurah = surahNumber.toString().padStart(3, '0');
    const formattedAyah = ayahNumber.toString().padStart(3, '0');
    
    // قائمة الروابط البديلة للصوت
    const alternativeUrls = [
      // API آخر للشيخ الحصري
      `https://www.everyayah.com/data/Husary_128kbps/${formattedSurah}${formattedAyah}.mp3`,
      // API مختلف للشيخ الحصري
      `https://cdn.islamic.network/quran/audio/128/ar.husary/${surahNumber}:${ayahNumber}.mp3`,
      // API بديل آخر
      `https://audio.qurancdn.com/Husary_128kbps/${formattedSurah}${formattedAyah}.mp3`,
      // رابط آخر للصوت
      `https://server13.mp3quran.net/husr/${formattedSurah}.mp3`
    ];
    
    for (const url of alternativeUrls) {
      try {
        console.log(`Trying alternative audio: ${url}`);
        audioRef.current.src = url;
        audioRef.current.load();
        
        // انتظار تحميل الصوت
        await new Promise((resolve, reject) => {
          const onLoad = () => {
            audioRef.current?.removeEventListener('canplay', onLoad);
            audioRef.current?.removeEventListener('error', onError);
            resolve(true);
          };
          const onError = () => {
            audioRef.current?.removeEventListener('canplay', onLoad);
            audioRef.current?.removeEventListener('error', onError);
            reject(new Error('Failed to load'));
          };
          
          audioRef.current?.addEventListener('canplay', onLoad);
          audioRef.current?.addEventListener('error', onError);
        });
        
        // إذا تم التحميل بنجاح، شغل الصوت
        await audioRef.current.play();
        console.log(`Successfully playing: ${url}`);
        return; // خروج من الحلقة عند النجاح
        
      } catch (error) {
        console.log(`Failed to play: ${url}`, error);
        continue; // جرب الرابط التالي
      }
    }
    
    // إذا فشلت جميع الروابط
    console.error('All alternative audio sources failed');
    setIsAudioLoading(false);
    toast.error('تعذر تشغيل الآية. تحقق من اتصال الإنترنت');
  };
  
  // إغلاق نافذة التفسير
  const closeTafseer = () => {
    setSelectedAyah(null);
    setTafseer(null);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  
  // الانتقال بين الصفحات
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedAyah(null);
      setTafseer(null);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6 mx-auto"></div>
        <div className="space-y-4">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* رأس المصحف */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-t-lg p-6 text-center border-2 border-amber-500">
        <h2 className="text-3xl font-bold font-amiri mb-2">المصحف الشريف</h2>
        <p className="text-amber-100 font-noto-arabic">سورة {surahName} - صفحة {currentPage} من {totalPages}</p>
      </div>

      {/* صفحة المصحف */}
      <div className="mushaf-page min-h-[700px] p-8 border-x-4 border-amber-300 dark:border-amber-600 shadow-inner">
        <div className="max-w-4xl mx-auto">
          {/* الآيات */}
          <div className="space-y-8">
            {currentAyahs.map((ayah) => (
              <div key={ayah.numberInSurah} className="group">
                <div 
                  className={`mushaf-verse px-6 py-5 rounded-xl text-right transition-all duration-300 cursor-pointer ${
                    selectedAyah === ayah.numberInSurah 
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 shadow-lg transform scale-[1.02] border-2 border-emerald-300 dark:border-emerald-600' 
                      : 'hover:bg-white/60 dark:hover:bg-gray-800/50 hover:shadow-md border-2 border-transparent hover:border-emerald-200 dark:hover:border-emerald-700'
                  }`}
                  onClick={() => handleAyahClick(ayah.numberInSurah)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full text-sm font-bold shadow-md">
                        {ayah.numberInSurah}
                      </span>
                      {selectedAyah === ayah.numberInSurah && (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          {isAudioLoading ? (
                            <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                          ) : (
                            <Volume2 className="w-5 h-5 text-emerald-600" />
                          )}
                          <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                            {isAudioLoading ? 'جاري التحميل...' : 'يتم التشغيل'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-2xl leading-loose text-gray-800 dark:text-gray-100 font-amiri select-all text-justify">
                    {ayah.text}
                  </p>
                  
                                     {selectedAyah === ayah.numberInSurah && (
                     <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
                       <div className="flex items-center justify-between text-sm">
                         <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                           {isAudioLoading ? 'جاري تحميل الصوت...' : 'يتم تشغيل الآية'}
                         </span>
                         <span className="text-emerald-500 dark:text-emerald-300 text-xs">
                           اضغط مرة أخرى للإغلاق
                         </span>
                       </div>
                     </div>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* أسفل المصحف - أزرار التنقل */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-b-lg p-6 border-2 border-amber-500">
        <div className="flex items-center justify-between">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              currentPage === 1 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-amber-800 dark:hover:bg-amber-500 transform hover:scale-105'
            }`}
          >
            <ChevronRight className="w-5 h-5 ml-2" />
            الصفحة السابقة
          </button>
          
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              if (page > totalPages) return null;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-12 h-12 rounded-full font-bold transition-all ${
                    page === currentPage 
                      ? 'bg-white text-amber-600 shadow-lg transform scale-110' 
                      : 'bg-amber-800 hover:bg-amber-900 text-white hover:scale-105'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              currentPage === totalPages 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-amber-800 dark:hover:bg-amber-500 transform hover:scale-105'
            }`}
          >
            الصفحة التالية
            <ChevronLeft className="w-5 h-5 mr-2" />
          </button>
        </div>
      </div>

      {/* نافذة التفسير */}
      {selectedAyah && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
              <h3 className="font-bold text-xl font-amiri">
                تفسير الآية {selectedAyah} من سورة {surahName}
              </h3>
              <button
                onClick={closeTafseer}
                className="p-2 rounded-full hover:bg-emerald-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-5rem)]">
              {tafseerLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                </div>
              ) : (
                <>
                  {/* نص الآية */}
                  <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-6 rounded-xl mb-6 border-2 border-emerald-200 dark:border-emerald-700">
                    <p className="text-center text-2xl mb-4 text-gray-800 dark:text-gray-200 font-amiri leading-loose">
                      {ayahs.find(a => a.numberInSurah === selectedAyah)?.text}
                    </p>
                    <div className="text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-emerald-600 text-white rounded-full text-sm font-bold">
                        {selectedAyah}
                      </span>
                    </div>
                  </div>
                  
                  {/* التفسير */}
                  <div className="flex items-start mb-6">
                    <Book className="w-6 h-6 text-emerald-600 dark:text-emerald-500 mt-1 ml-3" />
                    <h4 className="font-bold text-emerald-800 dark:text-emerald-400 text-xl font-amiri">التفسير:</h4>
                  </div>
                  
                  {tafseer && (
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed text-justify font-noto-arabic">
                        {tafseer.text}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MushafReader; 