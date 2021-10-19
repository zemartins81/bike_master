import React from 'react'
import './button.scss'

export default function Button(props) {
  return (
    <div>
      {/* eslint-disable-next-line react/button-has-type,react/jsx-props-no-spreading */}
      <button {...props} />
    </div>
  )
}
