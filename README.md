КАРОЧЕ
Каждая страничка называется +page.svelte
Страничку, которую хотите посмотреть, необходимо вытащить в корень routes
Потом как посмотрели, надо обратно запихнуть в папку, где взяли, и посмотреть другую страничку
Лучше каждый раз при новой страничке перезапускать сервер, тк иногда он некорректно отображается при замене файлов
Иногда при ненахождении всякой каки можно переустановить связи:
```
npm install
```
кароче как-то так, а дальше стандартная редмишка дэм


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

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
