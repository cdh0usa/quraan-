import axios from 'axios';
import { Surah, Ayah, Tafseer } from '../types';

const quranBaseUrl = 'https://api.alquran.cloud/v1';
const tafseerBaseUrl = 'http://api.quran-tafseer.com';

// Fetch list of all surahs
export const fetchSurahs = async (): Promise<Surah[]> => {
  try {
    const response = await axios.get(`${quranBaseUrl}/surah`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching surahs:', error);
    throw error;
  }
};

// Fetch ayahs of a specific surah
export const fetchSurahAyahs = async (surahNumber: number): Promise<Ayah[]> => {
  try {
    const response = await axios.get(`${quranBaseUrl}/surah/${surahNumber}`);
    return response.data.data.ayahs;
  } catch (error) {
    console.error(`Error fetching ayahs for surah ${surahNumber}:`, error);
    throw error;
  }
};

// Fetch specific ayah
export const fetchAyah = async (surahNumber: number, ayahNumber: number): Promise<Ayah> => {
  try {
    const response = await axios.get(`${quranBaseUrl}/ayah/${surahNumber}:${ayahNumber}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching ayah ${ayahNumber} from surah ${surahNumber}:`, error);
    throw error;
  }
};

// Fetch tafseer (interpretation) for an ayah
export const fetchTafseer = async (surahNumber: number, ayahNumber: number): Promise<Tafseer> => {
  try {
    // Using Muyassar tafseer (ID: 1) with the updated API endpoint
    const response = await axios.get(`${tafseerBaseUrl}/tafseer/1/${surahNumber}/${ayahNumber}`);
    return {
      ayah: ayahNumber,
      surah: surahNumber,
      text: response.data.text
    };
  } catch (error) {
    console.error(`Error fetching tafseer for ayah ${ayahNumber} from surah ${surahNumber}:`, error);
    throw error;
  }
};

// Simple reciters list for basic usage - Use famousReciters from data/reciters.ts for full list
export const getReciters = () => {
  return [
    { id: 'husary', name: 'Mahmoud Khalil Al-Husary', arabic_name: 'محمود خليل الحصري' },
    { id: 'minshawi', name: 'Mohamed Siddiq Al-Minshawi', arabic_name: 'محمد صديق المنشاوي' },
    { id: 'afasy', name: 'Mishary Rashid Al-Afasy', arabic_name: 'مشاري بن راشد العفاسي' },
    { id: 'basit', name: 'Abdul Basit Abdul Samad', arabic_name: 'عبد الباسط عبد الصمد' },
    { id: 'sudais', name: 'Abdul Rahman Al-Sudais', arabic_name: 'عبد الرحمن السديس' },
    { id: 'shuraim', name: 'Saud Al-Shuraim', arabic_name: 'سعود الشريم' },
    { id: 'ghamdi', name: 'Saad Al-Ghamdi', arabic_name: 'سعد الغامدي' },
    { id: 'maher', name: 'Maher Al-Muaiqly', arabic_name: 'ماهر المعيقلي' }
  ];
};

// Utility function to get audio URL - relies on reciter's audio_base_url
export const getAudioUrl = (surahNumber: number, reciterBaseUrl: string): string => {
  // Formatting surah number to have leading zeros (e.g., 001, 002, ...)
  const formattedSurahNumber = surahNumber.toString().padStart(3, '0');
  return `${reciterBaseUrl}/${formattedSurahNumber}.mp3`;
};

// Test audio URL availability
export const testAudioUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error testing audio URL:', error);
    return false;
  }
};