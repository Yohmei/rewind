import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'
import RequireAuth from './pages/auth/RequireAuth'
import NotFound from './pages/NotFound'
import auth_routes from './routes/auth_routes'
import protected_routes from './routes/protected_routes'

const container = document.getElementById('root')

if (container) {
  const curtain = document.querySelector('#curtain') as HTMLElement
  curtain.style.backgroundColor = 'transparent'

  setTimeout(() => {
    curtain?.remove()
  }, 300)

  ReactDOM.hydrate(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <RequireAuth>
                <App />
              </RequireAuth>
            }
          >
            {auth_routes.map((route, i) => {
              return <Route key={i} path={route.path} element={route.component} />
            })}
            {protected_routes.map((route, i) => {
              return <Route key={i} path={route.path} element={route.component} />
            })}
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
    container
  )
}
