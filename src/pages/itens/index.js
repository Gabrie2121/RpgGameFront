import Grid from '@mui/material/Grid'

const Itens = () => {
  return <Grid container spacing={6}></Grid>
}
Itens.acl = {
  action: 'read',
  subject: 'itens-page'
}

export default Itens
