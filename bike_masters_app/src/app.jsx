import React from 'react'
import { AuthContextProvider } from './contexts/authContext'

import './styles/global.scss'

import CustomRoutes from './routes/customRoutes'

export default function App() {
  return (
    <AuthContextProvider>
      <CustomRoutes />
    </AuthContextProvider>
  )
}
