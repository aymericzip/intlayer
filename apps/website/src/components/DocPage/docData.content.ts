import {
  type DocKey,
  getDocMetadata as getDocMetadataCore,
} from '@intlayer/docs';
import { type Dictionary, localeRecord, t } from 'intlayer';

const getDocMetadata = (doc: DocKey) =>
  t(localeRecord(async ({ locale }) => await getDocMetadataCore(doc, locale)));

const docDataContent: Dictionary = {
  key: 'doc-data',
  fill: false,
  content: {
    'api-reference': {
      subSections: {
        cli: {
          default: getDocMetadata('./docs/en/cli/index.md'),
          subSections: {
            build: {
              default: getDocMetadata('./docs/en/cli/build.md'),
              title: 'Build',
            },
            configuration: {
              default: getDocMetadata('./docs/en/cli/configuration.md'),
              title: 'Configuration',
            },
            debug: {
              default: getDocMetadata('./docs/en/cli/debug.md'),
              title: 'Debug',
            },
            'doc-review': {
              default: getDocMetadata('./docs/en/cli/doc-review.md'),
              title: 'Doc Review',
            },
            'doc-translate': {
              default: getDocMetadata('./docs/en/cli/doc-translate.md'),
              title: 'Doc Translate',
            },
            editor: {
              default: getDocMetadata('./docs/en/cli/editor.md'),
              title: 'Editor',
            },
            extract: {
              default: getDocMetadata('./docs/en/cli/extract.md'),
              title: 'Extract',
            },
            fill: {
              default: getDocMetadata('./docs/en/cli/fill.md'),
              title: 'Fill',
            },
            infra: {
              default: getDocMetadata('./docs/en/cli/infra.md'),
              title: 'Infra',
            },
            list: {
              default: getDocMetadata('./docs/en/cli/list.md'),
              title: 'List',
            },
            live: {
              default: getDocMetadata('./docs/en/cli/live.md'),
              title: 'Live',
            },
            login: {
              default: getDocMetadata('./docs/en/cli/login.md'),
              title: 'Login',
            },
            pull: {
              default: getDocMetadata('./docs/en/cli/pull.md'),
              title: 'Pull',
            },
            push: {
              default: getDocMetadata('./docs/en/cli/push.md'),
              title: 'Push',
            },
            scan: {
              default: getDocMetadata('./docs/en/cli/scan.md'),
              title: 'Scan',
            },
            sdk: {
              default: getDocMetadata('./docs/en/cli/sdk.md'),
              title: 'SDK',
            },
            test: {
              default: getDocMetadata('./docs/en/cli/test.md'),
              title: 'Test',
            },
            upgrade: {
              default: getDocMetadata('./docs/en/cli/upgrade.md'),
              title: 'Upgrade',
            },
            version: {
              default: getDocMetadata('./docs/en/cli/version.md'),
              title: 'Version',
            },
            watch: {
              default: getDocMetadata('./docs/en/cli/watch.md'),
              title: 'Watch',
            },
          },
          title: 'CLI',
        },
        configuration: {
          default: getDocMetadata('./docs/en/configuration.md'),
          title: t({
            en: 'Configuration',
            ar: 'التكوين',
            de: 'Konfiguration',
            'en-GB': 'Configuration',
            es: 'Configuración',
            fr: 'Configuration',
            'he-IL': 'תצורה',
            hi: 'कॉन्फ़िगरेशन',
            id: 'Konfigurasi',
            it: 'Configurazione',
            ja: '設定',
            ko: '구성',
            pl: 'Konfiguracja',
            pt: 'Configuração',
            ru: 'Конфигурация',
            tr: 'Yapılandırma',
            uk: 'Конфігурація',
            vi: 'Cấu hình',
            zh: '配置',
          }),
        },
        'content-functions': {
          subSections: {
            condition: {
              default: getDocMetadata('./docs/en/dictionary/condition.md'),
              title: t({
                en: 'Condition',
                ar: 'شرط',
                de: 'Bedingung',
                'en-GB': 'Condition',
                es: 'Condición',
                fr: 'Condition',
                'he-IL': 'תנאי',
                hi: 'शर्त',
                id: 'Kondisi',
                it: 'Condizione',
                ja: '条件',
                ko: '조건',
                pl: 'Warunek',
                pt: 'Condição',
                ru: 'Условие',
                tr: 'Koşul',
                uk: 'Умова',
                vi: 'Điều kiện',
                zh: '条件',
              }),
            },
            enumeration: {
              default: getDocMetadata('./docs/en/dictionary/enumeration.md'),
              title: t({
                en: 'Enumeration',
                ar: 'تعداد',
                de: 'Aufzählung',
                'en-GB': 'Enumeration',
                es: 'Enumeración',
                fr: 'Énumération',
                'he-IL': 'מנייה',
                hi: 'गणना',
                id: 'Penumeraan',
                it: 'Enumerazione',
                ja: '列挙',
                ko: '열거',
                pl: 'Wyliczenie',
                pt: 'Enumeração',
                ru: 'Перечисление',
                tr: 'Numaralandırma',
                uk: 'Перелік',
                vi: 'Liệt kê',
                zh: '枚举',
              }),
            },
            file: {
              default: getDocMetadata('./docs/en/dictionary/file.md'),
              title: t({
                en: 'File',
                ar: 'ملف',
                de: 'Datei',
                'en-GB': 'File',
                es: 'Archivo',
                fr: 'Fichier',
                'he-IL': 'קובץ',
                hi: 'फ़ाइल',
                id: 'Berkas',
                it: 'File',
                ja: 'ファイル',
                ko: '파일',
                pl: 'Plik',
                pt: 'Arquivo',
                ru: 'Файл',
                tr: 'Dosya',
                uk: 'Файл',
                vi: 'Tệp',
                zh: '文件',
              }),
            },
            'function-fetching': {
              default: getDocMetadata(
                './docs/en/dictionary/function_fetching.md'
              ),
              title: t({
                en: 'Function Fetching',
                ar: 'جلب الوظيفة',
                de: 'Funktionsabruf',
                'en-GB': 'Function Fetching',
                es: 'Obtención de función',
                fr: 'Récupération de fonction',
                'he-IL': 'שליפה באמצעות פונקציה',
                hi: 'फ़ंक्शन फेचिंग',
                id: 'Pengambilan fungsi',
                it: 'Recupero funzione',
                ja: '関数取得',
                ko: '함수 가져오기',
                pl: 'Pobieranie funkcji',
                pt: 'Busca de função',
                ru: 'Получение функции',
                tr: 'Fonksiyon Getirme',
                uk: 'Отримання функції',
                vi: 'Lấy hàm',
                zh: '函数获取',
              }),
            },
            gender: {
              default: getDocMetadata('./docs/en/dictionary/gender.md'),
              title: t({
                en: 'Gender',
                ar: 'جنس',
                de: 'Geschlecht',
                'en-GB': 'Gender',
                es: 'Género',
                fr: 'Genre',
                'he-IL': 'מגדר',
                hi: 'लिंग',
                id: 'Jenis kelamin',
                it: 'Genere',
                ja: '性別',
                ko: '성별',
                pl: 'Płeć',
                pt: 'Gênero',
                ru: 'Пол',
                tr: 'Cinsiyet',
                uk: 'Рід',
                vi: 'Giới tính',
                zh: '性别',
              }),
            },

            html: {
              default: getDocMetadata('./docs/en/dictionary/html.md'),
              title: 'HTML',
            },
            insertion: {
              default: getDocMetadata('./docs/en/dictionary/insertion.md'),
              title: t({
                en: 'Insertion',
                ar: 'إدراج',
                de: 'Einfügung',
                'en-GB': 'Insertion',
                es: 'Inserción',
                fr: 'Insertion',
                'he-IL': 'הוספה',
                hi: 'सम्मिलन',
                id: 'Penambahan',
                it: 'Inserimento',
                ja: '挿入',
                ko: '삽입',
                pl: 'Wstawienie',
                pt: 'Inserção',
                ru: 'Вставка',
                tr: 'Ekleme',
                uk: 'Вставка',
                vi: 'Chèn',
                zh: '插入',
              }),
            },
            markdown: {
              default: getDocMetadata('./docs/en/dictionary/markdown.md'),
              title: 'Markdown',
            },
            nesting: {
              default: getDocMetadata('./docs/en/dictionary/nesting.md'),
              title: t({
                en: 'Nesting',
                ar: 'تداخل',
                de: 'Verschachtelung',
                'en-GB': 'Nesting',
                es: 'Anidación',
                fr: 'Imbrication',
                'he-IL': 'קינון',
                hi: 'नेस्टिंग',
                id: 'Nesting',
                it: 'Annidamento',
                ja: 'ネスティング',
                ko: '중첩',
                pl: 'Zagnieżdżanie',
                pt: 'Aninhamento',
                ru: 'Вложенность',
                tr: 'İç İçe Geçme',
                uk: 'Вкладеність',
                vi: 'Nesting',
                zh: '嵌套',
              }),
            },
            plural: {
              default: getDocMetadata('./docs/en/dictionary/plurial.md'),
              title: t({
                en: 'Plural',
                ar: 'جمع',
                de: 'Plural',
                'en-GB': 'Plural',
                es: 'Plural',
                fr: 'Pluriel',
                'he-IL': 'רבים',
                hi: 'बहुवचन',
                id: 'Plural',
                it: 'Plurale',
                ja: '複数形',
                ko: '복수형',
                pl: 'Liczba mnoga',
                pt: 'Plural',
                ru: 'Множественное число',
                tr: 'Çoğul',
                uk: 'Множина',
                vi: 'Số nhiều',
                zh: '复数',
              }),
            },
            select: {
              default: getDocMetadata('./docs/en/dictionary/select.md'),
              title: t({
                en: 'Select',
                ar: 'اختيار',
                de: 'Auswahl',
                'en-GB': 'Select',
                es: 'Selección',
                fr: 'Sélection',
                'he-IL': 'בחירה',
                hi: 'चयन',
                id: 'Pilihan',
                it: 'Selezione',
                ja: '選択',
                ko: '선택',
                pl: 'Wybór',
                pt: 'Seleção',
                ru: 'Выбор',
                tr: 'Seçim',
                uk: 'Вибір',
                vi: 'Lựa chọn',
                zh: '选择',
              }),
            },
            translation: {
              default: getDocMetadata('./docs/en/dictionary/translation.md'),
              title: t({
                en: 'Translation',
                ar: 'ترجمة',
                de: 'Übersetzung',
                'en-GB': 'Translation',
                es: 'Traducción',
                fr: 'Traduction',
                'he-IL': 'תרגום',
                hi: 'अनुवाद',
                id: 'Terjemahan',
                it: 'Traduzione',
                ja: '翻訳',
                ko: '번역',
                pl: 'Tłumaczenie',
                pt: 'Tradução',
                ru: 'Перевод',
                tr: 'Çeviri',
                uk: 'Переклад',
                vi: 'Dịch',
                zh: '翻译',
              }),
            },
          },
          title: t({
            en: 'Content Functions',
            ar: 'دوال المحتوى',
            de: 'Inhaltsfunktionen',
            'en-GB': 'Content Functions',
            es: 'Funciones de contenido',
            fr: 'Fonctions de contenu',
            'he-IL': 'פונקציות תוכן',
            hi: 'सामग्री फ़ंक्शन',
            id: 'Fungsi konten',
            it: 'Funzioni di contenuto',
            ja: 'コンテンツ関数',
            ko: '콘텐츠 함수',
            pl: 'Funkcje zawartości',
            pt: 'Funções de conteúdo',
            ru: 'Функции контента',
            tr: 'İçerik Fonksiyonları',
            uk: 'Функції контенту',
            vi: 'Hàm nội dung',
            zh: '内容函数',
          }),
        },
        formatters: {
          default: getDocMetadata('./docs/en/formatters.md'),
          title: t({
            en: 'Formatters',
            ar: 'المنسقات',
            de: 'Formatierer',
            'en-GB': 'Formatters',
            es: 'Formateadores',
            fr: 'Formateurs',
            'he-IL': 'מעצבים (Formatters)',
            hi: 'फ़ॉर्मैटर',
            id: 'Pemformat',
            it: 'Formattatori',
            ja: 'フォーマッター',
            ko: '포매터',
            pl: 'Formatery',
            pt: 'Formatadores',
            ru: 'Форматтеры',
            tr: 'Biçimlendiriciler',
            uk: 'Форматувальники',
            vi: 'Bộ định dạng',
            zh: '格式化器',
          }),
        },
      },
      title: t({
        en: 'API Reference',
        ar: 'مرجع API',
        de: 'API-Referenz',
        'en-GB': 'API Reference',
        es: 'Referencia de API',
        fr: 'Référence API',
        'he-IL': 'תיעוד API',
        hi: 'API संदर्भ',
        id: 'Referensi API',
        it: 'Riferimento API',
        ja: 'APIリファレンス',
        ko: 'API 레퍼런스',
        pl: 'Dokumentacja API',
        pt: 'Referência da API',
        ru: 'Справочник API',
        tr: 'API Referansı',
        uk: 'Довідник API',
        vi: 'Tham chiếu API',
        zh: 'API 参考',
      }),
    },
    benchmark: {
      default: getDocMetadata('./docs/en/benchmark/index.md'),
      subSections: {
        nextjs: {
          default: getDocMetadata('./docs/en/benchmark/nextjs.md'),
          frameworks: ['nextjs', 'react'],
          title: 'Next.js',
        },
        solid: {
          default: getDocMetadata('./docs/en/benchmark/solid.md'),
          frameworks: ['solid'],
          title: 'Solid',
        },
        svelte: {
          default: getDocMetadata('./docs/en/benchmark/svelte.md'),
          frameworks: ['svelte'],
          title: 'Svelte',
        },
        tanstack: {
          default: getDocMetadata('./docs/en/benchmark/tanstack.md'),
          frameworks: ['tanstack', 'react'],
          title: 'TanStack',
        },
        vue: {
          default: getDocMetadata('./docs/en/benchmark/vue.md'),
          frameworks: ['vue'],
          title: 'Vue',
        },
      },
      title: t({
        en: 'Benchmark',
        ar: 'مؤشر أداء',
        de: 'Benchmark',
        'en-GB': 'Benchmark',
        es: 'Benchmark',
        fr: 'Benchmark',
        'he-IL': "בנצ'מרק",
        hi: 'बेंचमार्क',
        id: 'Benchmark',
        it: 'Benchmark',
        ja: 'ベンチマーク',
        ko: '벤치마크',
        pl: 'Benchmark',
        pt: 'Benchmark',
        ru: 'Бенчмарк',
        tr: 'Karşılaştırma',
        uk: 'Бенчмарк',
        vi: 'Benchmark',
        zh: '基准测试',
      }),
    },
    concept: {
      subSections: {
        bundle_optimization: {
          default: getDocMetadata('./docs/en/bundle_optimization.md'),
          title: t({
            en: 'Bundle Optimization',
            ar: 'تحسين الحزمة',
            de: 'Bundle-Optimierung',
            'en-GB': 'Bundle Optimization',
            es: 'Optimización de bundle',
            fr: 'Optimisation de bundle',
            'he-IL': 'אופטימיזציית Bundle',
            hi: 'बंडल ऑप्टिमाइज़ेशन',
            id: 'Optimasi paket',
            it: 'Ottimizzazione del bundle',
            ja: 'バンドル最適化',
            ko: '번들 최적화',
            pl: 'Optymalizacja pakietu',
            pt: 'Otimização de bundle',
            ru: 'Оптимизация пакета',
            tr: 'Paket Optimizasyonu',
            uk: 'Оптимізація пакета',
            vi: 'Tối ưu hóa gói',
            zh: '打包优化',
          }),
        },
        compiler: {
          default: getDocMetadata('./docs/en/compiler.md'),
          title: t({
            en: 'Compiler',
            ar: 'محرر',
            de: 'Compiler',
            'en-GB': 'Compiler',
            es: 'Compilador',
            fr: 'Compilateur',
            'he-IL': 'קומפיילר',
            hi: 'कंपाइलर',
            id: 'Kompilator',
            it: 'Compilatore',
            ja: 'コンパイラー',
            ko: '컴파일러',
            pl: 'Kompilator',
            pt: 'Compilador',
            ru: 'Компилятор',
            tr: 'Derleyici',
            uk: 'Компілятор',
            vi: 'Biên dịch',
            zh: '编译器',
          }),
        },
        content: {
          default: getDocMetadata('./docs/en/dictionary/content_file.md'),
          subSections: {
            'dynamic-dyctionary': {
              default: getDocMetadata(
                './docs/en/dynamic_dictionaries/index.md'
              ),
              subSections: {
                collections: {
                  default: getDocMetadata(
                    './docs/en/dynamic_dictionaries/collections.md'
                  ),
                  title: t({
                    en: 'Collections',
                    ar: 'المجموعات',
                    de: 'Sammlungen',
                    'en-GB': 'Collections',
                    es: 'Colecciones',
                    fr: 'Collections',
                    'he-IL': 'אוספים',
                    hi: 'संग्रह',
                    id: 'Koleksi',
                    it: 'Collezioni',
                    ja: 'コレクション',
                    ko: '컬렉션',
                    pl: 'Kolekcje',
                    pt: 'Coleções',
                    ru: 'Коллекции',
                    tr: 'Koleksiyonlar',
                    uk: 'Колекції',
                    vi: 'Bộ sưu tập',
                    zh: '集合',
                  }),
                },
                variants: {
                  default: getDocMetadata(
                    './docs/en/dynamic_dictionaries/variants.md'
                  ),
                  title: t({
                    en: 'Variants',
                    ar: 'المتغيرات',
                    de: 'Varianten',
                    'en-GB': 'Variants',
                    es: 'Variantes',
                    fr: 'Variantes',
                    'he-IL': 'גרסאות',
                    hi: 'वेरिएंट',
                    id: 'Varian',
                    it: 'Varianti',
                    ja: 'バリアント',
                    ko: '변형',
                    pl: 'Warianty',
                    pt: 'Variantes',
                    ru: 'Варианты',
                    tr: 'Varyantlar',
                    uk: 'Варіанти',
                    vi: 'Biến thể',
                    zh: '变体',
                  }),
                },
              },
              title: t({
                en: 'Dynamic Dictionary',
                ar: 'ملف لكل لغة',
                de: 'Datei pro Locale',
                'en-GB': 'Dynamic Dictionary',
                es: 'Archivo por locale',
                fr: 'Fichier par locale',
                'he-IL': 'מילון דינמי',
                hi: 'प्रति लोकेल फ़ाइल',
                id: 'File untuk setiap lokal',
                it: 'File per locale',
                ja: 'ロケールごとのファイル',
                ko: '로케일별 파일',
                pl: 'Plik dla każdej lokalizacji',
                pt: 'Arquivo por locale',
                ru: 'Файл для каждой локали',
                tr: 'Yerel Dosya',
                uk: 'Файл для кожної локалі',
                vi: 'File cho mỗi ngôn ngữ',
                zh: '每个语言环境的文件',
              }),
            },
            'per-locale-file': {
              default: getDocMetadata('./docs/en/per_locale_file.md'),
              title: t({
                en: 'Per Locale File',
                ar: 'ملف لكل لغة',
                de: 'Datei pro Locale',
                'en-GB': 'Per Locale File',
                es: 'Archivo por locale',
                fr: 'Fichier par locale',
                'he-IL': 'קובץ לכל שפה',
                hi: 'प्रति लोकेल फ़ाइल',
                id: 'File untuk setiap lokal',
                it: 'File per locale',
                ja: 'ロケールごとのファイル',
                ko: '로케일별 파일',
                pl: 'Plik dla każdej lokalizacji',
                pt: 'Arquivo por locale',
                ru: 'Файл для каждой локали',
                tr: 'Yerel Dosya',
                uk: 'Файл для кожної локалі',
                vi: 'File cho mỗi ngôn ngữ',
                zh: '每个语言环境的文件',
              }),
            },
          },
          title: t({
            en: 'Content Declaration',
            ar: 'إعلان المحتوى',
            de: 'Inhaltsdeklaration',
            'en-GB': 'Content Declaration',
            es: 'Declaración de contenido',
            fr: 'Déclaration de contenu',
            'he-IL': 'הצהרת תוכן',
            hi: 'सामग्री घोषणा',
            id: 'Deklarasi konten',
            it: 'Dichiarazione dei contenuti',
            ja: 'コンテンツ宣言',
            ko: '콘텐츠 선언',
            pl: 'Deklaracja zawartości',
            pt: 'Declaração de conteúdo',
            ru: 'Объявление контента',
            tr: 'İçerik Beyanı',
            uk: 'Оголошення контенту',
            vi: 'Khai báo nội dung',
            zh: '内容声明',
          }),
        },
        'how-works-intlayer': {
          default: getDocMetadata('./docs/en/how_works_intlayer.md'),
          title: t({
            en: 'How Intlayer Works',
            ar: 'كيف يعمل Intlayer',
            de: 'Wie Intlayer funktioniert',
            'en-GB': 'How Intlayer Works',
            es: 'Cómo funciona Intlayer',
            fr: 'Comment Intlayer fonctionne',
            'he-IL': 'איך Intlayer עובדת',
            hi: 'Intlayer कैसे काम करता है',
            id: 'Bagaimana Intlayer bekerja',
            it: 'Come funziona Intlayer',
            ja: 'Intlayerの仕組み',
            ko: 'Intlayer 작동 방식',
            pl: 'Jak działa Intlayer',
            pt: 'Como o Intlayer funciona',
            ru: 'Как работает Intlayer',
            tr: 'Intlayer Nasıl Çalışır',
            uk: 'Як працює Intlayer',
            vi: 'Intlayer làm việc như thế nào',
            zh: 'Intlayer如何工作',
          }),
        },
        routing: {
          subSections: {
            custom_url_rewrites: {
              default: getDocMetadata('./docs/en/custom_url_rewrites.md'),
              title: t({
                en: 'Custom URL Rewrites',
                ar: 'إعادة كتابة URL مخصصة',
                de: 'Benutzerdefinierte URL-Rewrites',
                'en-GB': 'Custom URL Rewrites',
                es: 'Reescrituras de URL personalizadas',
                fr: "Réécritures d'URL personnalisées",
                'he-IL': 'שכתובי URL מותאמים',
                hi: 'कस्टम URL रीराइट',
                id: 'Penulisan Ulang URL Kustom',
                it: 'Riscritture URL personalizzate',
                ja: 'カスタムURLリライト',
                ko: '사용자 정의 URL 리라이트',
                pl: 'Niestandardowe przepisywanie adresów URL',
                pt: 'Reescritas de URL personalizadas',
                ru: 'Пользовательские правила перезаписи URL',
                tr: 'Özel URL Yeniden Yazımları',
                uk: 'Спеціальні перетворення URL-адрес',
                vi: 'Viết lại URL tùy chỉnh',
                zh: '自定义 URL 重写',
              }),
            },
            'domains-i18n': {
              default: getDocMetadata('./docs/en/custom_domains.md'),
              title: t({
                en: 'Domains i18n',
                ar: 'تدويل النطاقات',
                de: 'Domänen i18n',
                'en-GB': 'Domains i18n',
                es: 'Dominios i18n',
                fr: 'Domaines i18n',
                'he-IL': 'דומיינים ב-i18n',
                hi: 'डोमेन i18n',
                id: 'Domain i18n',
                it: 'Domini i18n',
                ja: 'ドメイン i18n',
                ko: '도메인 i18n',
                pl: 'Domeny i18n',
                pt: 'Domínios i18n',
                ru: 'Домены i18n',
                tr: 'Alan Adları i18n',
                uk: 'Домени i18n',
                vi: 'Tên miền i18n',
                zh: '域名 i18n',
              }),
            },
          },
          title: t({
            en: 'Routing',
            ar: 'التوجيه',
            de: 'Routing',
            'en-GB': 'Routing',
            es: 'Enrutamiento',
            fr: 'Routage',
            'he-IL': 'ניתוב',
            hi: 'रूटिंग',
            id: 'Routing',
            it: 'Routing',
            ja: 'ルーティング',
            ko: '라우팅',
            pl: 'Routing',
            pt: 'Roteamento',
            ru: 'Маршрутизация',
            tr: 'Yönlendirme',
            uk: 'Маршрутизація',
            vi: 'Định tuyến',
            zh: '路由',
          }),
        },
      },
      title: t({
        en: 'Concept',
        ar: 'مفهوم',
        de: 'Konzept',
        'en-GB': 'Concept',
        es: 'Concepto',
        fr: 'Concept',
        'he-IL': 'מושג',
        hi: 'अवधारणा',
        id: 'Konsep',
        it: 'Concetto',
        ja: 'コンセプト',
        ko: '개념',
        pl: 'Koncepcja',
        pt: 'Conceito',
        ru: 'Концепция',
        tr: 'Kavram',
        uk: 'Концепція',
        vi: 'Khái niệm',
        zh: '概念',
      }),
    },
    'dev-tools': {
      subSections: {
        'agent-skills': {
          default: getDocMetadata('./docs/en/agent_skills.md'),
          title: 'Agent skills',
        },
        'chrome-extension': {
          default: getDocMetadata('./docs/en/chrome_extension.md'),
          title: t({
            en: 'Chrome & Firefox Extension',
            ar: 'إضافة Chrome و Firefox',
            de: 'Chrome- & Firefox-Erweiterung',
            'en-GB': 'Chrome & Firefox Extension',
            es: 'Extensión de Chrome y Firefox',
            fr: 'Extension Chrome & Firefox',
            'he-IL': 'תוסף Chrome ו-Firefox',
            hi: 'Chrome और Firefox एक्सटेंशन',
            id: 'Ekstensi Chrome & Firefox',
            it: 'Estensione Chrome & Firefox',
            ja: 'Chrome & Firefox拡張機能',
            ko: 'Chrome & Firefox 확장 프로그램',
            pl: 'Rozszerzenie Chrome i Firefox',
            pt: 'Extensão do Chrome e Firefox',
            ru: 'Расширение Chrome и Firefox',
            tr: 'Chrome ve Firefox Uzantısı',
            uk: 'Розширення Chrome і Firefox',
            vi: 'Tiện ích Chrome & Firefox',
            zh: 'Chrome与Firefox扩展',
          }),
        },
        eslint: {
          default: getDocMetadata('./docs/en/eslint.md'),
          title: 'ESLint / OXLint',
        },
        lsp: {
          default: getDocMetadata('./docs/en/lsp.md'),
          title: 'Language Server Protocol',
        },
        'mcp-server': {
          default: getDocMetadata('./docs/en/mcp_server.md'),
          title: t({
            en: 'MCP Server',
            ar: 'خادم MCP',
            de: 'MCP-Server',
            'en-GB': 'MCP Server',
            es: 'Servidor MCP',
            fr: 'Serveur MCP',
            'he-IL': 'שרת MCP',
            hi: 'इंटलेयर MCP सर्वर',
            id: 'Server MCP',
            it: 'Server MCP',
            ja: 'MCPサーバー',
            ko: 'MCP 서버',
            pl: 'Serwer MCP',
            pt: 'Servidor MCP',
            ru: 'Сервер MCP',
            tr: 'MCP Sunucusu',
            uk: 'Сервер MCP',
            vi: 'MCP Server',
            zh: 'MCP服务器',
          }),
        },
        prettier: {
          default: getDocMetadata('./docs/en/prettier.md'),
          title: 'Prettier',
        },
        'vs-code-extension': {
          default: getDocMetadata('./docs/en/vs_code_extension.md'),
          title: t({
            en: 'VS Code Extension',
            ar: 'امتداد VS Code',
            de: 'VS Code-Erweiterung',
            'en-GB': 'VS Code Extension',
            es: 'Extensión VS Code',
            fr: 'Extension VS Code',
            'he-IL': 'תוסף VS Code',
            hi: 'VS Code एक्सटेंशन',
            id: 'Ekstensi VS Code',
            it: 'Estensione VS Code',
            ja: 'VS Code拡張機能',
            ko: 'VS Code 확장 기능',
            pl: 'Rozszerzenie VS Code',
            pt: 'Extensão VS Code',
            ru: 'Расширение VS Code',
            tr: 'VS Code Uzantısı',
            uk: 'Розширення VS Code',
            vi: 'Mở rộng VS Code',
            zh: 'VS Code扩展',
          }),
        },
      },
      title: t({
        en: 'Dev tools',
        ar: 'أدوات المطور',
        de: 'Entwicklertools',
        'en-GB': 'Dev tools',
        es: 'Herramientas de desarrollo',
        fr: 'Outils de développement',
        'he-IL': 'כלי פיתוח',
        hi: 'डेवलपर टूल्स',
        id: 'Alat pengembang',
        it: 'Strumenti per sviluppatori',
        ja: '開発ツール',
        ko: '개발자 도구',
        pl: 'Narzędzia deweloperskie',
        pt: 'Ferramentas de desenvolvedor',
        ru: 'Инструменты разработчика',
        tr: 'Geliştirici araçları',
        uk: 'Інструменти розробника',
        vi: 'Công cụ phát triển',
        zh: '开发者工具',
      }),
    },
    ecosystem: {
      subSections: {
        adapters: {
          default: getDocMetadata('./docs/en/compat/index.md'),
          deployed: false,
          subSections: {
            i18next: {
              default: getDocMetadata('./docs/en/compat/i18next.md'),
              frameworks: ['vanilla'],
              title: 'i18next',
            },
            lingui: {
              default: getDocMetadata('./docs/en/compat/lingui.md'),
              frameworks: ['vanilla', 'nextjs', 'react', 'vue'],
              title: 'Lingui',
            },
            'next-i18next': {
              default: getDocMetadata('./docs/en/compat/next-i18next.md'),
              frameworks: ['nextjs', 'react'],
              title: 'next-i18next',
            },
            'next-intl': {
              default: getDocMetadata('./docs/en/compat/next-intl.md'),
              frameworks: ['nextjs', 'react'],
              title: 'next-intl',
            },
            'ngx-translate': {
              default: getDocMetadata('./docs/en/compat/ngx-translate.md'),
              frameworks: ['angular'],
              title: 'ngx-translate',
            },
            'nuxt-i18n': {
              default: getDocMetadata('./docs/en/compat/nuxtjs-i18n.md'),
              frameworks: ['nuxt', 'vue'],
              title: '@nuxt/i18n',
            },
            'react-i18next': {
              default: getDocMetadata('./docs/en/compat/react-i18next.md'),
              frameworks: ['react'],
              title: 'react-i18next',
            },
            'react-intl': {
              default: getDocMetadata('./docs/en/compat/react-intl.md'),
              frameworks: ['react'],
              title: 'react-intl',
            },
            'svelte-i18n': {
              default: getDocMetadata('./docs/en/compat/svelte-i18n.md'),
              frameworks: ['svelte'],
              title: 'svelte-i18n',
            },
            'vue-i18n': {
              default: getDocMetadata('./docs/en/compat/vue-i18n.md'),
              frameworks: ['vue'],
              title: 'vue-i18n',
            },
          },
          title: t({
            en: 'Adapters',
            ar: 'المحولات',
            de: 'Adapter',
            'en-GB': 'Adapters',
            es: 'Adaptadores',
            fr: 'Adaptateurs',
            'he-IL': 'מתאמים',
            hi: 'एडैप्टर',
            id: 'Adaptor',
            it: 'Adattatori',
            ja: 'アダプター',
            ko: '어댑터',
            pl: 'Adaptery',
            pt: 'Adaptadores',
            ru: 'Адаптеры',
            tr: 'Adaptörler',
            uk: 'Адаптери',
            vi: 'Bộ chuyển đổi',
            zh: '适配器',
          }),
        },
        cms: {
          default: getDocMetadata('./docs/en/intlayer_CMS.md'),
          subSections: {
            analytics: {
              default: getDocMetadata('./docs/en/analytics.md'),
              title: 'Analytics',
            },
            'self-hosting': {
              default: getDocMetadata('./docs/en/self_hosting.md'),
              title: 'Self-hosting',
            },
          },
          title: 'CMS',
        },
        editor: {
          default: getDocMetadata('./docs/en/intlayer_visual_editor.md'),
          title: t({
            en: 'Visual Editor',
            ar: 'المحرر المرئي',
            de: 'Visueller Editor',
            'en-GB': 'Visual Editor',
            es: 'Editor visual',
            fr: 'Éditeur visuel',
            'he-IL': 'עורך ויזואלי',
            hi: 'विज़ुअल एडिटर',
            id: 'Editor visual',
            it: 'Editor visuale',
            ja: 'ビジュアルエディター',
            ko: '비주얼 편집기',
            pl: 'Edytor wizualny',
            pt: 'Editor visual',
            ru: 'Визуальный редактор',
            tr: 'Görsel Editör',
            uk: 'Візуальний редактор',
            vi: 'Editor visual',
            zh: '可视化编辑器',
          }),
        },
        package: {
          subSections: {
            '@intlayer/babel': {
              default: getDocMetadata(
                './docs/en/packages/@intlayer_babel/export.md'
              ),
              frameworks: ['all', 'js'],
              title: '@intlayer/babel',
            },
            'adonis-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/adonis-intlayer/exports.md'
              ),
              frameworks: ['adonis', 'node'],
              subSections: {
                intlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/adonis-intlayer/intlayer.md'
                  ),
                  title: 'intlayer',
                },
                t: {
                  default: getDocMetadata(
                    './docs/en/packages/adonis-intlayer/t.md'
                  ),
                  title: 't',
                },
              },
              title: 'adonis-intlayer',
            },
            'angular-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/angular-intlayer/exports.md'
              ),
              frameworks: ['angular'],
              subSections: {
                usePathname: {
                  default: getDocMetadata(
                    './docs/en/packages/angular-intlayer/usePathname.md'
                  ),
                  title: 'usePathname',
                },
              },
              title: 'angular-intlayer',
            },
            'astro-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/astro-intlayer/exports.md'
              ),
              frameworks: ['astro'],
              subSections: {
                intlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/astro-intlayer/intlayer.md'
                  ),
                  title: 'intlayer',
                },
                onRequest: {
                  default: getDocMetadata(
                    './docs/en/packages/astro-intlayer/onRequest.md'
                  ),
                  title: 'onRequest',
                },
                useDictionary: {
                  default: getDocMetadata(
                    './docs/en/packages/astro-intlayer/useDictionary.md'
                  ),
                  title: 'useDictionary',
                },
                useIntlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/astro-intlayer/useIntlayer.md'
                  ),
                  title: 'useIntlayer',
                },
                useLocale: {
                  default: getDocMetadata(
                    './docs/en/packages/astro-intlayer/useLocale.md'
                  ),
                  title: 'useLocale',
                },
              },
              title: 'astro-intlayer',
            },
            'elysia-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/elysia-intlayer/exports.md'
              ),
              frameworks: ['elysia', 'node'],
              subSections: {
                intlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/elysia-intlayer/intlayer.md'
                  ),
                  title: 'intlayer',
                },
              },
              title: 'elysia-intlayer',
            },
            'express-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/express-intlayer/exports.md'
              ),
              frameworks: ['express', 'node'],
              subSections: {
                intlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/express-intlayer/intlayer.md'
                  ),
                  title: 'intlayer',
                },
                t: {
                  default: getDocMetadata(
                    './docs/en/packages/express-intlayer/t.md'
                  ),
                  title: 't',
                },
              },
              title: 'express-intlayer',
            },
            'fastify-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/fastify-intlayer/exports.md'
              ),
              frameworks: ['fastify', 'node'],
              subSections: {
                intlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/fastify-intlayer/intlayer.md'
                  ),
                  title: 'intlayer',
                },
              },
              title: 'fastify-intlayer',
            },
            'hono-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/hono-intlayer/exports.md'
              ),
              frameworks: ['hono', 'node'],
              subSections: {
                intlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/hono-intlayer/intlayer.md'
                  ),
                  title: 'intlayer',
                },
                t: {
                  default: getDocMetadata(
                    './docs/en/packages/hono-intlayer/t.md'
                  ),
                  title: 't',
                },
              },
              title: 'hono-intlayer',
            },
            intlayer: {
              default: getDocMetadata('./docs/en/packages/intlayer/exports.md'),
              frameworks: ['all', 'js'],
              subSections: {
                comparePaths: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/comparePaths.md'
                  ),
                  title: 'comparePaths',
                },
                getCanonicalPath: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getCanonicalPath.md'
                  ),
                  title: 'getCanonicalPath',
                },
                getConfiguration: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getConfiguration.md'
                  ),
                  title: 'getConfiguration',
                },
                getDictionary: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getDictionary.md'
                  ),
                  title: 'getDictionary',
                },
                getDictionaryAsync: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getDictionaryAsync.md'
                  ),
                  title: 'getDictionaryAsync',
                },
                getEnumeration: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getEnumeration.md'
                  ),
                  title: 'getEnumeration',
                },
                getHTMLTextDir: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getHTMLTextDir.md'
                  ),
                  title: 'getHTMLTextDir',
                },
                getIntlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getIntlayer.md'
                  ),
                  title: 'getIntlayer',
                },
                getIntlayerAsync: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getIntlayerAsync.md'
                  ),
                  title: 'getIntlayerAsync',
                },
                getLocale: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getLocale.md'
                  ),
                  title: 'getLocale',
                },
                getLocaleLang: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getLocaleLang.md'
                  ),
                  title: 'getLocaleLang',
                },
                getLocaleName: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getLocaleName.md'
                  ),
                  title: 'getLocaleName',
                },
                getLocalizedPath: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getLocalizedPath.md'
                  ),
                  title: 'getLocalizedPath',
                },
                getLocalizedUrl: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getLocalizedUrl.md'
                  ),
                  title: 'getLocalizedUrl',
                },
                getMultilingualUrls: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getMultilingualUrls.md'
                  ),
                  title: 'getMultilingualUrls',
                },
                getPathWithoutLocale: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getPathWithoutLocale.md'
                  ),
                  title: 'getPathWithoutLocale',
                },
                getPrefix: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getPrefix.md'
                  ),
                  title: 'getPrefix',
                },
                getTranslation: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/getTranslation.md'
                  ),
                  title: 'getTranslation',
                },
                validatePrefix: {
                  default: getDocMetadata(
                    './docs/en/packages/intlayer/validatePrefix.md'
                  ),
                  title: 'validatePrefix',
                },
              },
              title: 'intlayer',
            },
            'intlayer-cli': {
              default: getDocMetadata(
                './docs/en/packages/intlayer-cli/exports.md'
              ),
              frameworks: ['all', 'js'],
              title: 'intlayer-cli',
            },
            'lynx-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/lynx-intlayer/exports.md'
              ),
              frameworks: ['lynx', 'react'],
              title: 'lynx-intlayer',
            },
            'next-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/next-intlayer/exports.md'
              ),
              frameworks: ['nextjs', 'react'],
              subSections: {
                intlayerMiddleware: {
                  default: getDocMetadata(
                    './docs/en/packages/next-intlayer/intlayerMiddleware.md'
                  ),
                  title: 'intlayerMiddleware',
                },
                t: {
                  default: getDocMetadata(
                    './docs/en/packages/next-intlayer/t.md'
                  ),
                  title: 't',
                },
                useDictionary: {
                  default: getDocMetadata(
                    './docs/en/packages/next-intlayer/useDictionary.md'
                  ),
                  title: 'useDictionary',
                },
                useIntlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/next-intlayer/useIntlayer.md'
                  ),
                  title: 'useIntlayer',
                },
                useLocale: {
                  default: getDocMetadata(
                    './docs/en/packages/next-intlayer/useLocale.md'
                  ),
                  title: 'useLocale',
                },
                usePathname: {
                  default: getDocMetadata(
                    './docs/en/packages/next-intlayer/usePathname.md'
                  ),
                  title: 'usePathname',
                },
                useRewriteURL: {
                  default: getDocMetadata(
                    './docs/en/packages/next-intlayer/useRewriteURL.md'
                  ),
                  title: 'useRewriteURL',
                },
              },
              title: 'next-intlayer',
            },
            'nuxt-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/nuxt-intlayer/exports.md'
              ),
              frameworks: ['nuxt', 'vue'],
              title: 'nuxt-intlayer',
            },
            'preact-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/preact-intlayer/exports.md'
              ),
              frameworks: ['preact'],
              subSections: {
                usePathname: {
                  default: getDocMetadata(
                    './docs/en/packages/preact-intlayer/usePathname.md'
                  ),
                  title: 'usePathname',
                },
              },
              title: 'preact-intlayer',
            },
            'react-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/react-intlayer/exports.md'
              ),
              frameworks: ['react'],
              subSections: {
                IntlayerProvider: {
                  default: getDocMetadata(
                    './docs/en/packages/react-intlayer/IntlayerProvider.md'
                  ),
                  title: 'IntlayerProvider',
                },
                MarkdownRenderer: {
                  default: getDocMetadata(
                    './docs/en/packages/react-intlayer/MarkdownRenderer.md'
                  ),
                  title: 'MarkdownRenderer',
                },
                t: {
                  default: getDocMetadata(
                    './docs/en/packages/react-intlayer/t.md'
                  ),
                  title: 't',
                },
                useDictionary: {
                  default: getDocMetadata(
                    './docs/en/packages/react-intlayer/useDictionary.md'
                  ),
                  title: 'useDictionary',
                },
                useI18n: {
                  default: getDocMetadata(
                    './docs/en/packages/react-intlayer/useI18n.md'
                  ),
                  title: 'useI18n',
                },
                useIntlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/react-intlayer/useIntlayer.md'
                  ),
                  title: 'useIntlayer',
                },
                useLocale: {
                  default: getDocMetadata(
                    './docs/en/packages/react-intlayer/useLocale.md'
                  ),
                  title: 'useLocale',
                },
                usePathname: {
                  default: getDocMetadata(
                    './docs/en/packages/react-intlayer/usePathname.md'
                  ),
                  title: 'usePathname',
                },
                useRewriteURL: {
                  default: getDocMetadata(
                    './docs/en/packages/react-intlayer/useRewriteURL.md'
                  ),
                  title: 'useRewriteURL',
                },
              },
              title: 'react-intlayer',
            },
            'react-native-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/react-native-intlayer/exports.md'
              ),
              frameworks: ['react'],
              title: 'react-native-intlayer',
            },
            'remix-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/remix-intlayer/exports.md'
              ),
              frameworks: ['remix', 'react'],
              subSections: {
                Intlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/remix-intlayer/Intlayer.md'
                  ),
                  title: 'Intlayer',
                },
                intlayerMiddleware: {
                  default: getDocMetadata(
                    './docs/en/packages/remix-intlayer/intlayerMiddleware.md'
                  ),
                  title: 'intlayer',
                },
                useDictionary: {
                  default: getDocMetadata(
                    './docs/en/packages/remix-intlayer/useDictionary.md'
                  ),
                  title: 'useDictionary',
                },
                useIntlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/remix-intlayer/useIntlayer.md'
                  ),
                  title: 'useIntlayer',
                },
                useLocale: {
                  default: getDocMetadata(
                    './docs/en/packages/remix-intlayer/useLocale.md'
                  ),
                  title: 'useLocale',
                },
              },
              title: 'remix-intlayer',
            },
            'solid-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/solid-intlayer/exports.md'
              ),
              frameworks: ['solid'],
              subSections: {
                IntlayerProvider: {
                  default: getDocMetadata(
                    './docs/en/packages/solid-intlayer/IntlayerProvider.md'
                  ),
                  title: 'IntlayerProvider',
                },
                useIntlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/solid-intlayer/useIntlayer.md'
                  ),
                  title: 'useIntlayer',
                },
                useLocale: {
                  default: getDocMetadata(
                    './docs/en/packages/solid-intlayer/useLocale.md'
                  ),
                  title: 'useLocale',
                },
                usePathname: {
                  default: getDocMetadata(
                    './docs/en/packages/solid-intlayer/usePathname.md'
                  ),
                  title: 'usePathname',
                },
                useRewriteURL: {
                  default: getDocMetadata(
                    './docs/en/packages/solid-intlayer/useRewriteURL.md'
                  ),
                  title: 'useRewriteURL',
                },
              },
              title: 'solid-intlayer',
            },
            'svelte-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/svelte-intlayer/exports.md'
              ),
              frameworks: ['svelte'],
              subSections: {
                usePathname: {
                  default: getDocMetadata(
                    './docs/en/packages/svelte-intlayer/usePathname.md'
                  ),
                  title: 'usePathname',
                },
                useRewriteURL: {
                  default: getDocMetadata(
                    './docs/en/packages/svelte-intlayer/useRewriteURL.md'
                  ),
                  title: 'useRewriteURL',
                },
              },
              title: 'svelte-intlayer',
            },
            'vite-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/vite-intlayer/exports.md'
              ),
              frameworks: ['vite'],
              subSections: {
                intlayer: {
                  default: getDocMetadata(
                    './docs/en/packages/vite-intlayer/intlayer.md'
                  ),
                  title: 'intlayer',
                },
                intlayerPrune: {
                  default: getDocMetadata(
                    './docs/en/packages/vite-intlayer/intlayerPrune.md'
                  ),
                  title: 'intlayerPrune',
                },
              },
              title: 'vite-intlayer',
            },
            'vue-intlayer': {
              default: getDocMetadata(
                './docs/en/packages/vue-intlayer/exports.md'
              ),
              frameworks: ['vue'],
              subSections: {
                usePathname: {
                  default: getDocMetadata(
                    './docs/en/packages/vue-intlayer/usePathname.md'
                  ),
                  title: 'usePathname',
                },
                useRewriteURL: {
                  default: getDocMetadata(
                    './docs/en/packages/vue-intlayer/useRewriteURL.md'
                  ),
                  title: 'useRewriteURL',
                },
              },
              title: 'vue-intlayer',
            },
          },
          title: 'Packages',
        },
        plugins: {
          subSections: {
            syncJSON: {
              default: getDocMetadata('./docs/en/plugins/sync-json.md'),
              title: 'JSON',
            },
            syncPO: {
              default: getDocMetadata('./docs/en/plugins/sync-po.md'),
              title: 'gettext (.po)',
            },
          },
          title: 'Plugins',
        },
      },
      title: t({
        en: 'Ecosystem',
        ar: 'المنظومة',
        de: 'Ökosystem',
        'en-GB': 'Ecosystem',
        es: 'Ecosistema',
        fr: 'Écosystème',
        'he-IL': 'אקוסיסטם',
        hi: 'इकोसिस्टम',
        id: 'Ekosistem',
        it: 'Ecosistema',
        ja: 'エコシステム',
        ko: '생태계',
        pl: 'Ekosystem',
        pt: 'Ecossistema',
        ru: 'Экосистема',
        tr: 'Ekosistem',
        uk: 'Екосистема',
        vi: 'Hệ sinh thái',
        zh: '生态系统',
      }),
    },
    environment: {
      subSections: {
        angular: {
          default: getDocMetadata('./docs/en/intlayer_with_angular_21.md'),
          frameworks: ['angular', 'vite'],
          subSections: {
            19: {
              default: getDocMetadata('./docs/en/intlayer_with_angular_19.md'),
              frameworks: ['angular', 'webpack'],
              title: 'Angular 19 (Webpack)',
            },
            analog: {
              default: getDocMetadata('./docs/en/intlayer_with_analog.md'),
              frameworks: ['angular', 'vite'],
              title: 'Analog',
            },
          },
          title: 'Angular 21',
        },

        astro: {
          default: getDocMetadata('./docs/en/intlayer_with_astro.md'),
          frameworks: ['astro', 'vite'],
          subSections: {
            'astro-and-lit': {
              default: getDocMetadata('./docs/en/intlayer_with_astro_lit.md'),
              frameworks: ['lit', 'astro', 'vite'],
              title: t({
                en: 'Astro and Lit',
                ar: 'Astro و Lit',
                de: 'Astro und Lit',
                'en-GB': 'Astro and Lit',
                es: 'Astro y Lit',
                fr: 'Astro et Lit',
                'he-IL': 'Astro ו-Lit',
                hi: 'Astro और Lit',
                id: 'Astro dan Lit',
                it: 'Astro e Lit',
                ja: 'AstroおよびLit',
                ko: 'Astro 및 Lit',
                pl: 'Astro dan Lit',
                pt: 'Astro e Lit',
                ru: 'Astro и Lit',
                tr: 'Astro ve Lit',
                uk: 'Astro та Lit',
                vi: 'Astro và Lit',
                zh: 'Astro和Lit',
              }),
            },
            'astro-and-preact': {
              default: getDocMetadata(
                './docs/en/intlayer_with_astro_preact.md'
              ),
              frameworks: ['preact', 'astro', 'vite'],
              title: t({
                en: 'Astro and Preact',
                ar: 'Astro و Preact',
                de: 'Astro und Preact',
                'en-GB': 'Astro and Preact',
                es: 'Astro y Preact',
                fr: 'Astro et Preact',
                'he-IL': 'Astro ו-Preact',
                hi: 'Astro और Preact',
                id: 'Astro dan Preact',
                it: 'Astro e Preact',
                ja: 'AstroおよびPreact',
                ko: 'Astro 및 Preact',
                pl: 'Astro dan Preact',
                pt: 'Astro e Preact',
                ru: 'Astro и Preact',
                tr: 'Astro ve Preact',
                uk: 'Astro та Preact',
                vi: 'Astro và Preact',
                zh: 'Astro和Preact',
              }),
            },
            'astro-and-react': {
              default: getDocMetadata('./docs/en/intlayer_with_astro_react.md'),
              frameworks: ['react', 'astro', 'vite'],
              title: t({
                en: 'Astro and React',
                ar: 'Astro و React',
                de: 'Astro und React',
                'en-GB': 'Astro and React',
                es: 'Astro y React',
                fr: 'Astro et React',
                'he-IL': 'Astro ו-React',
                hi: 'Astro और React',
                id: 'Astro dan React',
                it: 'Astro e React',
                ja: 'AstroおよびReact',
                ko: 'Astro 및 React',
                pl: 'Astro dan React',
                pt: 'Astro e React',
                ru: 'Astro и React',
                tr: 'Astro ve React',
                uk: 'Astro та React',
                vi: 'Astro và React',
                zh: 'Astro和React',
              }),
            },
            'astro-and-solid': {
              default: getDocMetadata('./docs/en/intlayer_with_astro_solid.md'),
              frameworks: ['solid', 'astro', 'vite'],
              title: t({
                en: 'Astro and Solid',
                ar: 'Astro و Solid',
                de: 'Astro und Solid',
                'en-GB': 'Astro and Solid',
                es: 'Astro y Solid',
                fr: 'Astro et Solid',
                'he-IL': 'Astro ו-Solid',
                hi: 'Astro और Solid',
                id: 'Astro dan Solid',
                it: 'Astro e Solid',
                ja: 'AstroおよびSolid',
                ko: 'Astro 및 Solid',
                pl: 'Astro dan Solid',
                pt: 'Astro e Solid',
                ru: 'Astro и Solid',
                tr: 'Astro ve Solid',
                uk: 'Astro та Solid',
                vi: 'Astro và Solid',
                zh: 'Astro和Solid',
              }),
            },
            'astro-and-svelte': {
              default: getDocMetadata(
                './docs/en/intlayer_with_astro_svelte.md'
              ),
              frameworks: ['svelte', 'astro', 'vite'],
              title: t({
                en: 'Astro and Svelte',
                ar: 'Astro و Svelte',
                de: 'Astro und Svelte',
                'en-GB': 'Astro and Svelte',
                es: 'Astro y Svelte',
                fr: 'Astro et Svelte',
                'he-IL': 'Astro ו-Svelte',
                hi: 'Astro और Svelte',
                id: 'Astro dan Svelte',
                it: 'Astro e Svelte',
                ja: 'AstroおよびSvelte',
                ko: 'Astro 및 Svelte',
                pl: 'Astro dan Svelte',
                pt: 'Astro e Svelte',
                ru: 'Astro и Svelte',
                tr: 'Astro ve Svelte',
                uk: 'Astro та Svelte',
                vi: 'Astro và Svelte',
                zh: 'Astro和Svelte',
              }),
            },
            'astro-and-vue': {
              default: getDocMetadata('./docs/en/intlayer_with_astro_vue.md'),
              frameworks: ['vue', 'astro', 'vite'],
              title: t({
                en: 'Astro and Vue',
                ar: 'Astro و Vue',
                de: 'Astro und Vue',
                'en-GB': 'Astro and Vue',
                es: 'Astro y Vue',
                fr: 'Astro et Vue',
                'he-IL': 'Astro ו-Vue',
                hi: 'Astro और Vue',
                id: 'Astro dan Vue',
                it: 'Astro e Vue',
                ja: 'AstroおよびVue',
                ko: 'Astro 및 Vue',
                pl: 'Astro dan Vue',
                pt: 'Astro e Vue',
                ru: 'Astro и Vue',
                tr: 'Astro ve Vue',
                uk: 'Astro та Vue',
                vi: 'Astro và Vue',
                zh: 'Astro和Vue',
              }),
            },
          },
          title: 'Astro',
        },

        nextjs: {
          default: getDocMetadata('./docs/en/intlayer_with_nextjs_16.md'),
          frameworks: ['nextjs', 'react'],
          subSections: {
            14: {
              default: getDocMetadata('./docs/en/intlayer_with_nextjs_14.md'),
              frameworks: ['nextjs', 'react'],
              title: t({
                en: 'Next.js 14 and App Router',
                ar: 'Next.js 14 وموجه التطبيق',
                de: 'Next.js 14 und App Router',
                'en-GB': 'Next.js 14 and App Router',
                es: 'Next.js 14 y App Router',
                fr: 'Next.js 14 et App Router',
                'he-IL': 'Next.js 14 ו-App Router',
                hi: 'Next.js 14 और ऐप राउटर',
                id: 'Next.js 14 dan App Router',
                it: 'Next.js 14 e App Router',
                ja: 'Next.js 14とApp Router',
                ko: 'Next.js 14 및 앱 라우터',
                pl: 'Next.js 14 i App Router',
                pt: 'Next.js 14 e App Router',
                ru: 'Next.js 14 и App Router',
                tr: 'Next.js 14 ve Uygulama Yönlendirici',
                uk: 'Next.js 14 та App Router',
                vi: 'Next.js 14 và App Router',
                zh: 'Next.js 14和应用路由器',
              }),
            },
            15: {
              default: getDocMetadata('./docs/en/intlayer_with_nextjs_15.md'),
              frameworks: ['nextjs', 'react'],
              title: 'Next.js 15',
            },
            'next-with-Page-Router': {
              default: getDocMetadata(
                './docs/en/intlayer_with_nextjs_page_router.md'
              ),
              frameworks: ['nextjs', 'react'],
              title: t({
                en: 'Next.js and Page Router',
                ar: 'Next.js وموجه الصفحة',
                de: 'Next.js und Page Router',
                'en-GB': 'Next.js and Page Router',
                es: 'Next.js y Page Router',
                fr: 'Next.js et Page Router',
                'he-IL': 'Next.js ו-Page Router',
                hi: 'Next.js और पेज राउटर',
                id: 'Next.js dan Page Router',
                it: 'Next.js e Page Router',
                ja: 'Next.jsとページルーター',
                ko: 'Next.js 및 페이지 라우터',
                pl: 'Next.js dan Page Router',
                pt: 'Next.js e Page Router',
                ru: 'Next.js и Page Router',
                tr: 'Next.js ve Sayfa Yönlendirici',
                uk: 'Next.js та Page Router',
                vi: 'Next.js và Page Router',
                zh: 'Next.js和页面路由器',
              }),
            },
          },
          title: 'Next.js',
        },

        node: {
          subSections: {
            adonis: {
              default: getDocMetadata('./docs/en/intlayer_with_adonisjs.md'),
              frameworks: ['adonis', 'node'],
              title: 'Adonis',
            },
            elysia: {
              default: getDocMetadata('./docs/en/intlayer_with_elysia.md'),
              frameworks: ['elysia', 'node'],
              title: 'Elysia',
            },
            express: {
              default: getDocMetadata('./docs/en/intlayer_with_express.md'),
              frameworks: ['express', 'node'],
              title: 'Express.js',
            },
            fastify: {
              default: getDocMetadata('./docs/en/intlayer_with_fastify.md'),
              frameworks: ['fastify', 'node'],
              title: 'Fastify',
            },
            hono: {
              default: getDocMetadata('./docs/en/intlayer_with_hono.md'),
              frameworks: ['hono', 'node'],
              title: 'Hono',
            },
            nest: {
              default: getDocMetadata('./docs/en/intlayer_with_nestjs.md'),
              frameworks: ['nest', 'node'],
              title: 'NestJS',
            },
          },
          title: 'Backend',
        },

        other: {
          subSections: {
            'create-react-app': {
              default: getDocMetadata(
                './docs/en/intlayer_with_create_react_app.md'
              ),
              frameworks: ['react', 'vite'],
              title: 'React CRA',
            },
            htmx: {
              default: getDocMetadata('./docs/en/intlayer_with_htmx.md'),
              frameworks: ['htmx'],
              title: 'htmx',
            },
            'lynx-and-react': {
              default: getDocMetadata('./docs/en/intlayer_with_lynx+react.md'),
              frameworks: ['lynx', 'react'],
              title: t({
                en: 'Lynx and React',
                ar: 'Lynx و React',
                de: 'Lynx und React',
                'en-GB': 'Lynx and React',
                es: 'Lynx y React',
                fr: 'Lynx et React',
                'he-IL': 'Lynx ו-React',
                hi: 'Lynx और React',
                id: 'Lynx dan React',
                it: 'Lynx e React',
                ja: 'LynxおよびReact',
                ko: 'Lynx 및 React',
                pl: 'Lynx dan React',
                pt: 'Lynx e React',
                ru: 'Lynx и React',
                tr: 'Lynx ve React',
                uk: 'Lynx та React',
                vi: 'Lynx và React',
                zh: 'Lynx和React',
              }),
            },
          },
          title: t({
            en: 'Other',
            ar: 'أخرى',
            de: 'Sonstige',
            'en-GB': 'Other',
            es: 'Otro',
            fr: 'Autre',
            'he-IL': 'אחר',
            hi: 'अन्य',
            id: 'Lainnya',
            it: 'Altro',
            ja: 'その他',
            ko: '기타',
            pl: 'Inne',
            pt: 'Outro',
            ru: 'Другое',
            tr: 'Diğer',
            uk: 'Інше',
            vi: 'Khác',
            zh: '其他',
          }),
        },
        'react-native-and-expo': {
          default: getDocMetadata(
            './docs/en/intlayer_with_react_native+expo.md'
          ),
          frameworks: ['react', 'react-native', 'expo'],
          title: t({
            en: 'React Native and Expo',
            ar: 'React Native و Expo',
            de: 'React Native und Expo',
            'en-GB': 'React Native and Expo',
            es: 'React Native y Expo',
            fr: 'React Native et Expo',
            'he-IL': 'React Native ו-Expo',
            hi: 'React Native और Expo',
            id: 'React Native dan Expo',
            it: 'React Native e Expo',
            ja: 'React NativeとExpo',
            ko: 'React Native 및 Expo',
            pl: 'React Native dan Expo',
            pt: 'React Native e Expo',
            ru: 'React Native и Expo',
            tr: 'React Native ve Expo',
            uk: 'React Native та Expo',
            vi: 'React Native và Expo',
            zh: 'React Native和Expo',
          }),
        },
        'remix-3': {
          default: getDocMetadata('./docs/en/intlayer_with_remix_3.md'),
          frameworks: ['remix'],
          title: 'Remix 3',
        },

        'tanstack-start': {
          default: getDocMetadata('./docs/en/intlayer_with_tanstack.md'),
          frameworks: ['tanstack', 'react', 'vite'],
          subSections: {
            'tanstack-start-solid': {
              default: getDocMetadata(
                './docs/en/intlayer_with_tanstack+solid.md'
              ),
              frameworks: ['solid', 'tanstack', 'vite'],
              title: 'Tanstack Start Solid',
            },
          },
          title: 'Tanstack Start',
        },

        'vite-and-lit': {
          default: getDocMetadata('./docs/en/intlayer_with_vite+lit.md'),
          frameworks: ['lit', 'vite'],
          title: t({
            en: 'Vite and Lit',
            ar: 'Vite و Lit',
            de: 'Vite und Lit',
            'en-GB': 'Vite and Lit',
            es: 'Vite y Lit',
            fr: 'Vite et Lit',
            'he-IL': 'Vite ו-Lit',
            hi: 'Vite और Lit',
            id: 'Vite dan Lit',
            it: 'Vite e Lit',
            ja: 'ViteおよびLit',
            ko: 'Vite 및 Lit',
            pl: 'Vite dan Lit',
            pt: 'Vite e Lit',
            ru: 'Vite и Lit',
            tr: 'Vite ve Lit',
            uk: 'Vite та Lit',
            vi: 'Vite và Lit',
            zh: 'Vite和Lit',
          }),
        },
        'vite-and-preact': {
          default: getDocMetadata('./docs/en/intlayer_with_vite+preact.md'),
          frameworks: ['preact', 'vite'],
          title: t({
            en: 'Vite and Preact',
            ar: 'Vite و Preact',
            de: 'Vite und Preact',
            'en-GB': 'Vite and Preact',
            es: 'Vite y Preact',
            fr: 'Vite et Preact',
            'he-IL': 'Vite ו-Preact',
            hi: 'Vite और Preact',
            id: 'Vite dan Preact',
            it: 'Vite e Preact',
            ja: 'ViteおよびPreact',
            ko: 'Vite 및 Preact',
            pl: 'Vite dan Preact',
            pt: 'Vite e Preact',
            ru: 'Vite и Preact',
            tr: 'Vite ve Preact',
            uk: 'Vite та Preact',
            vi: 'Vite và Preact',
            zh: 'Vite和Preact',
          }),
        },
        'vite-and-react': {
          default: getDocMetadata('./docs/en/intlayer_with_vite+react.md'),
          frameworks: ['react', 'vite'],
          subSections: {
            'react-router-v7': {
              default: getDocMetadata(
                './docs/en/intlayer_with_react_router_v7.md'
              ),
              frameworks: ['react', 'vite'],
              title: 'React Router v7',
            },
          },
          title: t({
            en: 'Vite and React',
            ar: 'Vite و React',
            de: 'Vite und React',
            'en-GB': 'Vite and React',
            es: 'Vite y React',
            fr: 'Vite et React',
            'he-IL': 'Vite ו-React',
            hi: 'Vite और React',
            id: 'Vite dan React',
            it: 'Vite e React',
            ja: 'ViteおよびReact',
            ko: 'Vite 및 React',
            pl: 'Vite dan React',
            pt: 'Vite e React',
            ru: 'Vite и React',
            tr: 'Vite ve React',
            uk: 'Vite та React',
            vi: 'Vite và React',
            zh: 'Vite和React',
          }),
        },

        'vite-and-solid': {
          default: getDocMetadata('./docs/en/intlayer_with_vite+solid.md'),
          frameworks: ['solid', 'vite'],
          subSections: {
            'vite-and-solid-start': {
              default: getDocMetadata('./docs/en/intlayer_with_solid_start.md'),
              frameworks: ['solid', 'vite'],
              title: 'Solid Start',
            },
          },
          title: t({
            en: 'Vite and Solid',
            ar: 'Vite و Solid',
            de: 'Vite und Solid',
            'en-GB': 'Vite and Solid',
            es: 'Vite y Solid',
            fr: 'Vite et Solid',
            'he-IL': 'Vite ו-Solid',
            hi: 'Vite और Solid',
            id: 'Vite dan Solid',
            it: 'Vite e Solid',
            ja: 'ViteおよびSolid',
            ko: 'Vite 및 Solid',
            pl: 'Vite dan Solid',
            pt: 'Vite e Solid',
            ru: 'Vite и Solid',
            tr: 'Vite ve Solid',
            uk: 'Vite та Solid',
            vi: 'Vite và Solid',
            zh: 'Vite和Solid',
          }),
        },
        'vite-and-svelte': {
          default: getDocMetadata('./docs/en/intlayer_with_vite+svelte.md'),
          frameworks: ['svelte', 'vite'],
          subSections: {
            'vite-and-svelte-kit': {
              default: getDocMetadata('./docs/en/intlayer_with_svelte_kit.md'),
              frameworks: ['svelte', 'vite'],
              title: 'SvelteKit',
            },
          },
          title: t({
            en: 'Vite and Svelte',
            ar: 'Vite و Svelte',
            de: 'Vite und Svelte',
            'en-GB': 'Vite and Svelte',
            es: 'Vite y Svelte',
            fr: 'Vite et Svelte',
            'he-IL': 'Vite ו-Svelte',
            hi: 'Vite और Svelte',
            id: 'Vite dan Svelte',
            it: 'Vite e Svelte',
            ja: 'ViteおよびSvelte',
            ko: 'Vite 및 Svelte',
            pl: 'Vite dan Svelte',
            pt: 'Vite e Svelte',
            ru: 'Vite и Svelte',
            tr: 'Vite ve Svelte',
            uk: 'Vite та Svelte',
            vi: 'Vite và Svelte',
            zh: 'Vite和Svelte',
          }),
        },

        'vite-and-vanilla-js': {
          default: getDocMetadata('./docs/en/intlayer_with_vite+vanilla.md'),
          frameworks: ['vanilla', 'vite'],
          subSections: {
            'vanilla-js': {
              default: getDocMetadata('./docs/en/intlayer_with_vanilla.md'),
              frameworks: ['vanilla'],
              title: t({
                en: 'Vanilla JS (no bundler)',
                ar: 'Vanilla JS (بدون مجمع)',
                de: 'Vanilla JS (ohne Bundler)',
                'en-GB': 'Vanilla JS (no bundler)',
                es: 'Vanilla JS (sin bundler)',
                fr: 'Vanilla JS (sans bundler)',
                'he-IL': 'Vanilla JS (ללא bundler)',
                hi: 'Vanilla JS (बिना बंडलर के)',
                id: 'Vanilla JS (tanpa bundler)',
                it: 'Vanilla JS (senza bundler)',
                ja: 'Vanilla JS (バンドラーなし)',
                ko: 'Vanilla JS (번들러 없음)',
                pl: 'Vanilla JS (bez bundlera)',
                pt: 'Vanilla JS (sem bundler)',
                ru: 'Vanilla JS (без бандлера)',
                tr: 'Vanilla JS (paketleyici olmadan)',
                uk: 'Vanilla JS (без бандлера)',
                vi: 'Vanilla JS (không có bundler)',
                zh: 'Vanilla JS (无打包器)',
              }),
            },
          },
          title: t({
            en: 'Vite and Vanilla JS',
            ar: 'Vite و Vanilla JS',
            de: 'Vite und Vanilla JS',
            'en-GB': 'Vite and Vanilla JS',
            es: 'Vite y Vanilla JS',
            fr: 'Vite et Vanilla JS',
            'he-IL': 'Vite ו-Vanilla JS',
            hi: 'Vite और Vanilla JS',
            id: 'Vite dan Vanilla JS',
            it: 'Vite e Vanilla JS',
            ja: 'ViteおよびVanilla JS',
            ko: 'Vite 및 Vanilla JS',
            pl: 'Vite dan Vanilla JS',
            pt: 'Vite e Vanilla JS',
            ru: 'Vite и Vanilla JS',
            tr: 'Vite ve Vanilla JS',
            uk: 'Vite та Vanilla JS',
            vi: 'Vite và Vanilla JS',
            zh: 'Vite和Vanilla JS',
          }),
        },
        'vite-and-vue': {
          default: getDocMetadata('./docs/en/intlayer_with_vite+vue.md'),
          frameworks: ['vue', 'vite'],
          subSections: {
            'nuxt-and-vue': {
              default: getDocMetadata('./docs/en/intlayer_with_nuxt.md'),
              frameworks: ['nuxt', 'vue', 'vite'],
              title: t({
                en: 'Nuxt and Vue',
                ar: 'Nuxt و Vue',
                de: 'Nuxt und Vue',
                'en-GB': 'Nuxt and Vue',
                es: 'Nuxt y Vue',
                fr: 'Nuxt et Vue',
                'he-IL': 'Nuxt ו-Vue',
                hi: 'Nuxt और Vue',
                id: 'Nuxt dan Vue',
                it: 'Nuxt e Vue',
                ja: 'NuxtおよびVue',
                ko: 'Nuxt 및 Vue',
                pl: 'Nuxt dan Vue',
                pt: 'Nuxt e Vue',
                ru: 'Nuxt и Vue',
                tr: 'Nuxt ve Vue',
                uk: 'Nuxt та Vue',
                vi: 'Nuxt và Vue',
                zh: 'Nuxt和Vue',
              }),
            },
          },
          title: t({
            en: 'Vite and Vue',
            ar: 'Vite و Vue',
            de: 'Vite und Vue',
            'en-GB': 'Vite and Vue',
            es: 'Vite y Vue',
            fr: 'Vite et Vue',
            'he-IL': 'Vite ו-Vue',
            hi: 'Vite और Vue',
            id: 'Vite dan Vue',
            it: 'Vite e Vue',
            ja: 'ViteおよびVue',
            ko: 'Vite 및 Vue',
            pl: 'Vite dan Vue',
            pt: 'Vite e Vue',
            ru: 'Vite и Vue',
            tr: 'Vite ve Vue',
            uk: 'Vite та Vue',
            vi: 'Vite và Vue',
            zh: 'Vite和Vue',
          }),
        },
      },
      title: t({
        en: 'Environment',
        ar: 'بيئة',
        de: 'Umwelt',
        'en-GB': 'Environment',
        es: 'Entornos',
        fr: 'Environnement',
        'he-IL': 'סביבה',
        hi: 'पर्यावरण',
        id: 'Lingkungan',
        it: 'Ambiente',
        ja: '環境',
        ko: '환경',
        pl: 'Środowisko',
        pt: 'Ambiente',
        ru: 'Окружающая среда',
        tr: 'Ortam',
        uk: 'Середовище',
        vi: 'Môi trường',
        zh: '环境',
      }),
    },
    'get-started': {
      default: getDocMetadata('./docs/en/introduction.md'),
      title: t({
        en: 'Get Started',
        ar: 'ابدأ',
        de: 'Anfangen',
        'en-GB': 'Get Started',
        es: 'Empezar',
        fr: 'Commencer',
        'he-IL': 'תחילת העבודה',
        hi: 'शुरू करें',
        id: 'Mulai',
        it: 'Iniziare',
        ja: '始める',
        ko: '시작하기',
        pl: 'Zacząć',
        pt: 'Começar',
        ru: 'Начать',
        tr: 'Başla',
        uk: 'Почати',
        vi: 'Bắt đầu',
        zh: '开始',
      }),
    },
    guide: {
      subSections: {
        'auto-fill': {
          default: getDocMetadata('./docs/en/autoFill.md'),
          title: t({
            en: 'Auto Fill',
            ar: 'الملء التلقائي',
            de: 'Automatisches Ausfüllen',
            'en-GB': 'Auto Fill',
            es: 'Autocompletado',
            fr: 'Remplissage automatique',
            'he-IL': 'מילוי אוטומטי',
            hi: 'स्वतः भरण',
            id: 'Pengisian otomatis',
            it: 'Compilazione automatica',
            ja: '自動入力',
            ko: '자동 채우기',
            pl: 'Automatyczne wypełnianie',
            pt: 'Preenchimento automático',
            ru: 'Автозаполнение',
            tr: 'Otomatik Doldurma',
            uk: 'Автозаповнення',
            vi: 'Tự động điền',
            zh: '自动填充',
          }),
        },
        'ci-cd': {
          default: getDocMetadata('./docs/en/CI_CD.md'),
          title: t({
            en: 'CI/CD Integration',
            ar: 'تكامل CI/CD',
            de: 'CI/CD-Integration',
            'en-GB': 'CI/CD Integration',
            es: 'Integración CI/CD',
            fr: 'Intégration CI/CD',
            'he-IL': 'שילוב CI/CD',
            hi: 'CI/CD एकीकरण',
            id: 'Integrasi CI/CD',
            it: 'Integrazione CI/CD',
            ja: 'CI/CD統合',
            ko: 'CI/CD 통합',
            pl: 'Integracja CI/CD',
            pt: 'Integração CI/CD',
            ru: 'Интеграция CI/CD',
            tr: 'CI/CD Entegrasyonu',
            uk: 'Інтеграція CI/CD',
            vi: 'Tích hợp CI/CD',
            zh: 'CI/CD集成',
          }),
        },
        migration: {
          subSections: {
            i18next: {
              default: getDocMetadata(
                './docs/en/migration_from_i18next_to_intlayer.md'
              ),
              frameworks: ['vanilla'],
              title: 'i18next',
            },
            'next-i18next': {
              default: getDocMetadata(
                './docs/en/migration_from_next-i18next_to_intlayer.md'
              ),
              frameworks: ['nextjs', 'react'],
              title: 'next-i18next',
            },
            'next-intl': {
              default: getDocMetadata(
                './docs/en/migration_from_next-intl_to_intlayer.md'
              ),
              frameworks: ['nextjs', 'react'],
              title: 'next-intl',
            },
            'nuxt-i18n': {
              default: getDocMetadata(
                './docs/en/migration_from_nuxtjs_i18n_to_intlayer.md'
              ),
              frameworks: ['nuxt', 'vue'],
              title: '@nuxtjs/i18n',
            },
            'react-i18next': {
              default: getDocMetadata(
                './docs/en/migration_from_react-i18next_to_intlayer.md'
              ),
              frameworks: ['react'],
              title: 'react-i18next',
            },
            'vue-i18n': {
              default: getDocMetadata(
                './docs/en/migration_from_vue-i18n_to_intlayer.md'
              ),
              frameworks: ['vue'],
              title: 'vue-i18n',
            },
          },
          title: t({
            en: 'Migration',
            ar: 'الترحيل',
            de: 'Migration',
            'en-GB': 'Migration',
            es: 'Migración',
            fr: 'Migration',
            'he-IL': 'מיגרציה',
            hi: 'माइग्रेशन',
            id: 'Migrasi',
            it: 'Migrazione',
            ja: '移行',
            ko: '마이그레이션',
            pl: 'Migracja',
            pt: 'Migração',
            ru: 'Миграция',
            tr: 'Geçiş',
            uk: 'Міграція',
            vi: 'Di chuyển',
            zh: '迁移',
          }),
        },
        testing: {
          default: getDocMetadata('./docs/en/testing.md'),
          title: t({
            en: 'Testing',
            ar: 'اختبار',
            de: 'Testen',
            'en-GB': 'Testing',
            es: 'Pruebas',
            fr: 'Tests',
            'he-IL': 'בדיקות',
            hi: 'परीक्षण',
            id: 'Pengujian',
            it: 'Test',
            ja: 'テスト',
            ko: '테스트',
            pl: 'Testowanie',
            pt: 'Testes',
            ru: 'Тестирование',
            tr: 'Test',
            uk: 'Тестування',
            vi: 'Kiểm tra',
            zh: '测试',
          }),
        },
      },
      title: t({
        en: 'Guide',
        ar: 'دليل',
        de: 'Anleitung',
        'en-GB': 'Guide',
        es: 'Guía',
        fr: 'Guide',
        'he-IL': 'מדריך',
        hi: 'गाइड',
        id: 'Panduan',
        it: 'Guida',
        ja: 'ガイド',
        ko: '가이드',
        pl: 'Przewodnik',
        pt: 'Guia',
        ru: 'Руководство',
        tr: 'Kılavuz',
        uk: 'Посібник',
        vi: 'Hướng dẫn',
        zh: '指南',
      }),
    },
    releases: {
      subSections: {
        v6: {
          default: getDocMetadata('./docs/en/releases/v6.md'),
          title: 'v6',
        },
        v7: {
          default: getDocMetadata('./docs/en/releases/v7.md'),
          title: 'v7',
        },
        v8: {
          default: getDocMetadata('./docs/en/releases/v8.md'),
          title: 'v8',
        },
        v9: {
          default: getDocMetadata('./docs/en/releases/v9.md'),
          title: 'v9',
        },
      },
      title: t({
        en: 'Releases',
        ar: 'إصدارات',
        de: 'Versionen',
        'en-GB': 'Releases',
        es: 'Versiones',
        fr: 'Versions',
        'he-IL': 'גרסאות',
        hi: 'रिलीज',
        id: 'Rilis',
        it: 'Versioni',
        ja: 'リリース',
        ko: '릴리스',
        pl: 'Wersje',
        pt: 'Versões',
        ru: 'Релизы',
        tr: 'Sürümler',
        uk: 'Релізи',
        vi: 'Phiên bản',
        zh: '发布',
      }),
    },
    why: {
      default: getDocMetadata('./docs/en/interest_of_intlayer.md'),
      title: t({
        en: 'Why Intlayer ?',
        ar: 'لماذا Intlayer؟',
        de: 'Warum Intlayer?',
        'en-GB': 'Why Intlayer ?',
        es: '¿Por qué Intlayer?',
        fr: 'Pourquoi Intlayer ?',
        'he-IL': 'למה Intlayer?',
        hi: 'Intlayer का क्यों लाभ',
        id: 'Mengapa Intlayer?',
        it: 'Perché Intlayer?',
        ja: 'なぜIntlayer？',
        ko: 'Intlayer의 이점',
        pl: 'Dlaczego Intlayer?',
        pt: 'Por que Intlayer?',
        ru: 'Почему Intlayer?',
        tr: 'Neden Intlayer?',
        uk: 'Чому Intlayer?',
        vi: 'Tại sao Intlayer?',
        zh: '为什么Intlayer？',
      }),
    },
  },
} satisfies Dictionary;

export default docDataContent;
