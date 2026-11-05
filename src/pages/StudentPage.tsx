import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BannerGP, Botao } from '@/components/brand';
import { PromptLab } from '@/components/student/PromptLab';
import { RiskSimulator } from '@/components/student/RiskSimulator';
import { LiteracyTracks } from '@/components/student/LiteracyTracks';
import { ATIVIDADES_LABORATORIO } from '@/lib/auditorRules';

export const StudentPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const abaUrl = searchParams.get('aba');

  const [abaAtiva, setAbaAtiva] = useState<'laboratorio' | 'trilhas' | 'simulador'>(
    abaUrl === 'trilhas'
      ? 'trilhas'
      : abaUrl === 'simulador'
      ? 'simulador'
      : 'laboratorio'
  );

  const [atividadeId, setAtividadeId] = useState<string>(
    ATIVIDADES_LABORATORIO[0].id
  );

  useEffect(() => {
    const param = searchParams.get('aba');
    if (param === 'trilhas' || param === 'simulador') {
      setAbaAtiva(param);
    } else {
      setAbaAtiva('laboratorio');
    }
  }, [searchParams]);

  const mudarAba = (nova: 'laboratorio' | 'trilhas' | 'simulador') => {
    setAbaAtiva(nova);
    if (nova === 'laboratorio') {
      setSearchParams({});
    } else {
      setSearchParams({ aba: nova });
    }
  };

  const atividadeAtual =
    ATIVIDADES_LABORATORIO.find((a) => a.id === atividadeId) ||
    ATIVIDADES_LABORATORIO[0];

  const tituloCurtoBanner =
    atividadeAtual.id === 'ciclo-da-agua'
      ? 'Ciclo da Água'
      : atividadeAtual.id === 'ecossistemas-brasileiros'
      ? 'Biomas Brasileiros'
      : 'Redação & Ética Digital';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Banner superior idêntico às Telas 6 & 7 */}
      {abaAtiva === 'laboratorio' ? (
        <BannerGP
          destaque="Laboratório de Prompts"
          titulo={tituloCurtoBanner}
          subtitulo="Crie um pedido para aprender sobre evaporação, condensação e chuva. Você é o autor da jornada."
        />
      ) : (
        <BannerGP
          destaque="Trilhas & Simulador"
          titulo="Missões de Segurança Digital"
          subtitulo="Pratique em cenários simulados sobre vazamento de dados, deepfakes, verificação de fontes e cidadania digital."
        >
          <Botao
            variant={abaAtiva === 'trilhas' ? 'secundario' : 'primario'}
            size="sm"
            onClick={() => mudarAba('trilhas')}
          >
            Mapa de Trilhas por Idade
          </Botao>
          <Botao
            variant={abaAtiva === 'simulador' ? 'secundario' : 'primario'}
            size="sm"
            onClick={() => mudarAba('simulador')}
          >
            Simulador de Riscos (4 Fases)
          </Botao>
          <Botao
            variant="fantasma"
            size="sm"
            onClick={() => mudarAba('laboratorio')}
          >
            Voltar ao Laboratório
          </Botao>
        </BannerGP>
      )}

      {abaAtiva === 'laboratorio' && (
        <PromptLab
          atividadeSelecionadaId={atividadeId}
          onSelectAtividade={setAtividadeId}
          onIrParaTrilhas={() => mudarAba('trilhas')}
        />
      )}

      {abaAtiva === 'trilhas' && (
        <div className="space-y-8">
          <LiteracyTracks onIrParaAba={(dest) => mudarAba(dest)} />
          <RiskSimulator />
        </div>
      )}

      {abaAtiva === 'simulador' && <RiskSimulator />}
    </div>
  );
};

export default StudentPage;
