import { format } from "date-fns";
import CommitItem from "../dto/CommitItem";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    // console.log("req",request)
    try {

        const params  = request.nextUrl.searchParams;
        const projects = params.get('projects');

        const projectId = 6;
        const branch = 'amb-des'
        const author = 'pedromartins@lampp-it.com.br'
        // 2025-03-20T00:00:00
        const since = '2025-02-20T00:00:00'


        const apiBase = process.env.GITLAB_URL;
        const url = `${apiBase}/v4/projects/${projectId}/repository/commits?` + new URLSearchParams({
            'ref_name': branch,
            author,
            since
        })

        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'PRIVATE-TOKEN': process.env.GITLAB_PRIVATE_KEY,
            },
        })

        if (res.status != 200) {
            return Response.json(res.json(), { status: res.status })
        }

        const data = await res.json()



        const commitsByDate = new Map<string, Array<CommitItem>>()

        data.forEach((d: any) => {
            const createdAt = format(d.created_at, "dd/MM/yyyy");
        
            if (commitsByDate.has(createdAt)) {
                const list = commitsByDate.get(createdAt);
                if(list){
                    list.push({
                        idCommit: d.id,
                        author: d.author_name,
                        authorEmail: d.author_email,
                        createdAt: d.created_at,
                        message: d.message,
                        title: d.title,
                        webUrl: d.web_url
                    });
                    commitsByDate.set(createdAt,list);
                }                
            } else {
                commitsByDate.set(createdAt, [{
                    idCommit: d.id,
                    author: d.author_name,
                    authorEmail: d.author_email,
                    createdAt: d.created_at,
                    message: d.message,
                    title: d.title,
                    webUrl: d.web_url
                }])
            }

        })

        return Response.json(Array.from(commitsByDate, ([date, commits]) => ({ date, commits })))
    } catch (e) {
        return Response.json([])
    }

}