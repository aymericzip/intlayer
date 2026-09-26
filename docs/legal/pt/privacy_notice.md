---
createdAt: 2025-04-18
updatedAt: 2026-09-22
priority: 1
title: Aviso de Privacidade do Intlayer
description: Descubra como o Intlayer lida com as informações coletadas através do nosso site e CMS. Siga a documentação para entender os diferentes formatos e casos de uso.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Privacidade
  - Aviso
  - Cookies
  - Rastreamento
  - Análise
  - Google Analytics
  - Meta (Facebook) Pixel
  - Autenticação
  - Dados do Usuário
slugs:
  - privacy-notice
author: aymericzip
---

# Aviso de Privacidade do Intlayer

## Introdução

No Intlayer, levamos a privacidade a sério. Este aviso explica como lidamos com as informações coletadas através do nosso site e CMS.

## Contato

Se você tiver alguma dúvida ou preocupação sobre privacidade, por favor, entre em contato conosco no seguinte endereço: [contact@intlayer.org](mailto:contact@intlayer.org).

## Uso de Cookies e Tecnologias de Rastreamento

Utilizamos **Google Analytics** e o **Meta (Facebook) Pixel** para analisar o uso do nosso site e melhorar nossos serviços. Essas ferramentas geram estatísticas e outras informações sobre o site utilizando cookies armazenados nos dispositivos dos usuários.

Para mais informações:

- [Política de privacidade do Google](https://policies.google.com/privacy)
- [Política de privacidade da Meta](https://www.facebook.com/privacy/policy)

## Autenticação e Dados do Usuário

O acesso ao CMS do Intlayer requer autenticação do usuário. Oferecemos autenticação por e-mail/senha e login via terceiros através do **Google** e **GitHub**.

Durante o processo de autenticação, coletamos:

- Endereço de e-mail
- Nome de exibição (ou nome escolhido)

Os usuários também podem acessar o CMS por meio de tokens de acesso vinculados à sua conta. Esses tokens estão ligados aos mesmos dados de autenticação.

## Intlayer i18n Scanner (extensão do Chrome)

A extensão do Chrome **Intlayer i18n Scanner** inspeciona a configuração de internacionalização da página aberta na aba atual.

- **Análise local:** Quando você abre o popup da extensão, ela lê a página atual (atributos de idioma, links hreflang, meta tags, variáveis globais do framework) diretamente no seu navegador. Esse conteúdo não é enviado aos nossos servidores.
- **Auditoria:** Somente quando você clica no botão de análise, a URL da página atual é enviada à API da Intlayer (`back.intlayer.org`) para realizar a auditoria. Armazenamos apenas o **nome de domínio** da página analisada, a **pontuação** obtida e a **data** da análise, para calcular estatísticas agregadas. Esse registro não está vinculado à sua identidade nem a uma conta Intlayer.
- **Nenhuma outra coleta:** A extensão não coleta informações pessoais, dados de autenticação ou atividade do usuário, não rastreia as páginas que você visita, não utiliza cookies nem ferramentas de análise e não executa código remoto.

## Armazenamento e Segurança dos Dados

Os dados de autenticação dos usuários são armazenados em um **banco de dados MongoDB** hospedado no **cloud.mongodb.com**:

- **Região:** AWS / Oregon (us-west-2)
- **Tipo:** Replica Set (3 nós)
- **Segurança de Senha:** Todas as senhas são criptografadas usando práticas padrão da indústria.

Não armazenamos quaisquer dados pessoais desnecessários além do que é exigido para autenticação e acesso seguro ao CMS.

## Compartilhamento de Dados com Terceiros

Não vendemos nem compartilhamos seus dados pessoais com terceiros, exceto quando necessário para análises (Google Analytics, Facebook Pixel) ou como parte do processo de autenticação (login via Google ou GitHub).

## Direitos dos Usuários

Como usuário, você tem o direito de:

- Acessar os dados pessoais que mantemos sobre você
- Solicitar a correção ou exclusão dos seus dados
- Revogar o acesso ou excluir sua conta

Para qualquer solicitação relacionada aos seus dados, entre em contato conosco pelo e-mail [contact@intlayer.org](mailto:contact@intlayer.org).

## Alterações Neste Aviso

Podemos atualizar este aviso de privacidade periodicamente. Recomendamos que os usuários verifiquem esta página regularmente para se manterem informados sobre quaisquer mudanças.
