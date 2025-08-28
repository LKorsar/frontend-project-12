export default {
  translation: {
    navBar: 'Hexlet Chat',
    loginForm: {
      header: 'Войти',
      usernameInput: 'Ваш ник',
      passwordInput: 'Пароль',
      submitBtn: 'Войти',
      noAccount: 'Нет аккаунта? ',
      registration: 'Регистрация',
      errors: {
        authErr: 'Неверные имя пользователя или пароль',
      },
    },
    signupForm: {
      header: 'Регистрация',
      usernameInput: 'Имя пользователя',
      passwordInput: 'Пароль',
      confirmPassInput: 'Подтвердите пароль',
      submitBtn: 'Регистрация',
      errors: {
        username: {
          required: 'Обязательное поле',
          min: 'От 3 до 20 символов',
          max: 'От 3 до 20 символов',
        },
        password: {
          required: 'Обязательное поле',
          min: 'Не менее 6 символов',
        },
        confirmPass: {
          required: 'Обязательное поле',
          oneOf: 'Пароли должны совпадать',
        },
        regErr: 'Такой пользователь уже существует',
      },
    },
    channels: {
      channels: 'Каналы',
      removeBtn: 'Удалить',
      editBtn: 'Переименовать',
    },
    messages: {
      oneMessage: '{{ count }} сообщение',
      fewMessages: '{{ count }} сообщения',
      manyMessages: '{{ count }} сообщений',
      input: 'Введите сообщение...',
    },
    logoutBtn: 'Выйти',
    modals: {
      add: {
        header: 'Добавить канал',
        cancelBtn: 'Отменить',
        submitBtn: 'Отправить',
      },
      edit: {
        header: 'Переименовать канал',
        cancelBtn: 'Отменить',
        submitBtn: 'Отправить',
      },
      remove: {
        header: 'Удалить канал',
        question: 'Уверены?',
        cancelBtn: 'Отменить',
        submitBtn: 'Удалить',
      },
    },
  },
};