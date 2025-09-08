install:
	npm ci
	
build:
	npm run build & make -C frontend dev
	
start:
	npx start-server -s ./frontend/dist

start-frontend:
	make -C frontend dev