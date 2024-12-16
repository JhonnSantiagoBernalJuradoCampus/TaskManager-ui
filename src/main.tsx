import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TaskManager from './components/TaskManager'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="container">
      <TaskManager />
    </main>
  </StrictMode>,
)
