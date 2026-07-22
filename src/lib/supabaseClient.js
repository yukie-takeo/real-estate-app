// Supabaseクライアントの初期化
// Project URLとPublishable keyは.envファイルで管理する（リポジトリにはコミットしない）
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Supabaseの接続情報が設定されていません。.envファイルを確認してください。')
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
