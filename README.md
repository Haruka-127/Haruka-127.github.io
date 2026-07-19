# Haruka Profile

Harukaのプロフィール、興味分野、Achievements、Projects、連絡先を掲載するAstro製のプロフィールサイトです。

## 使用技術

- Astro / TypeScript（strictest）
- Tailwind CSS（`@tailwindcss/vite`）
- BudouX（日本語の自然な改行位置をビルド時に設定）
- GitHub Actions / GitHub Pages
- UIフレームワーク、データベース、CMS、サーバーサイド処理は不使用

## 必要環境

- Node.js 22.12以上
- npm

## ローカル開発

```bash
npm install
npm run dev
```

利用できるコマンドは以下のとおりです。

```bash
npm run dev      # 開発サーバーを起動
npm run check    # TypeScriptとAstroテンプレートを検査
npm run build    # 本番用ファイルを生成
npm run preview  # ビルド結果をローカルで確認
```

## 基本情報を編集する

[src/data/profile.ts](src/data/profile.ts)で以下を編集します。

- 表示名とサイトタイトル
- HeroとAboutの文章
- Heroのラベル
- X、GitHub、メールアドレス

About内の改行には`\n`、段落間の空行には`\n\n`を使用します。

## InterestsとAchievementsを編集する

[src/data/interests.ts](src/data/interests.ts)の`interests`と`achievements`を編集します。項目を追加するとトップページへ自動的に反映されます。

## Projectsを編集する

[src/data/projects.ts](src/data/projects.ts)の`projects`配列を編集します。

- `slug`: 個別ページのURL
- `title`: トップページなどで表示するタイトル
- `titleParts`: 個別ページで改行してよい単位
- `summary`: トップページと個別ページに表示する概要
- `status`: プロジェクトの状態
- `repositoryUrl`: 任意のGitHubリポジトリURL

個別ページの本文には`body`か`content`のどちらか一方を設定します。

### 短い本文を設定する

```ts
{
  slug: 'example',
  title: 'Example',
  titleParts: ['Example'],
  summary: 'プロジェクトの概要です。',
  body: '個別ページに表示する本文です。\n改行も利用できます。',
  status: '開発中',
}
```

### 見出しやリストを含む本文を設定する

[src/data/projectDetails.ts](src/data/projectDetails.ts)に`ProjectSection[]`形式のデータを定義し、プロジェクトの`content`へ設定します。

```ts
export const exampleContent = [
  {
    title: '概要',
    paragraphs: ['1つ目の段落です。', '2つ目の段落です。'],
    items: ['項目1', '項目2'],
  },
] satisfies readonly ProjectSection[];
```

`paragraphs`内の文字列では`\n`による改行も利用できます。段落を分ける場合は配列要素を分けます。

## サイト設定と画像を編集する

- [astro.config.mjs](astro.config.mjs): 公開URL
- [src/layouts/Layout.astro](src/layouts/Layout.astro): SEO、OGP、JSON-LD
- [public/og-image.svg](public/og-image.svg): リンク共有時の画像
- [public/favicon.png](public/favicon.png): favicon（128×128px）
- [public/robots.txt](public/robots.txt): クローラー設定

サイト内の日本語本文と見出しには[src/components/BudouxText.astro](src/components/BudouxText.astro)を使用しています。BudouXはビルド時に文節を解析して`<wbr>`を生成するため、ブラウザ側へ追加のJavaScriptは配信されません。折り返さないタグ、メールアドレス、明示的に区切りを指定した個別ページのタイトルには適用していません。

## GitHub Pages

`main`ブランチへのpushを契機に、[deploy.yml](.github/workflows/deploy.yml)がビルドとデプロイを実行します。公開URLは`https://haruka-127.github.io`を設定しているため、リポジトリ名は`Haruka-127.github.io`を想定しています。
