'use client'

import { Box, Button, CardContent, Divider, TextField } from '@mui/material'
import ItemsCard from '@/components/common/cards/ItemsCard'
import { type AttendanceRequest } from '@/types/activities'
import ManagePayoutRequestCard from '@/components/activities/Payout/AttendanceRequests/ManagePayouts/RequestCard'
import { useForm } from 'react-hook-form'
import attendanceRequestsService from '@/features/activities/services/attendanceRequests.service'
import { type ChangeEvent, useEffect, useState } from 'react'

type Props = {
  requests: AttendanceRequest[]
  setRequests: React.Dispatch<React.SetStateAction<AttendanceRequest[]>>
  handleBack: () => void
  handleNext: (nextStep?: number) => void
}

export default function ManagePayoutsCard({ requests, setRequests, handleBack, handleNext }: Props) {
  const { register, handleSubmit } = useForm<string[]>()
  const [transactionLinks, setTransactionLinks] = useState<string[]>(
    requests.filter((request) => request.state == 'forManagePayout').map((request) => request.payoutTransactionLink),
  )
  const handleChangeTransactionLinks = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    console.log(event)
    const value = event.target.value
    const updatedTransactionLinks = [...transactionLinks]
    updatedTransactionLinks[index] = value
    setTransactionLinks(updatedTransactionLinks)
  }
  const submitHandler = (event: { [key: number]: string }) => {
    const updatedRequests = [...requests]
    Object.keys(event).forEach((key) => {
      const numberKey = Number(key)
      if (event[numberKey] != '') {
        updatedRequests[numberKey].payoutTransactionLink = event[numberKey]
        updatedRequests[numberKey].state = 'completed'
        updatedRequests[numberKey].denialReason = ''
      }
    })
    setRequests(updatedRequests)
    attendanceRequestsService.setAttendanceRequest(updatedRequests)
    handleNext()
  }
  useEffect(() => {
    if (requests.filter((request) => request.state == 'forManagePayout').length == 0) handleNext(2)
  }, [requests, handleNext])
  useEffect(() => {
    console.log(transactionLinks)
  }, [transactionLinks])
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <ItemsCard
        title="Attendee"
        actions={
          <>
            <Button onClick={handleBack}>Go Back</Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className="stepperButton"
              disabled={transactionLinks.filter((transactionLink) => transactionLink == '').length > 0}
            >
              Confirm
            </Button>
          </>
        }
      >
        {requests?.map((request, index) => {
          if (request.state == 'forManagePayout')
            return (
              <Box key={index}>
                <Divider />
                <CardContent>
                  <ManagePayoutRequestCard request={request}>
                    <TextField
                      id="payoutTransactionLink"
                      variant="outlined"
                      placeholder="Transaction link"
                      onChange={(event) => handleChangeTransactionLinks(event, index)}
                      slotProps={{
                        htmlInput: { ...register(`${index}`) },
                      }}
                      sx={{ width: '60%' }}
                    />
                  </ManagePayoutRequestCard>
                </CardContent>
              </Box>
            )
        })}
      </ItemsCard>
    </form>
  )
}
