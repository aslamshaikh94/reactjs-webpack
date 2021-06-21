import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import WhyusUrl from '@assets/images/whyus.jpg'
import './index.scss'

const Whyus = () => {
  return (
    <div className='Whyus'>
      <Container>
        <Row>
          <Col lg={6}>
            <div className='Text'>
              <h2 className='Heading'>Why US</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum! Provident similique accusantium nemo autem.
                Veritatis obcaecati tenetur iure eius earum ut molestias
                architecto.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum! Provident similique accusantium nemo autem.
                Veritatis obcaecati tenetur iure eius earum ut molestias
                architecto.
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div className>
              <img src={WhyusUrl} className='WhyusImage' />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Whyus
