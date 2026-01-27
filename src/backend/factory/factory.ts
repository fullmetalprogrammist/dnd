import { prisma } from "@/src/backend/infrastructure/prisma/prismaClient";
import { LineRepository } from "@/src/backend/infrastructure/prisma/write/line/LineRepository";
import { ProjectRepository } from "../infrastructure/prisma/write/project/ProjectRepository";

// read-репозитории
import { LineListRepository } from "@/src/backend/infrastructure/prisma/read/line/LineListRepository";

// use case'ы
import { GetLinesByProjectId } from "../application/usecase/GetLinesByProjectId";

export const lineRepository = new LineRepository();
export const projectRepository = new ProjectRepository();

const lineListRepository = new LineListRepository(prisma);
export const getLinesByProject = new GetLinesByProjectId(lineListRepository);

