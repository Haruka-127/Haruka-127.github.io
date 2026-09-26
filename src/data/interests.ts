export interface Interest {
  title: string;
  description: string;
  keywords: readonly string[];
}

export const interests: readonly Interest[] = [
  { title: 'Infrastructure', description: '自宅サーバーなどのシステムの構築と運用', keywords: ['Linux', 'Networking', 'Proxmox', 'Cloud'] },
  { title: 'Security', description: 'セキュアな自宅サーバー、セキュアなAI Agentの開発', keywords: ['Secure Server','AI Agents Security', 'Network Security'] },
  { title: 'Development', description: 'Web開発、iOSアプリ開発、AI Agents開発', keywords: ['TypeScript', 'JavaScript', 'Python', 'Swift'] },
];

export interface Achievement {
  label: string;
  title: string;
  description: string;
}

export const achievements: readonly Achievement[] = [
  {
    label: "SECCAMP '26",
    title: 'セキュリティ・キャンプ 2026 Z1ゼミ',
    description: '修了',
  },
  {
    label: "CODE BLUE '26",
    title: 'CODE BLUE 2026 学生スタッフ',
    description: '参加予定',
  },
];
