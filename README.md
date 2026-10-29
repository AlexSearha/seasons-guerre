# 📜 Stack Technique – 1871 : Les Cendres et le Sang

**Auteur :** Alex Searha  
**Projet :** `1871-les-cendres-et-le-sang`

---

## ⚙️ Technologies Utilisées

| Catégorie               | Technologie         | Version / Détails                   |
| :---------------------- | :------------------ | :---------------------------------- |
| **Framework Fullstack** | **Next.js**         | `v16.4` (App Router)                |
| **UI & Logique**        | **React**           | `v19.0`                             |
| **Langage**             | **TypeScript**      | `v5.7`                              |
| **Stylisation**         | **Tailwind CSS**    | `v4.0` (via `@tailwindcss/postcss`) |
| **Animations**          | **Motion**          | `v12.0` (ex-Framer Motion)          |
| **Iconographie**        | **Lucide React**    | `v0.468`                            |
| **Formulaires**         | **React Hook Form** | `v7.54` + `@hookform/resolvers`     |
| **Validation Schema**   | **Zod**             | `v4.0`                              |
| **Envoi d'E-mails**     | **Resend**          | `v6.35`                             |

---

## 📧 Service d'E-mail (Resend)

- **Nom du service :** Resend
- **Site officiel / Connexion :** [https://resend.com](https://resend.com)
- **Tableau de bord :** [https://resend.com/overview](https://resend.com/overview)
- **Variable d'environnement :** `MAILER_RESEND_SECRET_KEY`

> **Note d'utilisation :** Les e-mails sont envoyés via l'API Resend depuis la route de contact (`/api/contact`). L'adresse d'expéditeur doit utiliser un nom de domaine validé sur le compte Resend.
