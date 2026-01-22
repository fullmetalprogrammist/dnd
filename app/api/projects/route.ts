import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(`Пришел запрос на создание проекта ${data.code}`);

  return NextResponse.json({
    message: `Проект создан успешно!`
  })
}