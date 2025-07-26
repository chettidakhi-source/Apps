# Dialysis Tracker - Suivi des Séances de Dialyse

Une application web moderne pour le suivi et la gestion des séances de dialyse, construite avec Next.js, TypeScript et Tailwind CSS.

## ✨ Fonctionnalités

- 📊 **Tableau de bord des séances** : Vue d'ensemble des séances quotidiennes
- 📈 **Statistiques en temps réel** : Suivi des performances et taux d'observance
- 📋 **Gestion des patients** : Liste des prochaines séances programmées
- 📄 **Export PDF** : Génération de rapports PDF professionnels
- 💾 **Export de données** : Sauvegarde des données au format JSON
- 🎨 **Interface moderne** : Design élégant et responsive

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation

1. Clonez le projet :
```bash
git clone <repo-url>
cd dialysis-tracker
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 📊 Fonctionnalités détaillées

### Suivi des séances
- Affichage des séances du jour avec statuts en temps réel
- Indicateurs visuels pour les différents états (En cours, Programmée, Terminée)
- Informations détaillées : heure, durée, poste d'affectation

### Statistiques
- Nombre de séances par semaine
- Suivi des séances annulées  
- Calcul du taux d'observance
- Métriques de performance

### Export et sauvegarde
- **Export PDF** : Génère un rapport professionnel avec en-tête et mise en page
- **Export JSON** : Sauvegarde complète des données pour archivage
- Noms de fichiers automatiques avec date

### Gestion des patients
- Liste des prochaines séances programmées
- Types de dialyse (Hémodialyse, Dialyse péritonéale)
- Informations patient complètes

## 🛠️ Technologies utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **shadcn/ui** - Composants UI modernes
- **Lucide React** - Icônes
- **jsPDF** - Génération de PDF
- **html2canvas** - Capture d'écran pour PDF

## 📝 Structure du projet

```
src/
├── app/                  # Pages Next.js App Router
├── components/           # Composants React réutilisables
│   ├── ui/              # Composants UI de base
│   └── session-tracking.tsx # Composant principal
├── lib/                 # Utilitaires
├── types/               # Définitions TypeScript
└── styles/              # Styles globaux
```

## 🎨 Composants UI

L'application utilise shadcn/ui pour des composants modernes et accessibles :
- `Card` - Conteneurs avec bordures et ombres
- `Button` - Boutons avec variants
- `Badge` - Badges de statut colorés

## 📄 Export PDF

La fonctionnalité d'export PDF inclut :
- Titre et date automatiques
- Mise en page professionnelle
- Capture haute résolution du tableau de bord
- Nom de fichier avec horodatage

## 💾 Export de données

L'export JSON contient :
- Séances du jour
- Statistiques complètes  
- Liste des prochaines séances
- Métadonnées avec timestamp

## 🚀 Déploiement

### Vercel (recommandé)
```bash
npm run build
vercel --prod
```

### Autres plateformes
```bash
npm run build
npm start
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📧 Support

Pour toute question ou suggestion, ouvrez une issue dans le repository.

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.