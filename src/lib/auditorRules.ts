/**
 * Configuração centralizada de regras do Auditor de Prompts do Guardian Prompt.
 * Totalmente local e algorítmico (Zero chamadas de API externa - Conformidade LGPD).
 */

export interface RegraSensivelConfig {
  id: string;
  categoria: 'nome' | 'escola' | 'localizacao' | 'contato' | 'documento' | 'rotina';
  rotulo: string;
  desconto: number;
  padroes: RegExp[];
  substitutoGenerico: string;
}

export const REGRAS_DADOS_SENSIVEIS: RegraSensivelConfig[] = [
  {
    id: 'nome_completo',
    categoria: 'nome',
    rotulo: 'Nome e sobrenome pessoal',
    desconto: 20,
    padroes: [
      /\b(?:me\s+chamo|meu\s+nome\s+[eé]|eu\s+sou\s+[oa]?)\s+([A-ZÀ-Ÿa-zà-ÿ]{2,}\s+[A-ZÀ-Ÿa-zà-ÿ]{2,}(?:\s+[A-ZÀ-Ÿa-zà-ÿ]{2,})?)/gi,
    ],
    substitutoGenerico: 'um(a) estudante',
  },
  {
    id: 'escola_identificada',
    categoria: 'escola',
    rotulo: 'Nome da escola ou colégio',
    desconto: 15,
    padroes: [
      /\b(?:estudo\s+n[ao]|minha\s+escola\s+[eé]\s*[aAoO]?|sou\s+d[ao])\s*((?:Escola|Col[eé]gio|EMEF|EMEI|Instituto|EE|CIEP)\s+[A-ZÀ-Ÿa-zà-ÿ0-9]+(?:\s+[A-ZÀ-Ÿa-zà-ÿ0-9]+){0,3}?)(?=\s+no\s+bairro|\s+na\s+rua|,|\.|;|$)/gi,
      /\b((?:Escola|Col[eé]gio|EMEF)\s+(?:Estadual|Municipal|Particular)?\s*[A-ZÀ-Ÿa-zà-ÿ0-9]{1,20})/gi,
    ],
    substitutoGenerico: 'minha escola',
  },
  {
    id: 'bairro_endereco_geo',
    categoria: 'localizacao',
    rotulo: 'Bairro, endereço ou geolocalização',
    desconto: 15,
    padroes: [
      /\bno\s+(bairro\s+[A-ZÀ-Ÿa-zà-ÿ0-9]+(?:\s+[A-ZÀ-Ÿa-zà-ÿ0-9]+){0,2}?)(?=,|\.|;|\s+faz|\s+fa[cç]a|\s+escrev|\s+e\s+|$)/gi,
      /\b((?:rua|avenida|av\.|travessa|alameda)\s+[A-ZÀ-Ÿa-zà-ÿ0-9\s]{2,25}(?:,\s*\d{1,5})?)/gi,
      /\b(CEP\s*:?\s*\d{5}-?\d{3}|\b\d{5}-\d{3}\b)/gi,
      /\b(?:moro\s+em|moro\s+n[oa]|meu\s+endere[cç]o\s+[eé])\s+([A-ZÀ-Ÿa-zà-ÿ0-9\s]{3,25})/gi,
    ],
    substitutoGenerico: 'minha região',
  },
  {
    id: 'email_pessoal',
    categoria: 'contato',
    rotulo: 'Endereço de e-mail',
    desconto: 20,
    padroes: [/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g],
    substitutoGenerico: '[meu e-mail protegido]',
  },
  {
    id: 'telefone_celular',
    categoria: 'contato',
    rotulo: 'Telefone ou WhatsApp',
    desconto: 20,
    padroes: [
      /\b(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\d{4}|\d{4})[-.\s]?\d{4}\b/g,
    ],
    substitutoGenerico: '[meu telefone protegido]',
  },
  {
    id: 'cpf_documento',
    categoria: 'documento',
    rotulo: 'Número de CPF ou documento',
    desconto: 30,
    padroes: [/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g],
    substitutoGenerico: '[documento protegido]',
  },
  {
    id: 'rotina_horarios',
    categoria: 'rotina',
    rotulo: 'Rotina pessoal e horários vulneráveis',
    desconto: 15,
    padroes: [
      /\b((?:saio\s+da\s+escola|chego\s+em\s+casa|fico\s+sozinho[a]?|vou\s+sozinho[a]?)\s+(?:todo\s+dia\s+)?(?:[aà]s\s+\d{1,2}\s*h(?:\d{2})?|\d{1,2}:\d{2}))/gi,
      /\b(fico\s+sozinho[a]?\s+em\s+casa)/gi,
    ],
    substitutoGenerico: 'no meu horário de estudo',
  },
];

