import UploadImage from '@/components/common/inputs/image/UploadImage'
import { Box, Card, CardContent, Divider } from '@mui/material'
import React, { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function CreateActivityImage({ children }: Props) {
  return (
    <Card>
      <CardContent sx={{ padding: '0px' }}>
        <Box padding="24px">
          <UploadImage placeholder="Activity Banner" />
        </Box>
        <Divider />
        {children}
      </CardContent>
    </Card>
  )
}
