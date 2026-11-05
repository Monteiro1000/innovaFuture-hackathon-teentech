import React from 'react';
import { Destaque } from './Destaque';
import { LogoGuardianPrompt } from './LogoGuardianPrompt';
import { PadraoBlocos } from './PadraoBlocos';

export interface BannerGPProps {
  destaque?: string;
  titulo: string;
  subtitulo?: string;
  tag?: string;
  children?: React.ReactNode;
  showLogo?: boolean;
  compact?: boolean;
  className?: string;
}

/**
 * Componente <BannerGP /> fiel à página 4 ("Banner Exemplo") do Guia de Marca:
 * - Fundo #3F2757
 * - Título grande em branco com palavras destacadas em ciano (#3CC7E8)
 * - Subtítulo em lilás claro (#D9CBE7)
 * - À direita, composição geométrica de retângulos e barras verticais sobrepostos
 *   (roxo #9847EE, lilás #AF81E9, lilás claro #D9CBE7, ciano #3CC7E8) com triângulo de apoio
 *   e assinatura Guardian Prompt no canto inferior direito.
 */
export const BannerGP: React.FC<BannerGPProps> = ({
  destaque,
  titulo,
  subtitulo,
  tag,
  children,
  showLogo = true,
  compact = false,
  className = '',
}) => {
  return (
    <section
      className={`relative overflow-hidden rounded-gp-xl bg-gp-roxo-escuro border border-gp-lilas/30 shadow-gp-lg text-gp-branco ${
        compact ? 'p-6 md:p-8' : 'p-7 sm:p-10 lg:p-12'
      } ${className}`}
    >
      {/* Composição geométrica à direita (visível como fundo sutil no mobile e nítida no desktop) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[52%] pointer-events-none flex items-stretch justify-end">
        <PadraoBlocos
          variant="barras"
          className="h-full w-auto object-cover opacity-20 lg:opacity-95"
        />
      </div>

      {/* Gradiente protetor de leitura para o texto à esquerda */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-gp-roxo-escuro via-gp-roxo-escuro/95 to-gp-roxo-escuro/25 lg:via-gp-roxo-escuro/85 lg:to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7 space-y-4">
          {tag && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-gp-sm bg-gp-roxo/25 border border-gp-ciano/40 text-gp-ciano text-xs sm:text-sm font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-gp-ciano animate-pulse" />
              {tag}
            </div>
          )}

          <h1 className={compact ? 'gp-h2 text-gp-branco' : 'gp-h1 text-gp-branco'}>
            {destaque && (
              <>
                <Destaque>{destaque}</Destaque>{' '}
              </>
            )}
            <span>{titulo}</span>
          </h1>

          {subtitulo && (
            <p className="text-gp-lilas-claro gp-body-lg max-w-2xl leading-relaxed">
              {subtitulo}
            </p>
          )}

          {children && <div className="pt-2 flex flex-wrap items-center gap-3">{children}</div>}
        </div>

        {/* Assinatura Guardian Prompt posicionada no canto inferior direito como no Banner Exemplo */}
        {showLogo && (
          <div className="lg:col-span-5 flex lg:justify-end items-end">
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-gp-md bg-gp-roxo-escuro/90 backdrop-blur-md border border-gp-lilas/30 shadow-gp-md">
              <LogoGuardianPrompt variant="horizontal" tone="claro" size="md" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BannerGP;
