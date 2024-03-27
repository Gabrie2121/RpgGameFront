import { Box, Drawer, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Grid'
import { useEffect, useState } from 'react'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const Sidebar = ({ open }) => {
  const [user, setUser] = useState('')
  useEffect(
    e => {
      console.log(localStorage.getItem('userData').username)
      setUser(JSON.parse(localStorage.getItem('userData')).username)
    },
    [user]
  )

  return (
    <Drawer
      variant='permanent'
      open={open}
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs>
            <Item>{user}</Item>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  )
}

export default Sidebar
