export interface ProjectSubsection {
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
}

export interface ProjectSection {
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
  subsections?: readonly ProjectSubsection[];
}

export const homeServerContent = [
  {
    title: '概要',
    paragraphs: [
      '自宅に複数台のサーバーを設置し、仮想化基盤、コンテナ、ネットワーク、ストレージ、監視、外部公開までを一貫して構築・運用しています。',
      '単なる技術検証環境ではなく、パスワード管理、ファイル共有、メディア配信、ソースコード管理など、日常的に利用するサービスを実際に稼働させています。',
      '自作アプリケーションの開発・検証・公開環境としても活用し、継続運用に必要なインフラ設計や障害対応について学んでいます。',
    ],
  },
  {
    title: 'サーバー基盤',
    paragraphs: [
      '仮想化基盤にはProxmox VEを採用し、2台のサーバーによるクラスタ環境を構築しています。',
      '各サービスは、用途や必要なリソースに応じてVM、LXC、Dockerコンテナへ分離しています。障害や設定変更の影響範囲を限定し、保守しやすい構成を目指しています。',
    ],
    subsections: [
      {
        title: '主な基盤技術',
        items: ['Proxmox VE', 'VM', 'LXC', 'Docker', 'Dockge', 'Portainer'],
      },
    ],
  },
  {
    title: '設計方針',
    subsections: [
      {
        title: 'サービスの分離',
        paragraphs: [
          'サービスごとにVM、LXC、Dockerコンテナを使い分け、新しいサービスの追加やアップデートが既存環境へ影響しにくい構成としています。',
        ],
      },
      {
        title: '可用性の確保',
        paragraphs: [
          'DNS、VPN、死活監視など、運用に必要な一部のサービスを複数ノードへ配置しています。片方のサーバーが停止しても、ネットワークや監視などの基本機能を継続できるようにしています。',
        ],
      },
      {
        title: '相互監視',
        paragraphs: [
          'Uptime Kumaを各ノードで稼働させ、サーバーやサービスを相互に監視しています。単一の監視サーバーだけに依存せず、監視環境自体の停止も検知できる構成を目指しています。',
        ],
      },
      {
        title: '保守性',
        paragraphs: [
          '構成情報、IPアドレス、設定内容、運用手順はWikiへ記録しています。障害発生時の確認や構成変更後の振り返りを行いやすくし、属人的になりすぎない運用を意識しています。',
        ],
      },
    ],
  },
  {
    title: 'ネットワークと外部公開',
    paragraphs: [
      '自宅内のサービスへ安全にアクセスするため、VPN、リバースプロキシ、Cloudflare Tunnelなどを用途に応じて使い分けています。',
      'Webサービスの公開には主にCloudflare Tunnelやリバースプロキシを利用し、自宅サーバーのポートを直接インターネットへ公開する範囲を抑えています。',
      'Minecraftやメールサーバーなど、Cloudflare Tunnelでは対応しにくい通信は、Oracle Cloud Infrastructure上のサーバーと自宅サーバーをVPNで接続し、HAProxy経由で転送しています。',
    ],
    subsections: [
      {
        title: '主なネットワーク技術',
        items: ['VPN', 'DNS', 'リバースプロキシ', 'Cloudflare Tunnel', 'HAProxy', 'Oracle Cloud Infrastructure'],
      },
    ],
  },
  {
    title: '監視と管理',
    paragraphs: [
      'サーバーやサービスの状態を継続的に把握するため、死活監視やコンテナ管理環境を導入しています。',
      'Uptime KumaでWebサービスやネットワーク機器の稼働状況を監視し、Docker環境はDockgeやPortainerを使って状態確認、設定変更、ログ確認を行っています。',
    ],
    subsections: [
      {
        title: '使用している管理ツール',
        items: ['Uptime Kuma', 'Dockge', 'Portainer', 'Wiki'],
      },
    ],
  },
  {
    title: 'ストレージ環境',
    paragraphs: [
      'ファイル保存用の基盤としてOpenMediaVaultを運用しています。Sambaによるファイル共有を構築し、PCやスマートフォン、自作アプリケーションからデータへアクセスできるようにしています。',
      '保存した動画や音楽は、JellyfinやNavidromeを利用して配信しています。',
    ],
    subsections: [
      {
        title: '主なストレージ関連サービス',
        items: ['OpenMediaVault', 'Samba', 'Jellyfin', 'Navidrome'],
      },
    ],
  },
  {
    title: '開発基盤',
    paragraphs: [
      '自宅サーバー上に、ソースコード管理とアプリケーションのデプロイに利用する開発基盤を構築しています。',
      'Gitリポジトリの管理にはGiteaを使用し、コードの更新に合わせてビルドやデプロイを行えるCI/CD環境も整備しています。自作アプリケーションのテスト環境や本番環境として利用し、公開後の運用まで含めて検証しています。',
    ],
    subsections: [
      {
        title: '主な開発関連サービス',
        items: ['Gitea', 'CI/CD環境', 'Docker', 'テスト環境', '本番環境'],
      },
    ],
  },
  {
    title: '運用しているサービス',
    subsections: [
      {
        title: '開発・管理',
        items: ['Gitea', 'CI/CD環境', 'Dockge', 'Portainer', 'Uptime Kuma', 'Wiki', 'DNS同期サービス'],
      },
      {
        title: '日常利用',
        items: ['Vaultwarden', 'FreshRSS', 'Paperless', 'Dawarich', 'Upsnap', 'Nextcloud', 'ArchiveBox'],
      },
      {
        title: 'メディア・ファイル共有',
        items: ['OpenMediaVault', 'Samba', 'Jellyfin', 'Navidrome'],
      },
      {
        title: '外部向けサービス',
        items: ['Minecraftサーバー', 'mailcow', '自作Webアプリケーション'],
      },
    ],
  },
  {
    title: 'メールサーバー',
    paragraphs: [
      '独自ドメインのメール環境としてmailcowを運用しています。',
      'SMTPなどの通信はOracle Cloud Infrastructure上のサーバーを経由し、VPNとHAProxyを組み合わせて自宅サーバーへ転送しています。',
      '構築と運用を通して、DNS、SMTP、証明書、迷惑メール対策、外部公開など、複数の要素が関係するシステムについて学んでいます。',
    ],
  },
  {
    title: '自宅サーバー運用で得た経験',
    items: [
      '仮想化基盤の構築',
      'VM、LXC、Dockerの使い分け',
      'Linuxサーバーの構築と管理',
      'ネットワークとDNSの設計',
      'VPN環境の構築',
      'リバースプロキシによるサービス公開',
      'クラウドと自宅環境の接続',
      'サーバーとサービスの死活監視',
      'NASとファイル共有環境の構築',
      'GitサーバーとCI/CD環境の運用',
      '障害の切り分けと復旧',
      '構成情報や運用手順のドキュメント化',
    ],
  },
  {
    title: '重視していること',
    paragraphs: [
      'サービスを起動することだけでなく、継続して利用できる状態を維持することを重視しています。',
      '新しい技術を導入する際は、既存サービスへの影響、障害発生時の復旧方法、監視の有無、設定内容の記録まで含めて検討しています。',
      '日常利用するサービスを実際に運用することで、構築時には分からなかった問題を発見し、構成や運用方法を継続的に改善しています。',
    ],
  },
] satisfies readonly ProjectSection[];

export const otherProjectsContent = [
  {
    title: 'FAX文書を扱う業務効率化システム',
    paragraphs: [
      'FAXで送られてくる文書をLLMで読み取り、文書種別を判定し\n受注書の場合は過去の注文履歴と照合して内容が適切か判断し\n受注システムへ登録するシステムを開発しています。',
      '現在も継続的に開発を進めています。',
    ],
  },
  {
    title: '起立性調節障害の中高生を支援するサービス',
    paragraphs: [
      '起立性調節障害の中高生が抱える心理的負担を軽減するためのサービスを開発しています。',
      '当事者として、現在も継続的に開発を進めています。',
    ],
  },
] satisfies readonly ProjectSection[];
