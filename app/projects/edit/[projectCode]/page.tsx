import { notFound } from "next/navigation";
import { ProjectEditor } from "@/src/frontend/components/ProjectEditor";
import { getProjectForEdit } from "@/src/backend/factory/factory";
import { NotExistEntityError } from "@/src/backend/core/errors/NotExistEntityError";

interface EditProjectProps {
  params: Promise<{
    projectCode: string
  }>;
}

export default async function EditProjectPage({ params }: EditProjectProps) {
  const { projectCode } = await params;
  try {
    const project = await getProjectForEdit.execute(projectCode);
    return <ProjectEditor projectInit={project} />
  } catch (error) {
    if (error instanceof NotExistEntityError) {
      notFound();
    }
    throw error;
  }
}