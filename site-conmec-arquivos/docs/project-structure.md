# Estrutura do Projeto — Conmec Industrial

## Visão Geral

Este documento descreve a organização dos arquivos do projeto e a lógica de cada pasta.

## Pastas

### `/src`
Código-fonte principal do site.
- `index.html` — Homepage completa
- `/components` — Reservado para snippets de header, footer e componentes reutilizáveis
- `/layout` — Estruturas de layout base (containers, grids)
- `/sections` — Seções isoladas para referência e manutenção

### `/assets`
Recursos estáticos do projeto.
- `/images` — Fotografias industriais, imagem de hero, fotos de cases
- `/icons` — Ícones SVG de serviços e diferenciais

### `/styles`
Estilos do projeto.
- `main.css` — Sistema de design completo (tokens de cor, tipografia, espaçamento) + estilos de todos os componentes

### `/docs`
Documentação técnica.
- `project-structure.md` — Este arquivo
- `elementor-mapping.md` — Guia para replicação em WordPress/Elementor

## Seções da Homepage (ordem de renderização)

| # | ID da Seção | Conteúdo |
|---|---|---|
| 1 | `#header` | Logo + Menu + CTA fixo |
| 2 | `#hero` | Headline principal + CTAs + imagem de fundo industrial |
| 3 | `#numeros` | Contadores de credibilidade (30 anos, 22.000m², etc.) |
| 4 | `#servicos` | Cards de serviços com ícone + título + descrição |
| 5 | `#setores` | Setores atendidos (Papel/Celulose, Siderurgia, etc.) |
| 6 | `#portfolio` | Cases em destaque com cliente + prazo |
| 7 | `#clientes` | Logo wall de grandes clientes |
| 8 | `#diferenciais` | Por que a Conmec? — 5 diferenciais competitivos |
| 9 | `#cta-final` | Chamada para contato comercial |
| 10 | `#footer` | Rodapé com endereço, links e contato |

## Paleta de Cores

| Variável CSS | HEX | Uso |
|---|---|---|
| `--color-amber` | `#E39A38` | CTAs, ícones, números de destaque |
| `--color-navy` | `#133B5C` | Header, fundos de seção escura |
| `--color-dark` | `#1A1A1A` | Texto corpo, rodapé |
| `--color-gray-bg` | `#F4F4F4` | Fundo de seções alternadas |
| `--color-white` | `#FFFFFF` | Fundo padrão |
| `--color-gray-text` | `#666666` | Subtítulos, legendas |

## Tipografia

- **Títulos (H1–H3):** Montserrat Bold/ExtraBold (substituto web para Blatant)
- **Corpo:** Inter Regular/Medium
- **Tamanho base:** 16px (desktop)
