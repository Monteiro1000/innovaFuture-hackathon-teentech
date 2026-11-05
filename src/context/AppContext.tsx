import React, { createContext, useContext, useState, useEffect } from 'react';

export type PerfilUsuario = 'visitante' | 'aluno' | 'professor' | 'gestor';
export type FaixaEtaria = 'fundamental' | 'medio';
export type TemaMarca = 'light' | 'dark';

export interface BadgeConquista {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  desbloqueada: boolean;
  dataConquista?: string;
}

export interface TurmaEscolar {
  id: string;
  nome: string;
  serie: string;
  faixa: FaixaEtaria;
  codigoConvite: string;
  totalAlunosAnonimos: number;
  adesaoPercentual: number;
  placarSegurancaMedio: number;
  taxaProtecaoGeolocalizacao: number;
  plagiosEvitados: number;
  dadosSensiveisProtegidos: number;
  modulosConcluidosPct: number;
  modulosAtribuidos: string[];
  moduloMaisDificil: string;
  evolucaoSemanal: { semana: string; placar: number }[];
  aprendizagensPorTema: { tema: string; percentual: number }[];
}

interface AppState {
  perfil: PerfilUsuario;
  faixaEtaria: FaixaEtaria;
  tema: TemaMarca;
  xp: number;
  streak: number;
  promptsSegurosCount: number;
  dadosProtegidosCount: number;
  plagiosEvitadosCount: number;
  fasesConcluidas: string[];
  badges: BadgeConquista[];
  turmas: TurmaEscolar[];
}

interface AppContextType extends AppState {
  setPerfil: (perfil: PerfilUsuario) => void;
  setFaixaEtaria: (faixa: FaixaEtaria) => void;
  toggleTema: () => void;
  adicionarXP: (pontos: number, motivo?: string) => void;
  desbloquearBadge: (badgeId: string) => void;
  concluirFase: (faseId: string, xpGanho: number, badgeId?: string) => void;
  registrarAuditoriaAluno: (teveDados: boolean, tevePlagio: boolean, seguro: boolean) => void;
  criarTurma: (novaTurma: {
    nome: string;
    serie: string;
    faixa: FaixaEtaria;
    modulosAtribuidos: string[];
  }) => TurmaEscolar;
  atribuirModuloTurma: (turmaId: string, moduloNome: string) => void;
  resetarDemo: () => void;
  nivelCalculado: number;
  ultimoEventoXP: string | null;
}

const STORAGE_KEY = 'guardian_prompt_demo_v2';

const INITIAL_BADGES: BadgeConquista[] = [
  {
    id: 'primeiro-prompt-seguro',
    titulo: 'Primeiro prompt seguro',
    descricao: 'Enviou um comando formativo sem expor informações pessoais.',
    icone: 'ShieldCheck',
    desbloqueada: true,
    dataConquista: 'Hoje',
  },
  {
    id: 'checador-fontes',
    titulo: 'Olho de fonte',
    descricao: 'Verificou autoria, data e referências antes de confiar em uma informação.',
    icone: 'SearchCheck',
    desbloqueada: true,
    dataConquista: 'Hoje',
  },
  {
    id: 'guardiao-dados',
    titulo: 'Guardião de dados',
    descricao: 'Reformulou um prompt protegendo nome completo, escola e localização.',
    icone: 'Lock',
    desbloqueada: false,
  },
  {
    id: 'pensador-critico',
    titulo: 'Mente autônoma',
    descricao: 'Transformou um pedido de trabalho pronto em roteiro de pesquisa própria.',
    icone: 'BrainCircuit',
    desbloqueada: false,
  },
  {
    id: 'detetive-deepfake',
    titulo: 'Caçador de Deepfakes',
    descricao: 'Identificou sinais visuais e sonoros de mídia sintética no simulador.',
    icone: 'Eye',
    desbloqueada: false,
  },
];

