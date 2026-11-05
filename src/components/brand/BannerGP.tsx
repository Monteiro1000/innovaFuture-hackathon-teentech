import React from 'react';
import { Destaque } from './Destaque';
import { PadraoBlocos } from './PadraoBlocos';

export interface BannerGPProps {
  destaque?: string;
  titulo: string;
  subtitulo?: string;
  tag?: string;
  children?: React.ReactNode;
  compact?: boolean;
  className?: string;
}

/**
 * Componente <BannerGP /> fiel às telas de referência (imagiEdu / Lovable):
 * - Fundo #3F2757 sem bordas grosseiras
 * - Título grande com primeiras palavras em ciano (#3CC7E8) e restante em branco (#FFFFFF)
 * - Subtítulo em lilás claro (#D9CBE7)
 * - À direita, composição geométrica de blocos e barras verticais com triângulo de apoio
 */
export const BannerGP: React.FC<BannerGPProps> = ({
  destaque,
  titulo,
  subtitulo,
  tag,
  children,
  compact = false,
  className = '',
}) => {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl bg-[#3F2757] text-white shadow-gp-md ${
        compact ? 'px-6 py-7 sm:px-9 sm:py-8' : 'px-7 py-9 sm:px-11 sm:py-11'
      } ${className}`}
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-3.5">
          {tag && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#AF81E9]/35 text-[#D9CBE7] text-[11px] font-bold tracking-wider uppercase">
              <span>{tag}</span>
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold leading-[1.12] tracking-tight text-white">
            {destaque && (
              <>
                <Destaque tone="claro">{destaque}</Destaque>{' '}
              </>
            )}
            <span>{titulo}</span>
          </h1>

          {subtitulo && (
            <p className="text-[#D9CBE7] text-sm sm:text-base max-w-xl leading-relaxed font-normal">
              {subtitulo}
            </p>
          )}

          {children && (
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {children}
            </div>
          )}
        </div>

        {/* Composição geométrica limpa à direita */}
        <div className="hidden md:flex lg:col-span-4 justify-end items-end self-end -mb-9 -mr-4">
          <PadraoBlocos variant="banner" className="w-60 lg:w-64 h-auto" />
        </div>
      </div>
    </section>
  );
};

export default BannerGP;
