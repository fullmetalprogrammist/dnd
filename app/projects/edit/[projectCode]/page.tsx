import { EditRoom } from "@/src/frontend/components/EditRoom";

interface EditProjectProps {
  params: Promise<{
    projectCode: string
  }>;
}

export default async function EditProject({ params }: EditProjectProps) {
  const { projectCode } = await params;
  console.log("Перешили на страницу редактирования проекта " + projectCode);

  return (
    <EditRoom />
  );
}