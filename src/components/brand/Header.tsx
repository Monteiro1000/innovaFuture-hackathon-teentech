import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Flame,
  Zap,
  Sun,
  Moon,
  Menu,
  X,
  GraduationCap,
  Users,
  Building2,
  Palette,
  Play,
  ShieldCheck,
} from 'lucide-react';
import { LogoGuardianPrompt } from './LogoGuardianPrompt';
import { Botao } from './Botao';
import { useApp } from '@/context/AppContext';

export const Header: React.FC = () => {
  const {
    perfil,
    setPerfil,
    xp,
    streak,
    nivelCalculado,
    tema,
    toggleTema,
    ultimoEventoXP,
  } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const isLanding = location.pathname === '/';

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

  const selecionarPerfilDemo = (
    novoPerfil: 'aluno' | 'professor' | 'gestor',
    rota: string
  ) => {
    setPerfil(novoPerfil);
    setMenuAberto(false);
    navigate(rota);
  };

  return (
    <header className="sticky top-0 z-50 bg-gp-roxo-escuro/95 backdrop-blur-md border-b border-gp-lilas/30 shadow-gp-md">
      {/* Toast flutuante de ganho de XP */}
      {ultimoEventoXP && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-gp-md bg-gp-roxo text-gp-branco border-2 border-gp-ciano shadow-gp-lg font-bold text-sm animate-bounce"
        >
          <Zap className="w-5 h-5 text-gp-ciano shrink-0" />
          <span>{ultimoEventoXP}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo principal */}
        <Link
          to="/"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gp-ciano rounded-gp-sm py-1"
          aria-label="Guardian Prompt - Página Inicial"
        >
          <LogoGuardianPrompt variant="horizontal" tone="claro" size="sm" />
        </Link>

        {/* Navegação Desktop */}
        <nav
          aria-label="Navegação Principal"
          className="hidden lg:flex items-center gap-1 xl:gap-2"
        >
          <button
            type="button"
            onClick={() => irParaSecao('como-funciona')}
            className="px-3 py-2 rounded-gp-sm text-sm font-semibold text-gp-lilas-claro hover:text-gp-ciano hover:bg-gp-lilas-claro/10 gp-transition"
          >
            Como funciona
          </button>
          <button
            type="button"
            onClick={() => irParaSecao('etica')}
            className="px-3 py-2 rounded-gp-sm text-sm font-semibold text-gp-lilas-claro hover:text-gp-ciano hover:bg-gp-lilas-claro/10 gp-transition"
          >
            Ética & LGPD
          </button>
          <Link
            to="/identidade"
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-gp-sm text-sm font-semibold gp-transition ${
              location.pathname === '/identidade'
                ? 'bg-gp-roxo/30 text-gp-ciano border border-gp-ciano/50'
                : 'text-gp-lilas-claro hover:text-gp-ciano hover:bg-gp-lilas-claro/10'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Identidade</span>
          </Link>

          <span className="h-5 w-px bg-gp-lilas/30 mx-1" aria-hidden="true" />

          {/* Seletor rápido de perfis da Demo */}
          <div className="flex items-center gap-1 bg-gp-lilas-claro/10 p-1 rounded-gp-md border border-gp-lilas/30">
            <button
              type="button"
              onClick={() => selecionarPerfilDemo('aluno', '/aluno')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-gp-sm text-xs font-bold gp-transition ${
                location.pathname.startsWith('/aluno')
                  ? 'bg-gp-roxo text-gp-branco shadow-gp-sm'
                  : 'text-gp-lilas-claro hover:text-gp-branco'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Aluno</span>
            </button>
            <button
              type="button"
              onClick={() => selecionarPerfilDemo('professor', '/professor')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-gp-sm text-xs font-bold gp-transition ${
                location.pathname.startsWith('/professor')
                  ? 'bg-gp-roxo text-gp-branco shadow-gp-sm'
                  : 'text-gp-lilas-claro hover:text-gp-branco'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Professor</span>
            </button>
            <button
              type="button"
              onClick={() => selecionarPerfilDemo('gestor', '/gestor')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-gp-sm text-xs font-bold gp-transition ${
                location.pathname.startsWith('/gestor')
                  ? 'bg-gp-roxo text-gp-branco shadow-gp-sm'
                  : 'text-gp-lilas-claro hover:text-gp-branco'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Gestor</span>
            </button>
          </div>
        </nav>

        {/* Ações à direita: Status Gamificado + Tema + CTA Demo */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Pílula de XP e Ofensiva */}
          <div
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-gp-md bg-gp-lilas-claro/10 border border-gp-lilas/30 text-xs font-bold"
            title="Progresso de Gamificação Local"
          >
            <span className="inline-flex items-center gap-1 text-gp-atencao">
              <Flame className="w-4 h-4 fill-gp-atencao" />
              <span>{streak}d</span>
            </span>
            <span className="h-3.5 w-px bg-gp-lilas/30" />
            <span className="inline-flex items-center gap-1 text-gp-ciano">
              <Zap className="w-4 h-4" />
              <span>{xp} XP</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-gp-roxo text-gp-branco text-[11px]">
              Nv. {nivelCalculado}
            </span>
          </div>

          {/* Alternador de modo escuro/claro */}
          <button
            type="button"
            onClick={toggleTema}
            aria-label={
              tema === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro (padrão da marca)'
            }
            title={
              tema === 'dark' ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'
            }
            className="p-2.5 rounded-gp-md bg-gp-lilas-claro/10 border border-gp-lilas/30 text-gp-lilas-claro hover:text-gp-ciano hover:border-gp-ciano gp-transition"
          >
            {tema === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {isLanding ? (
            <Botao
              variant="secundario"
              size="sm"
              iconLeft={<Play className="w-4 h-4 fill-current" />}
              onClick={() => navigate('/entrar')}
            >
              Entrar na demo
            </Botao>
          ) : (
            <Botao
              variant="fantasma"
              size="sm"
              iconLeft={<ShieldCheck className="w-4 h-4 text-gp-ciano" />}
              onClick={() => navigate('/entrar')}
            >
              Trocar perfil ({perfil === 'visitante' ? 'Demo' : perfil})
            </Botao>
          )}
        </div>

        {/* Botão Menu Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTema}
            aria-label="Alternar tema"
            className="p-2 rounded-gp-sm bg-gp-lilas-claro/10 border border-gp-lilas/30 text-gp-lilas-claro"
          >
            {tema === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
            className="p-2.5 rounded-gp-md bg-gp-roxo/30 border border-gp-lilas/40 text-gp-branco"
          >
            {menuAberto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Expandido */}
      {menuAberto && (
        <div className="lg:hidden bg-gp-roxo-escuro border-t border-gp-lilas/30 px-4 pt-3 pb-6 space-y-4">
          <div className="flex items-center justify-between px-3 py-2 rounded-gp-md bg-gp-lilas-claro/10 border border-gp-lilas/30 text-xs font-bold">
            <span className="inline-flex items-center gap-1.5 text-gp-atencao">
              <Flame className="w-4 h-4" /> Ofensiva: {streak} dias
            </span>
            <span className="inline-flex items-center gap-1.5 text-gp-ciano">
              <Zap className="w-4 h-4" /> {xp} XP (Nível {nivelCalculado})
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            <button
              type="button"
              onClick={() => irParaSecao('como-funciona')}
              className="text-left px-3 py-2.5 rounded-gp-sm text-sm font-semibold text-gp-lilas-claro hover:bg-gp-lilas-claro/10"
            >
              Como funciona
            </button>
            <button
              type="button"
              onClick={() => irParaSecao('etica')}
              className="text-left px-3 py-2.5 rounded-gp-sm text-sm font-semibold text-gp-lilas-claro hover:bg-gp-lilas-claro/10"
            >
              Ética e Conformidade (LGPD)
            </button>
            <Link
              to="/identidade"
              onClick={() => setMenuAberto(false)}
              className="px-3 py-2.5 rounded-gp-sm text-sm font-semibold text-gp-ciano hover:bg-gp-lilas-claro/10 flex items-center gap-2"
            >
              <Palette className="w-4 h-4" /> Guia de Identidade (/identidade)
            </Link>
          </div>

          <div className="pt-2 border-t border-gp-lilas/25 space-y-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-gp-lilas-claro px-1">
              Acessar Ambiente de Demonstração:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <Botao
                variant="primario"
                size="sm"
                onClick={() => selecionarPerfilDemo('aluno', '/aluno')}
              >
                Aluno
              </Botao>
              <Botao
                variant="fantasma"
                size="sm"
                onClick={() => selecionarPerfilDemo('professor', '/professor')}
              >
                Professor
              </Botao>
              <Botao
                variant="fantasma"
                size="sm"
                onClick={() => selecionarPerfilDemo('gestor', '/gestor')}
              >
                Gestor
              </Botao>
            </div>
            <Botao
              variant="secundario"
              size="sm"
              fullWidth
              onClick={() => {
                setMenuAberto(false);
                navigate('/entrar');
              }}
            >
              Selecionar Perfil da Demo
            </Botao>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
