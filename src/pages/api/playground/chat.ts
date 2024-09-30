import { supabase, supabaseAdmin } from '@/utils/server/supabase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createEmbedding } from '@/utils/server/generate-embeddings';
import { DEFAULT_PROMPT_TEMPLATE, I_DONT_KNOW, SPLIT_TEXT_LENGTH } from '@/utils/server/consts';
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

const config_openai = new Configuration({
    apiKey: process.env.OPENAI_API_KEY_3
})
const openai = new OpenAIApi(config_openai)

if (!process.env.OPENAI_API_KEY_3)
    console.warn(
        'OPENAI_API_KEY has not been provided in this deployment environment. ' +
        'Will use the optional keys incoming from the client, which is not recommended.',
    );

export default async function handler(
    req: any,
    res: any
) {
    const params = await req.json();
    const query = params.query;
    const embedding_data = await createEmbedding(params.query);
    const matched_data = await supabaseAdmin.rpc("matched_sections", {
        embedding: embedding_data.embedding.data[0].embedding,
        match_threshold: 0.76,
        match_count: 10,
    });

    console.log(matched_data);

    let context = "";
    for (let k = 0; k < matched_data.data.length; k++) {
        context += matched_data.data[k].text
    }

    let full_prompt = DEFAULT_PROMPT_TEMPLATE
        .replace('{{I_DONT_KNOW}}', I_DONT_KNOW)
        .replace('{{CONTEXT}}', context)
        .replace('{{PROMPT}}', query)
    const messages = [
        {
            role: 'user',
            content: full_prompt
        }
    ];
    
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        temperature: 0.5,
        messages
    })

    const stream = OpenAIStream(response, {
        async onCompletion(completion) {
            
        }
    })
    return new StreamingTextResponse(stream)
}
export const config = {
    runtime: 'edge',
};