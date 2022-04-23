import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Route, Routes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import RequireAuth from './pages/auth/RequireAuth'
import NotFound from './pages/NotFound'
import auth_routes from './routes/auth_routes'
import protected_routes from './routes/protected_routes'

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <Routes>
          <Route path='/' element={<App />}>
            {auth_routes.map((route, i) => {
              return <Route key={i} path={route.path} element={route.component} />
            })}
            {protected_routes.map((route, i) => {
              return <Route key={i} path={route.path} element={<RequireAuth>{route.component}</RequireAuth>} />
            })}
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </StaticRouter>
    </React.StrictMode>
  )
}
