export interface Source {
    brand_id: string,
    id: string,
    path: string,
    type: string,
    trained: boolean,
    access_token: string,
    created_time: string
}

export const SourceState:Source =  {
    brand_id: '',
    id: "-1",
    path: "",
    type: "",
    trained: false,
    access_token: "",
    created_time:''
}