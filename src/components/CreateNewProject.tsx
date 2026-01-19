"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  projectCode: z.string()
    .min(3, "Код проекта не меньше трех символов")
    .regex(/^[a-z0-9\-]+$/, "Допустимы только латинские буквы в нижнем регистре, цифры и тире")
});

type FormType = z.infer<typeof schema>;

export function CreateNewProject() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormType>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormType) => {
    reset();
    // При успешной отправке редирект
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-stone-200 w-100 my-0 mx-auto p-10 outline">
      <label>Введите код проекта</label>
      <input type="text" 
        {...register("projectCode")}
        className="outline bg-white" 
      />
      {errors.projectCode && <p className="text-red-500">{errors.projectCode.message}</p>}
      <button type="submit" className="outline p-3 bg-green-200">Создать</button>
    </form>
  )
}