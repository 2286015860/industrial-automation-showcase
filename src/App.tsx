import { HashRouter } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { MotionProvider } from './features/motion/MotionProvider'

export default function App() {
  return (
    <HashRouter>
      <MotionProvider>
        <AppShell />
      </MotionProvider>
    </HashRouter>
  )
}

