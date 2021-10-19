/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react'
import './vote.scss'

import bike from '../../assets/images/bike_titulo.png'
import check from '../../assets/images/check.png'

import { useAuth } from '../../hooks/useAuth'
import { PathModal } from '../../components/modals/pathModal/pathModal'
import Button from '../../components/Button'

export function Vote() {
  const [isNewModalPathOpen, setIsNewModalPathOpen] = useState(false)
  const [pathToDisplay, setPathToDisplay] = useState('')
  const [vote, setVote] = useState('')
  const [pollOpen, setPollOpen] = useState(false)
  const [poll, setPoll] = useState(JSON.parse(localStorage.getItem('poll')))
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState('')
  const [selectedPaths, setSelectedPaths] = useState([...poll.selectedPaths])
  // const [comments, setComments] = useState(poll.comments)
  const [text, setText] = useState('')

  const { user } = useAuth()

  const formatter = new Intl.DateTimeFormat('pt-BR')

  useEffect(async () => {
    setDate(new Date(poll.dateState))
    setTime(poll.timeState)
    setPoll(poll)
    poll.votes.forEach((vote) => {
      if (vote.user === user.uid) setPollOpen(false)
    })
  }, [])

  useEffect(async () => {
    function newSelectedPaths() {
      return selectedPaths.map((path) => {
        if (path.id === vote.pathId) {
          return {
            ...path,
            votes: path.votes + 1,
          }
        }
        return path
      })
    }
    setSelectedPaths(newSelectedPaths())
    setPollOpen(!pollOpen)
  }, [vote])

  const handleVote = (pathId) => {
    setVote({ pathId, userId: user.id, userName: user.name })
  }

  function handleOpenPathModal() {
    setIsNewModalPathOpen(true)
  }

  function handleClosePathModal() {
    setIsNewModalPathOpen(false)
  }

  const handleShowSelectModal = (id) => {
    setPathToDisplay(selectedPaths.find((path) => id === path.id))
    handleOpenPathModal()
  }

  const handleInsertComment = () => {
    const newComments = [
      ...poll.comments,
      { id: user.id, name: user.name, avatar: user.avatar, text },
    ]
    setPoll({ ...poll, comments: newComments })
    setText('')
  }

  return (
    <>
      <div className='vote'>
        <aside>
          <h1>Selecione o Trajeto para ver mais informações</h1>

          <div className='vote-options'>
            {selectedPaths.map((path) => (
              <div className='vote-options-item' key={path.id}>
                <Button onClick={() => handleShowSelectModal(path.id)}>
                  <img src={path.routeImg} alt='' />
                </Button>
                <h1>{path.title}</h1>
              </div>
            ))}
          </div>
        </aside>
        <main>
          <div className='title'>
            <img src={bike} alt='' />
            <h1>Vote no seu trajeto preferido!</h1>
          </div>
          <div className='info'>
            <strong>
              {formatter.format(date)} - {time}
            </strong>
            <div className='routes'>
              {pollOpen
                ? selectedPaths.map((path) => (
                    <div className='route' key={path.id}>
                      <Button onClick={() => handleVote(path.id)}>
                        <img src={path.routeImg} alt='' />
                      </Button>
                      <h1>{path.title}</h1>
                    </div>
                  ))
                : selectedPaths.map((path) => (
                    <div className='route' key={path.id}>
                      <Button disabled>
                        {path.id === vote.id ? (
                          <>
                            <img src={check} alt='' className=' checked' />
                            <img src={path.routeImg} alt='' />
                          </>
                        ) : (
                          <img src={path.routeImg} alt='' />
                        )}
                      </Button>
                      <h1>{path.title}</h1>
                      <h2>Votos: {path.votes} </h2>
                    </div>
                  ))}
            </div>
          </div>

          <div className='comments'>
            <h1>Comentários</h1>

            <div className='insertComment'>
              <textarea
                name='comment'
                id='comment'
                cols='50'
                rows='2'
                wrap='hard'
                placeholder='Insira seu comentário aqui!'
                spellCheck='true'
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <footer>
                <div className='user-info'>
                  <img src={user.avatar} alt='avatar' />
                  <span>{user.name}</span>
                </div>
              </footer>
              <Button className='btn-send' onClick={handleInsertComment}>
                Enviar
              </Button>
            </div>
            {poll.comments.map((comment) => (
              <div className='comment' id={comment.id}>
                <textarea
                  name='comment'
                  id='comment'
                  cols='50'
                  rows={comment.text.split('\n').length}
                  disabled
                >
                  {comment.text}
                </textarea>

                <footer>
                  <div className='user-info'>
                    <img src={comment.avatar} alt='avatar' />
                    <span>{comment.name}</span>
                  </div>
                </footer>
              </div>
            ))}
          </div>
        </main>
        <PathModal
          show={isNewModalPathOpen}
          path={pathToDisplay}
          onRequestClose={handleClosePathModal}
        />
      </div>
    </>
  )
}
