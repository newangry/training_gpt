import { supabase, supabaseAdmin } from '@/utils/server/supabase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createEmbedding } from '@/utils/server/generate-embeddings';
import { SPLIT_TEXT_LENGTH } from '@/utils/server/consts';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const text = req.body.text;
    const name = req.body.name;
    const split_arr: string[] = [];
    
    const {error, data} = await supabaseAdmin.from("file_list").insert([{
        name: name
    }]).select("*").limit(1);

    if(data) {
        for (let k = 0; k < text.length; k += SPLIT_TEXT_LENGTH) {
            split_arr.push(
                text.slice(
                    k,
                    SPLIT_TEXT_LENGTH + k
                )
            )
        }
        let promises: Promise<any>[] = [];
        for(let k = 0; k<split_arr.length; k++){
            const text = split_arr[k];
            promises.push(convertAndSave(text, name, data[0].id))
        }        
        await Promise.all(promises);
    } 
    
    res.status(200).json({data: 'success'})
}

const convertAndSave = async(txt: string, name: string, file_id: number) => {
    const embedded = await createEmbedding(txt);
    const { error } = await supabaseAdmin.from('files').insert([{
        embedded: embedded.embedding.data[0].embedding,
        text: embedded.content,
        tokens: embedded.embedding.usage.total_tokens ?? 0,
        name,
        file_id
    }])
    if(error) {
        
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '100mb' // Set desired value here
        }
    }
}