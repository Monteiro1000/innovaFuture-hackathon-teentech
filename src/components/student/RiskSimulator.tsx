import React, { useState } from 'react';
import {
  ShieldAlert,
  Eye,
  SearchCheck,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Card, Badge, Botao } from '@/components/brand';
import { useApp } from '@/context/AppContext';

export interface QuestaoSimulador {
  id: string;
  categoria: 'vazamento' | 'deepfake' | 'fontes' | 'cidadania';
  tituloCategoria: string;
  badgeAssociadaId: string;
  nomeBadge: string;
  xpRecompensa: number;
  cenarioFundamental: string;
  cenarioMedio: string;
  ilustracaoTipo: 'vazamento' | 'deepfake' | 'fontes' | 'cidadania';
  opcoes: {
    id: string;
    texto: string;
    correta: boolean;
    explicacao: string;
  }[];
}

const CENARIOS_SIMULADOR: QuestaoSimulador[] = [
  {
    id: 'sim-deepfake-1',
    categoria: 'deepfake',
    tituloCategoria: 'Missão 1 • Detetive de Deepfake',
    badgeAssociadaId: 'detetive-deepfake',
    nomeBadge: 'Caçador de Deepfakes',
    xpRecompensa: 60,
    ilustracaoTipo: 'deepfake',
    cenarioFundamental:
      'Você recebeu no grupo da turma um vídeo e um áudio em que o diretor fictício da escola anuncia "férias surpresa amanhã e pede que os alunos preencham uma ficha com telefone dos pais". Na ilustração do vídeo, a mão do personagem tem 6 dedos borrados, os lábios não acompanham o som e a voz parece robótica e sem pausas de respiração.',
    cenarioMedio:
      'Circula nas redes um vídeo curto (descrito em ilustração sintética) atribuído à coordenação da escola solicitando cadastro urgente em um link externo. Na análise quadro a quadro, observam-se artefatos de compressão ao redor da boca, ausência de piscadas naturais, iluminação incoerente no pescoço e timbre vocal metálico sem variação prosódica.',
    opcoes: [
      {
        id: 'df-a',
        texto:
          'Compartilhar imediatamente com todos os colegas e preencher o formulário antes que acabe o prazo.',
        correta: false,
        explicacao:
          'Atenção! Compartilhar sem checar espalha desinformação e preencher formulários suspeitos expõe os dados da sua família a golpes de engenharia social.',
      },
      {
        id: 'df-b',
        texto:
          'Identificar os sinais clássicos de Deepfake (mãos distorcidas, falha de sincronia labial, voz robótica e pedido incomum de dados) e confirmar nos canais oficiais da escola.',
        correta: true,
        explicacao:
          'Perfeito! Mídias geradas por IA frequentemente apresentam falhas anatômicas (dedos extras, bordas borradas), dessincronia labial e urgência artificial. Checar na fonte oficial é a regra de ouro!',
      },
      {
        id: 'df-c',
        texto:
          'Confiar no vídeo porque a cor do uniforme parece igual à da escola.',
        correta: false,
        explicacao:
          'Cuidado! Ferramentas generativas copiam cores e logotipos facilmente. É preciso observar detalhes de movimento, áudio e sempre verificar a origem oficial.',
      },
    ],
  },
  {
    id: 'sim-fontes-1',
    categoria: 'fontes',
    tituloCategoria: 'Missão 2 • Verificação de Fontes',
    badgeAssociadaId: 'checador-fontes',
    nomeBadge: 'Detetive de Fontes',
    xpRecompensa: 60,
    ilustracaoTipo: 'fontes',
    cenarioFundamental:
      'Para seu trabalho de Ciências, um colega encontrou uma postagem anônima sem data dizendo: "URGENTE! Cientistas descobrem que beber água com gás faz as plantas crescerem 10 vezes mais rápido em 1 hora!". Nenhum livro, universidade ou instituto de pesquisa confirma isso.',
    cenarioMedio:
      'Durante uma pesquisa escolar, uma IA generativa cita um suposto "Relatório Ambiental de 2029 do Instituto Global X" com estatísticas impressionantes, mas sem link, sem DOI e com uma data futura impossível (alucinação de IA). Como você deve proceder?',
    opcoes: [
      {
        id: 'ft-a',
        texto:
          'Incluir a informação no trabalho escolar mesmo assim, pois textos gerados por IA ou virais parecem bem escritos.',
        correta: false,
        explicacao:
          'Cuidado com as "alucinações de IA" e notícias falsas! Modelos de linguagem podem inventar datas, autores e relatórios que nunca existiram.',
      },
      {
        id: 'ft-b',
        texto:
          'Aplicar o protocolo de checagem: verificar autoria, data de publicação, presença de fontes primárias (universidades, IBGE, artigos reais) e descartar dados não verificáveis.',
        correta: true,
        explicacao:
          'Excelente! Verificar autor, data, intenção e cruzar com pelo menos duas fontes confiáveis protege seu trabalho contra desinformação e alucinações algorítmicas.',
      },
      {
        id: 'ft-c',
        texto:
          'Apenas mudar algumas palavras da notícia falsa para o professor não perceber.',
        correta: false,
        explicacao:
          'Reescrever uma informação falsa continua espalhando um erro científico. O pensamento crítico exige checar a veracidade na origem!',
      },
    ],
  },
  {
    id: 'sim-vazamento-1',
    categoria: 'vazamento',
    tituloCategoria: 'Missão 3 • Prevenção a Vazamento de Dados',
    badgeAssociadaId: 'guardiao-dados',
    nomeBadge: 'Guardião dos Dados',
    xpRecompensa: 50,
    ilustracaoTipo: 'vazamento',
    cenarioFundamental:
      'Você quer pedir ajuda a uma IA para montar um cronograma de estudos da semana. Qual das opções abaixo protege sua segurança e sua privacidade?',
    cenarioMedio:
      'Ao utilizar um assistente de IA para organizar sua rotina de preparação para provas e ENEM, qual formulação respeita a autodeterminação informativa (LGPD) e evita exposição de vulnerabilidades físicas?',
    opcoes: [
      {
        id: 'vz-a',
        texto:
          '"Sou o Pedro Lima, estudo no Colégio Sol na Rua das Flores 120, fico sozinho em casa das 13h às 18h. Monte minha agenda."',
        correta: false,
        explicacao:
          'Alto risco! Esse comando entrega nome completo, endereço exato e o horário em que um menor de idade fica desacompanhado em casa.',
      },
      {
        id: 'vz-b',
        texto:
          '"Sou estudante do Ensino Básico e tenho 3 horas livres à tarde para estudar Matemática, História e Ciências. Sugira uma tabela equilibrada com pausas de descanso."',
        correta: true,
        explicacao:
          'Nota 10! Você forneceu apenas o contexto pedagógico necessário (matérias e tempo disponível), sem revelar identidade, endereço nem rotina familiar!',
      },
      {
        id: 'vz-c',
        texto:
          '"Meu CPF é 123.456.789-00 e meu WhatsApp é (11) 99876-5432, me mande um plano de estudos."',
        correta: false,
        explicacao:
          'Nunca informe documentos (CPF, RG) ou telefone pessoal em prompts de IA!',
      },
    ],
  },
  {
    id: 'sim-cidadania-1',
    categoria: 'cidadania',
    tituloCategoria: 'Missão 4 • Cidadania Digital (LGPD, ECA e Marco Civil)',
    badgeAssociadaId: 'cidadao-digital',
    nomeBadge: 'Defensor LGPD & ECA',
    xpRecompensa: 70,
    ilustracaoTipo: 'cidadania',
    cenarioFundamental:
      'Um colega criou uma montagem engraçada usando o rosto de outro estudante sem permissão e quer espalhar na internet. O que dizem as leis brasileiras (ECA, LGPD e Marco Civil da Internet)?',
    cenarioMedio:
      'Em um debate sobre direitos digitais na escola, surge a dúvida: a internet é uma "terra sem lei" ou a imagem, a honra e os dados pessoais de crianças e adolescentes são protegidos pela legislação brasileira?',
    opcoes: [
      {
        id: 'cd-a',
        texto:
          'O ECA (Estatuto da Criança e do Adolescente), a LGPD (Art. 14) e o Marco Civil da Internet protegem a imagem, a dignidade e os dados pessoais, proibindo cyberbullying e exposição não autorizada.',
        correta: true,
        explicacao:
          'Exatamente! A cidadania digital combina direitos e deveres: o ECA protege a dignidade de crianças e adolescentes, a LGPD protege seus dados pessoais e o Marco Civil promove o uso ético e seguro da rede.',
      },
      {
        id: 'cd-b',
        texto:
          'Se foi feito por Inteligência Artificial ou for só "brincadeira", não existe nenhuma regra ou responsabilidade.',
        correta: false,
        explicacao:
          'Incorreto! Usar IA para constranger, expor ou manipular a imagem de colegas viola o ECA, a LGPD e as normas de convivência escolar.',
      },
      {
        id: 'cd-c',
        texto:
          'Apenas adultos têm direitos de privacidade na internet; estudantes não estão incluídos na LGPD.',
        correta: false,
        explicacao:
          'Pelo contrário! O Artigo 14 da LGPD dedica proteção especial e prioritária aos dados pessoais de crianças e adolescentes.',
      },
    ],
  },
];

