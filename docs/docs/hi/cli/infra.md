---
createdAt: 2026-09-21
updatedAt: 2026-09-21
title: CLI - Init Infra
description: डेस्कटॉप ऐप इंस्टॉल करने या Docker (ऑल-इन-वन कंटेनर या Docker Compose स्टैक) के साथ Intlayer CMS को स्वयं होस्ट करने के लिए Intlayer CLI init infra कमांड का उपयोग करना सीखें।
keywords:
  - CLI
  - इन्फ्रास्ट्रक्चर
  - सेल्फ-होस्टिंग
  - डेस्कटॉप ऐप
  - Docker
  - Docker Compose
  - CMS
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - infra
history:
  - version: 9.5.6
    date: 2026-09-21
    changes: "init infra कमांड जोड़ें"
author: aymericzip
---

# Intlayer CLI Init Infra कमांड

## विवरण

`init infra` कमांड आपकी मशीन पर Intlayer इन्फ्रास्ट्रक्चर सेट करता है। यह आपके प्लेटफ़ॉर्म के लिए होस्ट किए गए इंस्टॉलर (macOS / Linux पर `https://intlayer.org/install.sh`, Windows पर `https://intlayer.org/install.ps1`) को डाउनलोड करता है और इसे टर्मिनल से जोड़कर चलाता है, ताकि इंस्टॉलर का मेनू और प्रगति आउटपुट आप तक बिना किसी बदलाव के पहुंचे।

इंस्टॉलर पूछता है कि आप Intlayer को कैसे चलाना चाहते हैं:

- **डेस्कटॉप ऐप**: आपके ओएस और सीपीयू के लिए नेटिव डैशबोर्ड डाउनलोड करता है और इसे खोलता या इंस्टॉल करता है। डेस्कटॉप बिल्ड Intlayer Cloud बैकएंड से संचार करता है।
- **ऑल-इन-वन Docker**: एक वॉल्यूम द्वारा समर्थित एकल कंटेनर में डैशबोर्ड + API + MongoDB + Redis + MinIO। जनरेट किए गए सीक्रेट्स के साथ `./intlayer.env` लिखता है और `intlayer/cms-all` इमेज को पुल करता है।
- **Docker Compose**: स्केलेबल सेल्फ-होस्टिंग के लिए प्रति सेवा एक कंटेनर। `./intlayer/` में `docker-compose.yml` और `.env` लिखता है और इमेज को पुल करता है।

होस्ट किया गया इंस्टॉलर सेटअप प्रक्रिया के लिए सत्य का एकमात्र स्रोत है: CLI समान चरणों को फिर से लागू करने के बजाय इसे चलाता है, इसलिए `npx intlayer init infra` और `curl -fsSL https://intlayer.org/install.sh | sh` बिल्कुल एक जैसा काम करते हैं।

## उपयोग

```bash packageManager="npm"
npx intlayer init infra [options]
```

```bash packageManager="yarn"
yarn intlayer init infra [options]
```

```bash packageManager="pnpm"
pnpm intlayer init infra [options]
```

```bash packageManager="bun"
bun x intlayer init infra [options]
```

वही चरण `npx intlayer init --interactive` की चेकलिस्ट में **इन्फ्रास्ट्रक्चर (डेस्कटॉप ऐप / सेल्फ-होस्टिंग)** के तहत भी दिया गया है।

## विकल्प

- `-m, --mode <mode>` - वैकल्पिक। इंस्टॉलर के मेनू को छोड़ें और सीधे एक मोड चलाएं। स्वीकृत मान: `desktop`, `docker` (ऑल-इन-वन) या `compose`। कोई अन्य मान स्वीकृत मोड की सूची वाली त्रुटि के साथ बाहर निकलता है।

## उदाहरण

### इंटरैक्टिव रूप से मोड चुनें

```bash
npx intlayer init infra
```

### डेस्कटॉप ऐप इंस्टॉल करें

```bash
npx intlayer init infra --mode desktop
```

### ऑल-इन-वन कंटेनर के साथ सेल्फ-होस्ट करें

```bash
npx intlayer init infra --mode docker
```

### Docker Compose के साथ सेल्फ-होस्ट करें

```bash
npx intlayer init infra --mode compose
```

## आउटपुट उदाहरण

```bash
npx intlayer init infra --mode compose
◇  Installer downloaded
▸ Fetching docker-compose.yml into ./intlayer
▸ Writing ./intlayer/.env
▸ Pulling images

  Everything is installed. Two steps left.

  1. Configure a mailer in:

       ./intlayer/.env

     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.
  2. Start the stack:

       cd ./intlayer && docker compose up -d

  Then open http://localhost:3000 — first boot initialises the
  datastores, so give it a minute. The first account you create becomes the
  super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   docker compose pull && docker compose up -d
```

## इंस्टॉलर सेटिंग्स

इंस्टॉलर कुछ पर्यावरण चर पढ़ता है, जिन्हें CLI बिना किसी बदलाव के आगे भेजता है। कमांड चलाने से पहले उन्हें अपने शेल में सेट करें:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| चर                        | डिफ़ॉल्ट                  | लागू होता है | विवरण                                                                 |
| ------------------------- | ------------------------- | ------------ | --------------------------------------------------------------------- |
| `INTLAYER_MODE`           | _(पूछा गया)_              | सभी          | `desktop`, `docker` या `compose`, `--mode` के समान                    |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop      | जहां ऐप इंस्टॉलर सहेजा जाता है                                        |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker       | पुल करने के लिए ऑल-इन-वन इमेज                                         |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker       | पर्यावरण फ़ाइल कहाँ लिखनी है                                          |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker       | कंटेनर का नाम                                                         |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker       | `/data` पर माउंट किया गया नामित वॉल्यूम                               |
| `INTLAYER_APP_PORT`       | `3000`                    | docker       | डैशबोर्ड के लिए होस्ट पोर्ट                                           |
| `INTLAYER_API_PORT`       | `3100`                    | docker       | API के लिए होस्ट पोर्ट                                                |
| `INTLAYER_S3_PORT`        | `9000`                    | docker       | MinIO S3 API के लिए होस्ट पोर्ट                                       |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker       | MinIO कंसोल के लिए होस्ट पोर्ट                                        |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose      | जहाँ `docker-compose.yml` और `.env` लिखे जाते हैं                     |
| `INTLAYER_SELFHOST_REF`   | `main`                    | दोनों        | Git संदर्भ जहां से compose फ़ाइल और env टेम्पलेट प्राप्त किए जाते हैं |

> पोर्ट चर केवल मैपिंग के **होस्ट** पक्ष को बदलते हैं। प्रकाशित इमेज में डैशबोर्ड बंडल में `http://localhost:3000`, `http://localhost:3100` और `http://localhost:9000` संकलित होते हैं, इसलिए जब तक आप अपनी स्वयं की इमेज नहीं बनाते, डिफ़ॉल्ट मान बनाए रखें: [सेल्फ-होस्टिंग गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md#limitations) देखें।

## आवश्यकताएँ

- **डेस्कटॉप ऐप** को [Node.js](https://nodejs.org) की आवश्यकता होती है: ऐप डैशबोर्ड सर्वर को एम्बेड करता है और इसे मशीन के अपने `node` बाइनरी के साथ शुरू करता है।
- **Docker मोड** के लिए [Docker](https://docs.docker.com/get-docker/) आवश्यक है (Windows पर WSL 2 बैकएंड के साथ Docker Desktop)। Compose मोड के लिए `docker compose` प्लगइन की भी आवश्यकता होती है।

## टिप्पणियाँ

- कमांड को फिर से चलाना सुरक्षित है: मौजूदा पर्यावरण फ़ाइल कभी भी अधिलेखित नहीं होती है, इसलिए यह अपग्रेड पथ के रूप में भी काम करती है (इंस्टॉलर नवीनतम इमेज को खींचता है और आपके सीक्रेट्स को सुरक्षित रखता है)।
- इंस्टॉलर एक अस्थायी निर्देशिका में डाउनलोड किया जाता है और इसके बाहर निकलने पर हटा दिया जाता है।
- कमांड का निकास कोड इंस्टॉलर का ही होता है। यदि डाउनलोड विफल हो जाता है, तो CLI समकक्ष `curl … | sh` (या `irm … | iex`) कमांड प्रिंट करता है ताकि आप इंस्टॉलर को सीधे चला सकें।
- साइन-इन ईमेल भेजने के लिए Docker मोड को अभी भी एक मेलर की आवश्यकता होती है। इंस्टॉलर समाप्त होने के बाद, जनरेट की गई पर्यावरण फ़ाइल में Resend या SMTP कॉन्फ़िगर करें: [ग्लोबल मेलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md#global-mailer) देखें।

## संबंधित

- [सेल्फ-होस्टिंग गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) - आर्किटेक्चर, प्रथम-रन चरण और प्रत्येक मोड की सीमाएं
- [Intlayer प्रारंभ करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/init.md) - पैरेंट `init` कमांड और इसकी इंटरैक्टिव चेकलिस्ट
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) - आपके द्वारा अभी इंस्टॉल किए गए डैशबोर्ड की कार्यप्रणाली
