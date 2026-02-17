Я сам не знаю и никогда не деплоил но интернет что-то такое говорит...

Настройка проекта для Vercel
Vercel автоматически определяет Svelte проекты, но для уверенности проверьте:

Для Svelte (Vite): в package.json должны быть скрипты:
```sh
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

svelte.config.js:
```sh
import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter: adapter()
  }
};
```

Деплой через Vercel Dashboard
Перейдите на vercel.com
Нажмите "Add New..." → "Project"
Импортируйте ваш Git репозиторий
Vercel автоматически определит настройки:
Framework Preset: Svelte (или SvelteKit)
Build Command: npm run build или vite build
Output Directory: dist (для Svelte) или build (для SvelteKit)
Добавьте переменные окружения (если нужны)
Нажмите "Deploy"

Каждый push в основную ветку будет автоматически деплоить новую версию.
