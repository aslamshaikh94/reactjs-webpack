import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const PageTitle = props => {
  const { children, title, onback, childTitle } = props
  return (
    <div className='HeaderAction'>
      <h4>
        {onback && (
          <>
            <Link to={onback}>
              <i className='bi bi-arrow-left'></i>
            </Link>{' '}
          </>
        )}

        {title && `${title} ${childTitle ? '/' : ''}`}
        <span className='ChildTitle'>{childTitle && `${childTitle}`}</span>
      </h4>
      <div>{children}</div>
    </div>
  )
}

export default PageTitle
