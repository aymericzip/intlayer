---
createdAt: 2025-11-24
updatedAt: 2025-11-24
title: Trình Biên Dịch so với i18n Khai Báo
description: Khám phá các đánh đổi kiến trúc giữa quốc tế hóa dựa trên trình biên dịch "ma thuật" và quản lý nội dung khai báo rõ ràng.
keywords:
  - Intlayer
  - Quốc tế hóa
  - Blog
  - Next.js
  - JavaScript
  - React
  - i18n
  - Trình Biên Dịch
  - Khai Báo
slugs:
  - blog
  - compiler-vs-declarative-i18n
---

# Lập Luận Ủng Hộ và Phản Đối i18n Dựa trên Trình Biên Dịch

Nếu bạn đã xây dựng các ứng dụng web hơn một thập kỷ, bạn biết rằng Quốc tế hóa (i18n) luôn là một điểm gây khó khăn. Đây thường là công việc không ai muốn làm — trích xuất chuỗi, quản lý các tập tin JSON, và lo lắng về các quy tắc số nhiều.

Gần đây, một làn sóng mới của các công cụ i18n **"dựa trên trình biên dịch"** đã xuất hiện, hứa hẹn sẽ làm biến mất nỗi đau này. Lời chào hàng rất hấp dẫn: **Chỉ cần viết văn bản trong các component của bạn, và để công cụ build lo phần còn lại.** Không cần key, không cần import, chỉ có phép thuật.

Nhưng như với tất cả các trừu tượng trong kỹ thuật phần mềm, phép thuật luôn đi kèm với một cái giá.

Trong bài blog này, chúng ta sẽ khám phá sự chuyển dịch từ các thư viện khai báo sang các phương pháp dựa trên trình biên dịch, các khoản nợ kiến trúc ẩn mà chúng mang lại, và lý do tại sao cách "nhàm chán" có thể vẫn là cách tốt nhất cho các ứng dụng chuyên nghiệp.

## Lược Sử Ngắn Gọn về Quốc Tế Hóa

Để hiểu được vị trí hiện tại, chúng ta phải nhìn lại nơi chúng ta đã bắt đầu.

Khoảng năm 2011–2012, cảnh quan JavaScript rất khác biệt. Các bundler như chúng ta biết ngày nay (Webpack, Vite) chưa tồn tại hoặc còn trong giai đoạn sơ khai. Chúng ta đang dán các script lại với nhau trong trình duyệt. Trong thời kỳ này, các thư viện như **i18next** đã ra đời.

Chúng giải quyết vấn đề theo cách duy nhất có thể vào thời điểm đó: **Từ điển thời gian chạy (Runtime Dictionaries)**. Bạn tải một đối tượng JSON khổng lồ vào bộ nhớ, và một hàm sẽ tra cứu các key ngay lập tức. Nó đáng tin cậy, rõ ràng và hoạt động ở mọi nơi.

Tiến tới ngày nay. Chúng ta có các trình biên dịch mạnh mẽ (SWC, các bundler dựa trên Rust) có thể phân tích Cây Cú Pháp Trừu Tượng (AST) trong vài mili giây. Sức mạnh này đã sinh ra một ý tưởng mới: _Tại sao chúng ta phải quản lý key thủ công? Tại sao trình biên dịch không thể chỉ nhìn thấy văn bản "Hello World" và thay thế nó cho chúng ta?_

Và thế là i18n dựa trên trình biên dịch ra đời.

