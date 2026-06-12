---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: Xây dựng Trợ lý Tài liệu được hỗ trợ bởi RAG (Phân đoạn, Embeddings và Tìm kiếm)
description: Xây dựng Trợ lý Tài liệu được hỗ trợ bởi RAG (Phân đoạn, Embeddings và Tìm kiếm)
keywords:
  - RAG
  - Tài liệu
  - Trợ lý
  - Phân đoạn
  - Embeddings
  - Tìm kiếm
slugs:
  - blog
  - rag-powered-documentation-assistant
author: aymericzip
---

# Xây dựng Trợ lý Tài liệu được hỗ trợ bởi RAG (Phân đoạn, Embeddings và Tìm kiếm)

## Những gì bạn nhận được

Tôi đã xây dựng một trợ lý tài liệu được hỗ trợ bởi RAG và đóng gói nó thành một boilerplate mà bạn có thể sử dụng ngay lập tức.

- Bao gồm một ứng dụng sẵn sàng sử dụng (Next.js + OpenAI API)
- Bao gồm một pipeline RAG hoạt động (phân đoạn, embeddings, độ tương đồng cosine)
- Cung cấp một giao diện chatbot hoàn chỉnh được xây dựng bằng React
- Tất cả các thành phần UI đều có thể chỉnh sửa hoàn toàn với Tailwind CSS
- Ghi lại mọi truy vấn của người dùng để giúp xác định tài liệu thiếu, điểm đau của người dùng và cơ hội sản phẩm

