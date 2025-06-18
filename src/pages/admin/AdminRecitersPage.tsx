import React, { useState, useEffect } from 'react';
import { ArrowRight, Plus, Edit2, Trash2, X, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddReciterForm from '../../components/admin/AddReciterForm';
import { getReciters, deleteReciter } from '../../services/supabase';
import toast from 'react-hot-toast';

interface Reciter {
  id: string;
  name: string;
  arabic_name: string;
  audio_base_url: string;
  created_at: string;
}

const AdminRecitersPage: React.FC = () => {
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReciters();
  }, []);

  const loadReciters = async () => {
    try {
      setLoading(true);
      const data = await getReciters();
      setReciters(data);
    } catch (error) {
      console.error('Error loading reciters:', error);
      toast.error('حدث خطأ أثناء تحميل قائمة القراء');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف القارئ ${name}؟`)) {
      try {
        await deleteReciter(id);
        setReciters(reciters.filter(reciter => reciter.id !== id));
        toast.success('تم حذف القارئ بنجاح');
      } catch (error) {
        console.error('Error deleting reciter:', error);
        toast.error('حدث خطأ أثناء حذف القارئ');
      }
    }
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    loadReciters();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="flex items-center mb-6">
        <Link 
          to="/admin"
          className="flex items-center text-emerald-700 dark:text-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-400 ml-4 transition-colors"
        >
          <ArrowRight className="w-5 h-5 ml-1" />
          <span>العودة للوحة التحكم</span>
        </Link>
        <div className="flex items-center">
          <Mic className="w-8 h-8 text-emerald-600 dark:text-emerald-500 ml-3" />
          <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-400 font-amiri">
            إدارة القراء
          </h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 p-6 border-b border-emerald-200 dark:border-emerald-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 font-amiri mb-1">
                قائمة القراء
              </h2>
              <p className="text-emerald-600 dark:text-emerald-500 text-sm">
                إدارة قراء القرآن الكريم وإضافة قراء جدد
              </p>
            </div>
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Plus className="w-5 h-5 ml-2" />
              <span className="font-medium">إضافة قارئ جديد</span>
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-6 bg-emerald-50 dark:bg-emerald-900/30">
                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 font-amiri">
                  إضافة قارئ جديد
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <AddReciterForm
                  onSuccess={handleAddSuccess}
                  onCancel={() => setShowAddForm(false)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          {reciters.length === 0 ? (
            <div className="text-center py-12">
              <Mic className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                لا يوجد قراء مضافون
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                ابدأ بإضافة قراء القرآن الكريم
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                إضافة أول قارئ
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reciters.map((reciter) => (
                <div key={reciter.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-emerald-100 dark:bg-emerald-900/50 rounded-full p-3 ml-3">
                        <Mic className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 font-amiri">
                          {reciter.arabic_name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {reciter.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">رابط الصوت:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-2 rounded border truncate">
                      {reciter.audio_base_url}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(reciter.created_at).toLocaleDateString('ar-EG')}
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors"
                        title="تعديل"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                        title="حذف"
                        onClick={() => handleDelete(reciter.id, reciter.arabic_name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRecitersPage;