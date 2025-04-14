import CommitItem from "../api/dto/CommitItem";
import { format } from "date-fns";
import ProjectItem from "../api/dto/ProjectItem";
import HeaderMain from "./components/Header/HeaderMain";
import { TbPoint } from "react-icons/tb";
import SelectProject from "./components/Selects/SelectProject/SelectProject";

// import ProjectItem from "../api/dto/ProjectItem";

interface CommitItemWDate {
  date: string;
  commits: Array<CommitItem>;
}
export default async function AppPage() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_FRONTEND_URL + "/api/commits"
  );
  const resProjects = await fetch(
    process.env.NEXT_PUBLIC_FRONTEND_URL + "/api/projects"
  );

  if (res.status != 200) {
    return <div>erro... </div>;
  }

  const commits: Array<CommitItemWDate> = await res.json();
  const projects: Array<ProjectItem> = await resProjects.json();

  return (
    <div>
      <HeaderMain />
      <div className="m-8">
        <div>
          <h2>Filtro</h2>
          <div>
            <SelectProject/>
          </div>
          <form>
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
        <h1 className="my-8">Atividades</h1>
        <div className="my-4">
          {commits.map((commitWDate, index) => (
            <div key={index + commitWDate.date}>
              <div className="flex items-center">
                {" "}
                <TbPoint className="w-8 h-8" />
                <h4 className="font-bold font-italic">{commitWDate.date}</h4>
              </div>
              <div className="ps-2 m-0">
                {commitWDate.commits.map((commit) => (
                  <CommitCard key={commit.idCommit} commit={commit} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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

      {/* <h2 className="my-2">{commit.title}</h2> */}
      <p className="ml-2 mt-2">{commit.message}</p>
    </div>
  );
}