> **Ví dụ về i18n dựa trên trình biên dịch:**
>
> - Paraglide (Các module được tree-shaken biên dịch mỗi thông điệp thành một hàm ESM nhỏ gọn để các bundler có thể tự động loại bỏ các locale và key không sử dụng. Bạn nhập các thông điệp dưới dạng hàm thay vì tra cứu key chuỗi.)
> - LinguiJS (Trình biên dịch macro-thành-hàm, viết lại các macro thông điệp như `<Trans>` thành các lời gọi hàm JS thuần túy tại thời điểm build. Bạn có cú pháp ICU/MessageFormat với footprint runtime rất nhỏ.)
> - Lingo.dev (Tập trung tự động hóa quy trình localization bằng cách chèn nội dung đã dịch trực tiếp trong quá trình build ứng dụng React của bạn. Nó có thể tự động tạo bản dịch sử dụng AI và tích hợp trực tiếp vào CI/CD.)
> - Wuchale (Trình tiền xử lý ưu tiên Svelte, trích xuất văn bản nội tuyến trong các file .svelte và biên dịch thành các hàm dịch không bao bọc. Nó tránh sử dụng key chuỗi và tách biệt hoàn toàn logic trích xuất nội dung khỏi runtime chính của ứng dụng.)
> - Intlayer (Trình biên dịch / CLI trích xuất phân tích các component của bạn, tạo các từ điển kiểu, và có thể tùy chọn viết lại mã để sử dụng nội dung Intlayer rõ ràng. Mục tiêu là sử dụng trình biên dịch để tăng tốc độ trong khi giữ một lõi khai báo, không phụ thuộc vào framework.)

> **Ví dụ về i18n khai báo:**
>
> - i18next / react-i18next / next-i18next (Tiêu chuẩn công nghiệp trưởng thành sử dụng từ điển JSON tại runtime và hệ sinh thái plugin rộng lớn)
> - react-intl (Một phần của thư viện FormatJS, tập trung vào cú pháp thông điệp ICU tiêu chuẩn và định dạng dữ liệu nghiêm ngặt)
> - next-intl (Tối ưu hóa đặc biệt cho Next.js với tích hợp cho App Router và React Server Components)
> - vue-i18n / @nuxt/i18n (Giải pháp tiêu chuẩn trong hệ sinh thái Vue cung cấp các khối dịch ở cấp component và tích hợp phản ứng chặt chẽ)
> - svelte-i18n (Một lớp bao nhẹ quanh các store của Svelte để dịch phản ứng tại runtime)
> - angular-translate (Thư viện dịch động kế thừa dựa trên tra cứu key tại runtime thay vì gộp vào thời gian build)
> - angular-i18n (Phương pháp gốc của Angular, ahead-of-time, gộp các file XLIFF trực tiếp vào template trong quá trình build)
> - Tolgee (Kết hợp mã khai báo với một SDK trong ngữ cảnh để chỉnh sửa "click-to-translate" trực tiếp trong giao diện người dùng)
> - Intlayer (Phương pháp theo từng component, sử dụng các file khai báo nội dung cho phép tree-shaking gốc và kiểm tra TypeScript)

## Trình Biên Dịch Intlayer

Mặc dù **Intlayer** là một giải pháp cơ bản khuyến khích một **phương pháp khai báo** cho nội dung của bạn, nó bao gồm một trình biên dịch để giúp tăng tốc phát triển hoặc hỗ trợ tạo mẫu nhanh.

Trình biên dịch Intlayer duyệt qua AST (Cây Cú Pháp Trừu Tượng) của các component React, Vue hoặc Svelte của bạn, cũng như các file JavaScript/TypeScript khác. Vai trò của nó là phát hiện các chuỗi ký tự cứng nhắc và trích xuất chúng vào các khai báo `.content` riêng biệt.

> Để biết thêm chi tiết, hãy xem tài liệu: [Tài liệu Trình Biên Dịch Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md)

## Sức Hút của Trình Biên Dịch (Phương Pháp "Phép Thuật")

Có một lý do khiến phương pháp mới này đang trở nên phổ biến. Đối với một nhà phát triển, trải nghiệm này thật tuyệt vời.

### 1. Tốc Độ và "Dòng Chảy"

Khi bạn đang tập trung cao độ, việc dừng lại để nghĩ tên biến có ý nghĩa (`home_hero_title_v2`) sẽ làm gián đoạn dòng chảy công việc của bạn. Với phương pháp trình biên dịch, bạn chỉ cần gõ `<p>Welcome back</p>` và tiếp tục. Sự cản trở bằng không.

### 2. Nhiệm Vụ Cứu Hộ Di Sản

