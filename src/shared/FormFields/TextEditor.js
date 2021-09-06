import React, { useRef } from 'react'
import Form from 'react-bootstrap/Form'
import JoditEditor from 'jodit-react'

const TextEditor = props => {
  const { label, name, error, onBlur, readonly, ...Rest } = props
  const editor = useRef(null)

  const config = {
    readonly,
    buttons: [
      '|',
      'bold',
      'strikethrough',
      'underline',
      'italic',
      '|',
      'ul',
      'ol',
      '|',
      'outdent',
      'indent',
      '|',
      'font',
      'fontsize',
      'brush',
      'paragraph',
      '|',
      'image',
      'video',
      'table',
      'link',
      '|',
      'align',
      'undo',
      'redo',
      '|',
      'hr',
      'eraser',
      'copyformat',
      '|',
      'symbol',
      'fullsize',
      'print'
    ]

    // all options from https://xdsoft.net/jodit/doc/
  }

  return (
    <>
      <Form.Group className='FormFieldGroup'>
        {label && <Form.Label>{label}</Form.Label>}
        <JoditEditor
          name={name}
          ref={editor}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={content => onBlur({ target: { name, value: content } })}
          {...Rest}
        />
        {error && (
          <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
        )}
      </Form.Group>
    </>
  )
}

export default TextEditor
