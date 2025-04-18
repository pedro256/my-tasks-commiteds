import { format } from "date-fns";
import CommitItem from "../dto/CommitItem";
import { NextRequest } from "next/server";

interface ProjectInfo {
  id: number;
  name: string;
}

interface BranchInfo {
  name: string;
  commit: {
    committed_date: string;
  };
}

async function listProjectsWithLatestBranch(): Promise<{
  projectId: number;
  projectName: string;
  branch: string;
}[]> {
  const apiBase = process.env.GITLAB_URL!;
  const token = process.env.GITLAB_PRIVATE_KEY!;
  const projectsUrl = `${apiBase}/v4/projects?${new URLSearchParams({
    membership: "true",
    simple: "true",
    per_page:"100"
  })}`;

  const res = await fetch(projectsUrl, {
    headers: {
      "Content-Type": "application/json",
      "PRIVATE-TOKEN": token,
    },
  });

  const projects: ProjectInfo[] = await res.json();

  const results = await Promise.all(
    projects.map(async (project) => {
      const branchesUrl = `${apiBase}/v4/projects/${project.id}/repository/branches`;
      const branchRes = await fetch(branchesUrl, {
        headers: {
          "Content-Type": "application/json",
          "PRIVATE-TOKEN": token,
        },
      });

      if (!branchRes.ok) return null;

      const branches: BranchInfo[] = await branchRes.json();
      if (!branches.length) return null;

      const latestBranch = branches.reduce((latest, current) =>
        new Date(current.commit.committed_date) > new Date(latest.commit.committed_date)
          ? current
          : latest
      );

      return {
        projectId: project.id,
        projectName: project.name,
        branch: latestBranch.name,
      };
    })
  );

  return results.filter((r): r is NonNullable<typeof r> => r !== null);
}

export async function GET(request: NextRequest) {
  try {
    const author = "your_mail@mail.cm";
    const since = "2025-03-18T00:00:00";
    const apiBase = process.env.GITLAB_URL!;
    const token = process.env.GITLAB_PRIVATE_KEY!;

    const projects = await listProjectsWithLatestBranch();

    console.log("projects:",projects)

  

    const commitsByDate = new Map<string, CommitItem[]>();

    const allCommits = await Promise.all(
      projects.map(async (project) => {
        const commitsUrl = `${apiBase}/v4/projects/${project.projectId}/repository/commits?${new URLSearchParams({
          ref_name: s,
          author,
          since,
        })}`;

        const res = await fetch(commitsUrl, {
          headers: {
            "Content-Type": "application/json",
            "PRIVATE-TOKEN": token,
          },
        });

        if (!res.ok) return [];

        const commits = await res.json();

        console.log(project.projectName+" : "+project.branch,commits.length);

        return commits.map((commit: any): CommitItem => ({
          idCommit: commit.id,
          author: commit.author_name,
          authorEmail: commit.author_email,
          createdAt: commit.created_at,
          message: commit.message,
          title: commit.title ?? "",
          webUrl: commit.web_url ?? "",
          project: project.projectName,
          branch: project.branch,
        }));
      })
    );

    // Agrupar todos os commits por data
    allCommits.flat().forEach((commit) => {
      const dateKey = format(new Date(commit.createdAt), "dd/MM/yyyy");
      if (!commitsByDate.has(dateKey)) {
        commitsByDate.set(dateKey, []);
      }
      commitsByDate.get(dateKey)!.push(commit);
    });

    return Response.json(
      Array.from(commitsByDate, ([date, commits]) => ({ date, commits }))
    );
  } catch (error) {
    console.error("Erro ao buscar commits:", error);
    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}
