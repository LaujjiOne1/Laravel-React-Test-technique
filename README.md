# Biloki - Système de Gestion de Produits et Stocks

## 📋 Vue d'ensemble

Biloki est une application Full-Stack moderne pour la gestion de produits et de stocks, construite avec **Laravel 11**, **React.js avec Vite**, **Docker** et **Jenkins**. Elle offre un panel administrateur sécurisé pour gérer l'inventaire.

## 🏗️ Architecture

```
├── backend/              # API Laravel 11 (PHP 8.2)
├── frontend/             # SPA React + Vite + Tailwind CSS
├── docker-compose.yml    # Orchestration des conteneurs
├── Jenkinsfile           # Pipeline CI/CD
└── README.md            # Cette documentation
```

## 🚀 Démarrage rapide

### Prérequis
- Docker & Docker Compose
- Git

### Installation et lancement

1. **Cloner le projet**
   ```bash
   git clone https://github.com/LaujjiOne1/Laravel-React-Test-technique.git
   cd Laravel-React-Test-technique
   ```

2. **Lancer l'application complète**
   ```bash
   docker-compose up --build
   ```

3. **Accéder aux services**
   - Frontend (Admin Panel): http://localhost:3000
   - Backend API: http://localhost:8000
   - Adminer (Gestion DB): http://localhost:8080 (optional)

### Données de test

L'application inclut un seeder qui crée automatiquement :
- **Admin par défaut** : `admin@biloki.test` / `password`
- **Produits de test** : 5 produits avec variations de stocks

## 📚 Documentation détaillée

### Backend - API Laravel

#### Authentification
```http
POST /api/login
Content-Type: application/json

{
  "email": "admin@biloki.test",
  "password": "password"
}

Response:
{
  "token": "your-sanctum-token",
  "user": { "id": 1, "name": "Admin", "email": "admin@biloki.test" }
}
```

#### Routes protégées (Authentifié)
```http
Authorization: Bearer {token}
```

**Utilisateur**
- `GET /api/user` - Récupère le profil de l'administrateur connecté
- `POST /api/logout` - Déconnexion

**Produits**
- `GET /api/products` - Liste tous les produits
- `POST /api/products` - Créer un produit
- `GET /api/products/{id}` - Détail d'un produit
- `PUT /api/products/{id}` - Modifier un produit
- `DELETE /api/products/{id}` - Supprimer un produit

**Stocks**
- `GET /api/stocks` - Liste tous les stocks
- `POST /api/stocks` - Créer une entrée de stock
- `GET /api/stocks/{id}` - Détail d'un stock
- `PUT /api/stocks/{id}` - Modifier un stock
- `DELETE /api/stocks/{id}` - Supprimer une entrée de stock

### Frontend - Application React

#### Pages
- **Login** : Formulaire d'authentification
- **Dashboard** : Vue d'ensemble avec statistiques (produits totaux, alertes stocks bas)
- **Products** : Gestion complète des produits (CRUD)
- **Stocks** : Gestion des variations de stocks par localisation

#### Fonctionnalités
- Authentification sécurisée avec token JWT (Sanctum)
- Interface responsive avec Tailwind CSS
- Modales pour l'ajout/modification
- Validations côté client et serveur
- Gestion des erreurs utilisateur

## 🐳 Docker Compose

### Services

**Database (MySQL 8.0)**
- Port: `3306`
- Volume persistant: `./data/mysql`
- Variables: `MYSQL_DATABASE=biloki`, `MYSQL_ROOT_PASSWORD=root`

**Backend (Laravel 11)**
- Port: `8000`
- Volume: `./backend` (live reload en développement)
- Prérequis: Les migrations s'exécutent automatiquement au démarrage

**Frontend (React + Nginx)**
- Port: `3000`
- Volume: `./frontend/dist` (serveur statique)
- Configuration: Nginx avec fallback sur index.html pour le routing React

## 🔄 Pipeline Jenkins

Le `Jenkinsfile` automatise :

1. **Checkout** : Récupération du code
2. **Backend Setup & Tests** :
   - Installation Composer
   - Migrations et seeders
   - Tests unitaires (`php artisan test`)
3. **Frontend Build** :
   - Installation npm
   - Build Vite
4. **Docker Build** : Construction des images
5. **Deploy** : Lancement via `docker-compose up -d --build`

## 📊 Modèles de données

### User (Administrateur)
```sql
id, name, email, password (hashed), email_verified_at, created_at, updated_at
```

### Product
```sql
id, name, description, price (decimal), sku (unique), created_at, updated_at
```

### Stock
```sql
id, product_id (FK), quantite (int), emplacement (string), created_at, updated_at
```

## 🛠️ Commandes utiles

```bash
# Démarrer l'application
docker-compose up --build

# Arrêter l'application
docker-compose down

# Consulter les logs
docker-compose logs -f

# Accéder au shell du backend
docker-compose exec backend bash

# Accéder au shell MySQL
docker-compose exec db mysql -u root -proot -D biloki

# Exécuter les tests Laravel
docker-compose exec backend php artisan test

# Réinitialiser la base de données
docker-compose exec backend php artisan migrate:refresh --seed
```

## 📝 Variables d'environnement

### Backend (.env)
```
APP_NAME=Biloki
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=biloki
DB_USERNAME=root
DB_PASSWORD=root

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SESSION_DRIVER=cookie
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## 🔒 Sécurité

- Authentification JWT avec Laravel Sanctum
- CORS configuré pour localhost:3000
- Validation des requêtes côté serveur
- Mots de passe hashés (bcrypt)
- Token révocation au logout

## 📄 Licence

Ce projet est fourni à titre de test technique.

## 👨‍💻 Support

Pour toute question ou problème, consultez la documentation des technologies utilisées:
- [Laravel 11](https://laravel.com/docs/11.x)
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Docker](https://www.docker.com)
