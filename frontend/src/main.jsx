import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import io from 'socket.io-client'
import init from './init.jsx'

const run = async () => {
  const socket = io('http://localhost:5001', { transports: ['websocket'] })
  const app = await init(socket)
  createRoot(document.getElementById('root')).render(
    <StrictMode>
     {app}
    </StrictMode>,
  )
}

run()