export const PADROES_PLAGIO: RegExp[] = [
  /\b(faz\s+meu\s+trabalho(?:\s+de\s+[a-zà-ÿ]+)?\s+completo)/gi,
  /\b(fa[cç]a\s+(?:o\s+)?meu\s+trabalho(?:\s+de\s+[a-zà-ÿ]+)?\s+(?:completo|inteiro|todo|pronto))/gi,
  /\b(escreva?\s+tudo\s+pr[ao]\s+mim)/gi,
  /\b(escreva?\s+(?:a\s+reda[cç][aã]o|o\s+trabalho|o\s+resumo)\s+(?:inteir[oa]|complet[oa]|pront[oa])\s+pr[ao]\s+mim)/gi,
  /\b(faz\s+tudo\s+pronto\s+sem\s+eu\s+precisar\s+ler)/gi,
  /\b(responda?\s+todas?\s+as\s+quest[oõ]es\s+prontas?\s+para\s+eu\s+copiar)/gi,
  /\b(faz\s+(?:a\s+)?minha\s+li[cç][aã]o\s+toda)/gi,
  /\b(redija\s+meu\s+trabalho\s+completo)/gi,
];

export const PADROES_EMOCIONAIS: RegExp[] = [
  /\b(estou\s+muito\s+triste\s+e\s+sozinho[a]?)/gi,
  /\b(ningu[eé]m\s+gosta\s+de\s+mim)/gi,
  /\b(estou\s+sofrendo\s+bullying)/gi,
  /\b(sofro\s+bullying\s+na\s+escola)/gi,
  /\b(n[aã]o\s+aguento\s+mais\s+tanta\s+ansiedade)/gi,
  /\b(quero\s+contar\s+um\s+segredo\s+[ií]ntimo)/gi,
  /\b(estou\s+com\s+medo\s+e\s+sem\s+amigos)/gi,
  /\b(me\s+sinto\s+muito\s+mal\s+comigo\s+mesmo[a]?)/gi,
];

export interface AtividadeEscolarPreset {
  id: string;
  titulo: string;
  disciplina: string;
  faixaRecomendada: 'fundamental' | 'medio';
  enunciado: string;
  dicaPedagogica: string;
  promptRiscoDemo: string;
  promptSeguroSugerido: string;
  respostaSimuladaFundamental: string;
  respostaSimuladaMedio: string;
}

