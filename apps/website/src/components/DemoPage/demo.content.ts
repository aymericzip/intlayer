import { md, t, type Dictionary } from 'intlayer';

const demoContent = {
  key: 'demo-page',
  content: {
    title: t({
      fr: 'Essayez le nouvel éditeur visuel Intlayer',
      en: 'Try the new Intlayer visual editor',
      es: 'Pruebe el nuevo editor visual de Intlayer',
      'en-GB': 'Try the new Intlayer visual editor',
      de: 'Versuchen Sie den neuen Intlayer-Visual-Editor',
      ja: '新しいIntlayerビジュアルエディターをお試しください',
      ko: '새로운 Intlayer 비주얼 편집기를 사용해 보세요',
      zh: '尝试新的 Intlayer 可视化编辑器',
      it: 'Prova il nuovo editor visivo di Intlayer',
      pt: 'Experimente o novo editor visual do Intlayer',
      hi: 'Intlayer दृश्य संपादक को आजमाएँ',
      ar: 'جرّب محرر Intlayer المرئي الجديد',
      ru: 'Попробуйте новый визуальный редактор Intlayer',
    }),
    landingParagraph: t({
      en: md(
        '- **Delegate content management to your teams** by transforming your application into a CMS with a single click.\n' +
          '- **Simplify content formatting** with Markdown support, making it easier to structure and style your content.\n' +
          '- **Boost your productivity with AI**, leveraging smart suggestions and automation to streamline content creation.\n' +
          '- **Support multiple languages** effortlessly, ensuring seamless localization for global audiences.'
      ),
      'en-GB': md(
        '- **Delegate content management to your teams** by transforming your application into a CMS with a single click.\n' +
          '- **Simplify content formatting** with Markdown support, making it easier to structure and style your content.\n' +
          '- **Boost your productivity with AI**, leveraging smart suggestions and automation to streamline content creation.\n' +
          '- **Support multiple languages** effortlessly, ensuring seamless localization for global audiences.'
      ),
      fr: md(
        '- **Déléguez la gestion de contenu à vos équipes** en transformant votre application en CMS avec un seul clic.\n' +
          '- **Simplifiez la mise en forme du contenu** avec le support Markdown, facilitant la structure et la mise en forme de votre contenu.\n' +
          "- **Améliorez votre productivité avec l'IA**, en utilisant des suggestions intelligentes et une automatisation pour streamliner la création de contenu.\n" +
          '- **Soutenez plusieurs langues** de manière fluide, garantissant une localisation fluide pour les audiences mondiales.'
      ),
      es: md(
        '- **Delegar la gestión de contenido a tus equipos** transformando tu aplicación en CMS con un solo clic.\n' +
          '- **Simplificar el formato de contenido** con el soporte de Markdown, haciendo que sea más fácil estructurar y dar estilo a tu contenido.\n' +
          '- **Mejora tu productividad con la IA**, aprovechando sugerencias inteligentes y automatización para simplificar la creación de contenido.\n' +
          '- **Soporte múltiples idiomas** de forma fluida, garantizando localización fluida para audiencias globales.'
      ),
      de: md(
        '- **Delegieren Sie die Inhaltsverwaltung an Ihre Teams**, indem Sie Ihre Anwendung in ein CMS umwandeln, indem Sie einen Klick machen.\n' +
          '- **Vereinfachen Sie die Inhaltsformatierung** mit Markdown-Unterstützung, um die Struktur und das Formatieren Ihres Inhalts einfacher zu machen.\n' +
          '- **Steigern Sie Ihre Produktivität mit AI**, indem Sie intelligente Vorschläge und Automatisierung nutzen, um den Inhaltsbearbeitungsprozess zu vereinfachen.\n' +
          '- **Unterstützen Sie mehrere Sprachen** effizient, um eine nahtlose Lokalisierung für globale Zielgruppen sicherzustellen.'
      ),
      ja: md(
        '- **コンテンツ管理をチームに委任** し、アプリケーションをワンクリックでCMSに変換します。\n' +
          '- **Markdown サポートによるコンテンツのフォーマットの簡素化** により、コンテンツの構造化とスタイル付けが容易になります。\n' +
          '- **AIを活用して生産性を向上** させ、スマートな提案と自動化によりコンテンツ作成を効率化します。\n' +
          '- **複数の言語を簡単にサポート** し、グローバルなオーディエンス向けのシームレスなローカライズを実現します。'
      ),
      ko: md(
        '- **콘텐츠 관리를 팀에 위임**하여 한 번의 클릭으로 애플리케이션을 CMS로 변환하세요.\n' +
          '- **Markdown 지원으로 콘텐츠 서식을 간소화**하여 구조화 및 스타일링을 쉽게 할 수 있습니다.\n' +
          '- **AI를 활용하여 생산성을 향상**시키고, 스마트 제안 및 자동화를 통해 콘텐츠 제작을 간소화하세요.\n' +
          '- **여러 언어를 쉽게 지원**하여 글로벌 오디언스를 위한 원활한 현지화를 보장합니다。'
      ),
      zh: md(
        '- **将内容管理委托给您的团队**，只需点击一下，即可将您的应用程序转换为CMS。\n' +
          '- **利用Markdown支持简化内容格式**，轻松结构化和美化您的内容。\n' +
          '- **借助AI提高您的生产力**，利用智能建议和自动化来简化内容创建。\n' +
          '- **轻松支持多种语言**，确保全球受众的无缝本地化。'
      ),
      it: md(
        '- **Delega la gestione dei contenuti ai tuoi team** trasformando la tua applicazione in un CMS con un solo clic.\n' +
          '- **Semplifica la formattazione dei contenuti** con il supporto Markdown, rendendo più facile strutturare e stilizzare i tuoi contenuti.\n' +
          "- **Aumenta la tua produttività con l'IA**, sfruttando suggerimenti intelligenti e automazione per semplificare la creazione di contenuti.\n" +
          '- **Supporta più lingue** in modo fluido, garantendo una localizzazione senza interruzioni per un pubblico globale。'
      ),
      pt: md(
        '- **Delegue a gestão de conteúdo para suas equipes** transformando seu aplicativo em um CMS com um único clique.\n' +
          '- **Simplifique a formatação de conteúdo** com suporte a Markdown, facilitando a estruturação e o estilo do seu conteúdo.\n' +
          '- **Aumente sua produtividade com IA**, aproveitando sugestões inteligentes e automação para simplificar a criação de conteúdo.\n' +
          '- **Suporte vários idiomas** sem esforço, garantindo uma localização perfeita para públicos globais。'
      ),
      hi: md(
        '- **अपनी टीमों को सामग्री प्रबंधन सौंपें** और अपनी एप्लिकेशन को केवल एक क्लिक में CMS में बदलें।\n' +
          '- **Markdown समर्थन के साथ सामग्री प्रारूपण को सरल बनाएं**, जिससे आपकी सामग्री को संरचित और शैलीबद्ध करना आसान हो जाता है।\n' +
          '- **AI की मदद से अपनी उत्पादकता बढ़ाएं**, स्मार्ट सुझावों और स्वचालन का उपयोग करके सामग्री निर्माण को सुचारू बनाएं।\n' +
          '- **कई भाषाओं का समर्थन करें** और वैश्विक दर्शकों के लिए निर्बाध स्थानीयकरण सुनिश्चित करें।'
      ),
      ar: md(
        '- **قم بتفويض إدارة المحتوى إلى فرقك** عن طريق تحويل تطبيقك إلى نظام إدارة محتوى بنقرة واحدة.\n' +
          '- **قم بتبسيط تنسيق المحتوى** من خلال دعم Markdown، مما يسهل تنظيم وتنسيق المحتوى الخاص بك.\n' +
          '- **عزز إنتاجيتك باستخدام الذكاء الاصطناعي**، مستفيدًا من الاقتراحات الذكية والأتمتة لتبسيط إنشاء المحتوى.\n' +
          '- **ادعم لغات متعددة** بسهولة، مما يضمن التوطين السلس للجماهير العالمية。'
      ),
      ru: md(
        '- **Делегируйте управление контентом своим командам**, превратив свое приложение в CMS одним кликом.\n' +
          '- **Упрощайте форматирование контента** с поддержкой Markdown, что делает структуру и стилизацию вашего контента проще.\n' +
          '- **Повышайте свою продуктивность с AI**, используя интеллектуальные предложения и автоматизацию для упрощения создания контента.\n' +
          '- **Поддерживайте несколько языков** без усилий, обеспечивая плавную локализацию для глобальной аудитории。'
      ),
    }),

    imageAlt: t({
      fr: "Capture d'écran de l'éditeur Intlayer",
      en: 'Screenshot of the Intlayer editor',
      es: 'Captura de pantalla del editor de Intlayer',
      'en-GB': 'Screenshot of the Intlayer editor',
      de: 'Screenshot des Intlayer-Editors',
      ja: 'Intlayerエディターのスクリーンショット',
      ko: 'Intlayer 편집기의 스크린샷',
      zh: 'Intlayer编辑器的截图',
      it: 'Screenshot dell`editor di Intlayer',
      pt: 'Captura de tela do editor Intlayer',
      hi: 'Intlayer संपादक का स्क्रीनशॉट',
      ar: 'لقطة شاشة لمحرر Intlayer',
      ru: 'Скриншот редактора Intlayer',
    }),

    tutoParagraphs: [
      {
        title: t({
          fr: 'Sélectionnez le contenu à modifier',
          en: 'Hover the content to be modified',
          es: 'Pase el cursor sobre el contenido a modificar',
          'en-GB': 'Hover the content to be modified',
          de: 'Fahren Sie mit der Maus über den zu ändernden Inhalt',
          ja: '変更するコンテンツにカーソルを合わせてください',
          ko: '수정할 콘텐츠 위로 마우스를 올리세요',
          zh: '将鼠标悬停在要修改的内容上',
          it: 'Passa il mouse sul contenuto da modificare',
          pt: 'Passe o mouse sobre o conteúdo a ser modificado',
          hi: 'संशोधित करने के लिए सामग्री पर होवर करें',
          ar: 'ضع المؤشر على المحتوى الذي تريد تعديله',
          ru: 'Наведите курсор на содержимое, которое нужно изменить',
        }),
        description: t({
          fr: "Exercez un clic prolongé pour faire apparaître l'éditeur visuel. Le panneau d'édition s'étend de la droite et met en évidence le contenu sélectionné pour édition.",
          en: 'Press and hold to make the visual editor appear. The editing panel extends from the right, highlighting the content selected for editing.',
          es: 'Mantenga presionado para que aparezca el editor visual. El panel de edición se extiende desde la derecha y resalta el contenido seleccionado para editar.',
          'en-GB':
            'Press and hold to make the visual editor appear. The editing panel extends from the right, highlighting the content selected for editing.',
          de: 'Drücken und halten, um den visuellen Editor erscheinen zu lassen. Das Bearbeitungsfeld erweitert sich von rechts und hebt den zum Bearbeiten ausgewählten Inhalt hervor.',
          ja: '長押ししてビジュアルエディターを表示します。編集パネルは右側から拡張され、編集のために選択された内容を強調表示します。',
          ko: '비주얼 편집기를 표시하려면 누르고 있는 동안 유지하세요. 편집 패널이 오른쪽에서 확장되어 편집할 내용을 강조 표시합니다.',
          zh: '按住以显示可视编辑器。编辑面板从右侧扩展，突出显示选择的内容以进行编辑。',
          it: "Premere e tenere premuto per far apparire l'editor visivo. Il pannello di modifica si estende da destra ed evidenzia il contenuto selezionato per la modifica.",
          pt: 'Pressione e segure para fazer o editor visual aparecer. O painel de edição se estende da direita, destacando o conteúdo selecionado para edição.',
          hi: 'विज़ुअल संपादक को प्रदर्शित करने के लिए लंबे समय तक दबाएं। संपादन पैनल दाईं ओर से बढ़ता है, संपादन के लिए चयनित सामग्री को उजागर करता है।',
          ar: 'اضغط مع الاستمرار لإظهار المحرر المرئي. يمتد لوحة التحرير من اليمين ويبرز المحتوى المحدد للتعديل.',
          ru: 'Нажмите и удерживайте, чтобы визуальный редактор появился. Панель редактирования расширяется справа, выделяя контент, выбранный для редактирования.',
        }),
      },
      {
        title: t({
          fr: 'Faites vos modifications en remplaçant le texte concerné',
          en: 'Make your modifications by replacing the relevant text',
          es: 'Realice sus modificaciones reemplazando el texto correspondiente',
          'en-GB': 'Make your modifications by replacing the relevant text',
          de: 'Ändern Sie Ihre Inhalte, indem Sie den entsprechenden Text ersetzen',
          ja: '関連するテキストを置き換えて変更を加えてください',
          ko: '해당 텍스트를 대체하여 변경을 수행하세요',
          zh: '通过替换相关文本来进行修改',
          it: 'Effettua le tue modifiche sostituendo il testo pertinente',
          pt: 'Faça suas modificações substituindo o texto relevante',
          hi: 'संशोधित करने के लिए प्रासंगिक पाठ को बदलकर अपने संशोधन करें',
          ar: 'قم بإجراء التعديلات عن طريق استبدال النص المعني',
          ru: 'Вносите изменения, заменяя соответствующий текст',
        }),
        description: t({
          fr: "Le texte mis en évidence dans le panneau d'édition peut être modifié ou remplacé à guise. Les modifications apparaîtront instantanément sur la page principale, facilitant la révision du contenu. Pour annuler les changements apportés, cliquez sur la croix.",
          en: 'The highlighted text in the editing panel can be modified or replaced at will. The changes will appear instantly on the main page, making it easy to review the content. To undo the changes made, click on the cross.',
          es: 'El texto resaltado en el panel de edición puede modificarse o reemplazarse a voluntad. Los cambios aparecerán instantáneamente en la página principal, facilitando la revisión del contenido. Para deshacer los cambios realizados, haga clic en la cruz.',
          'en-GB':
            'The highlighted text in the editing panel can be modified or replaced at will. The changes will appear instantly on the main page, making it easy to review the content. To undo the changes made, click on the cross.',
          de: 'Der hervorgehobene Text im Bearbeitungsfeld kann nach Belieben geändert oder ersetzt werden. Die Änderungen werden sofort auf der Hauptseite angezeigt, was die Überprüfung des Inhalts erleichtert. Um die Änderungen rückgängig zu machen, klicken Sie auf das Kreuz.',
          ja: '編集パネル内のハイライトされたテキストは、お好みで変更または置き換えることができます。変更は、メインページに瞬時に表示され、コンテンツのレビューが容易になります。行った変更を元に戻すには、×をクリックします。',
          ko: '편집 패널에서 강조 표시된 텍스트는 원하는 대로 수정하거나 대체할 수 있습니다. 변경 사항은 메인 페이지에 즉시 나타나므로 콘텐츠 검토가 용이합니다. 변경 사항을 취소하려면 X를 클릭하세요.',
          zh: '编辑面板中突出显示的文本可以随意修改或替换。更改将立即出现在主页面上，使内容审查变得容易。要撤消所做的更改，单击叉号。',
          it: 'Il testo evidenziato nel pannello di modifica può essere modificato o sostituito a piacere. Le modifiche appariranno istantaneamente sulla pagina principale, facilitando la revisione del contenuto. Per annullare le modifiche apportate, fare clic sulla croce.',
          pt: 'O texto destacado no painel de edição pode ser modificado ou substituído à vontade. As alterações aparecerão instantaneamente na página principal, facilitando a revisão do conteúdo. Para desfazer as alterações feitas, clique na cruz.',
          hi: 'संपादन पैनल में हाइलाइट किया गया पाठ को इच्छानुसार संशोधित या प्रतिस्थापित किया जा सकता है। परिवर्तन मुख्य पृष्ठ पर तुरंत दिखाई देंगे, जिससे सामग्री की समीक्षा करना आसान हो जाएगा। किए गए परिवर्तनों को रद्द करने के लिए, क्रॉस पर क्लिक करें।',
          ar: 'يمكن تعديل أو استبدال النص المميز في لوحة التحرير حسب الرغبة. ستظهر التغييرات على الفور على الصفحة الرئيسية، مما يسهل مراجعة المحتوى. للتراجع عن التغييرات التي أجريتها، انقر فوق علامة الإغلاق.',
          ru: 'Выделенный текст на панели редактирования можно изменять или заменять по желанию. Изменения появятся мгновенно на главной странице, что упростит обзор контента. Чтобы отменить внесенные изменения, нажмите на крестик.',
        }),
      },
      {
        title: t({
          fr: 'Validez vos changements',
          en: 'Confirm your changes',
          es: 'Confirme sus cambios',
          'en-GB': 'Confirm your changes',
          de: 'Bestätigen Sie Ihre Änderungen',
          ja: '変更を確認してください',
          ko: '변경 사항을 확인하세요',
          zh: '确认您的更改',
          it: 'Conferma le tue modifiche',
          pt: 'Confirme suas alterações',
          hi: 'अपनी संशोधन की पुष्टि करें',
          ar: 'أكد تغييراتك',
          ru: 'Подтвердите ваши изменения',
        }),
        description: t({
          fr: 'Une fois vos changements effectués, validez les modifications apportées au champ concerné, puis validez les changements apportés au dictionnaire. Lorsque les changements apportés au dictionnaire sont validés, Intlayer écrira les modifications dans le fichier concerné.',
          en: 'Once your changes are made, validate the modifications made to the relevant field, then confirm the changes made to the dictionary. When the changes to the dictionary are validated, Intlayer will write the modifications to the relevant file.',
          es: 'Una vez realizados los cambios, valide las modificaciones hechas en el campo correspondiente, luego confirme los cambios hechos en el diccionario. Cuando se validen los cambios en el diccionario, Intlayer escribirá las modificaciones en el archivo correspondiente.',
          'en-GB':
            'Once your changes are made, validate the modifications made to the relevant field, then confirm the changes made to the dictionary. When the changes to the dictionary are validated, Intlayer will write the modifications to the relevant file.',
          de: 'Sobald Sie Ihre Änderungen vorgenommen haben, bestätigen Sie die im relevanten Feld vorgenommenen Änderungen, und bestätigen Sie dann die im Wörterbuch vorgenommenen Änderungen. Wenn die Änderungen am Wörterbuch validiert sind, schreibt Intlayer die Änderungen in die betreffende Datei.',
          ja: '変更を行ったら、関連フィールドでの変更を確認し、辞書に加えられた変更を確認します。辞書に対する変更が確認されると、Intlayerは変更を該当ファイルに書き込みます。',
          ko: '변경을 완료한 후 관련 필드의 변경 사항을 확인한 다음 사전에 적용된 변경 사항을 확인하십시오. 사전에 대한 변경 사항이 확인되면 Intlayer는 변경 사항을 해당 파일에 작성합니다.',
          zh: '完成更改后，确认对相关字段所做的修改，然后确认对字典所做的更改。当对字典所做的更改被确认后，Intlayer将把这些修改写入相关文件。',
          it: 'Una volta apportate le modifiche, convalida le modifiche apportate al campo pertinente e poi conferma le modifiche apportate al dizionario. Quando le modifiche apportate al dizionario sono confermate, Intlayer scriverà le modifiche nel file pertinente.',
          pt: 'Uma vez feitas suas alterações, valide as modificações feitas no campo relevante e, em seguida, confirme as alterações feitas no dicionário. Quando as alterações no dicionário forem validadas, o Intlayer escreverá as modificações no arquivo relevante.',
          hi: 'एक बार जब आप अपनी परिवर्तनों को बनाते हैं, तो संबंधित क्षेत्र में किए गए परिवर्तनों को मान्य करें, फिर शब्दकोश में किए गए परिवर्तनों की पुष्टि करें। जब शब्दकोश में किए गए परिवर्तनों को मान्य किया जाता है, तो Intlayer संशोधन को संबंधित फ़ाइल में लिखेगा।',
          ar: 'بمجرد إجراء تغييراتك، قم بالتحقق من التعديلات التي أجريت على الحقل المعني، ثم أكد التغييرات التي تم إجراؤها على القاموس. عندما يتم التحقق من التغييرات التي تم إجراؤها على القاموس، ستقوم Intlayer بكتابة التعديلات في الملف المعني.',
          ru: 'После внесения изменений подтвердите изменения, внесенные в соответствующее поле, затем подтвердите изменения, внесенные в словарь. Когда изменения в словаре будут подтверждены, Intlayer запишет изменения в соответствующий файл.',
        }),
      },
    ],

    tryItByYourself: {
      title: t({
        fr: 'Essayez-le par vous-même',
        en: 'Try it by yourself',
        es: 'Pruébelo usted mismo',
        'en-GB': 'Try it by yourself',
        de: 'Probieren Sie es selbst aus',
        ja: '自分で試してみてください',
        ko: '직접 시도해 보세요',
        zh: '自己尝试一下',
        it: 'Provalo tu stesso',
        pt: 'Experimente você mesmo',
        hi: 'इसे स्वयं आजमाएँ',
        ar: 'جربه بنفسك',
        ru: 'Попробуйте это самостоятельно',
      }),
    },
  },
} satisfies Dictionary;

export default demoContent;