Hãy tưởng tượng bạn thừa kế một codebase khổng lồ với 5.000 component và không có bản dịch nào. Việc cải tạo lại hệ thống này bằng cách sử dụng hệ thống key thủ công sẽ là một cơn ác mộng kéo dài hàng tháng. Một công cụ dựa trên trình biên dịch sẽ đóng vai trò như một chiến lược cứu hộ, ngay lập tức trích xuất hàng nghìn chuỗi mà bạn không cần phải động tay vào bất kỳ file nào một cách thủ công.

### 3. Kỷ Nguyên AI

Đây là một lợi ích hiện đại mà chúng ta không nên bỏ qua. Các trợ lý lập trình AI (như Copilot hoặc ChatGPT) tự nhiên tạo ra JSX/HTML tiêu chuẩn. Chúng không biết sơ đồ key dịch cụ thể của bạn.

- **Khai báo:** Bạn phải viết lại đầu ra của AI để thay thế văn bản bằng các key.
- **Trình biên dịch:** Bạn chỉ cần sao chép-dán mã của AI, và nó hoạt động ngay.

## Kiểm Tra Thực Tế: Tại Sao "Phép Thuật" Lại Nguy Hiểm

Mặc dù "phép thuật" rất hấp dẫn, nhưng sự trừu tượng này lại bị rò rỉ. Việc dựa vào một công cụ build để hiểu ý định của con người sẽ tạo ra sự mong manh về mặt kiến trúc.

### Sự Mong Manh Dựa Trên Heuristic (Trò Chơi Đoán)

Trình biên dịch phải đoán đâu là nội dung và đâu là mã. Điều này dẫn đến các trường hợp biên giới mà bạn cuối cùng phải "đấu tranh" với công cụ.

Hãy xem xét các tình huống sau:

- Có nên trích xuất `<span className="active"></span>` không? (Nó là một chuỗi, nhưng có thể là một class).
- Có nên trích xuất `<span status="pending"></span>` không? (Nó là một giá trị prop).
- Có nên trích xuất `<span>{"Hello World"}</span>` không? (Nó là một biểu thức JS).
- Có nên trích xuất `<span>Hello {name}. How are you?</span>` không? (Nội suy phức tạp).
- Có nên trích xuất `<span aria-label="Image of cat"></span>` không? (Thuộc tính truy cập cần được dịch).
- Có phải `<span data-testid="my-element"></span>` được trích xuất không? (Các ID kiểm thử KHÔNG nên được dịch).
- Có phải `<MyComponent errorMessage="An error occurred" />` được trích xuất không?
- Có phải `<p>This is a paragraph{" "}\n containing multiple lines</p>` được trích xuất không?
- Có phải kết quả hàm `<p>{getStatusMessage()}</p>` được trích xuất không?
- Có phải `<div>{isLoading ? "The page is loading" : <MyComponent/>} </div>` được trích xuất không?
- Có phải một ID sản phẩm như `<span>AX-99</span>` được trích xuất không?

Bạn không thể tránh khỏi việc phải thêm các chú thích cụ thể (như `// ignore-translation`, hoặc các props cụ thể như `data-compiler-ignore="true"`) để ngăn chặn việc làm hỏng logic ứng dụng của bạn.

### Intlayer xử lý sự phức tạp này như thế nào?

Intlayer sử dụng một phương pháp kết hợp để phát hiện xem một trường có nên được trích xuất để dịch hay không, cố gắng giảm thiểu các kết quả dương tính giả:

1.  **Phân tích AST:** Nó kiểm tra loại phần tử (ví dụ: phân biệt giữa một `reactNode`, một `label`, hoặc một prop `title`).
2.  **Nhận diện mẫu:** Nó phát hiện xem chuỗi có được viết hoa hay có chứa khoảng trắng hay không, gợi ý rằng đó có khả năng là văn bản dễ đọc cho con người thay vì một định danh mã.

### Giới hạn cứng của dữ liệu động

Việc trích xuất của trình biên dịch dựa vào **phân tích tĩnh**. Nó phải nhìn thấy chuỗi ký tự nguyên văn trong mã của bạn để tạo ra một ID ổn định.
Nếu API của bạn trả về một chuỗi mã lỗi như `server_error`, bạn không thể dịch nó bằng trình biên dịch vì trình biên dịch không biết chuỗi đó tồn tại vào thời điểm xây dựng. Bạn buộc phải xây dựng một hệ thống thứ cấp "chỉ chạy thời gian thực" chỉ dành cho dữ liệu động.

