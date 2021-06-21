import React from 'react'
import { Dropdown } from 'react-bootstrap'
import PageTitle from '@shared/PageTitle'
import './index.scss'

const HeaderAction = () => {
  return (
    <PageTitle title="Search Results for  SAP ">
      <div className="SortBy">
        Sort by:
        <Dropdown>
          <Dropdown.Toggle variant="default">Availability</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </PageTitle>
  )
}

export default HeaderAction
