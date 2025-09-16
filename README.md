<<<<<<< HEAD
# frontdoor
Frontdoor is a Front Desk server solution.
=======
# desafio-backend-jr
Descrição do desafio :

MVP de sistema de gestão de requisições de compra, que permite a usuários cadastrar requisições, adicionar itens e acompanhar o status até aprovação ou rejeição.

Árvore piloto baseada em template :

desafio-backend-jr/
│  .env
│  package.json
│  tsconfig.json
│  README.md
├─ .devcontainer/
│  ├─ devcontainer.json
│  ├─ docker-compose.yml
│  └─ Dockerfile
└─ src/
   ├─ app.ts                    —→ Express, global middleware
   ├─ server.ts
   │
   ├─ config/                   —→ DB/MySQL JWT
   │   └─ db.ts
   │
   ├─ models/                   —→ Entidades/esquemas
   │   ├─ User.ts
   │   ├─ PurchaseRequest.ts
   │   ├─ RequestItem.ts
   │   └─ ApprovalHistory.ts
   │
   ├─ controllers/              —→ Handlers de requisições e respostas
   │   ├─ AuthController.ts
   │   ├─ RequestController.ts
   │   └─ ReportController.ts
   │
   ├─ services/                 —→ Privilégios ou "Regras de negócio", serviços de autenticação
   │   ├─ AuthService.ts
   │   ├─ RequestService.ts
   │   └─ ReportService.ts
   │
   ├─ routes/                   —→ Rotas ~ Endpoints
   │   ├─ authRoutes.ts
   │   ├─ requestRoutes.ts
   │   └─ reportRoutes.ts
   │
   ├─ middlewares/               —→ autenticação, roles, etc.
   │   ├─ authMiddleware.ts
   │   └─ roleMiddleware.ts
   │
   ├─ utils/                     —→ Componentização para hash, logger...
   │   ├─ password.ts
   │   └─ logger.ts
   │
   └─ tests/                     —→ Testes unitários...
       ├─ auth.test.ts
       └─ request.test.ts

Dependências localizadas em ```package.json```
>>>>>>> 4e40ea6 (initial commit: rebase)
