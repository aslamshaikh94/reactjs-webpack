import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import {
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter
} from 'react-bootstrap'

const RegionLanguageMobile = ({ setHandleModalmobile, handleModalmobile }) => {
  const { region } = useParams()
  const [isLangMenu, setIsLangMenu] = useState()
  const [currentRegion, setCurrentRegion] = useState('North America')
  const [langMenu, setLangMenu] = useState([])
  const [language, setLanguage] = useState('')
  const [langCode, setLangCode] = useState('En')

  const regionSelector = [
    { countryName: 'North America', countryLang: ['English'] },
    { countryName: 'Central America', countryLang: ['English', 'Spanish'] },
    { countryName: 'South America', countryLang: ['English', 'Spanish'] },
    { countryName: 'Caribbean', countryLang: ['English', 'Spanish'] },
    { countryName: 'Europe', countryLang: ['English', 'French'] },
    { countryName: 'Middle East', countryLang: ['English'] },
    { countryName: 'Saudi Arabia', countryLang: ['English'] },
    { countryName: 'Africa', countryLang: ['English', 'French'] },
    { countryName: 'China', countryLang: ['Chinese'] },
    { countryName: 'India', countryLang: ['English'] },
    { countryName: 'Asia-Pacific', countryLang: ['English'] }
  ]

  const handleCountry = item => {
    setLangMenu(item.countryLang)
    setLanguage(item.countryLang[0])
    setCurrentRegion(item.countryName)
  }

  const handleRegionSelector = () => {
    setIsLangMenu(!isLangMenu)
    setLangMenu(regionSelector[0].countryLang)
    setLanguage(regionSelector[0].countryLang[0])
  }
  useEffect(() => {
    if (language === 'English') {
      return setLangCode('En')
    }
    if (language === 'Spanish') {
      return setLangCode('Es')
    }

    if (language === 'Chinese') {
      return setLangCode('Cn')
    }
    if (language === 'French') {
      return setLangCode('Fr')
    }
  }, [language])

  return (
    <Modal
      className='giw-mobile-region-language-modal'
      show={handleModalmobile}
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          REGION & LANGUAGE
        </Modal.Title>
        <button
          onClick={() => setHandleModalmobile(false)}
          type='button'
          className='btn-close'
          aria-label='Close'
        ></button>
      </Modal.Header>
      <Modal.Body>
        <Container className='giw-mob-countrylang'>
          <Row>
            <Col xs={12} className='giw-mob-header'>
              <Col xs={6} md={6}>
                <div className='giw-mob-title'>Region / Country</div>
              </Col>
              <Col xs={6} md={6}>
                <div className='giw-mob-title'>Languages</div>
              </Col>
            </Col>
          </Row>
          <Row className='giw-mob-body'>
            <Col xs={6} md={6} className='giw-mob-items'>
              <ul>
                {regionSelector.map(item => (
                  <li
                    className={
                      item.countryName === currentRegion ? 'active' : ''
                    }
                    onClick={() => handleCountry(item)}
                    key={item.countryName}
                  >
                    {item.countryName}
                  </li>
                ))}
              </ul>
            </Col>
            <Col xs={6} md={6} className='giw-mob-items'>
              <ul>
                {langMenu.map(val => (
                  <li
                    className={val === language ? 'active' : ''}
                    onClick={() => {
                      setIsLangMenu(!isLangMenu), setLanguage(val)
                    }}
                    key={val}
                  >
                    {val}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default RegionLanguageMobile