### Thiếu phân đoạn (chunking)

Một số trình biên dịch không phân đoạn bản dịch theo từng trang. Nếu trình biên dịch của bạn tạo ra một tệp JSON lớn cho mỗi ngôn ngữ (ví dụ: `./lang/en.json`, `./lang/fr.json`, v.v.), bạn có khả năng sẽ tải nội dung từ tất cả các trang của mình cho một trang được truy cập duy nhất. Ngoài ra, mỗi thành phần sử dụng nội dung của bạn có thể sẽ được khởi tạo với nhiều nội dung hơn mức cần thiết, điều này có thể gây ra các vấn đề về hiệu suất.

Cũng hãy cẩn thận khi tải bản dịch của bạn một cách động. Nếu điều này không được thực hiện, bạn sẽ tải nội dung cho tất cả các ngôn ngữ ngoài ngôn ngữ hiện tại.

> Để minh họa vấn đề, hãy xem xét một trang web có 10 trang và 10 ngôn ngữ (tất cả đều 100% độc nhất). Bạn sẽ tải nội dung cho 99 trang bổ sung (10 × 10 - 1).

### "Sự bùng nổ chunk" và Hiện tượng thác mạng

Để giải quyết vấn đề chunking, một số giải pháp cung cấp chunking theo thành phần, hoặc thậm chí theo từng khóa. Tuy nhiên, vấn đề chỉ được giải quyết một phần. Điểm bán hàng của những giải pháp này thường là nói "Nội dung của bạn được tree-shaken."

Thật vậy, nếu bạn tải nội dung một cách tĩnh, giải pháp của bạn sẽ tree-shake nội dung không sử dụng, nhưng bạn vẫn sẽ kết thúc với nội dung từ tất cả các ngôn ngữ được tải cùng với ứng dụng của bạn.

Vậy tại sao không tải nó một cách động? Đúng vậy, trong trường hợp đó bạn sẽ tải nhiều nội dung hơn mức cần thiết, nhưng điều đó không phải không có những đánh đổi.

Việc tải nội dung một cách động sẽ cô lập mỗi phần nội dung trong một chunk riêng biệt, chỉ được tải khi component đó được render. Điều này có nghĩa là bạn sẽ thực hiện một yêu cầu HTTP cho mỗi khối văn bản. Có 1.000 khối văn bản trên trang của bạn? → 1.000 yêu cầu HTTP đến máy chủ của bạn. Và để hạn chế thiệt hại và tối ưu thời gian render lần đầu của ứng dụng, bạn sẽ cần chèn nhiều ranh giới Suspense hoặc Skeleton Loaders.

> Lưu ý: Ngay cả với Next.js và SSR, các component của bạn vẫn sẽ được hydrate sau khi tải, vì vậy các yêu cầu HTTP vẫn sẽ được thực hiện.

Giải pháp? Áp dụng một giải pháp cho phép khai báo nội dung theo phạm vi, như `i18next`, `next-intl`, hoặc `intlayer` làm.

