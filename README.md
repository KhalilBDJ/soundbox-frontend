# 🎵 Soundbox Frontend

Bienvenue dans **Soundbox**, une application web interactive permettant aux utilisateurs d'organiser, jouer et personnaliser leurs propres **boîtes à sons** !

Ce dépôt contient le **frontend Angular** du projet.  
Le backend (Java Spring) est disponible séparément: [**Ici**](https://github.com/KhalilBDJ/soundbox-backend)

---

## ✨ Fonctionnalités

- 🔐 Authentification sécurisée (connexion / inscription)
- 🧰 Espace personnel avec vos **soundboards**
- 🧩 Ajout et suppression de boutons sonores
- ⬆️ Upload de fichiers audio personnalisés

---


## 🚀 Stack technique

- **Framework** : [Angular](https://angular.io/)
- **Langage** : TypeScript
- **HTTP Client** : `HttpClientModule` pour communiquer avec l'API backend
- **Gestion des formulaires** : `ReactiveFormsModule`
- **Sécurité** : Authentification via JWT ou Cookies (selon la config backend)

---

## ⚙️ Installation

```bash
# 1. Cloner le dépôt
git clone git@github.com:KhalilBDJ/soundbox-frontend.git
cd soundbox-frontend

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur Angular
ng serve
