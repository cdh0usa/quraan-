import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { addProphetStory } from '../../services/supabase';

const prophetSchema = z.object({
  name: z.string().min(1, 'اسم النبي باللغة الإنجليزية مطلوب'),
  arabic_name: z.string().min(1, 'اسم النبي بالعربية مطلوب'),
  short_description: z.string().min(1, 'الوصف المختصر مطلوب'),
  full_story: z.string().min(1, 'القصة الكاملة مطلوبة'),
  quran_references: z.string().min(1, 'المراجع القرآنية مطلوبة')
});

type ProphetFormData = z.infer<typeof prophetSchema>;

interface AddProphetFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddProphetForm: React.FC<AddProphetFormProps> = ({ onSuccess, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProphetFormData>({
    resolver: zodResolver(prophetSchema)
  });

  const onSubmit = async (data: ProphetFormData) => {
    try {
      // Convert quran_references string to array
      const formattedData = {
        ...data,
        quran_references: data.quran_references.split(',').map(ref => ref.trim())
      };
      
      await addProphetStory(formattedData);
      toast.success('تم إضافة قصة النبي بنجاح');
      onSuccess();
    } catch (error) {
      console.error('Error saving prophet story:', error);
      toast.error('حدث خطأ أثناء حفظ قصة النبي');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            اسم النبي (بالعربية) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('arabic_name')}
            placeholder="مثال: آدم عليه السلام"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 transition-colors"
          />
          {errors.arabic_name && (
            <p className="text-red-500 text-sm mt-1">{errors.arabic_name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            اسم النبي (بالإنجليزية) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('name')}
            placeholder="مثال: Adam"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 transition-colors"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          الوصف المختصر <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('short_description')}
          placeholder="مثال: أبو البشر وأول الأنبياء"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 transition-colors"
        />
        {errors.short_description && (
          <p className="text-red-500 text-sm mt-1">{errors.short_description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          القصة الكاملة <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('full_story')}
          rows={8}
          placeholder="أدخل قصة النبي كاملة..."
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 transition-colors"
        />
        {errors.full_story && (
          <p className="text-red-500 text-sm mt-1">{errors.full_story.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          المراجع القرآنية <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('quran_references')}
          placeholder="مثال: البقرة: 30-37, الأعراف: 11-25"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 transition-colors"
        />
        {errors.quran_references && (
          <p className="text-red-500 text-sm mt-1">{errors.quran_references.message}</p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          افصل بين المراجع بفاصلة (,)
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
            'حفظ القصة'
          )}
        </button>
      </div>
    </form>
  );
};

export default AddProphetForm;