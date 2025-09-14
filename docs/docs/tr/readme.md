<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Intlayer Logosu" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer : Yapay zeka destekli çeviri ve CMS ile açık kaynak, esnek i18n araç seti.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">Dokümanlar</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="npm sürümü" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub Yıldızları" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="aylık indirmeler" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="lisans"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="son commit"/>
  </a>
</p>

![Videoyu izleyin](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Başlarken-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Intlayer Nedir?

Çoğu i18n kütüphanesi ya çok karmaşık, çok katı ya da modern frameworkler için tasarlanmamıştır.

Intlayer, web ve mobil uygulamalar için **modern bir i18n çözümüdür**.  
Framework bağımsızdır, **yapay zeka desteklidir** ve ücretsiz bir **CMS & görsel editör** içerir.

**Her dil için ayrı içerik dosyaları**, **TypeScript otomatik tamamlama**, **ağaç sallanabilir sözlükler** ve **CI/CD entegrasyonu** ile Intlayer, uluslararasılaştırmayı **daha hızlı, daha temiz ve daha akıllı** hale getirir.

## Intlayer'ın Temel Faydaları:

| Özellik                                                                                                                                             | Açıklama                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Özellik" width="700">                          | **Çapraz Framework Desteği**<br><br>Intlayer, Next.js, React, Vite, Vue.js, Nuxt, Preact, Express ve daha fazlası dahil olmak üzere tüm büyük frameworkler ve kütüphanelerle uyumludur.                                                                                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true" alt="Özellik" width="700">       | **JavaScript Destekli İçerik Yönetimi**<br><br>İçeriğinizi tanımlamak ve verimli bir şekilde yönetmek için JavaScript'in esnekliğinden yararlanın. <br><br> - [İçerik bildirimi](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Özellik" width="700"> | **Yerel Bazlı İçerik Bildirim Dosyası**<br><br>Otomatik oluşturma öncesinde içeriğinizi bir kez bildirerek geliştirme sürecinizi hızlandırın.<br><br> - [Yerel Bazlı İçerik Bildirim Dosyası](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Özellik" width="700">                      | **Tip Güvenli Ortam**<br><br>İçerik tanımlarınızın ve kodunuzun hatasız olmasını sağlamak için TypeScript'ten yararlanın ve aynı zamanda IDE otomatik tamamlama özelliğinin avantajlarından faydalanın.<br><br> - [TypeScript yapılandırması](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Özellik" width="700">                         | **Basitleştirilmiş Kurulum**<br><br>Minimum yapılandırma ile hızlıca çalışmaya başlayın. Uluslararasılaştırma, yönlendirme, yapay zeka, derleme ve içerik yönetimi ayarlarını kolayca yapın.<br><br> - [Next.js entegrasyonunu keşfedin](https://intlayer.org/doc/environment/nextjs)                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Özellik" width="700">                   | **Basitleştirilmiş İçerik Alma**<br><br>Her içerik parçası için `t` fonksiyonunuzu çağırmanıza gerek yok. Tüm içeriğinizi tek bir hook kullanarak doğrudan alın.<br><br> - [React entegrasyonu](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Özellik" width="700">                    | **Tutarlı Sunucu Bileşeni Uygulaması**<br><br>Next.js sunucu bileşenleri için mükemmel uyumlu, hem istemci hem de sunucu bileşenleri için aynı uygulamayı kullanın, `t` fonksiyonunuzu her sunucu bileşenine geçirmek zorunda değilsiniz. <br><br> - [Sunucu Bileşenleri](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Özellik" width="700">                           | **Düzenli Kod Tabanı**<br><br>Kod tabanınızı daha düzenli tutun: 1 bileşen = aynı klasörde 1 sözlük. Çeviriler, ilgili bileşenlere yakın tutulur, bu da bakım kolaylığını ve açıklığı artırır. <br><br> - [Intlayer nasıl çalışır](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Özellik" width="700">                         | **Gelişmiş Yönlendirme**<br><br>Next.js, React, Vite, Vue.js vb. için karmaşık uygulama yapısına sorunsuz uyum sağlayarak uygulama yönlendirmesini tam destekler.<br><br> - [Next.js entegrasyonunu keşfedin](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Özellik" width="700">                            | **Markdown Desteği**<br><br>Gizlilik politikaları, dokümantasyon gibi çok dilli içerikler için yerel dosyaları ve uzak Markdown dosyalarını içe aktarır ve yorumlar. Markdown meta verilerini yorumlayarak kodunuzda erişilebilir hale getirir.<br><br> - [İçerik dosyaları](https://intlayer.org/doc/concept/content/file)                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Özellik" width="700">                       | **Ücretsiz Görsel Editör ve CMS**<br><br>İçerik yazarları için ücretsiz bir görsel editör ve CMS mevcuttur, böylece bir yerelleştirme platformuna ihtiyaç kalmaz. İçeriğinizi Git kullanarak senkronize tutun veya CMS ile tamamen ya da kısmen dışa aktarın.<br><br> - [Intlayer Editör](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Özellik" width="700">                              | **Ağaç Sarsılabilir İçerik**<br><br>Son paket boyutunu azaltan ağaç sarsılabilir içerik. Her bileşen için içerik yükler, kullanılmayan içeriği paketten hariç tutar. Uygulama yükleme verimliliğini artırmak için tembel yüklemeyi destekler. <br><br> - [Uygulama derleme optimizasyonu](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Özellik" width="700">                    | **Statik Renderlama**<br><br>Statik renderlamayı engellemez. <br><br> - [Next.js entegrasyonu](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Özellik" width="700">                      | **Yapay Zeka Destekli Çeviri**<br><br>Kendi yapay zeka sağlayıcınız / API anahtarınızı kullanarak Intlayer'ın gelişmiş yapay zeka destekli çeviri araçları ile web sitenizi sadece bir tıklamayla 231 dile dönüştürün. <br><br> - [CI/CD entegrasyonu](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Otomatik doldurma](https://intlayer.org/doc/concept/auto-fill) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Özellik" width="700">                                 | **MCP Sunucu Entegrasyonu**<br><br>IDE otomasyonu için bir MCP (Model Context Protocol) sunucusu sağlar, böylece içerik yönetimi ve i18n iş akışlarını doğrudan geliştirme ortamınızda sorunsuz bir şekilde gerçekleştirmenizi sağlar. <br><br> - [MCP Sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Özellik" width="700">                    | **VSCode Eklentisi**<br><br>Intlayer, içeriklerinizi ve çevirilerinizi yönetmenize yardımcı olmak için bir VSCode eklentisi sunar; sözlüklerinizi oluşturabilir, içeriklerinizi çevirebilir ve daha fazlasını yapabilirsiniz. <br><br> - [VSCode Eklentisi](https://intlayer.org/doc/vs-code-extension)                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Özellik" width="700">                    | **Birlikte Çalışabilirlik**<br><br>react-i18next, next-i18next, next-intl ve react-intl ile birlikte çalışabilirliği sağlar. <br><br> - [Intlayer ve react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer ve next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer ve next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                    |

---

## 📦 Kurulum

Bugün Intlayer ile yolculuğunuza başlayın ve uluslararasılaştırmada daha akıcı, daha güçlü bir yaklaşım deneyimleyin.

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ Hızlı Başlangıç (Next.js)

```ts
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const Component = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> Tam rehberi al → </a>

## 🎥 YouTube'da Canlı Eğitim

[![Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## İçindekiler

Intlayer ile başlamanıza yardımcı olacak kapsamlı dokümantasyonumuzu keşfedin ve projelerinize nasıl entegre edeceğinizi öğrenin.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Başlarken</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">Neden Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc">Giriş</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Kavram</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">Intlayer Nasıl Çalışır</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">Yapılandırma</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">Yapay Zeka sağlayıcısı</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Intlayer Editör</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">Sözlük</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">Yerel Bazlı İçerik Beyan Dosyası</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">Çeviri</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">Numaralandırma</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">Koşul</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">İç İçe Geçirme</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">Fonksiyon Çağırma</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">Ekleme</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">Dosya</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Ortam</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">Next.js 15 ile Intlayer</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js Sayfa Yönlendiricisi</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">Tanstack başlangıç</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo">React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/lynx-and-react">Lynx + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte">Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact">Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue">Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt">Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid">Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular">Angular</a></li>
  <li><a href="https://intlayer.org/doc/environment/express">Express</a></li>
  <li><a href="https://intlayer.org/doc/environment/nest">NestJS</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Blog</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md">i18n Nedir</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">i18n ve SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">Intlayer ve i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">Intlayer ve react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">Intlayer ve next-intl</a></li>
</ul>
</details>

## 🌐 Diğer dillerde Readme

[English](https://github.com/aymericzip/intlayer/blob/main/readme.md) •
[简体中文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md) •
[Русский](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md) •
[日本語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md) •
[Français](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md) •
[한국어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md) •
[Español](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md) •
[Deutsch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md) •
[العربية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md) •
[Italiano](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md) •
[English (UK)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md) •
[Português](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md) •
[हिन्दी](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md)
[Türkçe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md)

## 🤝 Topluluk

Intlayer, topluluk ile ve topluluk için oluşturuldu ve görüşlerinizi duymak isteriz!

- Bir öneriniz mi var? [Bir sorun açın](https://github.com/aymericzip/intlayer/issues)
- Bir hata veya geliştirme mi buldunuz? [Bir PR gönderin](https://github.com/aymericzip/intlayer/pulls)
- Yardıma mı ihtiyacınız var veya bağlantı kurmak mı istiyorsunuz? [Discord'umuza katılın](https://discord.gg/7uxamYVeCk)

Bizi ayrıca şu platformlarda da takip edebilirsiniz:

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer Facebook" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### Katkıda Bulunma

Bu projeye katkıda bulunmak için daha ayrıntılı yönergeler için lütfen [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md) dosyasına bakınız. Bu dosya, geliştirme sürecimiz, commit mesajı kuralları ve sürüm prosedürleri hakkında temel bilgileri içerir. Katkılarınız bizim için değerlidir ve bu projeyi daha iyi hale getirmek için gösterdiğiniz çabayı takdir ediyoruz!

### Destek İçin Teşekkürler

Eğer Intlayer'ı beğendiyseniz, GitHub'da bize bir ⭐ verin. Bu, başkalarının projeyi keşfetmesine yardımcı olur!

[![Yıldız Geçmişi Grafiği](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
