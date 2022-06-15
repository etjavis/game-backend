## Dok
https://www.youtube.com/watch?v=GHTA143_b-s&t=462s

## Neues Modul erstellen
nest g module user

## Interfaces für die models
docker-compose exec game-backend npx prisma generate

## Neues unique Feld Mongo
docker-compose exec game-backend npx prisma db push
