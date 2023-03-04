import React from 'react';
import { Snackbar, Alert, Paper, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button, Container, Typography, Drawer, Box, IconButton, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Header from '../components/Header';
import DataTable from 'react-data-table-component';
import Loading from '../components/Loading';
import API from "../services";

import '../css/base.css';
import { Stack } from '@mui/system';
import { Close } from '@mui/icons-material';
import { green, red } from '@mui/material/colors';

export default function PageCategoryPayments()
{
    //List users
    const [list, setList] = React.useState([]);
    //Datatable state
    const [pending, setPending] = React.useState(true);
    //Dialog state
    const [dialog, setDialog] = React.useState({status: false, id: null});
    //Alert state
    const [alert, setAlert] = React.useState({});
    //Form States
    const [visibleCreate, setVisibleCreate] = React.useState(false);
    const [visibleEdit, setVisibleEdit] = React.useState(false);
    const [category_name, setName] = React.useState('');
    const [e_category_id, setEID] = React.useState('');
    const [e_category_name, setEName] = React.useState('');
    const [e_category_status, setEStatus] = React.useState('');

    const columns = [
        {
            name: 'id',
            width: '70px',
            center: true,
            selector: row => row.categoria_id,
        },
        {
            name: 'Categoria',
            sortable: true,
            selector: row => row.categoria_nome,
            
        },
        {
            name: 'Criado em',
            maxWidth: '80px',
            selector: row => row.created_at,
            center: true,
        },
        {
            name: 'Status',
            maxWidth: '80px',
            selector: row => (row.categoria_status === 1) ? "Ativo" : "Inativo",
            center: true,
        },
        {
            name: 'Ações',
            maxWidth: '120px',
            center: true,
            button: true,
            cell: row => (
                <div className='actions'>
                    <div className='suave btn waves' title="Editar" onClick={() => {setVisibleEdit(true); fillEdit(row);}} form='edit'>
                        <i className='material-icons' translate='no'>create</i>
                    </div>
                    <div className='suave btn waves' title="Excluir" onClick={() => setDialog({status: true, id: row.categoria_id})}>
                        <i className='material-icons' translate='no'>delete</i>
                    </div>
                </div>
    		),
        },
    ];

    const paginationComponentOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };
    
    async function getData()
    {
        let response = await API.get("categoria-pagamentos");
        if(response.data.length >= 0){
            setList(response.data);
            setPending(false);
            return;
        }
        setAlert({status: true, type: 'error', message: 'Falha ao carregar dados!'});
    }

    async function create(e)
    {
        e.preventDefault();
        try {
            let data = {
                "categoria_nome": category_name,
            };
            const request = await API.post("categoria-pagamentos", data);
            setVisibleCreate(false);
            if(request.data.message){
                setAlert({status: true, type: 'warning', message: request.data.message});
                return;
            }
            setName('');
            getData();
            setAlert({status: true, type: 'success', message: 'Dados cadastrados!'});
        } catch (error) {
            setVisibleCreate(false);
            setAlert({status: true, type: 'error', message: error.message});
            
        }
        
    }

    function fillEdit(data)
    {
        setEID(data.categoria_id);
        setEName(data.categoria_nome);
        setEStatus(data.categoria_status);
    }

    async function edit(e)
    {
        e.preventDefault();
        try {
            let data = {
                "categoria_nome": e_category_name,
                "categoria_status": Number(e_category_status)
            };
            const request = await API.post("categoria-pagamentos/"+e_category_id, data);
            setVisibleEdit(false);
            if(request.data.message){
                setAlert({status: true, type: 'warning', message: request.data.message});
                return;
            }
            getData();
            setAlert({status: true, type: 'success', message: 'Dados atualizados!'});
        } catch (error) {
            setVisibleEdit(false);
            setAlert({status: true, type: 'error', message: error.message});
            
        }
        
    }

    async function destroy(id)
    {
        try {
            const request = await API.delete("categoria-pagamentos/" + id);
            if(request.data.message){
                setAlert({status: true, type: 'warning', message: request.data.message});
                return;
            }
            getData();
            setAlert({status: true, type: 'success', message: 'Dados Deletados!'});
        } catch (error) {
            setAlert({status: true, type: 'error', message: error.message});
        }
    }

    React.useEffect(() => {
        getData();
    }, []);

    return(
        <>
            <Header />
            <main>
                <Paper sx={{ m: '16px'}} elevation={0} className="paper">
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ pb: 2}}>
                        <Typography variant='h5'>Cadastro de categorias de pagamento</Typography>
                        <Button variant='contained' onClick={() => setVisibleCreate(true)}>Nova categoria</Button>
                    </Stack>
                    <DataTable
                        columns={columns}
                        data={list}
                        striped={true}
                        noDataComponent={"Nenhum dado cadastrado"}
                        pagination={true}
                        paginationPerPage={10}
                        progressPending={pending}
                        progressComponent={<Loading />}
                        paginationComponentOptions={paginationComponentOptions}
                    />
                </Paper>
                <Snackbar 
                    open={alert.status}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    onClose={() => setAlert({status: false, type: alert.type, message: alert.message})}>
                    <Alert 
                        sx={{ width: '100%' }}
                        onClose={() => setAlert({status: false, type: alert.type, message: alert.message})}
                        severity={alert.type}>
                        {alert.message}
                    </Alert>
                </Snackbar>
                <Dialog
                    open={dialog.status}
                    onClose={() => setDialog({status: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Aviso:</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">Deseja realmente apagar este item?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ backgroundColor: green[600],'&:hover': {backgroundColor: green[800]}}} type='button' variant='contained' size='small' onClick={() => { destroy(dialog.id); setDialog({status: false})}}>Sim</Button>
                        <Button sx={{ backgroundColor: red[600],'&:hover': {backgroundColor: red[800]}}} type='button' variant='contained' size='small' onClick={() => setDialog({status: false})}>Não</Button>
                    </DialogActions>
                </Dialog>
                <Drawer
                    anchor={'right'}
                    open={visibleCreate}
                    onClose={() => setVisibleCreate(false)}>
                    <Box
                        sx={{
                        width: '400px',
                        padding: '16px'
                        }}>
                        <form id='create' onSubmit={create}>
                            <Stack sx={{ pb: 2}} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography variant='h5'>Criar</Typography>
                                <IconButton onClick={() => setVisibleCreate(false)}><Close /></IconButton>
                            </Stack>
                            <TextField 
                                sx={{ pb: 2}} 
                                id='name' 
                                type={'text'} 
                                label='Categoria'
                                variant='outlined' 
                                placeholder='Digite o nome' 
                                value={category_name} 
                                onChange={(e) => setName(e.target.value)} 
                                autoFocus fullWidth required />
                            <Button sx={{ width: '100%'}} variant='contained' size='large' type='submit'>Salvar alterações</Button>
                        </form>
                    </Box>
                </Drawer>
                <Drawer
                    anchor={'right'}
                    open={visibleEdit}
                    onClose={() => setVisibleEdit(false)}>
                    <Box
                        sx={{
                        width: '400px',
                        padding: '16px'
                        }}>
                        <form id='edit' onSubmit={edit}>
                            <Stack sx={{ pb: 2}} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography variant='h5'>Editar</Typography>
                                <IconButton onClick={() => setVisibleEdit(false)}><Close /></IconButton>
                            </Stack>
                            <input id='e_id' type='hidden' value={'e_id'} />
                            <TextField 
                                sx={{ pb: 2}} 
                                id='e_name' 
                                type={'text'} 
                                label='Nome' 
                                variant='outlined' 
                                placeholder='Digite o nome'
                                value={e_category_name} 
                                onChange={(e) => setEName(e.target.value)} 
                                autoFocus fullWidth required />
                            <FormControl sx={{ pb: 2}} fullWidth>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId='status-label'
                                    id='e_status'
                                    value={e_category_status}
                                    label='Status'
                                    onChange={(e) => setEStatus(e.target.value)}
                                    required>
                                    <MenuItem value={1}>Ativo</MenuItem>
                                    <MenuItem value={2}>Inativo</MenuItem>
                                </Select>
                            </FormControl>
                            <Button sx={{ width: '100%'}} variant='contained' size='large' type='submit'>Salvar alterações</Button>
                        </form>
                    </Box>
                </Drawer>
            </main>
        </>
    );
}