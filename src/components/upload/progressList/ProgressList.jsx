import { ImageList } from '@mui/material'
import React from 'react'
import ProgressItem from './ProgressItem'

export default function ProgressList({ files }) {
  return (
    <ImageList
      cols={4}
      rowHeight={200}>
        {
          files.map((file, index) => (
            <ProgressItem file={file} key={index} />
          ))
        }
    </ImageList>
  )
}
