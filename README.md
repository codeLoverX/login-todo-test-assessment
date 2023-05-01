# login-todo-test-assessment
MERN Stack Test  assessment 

## installation instructions

0. Type the following to clone the repo.

git clone https://github.com/codeLoverX/login-todo-test-assessment.git

1. Setup Mongodb Database

a. Use  your local MongoDB and switch it on, if you have MongoDB installed. Type:

docker compose -f "docker-compose.yml" up -d --build 

b. If you have a local running MongoDB, you can ignore this Docker step. Change the port and .env in api/.env file
at this line.

DB_CONNECTION=mongodb://localhost:27017/todos


2. Start frontend by typing:

cd ui \
npm install \
npm run dev

3. Start api by typing:

cd api \
npm install \
npm run dev

4. Enjoy at http://localhost:3000 ! Mongodb URL is given in api/.env file. You can change it, too.

DB_CONNECTION=mongodb://localhost:27017/todos

