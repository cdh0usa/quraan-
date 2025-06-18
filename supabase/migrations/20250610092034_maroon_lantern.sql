/*
  # إضافة قراء مشهورين إلى قاعدة البيانات

  1. Sample Data
    - إضافة أشهر القراء مع روابط الصوت الصحيحة
    - تضمين الأوصاف والمعلومات
*/

-- إضافة أشهر القراء (استخدام INSERT فقط بدون ON CONFLICT)
INSERT INTO reciters (name, arabic_name, audio_base_url) VALUES
  ('Mahmoud Khalil Al-Husary', 'محمود خليل الحصري', 'https://server8.mp3quran.net/husary'),
  ('Mohamed Siddiq Al-Minshawi', 'محمد صديق المنشاوي', 'https://server13.mp3quran.net/minsh'),
  ('Mishary Rashid Al-Afasy', 'مشاري بن راشد العفاسي', 'https://server11.mp3quran.net/a_ahmed'),
  ('Abdul Basit Abdul Samad', 'عبد الباسط عبد الصمد', 'https://server7.mp3quran.net/basit'),
  ('Yasser Al-Dosari', 'ياسر الدوسري', 'https://server12.mp3quran.net/dossary'),
  ('Abdul Rahman Al-Sudais', 'عبد الرحمن السديس', 'https://server11.mp3quran.net/sds'),
  ('Saud Al-Shuraim', 'سعود الشريم', 'https://server6.mp3quran.net/shur'),
  ('Saad Al-Ghamdi', 'سعد الغامدي', 'https://server7.mp3quran.net/s_gmd2'),
  ('Ahmed Al-Ajmi', 'أحمد بن علي العجمي', 'https://server10.mp3quran.net/ajm'),
  ('Maher Al-Muaiqly', 'ماهر المعيقلي', 'https://server12.mp3quran.net/maher'),
  ('Mohamed Al-Tablawi', 'محمد محمود الطبلاوي', 'https://server11.mp3quran.net/tablawi'),
  ('Hani Al-Rifai', 'هاني الرفاعي', 'https://server8.mp3quran.net/rifai'),
  ('Abdullah Al-Juhany', 'عبد الله الجهني', 'https://server12.mp3quran.net/jhn'),
  ('Ahmed Bukhatir', 'أحمد بوخاطر', 'https://server11.mp3quran.net/bukhatir'),
  ('Abdullah Basfar', 'عبد الله بصفر', 'https://server13.mp3quran.net/basfar');