# 不動産管理アプリ

Supabase認証・DBを利用した不動産管理Webアプリ。

## 技術構成
- React + Vite（`react-router-dom`でルーティング）
- Supabase（Auth：メール/パスワード認証、Database：Postgres + RLS）
- Vercelにデプロイ

### 主なファイル
- `src/lib/supabaseClient.js` — Supabaseクライアント初期化
- `src/context/AuthContext.jsx` — ログイン状態を全体で共有するContext
- `src/components/ProtectedRoute.jsx` — 未ログイン時に`/login`へリダイレクト
- `src/pages/LoginPage.jsx` / `SignUpPage.jsx` — ログイン・会員登録フォーム
- `src/pages/PropertyListPage.jsx` — 物件一覧（登録ユーザー自身の物件のみ表示）
- `src/lib/properties.js` — 物件のCRUD関数（`fetchProperties` / `createProperty` / `updateProperty` / `deleteProperty`）
- `src/components/PropertyForm.jsx` / `PropertyCard.jsx` — 物件登録・編集・削除UI
- `supabase/schema.sql` — `properties`テーブル作成とRLSポリシー定義（Supabase SQL Editorで実行する）
- `vercel.json` — SPA用に全パスを`index.html`へrewrite

## 環境変数
`.env`で管理し、`.gitignore`済み（リポジトリには含まれない）。

| 変数名 | 内容 |
|---|---|
| `VITE_SUPABASE_URL` | SupabaseプロジェクトのProject URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | SupabaseのPublishable key |

- ローカル開発時は`.env`に設定する
- Vercel環境ではダッシュボードの Project Settings > Environment Variables に同じ2つを設定する（`vercel.json`には含めない）

## データベース（Supabase）
- テーブル：`properties`（`name`＝物件名, `rent`＝家賃(円), `area`＝エリア名, `layout`＝間取り, `user_id`＝登録ユーザーのUUID）
- RLSを有効化し、select/insert/update/deleteすべてに `auth.uid() = user_id` の条件を設定（自分が登録した物件のみ操作可能）
- テーブル未作成の場合は`supabase/schema.sql`の内容をSupabaseダッシュボードのSQL Editorで実行する

## デプロイ手順
1. Vercelで本リポジトリ（GitHub: `yukie-takeo/real-estate-app`）をインポート
2. Vercelダッシュボードで環境変数（`VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`）を設定
3. `supabase/schema.sql`を対象のSupabaseプロジェクトのSQL Editorで実行済みであることを確認
4. デプロイ実行（`vercel.json`のrewrite設定によりSPAの直リンクアクセスにも対応）

## 注意点
- Supabase Authの「Confirm email」設定が有効な場合、会員登録直後はセッションが発行されず確認メールのリンクを踏むまでログインできない
- RLSポリシーにより、他ユーザーが登録した物件はSELECTでも返らない（一覧に表示されないだけでなく、直接IDを指定してもアクセス不可）
- `.env`のキーはダミー値でリポジトリにコミットしないこと（実際の値はローカルの`.env`とVercelダッシュボードのみで管理）

## デプロイ情報
- 本番URL：https://real-estate-app-nine-puce.vercel.app
- Supabaseプロジェクト名：realestate-app
