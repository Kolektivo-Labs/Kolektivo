'use client'

import { type Theme, type PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import typography from './typography'
import lightPalette from './lightPalette'
import { materialSymbolsOutlined } from '@/theme/fonts'
import IconSelect from '@/components/common/inputs/select/IconSelect'

const spacing = 6

const createSafeTheme = (mode: PaletteMode): Theme => {
  const colors = lightPalette

  return createTheme({
    palette: {
      mode,
      ...colors,
    },
    cssVariables: true,
    typography,
    spacing,
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: spacing * 4,
          },
        },
      },
      MuiCardActions: {
        defaultProps: {
          disableSpacing: true,
        },
        styleOverrides: {
          root: {
            gap: '16px',
            padding: spacing * 4,
            borderTop: `1px solid ${colors.border.main}`,
            justifyContent: 'end',
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
          variant: 'standard',
          disableAnimation: true,
          sx: {
            position: 'relative',
            fontSize: '18px',
            fontWeight: 700,
            textTransform: { scale: 1 },
            marginBottom: 2,
            color: colors.text.primary,
          },
        },
        styleOverrides: {
          shrink: {
            transform: 'scale(1) !important',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          multiline: {
            padding: '0 !important',
            minHeight: '144px',
            alignItems: 'start',
          },
        },
      },
      MuiOutlinedInput: {
        defaultProps: {
          fullWidth: true,
          notched: false,
        },
        styleOverrides: {
          input: {
            padding: spacing * 2,
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            margin: 0,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          contained: {
            padding: '17px 40px',
            textTransform: 'capitalize',
          },
          text: {
            padding: '17px 40px',
            textTransform: 'capitalize',
            color: colors.text.primary,
          },
          sizeSmall: {
            padding: '9px 11px',
            fontSize: '14px',
          },
        },
      },
      MuiIcon: {
        defaultProps: {
          baseClassName: materialSymbolsOutlined.className,
        },
        styleOverrides: {
          root: {
            lineHeight: '27px',
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: IconSelect,
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.background.paper,
            color: colors.secondary.contrastText,
            borderBottom: `1px solid ${colors.secondary.dark}`,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            gap: spacing * 2,
            padding: `${spacing * 3}px ${spacing * 4}px`,
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 'auto',
          },
        },
      },
      MuiListItemText: {
        defaultProps: {
          primaryTypographyProps: {
            fontWeight: 700,
            color: colors.text.secondary,
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          PaperProps: {
            elevation: 0,
            sx: {
              minWidth: 472,
            },
          },
          slotProps: {
            backdrop: {
              sx: {
                backgroundColor: '#000000B2',
              },
            },
          },
        },
      },
      MuiDialogActions: {
        defaultProps: {
          sx: {
            padding: 4,
            paddingTop: 0,
          },
        },
      },
    },
  })
}

export default createSafeTheme