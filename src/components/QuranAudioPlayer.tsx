import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, https://chat.whatsapp.com/KAfa2oGkc5I5N2S2K1D4rt, Volume2, Download, Loader2, AlertCircle } from 'lucide-react';
import { Reciter } from '../types';
import { famousReciters } from '../data/reciters';
import { testAudioUrl } from '../api/quranApi';
import toast from 'react-hot-toast';

interface QuranAudioPlayerProps {
  surahNumber: number;
  reciterId: string;
  reciters: Reciter[];
  onReciterChange: (reciterId: string) => void;
}

const QuranAudioPlayer: React.FC<QuranAudioPlayerProps> = ({ 
  surahNumber, 
  reciterId,
  reciters,
  onReciterChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [audioTested, setAudioTested] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  
  // Use provided reciters or fallback to famous reciters
  const availableReciters = reciters && reciters.length > 0 ? reciters : famousReciters;
  const selectedReciter = availableReciters.find(r => r.id === reciterId) || availableReciters[0];
  
  // Get audio URL for surah with fallback options
  const getAudioUrl = (surahNum: number, reciter: Reciter) => {
    const formattedSurahNumber = surahNum.toString().padStart(3, '0');
    return `${reciter.audio_base_url}/${formattedSurahNumber}.mp3`;
  };
  
  // Try alternative servers if main one fails
  const getAlternativeUrls = (surahNum: number, reciter: Reciter) => {
    const formattedSurahNumber = surahNum.toString().padStart(3, '0');
    const baseUrl = reciter.audio_base_url;
    
    // Generate alternative URLs by changing server numbers
    const alternatives = [];
    
    // Extract server number and try nearby servers
    const serverMatch = baseUrl.match(/server(\d+)/);
    if (serverMatch) {
      const currentServer = parseInt(serverMatch[1]);
      const baseUrlPattern = baseUrl.replace(/server\d+/, 'server{NUM}');
      
      // Try servers ±3 from current
      for (let i = Math.max(1, currentServer - 3); i <= currentServer + 3; i++) {
        if (i !== currentServer) {
          alternatives.push(baseUrlPattern.replace('{NUM}', i.toString()) + `/${formattedSurahNumber}.mp3`);
        }
      }
    }
    
    return alternatives;
  };
  
  const audioUrl = selectedReciter ? getAudioUrl(surahNumber, selectedReciter) : '';
  
  useEffect(() => {
    if (audioRef.current && selectedReciter) {
      // Reset player when surah or reciter changes
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setIsLoading(true);
      setHasError(false);
      setAudioTested(false);
      
      // Load new audio
      loadAudio();
    }
  }, [surahNumber, reciterId, audioUrl]);
  
  const loadAudio = async () => {
    if (!audioRef.current || !selectedReciter) return;
    
    const primaryUrl = getAudioUrl(surahNumber, selectedReciter);
    
    try {
      // Test primary URL first
      const isPrimaryAvailable = await testAudioUrl(primaryUrl);
      
      if (isPrimaryAvailable) {
        audioRef.current.src = primaryUrl;
        audioRef.current.load();
        setAudioTested(true);
      } else {
        // Try alternative URLs
        const alternatives = getAlternativeUrls(surahNumber, selectedReciter);
        let foundWorking = false;
        
        for (const altUrl of alternatives) {
          const isAvailable = await testAudioUrl(altUrl);
          if (isAvailable) {
            audioRef.current.src = altUrl;
            audioRef.current.load();
            setAudioTested(true);
            foundWorking = true;
            break;
          }
        }
        
        if (!foundWorking) {
          // If no alternatives work, still try to load primary (might work during playback)
          audioRef.current.src = primaryUrl;
          audioRef.current.load();
          setAudioTested(true);
          toast.error('قد يكون هناك مشكلة في تحميل الصوت، سيتم المحاولة عند التشغيل');
        }
      }
    } catch (error) {
      // If testing fails, still try to load primary URL
      audioRef.current.src = primaryUrl;
      audioRef.current.load();
      setAudioTested(true);
    }
  };
  
  // Handle metadata loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
      setHasError(false);
    }
  };
  
  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  // Handle play/pause with better error handling
  const togglePlay = async () => {
    if (!audioRef.current || !audioTested) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
        setIsPlaying(true);
        setHasError(false);
      }
    } catch (error: any) {
      console.error('Error playing audio:', error);
      setHasError(true);
      
      if (error.name === 'NotAllowedError') {
        toast.error('يرجى النقر على زر التشغيل مرة أخرى لبدء التشغيل');
      } else if (error.name === 'NotSupportedError') {
        toast.error('المتصفح لا يدعم تشغيل هذا النوع من الملفات الصوتية');
      } else if (error.name === 'AbortError') {
        toast.error('تم إلغاء تحميل الصوت');
      } else {
        toast.error('حدث خطأ أثناء تشغيل الصوت. جرب قارئ آخر');
      }
      setIsLoading(false);
    }
  };
  
  // Handle seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLoading || !progressRef.current || !audioRef.current || hasError) return;
    
    const progressRect = progressRef.current.getBoundingClientRect();
    const seekPosition = (e.clientX - progressRect.left) / progressRect.width;
    
    audioRef.current.currentTime = seekPosition * duration;
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  // Handle reciter change
  const handleReciterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onReciterChange(e.target.value);
  };
  
  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle audio ended
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };
  
  // Handle download
  const handleDownload = () => {
    if (!selectedReciter) return;
    
    const downloadUrl = getAudioUrl(surahNumber, selectedReciter);
    window.open(downloadUrl, '_blank');
    toast.success('جاري تحميل السورة');
  };
  
  // Handle error with retry mechanism
  const handleError = (e: any) => {
    console.error('Audio error:', e.target?.error);
    setIsLoading(false);
    setHasError(true);
    
    const errorCode = e.target?.error?.code;
    let errorMessage = 'حدث خطأ أثناء تحميل الصوت';
    
    if (errorCode === 4) { // MEDIA_ERR_SRC_NOT_SUPPORTED
      errorMessage = 'تعذر تشغيل الملف الصوتي. جرب قارئ آخر';
    } else if (errorCode === 2) { // MEDIA_ERR_NETWORK
      errorMessage = 'خطأ في الشبكة. تحقق من اتصالك بالإنترنت';
    } else if (errorCode === 3) { // MEDIA_ERR_DECODE
      errorMessage = 'تعذر فك تشفير الملف الصوتي';
    }
    
    toast.error(errorMessage);
  };
  
  // Retry loading audio
  const retryLoad = () => {
    if (audioRef.current && selectedReciter) {
      setHasError(false);
      setIsLoading(true);
      loadAudio();
    }
  };
  
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-lg p-4 mt-4 border border-emerald-200 dark:border-emerald-700">
      <audio
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
        preload="none"
      />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={hasError ? retryLoad : togglePlay}
            disabled={isLoading && !hasError}
            className={`p-3 rounded-full transition-colors ${
              isLoading && !hasError ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-200 dark:hover:bg-emerald-800/50'
            } ${hasError ? 'bg-red-100 hover:bg-red-200' : ''}`}
            title={hasError ? 'إعادة المحاولة' : isPlaying ? 'إيقاف' : 'تشغيل'}
          >
            {isLoading && !hasError ? (
              <Loader2 className="w-6 h-6 text-emerald-700 dark:text-emerald-500 animate-spin" />
            ) : hasError ? (
              <AlertCircle className="w-6 h-6 text-red-600" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6 text-emerald-700 dark:text-emerald-500" />
            ) : (
              <Play className="w-6 h-6 text-emerald-700 dark:text-emerald-500" />
            )}
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-emerald-700 dark:text-emerald-400 ml-2 min-w-[45px]">
              {formatTime(currentTime)}
            </span>
            
            <div
              ref={progressRef}
              className={`w-48 h-2 bg-emerald-200 dark:bg-emerald-800 rounded-full overflow-hidden ${
                hasError ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
              onClick={handleSeek}
            >
              <div
                className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-100"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            
            <span className="text-sm text-emerald-700 dark:text-emerald-400 min-w-[45px]">
              {isLoading ? '--:--' : formatTime(duration)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500 ml-2" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-emerald-600"
              disabled={hasError}
            />
          </div>
          
          <button
            onClick={handleDownload}
            className="p-2 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
            title="تحميل السورة"
            disabled={hasError}
          >
            <Download className="w-5 h-5 text-emerald-700 dark:text-emerald-500" />
          </button>
        </div>
      </div>
      
      <div>
        <select
          value={reciterId}
          onChange={handleReciterChange}
          className="w-full p-3 border border-emerald-300 dark:border-emerald-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        >
          {availableReciters.map(reciter => (
            <option key={reciter.id} value={reciter.id}>
              {reciter.arabic_name}
            </option>
          ))}
        </select>
        
        {hasError && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
            <AlertCircle className="w-4 h-4 ml-1" />
            مشكلة في تحميل الصوت. انقر على زر إعادة المحاولة أو جرب قارئ آخر.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuranAudioPlayer;