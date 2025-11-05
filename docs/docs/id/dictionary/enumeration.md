---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Enumerasi
description: Temukan cara mendeklarasikan dan menggunakan enumerasi di situs web multibahasa Anda. Ikuti langkah-langkah dalam dokumentasi online ini untuk mengatur proyek Anda dalam beberapa menit.
keywords:
  - Enumerasi
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - enumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Enumerasi / Plurialisasi

## Cara Enumerasi Bekerja

Di Intlayer, enumerasi dicapai melalui fungsi `enu`, yang memetakan kunci tertentu ke konten yang sesuai. Kunci-kunci ini dapat mewakili nilai numerik, rentang, atau pengenal khusus. Ketika digunakan dengan React Intlayer atau Next Intlayer, konten yang tepat secara otomatis dipilih berdasarkan locale aplikasi dan aturan yang telah ditentukan.

## Menyiapkan Enumerasi

Untuk menyiapkan enumerasi dalam proyek Intlayer Anda, Anda perlu membuat modul konten yang mencakup definisi enumerasi. Berikut adalah contoh enumerasi sederhana untuk jumlah mobil:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Kurang dari minus satu mobil",
      "-1": "Minus satu mobil",
      "0": "Tidak ada mobil",
      "1": "Satu mobil",
      ">5": "Beberapa mobil",
      ">19": "Banyak mobil",
      "fallback": "Nilai cadangan", // Opsional
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Kurang dari minus satu mobil",
      "-1": "Minus satu mobil",
      "0": "Tidak ada mobil",
      "1": "Satu mobil",
      ">5": "Beberapa mobil",
      ">19": "Banyak mobil",
      "fallback": "Nilai cadangan", // Opsional
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Kurang dari minus satu mobil",
      "-1": "Minus satu mobil",
      "0": "Tidak ada mobil",
      "1": "Satu mobil",
      ">5": "Beberapa mobil",
      ">19": "Banyak mobil",
      "fallback": "Nilai cadangan", // Opsional
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Kurang dari minus satu mobil",
        "-1": "Minus satu mobil",
        "0": "Tidak ada mobil",
        "1": "Satu mobil",
        ">5": "Beberapa mobil",
        ">19": "Banyak mobil",
        "fallback": "Nilai cadangan" // Opsional
      }
    }
  }
}
```

Dalam contoh ini, `enu` memetakan berbagai kondisi ke konten spesifik. Ketika digunakan dalam komponen React, Intlayer dapat secara otomatis memilih konten yang sesuai berdasarkan variabel yang diberikan.

> Urutan deklarasi penting dalam enumerasi Intlayer. Deklarasi valid pertama adalah yang akan dipilih. Jika beberapa kondisi berlaku, pastikan mereka diurutkan dengan benar untuk menghindari perilaku yang tidak diinginkan.

> Jika tidak ada fallback yang dideklarasikan, fungsi akan mengembalikan `undefined` jika tidak ada kunci yang cocok.

## Menggunakan Enumerasi dengan React Intlayer

Untuk menggunakan enumerasi dalam komponen React, Anda dapat memanfaatkan hook `useIntlayer` dari paket `react-intlayer`. Hook ini mengambil konten yang tepat berdasarkan ID yang ditentukan. Berikut adalah contoh cara menggunakannya:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: Tidak ada mobil
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Beberapa mobil
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Banyak mobil
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Nilai cadangan
        }
      </p>
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: Tidak ada mobil
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Beberapa mobil
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Banyak mobil
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Nilai fallback
        }
      </p>
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: Tidak ada mobil
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Beberapa mobil
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Banyak mobil
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Nilai cadangan
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

Dalam contoh ini, komponen secara dinamis menyesuaikan outputnya berdasarkan jumlah mobil. Konten yang benar dipilih secara otomatis, tergantung pada rentang yang ditentukan.

## Sumber Daya Tambahan

Untuk informasi lebih rinci tentang konfigurasi dan penggunaan, lihat sumber daya berikut:

- [Dokumentasi Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md)
- [Dokumentasi React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md)
- [Dokumentasi Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md)

Sumber daya ini memberikan wawasan lebih lanjut tentang pengaturan dan penggunaan Intlayer di berbagai lingkungan dan dengan berbagai framework.
