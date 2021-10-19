/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './home.scss'
import Button from '../../components/Button'

import { useAuth } from '../../hooks/useAuth'
import bikeLogo from '../../assets/images/bike_logo.png'
import bikeMap from '../../assets/images/bike_titulo.png'
import googleLogo from '../../assets/images/google.png'
import mapLogo from '../../assets/images/map.png'
import { getPoll } from '../../services/apiService'

export function Home() {
  const history = useHistory()
  const [logged, setLogged] = useState(false)
  const { user, signInWithGoogle } = useAuth()
  const [idPoll, setIdPoll] = useState('')

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    !user ? setLogged(false) : setLogged(true)
  }, [user])

  const handleSignIn = async () => {
    await signInWithGoogle()
  }

  const handleCreatePedal = () => {
    history.push('/new_pedal')
  }

  const handleVote = async () => {
    const result = await getPoll(idPoll)
    const poll = result.data

    localStorage.setItem('poll', JSON.stringify(poll))

    poll._id === idPoll
      ? history.push(`/vote/${idPoll}`)
      : // eslint-disable-next-line no-alert
        alert('Votação não localizada')
  }

  const handleInputIdPollChange = (event) => {
    const { value } = event.currentTarget
    setIdPoll(value)
  }

  return (
    <div className='home'>
      <aside>
        <img src={bikeLogo} alt='Bike logo' />
        <h1>Aqui começa sua próxima aventura</h1>
      </aside>
      <main>
        <div className='login'>
          {!logged ? (
            <>
              <Button className='login' onClick={handleSignIn}>
                <img src={googleLogo} alt='Logo do Google' />
                <p>Entre com a sua conta do Google</p>
              </Button>
            </>
          ) : (
            <>
              <div className='userData'>
                <img src={user.avatar} alt='Foto do Usuário' />
                <p>{user.name}</p>
              </div>
              <div className='title'>
                <img src={bikeMap} alt='Bike com um mapa' />
                <h1>Bike Masters</h1>
              </div>
              <Button className='newPedal green' onClick={handleCreatePedal}>
                <img src={mapLogo} alt='Logo do Google' />
                <p> Criar um novo pedal</p>
              </Button>

              <div className='separator'>Ou entre em um para votar</div>

              <input
                className='insertCode'
                type='text'
                placeholder='Digite o código para votar'
                onChange={handleInputIdPollChange}
                value={idPoll}
              />

              <Button className='getOn red' onClick={handleVote}>
                <p>Entrar na sala</p>
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
