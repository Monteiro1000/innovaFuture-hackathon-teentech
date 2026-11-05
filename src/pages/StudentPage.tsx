import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Bot,
  Gamepad2,
  Map,
  Award,
  Flame,
  Zap,
  ShieldCheck,
  BrainCircuit,
  Eye,
  SearchCheck,
  Scale,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import {
  Card,
  Badge,
  BarraProgresso,
  Destaque,
} from '@/components/brand';
import { PromptLab } from '@/components/student/PromptLab';
import { RiskSimulator } from '@/components/student/RiskSimulator';
import { LiteracyTracks } from '@/components/student/LiteracyTracks';
import { useApp } from '@/context/AppContext';

export const StudentPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const abaInicial =
    (searchParams.get('aba') as 'laboratorio' | 'simulador' | 'trilhas') ||
    'laboratorio';

  const [abaAtiva, setAbaAtiva] = useState<
    'laboratorio' | 'simulador' | 'trilhas'
  >(abaInicial);

  const {
    faixaEtaria,
    setFaixaEtaria,
    xp,
    streak,
    nivelCalculado,
    badges,
  } = useApp();

  useEffect(() => {
    const param = searchParams.get('aba');
    if (param === 'laboratorio' || param === 'simulador' || param === 'trilhas') {
      setAbaAtiva(param);
    }
  }, [searchParams]);

  const mudarAba = (novaAba: 'laboratorio' | 'simulador' | 'trilhas') => {
    setAbaAtiva(novaAba);
    setSearchParams({ aba: novaAba });
  };

  const xpNoNivelAtual = xp % 100;
  const badgesDesbloqueadasCount = badges.filter((b) => b.desbloqueada).length;

  const renderBadgeIcon = (icone: string) => {
    switch (icone) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5" />;
      case 'Eye':
        return <Eye className="w-5 h-5" />;
      case 'SearchCheck':
        return <SearchCheck className="w-5 h-5" />;
      default:
        return <Scale className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Cabeçalho Gamificado do Estudante */}
      <div className="rounded-gp-xl bg-gp-roxo-escuro border border-gp-lilas/30 p-6 sm:p-8 shadow-gp-lg space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="ciano">Ambiente do Estudante • Sessão Anônima #01</Badge>
              <Badge variant="sucesso">Processamento 100% Local (LGPD)</Badge>
            </div>
            <h1 className="gp-h2 text-gp-branco">
              <Destaque>Laboratório & Missões</Destaque> de Segurança em IA
            </h1>
            <p className="text-xs sm:text-sm text-gp-lilas-claro">
              Aprenda a conversar com inteligências artificiais protegendo seus dados pessoais e exercitando seu próprio pensamento crítico.
            </p>
          </div>

          {/* Seletor Rápido Fundamental vs. Médio */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="p-1.5 rounded-gp-md bg-gp-lilas-claro/10 border border-gp-lilas/30 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFaixaEtaria('fundamental')}
                className={`px-3.5 py-2 rounded-gp-sm text-xs font-extrabold gp-transition ${
                  faixaEtaria === 'fundamental'
                    ? 'bg-gp-ciano text-gp-roxo-escuro shadow-gp-sm'
                    : 'text-gp-lilas-claro hover:text-gp-branco'
                }`}
              >
                Trilha Fundamental
              </button>
              <button
                type="button"
                onClick={() => setFaixaEtaria('medio')}
                className={`px-3.5 py-2 rounded-gp-sm text-xs font-extrabold gp-transition ${
                  faixaEtaria === 'medio'
                    ? 'bg-gp-ciano text-gp-roxo-escuro shadow-gp-sm'
                    : 'text-gp-lilas-claro hover:text-gp-branco'
                }`}
              >
                Trilha Ensino Médio
              </button>
            </div>
          </div>
        </div>

        {/* Barra de Gamificação: Nível, XP, Streak e Badges */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-gp-lilas/25 items-center">
          <div className="md:col-span-6">
            <BarraProgresso
              valor={xpNoNivelAtual}
              maximo={100}
              tipo="xp"
              label={`Nível ${nivelCalculado} • Guardião Digital (${xp} XP Total)`}
              sublabel={`Faltam ${100 - xpNoNivelAtual} XP para alcançar o Nível ${
                nivelCalculado + 1
              }`}
            />
          </div>

          <div className="md:col-span-3 flex items-center gap-3 p-3 rounded-gp-md bg-gp-lilas-claro/10 border border-gp-lilas/30">
            <div className="w-10 h-10 rounded-gp-sm bg-gp-atencao/20 border border-gp-atencao/50 flex items-center justify-center text-gp-atencao shrink-0">
              <Flame className="w-5 h-5 fill-gp-atencao" />
            </div>
            <div>
              <span className="text-xs text-gp-lilas-claro block">
                Ofensiva (Streak)
              </span>
              <strong className="text-sm sm:text-base font-extrabold text-gp-branco">
                {streak} dias seguidos
              </strong>
            </div>
          </div>

          <div className="md:col-span-3 flex items-center gap-3 p-3 rounded-gp-md bg-gp-lilas-claro/10 border border-gp-lilas/30">
            <div className="w-10 h-10 rounded-gp-sm bg-gp-roxo/30 border border-gp-ciano/50 flex items-center justify-center text-gp-ciano shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-gp-lilas-claro block">
                Conquistas (Badges)
              </span>
              <strong className="text-sm sm:text-base font-extrabold text-gp-branco">
                {badgesDesbloqueadasCount}/{badges.length} desbloqueadas
              </strong>
            </div>
          </div>
        </div>

        {/* Navegação das 3 Abas Principais do Estudante */}
        <div
          role="tablist"
          aria-label="Módulos do Estudante"
          className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={abaAtiva === 'laboratorio'}
            onClick={() => mudarAba('laboratorio')}
            className={`flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-gp-md font-extrabold text-xs sm:text-sm border-2 gp-transition ${
              abaAtiva === 'laboratorio'
                ? 'bg-gp-roxo text-gp-branco border-gp-ciano shadow-gp-roxo-glow'
                : 'bg-gp-lilas-claro/5 text-gp-lilas-claro border-gp-lilas/30 hover:border-gp-lilas'
            }`}
          >
            <Bot className="w-5 h-5 text-gp-ciano shrink-0" />
            <span>1. Laboratório de Prompts + Auditor</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={abaAtiva === 'simulador'}
            onClick={() => mudarAba('simulador')}
            className={`flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-gp-md font-extrabold text-xs sm:text-sm border-2 gp-transition ${
              abaAtiva === 'simulador'
                ? 'bg-gp-roxo text-gp-branco border-gp-ciano shadow-gp-roxo-glow'
                : 'bg-gp-lilas-claro/5 text-gp-lilas-claro border-gp-lilas/30 hover:border-gp-lilas'
            }`}
          >
            <Gamepad2 className="w-5 h-5 text-gp-ciano shrink-0" />
            <span>2. Simulador de Cenários (Mini-Jogos)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={abaAtiva === 'trilhas'}
            onClick={() => mudarAba('trilhas')}
            className={`flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-gp-md font-extrabold text-xs sm:text-sm border-2 gp-transition ${
              abaAtiva === 'trilhas'
                ? 'bg-gp-roxo text-gp-branco border-gp-ciano shadow-gp-roxo-glow'
                : 'bg-gp-lilas-claro/5 text-gp-lilas-claro border-gp-lilas/30 hover:border-gp-lilas'
            }`}
          >
            <Map className="w-5 h-5 text-gp-ciano shrink-0" />
            <span>3. Trilhas por Idade & Badges</span>
          </button>
        </div>
      </div>

      {/* Conteúdo da Aba Selecionada */}
      {abaAtiva === 'laboratorio' && <PromptLab />}
      {abaAtiva === 'simulador' && <RiskSimulator />}
      {abaAtiva === 'trilhas' && (
        <LiteracyTracks onIrParaAba={(destino) => mudarAba(destino)} />
      )}

      {/* Vitrine de Badges / Conquistas do Estudante */}
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-gp-ciano" />
            <h2 className="text-base sm:text-lg font-extrabold text-gp-branco">
              Suas Conquistas de Cidadania Digital (Badges)
            </h2>
          </div>
          <span className="text-xs text-gp-lilas-claro">
            Reformule prompts no Laboratório ou vença fases no Simulador para desbloquear todas!
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-gp-md border flex flex-col justify-between gap-3 gp-transition ${
                badge.desbloqueada
                  ? 'bg-gp-roxo/25 border-gp-ciano text-gp-branco shadow-gp-sm'
                  : 'bg-gp-roxo-escuro/60 border-gp-lilas/25 text-gp-lilas-claro/70'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-gp-sm flex items-center justify-center ${
                      badge.desbloqueada
                        ? 'bg-gp-ciano text-gp-roxo-escuro'
                        : 'bg-gp-lilas-claro/10 text-gp-lilas-claro'
                    }`}
                  >
                    {renderBadgeIcon(badge.icone)}
                  </div>
                  {badge.desbloqueada ? (
                    <CheckCircle2 className="w-4 h-4 text-gp-sucesso" />
                  ) : (
                    <Lock className="w-4 h-4 text-gp-lilas-claro/50" />
                  )}
                </div>
                <h3 className="text-sm font-extrabold text-gp-branco">
                  {badge.titulo}
                </h3>
                <p className="text-xs leading-relaxed">{badge.descricao}</p>
              </div>

              <div className="pt-2 border-t border-gp-lilas/20 text-[11px] font-bold">
                {badge.desbloqueada ? (
                  <span className="text-gp-sucesso flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Conquistada!
                  </span>
                ) : (
                  <span className="text-gp-lilas-claro/60">Bloqueada</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StudentPage;
