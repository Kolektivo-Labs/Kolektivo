'use client'

import { Communities } from '@/types/communities'
import { Stack, Card, CardHeader, CardContent, Skeleton } from '@mui/material'
import { type ReactElement } from 'react'
import CardsCommunities from '../CardsCommunities'
import StatsCommunities from '../StatsCommunities'
import communitiesService from '@/features/communities/services/communities.service'
import { useQuery } from '@tanstack/react-query'
import ErrorDisplay from '@/components/common/display/ErrorDisplay'

const StackCommunities = (): ReactElement => {
  const { data, isLoading, error, refetch } = useQuery<Communities | undefined>({
    queryKey: ['getCommunities'],
    queryFn: async () => await communitiesService.get(),
  })

  if (error) {
    return (
      <ErrorDisplay
        onClickButton={() => {
          refetch()
        }}
      />
    )
  }

  if (isLoading) {
    return (
      <Stack gap={4}>
        <StatsCommunities communities={undefined} />
        <Card>
          <CardHeader title="Kolektivo Communities" />
          <CardContent>
            <Skeleton width={800} height={180}></Skeleton>
          </CardContent>
        </Card>
      </Stack>
    )
  }

  if (data && data.communities && data.communities.length > 0) {
    return (
      <Stack gap={4}>
        <StatsCommunities communities={data!} />
        <Card>
          <CardHeader title="Kolektivo Communities" />
          <CardContent>
            <CardsCommunities communities={data!} />
          </CardContent>
        </Card>
      </Stack>
    )
  }
  return (
    <Stack gap={4}>
      <Card>
        <CardHeader title="Kolektivo Communities" />
        <CardContent></CardContent>
      </Card>
    </Stack>
  )
}

export default StackCommunities
