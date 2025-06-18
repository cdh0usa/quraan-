import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { addReciter } from '../../services/supabase';

const reciterSchema = z.object({
  name: z.string().min(1, 'اسم القارئ باللغة الإنجليزية مطلوب'),
  arabic_name: z.string().min(1, 'اسم القارئ بالعربية مطلوب'),
  audio_base_url: z.string().min(1, 'رابط الصوت مطلوب').url('الرجاء إدخال رابط صحيح')
});

type ReciterFormData = z.infer<typeof reciterSchema>;

interface AddReciterFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddReciterForm: React.FC<AddReciterFormProps> = ({ onSuccess, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ReciterFormData>({
    resolver: zodResolver(reciterSchema)
  });

  const onSubmit = async (data: ReciterFormData) => {
    try {
      await addReciter(data);
      toast.success('تم إضافة القارئ بنجاح');
      onSuccess();
    } catch (error) {
      console.error('Error saving reciter:', error);
      toast.error('حدث خطأ أثناء حفظ القارئ');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          اسم القارئ (بالعربية) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('arabic_name')}
          placeholder="مثال: محمود خليل الحصري"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 transition-colors"
        />
        {errors.arabic_name && (
          <p className="text-red-500 text-sm mt-1">{errors.arabic_name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          اسم القارئ (بالإنجليزية) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('name')}
          placeholder="مثال: Mahmoud Khalil Al-Husary"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 transition-colors"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          رابط الصوت الأساسي <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          {...register('audio_base_url')}
          placeholder="https://server8.mp3quran.net/husary"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 transition-colors"
        />
        {errors.audio_base_url && (
          <p className="text-red-500 text-sm mt-1">{errors.audio_base_url.message}</p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          الرابط الأساسي للملفات الصوتية (بدون اسم الملف)
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">مثال على الاستخدام:</h4>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          إذا كان رابط السورة الأولى: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">https://server8.mp3quran.net/husary/001.mp3</code>
        </p>
        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
          فيجب إدخال: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">https://server8.mp3quran.net/husary</code>
        </p>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          إلغاء
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
              جاري الحفظ...
            </>
          ) : (
            'حفظ القارئ'
          )}
        </button>
      </div>
    </form>
  );
};

export default AddReciterForm;