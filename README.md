# KB Finance 💰

**Application intelligente de gestion financière personnelle**
Conçue pour les utilisateurs africains — FCFA, Mobile Money, Cash, Épargne.

---

## Fonctionnalités

- ✅ Tableau de bord avec solde, revenus, dépenses, épargne
- ✅ Ajout rapide de transactions (revenu / dépense)
- ✅ Catégories : nourriture, transport, logement, santé, factures...
- ✅ Graphiques : donut, barres, courbe 6 mois
- ✅ Objectifs d'épargne avec barre de progression
- ✅ Assistant IA en langage naturel
- ✅ Assistant vocal (Web Speech API — français)
- ✅ Export CSV (complet, filtré, mois courant, presse-papier, résumé)
- ✅ Alertes intelligentes (solde négatif, dépenses excessives...)
- ✅ PWA installable sur Android et iOS
- ✅ Mode hors-ligne (Service Worker)
- ✅ Données 100% locales (localStorage)

---

## Stack technique

| Couche     | Technologie                          |
|------------|--------------------------------------|
| Frontend   | HTML5, CSS3, JavaScript Vanilla      |
| Graphiques | Chart.js (CDN)                       |
| Stockage   | localStorage (navigateur)            |
| PWA        | Web App Manifest + Service Worker    |
| Voix       | Web Speech API (SpeechRecognition + SpeechSynthesis) |
| Police     | Sora + DM Mono (Google Fonts)        |

---

## Structure du projet

```
kb-finance/
├── index.html          ← Application principale (PWA)
├── sw.js               ← Service Worker (cache offline)
├── manifest.json       ← PWA Manifest (installable)
├── offline.html        ← Page hors-ligne
├── robots.txt
├── sitemap.xml
├── .htaccess           ← Config Apache (OVH, Hostinger...)
├── netlify.toml        ← Config Netlify
├── vercel.json         ← Config Vercel
├── .gitignore
├── README.md
└── icons/
    ├── favicon.svg
    ├── icon-72.svg
    ├── icon-96.svg
    ├── icon-128.svg
    ├── icon-144.svg
    ├── icon-152.svg
    ├── icon-192.svg
    ├── icon-384.svg
    ├── icon-512.svg
    ├── maskable-192.svg
    └── maskable-512.svg
```

---

## Déploiement

### Option 1 — Netlify (recommandé, gratuit)
```bash
# 1. Créez un compte sur https://netlify.com
# 2. Glissez-déposez ce dossier dans l'interface Netlify Drop
#    → https://app.netlify.com/drop
# 3. Votre app est en ligne en 30 secondes
```

### Option 2 — Vercel (gratuit)
```bash
npm install -g vercel
cd kb-finance
vercel --prod
```

### Option 3 — GitHub Pages (gratuit)
```bash
git init
git add .
git commit -m "init KB Finance"
git remote add origin https://github.com/VOTRE_USER/kb-finance.git
git push -u origin main
# Activer GitHub Pages dans Settings > Pages > Branch: main
```

### Option 4 — Hébergement mutualisé Apache (OVH, Infomaniak...)
```
# Transférer tous les fichiers par FTP dans le dossier www/ ou public_html/
# Le fichier .htaccess est déjà configuré
```

### Option 5 — Local (test rapide)
```bash
# Python 3
python3 -m http.server 8080
# → Ouvrir http://localhost:8080

# Node.js
npx serve .
# → Ouvrir http://localhost:3000
```

---

## Installation comme application mobile (PWA)

### Android (Chrome)
1. Ouvrir l'URL dans Chrome
2. Menu ⋮ → **Ajouter à l'écran d'accueil**
3. L'app s'installe comme une application native

### iOS (Safari)
1. Ouvrir l'URL dans Safari
2. Bouton Partager → **Sur l'écran d'accueil**
3. L'app s'installe avec icône KB Finance

---

## Variables à personnaliser

Ouvrez `index.html` et modifiez :
- Ligne `av-name` : remplacer `"Habib"` par votre prénom
- `CATS` : ajouter/modifier les catégories
- Données de démo : fonction `seed()` dans le JS

---

## Évolutions futures prévues

- [ ] Authentification utilisateur (Supabase / Firebase)
- [ ] Synchronisation cloud multi-appareils
- [ ] Intégration Mobile Money (Wave, Orange Money, MTN)
- [ ] Budgets par catégorie avec alertes de dépassement
- [ ] Rapports PDF mensuels
- [ ] Application mobile native (React Native / Capacitor)
- [ ] IA avancée (analyse prédictive des dépenses)
- [ ] Multi-devises (CFA, EUR, XOF, GNF...)

---

## Licence

MIT — Libre d'utilisation, de modification et de distribution.

---

*Développé pour les entrepreneurs et particuliers d'Afrique de l'Ouest*
*KB Finance — Gérez mieux, vivez mieux.*
