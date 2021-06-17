import React from 'react'
import { FormControl, InputGroup, Button } from 'react-bootstrap'
import HomeBanner from '@assets/images/home-banner.jpg'
import './index.scss'

const Banner = () => {
  return (
    <>
      <div className='Banner'>
        <img src={HomeBanner} />
        <div className='SearchBox'>
          <InputGroup size='lg' className='mb-3'>
            <FormControl placeholder='Some Text Here' />
            <InputGroup.Append>
              <Button variant='primary'>
                <i className='bi bi-search'></i> Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    </>
  )
}

export default Banner
