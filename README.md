## Dok
https://www.youtube.com/watch?v=GHTA143_b-s&t=462s


## Container öffnen
docker-compose exec -it backend //bin//sh

## Interfaces für die models
docker-compose exec backend npx prisma generate

## Neues unique Feld Mongo
docker-compose exec backend npx prisma db push



## Neues Modul erstellen
npx @nestjs/cli g module user

## Neuen Service erstellen
npx @nestjs/cli g service user --no-spec
