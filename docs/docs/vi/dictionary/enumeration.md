---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Liệt kê
description: Tìm hiểu cách khai báo và sử dụng các phép liệt kê trong trang web đa ngôn ngữ của bạn. Làm theo các bước trong tài liệu trực tuyến này để thiết lập dự án của bạn trong vài phút.
keywords:
  - Liệt kê
  - Quốc tế hóa
  - Tài liệu
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
    changes: Khởi tạo lịch sử
---

# Liệt kê / Phân số nhiều

## Cách hoạt động của Liệt kê

Trong Intlayer, phép liệt kê được thực hiện thông qua hàm `enu`, hàm này ánh xạ các khóa cụ thể tới nội dung tương ứng của chúng. Các khóa này có thể đại diện cho các giá trị số, phạm vi, hoặc các định danh tùy chỉnh. Khi sử dụng với React Intlayer hoặc Next Intlayer, nội dung phù hợp sẽ được tự động chọn dựa trên locale của ứng dụng và các quy tắc đã định nghĩa.

## Thiết lập Liệt kê

Để thiết lập phép liệt kê trong dự án Intlayer của bạn, bạn cần tạo một module nội dung bao gồm các định nghĩa liệt kê. Dưới đây là ví dụ về một phép liệt kê đơn giản cho số lượng xe hơi:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Ít hơn âm một chiếc xe",
      "-1": "Âm một chiếc xe",
      "0": "Không có xe",
      "1": "Một chiếc xe",
      ">5": "Một vài chiếc xe",
      ">19": "Nhiều chiếc xe",
      "fallback": "Giá trị dự phòng", // Tùy chọn
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
      "<-1": "Ít hơn âm một chiếc xe",
      "-1": "Âm một chiếc xe",
      "0": "Không có xe",
      "1": "Một chiếc xe",
      ">5": "Một vài chiếc xe",
      ">19": "Nhiều chiếc xe",
      "fallback": "Giá trị dự phòng", // Tùy chọn
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
      "<-1": "Ít hơn âm một chiếc xe",
      "-1": "Âm một chiếc xe",
      "0": "Không có xe",
      "1": "Một chiếc xe",
      ">5": "Một vài chiếc xe",
      ">19": "Nhiều chiếc xe",
      "fallback": "Giá trị dự phòng", // Tùy chọn
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
        "<-1": "Ít hơn âm một chiếc xe",
        "-1": "Âm một chiếc xe",
        "0": "Không có xe",
        "1": "Một chiếc xe",
        ">5": "Một vài chiếc xe",
        ">19": "Nhiều chiếc xe",
        "fallback": "Giá trị dự phòng" // Tùy chọn
      }
    }
  }
}
```

Trong ví dụ này, `enu` ánh xạ các điều kiện khác nhau tới nội dung cụ thể. Khi được sử dụng trong một component React, Intlayer có thể tự động chọn nội dung phù hợp dựa trên biến được cung cấp.

> Thứ tự khai báo rất quan trọng trong các phép liệt kê của Intlayer. Khai báo hợp lệ đầu tiên sẽ được chọn. Nếu có nhiều điều kiện áp dụng, hãy đảm bảo chúng được sắp xếp đúng để tránh hành vi không mong muốn.

> Nếu không khai báo giá trị dự phòng, hàm sẽ trả về `undefined` nếu không có khóa nào khớp.

## Sử dụng Enumeration với React Intlayer

Để sử dụng phép liệt kê trong một component React, bạn có thể tận dụng hook `useIntlayer` từ package `react-intlayer`. Hook này sẽ lấy nội dung chính xác dựa trên ID được chỉ định. Dưới đây là ví dụ về cách sử dụng:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Kết quả: Không có xe
        }
      </p>
      <p>
        {
          numberOfCar(6) // Kết quả: Một vài chiếc xe
        }
      </p>
      <p>
        {
          numberOfCar(20) // Kết quả: Nhiều chiếc xe
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Kết quả: Giá trị dự phòng
        }
      </p>
      <p>
        {
          numberOfCar(20) // Kết quả: Nhiều xe
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Kết quả: Giá trị dự phòng
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
          numberOfCar(0) // Kết quả: Không có xe
        }
      </p>
      <p>
        {
          numberOfCar(6) // Kết quả: Một vài chiếc xe
        }
      </p>
      <p>
        {
          numberOfCar(20) // Kết quả: Nhiều xe
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Kết quả: Giá trị dự phòng
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
          numberOfCar(0) // Kết quả: Không có xe
        }
      </p>
      <p>
        {
          numberOfCar(6) // Kết quả: Một vài chiếc xe
        }
      </p>
      <p>
        {
          numberOfCar(20) // Kết quả: Nhiều xe
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Kết quả: Giá trị dự phòng
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

Trong ví dụ này, component tự động điều chỉnh kết quả hiển thị dựa trên số lượng xe. Nội dung chính xác được chọn tự động, tùy thuộc vào phạm vi được chỉ định.

## Tài nguyên bổ sung

Để biết thêm thông tin chi tiết về cấu hình và cách sử dụng, hãy tham khảo các tài nguyên sau:

- [Tài liệu CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md)
- [Tài liệu React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)
- [Tài liệu Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)

Những tài nguyên này cung cấp thêm những hiểu biết sâu sắc về cách thiết lập và sử dụng Intlayer trong các môi trường khác nhau và với các framework đa dạng.
