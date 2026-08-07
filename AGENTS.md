# AGENTS.md

## Project

Harukaの静的プロフィールサイトです。Astro、TypeScript、Tailwind CSSを使用し、GitHub Pagesへデプロイします。

## Structure

- `src/data/`: プロフィール、興味、実績、プロジェクトの表示データ
- `src/components/`: 再利用するAstroコンポーネント
- `src/pages/`: トップページとプロジェクト詳細ページ
- `src/layouts/Layout.astro`: SEO、OGP、共通HTML
- `src/styles/global.css`: Tailwindと共通スタイル

## Guidelines

- コンテンツ変更は、可能な限り`src/data/`で行う。
- サイトは静的生成を維持し、不要なクライアントJavaScriptを追加しない。
- 日本語本文には`BudouxText`を使用する。
- レスポンシブ表示とアクセシビリティを維持する。
- `dist/`、`.astro/`、`node_modules/`は編集しない。
- 依存関係を変更した場合は`package-lock.json`も更新する。

## Validation

変更後に以下を実行する。

```bash
npm run check
npm run build
```