const INITIAL_TURMAS: TurmaEscolar[] = [
  {
    id: 'turma-8b',
    nome: '8º ano B • Ciências',
    serie: '8º Ano (Ensino Fundamental II)',
    faixa: 'fundamental',
    codigoConvite: 'GP-8B-2026',
    totalAlunosAnonimos: 24,
    adesaoPercentual: 75,
    placarSegurancaMedio: 81,
    taxaProtecaoGeolocalizacao: 80,
    plagiosEvitados: 15,
    dadosSensiveisProtegidos: 29,
    modulosConcluidosPct: 72,
    modulosAtribuidos: [
      'Ciclo da Água (Laboratório de Prompts)',
      'Vazamento de Dados: Onde está o risco?',
      'Deepfake ou Real?',
    ],
    moduloMaisDificil: 'Identificação de Deepfakes',
    evolucaoSemanal: [
      { semana: 'S1', placar: 62 },
      { semana: 'S2', placar: 69 },
      { semana: 'S3', placar: 74 },
      { semana: 'S4', placar: 81 },
    ],
    aprendizagensPorTema: [
      { tema: 'Privacidade', percentual: 82 },
      { tema: 'Fontes', percentual: 66 },
      { tema: 'Deepfake', percentual: 58 },
    ],
  },
  {
    id: 'turma-9a',
    nome: '9º ano A • Geografia',
    serie: '9º Ano (Ensino Fundamental II)',
    faixa: 'fundamental',
    codigoConvite: 'GP-9A-2026',
    totalAlunosAnonimos: 28,
    adesaoPercentual: 88,
    placarSegurancaMedio: 84,
    taxaProtecaoGeolocalizacao: 84,
    plagiosEvitados: 21,
    dadosSensiveisProtegidos: 34,
    modulosConcluidosPct: 79,
    modulosAtribuidos: [
      'Ecossistemas Brasileiros (Laboratório)',
      'Verificação de Fontes',
    ],
    moduloMaisDificil: 'Verificação Cruzada de Fontes',
    evolucaoSemanal: [
      { semana: 'S1', placar: 64 },
      { semana: 'S2', placar: 71 },
      { semana: 'S3', placar: 78 },
      { semana: 'S4', placar: 84 },
    ],
    aprendizagensPorTema: [
      { tema: 'Privacidade', percentual: 85 },
      { tema: 'Fontes', percentual: 72 },
      { tema: 'Deepfake', percentual: 64 },
    ],
  },
  {
    id: 'turma-1m',
    nome: '1ª série A • Redação & IA',
    serie: '1ª Série (Ensino Médio)',
    faixa: 'medio',
    codigoConvite: 'GP-1A-2026',
    totalAlunosAnonimos: 32,
    adesaoPercentual: 91,
    placarSegurancaMedio: 86,
    taxaProtecaoGeolocalizacao: 88,
    plagiosEvitados: 27,
    dadosSensiveisProtegidos: 41,
    modulosConcluidosPct: 84,
    modulosAtribuidos: [
      'Ética Digital e Redação (Laboratório)',
      'Cidadania Digital: LGPD, ECA e Marco Civil',
    ],
    moduloMaisDificil: 'Alucinações Bibliográficas em IA',
    evolucaoSemanal: [
      { semana: 'S1', placar: 68 },
      { semana: 'S2', placar: 74 },
      { semana: 'S3', placar: 81 },
      { semana: 'S4', placar: 86 },
    ],
    aprendizagensPorTema: [
      { tema: 'Privacidade', percentual: 88 },
      { tema: 'Fontes', percentual: 76 },
      { tema: 'Deepfake', percentual: 70 },
    ],
  },
  {
    id: 'turma-7c',
    nome: '7º ano C • Cidadania Digital',
    serie: '7º Ano (Ensino Fundamental II)',
    faixa: 'fundamental',
    codigoConvite: 'GP-7C-2026',
    totalAlunosAnonimos: 26,
    adesaoPercentual: 82,
    placarSegurancaMedio: 77,
    taxaProtecaoGeolocalizacao: 79,
    plagiosEvitados: 12,
    dadosSensiveisProtegidos: 22,
    modulosConcluidosPct: 68,
    modulosAtribuidos: [
      'Ciclo da Água (Laboratório de Prompts)',
      'Protegendo Minha Rotina e Endereço',
    ],
    moduloMaisDificil: 'Identificação de Deepfakes',
    evolucaoSemanal: [
      { semana: 'S1', placar: 58 },
      { semana: 'S2', placar: 65 },
      { semana: 'S3', placar: 71 },
      { semana: 'S4', placar: 77 },
    ],
    aprendizagensPorTema: [
      { tema: 'Privacidade', percentual: 79 },
      { tema: 'Fontes', percentual: 62 },
      { tema: 'Deepfake', percentual: 55 },
    ],
  },
];

