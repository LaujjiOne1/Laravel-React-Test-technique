# === Étape 1 : Build de l'application ===
FROM node:20-alpine AS build

WORKDIR /app

# Copie uniquement les fichiers de configuration pour maximiser la mise en cache des couches Docker
COPY package*.json ./

# Installation propre des dépendances de production et développement
RUN npm install

# Copie le reste du code source de l'application frontend
COPY . .

# Compile l'application pour la production (génère le dossier /app/dist)
RUN npm run build

# === Étape 2 : Serveur de production Nginx ===
FROM nginx:stable-alpine

# Copie les fichiers compilés de l'étape précédente vers le dossier par défaut de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copie une configuration personnalisée pour Nginx (gérant le fallback de l'index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose le port standard HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
