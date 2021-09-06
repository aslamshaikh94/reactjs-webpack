import React from 'react'
import './index.scss'

const PageTitle = props => {
  const { children, title, childTitle } = props
  return (
    <div className='HeaderAction'>
      <h4>
        {title && `${title} ${childTitle ? '/' : ''}`}
        <span className='ChildTitle'>{childTitle && `${childTitle}`}</span>
      </h4>
      <div>{children}</div>
    </div>
  )
}

export default PageTitle
