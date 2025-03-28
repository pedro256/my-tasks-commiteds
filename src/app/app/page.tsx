import CommitItem from "../api/dto/CommitItem";
import { format } from "date-fns";
import ProjectItem from "../api/dto/ProjectItem";

export default async function AppPage() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_FRONTEND_URL + "/api/commits"
  );
  const resProjects = await fetch(
    process.env.NEXT_PUBLIC_FRONTEND_URL + "/api/projects"
  );
  const commits: Array<CommitItem> = await res.json();
  const projects: Array<ProjectItem> = await resProjects.json();
  return (
    <div>
      <div className="m-8">
        <h1>Minhas Atividades</h1>
        <h4>Meus commits do gitlab, transformados em tarefas:</h4>
        <div>
       
          <form className="card">
            
            <div>
            <span>Projetos:</span>
            </div>
            <div className="flex w-full flex-wrap gap-2 items-center p-2">
              {projects.map((project, index) => (
                <div
                  key={project.name + index}
                  className="card p-1 px-4 rounded flex items-center"
                >
                  <p className="text-xs">{project.name}</p>
                </div>
              ))}
            </div>
          </form>
        </div>

        <div className="my-4">
          {commits.map((commit, index) => (
            <div key={index}>
              <DataCommitSeparator
                dateCurrentItem={commit.createdAt}
                dateLastItem={
                  index > 0 ? commits[index - 1].createdAt : undefined
                }
              />
              <div className="ml-2">
                <CommitCard
                  key={commit.idCommit}
                  commit={commit}
                  index={index}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DataCommitSeparator({
  dateCurrentItem,
  dateLastItem,
}: {
  dateCurrentItem: string;
  dateLastItem?: string;
}) {
  const formated = format(dateCurrentItem, "dd/MM/yyyy");
  if (!dateLastItem) {
    return <h2>{formated}</h2>;
  }
  const last = format(dateLastItem, "dd/MM/yyyy");
  if (formated != last) {
    return <h2>{format(dateCurrentItem, "dd/MM/yyyy")}</h2>;
  }
  return undefined;
}

function CommitCard({ commit, index }: { commit: CommitItem; index?: number }) {
  return (
    <div className="my-4 p-2 px-4 card rounded" key={commit.idCommit + index}>
      <div className="flex gap-2">
        <span className="text-xs">
          criado em :{format(commit.createdAt, "dd/MM/yyyy HH:mm")}
        </span>
        <span className="text-xs italic text-gray-500">{commit.idCommit}</span>
      </div>

      <h2 className="my-2">{commit.title}</h2>
      <p className="ml-2">{commit.message}</p>
    </div>
  );
}
