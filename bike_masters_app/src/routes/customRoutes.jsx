import React from 'react'
import { Switch, Route, useHistory, BrowserRouter } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Home } from '../pages/Home'
import { Pedal } from '../pages/Pedal'
import { Vote } from '../pages/Vote'

// eslint-disable-next-line react/prop-types
function AppRoute({ isPrivate, ...props }) {
  const { user } = useAuth()
  const history = useHistory()

  if (!user && isPrivate) {
    history.push('/')
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} />
}

export default function CustomRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <AppRoute path='/' exact component={Home} />
        <AppRoute path='/new_pedal' exact isPrivate component={Pedal} />
        <AppRoute path='/vote/:id' exact isPrivate component={Vote} />
      </Switch>
    </BrowserRouter>
  )
}
