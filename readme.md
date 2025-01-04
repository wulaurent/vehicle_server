# Documentation de l'outil CLI `vehicle-server`

## Description
Cet outil en ligne de commande (CLI), développé en TypeScript, permet d'interagir avec un serveur `vehicle-server` via des requêtes HTTP pour effectuer les opérations suivantes :
- **Créer un véhicule** : Envoie une requête pour créer un véhicule et affiche les erreurs renvoyées par le serveur si la création échoue.
- **Lister les véhicules** : Récupère et affiche les véhicules existants sur le serveur dans un format lisible.
- **Supprimer un véhicule** : Supprime un véhicule à partir de son ID.

Le CLI accepte une option pour indiquer l'adresse du serveur à utiliser (par défaut sur le port 8080).

---

## Prérequis
1. **Node.js** : Installez [Node.js](https://nodejs.org/) (v20+ recommandé).
2. **TypeScript** : Assurez-vous que TypeScript est configuré dans le projet.
3. **Dépendances** : Les bibliothèques nécessaires sont gérées via `npm`.
4. **Docker et Docker Compose** : Assurez-vous que Docker et Docker compose sont installés et configurés sur votre machine.
5. **Port** : Assurez-vous que le port **5434** n'est pas déjà utilisé sur votre machine locale.

## Installation en locale

### 1. Cloner le projet
Clonez le dépôt Git :
```bash
git clone https://github.com/wulaurent/vehicle_server.git
cd vehicle_server
```

### 2. Installer les dépendances
Installez les dépendances du `package.json` :
```bash
npm install
```
### 3. Compiler le code TypeScript
Compilez le code TypeScript en JavaScript :

```bash
npm run build
```

### 4. Créer un lien symbolique pour la CLI
Exécutez la commande suivante pour créer un lien symbolique global pour votre CLI avec npm :
```bash
npm link
```

### 5. Exécuter la base de données
Démarrez la base de données PostgreSQL avec PostGIS :
```bash
npm run start-db
```

### 6. Lancer le serveur 
Démarrez le serveur Express, qui s'exécute par défaut sur le port **8080** :
```bash
npm run start
```

Si vous souhaitez démarrer le serveur sur un port différent, vous pouvez spécifier le port directement après la commande npm run start
```bash
npm run start <port>
```

Par exemple, pour lancer le serveur sur le port 3000 :
```bash
npm run start 3000
```

## Installation avec Docker

### 1. Cloner le projet
Clonez le dépôt Git :
```bash
git clone https://github.com/wulaurent/vehicle_server.git
cd vehicle_server
```

### 2. Construire les images Docker
Utilisez Docker Compose pour construire les images nécessaires à l'application (serveur et base de données) :
```bash
docker-compose build
```

### 3. Démarrer le serveur
Lancez les conteneurs définis dans le fichier `docker-compose.yml` :
```bash
docker-compose up
```

## Utilisation

### Lancer l'outil en local
Une fois le serveur lancés en local, dans un nouveau terminal, vous pouvez exécuter la CLI en utilisant les commandes suivantes

1. Créer un véhicule :
```bash
vehicle-cli --address=localhost:8080 create-vehicle --shortcode=abcd --battery=12 --longitude=20.0 --latitude=30.0
```


2. Lister les véhicules :
```bash
vehicle-cli --address=localhost:8080 list-vehicles
```

3. Supprimer un véhicule :
```bash
vehicle-cli --address=localhost:8080 delete-vehicle --id <id_du_vehicule>
```

### Lancer l'outil via Docker
Une fois les conteneurs démarrés, vous pouvez exécuter la CLI en utilisant les commandes suivantes

1. Créer un véhicule :
```bash
docker exec -it vehicle_server-vehicle-server-1 vehicle-cli --address=localhost:8080 create-vehicle --shortcode=abcd --battery=12 --longitude=20.0 --latitude=30.0
```

2. Lister les véhicules :
```bash
docker exec -it vehicle_server-vehicle-server-1 vehicle-cli --address=localhost:8080 list-vehicles
```

3. Supprimer un véhicule :
```bash
docker exec -it vehicle_server-vehicle-server-1 vehicle-cli --address=localhost:8080 delete-vehicle --id <id_du_vehicule>
```

## Contributeurs
- **[Laurent WU](https://github.com/wulaurent)**
- **[Jiongru XIE](https://github.com/xiejiongru)**