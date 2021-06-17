import React from 'react'
import './index.scss'

const PageWrapper = props => {
  const { children } = props
  return <div className='PageWrapper'>{children}</div>
}

export default PageWrapper
