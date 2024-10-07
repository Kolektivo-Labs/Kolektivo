import { type CreateActivityReview, type CreateActivityRequirementsRewardsFormValues } from '@/types/activities'
import { type OrganizationInfo } from '@/types/organization'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Icon,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import Image from 'next/image'
import React from 'react'

type Props = {
  submitHandler: () => void
  handleBack: () => void
  review: CreateActivityReview
  defaultValues?: OrganizationInfo
}
export default function CreateActivityReview({ submitHandler, handleBack, review }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack gap="48px">
          <Box
            width={285}
            height={160}
            sx={{ backgroundColor: '#F2F2F2', borderRadius: '12px' }}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Image src={review.banner} alt="Selected" width={285} height={160} style={{ borderRadius: '12px' }} />
          </Box>
          <TextField
            id="activityName"
            variant="outlined"
            label="What’s the name of your activity?"
            value={review.detail.name}
            placeholder="Beach Cleanup"
          />
          <Stack gap="16px">
            <Typography variant="h3">When does your activity start and end?</Typography>
            <Stack direction="row" gap="16px">
              <TextField id="date" type="date" variant="outlined" placeholder="Date" />
              <TextField id="startTime" type="time" variant="outlined" placeholder="Start time" />
              <TextField id="endTime" type="time" variant="outlined" placeholder="End time" />
            </Stack>
          </Stack>
          <TextField
            id="location"
            type="search"
            variant="outlined"
            label="Where is it located?"
            placeholder="Enter location"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            id="activityName"
            variant="outlined"
            label="What can the attendee expect?"
            placeholder="Describe your activity"
            multiline
          />
          <TextField
            id="activityName"
            variant="outlined"
            label="What are the requirements for the attendee?"
            placeholder="Select requirement"
          />
          <TextField
            id="activityName"
            variant="outlined"
            label="How many Kolektivo Points can each attendee earn? "
            placeholder="Enter amount of points"
          />
          <TextField
            id="activityName"
            variant="outlined"
            label="Which stamps can the attendee earn?"
            placeholder="Select stamp"
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button onClick={handleBack} color="secondary">
          Go Back
        </Button>
        <Button
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onClick={(_) => submitHandler()}
          variant="contained"
          color="primary"
          className="stepperButton"
          disabled={!review}
        >
          Complete
        </Button>
      </CardActions>
      <Divider />
    </Card>
  )
}
