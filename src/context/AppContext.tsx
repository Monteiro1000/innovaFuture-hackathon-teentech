import React, { createContext, useContext, useState, useEffect } from 'react';

export type PerfilUsuario = 'visitante' | 'aluno' | 'professor' | 'gestor';
export type FaixaEtaria = 'fundamental' | 'medio';
export type TemaMarca = 'dark' | 'light';

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
  modulosAtribuidos: string[];
  moduloMaisDificil: string;
  evolucaoSemanal: { semana: string; placar: number }[];
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

const STORAGE_KEY = 'guardian_prompt_demo_v1';

const INITIAL_BADGES: BadgeConquista[] = [
  {
    id: 'guardiao-dados',
    titulo: 'Guardião dos Dados',
    descricao: 'Reformulou um prompt protegendo nome completo, escola e localização.',
    icone: 'ShieldCheck',
    desbloqueada: false,
  },
  {
    id: 'pensador-critico',
    titulo: 'Mente Autônoma',
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
  {
    id: 'checador-fontes',
    titulo: 'Detetive de Fontes',
    descricao: 'Verificou autoria, data e referências antes de compartilhar informações.',
    icone: 'SearchCheck',
    desbloqueada: false,
  },
  {
    id: 'cidadao-digital',
    titulo: 'Defensor LGPD & ECA',
    descricao: 'Dominou os direitos e deveres do Marco Civil da Internet, ECA e LGPD.',
    icone: 'Scale',
    desbloqueada: false,
  },
];

const INITIAL_TURMAS: TurmaEscolar[] = [
  {
    id: 'turma-8a',
    nome: 'Turma 8º Ano A — Ciências & Tecnologia',
    serie: '8º Ano (Ensino Fundamental II)',
    faixa: 'fundamental',
    codigoConvite: 'GP-8A-2026',
    totalAlunosAnonimos: 32,
    adesaoPercentual: 94,
    placarSegurancaMedio: 86,
    taxaProtecaoGeolocalizacao: 80,
    plagiosEvitados: 47,
    dadosSensiveisProtegidos: 63,
    modulosAtribuidos: [
      'Ciclo da Água (Laboratório de Prompts)',
      'Vazamento de Dados: Onde está o risco?',
      'Deepfake ou Real?',
    ],
    moduloMaisDificil: 'Identificação de Deepfakes em Áudio',
    evolucaoSemanal: [
      { semana: 'Sem 1', placar: 52 },
      { semana: 'Sem 2', placar: 64 },
      { semana: 'Sem 3', placar: 73 },
      { semana: 'Sem 4', placar: 81 },
      { semana: 'Sem 5', placar: 86 },
    ],
  },
  {
    id: 'turma-2m',
    nome: 'Turma 2ª Série B — Redação & Pesquisa Científica',
    serie: '2ª Série (Ensino Médio)',
    faixa: 'medio',
    codigoConvite: 'GP-2B-2026',
    totalAlunosAnonimos: 35,
    adesaoPercentual: 89,
    placarSegurancaMedio: 88,
    taxaProtecaoGeolocalizacao: 85,
    plagiosEvitados: 58,
    dadosSensiveisProtegidos: 51,
    modulosAtribuidos: [
      'Ética Digital e Redação (Laboratório)',
      'Verificação de Fontes e Alucinações de IA',
      'Cidadania Digital: LGPD, ECA e Marco Civil',
    ],
    moduloMaisDificil: 'Checagem Cruzada de Referências Acadêmicas',
    evolucaoSemanal: [
      { semana: 'Sem 1', placar: 58 },
      { semana: 'Sem 2', placar: 69 },
      { semana: 'Sem 3', placar: 77 },
      { semana: 'Sem 4', placar: 84 },
      { semana: 'Sem 5', placar: 88 },
    ],
  },
  {
    id: 'turma-6c',
    nome: 'Turma 6º Ano C — Primeiros Passos Digitais',
    serie: '6º Ano (Ensino Fundamental II)',
    faixa: 'fundamental',
    codigoConvite: 'GP-6C-2026',
    totalAlunosAnonimos: 28,
    adesaoPercentual: 96,
    placarSegurancaMedio: 82,
    taxaProtecaoGeolocalizacao: 79,
    plagiosEvitados: 34,
    dadosSensiveisProtegidos: 59,
    modulosAtribuidos: [
      'Ecossistemas Brasileiros (Laboratório)',
      'Protegendo Minha Rotina e Endereço',
    ],
    moduloMaisDificil: 'Diferenciar Opinião de Fato Verificável',
    evolucaoSemanal: [
      { semana: 'Sem 1', placar: 48 },
      { semana: 'Sem 2', placar: 59 },
      { semana: 'Sem 3', placar: 68 },
      { semana: 'Sem 4', placar: 76 },
      { semana: 'Sem 5', placar: 82 },
    ],
  },
];

const DEFAULT_STATE: AppState = {
  perfil: 'visitante',
  faixaEtaria: 'fundamental',
  tema: 'dark',
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
      // Caso o localStorage esteja indisponível, usa estado padrão em memória
    }
    return DEFAULT_STATE;
  });

  const [ultimoEventoXP, setUltimoEventoXP] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignora erro de cota em ambientes restritos
    }
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    if (state.tema === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
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
      tema: prev.tema === 'dark' ? 'light' : 'dark',
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
      }, 4000);
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
    setUltimoEventoXP(`+${xpGanho} XP • Fase concluída com sucesso!`);
    setTimeout(() => setUltimoEventoXP(null), 4000);
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
      totalAlunosAnonimos: 30,
      adesaoPercentual: 90,
      placarSegurancaMedio: 84,
      taxaProtecaoGeolocalizacao: 80,
      plagiosEvitados: 19,
      dadosSensiveisProtegidos: 27,
      modulosAtribuidos:
        novaTurma.modulosAtribuidos.length > 0
          ? novaTurma.modulosAtribuidos
          : ['Ciclo da Água (Laboratório de Prompts)', 'Vazamento de Dados'],
      moduloMaisDificil: 'Identificação de Deepfakes',
      evolucaoSemanal: [
        { semana: 'Sem 1', placar: 54 },
        { semana: 'Sem 2', placar: 66 },
        { semana: 'Sem 3', placar: 75 },
        { semana: 'Sem 4', placar: 84 },
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

  const nivelCalculado = Math.floor(state.xp / 100) + 1;

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
