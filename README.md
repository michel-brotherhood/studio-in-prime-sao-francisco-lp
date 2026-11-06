# Studio In Prime São Francisco: LP (handoff interno)

Landing estática (HTML/CSS/JS), mobile first, sem build. Deploy: qualquer hosting estático (Vercel, Hostinger).

## Identidade aplicada (PDFs do cliente)
- Tipografia: Bebas Neue (títulos e botões, via Google Fonts) + Manrope (texto corrido)
- Cores: laranja `#F15A22`, cinza `#6D6E71`, roxo `#6F2C91`; fundo escuro `#231F20` (extraído do PDF do logo)
- Logo: vetorizado a partir de `logo-clube-prime.pdf`. Versão escura usada em header, hero e footer. Fontes em SVG em `assets/fonte/` (versões clara e escura), exportadas em WebP para a página

## Antes de publicar
| Item | Situação |
|---|---|
| Logo | O arquivo recebido diz **"Clube Prime"**. Confirmar com o cliente se é o logo correto para a unidade "Studio In Prime" |
| Club Teen Prime | Logo recebido, mas **não está no copy** (público de 12 a 16 anos). Não incluído. Se houver oferta teen, criar seção própria |
| WhatsApp | +55 21 99033-6065 (informado pelo responsável) |
| Grade das coletivas | Não recebida. O CTA "Ver horários das coletivas" abre o WhatsApp. Se vier a grade, criar seção própria |
| Domínio | Sem `canonical` por enquanto. Adicionar `<link rel="canonical">` e `og:url` com a URL real após definir o domínio |
| Imagem OG | Não há. Adicionar `og:image` (1200x630) com foto real da unidade |
| Fotos reais | Recomendado: hero e seção de conforto convertem mais com fotos da unidade |
| Analytics | `script.js` dispara `cta_click` para GA4/GTM/Meta Pixel se instalados |
| Contraste | Botões laranja usam texto escuro `#231F20` (4,8:1). Texto branco sobre o laranja `#F15A22` dá só 3,4:1 e não deve ser usado em texto pequeno. Laranja como cor de texto só sobre fundo escuro |
| Favicon | Gerado a partir do símbolo do logo (`assets/favicon-*.png`). Revisar com o cliente |
| Vídeos do espaço | 3 loops verticais (540x960, 100 a 170 KB cada, sem áudio) gerados dos clipes C9737, C9739 e C9740, cortados antes do trecho tremido e repetidos em vai e volta. Tocam só quando visíveis, têm botão de pausa e não tocam sozinhos com "reduzir movimento". Originais 4K ficam fora do projeto |
| Vídeo do dono (70 s) | Incluído na seção "Uma palavra do dono" (540x960, 4,4 MB, com áudio; não toca sozinho, tem controles e poster). O nome do dono não foi informado e não aparece na página. Pendente de conferência: a fala cita "Região Oceânica"; o responsável pediu para ignorar esse ponto |
| Hero em vídeo | Header flutuante (pílula) e hero em tela cheia com vídeo de fundo. Arquivos esperados em `assets/video/`: `hero-wide.mp4` (desktop), `hero-tall.mp4` (mobile) e `hero-poster.webp`. Arquivos prontos: loops em vai e volta (desktop 0,8 MB, mobile 0,5 MB, sem áudio) e posters `hero-poster.webp` / `hero-poster-tall.webp`. Vídeos gerados por IA (Magnific, Seedance 2.0 Mini): imagem ambiente de reformer, sem rosto e sem texto. Trocar por filmagem real da unidade quando houver. Se o vídeo falhar, o hero cai para o poster e o gradiente |
| Status "Aberto agora" | Calculado no navegador (fuso de São Paulo) a partir dos horários informados. Não detecta feriados |
| Botões de WhatsApp | Padrão: ícone oficial do WhatsApp + verbo de ação ("Consultar planos", "Falar com a unidade"), sem usar só o nome da marca como rótulo; mensagem pré-preenchida por botão; alvo de toque mínimo de 44 px. O botão flutuante só aparece depois que o CTA do hero sai da tela. Textos das demais CTAs mantidos como no copy |
| Auditoria responsiva | Testado em 320, 360, 390, 430, 768, 1024, 1280, 1536 px e celular deitado (844x390): sem rolagem horizontal, sem alvo de toque abaixo de 44 px, sem fonte abaixo de 12 px. Testar também em aparelhos reais (iOS Safari e Android Chrome) |
| Deploy (Vercel) | `vercel.json` já incluído (cache de assets e cabeçalhos básicos). **Contém `X-Robots-Tag: noindex`** para a versão de teste não ser indexada: remover esse cabeçalho no lançamento, junto com a definição do domínio e do `canonical` |
| Ticker | Animação para ao passar o mouse e é desligada com "reduzir movimento" do sistema. Está oculto para leitores de tela (o conteúdo existe nos cards) |

## Dados confirmados
- Endereço: Av. Rui Barbosa, 251, São Francisco, Niterói, RJ, CEP 24360-440
- Horários: seg a sex 6h às 22h; sáb, dom e feriados 9h às 13h (conforme briefing)
- Preços e taxa de adesão: propositalmente fora da página ("consulte a equipe")

## SEO local
JSON-LD `HealthClub` com endereço, telefone e horários. Recomendado: vincular ao Google Business Profile da unidade.
