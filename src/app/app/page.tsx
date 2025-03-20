import CommitItem from "../api/dto/CommitItem";
import { format} from 'date-fns'

export default async function AppPage() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_FRONTEND_URL + "/api/commits"
  );
  const json: Array<CommitItem> = await res.json();
  return (
    <div>
      <div className="m-8">
        <h1>Minhas Atividades</h1>
        <h4>Meus commits do gitlab, transformados em tarefas:</h4>
        <div className="my-4 p-2">
          {json.map((commit, index) => (
            <div
              className="my-4 p-2 px-4 border-l-8"
              key={commit.idCommit + index}
            >
              <div className="flex gap-2">
                <span className="text-xs">
                    criado em :{format(commit.createdAt,'dd/MM/yyyy HH:mm')}
                </span>
                <span className="text-xs italic text-gray-500">
                  {commit.idCommit}
                </span>
              </div>

              <h2 className="my-2">{commit.title}</h2>
              <p className="text-gray-400">mensagem:</p>
              <p>{commit.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
