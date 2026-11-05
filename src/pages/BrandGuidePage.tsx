import React, { useState } from 'react';
import {
  Palette,
  Copy,
  Check,
  Type,
  Layers,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  BannerGP,
  LogoGuardianPrompt,
  Destaque,
  PadraoBlocos,
  Botao,
  Card,
  Badge,
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
    nome: 'Roxo Escuro',
    cssVar: '--gp-roxo-escuro',
    hex: '#3F2757',
    funcao: 'Fundos principais de destaque, textos fortes, header e footer',
    textoEscuro: false,
  },
  {
    nome: 'Roxo Guardian',
    cssVar: '--gp-roxo',
    hex: '#9847EE',
    funcao: 'Primária, botões principais, contorno do ícone e destaques',
    textoEscuro: false,
  },
  {
    nome: 'Lilás Médio',
    cssVar: '--gp-lilas',
    hex: '#AF81E9',
    funcao: 'Secundária, estados de hover e bordas ativas',
    textoEscuro: true,
  },
  {
    nome: 'Lilás Claro',
    cssVar: '--gp-lilas-claro',
    hex: '#D9CBE7',
    funcao: 'Superfícies suaves, wordmark em fundo escuro e apoio',
    textoEscuro: true,
  },
  {
    nome: 'Ciano Vibrante',
    cssVar: '--gp-ciano',
    hex: '#3CC7E8',
    funcao: 'Acento, CTAs secundários e palavras destacadas em títulos',
    textoEscuro: true,
  },
  {
    nome: 'Branco',
    cssVar: '--gp-branco',
    hex: '#FFFFFF',
    funcao: 'Superfícies de cards no modo claro e contraste em fundos escuros',
    textoEscuro: true,
  },
];