const DEFAULT_STATE: AppState = {
  perfil: 'visitante',
  faixaEtaria: 'medio',
  tema: 'light', // Modo claro por padrão conforme solicitado!
  xp: 240,
  streak: 5,
  promptsSegurosCount: 4,
  dadosProtegidosCount: 6,
  plagiosEvitadosCount: 3,
  fasesConcluidas: ['trilha-fund-1'],
  badges: INITIAL_BADGES,
  turmas: INITIAL_TURMAS,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch {
      // fallback
    }
    return DEFAULT_STATE;
  });

  const [ultimoEventoXP, setUltimoEventoXP] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    if (state.tema === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [state.tema]);

  const setPerfil = (perfil: PerfilUsuario) => {
    setState((prev) => ({ ...prev, perfil }));
  };

  const setFaixaEtaria = (faixaEtaria: FaixaEtaria) => {
    setState((prev) => ({ ...prev, faixaEtaria }));
  };

  const toggleTema = () => {
    setState((prev) => ({
      ...prev,
      tema: prev.tema === 'light' ? 'dark' : 'light',
    }));
  };

  const adicionarXP = (pontos: number, motivo?: string) => {
    setState((prev) => ({
      ...prev,
      xp: prev.xp + pontos,
    }));
    if (motivo) {
      setUltimoEventoXP(`+${pontos} XP • ${motivo}`);
      setTimeout(() => {
        setUltimoEventoXP(null);
      }, 3800);
    }
  };

  const desbloquearBadge = (badgeId: string) => {
    setState((prev) => ({
      ...prev,
      badges: prev.badges.map((b) =>
        b.id === badgeId && !b.desbloqueada
          ? {
              ...b,
              desbloqueada: true,
              dataConquista: new Date().toLocaleDateString('pt-BR'),
            }
          : b
      ),
    }));
  };

  const concluirFase = (faseId: string, xpGanho: number, badgeId?: string) => {
    setState((prev) => {
      const jaConcluida = prev.fasesConcluidas.includes(faseId);
      const novasFases = jaConcluida
        ? prev.fasesConcluidas
        : [...prev.fasesConcluidas, faseId];

      const novasBadges = badgeId
        ? prev.badges.map((b) =>
            b.id === badgeId
              ? {
                  ...b,
                  desbloqueada: true,
                  dataConquista:
                    b.dataConquista || new Date().toLocaleDateString('pt-BR'),
                }
              : b
          )
        : prev.badges;

      return {
        ...prev,
        xp: prev.xp + (jaConcluida ? Math.round(xpGanho / 2) : xpGanho),
        fasesConcluidas: novasFases,
        badges: novasBadges,
      };
    });
    setUltimoEventoXP(`+${xpGanho} XP • Conquista desbloqueada!`);
    setTimeout(() => setUltimoEventoXP(null), 3800);
  };

  const registrarAuditoriaAluno = (
    teveDados: boolean,
    tevePlagio: boolean,
    seguro: boolean
  ) => {
    setState((prev) => ({
      ...prev,
      promptsSegurosCount: seguro
        ? prev.promptsSegurosCount + 1
        : prev.promptsSegurosCount,
      dadosProtegidosCount: teveDados
        ? prev.dadosProtegidosCount + 1
        : prev.dadosProtegidosCount,
      plagiosEvitadosCount: tevePlagio
        ? prev.plagiosEvitadosCount + 1
        : prev.plagiosEvitadosCount,
    }));
  };

  const criarTurma = (novaTurma: {
    nome: string;
    serie: string;
    faixa: FaixaEtaria;
    modulosAtribuidos: string[];
  }): TurmaEscolar => {
    const sufixo = Math.random().toString(36).substring(2, 5).toUpperCase();
    const criada: TurmaEscolar = {
      id: `turma-${Date.now()}`,
      nome: novaTurma.nome,
      serie: novaTurma.serie,
      faixa: novaTurma.faixa,
      codigoConvite: `GP-${sufixo}-2026`,
      totalAlunosAnonimos: 26,
      adesaoPercentual: 85,
      placarSegurancaMedio: 82,
      taxaProtecaoGeolocalizacao: 80,
      plagiosEvitados: 14,
      dadosSensiveisProtegidos: 22,
      modulosConcluidosPct: 74,
      modulosAtribuidos:
        novaTurma.modulosAtribuidos.length > 0
          ? novaTurma.modulosAtribuidos
          : ['Ciclo da Água (Laboratório de Prompts)', 'Vazamento de Dados'],
      moduloMaisDificil: 'Identificação de Deepfakes',
      evolucaoSemanal: [
        { semana: 'S1', placar: 60 },
        { semana: 'S2', placar: 68 },
        { semana: 'S3', placar: 75 },
        { semana: 'S4', placar: 82 },
      ],
      aprendizagensPorTema: [
        { tema: 'Privacidade', percentual: 83 },
        { tema: 'Fontes', percentual: 68 },
        { tema: 'Deepfake', percentual: 60 },
      ],
    };

    setState((prev) => ({
      ...prev,
      turmas: [criada, ...prev.turmas],
    }));

    return criada;
  };

  const atribuirModuloTurma = (turmaId: string, moduloNome: string) => {
    setState((prev) => ({
      ...prev,
      turmas: prev.turmas.map((t) =>
        t.id === turmaId && !t.modulosAtribuidos.includes(moduloNome)
          ? { ...t, modulosAtribuidos: [...t.modulosAtribuidos, moduloNome] }
          : t
      ),
    }));
  };

  const resetarDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(DEFAULT_STATE);
  };

  const nivelCalculado = Math.floor(state.xp / 80);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setPerfil,
        setFaixaEtaria,
        toggleTema,
        adicionarXP,
        desbloquearBadge,
        concluirFase,
        registrarAuditoriaAluno,
        criarTurma,
        atribuirModuloTurma,
        resetarDemo,
        nivelCalculado,
        ultimoEventoXP,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser utilizado dentro de um AppProvider');
  }
  return context;
};
