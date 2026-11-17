import { useLang } from '../i18n/LanguageContext.jsx'
import { pathFor } from '../routes.js'

// A real <a href> (crawlable by Google) that navigates without reloading.
export default function Link({ page, section, lang: langProp, onNavigate, children, ...rest }) {
  const { lang, navigate } = useLang()
  const targetLang = langProp ?? lang
  const href = pathFor(page, targetLang) + (section ? `#${section}` : '')

  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return // let new-tab clicks through
    e.preventDefault()
    onNavigate?.()
    navigate(page, section, targetLang)
  }

  return <a href={href} onClick={onClick} {...rest}>{children}</a>
}
