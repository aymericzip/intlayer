<p align="center">
  <a href="https://intlayer.org" rel="">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Intlayer Logo" />
  </a>
</p>

<h1 align="center">
  <strong>Per-component i18n</strong>
</h1>

<h2 align="center">
  <strong>AI-powered translation. Visual Editor. Multilingual CMS.</strong>
</h2>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content" rel="">Docs</a> •
  <a href="https://intlayer.org/doc/environment/nextjs" rel="">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react" rel="">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms" rel="">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk" rel="noopener noreferrer nofollow">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="npm version" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub Stars" height="24"/></a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="monthly downloads" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="license"/></a>
  <a href="https://github.com/aymericzip/intlayer/commits/main" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="last commit"/>
  </a>
</p>

# Intlayer Showcase

Url: [showcase.intlayer.org](https://showcase.intlayer.org)

A community-driven platform where developers can submit and showcase their projects built with **Intlayer**. This application serves as both a live demonstration of Intlayer's i18n capabilities and a hub for gaining visibility through free backlinks.

---

## Key Features

- **Project Submission**: Easily submit your Intlayer-powered project to be featured.
- **SEO Benefits**: Get a **free backlink** to your project, improving your site's authority and reach.
- **Live i18n Showcase**: Explore how different teams implement internationalization using the Intlayer ecosystem (React, Vite, TanStack Router).
- **Built-in Localization Analyzer**: Tools to scan and verify the localization health of submitted projects.
- **Multi-language Support**: The showcase itself is fully localized, demonstrating seamless language switching.

---

## Tech Stack

This project is built using modern web technologies to ensure high performance and developer experience:

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest) (with SSR support)
- **Internationalization**: [Intlayer](https://intlayer.org/) & [React-Intlayer](https://www.npmjs.com/package/react-intlayer)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Storage**: AWS S3 (for project screenshots)
- **Analysis**: [Puppeteer](https://pptr.dev/) (for automated project scanning)

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) or Node.js (v20+)
- MongoDB instance
- AWS S3 Credentials (for image hosting)

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-repo/intlayer-showcase.git
cd intlayer-showcase

```

2. **Install dependencies**:

```bash
bun install

```

3. **Environment Setup**:
   Create a `.env` file based on the required server configurations (DB URI, AWS keys, etc.).
4. **Run Development Server**:

```bash
bun dev

```

Access the app at `http://localhost:3000`.

---

## 🤝 Contributing

We welcome contributions! If you want to improve the showcase or fix a bug:

1. Fork the project.
2. Create your feature branch.
3. Ensure your code passes linting and formatting:

```bash
bun check

```

4. Open a Pull Request.

---

## 📄 License

This project is private/internal. Refer to the owner for licensing details.

Would you like me to generate a specific "How to Submit" guide for your users to include in this README?
