import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Hadiths
export const addHadith = async (hadith: any) => {
  const { data, error } = await supabase
    .from('hadiths')
    .insert([hadith])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const getHadiths = async () => {
  const { data, error } = await supabase
    .from('hadiths')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const updateHadith = async (id: string, hadith: any) => {
  const { data, error } = await supabase
    .from('hadiths')
    .update(hadith)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const deleteHadith = async (id: string) => {
  const { error } = await supabase
    .from('hadiths')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Prophet Stories
export const addProphetStory = async (story: any) => {
  const { data, error } = await supabase
    .from('prophet_stories')
    .insert([story])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const getProphetStories = async () => {
  const { data, error } = await supabase
    .from('prophet_stories')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const updateProphetStory = async (id: string, story: any) => {
  const { data, error } = await supabase
    .from('prophet_stories')
    .update(story)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const deleteProphetStory = async (id: string) => {
  const { error } = await supabase
    .from('prophet_stories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Adhkar
export const addDhikr = async (dhikr: any) => {
  const { data, error } = await supabase
    .from('adhkar')
    .insert([dhikr])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const getAdhkar = async () => {
  const { data, error } = await supabase
    .from('adhkar')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const updateDhikr = async (id: string, dhikr: any) => {
  const { data, error } = await supabase
    .from('adhkar')
    .update(dhikr)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const deleteDhikr = async (id: string) => {
  const { error } = await supabase
    .from('adhkar')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Reciters
export const addReciter = async (reciter: any) => {
  const { data, error } = await supabase
    .from('reciters')
    .insert([reciter])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const getReciters = async () => {
  const { data, error } = await supabase
    .from('reciters')
    .select('*')
    .order('arabic_name', { ascending: true });
  
  if (error) throw error;
  return data;
};

export const updateReciter = async (id: string, reciter: any) => {
  const { data, error } = await supabase
    .from('reciters')
    .update(reciter)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const deleteReciter = async (id: string) => {
  const { error } = await supabase
    .from('reciters')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};