export const BrandGuidePage: React.FC = () => {
  const [hexCopiado, setHexCopiado] = useState<string | null>(null);
  const [tamanhoLogoDemo, setTamanhoLogoDemo] = useState<number>(42);

  const copiarHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setHexCopiado(hex);
    setTimeout(() => setHexCopiado(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <BannerGP
        destaque="Guia de Marca"
        titulo="Identidade Visual Guardian Prompt"
        subtitulo="Tokens oficiais, variantes da logo SVG, tipografia Montserrat, componentes e boas práticas de uso."
      />

      {/* 1. LOGOS */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge variant="roxo">01 • Logotipia Vetorial</Badge>
            <h2 className="gp-h2 gp-text-primary mt-2">
              <Destaque>Variantes</Destaque> da Logo
            </h2>
          </div>

          <div className="flex items-center gap-3 gp-card-surface px-4 py-2 rounded-xl">
            <label
              htmlFor="slider-logo-size"
              className="text-xs font-bold gp-text-secondary"
            >
              Tamanho: {tamanhoLogoDemo}px
            </label>
            <input
              id="slider-logo-size"
              type="range"
              min={26}
              max={64}
              value={tamanhoLogoDemo}
              onChange={(e) => setTamanhoLogoDemo(Number(e.target.value))}
              className="accent-[#9847EE] cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl bg-[#3F2757] p-6 space-y-6 flex flex-col items-center justify-center text-white shadow-sm">
            <LogoGuardianPrompt
              variant="horizontal"
              tone="claro"
              size={tamanhoLogoDemo}
            />
            <div className="flex items-center gap-6 pt-4 border-t border-white/10 w-full justify-center">
              <LogoGuardianPrompt variant="vertical" tone="claro" size={36} />
              <LogoGuardianPrompt variant="icone" tone="claro" size={36} />
            </div>
            <span className="text-xs text-[#D9CBE7]">tone=&quot;claro&quot; (Padrão)</span>
          </div>

          <div className="rounded-2xl bg-[#3F2757] p-6 space-y-6 flex flex-col items-center justify-center text-white shadow-sm">
            <LogoGuardianPrompt
              variant="horizontal"
              tone="mono"
              size={tamanhoLogoDemo}
            />
            <div className="flex items-center gap-6 pt-4 border-t border-white/10 w-full justify-center">
              <LogoGuardianPrompt variant="vertical" tone="mono" size={36} />
              <LogoGuardianPrompt variant="icone" tone="mono" size={36} />
            </div>
            <span className="text-xs text-[#D9CBE7]">tone=&quot;mono&quot;</span>
          </div>

          <div className="rounded-2xl bg-white border border-[#D9CBE7] p-6 space-y-6 flex flex-col items-center justify-center text-[#3F2757] shadow-sm">
            <LogoGuardianPrompt
              variant="horizontal"
              tone="escuro"
              size={tamanhoLogoDemo}
            />
            <div className="flex items-center gap-6 pt-4 border-t border-[#3F2757]/10 w-full justify-center">
              <LogoGuardianPrompt variant="vertical" tone="escuro" size={36} />
              <LogoGuardianPrompt variant="icone" tone="escuro" size={36} />
            </div>
            <span className="text-xs font-semibold text-[#3F2757]">
              tone=&quot;escuro&quot; (Fundo Claro)
            </span>
          </div>
        </div>
      </section>

      {/* 2. CORES */}
      <section className="space-y-4">
        <div>
          <Badge variant="ciano" icon={<Palette className="w-3.5 h-3.5" />}>
            02 • Paleta Oficial
          </Badge>
          <h2 className="gp-h2 gp-text-primary mt-2">
            <Destaque>Cores</Destaque> e Tokens (Clique para copiar o HEX)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PALETA_OFICIAL.map((cor) => (
            <Card key={cor.hex} padding="none" className="overflow-hidden">
              <div
                className="h-24 p-4 flex items-end justify-between border-b border-black/5"
                style={{ backgroundColor: cor.hex }}
              >
                <span
                  className={`text-xl font-extrabold ${
                    cor.textoEscuro ? 'text-[#3F2757]' : 'text-white'
                  }`}
                >
                  {cor.hex}
                </span>
                <button
                  type="button"
                  onClick={() => copiarHex(cor.hex)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold gp-transition ${
                    cor.textoEscuro
                      ? 'bg-[#3F2757] text-white'
                      : 'bg-white text-[#3F2757]'
                  }`}
                >
                  {hexCopiado === cor.hex ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copiado</span>
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
                  <h3 className="text-sm font-extrabold gp-text-primary">
                    {cor.nome}
                  </h3>
                  <code className="text-xs text-[#9847EE] dark:text-[#3CC7E8]">
                    {cor.cssVar}
                  </code>
                </div>
                <p className="text-xs gp-text-secondary">{cor.funcao}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. TIPOGRAFIA E COMPONENTES */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="space-y-4">
          <Badge variant="lilas" icon={<Type className="w-3.5 h-3.5" />}>
            03 • Tipografia Montserrat
          </Badge>
          <p className="text-2xl font-extrabold gp-text-primary">
            <Destaque>IA na escola,</Destaque> com proteção e pensamento crítico.
          </p>
          <p className="text-xs sm:text-sm gp-text-secondary leading-relaxed">
            Títulos em Montserrat 700/800 com escala fluida <code>clamp()</code> e corpo em 400/500 para leitura confortável.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <Botao variant="primario" size="sm">
              Botão Primário
            </Botao>
            <Botao variant="secundario" size="sm">
              Botão Secundário
            </Botao>
            <Botao variant="fantasma" size="sm">
              Botão Fantasma
            </Botao>
          </div>
        </Card>

        <Card className="space-y-4">
          <Badge variant="roxo" icon={<Layers className="w-3.5 h-3.5" />}>
            04 • Linguagem Gráfica de Blocos
          </Badge>
          <div className="rounded-xl bg-[#3F2757] p-4 flex items-center justify-around">
            <PadraoBlocos variant="hero" className="h-28 w-auto" />
            <PadraoBlocos variant="banner" className="h-28 w-auto" />
          </div>
        </Card>
      </section>

      {/* 4. ALERTA AUDITOR & USO CORRETO VS INCORRETO */}
      <section className="space-y-5">
        <AlertaAuditor
          tipo="dados"
          titulo="Exemplo de Alerta Educativo do Auditor"
          mensagem="Você mencionou seu nome completo e o bairro da sua escola. Veja como reformular sem se expor."
          trechosDestacados={['Maria Souza', 'Escola X', 'bairro Y']}
          descontoPontos={35}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="border-l-4 border-l-emerald-500 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Uso Correto</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm gp-text-secondary">
              <li>• Feedback sempre educativo, acolhedor e nunca punitivo.</li>
              <li>• Métricas docentes 100% agregadas e anônimas (LGPD).</li>
              <li>• Superfícies leves com bordas sutis e sombras suaves.</li>
            </ul>
          </Card>

          <Card className="border-l-4 border-l-amber-500 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-sm">
              <XCircle className="w-5 h-5" />
              <span>Uso Incorreto</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm gp-text-secondary">
              <li>• Nunca bloquear o aluno com mensagens assustadoras ou punitivas.</li>
              <li>• Nunca exibir nomes ou prompts individuais nos painéis de gestão.</li>
              <li>• Nunca usar contornos pesados ou cores fora dos tokens da marca.</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BrandGuidePage;
