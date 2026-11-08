# Верстка макета

Стартовый шаблон задания по верстке макета для курса ABanking Education.

## Задание

Сверстайте страницу по [макету в Figma](https://www.figma.com/design/jFj70BijeNOjaCI9N6wZZf/For-univrseity-course-landing?t=B5TJdOBXNCjwrBQ2-1). Начните с форка этого репозитория и вносите изменения в файлы `src/`.

## Локальный запуск

Нужны Node.js и npm. Установите зависимости и запустите dev-сервер:

```bash
npm install
npm start
```

## Сборка

```bash
npm run build
```

## Что отправить на платформу

Загрузите файл `solution.js` с экспортированной функцией `answer`, возвращающей ссылку на ваш форк. Замените `YOUR_GITHUB_LOGIN` на свой логин GitHub:

```js
export const answer = () => {
  return 'https://github.com/birusvox/Abanking-education-html';
};
```