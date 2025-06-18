import React, { useState, useEffect } from 'react';
import { Surah } from '../types';
import { fetchSurahs, testAudioUrl } from '../api/quranApi';
import { getReciters } from '../services/supabase';
import { famousReciters } from '../data/reciters';
import { Headphones, Play, Pause, Download, Search, Volume2, SkipBack, SkipForward, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Reciter {
  id: string;
  name: string;
  arabic_name: string;
  audio_base_url: string;
  description?: string;
}

const AudioQuranPage: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedReciter, setSelectedReciter] = useState<Reciter | null>(null);
  const [playingSurah, setPlayingSurah] = useState<number | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch surahs and reciters on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const surahsData = await fetchSurahs();
        setSurahs(surahsData);
        setFilteredSurahs(surahsData);
        
        // Load reciters from database and combine with famous reciters
        try {
          const dbReciters = await getReciters();
          const allReciters = [...famousReciters, ...dbReciters];
          setReciters(allReciters);
          
          if (allReciters.length > 0) {
            setSelectedReciter(allReciters[0]);
          }
        } catch (error) {
          // If database fails, use famous reciters only
          console.warn('Database reciters not available, using famous reciters only');
          setReciters(famousReciters);
          setSelectedReciter(famousReciters[0]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Create audio element with better configuration
    const audio = new Audio();
    audio.volume = 0.7;
    audio.preload = 'none'; // Don't preload to avoid CORS issues
    
    // Remove crossOrigin to avoid CORS issues
    // audio.crossOrigin = 'anonymous';
    
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setPlayingSurah(null);
      setCurrentTime(0);
      setIsPlaying(false);
    };
    const handleError = (e: any) => {
      console.error('Audio error:', {
        type: e.type,
        error: e.target?.error,
        networkState: e.target?.networkState,
        readyState: e.target?.readyState,
        src: e.target?.src
      });
      setIsLoading(false);
      setPlayingSurah(null);
      setIsPlaying(false);
      
      // Show user-friendly error message
      const errorCode = e.target?.error?.code;
      let errorMessage = 'حدث خطأ أثناء تشغيل الصوت';
      
      if (errorCode === 4) { // MEDIA_ERR_SRC_NOT_SUPPORTED
        errorMessage = 'تعذر تشغيل الملف الصوتي. جرب قارئ آخر أو حاول مرة أخرى لاحقاً';
      } else if (errorCode === 2) { // MEDIA_ERR_NETWORK
        errorMessage = 'خطأ في الشبكة. تحقق من اتصالك بالإنترنت';
      } else if (errorCode === 3) { // MEDIA_ERR_DECODE
        errorMessage = 'تعذر فك تشفير الملف الصوتي. جرب قارئ آخر';
      }
      
      toast.error(errorMessage);
    };
    
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    
    setAudioElement(audio);

    // Cleanup
    return () => {
      if (audio) {
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  // Handle search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSurahs(surahs);
    } else {
      const filtered = surahs.filter(
        (surah) =>
          surah.name.includes(searchQuery) ||
          surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          surah.number.toString() === searchQuery
      );
      setFilteredSurahs(filtered);
    }
  }, [searchQuery, surahs]);

  // Get audio URL for surah
  const getAudioUrl = (surahNumber: number, reciter: Reciter) => {
    const formattedSurahNumber = surahNumber.toString().padStart(3, '0');
    return `${reciter.audio_base_url}/${formattedSurahNumber}.mp3`;
  };



  // Handle play/pause with better error handling
  const togglePlay = async (surahNumber: number) => {
    if (!audioElement || !selectedReciter) return;

    if (playingSurah === surahNumber && isPlaying) {
      // Currently playing this surah, pause it
      audioElement.pause();
      setIsPlaying(false);
    } else if (playingSurah === surahNumber && !isPlaying) {
      // Same surah but paused, resume
      try {
        await audioElement.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error resuming audio:', error);
        toast.error('حدث خطأ أثناء استئناف التشغيل');
        setPlayingSurah(null);
        setIsPlaying(false);
      }
    } else {
      // Different surah or first time playing
      if (playingSurah !== null) {
        audioElement.pause();
      }

      setIsLoading(true);
      const audioUrl = getAudioUrl(surahNumber, selectedReciter);
      
      try {
        audioElement.src = audioUrl;
        audioElement.load();
        
        // Add user interaction requirement for mobile browsers
        const playPromise = audioElement.play();
        
        if (playPromise !== undefined) {
          await playPromise;
        }
        
        setPlayingSurah(surahNumber);
        setIsPlaying(true);
        toast.success(`بدأ تشغيل ${surahs.find(s => s.number === surahNumber)?.name}`);
      } catch (error: any) {
        console.error('Error playing audio:', error);
        
        // Handle different types of errors
        if (error.name === 'NotAllowedError') {
          toast.error('يرجى النقر على زر التشغيل مرة أخرى لبدء التشغيل');
        } else if (error.name === 'NotSupportedError') {
          toast.error('المتصفح لا يدعم تشغيل هذا النوع من الملفات الصوتية');
        } else {
          toast.error('حدث خطأ أثناء تشغيل الصوت. جرب قارئ آخر أو حاول مرة أخرى');
        }
        
        setPlayingSurah(null);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle reciter change
  const handleReciterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const reciterId = e.target.value;
    const reciter = reciters.find(r => r.id === reciterId);
    if (reciter) {
      setSelectedReciter(reciter);
      
      // If currently playing, stop and reset
      if (playingSurah !== null && audioElement) {
        audioElement.pause();
        setPlayingSurah(null);
        setIsPlaying(false);
        setCurrentTime(0);
        toast.success(`تم تغيير القارئ إلى ${reciter.arabic_name}`);
      }
    }
  };

  // Handle download with better approach
  const handleDownload = (surahNumber: number, surahName: string) => {
    if (!selectedReciter) return;
    
    const audioUrl = getAudioUrl(surahNumber, selectedReciter);
    
    // Use window.open for better compatibility
    window.open(audioUrl, '_blank');
    toast.success(`جاري تحميل سورة ${surahName}`);
  };

  // Handle seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioElement || duration === 0) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const seekPosition = (e.clientX - rect.left) / rect.width;
    const newTime = seekPosition * duration;
    
    audioElement.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (audioElement) {
      audioElement.volume = newVolume;
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get next/previous surah
  const getNextSurah = () => {
    if (!playingSurah) return null;
    return playingSurah < 114 ? playingSurah + 1 : 1;
  };

  const getPreviousSurah = () => {
    if (!playingSurah) return null;
    return playingSurah > 1 ? playingSurah - 1 : 114;
  };

  // Handle next/previous
  const playNext = () => {
    const nextSurah = getNextSurah();
    if (nextSurah) {
      togglePlay(nextSurah);
    }
  };

  const playPrevious = () => {
    const previousSurah = getPreviousSurah();
    if (previousSurah) {
      togglePlay(previousSurah);
    }
  };

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-400 mb-2 font-amiri">
          المصحف المسموع
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg font-noto-arabic">
          استمع إلى القرآن الكريم بأصوات أشهر القراء في العالم الإسلامي
        </p>
      </div>

      {/* Audio Player Controls */}
      {playingSurah && (
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl shadow-lg p-6 mb-6 sticky top-4 z-10 border border-emerald-200 dark:border-emerald-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center ml-4 shadow-md">
                <span className="text-lg font-bold">{playingSurah}</span>
              </div>
              <div>
                <h3 className="font-amiri text-xl font-bold text-emerald-800 dark:text-emerald-400">
                  {surahs.find(s => s.number === playingSurah)?.name}
                </h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-500">
                  {selectedReciter?.arabic_name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={playPrevious}
                className="p-3 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-md"
                title="السورة السابقة"
              >
                <SkipBack className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
              </button>
              
              <button
                onClick={() => togglePlay(playingSurah)}
                disabled={isLoading}
                className="p-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50 shadow-lg transform hover:scale-105"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              
              <button
                onClick={playNext}
                className="p-3 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-md"
                title="السورة التالية"
              >
                <SkipForward className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-sm text-emerald-700 dark:text-emerald-400 font-medium ml-2 min-w-[45px]">
              {formatTime(currentTime)}
            </span>
            
            <div
              className="flex-1 h-3 bg-emerald-200 dark:bg-emerald-800 rounded-full overflow-hidden cursor-pointer shadow-inner"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-100 rounded-full"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            
            <span className="text-sm text-emerald-700 dark:text-emerald-400 font-medium min-w-[45px]">
              {duration > 0 ? formatTime(duration) : '--:--'}
            </span>
          </div>
          
          {/* Volume Control */}
          <div className="flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500 ml-3" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-32 accent-emerald-600"
            />
            <span className="text-sm text-emerald-600 dark:text-emerald-500 mr-2 min-w-[35px]">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              اختر القارئ:
            </label>
            <select
              value={selectedReciter?.id || ''}
              onChange={handleReciterChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm"
            >
              {reciters.map(reciter => (
                <option key={reciter.id} value={reciter.id}>
                  {reciter.arabic_name} {reciter.description && `- ${reciter.description}`}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ابحث عن سورة:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن سورة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors shadow-sm"
              />
              <Search className="absolute top-4 left-4 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 ml-3" />
            <span className="text-gray-600 dark:text-gray-400">جاري تحميل السور...</span>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredSurahs.map((surah) => (
              <div 
                key={surah.number}
                className={`border-2 rounded-xl p-6 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  playingSurah === surah.number
                    ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-amiri text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {surah.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {surah.englishName} • {surah.numberOfAyahs} آية
                    </p>
                    <span className={`text-xs py-1 px-3 rounded-full inline-block ${
                      surah.revelationType === 'Meccan' 
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                    }`}>
                      {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                    </span>
                  </div>
                  <div className={`rounded-full w-12 h-12 flex items-center justify-center shadow-md ${
                    playingSurah === surah.number
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400'
                  }`}>
                    <span className="text-sm font-bold">{surah.number}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6 gap-3">
                  <button
                    onClick={() => togglePlay(surah.number)}
                    disabled={!selectedReciter || isLoading}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 flex-1 justify-center font-medium ${
                      playingSurah === surah.number && isPlaying
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md'
                        : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-800/50'
                    }`}
                  >
                    {isLoading && playingSurah === surah.number ? (
                      <>
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        <span>جاري التحميل...</span>
                      </>
                    ) : playingSurah === surah.number && isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 ml-2" />
                        <span>إيقاف</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 ml-2" />
                        <span>استماع</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleDownload(surah.number, surah.name)}
                    disabled={!selectedReciter}
                    className="flex items-center px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 shadow-sm"
                    title="تحميل السورة"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredSurahs.length === 0 && (
            <div className="text-center py-16">
              <Headphones className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                لا توجد سور مطابقة لبحثك
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                جرب البحث بكلمات أخرى أو تصفح جميع السور
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioQuranPage;