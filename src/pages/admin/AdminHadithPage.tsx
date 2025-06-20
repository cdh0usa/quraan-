import React, { useState, useEffect } from 'react';
import { ArrowRight, Plus, Edit2, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddHadithForm from '../../components/admin/AddHadithForm';
import toast from 'react-hot-toast';
import { getHadiths, deleteHadith } from '../../services/supabase';
import { Hadith } from '../../types';

const AdminHadithPage: React.FC = () => {
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الحديث؟')) {
      try {
        await deleteHadith(id);
        setHadiths(hadiths.filter(h => h.id !== id));
        toast.success('تم حذف الحديث بنجاح');
      } catch (error) {
        console.error('Error deleting hadith:', error);
        toast.error('حدث خطأ أثناء حذف الحديث');
      }
    }
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    loadHadiths();
  };

  const loadHadiths = async () => {
    try {
      setLoading(true);
      const data = await getHadiths();
      setHadiths(data);
    } catch (error) {
      console.error('Error loading hadiths:', error);
      toast.error('حدث خطأ أثناء تحميل الأحاديث');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHadiths();
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
          إدارة الأحاديث
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-amiri">
            قائمة الأحاديث
          </h2>
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 ml-2" />
            <span>إضافة حديث جديد</span>
          </button>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  إضافة حديث جديد
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <AddHadithForm
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
                <th className="px-4 py-3 text-right">العنوان</th>
                <th className="px-4 py-3 text-right">المصدر</th>
                <th className="px-4 py-3 text-right">التصنيف</th>
                <th className="px-4 py-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {hadiths.map((hadith) => (
                <tr key={hadith.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3">{hadith.title}</td>
                  <td className="px-4 py-3">{hadith.source}</td>
                  <td className="px-4 py-3">{hadith.category}</td>
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
                        onClick={() => handleDelete(hadith.id)}
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

export default AdminHadithPage;