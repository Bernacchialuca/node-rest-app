# Proyecto final UNLaM

## Configuraciones

## Correr en local
1. docker run -p 5432:5432 --name unlampsql -e POSTGRES_DB=unlam -e POSTGRES_USER=unlam -e POSTGRES_PASSWORD=12345 -d postgres:16.2

2. Crear archivo de configuraciones
Crear un archivo `.env` copiando el archivo `.env.defaults` y reemplazar los valores por los que se quieran.

3. Instalar paquetes
```
npm install
```

4. Levantar
```
npm start
```

## Correr tests con Docker
## Run test with docker
```
docker build -t "testbuild" . && docker run --name database -e POSTGRES_USER=unlam -e POSTGRES_PASSWORD=12345 -e POSTGRES_DB=unlam -d postgres:16.2 && docker run --name=test --link=database:database --env-file .env.test testbuild npm run test; docker rm test; docker rm -f database;
```

