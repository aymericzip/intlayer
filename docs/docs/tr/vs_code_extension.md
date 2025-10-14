---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: Resmi VS Code Eklentisi
description: Geliştirme iş akışınızı geliştirmek için VS Code'da Intlayer eklentisinin nasıl kullanılacağını öğrenin. Yerelleştirilmiş içerikler arasında hızlıca gezin ve sözlüklerinizi verimli bir şekilde yönetin.
keywords:
  - VS Code Eklentisi
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
history:
  - version: 6.1.5
    date: 2025-09-30
    changes: Demo gif eklendi
  - version: 6.1.0
    date: 2025-09-24
    changes: Ortam seçimi bölümü eklendi
  - version: 6.0.0
    date: 2025-09-22
    changes: Intlayer Sekmesi / Doldur & Test komutları
  - version: 5.5.10
    date: 2025-06-29
    changes: Başlangıç geçmişi
---

# Resmi VS Code Eklentisi

## Genel Bakış

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension), projelerinizde yerelleştirilmiş içeriklerle çalışırken geliştirici deneyimini iyileştirmek için tasarlanmış **Intlayer**'ın resmi Visual Studio Code eklentisidir.

![Intlayer VS Code Eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif?raw=true)

Eklenti bağlantısı: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Özellikler

![Sözlükleri doldur](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **Anında Gezinme** – `useIntlayer` anahtarına tıkladığınızda doğru içerik dosyasına hızlıca atlayın.
- **Sözlükleri Doldur** – Projenizden içeriklerle sözlükleri doldurun.

![Komutları listele](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Intlayer Komutlarına Kolay Erişim** – İçerik sözlüklerini kolayca oluşturun, gönderin, çekin, doldurun ve test edin.

![İçerik dosyası oluştur](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **İçerik Beyanı Oluşturucu** – Sözlük içerik dosyalarını çeşitli formatlarda oluşturun (`.ts`, `.esm`, `.cjs`, `.json`).

![Sözlükleri test et](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **Sözlükleri Test Et** – Eksik çeviriler için sözlükleri test edin.

![Sözlüğü yeniden oluştur](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **Sözlüklerinizi güncel tutun** – Projenizden en son içeriklerle sözlüklerinizi güncel tutun.

![Intlayer Sekmesi (Aktivite Çubuğu)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Intlayer Sekmesi (Aktivite Çubuğu)** – Araç çubuğu ve bağlam eylemleri (Oluştur, Çek, Gönder, Doldur, Yenile, Test Et, Dosya Oluştur) ile özel bir yan sekmeden sözlükleri göz atın ve arayın.

## Kullanım

### Hızlı Navigasyon

1. **react-intlayer** kullanan bir projeyi açın.
2. Şu gibi bir `useIntlayer()` çağrısı bulun:

   ```tsx
   const content = useIntlayer("app");
   ```

3. Anahtar üzerinde **Command-click** (`⌘+Click` macOS'ta) veya **Ctrl+Click** (Windows/Linux'ta) yapın (örneğin, `"app"`).
4. VS Code otomatik olarak ilgili sözlük dosyasını açacaktır, örneğin `src/app.content.ts`.

### Intlayer Sekmesi (Aktivite Çubuğu)

Yan sekmeyi kullanarak sözlüklerde gezinin ve yönetin:

- Aktivite Çubuğunda Intlayer simgesini açın.
- **Arama** bölümünde, sözlükleri ve girdileri gerçek zamanlı olarak filtrelemek için yazın.
- **Sözlükler** bölümünde, ortamları, sözlükleri ve dosyaları göz atın. Araç çubuğunu kullanarak Oluştur, Çek, Gönder, Doldur, Yenile, Test Et ve Sözlük Dosyası Oluştur işlemlerini yapabilirsiniz. Bağlam eylemleri için sağ tıklayın (sözlüklerde Çek/Gönder, dosyalarda Doldur). Geçerli düzenleyici dosyası uygun olduğunda ağaçta otomatik olarak gösterilir.

### Komutlara Erişim

Komutlara **Komut Paleti** üzerinden erişebilirsiniz.

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **Sözlükleri Oluştur**
- **Sözlükleri Gönder**
- **Sözlükleri Çek**
- **Sözlükleri Doldur**
- **Sözlükleri Test Et**
- **Sözlük Dosyası Oluştur**

### Ortam Değişkenlerini Yükleme

Intlayer, AI API anahtarlarınızı ve ayrıca Intlayer istemci kimliği ile gizli anahtarınızı ortam değişkenlerinde saklamanızı önerir.

Eklenti, Intlayer komutlarını doğru bağlamda çalıştırmak için çalışma alanınızdan ortam değişkenlerini yükleyebilir.

- **Yükleme sırası (öncelik sırasına göre)**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **Yıkıcı olmayan**: mevcut `process.env` değerleri üzerine yazılmaz.
- **Kapsam**: dosyalar, yapılandırılmış temel dizinden çözülür (varsayılan olarak çalışma alanı kökü).

#### Aktif ortamı seçme

- **Komut Paleti**: paleti açın ve `Intlayer: Select Environment` komutunu çalıştırın, ardından ortamı seçin (örneğin, `development`, `staging`, `production`). Eklenti, yukarıdaki öncelik listesinde bulunan ilk uygun dosyayı yüklemeye çalışacak ve “.env.<env>.local dosyasından ortam yüklendi” gibi bir bildirim gösterecektir.
- **Ayarlar**: `Ayarlar → Eklentiler → Intlayer` yolunu izleyin ve şunları ayarlayın:
  - **Ortam**: `.env.<env>*` dosyalarını çözümlemek için kullanılan ortam adı.
  - (İsteğe bağlı) **Env Dosyası**: açıkça belirtilmiş bir `.env` dosyası yolu. Sağlandığında, çıkarılan listedeki dosyalardan öncelikli olarak kullanılır.

#### Monorepo ve özel dizinler

Eğer `.env` dosyalarınız çalışma alanı kökünün dışında bulunuyorsa, `Ayarlar → Eklentiler → Intlayer` yolunda **Temel Dizin**i ayarlayın. Yükleyici, `.env` dosyalarını bu dizine göre arayacaktır.
