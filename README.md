# Frontdoor – Front Desk Dashboard

This repository delivers the **Front Desk Dashboard**, currently implemented as a reception and patient check-in system. It is part of a broader vision: eventually becoming a dashboard module within a full-scale ERP platform for clinic operations.

---

## 🎯 Purpose

- Provides reception staff with tools for **check-in**, appointment workflows, and daily agenda management.
- Operates independently in this repository.
- Over time, will be refactored as a module in a comprehensive ERP with multiple dashboards.

---

## 🚀 Roadmap for `frontdoor`

### Phase 1 – Core Reception Workflow (current)
- Patient check-in UI and backend CRUD operations.
- Daily schedule dashboard: show appointments, statuses, queue order.
- Integration hooks for external booking systems.
- Authentication and roles for reception users.

### Phase 2 – Enhanced Reception Features
- Live queue/status management.
- Patient notifications (SMS, email, messaging).
- Insurance/ID verification workflow.
- Multilingual support.

### Phase 3 – Modular Transformation
- API spec version for ERP-module interface.
- SSO integration for unified login.
- Clean frontend embedding in host ERP dashboard shell.
- Shared component design (UI, widgets, services).

### Phase 4 – ERP Ecosystem (in separate repositories)
*(Not in `frontdoor` repo)*  
- Finance dashboard (billing, payments, claims).
- Clinical dashboard (EMR, providers, patient charts).
- HR/staff scheduling, payroll module.
- Analytics & reporting dashboard aggregating all modules.

---

## 📦 Scope of This Repository

- This codebase implements only the **Front Desk Dashboard**.
- It will **not** include features belonging to finance, HR, or clinical modules.
- ERP-wide integration, orchestration, or cross-module behavior is out of scope here.

---

## 🛠 Tech Stack (current / planned)

*(Feel free to customize this with actual frameworks and tools.)*

- Frontend: React or Vue, Redux / Vuex, Tailwind or Material UI  
- Backend: Node.js + Express or Python Flask  
- Database: PostgreSQL or MongoDB  
- Authentication: JWT or OAuth2  
- Notifications: Twilio / SendGrid / WhatsApp API  
- API: REST or GraphQL  
- Containerization: Docker  

---

## 📋 Contribution Guidelines

- Contributions specific to **Front Desk Dashboard** are welcome via pull requests.
- Features spanning multiple ERP modules should be proposed in the wider ERP repositories (not in this one).
- Keep changes focused and modular to simplify future integration.

---

## 🧭 Module Vision

- `frontdoor` is the foundation and proof-of-concept for a clinic's digital front door.
- It will evolve into a clean, embeddable module inside a full clinic ERP.
- Its responsibilities: reception workflows, patient arrival, queue management, receptionist controls.

---

## 📅 Timeline Example

| Phase  | Milestones (approximate)                                     |
|--------|--------------------------------------------------------------|
| 1      | MVP check-in + schedule UI (0–3 months)                      |
| 2      | Notifications, queue status, multilingual (3–6 months)       |
| 3      | API-ready module, SSO, embed support (6–9 months)            |
| 4      | ERP dashboard ecosystem in separate repos (9–12+ months)     |

---

## ✅ Summary

This repository implements the **Front Desk Dashboard**. It serves as the **reception entry point** within a larger planned ERP. Future evolution will modularize it for embedding into a unified ERP platform that handles clinical, administrative, financial, and HR workflows.

---

