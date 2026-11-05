import {
  REGRAS_DADOS_SENSIVEIS,
  PADROES_PLAGIO,
  PADROES_EMOCIONAIS,
  ATIVIDADES_LABORATORIO,
} from './auditorRules';

export type NivelEnsinoAuditor = 'fundamental' | 'medio';

export interface DescontoSeguranca {
  id: string;
  motivo: string;
  pontos: number;
}

export interface ItemAlertaAuditoria {
  tipo: 'dados' | 'plagio' | 'emocional' | 'sucesso';
  titulo: string;
  mensagem: string;
  trechosDestacados: string[];
  sugestaoReformulacao?: string;
  descontoPontos?: number;
}

export interface ResultadoAuditoriaPrompt {
  textoOriginal: string;
  nivel: NivelEnsinoAuditor;
  aprovado: boolean;
  placarSeguranca: number;
  descontos: DescontoSeguranca[];
  alertas: ItemAlertaAuditoria[];
  sugestaoGlobalSegura: string;
  teveDadosSensiveis: boolean;
  tevePlagio: boolean;
  teveEmocional: boolean;
  xpRecompensa: number;
}

/**
 * Gera uma versão segura e formativa do prompt do estudante,
 * substituindo dados pessoais por termos genéricos e transformando
 * pedidos de trabalho completo em roteiros de pesquisa.
 */
function construirReformulacaoSegura(
  textoOriginal: string,
  nivel: NivelEnsinoAuditor,
  atividadeId?: string
): string {
  const atividade = ATIVIDADES_LABORATORIO.find((a) => a.id === atividadeId);

  let textoLimpo = textoOriginal;

  // Remove cumprimentos com nome completo, escola e bairro
  textoLimpo = textoLimpo.replace(
    /\b(?:oi|ol[aá])?,?\s*(?:me\s+chamo|meu\s+nome\s+[eé]|eu\s+sou\s+[oa]?)\s+[A-ZÀ-Ÿa-zà-ÿ]{2,}\s+[A-ZÀ-Ÿa-zà-ÿ]{2,}(?:\s+[A-ZÀ-Ÿa-zà-ÿ]{2,})?\s*(?:e\s+)?/gi,
    'Olá! Sou estudante e '
  );

  textoLimpo = textoLimpo.replace(
    /\b(?:estudo\s+n[ao]|minha\s+escola\s+[eé]\s*[aAoO]?|sou\s+d[ao])\s*(?:Escola|Col[eé]gio|EMEF|EMEI|Instituto|EE|CIEP)\s+[A-ZÀ-Ÿa-zà-ÿ0-9]+(?:\s+[A-ZÀ-Ÿa-zà-ÿ0-9]+){0,3}?\s*(?:no\s+bairro\s+[A-ZÀ-Ÿa-zà-ÿ0-9]+(?:\s+[A-ZÀ-Ÿa-zà-ÿ0-9]+){0,2}?)?,?\s*/gi,
    'estou fazendo uma atividade escolar. '
  );

  textoLimpo = textoLimpo.replace(
    /\bno\s+bairro\s+[A-ZÀ-Ÿa-zà-ÿ0-9]+(?:\s+[A-ZÀ-Ÿa-zà-ÿ0-9]+){0,2}?,?\s*/gi,
    'na minha região, '
  );

  // Substitui e-mails, telefones e CPFs por marcadores genéricos
  textoLimpo = textoLimpo.replace(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
    '[contato protegido]'
  );
  textoLimpo = textoLimpo.replace(
    /\b(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\d{4}|\d{4})[-.\s]?\d{4}\b/g,
    '[telefone protegido]'
  );
  textoLimpo = textoLimpo.replace(
    /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g,
    '[documento protegido]'
  );

  // Substitui pedidos de plágio por pedidos de roteiro formativo
  const pediuCiencias = /trabalho\s+de\s+ci[eê]ncias/i.test(textoOriginal);
  if (pediuCiencias) {
    return nivel === 'fundamental'
      ? 'Olá! Sou estudante do Ensino Fundamental e estou fazendo meu trabalho de ciências sobre o Ciclo da Água. Você pode me sugerir um roteiro de tópicos para eu mesmo pesquisar e escrever com minhas palavras?'
      : 'Olá! Estou no Ensino Médio elaborando uma pesquisa de ciências. Você pode estruturar um roteiro de tópicos principais e perguntas norteadoras para eu aprofundar minha investigação autoral?';
  }

  if (atividade) {
    return atividade.promptSeguroSugerido;
  }

  // Caso genérico
  return nivel === 'fundamental'
    ? 'Olá! Sou estudante e preciso de ajuda para organizar minhas ideias. Você pode montar um roteiro de tópicos e dicas de pesquisa para eu mesmo fazer minha atividade escolar?'
    : 'Olá! Estou realizando uma pesquisa escolar e gostaria de um roteiro estruturado de tópicos e perguntas norteadoras para desenvolver minha própria argumentação crítica.';
}

/**
 * Função principal isolada e testável: auditPrompt(text, nivel, atividadeId)
 * Analisa localmente qualquer prompt digitado pelo aluno sem chamar APIs externas.
 */
export function auditPrompt(
  text: string,
  nivel: NivelEnsinoAuditor = 'fundamental',
  atividadeId?: string
): ResultadoAuditoriaPrompt {
  const textoNormalizado = text.trim();
  const descontos: DescontoSeguranca[] = [];
  const alertas: ItemAlertaAuditoria[] = [];
  const trechosDadosSensiveis: string[] = [];
  const categoriasDetectadas = new Set<string>();

  // 1. Verificação de Dados Sensíveis (Nome, Escola, Bairro/Endereço, Contato, CPF, Rotina)
  for (const regra of REGRAS_DADOS_SENSIVEIS) {
    for (const padrao of regra.padroes) {
      const regex = new RegExp(padrao.source, padrao.flags);
      let match: RegExpExecArray | null;
      while ((match = regex.exec(textoNormalizado)) !== null) {
        const trechoCapturado = (match[1] || match[0]).trim();
        if (trechoCapturado && !trechosDadosSensiveis.includes(trechoCapturado)) {
          trechosDadosSensiveis.push(trechoCapturado);
        }
        if (!categoriasDetectadas.has(regra.id)) {
          categoriasDetectadas.add(regra.id);
          descontos.push({
            id: regra.id,
            motivo: `Exposição de ${regra.rotulo.toLowerCase()}`,
            pontos: regra.desconto,
          });
        }
      }
    }
  }

  // 2. Verificação de Plágio / Terceirização do Pensamento
  const trechosPlagio: string[] = [];
  for (const padrao of PADROES_PLAGIO) {
    const regex = new RegExp(padrao.source, padrao.flags);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(textoNormalizado)) !== null) {
      const trecho = (match[1] || match[0]).trim();
      if (trecho && !trechosPlagio.includes(trecho)) {
        trechosPlagio.push(trecho);
      }
    }
  }

  if (trechosPlagio.length > 0) {
    descontos.push({
      id: 'plagio_terceirizacao',
      motivo: 'Pedido de trabalho pronto (terceirização do pensamento)',
      pontos: 30,
    });
  }

  // 3. Verificação de Desabafo Íntimo / Emocional
  const trechosEmocionais: string[] = [];
  for (const padrao of PADROES_EMOCIONAIS) {
    const regex = new RegExp(padrao.source, padrao.flags);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(textoNormalizado)) !== null) {
      const trecho = (match[1] || match[0]).trim();
      if (trecho && !trechosEmocionais.includes(trecho)) {
        trechosEmocionais.push(trecho);
      }
    }
  }

  if (trechosEmocionais.length > 0) {
    descontos.push({
      id: 'desabafo_intimo',
      motivo: 'Compartilhamento de desabafo íntimo/emocional com IA',
      pontos: 20,
    });
  }

  const totalDescontos = descontos.reduce((acc, item) => acc + item.pontos, 0);
  const placarSeguranca = Math.max(0, 100 - totalDescontos);
  const sugestaoGlobalSegura = construirReformulacaoSegura(
    textoNormalizado,
    nivel,
    atividadeId
  );

  const teveDadosSensiveis = trechosDadosSensiveis.length > 0;
  const tevePlagio = trechosPlagio.length > 0;
  const teveEmocional = trechosEmocionais.length > 0;

  // Construção dos cards de alerta educativos (nunca punitivos)
  if (teveDadosSensiveis) {
    const descontoDados = descontos
      .filter((d) => d.id !== 'plagio_terceirizacao' && d.id !== 'desabafo_intimo')
      .reduce((acc, d) => acc + d.pontos, 0);

    alertas.push({
      tipo: 'dados',
      titulo:
        nivel === 'fundamental'
          ? 'Opa! Vamos proteger seus dados pessoais antes de enviar?'
          : 'Alerta de Privacidade (LGPD): Dados pessoais identificados no prompt',
      mensagem:
        'Você mencionou seu nome completo e o bairro da sua escola. Veja como reformular sem se expor.',
      trechosDestacados: trechosDadosSensiveis,
      sugestaoReformulacao: sugestaoGlobalSegura,
      descontoPontos: descontoDados,
    });
  }

  if (tevePlagio) {
    alertas.push({
      tipo: 'plagio',
      titulo:
        nivel === 'fundamental'
          ? 'Sua mente é muito mais criativa do que copiar tudo pronto!'
          : 'Autonomia Intelectual: Use a IA como parceira de pesquisa, não como atalho',
      mensagem:
        'Você pediu para a IA redigir o trabalho completo. Que tal pedir um roteiro de tópicos para você mesmo pesquisar?',
      trechosDestacados: trechosPlagio,
      sugestaoReformulacao: sugestaoGlobalSegura,
      descontoPontos: 30,
    });
  }

  if (teveEmocional) {
    alertas.push({
      tipo: 'emocional',
      titulo: 'Acolhimento: Seus sentimentos merecem escuta humana real',
      mensagem:
        nivel === 'fundamental'
          ? 'Percebemos que você está passando por um momento delicado. Uma inteligência artificial é apenas um programa de computador e não substitui o carinho e o apoio de quem cuida de você. Que tal conversar com sua família, um professor ou a orientação da escola?'
          : 'Notamos um desabafo pessoal importante no seu texto. Modelos de IA não possuem empatia humana nem sigilo clínico. Recomendamos conversar com um adulto de confiança, familiar, professor ou psicólogo escolar.',
      trechosDestacados: trechosEmocionais,
      descontoPontos: 20,
    });
  }

  const aprovado = !teveDadosSensiveis && !tevePlagio && !teveEmocional && textoNormalizado.length >= 8;

  if (aprovado) {
    alertas.push({
      tipo: 'sucesso',
      titulo:
        nivel === 'fundamental'
          ? 'Mandou super bem! Seu prompt está 100% seguro e inteligente!'
          : 'Excelente! Prompt seguro, ético e orientado à investigação autoral.',
      mensagem:
        'Você não expôs nenhuma informação pessoal (LGPD) e utilizou a IA para apoiar seu próprio raciocínio crítico. Você ganhou +50 XP e liberou a resposta do assistente!',
      trechosDestacados: [],
    });
  }

  return {
    textoOriginal: textoNormalizado,
    nivel,
    aprovado,
    placarSeguranca,
    descontos,
    alertas,
    sugestaoGlobalSegura,
    teveDadosSensiveis,
    tevePlagio,
    teveEmocional,
    xpRecompensa: aprovado ? 50 : 0,
  };
}
