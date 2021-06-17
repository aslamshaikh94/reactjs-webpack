import React, { useEffect, useState } from 'react'
import { useStore } from '@store/'
import { callGetProductImagesApi } from '@api/product'
import Dropzone from '@shared/Dropzone'
import Button from 'react-bootstrap/Button'
import addToaster from '@shared/Notification'
import './index.scss'

const ProductImagesGallery = props => {
  const { single, onSelect, selected = [], onCloseModal } = props
  const {
    state: { loggedInUserData: { uid } = {} }
  } = useStore()

  const [imageGallery, setImageGallery] = useState([])
  const [selectedImages, setSelectedImages] = useState(selected)

  const onDocumentUpload = res => {
    setImageGallery([...imageGallery, res.docUrl])
  }

  const getProductsImages = async () => {
    const images = await callGetProductImagesApi(uid)
    setImageGallery(images)
  }

  useEffect(() => {
    getProductsImages()
  }, [])

  const handleChecked = e => {
    const { checked, value } = e.target
    const imgs = selectedImages.filter(item => item && item !== value)
    setSelectedImages(checked ? [...selectedImages, value] : imgs)
  }

  const handleSave = () => {
    if (single && selectedImages.length > 1) {
      addToaster('error', 'Multiple images not allowed')
    } else {
      onSelect(selectedImages)
      onCloseModal()
    }
  }

  return (
    <div>
      <div className='ImageGallery'>
        {imageGallery.map((image, i) => (
          <div className='Image' key={i}>
            <img src={image} />
            <input
              type='checkbox'
              value={image}
              checked={selectedImages.includes(image)}
              onChange={handleChecked}
            />
          </div>
        ))}
      </div>
      <div className='ButtonGroup '>
        <Button onClick={() => handleSave(false)}>Save</Button>
      </div>
      <Dropzone label='Upload Your Certificate' onUpload={onDocumentUpload} />
    </div>
  )
}

export default ProductImagesGallery
