/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import bikeMap from '../../assets/images/bike_titulo.png'

import 'react-calendar/dist/Calendar.css'

import './pedal.scss'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'

import { CodePollModal } from '../../components/modals/codePollModal/CodePollModal'
import { PathModal } from '../../components/modals/pathModal/pathModal'
import { getPaths, postPoll } from '../../services/apiService'

export function Pedal() {
  const { user } = useAuth()

  const formatter = new Intl.DateTimeFormat('pt-BR')

  const [paths, setPaths] = useState([])
  const [dateState, setDateState] = useState(new Date())
  const [timeState, setTimeState] = useState('00:00')
  const [selectedPaths, setSelectedPaths] = useState([])
  const [selectedPath, setSelectedPath] = useState('')
  const [poll, setPoll] = useState('')
  const [isNewModalPollOpen, setIsNewModalPollOpen] = useState(false)
  const [isNewModalPathOpen, setIsNewModalPathOpen] = useState(false)
  const [pathToDisplay, setPathToDisplay] = useState('')

  useEffect(async () => {
    const result = await getPaths()
    setPaths(result.data)
  }, [])

  function handleOpenModalPoll() {
    setIsNewModalPollOpen(true)
  }

  function handleCloseModalPoll() {
    setIsNewModalPollOpen(false)
  }

  function handleOpenPathModal() {
    setIsNewModalPathOpen(true)
  }

  function handleClosePathModal() {
    setIsNewModalPathOpen(false)
  }

  const changeDate = (e) => {
    setDateState(e)
  }

  const handleSetTime = (event) => {
    setTimeState(event.currentTarget.value)
  }

  const handleInputChange = (event) => {
    const target = event.currentTarget

    const newPath = paths.find((path) => path._id === target.value)

    const result = selectedPaths.filter((item) => item._id === newPath._id)

    if (result.length !== 0) {
      // eslint-disable-next-line no-alert
      alert('Você já selecionou esse trajeto!')
      return
    }

    setSelectedPath(newPath)

    // eslint-disable-next-line no-unused-expressions
    selectedPaths.length < 3
      ? setSelectedPaths([...selectedPaths, newPath])
      : // eslint-disable-next-line no-alert
        alert('Você já selecionou 3 trajetos')

    setSelectedPath('')
  }

  const handleReset = () => {
    setSelectedPaths([])
    setSelectedPath('')
  }

  const handleShowSelectModal = (id) => {
    setPathToDisplay(selectedPaths.find((path) => id === path._id))
    handleOpenPathModal()
  }

  const handleInitPoll = async () => {
    if (selectedPaths.length < 3 || !dateState) {
      // eslint-disable-next-line no-alert
      alert('Por favor, selecione uma data e 3 trajetos')
      return
    }

    setPoll({ dateState, timeState, selectedPaths })

    const result = await postPoll(poll)
    setPoll(result.data)

    if (result.status === 201) {
      handleOpenModalPoll()
      handleReset()
    }
  }

  return (
    <div className='pedal'>
      <aside>
        <div className='dateTime'>
          <h1>Selecione a data:</h1>
          <Calendar
            className='calendar'
            value={dateState}
            minDate={new Date()}
            onChange={changeDate}
          />
          <h1>Selecione a hora:</h1>
          <input
            type='time'
            className='inputTimeSelector'
            value={timeState}
            onChange={handleSetTime}
          />
        </div>
        <div className='selectPaths'>
          <h1>Escolha até 3 Trajetos</h1>

          <select
            onChange={handleInputChange}
            value={selectedPath}
            className='inputSelectPaths'
          >
            <option value='' disabled>
              Escolha os Trajetos
            </option>
            {paths.map((path) => (
              <option key={path._id} value={path._id}>
                {path.title}
              </option>
            ))}
          </select>
          <Button className='button' onClick={handleReset}>
            Reiniciar
          </Button>
        </div>
      </aside>
      <main>
        <div className='userData'>
          <img src={user.avatar} alt='Foto do Usuário' />
          <p>{user.name}</p>
        </div>
        <div className='title'>
          <img src={bikeMap} alt='Bike com um mapa' />
          <h1>Novo Pedal</h1>
        </div>
        <div className='info'>
          <strong>
            Data: {formatter.format(dateState)} - {timeState}
          </strong>

          <h1>Trajetos</h1>

          <div className='routes'>
            {selectedPaths.map((path) => (
              <div key={path._id} className='route'>
                <Button onClick={() => handleShowSelectModal(path._id)}>
                  <img src={path.routeImg} alt='Imagem do trajeto' />
                </Button>
                <strong>
                  {path.title}
                  <p>Clique na imagem para mais informações sobre o trajeto</p>
                </strong>
              </div>
            ))}
          </div>
          <Button className='newPedal green' onClick={handleInitPoll}>
            <p> Iniciar uma nova votação</p>
          </Button>
        </div>
      </main>
      <CodePollModal
        show={isNewModalPollOpen}
        code={poll._id}
        onRequestClose={handleCloseModalPoll}
      />
      <PathModal
        show={isNewModalPathOpen}
        path={pathToDisplay}
        onRequestClose={handleClosePathModal}
      />
    </div>
  )
}
