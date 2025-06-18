/*
  # Initial Database Schema

  1. New Tables
    - `hadiths`
      - `id` (uuid, primary key)
      - `title` (text)
      - `text` (text)
      - `source` (text)
      - `category` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `prophet_stories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `arabic_name` (text)
      - `short_description` (text)
      - `full_story` (text)
      - `quran_references` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `adhkar`
      - `id` (uuid, primary key)
      - `text` (text)
      - `source` (text)
      - `category` (text)
      - `repeat` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `reciters`
      - `id` (uuid, primary key)
      - `name` (text)
      - `arabic_name` (text)
      - `audio_base_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tables
CREATE TABLE IF NOT EXISTS hadiths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  text text NOT NULL,
  source text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS prophet_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  arabic_name text NOT NULL,
  short_description text NOT NULL,
  full_story text NOT NULL,
  quran_references text[] NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS adhkar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  source text NOT NULL,
  category text NOT NULL,
  repeat integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reciters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  arabic_name text NOT NULL,
  audio_base_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE hadiths ENABLE ROW LEVEL SECURITY;
ALTER TABLE prophet_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE adhkar ENABLE ROW LEVEL SECURITY;
ALTER TABLE reciters ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public users can view hadiths"
  ON hadiths
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage hadiths"
  ON hadiths
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public users can view prophet stories"
  ON prophet_stories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage prophet stories"
  ON prophet_stories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public users can view adhkar"
  ON adhkar
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage adhkar"
  ON adhkar
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public users can view reciters"
  ON reciters
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage reciters"
  ON reciters
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_hadiths_updated_at
  BEFORE UPDATE ON hadiths
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_prophet_stories_updated_at
  BEFORE UPDATE ON prophet_stories
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_adhkar_updated_at
  BEFORE UPDATE ON adhkar
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_reciters_updated_at
  BEFORE UPDATE ON reciters
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();