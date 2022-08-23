import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import moment from 'moment';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Options from './Options';
import useFirestore from '../../firebase/useFirestore';
import { useState } from 'react';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ImagesList() {
  const { documents } = useFirestore('gallery')
  const [ isOpen, setIsOpen ] = useState(false)
  const [ photoIndex, setPhotoIndex ] = useState(0)

  const patternIndex = (index) => index - Math.floor(index / pattern.length) * pattern.length

  const sxImage = {
    opacity: '.7',
    transition: 'opacity .3s linear',
    cursor: 'pointer',
    '&:hover': {
      opacity: 1
    }
  }

  const sxTypography = {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    color: "white",
    background: "rgba(0,0,0,0.3)",
    p: "5px",
    borderTopRightRadius: 8
  }

  const sxTooltip = {
    position: "absolute",
    bottom: "3px",
    right: "3px"
  }
  // mainSrc={documents[photoIndex]?.data?.imageURL}
  //         nextSrc={documents[(photoIndex + 1) % documents.length]?.data?.imageURL}
  //         prevSrc={documents[(photoIndex + documents.length - 1) % documents.length]?.data?.imageURL}
  const mainSrc = documents[photoIndex]?.data?.imageURL
  const nextIdx = (photoIndex + 1) % documents.length
  const nextSrc = documents[nextIdx]?.data?.imageURL
  const prevIdx = (photoIndex + documents.length - 1) % documents.length
  const prevSrc = documents[prevIdx]?.data?.imageURL
  const imTitle = documents[photoIndex]?.data?.uName
  const caption = documents[photoIndex]?.data?.uEmail
  return (
    <>
      <ImageList
        variant="quilted"
        cols={4}
        rowHeight={200}>
        {documents.map((item, index) => {
          const pIdx = patternIndex(index)
          return (
            <ImageListItem
              key={item?.id}
              cols={pattern[pIdx].rows}
              rows={pattern[pIdx].cols}
              sx={sxImage}>
              <Options
                imageId={item?.id}
                uid={item?.data?.uid}
                imageURL={item?.data?.imageURL} />
              <img
                {...srcset(item?.data?.imageURL, 121, pattern[pIdx].rows, pattern[pIdx].cols)}
                alt={item?.data?.uName || item?.data?.uEmail?.split("@")[0]}
                onClick={() => {
                  setPhotoIndex(index)
                  setIsOpen(true)
                }}
                loading="lazy" />
              <Typography
                variant='body2'
                component='span'
                sx={sxTypography}>
                {moment(item?.data?.timestamp?.toDate()).fromNow()}
              </Typography>
              <Tooltip
                title={item?.data?.uName || item?.data?.uEmail?.split("@")[0]}
                sx={sxTooltip}>
                <Avatar src={item?.data?.uPhoto} imgProps={{ 'aria-hidden': true }} />
              </Tooltip>
            </ImageListItem>
          )
        })}
      </ImageList>
      { isOpen && (
        <Lightbox
          onCloseRequest={() => setIsOpen(false)}
          onMoveNextRequest={() => setPhotoIndex(nextIdx)}
          onMovePrevRequest={() => setPhotoIndex(prevIdx)}
          imageTitle={imTitle}
          imageCaption={caption}
          mainSrc={mainSrc}
          nextSrc={nextSrc}
          prevSrc={prevSrc}/>
      ) }
    </>
  );
}


const pattern = [
  {
    rows: 2,
    cols: 2
  },
  {
    rows: 1,
    cols: 1
  },
  {
    rows: 1,
    cols: 1
  },
  {
    rows: 1,
    cols: 2
  },
  {
    rows: 1,
    cols: 2
  },
  {
    rows: 2,
    cols: 2
  },
  {
    rows: 1,
    cols: 1
  },
  {
    rows: 1,
    cols: 1
  },
]