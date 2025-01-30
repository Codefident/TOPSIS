# Użyj obrazu z Node.js
FROM node:22

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki zależności projektu
COPY package.json package-lock.json ./

# Skopiuj katalog public i src
# COPY public ./public
# COPY src ./src


# Zainstaluj zależności i zbuduj aplikację
RUN npm install

COPY . ./

RUN npm run build

# Serwer Nginx do serwowania plików
FROM nginx:alpine

# Skopiuj zbudowane pliki Reacta do katalogu serwera Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Otwórz port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
