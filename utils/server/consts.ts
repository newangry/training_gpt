export const SUPABSE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const EMBEDDING_MODEL='text-embedding-ada-002';
export const OPENAI_MODELID='gpt-4';
export const DEFAULT_PROMPT_TEMPLATE=`
Act as a support employee of company, who answers service  in a friendly and informal way. In the context sections you will reference content.
I would like you to consider the Context sections and respond.
The context sections and Question is like this.
Context sections:
---
{{CONTEXT}}
End Context sections.
Question: "{{PROMPT}}"
End Question.

`;

export const SYSTEM_PROMPT='Act as a support rep for the company, responding to Facebook comments. Context sections provide comment history.';
export const I_DONT_KNOW='Sorry, I am not sure how to answer that.';
export const SPLIT_TEXT_LENGTH=650;