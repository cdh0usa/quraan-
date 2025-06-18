import React, { useState, useEffect, useRef } from 'react';
import { Ayah, Tafseer, Reciter } from '../types';
import { fetchTafseer } from '../api/quranApi';
import { Book, Info, X } from 'lucide-react';
import QuranAudioPlayer from './QuranAudioPlayer';

interface QuranReaderProps {
  ayahs: Ayah[];
  surahNumber: number;
  surahName: string;
  reciters: Reciter[];
  loading: boolean;
}

const QuranReader: React.FC<QuranReaderProps> = ({ 
  ayahs, 
  surahNumber, 
  surahName,
  reciters,
  loading 
}) => {
  const [selectedAyah, setSelectedAyah] = useState<number | null>(null);
  const [tafseer, setTafseer] = useState<Tafseer | null>(null);
  const [tafseerLoading, setTafseerLoading] = useState(false);
  const [activeReciterId, setActiveReciterId] = useState<string>('husary');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch tafseer when an ayah is selected
  useEffect(() => {
    if (selectedAyah) {
      const fetchAyahTafseer = async () => {
        setTafseerLoading(true);
        try {
          const tafseerData = await fetchTafseer(surahNumber, selectedAyah);
          setTafseer(tafseerData);
        } catch (error) {
          console.error('Error fetching tafseer:', error);
        } finally {
          setTafseerLoading(false);
        }
      };

      fetchAyahTafseer();
    }
  }, [selectedAyah, surahNumber]);

  // Handle ayah click to show tafseer
  const handleAyahClick = (ayahNumber: number) => {
    if (selectedAyah === ayahNumber) {
      setSelectedAyah(null);
      setTafseer(null);
    } else {
      setSelectedAyah(ayahNumber);
    }
  };

  // Close tafseer panel
  const closeTafseer = () => {
    setSelectedAyah(null);
    setTafseer(null);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 font-amiri">
            سورة {surahName}
          </h2>
          <QuranAudioPlayer 
            surahNumber={surahNumber} 
            reciterId={activeReciterId}
            reciters={reciters}
            onReciterChange={setActiveReciterId}
          />
        </div>

        <div ref={scrollRef} className="space-y-6">
          {ayahs.map((ayah) => (
            <div key={ayah.number} className="group">
              <div 
                className={`quran-verse px-4 py-3 rounded-lg text-right transition-colors duration-200 ${
                  selectedAyah === ayah.numberInSurah 
                    ? 'bg-emerald-50 dark:bg-emerald-900/30' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
                onClick={() => handleAyahClick(ayah.numberInSurah)}
              >
                <span className="select-all">{ayah.text}</span>
                <span className="inline-block mr-1 text-lg text-emerald-600 dark:text-emerald-500 font-bold">﴿{ayah.numberInSurah}﴾</span>
                <button 
                  className={`mr-2 p-1 rounded-full transition-opacity duration-200 ${
                    selectedAyah === ayah.numberInSurah ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  title="عرض التفسير"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAyahClick(ayah.numberInSurah);
                  }}
                >
                  <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tafseer Panel */}
      {selectedAyah && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-bold text-lg text-emerald-800 dark:text-emerald-400 font-amiri">
                تفسير الآية {selectedAyah} من سورة {surahName}
              </h3>
              <button
                onClick={closeTafseer}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
              {tafseerLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ) : (
                <>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg mb-4">
                    <p className="quran-verse text-center mb-2">
                      {ayahs.find(a => a.numberInSurah === selectedAyah)?.text}
                      <span className="inline-block mr-1 text-lg text-emerald-600 dark:text-emerald-500 font-bold">﴿{selectedAyah}﴾</span>
                    </p>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <Book className="w-5 h-5 text-emerald-600 dark:text-emerald-500 mt-1 ml-2" />
                    <h4 className="font-bold text-emerald-800 dark:text-emerald-400 text-lg font-amiri">التفسير:</h4>
                  </div>
                  
                  {tafseer && (
                    <p className="tafseer-text text-gray-800 dark:text-gray-200 text-justify">
                      {tafseer.text}
                    </p>
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

export default QuranReader;