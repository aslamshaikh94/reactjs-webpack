import React from 'react'
import { Form } from 'react-bootstrap'
import AccordionCollapse from '@shared/AccordionCollapse'
import './index.scss'

const FiltersBar = () => {
  return (
    <div className='FilterWrapper'>
      <div className='FilterTitle'>
        <h5> Filters</h5>
        <span>Reset All</span>
      </div>
      <AccordionCollapse title='Industry' open>
        <div className='FilterGroup'>
          <ul className='FilterLink'>
            <li>
              <Form.Check custom type='checkbox' id='S4Hana' label='Category' />
            </li>
            <li>
              <Form.Check custom type='checkbox' id='S4Hana' label='Category' />
            </li>
            <li>
              <Form.Check custom type='checkbox' id='S4Hana' label='Category' />
            </li>
            <li>
              <Form.Check custom type='checkbox' id='S4Hana' label='Category' />
            </li>
            <li>
              <Form.Check custom type='checkbox' id='S4Hana' label='Category' />
            </li>
            <li>
              <Form.Check custom type='checkbox' id='S4Hana' label='Category' />
            </li>
          </ul>
        </div>
      </AccordionCollapse>
      <AccordionCollapse title='Product Group' open>
        <div className='FilterGroup'>
          <ul className='FilterLink'>
            <li>
              <Form.Check custom type='checkbox' id='S4Hana' label='Some' />
            </li>
            <li>
              <Form.Check custom type='checkbox' id='S4Hana' label='Some' />
            </li>
            <li>
              <Form.Check custom type='checkbox' id='S4Hana' label='Some' />
            </li>
            <li>
              <Form.Check custom type='checkbox' id='S4Hana' label='Some' />
            </li>
            <li>
              <Form.Check custom type='checkbox' id='S4Hana' label='Some' />
            </li>
            <li>
              <Form.Check custom type='checkbox' id='S4Hana' label='Some' />
            </li>
          </ul>
        </div>
      </AccordionCollapse>

      <AccordionCollapse title='Delivery Countries'>
        <div className='FilterGroup'>
          <ul className='FilterLink'></ul>
        </div>
      </AccordionCollapse>
      <AccordionCollapse title='Supplier Countries'>
        <div className='FilterGroup'>
          <ul className='FilterLink'></ul>
        </div>
      </AccordionCollapse>
      <AccordionCollapse title='Incoterm'>
        <div className='FilterGroup'>
          <ul className='FilterLink'></ul>
        </div>
      </AccordionCollapse>
      <AccordionCollapse title='Quantity'>
        <div className='FilterGroup'>
          <ul className='FilterLink'></ul>
        </div>
      </AccordionCollapse>
      <AccordionCollapse title='Manufacturers'>
        <div className='FilterGroup'>
          <ul className='FilterLink'></ul>
        </div>
      </AccordionCollapse>
      <AccordionCollapse title='Packaging Type'>
        <div className='FilterGroup'>
          <ul className='FilterLink'></ul>
        </div>
      </AccordionCollapse>
    </div>
  )
}

export default FiltersBar
