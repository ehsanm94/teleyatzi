# TeleYatzy Mini App
This Repository houses a fully functional [Telegram Mini APP](https://core.telegram.org/bots/webapps) example with development and deployment instructions.

## Table of contents
- [Overview](#overview)
- [Development](#development)
  - [Directory structure](#directory-structure)
  - [Requirenments](#development-requirenments)
  - [Essential packages](#essentail-packages)
  - [Develop whitin devcontainer](#develop-within-devcontainer)
  - [Install Dependencies](#install-dependencies)
- [Deployment](#deployment)

### Overview
With Mini Apps developers can use JavaScript to create infinitely flexible interfaces that can be launched right inside Telegram — and can completely replace any website. [read more >>](#https://core.telegram.org/bots/webapps)

In this repository we are going to implement a simple but functional Telegram Mini App to play [Yatzy](https://en.wikipedia.org/wiki/Yatzy).

Keep reading to get familiar with repository directory structure, and development and deployments instructions.

### Development

#### Directory structure
- `.devcontainer`: configs for dev container environment
- `public`: contains web app interface
  - `css`: contains web app stylesheets
  - `js`: contains js logic of web app
  - `images`: images folder
  - `index.html`: web app interface HTML file.
- `src`: web app and bot server-side
  - `bot`: telegram bot logic
  - `db`: contains logic for redis connection
  - `express`: contains express-related logic
    - `controllers`: web app controllers logic
    - `middlewares`: web app APIs middlewares
    - `routes`: web app routes
    - `helpers.js`: controllers-related helpers
    - `index.js`: express server
  - `game`: game logic (Yatzy)
  - `models`: contains db queries
- `tests`: project unit tests
- `.env`: environment variable file (you should create this)
- `.env.example`: environment variable example file
- `.eslintrc`: eslint rules
- `config`: config file (its values are set via environment variable)
- `docker-compose.yml`
- `Dockerfile`
- `index.js`: project entrypoint
- `ngrok.js`: logic for starting an ngrok tunnel
- `package.json`
- `package-lock.json`

#### Requirenments
- [Nodejs](https://nodejs.org/en) runtime.
- `npm` package manager.
- [Redis](https://redis.io) as database.
- Telegram bot token: Use [@BotFather](https://t.me/botfather) to obtain your bot token. [>> tutorial](https://core.telegram.org/bots/tutorial#obtain-your-bot-token)
- [Ngrok](https://ngrok.com/) authentication token: We will use it to creating a secure https tunnel to communicate with telegram bot and web app in dev environment. Just signup and get your token.
- [jQuery](https://jquery.com/) and [bootstrap](https://getbootstrap.com/) for developing web app interface.

#### Essential packages
- [express](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework for Node.js.
- [telegraf](https://github.com/telegraf/telegraf): Modern Telegram Bot API framework for Node.js
- [ioredis](https://github.com/redis/ioredis): A robust, performance-focused and full-featured Redis client for Node.js.
- [ngrok](https://github.com/bubenshchykov/ngrok): Node.js wrapper for the ngrok client.

#### Develop within devcontainer
If you have Docker installed and VS code, install [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) VS code extension. By this you will be able to run and open devcontainer of this repository.

#### Install dependencies
Install dependencies by running 

```bash
npm install
```

then copy `.env.example` and rename it to `.env`;

```bash
cp .env.example .env
```

set your proper environment variables then if you want to use ngrok tunnel run it first;

```bash
npm run ngrok
```

set the tunnel address as `BOT_WEBHOOK_DOMAIN` and `WEB_APP_URL`, and then start the project;

```bash
npm start
```

If you want to use an HTTP proxy for communicating to telegram, set the `GLOBAL_AGENT_HTTP_PROXY` environment variable and the start project as bellow;

```bash
npm run proxified
```

In dev environment you can run tests by;

```bash
npm test
```


### Deployment

Run it By (installing dependencies)[#install-dependencies] or just Clone the repo, set the environment variables, move to project root and run 

```bash
docker compose up -d
```

Stop it by

```bash
docker compose down
```
