import { describe, it, expect } from 'vitest';
import { auditPrompt } from '../promptAuditor';

describe('Auditor de Prompts Local (Guardian Prompt)', () => {
  it('deve detectar dados sensíveis E plágio no fluxo oficial de demonstração (Seção 8.2)', () => {
    const promptDemo =
      'Oi, me chamo Maria Souza e estudo na Escola X no bairro Y, faz meu trabalho de ciências completo';
    const resultado = auditPrompt(promptDemo, 'fundamental', 'ciclo-da-agua');

    expect(resultado.aprovado).toBe(false);
    expect(resultado.teveDadosSensiveis).toBe(true);
    expect(resultado.tevePlagio).toBe(true);
    expect(resultado.placarSeguranca).toBeLessThan(50);

    const alertaDados = resultado.alertas.find((a) => a.tipo === 'dados');
    const alertaPlagio = resultado.alertas.find((a) => a.tipo === 'plagio');

    expect(alertaDados).toBeDefined();
    expect(alertaDados?.mensagem).toContain(
      'Você mencionou seu nome completo e o bairro da sua escola. Veja como reformular sem se expor.'
    );
    expect(alertaDados?.trechosDestacados).toEqual(
      expect.arrayContaining(['Maria Souza', 'Escola X', 'bairro Y'])
    );

    expect(alertaPlagio).toBeDefined();
    expect(alertaPlagio?.mensagem).toContain(
      'Você pediu para a IA redigir o trabalho completo. Que tal pedir um roteiro de tópicos para você mesmo pesquisar?'
    );
  });

  it('deve aprovar a sugestão de reformulação segura gerada pelo próprio auditor com placar 100', () => {
    const promptDemo =
      'Oi, me chamo Maria Souza e estudo na Escola X no bairro Y, faz meu trabalho de ciências completo';
    const primeiraAnalise = auditPrompt(promptDemo, 'fundamental', 'ciclo-da-agua');

    const segundaAnalise = auditPrompt(
      primeiraAnalise.sugestaoGlobalSegura,
      'fundamental',
      'ciclo-da-agua'
    );

    expect(segundaAnalise.aprovado).toBe(true);
    expect(segundaAnalise.placarSeguranca).toBe(100);
    expect(segundaAnalise.xpRecompensa).toBe(50);
  });

  it('deve acolher gentilmente um desabafo íntimo/emocional', () => {
    const promptEmocional =
      'Estou muito triste e sozinho na escola, ninguém gosta de mim, o que eu faço?';
    const resultado = auditPrompt(promptEmocional, 'fundamental');

    expect(resultado.teveEmocional).toBe(true);
    expect(resultado.aprovado).toBe(false);
    expect(resultado.alertas.some((a) => a.tipo === 'emocional')).toBe(true);
  });
});
