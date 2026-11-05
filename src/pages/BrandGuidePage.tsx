import React, { useState } from 'react';
import {
  Palette,
  Copy,
  Check,
  Type,
  Layers,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';
import {
  BannerGP,
  LogoGuardianPrompt,
  Destaque,
  PadraoBlocos,
  Botao,
  Card,
  Badge,
  BarraProgresso,
  AlertaAuditor,
} from '@/components/brand';

interface TokenCor {
  nome: string;
  cssVar: string;
  hex: string;
  funcao: string;
  textoEscuro: boolean;
}

const PALETA_OFICIAL: TokenCor[] = [
  {
    nome: 'Roxo Escuro (Base)',
    cssVar: '--gp-roxo-escuro',
    hex: '#3F2757',
    funcao: 'Fundos principais, textos fortes em fundo claro, header e footer',
    textoEscuro: false,
  },
  {
    nome: 'Roxo Guardian (Primária)',
    cssVar: '--gp-roxo',
    hex: '#9847EE',
    funcao: 'Cor primária, botões principais, contorno do ícone e destaques',
    textoEscuro: false,
  },
  {
    nome: 'Lilás Médio (Secundária)',
    cssVar: '--gp-lilas',
    hex: '#AF81E9',
    funcao: 'Secundária, estados de hover, bordas ativas e apoio gráfico',
    textoEscuro: true,
  },
  {
    nome: 'Lilás Claro (Superfícies)',
    cssVar: '--gp-lilas-claro',
    hex: '#D9CBE7',
    funcao: 'Superfícies claras, cards, wordmark em fundo escuro e textos suaves',
    textoEscuro: true,
  },
  {
    nome: 'Ciano Vibrante (Acento)',
    cssVar: '--gp-ciano',
    hex: '#3CC7E8',
    funcao: 'Acento, CTAs secundários, componente <Destaque> em títulos e links',
    textoEscuro: true,
  },
  {
    nome: 'Branco Puro',
    cssVar: '--gp-branco',
    hex: '#FFFFFF',
    funcao: 'Títulos principais sobre fundo roxo escuro e alto contraste AA/AAA',
    textoEscuro: true,
  },
];

const CORES_ESTADO: TokenCor[] = [
  {
    nome: 'Sucesso (Prompt Seguro)',
    cssVar: '--gp-sucesso',
    hex: '#4ADE80',
    funcao: 'Aprovação no Auditor, badges conquistadas e metas atingidas',
    textoEscuro: true,
  },
  {
    nome: 'Atenção (Dados Sensíveis)',
    cssVar: '--gp-atencao',
    hex: '#FACC15',
    funcao: 'Alerta educativo de exposição de dados pessoais ou deepfake',
    textoEscuro: true,
  },
  {
    nome: 'Informativo / Acolhimento',
    cssVar: '--gp-info',
    hex: '#3CC7E8',
    funcao: 'Acolhimento emocional gentil e dicas pedagógicas',
    textoEscuro: true,
  },
  {
    nome: 'Sugestão (Pensamento Crítico)',
    cssVar: '--gp-sugestao',
    hex: '#9847EE',
    funcao: 'Convite para transformar pedido de trabalho pronto em roteiro',
    textoEscuro: false,
  },
];

export const BrandGuidePage: React.FC = () => {
  const [hexCopiado, setHexCopiado] = useState<string | null>(null);
  const [tamanhoLogoDemo, setTamanhoLogoDemo] = useState<number>(52);

  const copiarHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setHexCopiado(hex);
    setTimeout(() => setHexCopiado(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      {/* 1. CABEÇALHO DO GUIA DE MARCA */}
      <BannerGP
        tag="Design System Oficial • Rota /identidade"
        destaque="Guia de marca"
        titulo="e identidade visual Guardian Prompt"
        subtitulo="Especificação viva de tokens, logotipia vetorial, tipografia Montserrat, linguagem gráfica de blocos sobrepostos e diretrizes de tom educativo (Hackathon TeenTech 2026)."
      />

      {/* 2. LOGOTIPIA EM TODAS AS VARIANTES E TONS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="roxo">Seção 01 • Logotipia SVG</Badge>
            <h2 className="gp-h2 text-gp-branco">
              Componente <Destaque>&lt;LogoGuardianPrompt /&gt;</Destaque>
            </h2>
            <p className="text-sm sm:text-base text-gp-lilas-claro max-w-3xl">
              Construído em SVG puro: wordmark <strong>Guardian / Prompt</strong> em duas linhas (Montserrat 700) + ícone quadrado de cantos arredondados com entalhe de balão de conversa no canto superior direito e rosto minimalista acolhedor.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gp-roxo-escuro p-3 rounded-gp-md border border-gp-lilas/30">
            <label
              htmlFor="slider-logo-size"
              className="text-xs font-bold text-gp-lilas-claro whitespace-nowrap"
            >
              Tamanho: {tamanhoLogoDemo}px
            </label>
            <input
              id="slider-logo-size"
              type="range"
              min={28}
              max={84}
              value={tamanhoLogoDemo}
              onChange={(e) => setTamanhoLogoDemo(Number(e.target.value))}
              className="accent-gp-ciano cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tone: Claro (Fundo Roxo Escuro) */}
          <Card className="space-y-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Badge variant="ciano">tone=&quot;claro&quot; (Padrão)</Badge>
              <span className="text-xs text-gp-lilas-claro">Fundo #3F2757</span>
            </div>
            <div className="space-y-6 py-4 flex flex-col items-center justify-center bg-gp-roxo-escuro rounded-gp-md border border-gp-lilas/30 p-6">
              <LogoGuardianPrompt
                variant="horizontal"
                tone="claro"
                size={tamanhoLogoDemo}
              />
              <div className="flex items-center gap-8 pt-4 border-t border-gp-lilas/20 w-full justify-center">
                <LogoGuardianPrompt variant="vertical" tone="claro" size={44} />
                <LogoGuardianPrompt variant="icone" tone="claro" size={44} />
              </div>
            </div>
            <p className="text-xs text-gp-lilas-claro">
              Wordmark em <code>#D9CBE7</code> e ícone em <code>#9847EE</code>.
            </p>
          </Card>

          {/* Tone: Mono (Branco sobre Roxo Escuro — Linha 2 do PDF Guia de Marca) */}
          <Card className="space-y-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Badge variant="roxo">tone=&quot;mono&quot;</Badge>
              <span className="text-xs text-gp-lilas-claro">Alto Contraste</span>
            </div>
            <div className="space-y-6 py-4 flex flex-col items-center justify-center bg-gp-roxo-escuro rounded-gp-md border border-gp-lilas/30 p-6">
              <LogoGuardianPrompt
                variant="horizontal"
                tone="mono"
                size={tamanhoLogoDemo}
              />
              <div className="flex items-center gap-8 pt-4 border-t border-gp-lilas/20 w-full justify-center">
                <LogoGuardianPrompt variant="vertical" tone="mono" size={44} />
                <LogoGuardianPrompt variant="icone" tone="mono" size={44} />
              </div>
            </div>
            <p className="text-xs text-gp-lilas-claro">
              Wordmark e ícone monocromáticos em <code>#FFFFFF</code>.
            </p>
          </Card>

          {/* Tone: Escuro (Sobre Fundo Claro — Linha 3 do PDF Guia de Marca) */}
          <Card variant="claro" className="space-y-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Badge variant="escuro">tone=&quot;escuro&quot;</Badge>
              <span className="text-xs font-bold text-gp-roxo-escuro">
                Fundo Claro #FFFFFF / #D9CBE7
              </span>
            </div>
            <div className="space-y-6 py-4 flex flex-col items-center justify-center bg-gp-branco rounded-gp-md border border-gp-roxo-escuro/20 p-6">
              <LogoGuardianPrompt
                variant="horizontal"
                tone="escuro"
                size={tamanhoLogoDemo}
              />
              <div className="flex items-center gap-8 pt-4 border-t border-gp-roxo-escuro/15 w-full justify-center">
                <LogoGuardianPrompt variant="vertical" tone="escuro" size={44} />
                <LogoGuardianPrompt variant="icone" tone="escuro" size={44} />
              </div>
            </div>
            <p className="text-xs font-semibold text-gp-roxo-escuro">
              Wordmark e ícone em <code>#3F2757</code> para aplicação em superfícies claras.
            </p>
          </Card>
        </div>
      </section>

      {/* 3. PALETA DE CORES COM BOTÃO COPIAR HEX */}
      <section className="space-y-6">
        <div className="space-y-2">
          <Badge variant="ciano" icon={<Palette className="w-3.5 h-3.5" />}>
            Seção 02 • Design Tokens & Cores
          </Badge>
          <h2 className="gp-h2 text-gp-branco">
            <Destaque>Paleta Oficial</Destaque> (Clique para copiar o HEX)
          </h2>
          <p className="text-sm sm:text-base text-gp-lilas-claro">
            Extraída diretamente da página 3 do Guia de Marca (<code>#3F2757</code>, <code>#9847EE</code>, <code>#AF81E9</code>, <code>#D9CBE7</code>, <code>#3CC7E8</code>). Nenhuma cor fora dos tokens é utilizada.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PALETA_OFICIAL.map((cor) => (
            <div
              key={cor.hex}
              className="rounded-gp-lg overflow-hidden border border-gp-lilas/40 shadow-gp-md bg-gp-roxo-escuro flex flex-col justify-between"
            >
              <div
                className="h-28 p-5 flex items-end justify-between"
                style={{ backgroundColor: cor.hex }}
              >
                <span
                  className={`text-2xl font-extrabold tracking-tight ${
                    cor.textoEscuro ? 'text-gp-roxo-escuro' : 'text-gp-branco'
                  }`}
                >
                  {cor.hex}
                </span>
                <button
                  type="button"
                  onClick={() => copiarHex(cor.hex)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-gp-sm text-xs font-extrabold gp-transition ${
                    cor.textoEscuro
                      ? 'bg-gp-roxo-escuro text-gp-branco hover:bg-gp-roxo'
                      : 'bg-gp-branco text-gp-roxo-escuro hover:bg-gp-ciano'
                  }`}
                >
                  {hexCopiado === cor.hex ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar HEX</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-gp-branco text-sm">
                    {cor.nome}
                  </h3>
                  <code className="text-xs text-gp-ciano font-mono">
                    {cor.cssVar}
                  </code>
                </div>
                <p className="text-xs text-gp-lilas-claro">{cor.funcao}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cores de Estado */}
        <div className="pt-4 space-y-3">
          <h3 className="text-base font-extrabold text-gp-branco">
            Cores Semânticas de Estado (Sempre acompanhadas de ícone + rótulo textual)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORES_ESTADO.map((cor) => (
              <Card key={cor.cssVar} padding="sm" className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className="w-6 h-6 rounded-gp-sm border border-gp-branco/30"
                    style={{ backgroundColor: cor.hex }}
                  />
                  <button
                    type="button"
                    onClick={() => copiarHex(cor.hex)}
                    className="text-xs font-bold text-gp-ciano hover:underline inline-flex items-center gap-1"
                  >
                    {hexCopiado === cor.hex ? 'Copiado!' : cor.hex}
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <h4 className="text-xs font-extrabold text-gp-branco">
                  {cor.nome}
                </h4>
                <p className="text-[11px] text-gp-lilas-claro">{cor.funcao}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TIPOGRAFIA MONTSERRAT E COMPONENTE <DESTAQUE> */}
      <section className="space-y-6">
        <div className="space-y-2">
          <Badge variant="lilas" icon={<Type className="w-3.5 h-3.5" />}>
            Seção 03 • Tipografia & Hierarquia
          </Badge>
          <h2 className="gp-h2 text-gp-branco">
            Família <Destaque>Montserrat</Destaque> (Pesos 400 a 800)
          </h2>
        </div>

        <Card className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-gp-lilas/25 pb-6">
            <div className="lg:col-span-4 space-y-1">
              <span className="text-xs font-extrabold uppercase text-gp-ciano">
                Display / H1 • clamp(1.85rem, 3.5vw, 3.25rem)
              </span>
              <p className="text-xs text-gp-lilas-claro">
                Montserrat 800 (ExtraBold) com <code>&lt;Destaque&gt;</code> em ciano
              </p>
            </div>
            <div className="lg:col-span-8">
              <p className="gp-h1 text-gp-branco">
                <Destaque>IA na escola,</Destaque> com proteção e pensamento crítico.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-gp-lilas/25 pb-6">
            <div className="lg:col-span-4 space-y-1">
              <span className="text-xs font-extrabold uppercase text-gp-ciano">
                Título de Seção / H2 • Montserrat 800
              </span>
              <p className="text-xs text-gp-lilas-claro">
                clamp(1.45rem, 2.5vw, 2.25rem)
              </p>
            </div>
            <div className="lg:col-span-8">
              <p className="gp-h2 text-gp-branco">
                <Destaque>Auditor de Prompts</Destaque> local e educativo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4 space-y-1">
              <span className="text-xs font-extrabold uppercase text-gp-ciano">
                Corpo de Texto • Montserrat 400 / 500
              </span>
              <p className="text-xs text-gp-lilas-claro">
                Leitura acolhedora com contraste AA garantido
              </p>
            </div>
            <div className="lg:col-span-8">
              <p className="gp-body-lg text-gp-lilas-claro">
                O estudante interage com um assistente escolar simulado. Antes de qualquer resposta, o filtro local identifica dados sensíveis ou pedidos de plágio e ensina a reformular com autonomia.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* 5. COMPONENTES DE MARCA E PADRÃO DE BLOCOS */}
      <section className="space-y-6">
        <div className="space-y-2">
          <Badge variant="roxo" icon={<Layers className="w-3.5 h-3.5" />}>
            Seção 04 • Biblioteca de Componentes (src/components/brand/*)
          </Badge>
          <h2 className="gp-h2 text-gp-branco">
            <Destaque>Componentes reutilizáveis</Destaque> e Padrão de Blocos
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Botões e Badges */}
          <Card className="space-y-5">
            <h3 className="text-base font-extrabold text-gp-branco">
              Botões (<code>&lt;Botao /&gt;</code>) e Badges (<code>&lt;Badge /&gt;</code>)
            </h3>
            <div className="flex flex-wrap gap-3">
              <Botao variant="primario">Primário (#9847EE)</Botao>
              <Botao variant="secundario">Secundário (#3CC7E8)</Botao>
              <Botao variant="fantasma">Fantasma</Botao>
              <Botao variant="perigo">Atenção / Alerta</Botao>
            </div>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gp-lilas/25">
              <Badge variant="roxo">Sugestão Roxo</Badge>
              <Badge variant="ciano">Informativo Ciano</Badge>
              <Badge variant="sucesso">Sucesso #4ADE80</Badge>
              <Badge variant="atencao">Atenção #FACC15</Badge>
              <Badge variant="lilas">Superfície Lilás</Badge>
            </div>
          </Card>

          {/* Padrão de Blocos SVG */}
          <Card className="space-y-4">
            <h3 className="text-base font-extrabold text-gp-branco">
              Padrão Geométrico (<code>&lt;PadraoBlocos /&gt;</code>)
            </h3>
            <p className="text-xs text-gp-lilas-claro">
              Composição vetorial de retângulos e barras verticais sobrepostos com triângulo de apoio:
            </p>
            <div className="rounded-gp-md overflow-hidden bg-gp-roxo-escuro border border-gp-lilas/30 p-3 flex justify-center">
              <PadraoBlocos variant="barras" className="h-36 w-auto" />
            </div>
          </Card>
        </div>

        {/* Showcase AlertaAuditor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AlertaAuditor
            tipo="dados"
            titulo="Exemplo de Alerta de Dados Sensíveis"
            mensagem="Você mencionou seu nome completo e o bairro da sua escola. Veja como reformular sem se expor."
            trechosDestacados={['Maria Souza', 'Escola X', 'bairro Y']}
            descontoPontos={35}
          />
          <AlertaAuditor
            tipo="sucesso"
            titulo="Exemplo de Feedback Positivo (Prompt Seguro)"
            mensagem="Excelente! Você formulou sua dúvida sem expor informações pessoais e pediu um roteiro estruturado de estudo."
          />
        </div>
      </section>

      {/* 6. EXEMPLOS DE USO CORRETO E INCORRETO */}
      <section className="space-y-6">
        <div className="space-y-2">
          <Badge variant="sucesso" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Seção 05 • Boas Práticas Visuais e Pedagógicas
          </Badge>
          <h2 className="gp-h2 text-gp-branco">
            Exemplos de <Destaque>uso correto e incorreto</Destaque>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Uso Correto */}
          <Card className="border-2 border-gp-sucesso space-y-4">
            <div className="flex items-center gap-2 text-gp-sucesso font-extrabold text-base">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <span>USO CORRETO (Fiel ao Guardian Prompt)</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gp-lilas-claro">
              <li>
                • <strong>Tom educativo e acolhedor:</strong> explicar por que o dado é sensível e oferecer um botão imediato para reformular sem punir o estudante.
              </li>
              <li>
                • <strong>Privacidade absoluta nos painéis:</strong> exibir apenas métricas agregadas da turma (ex.: <em>&ldquo;80% da turma aprendeu a não expor dados de geolocalização&rdquo;</em>).
              </li>
              <li>
                • <strong>Fidelidade aos tokens:</strong> usar sempre o fundo <code>#3F2757</code> com destaques em <code>#3CC7E8</code> e <code>#9847EE</code>, garantindo contraste mínimo AA.
              </li>
              <li>
                • <strong>Acessibilidade:</strong> combinar cor de estado + ícone Lucide + rótulo em texto.
              </li>
            </ul>
          </Card>

          {/* Uso Incorreto */}
          <Card className="border-2 border-gp-atencao space-y-4">
            <div className="flex items-center gap-2 text-gp-atencao font-extrabold text-base">
              <XCircle className="w-6 h-6 shrink-0" />
              <span>USO INCORRETO (Evitar sempre)</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gp-lilas-claro">
              <li>
                • <strong>Tom punitivo ou assustador:</strong> nunca usar mensagens como <em>&ldquo;PROIBIDO! Você cometeu uma infração e será bloqueado!&rdquo;</em>.
              </li>
              <li>
                • <strong>Quebra de sigilo / LGPD:</strong> nunca listar nomes de alunos ou exibir o histórico individual de desabafos no Painel do Professor.
              </li>
              <li>
                • <strong>Cores fora da paleta:</strong> nunca usar vermelho alarmista puro ou fundos sem contraste adequado para a logo.
              </li>
              <li>
                • <strong>Imagens de pessoas reais em deepfakes:</strong> usar apenas descrições textuais e ilustrações vetoriais educativas.
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BrandGuidePage;
