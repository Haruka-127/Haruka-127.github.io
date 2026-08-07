import { homeServerContent, otherProjectsContent, studentHealthSupportContent, type ProjectSection } from './projectDetails';

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
    slug: 'student-health-support',
    title: '起立性調節障害の中高生のためのアプリ',
    titleParts: ['起立性調節障害の', '中高生のための', 'アプリ'],
    summary: '起立性調節障害の中高生のためのアプリを開発しています',
    content: studentHealthSupportContent,
    status: '開発中',
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
    slug: 'others',
    title: 'その他',
    titleParts: ['その他'],
    summary: 'その他のプロジェクトについて',
    content: otherProjectsContent,
    status: 'その他',
  }
];
