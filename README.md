# S.A.M.COMPTA

Application de comptabilité multi-sociétés (sociétés, plan comptable, journaux,
grand livre, balance générale, bilan, compte de résultat) — **100 % hors ligne**,
installable comme une application sur téléphone Android.

Toutes les données restent **uniquement sur l'appareil** (stockage local du
navigateur) : rien n'est envoyé à un serveur.

---

## 1) Déployer sur GitHub Pages

1. Créez un nouveau dépôt sur [github.com](https://github.com) (par exemple `sam-compta`).
   Il peut être **public** ou **privé** (GitHub Pages fonctionne aussi sur un
   dépôt privé si votre compte le permet).
2. Décompressez ce fichier ZIP, puis mettez **tout le contenu** à la racine du
   dépôt (`index.html`, `manifest.json`, `sw.js`, le dossier `icons/`) — soit en
   les glissant-déposant sur la page GitHub ("Add file → Upload files"), soit via
   Git :
   ```bash
   git init
   git add .
   git commit -m "S.A.M.COMPTA"
   git branch -M main
   git remote add origin https://github.com/VOTRE-COMPTE/sam-compta.git
   git push -u origin main
   ```
3. Dans le dépôt GitHub : **Settings → Pages**.
   - Source : `Deploy from a branch`
   - Branch : `main` / dossier `/ (root)`
   - Cliquez **Save**.
4. Au bout d'une à deux minutes, votre application est en ligne à l'adresse :
   `https://VOTRE-COMPTE.github.io/sam-compta/`

⚠️ Important : l'app doit être servie via **https://** (GitHub Pages le fait
automatiquement) — un simple fichier ouvert directement dans le navigateur
(`file://...`) ne permet pas l'installation ni le mode hors ligne.

---

## 2) Installer sur un téléphone Android

1. Ouvrez l'adresse `https://VOTRE-COMPTE.github.io/sam-compta/` dans **Chrome**
   sur le téléphone.
2. Chrome propose automatiquement une bannière **« Ajouter à l'écran d'accueil »**
   (ou **« Installer l'application »**). Si elle n'apparaît pas :
   - Ouvrez le menu ⋮ (trois points, en haut à droite)
   - Appuyez sur **« Installer l'application »** (ou « Ajouter à l'écran d'accueil »)
3. Confirmez. Une icône **S.A.M.COMPTA** (logo doré) apparaît sur l'écran d'accueil,
   comme une application native — sans barre d'adresse, en plein écran.

Une fois installée et ouverte une première fois (avec connexion), l'application
fonctionne **entièrement hors ligne** ensuite : le Service Worker met en cache
tous les fichiers nécessaires.

---

## 3) Mettre à jour l'application plus tard

Pour publier une nouvelle version :
1. Remplacez les fichiers modifiés dans le dépôt GitHub (nouveau commit / push).
2. Ouvrez `sw.js` et incrémentez le numéro de version de `CACHE_NAME`
   (ex. `samcompta-cache-v2` → `samcompta-cache-v2`) — cela force les téléphones
   à télécharger la nouvelle version au lieu de garder l'ancienne en cache.
3. Les utilisateurs verront la mise à jour la prochaine fois qu'ils ouvrent
   l'application avec une connexion internet (elle se recharge en arrière-plan).

---

## 4) Sauvegarde des données

Les données (sociétés, comptes, écritures) sont stockées dans le stockage local
du navigateur, **propre à cet appareil et à ce navigateur**. Elles ne sont pas
synchronisées entre plusieurs téléphones. Pensez à exporter/imprimer vos rapports
régulièrement (bouton **🖨 Imprimer** dans l'application) si vous voulez en
conserver une trace en dehors de l'appareil.

---

## Contenu du dossier

```
index.html              → l'application complète (une seule page)
manifest.json           → définit le nom, l'icône et le mode "application" pour Android
sw.js                    → service worker : mise en cache pour le mode hors ligne
icons/
  icon-48.png            → favicon
  icon-192.png            → icône d'application (standard)
  icon-512.png            → icône d'application (haute résolution)
  icon-512-maskable.png   → icône adaptative (fond plein, requis par Android)
  apple-touch-icon.png    → icône pour iOS/Safari (bonus)
```

---

## Si l'installation est refusée

- Ouvrez le lien dans **Chrome** (pas dans WhatsApp/Facebook/Samsung Internet).
- Sur le Menu de l'application, appuyez sur **« Vérifier l'installation »** : la liste
  indique ce qui manque (fichier absent, service worker inactif…).
- Vérifiez que ces adresses s'ouvrent (pas d'erreur 404) :
  `.../manifest.json`, `.../sw.js`, `.../icons/icon-192.png`, `.../icons/icon-512.png`
- Le dossier `icons/` doit être présent **à la racine** du dépôt, à côté de `index.html`.
- Après une mise à jour : fermez complètement l'app / rechargez la page deux fois.
