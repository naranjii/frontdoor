# Teraplus – Painel de Recepção

Este repositório entrega o **Painel de Recepção**, atualmente implementado como um sistema de recepção e check-in de pacientes. Ele faz parte de uma visão mais ampla: tornar-se, futuramente, um módulo de dashboard dentro de uma plataforma ERP completa voltada à operação de clínicas.

---

## Dev
> Monte o container e no terminal digite:
```bash
cd backend | pnpm i & cd ../frontend | pnpm i | cd .. | pnpm dev
```

---

## Propósito

* Fornece à equipe de recepção ferramentas para **check-in**, controle de agendamentos e gestão da agenda diária.
* Funciona de forma independente neste repositório.
* Com o tempo, será refatorado como um módulo integrado a um ERP abrangente com múltiplos dashboards.

---

## Roteiro do `teraplus`

### Fase 1 – Fluxo Central de Recepção (atual)

* Interface e operações CRUD de check-in de pacientes.
* Dashboard de agenda diária: exibe consultas, status e ordem na fila.
* Pontos de integração com sistemas externos de agendamento.
* Autenticação e papéis de usuário para recepcionistas.

### Fase 2 – Funcionalidades Avançadas de Recepção

* Gerenciamento em tempo real de fila e status.
* Notificações aos pacientes (SMS, e-mail, mensageria).
* Fluxo de verificação de convênios e documentos.
* Suporte multilíngue.

### Fase 3 – Transformação Modular

* Versão da API compatível com interface de módulos ERP.
* Integração SSO para login unificado.
* Frontend preparado para incorporação ao painel principal do ERP.
* Design compartilhado de componentes (UI, widgets, serviços).

### Fase 4 – Ecossistema ERP (em repositórios separados)

*(Não incluso neste repositório `teraplus`)*

* Dashboard financeiro (faturamento, pagamentos, convênios).
* Dashboard clínico (prontuários, profissionais, histórico do paciente).
* Módulo de RH e escalas de funcionários.
* Dashboard de analytics e relatórios integrando todos os módulos.

---

## 📦 Escopo Deste Repositório

* Este código implementa apenas o **Painel de Recepção**.
* **Não** inclui funcionalidades de finanças, RH ou módulos clínicos.
* Integração ampla do ERP, orquestração ou comportamento entre módulos estão fora do escopo.

---

## 🛠 Stack Tecnológica (atual / planejada)

*(Personalize conforme os frameworks e ferramentas efetivamente usados.)*

* Frontend: React ou Vue, Redux / Vuex, Tailwind ou Material UI
* Backend: Node.js + Express ou Python Flask
* Banco de dados: PostgreSQL ou MongoDB
* Autenticação: JWT ou OAuth2
* Notificações: Twilio / SendGrid / API do WhatsApp
* API: REST ou GraphQL
* Containerização: Docker

---

## 📋 Diretrizes de Contribuição

* Contribuições específicas para o **Painel de Recepção** são bem-vindas via pull requests.
* Funcionalidades que envolvam múltiplos módulos do ERP devem ser propostas nos repositórios correspondentes.
* Mantenha as alterações focadas e modulares para facilitar futuras integrações.

---

## 🧭 Visão do Módulo

* `teraplus` é a base e o protótipo da “porta de entrada digital” de uma clínica.
* Evoluirá para um módulo limpo e incorporável dentro de um ERP clínico completo.
* Suas responsabilidades: fluxo de recepção, chegada de pacientes, gestão de filas e controles da recepção.

---

## 📅 Exemplo de Cronograma

| Fase | Marcos (aproximados)                                             |
| ---- | ---------------------------------------------------------------- |
| 1    | MVP de check-in + interface de agenda (0–3 meses)                |
| 2    | Notificações, status em tempo real, multilíngue (3–6 meses)      |
| 3    | Módulo com API e SSO prontos, suporte a incorporação (6–9 meses) |
| 4    | Ecossistema ERP em repositórios separados (9–12+ meses)          |

---

## ✅ Resumo

Este repositório implementa o **Painel de Recepção Teraplus**. Ele serve como **ponto de entrada da recepção** dentro de um ERP em planejamento. A evolução futura modularizará este sistema para integração em uma plataforma unificada, cobrindo fluxos clínicos, administrativos, financeiros e de RH.
