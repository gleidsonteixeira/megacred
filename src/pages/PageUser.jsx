import React from 'react';
import { Snackbar, Alert, Paper, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button, Typography, Drawer, Box, IconButton, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Header from '../components/Header';
import DataTable from 'react-data-table-component';
import Loading from '../components/Loading';
import API from "../services";

import '../css/base.css';
import { Stack } from '@mui/system';
import { Close } from '@mui/icons-material';
import { green, red } from '@mui/material/colors';

export default function PageUser()
{
    //List users
    const [users, setUsers] = React.useState([]);
    //Datatable state
    const [pending, setPending] = React.useState(true);
    //Dialog state
    const [dialog, setDialog] = React.useState({status: false, id: null});
    //Alert state
    const [alert, setAlert] = React.useState({});
    //Form States
    const [visibleCreate, setVisibleCreate] = React.useState(false);
    const [visibleEdit, setVisibleEdit] = React.useState(false);
    const [e_id, setID] = React.useState('');
    const [e_name, setName] = React.useState('');
    const [e_email, setEmail] = React.useState('');
    const [e_password, setPassword] = React.useState('');
    const [e_phone, setPhone] = React.useState('');
    const [e_level, setLevel] = React.useState('');
    const [e_status, setStatus] = React.useState('');

    const columns = [
        // {
        //     name: 'id',
        //     width: '70px',
        //     center: true,
        //     // sortable: true,
        //     selector: row => row.id,
        // },
        {
            name: 'Nome',
            sortable: true,
            selector: row => row.name,
            
        },
        {
            name: 'Email',
            sortable: true,
            selector: row => row.email,
        },
        {
            name: 'Telefone',
            maxWidth: '120px',
            selector: row => row.phone ? row.phone : '---',
            center: true
        },
        {
            name: 'level',
            maxWidth: '120px',
            // sortable: true,
            selector: row => (row.level === 1) ? "Admin" : "Funcionário",
            center: true,
        },
        {
            name: 'Status',
            maxWidth: '80px',
            // sortable: true,
            selector: row => (row.status === 1) ? "Ativo" : "Inativo",
            center: true,
        },
        {
            name: 'Ações',
            maxWidth: '120px',
            center: true,
            button: true,
            cell: row => (
                <div className='actions'>
                    <div className='suave btn waves' onClick={() => {setVisibleEdit(true); fillEdit(row);}} form='edit'>
                        <i className='material-icons' translate='no'>create</i>
                    </div>
                    <div className='suave btn waves' onClick={() => setDialog({status: true, id: row.id})}>
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
    
    async function getUsers()
    {
        let response = await API.get("users");
        if(response.data.length >= 0){
            setUsers(response.data);
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
                "name": e.target.name.value,
                "email": e.target.email.value,
                "password": e.target.password.value,
                "phone": e.target.phone.value,
                "level": Number(e_level),
                // "status": Number(e_status)
            };
            const request = await API.post("users", data);
            setVisibleCreate(false);
            if(request.data.message){
                setAlert({status: true, type: 'warning', message: request.data.message});
                return;
            }
            getUsers();
            setAlert({status: true, type: 'success', message: 'Dados cadastrados!'});
        } catch (error) {
            setVisibleCreate(false);
            setAlert({status: true, type: 'error', message: error.message});
            
        }
        
    }

    function fillEdit(data)
    {
        setID(data.id);
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
        setPhone(data.phone);
        setLevel(data.level);
        setStatus(data.status);
    }

    async function edit(e)
    {
        e.preventDefault();
        try {
            let data = {
                "name": e_name,
                "email": e_email,
                "password": e_password,
                "phone": e_phone,
                "level": Number(e_level),
                "status": Number(e_status)
            };
            const request = await API.post("users/"+e_id, data);
            setVisibleEdit(false);
            if(request.data.message){
                setAlert({status: true, type: 'warning', message: request.data.message});
                return;
            }
            getUsers();
            setAlert({status: true, type: 'success', message: 'Dados atualizados!'});
        } catch (error) {
            setVisibleEdit(false);
            setAlert({status: true, type: 'error', message: error.message});
            
        }
        
    }

    async function destroy(id)
    {
        try {
            const request = await API.delete("users/" + id);
            if(request.data.message){
                setAlert({status: true, type: 'warning', message: request.data.message});
                return;
            }
            getUsers();
            setAlert({status: true, type: 'success', message: 'Dados Deletados!'});
        } catch (error) {
            setAlert({status: true, type: 'error', message: error.message});
        }
    }

    React.useEffect(() => {
        getUsers();
    }, []);

    return(
        <>
            <Header />
            <Paper sx={{ m: '16px', mt: 8}} elevation={0} className="paper">
                <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ pb: 2}}>
                    <Typography variant='h5'>Usuários</Typography>
                    <Button variant='contained' onClick={() => setVisibleCreate(true)}>Novo usuário</Button>
                </Stack>
                <DataTable
                    columns={columns}
                    data={users}
                    noDataComponent={"Nenhum dado cadastrado"}
                    striped={true}
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
                            label='Nome'
                            variant='outlined' 
                            placeholder='Digite o nome' 
                            autoFocus={true} 
                            fullWidth required />
                        <TextField 
                            sx={{ pb: 2}} 
                            id='email' 
                            type={'text'} 
                            label='Email' 
                            variant='outlined' 
                            placeholder='Digite o email' 
                            fullWidth required />
                        <TextField 
                            sx={{ pb: 2}} 
                            id='password' 
                            type={'password'} 
                            label='Senha' 
                            variant='outlined' 
                            placeholder='******' 
                            autoComplete='new-password' 
                            fullWidth required />
                        <TextField 
                        sx={{ pb: 2}} 
                            id='phone'
                            type={'text'} 
                            label='Telefone' 
                            variant='outlined' 
                            placeholder='(00) 00000-0000' 
                            fullWidth required />
                        <FormControl sx={{ pb: 2}} fullWidth>
                            <InputLabel id="level-label">Nível</InputLabel>
                            <Select
                                labelId='level-label'
                                id='level'
                                label='level'
                                onChange={(e) => setLevel(e.target.value)}
                                required>
                                <MenuItem value={1}>Admin</MenuItem>
                                <MenuItem value={2}>Funcionário</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <FormControl sx={{ pb: 2}} fullWidth>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId='status-label'
                                id='status'
                                label='Status'
                                onChange={(e) => setStatus(e.target.value)}
                                required>
                                <MenuItem value={1}>Ativo</MenuItem>
                                <MenuItem value={2}>Inativo</MenuItem>
                            </Select>
                        </FormControl> */}
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
                            value={e_name} 
                            onChange={(e) => setName(e.target.value)} 
                            fullWidth required />
                        <TextField 
                            sx={{ pb: 2}} 
                            id='e_email' 
                            type={'text'} 
                            label='Email' 
                            variant='outlined' 
                            placeholder='Digite o email'
                            value={e_email} 
                            onChange={(e) => setEmail(e.target.value)}  
                            fullWidth required />
                        <TextField 
                            sx={{ pb: 2}} 
                            id='e_password' 
                            type={'password'} 
                            label='Senha' 
                            variant='outlined' 
                            placeholder='******' 
                            autoComplete='new-password' 
                            value={e_password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            fullWidth required />
                        <TextField 
                            sx={{ pb: 2}} 
                            id='e_phone' 
                            type={'text'} 
                            label='Telefone' 
                            variant='outlined' 
                            placeholder='(00) 00000-0000'
                            value={e_phone} 
                            onChange={(e) => setPhone(e.target.value)}  
                            fullWidth required />
                        <FormControl sx={{ pb: 2}} fullWidth>
                            <InputLabel id="level-label">Nível</InputLabel>
                            <Select
                                labelId='level-label'
                                id='e_level'
                                value={e_level}
                                label='level'
                                onChange={(e) => setLevel(e.target.value)}
                                required>
                                <MenuItem value={1}>Admin</MenuItem>
                                <MenuItem value={2}>Funcionário</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ pb: 2}} fullWidth>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId='status-label'
                                id='e_status'
                                value={e_status}
                                label='Status'
                                onChange={(e) => setStatus(e.target.value)}
                                required>
                                <MenuItem value={1}>Ativo</MenuItem>
                                <MenuItem value={2}>Inativo</MenuItem>
                            </Select>
                        </FormControl>
                        <Button sx={{ width: '100%'}} variant='contained' size='large' type='submit'>Salvar alterações</Button>
                    </form>
                </Box>
            </Drawer>
        </>
    );
}