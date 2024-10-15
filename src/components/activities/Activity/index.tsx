import { Chip, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  id: string
  img: string
  title: string
  description: string
  state: string
  disableRedirect?: boolean
}

export default function ActivityComponent({ id, img, title, description, state, disableRedirect }: Props) {
  return (
    <Link
      href={`${disableRedirect ? '' : `/activities/update/${id}`}`}
      style={{ textDecoration: 'none', color: '#0F0F0F', cursor: `${disableRedirect ? 'default' : 'pointer'}` }}
    >
      <Stack direction="row" alignItems="center" gap="16px">
        <Image src={img} alt={`vendorImage-${img}`} width={140} height={80} style={{ borderRadius: '12px' }} />
        <Stack gap="5px">
          <Stack alignItems="center" direction="row" gap="8px">
            <Typography variant="h3">{title}</Typography>
            <Chip label={state} color="upcomingChip" />
          </Stack>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  )
}
