/*
  # إصلاح تضارب بيانات القراء

  1. Changes
    - حذف جميع البيانات المتضاربة
    - إدخال قائمة موحدة ونظيفة من القراء
    - ضمان عدم التكرار والتضارب
    - إضافة حقل country للتنظيم
    
  2. Security
    - تنظيف قاعدة البيانات من التكرار
*/

-- حذف جميع القراء الموجودين لضمان البداية النظيفة
DELETE FROM reciters;

-- إعادة تعيين sequence إذا لزم الأمر
ALTER SEQUENCE reciters_id_seq RESTART WITH 1;

-- إضافة عمود البلد إذا لم يكن موجوداً
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'reciters' AND column_name = 'country') THEN
        ALTER TABLE reciters ADD COLUMN country VARCHAR(50);
    END IF;
END $$;

-- إدخال القائمة النظيفة والموحدة للقراء
INSERT INTO reciters (name, arabic_name, audio_base_url, country) VALUES
  -- القراء المصريون الكبار
  ('Abdul Basit Abdul Samad', 'الشيخ عبد الباسط عبد الصمد', 'https://server7.mp3quran.net/basit', 'مصر'),
  ('Mohamed Siddiq Al-Minshawi', 'الشيخ محمد صديق المنشاوي', 'https://server10.mp3quran.net/minsh', 'مصر'),
  ('Mahmoud Khalil Al-Husary', 'الشيخ محمود خليل الحصري', 'https://server13.mp3quran.net/husr', 'مصر'),
  ('Mohamed Refaat', 'الشيخ محمد رفعت', 'https://server8.mp3quran.net/refaat', 'مصر'),
  
  -- القراء السعوديون
  ('Mishary Rashid Al-Afasy', 'الشيخ مشاري بن راشد العفاسي', 'https://server8.mp3quran.net/afasy', 'الكويت'),
  ('Abdul Rahman Al-Sudais', 'الشيخ عبد الرحمن السديس', 'https://server11.mp3quran.net/sds', 'السعودية'),
  ('Saud Al-Shuraim', 'الشيخ سعود الشريم', 'https://server8.mp3quran.net/shur', 'السعودية'),
  ('Saad Al-Ghamdi', 'الشيخ سعد الغامدي', 'https://server7.mp3quran.net/s_gmd2', 'السعودية'),
  ('Maher Al-Muaiqly', 'الشيخ ماهر المعيقلي', 'https://server12.mp3quran.net/maher', 'السعودية'),
  ('Yasser Al-Dosari', 'الشيخ ياسر الدوسري', 'https://server11.mp3quran.net/yasser', 'السعودية'),
  ('Ahmed Al-Ajmi', 'الشيخ أحمد بن علي العجمي', 'https://server10.mp3quran.net/ajm', 'السعودية'),
  ('Nasser Al-Qatami', 'الشيخ ناصر القطامي', 'https://server6.mp3quran.net/qtm', 'السعودية'),
  ('Khalid Al-Jaleel', 'الشيخ خالد الجليل', 'https://server11.mp3quran.net/jaleel', 'السعودية'),
  ('Abdullah Basfar', 'الشيخ عبد الله بصفر', 'https://server13.mp3quran.net/basfar', 'السعودية'),
  ('Mohamed Ayyub', 'الشيخ محمد أيوب', 'https://server10.mp3quran.net/ayyub', 'السعودية'),
  
  -- قراء دول أخرى
  ('Fahd Al-Kandari', 'الشيخ فهد الكندري', 'https://server11.mp3quran.net/kandari', 'الكويت'),
  ('Ali Abdullah Jaber', 'الشيخ علي عبد الله جابر', 'https://server12.mp3quran.net/jaber', 'السعودية');

-- إضافة فهرس للبحث السريع
CREATE INDEX IF NOT EXISTS idx_reciters_arabic_name ON reciters(arabic_name);
CREATE INDEX IF NOT EXISTS idx_reciters_country ON reciters(country); 