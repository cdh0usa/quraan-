// Quran related types
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  surah: {
    number: number;
    name: string;
  };
  numberInSurah: number;
  juz: number;
  page: number;
}

export interface Tafseer {
  ayah: number;
  surah: number;
  text: string;
}

export interface Reciter {
  id: string;
  name: string;
  arabic_name: string;
  audio_base_url: string;
  description?: string;
  country?: string;
  created_at?: string;
}

// Hadith related types
export interface HadithCategory {
  id: number;
  name: string;
  arabicName: string;
  hadiths: number;
}

export interface Hadith {
  id: string;
  title: string;
  text: string;
  source: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}

// Adhkar related types
export interface AdhkarCategory {
  id: string;
  name: string;
  description: string;
}

export interface Dhikr {
  id: string;
  text: string;
  transliteration?: string;
  translation?: string;
  source?: string;
  repeat?: number;
  category: string;
  created_at?: string;
  updated_at?: string;
}

// Prophet story related types
export interface ProphetStory {
  id: string;
  name: string;
  arabicName: string;
  shortDescription: string;
  fullStory: string;
  quranReferences: string[];
}