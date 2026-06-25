---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: RAG Güçlendirmeli Dokümantasyon Asistanı Oluşturma (Chunking, Embeddings ve Arama)
description: RAG Güçlendirmeli Dokümantasyon Asistanı Oluşturma (Chunking, Embeddings ve Arama)
keywords:
  - RAG
  - Dokümantasyon
  - Asistan
  - Chunking
  - Embeddings
  - Arama
slugs:
  - blog
  - rag-powered-documentation-assistant
author: aymericzip
---

# RAG Güçlendirmeli Dokümantasyon Asistanı Oluşturma (Chunking, Embeddings ve Arama)

## Ne Elde Ediyorsunuz

RAG güçlendirmeli bir dokümantasyon asistanı oluşturdum ve bunu hemen kullanabileceğiniz bir boilerplate haline getirdim.

- Hazır kullanıma sahip bir uygulama (Next.js + OpenAI API)
- Çalışan bir RAG pipeline'ı (chunking, embeddings, kosinüs benzerliği)
- React ile oluşturulmuş tam bir chatbot UI'si
- Tüm UI bileşenleri Tailwind CSS ile tamamen düzenlenebilir
- Eksik dokümanları, kullanıcı acı noktalarını ve ürün fırsatlarını belirlemeye yardımcı olmak için her kullanıcı sorgusunu günlüğe kaydeder