> Lưu ý: `i18next` và `next-intl` yêu cầu bạn quản lý thủ công việc nhập namespace / messages cho từng trang để tối ưu kích thước bundle. Bạn nên sử dụng công cụ phân tích bundle như `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js), hoặc `webpack-bundle-analyzer` (React CRA / Angular / v.v.) để phát hiện xem bạn có đang làm phình bundle với các bản dịch không sử dụng hay không.

### Chi phí hiệu năng khi chạy

Để làm cho các bản dịch phản ứng (để chúng cập nhật ngay lập tức khi bạn chuyển đổi ngôn ngữ), trình biên dịch thường chèn các hook quản lý trạng thái vào mỗi component.

- **Chi phí:** Nếu bạn render một danh sách gồm 5.000 mục, bạn sẽ khởi tạo 5.000 hook `useState` và `useEffect` chỉ dành cho văn bản. React phải xác định và render lại tất cả 5.000 consumer cùng lúc. Điều này gây ra một block lớn trên "Main Thread", làm đóng băng giao diện người dùng trong quá trình chuyển đổi. Điều này tiêu tốn bộ nhớ và chu kỳ CPU mà các thư viện khai báo (thường sử dụng một Context provider duy nhất) có thể tiết kiệm được.

> Lưu ý rằng vấn đề này tương tự đối với các framework khác ngoài React.

## Cạm bẫy: Bị khóa nhà cung cấp

Hãy cẩn thận khi chọn một giải pháp i18n cho phép trích xuất hoặc di chuyển các khóa dịch.

Trong trường hợp sử dụng thư viện khai báo, mã nguồn của bạn rõ ràng chứa ý định dịch thuật: đây là các khóa của bạn, và bạn kiểm soát chúng. Nếu bạn muốn thay đổi thư viện, bạn thường chỉ cần cập nhật phần import.

Với cách tiếp cận trình biên dịch, mã nguồn của bạn có thể chỉ là văn bản tiếng Anh thuần túy, không có dấu vết của logic dịch thuật: mọi thứ đều được ẩn trong cấu hình công cụ xây dựng. Nếu plugin đó không còn được duy trì hoặc bạn muốn thay đổi giải pháp, bạn có thể bị mắc kẹt. Không có cách dễ dàng để “thoát ra”: không có khóa sử dụng được trong mã của bạn, và bạn có thể cần phải tạo lại tất cả bản dịch cho thư viện mới.

Một số giải pháp cũng cung cấp dịch vụ tạo bản dịch. Hết tín dụng? Hết bản dịch.

Trình biên dịch thường băm văn bản (ví dụ, `"Hello World"` -> `x7f2a`). Các tệp dịch của bạn trông như `{ "x7f2a": "Hola Mundo" }`. Cạm bẫy: Nếu bạn chuyển đổi thư viện, thư viện mới sẽ thấy `"Hello World"` và tìm khóa đó. Nó sẽ không tìm thấy vì tệp dịch của bạn đầy các giá trị băm (`x7f2a`).

### Ràng Buộc Nền Tảng

Bằng cách chọn phương pháp dựa trên trình biên dịch, bạn tự ràng buộc mình vào nền tảng cơ bản. Ví dụ, một số trình biên dịch không có sẵn cho tất cả các bundler (như Vite, Turbopack hoặc Metro). Điều này có thể làm cho việc di chuyển trong tương lai trở nên khó khăn, và bạn có thể cần áp dụng nhiều giải pháp để bao phủ tất cả các ứng dụng của mình.

## Mặt Khác: Rủi Ro của Cách Tiếp Cận Khai Báo

Công bằng mà nói, cách tiếp cận khai báo truyền thống cũng không hoàn hảo. Nó có một số "cạm bẫy" riêng.

1.  **Địa Ngục Namespace:** Bạn thường phải quản lý thủ công các tệp JSON nào sẽ được tải (`common.json`, `dashboard.json`, `footer.json`). Nếu bạn quên một tệp, người dùng sẽ thấy các khóa thô.
2.  **Tải quá mức:** Nếu không cấu hình cẩn thận, rất dễ vô tình tải _tất cả_ các khóa dịch cho _tất cả_ các trang ngay lần tải đầu tiên, làm phình to kích thước gói của bạn.
3.  **Trôi đồng bộ:** Thường xảy ra tình trạng các khóa vẫn còn trong file JSON dù thành phần sử dụng chúng đã bị xóa. Các file dịch của bạn sẽ ngày càng lớn vô hạn, chứa đầy các "khóa ma."

## Giải pháp Trung gian của Intlayer

Đây là nơi các công cụ như **Intlayer** đang cố gắng đổi mới. Intlayer hiểu rằng mặc dù compiler rất mạnh mẽ, nhưng phép thuật ngầm (implicit magic) lại nguy hiểm.

Intlayer cung cấp một phương pháp kết hợp, cho phép bạn tận dụng lợi thế của cả hai cách tiếp cận: quản lý nội dung khai báo, đồng thời tương thích với compiler của nó để tiết kiệm thời gian phát triển.

Ngay cả khi bạn không sử dụng trình biên dịch Intlayer, Intlayer cũng cung cấp lệnh `transform` (cũng có thể truy cập thông qua tiện ích mở rộng VSCode). Thay vì chỉ thực hiện phép thuật trong bước xây dựng ẩn, nó thực sự có thể **viết lại mã thành phần của bạn**. Nó quét văn bản của bạn và thay thế nó bằng các khai báo nội dung rõ ràng trong codebase của bạn.

Điều này mang lại cho bạn lợi ích của cả hai thế giới:

1.  **Độ chi tiết:** Bạn giữ các bản dịch gần với các thành phần của mình (cải thiện tính mô-đun và tree-shaking).
2.  **An toàn:** Bản dịch trở thành mã rõ ràng, không phải phép thuật ẩn trong thời gian xây dựng.
3.  **Không bị khóa:** Vì mã được chuyển đổi thành cấu trúc khai báo trong repo của bạn, bạn có thể dễ dàng nhấn tab, hoặc sử dụng copilot của IDE để tạo các khai báo nội dung, bạn không giấu logic trong plugin webpack.

## Kết luận

Vậy, bạn nên chọn phương án nào?

**Nếu bạn đang xây dựng MVP, hoặc muốn tiến nhanh:**
Phương pháp dựa trên compiler là một lựa chọn hợp lý. Nó cho phép bạn tiến rất nhanh. Bạn không cần phải lo lắng về cấu trúc file hay các khóa. Bạn chỉ cần xây dựng. Nợ kỹ thuật sẽ là vấn đề của "Bạn trong tương lai."

**Nếu bạn là một Junior Developer, hoặc không quan tâm đến tối ưu hóa:**
Nếu bạn muốn ít quản lý thủ công nhất, phương pháp dựa trên compiler có thể là tốt nhất. Bạn sẽ không cần phải xử lý các khóa hay file dịch thuật - chỉ cần viết văn bản, và compiler sẽ tự động hóa phần còn lại. Điều này giảm thiểu công sức thiết lập và các lỗi i18n phổ biến liên quan đến các bước thủ công.

**Nếu bạn đang quốc tế hóa một dự án hiện có đã bao gồm hàng ngàn component cần tái cấu trúc:**
Một phương pháp dựa trên trình biên dịch có thể là một lựa chọn thực tế ở đây. Giai đoạn trích xuất ban đầu có thể tiết kiệm hàng tuần hoặc hàng tháng công việc thủ công. Tuy nhiên, hãy cân nhắc sử dụng một công cụ như lệnh `transform` của Intlayer, có thể trích xuất chuỗi và chuyển đổi chúng thành các khai báo nội dung khai báo rõ ràng. Điều này mang lại cho bạn tốc độ tự động hóa trong khi vẫn duy trì sự an toàn và khả năng di động của phương pháp khai báo. Bạn sẽ có được lợi ích của cả hai thế giới: di chuyển nhanh ban đầu mà không gây ra nợ kiến trúc lâu dài.

**Nếu bạn đang xây dựng một Ứng dụng Chuyên nghiệp, Cấp Doanh nghiệp:**
Phép thuật thường là một ý tưởng tồi. Bạn cần kiểm soát.

- Bạn cần xử lý dữ liệu động từ backend.
- Bạn cần đảm bảo hiệu suất trên các thiết bị cấu hình thấp (tránh hiện tượng quá tải hook).
- Bạn cần đảm bảo rằng bạn không bị khóa vào một công cụ build cụ thể mãi mãi.

Đối với các ứng dụng chuyên nghiệp, **Quản lý Nội dung Khai báo** (như Intlayer hoặc các thư viện đã được thiết lập) vẫn là tiêu chuẩn vàng. Nó tách biệt các mối quan tâm của bạn, giữ cho kiến trúc của bạn sạch sẽ, và đảm bảo rằng khả năng đa ngôn ngữ của ứng dụng không phụ thuộc vào một trình biên dịch "hộp đen" đoán ý định của bạn.
