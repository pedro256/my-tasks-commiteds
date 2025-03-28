import CommitItem from "../dto/CommitItem";

export async function GET(request:Request) {
    console.log("req",request)

    const projectId = 6;
    const branch='amb-des'
    const author='pedromartins@lampp-it.com.br'
    // 2025-03-20T00:00:00
    const since = '2025-02-20T00:00:00'


    const apiBase = process.env.GITLAB_URL;
    const url = `${apiBase}/v4/projects/${projectId}/repository/commits?`+ new URLSearchParams({
        'ref_name':branch,
        author,
        since
    })

    const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': process.env.GITLAB_PRIVATE_KEY,
        },
      })


    const data= await res.json()
    const r:CommitItem[] = [];
    data.forEach((d:any)=>{
        r.push({
            idCommit:d.id,
            author: d.author_name,
            authorEmail: d.author_email,
            createdAt: d.created_at,
            message: d.message,
            title: d.title,
            webUrl: d.web_url
        })
    })

    return Response.json(r)
}