import { notFound } from "next/navigation";
import { Editor } from "@/src/frontend/features/editor/Editor";
import { getProjectForEdit } from "@/src/backend/factory/factory";
import { NotExistEntityError } from "@/src/backend/core/errors/NotExistEntityError";
import { mapToEditorState } from "@/src/frontend/features/editor/EditorData";

interface EditProjectProps {
  params: Promise<{
    projectCode: string
  }>;
}

export default async function EditProjectPage({ params }: EditProjectProps) {
  const { projectCode } = await params;
  try {
    const project = await getProjectForEdit.execute(projectCode);
    const data = mapToEditorState(project);
    return <Editor data={data} />
  } catch (error) {
    if (error instanceof NotExistEntityError) {
      notFound();
    }
    throw error;
  }
}