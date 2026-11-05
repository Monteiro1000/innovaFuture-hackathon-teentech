import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Scale, RotateCcw } from 'lucide-react';
import { LogoGuardianPrompt } from './LogoGuardianPrompt';
import { useApp } from '@/context/AppContext';

export const Footer: React.FC = () => {
  const { resetarDemo } = useApp();

  return (
    <footer className="bg-gp-roxo-escuro border-t border-gp-lilas/30 text-gp-lilas-claro mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Coluna 1: Marca e Propósito */}
          <div className="md:col-span-5 space-y-4">
            <LogoGuardianPrompt variant="horizontal" tone="claro" size="md" />
            <p className="text-sm text-gp-lilas-claro/90 max-w-md leading-relaxed">
              Plataforma gamificada B2B2C de letramento seguro, consciente e crítico em
              Inteligência Artificial para estudantes do Ensino Fundamental e Médio.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-gp-sm bg-gp-roxo/20 border border-gp-ciano/40 text-gp-ciano text-xs font-bold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Conexão Segura: Transformando inovação em proteção</span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gp-branco">
              Navegação da Plataforma
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-gp-ciano gp-transition">
                  Início & Proposta de Valor
                </Link>
              </li>
              <li>
                <Link to="/entrar" className="hover:text-gp-ciano gp-transition">
                  Entrar na Demo (Seleção de Perfil)
                </Link>
              </li>
              <li>
                <Link to="/aluno" className="hover:text-gp-ciano gp-transition">
                  Laboratório de Prompts & Simulador (Aluno)
                </Link>
              </li>
              <li>
                <Link to="/professor" className="hover:text-gp-ciano gp-transition">
                  Painel do Professor (Métricas Anônimas)
                </Link>
              </li>
              <li>
                <Link to="/gestor" className="hover:text-gp-ciano gp-transition">
                  Painel do Gestor Escolar
                </Link>
              </li>
              <li>
                <Link to="/identidade" className="hover:text-gp-ciano gp-transition">
                  Guia de Marca Interativo (/identidade)
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Conformidade Legal */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gp-branco">
              Ética, Privacidade e Conformidade
            </h3>
            <div className="space-y-2.5 text-xs leading-relaxed">
              <div className="flex items-start gap-2.5 p-3 rounded-gp-md bg-gp-lilas-claro/10 border border-gp-lilas/25">
                <Lock className="w-4 h-4 text-gp-sucesso shrink-0 mt-0.5" />
                <span>
                  <strong className="text-gp-branco">LGPD (Lei nº 13.709/2018):</strong>{' '}
                  Processamento 100% local no navegador. Nenhum comando ou dado pessoal é
                  enviado a servidores externos.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-gp-md bg-gp-lilas-claro/10 border border-gp-lilas/25">
                <Scale className="w-4 h-4 text-gp-ciano shrink-0 mt-0.5" />
                <span>
                  <strong className="text-gp-branco">ECA & Marco Civil da Internet:</strong>{' '}
                  Alinhado à proteção integral de crianças e adolescentes e à educação
                  digital segura nas escolas.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior obrigatória com créditos do Hackathon e aviso de dados fictícios */}
        <div className="pt-6 border-t border-gp-lilas/25 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <p className="font-bold text-gp-branco">
              Projeto desenvolvido no Hackathon TeenTech 2026, uma ação Instituto Teckids
            </p>
            <p className="text-gp-lilas-claro/85">
              Aviso importante: Este é um protótipo funcional com dados 100% fictícios
              (ex.: &ldquo;Aluno 01&rdquo;, turmas simuladas). Nenhum dado pessoal real é
              coletado ou armazenado.
            </p>
          </div>

          <button
            type="button"
            onClick={resetarDemo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-gp-sm bg-gp-lilas-claro/10 hover:bg-gp-lilas-claro/20 border border-gp-lilas/30 text-gp-lilas-claro hover:text-gp-ciano font-semibold gp-transition shrink-0"
            title="Restaura os dados iniciais da demonstração no localStorage"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar dados iniciais da Demo</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
