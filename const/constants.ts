import {ArticleContentType, ArticleSchema} from "../database/models/ArticleSchema";

export const COOKIE_SETTINGS = {
  REFRESH_TOKEN: {
    httpOnly: true,
    maxAge: 1296e6  // 15 * 24 * 60 * 60 * 1000 (15 days)
  }
}
export const ACCESS_TOKEN_EXPIRATION = 18e5 // 1800 * 1000 (30 minutes)

export enum Currency {
  RUB = 'RUB',
  EUR = 'EUR',
  USD = 'USD',
  AED = 'AED',
  JPY = 'JPY',
}

export enum Country {
  RUSSIA = 'Russia',
  BELARUS = 'Belarus',
  KAZAKHSTAN = 'Kazakhstan',
  JAPAN = 'Japan',
  ARMENIA = 'Armenia',
  UAE = 'United Arab Emirates',
  UNITEDSTATES = 'United States',
}

export enum ArticleType {
  ALL = 'ALL',
  IT = 'IT',
  ECONOMY = 'Economy',
  BUSINESS = 'Business',
}

const testArticleContent: ArticleSchema = {
  "title": "Javascript news",
  "subtitle": "Что нового в JS за 2022 год?",
  "img": "https://teknotower.com/wp-content/uploads/2020/11/js.png",
  "user_id": 23,
  "type": [ArticleType.IT],
  "content": [
    {
      "type": ArticleContentType.TEXT,
      "title": "Заголовок этого блока",
      "paragraphs": [
        "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
        "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
        "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:"
      ]
    },
    {
      "type": ArticleContentType.CODE,
      "code": "<!DOCTYPE html>\n<html>\n  <body>\n    <p id=\"hello\"></p>\n\n    <script>\n      document.getElementById(\"hello\").innerHTML = \"Hello, world!\";\n    </script>\n  </body>\n</html>;"
    },
    {
      "type": ArticleContentType.TEXT,
      "title": "Заголовок этого блока",
      "paragraphs": [
        "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
        "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:"
      ]
    },
    {
      "type": ArticleContentType.IMAGE,
      "imageUrl": "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
      "imageCaption": "Рисунок 1 - скриншот сайта"
    },
    {
      "type": ArticleContentType.CODE,
      "code": "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);"
    },
    {
      "type": ArticleContentType.TEXT,
      "title": "Заголовок этого блока",
      "paragraphs": [
        "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
        "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:"
      ]
    },
    {
      "type": ArticleContentType.IMAGE,
      "imageUrl": "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
      "imageCaption": "Рисунок 1 - скриншот сайта"
    },
    {
      "type": ArticleContentType.TEXT,
      "title": "Заголовок этого блока",
      "paragraphs": [
        "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы."
      ]
    }
  ]
}

// {
//   "title": "Javascript для начинающих.",
//   "subtitle": "Обзор: Первые шаги в Javascript",
//   "img": "https://teknotower.com/wp-content/uploads/2020/11/js.png",
//   "user_id": 1,
//   "views":1002,
//   "type": ["IT"],
//   "content": [
//   {
//     "type": "TEXT",
//     "title": "Определение высокого уровня",
//     "paragraphs": [
//       "JavaScript это язык, который позволяет вам применять сложные вещи на web странице — каждый раз, когда на web странице происходит что-то большее, чем просто её статичное отображение — отображение периодически обновляемого контента, или интерактивных карт, или анимация 2D/3D графики, или прокрутка видео в проигрывателе, и т.д. — можете быть уверены, что скорее всего, не обошлось без JavaScript. Это третий слой слоёного пирога стандартных web технологий, два из которых (HTML и CSS) мы детально раскрыли в других частях учебного пособия."
//     ]
//   },
//   {
//     "type": "IMAGE",
//     "imageUrl": "https://developer.mozilla.org/ru/docs/Learn/JavaScript/First_steps/What_is_JavaScript/cake.png",
//     "imageCaption": "Рисунок 1 - пирог web технологий"
//   },
//   {
//     "type": "TEXT",
//     "paragraphs": [
//       "Три слоя прекрасно выстраиваются друг над другом. Для примера примера возьмём кнопку. Чтобы задать структуру, создадим разметку с помощью HTML:"
//     ]
//   },
//   {
//     "type": "CODE",
//     "code": "<button type=\"button\">Player 1: Chris</button>"
//   },
//   {
//     "type": "IMAGE",
//     "imageUrl": "https://developer.mozilla.org/ru/docs/Learn/JavaScript/First_steps/What_is_JavaScript/just-html.png",
//     "imageCaption": "Рисунок 2 - кнопка на сайте"
//   },
//   {
//     "type": "TEXT",
//     "paragraphs": [
//       "Затем добавим немного CSS, чтобы кнопка выглядела симпатичнее:"
//     ]
//   },
//   {
//     "type": "CODE",
//     "code": "button {\n\tfont-family: \"helvetica neue\", helvetica, sans-serif;\n\tletter-spacing: 1px;\n\ttext-transform: uppercase;\n\tborder: 2px solid rgb(200 200 0 / 0.6);\n\tbackground-color: rgb(0 217 217 / 0.6);\n\tcolor: rgb(100 0 0 / 1);\n\tbox-shadow: 1px 1px 2px rgb(0 0 200 / 0.4);\n\tborder-radius: 10px;\n\tpadding: 3px 10px;\n\tcursor: pointer;\n}"
//   },
//   {
//     "type": "IMAGE",
//     "imageUrl": "https://developer.mozilla.org/ru/docs/Learn/JavaScript/First_steps/What_is_JavaScript/html-and-css.png",
//     "imageCaption": "Рисунок 3 - стили кнопки"
//   },
//   {
//     "type": "TEXT",
//     "paragraphs": [
//       "И наконец добавим немного JavaScript для реализации динамического поведения:"
//     ]
//   },
//   {
//     "type": "CODE",
//     "code": "const button = document.querySelector(\"button\");\n\nbutton.addEventListener(\"click\", updateName);\n\nfunction updateName() {\n\tconst name = prompt(\"Enter a new name\");\n\tbutton.textContent = `Player 1: ${name}`;\n}"
//   }
// ]
// }
