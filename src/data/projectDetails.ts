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
  repositoryUrl?: string;
}

export const aiAgentRuntimeContent = [
  {
    title: '概要',
    paragraphs: [
      'sunabaは、OpenCodeをプロジェクト専用のApple Container VMで動かす、Apple silicon Mac向けのAIエージェント実行基盤です。',
      'AIエージェントとその実行コマンドには、VM内でシェル、ビルド、テスト、依存関係の導入などを行える自由度を持たせながら、ホスト環境、認証情報、ほかのプロジェクト、外部ネットワークとの境界をホスト側で管理します。',
      'プロンプトインジェクションや悪意のある依存パッケージによってVM内が侵害される可能性を前提に、影響範囲をプロジェクト専用VMへ閉じ込めることを目指して開発しています。',
    ],
  },
  {
    title: '実行環境と分離',
    paragraphs: [
      '1つのプロジェクトにつき1台のAgent VMを作成し、OpenCode serverやシェル、ビルド、テストをVM内で実行します。ホストではOpenCode TUIを起動し、専用の中継経路を通してVM内のserverへ接続します。',
      'ホストの作業ツリーはVMへ直接書き込み可能な状態でマウントしません。承認したProject Snapshotを基準にVM内で編集し、ホストへの意図しない変更や、ほかのプロジェクトへの影響を防ぎます。',
      'VMはプロジェクト単位で保持されるため、セッションを終了した後も編集状態を再利用できます。必要な場合は、承認済みのSnapshotからクリーンな環境を再作成できます。',
    ],
  },
  {
    title: '変更の確認と反映',
    paragraphs: [
      'VMを作成する前にSnapshotのメタデータを確認し、内容に対応するdigestを明示的に承認します。VM内の変更はホストへ直接書き込まず、Change Setとして書き出します。',
      '書き出した変更は、固定された変更前後の内容をホスト側で確認してから適用します。Change Setの生成や検証ではVMが提示する差分を信頼せず、ホスト側でbaselineと成果物を比較します。',
      '途中で処理に失敗した場合も、停止したVMや書き出し済みの成果物を残し、状態を確認して再試行または破棄できる復旧フローを用意しています。',
    ],
  },
  {
    title: '認証情報とネットワークの保護',
    paragraphs: [
      'OpenAIやGitの実際の認証情報はVMへ渡さず、ホスト側のModel GatewayとGit Gatewayを通して必要な操作だけを仲介します。外部リポジトリへのGit pushやホストへのChange Set適用は、ホスト側での明示的な承認が必要です。',
      '既定のsecure modeでは、許可したGateway以外を経由する外向き通信を拒否します。直接インターネット接続が必要な作業にはdev modeを用意し、安全性の違いを理解したうえで明示的に選択する設計としています。',
    ],
    subsections: [
      {
        title: '主な境界機能',
        items: ['Model Gateway', 'Git Gateway', 'Web Gateway', 'セッション単位の権限と有効期限', '利用量とリソースの制限', 'ホスト側の監査ログ'],
      },
    ],
  },
  {
    title: '主な技術',
    items: ['Go', 'Apple Container', 'OpenCode', 'OverlayFS', 'Linux VM', 'macOS'],
  },
] satisfies readonly ProjectSection[];

