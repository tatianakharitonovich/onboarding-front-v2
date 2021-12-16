export default {
  hello: 'привет',
  label: '@.capitalize:hello.',
  greater: '@.capitalize:hello, {name}.',
  loading: 'Загрузка...',
  items: {
    title: '"Работы" с тестового сервера',
    counter: 'Нет работ | 1 работа | {count} работы | {count} работ',
  },
  meta: {
    index: {
      title: '',
      description: 'Добро пожаловать в компанию по разработке софта. Да пребудут с тобой новые технологии.',
    },
    items: {
      title: 'Работы',
      description: 'Даёшь современное искусство в блокчейн! NFT с нашего тестового сервера - здесь.',
    },
    docs: {
      title: 'README',
      description: 'Читать про vue, nuxt, vuex, чистую архитектуру, tailwind, scss и другие замысловатые вещи.',
    },
  },
  nav: {
    sandbox: 'Песочница',
    docs: 'README',
  },
  errors: {
    default: {
      title: 'Упс',
      description: 'Произошла непредвиденная ошибка. Но ты-то её предвидел, правда?',
    },
    notFound: {
      title: 'Не найдено',
      description: 'Такой страницы не существует. Зато существует много других!',
    },
  },
  themeSwitcher: {
    light: 'Сменить на светлую тему',
    dark: 'Перейти на тёмную сторону',
  },
}
