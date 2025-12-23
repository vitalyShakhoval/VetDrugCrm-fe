# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Backend + Auth

Проект подготовлен под подключение бэкенда через `fetch` + Bearer токен.

1) Создайте `.env` (можно оттолкнуться от `.env.example`) и укажите URL API:

```sh
VITE_API_BASE_URL=http://localhost:8080
```

2) По умолчанию ожидаются эндпоинты:

- `POST /auth/login`  `{ email, password }` -> `{ accessToken, refreshToken?, user:{id?, email, role} }`
- `POST /auth/register` `{ email, password }`
- `POST /auth/verify` `{ email, code }` -> (как login)
- `POST /auth/resend` `{ email }`
- `POST /auth/refresh` `{ refreshToken }` -> `{ accessToken, refreshToken? }`

Если у вас другие пути — поменяйте их в `src/lib/api/config.ts`.

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
