---
createdAt: 2026-04-20
updatedAt: 2026-05-18
title: Giải pháp i18n tốt nhất cho Vue năm 2026 - Báo cáo Benchmark
description: So sánh các thư viện quốc tế hóa (i18n) Vue như vue-i18n, fluent-vue và Intlayer. Báo cáo hiệu suất chi tiết về kích thước bundle, rò rỉ và tính phản ứng.
keywords:
  - benchmark
  - i18n
  - intl
  - vue
  - hiệu suất
  - intlayer
slugs:
  - doc
  - benchmark
  - vue
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-vue-template
history:
  - version: 8.9.8
    date: 2026-05-18
    changes: "Thêm so sánh sao GitHub"
  - version: 8.7.12
    date: 2026-01-06
    changes: "Khởi tạo benchmark"
---

# Thư viện i18n cho Vue - Báo cáo Benchmark 2026

Trang này là báo cáo benchmark cho các giải pháp i18n trên Vue.

## Mục lục

<Toc/>

## Benchmark tương tác

<I18nBenchmark framework="vite-vue" vertical/>

## Tham chiếu kết quả:

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> [Xem dữ liệu benchmark đầy đủ](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md)

Xem toàn bộ kho lưu trữ benchmark [tại đây](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Giới thiệu

Các giải pháp quốc tế hóa là một trong những phụ thuộc nặng nhất trong một ứng dụng Vue. Rủi ro chính là việc gửi nội dung không cần thiết: bản dịch cho các trang khác và các ngôn ngữ khác trong bundle của một route duy nhất.

Khi ứng dụng của bạn phát triển, vấn đề đó có thể nhanh chóng làm bùng nổ lượng JavaScript gửi đến client và làm chậm quá trình điều hướng.

Trong thực tế, đối với các triển khai ít được tối ưu hóa nhất, một trang quốc tế hóa có thể nặng hơn gấp nhiều lần so với phiên bản không có i18n.

Tác động khác là đối với trải nghiệm nhà phát triển (DX): cách bạn khai báo nội dung, kiểu (types), tổ chức namespace, tải động và tính phản ứng khi thay đổi ngôn ngữ.

## TL;DR

- **Intlayer**: Giải pháp nhẹ nhất (v8.7.12) với tính năng scoping và tải động gốc.
- **vue-i18n**: Tiêu chuẩn ngành với hệ sinh thái phong phú, nhưng có thể trở nên nặng hơn đáng kể và khó tối ưu hóa cho code-splitting trong các ứng dụng lớn.
- **fluent-vue**: Tổ chức thông báo sáng tạo nhưng thiếu an toàn kiểu (type-safety) và hóa ra là một giải pháp cực kỳ nặng.

## Kiểm tra ứng dụng của bạn

Để nhanh chóng phát hiện các vấn đề rò rỉ i18n, tôi đã thiết lập một trình quét miễn phí có sẵn [tại đây](https://intlayer.org/i18n-seo-scanner).

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Vấn đề

Hai đòn bẩy là thiết yếu để hạn chế chi phí của một ứng dụng đa ngôn ngữ:

- Chia nhỏ nội dung theo trang / namespace để bạn không tải toàn bộ từ điển khi không cần thiết.
- Tải ngôn ngữ chính xác một cách linh hoạt, chỉ khi cần thiết.

Hiểu các hạn chế kỹ thuật của các phương pháp này:

**Tải động (Dynamic loading)**

Nếu không có tải động, hầu hết các giải pháp giữ tin nhắn trong bộ nhớ từ lần render đầu tiên, điều này làm tăng đáng kể overhead cho các ứng dụng có nhiều route và ngôn ngữ.

Với tải động, bạn chấp nhận một sự đánh đổi: ít JS ban đầu hơn, nhưng đôi khi có thêm một request khi chuyển đổi ngôn ngữ.

**Chia tách nội dung (Splitting)**

Các cú pháp được xây dựng xung quanh `const { t } = useI18n()` + `t('a.b.c')` rất tiện lợi nhưng thường khuyến khích giữ các đối tượng JSON lớn khi runtime. Mô hình đó làm cho tree-shaking trở nên khó khăn trừ khi thư viện cung cấp một chiến lược chia tách thực sự theo từng trang.

## Phương pháp nghiên cứu

Đối với benchmark này, chúng tôi đã so sánh các thư viện sau:

- `Base App` (Không có thư viện i18n)
- `vue-intlayer` (v8.7.12)
- `vue-i18n` (v11.4.0)
- `fluent-vue` (v3.8.2)

Framework là `Vue` với một ứng dụng đa ngôn ngữ gồm **10 trang** và **10 ngôn ngữ**.

Chúng tôi đã so sánh **bốn chiến lược tải**:

| Chiến lược   | Không có namespace (toàn cục)                   | Có namespace (phạm vi/scoped)                                      |
| :----------- | :---------------------------------------------- | :----------------------------------------------------------------- |
| **Tải tĩnh** | **Static**: Mọi thứ trong bộ nhớ khi khởi động. | **Scoped static**: Chia theo namespace; mọi thứ tải khi khởi động. |
| **Tải động** | **Dynamic**: Tải theo yêu cầu cho mỗi ngôn ngữ. | **Scoped dynamic**: Tải chi tiết theo namespace và ngôn ngữ.       |

## Tóm tắt chiến lược

- **Static**: Đơn giản; không có độ trễ mạng sau lần tải đầu tiên. Nhược điểm: kích thước bundle lớn.
- **Dynamic**: Giảm trọng lượng ban đầu (lazy-loading). Lý tưởng khi bạn có nhiều ngôn ngữ.
- **Scoped static**: Giữ cho mã được tổ chức (tách biệt logic) mà không cần các request mạng bổ sung phức tạp.
- **Scoped dynamic**: Phương pháp tốt nhất cho _code splitting_ và hiệu suất. Giảm thiểu bộ nhớ bằng cách chỉ tải những gì chế độ xem hiện tại và ngôn ngữ đang hoạt động cần.

### Những gì tôi đã đo lường:

Tôi đã chạy cùng một ứng dụng đa ngôn ngữ trong một trình duyệt thực cho mọi stack, sau đó ghi lại những gì thực sự xuất hiện trên mạng và mất bao lâu. Kích thước được báo cáo **sau khi nén web thông thường**, vì điều đó gần với những gì mọi người thực sự tải xuống hơn là số lượng mã nguồn thô.

- **Kích thước thư viện quốc tế hóa**: Sau khi đóng gói, tree-shaking và thu gọn, kích thước của thư viện i18n là kích thước của mã provider + composable trong một component trống. Nó không bao gồm việc tải các file bản dịch. Nó trả lời cho câu hỏi thư viện "đắt" như thế nào trước khi nội dung của bạn xuất hiện.

- **JavaScript trên mỗi trang**: Đối với mỗi route benchmark, trình duyệt kéo bao nhiêu script cho lần truy cập đó, tính trung bình trên các trang trong bộ thử nghiệm (và trên các ngôn ngữ). Các trang nặng là các trang chậm.

- **Rò rỉ từ các ngôn ngữ khác (Leakage)**: Đó là nội dung của cùng một trang nhưng ở ngôn ngữ khác sẽ bị tải nhầm trong trang được kiểm tra. Nội dung này là không cần thiết và nên tránh (ví dụ: nội dung trang `/fr/about` trong bundle trang `/en/about`).

- **Rò rỉ từ các route khác**: Ý tưởng tương tự cho **các màn hình khác** trong ứng dụng: liệu văn bản của chúng có đi kèm khi bạn chỉ mở một trang hay không (ví dụ: nội dung trang `/en/about` trong bundle trang `/en/contact`). Điểm số cao gợi ý việc chia tách yếu hoặc các bundle quá rộng.

- **Kích thước bundle component trung bình**: Các phần UI phổ biến được đo **từng cái một** thay vì ẩn bên trong một con số ứng dụng khổng lồ. Nó cho thấy liệu quốc tế hóa có âm thầm làm phình to các component hàng ngày hay không. Ví dụ, nếu component của bạn render lại, nó sẽ tải tất cả dữ liệu đó từ bộ nhớ. Việc đính kèm một JSON khổng lồ vào bất kỳ component nào giống như kết nối một kho chứa lớn dữ liệu không sử dụng sẽ làm chậm hiệu suất component của bạn.

- **Tính phản ứng khi chuyển đổi ngôn ngữ**: Tôi lật ngôn ngữ bằng chính trình điều khiển của ứng dụng và tính thời gian cho đến khi trang đã chuyển đổi rõ ràng, những gì khách truy cập sẽ nhận thấy.

- **Công việc render sau khi thay đổi ngôn ngữ**: Một theo dõi hẹp hơn: giao diện đã tốn bao nhiêu nỗ lực để vẽ lại cho ngôn ngữ mới sau khi quá trình chuyển đổi bắt đầu. Hữu ích khi thời gian "cảm nhận" và chi phí framework khác nhau.

- **Thời gian tải trang ban đầu**: Từ khi điều hướng cho đến khi trình duyệt coi trang đã được tải đầy đủ cho các tình huống tôi đã thử nghiệm. Tốt để so sánh cold start.

- **Thời gian Hydration**: Thời gian client dành để biến server HTML thành giao diện tương tác. Dấu gạch ngang trong các bảng có nghĩa là triển khai đó không cung cấp con số hydration đáng tin cậy trong benchmark này.

## Sao GitHub

Sao GitHub là một chỉ số mạnh mẽ về mức độ phổ biến của dự án, sự tin tưởng của cộng đồng và mức độ phù hợp lâu dài. Mặc dù không phải là thước đo trực tiếp về chất lượng kỹ thuật, chúng phản ánh số lượng nhà phát triển thấy dự án hữu ích, theo dõi tiến trình của nó và có khả năng áp dụng nó. Để ước tính giá trị của một dự án, các ngôi sao giúp so sánh sức hút giữa các lựa chọn thay thế và cung cấp thông tin chi tiết về sự phát triển của hệ sinh thái.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Cfluent-vue%2Ffluent-vue%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&fluent-vue/fluent-vue&aymericzip/intlayer)

## Kết quả chi tiết

### 1 - Các giải pháp cần tránh

> Không có giải pháp rõ ràng nào cần tránh trong hệ sinh thái Vue.

### 2 - Các giải pháp chấp nhận được

**(vue-i18n)** (`vue-i18n@11.4.0`):

- **vue-i18n** chắc chắn là thư viện i18n được sử dụng nhiều nhất cho Vue, nó có rất nhiều tính năng và một hệ sinh thái khổng lồ. Nhưng thực tế giải pháp này khá nặng. Ngay cả khi vue-i18n tích hợp lazy loading cho các tin nhắn, nó vẫn thiếu tính năng scoping. Trong trường hợp ứng dụng Vue SPA cổ điển thì không có vấn đề gì, nhưng đối với ứng dụng Nuxt, sử dụng @nuxt/i18n, nó dẫn đến việc bao gồm tin nhắn từ tất cả các trang vào một trang duy nhất. Đối với một ứng dụng Nuxt lớn bao gồm hơn 10 trang, nó có thể trở nên thực sự rắc rối.

Package này rất nặng (~24.3kb, gấp khoảng 9 lần `vue-intlayer`).

**(fluent-vue)** (`fluent-vue@0.5.0`):

- **fluent-vue** đưa ra một nỗ lực đổi mới thông qua định dạng .ftl. Tổ chức tin nhắn tuyệt vời, dễ dàng bắt đầu hơn. Nhưng trong thực tế, việc thiếu an toàn kiểu làm tăng rủi ro lỗi và có thể nhanh chóng trở nên tốn thời gian để debug. Hơn nữa, giải pháp đó tải các tin nhắn bằng một plugin vite bắt buộc tải tất cả nội dung ở tất cả các ngôn ngữ vào mỗi trang. Ngoài ra, đây là một giải pháp cực kỳ nặng (~92.7kb, gấp khoảng 34 lần `vue-intlayer`).

### 3 - Khuyến nghị

**(Intlayer)** (`vue-intlayer@8.7.12`):

Tôi sẽ không đích thân đánh giá `vue-intlayer` vì tính khách quan, vì đó là giải pháp của chính tôi.
