import ProjectItem from "../dto/ProjectItem";

export async function GET() {

    const apiBase = process.env.GITLAB_URL;
    const url = `${apiBase}/v4/projects?` + new URLSearchParams({
        membership: "true",
        simple: 'true'
    })

    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'PRIVATE-TOKEN': process.env.GITLAB_PRIVATE_KEY,
        },
    })
    const data = await res.json()
    const r: ProjectItem[] = [];
    data.forEach((d: any) => {
        r.push({
            id: d.id,
            description: d.description,
            name: d.name,
            nameWithNamespace: d.name_with_namespace
        })
    })

    return Response.json(r)
}