'use client'

import * as React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Button, Stack, Typography } from '@mui/material'
import HeaderCard from '@/components/common/cards/HeaderCard'
import AttendanceRequestsSelectionCard from '@/components/activities/Payout/AttendanceRequests/SelectionCard'
import { type AttendanceRequest } from '@/types/activities'
import ManagePayoutsCard from '@/components/activities/Payout/AttendanceRequests/ManagePayouts'
import DeniedRequestsCard from '@/components/activities/Payout/AttendanceRequests/ManageDeniedRequests/Card'
import HeaderSubtitle from '@/components/activities/Payout/AttendanceRequests/UploadReport/HeaderSubtitle'
import AttendanceRequestsStateCard from '@/components/activities/Payout/AttendanceRequests/StateCard'
import { useParams } from 'next/navigation'
import attendanceRequestsService from '@/features/activities/services/attendanceRequests.service'

const steps = Array.from({ length: 4 }, () => '')

export default function StepperActivitiesPayout() {
  const { id } = useParams()
  const stepGetter = (): number => {
    const storedSteps = JSON.parse(localStorage?.getItem('activitiesPayoutStep') ?? '0') as [
      { id: string; step: number },
    ]
    if (storedSteps) {
      const filteredStep = storedSteps.filter((storedStep) => storedStep.id == id)[0]
      if (filteredStep) return filteredStep.step
    }
    return 0
  }

  const stepSetter = (newStep: number) => {
    const storedSteps = JSON.parse(localStorage?.getItem('activitiesPayoutStep') ?? '0') as [
      { id: string; step: number },
    ]
    if (storedSteps) {
      localStorage.setItem(
        'activitiesPayoutStep',
        JSON.stringify([
          ...storedSteps.filter((storedSteps) => storedSteps.id != id),
          { id: id as string, step: newStep },
        ]),
      )
    } else {
      localStorage.setItem('activitiesPayoutStep', JSON.stringify([{ id: id as string, step: newStep }]))
    }
  }

  const [step, setStep] = React.useState<number>(stepGetter())
  const [attendanceRequests, setAttendanceRequests] = React.useState<AttendanceRequest[]>([])

  const attendanceRequestsForManagePayouts = React.useMemo(
    () => attendanceRequests.filter((request) => request.state),
    [attendanceRequests],
  )

  const handleBack = () => {
    stepSetter(step - 1)
    setStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNext = (nextStep?: number) => {
    if (step != 0) {
      stepSetter(nextStep ? nextStep : step + 1)
    }
    setStep((prevActiveStep) => (nextStep ? nextStep : prevActiveStep + 1))
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await attendanceRequestsService.getAttendanceRequests(String(id))
      setAttendanceRequests(data)
    }
    fetchData()
  }, [id])

  React.useEffect(() => {
    console.log(attendanceRequests)
  }, [attendanceRequests])

  return (
    <Stack gap="24px" sx={{ width: '100%' }}>
      <Stepper activeStep={step}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {step == 0 && (
        <Stack gap="24px">
          <HeaderCard
            title="Proof of completion"
            subtitle="Select the users you want to accept and payout rewards to"
          />
          <AttendanceRequestsSelectionCard requests={attendanceRequests} setRequests={setAttendanceRequests}>
            <Button
              color="primary"
              variant="contained"
              className="stepperButton"
              onClick={() => handleNext()}
              disabled={!(attendanceRequestsForManagePayouts.length > 0)}
            >
              Aprove
            </Button>
          </AttendanceRequestsSelectionCard>
        </Stack>
      )}
      {step == 1 && (
        <Stack gap="24px">
          <HeaderCard
            title="Manage Payouts"
            subtitleComponent={
              <Stack gap="4px" marginTop={4}>
                <Typography variant="body1" color="text.secondary">
                  1. Send Kolektivo Points and Stamps to the users through the Safe Wallet
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  2. Paste the transaction link for each user OR paste a bulk transaction link
                </Typography>
              </Stack>
            }
          />
          <ManagePayoutsCard
            requests={attendanceRequests}
            setRequests={setAttendanceRequests}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </Stack>
      )}
      {step == 2 && (
        <Stack gap="24px">
          <HeaderCard
            title="Denied Users"
            subtitle="Select a reason for denying users' rewards. You can also skip and address these at a later time."
          />
          <DeniedRequestsCard
            requests={attendanceRequests}
            setRequests={setAttendanceRequests}
            handleNext={handleNext}
          />
        </Stack>
      )}
      {step == 3 && (
        <Stack gap="24px">
          <HeaderCard title="Upload Report" subtitleComponent={<HeaderSubtitle />} />
          <AttendanceRequestsStateCard requests={attendanceRequests} setRequests={setAttendanceRequests} />
        </Stack>
      )}
    </Stack>
  )
}
