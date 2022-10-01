import React, { useEffect } from 'react'
// const JustGage = require('justgage')
import { JustGage } from '../../justgage'

const DonutChart = () => {
  useEffect(() => {
    let gauge = new JustGage({
      id: 'gauge', // the id of the html element
      value: 9,
      min: 0,
      max: 147,
      // decimals: 2,
      gaugeWidthScale: 0.2,
      pointer: true,
      pointerValue: 9,
      levelColors: ['#a9d70b', '#f9c802', '#ff0000'],
      // counter: true,
      // customSectors: {
      //   // percents: true, // lo and hi values are in %
      //   ranges: [
      //     {
      //       color: 'red',
      //       lo: 0,
      //       hi: 50
      //     },
      //     {
      //       color: 'green',
      //       lo: 51,
      //       hi: 100
      //     }
      //   ]
      // },
      pointerOptions: {
        toplength: null,
        bottomlength: null,
        bottomwidth: null,
        stroke: 'none',
        stroke_width: 0,
        stroke_linecap: 'square',
        color: '#000000'
      }
    })
    // gauge.refresh(Math.random() * 100)
  }, [])
  return (
    <div style={{ width: '300px' }}>
      <h2>Sample</h2>
      <div id='gauge'></div>
    </div>
  )
}
export default DonutChart
