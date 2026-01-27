import { EditRoom } from "@/src/frontend/components/EditRoom";
import { projectRepository } from "@/src/backend/factory/projectRepositoryFactory";
import { lineRepository } from "@/src/backend/factory/lineRepositoryFactory";

import { getLinesByProject } from "@/src/backend/factory/factory";

interface EditProjectProps {
  params: Promise<{
    projectCode: string
  }>;
}

export default async function EditProject({ params }: EditProjectProps) {
  const { projectCode } = await params;

  const project = await projectRepository.getByCode(projectCode);

  const arr = await getLinesByProject.execute(16);
  console.log(arr);
  // const scenes = await scenesRepository.getByProjectId(project.id);
  // const characters = await charactersRepository.getByProjectId(project.id);

  // <EditRoom project={project} lines={lines} scenes={scenes} characters={characters} />
  // <EditRoom project={project} lines={lines} /> 

  return (
    project 
      ? <EditRoom /> 
      : <div>Проект с кодом {projectCode} не найден</div>
  );
}