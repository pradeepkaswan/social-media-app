import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../src/pages/home'
import Login from '../src/pages/login'
import Profile from '../src/pages/profile'
import { ThemeProvider } from './components/theme-provider'

function App() {
  return (
    <div className="app">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
