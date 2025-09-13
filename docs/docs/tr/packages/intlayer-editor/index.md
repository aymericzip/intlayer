---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: intlayer-editor - Visual Translation Editor Package
description: Visual editor package for Intlayer providing an intuitive interface for managing translations and collaborative content editing with AI assistance.
keywords:
  - intlayer
  - editor
  - visual
  - translation
  - collaborative
  - AI
  - NPM
  - interface
slugs:
  - doc
  - package
  - intlayer-editor
---

# intlayer-editor: Intlayer görsel editörünü kullanmak için NPM Paketi

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, React ve Express.js gibi çerçevelerle uyumludur.

**`intlayer-editor`** paketi, Intlayer görsel editörünü React projenize entegre eden bir NPM paketidir.

## Intlayer Editor Nasıl Çalışır

Intlayer editörü, Intlayer uzak sözlüğü ile etkileşim kurmanıza izin verir. İstemci tarafında kurulabilir ve uygulamanızı, sitenizin içeriğini yapılandırılmış tüm dillerde yönetmek için CMS benzeri bir editöre dönüştürebilir.

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## Kurulum

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketi yükleyin:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### Yapılandırma

Intlayer yapılandırma dosyanızda, editör ayarlarını özelleştirebilirsiniz:

```typescript
const config: IntlayerConfig = {
  // ... diğer yapılandırma ayarları
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Eğer false ise, editör etkin değildir ve erişilemez.
    // İstemci kimliği ve istemci sırrı editörü etkinleştirmek için gereklidir.
    // İçeriği düzenleyen kullanıcıyı tanımlamaya izin verirler.
    // Yeni bir istemci oluşturarak Intlayer Dashboard - Projects'te (https://intlayer.org/dashboard/projects) elde edilebilirler.
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Eğer istemci kimliğiniz ve istemci sırrınız yoksa, [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects)'te yeni bir istemci oluşturarak elde edebilirsiniz.

> Tüm mevcut parametreleri görmek için, [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın

`intlayer-editor` paketi Intlayer'a dayanır ve React (Create React App), Vite + React ve Next.js gibi JavaScript uygulamaları için kullanılabilir.

Paketin nasıl kurulacağı hakkında daha fazla detay için aşağıdaki ilgili bölüme bakın:

### Next.js ile Entegrasyon

Next.js ile entegrasyon için, [kurulum kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md) bakın.

### Create React App ile Entegrasyon

Create React App ile entegrasyon için, [kurulum kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md) bakın

### Vite + React ile Entegrasyon

Vite + React ile entegrasyon için, [kurulum kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md) bakın

### Entegrasyon Örneği

Intlayer görsel editörünü React projenize entegre etmek için şu adımları takip edin:

- Intlayer editör bileşenini React uygulamanıza aktarın:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* Uygulamanızın içeriği burada */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Intlayer editör stillerini Next.js uygulamanıza aktarın:

  ```tsx fileName="src/app/[locale]/layout.jsx"
  import { IntlayerEditorStyles } from "intlayer-editor";

  export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    return (
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          <html lang={locale}>
            <body className={IntlayerEditorStyles}>{children}</body>
          </html>
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    );
  }
  ```

## Editörü Kullanma

Editör kurulduğunda, etkinleştirildiğinde ve başlatıldığında, imlecinizi içeriğinizin üzerine getirerek Intlayer tarafından indekslenen her alanı görüntüleyebilirsiniz.

![İçerik üzerinde gezinme](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

İçeriğinizin çevrelendiği takdirde, düzenleme çekmecesini görüntülemek için uzun basın.

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
