import React from 'react'
import ImageUploader from './ImageUploader/ImageUploader'

const UploadImage = ({uploadImageHandler}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Image Uploader</h1>
      {/* <h4>Simple Drag and Drop Your Image Or Select One</h4> */}
      <div> <ImageUploader uploadImageHandler={(info) => uploadImageHandler(info)} /> </div>
    </div>
  )
}

export default UploadImage