
export interface CommentType {
    from_name: string,
    from_id: string,
    create_time: string,
    comment_id: string,
    comment_history: any,
    post_caption: string,
    message: string,
    suggestions: string[],
    permalink_url: string,
    parent_comment: any,
    prompt:string,
    posted: number,
    read: boolean,
    id: string
}

export const CommentState:CommentType = {
    from_name: "",
    from_id: "",
    create_time: '0',
    comment_history:[],
    post_caption: "",
    message: "",
    suggestions:[],
    permalink_url:"",
    comment_id:'',
    parent_comment: null,
    prompt:'',
    posted: -1,
    read: false,
    id: '0'
}