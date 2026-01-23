"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  code: z.string()
    .min(3, "Код проекта не меньше трех символов")
    .regex(/^[a-z0-9\-]+$/, "Допустимы только латинские буквы в нижнем регистре, цифры и тире"),
  title: z.string()
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
    const result = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: data.code,
        title: data.title
      })
    });

    const json = await result.json();
    if (!result.ok) {
      alert(json.error);
      return;
    } 

    alert(json.message);
    window.location.href = json.redirectTo;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-stone-200 w-100 my-0 mx-auto p-10 outline">
      <label>Введите код проекта</label>
      <input type="text" 
        {...register("code")}
        className="outline bg-white" 
      />
      {errors.code && <p className="text-red-500">{errors.code.message}</p>}
      <label>Введите название проекта</label>
      <input type="text" 
        {...register("title")}
        className="outline bg-white" 
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      <button type="submit" className="outline p-3 bg-green-200">Создать</button>
    </form>
  )
}