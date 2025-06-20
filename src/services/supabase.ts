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

// إضافة دوال جديدة لإدارة القراء بشكل أفضل

// فحص وجود قارئ معين
export const checkReciterExists = async (arabicName: string) => {
  const { data, error } = await supabase
    .from('reciters')
    .select('id, arabic_name')
    .eq('arabic_name', arabicName)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows found
  return data;
};

// تنظيف القراء المتكررة
export const cleanDuplicateReciters = async () => {
  try {
    const { data: reciters, error } = await supabase
      .from('reciters')
      .select('*');
    
    if (error) throw error;
    
    const uniqueReciters = new Map();
    const duplicates: string[] = [];
    
    reciters?.forEach(reciter => {
      if (uniqueReciters.has(reciter.arabic_name)) {
        duplicates.push(reciter.id);
      } else {
        uniqueReciters.set(reciter.arabic_name, reciter);
      }
    });
    
    if (duplicates.length > 0) {
      const { error: deleteError } = await supabase
        .from('reciters')
        .delete()
        .in('id', duplicates);
      
      if (deleteError) throw deleteError;
      console.log(`تم حذف ${duplicates.length} قارئ مكرر`);
    }
    
    return duplicates.length;
  } catch (error) {
    console.error('خطأ في تنظيف القراء المتكررة:', error);
    throw error;
  }
};

// اختبار الاتصال بقاعدة البيانات
export const testDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('reciters')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('فشل الاتصال بقاعدة البيانات:', error);
    return false;
  }
};

// دالة لمزامنة القراء مع القائمة المحلية (إذا لزم الأمر)
export const syncRecitersWithLocal = async (localReciters: any[]) => {
  try {
    const dbReciters = await getReciters();
    const dbNames = new Set(dbReciters.map(r => r.arabic_name));
    
    const newReciters = localReciters.filter(r => !dbNames.has(r.arabic_name));
    
    if (newReciters.length > 0) {
      const { error } = await supabase
        .from('reciters')
        .insert(newReciters.map(r => ({
          name: r.name,
          arabic_name: r.arabic_name,
          audio_base_url: r.audio_base_url,
          country: r.country
        })));
      
      if (error) throw error;
      console.log(`تم إضافة ${newReciters.length} قارئ جديد`);
    }
    
    return newReciters.length;
  } catch (error) {
    console.error('خطأ في مزامنة القراء:', error);
    throw error;
  }
};

// دالة عامة لإرجاع عدد السجلات في جدول معين
export const getTableCount = async (tableName: string): Promise<number> => {
  const { count, error } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return count ?? 0;
};