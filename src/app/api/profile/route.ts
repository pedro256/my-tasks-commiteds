
export async function GET() {

    try{
        const apiBase = process.env.GITLAB_URL;
        const url = `${apiBase}/v4/user`;
    
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'PRIVATE-TOKEN': process.env.GITLAB_PRIVATE_KEY,
            },
        })
        const profile = await res.json();
        return Response.json(profile)
    }catch (e) {
        return Response.json([])
    }
    
}