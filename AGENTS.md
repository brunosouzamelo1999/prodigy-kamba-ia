# Kamba Chat IA — Diretrizes do Workspace

Bem-vindo ao workspace do **Kamba Chat IA**!

## 📌 Visão Geral do Projeto
O **Kamba Chat IA** é uma aplicação web de inteligência artificial conversacional livre, com interface autêntica e minimalista inspirada no ChatGPT, acompanhada de uma landing page focada em usabilidade multi-dispositivo (smartphone, tablet e computador) e identidade visual moderna com estética inspirada em Angola (Palanca Negra / detalhes em amarelo dourado e vermelho carmim).

## 🛠️ Stack Tecnológica
- **Estrutura:** HTML5 Semântico (`index.html`)
- **Estilos:** Vanilla CSS moderno (`styles.css`) sem TailwindCSS
- **Lógica:** Vanilla JavaScript modular (`app.js`)
- **Ícones:** 100% Vetoriais SVG minimalistas (sem emojis informais)
- **Hospedagem / Deploy:** GitHub Pages (`main` branch)

## 📁 Estrutura de Arquivos
- `index.html`: Landing page multi-aparelho e visualizador de chat estilo ChatGPT
- `styles.css`: Sistema de design (paleta dark mode, transições suaves, glassmorphism)
- `app.js`: Lógica do chat, histórico dinâmico, fixação real de conversas, streaming simulado
- `package.json`: Scripts para desenvolvimento e validação
- `kamba-chat-ia.code-workspace`: Configuração do workspace do Antigravity IDE / VS Code

## 🎨 Regras de Design e Diretrizes
1. **Zero Emojis Informais:** Utilizar sempre ícones vetoriais SVG limpos e profissionais.
2. **Interface do Chat:** Manter minimalista — barra lateral com *Novo Chat*, seções *Fixadas* e *Recentes*, perfil do cliente (*Bruno Souza*), botão *Sair do Chat* no topo e estado central *"Vamos começar"*.
3. **Persistência:** Histórico de conversas e estado de fixação (`pinned: true/false`) são salvos no `localStorage`.
