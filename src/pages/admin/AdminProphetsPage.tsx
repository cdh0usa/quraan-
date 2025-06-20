import React, { useState, useEffect } from 'react';
import { ArrowRight, Plus, Edit2, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProphetStory } from '../../types';
import AddProphetForm from '../../components/admin/AddProphetForm';
import toast from 'react-hot-toast';
import { getProphetStories, deleteProphetStory } from '../../services/supabase';

const AdminProphetsPage: React.FC = () => {
  const [stories, setStories] = useState<ProphetStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه القصة؟')) {
      try {
        await deleteProphetStory(id);
        setStories(stories.filter(story => story.id !== id));
        toast.success('تم حذف القصة بنجاح');
      } catch (error) {
        console.error('Error deleting story:', error);
        toast.error('حدث خطأ أثناء حذف القصة');
      }
    }
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    loadStories();
  };

  const loadStories = async () => {
    try {
      setLoading(true);
      const data = await getProphetStories();
      // Supabase returns snake_case columns; map to camelCase for UI consistency
      const mapped = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        arabicName: item.arabic_name,
        shortDescription: item.short_description,
        fullStory: item.full_story,
        quranReferences: item.quran_references ?? []
      }));
      setStories(mapped);
    } catch (error) {
      console.error('Error loading prophet stories:', error);
      toast.error('حدث خطأ أثناء تحميل القصص');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

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
          className="flex items-center text-emerald-700 dark:text-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-400 ml-4"
        >
          <ArrowRight className="w-5 h-5 ml-1" />
          <span>العودة للوحة التحكم</span>
        </Link>
        <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-400 font-amiri">
          إدارة قصص الأنبياء
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-amiri">
            قائمة القصص
          </h2>
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 ml-2" />
            <span>إضافة قصة جديدة</span>
          </button>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  إضافة قصة نبي جديدة
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <AddProphetForm
                  onSuccess={handleAddSuccess}
                  onCancel={() => setShowAddForm(false)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50">
                <th className="px-4 py-3 text-right">اسم النبي</th>
                <th className="px-4 py-3 text-right">الوصف المختصر</th>
                <th className="px-4 py-3 text-right">المراجع القرآنية</th>
                <th className="px-4 py-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((story) => (
                <tr key={story.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-bold">{story.arabicName}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{story.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{story.shortDescription}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {story.quranReferences.map((ref, index) => (
                        <span 
                          key={index}
                          className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-sm px-2 py-1 rounded"
                        >
                          {ref}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center space-x-2">
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                        title="تعديل"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                        title="حذف"
                        onClick={() => handleDelete(story.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProphetsPage;