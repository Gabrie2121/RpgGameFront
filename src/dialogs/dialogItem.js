// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { styled } from '@mui/material/styles'
import DialogContentText from '@mui/material/DialogContentText'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  DialogTitle,
  Divider,
  Grid,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import HttpClient from 'src/configs/httpClient'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const menuPaperStyle = {
  maxHeight: '300px' // Define a altura máxima da lista suspensa
}

const DialogItem = ({ open, handleClose, item }) => {
  console.log(item)
  const [nome, setNome] = useState([])
  const [descricao, setDescricao] = useState([])
  const [rarity, setRarity] = useState([])
  const [elements, setElements] = useState([])
  const [itemType, setItemType] = useState([])
  const [forca, setForca] = useState('')
  const [destreza, setDestreza] = useState('')
  const [inteligencia, setInteligencia] = useState('')
  const [constituicao, setConstituicao] = useState('')
  const [sorte, setSorte] = useState('')

  const [firarity, setFiRarity] = useState('')
  const [fielements, setFiElements] = useState('')
  const [fiitemType, setFiItemType] = useState('')
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)
  const [errorDialogOpen, setErrorDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false)
  }

  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false)
  }
  useEffect(
    e => {
      console.log(item + ' aaaaaa')
      setNome(item && item.length > 0 ? item[0].nome : '')
      setDescricao(item && item.length > 0 ? item[0].descricao : '')
      setFiRarity(item && item.length > 0 ? item[0].raridade : '')
      setFiElements(item && item.length > 0 ? item[0].elemento : '')
      setFiItemType(item && item.length > 0 ? item[0].tipoDePeca : '')
      setForca(item && item.length > 0 ? item[0].forca : '')
      setDestreza(item && item.length > 0 ? item[0].destreza : '')
      setInteligencia(item && item.length > 0 ? item[0].inteligencia : '')
      setConstituicao(item && item.length > 0 ? item[0].constituicao : '')
      setSorte(item && item.length > 0 ? item[0].sorte : '')
      getEnums()
    },
    [open]
  )

  const createItens = () => {
    HttpClient.post('/items/create', {
      nome: nome,
      descricao: descricao,
      elemento: fielements,
      raridade: firarity,
      tipoDePeca: fiitemType,
      forca: forca,
      destreza: destreza,
      inteligencia: inteligencia,
      constituicao: constituicao,
      sorte: sorte,
      imagem: ''
    })
      .then(response => {
        console.log(response)
        setSuccessDialogOpen(true)
      })
      .catch(error => {
        console.log('erro ao gerar', error)
        setErrorMessage(error.response.data)
        setErrorDialogOpen(true)
      })
  }

  const getEnums = () => {
    HttpClient.get('/enum/rarities/all').then(res => {
      if (res.status === 200) {
        setRarity(res.data)
      }
    })
    HttpClient.get('/enum/item-types/all').then(res => {
      if (res.status === 200) {
        setItemType(res.data)
      }
    })
    HttpClient.get('/enum/elements/all').then(res => {
      if (res.status === 200) {
        setElements(res.data)
      }
    })
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        maxWidth='xl'
        maxHeigth='xl'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogContent>
          <DialogContentText sx={{ mb: 4 }}>
            <Card>
              <CardHeader title={item && item.length > 0 ? item[0].nome : ''} />
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={2}>
                    <TextField
                      label='Nome'
                      size='medium'
                      name='nome'
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label='descricao'
                      size='medium'
                      name='descricao'
                      value={descricao}
                      onChange={e => setDescricao(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      sx={{ padding: '16px' }}
                      component='label'
                      role={undefined}
                      variant='contained'
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <VisuallyHiddenInput type='file' />
                    </Button>
                  </Grid>
                </Grid>
                <br />
                <Grid container spacing={5}>
                  <Grid item xs={2}>
                    <Select
                      fullWidth
                      size='large'
                      value={fiitemType}
                      onChange={e => setFiItemType(e.target.value)}
                      labelId='element'
                    >
                      <MenuItem value='' disabled>
                        Tipo de item
                      </MenuItem>
                      {itemType.map((rarityOption, index) => (
                        <MenuItem key={index} value={rarityOption}>
                          {rarityOption}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={2}>
                    <Select
                      fullWidth
                      size='large'
                      value={fielements}
                      onChange={e => setFiElements(e.target.value)}
                      labelId='element'
                    >
                      <MenuItem value='' disabled>
                        Elementos
                      </MenuItem>
                      {elements.map((rarityOption, index) => (
                        <MenuItem key={index} value={rarityOption}>
                          {rarityOption}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={2}>
                    <Select
                      fullWidth
                      size='large'
                      value={firarity}
                      onChange={e => setFiRarity(e.target.value)}
                      labelId='rarity'
                    >
                      <MenuItem value='' disabled>
                        Raridade
                      </MenuItem>
                      {rarity.map((rarityOption, index) => (
                        <MenuItem key={index} value={rarityOption}>
                          {rarityOption}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
                <br />
                <Grid container spacing={5}>
                  <Grid item xs={2}>
                    <TextField
                      label='Força'
                      size='medium'
                      name='forca'
                      value={forca}
                      onChange={e => setForca(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label='Destreza'
                      size='medium'
                      name='destreza'
                      value={destreza}
                      onChange={e => setDestreza(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label='Inteligencia'
                      size='medium'
                      name='inteligencia'
                      value={inteligencia}
                      onChange={e => setInteligencia(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label='Constituição'
                      size='medium'
                      name='constituicao'
                      value={constituicao}
                      onChange={e => setConstituicao(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label='Sorte'
                      size='medium'
                      name='sorte'
                      value={sorte}
                      onChange={e => setSorte(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <br />
              <br />
              <Grid sx={{ display: 'flex', justifyContent: 'space-between', marginRight: '40px' }}>
                <div></div>
                <Button variant='contained' color='primary' onClick={createItens}>
                  SALVAR
                </Button>
              </Grid>
              <br />
            </Card>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {/**modal de certo ou errado */}
      <Dialog open={successDialogOpen} onClose={handleSuccessDialogClose}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>Item criado com sucesso.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessDialogClose} color='primary' autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {/* Popup de erro */}
      <Dialog open={errorDialogOpen} onClose={handleErrorDialogClose}>
        <DialogTitle>Not possible to create the user</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogClose} color='primary' autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogItem
