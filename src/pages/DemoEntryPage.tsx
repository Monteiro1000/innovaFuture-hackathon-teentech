import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Backpack, Presentation, Building2 } from 'lucide-react';
import { Card, Destaque, PadraoBlocos } from '@/components/brand';
import { useApp } from '@/context/AppContext';

/**
 * Tela /entrar e /demo fiel à Tela 5 de referência:
 * - "Bem-vindo! Escolha seu perfil"
 * - Seletor em pílula "Ensino Fundamental | Ensino Médio"
 * - 3 cards limpos: Aluno, Professor, Gestor escolar
 */
export const DemoEntryPage: React.FC = () => {
  const navigate = useNavigate();
  const { faixaEtaria, setFaixaEtaria, setPerfil } = useApp();

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-12rem)] flex items-center justify-center py-14 px-4 sm:px-6 lg:px-8">
      {/* Blocos geométricos suaves ao fundo como na Tela 5 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PadraoBlocos variant="fundo" className="w-full max-w-4xl h-auto" />
      </div>

      <div className="relative z-10 max-w-4xl w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="gp-h2 sm:text-4xl font-extrabold gp-text-primary">
            <Destaque>Bem-vindo!</Destaque> Escolha seu perfil
          </h1>
          <p className="text-xs sm:text-sm gp-text-secondary">
            Login simulado. Todos os perfis são fictícios.
          </p>
        </div>

        {/* Toggle Ensino Fundamental | Ensino Médio */}
        <div className="inline-flex items-center p-1.5 rounded-full gp-card-surface">
          <button
            type="button"
            onClick={() => setFaixaEtaria('fundamental')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold gp-transition ${
              faixaEtaria === 'fundamental'
                ? 'bg-[#9847EE] text-white shadow-sm'
                : 'gp-text-secondary hover:gp-text-primary'
            }`}
          >
            Ensino Fundamental
          </button>
          <button
            type="button"
            onClick={() => setFaixaEtaria('medio')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold gp-transition ${
              faixaEtaria === 'medio'
                ? 'bg-[#9847EE] text-white shadow-sm'
                : 'gp-text-secondary hover:gp-text-primary'
            }`}
          >
            Ensino Médio
          </button>
        </div>

        {/* 3 Cards de Perfil */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left pt-2">
          {/* Card 1: Aluno */}
          <Card
            onClick={() => {
              setPerfil('aluno');
              navigate('/aluno');
            }}
            className="cursor-pointer hover:border-[#9847EE] hover:-translate-y-0.5 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <Backpack className="w-7 h-7 text-[#1AA3C4] dark:text-[#3CC7E8]" strokeWidth={1.8} />
              <h2 className="text-lg font-extrabold gp-text-primary">Aluno</h2>
              <p className="text-xs sm:text-sm gp-text-secondary leading-relaxed">
                Laboratório de Prompts, simulador e trilhas.
              </p>
            </div>
            <span className="text-xs font-bold text-[#9847EE] dark:text-[#3CC7E8] inline-flex items-center gap-1">
              Entrar como aluno →
            </span>
          </Card>

          {/* Card 2: Professor */}
          <Card
            onClick={() => {
              setPerfil('professor');
              navigate('/professor');
            }}
            className="cursor-pointer hover:border-[#9847EE] hover:-translate-y-0.5 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <Presentation className="w-7 h-7 text-[#1AA3C4] dark:text-[#3CC7E8]" strokeWidth={1.8} />
              <h2 className="text-lg font-extrabold gp-text-primary">Professor</h2>
              <p className="text-xs sm:text-sm gp-text-secondary leading-relaxed">
                Turmas, atividades e métricas anônimas.
              </p>
            </div>
            <span className="text-xs font-bold text-[#9847EE] dark:text-[#3CC7E8] inline-flex items-center gap-1">
              Entrar como professor →
            </span>
          </Card>

          {/* Card 3: Gestor escolar */}
          <Card
            onClick={() => {
              setPerfil('gestor');
              navigate('/gestor');
            }}
            className="cursor-pointer hover:border-[#9847EE] hover:-translate-y-0.5 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <Building2 className="w-7 h-7 text-[#1AA3C4] dark:text-[#3CC7E8]" strokeWidth={1.8} />
              <h2 className="text-lg font-extrabold gp-text-primary">Gestor escolar</h2>
              <p className="text-xs sm:text-sm gp-text-secondary leading-relaxed">
                Visão da rede com dados agregados.
              </p>
            </div>
            <span className="text-xs font-bold text-[#9847EE] dark:text-[#3CC7E8] inline-flex items-center gap-1">
              Entrar como gestor escolar →
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DemoEntryPage;
