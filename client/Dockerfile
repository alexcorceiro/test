# Choisissez une image de base avec Node.js
FROM node:14

# Installer expo-cli globalement
RUN npm install -g expo-cli

# Installer Git
RUN apt-get update && apt-get install -y git

# Créer un répertoire pour l'application
WORKDIR /usr/src/app

# Cloner le dépôt Git
RUN git clone https://github.com/SpeedySpy/microservicesDocker.git .

# Installer les dépendances
RUN npm install

# Exposer le port pour Expo
EXPOSE 19000


# Lancer l'application avec Expo
CMD [ "npx", "expo", "start" ]
