# 🌍 GeoQuessr — Quiz de Bandeiras

> Quiz interativo de bandeiras do mundo com tema minimalista premium em branco e tons marrons vintage.

---

## 📸 Preview

| Tela Inicial | Quiz | Resultado |
|---|---|---|
| Landing page com stats da API | Bandeira + 4 opções + vidas | Anel de pontuação + estatísticas |

---

## ✨ Funcionalidades

- 🏳️ **Quiz de bandeiras** — 10 perguntas aleatórias por rodada
- ❤️ **Sistema de vidas** — 3 vidas; ao perder todas o jogo encerra imediatamente
- 💡 **Dica por pergunta** — revela região, sub-região ou capital do país
- ✕ **Interrupção a qualquer momento** — modal de confirmação antes de sair
- 🔄 **Jogar novamente** ou **← Voltar ao início** na tela de resultado
- ⌨️ **Atalhos de teclado** — `A/B/C/D` ou `1/2/3/4` para responder · `H` para dica · `Q` para sair
- 🌐 **Dados reais** — 250+ países via [RestCountries API](https://restcountries.com)

---

## 🗂️ Estrutura do Projeto

```
projeto-ed2/
├── index.html      # Landing page (tela inicial)
├── quiz.html       # Página do jogo (quiz + resultado)
├── style.css       # Estilos globais
├── script.js       # Lógica do jogo
└── assets/
    └── globe.png   # Favicon / ícone do site
```

---

## 🚀 Como Executar

Basta abrir o arquivo `index.html` em qualquer navegador moderno. Não é necessário servidor ou instalação.

```bash
# Opção 1: abrir direto
xdg-open index.html

# Opção 2: servidor local simples (Python)
python3 -m http.server 8080
# depois acesse: http://localhost:8080
```

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **HTML5 semântico** | `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| **CSS3 + Variáveis CSS** | Design system com tokens de cor, espaçamento e tipografia |
| **JavaScript (ES6+)** | Lógica do jogo, manipulação do DOM, `fetch()` assíncrono |
| **RestCountries API v3.1** | Dados de países: nomes, bandeiras SVG, capital, região |
| **Google Fonts** | Cormorant Garamond (display) + Inter (UI) |

---

## 🎨 Design

Tema **minimalista premium** com paleta branco + marrons vintage:

```
Fundo:        #faf8f5  (branco creme)
Cards:        #ffffff  (branco puro)
Marrom escuro:#4a2c1a  (botões, títulos)
Marrom médio: #7c4a2d  (acentos)
Borda sépia:  #d6c8b8  (divisores)
```

**Tipografia:**
- Display: `Cormorant Garamond` — estilo clássico/editorial
- UI: `Inter` — sans-serif limpo e legível

---

## 📋 Critérios Atendidos (Estudo Dirigido 2)

| Critério | ✅ |
|---|---|
| HTML Semântico (`header`, `main`, `section`, `article`, `footer`) | ✅ |
| Boas Práticas de CSS (variáveis, classes/IDs organizados) | ✅ |
| Design Moderno (cores, tipografia, espaçamentos) | ✅ |
| Consumo de API com `fetch()` | ✅ |
| Interatividade e Animações CSS/JS | ✅ |
| Organização do Projeto (`index.html`, `style.css`, `script.js`, `assets/`) | ✅ |

---

## 📡 API Utilizada

**[RestCountries v3.1](https://restcountries.com)** — API pública, sem chave necessária.

Endpoint usado:
```
GET https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion
```

---

## 👨‍💻 Autor

Desenvolvido como **Estudo Dirigido 2** — Interatividade e APIs com JavaScript.

---

*GeoQuessr © 2026 · HTML, CSS & JavaScript*
