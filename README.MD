# 🌍 Artivisio – Plateforme Professionnelle Francophone

**Construisez votre impact professionnel, ici et maintenant.**  
Plateforme moderne pour créer des **CV professionnels**, présenter des **portfolios web**, accéder à des **coachings LinkedIn**, consulter des **offres d’emploi**, et publier du contenu via un **blog dynamique**.

---

## 🚀 Fonctionnalités principales

- 🌐 Multilingue (français / anglais) avec gestion de contexte i18n
- 💼 Création, stockage et téléchargement de CV personnalisés
- 🖼️ Portfolios web utilisateurs avec présentation et téléchargement des CV uniquement
- ✍️ Blog complet avec articles stockés en base de données PostgreSQL Neon
- 🔒 Authentification sécurisée (à intégrer)
- 📁 Stockage de fichiers (CV, images) sur Cloudflare R2
- 🛠️ Architecture moderne : Next.js 14 App Router, Tailwind CSS, Framer Motion, ShadCN UI

---

## 🗂️ Structure du projet

/app
├── blog # Liste des articles, pages d'articles
├── cv # Gestion des CV (création, téléchargement)
├── portfolios # Présentation des portfolios utilisateurs
├── legal # Mentions légales, CGV, politique cookies
├── layout.tsx # Layout global avec Header & Footer
/components
├── ui # Composants UI réutilisables (boutons, cartes, etc.)
├── blog # Composants blog (article, liste)
├── common # Header, Footer, LanguageSwitcher
/contexts
└── language-context.tsx # Contexte i18n et gestion des traductions
/lib
├── supabase.ts # Connexion & fonctions Supabase Storage
└── r2.ts # Gestion des fichiers sur Cloudflare R2
/prisma
└── schema.prisma # Modèle Prisma pour Neon PostgreSQL
/public
└── locales # Fichiers JSON de traduction (fr.json, en.json)

yaml
Copier
Modifier

---

## ⚙️ Technologies utilisées

| Technologie         | Rôle                                         |
|---------------------|----------------------------------------------|
| Next.js 14          | Framework React moderne (App Router)         |
| Tailwind CSS        | Framework CSS utilitaire rapide et responsive|
| Framer Motion       | Animations UI fluides                         |
| ShadCN/UI           | Composants React UI accessibles et esthétiques |
| Neon (PostgreSQL)   | Base de données relationnelle scalable       |
| Cloudflare R2       | Stockage objet (fichiers CV, images portfolio)|
| Supabase Storage    | Alternative pour stockage fichiers léger      |
| Prisma ORM          | ORM Typescript pour Neon                      |
| Vercel              | Plateforme de déploiement serverless          |

---