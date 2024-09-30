// export const SUPABSE_URL = process.env.SUPABASE_URL;
// export const SUPABSE_ANNON_KEY = process.env.SUPABASE_ANNON_KEY;

export const SUPABSE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
export const SUPABSE_ANNON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
export const COMMENTS = {
  entry: [
    {
      id: 1101231223,
      time: 1692903000,
      changes: [
        {
          "value": {
            "item": "status",
            "post_id": "44444444_444444444",
            "verb": "add",
            "published": 1,
            "created_time": 1695727791,
            "message": "Example post content.",
            "comment_id": "323073609378563_637699484891927",
            "from": {
              "name": "Test Page",
              "id": "1067280970047460"
            }
          },
        }
      ]
    }
  ],
  object: 'page'
}

export const PAGES = [
  {name: 'Dashboard', path: 'dashboard'},
  {name: 'Comments', path: 'comments'},
  {name: 'Learning', path: 'learning'},
]

export const THEME_COLOR = '#E0E049';
export const THEM_SPLITER_COLOR='#E5E7EB';
export const THEM_BORDER_COLOR='#919EAB52';
