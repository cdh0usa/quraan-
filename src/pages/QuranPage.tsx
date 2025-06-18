import React, { useState, useEffect } from 'react';
import { Surah, Ayah, Reciter } from '../types';
import { fetchSurahs, fetchSurahAyahs } from '../api/quranApi';
import { getReciters } from '../services/supabase';
import { famousReciters } from '../data/reciters';
import SurahList from '../components/SurahList';
import QuranReader from '../components/QuranReader';
import { Search, ChevronRight, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const QuranPage: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [ayahsLoading, setAyahsLoading] = useState(false);
  const [showSurahList, setShowSurahList] = useState(true);

  // Fetch all surahs and reciters on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Load surahs
        const surahsData = await fetchSurahs();
        setSurahs(surahsData);
        setFilteredSurahs(surahsData);

        // Load reciters from Supabase and combine with famous reciters
        try {
          const supabaseReciters = await getReciters();
          const combinedReciters = [...famousReciters, ...supabaseReciters];
          setReciters(combinedReciters);
        } catch (error) {
          console.error('Error loading reciters from Supabase:', error);
          // Fallback to famous reciters only
          setReciters(famousReciters);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('حدث خطأ أثناء تحميل البيانات');
        // Set fallback reciters even if surahs fail
        setReciters(famousReciters);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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

  // Load ayahs when a surah is selected
  const handleSelectSurah = async (surahNumber: number) => {
    setAyahsLoading(true);
    try {
      const selectedSurahData = surahs.find((s) => s.number === surahNumber);
      if (selectedSurahData) {
        setSelectedSurah(selectedSurahData);
        const ayahsData = await fetchSurahAyahs(surahNumber);
        setAyahs(ayahsData);
        
        // On mobile, hide surah list when a surah is selected
        if (window.innerWidth < 768) {
          setShowSurahList(false);
        }
      }
    } catch (error) {
      console.error('Error loading ayahs:', error);
      toast.error('حدث خطأ أثناء تحميل الآيات');
    } finally {
      setAyahsLoading(false);
    }
  };

  // Toggle surah list visibility (for mobile)
  const toggleSurahList = () => {
    setShowSurahList(!showSurahList);
  };

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-400 mb-2 font-amiri">
          القرآن الكريم
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg font-noto-arabic">
          اقرأ القرآن الكريم كاملاً مع التفسير وترجمة المعاني والاستماع إلى تلاوات بأصوات كبار القراء
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Surah List (with responsive toggle) */}
        <div className={`md:w-1/3 ${showSurahList ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن سورة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <Search className="absolute top-2.5 left-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <SurahList 
            surahs={filteredSurahs} 
            onSelectSurah={handleSelectSurah} 
            loading={loading} 
          />
        </div>

        {/* Quran Reader */}
        <div className="md:w-2/3">
          {selectedSurah ? (
            <>
              {/* Mobile back button */}
              <button
                className="md:hidden flex items-center mb-4 text-emerald-700 dark:text-emerald-500"
                onClick={toggleSurahList}
              >
                <ChevronRight className="w-5 h-5 ml-1" />
                <span>العودة إلى قائمة السور</span>
              </button>
              
              <QuranReader
                ayahs={ayahs}
                surahNumber={selectedSurah.number}
                surahName={selectedSurah.name}
                reciters={reciters}
                loading={ayahsLoading}
              />
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-emerald-700 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-amiri">
                اختر سورة من القائمة
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-noto-arabic">
                يرجى اختيار سورة من القائمة لبدء القراءة
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuranPage;