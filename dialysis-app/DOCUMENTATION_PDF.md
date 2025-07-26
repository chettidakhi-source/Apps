# 📄 Fonctionnalités d'Export PDF - Centre de Dialyse

## 🎯 Vue d'ensemble

L'application de gestion des séances de dialyse inclut des fonctionnalités complètes d'export PDF permettant de générer différents types de rapports et documents pour la gestion quotidienne.

## 📋 Types de Rapports Disponibles

### 1. 📊 Rapport des Séances
**Fichier généré :** `rapport-seances-dialyse.pdf`

**Contenu :**
- En-tête avec titre et date
- Statistiques de la semaine
  - Nombre total de séances
  - Séances annulées
  - Taux d'observance
- Liste détaillée des séances du jour
  - Heure et patient
  - Poste et durée
  - Statut de la séance

**Utilisation :** Rapport quotidien pour l'équipe médicale

### 2. 👥 Liste des Patients
**Fichier généré :** `liste-patients.pdf`

**Contenu :**
- En-tête avec titre et date
- Liste complète des patients actifs
  - Nom et prénom
  - Type de dialyse
  - Prochaine séance programmée

**Utilisation :** Référence pour l'équipe soignante

### 3. 📅 Planning Quotidien
**Fichier généré :** `planning-quotidien.pdf`

**Contenu :**
- En-tête avec titre et date
- Séances du matin (08h-12h)
- Séances de l'après-midi (13h-17h)
- Détails par créneau horaire

**Utilisation :** Planning de travail pour l'équipe

### 4. 🖼️ Rapport Complet (Interface)
**Fichier généré :** `rapport-complet-dialyse.pdf`

**Contenu :**
- Capture de l'interface complète
- Statistiques visuelles
- Séances du jour avec statuts
- Prochaines séances
- Design optimisé pour l'impression

**Utilisation :** Rapport visuel pour la direction

## 🛠️ Technologies Utilisées

### Bibliothèques PDF
- **jsPDF** : Génération de PDF côté client
- **html2canvas** : Capture d'éléments HTML en images

### Fonctionnalités
- **Génération côté client** : Pas de serveur requis
- **Format A4** : Optimisé pour l'impression
- **Pagination automatique** : Gestion des longs contenus
- **Encodage UTF-8** : Support complet du français

## 📱 Interface Utilisateur

### Section Export PDF
L'interface propose une section dédiée avec :

1. **Trois boutons d'export rapide :**
   - Rapport des Séances
   - Liste des Patients
   - Planning Quotidien

2. **Prévisualisation et export complet :**
   - Aperçu du rapport final
   - Bouton d'export de l'interface complète

### Design Responsive
- **Desktop** : Grille à 3 colonnes
- **Tablet** : Grille à 2 colonnes
- **Mobile** : Grille à 1 colonne

## 🔧 Configuration Technique

### Dépendances
```json
{
  "jspdf": "^2.5.1",
  "html2canvas": "^1.4.1"
}
```

### Composants React
- `PDFExport.tsx` : Composant principal d'export
- `PDFPreview.tsx` : Prévisualisation pour l'export

### Fonctions d'Export
```typescript
// Génération de rapport texte
generateSessionReport()
generatePatientList()
generateDailySchedule()

// Export d'interface
exportToPDF(elementId, filename)
```

## 📊 Exemples d'Utilisation

### Rapport Quotidien
```typescript
// Génération automatique
const generateDailyReport = () => {
  const doc = new jsPDF()
  // Ajout du contenu
  doc.save("rapport-quotidien.pdf")
}
```

### Export d'Interface
```typescript
// Capture et export
const exportInterface = async () => {
  const element = document.getElementById('pdf-preview')
  const canvas = await html2canvas(element)
  // Conversion en PDF
}
```

## 🎨 Personnalisation

### Styles PDF
- **Police** : Arial par défaut
- **Tailles** : 20px (titre), 16px (sections), 12px (texte), 10px (détails)
- **Couleurs** : Noir pour le texte, couleurs pour les badges

### Mise en Page
- **Marges** : 20mm sur tous les côtés
- **Espacement** : 15mm entre les éléments
- **Pagination** : Automatique pour les longs contenus

## 🔒 Sécurité et Performance

### Sécurité
- **Génération côté client** : Aucune donnée envoyée au serveur
- **Format PDF** : Lecture seule, pas de modification possible
- **Encodage** : UTF-8 pour les caractères spéciaux

### Performance
- **Taille des fichiers** : Optimisée pour le web
- **Génération** : Asynchrone pour éviter le blocage
- **Mémoire** : Nettoyage automatique après génération

## 📈 Évolutions Futures

### Fonctionnalités Planifiées
- [ ] Export programmé (quotidien/hebdomadaire)
- [ ] Templates personnalisables
- [ ] Signature électronique
- [ ] Intégration avec imprimantes réseau
- [ ] Export vers cloud (Google Drive, Dropbox)

### Améliorations Techniques
- [ ] Compression PDF avancée
- [ ] Watermark automatique
- [ ] Métadonnées PDF
- [ ] Versioning des documents

## 🚀 Déploiement

### Production
Les fonctionnalités PDF fonctionnent en production sans configuration supplémentaire.

### Variables d'Environnement
```env
# Optionnel : Configuration PDF
NEXT_PUBLIC_PDF_TITLE="Centre de Dialyse"
NEXT_PUBLIC_PDF_AUTHOR="Équipe Médicale"
```

## 📞 Support

Pour toute question sur les fonctionnalités PDF :
1. Vérifiez la console du navigateur pour les erreurs
2. Assurez-vous que les données sont chargées
3. Testez avec un navigateur moderne (Chrome, Firefox, Safari)

---

*Documentation mise à jour le : ${new Date().toLocaleDateString('fr-FR')}*