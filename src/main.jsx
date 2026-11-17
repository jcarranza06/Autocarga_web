import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { parsePath, pathFor } from './routes.js'
import { detectLanguage } from './i18n/detect.js'
import './index.css'

// Root URL "/" (or unknown path in dev) → go to /es/ or /en/ based on the browser
let path = window.location.pathname
if (!parsePath(path)) {
  path = pathFor('home', detectLanguage())
  window.history.replaceState(null, '', path + window.location.hash)
}

const container = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App initialPath={path} />
  </React.StrictMode>
)

// Built pages already contain the HTML (prerendered) → hydrate it.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
