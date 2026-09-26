import { aiAgentRuntimeContent, festivalOrderSystemContent, homeServerContent, otherProjectsContent, studentHealthSupportContent, type ProjectSection } from './projectDetails';

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
    summary: 'OpenCodeをプロジェクト専用のApple Container VMへ隔離し、ホストとの境界を管理する実行基盤「sunaba」を開発しています',
    content: aiAgentRuntimeContent,
    status: '開発中',
    repositoryUrl: 'https://github.com/Haruka-127/sunaba',
  },
  {
    slug: 'festival-order-system',
    title: '文化祭用の注文システム',
    titleParts: ['文化祭用の', '注文システム'],
    summary: '文化祭の飲食ブースで、注文の受付から商品提供の呼び出しまでを支援するシステムを開発しています',
    content: festivalOrderSystemContent,
    status: '開発中',
    repositoryUrl: 'https://github.com/Haruka-127/festival-order-system',
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
    slug: 'others',
    title: 'その他',
    titleParts: ['その他'],
    summary: 'その他のプロジェクトについて',
    content: otherProjectsContent,
    status: 'その他',
  }
];
