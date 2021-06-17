import React from 'react'
import { Container } from 'react-bootstrap'
import ComedyUrl from '@assets/images/comedy.png'
import CinderellaUrl from '@assets/images/cinderella.png'
import RightcheckUrl from '@assets/images/rightcheck.png'
import Rightcheck2Url from '@assets/images/rightcheck2.png'
import SkillstarUrl from '@assets/images/skillstar.png'
import SlsUrl from '@assets/images/sls.png'

import './index.scss'

const OurClients = () => {
  return (
    <div className='OurClients'>
      <Container>
        <h5 className='Heading'>Our Clients</h5>
        <div className='Clients'>
          <div>
            <img src={ComedyUrl} className='Client' />
          </div>
          <div>
            <img src={RightcheckUrl} className='Client' />
          </div>
          <div>
            <img src={SkillstarUrl} className='Client' />
          </div>
          <div>
            <img src={CinderellaUrl} className='Client' />
          </div>
          <div>
            <img src={Rightcheck2Url} className='Client' />
          </div>
          <div>
            <img src={SlsUrl} className='Client' />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default OurClients
