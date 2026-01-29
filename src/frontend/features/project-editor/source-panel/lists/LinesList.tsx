import { ProjectEditLineDto } from "@/src/backend/application/query/project/getProjectForEdit/ProjectEditDto"

export function LinesList({ lines }: { lines: ProjectEditLineDto[]}) {
  return lines.map(line => <div>{line.text}</div>)
}