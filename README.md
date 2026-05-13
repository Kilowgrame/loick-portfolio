# Portfolio Loïck Legallais — Astro

Portfolio de Loïck Legallais, designer UI / UX freelance, construit avec [Astro](https://astro.build/).

## 🚀 Démarrage rapide

```bash
npm install      # installe Astro la première fois
npm run dev      # lance le serveur local sur http://localhost:4321
```

Pour stopper le serveur : `Ctrl + C` dans le terminal.

---

## 📁 Structure du projet

```
loick-portfolio/
├── public/                         # Fichiers servis tels quels
│   ├── favicon.svg
│   ├── fonts/                      # LC Mogi
│   └── images/
│       ├── stickers/               # Stickers du hero
│       └── projets/                # ← Mets ici tes images de projets
│
├── src/
│   ├── content/
│   │   ├── config.ts               # 🎯 Schéma des projets (le "CPT")
│   │   └── projets/                # 🎯 1 fichier .md = 1 projet
│   │       ├── sbg-systems.md
│   │       ├── manerty.md
│   │       └── ...
│   │
│   ├── pages/                      # 1 fichier = 1 page
│   │   ├── index.astro
│   │   ├── projets.astro           # liste des projets
│   │   ├── projets/[slug].astro    # template single projet
│   │   ├── a-propos.astro
│   │   └── ressources.astro
│   │
│   ├── components/
│   ├── layouts/
│   └── styles/global.css
└── package.json
```

---

## ✨ Gérer les projets

Le portfolio utilise les **Content Collections** d'Astro — l'équivalent du CPT WordPress.
Chaque projet est un fichier `.md` dans `src/content/projets/`.

### Ajouter un nouveau projet

1. Duplique un fichier existant (ex: `sbg-systems.md` → copie en `mon-projet.md`)
2. Le **nom du fichier** devient l'URL : `mon-projet.md` → `/projets/mon-projet`
3. Édite le **frontmatter** (entre `---`) avec les infos du projet
4. Sauvegarde → le projet apparaît **automatiquement** sur la home, l'archive et a sa propre page

### Anatomie d'un fichier projet

```yaml
---
# CARD info (utilisé sur home + archive)
title: "Nom du projet"
cover: "/images/projets/mon-projet/cover.jpg"  # optionnel
bgColor: "#06535e"      # couleur de fond du bloc damier (home)
textColor: "#ffffff"    # couleur du texte
description: "Phrase d'accroche du projet"
fields: ["UI Design", "UX Design"]
category: "UI / UX Design"   # pour le filtre archive
order: 1                # ordre d'affichage (1 = premier)
draft: false            # passe à true pour masquer

# SINGLE — meta items du sidebar (label + valeur, libres)
metaItems:
  - label: "Année"
    value: "2024"
  - label: "Secteurs"
    value: "Tech, IA"

# Lien externe (bouton "Voir le site" dans le sidebar)
liveUrl: "https://exemple.com"

# Affiche ou non les 3 stats à la fin (7 ans / +50 clients / +120h)
showStats: true

# BLOCS — réorganisable librement
blocs:
  - type: text
    contenu: "Mon premier paragraphe…"

  - type: image
    src: "/images/projets/mon-projet/screen-1.jpg"
    alt: "Description de l'image"
    legende: "Légende sous l'image"   # optionnel

  - type: video
    src: "/videos/demo.webm"
    poster: "/images/projets/mon-projet/video-cover.jpg"

  - type: gif
    src: "/images/projets/mon-projet/anim.gif"

  - type: galerie
    colonnes: 2
    images:
      - src: "/images/projets/mon-projet/g1.jpg"
      - src: "/images/projets/mon-projet/g2.jpg"
---
```

### Types de blocs disponibles

| Type | Usage |
|---|---|
| `text` | Paragraphe de texte (22px medium) |
| `image` | Image avec légende optionnelle |
| `video` | Vidéo .webm (autoplay, loop, muted par défaut) |
| `gif` | GIF animé |
| `galerie` | Grille d'images (1-4 colonnes desktop, 1 col mobile) |

### Sidebar de la single

- Le **lien retour** est toujours présent en haut
- **Titre + Description + Tags** s'affichent automatiquement
- **`metaItems`** : ajoute autant de lignes que tu veux (label + valeur libres)
- **`liveUrl`** : si défini, affiche le bouton "Voir le site"
- **`showStats: false`** : masque les 3 stats à la fin (sinon affichées par défaut)

### Réorganiser les blocs

Tu peux **copier-coller** des blocs, les **réordonner** ou en **supprimer** dans le YAML. L'ordre du fichier est l'ordre d'affichage.

### Masquer un projet temporairement

Mets `draft: true` dans le frontmatter — le projet ne s'affichera plus, mais le fichier reste.

---

## 🎯 Catégories de filtre

Les filtres de l'archive `/projets` sont **générés dynamiquement** depuis le champ `category` de chaque projet. Pour ajouter une nouvelle catégorie, il suffit qu'un projet la mentionne.

---

## 📐 Système fluide responsive

Le site est calibré sur **1512px de large** (Figma desktop). Toutes les valeurs sont fluides :

- Min : 360px (mobile)
- Idéal : 1512px (Figma)
- Max : 1800px (plafonné)

Les marges latérales utilisent `clamp(20px, fluide, 60px)` : 20px sur mobile → 60px sur desktop, transition continue.

Pour les **changements structurels** (layouts qui passent en colonne, etc.) il y a un breakpoint à **768px**.

---

## 🏗️ Build de production

```bash
npm run build      # génère un dossier dist/
npm run preview    # prévisualise localement
```

---

## 📝 À faire

- [ ] Remplacer la photo du hero par ta vraie photo
- [ ] Ajouter les images des projets dans `public/images/projets/<slug>/`
- [ ] Construire les pages À propos et Ressources avec leurs maquettes
- [ ] Mettre en place Decap CMS pour administrer sans VS Code
- [ ] Pousser sur GitHub
- [ ] Déployer sur Netlify
