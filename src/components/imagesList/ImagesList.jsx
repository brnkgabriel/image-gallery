import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Options from './Options';
import useFirestore from '../../firebase/useFirestore';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ImagesList() {
  const { documents } = useFirestore('gallery')

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
  return (
    <SimpleReactLightbox>
      <SRLWrapper>
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
                <Options imageId={item?.id} />
                <img
                  {...srcset(item?.data?.imageURL, 121, pattern[pIdx].rows, pattern[pIdx].cols)}
                  alt={item?.data?.uName || item?.data?.uEmail?.split("@")[0]}
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
      </SRLWrapper>
    </SimpleReactLightbox>
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