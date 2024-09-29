import { Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { myVendors } from '@/constants/vendors/main'
import React, { type ReactNode } from 'react'
import Vendor from './Vendor'

type Props = {
  children?: ReactNode
}

export default function MyVendorsCard({ children }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack paddingBottom="24px">
          <Typography variant="h2">My Vendor(s)</Typography>
        </Stack>
        {myVendors.map((vendor, index) => (
          <Stack key={index}>
            <Divider />
            <Vendor img={vendor.imgSrc} title={vendor.title} description={vendor.description} />
          </Stack>
        ))}
        {children}
      </CardContent>
    </Card>
  )
}
