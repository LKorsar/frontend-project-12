install:
	npm ci
	
build:
	rm -rf frontend/dist
	npm run build
	
start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend

start-frontend:
	make -C frontend dev

develop:
	make start-backend & make start-frontend

lint-frontend:
	make -C frontend lint