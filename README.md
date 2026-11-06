# Studio In Prime São Francisco: LP (handoff interno)

Landing estática (HTML/CSS/JS), mobile first, sem build. Deploy: qualquer hosting estático (Vercel, Hostinger).

## Identidade aplicada (PDFs do cliente)
- Tipografia: Bebas Neue (títulos e botões, via Google Fonts) + Manrope (texto corrido)
- Cores: laranja `#F15A22`, cinza `#6D6E71`, roxo `#6F2C91`; fundo escuro `#231F20` (extraído do PDF do logo)
- Logo: vetorizado a partir de `logo-clube-prime.pdf`. Versão escura usada em header, hero e footer. Fontes em SVG em `assets/fonte/` (versões clara e escura), exportadas em WebP para a página

## Antes de publicar
| Item | Situação |
|---|---|
| Logo | Atualizado para o logotipo "StudioInPrime" (anexo do cliente). Variante clara para fundo claro e variante clareada para fundo escuro em `assets/logo-*.webp`; favicon gerado do símbolo "S" |
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

| CTA da experimental | Todos os CTAs da aula experimental (cabeçalho, hero, seção Experimental, fechamento, botão flutuante) usam `https://wa.me/5521990336065?text=` com a mensagem da experimental. Os demais links mantêm mensagem do próprio assunto |
| Oferta | A página menciona **uma** aula gratuita. Até três aulas, All Day e valores citados em reunião aguardam validação comercial e não estão na página |
| Animações | Botões 3D (borda inferior, brilho, varredura de luz, estado pressionado), revelação ao rolar, entrada do hero, hovers e barra de progresso. Tudo desligado com "reduzir movimento" |
| Canonical / imagem social | Ainda não existem; manter pendente até definir domínio e foto real |

| Planos oculto | A seção `#planos` está no HTML com o atributo `hidden`, fora do menu e sem CTA "Comparar planos" no hero, porque o foco da LP é a aula experimental. Para reativar: remover `hidden`, recolocar o link no menu e o CTA secundário no hero |
| Texto de bem-estar | A seção Conforto abre com o texto sugerido pelo responsável ("clube exclusivo", massagens inclusas nos planos...). Confirmado pelo responsável; conferir com o cliente a frase "massagens inclusas nos planos" (o briefing citava só o Plano Prime) |
| Diferenciais | Nova seção `#diferenciais` (menu e header) com 6 cards e CTA da experimental. Textos derivados do copy do cliente, sem promessas novas |
| CTA do header | Fica oculto no hero (que já tem o CTA) e aparece, com animação, quando o CTA do hero sai da tela; junto com o botão flutuante |

| Galeria | Seção `#galeria`: carrossel com 12 fotos da unidade (`assets/fotos/`, WebP 900 px, carregamento sob demanda), setas, contador e teclado. Fora da seleção: foto do console de esteira, foto com cliente deitada na poltrona de massagem e uma segunda sala de massagem repetida |
| Vídeo do fundador | Passa a tocar mudo e em loop quando está visível, com botões de pausa e de som. Não toca sozinho com "reduzir movimento" |
| Rodapé e privacidade | Rodapé com menu, redes (Instagram `studioin_prime`, Facebook `studioinoficial`), endereço, horários e link para `privacidade.html` (texto LGPD escrito conforme o que o site faz hoje: sem formulário, WhatsApp, Google Maps e Google Fonts). CNPJ 59.959.806/0001-54 informado pelo responsável (dígitos verificadores válidos; razão social e situação cadastral não conferidos na Receita, porque as consultas públicas ficaram inacessíveis). Aparece no rodapé e na seção 1 da política. Se instalar GA4/Meta Pixel, atualizar a política e avaliar aviso de cookies |

| Hero: vídeos | Rotação entre o vídeo do hero, os clipes do espaço (Neon e Pedalar) e um vídeo de musculação gerado por IA (Magnific, Seedance 2.0 Mini; `hero-musculacao-wide/tall.mp4`, sem pessoas nem texto); o clipe de Spinning saiu da rotação. Botão de play/pausa removido do hero (continua sem tocar com "reduzir movimento"). |

## Dados confirmados
- Endereço: Av. Rui Barbosa, 251, São Francisco, Niterói, RJ, CEP 24360-440
- Horários: seg a sex 6h às 22h; sáb, dom e feriados 9h às 13h (conforme briefing)
- Preços e taxa de adesão: propositalmente fora da página ("consulte a equipe")

## SEO local
JSON-LD `HealthClub` com endereço, telefone e horários. Recomendado: vincular ao Google Business Profile da unidade.