export const homeServerContent = [
  {
    title: '概要',
    paragraphs: [
      '自宅に複数台のサーバーを設置し、仮想化基盤、コンテナ、ネットワーク、ストレージ、監視、外部公開までを一貫して構築・運用しています。',
      '単なる技術検証環境ではなく、パスワード管理、ファイル共有、メディア配信、ソースコード管理など、日常的に利用するサービスを実際に稼働させています。',
      '自作アプリケーションの開発・検証・公開環境としても活用し、継続運用に必要なインフラ設計や障害対応について学んでいます。OpenTofu、Ansible、Gitea Actionsを利用し、インフラの構築、構成変更、検証をコードから行える環境も整備しています。',
    ],
  },
  {
    title: 'サーバー基盤',
    paragraphs: [
      '仮想化基盤にはProxmox VEを採用し、2台のサーバーによるクラスタ環境を構築しています。',
      '各サービスは、用途や必要なリソースに応じてVM、LXC、Dockerコンテナへ分離しています。障害や設定変更の影響範囲を限定し、保守しやすい構成を目指しています。',
      'Raspberry Pi上ではQDeviceを稼働させています。2台のProxmox VEノードとQDeviceによる3票構成とし、2ノードクラスタでも過半数によるクォーラム判定を行えるようにしています。Raspberry Piはワークロードを実行するノードではなく、クラスタの外部投票デバイスとして利用しています。',
    ],
    subsections: [
      {
        title: '主な基盤技術',
        items: ['Proxmox VE', 'Raspberry Pi', 'QDevice', 'VM', 'LXC', 'Docker', 'Dockge', 'Portainer'],
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
          'ソースコード管理を行うGiteaは独立したLXCで稼働させ、CI処理を実行するGitea Runnerは専用VMへ分離しています。CIジョブの負荷や実行するコードがGitea本体へ与える影響を限定しています。',
        ],
      },
      {
        title: '可用性の確保',
        paragraphs: [
          'CoreDNSとAdGuard Homeは、それぞれ2台のProxmox VEノードに1台ずつ配置しています。片方のノードが停止しても、名前解決を継続できる構成としています。',
          '一方で、CaddyやWireGuardなど一部のサービスは単一構成です。サービスの重要度や必要なリソースに応じて冗長化する範囲を決め、単一障害点を把握したうえで運用しています。',
        ],
      },
      {
        title: '相互監視',
        paragraphs: [
          'Uptime Kumaを各ノードで稼働させ、サーバーやサービスを相互に監視しています。単一の監視サーバーだけに依存せず、監視環境自体の停止も検知できる構成を目指しています。',
        ],
      },
      {
        title: '構成管理',
        paragraphs: [
          '構成情報、IPアドレス、設定内容、運用手順はWikiへ記録しています。DNSとリバースプロキシの基盤は、OpenTofu、Ansible、Gitea Actionsを利用してコードとして管理しています。',
          'ドキュメントとGitの変更履歴を残すことで、障害発生時の確認、構成変更後の振り返り、サービスの再構築を行いやすくしています。',
        ],
      },
    ],
  },
  {
    title: 'DNSとリバースプロキシ',
    paragraphs: [
      'LAN内の名前解決には2台のCoreDNSを使用し、それぞれ異なるProxmox VEノード上のLXCへ配置しています。登録された内部サービスはローカルアドレスへ名前解決し、それ以外の問い合わせはCloudflareのDNS over HTTPSへ転送しています。',
      'DNSフィルタリングを利用する端末向けには、2台のAdGuard Homeを用意しています。AdGuard HomeはCoreDNSを上流DNSとして使用するため、広告やトラッカーのブロックと内部サービスの名前解決を同時に利用できます。',
      'LAN内サービスのHTTPS化にはCaddyを使用しています。Cloudflare DNS-01を利用して証明書を取得し、登録されたサービスを対応する接続先へ転送しています。',
    ],
    subsections: [
      {
        title: '構成のコード管理',
        paragraphs: [
          'OpenTofuでは、CoreDNS 2台、AdGuard Home 2台、Caddy 1台の合計5台のLXCを管理しています。配置するProxmox VEノード、リソース、ストレージ、ネットワーク、自動起動などをコードとして定義し、stateとlockはGiteaで管理しています。',
          'LXC内部の構成にはAnsibleを使用し、各サービスのインストール、設定ファイル、systemdサービスを管理しています。DNSレコードとCaddyのルートは共通のサービス定義から生成し、設定が食い違いにくい構成としています。',
          'AdGuard Homeの初期設定や上流DNSはAnsibleで管理しています。一方、Web UIで設定する広告リストや、統計情報・クエリログなどの実行時データは管理対象外としています。',
        ],
      },
      {
        title: '検証と反映',
        paragraphs: [
          'Gitea Actionsでは、YAML、Ansible、生成されるDNS・Caddy設定、OpenTofuの構文と変更内容を検証しています。mainブランチへの反映後は、変更された範囲に応じてOpenTofuまたはAnsibleを実行します。',
          'CoreDNSとAdGuard Homeは、一度に両方を停止しないよう1台ずつ順番に更新しています。LXCの削除や置換を含む変更は自動適用せず、手動実行で明示的に許可した場合のみ反映できるようにしています。',
          '構成の反映後にはスモークテストを実行し、内部・外部ドメインの名前解決、HTTPSルート、証明書、各サービスの応答を確認しています。',
        ],
      },
      {
        title: 'アクセス経路',
        paragraphs: [
          'リバースプロキシを利用するサービスは、CoreDNSがCaddyのアドレスを返し、Caddyが実際のサービスへ転送します。直接接続するサービスは、CoreDNSがサービス自身のアドレスを返します。',
          'CoreDNSとAdGuard Homeは2台ずつ配置していますが、Caddyは単一構成です。Caddyまたは配置先ノードが停止すると、Caddyを経由するLAN内HTTPSサービスへアクセスできなくなることを把握したうえで運用しています。',
        ],
      },
    ],
  },
  {
    title: 'ネットワークと外部公開',
    paragraphs: [
      '自宅内のサービスへ安全にアクセスするため、VPN、リバースプロキシ、Cloudflare Tunnelなどを用途に応じて使い分けています。',
      '外出先から自宅ネットワークへ接続するため、専用VM上でWireGuardサーバーを運用しています。自宅ネットワーク宛ての通信だけをVPNへ通すスプリットトンネル構成とし、通常のインターネット通信は端末側の回線を利用します。',
      'WireGuard接続時のDNSには自宅で運用するAdGuard Homeを指定しています。外出先から内部サービスを名前で利用でき、DNSフィルタリングも利用できるようにしています。',
      'Webサービスの公開には主にCloudflare Tunnelやリバースプロキシを利用し、自宅サーバーのポートを直接インターネットへ公開する範囲を抑えています。',
      'Minecraftやメールサーバーなど、Cloudflare Tunnelでは対応しにくい通信は、Oracle Cloud Infrastructure上のサーバーと自宅サーバーをVPNで接続し、HAProxy経由で転送しています。',
    ],
    subsections: [
      {
        title: '主なネットワーク技術',
        items: ['WireGuard', 'スプリットトンネル', 'CoreDNS', 'AdGuard Home', 'Caddy', 'Cloudflare Tunnel', 'HAProxy', 'Oracle Cloud Infrastructure'],
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
      'Gitリポジトリの管理には、独立したLXC上で稼働するGiteaを使用しています。CI処理を実行するGitea Runnerは専用VM上で稼働させ、ソースコード管理環境とビルド・実行環境を分離しています。',
      'Proxmox VE上には、アプリケーションの開発と検証に使用する専用VMも用意しています。開発環境を日常利用するサービスから分離し、開発用ツールや依存関係の追加がほかのサービスへ影響しにくい構成としています。',
      '自作アプリケーションだけでなく、自宅サーバーのインフラ構成もGiteaで管理しています。Gitea ActionsからProxmox APIや各LXCへ接続し、構成の検証、反映、動作確認を行っています。',
    ],
    subsections: [
      {
        title: '主な開発関連サービス',
        items: ['Gitea', 'Gitea Runner', 'Gitea Actions', '開発用VM', 'OpenTofu', 'Ansible', 'Docker', 'テスト環境', '本番環境'],
      },
    ],
  },
  {
    title: '運用しているサービス',
    subsections: [
      {
        title: '開発・管理',
        items: ['Gitea', 'Gitea Runner', 'Gitea Actions', 'OpenTofu', 'Ansible', 'CoreDNS', 'AdGuard Home', 'Caddy', 'Dockge', 'Portainer', 'Uptime Kuma', 'Wiki'],
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
      'Proxmox VEクラスタの構築',
      'QDeviceを利用した2ノードクラスタのクォーラム設計',
      'VM、LXC、Dockerの使い分け',
      'Linuxサーバーの構築と管理',
      'ネットワークとDNSの設計',
      'CoreDNSとAdGuard HomeによるDNS基盤の構築',
      'WireGuardとスプリットトンネルによるVPN環境の構築',
      'CaddyとDNS-01によるHTTPS環境の構築',
      'クラウドと自宅環境の接続',
      'サーバーとサービスの死活監視',
      'NASとファイル共有環境の構築',
      'OpenTofuによるProxmox LXCの管理',
      'Ansibleによるサービスの構成管理',
      'Gitea Actionsを利用したインフラCI/CD',
      'ソースコード管理環境とCI実行環境の分離',
      '構成変更後の自動テスト',
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

export const studentHealthSupportContent = [
  {
    title: '概要',
    paragraphs: [
      '起立性調節障害の中高生が、その日の体調に合わせて無理のない一日を組み立てられるよう支援するアプリです。',
      '起立性調節障害では日によって体調が変化しやすく、予定どおりに行動できないことが心理的な負担につながる場合があります。体調が安定していることを前提に予定を立てるのではなく、その日の状態に合わせて過ごし方を調整できることを重視しています。',
      '当事者としての経験をもとに、実際に抱えている困りごとを軽減できるサービスを目指して開発しています。',
    ],
  },
  {
    title: '主な機能',
    paragraphs: [
      'その日の体調を記録し、やりたいことや予定と組み合わせながら、無理のない一日の過ごし方を考えられるようにしています。',
      '日々の体調や行動を振り返ることで、自分の状態や生活の傾向を把握しやすくすることも目指しています。',
    ],
    items: [
      'その日の体調の記録',
      'やりたいことや予定の整理',
      '体調に合わせた一日の組み立て',
      '日々の状態や行動の振り返り',
    ],
  },
  {
    title: '開発構成',
    paragraphs: [
      'iOSアプリとバックエンドを開発しています。iOSアプリはSwiftとSwiftUI、バックエンドはPythonとFastAPIを使用しています。',
      '体調に関する情報を扱うため、使いやすさだけでなく、利用者のデータを適切に扱える構成を意識しながら開発を進めています。',
    ],
  },
  {
    title: '重視していること',
    paragraphs: [
      '予定をすべて達成することを求めるのではなく、その日の体調に合わせて自分のペースを考えられることを重視しています。',
      '体調が悪い日でも、できなかったことだけに注目せず、その日にできたことや過ごし方を振り返れる体験を目指しています。',
    ],
  },
] satisfies readonly ProjectSection[];

export const otherProjectsContent = [
  {
    title: 'プロフィールサイト',
    paragraphs: [
      'プロフィール、興味分野、実績、開発しているプロジェクトを紹介するWebサイトです。Homeでは活動の概要をまとめ、Projectsではプロジェクトの一覧から、それぞれの取り組みや使用技術を紹介する詳細ページへ進めます。',
      'astro-navfolioテーマを使用し、落ち着いたグリーンの配色やレイアウトをプロフィールの内容に合わせて調整しています。PCとスマートフォンの両方で読みやすく、HomeとProjectsを行き来しやすい構成にしています。',
      'Astro、TypeScript、Tailwind CSSで静的サイトとして構築し、GitHub ActionsからGitHub Pagesへデプロイしています。プロフィールやプロジェクトの情報は表示用のデータとして管理し、内容を更新しやすくしています。',
      '日本語の文章にはBudouXを利用し、ビルド時に自然な改行位置を設定しています。ページの表示や移動にクライアント側のJavaScriptを必要とせず、キーボードでも操作できるようにしています。',
    ],
    repositoryUrl: 'https://github.com/Haruka-127/Haruka-127.github.io',
  },
  {
    title: '文化祭用の注文システム',
    paragraphs: [
      '文化祭で飲食ブースの注文を効率化するためのシステムを開発しています。呼び出し画面は、飲食店の注文番号表示を参考にしました。',
      '注文を行うブースで入力した内容が商品提供ブースへ通知され、商品が提供可能になると、モニターページに注文番号が表示されるようになっています。',
    ],
    repositoryUrl: 'https://github.com/Haruka-127/festival-order-system',
  },
  {
    title: 'FAX文書を扱う業務効率化システム',
    paragraphs: [
      'FAXで送られてくる文書をLLMで読み取り、文書種別を判定し\n受注書の場合は過去の注文履歴と照合して内容が適切か判断し\n受注システムへ登録するシステムを開発しています。',
      '現在も継続的に開発を進めています。',
    ],
  },
] satisfies readonly ProjectSection[];
