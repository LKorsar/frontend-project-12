install:
	npm ci
	
build:
	npm run build
	
start-backend:
	npx start-server -s ./frontend/dist

start-frontend:
	make -C frontend start