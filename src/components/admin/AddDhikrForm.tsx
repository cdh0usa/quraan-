import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { addDhikr } from '../../services/supabase';

const dhikrSchema = z.object({
  text: z.string().min(1, 'نص الذكر مطلوب'),
  source: z.string().min(1, 'المصدر مطلوب'),
  category: z.string().min(1, 'التصنيف مطلوب'),
  repeat: z.number().min(1, 'عدد التكرار مطلوب')
});

type DhikrFormData = z.infer<typeof dhikrSchema>;

interface AddDhikrFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddDhikrForm: React.FC<AddDhikrFormProps> = ({ onSuccess, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<DhikrFormData>({
    resolver: zodResolver(dhikrSchema),
    defaultValues: {
      repeat: 1
    }
  });

  const onSubmit = async (data: DhikrFormData) => {
    try {
      await addDhikr(data);
      toast.success('تم إضافة الذكر بنجاح');
      onSuccess();
    } catch (error) {
      console.error('Error saving dhikr:', error);
      toast.error('حدث خطأ أثناء حفظ الذكر');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          نص الذكر <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('text')}
          rows={4}
          placeholder="أدخل نص الذكر أو الدعاء..."
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
          <option value="morning">أذكار الصباح</option>
          <option value="evening">أذكار المساء</option>
          <option value="prayer">أذكار الصلاة</option>
          <option value="sleep">أذكار النوم</option>
          <option value="wakeup">أذكار الاستيقاظ</option>
          <option value="eating">أذكار الطعام</option>
          <option value="travel">أذكار السفر</option>
          <option value="general">أذكار متنوعة</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          عدد التكرار <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          {...register('repeat', { valueAsNumber: true })}
          min="1"
          max="1000"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 transition-colors"
        />
        {errors.repeat && (
          <p className="text-red-500 text-sm mt-1">{errors.repeat.message}</p>
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
            'حفظ الذكر'
          )}
        </button>
      </div>
    </form>
  );
};

export default AddDhikrForm;