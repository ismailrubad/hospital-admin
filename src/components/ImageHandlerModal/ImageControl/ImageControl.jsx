import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { AppBar, Tabs, Tab, Box, CircularProgress, Fab } from '@material-ui/core'
import { Send as SendIcon, PhotoLibrary as PhotoLibraryIcon, CloudUpload as CloudUploadIcon } from '@material-ui/icons'
import ThumbImage from './ThumbImage/ThumbImage'
import UploadImage from './UploadImage/UploadImage'
import './ImageControl.css'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>{children}</Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const AllImages = ({ closeModal, getImageData, selectOneMood, prevSelectedImageIds }) => {
  const [value, setValue] = useState(0)
  const [imageList, setImageList] = useState([])
  const [resError, setResError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectImage, setSelectImage] = useState([])
  const [isInitialize, setIsInitialize] = useState(false)

  useEffect(() => {
    axios.get(`https://hospitalsheba.com//admin/api/image`)
      .then(res => setImageList(res.data.data.reverse()))
      .then(() => setIsLoading(false))
      .catch(err => setResError(err.message))
      .then(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    // if(prevSelectedImageIds)

    if (prevSelectedImageIds.length > 0) {
      setSelectImage(prevSelectedImageIds)
    }
  }, [])

  // delete image handler
  const deleteImageHandler = id => {
    axios.get(`https://hospitalsheba.com//admin/api/image/remove?id=${id}`)
      .then(() => updateImageList(id))
      .catch(err => setResError(err.message))
  }


  // upload image handler 
  const uploadImageHandler = (uploadImageInfo) => {
    axios.post(`https://hospitalsheba.com//admin/api/image/add/`, uploadImageInfo)
      .then(res => {
        const preImgList = [...imageList]
        preImgList.unshift(res.data[0])
        setImageList(preImgList)
      })
      .then(() => setValue(0))
      .catch(err => setResError(err.message))
  }

  // update image state list after delete image handler
  const updateImageList = id => {
    // remove image from image list
    const prevImage = [...imageList]
    const selectedImgIndex = prevImage.findIndex(el => el._id === id)
    prevImage.splice(selectedImgIndex, 1)
    setImageList(prevImage)

    // remove image id from selected image list
    const prevSelectImage = [...selectImage]
    const prevSelectImageID = prevSelectImage.findIndex(el => el._id === id)
    if (prevSelectImageID === -1) {
      prevSelectImage.splice(prevSelectImageID, 1)
      setSelectImage(prevSelectImage)
    }
  }

  // select multi image
  const selectMultiImageHandler = (id) => {
    const prevSelectImage = [...selectImage]
    if (selectOneMood) {
      // console.log(id)
      setIsInitialize(true)
      setSelectImage([id])
      return
    }
    const prevSelectImageID = selectImage.findIndex(el => el === id)
    if (prevSelectImageID === -1) {
      prevSelectImage.push(id)
      setIsInitialize(true)
    } else {
      prevSelectImage.splice(prevSelectImageID, 1)
      setIsInitialize(true)
    }
    setSelectImage(prevSelectImage)
  }

  // check is image is selected
  const checkIsImageSelected = (id) => selectImage.some(el => el === id)

  // send selected image data id
  const sendSelectedData = (event) => {
    getImageData(selectImage)
    closeModal()
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const PhotoLibraryTab = <div className='Tab'>
    <p>Photo Library</p>
    <PhotoLibraryIcon />
  </div>

  const UploadPhotoTab = <div className='Tab'>
    <p>Upload Photo</p>
    <CloudUploadIcon />
  </div>

  return (
    <div className='Image_control' >
      <AppBar position="static" color='default'>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label={PhotoLibraryTab} {...a11yProps(0)} />
          <Tab label={UploadPhotoTab} {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        {selectImage.length || isInitialize ?
          <Fab variant="extended" onClick={sendSelectedData} className='Done_button' aria-label="add" >
            <SendIcon className='Done_button_icon' />
            Done
          </Fab> : null}

        {!resError ?
          <>
            <Box >
              <div className='Custom_box'>
                {isLoading ? <div className='Loading'>
                  <CircularProgress />
                  <CircularProgress color="secondary" />
                </div> :
                  <>
                    {!imageList.length > 0
                      ? <h1 className='No_image'>No Image Found !!!</h1>
                      : <>
                        {imageList.map(image => (
                          <ThumbImage
                            key={image._id}
                            imageInfo={image}
                            deleteImage={() => deleteImageHandler(image._id)}
                            ThisImageIsSelected={checkIsImageSelected(image._id)}
                            selectMultiImage={() => selectMultiImageHandler(image._id)}
                          />
                        ))}
                      </>
                    }
                  </>
                }
              </div>
            </Box>
          </>
          : <h1 className='ErrorMSG'>{resError}</h1>
        }
      </TabPanel>

      <TabPanel value={value} index={1}>
        <UploadImage uploadImageHandler={(info) => uploadImageHandler(info)} />
      </TabPanel>

    </div>
  )
}

export default AllImages


