import { type Dictionary, t } from 'intlayer';

const customizationSectionContent = {
  key: 'customization-section-markdown',
  title: 'Markdown Landing Customization Section',
  description:
    'Customization section of the Markdown landing page: components are declared once globally through the provider, then refined per node with the use() method.',
  content: {
    title: t({
      en: 'Set it once, refine it per node',
      'en-GB': 'Set it once, refine it per node',
      fr: 'Défini une fois, affiné par nœud',
      es: 'Defínelo una vez, refínalo por nodo',
      de: 'Einmal setzen, pro Node verfeinern',
      ru: 'Настройте один раз, уточните для узла',
      ja: '一度設定し、ノード単位で微調整',
      ko: '한 번 설정하고 노드별로 다듬기',
      zh: '设置一次，按节点微调',
      ar: 'اضبطه مرة واحدة وحسّنه لكل عقدة',
      it: 'Impostalo una volta, rifiniscilo per nodo',
      pt: 'Configure uma vez, refine por nó',
      hi: 'एक बार सेट करें, नोड-दर-नोड परिष्कृत करें',
      tr: 'Bir kez ayarlayın, düğüm bazında ince ayar yapın',
      pl: 'Ustaw raz, dopracuj na węzeł',
      id: 'Atur sekali, sesuaikan per node',
      vi: 'Đặt một lần, tinh chỉnh theo node',
      uk: 'Налаштуйте один раз, уточніть для вузла',
    }),
    description: t({
      en: 'Declare your components on the provider and every Markdown node in the app picks them up. When one node needs to differ, use() overrides only that node — no plugin chain, no separate build step.',
      'en-GB':
        'Declare your components on the provider and every Markdown node in the app picks them up. When one node needs to differ, use() overrides only that node — no plugin chain, no separate build step.',
      fr: "Déclarez vos composants sur le provider et tous les nœuds Markdown de l'application les reprennent. Quand un nœud doit différer, use() ne surcharge que celui-là : ni chaîne de plugins, ni étape de build supplémentaire.",
      es: 'Declara tus componentes en el provider y todos los nodos Markdown de la app los adoptan. Cuando un nodo necesita ser distinto, use() solo sobrescribe ese nodo: sin cadena de plugins ni paso de build aparte.',
      de: 'Deklarieren Sie Ihre Komponenten am Provider, und jeder Markdown-Node der App übernimmt sie. Soll ein Node abweichen, überschreibt use() genau diesen — ohne Plugin-Kette, ohne separaten Build-Schritt.',
      ru: 'Объявите компоненты в провайдере — их подхватит каждый узел Markdown в приложении. Если один узел должен отличаться, use() переопределит только его: без цепочки плагинов и отдельного шага сборки.',
      ja: 'プロバイダーにコンポーネントを宣言すれば、アプリ内のすべてのMarkdownノードがそれを利用します。特定のノードだけ変えたいときは、use()がそのノードだけを上書きします。プラグインの連鎖も、追加のビルド工程も不要です。',
      ko: '프로바이더에 컴포넌트를 선언하면 앱의 모든 Markdown 노드가 이를 사용합니다. 한 노드만 달라야 한다면 use()가 그 노드만 덮어씁니다. 플러그인 체인도, 별도의 빌드 단계도 없습니다.',
      zh: '在 provider 上声明组件，应用中的每个 Markdown 节点都会采用它们。当某个节点需要不同表现时，use() 只覆盖那一个节点——没有插件链，也没有额外的构建步骤。',
      ar: 'أعلن مكوّناتك على المزوّد فتلتقطها كل عقدة Markdown في التطبيق. وحين تحتاج عقدة إلى اختلاف، تتجاوز use() تلك العقدة وحدها؛ بلا سلسلة إضافات ولا خطوة بناء إضافية.',
      it: 'Dichiara i tuoi componenti sul provider e ogni nodo Markdown dell’app li adotta. Quando un nodo deve differire, use() sovrascrive solo quello: nessuna catena di plugin, nessuno step di build separato.',
      pt: 'Declare seus componentes no provider e todo nó Markdown do app passa a usá-los. Quando um nó precisa ser diferente, use() sobrescreve apenas aquele — sem cadeia de plugins, sem etapa de build separada.',
      hi: 'अपने कंपोनेंट provider पर घोषित करें और ऐप का हर Markdown नोड उन्हें अपना लेता है। जब किसी एक नोड को अलग होना हो, use() सिर्फ़ उसी नोड को ओवरराइड करता है — न प्लगइन चेन, न अलग बिल्ड चरण।',
      tr: 'Bileşenlerinizi sağlayıcıda tanımlayın; uygulamadaki her Markdown düğümü onları kullanır. Bir düğümün farklı olması gerektiğinde use() yalnızca o düğümü geçersiz kılar; eklenti zinciri de ayrı bir derleme adımı da yok.',
      pl: 'Zadeklaruj komponenty w providerze, a każdy węzeł Markdown w aplikacji je przejmie. Gdy jeden węzeł ma być inny, use() nadpisuje tylko jego — bez łańcucha wtyczek i bez osobnego kroku budowania.',
      id: 'Deklarasikan komponen Anda pada provider dan setiap node Markdown di aplikasi akan memakainya. Saat satu node perlu berbeda, use() hanya menimpa node itu — tanpa rantai plugin, tanpa langkah build terpisah.',
      vi: 'Khai báo các thành phần trên provider và mọi node Markdown trong ứng dụng đều dùng chúng. Khi một node cần khác đi, use() chỉ ghi đè node đó — không chuỗi plugin, không bước build riêng.',
      uk: 'Оголосіть компоненти в провайдері — і кожен вузол Markdown у застосунку їх підхопить. Коли один вузол має відрізнятися, use() перевизначає лише його: без ланцюжка плагінів і без окремого кроку збірки.',
    }),
    global: {
      title: t({
        en: 'Global, for the whole app',
        'en-GB': 'Global, for the whole app',
        fr: "Global, pour toute l'application",
        es: 'Global, para toda la app',
        de: 'Global, für die gesamte App',
        ru: 'Глобально — для всего приложения',
        ja: 'アプリ全体に適用',
        ko: '앱 전체에 적용',
        zh: '全局，作用于整个应用',
        ar: 'عالمي، لكامل التطبيق',
        it: 'Globale, per tutta l’app',
        pt: 'Global, para todo o app',
        hi: 'वैश्विक, पूरे ऐप के लिए',
        tr: 'Küresel, tüm uygulama için',
        pl: 'Globalnie, dla całej aplikacji',
        id: 'Global, untuk seluruh aplikasi',
        vi: 'Toàn cục, cho cả ứng dụng',
        uk: 'Глобально — для всього застосунку',
      }),
      codeBlockTitle: 'AppProvider.tsx',
      code: `import { MarkdownProvider } from 'react-intlayer/markdown';

export const AppProvider = ({ children }) => (
  <MarkdownProvider
    components={{
      h1: ({ children }) => <h1 className="text-3xl">{children}</h1>,
      MyButton: (props) => <button {...props} />, // MDX component
    }}
  >
    {children}
  </MarkdownProvider>
);`,
    },
    local: {
      title: t({
        en: 'Local, for one node',
        'en-GB': 'Local, for one node',
        fr: 'Local, pour un seul nœud',
        es: 'Local, para un solo nodo',
        de: 'Lokal, für einen Node',
        ru: 'Локально — для одного узла',
        ja: '個別のノードに適用',
        ko: '개별 노드에 적용',
        zh: '局部，作用于单个节点',
        ar: 'محلي، لعقدة واحدة',
        it: 'Locale, per un singolo nodo',
        pt: 'Local, para um nó',
        hi: 'स्थानीय, एक नोड के लिए',
        tr: 'Yerel, tek bir düğüm için',
        pl: 'Lokalnie, dla jednego węzła',
        id: 'Lokal, untuk satu node',
        vi: 'Cục bộ, cho một node',
        uk: 'Локально — для одного вузла',
      }),
      codeBlockTitle: 'Article.tsx',
      code: `import { useIntlayer } from 'react-intlayer';

const Article = () => {
  const { body } = useIntlayer('article');

  // Overrides the provider, for this node only
  return body.use({
    h1: ({ children }) => <h1 className="text-primary">{children}</h1>,
  });
};`,
    },
    footnote: t({
      en: 'use() wins over the provider, the provider wins over the default renderer.',
      'en-GB':
        'use() wins over the provider, the provider wins over the default renderer.',
      fr: 'use() prime sur le provider, qui prime sur le moteur par défaut.',
      es: 'use() prevalece sobre el provider, que prevalece sobre el renderizador por defecto.',
      de: 'use() schlägt den Provider, der Provider schlägt den Standard-Renderer.',
      ru: 'use() важнее провайдера, провайдер важнее рендерера по умолчанию.',
      ja: 'use()はプロバイダーより優先され、プロバイダーは既定のレンダラーより優先されます。',
      ko: 'use()는 프로바이더보다, 프로바이더는 기본 렌더러보다 우선합니다.',
      zh: 'use() 优先于 provider，provider 优先于默认渲染器。',
      ar: 'تتقدم use() على المزوّد، ويتقدم المزوّد على محرك العرض الافتراضي.',
      it: 'use() prevale sul provider, che prevale sul renderer predefinito.',
      pt: 'use() vence o provider, que vence o renderizador padrão.',
      hi: 'use() provider पर भारी पड़ता है, और provider डिफ़ॉल्ट रेंडरर पर।',
      tr: "use(), sağlayıcıyı; sağlayıcı da varsayılan renderer'ı geçersiz kılar.",
      pl: 'use() ma pierwszeństwo przed providerem, a provider przed domyślnym rendererem.',
      id: 'use() mengalahkan provider, dan provider mengalahkan renderer bawaan.',
      vi: 'use() thắng provider, provider thắng trình kết xuất mặc định.',
      uk: 'use() має пріоритет над провайдером, а провайдер — над типовим рендерером.',
    }),
  },
} satisfies Dictionary;

export default customizationSectionContent;
