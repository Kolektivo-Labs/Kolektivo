'use client'

import ErrorDisplay from '@/components/common/display/ErrorDisplay'
import organizationsService from '@/features/organizations/services/organizations.service'
import { type Organization } from '@/types/organization'
import { useMutation, useQuery } from '@tanstack/react-query'
import { type ReactElement } from 'react'
import UpdateOrganizationForm from './UpdateOrganizationForm'
import DialogError from '@/components/common/modals/DialogError'
import DialogSuccess from '@/components/common/modals/DialogSuccess'
import { useRouter } from 'next/navigation'
import { Box, CircularProgress } from '@mui/material'

const UpdateOrganization = (): ReactElement => {
  const { data, error, isLoading, refetch } = useQuery<Organization | undefined>({
    queryKey: ['getMyOrganization'],
    queryFn: async () => await organizationsService.get(),
  })

  const mutation = useMutation({
    mutationFn: async (data: Organization) => await organizationsService.update(data),
  })
  const router = useRouter()

  const handleSave = (data: Organization) => {
    mutation.mutate(data)
  }

  const handleModalSuccess = () => {
    router.push('/my-organization')
  }

  const handleModalError = () => {
    mutation.reset()
  }

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
      <Box display="flex" justifyContent="center">
        <CircularProgress></CircularProgress>
      </Box>
    )
  }

  return (
    <>
      <UpdateOrganizationForm defaultValues={data} onSave={handleSave} />
      <DialogSuccess
        open={mutation.isSuccess}
        title="Profile Updated"
        description="Your organization profile has been successfully updated"
        onClickButton={handleModalSuccess}
      />
      <DialogError
        open={mutation.isError}
        title="An error occurred"
        description="Your organization profile could not be updated"
        onClickButton={handleModalError}
      />
    </>
  )
}

export default UpdateOrganization
