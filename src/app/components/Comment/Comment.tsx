import { CardContent, Typography } from '@mui/material'
import React from 'react'

const Comment = () => {
  return (
    <CardContent>
    {commentList.map((comment) => (
      <Typography key={comment.id} variant="body2" color="text.secondary">
        {comment.text}
      </Typography>
    ))}
  </CardContent>
  )
}

export default Comment