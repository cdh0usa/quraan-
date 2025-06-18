import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { addHadith } from '../../services/supabase';

const hadithSchema = z.object({
  title: z.string().min(1, 'العنوان مطلوب'),
  text: z.string().min(1, 'نص الحديث مطلوب'),
  source: z.string().min(1, 'المصدر مطلوب'),
  category: z.string().min(1, 'التصنيف مطلوب')
});

type HadithFormData = z.infer<typeof hadithSchema>;

interface AddHadithFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddHadithForm: React.FC<AddHadithFormProps> = ({ onSuccess, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<HadithFormData>({
    resolver: zodResolver(hadithSchema)
  });

  const onSubmit = async (data: HadithFormData) => {
    try {
      await addHadith(data);
      toast.success('تم إضافة الحديث بنجاح');
      onSuccess();
    } catch (error) {
      console.error('Error saving hadith:', error);
      toast.error('حدث خطأ أثناء حفظ الحديث');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          عنوان الحديث <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('title')}
          placeholder="مثال: فضل الصلاة على وقتها"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 transition-colors"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          نص الحديث <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('text')}
          rows={6}
          placeholder="أدخل نص الحديث الشريف كاملاً..."
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 transition-colors"
        />
        {errors.text && (
          <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          المصدر <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('source')}
          placeholder="مثال: صحيح البخاري"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 transition-colors"
        />
        {errors.source && (
          <p className="text-red-500 text-sm mt-1">{errors.source.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          التصنيف <span className="text-red-500">*</span>
        </label>
        <select
          {...register('category')}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 transition-colors"
        >
          <option value="">اختر التصنيف</option>
          <option value="العقيدة">العقيدة</option>
          <option value="العبادات">العبادات</option>
          <option value="المعاملات">المعاملات</option>
          <option value="الأخلاق">الأخلاق</option>
          <option value="الآداب">الآداب</option>
          <option value="الدعوة">الدعوة</option>
          <option value="التربية">التربية</option>
          <option value="الجهاد">الجهاد</option>
          <option value="الطهارة">الطهارة</option>
          <option value="الصلاة">الصلاة</option>
          <option value="الزكاة">الزكاة</option>
          <option value="الصيام">الصيام</option>
          <option value="الحج">الحج</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
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
            'حفظ الحديث'
          )}
        </button>
      </div>
    </form>
  );
};

export default AddHadithForm;