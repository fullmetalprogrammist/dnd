import { prisma } from "@/src/backend/infrastructure/prisma/prismaClient";
import { LineRepository } from "@/src/backend/infrastructure/prisma/write/line/LineRepository";
import { ProjectRepository } from "../infrastructure/prisma/write/project/ProjectRepository";
import { GetProjectForEdit } from "@/src/backend/infrastructure/prisma/query/project/GetProjectForEdit";

// read-репозитории
import { LineListRepository } from "@/src/backend/infrastructure/prisma/query/line/LineListRepository";

// use case'ы
import { GetLinesByProjectId } from "../application/usecase/GetLinesByProjectId";

export const lineRepository = new LineRepository();
export const projectRepository = new ProjectRepository();

const lineListRepository = new LineListRepository(prisma);
export const getLinesByProject = new GetLinesByProjectId(lineListRepository);


// queries
export const getProjectForEdit = new GetProjectForEdit(prisma);