# login-todo-test-assessment
MERN Stack Test  assessment 

## installation instructions

0. Type the following to clone the repo.

git clone https://github.com/codeLoverX/login-todo-test-assessment.git

1. Setup Mongodb Database

a. Use  the docker containerized MongoDB and switch it on, if you don't have MongoDB installed. Type:

docker compose -f "docker-compose.yml" up -d --build 

b. If you have a local running MongoDB, you can ignore this Docker step. Change the port as needed, by going to the .env in api/.env file
and edit the port (and url) at this line.

DB_CONNECTION=mongodb://localhost:27017/todos


2. Start frontend by typing:

cd ui \
npm install \
npm run dev

3. Start api by typing:

cd api \
npm install \
npm run dev

4. View at http://localhost:3000 !