👉 [Canlı demo](https://intlayer.org/doc/why) 👉 [Kod boilerplate](https://github.com/aymericzip/smart_doc_RAG)

## Giriş

Eğer dokümantasyonlarda kaybolmuşsanız, bir cevap için sonsuzca kaydırma yaptığınızı biliyorsunuz, bu ne kadar acı verici olabilir. Dokümanlar yararlıdır, ama statiktirler ve arama yapmak genellikle hantaldır.

İşte burada **RAG (Retrieval-Augmented Generation)** devreye girer. Kullanıcıları metin içinde kazmaya zorlamak yerine, **retrieval** (dokümanın doğru kısımlarını bulma) ile **generation** (bir LLM'nin doğal olarak açıklaması) birleştirebiliriz.

Bu yazıda, RAG güçlendirmeli bir dokümantasyon chatbot'u nasıl oluşturduğumu ve bunun sadece kullanıcıların cevapları daha hızlı bulmasına yardımcı olmadığını, aynı zamanda ürün ekiplerine kullanıcı acı noktalarını anlamanın yeni bir yolunu verdiğini anlatacağım.

## Dokümantasyon İçin Neden RAG Kullanılır?

RAG, büyük dil modellerini gerçekten kullanışlı hale getirmenin en pratik yollarından biri olduğu için popüler bir yaklaşım haline geldi.

Dokümantasyon için faydalar nettir:

- Anında cevaplar: kullanıcılar doğal dilde sorar ve ilgili cevaplar alır.
- Daha iyi bağlam: model sadece en ilgili doküman bölümlerini görür, halüsinasyonları azaltır.
- İnsan gibi arama: Algolia + SSS + chatbot'un bir araya gelmiş hali gibi.
- Geri bildirim döngüsü: sorguları depolayarak kullanıcıların neyle mücadele ettiğini keşfedersiniz.

Bu son nokta çok önemlidir. Bir RAG sistemi sadece sorulara cevap vermez, insanlara ne sorduğunu söyler. Bu şu anlama gelir:

- Dokümanlarınızda eksik bilgileri keşfedersiniz.
- Özellik isteklerinin ortaya çıktığını görürsünüz.
- Hatta ürün stratejisini yönlendirebilecek kalıpları fark edersiniz.

Yani RAG sadece bir destek aracı değildir. Aynı zamanda bir **ürün keşif motoru**dur.

## RAG Pipeline'ı Nasıl Çalışır

![RAG Pipeline](https://github.com/aymericzip/intlayer/blob/main/docs/assets/rag_flow.svg)

Yüksek seviyede, kullandığım tarif şöyle:

1. **Dokümantasyonu chunking** Büyük Markdown dosyaları parçalara bölünür. Chunking, dokümantasyonun sadece ilgili kısımlarını bağlam olarak sağlamaya izin verir.
2. **Embeddings oluşturma** Her parça, OpenAI'nin embedding API'si (text-embedding-3-large) veya bir vektör veritabanı (Chroma, Qdrant, Pinecone) kullanarak bir vektöre dönüştürülür.
3. **İndeksleme ve depolama** Embeddings basit bir JSON dosyasında depolanır (demom için), ama üretimde muhtemelen bir vektör DB kullanırdınız.
4. **Retrieval (RAG'deki R)** Bir kullanıcı sorgusu gömülür, kosinüs benzerliği hesaplanır ve en üstteki eşleşen parçalar alınır.
5. **Augmentation + Generation (RAG'deki AG)** Bu parçalar ChatGPT için sistem prompt'una enjekte edilir, böylece model gerçek doküman bağlamıyla cevap verir.
6. **Geri bildirim için sorguları günlüğe kaydetme** Her kullanıcı sorgusu depolanır. Bu, acı noktaları, eksik dokümanları veya yeni fırsatları anlamak için altın değerindedir.

<Steps>

<Step number={1} title="Dokümanları Okuma">

İlk adım basitti: docs/ klasöründeki tüm .md dosyalarını tarayacak bir yol gerekiyordu. Node.js ve glob kullanarak, her Markdown dosyasının içeriğini belleğe aldım.

Bu, pipeline'ı esnek tutar: Markdown yerine, bir veritabanından, CMS'den veya hatta bir API'den dokümanları çekebilirsiniz.

</Step>

<Step number={2} title="Dokümantasyonu Chunking">

Neden chunking? Çünkü dil modellerinin **bağlam limitleri** vardır. Onlara bir kitap dolusu doküman beslemek işe yaramaz.

Yani fikri, metni yönetilebilir parçalara bölmektir (örneğin her biri 500 token) ve örtüşme ile (örneğin 100 token). Örtüşme, parça sınırlarında anlam kaybını önlemek için sürekliliği sağlar.

**Örnek:**

- Parça 1 → "…birçoğu tarafından unutulan eski kütüphane. Kule gibi rafları kitaplarla doluydu…"
- Parça 2 → "…raflar kitaplarla doluydu, her türlü türden kitaplar fısıldıyordu…"

Örtüşme, her iki parçanın paylaşılan bağlam içermesini sağlar, böylece retrieval tutarlı kalır.

Bu trade-off (parça boyutu vs örtüşme) RAG verimliliği için anahtardır:

- Çok küçük → gürültü alırsınız.
- Çok büyük → bağlam boyutunu patlatırsınız.

</Step>

<Step number={3} title="Embeddings Oluşturma">

Dokümanlar parçalandıktan sonra, **embeddings** oluştururuz, her parçayı temsil eden yüksek boyutlu vektörler.

OpenAI'nin text-embedding-3-large modelini kullandım, ama herhangi bir modern embedding modelini kullanabilirsiniz.

**Embedding örneği:**

```js
[
  -0.0002630692, -0.029749284, 0.010225477, -0.009224428, -0.0065269712,
  -0.002665544, 0.003214777, 0.04235309, -0.033162255, -0.00080789323,
  //...+1533 element
];
```

Her vektör, metnin matematiksel bir parmak izidir, benzerlik aramasını etkinleştirir.

</Step>

<Step number={4} title="Embeddings'i İndeksleme ve Depolama">

Embeddings'i birden fazla kez yeniden oluşturmamak için, onları embeddings.json'da depoladım.

Üretimde, muhtemelen bir vektör veritabanı istersiniz:

- Chroma
- Qdrant
- Pinecone
- FAISS, Weaviate, Milvus, vb.

Vektör DB'ler indeksleme, ölçeklenebilirlik ve hızlı arama ile ilgilenir. Ama prototipim için yerel JSON yeterliydi.

</Step>

<Step number={5} title="Kosinüs Benzerliği ile Retrieval">

Bir kullanıcı soru sorduğunda:

1. Sorgu için bir embedding oluştur.
2. Bunu tüm doküman embeddings'leriyle **kosinüs benzerliği** kullanarak karşılaştır.
3. Sadece en üstteki N en benzer parçayı tut.

Kosinüs benzerliği iki vektör arasındaki açıyı ölçer. Mükemmel bir eşleşme **1.0** puan alır.

Bu şekilde, sistem sorguya en yakın doküman pasajlarını bulur.

</Step>

<Step number={6} title="Augmentation + Generation">

Şimdi sihir geliyor. Üstteki parçaları ChatGPT için **sistem prompt**una enjekte ederiz.

Bu, modelin o parçalar konuşmanın bir parçasıymış gibi cevap vermesi anlamına gelir.

Sonuç: doğru, **doküman-temelli cevaplar**.

</Step>

<Step number={7} title="Kullanıcı Sorgularını Günlüğe Kaydetme">

Bu gizli süper güç.

Sorulan her soru depolanır. Zamanla, şunları içeren bir veri seti oluşturursunuz:

- En sık sorulan sorular (SSS için harika)
- Cevaplanmamış sorular (dokümanlar eksik veya belirsiz)
- Soru kılığına girmiş özellik istekleri ("X ile entegre olur mu?")
- Planlamadığınız yeni kullanım durumları

Bu, RAG asistanınızı **sürekli kullanıcı araştırma aracı**na dönüştürür.

</Step>

<Step number={8} title="Maliyeti Ne Kadar?">

RAG'ye karşı yaygın bir itiraz maliyet. Pratikte, şaşırtıcı derecede ucuz:

- ~200 doküman için embeddings oluşturmak yaklaşık **5 dakika** sürer ve **1–2 euro** maliyet eder.
- Doküman arama özelliği %100 ücretsiz.
- Sorgular için gpt-4o-latest'i "düşünme" modu olmadan kullanırız. Intlayer'da ayda yaklaşık **300 sohbet sorgusu** görüyoruz ve OpenAI API faturası nadiren **10$**ı aşar.

Buna barındırma maliyetini de ekleyebilirsiniz.

</Step>

<Step number={9} title="Uygulama Detayları">

Stack:

- Monorepo: pnpm workspace
- Doküman paketi: Node.js / TypeScript / OpenAI API
- Frontend: Next.js / React / Tailwind CSS
- Backend: Node.js API route / OpenAI API

@smart-doc/docs paketi, doküman işlemesini yöneten bir TypeScript paketidir. Bir markdown dosyası eklendiğinde veya değiştirildiğinde, paket her dilde doküman listesini yeniden oluşturmak, embeddings oluşturmak ve bunları embeddings.json dosyasında depolamak için bir build script'i içerir.

Frontend için, şunları sağlayan bir Next.js uygulaması kullanırız:

- Markdown'dan HTML'ye dönüştürme
- İlgili dokümanları bulmak için arama çubuğu
- Dokümanlar hakkında soru sormak için chatbot arayüzü

Bir doküman araması gerçekleştirmek için, Next.js uygulaması sorguyla eşleşen doküman parçalarını almak üzere @smart-doc/docs paketindeki bir fonksiyonu çağıran bir API route'u içerir. Bu parçaları kullanarak, kullanıcının aramasıyla ilgili doküman sayfalarının bir listesini döndürebiliriz.

Chatbot işlevselliği için, aynı arama sürecini takip ederiz ama ayrıca alınan doküman parçalarını ChatGPT'ye gönderilen prompt'a enjekte ederiz.

ChatGPT'ye gönderilen bir prompt örneği:

Sistem prompt'u:

```txt
Intlayer dokümantasyonu hakkında sorulara cevap verebilen yardımcı bir asistansınız.

İlgili parçalar:

-----
docName: "getting-started"
docChunk: "1/3"
docUrl: "https://example.com/docs/en/getting-started"
---

# Nasıl başlanır

...

-----
docName: "another-doc"
docChunk: "1/5"
docUrl: "https://example.com/docs/en/another-doc"
---

# Başka bir doküman

...
```

Kullanıcı sorgusu:

```txt
Nasıl başlanır?
```

API route'undan yanıtı akış için SSE kullanırız.

Bahsedildiği gibi, "düşünme" modu olmadan gpt-4-turbo'yu kullanırız. Yanıtlar ilgili ve gecikme düşük.
Gpt-5 ile denedik, ama gecikme çok yüksekti (bazen 15 saniyeye kadar bir yanıt). Ama gelecekte tekrar gözden geçireceğiz.

👉 [Demoyu burada deneyin](https://intlayer.org/doc/why) 👉 [GitHub'da kod şablonunu kontrol edin](https://github.com/aymericzip/smart_doc_RAG)

</Step>

</Steps>

## Sonuç

RAG, LLM'leri pratik hale getirmenin en basit, en güçlü yollarından biridir. **Retrieval + generation** birleştirerek, statik dokümanları **akıllı bir asistana** dönüştürebilir ve aynı zamanda sürekli ürün içgörüleri akışı elde edebilirsiniz.

Benim için bu proje, RAG'nin sadece bir teknik hile olmadığını gösterdi. Dokümantasyonu dönüştürmenin bir yolu:

- etkileşimli bir destek sistemi
- bir geri bildirim kanalı
- bir ürün strateji aracı

👉 [Demoyu burada deneyin](https://intlayer.org/doc/why) 👉 [GitHub'da kod şablonunu kontrol edin](https://github.com/aymericzip/smart_doc_RAG)

Ve eğer siz de RAG ile deneme yapıyorsanız, nasıl kullandığınızı duymak isterim.