export const RiskSimulator: React.FC = () => {
  const { faixaEtaria, concluirFase, fasesConcluidas } = useApp();
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [opcaoEscolhidaId, setOpcaoEscolhidaId] = useState<string | null>(null);

  const questaoAtual = CENARIOS_SIMULADOR[indiceAtual];
  const opcaoSelecionada = questaoAtual.opcoes.find(
    (o) => o.id === opcaoEscolhidaId
  );

  const selecionarResposta = (opcaoId: string) => {
    setOpcaoEscolhidaId(opcaoId);
    const opcao = questaoAtual.opcoes.find((o) => o.id === opcaoId);
    if (opcao?.correta) {
      concluirFase(
        questaoAtual.id,
        questaoAtual.xpRecompensa,
        questaoAtual.badgeAssociadaId
      );
    }
  };

  const renderIlustracaoSVG = (tipo: QuestaoSimulador['ilustracaoTipo']) => {
    if (tipo === 'deepfake') {
      return (
        <svg
          viewBox="0 0 280 130"
          className="w-full h-32 rounded-gp-md bg-gp-roxo-escuro border border-gp-lilas/30"
          role="img"
          aria-label="Ilustração vetorial abstrata de análise de vídeo sintético com ondas de áudio e malha geométrica"
        >
          <rect x="18" y="18" width="95" height="94" rx="12" fill="#9847EE" fillOpacity="0.2" stroke="#3CC7E8" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="65" cy="52" r="18" stroke="#3CC7E8" strokeWidth="3" fill="none" />
          <path d="M42 94 C42 78 88 78 88 94" stroke="#AF81E9" strokeWidth="3" fill="none" />
          {/* Ondas sonoras desalinhadas */}
          <line x1="135" y1="42" x2="255" y2="42" stroke="#FACC15" strokeWidth="3" strokeDasharray="8 6" />
          <line x1="135" y1="65" x2="235" y2="65" stroke="#3CC7E8" strokeWidth="3" />
          <line x1="135" y1="88" x2="250" y2="88" stroke="#9847EE" strokeWidth="3" />
          <text x="135" y="28" fill="#FACC15" fontSize="10" fontWeight="700">
            SINAL DE ALERTA: ÁUDIO E VÍDEO SINTÉTICOS
          </text>
        </svg>
      );
    }

    if (tipo === 'fontes') {
      return (
        <svg
          viewBox="0 0 280 130"
          className="w-full h-32 rounded-gp-md bg-gp-roxo-escuro border border-gp-lilas/30"
          role="img"
          aria-label="Ilustração de lupa verificando autor, data e referências de um documento"
        >
          <rect x="24" y="20" width="140" height="90" rx="8" fill="#D9CBE7" fillOpacity="0.12" stroke="#AF81E9" strokeWidth="2" />
          <line x1="40" y1="42" x2="120" y2="42" stroke="#3CC7E8" strokeWidth="4" />
          <line x1="40" y1="62" x2="145" y2="62" stroke="#D9CBE7" strokeWidth="3" />
          <line x1="40" y1="82" x2="105" y2="82" stroke="#FACC15" strokeWidth="3" />
          <circle cx="205" cy="60" r="26" stroke="#4ADE80" strokeWidth="4" fill="#3F2757" />
          <line x1="224" y1="79" x2="246" y2="101" stroke="#4ADE80" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    }

    return (
      <svg
        viewBox="0 0 280 130"
        className="w-full h-32 rounded-gp-md bg-gp-roxo-escuro border border-gp-lilas/30"
        role="img"
        aria-label="Ilustração de escudo protetor de dados e cidadania digital"
      >
        <path
          d="M140 18 L190 36 V68 C190 95 168 112 140 118 C112 112 90 95 90 68 V36 L140 18 Z"
          fill="#9847EE"
          fillOpacity="0.25"
          stroke="#3CC7E8"
          strokeWidth="3"
        />
        <path
          d="M126 66 L136 76 L156 54"
          stroke="#4ADE80"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Seletor das 4 Missões do Simulador */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CENARIOS_SIMULADOR.map((cen, idx) => {
          const concluida = fasesConcluidas.includes(cen.id);
          const ativa = idx === indiceAtual;
          const iconeMissao =
            cen.categoria === 'deepfake' ? (
              <Eye className="w-4 h-4" />
            ) : cen.categoria === 'fontes' ? (
              <SearchCheck className="w-4 h-4" />
            ) : cen.categoria === 'vazamento' ? (
              <ShieldAlert className="w-4 h-4" />
            ) : (
              <Scale className="w-4 h-4" />
            );

          return (
            <button
              key={cen.id}
              type="button"
              onClick={() => {
                setIndiceAtual(idx);
                setOpcaoEscolhidaId(null);
              }}
              className={`p-4 rounded-gp-md border text-left gp-transition flex flex-col justify-between gap-2 ${
                ativa
                  ? 'bg-gp-roxo text-gp-branco border-gp-ciano shadow-gp-roxo-glow'
                  : 'bg-gp-roxo-escuro/85 text-gp-lilas-claro border-gp-lilas/30 hover:border-gp-lilas'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-gp-ciano">
                  {iconeMissao}
                  <span>Fase 0{idx + 1}</span>
                </span>
                {concluida && (
                  <CheckCircle2 className="w-4 h-4 text-gp-sucesso shrink-0" />
                )}
              </div>
              <span className="text-sm font-bold text-gp-branco leading-snug">
                {cen.tituloCategoria.split('•')[1]?.trim() || cen.tituloCategoria}
              </span>
              <span className="text-[11px] text-gp-lilas-claro">
                +{cen.xpRecompensa} XP • Badge: {cen.nomeBadge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Card Principal do Desafio */}
      <Card variant="destaque" className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="ciano">{questaoAtual.tituloCategoria}</Badge>
            <Badge variant="roxo">
              Trilha: {faixaEtaria === 'fundamental' ? 'Ensino Fundamental' : 'Ensino Médio'}
            </Badge>
          </div>
          <span className="text-xs font-extrabold text-gp-sucesso flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>Recompensa: +{questaoAtual.xpRecompensa} XP + Badge &ldquo;{questaoAtual.nomeBadge}&rdquo;</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5">
            {renderIlustracaoSVG(questaoAtual.ilustracaoTipo)}
          </div>
          <div className="lg:col-span-7 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gp-ciano">
              Cenário Simulado (Sem imagens de pessoas reais):
            </span>
            <p className="text-base sm:text-lg font-semibold text-gp-branco leading-relaxed">
              {faixaEtaria === 'fundamental'
                ? questaoAtual.cenarioFundamental
                : questaoAtual.cenarioMedio}
            </p>
          </div>
        </div>

        {/* Alternativas */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-gp-lilas-claro block">
            Escolha a decisão mais segura e consciente:
          </span>

          {questaoAtual.opcoes.map((opcao, i) => {
            const selecionada = opcaoEscolhidaId === opcao.id;
            let estiloBotao =
              'bg-gp-roxo-escuro/90 border-gp-lilas/40 text-gp-branco hover:border-gp-ciano';

            if (selecionada) {
              estiloBotao = opcao.correta
                ? 'bg-gp-sucesso/20 border-gp-sucesso text-gp-branco'
                : 'bg-gp-atencao/20 border-gp-atencao text-gp-branco';
            }

            return (
              <button
                key={opcao.id}
                type="button"
                onClick={() => selecionarResposta(opcao.id)}
                className={`w-full p-4 rounded-gp-md border-2 text-left gp-transition flex items-start gap-3 ${estiloBotao}`}
              >
                <span className="w-7 h-7 rounded-gp-sm bg-gp-roxo/40 border border-gp-lilas/50 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm sm:text-base font-medium leading-relaxed">
                  {opcao.texto}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback Explicativo Imediato (Certo ou Errado) */}
        {opcaoSelecionada && (
          <div
            role="status"
            aria-live="polite"
            className={`p-5 rounded-gp-lg border-2 space-y-3 ${
              opcaoSelecionada.correta
                ? 'bg-gp-sucesso/15 border-gp-sucesso'
                : 'bg-gp-atencao/15 border-gp-atencao'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-extrabold text-base text-gp-branco">
                {opcaoSelecionada.correta ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-gp-sucesso shrink-0" />
                    <span>Resposta Certa! Você desbloqueou a Badge &ldquo;{questaoAtual.nomeBadge}&rdquo;!</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-6 h-6 text-gp-atencao shrink-0" />
                    <span>Quase lá! Veja por que essa opção traz riscos:</span>
                  </>
                )}
              </div>

              {opcaoSelecionada.correta && (
                <Badge variant="sucesso">+{questaoAtual.xpRecompensa} XP</Badge>
              )}
            </div>

            <p className="text-sm sm:text-base text-gp-lilas-claro leading-relaxed">
              {opcaoSelecionada.explicacao}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {opcaoSelecionada.correta ? (
                <Botao
                  type="button"
                  variant="secundario"
                  size="sm"
                  iconRight={<ArrowRight className="w-4 h-4" />}
                  onClick={() => {
                    setIndiceAtual((prev) => (prev + 1) % CENARIOS_SIMULADOR.length);
                    setOpcaoEscolhidaId(null);
                  }}
                >
                  Próxima Missão do Simulador
                </Botao>
              ) : (
                <Botao
                  type="button"
                  variant="fantasma"
                  size="sm"
                  iconLeft={<RotateCcw className="w-4 h-4" />}
                  onClick={() => setOpcaoEscolhidaId(null)}
                >
                  Tentar novamente
                </Botao>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RiskSimulator;
