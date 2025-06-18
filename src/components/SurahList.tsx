import React from 'react';
import { Surah } from '../types';
import { BookOpen } from 'lucide-react';

interface SurahListProps {
  surahs: Surah[];
  onSelectSurah: (surahNumber: number) => void;
  loading: boolean;
}

const SurahList: React.FC<SurahListProps> = ({ surahs, onSelectSurah, loading }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="animate-pulse">
          {[...Array(10)].map((_, index) => (
            <div 
              key={index}
              className="border-b border-gray-200 dark:border-gray-700 py-3 px-4 flex justify-between"
            >
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="max-h-[70vh] overflow-y-auto">
        {surahs.map((surah) => (
          <div 
            key={surah.number}
            onClick={() => onSelectSurah(surah.number)}
            className="border-b border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 cursor-pointer transition-colors duration-200"
          >
            <div className="py-3 px-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-emerald-100 dark:bg-emerald-900/50 rounded-full w-8 h-8 flex items-center justify-center ml-3">
                  <span className="text-sm text-emerald-800 dark:text-emerald-400 font-semibold">{surah.number}</span>
                </div>
                <div>
                  <h3 className="font-amiri text-lg font-bold text-gray-900 dark:text-gray-100">{surah.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{surah.englishName} • {surah.numberOfAyahs} آية</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 py-1 px-2 rounded ml-2">
                  {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                </span>
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahList;