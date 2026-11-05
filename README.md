# Guardian Prompt — Letramento Seguro em IA para Escolas

> **Hackathon TeenTech 2026 (Instituto Teckids)**
> - **Tema:** Conexão Segura: Transformando inovação em proteção
> - **Categoria:** Prevenção à Violência
> - **Modelo:** Plataforma Gamificada B2B2C para Escolas e Redes de Ensino (Ensino Fundamental e Médio)

---

## Visão Geral

O **Guardian Prompt** ensina estudantes do Ensino Fundamental e Médio a utilizar Inteligência Artificial com segurança, consciência e pensamento crítico. Em um laboratório gamificado, o aluno interage com um assistente virtual escolar simulado; antes de qualquer resposta, um **Auditor de Prompts 100% local e algorítmico** analisa o comando em busca de:

1. **Dados Pessoais Sensíveis (LGPD):** nome completo, escola, bairro/endereço, CEP, telefone, e-mail, CPF e rotina de horários.
2. **Plágio / Terceirização Cognitiva:** pedidos para a IA fazer o trabalho inteiro pronto, orientando o estudante a pedir roteiros de tópicos para pesquisar com autoria própria.
3. **Desabafo Íntimo / Emocional:** acolhimento gentil orientando a busca por escuta humana de confiança (família, professores, orientação escolar).

---

## Rotas Principais

- `/` — **Landing Page:** Proposta de valor, O Problema (3 cards), Como Funciona (3 passos), Para Quem, Ética e Conformidade (LGPD, Marco Civil e ECA) e Planos B2B ilustrativos.
- `/entrar` — **Seleção de Perfil da Demo (Mock LGPD):** Escolha entre Estudante (Fundamental ou Médio), Professor(a) e Gestor Escolar.
- `/aluno` — **Ambiente do Estudante:**
  - **Aba 1:** Laboratório de Prompts com Auditor Automático e Placar de Segurança (0 a 100).
  - **Aba 2:** Simulador de Cenários de Risco (Vazamento de Dados, Deepfake, Verificação de Fontes e Cidadania Digital).
  - **Aba 3:** Trilhas de Letramento por Faixa Etária (Fundamental vs. Médio) e Conquistas (Badges).
- `/professor` — **Painel do Professor:** Criação de turmas com código de convite fictício, atribuição de atividades, métricas 100% agregadas e anônimas, gráficos (linhas, rosca e barras), exportação de relatório LGPD e Guia Pedagógico para aula de 50 minutos.
- `/gestor` — **Painel do Gestor Escolar:** Comparativo anônimo entre turmas e segmentos, adesão e indicadores institucionais.
- `/identidade` — **Guia de Marca Interativo:** Variantes da `<LogoGuardianPrompt />`, paleta oficial com botão "Copiar HEX", tipografia Montserrat, componentes de marca e exemplos de uso correto vs. incorreto.

---

## Como Executar Localmente

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento (http://localhost:8080)
npm run dev

# Executar testes unitários do Auditor de Prompts
npm test

# Gerar build de produção
npm run build
```
