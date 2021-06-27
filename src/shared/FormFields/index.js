import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import PhoneInput from 'react-phone-input-2'
import './index.scss'

const Label = ({ title }) => {
  return <label className='form-label'>{title}</label>
}

const InputField = props => {
  const {
    className = '',
    mb,
    bg = '',
    label,
    labelSmall,
    value = '',
    subtext,
    error = '',
    ...Rest
  } = props

  return (
    <Form.Group className={`FormFieldGroup ${mb} ${className}`}>
      {label && (
        <Form.Label>
          {label} {labelSmall && <small>{labelSmall}</small>}
        </Form.Label>
      )}
      <Form.Control
        isInvalid={!!error}
        value={value || ''}
        {...Rest}
        className={bg}
      />
      {subtext && <Form.Text className='text-muted'>{subtext}</Form.Text>}
      {error && (
        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  )
}

const SelectField = props => {
  const {
    mb,
    label,
    selected = '',
    optionsName = [],
    optionsValue = [],
    subtext,
    error,
    ...Rest
  } = props

  return (
    <Form.Group className={`FormFieldGroup ${mb}`}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        isInvalid={!!error}
        as='select'
        value={selected}
        custom
        {...Rest}
      >
        {optionsName.map((option, i) => (
          <option value={optionsValue[i]} key={i}>
            {option}
          </option>
        ))}
      </Form.Control>
      <Form.Text className='text-muted'>{subtext}</Form.Text>
      <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
    </Form.Group>
  )
}

const CheckBox = props => {
  const { mb, label, value = '', error, checked = false, ...Rest } = props
  return (
    <Form.Group className={`FormFieldGroup ${mb}`}>
      <Form.Check
        custom
        type='checkbox'
        id={label}
        label={label}
        value={value}
        checked={checked}
        {...Rest}
      />
      {error && (
        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  )
}

const Switch = props => {
  const { name, mb, error, ...Rest } = props
  return (
    <Form.Group className={`FormFieldGroup ${mb}`}>
      <Form.Switch id={name} name={name} {...Rest} />
      {error && (
        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  )
}

const CheckRadio = props => {
  const {
    mb,
    label,
    name,
    checked,
    subtext,
    optionsName = [],
    optionsValue = [],
    error,
    inline,
    labelPosition,
    onChange,
    ...Rest
  } = props

  return (
    <Form.Group className={`FormFieldGroup ${mb}`}>
      {label && (
        <Form.Label className={`${inline ? 'Inline' : ''} ${labelPosition}`}>
          {label}
        </Form.Label>
      )}
      <div className='OptionsGroup'>
        {optionsName.map((option, i) => (
          <Form.Check
            custom
            type='radio'
            id={name + option}
            name={name}
            label={option}
            checked={optionsValue[i] === checked}
            onChange={() =>
              onChange({ target: { name, value: optionsValue[i] } })
            }
            inline={inline}
            {...Rest}
            key={i}
          />
        ))}
      </div>
      {subtext && <Form.Text className='text-muted'>{subtext}</Form.Text>}
      {error && (
        <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  )
}

const Textarea = props => {
  const { label, value = '', mb, subtext, error, ...Rest } = props
  return (
    <Form.Group className={mb}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control isInvalid={!!error} as='textarea' value={value} {...Rest} />
      <Form.Text className='text-muted'>{subtext}</Form.Text>
      <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
    </Form.Group>
  )
}

const InputTags = props => {
  const { label, mb, inputTags, onFocus } = props
  const [tags, setTags] = React.useState(inputTags)

  const removeTags = indexToRemove => {
    const rmTags = [...tags.filter((_, index) => index !== indexToRemove)]
    setTags(rmTags)
    props.selectedTags(rmTags)
  }

  const addTags = e => {
    const { value } = e.target
    if (value !== '') {
      setTags([...tags, value])
      props.selectedTags([...tags, value])
      e.target.value = ''
    }
  }

  useEffect(() => {
    setTags(inputTags)
  }, [inputTags])

  return (
    <>
      <Form.Group className={mb}>
        {label && <Form.Label>{label}</Form.Label>}
        <div className='tags-input' onFocus={onFocus}>
          <ul className='tags'>
            {tags.map((tag, index) => (
              <li key={index} className='tag'>
                <span className='tag-title'>{tag}</span>
                <span
                  className='tag-close-icon'
                  onClick={() => removeTags(index)}
                >
                  x
                </span>
              </li>
            ))}
          </ul>
          <input
            type='text'
            onKeyUp={event => (event.key === 'Enter' ? addTags(event) : null)}
            placeholder='Press enter to add tags'
          />
        </div>
      </Form.Group>
    </>
  )
}

const PhoneInputField = props => {
  const { label, subtext, error = '', mb, ...Rest } = props
  return (
    <Form.Group className={`FormFieldGroup ${mb}`}>
      {label && <Form.Label>{label}</Form.Label>}
      <PhoneInput {...Rest} />
      {subtext && <Form.Text className='text-muted'>{subtext}</Form.Text>}
      {error && <div className='ErrorMessage'>{error}</div>}
    </Form.Group>
  )
}

export {
  Label,
  InputField,
  SelectField,
  CheckBox,
  CheckRadio,
  Switch,
  Textarea,
  InputTags,
  PhoneInputField
}
