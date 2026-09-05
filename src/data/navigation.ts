/** astro-navfolioのホーム画面と共通ナビゲーションの設定。 */
import { profile } from './profile';
import { projects } from './projects';

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects/' },
];

export const projectsPage = {
  title: 'Projects',
  description: '自宅サーバーの運用や、セキュリティ・アプリ開発に関するプロジェクトをまとめています。',
};

export const home = {
  profile: {
    name: profile.handle,
    handle: '@Haruka-127',
    role: 'High School Student',
    email: 'haruka127h@gmail.com',
    website: 'https://haruka-127.github.io/',
    avatar: '/favicon.png',
  },
  intro: {
    title: `I'm ${profile.handle}`,
    name: profile.handle,
    body: profile.about.split('\n\n'),
  },
  quote: { text: [profile.heroDescription] },
  doing: projects.map(project => ({
    text: project.title,
    summary: project.summary,
    href: `/projects/${project.slug}/`,
  })),
};
