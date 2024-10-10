import { type ReactElement } from 'react'
import { Box, Stack, Typography, Icon } from '@mui/material'

type ItemLog = {
  isPrincipal?: boolean
  text: string
  icon?: string
}

type LogsViewerProps = {
  logs: ItemLog[]
}

const LogsViewer = ({ logs }: LogsViewerProps): ReactElement => {
  return (
    <Box paddingLeft={4} marginLeft="8px" borderLeft="3px solid" borderColor="primary.main">
      <Stack gap={4}>
        {logs.map((log, index) => {
          if (log.isPrincipal) {
            return (
              <Box key={index} position="relative" minHeight={20} display="flex" alignItems="center">
                <Box
                  position="absolute"
                  left={-35}
                  bgcolor="background.default"
                  height={20}
                  width={20}
                  border="3px solid"
                  borderColor="primary.main"
                  borderRadius={20}
                />
                <Typography variant="body2" color="text.secondary">
                  {log.text}
                </Typography>
              </Box>
            )
          }

          return (
            <Stack key={index} gap={2} direction="row" alignItems="center">
              <Icon color="strongOrange">{log.icon ?? 'target'}</Icon>
              <Typography variant="body1">{log.text}</Typography>
            </Stack>
          )
        })}
      </Stack>
    </Box>
  )
}

export default LogsViewer
