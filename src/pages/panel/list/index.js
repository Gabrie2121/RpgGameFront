import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect } from 'react'
import { Fragment, useState } from 'react'
import HttpClient from 'src/configs/httpClient'
import DialogItem from 'src/dialogs/dialogItem'

const Itens = () => {
  const [rarity, setRarity] = useState([])
  const [elements, setElements] = useState([])
  const [itemType, setItemType] = useState([])

  const [firarity, setFiRarity] = useState('')
  const [fielements, setFiElements] = useState('')
  const [fiitemType, setFiItemType] = useState('')
  const [search, setSearch] = useState([])

  const [acessItemJson, setAcessItemJson] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'nome', headerName: 'Nome', width: 450 },
    { field: 'descricao', headerName: 'Descrição', width: 500 },
    {
      field: 'Acessar',
      headerName: 'Acessar',
      width: 200,
      renderCell: params => (
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            acessItem(params.row.id)
          }}
        >
          <ArrowCircleRightIcon />{' '}
        </Button>
      )
    }
  ]

  const acessItem = id => {
    setModalOpen(true)

    HttpClient.get(`/items/find/${id}`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data + 'dataaaa')
          const arr = []
          arr.push(res.data)
          setAcessItemJson(arr)
        } else {
          throw new Error('Falha na solicitação')
        }
      })
      .catch(e => console.error('Erro na solicitação', e))
  }

  const searchItens = (id, razaoSocial) => {
    let params = {}
    if (fielements != '') {
      params['elemento'] = fielements
    }
    if (firarity != '') {
      params['raridade'] = firarity
    }
    if (fiitemType != '') {
      params['tipoDePeca'] = fiitemType
    }

    console.log(params)
    HttpClient.get('/items/search', { params: params })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          setSearch(res.data)
        } else {
          throw new Error('Falha na solicitação')
        }
      })
      .catch(e => console.error('Erro na solicitação', e))
  }

  useEffect(e => {
    getEnums()
  }, [])

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
    <Grid>
      <Fragment>
        <Card>
          <CardHeader title='Itens' />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={1}>
                <InputLabel id='ID'>Id</InputLabel>
                <TextField fullWidth labelId='ID' label='Código' size='small' />
              </Grid>
              <Grid item xs={12} sm={3}>
                <InputLabel id='rarity'>Raridade</InputLabel>
                <Select
                  fullWidth
                  size='small'
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
              <Grid item xs={12} sm={3}>
                <InputLabel id='element'>Elementos</InputLabel>
                <Select
                  fullWidth
                  size='small'
                  value={fielements}
                  onChange={e => setFiElements(e.target.value)}
                  labelId='element'
                >
                  <MenuItem value='' disabled>
                    Raridade
                  </MenuItem>
                  {elements.map((rarityOption, index) => (
                    <MenuItem key={index} value={rarityOption}>
                      {rarityOption}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={3}>
                <InputLabel id='element'>Elementos</InputLabel>
                <Select
                  fullWidth
                  size='small'
                  value={fiitemType}
                  onChange={e => setFiItemType(e.target.value)}
                  labelId='element'
                >
                  <MenuItem value='' disabled>
                    Raridade
                  </MenuItem>
                  {itemType.map((rarityOption, index) => (
                    <MenuItem key={index} value={rarityOption}>
                      {rarityOption}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardActions style={{ display: 'flex', justifyContent: 'space-between ' }}>
            <div>
              <Button
                size='small'
                type='submit'
                sx={{ mr: 2 }}
                variant='contained'
                startIcon={<SearchIcon />}
                onClick={e => {
                  searchItens()
                }}
              >
                Pesquisar
              </Button>
              <Button type='reset' size='small' color='secondary' variant='outlined' onClick={e => resetField()}>
                Reset
              </Button>
            </div>
            <Button
              size='small'
              type='submit'
              sx={{ mr: 2 }}
              variant='contained'
              color='success'
              startIcon={<AddCircleOutlineIcon />}
              onClick={e => setModalOpen(true)}
            >
              Novo Item
            </Button>
          </CardActions>
        </Card>
        <DataGrid
          autoHeight
          autoWidth
          rows={search}
          columns={columns}
          pageSizeOptions={[10, 25, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
        <DialogItem open={modalOpen} handleClose={handleModalClose} item={acessItemJson} />
      </Fragment>
    </Grid>
  )
}
Itens.acl = {
  action: 'read',
  subject: 'itens-page'
}

export default Itens
