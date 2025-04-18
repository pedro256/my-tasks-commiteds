export default class EventItem {
    id: number;
    projectId: number;
    projectName: string;
    actionName: string;
    authorId: number;
    createdAt: string;
    author: {
      id: number;
      username: string;
      name: string;
      state: string;
      avatarUrl: string;
      webUrl: string;
    };
    pushData: {
      commitCount: number;
      action: string;
      refType: string;
      commitFrom: string;
      commitTo: string;
      ref: string;
      commitTitle: string;
      refCount: number | null;
    };
    authorUsername: string;
  
    constructor(data: any) {
      this.id = data.id;
      this.projectId = data.project_id;
      this.projectName = data.project_name;
      this.actionName = data.action_name;
      this.authorId = data.author_id;
      this.createdAt = data.created_at;
      this.author = {
        id: data.author?.id,
        username: data.author?.username,
        name: data.author?.name,
        state: data.author?.state,
        avatarUrl: data.author?.avatar_url,
        webUrl: data.author?.web_url,
      };
      this.pushData = {
        commitCount: data.push_data?.commit_count,
        action: data.push_data?.action,
        refType: data.push_data?.ref_type,
        commitFrom: data.push_data?.commit_from,
        commitTo: data.push_data?.commit_to,
        ref: data.push_data?.ref,
        commitTitle: data.push_data?.commit_title,
        refCount: data.push_data?.ref_count ?? null,
      };
      this.authorUsername = data.author_username;
    }
  }
  