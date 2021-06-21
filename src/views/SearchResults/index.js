import React, { useState } from 'react'
import FiltersBar from './FiltersBar'
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap'
import './index.scss'

const SearchResults = () => {
  const [searchText, setSearchText] = useState('')

  const handleSearch = () => {}

  return (
    <>
      <div className='SearchResults'>
        <Container>
          <Row>
            <Col lg={'auto'}>
              <FiltersBar />
            </Col>
            <Col>
              <InputGroup className='mb-3 SearchGroup' size='lg'>
                <FormControl
                  placeholder='SAP Consultant'
                  className='SearchInput'
                  value={searchText}
                  onChange={e => setSearchText(e.target.value.trimStart())}
                />
                <InputGroup.Append>
                  <Button className='SearchButton' onClick={handleSearch}>
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default SearchResults
