---
createdAt: 2025-03-17
updatedAt: 2025-09-22
title: Resmi VS Code Uzantısı
description: Geliştirme iş akışınızı geliştirmek için VS Code'da Intlayer uzantısını nasıl kullanacağınızı öğrenin. Yerelleştirilmiş içerikler arasında hızlıca gezin ve sözlüklerinizi verimli bir şekilde yönetin.
keywords:
  - VS Code Uzantısı
  - Intlayer
  - Yerelleştirme
  - Geliştirme Araçları
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# Resmi VS Code Uzantısı

## Genel Bakış

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension), projelerinizde yerelleştirilmiş içeriklerle çalışırken geliştirici deneyimini iyileştirmek için tasarlanmış **Intlayer**'ın resmi Visual Studio Code uzantısıdır.

![Intlayer VS Code Uzantısı](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Uzantı bağlantısı: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Özellikler

### Anında Gezinme

**Tanıma Git Desteği** – `useIntlayer` anahtarında `⌘ + Tıklama` (Mac) veya `Ctrl + Tıklama` (Windows/Linux) kullanarak ilgili içerik dosyasını anında açın.  
**Sorunsuz Entegrasyon** – **react-intlayer** ve **next-intlayer** projeleriyle sorunsuz çalışır.  
**Çok Dilli Destek** – Farklı dillerde yerelleştirilmiş içerikleri destekler.  
**VS Code Entegrasyonu** – VS Code’un gezinme ve komut paleti ile sorunsuz entegre olur.

### Sözlük Yönetim Komutları

İçerik sözlüklerinizi doğrudan VS Code’dan yönetin:

- **Sözlükleri Oluştur** – Proje yapınıza göre içerik dosyaları oluşturur.
- **Sözlükleri Gönder** – En son sözlük içeriğini deponuza yükler.
- **Sözlükleri Çek** – En son sözlük içeriğini deponuzdan yerel ortamınıza senkronize eder.
- **Sözlükleri Doldur** – Sözlükleri projenizden içerik ile doldurur.
- **Sözlükleri Test Et** – Eksik veya tamamlanmamış çevirileri tespit eder.

### İçerik Beyanı Oluşturucu

Farklı formatlarda yapılandırılmış sözlük dosyalarını kolayca oluşturun:

Eğer şu anda bir bileşen üzerinde çalışıyorsanız, sizin için `.content.{ts,tsx,js,jsx,mjs,cjs,json}` dosyasını oluşturacaktır.

Bileşen örneği:

```tsx fileName="src/components/MyComponent/index.tsx"
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("my-component");

  return <span>{myTranslatedContent}</span>;
};
```

TypeScript formatında oluşturulan dosya:

```tsx fileName="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "my-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

Mevcut formatlar:

- **TypeScript (`.ts`)**
- **ES Modülü (`.esm`)**
- **CommonJS (`.cjs`)**
- **JSON (`.json`)**

### Intlayer Sekmesi (Aktivite Çubuğu)

VS Code Aktivite Çubuğundaki Intlayer simgesine tıklayarak Intlayer sekmesini açın. Bu sekme iki görünüm içerir:

- **Arama**: Sözlükleri ve içeriklerini hızlıca filtrelemek için canlı bir arama çubuğu. Yazdıkça sonuçlar anında güncellenir.
- **Sözlükler**: Ortamlarınız/projeleriniz, sözlük anahtarları ve giriş sağlayan dosyaların ağaç görünümü. Şunları yapabilirsiniz:
  - Bir dosyaya tıklayarak düzenleyicide açabilirsiniz.
  - Araç çubuğunu kullanarak şu işlemleri yapabilirsiniz: Derle (Build), Çek (Pull), Gönder (Push), Doldur (Fill), Yenile (Refresh), Test Et (Test) ve Sözlük Dosyası Oluştur (Create Dictionary File).
  - Öğeye özel işlemler için bağlam menüsünü kullanabilirsiniz:
    - Bir sözlük üzerinde: Çek (Pull) veya Gönder (Push)
    - Bir dosya üzerinde: Sözlüğü Doldur (Fill Dictionary)
  - Düzenleyiciler arasında geçiş yaptığınızda, dosya bir sözlüğe aitse ağaç görünümü ilgili dosyayı gösterecektir.

## Kurulum

**Intlayer**'ı doğrudan VS Code Marketplace'ten yükleyebilirsiniz:

1. **VS Code**'u açın.
2. **Extensions Marketplace**'e gidin.
3. **"Intlayer"** için arama yapın.
4. **Install** (Yükle) butonuna tıklayın.

## Kullanım

### Hızlı Gezinme

1. **react-intlayer** kullanan bir projeyi açın.
2. `useIntlayer()` çağrısını bulun, örneğin:

   ```tsx
   const content = useIntlayer("app");
   ```

3. Anahtar üzerinde **Command-click** (`⌘+Click` macOS'ta) veya **Ctrl+Click** (Windows/Linux'ta) yapın (örneğin, `"app"`).
4. VS Code otomatik olarak ilgili sözlük dosyasını açacaktır, örneğin `src/app.content.ts`.

### İçerik Sözlüklerini Yönetme

### Intlayer Sekmesi (Activity Bar)

Sözlükleri gözden geçirmek ve yönetmek için yan sekmeyi kullanın:

- Activity Bar'daki Intlayer simgesini açın.
- **Arama** bölümünde, sözlükleri ve girdileri gerçek zamanlı olarak filtrelemek için yazın.
- **Sözlükler** bölümünde, ortamları, sözlükleri ve dosyaları gezinin. Araç çubuğunu Kullanarak Oluştur, Çek, Gönder, Doldur, Yenile, Test Et ve Sözlük Dosyası Oluştur işlemlerini yapabilirsiniz. Bağlam menüsü için sağ tıklayın (sözlüklerde Çek/Gönder, dosyalarda Doldur). Geçerli düzenleyici dosyası, uygun olduğunda ağaçta otomatik olarak gösterilir.

#### Sözlükleri Oluşturma

Tüm sözlük içerik dosyalarını oluşturmak için:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

**Sözlükleri Oluştur** komutunu arayın ve çalıştırın.

#### Sözlükleri Gönderme

En son sözlük içeriğini yüklemek için:

1. **Komut Paletini** açın.
2. **Sözlükleri Gönder** araması yapın.
3. Göndermek istediğiniz sözlükleri seçin ve onaylayın.

#### Sözlükleri Çekme

En son sözlük içeriğini senkronize edin:

1. **Komut Paletini** açın.
2. **Sözlükleri Çek** araması yapın.
3. Çekmek istediğiniz sözlükleri seçin.

#### Sözlükleri Doldurma

Sözlükleri projenizden gelen içerikle doldurun:

1. **Komut Paletini** açın.
2. **Sözlükleri Doldur** araması yapın.
3. Sözlükleri doldurmak için komutu çalıştırın.

#### Sözlükleri Test Etme

Sözlükleri doğrulayın ve eksik çevirileri bulun:

1. **Komut Paletini** açın.
2. **Sözlükleri Test Et** araması yapın.
3. Raporlanan sorunları inceleyin ve gerektiği şekilde düzeltin.

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
