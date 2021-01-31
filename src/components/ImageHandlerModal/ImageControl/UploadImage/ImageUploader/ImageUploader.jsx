import React, { useState } from 'react'
import { makeStyles, Button } from '@material-ui/core'
import { Backup as BackupIcon, CloudUpload as CloudUploadIcon, Cancel as CancelIcon } from '@material-ui/icons'
import './ImageUploader.css'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '28px 8px 0',
    zIndex: 9999
  },
}))

const ImageUploader = ({ uploadImageHandler }) => {
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [errorNotification, setErrorNotification] = useState(null)

  const classes = useStyles()

  /** Drag and Drop Event Handlers **/
  const handleDragEnter = (e) => {
    e.preventDefault()
  }
  const handleDragOver = (e) => {
    e.preventDefault()
    if (!dragOver) {
      setDragOver(true)
    }
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    let file = e.dataTransfer.files[0]

    // Validate file is of type Image
    let fileType = file.type.split("/")[0]
    if (fileType !== "image") {
      console.log("Not an image file")
      setFile(null)
      setErrorNotification("Not an image File")
      setDragOver(false)
      return setTimeout(() => {
        setErrorNotification(null)
      }, 3000)
    }

    document.getElementById('upload-image-input').fileList = e.dataTransfer.files[0]
    setFile(file)
    setDragOver(false)
  }

  /** Handle Manually (File Input) Added Files  **/
  const handleAddImage = (e) => {
    e.preventDefault()
    let file = e.target.files[0]

    // check is file available
    if (e.target.files.length > 0) {
      let fileType = e.target.files[0].type.split('/')[0]
      if (fileType !== "image") {
        console.log("Not an image file")
        setFile(null)
        setErrorNotification("Not an image File")

        return setTimeout(() => {
          setErrorNotification(null)
        }, 3000)
      }
    }
    setFile(file)
  }

  /** Handle Upload after Upload Button Clicked **/
  const handleUploadImage = (e) => {
    e.preventDefault()
    const uploadImageData = new FormData()
    uploadImageData.append('images', file)
    uploadImageHandler(uploadImageData)
  }

  const handleCancelUpload = (e) => {
    e.preventDefault()
    setFile(null)
  }

  // Match drag over css to hover css
  let dragOverClass = dragOver ? `display-box drag-over` : `display-box`

  // If file is set, change upload box text to file name
  let uploadText = file
    ? <div>
      <h4>{file.name}</h4>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<CancelIcon />}
        onClick={handleCancelUpload}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick={handleUploadImage}
      >
        Upload
      </Button>
    </div>
    : <div> <h4>Choose Files to Upload</h4> </div>

  // Show Error message if file type is not an image
  let showErrorMessage = errorNotification && <div className="error-notification"><p>{errorNotification}</p></div>

  return (
    <div className="image-uploader-wrapper Image_uploader">
      <div className={dragOverClass}>
        <div className="icon-text-box">
          <div className="upload-icon"> <BackupIcon /> </div>
          <div className="upload-text"> {uploadText} </div>
          {showErrorMessage}
        </div>
        <div>
          <input
            type="file"
            id="upload-image-input"
            className="upload-image-input"
            accept="image/*"
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onChange={handleAddImage}
          />
        </div>
      </div>
    </div>
  )
}

export default ImageUploader