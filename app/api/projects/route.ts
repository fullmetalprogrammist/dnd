import { NextRequest, NextResponse } from "next/server";
import { projectRepository } from "@/src/backend/factory/projectRepositoryFactory";
import { DuplicateEntityError } from "@/src/backend/errors/DuplicateEntityError";

// TODO: типизировать запрос \ ответ?
export async function POST(request: NextRequest) {
  try {
    // TODO: добавить валидацию, что пришли все нужные поля
    const { code, title } = await request.json();
    const project = await projectRepository.create(code, title);

    return NextResponse.json({
      message: `Проект "${title}" создан успешно`,
      redirectTo: `/projects/edit/${code}`
    });
  } catch (error) {
    if (error instanceof DuplicateEntityError) {
      return NextResponse.json({
        error: error.message
      }, { status: 409 });
    }
    return NextResponse.json({
      error: "Ошибка на сервере."
    }, { status: 500 })
  }
}