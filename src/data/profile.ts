export interface ExternalLink {
  label: string;
  href: string;
  note?: string;
}

export interface Profile {
  handle: string;
  brand: string;
  title: string;
  description: string;
  heroDescription: string;
  about: string;
  labels: readonly string[];
  keywords: readonly string[];
  status: ReadonlyArray<{ label: string; value: string }>;
  githubUrl: string;
  xUrl: string;
  links: ReadonlyArray<ExternalLink>;
}

export const profile: Profile = {
  handle: 'Haruka',
  brand: 'Haruka',
  title: 'Haruka | Profile',
  description: "I'm Haruka, a high school student focused on infrastructure, security, and development.",
  heroDescription: 'セキュリティとインフラに取り組む、日本の高校生です',
  about: '高校生のセキュリティエンジニアです。セキュリティとインフラについて学びながら、セキュリティエンジニアとして働いています。\n\nAIエージェントのセキュリティについて関心があり、安全にAIエージェントを実行する手法について研究しています。\n\nインフラにも関心がありProxmoxを基盤にした自宅サーバーを構築・運用しています。',
  labels: ['High School Student', 'Infrastructure', 'Security', 'Development'],
  keywords: ['Infrastructure', 'Security', 'Networking','Linux', 'Web', 'Development'],
  status: [
    { label: 'ROLE', value: 'High School Student' },
    { label: 'INTERESTS', value: 'Infrastructure / Security' },
  ],
  githubUrl: 'https://github.com/Haruka-127',
  xUrl: 'https://x.com/ruka_kage',
  links: [
    { label: 'X', href: 'https://x.com/ruka_kage', note: '@ruka_kage' },
    { label: 'GitHub', href: 'https://github.com/Haruka-127', note: 'Haruka-127' },
    { label: 'Email', href: 'mailto:haruka127h@gmail.com', note: 'haruka127h@gmail.com' },
  ],
};
