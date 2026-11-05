import React from 'react';
import { LogoGuardianPrompt } from './LogoGuardianPrompt';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3F2757] text-[#D9CBE7] border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <LogoGuardianPrompt variant="horizontal" tone="claro" size={32} />

        <div className="text-center sm:text-right space-y-1 text-xs">
          <p className="font-semibold text-white">
            Projeto desenvolvido no Hackathon TeenTech 2026, uma ação Instituto Teckids.
          </p>
          <p className="text-[#D9CBE7]/80">
            Protótipo com dados 100% fictícios. Nenhum dado pessoal real é coletado ou armazenado (LGPD, Lei 13.709/2018).
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
