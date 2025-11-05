---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: Membangun Asisten Dokumentasi Bertenaga RAG (Chunking, Embeddings, dan Pencarian)
description: Membangun Asisten Dokumentasi Bertenaga RAG (Chunking, Embeddings, dan Pencarian)
keywords:
  - RAG
  - Dokumentasi
  - Asisten
  - Chunking
  - Embeddings
  - Pencarian
slugs:
  - blog
  - rag-powered-documentation-assistant
---

# Membangun Asisten Dokumentasi Bertenaga RAG (Chunking, Embeddings, dan Pencarian)

## Apa yang Anda dapatkan

Saya membangun asisten dokumentasi bertenaga RAG dan mengemasnya menjadi boilerplate yang dapat Anda gunakan segera.

- Dilengkapi dengan aplikasi siap pakai (Next.js + OpenAI API)
- Termasuk pipeline RAG yang berfungsi (chunking, embeddings, cosine similarity)
- Menyediakan UI chatbot lengkap yang dibangun dengan React
- Semua komponen UI sepenuhnya dapat diedit dengan Tailwind CSS
- Mencatat setiap kueri pengguna untuk membantu mengidentifikasi dokumen yang hilang, titik sakit pengguna, dan peluang produk

👉 [Demo langsung](https://intlayer.org/doc/why) 👉 [Boilerplate kode](https://github.com/aymericzip/smart_doc_RAG)

## Pendahuluan

Jika Anda pernah tersesat dalam dokumentasi, menggulir tanpa henti mencari satu jawaban, Anda tahu betapa menyakitkannya hal itu. Dokumentasi berguna, tetapi bersifat statis dan pencariannya sering terasa canggung.

Di sinilah **RAG (Retrieval-Augmented Generation)** berperan. Alih-alih memaksa pengguna menggali teks, kita dapat menggabungkan **retrieval** (menemukan bagian dokumen yang tepat) dengan **generation** (membiarkan LLM menjelaskannya secara alami).

Dalam postingan ini, saya akan memandu Anda bagaimana saya membangun chatbot dokumentasi yang didukung oleh RAG dan bagaimana ini tidak hanya membantu pengguna menemukan jawaban lebih cepat, tetapi juga memberikan tim produk cara baru untuk memahami titik sakit pengguna.

## Mengapa Menggunakan RAG untuk Dokumentasi?

RAG telah menjadi pendekatan populer karena suatu alasan: ini adalah salah satu cara paling praktis untuk membuat model bahasa besar benar-benar berguna.

Untuk dokumentasi, manfaatnya jelas:

- Jawaban instan: pengguna bertanya dalam bahasa alami, dan mendapatkan balasan yang relevan.
- Konteks yang lebih baik: model hanya melihat bagian dokumen yang paling relevan, mengurangi halusinasi.
- Pencarian yang terasa manusiawi: lebih seperti gabungan Algolia + FAQ + chatbot dalam satu.
- Siklus umpan balik: dengan menyimpan kueri, Anda mengungkap apa yang benar-benar menjadi kesulitan pengguna.

Poin terakhir ini sangat penting. Sistem RAG tidak hanya menjawab pertanyaan, tetapi juga memberi tahu Anda apa yang orang tanyakan. Itu berarti:

- Anda menemukan informasi yang hilang dalam dokumentasi Anda.
- Anda melihat permintaan fitur yang mulai muncul.
- Anda menemukan pola yang bahkan dapat memandu strategi produk.

Jadi, RAG bukan hanya alat dukungan. Ini juga merupakan **mesin penemuan produk**.

## Cara Kerja Pipeline RAG

![Pipeline RAG](https://github.com/aymericzip/intlayer/blob/main/docs/assets/rag_flow.svg)

Secara garis besar, berikut resep yang saya gunakan:

1.  **Memecah dokumentasi** File Markdown besar dibagi menjadi beberapa bagian. Pemecahan ini memungkinkan hanya bagian dokumentasi yang relevan yang digunakan sebagai konteks.
2.  **Menghasilkan embeddings** Setiap potongan diubah menjadi vektor menggunakan API embedding OpenAI (text-embedding-3-large) atau basis data vektor (Chroma, Qdrant, Pinecone).
3.  **Pengindeksan & penyimpanan** Embeddings disimpan dalam file JSON sederhana (untuk demo saya), tetapi dalam produksi, Anda kemungkinan akan menggunakan basis data vektor.
4.  **Pengambilan (R dalam RAG)** Query pengguna diubah menjadi embedding, kemiripan kosinus dihitung, dan potongan yang paling cocok diambil.
5.  **Augmentasi + Generasi (AG dalam RAG)** Potongan-potongan tersebut disuntikkan ke dalam prompt untuk ChatGPT, sehingga model menjawab dengan konteks dokumen yang sebenarnya.
6.  **Mencatat query untuk umpan balik** Setiap query pengguna disimpan. Ini sangat berharga untuk memahami titik masalah, dokumen yang hilang, atau peluang baru.

## Langkah 1: Membaca Dokumen

Langkah pertama sangat sederhana: saya membutuhkan cara untuk memindai folder docs/ untuk semua file .md. Menggunakan Node.js dan glob, saya mengambil konten dari setiap file Markdown ke dalam memori.

Ini menjaga pipeline tetap fleksibel: alih-alih Markdown, Anda bisa mengambil dokumen dari database, CMS, atau bahkan API.

## Langkah 2: Memecah Dokumentasi menjadi Potongan

Mengapa memecah? Karena model bahasa memiliki **batas konteks**. Memberi mereka seluruh buku dokumen tidak akan berhasil.

Jadi idenya adalah memecah teks menjadi potongan yang dapat dikelola (misalnya 500 token setiap potongan) dengan tumpang tindih (misalnya 100 token). Tumpang tindih memastikan kontinuitas sehingga Anda tidak kehilangan makna di batas potongan.

<p align="center">
  <img width="480" alt="Sumber data yang dapat diandalkan" src="https://github.com/user-attachments/assets/ee548851-7206-4cc6-821e-de8a4366c6a3" />
</p>

**Contoh:**

- Chunk 1 → “…perpustakaan tua yang banyak orang lupa. Rak-raknya yang menjulang penuh dengan buku…”
- Chunk 2 → “…rak-rak penuh dengan buku dari setiap genre yang bisa dibayangkan, masing-masing membisikkan cerita…”

Tumpang tindih ini memastikan kedua chunk mengandung konteks bersama, sehingga pengambilan tetap koheren.

Pertukaran ini (ukuran chunk vs tumpang tindih) adalah kunci untuk efisiensi RAG:

- Terlalu kecil → Anda mendapatkan noise.
- Terlalu besar → Anda membengkakkan ukuran konteks.

## Langkah 3: Menghasilkan Embeddings

Setelah dokumen dipecah menjadi chunk, kita menghasilkan **embeddings** — vektor berdimensi tinggi yang mewakili setiap chunk.

Saya menggunakan model OpenAI text-embedding-3-large, tetapi Anda bisa menggunakan model embedding modern lainnya.

**Contoh embedding:**

```js
[
  -0.0002630692, -0.029749284, 0.010225477, -0.009224428, -0.0065269712,
  -0.002665544, 0.003214777, 0.04235309, -0.033162255, -0.00080789323,
  //...+1533 elemen
];
```

Setiap vektor adalah sidik jari matematis dari teks, memungkinkan pencarian kemiripan.

## Langkah 4: Pengindeksan & Penyimpanan Embedding

Untuk menghindari pembuatan ulang embedding berkali-kali, saya menyimpannya di embeddings.json.

Dalam produksi, Anda kemungkinan ingin menggunakan basis data vektor seperti:

- Chroma
- Qdrant
- Pinecone
- FAISS, Weaviate, Milvus, dll.

Basis data vektor menangani pengindeksan, skalabilitas, dan pencarian cepat. Namun untuk prototipe saya, JSON lokal sudah cukup.

## Langkah 5: Pengambilan dengan Cosine Similarity

Ketika pengguna mengajukan pertanyaan:

1.  Buat embedding untuk query.
2.  Bandingkan dengan semua embedding dokumen menggunakan **cosine similarity**.
3.  Simpan hanya N chunk teratas yang paling mirip.

Cosine similarity mengukur sudut antara dua vektor. Kecocokan sempurna mendapatkan skor **1.0**.

Dengan cara ini, sistem menemukan bagian dokumen yang paling dekat dengan kueri.

## Langkah 6: Augmentasi + Generasi

Sekarang saatnya keajaiban. Kita mengambil potongan-potongan teratas dan menyuntikkannya ke dalam **system prompt** untuk ChatGPT.

Itu berarti model menjawab seolah-olah potongan-potongan tersebut adalah bagian dari percakapan.

Hasilnya: jawaban yang akurat dan **berdasarkan dokumen**.

## Langkah 7: Mencatat Kueri Pengguna

Ini adalah kekuatan tersembunyi.

Setiap pertanyaan yang diajukan disimpan. Seiring waktu, Anda membangun dataset dari:

- Pertanyaan yang paling sering diajukan (bagus untuk FAQ)
- Pertanyaan yang belum terjawab (dokumen hilang atau tidak jelas)
- Permintaan fitur yang disamarkan sebagai pertanyaan (“Apakah ini terintegrasi dengan X?”)
- Kasus penggunaan baru yang belum Anda rencanakan

Ini mengubah asisten RAG Anda menjadi **alat riset pengguna berkelanjutan**.

## Berapa Biayanya?

Salah satu keberatan umum terhadap RAG adalah biaya. Dalam praktiknya, biayanya cukup murah:

- Menghasilkan embeddings untuk sekitar ~200 dokumen memakan waktu sekitar **5 menit** dan biaya **1–2 euro**.
- Fitur pencarian dokumen 100% gratis.
- Untuk kueri, kami menggunakan gpt-4o-latest tanpa mode “thinking”. Di Intlayer, kami melihat sekitar **300 kueri chat per bulan**, dan tagihan API OpenAI jarang melebihi **$10**.

Di atas itu, Anda dapat memasukkan biaya hosting.

## Detail Implementasi

Stack:

- Monorepo: workspace pnpm
- Paket dokumen: Node.js / TypeScript / OpenAI API
- Frontend: Next.js / React / Tailwind CSS
- Backend: Node.js API route / OpenAI API

Paket `@smart-doc/docs` adalah paket TypeScript yang menangani pemrosesan dokumentasi. Ketika sebuah file markdown ditambahkan atau dimodifikasi, paket ini menyertakan skrip `build` yang membangun ulang daftar dokumentasi dalam setiap bahasa, menghasilkan embeddings, dan menyimpannya dalam file `embeddings.json`.

Untuk frontend, kami menggunakan aplikasi Next.js yang menyediakan:

- Rendering Markdown ke HTML
- Bar pencarian untuk menemukan dokumentasi yang relevan
- Antarmuka chatbot untuk mengajukan pertanyaan tentang dokumen

Untuk melakukan pencarian dokumentasi, aplikasi Next.js menyertakan rute API yang memanggil fungsi dalam paket `@smart-doc/docs` untuk mengambil potongan dokumen yang sesuai dengan kueri. Dengan menggunakan potongan-potongan ini, kami dapat mengembalikan daftar halaman dokumentasi yang relevan dengan pencarian pengguna.

Untuk fungsi chatbot, kami mengikuti proses pencarian yang sama tetapi juga menyisipkan potongan dokumen yang diambil ke dalam prompt yang dikirim ke ChatGPT.

Berikut adalah contoh prompt yang dikirim ke ChatGPT:

Prompt sistem:

```txt
Anda adalah asisten yang membantu yang dapat menjawab pertanyaan tentang dokumentasi Intlayer.

Potongan terkait:

-----
docName: "getting-started"
docChunk: "1/3"
docUrl: "https://example.com/docs/id/getting-started"
---

# Cara memulai

...

-----
docName: "another-doc"
docChunk: "1/5"
docUrl: "https://example.com/docs/id/another-doc"
---

# Dokumen lain

...
```

Query pengguna:

```txt
Bagaimana cara memulai?
```

Kami menggunakan SSE untuk melakukan streaming respons dari rute API.

Seperti yang disebutkan, kami menggunakan gpt-4-turbo tanpa mode "thinking". Responsnya relevan, dan latensinya rendah.
Kami bereksperimen dengan gpt-5, tetapi latensinya terlalu tinggi (kadang hingga 15 detik untuk sebuah balasan). Namun, kami akan meninjau kembali hal itu di masa depan.

👉 [Coba demo di sini](https://intlayer.org/doc/why) 👉 [Periksa template kode di GitHub](https://github.com/aymericzip/smart_doc_RAG)

## Melangkah Lebih Jauh

Proyek ini adalah implementasi minimal. Namun, Anda dapat memperluasnya dengan berbagai cara:

- Server MCP → fungsi pencarian dokumen ke server MCP untuk menghubungkan dokumentasi ke asisten AI mana pun

- Vector DBs → skala hingga jutaan potongan dokumen
- LangChain / LlamaIndex → kerangka kerja siap pakai untuk pipeline RAG
- Dashboard analitik → memvisualisasikan kueri pengguna dan titik masalah
- Pengambilan multi-sumber → menarik tidak hanya dokumen, tetapi juga entri database, posting blog, tiket, dll.
- Peningkatan prompting → peringkat ulang, penyaringan, dan pencarian hibrida (kata kunci + semantik)

## Batasan yang Kami Temui

- Pemecahan chunk dan tumpang tindih bersifat empiris. Keseimbangan yang tepat (ukuran chunk, persentase tumpang tindih, jumlah chunk yang diambil) memerlukan iterasi dan pengujian.
- Embedding tidak dihasilkan ulang secara otomatis saat dokumen berubah. Sistem kami mereset embedding untuk sebuah file hanya jika jumlah chunk berbeda dari yang tersimpan.
- Dalam prototipe ini, embedding disimpan dalam format JSON. Ini bekerja untuk demo tetapi mencemari Git. Dalam produksi, database atau penyimpanan vektor khusus lebih baik.

## Mengapa Ini Penting Selain Dokumen

Bagian menariknya bukan hanya chatbot. Ini adalah **loop umpan balik**.

Dengan RAG, Anda tidak hanya menjawab:

- Anda mempelajari apa yang membingungkan pengguna.
- Anda menemukan fitur apa yang mereka harapkan.
- Anda menyesuaikan strategi produk Anda berdasarkan pertanyaan nyata.

**Contoh:**

Bayangkan meluncurkan fitur baru dan langsung melihat:

- 50% pertanyaan tentang langkah pengaturan yang sama yang tidak jelas
- Pengguna berulang kali meminta integrasi yang belum Anda dukung
- Orang mencari istilah yang mengungkapkan kasus penggunaan baru

Itu adalah **intelijen produk** langsung dari pengguna Anda.

## Kesimpulan

RAG adalah salah satu cara paling sederhana dan paling kuat untuk membuat LLM menjadi praktis. Dengan menggabungkan **retrieval + generation**, Anda dapat mengubah dokumen statis menjadi **asisten pintar** dan, pada saat yang sama, mendapatkan aliran wawasan produk yang berkelanjutan.

Bagi saya, proyek ini menunjukkan bahwa RAG bukan hanya trik teknis. Ini adalah cara untuk mengubah dokumentasi menjadi:

- sistem dukungan interaktif
- saluran umpan balik
- sebuah alat strategi produk

👉 [Coba demo di sini](https://intlayer.org/doc/why) 👉 [Periksa template kode di GitHub](https://github.com/aymericzip/smart_doc_RAG)

Dan jika Anda juga bereksperimen dengan RAG, saya ingin sekali mendengar bagaimana Anda menggunakannya.
