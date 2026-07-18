import { homeServerContent, otherProjectsContent, type ProjectSection } from './projectDetails';

interface ProjectBase {
  slug: string;
  title: string;
  titleParts: readonly string[];
  summary: string;
  status: string;
  repositoryUrl?: string;
}

export type Project = ProjectBase & (
  | {
      body: string;
      content?: never;
    }
  | {
      body?: never;
      content: readonly ProjectSection[];
    }
);

export const projects: readonly Project[] = [
  {
    slug: 'home-server',
    title: '自宅サーバー',
    titleParts: ['自宅サーバー'],
    summary: 'Proxmoxを用いた自宅サーバーの構築と運用を行っています',
    content: homeServerContent,
    status: '運用中',
  },
  {
    slug: 'ai-agent-runtime',
    title: 'AIエージェント実行基盤',
    titleParts: ['AIエージェント', '実行基盤'],
    summary: 'AIエージェントをVM環境に隔離し、セキュアで自由度高く動かすための実行基盤を開発しています',
    body: 'sunaba という、opencode server をプロジェクト専用の apple/container Linux VM 内で起動し、ホスト側の opencode TUI から接続するための CLI を開発しています。\nAIエージェントをVM環境に隔離し、ホスト環境への影響を抑えながら実行するための基盤です。\n\nAIエージェントをセキュアに動かすための実行基盤はこれ以外の方法以外にも色々あるため、学習しながら色々な方法を試している最中です。\n\n今現在は非公開ですが、今後公開する予定です。',
    status: '開発中',
  },
  {
    slug: 'festival-order-system',
    title: '文化祭用の注文システム',
    titleParts: ['文化祭用の', '注文システム'],
    summary: '文化祭用の注文システムを開発しています',
    body: '文化祭での注文を扱うためのシステムです。\n文化祭で飲食ブースの注文を効率化するために開発しています。\n呼び出しUIはマクドナルドの呼び出しUIを参考にしました。\n\n注文を行うブースで注文した内容が、商品提供ブースに通知され、商品が提供可能になると、モニターページに注文番号が表示されるようになっています。',
    status: '開発中',
    repositoryUrl: 'https://github.com/Haruka-127/festival-order-system',
  },
  {
    slug: 'others',
    title: 'その他',
    titleParts: ['その他'],
    summary: 'その他のプロジェクトについて',
    content: otherProjectsContent,
    status: 'その他',
  }
];