export const ATIVIDADES_LABORATORIO: AtividadeEscolarPreset[] = [
  {
    id: 'ciclo-da-agua',
    titulo: 'Escreva um trabalho sobre o Ciclo da Água',
    disciplina: 'Ciências da Natureza',
    faixaRecomendada: 'fundamental',
    enunciado:
      'Sua missão é estruturar uma pesquisa escolar explicando as etapas do Ciclo da Água (evaporação, condensação, precipitação e transpiração) e sua importância ambiental.',
    dicaPedagogica:
      'Lembre-se: nunca informe seu nome, escola ou bairro, e peça um roteiro de tópicos em vez do trabalho pronto!',
    promptRiscoDemo:
      'Oi, me chamo Maria Souza e estudo na Escola X no bairro Y, faz meu trabalho de ciências completo',
    promptSeguroSugerido:
      'Olá! Estou fazendo uma pesquisa escolar de ciências sobre o Ciclo da Água. Você pode me sugerir um roteiro de tópicos e perguntas-guia para eu mesmo pesquisar e escrever com minhas palavras?',
    respostaSimuladaFundamental: `Excelente pergunta! Como você protegeu seus dados pessoais e pediu um roteiro formativo, preparei um guia de investigação para você construir seu trabalho com autoria própria:

1. **Ponto de Partida (O que observar em casa):**
   - Como a água que está em uma poça no quintal desaparece depois de um dia de sol? (Explique com suas palavras o que é *Evaporação* e *Transpiração* das plantas).

2. **Lá no Alto (A formação das nuvens):**
   - Por que o vapor de água vira gotinhas quando sobe para camadas mais frias do céu? (Pesquise o conceito de *Condensação*).

3. **De volta para a Terra:**
   - Como acontece a *Precipitação* (chuva) e para onde a água vai quando chega ao solo (*Infiltração* nos lençóis freáticos e *Escoamento* para os rios)?

4. **Desafio de Pensamento Crítico para sua Conclusão:**
   - Escreva um parágrafo seu respondendo: *Como o desmatamento e o desperdício afetam o equilíbrio do ciclo da água na sua região?*`,
    respostaSimuladaMedio: `Ótimo comando de pesquisa! Aqui está uma estrutura analítica para orientar seu trabalho sobre o Ciclo Hidrológico sem substituir sua redação autoral:

1. **Eixo Termodinâmico e Físico-Químico:**
   - Analise as trocas de calor latente nos processos de *evaporação*, *evapotranspiração* vegetal (papel da Amazônia e dos "rios voadores") e *condensação*.

2. **Dinâmica de Bacias Hidrográficas e Infiltração:**
   - Compare o escoamento superficial em áreas urbanizadas impermeabilizadas versus a recarga de aquíferos em solos preservados.

3. **Pergunta Norteadora para sua Argumentação:**
   - Como as mudanças climáticas globais intensificam eventos extremos (secas prolongadas e chuvas torrenciais) no território brasileiro? Redija sua síntese citando dados do ANA ou INPE.`,
  },
  {
    id: 'ecossistemas-brasileiros',
    titulo: 'Pesquisa sobre Biomas e Ecossistemas Brasileiros',
    disciplina: 'Geografia & Biologia',
    faixaRecomendada: 'fundamental',
    enunciado:
      'Escolha um bioma brasileiro (Cerrado, Caatinga, Amazônia, Mata Atlântica, Pantanal ou Pampa) e investigue sua biodiversidade e desafios de conservação.',
    dicaPedagogica:
      'Peça ideias de comparação entre biomas ou dicas de fontes confiáveis (como IBGE e ICMBio).',
    promptRiscoDemo:
      'Me chamo Lucas Ferreira da Escola Estadual Central no bairro Jardins, escreva tudo pra mim sobre o Cerrado sem eu precisar ler',
    promptSeguroSugerido:
      'Estou estudando os Biomas Brasileiros com foco no Cerrado. Quais são os 4 principais tópicos que devo investigar sobre sua vegetação, importância para as águas e conservação?',
    respostaSimuladaFundamental: `Parabéns pelo prompt seguro e investigativo! Aqui está seu mapa de pesquisa sobre o **Cerrado**:

1. **A "Caixa d'Água do Brasil":**
   - Pesquise por que as raízes profundas das árvores do Cerrado são tão importantes para abastecer as nascentes de grandes rios brasileiros.

2. **Adaptações Curiosas das Plantas:**
   - Descubra por que muitas árvores do Cerrado têm troncos retorcidos e cascas grossas.

3. **Animais Ameaçados:**
   - Escolha 2 espécies (como o Lobo-guará ou o Tamanduá-bandeira) e anote com suas palavras como proteger o habitat delas.`,
    respostaSimuladaMedio: `Excelente formulação! Para estruturar seu estudo sobre o **Cerrado** como hotspot de biodiversidade:

1. **Morfofisiologia Vegetal e Pedologia:**
   - Investigue o escleromorfismo oligotrófico (adaptação a solos ácidos e ricos em alumínio) e a importância do sistema radicular profundo na recarga dos aquíferos Guarani, Bambuí e Urucuia.

2. **Fronteira Agrícola e Sustentabilidade:**
   - Analise dados do MapBiomas sobre o desmatamento no MATOPIBA e proponha alternativas de manejo sustentável no seu texto final.`,
  },
  {
    id: 'etica-ia-redacao',
    titulo: 'Ensaio Argumentativo: Desafios da IA e Privacidade Digital',
    disciplina: 'Redação & Sociologia',
    faixaRecomendada: 'medio',
    enunciado:
      'Construa um texto dissertativo-argumentativo debatendo os impactos das inteligências artificiais na privacidade de jovens e na formação do pensamento crítico.',
    dicaPedagogica:
      'No Ensino Médio, use a IA como debatedora socrática: peça contra-argumentos e repertórios socioculturais legítimos para você mesmo redigir.',
    promptRiscoDemo:
      'Oi, meu nome é Gabriel Santos do Colégio Alfa no bairro Centro, escreva a redação inteira pronta pra mim sobre IA e privacidade',
    promptSeguroSugerido:
      'Estou planejando uma redação dissertativo-argumentativa sobre IA e privacidade de jovens no Brasil. Pode me sugerir dois eixos de argumentação e quais artigos da LGPD ou do Marco Civil da Internet posso estudar como repertório?',
    respostaSimuladaFundamental: `Muito bem! Para planejar sua redação com suas próprias ideias, siga estes passos:

1. **Introdução:** Apresente como a IA faz parte do dia a dia dos jovens e por que cuidar dos dados pessoais é importante.
2. **Desenvolvimento 1:** Explique os riscos de compartilhar informações pessoais (nome, escola, rotina) na internet.
3. **Desenvolvimento 2:** Citemos a **LGPD** e o papel da escola em ensinar tecnologia com consciência.
4. **Conclusão:** Proponha uma ação educativa para estudantes e famílias.`,
    respostaSimuladaMedio: `Excelente abordagem dialógica! Aqui está um repertório estruturado para fundamentar sua autoria na dissertação:

1. **Eixo Argumentativo 1 — Vulnerabilidade Informacional e Capitalismo de Vigilância:**
   - Discuta como a coleta irrestrita de dados de menores em plataformas digitais fere a autodeterminação informativa.

2. **Eixo Argumentativo 2 — Atrofia Cognitiva vs. Letramento Crítico:**
   - Relacione o conceito de "terceirização cognitiva" aos alertas da UNESCO/UNICEF sobre o uso passivo de modelos generativos na educação básica.

3. **Repertório Legal Verificável (Legislação Brasileira):**
   - **LGPD (Lei nº 13.709/2018, Art. 14):** Determina que o tratamento de dados pessoais de crianças e adolescentes deve ser realizado em seu melhor interesse.
   - **Marco Civil da Internet (Lei nº 12.965/2014, Art. 26):** Estabelece o dever constitucional de educação para o uso seguro, consciente e responsável da internet.`,
  },
];
