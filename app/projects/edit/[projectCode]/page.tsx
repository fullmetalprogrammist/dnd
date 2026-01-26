import { EditRoom } from "@/src/frontend/components/EditRoom";
import { projectRepository } from "@/src/backend/factory/projectRepositoryFactory";
import { lineRepository } from "@/src/backend/factory/lineRepositoryFactory";

interface EditProjectProps {
  params: Promise<{
    projectCode: string
  }>;
}

export default async function EditProject({ params }: EditProjectProps) {
  const { projectCode } = await params;

  const project = await projectRepository.getByCode(projectCode);
  const lines = await lineRepository.getByProjectId(project!.id);
  // const scenes = await scenesRepository.getByProjectId(project.id);
  // const characters = await charactersRepository.getByProjectId(project.id);

  // <EditRoom project={project} lines={lines} scenes={scenes} characters={characters} />

  return (
    project 
      ? <EditRoom project={project} lines={lines} /> 
      : <div>Проект с кодом {projectCode} не найден</div>
  );
}