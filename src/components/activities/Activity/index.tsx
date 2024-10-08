import { Chip, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

type Props = {
  img: string
  title: string
  description: string
  state: string
}

export default function Activity({ img, title, description, state }: Props) {
  return (
    <Stack direction="row" alignItems="center" gap="16px">
      <Image src={img} alt={`vendorImage-${img}`} width={140} height={80} />
      <Stack gap="5px">
        <Stack alignItems="center" direction="row" gap="8px">
          <Typography variant="h3">{title}</Typography>
          <Chip label={state} color="default" />
        </Stack>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Stack>
    </Stack>
  )
}
