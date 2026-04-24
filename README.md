# 🌍 GeoQuessr — Quiz de Bandeiras

Este é o projeto desenvolvido para o **Estudo Dirigido 2: Interatividade e APIs com JavaScript**. O objetivo é criar uma aplicação web que consome uma API pública e apresenta dados de forma dinâmica e interativa.

## 📚 Sobre o Projeto

O **GeoQuessr** é um quiz interativo de bandeiras do mundo. O jogador deve adivinhar o país correto a partir de sua bandeira, com 3 vidas e dicas disponíveis. O projeto utiliza a API pública [RestCountries](https://restcountries.com) para carregar dados reais de mais de 250 países.

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estruturação semântica (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) com atributos ARIA de acessibilidade.
- **CSS3**: Variáveis CSS, animações, transições e design minimalista premium.
- **JavaScript (ES6+)**: Manipulação do DOM, eventos, `fetch()` assíncrono e lógica do jogo.
- **RestCountries API v3.1**: API pública, sem necessidade de chave.
- **Google Fonts**: Cormorant Garamond (display) + Inter (UI).

## 📂 Estrutura do Projeto

```text
projeto-ed2/
├── index.html      # Landing page (tela inicial)
├── quiz.html       # Página do jogo (quiz + resultado)
├── style.css       # Estilos globais compartilhados
├── script.js       # Lógica do jogo (usado por quiz.html)
└── assets/
    └── globe.png   # Favicon / ícone do site
```

## ✨ Funcionalidades

1. **Landing Page** — Tela inicial com estatísticas carregadas da API e botão para iniciar o quiz.
2. **Quiz de Bandeiras** — 10 perguntas aleatórias com 4 opções de resposta por rodada.
3. **Sistema de Vidas** — 3 vidas (❤️); ao perder todas, o jogo encerra imediatamente.
4. **Dica por Pergunta** — Revela região, sub-região ou capital do país (1 dica por pergunta).
5. **Interrupção** — Botão "✕ Sair do Quiz" com modal de confirmação antes de sair.
6. **Tela de Resultado** — Anel de pontuação animado, estatísticas da partida e opções de jogar novamente ou voltar ao início.
7. **Atalhos de Teclado** — `A/B/C/D` ou `1/2/3/4` para responder · `H` para dica · `Q` para sair.
8. **Design Responsivo** — Layout adaptado para desktop e mobile.

## 🛠️ Como Visualizar

Para abrir o projeto localmente:

1. Faça o clone ou download deste repositório.
2. Navegue até a pasta `projeto-ed2`.
3. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge, Safari).

Não é necessário servidor ou instalação — o projeto roda diretamente no navegador.

## 📋 Critérios Atendidos (Estudo Dirigido 2)

| Critério | Status |
|---|---|
| HTML Semântico (`header`, `main`, `section`, `article`, `footer`) | ✅ |
| Boas Práticas de CSS (variáveis, classes/IDs organizados) | ✅ |
| Design Moderno (cores, tipografia, espaçamentos) | ✅ |
| Consumo de API com `fetch()` | ✅ |
| Interatividade e Animações CSS/JS | ✅ |
| Organização do Projeto (`index.html`, `style.css`, `script.js`, `assets/`) | ✅ |

---

Desenvolvido por **Moisés Henrique** como parte do aprendizado em Desenvolvimento Web.
