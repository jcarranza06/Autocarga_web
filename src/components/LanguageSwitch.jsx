import { useLang } from '../i18n/LanguageContext.jsx'
import { LANGS } from '../routes.js'
import Link from './Link.jsx'

// Links to the same page in the other language (crawlable, with hreflang)
export default function LanguageSwitch({ onNavigate }) {
  const { lang, page, t } = useLang()
  return (
    <div className="lang-switch" role="group" aria-label={t.nav.language}>
      {LANGS.map((code) => (
        <Link
          key={code}
          page={page}
          lang={code}
          hrefLang={code}
          className={lang === code ? 'is-active' : ''}
          aria-current={lang === code ? 'true' : undefined}
          onNavigate={onNavigate}
        >
          {code.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
