# Système de Gestion des Patients

Une application web moderne pour la collecte et le suivi des données patients, développée avec Next.js 15, TypeScript et Tailwind CSS.

## 🌟 Fonctionnalités

- **Gestion complète des patients** : Ajout, modification, suppression et recherche
- **Interface intuitive** : Design moderne et responsive avec Tailwind CSS
- **Stockage local** : Les données sont sauvegardées dans le localStorage du navigateur
- **Statistiques en temps réel** : Affichage du nombre total de patients, nouveaux patients du jour, et répartition par sexe
- **Recherche avancée** : Recherche par nom ou prénom
- **Formulaires validés** : Validation des champs obligatoires
- **Dialogue de confirmation** : Confirmation avant suppression d'un patient

## 🔧 Champs de données

Pour chaque patient, l'application permet de saisir :

- **Nom** (obligatoire)
- **Prénom** (obligatoire)  
- **Âge** (obligatoire)
- **Sexe** (obligatoire) : Masculin ou Féminin
- **Suivi** : Type de suivi médical
- **ATCD** : Antécédents médicaux, chirurgicaux, familiaux
- **Motif de consultation** : Raison de la visite
- **CAT** : Conduite À Tenir - plan de traitement et recommandations

## 🚀 Installation et démarrage

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd patient-management

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Build de production

```bash
# Créer le build de production
npm run build

# Lancer le serveur de production
npm start
```

## 🛠️ Technologies utilisées

- **Framework** : Next.js 15 avec App Router
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4
- **Composants UI** : Composants personnalisés basés sur Radix UI
- **Icons** : Lucide React
- **Stockage** : localStorage (navigateur)

## 📱 Interface utilisateur

### Tableau de bord principal

- **Statistiques** : Vue d'ensemble des patients
- **Barre de recherche** : Recherche instantanée
- **Bouton d'ajout** : Accès rapide au formulaire

### Gestion des patients

- **Formulaire d'ajout/modification** : Interface claire avec validation
- **Liste des patients** : Affichage avec badges d'information
- **Actions** : Édition et suppression avec confirmation

## 💾 Stockage des données

Les données sont stockées localement dans le navigateur using localStorage. Cela signifie que :

- ✅ Les données persistent entre les sessions
- ✅ Aucune configuration de base de données requise
- ⚠️ Les données sont liées au navigateur/appareil
- ⚠️ Effacer les données du navigateur supprimera les patients

> **Note** : Pour un usage en production, il est recommandé d'implémenter une base de données côté serveur.

## 🎨 Personnalisation

### Thème

Le design utilise un système de couleurs moderne défini dans `src/app/globals.css`. Vous pouvez personnaliser :

- Les couleurs principales
- Les espacements  
- Les bordures et radius
- Le mode sombre (support inclus)

### Composants

Les composants UI sont modulaires et situés dans `src/components/ui/`. Chaque composant peut être personnalisé individuellement.

## 📝 Structure du projet

```
patient-management/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── textarea.tsx
│   │       └── badge.tsx
│   └── lib/
│       └── utils.ts
├── public/
├── package.json
└── README.md
```

## 🔒 Sécurité et conformité

- **Validation côté client** : Tous les champs obligatoires sont validés
- **TypeScript** : Typage strict pour éviter les erreurs
- **Sanitisation** : Les entrées utilisateur sont protégées contre les injections
- **RGPD** : Stockage local uniquement, aucune transmission de données

## 🐛 Dépannage

### Problèmes courants

1. **Les données disparaissent** : Vérifiez que localStorage n'est pas désactivé dans votre navigateur
2. **Erreurs de build** : Assurez-vous d'utiliser Node.js 18+
3. **Styles manquants** : Vérifiez que Tailwind CSS est correctement configuré

### Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur le repository.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

Développé avec ❤️ en utilisant Next.js et TypeScript
