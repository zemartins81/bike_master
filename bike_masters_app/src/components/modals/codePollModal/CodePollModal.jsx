/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */

import Modal from 'react-modal'
import Button from '../../Button'
import './codePoll.scss'
import closeImg from '../../../assets/images/close.svg'

Modal.setAppElement('#root')

// eslint-disable-next-line react/prop-types
export function CodePollModal({ show, code, onRequestClose }) {
  function copyCode() {
    navigator.clipboard.writeText(code)
    onRequestClose(true)
  }

  return (
    <Modal
      isOpen={show}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
      >
        <img src={closeImg} alt='Fechar modal' />
      </button>

      <span>Votação: {code}</span>
      <Button className='code-poll' onClick={copyCode}>
        Copiar
      </Button>
    </Modal>
  )
}
