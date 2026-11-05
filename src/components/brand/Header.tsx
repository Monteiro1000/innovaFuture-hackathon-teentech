import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sun,
  Moon,
  Menu,
  X,
  GraduationCap,
  Trophy,
  LayoutGrid,
  Users,
  Palette,
  Zap,
} from 'lucide-react';
import { LogoGuardianPrompt } from './LogoGuardianPrompt';
import { useApp } from '@/context/AppContext';

export const Header: React.FC = () => {
  const {
    perfil,
    setPerfil,
    tema,
    toggleTema,
    ultimoEventoXP,
  } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const isLanding = location.pathname === '/';
  const isDemoSelector =
    location.pathname === '/entrar' || location.pathname === '/demo';
  const showMarketingNav = isLanding || isDemoSelector;

  const irParaSecao = (anchor: string) => {
    setMenuAberto(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(anchor);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(anchor);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const labelPerfilAtivo =
    location.pathname.startsWith('/professor') || perfil === 'professor'
      ? 'Demo • Professor'
      : location.pathname.startsWith('/gestor') || perfil === 'gestor'
      ? 'Demo • Gestor escolar'
      : 'Demo • Aluno';

  const isTrilhasActive =
    location.pathname.startsWith('/aluno') &&
    (location.search.includes('trilhas') || location.search.includes('simulador'));

  const isMeuEspacoActive =
    location.pathname.startsWith('/aluno') && !isTrilhasActive;

  return (
    <header className="sticky top-0 z-50 bg-[#3F2757] text-white border-b border-white/10">
      {/* Toast flutuante de ganho de XP */}
      {ultimoEventoXP && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#9847EE] text-white border border-[#3CC7E8] shadow-lg font-bold text-sm animate-bounce"
        >
          <Zap className="w-4 h-4 text-[#3CC7E8] shrink-0" />
          <span>{ultimoEventoXP}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo à esquerda */}
        <Link
          to="/"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3CC7E8] rounded-lg py-1"
          aria-label="Guardian Prompt - Página Inicial"
        >
          <LogoGuardianPrompt variant="horizontal" tone="claro" size={32} />
        </Link>

        {/* Navegação Desktop: modo Marketing (Landing / Demo) vs modo Plataforma (Aluno / Professor / Gestão / Marca) */}
        {showMarketingNav ? (
          <nav
            aria-label="Navegação Principal"
            className="hidden md:flex items-center gap-6"
          >
            <button
              type="button"
              onClick={() => irParaSecao('como-funciona')}
              className="text-sm font-medium text-[#D9CBE7] hover:text-white gp-transition"
            >
              Como funciona
            </button>
            <button
              type="button"
              onClick={() => irParaSecao('etica')}
              className="text-sm font-medium text-[#D9CBE7] hover:text-white gp-transition"
            >
              Ética
            </button>
            <Link
              to="/identidade"
              className="text-sm font-medium text-[#D9CBE7] hover:text-white gp-transition"
            >
              Identidade
            </Link>

            <button
              type="button"
              onClick={toggleTema}
              aria-label={
                tema === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
              }
              title={
                tema === 'light' ? 'Alternar para Modo Escuro' : 'Alternar para Modo Claro'
              }
              className="p-2 rounded-lg text-[#D9CBE7] hover:text-white hover:bg-white/10 gp-transition"
            >
              {tema === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-[#3CC7E8]" />
              )}
            </button>

            {isLanding && (
              <Link
                to="/entrar"
                className="px-4 py-2 rounded-xl bg-[#9847EE] hover:bg-[#8636DC] text-white text-xs sm:text-sm font-bold gp-transition shadow-sm"
              >
                Entrar na demo
              </Link>
            )}
          </nav>
        ) : (
          <>
            <nav
              aria-label="Navegação da Plataforma"
              className="hidden md:flex items-center gap-1.5"
            >
              <button
                type="button"
                onClick={() => {
                  setPerfil('aluno');
                  navigate('/aluno');
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold gp-transition ${
                  isMeuEspacoActive
                    ? 'bg-[#D9CBE7] text-[#3F2757]'
                    : 'text-[#D9CBE7] hover:text-white hover:bg-white/10'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Meu espaço</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPerfil('aluno');
                  navigate('/aluno?aba=trilhas');
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold gp-transition ${
                  isTrilhasActive
                    ? 'bg-[#D9CBE7] text-[#3F2757]'
                    : 'text-[#D9CBE7] hover:text-white hover:bg-white/10'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Trilhas</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPerfil('professor');
                  navigate('/professor');
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold gp-transition ${
                  location.pathname.startsWith('/professor')
                    ? 'bg-[#D9CBE7] text-[#3F2757]'
                    : 'text-[#D9CBE7] hover:text-white hover:bg-white/10'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Professor</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPerfil('gestor');
                  navigate('/gestor');
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold gp-transition ${
                  location.pathname.startsWith('/gestor')
                    ? 'bg-[#D9CBE7] text-[#3F2757]'
                    : 'text-[#D9CBE7] hover:text-white hover:bg-white/10'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Gestão</span>
              </button>

              <Link
                to="/identidade"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold gp-transition ${
                  location.pathname === '/identidade'
                    ? 'bg-[#D9CBE7] text-[#3F2757]'
                    : 'text-[#D9CBE7] hover:text-white hover:bg-white/10'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Marca</span>
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-2.5">
              <button
                type="button"
                onClick={toggleTema}
                aria-label={
                  tema === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
                }
                title={
                  tema === 'light'
                    ? 'Alternar para Modo Escuro'
                    : 'Alternar para Modo Claro'
                }
                className="p-2 rounded-lg text-[#D9CBE7] hover:text-white hover:bg-white/10 gp-transition"
              >
                {tema === 'light' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4 text-[#3CC7E8]" />
                )}
              </button>

              <Link
                to="/entrar"
                className="px-3.5 py-1.5 rounded-full bg-white text-[#3F2757] hover:bg-[#D9CBE7] text-xs font-bold gp-transition shadow-sm"
                title="Clique para trocar o perfil da demonstração"
              >
                {labelPerfilAtivo}
              </Link>
            </div>
          </>
        )}

        {/* Controles Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTema}
            aria-label="Alternar tema claro/escuro"
            className="p-2 rounded-lg text-[#D9CBE7] hover:bg-white/10"
          >
            {tema === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4 text-[#3CC7E8]" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            className="p-2 rounded-lg text-white hover:bg-white/10"
          >
            {menuAberto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden bg-[#3F2757] border-t border-white/10 px-4 py-4 space-y-2">
          <Link
            to="/aluno"
            onClick={() => {
              setPerfil('aluno');
              setMenuAberto(false);
            }}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#D9CBE7] hover:bg-white/10"
          >
            Meu espaço (Laboratório do Aluno)
          </Link>
          <Link
            to="/aluno?aba=trilhas"
            onClick={() => {
              setPerfil('aluno');
              setMenuAberto(false);
            }}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#D9CBE7] hover:bg-white/10"
          >
            Trilhas & Simulador
          </Link>
          <Link
            to="/professor"
            onClick={() => {
              setPerfil('professor');
              setMenuAberto(false);
            }}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#D9CBE7] hover:bg-white/10"
          >
            Painel do Professor
          </Link>
          <Link
            to="/gestor"
            onClick={() => {
              setPerfil('gestor');
              setMenuAberto(false);
            }}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#D9CBE7] hover:bg-white/10"
          >
            Gestão Escolar
          </Link>
          <Link
            to="/identidade"
            onClick={() => setMenuAberto(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#3CC7E8] hover:bg-white/10"
          >
            Guia de Marca (/identidade)
          </Link>
          <div className="pt-2 border-t border-white/10">
            <Link
              to="/entrar"
              onClick={() => setMenuAberto(false)}
              className="block text-center px-4 py-2.5 rounded-xl bg-[#9847EE] text-white text-sm font-bold"
            >
              Escolher Perfil da Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
