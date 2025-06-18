/*
  # تحديث روابط الصوت للقراء

  1. Updates
    - تحديث روابط الصوت للقراء الذين يواجهون مشاكل
    - إزالة القراء المتكررين
    - إضافة قراء جدد بروابط صحيحة
*/

-- حذف جميع القراء الموجودين لتجنب التكرار
DELETE FROM reciters;

-- إضافة القراء بروابط صحيحة ومحدثة
INSERT INTO reciters (name, arabic_name, audio_base_url) VALUES
  ('Mahmoud Khalil Al-Husary', 'محمود خليل الحصري', 'https://server13.mp3quran.net/husr'),
  ('Mohamed Siddiq Al-Minshawi', 'محمد صديق المنشاوي', 'https://server10.mp3quran.net/minsh'),
  ('Mishary Rashid Al-Afasy', 'مشاري بن راشد العفاسي', 'https://server8.mp3quran.net/afasy'),
  ('Abdul Basit Abdul Samad', 'عبد الباسط عبد الصمد', 'https://server7.mp3quran.net/basit'),
  ('Yasser Al-Dosari', 'ياسر الدوسري', 'https://server11.mp3quran.net/yasser_ad_dussary'),
  ('Abdul Rahman Al-Sudais', 'عبد الرحمن السديس', 'https://server11.mp3quran.net/sds'),
  ('Saud Al-Shuraim', 'سعود الشريم', 'https://server8.mp3quran.net/shur'),
  ('Saad Al-Ghamdi', 'سعد الغامدي', 'https://server7.mp3quran.net/s_gmd2'),
  ('Ahmed Al-Ajmi', 'أحمد بن علي العجمي', 'https://server10.mp3quran.net/ajm'),
  ('Maher Al-Muaiqly', 'ماهر المعيقلي', 'https://server12.mp3quran.net/maher'),
  ('Abdullah Al-Juhany', 'عبد الله الجهني', 'https://server12.mp3quran.net/jhn'),
  ('Abdullah Basfar', 'عبد الله بصفر', 'https://server13.mp3quran.net/basfar'),
  ('Ali Al-Huzaifi', 'علي الحذيفي', 'https://server12.mp3quran.net/huzaifi'),
  ('Nasser Al-Qatami', 'ناصر القطامي', 'https://server6.mp3quran.net/qtm'),
  ('Ahmad Al-Alaq', 'أحمد العلاق', 'https://server11.mp3quran.net/alaq');