👉 [Bản demo trực tiếp](https://intlayer.org/doc/why) 👉 [Boilerplate mã nguồn](https://github.com/aymericzip/smart_doc_RAG)

## Giới thiệu

Nếu bạn từng bị lạc trong tài liệu, cuộn mãi để tìm một câu trả lời, bạn sẽ hiểu nó đau đầu như thế nào. Tài liệu rất hữu ích, nhưng chúng tĩnh và việc tìm kiếm thường cảm thấy vụng về.

Đó là lúc **RAG (Retrieval-Augmented Generation)** phát huy tác dụng. Thay vì bắt người dùng phải tìm kiếm trong văn bản, chúng ta có thể kết hợp **retrieval** (tìm phần phù hợp trong tài liệu) với **generation** (để một LLM giải thích một cách tự nhiên).

Trong bài viết này, tôi sẽ hướng dẫn bạn cách tôi xây dựng một chatbot tài liệu được hỗ trợ bởi RAG và cách nó không chỉ giúp người dùng tìm câu trả lời nhanh hơn mà còn cung cấp cho các nhóm sản phẩm một cách mới để hiểu các điểm đau của người dùng.

## Tại sao sử dụng RAG cho tài liệu?

RAG đã trở thành một phương pháp phổ biến vì một lý do: đây là một trong những cách thực tế nhất để làm cho các mô hình ngôn ngữ lớn thực sự hữu ích.

Đối với tài liệu, các lợi ích rất rõ ràng:

- Câu trả lời tức thì: người dùng hỏi bằng ngôn ngữ tự nhiên và nhận được câu trả lời phù hợp.
- Ngữ cảnh tốt hơn: mô hình chỉ xem các phần tài liệu liên quan nhất, giảm thiểu ảo tưởng.
- Tìm kiếm cảm giác như con người: giống như kết hợp Algolia + FAQ + chatbot trong một.
- Vòng phản hồi: bằng cách lưu trữ các truy vấn, bạn khám phá được những gì người dùng thực sự gặp khó khăn.

Điểm cuối cùng đó rất quan trọng. Hệ thống RAG không chỉ trả lời câu hỏi, mà còn cho bạn biết người dùng đang hỏi gì. Điều đó có nghĩa là:

- Bạn phát hiện ra những thông tin còn thiếu trong tài liệu của mình.
- Bạn thấy các yêu cầu tính năng mới xuất hiện.
- Bạn nhận ra các mẫu có thể thậm chí hướng dẫn chiến lược sản phẩm.

Vì vậy, RAG không chỉ là một công cụ hỗ trợ. Nó còn là một **công cụ khám phá sản phẩm**.

## Cách hoạt động của Pipeline RAG

![Pipeline RAG](https://github.com/aymericzip/intlayer/blob/main/docs/assets/rag_flow.svg)

Ở mức độ tổng quan, đây là công thức tôi đã sử dụng:

1. **Chia nhỏ tài liệu** Các file Markdown lớn được chia thành các phần nhỏ. Việc chia nhỏ cho phép cung cấp làm ngữ cảnh chỉ những phần tài liệu liên quan.
2. **Tạo embeddings** Mỗi đoạn được chuyển thành một vector bằng cách sử dụng API embedding của OpenAI (text-embedding-3-large) hoặc một cơ sở dữ liệu vector (Chroma, Qdrant, Pinecone).
3. **Lập chỉ mục & lưu trữ** Embeddings được lưu trong một file JSON đơn giản (cho bản demo của tôi), nhưng trong môi trường sản xuất, bạn có thể sẽ sử dụng một cơ sở dữ liệu vector.
4. **Truy xuất (R trong RAG)** Truy vấn của người dùng được chuyển thành embedding, tính toán độ tương đồng cosine, và các đoạn phù hợp nhất được truy xuất.
5. **Tăng cường + Tạo (AG trong RAG)** Những đoạn đó được chèn vào prompt cho ChatGPT, để mô hình trả lời với ngữ cảnh thực tế từ tài liệu.
6. **Ghi lại truy vấn để phản hồi** Mỗi truy vấn của người dùng đều được lưu lại. Đây là nguồn dữ liệu quý giá để hiểu các điểm đau, tài liệu còn thiếu, hoặc cơ hội mới.

<Steps>

<Step number={1} title="Đọc tài liệu">

Bước đầu tiên rất đơn giản: tôi cần một cách để quét thư mục docs/ để lấy tất cả các file .md. Sử dụng Node.js và glob, tôi đã lấy nội dung của từng file Markdown vào bộ nhớ.

Điều này giữ cho pipeline linh hoạt: thay vì Markdown, bạn có thể lấy tài liệu từ cơ sở dữ liệu, một CMS, hoặc thậm chí một API.

</Step>

<Step number={2} title="Chia nhỏ tài liệu">

Tại sao phải chia nhỏ? Vì các mô hình ngôn ngữ có **giới hạn ngữ cảnh**. Cung cấp cho chúng một cuốn sách tài liệu toàn bộ sẽ không hiệu quả.

Vì vậy, ý tưởng là chia văn bản thành các đoạn nhỏ có thể quản lý được (ví dụ: mỗi đoạn 500 token) với phần chồng lấn (ví dụ: 100 token). Phần chồng lấn đảm bảo tính liên tục để bạn không mất ý nghĩa ở ranh giới các đoạn.

<p align="center">
  <img width="480" alt="Nguồn dữ liệu đáng tin cậy" src="https://github.com/user-attachments/assets/ee548851-7206-4cc6-821e-de8a4366c6a3" />
</p>

**Ví dụ:**

- Chunk 1 → “…thư viện cũ mà nhiều người đã quên lãng. Những kệ sách cao chót vót chứa đầy sách…”
- Chunk 2 → “…những kệ sách chứa đầy sách từ mọi thể loại có thể tưởng tượng, mỗi cuốn thì thầm những câu chuyện…”

Phần chồng lấn đảm bảo cả hai đoạn đều chứa ngữ cảnh chung, giúp việc truy xuất thông tin vẫn mạch lạc.

Sự đánh đổi này (kích thước đoạn so với phần chồng lấn) là yếu tố then chốt cho hiệu quả của RAG:

- Quá nhỏ → bạn sẽ nhận được nhiều nhiễu.
- Quá lớn → bạn làm phình to kích thước ngữ cảnh.

</Step>

<Step number={3} title="Tạo Embeddings">

Khi tài liệu đã được chia nhỏ, chúng ta tạo ra **embeddings**, các vector đa chiều đại diện cho mỗi đoạn.

Tôi đã sử dụng mô hình text-embedding-3-large của OpenAI, nhưng bạn có thể dùng bất kỳ mô hình embedding hiện đại nào.

**Ví dụ embedding:**

```js
[
  -0.0002630692, -0.029749284, 0.010225477, -0.009224428, -0.0065269712,
  -0.002665544, 0.003214777, 0.04235309, -0.033162255, -0.00080789323,
  //...+1533 elements
];
```

Mỗi vector là một dấu vân tay toán học của văn bản, cho phép tìm kiếm tương đồng.

</Step>

<Step number={4} title="Lập chỉ mục & Lưu trữ Embeddings">

Để tránh phải tạo lại embeddings nhiều lần, tôi đã lưu chúng trong file embeddings.json.

Trong môi trường sản xuất, bạn có thể muốn sử dụng một cơ sở dữ liệu vector như:

- Chroma
- Qdrant
- Pinecone
- FAISS, Weaviate, Milvus, v.v.

Các cơ sở dữ liệu vector xử lý việc lập chỉ mục, khả năng mở rộng và tìm kiếm nhanh. Nhưng với nguyên mẫu của tôi, một file JSON cục bộ là đủ.

</Step>

<Step number={5} title="Truy xuất với Cosine Similarity">

Khi người dùng đặt câu hỏi:

1.  Tạo embedding cho truy vấn.
2.  So sánh nó với tất cả embeddings trong tài liệu bằng **cosine similarity**.
3.  Chỉ giữ lại N đoạn có độ tương đồng cao nhất.

Cosine similarity đo góc giữa hai vector. Một kết quả khớp hoàn hảo sẽ có điểm số **1.0**.

Bằng cách này, hệ thống tìm được các đoạn tài liệu gần nhất với truy vấn.

</Step>

<Step number={6} title="Tăng cường + Tạo nội dung">

Giờ đến phần kỳ diệu. Chúng ta lấy các đoạn tài liệu hàng đầu và chèn chúng vào **system prompt** cho ChatGPT.

Điều đó có nghĩa là mô hình trả lời như thể những đoạn đó là một phần của cuộc trò chuyện.

Kết quả: các câu trả lời chính xác, **dựa trên tài liệu**.

</Step>

<Step number={7} title="Ghi lại các truy vấn của người dùng">

Đây là siêu năng lực ẩn.

Mỗi câu hỏi được hỏi đều được lưu lại. Theo thời gian, bạn xây dựng một bộ dữ liệu gồm:

- Các câu hỏi thường gặp nhất (tuyệt vời cho phần FAQ)
- Các câu hỏi chưa được trả lời (tài liệu thiếu hoặc không rõ ràng)
- Các yêu cầu tính năng được ngụy trang dưới dạng câu hỏi (“Nó có tích hợp với X không?”)
- Các trường hợp sử dụng mới nổi mà bạn chưa dự tính đến

Điều này biến trợ lý RAG của bạn thành một **công cụ nghiên cứu người dùng liên tục**.

</Step>

<Step number={8} title="Chi Phí Là Bao Nhiêu?">

Một phản đối phổ biến đối với RAG là chi phí. Trên thực tế, nó rẻ đến bất ngờ:

- Tạo embeddings cho khoảng ~200 tài liệu mất khoảng **5 phút** và chi phí khoảng **1–2 euro**.
- Tính năng tìm kiếm tài liệu hoàn toàn miễn phí.
- Đối với các truy vấn, chúng tôi sử dụng gpt-4o-latest mà không bật chế độ “suy nghĩ”. Trên Intlayer, chúng tôi thấy khoảng **300 truy vấn chat mỗi tháng**, và hóa đơn API OpenAI hiếm khi vượt quá **10 đô la**.

Ngoài ra, bạn có thể tính thêm chi phí lưu trữ.

</Step>

<Step number={9} title="Chi Tiết Triển Khai">

Stack:

- Monorepo: pnpm workspace
- Gói tài liệu: Node.js / TypeScript / OpenAI API
- Frontend: Next.js / React / Tailwind CSS
- Backend: Node.js API route / OpenAI API

Gói `@smart-doc/docs` là một gói TypeScript xử lý việc xử lý tài liệu. Khi một tệp markdown được thêm hoặc sửa đổi, gói này bao gồm một script `build` để xây dựng lại danh sách tài liệu trong mỗi ngôn ngữ, tạo embeddings và lưu chúng vào tệp `embeddings.json`.

Đối với frontend, chúng tôi sử dụng ứng dụng Next.js cung cấp:

- Chuyển đổi Markdown sang HTML
- Thanh tìm kiếm để tìm tài liệu liên quan
- Giao diện chatbot để đặt câu hỏi về tài liệu

Để thực hiện tìm kiếm tài liệu, ứng dụng Next.js bao gồm một API route gọi một hàm trong gói `@smart-doc/docs` để lấy các đoạn tài liệu phù hợp với truy vấn. Sử dụng các đoạn này, chúng tôi có thể trả về danh sách các trang tài liệu liên quan đến tìm kiếm của người dùng.

Đối với chức năng chatbot, chúng tôi theo cùng một quy trình tìm kiếm nhưng bổ sung thêm việc chèn các đoạn tài liệu thu thập được vào prompt gửi đến ChatGPT.

Dưới đây là ví dụ về một prompt gửi đến ChatGPT:

Prompt hệ thống:

```txt
Bạn là một trợ lý hữu ích có thể trả lời các câu hỏi về tài liệu Intlayer.

Các đoạn liên quan:

-----
docName: "getting-started"
docChunk: "1/3"
docUrl: "https://example.com/docs/en/getting-started"
---

# Cách bắt đầu

...

-----
docName: "another-doc"
docChunk: "1/5"
docUrl: "https://example.com/docs/en/another-doc"
---

# Tài liệu khác

...
```

Truy vấn người dùng:

```txt
Làm thế nào để bắt đầu?
```

Chúng tôi sử dụng SSE để truyền trực tiếp phản hồi từ API route.

Như đã đề cập, chúng tôi sử dụng gpt-4-turbo mà không có chế độ "suy nghĩ". Các phản hồi có liên quan và độ trễ thấp.
Chúng tôi đã thử nghiệm với gpt-5, nhưng độ trễ quá cao (đôi khi lên đến 15 giây cho một phản hồi). Nhưng chúng tôi sẽ xem xét lại điều đó trong tương lai.

👉 [Thử bản demo tại đây](https://intlayer.org/doc/why) 👉 [Xem mẫu mã nguồn trên GitHub](https://github.com/aymericzip/smart_doc_RAG)

</Step>

<Step number={10} title="Tiến xa hơn">

Dự án này là một triển khai tối giản. Nhưng bạn có thể mở rộng nó theo nhiều cách:

- MCP server → chuyển chức năng tìm kiếm tài liệu sang một MCP server để kết nối tài liệu với bất kỳ trợ lý AI nào

- Vector DBs → mở rộng quy mô đến hàng triệu đoạn tài liệu
- LangChain / LlamaIndex → các framework sẵn sàng cho pipeline RAG
- Bảng điều khiển phân tích → trực quan hóa các truy vấn người dùng và điểm đau
- Truy xuất đa nguồn → không chỉ lấy tài liệu, mà còn các mục cơ sở dữ liệu, bài đăng blog, vé hỗ trợ, v.v.
- Cải thiện prompting → sắp xếp lại, lọc và tìm kiếm kết hợp (từ khóa + ngữ nghĩa)

</Step>

<Step number={11} title="Những Hạn Chế Chúng Tôi Gặp Phải">

- Việc chia đoạn và chồng lấn là dựa trên kinh nghiệm thực nghiệm. Cân bằng đúng (kích thước đoạn, tỷ lệ chồng lấn, số đoạn được truy xuất) cần phải lặp lại và thử nghiệm.
- Embeddings không được tự động tạo lại khi tài liệu thay đổi. Hệ thống của chúng tôi chỉ đặt lại embeddings cho một file nếu số lượng đoạn khác với số đã lưu.
- Trong nguyên mẫu này, embeddings được lưu trữ dưới dạng JSON. Điều này phù hợp cho các bản demo nhưng gây ô nhiễm Git. Trong môi trường sản xuất, sử dụng cơ sở dữ liệu hoặc kho vector chuyên dụng sẽ tốt hơn.

</Step>

<Step number={12} title="Tại Sao Điều Này Quan Trọng Ngoài Tài Liệu">

Phần thú vị không chỉ là chatbot. Đó là **vòng phản hồi**.

Với RAG, bạn không chỉ trả lời:

- Bạn học được điều gì làm người dùng bối rối.
- Bạn khám phá ra những tính năng họ mong đợi.
- Bạn điều chỉnh chiến lược sản phẩm dựa trên các truy vấn thực tế.

**Ví dụ:**

Hãy tưởng tượng ra mắt một tính năng mới và ngay lập tức thấy:

- 50% câu hỏi liên quan đến cùng một bước thiết lập chưa rõ ràng
- Người dùng liên tục yêu cầu một tích hợp mà bạn chưa hỗ trợ
- Mọi người tìm kiếm các thuật ngữ tiết lộ một trường hợp sử dụng mới

Đó chính là **trí tuệ sản phẩm** trực tiếp từ người dùng của bạn.

</Step>

<Step number={13} title="Kết luận">

RAG là một trong những cách đơn giản nhất và mạnh mẽ nhất để làm cho LLM trở nên thực tiễn. Bằng cách kết hợp **truy xuất + tạo sinh**, bạn có thể biến tài liệu tĩnh thành một **trợ lý thông minh** và đồng thời thu được một dòng thông tin liên tục về sản phẩm.

Đối với tôi, dự án này cho thấy RAG không chỉ là một thủ thuật kỹ thuật. Nó là cách để biến tài liệu thành:

- một hệ thống hỗ trợ tương tác
- một kênh phản hồi
- một công cụ chiến lược sản phẩm

👉 [Thử bản demo tại đây](https://intlayer.org/doc/why) 👉 [Xem mẫu code trên GitHub](https://github.com/aymericzip/smart_doc_RAG)

Và nếu bạn cũng đang thử nghiệm với RAG, tôi rất muốn nghe cách bạn đang sử dụng nó như thế nào.

</Step>

</Steps>
