import axios from 'axios';
import { Surah, Ayah, Tafseer } from '../types';

const quranBaseUrl = 'https://api.alquran.cloud/v1';

// NOTE:
// The original tafseer service is only available over HTTP which
// browsers will block when the site is served over HTTPS (e.g. Netlify).
// We therefore proxy it through a Netlify Function that runs server-side.
// During local development (Vite over HTTP) we can still hit the upstream
// service directly to avoid having to run Netlify Dev.

// New HTTPS-based tafseer endpoint using static JSON from spa5k/tafsir_api via jsDelivr CDN.
// This source يُتيح CORS بشكل افتراضي ويتميّز بالسرعة والثبات.
// URL مثال: https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/ar-tafsir-muyassar/1/1.json

const TAFSIR_EDITION_SLUG = 'ar-tafsir-muyassar';

function getTafseerUrl(surah: number, ayah: number): string {
  return `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/${TAFSIR_EDITION_SLUG}/${surah}/${ayah}.json`;
}

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
    const url = getTafseerUrl(surahNumber, ayahNumber);
    const response = await axios.get(url);

    // spa5k response: { "text": "...", ... }
    const text: string = response.data?.text ?? response.data?.tafsir ?? response.data?.data ?? '';

    return {
      ayah: ayahNumber,
      surah: surahNumber,
      text,
    };
  } catch (error) {
    console.error(`Error fetching tafseer for ayah ${ayahNumber} from surah ${surahNumber}:`, error);
    throw error;
  }
};

// Note: Reciters are now managed through the database and famousReciters from data/reciters.ts

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