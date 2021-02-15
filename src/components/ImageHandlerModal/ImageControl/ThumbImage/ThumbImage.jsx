import React from 'react'
import { DeleteForever as DeleteForeverIcon, DoneAll as DoneAllIcon, MoreHoriz as MoreHorizIcon } from '@material-ui/icons'
import { Fade, Menu, MenuItem, CardMedia, CardActions, CardActionArea, Card, makeStyles } from '@material-ui/core'
import { limitTitle } from '../Helper/Helper'
import './ThumbImage.css'

const useStyles = makeStyles({
  root: {
    width: 150,
    height: 190
  },
  media: {
    height: 150,
  },
  remPad: {
    padding: 0
  }
})

const ThumbImage = ({ imageInfo, deleteImage, ThisImageIsSelected, selectMultiImage }) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const deleteMenuOpen = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const deleteMenuClose = (event) => {
    event && event.stopPropagation()
    setAnchorEl(null)
  }

  const deleteImageHandler = (event) => {
    event && event.stopPropagation()
    deleteImage()
    deleteMenuClose()
  }

  return (
    <Card className={[ThisImageIsSelected && 'Select_Thumb', 'Image_Thumb', classes.root].join(' ')} >
      <CardActionArea onClick={selectMultiImage}>
        <div onClick={deleteMenuOpen} className='Single_action'><MoreHorizIcon /></div>
        <Menu
          className={'Delete_icon_menu'}
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={deleteMenuClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={deleteImageHandler}>
            <DeleteForeverIcon />
          </MenuItem>
        </Menu>
        <CardMedia
          className={classes.media}
          image={`http://3.6.216.223${imageInfo.thumbnail}`}
          title="Contemplative Reptile"
        />
      </CardActionArea>

      <CardActions>
        <div className='Img_text'>
          <p >{limitTitle(imageInfo.name, 15)}</p>
        </div>
        {ThisImageIsSelected && <DoneAllIcon className='Green' />}
      </CardActions>
    </Card>
  )
}

export default ThumbImage