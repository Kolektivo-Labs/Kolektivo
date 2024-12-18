import ImpactLog from '@/components/impact/ImpactLog'
import { Stack } from '@mui/material'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impact',
}

export default function Page() {
  return (
    <Stack gap={4}>     
      <ImpactLog />
    </Stack>
  )
}
