# Centre de Dialyse - Tableau de Bord

Une application web moderne pour la gestion des séances de dialyse, construite avec Next.js, TypeScript et Tailwind CSS.

## 🚀 Fonctionnalités

- **Tableau de bord des séances** : Affichage des séances du jour avec statuts en temps réel
- **Statistiques** : Suivi des séances hebdomadaires, taux d'observance et séances annulées
- **Planning des patients** : Vue des prochaines séances programmées
- **Export PDF complet** : Génération de rapports et documents PDF
- **Interface moderne** : Design responsive et accessible
- **Composants réutilisables** : Architecture modulaire avec shadcn/ui

## 🛠️ Technologies utilisées

- **Next.js 14** : Framework React avec App Router
- **TypeScript** : Typage statique pour la sécurité du code
- **Tailwind CSS** : Framework CSS utilitaire
- **shadcn/ui** : Composants UI modernes et accessibles
- **Lucide React** : Icônes vectorielles
- **Radix UI** : Composants primitifs accessibles
- **jsPDF** : Génération de PDF côté client
- **html2canvas** : Capture d'éléments HTML

## 📦 Installation

1. Clonez le repository :
```bash
git clone <repository-url>
cd dialysis-app
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Structure du projet

```
dialysis-app/
├── src/
│   ├── app/                 # App Router (Next.js 14)
│   │   ├── globals.css     # Styles globaux
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Page d'accueil
│   ├── components/         # Composants React
│   │   ├── ui/            # Composants UI de base
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── badge.tsx
│   │   ├── SessionTracking.tsx  # Composant principal
│   │   ├── PDFExport.tsx       # Export PDF
│   │   └── PDFPreview.tsx      # Prévisualisation PDF
│   └── lib/               # Utilitaires
│       └── utils.ts       # Fonctions utilitaires
├── public/                # Assets statiques
└── tailwind.config.ts     # Configuration Tailwind
```

## 🎨 Composants

### SessionTracking
Le composant principal qui affiche :
- **Séances du jour** : Liste des séances avec statuts (En cours, Programmée, Terminée)
- **Statistiques** : Métriques hebdomadaires et taux d'observance
- **Prochaines séances** : Planning des patients à venir

### PDFExport
Composant d'export PDF avec :
- **Rapport des séances** : Document complet avec statistiques
- **Liste des patients** : Référence des patients actifs
- **Planning quotidien** : Planning détaillé par créneaux
- **Export d'interface** : Capture de l'interface complète

### Interface Patient
```typescript
interface Patient {
  id: number
  prenom: string
  nom: string
  prochaineSéance: string
  typeDialyse: string
}
```

### Interface Session
```typescript
interface Session {
  id: number
  patient: string
  heure: string
  duree: string
  status: string
  poste: string
}
```

## 🎯 Statuts des séances

- **En cours** : Séance actuellement en cours (vert)
- **Programmée** : Séance planifiée (orange)
- **Terminée** : Séance terminée (bleu)

## 📄 Export PDF

L'application inclut des fonctionnalités complètes d'export PDF :

### Types de Rapports
- **Rapport des Séances** : Document complet avec statistiques et séances du jour
- **Liste des Patients** : Référence des patients actifs avec leurs informations
- **Planning Quotidien** : Planning détaillé par créneaux horaires
- **Rapport Complet** : Capture de l'interface avec design optimisé

### Fonctionnalités
- **Génération côté client** : Aucune donnée envoyée au serveur
- **Format A4** : Optimisé pour l'impression
- **Pagination automatique** : Gestion des longs contenus
- **Encodage UTF-8** : Support complet du français

*Voir `DOCUMENTATION_PDF.md` pour plus de détails techniques.*

## 📱 Responsive Design

L'application est entièrement responsive avec :
- **Mobile** : Layout adapté pour les petits écrans
- **Tablet** : Grille à 2 colonnes pour les écrans moyens
- **Desktop** : Layout complet avec toutes les informations

## 🔧 Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm run start` : Lance l'application en mode production
- `npm run lint` : Vérifie le code avec ESLint
- `npm run type-check` : Vérifie les types TypeScript

## 🚀 Déploiement

L'application peut être déployée sur :
- **Vercel** : Déploiement automatique depuis GitHub
- **Netlify** : Déploiement avec build automatique
- **Railway** : Plateforme cloud moderne

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.
