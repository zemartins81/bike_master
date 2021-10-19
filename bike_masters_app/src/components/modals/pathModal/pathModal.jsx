/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Modal from 'react-modal'

import closeImg from '../../../assets/images/close.svg'
import Button from '../../Button'
import './pathModal.scss'

Modal.setAppElement('#root')

export function PathModal({ show, path, onRequestClose }) {
  const { routeImg, title, description, difficulty } = path
  return (
    <Modal
      isOpen={show}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <Button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
      >
        <img src={closeImg} alt='Fechar modal' />
      </Button>
      <div className='content'>
        <h1>{title}</h1>
        <div className='description'>
          <img src={routeImg} alt='Mapa' />
          <p>{description}</p>
        </div>
        <p>
          <strong>Dificuldade: </strong>
          {difficulty}
        </p>
      </div>
    </Modal>
  )
}
