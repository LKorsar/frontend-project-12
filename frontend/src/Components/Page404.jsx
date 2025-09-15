import 'bootstrap/dist/css/bootstrap.min.css'
import { useTranslation } from 'react-i18next'

const Page404 = () => {
  const { t } = useTranslation()
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
            </div>
          </nav>
          <div className="text-center">
            <img alt="Страница не найдена" className="image-fluid h-25" src="/src/assets/404.jpg"></img>
            <h1 className="h-4 text-muted">{t('page404.header')}</h1>
            <p className="text-muted">
              {t('page404.text')}
              <a href="/">{t('page404.linkText')}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page404
