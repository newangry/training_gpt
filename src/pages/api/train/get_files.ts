import { supabase, supabaseAdmin } from '@/utils/server/supabase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createEmbedding } from '@/utils/server/generate-embeddings';
import { SPLIT_TEXT_LENGTH } from '@/utils/server/consts';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { error, data} = await supabaseAdmin.from("file_list").select("name") ;
    res.status(200).json(data)
}