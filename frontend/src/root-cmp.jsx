import './assets/css/main.css'

import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'

import { AppHeader } from './cmps/app-header'
// import { UserMsg } from './cmps/user-msg'
import { HomePage } from './pages/home-page'
import { AboutUs } from './pages/about-us'
import { ToyIndex } from './pages/toy-index'
import { ToyEdit } from './pages/toy-edit'
import { ToyDetails } from './pages/toy-details'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>

  )
}