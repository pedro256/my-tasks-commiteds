
import { format } from "date-fns";
import HeaderMain from "./components/Header/HeaderMain";
import FormFilterCommits from "./components/FormFilterCommits/FormFilterCommits";
import EventItem from "../api/dto/EventItem";
import ProjectItem from "../api/dto/ProjectItem";
import { ReactNode } from "react";
import { MdMerge } from "react-icons/md";
import { FaCodeCommit, FaTrash } from "react-icons/fa6";

function generateEventMessage(event: EventItem): ReactNode {
  const { pushData, actionName, createdAt } = event;

  if (!pushData) return "Ação não identificada";

  const { action, refType, ref, commitCount, commitTitle, commitFrom, commitTo } = pushData;

  if (commitTitle?.toLowerCase().includes("merge")) {
    return <div className="flex gap-1 items-center">
      <MdMerge className="p-1 w-8 h-8" /> <b>MERGE em <span className="bg-blue-400 font-bold text-white rounded p-1 border">{ref}</span></b>: {commitTitle}

    </div>
  }
  if (actionName == 'pushed to') {
    return <div className="flex gap-1 items-center">
      <FaCodeCommit className="p-1 w-8 h-8" /> <b>COMMIT em <span className="bg-blue-200 font-bold text-black rounded p-1">{ref}</span></b>: {commitTitle}
    </div>
  }

  if (action == "removed" && refType == "branch") {
    return (<div className="flex gap-1 items-center">
      <FaTrash className="p-1 w-6 h-6" />  branch : <span className="bg-red-400 font-bold text-white rounded p-1 border">{ref}</span> foi <b>DELETADA</b>
    </div>)
  }
  if (action == "created" && refType == "branch") {
    return <div className="flex gap-1 items-center">
      <FaCodeCommit className="p-1 w-8 h-8 text-green-600" /> <b>criado nova branch <span className="bg-green-600 font-bold text-white rounded p-1 border">{ref}</span></b>: {commitTitle}
    </div>
  }

  return `${actionName}(${action}) ${refType} "${ref}" (${commitTitle ?? "sem título"})`;
}

export default async function AppPage() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_FRONTEND_URL + "/api/events"
  );
  const res_projetos = await fetch(
    process.env.NEXT_PUBLIC_FRONTEND_URL + "/api/projects"
  )

  if (res.status != 200) {
    return <div>erro... </div>;
  }

  const events: Array<EventItem> = await res.json();
  const projetos: Array<ProjectItem> = await res_projetos.json();

  events.forEach(e => {
    e.projectName = projetos.find(p => p.id == e.projectId)?.name || "Sem Nome"
  })

  return (
    <div>
      <HeaderMain />
      <div className="m-8">
        {/* <div>
          <h2>Filtro</h2>
          <div className="my-2">
            <FormFilterCommits />
          </div>
        </div> */}
        <h1 className="my-8">Atividades</h1>
        <div className="my-4">
          {events.map((eve, index) => (
            <EventCard key={eve.id} event={eve} />
          ))}
        </div>
      </div>
    </div>
  );
}
function EventCard({ event, index }: { event: EventItem; index?: number }) {
  return (
    <div className="my-1 py-2 px-4 card border rounded" key={event.id}>
      <div className="flex justify-between">
        <span className="text-xs text-gray-600">
          Criado em: {format(event.createdAt, "dd/MM/yyyy HH:mm")}
        </span>
        <span className="text-xs italic text-gray-400">ID: {event.id}</span>
      </div>

      <div className="mt-2">
        <p className="font-medium">Proj.:<b className="text-blue-800">{event.projectName}</b>  <span className="opacity-50">({event.projectId})</span></p>
        {generateEventMessage(event)}
      </div>
    </div>
  );
}
