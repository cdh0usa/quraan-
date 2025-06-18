import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import QuranPage from './pages/QuranPage';
import AudioQuranPage from './pages/AudioQuranPage';
import ProphetsStoriesPage from './pages/ProphetsStoriesPage';
import HadithPage from './pages/HadithPage';
import RuqyahPage from './pages/RuqyahPage';
import ChildrenEducationPage from './pages/ChildrenEducationPage';
import AdhkarPage from './pages/AdhkarPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHadithPage from './pages/admin/AdminHadithPage';
import AdminProphetsPage from './pages/admin/AdminProphetsPage';
import AdminAdhkarPage from './pages/admin/AdminAdhkarPage';
import AdminRecitersPage from './pages/admin/AdminRecitersPage';

function App() {
  return (
    <Router>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#1E6F5C',
            border: '1px solid #1E6F5C',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'Noto Sans Arabic, sans-serif'
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="quran" element={<QuranPage />} />
          <Route path="audio-quran" element={<AudioQuranPage />} />
          <Route path="prophets-stories" element={<ProphetsStoriesPage />} />
          <Route path="hadith" element={<HadithPage />} />
          <Route path="ruqyah" element={<RuqyahPage />} />
          <Route path="children-education" element={<ChildrenEducationPage />} />
          <Route path="adhkar" element={<AdhkarPage />} />
          
          {/* Admin Routes */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/hadiths" element={<AdminHadithPage />} />
          <Route path="admin/prophets" element={<AdminProphetsPage />} />
          <Route path="admin/adhkar" element={<AdminAdhkarPage />} />
          <Route path="admin/reciters" element={<AdminRecitersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;