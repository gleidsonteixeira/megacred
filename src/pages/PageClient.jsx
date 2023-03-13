import React from 'react';
import { Snackbar, Alert, Paper, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button, Typography, Drawer, Box, IconButton, TextField, Select, MenuItem, InputLabel, FormControl, Avatar, Chip } from '@mui/material';
import InputMask from "react-input-mask";
import Header from '../components/Header';
import DataTable from 'react-data-table-component';
import Loading from '../components/Loading';
import { Stack } from '@mui/system';
import { Close } from '@mui/icons-material';
import { blue, green, grey, purple, red } from '@mui/material/colors';
import API from "../services";
import '../css/base.css';

export default function PageClient()
{
    //List users
    const [list, setList] = React.useState([]);
    const [listCategory, setListCategory] = React.useState([]);
    const [listState, setListState] = React.useState([]);
    //Datatable state
    const [pending, setPending] = React.useState(true);
    //Dialog state
    const [dialog, setDialog] = React.useState({status: false, id: null});
    //Alert state
    const [alert, setAlert] = React.useState({});
    //Form States
    const [visibleCreate, setVisibleCreate] = React.useState(false);
    const [visibleEdit, setVisibleEdit] = React.useState(false);
    const [client_name, setName] = React.useState('');
    const [client_alias, setAlias] = React.useState('');
    const [client_email, setEmail] = React.useState('');
    const [client_pic, setPic] = React.useState('');
    const [client_cpf, setCPF] = React.useState('');
    const [client_birth, setBirth] = React.useState('');
    const [client_job, setJob] = React.useState('');
    const [client_salary, setSalary] = React.useState('');
    const [client_contact, setContact] = React.useState('');
    const [client_phone, setPhone] = React.useState('');
    const [client_phone_secundary, setPhoneSecundary] = React.useState('');
    const [client_addres, setAddres] = React.useState('');
    const [client_addres_number, setAddresNumber] = React.useState('');
    const [client_addres_complement, setAddresComplement] = React.useState('');
    const [client_addres_district, setAddresDistrict] = React.useState('');
    const [client_addres_city, setAddresCity] = React.useState('');
    const [client_addres_state, setAddresState] = React.useState('');
    const [client_addres_zipcode, setAddresZipcode] = React.useState('');
    const [client_indication, setIndication] = React.useState('');
    const [client_indication_phone, setIndicationPhone] = React.useState('');
    const [client_limit, setLimit] = React.useState('');
    const [client_category, setCategory] = React.useState('');

    const [e_client_id, setEID] = React.useState('');
    const [e_client_name, setEName] = React.useState('');
    const [e_client_alias, setEAlias] = React.useState('');
    const [e_client_email, setEEmail] = React.useState('');
    const [e_client_pic, setEPic] = React.useState('');
    const [e_client_cpf, setECPF] = React.useState('');
    const [e_client_birth, setEBirth] = React.useState('');
    const [e_client_job, setEJob] = React.useState('');
    const [e_client_salary, setESalary] = React.useState('');
    const [e_client_contact, setEContact] = React.useState('');
    const [e_client_phone, setEPhone] = React.useState('');
    const [e_client_phone_secundary, setEPhoneSecundary] = React.useState('');
    const [e_client_addres, setEAddres] = React.useState('');
    const [e_client_addres_number, setEAddresNumber] = React.useState('');
    const [e_client_addres_complement, setEAddresComplement] = React.useState('');
    const [e_client_addres_district, setEAddresDistrict] = React.useState('');
    const [e_client_addres_city, setEAddresCity] = React.useState('');
    const [e_client_addres_state, setEAddresState] = React.useState('');
    const [e_client_addres_zipcode, setEAddresZipcode] = React.useState('');
    const [e_client_indication, setEIndication] = React.useState('');
    const [e_client_indication_phone, setEIndicationPhone] = React.useState('');
    const [e_client_status, setEStatus] = React.useState('');
    const [e_client_limit, setELimit] = React.useState('');
    const [e_client_category, setECategory] = React.useState('');

    const columns = [
        // {
        //     name: 'id',
        //     width: '70px',
        //     center: true,
        //     selector: row => row.cliente_id,
        // },
        {
            name: 'Foto',
            width: '70px',
            center: true,
            cell: row => (
                <Avatar 
                    sx={{color: grey[800]}}
                    onMouseOver={(e) => console.log(e.target)}
                    alt={row.cliente_nome}
                    src={`https://megacredsolucoes.com.br/assets/admin/images/clientes/${row.cliente_foto}`} />
            )
        },
        {
            name: 'Nome',
            sortable: true,
            selector: row => row.cliente_nome,
            
        },
        {
            name: 'Email',
            maxWidth: '250px',
            sortable: true,
            selector: row => row.cliente_email ? row.cliente_email : "---",
            
        },
        {
            name: 'CPF',
            maxWidth: '150px',
            center: true,
            selector: row => row.cliente_cpf ? row.cliente_cpf : "---",
            
        },
        {
            name: 'Avaliação',
            maxWidth: '80px',
            cell: row => {
                if(row.categoria.categoria_nome === 'Normal'){
                        return <Chip 
                            sx={{backgroundColor: green[500], fontSize: '12px', color: 'white'}}
                            size={'small'}
                            label={row.categoria.categoria_nome} />
                }
                if(row.categoria.categoria_nome === 'Bom'){
                        return <Chip 
                            sx={{backgroundColor: blue[500], fontSize: '12px', color: 'white'}}
                            size={'small'}
                            label={row.categoria.categoria_nome} />
                }
                if(row.categoria.categoria_nome === 'Vip'){
                        return <Chip 
                            sx={{backgroundColor: purple[500], fontSize: '12px', color: 'white'}}
                            size={'small'}
                            label={row.categoria.categoria_nome} />
                }
                return <Chip 
                    sx={{fontSize: '12px'}}
                    size={'small'}
                    label={row.categoria.categoria_nome} />
                
            },
            center: true,
        },
        {
            name: 'Criado em',
            maxWidth: '120px',
            selector: row => row.created_at,
            center: true,
        },
        {
            name: 'Status',
            maxWidth: '80px',
            selector: row => (row.cliente_status === 1) ? "Ativo" : "Inativo",
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
                    <div className='suave btn waves' title="Excluir" onClick={() => setDialog({status: true, id: row.cliente_id})}>
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
        let response = await API.get("clientes");
        if(response.data.length >= 0){
            setList(response.data);
            setPending(false);
            return;
        }
        setAlert({status: true, type: 'error', message: 'Falha ao carregar dados!'});
    }

    async function getCategory()
    {
        let response = await API.get("categoria-clientes");
        if(response.data.length >= 0){
            setListCategory(response.data);
            return;
        }
        setAlert({status: true, type: 'error', message: 'Falha ao carregar dados!'});
    }

    async function getAddresStates()
    {
        await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
            .then(response => response.json())
            .then(response => setListState(response));
    }

    async function searchZipcode()
    {
        if(client_addres_zipcode.length === 8){
            await fetch(`https://viacep.com.br/ws/${client_addres_zipcode}/json/`)
                .then(response => response.json())
                .then(response => {
                    setAddres(response.logradouro);
                    setAddresDistrict(response.bairro);
                    setAddresCity(response.localidade);
                    setAddresState(response.uf);
                });

        }
    }

    async function create(e)
    {
        e.preventDefault();
        try {
            let data = {
                "cliente_nome": client_name,
                "cliente_apelido": client_alias,
                "cliente_foto": client_pic,
                "cliente_cpf": client_cpf,
                "cliente_data_nascimento": client_birth,
                "cliente_profissao": client_job,
                "cliente_renda": client_salary,
                "cliente_telefone": client_phone,
                "cliente_contato": client_contact,
                "cliente_telefone2": client_phone_secundary,
                "cliente_email": client_email,
                "cliente_endereco": client_addres,
                "cliente_endereco_numero": client_addres_number,
                "cliente_endereco_complemento": client_addres_complement,
                "cliente_endereco_bairro": client_addres_district,
                "cliente_endereco_cidade": client_addres_city,
                "cliente_endereco_estado": client_addres_state,
                "cliente_endereco_cep": client_addres_zipcode,
                "cliente_indicador": client_indication,
                "cliente_indicador_telefone": client_indication_phone,
                "cliente_limite": client_limit,
                "categoria_id": client_category,
            };
            const request = await API.post("clientes", data);
            setVisibleCreate(false);
            if(request.data.message){
                setAlert({status: true, type: 'warning', message: request.data.message});
                return;
            }
            setName('');
            setAlias('');
            setEmail('');
            setPic('');
            setCPF('');
            setBirth('');
            setJob('');
            setSalary('');
            setPhone('');
            setContact('');
            setPhoneSecundary('');
            setAddres('');
            setAddresNumber('');
            setAddresComplement('');
            setAddresDistrict('');
            setAddresState('');
            setAddresZipcode('');
            setIndication('');
            setIndicationPhone('');
            setLimit('');
            setCategory('');
            getData();
            setAlert({status: true, type: 'success', message: 'Dados cadastrados!'});
        } catch (error) {
            setVisibleCreate(false);
            setAlert({status: true, type: 'error', message: error.message});
            
        }
        
    }

    function fillEdit(data)
    {
        setEID(data.cliente_id);
        setEName(data.cliente_nome);
        setEAlias(data.cliente_apelido);
        setEEmail(data.cliente_email);
        setEPic(data.cliente_foto);
        setECPF(data.cliente_cpf);
        setEBirth(data.cliente_data_nascimento);
        setEJob(data.cliente_profissao);
        setESalary(data.cliente_renda);
        setEPhone(data.cliente_telefone);
        setEContact(data.cliente_contato);
        setEPhoneSecundary(data.cliente_telefone2);
        setEAddres(data.cliente_endereco);
        setEAddresNumber(data.cliente_endereco_numero);
        setEAddresComplement(data.cliente_endereco_complemento);
        setEAddresDistrict(data.cliente_endereco_bairro);
        setEAddresState(data.cliente_endereco_estado);
        setEAddresZipcode(data.cliente_endereco_cep);
        setEIndication(data.cliente_indicador);
        setEIndicationPhone(data.cliente_indicador_telefone);
        setELimit(data.cliente_limite);
        setEStatus(data.cliente_status);
        setECategory(data.categoria_id);
    }

    async function edit(e)
    {
        e.preventDefault();
        try {
            let data = {
                "cliente_nome": e_client_name,
                "cliente_apelido": e_client_alias,
                "cliente_foto": e_client_pic,
                "cliente_cpf": e_client_cpf,
                "cliente_data_nascimento": e_client_birth,
                "cliente_profissao": e_client_job,
                "cliente_renda": e_client_salary,
                "cliente_telefone": e_client_phone,
                "cliente_contato": e_client_contact,
                "cliente_telefone2": e_client_phone_secundary,
                "cliente_email": e_client_email,
                "cliente_endereco": e_client_addres,
                "cliente_endereco_numero": e_client_addres_number,
                "cliente_endereco_complemento": e_client_addres_complement,
                "cliente_endereco_bairro": e_client_addres_district,
                "cliente_endereco_cidade": e_client_addres_city,
                "cliente_endereco_estado": e_client_addres_state,
                "cliente_endereco_cep": e_client_addres_zipcode,
                "cliente_indicador": e_client_indication,
                "cliente_indicador_telefone": e_client_indication_phone,
                "cliente_limite": e_client_limit,
                "cliente_status": e_client_status,
                "categoria_id": Number(e_client_category),
            };
            const request = await API.post("clientes/"+e_client_id, data);
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
            const request = await API.delete("clientes/" + id);
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
        getCategory();
        getAddresStates();
    }, []);

    return(
        <>
            <Header />
            <main>
                <Paper sx={{ m: '16px'}} elevation={0} className="paper">
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ pb: 2}}>
                        <Typography variant='h5'>Clientes</Typography>
                        <Button variant='contained' onClick={() => setVisibleCreate(true)}>Novo cliente</Button>
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
                        <form id='create' onSubmit={create} encType='multipart/form-data'>
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
                                value={client_name} 
                                onChange={(e) => setName(e.target.value)} 
                                autoFocus fullWidth required />
                            <TextField 
                                sx={{ pb: 2}} 
                                id='alias' 
                                type={'text'} 
                                label='Apelido'
                                variant='outlined' 
                                placeholder='Digite o apelido' 
                                value={client_alias} 
                                onChange={(e) => setAlias(e.target.value)} 
                                fullWidth />
                            <TextField 
                                sx={{ pb: 2}} 
                                id='email' 
                                type={'text'} 
                                label='Email'
                                variant='outlined' 
                                placeholder='Digite o email' 
                                value={client_email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                fullWidth />
                            <TextField 
                                sx={{ pb: 2}} 
                                id='pic' 
                                type={'file'} 
                                label='Foto'
                                variant='outlined' 
                                placeholder='Carregue a foto' 
                                value={client_pic} 
                                InputLabelProps={{shrink: true}}
                                onChange={(e) => setPic(e.target.value)} 
                                fullWidth />
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                spacing={2}>
                                <InputMask
                                    mask="000.000.000-00"
                                    value={client_cpf}
                                    disabled={false}
                                    >
                                    {() => {
                                        <TextField 
                                            sx={{ pb: 2}} 
                                            id='cpf' 
                                            type={'text'} 
                                            label='CPF'
                                            variant='outlined' 
                                            placeholder='000.000.000-00' 
                                            value={client_cpf} 
                                            onChange={(e) => setCPF(e.target.value)} 
                                            fullWidth required />
                                    }}
                                </InputMask>
                                <TextField 
                                    sx={{ pb: 2}} 
                                    id='birth' 
                                    type={'date'} 
                                    label='Data Nascimento'
                                    variant='outlined'
                                    value={client_birth}
                                    InputLabelProps={{shrink: true}}
                                    onChange={(e) => setBirth(e.target.value)} 
                                    fullWidth required />
                            </Stack>
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                spacing={2}>
                                <TextField 
                                    sx={{ pb: 2}} 
                                    id='job' 
                                    type={'text'} 
                                    label='Profissão'
                                    variant='outlined' 
                                    placeholder='profissão' 
                                    value={client_job} 
                                    onChange={(e) => setJob(e.target.value)} 
                                    fullWidth required />
                                <TextField 
                                    sx={{ pb: 2}} 
                                    id='salary' 
                                    type={'text'} 
                                    label='Renda mensal'
                                    variant='outlined' 
                                    placeholder='R$ 0,00' 
                                    value={client_salary} 
                                    onChange={(e) => setSalary(e.target.value)} 
                                    fullWidth required />
                            </Stack>
                            <TextField 
                                sx={{ pb: 2}} 
                                id='phone' 
                                type={'text'} 
                                label='Telefone'
                                variant='outlined' 
                                placeholder='(00) 00000-0000' 
                                value={client_phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                                fullWidth required />
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                spacing={2}>
                                <TextField 
                                    sx={{ pb: 2}} 
                                    id='contact' 
                                    type={'text'} 
                                    label='Contato secundário'
                                    variant='outlined' 
                                    placeholder='Nome do contato' 
                                    value={client_contact} 
                                    onChange={(e) => setContact(e.target.value)} 
                                    fullWidth required />
                                <TextField 
                                    sx={{ pb: 2}} 
                                    id='phone2' 
                                    type={'text'} 
                                    label='Telefone secundário'
                                    variant='outlined' 
                                    placeholder='(00) 00000-0000' 
                                    value={client_phone_secundary} 
                                    onChange={(e) => setPhoneSecundary(e.target.value)} 
                                    fullWidth required />
                            </Stack>
                            <TextField 
                                sx={{ pb: 2}} 
                                id='addres_zipcode' 
                                type={'text'} 
                                label='CEP'
                                variant='outlined' 
                                placeholder='' 
                                value={client_addres_zipcode} 
                                onKeyUp={() => searchZipcode()}
                                onChange={(e) => setAddresZipcode(e.target.value)} 
                                fullWidth required />
                            <TextField 
                                sx={{ pb: 2}} 
                                id='addres' 
                                type={'text'} 
                                label='Endereço'
                                variant='outlined' 
                                placeholder='Av...' 
                                value={client_addres} 
                                onChange={(e) => setAddres(e.target.value)} 
                                fullWidth required />
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                spacing={2}>
                                <TextField 
                                    sx={{ pb: 2}} 
                                    id='addres_number' 
                                    type={'text'} 
                                    label='Nº'
                                    variant='outlined' 
                                    placeholder='000' 
                                    value={client_addres_number} 
                                    onChange={(e) => setAddresNumber(e.target.value)} 
                                    fullWidth required />
                                <TextField 
                                    sx={{ pb: 2}} 
                                    id='addres_complement' 
                                    type={'text'} 
                                    label='Complemento'
                                    variant='outlined' 
                                    placeholder='000' 
                                    value={client_addres_complement} 
                                    onChange={(e) => setAddresComplement(e.target.value)} 
                                    fullWidth required />
                            </Stack>
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                spacing={2}>
                                <TextField 
                                    sx={{ pb: 2}} 
                                    id='addres_district' 
                                    type={'text'} 
                                    label='Bairro'
                                    variant='outlined' 
                                    placeholder='...' 
                                    value={client_addres_district} 
                                    onChange={(e) => setAddresDistrict(e.target.value)} 
                                    fullWidth required />
                                <TextField 
                                    sx={{ pb: 2}} 
                                    id='addres_city' 
                                    type={'text'} 
                                    label='Cidade'
                                    variant='outlined' 
                                    placeholder='...' 
                                    value={client_addres_city} 
                                    onChange={(e) => setAddresCity(e.target.value)} 
                                    fullWidth required />
                            </Stack>
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                spacing={2}>
                                <FormControl sx={{ pb: 2}} fullWidth>
                                    <InputLabel id="state-label">Estado</InputLabel>
                                    <Select
                                        labelId='state-label'
                                        id='state'
                                        value={client_addres_state}
                                        label='Estado'
                                        onChange={(e) => setAddresState(e.target.value)}
                                        required>
                                            <MenuItem key={0} value={"#"} disabled selected>Escolha o estado</MenuItem>
                                        {
                                            listState.map( s => <MenuItem key={s.id} value={s.sigla}>{s.nome}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                spacing={2}>
                                <TextField 
                                    sx={{ pb: 2}} 
                                    id='indication' 
                                    type={'text'} 
                                    label='Quem indicou?'
                                    variant='outlined' 
                                    placeholder='Nome' 
                                    value={client_indication} 
                                    onChange={(e) => setIndication(e.target.value)} 
                                    fullWidth required />
                                <TextField 
                                    sx={{ pb: 2}} 
                                    id='indication_phone' 
                                    type={'text'} 
                                    label='Telefone'
                                    variant='outlined' 
                                    placeholder='(00) 00000-0000' 
                                    value={client_indication_phone} 
                                    onChange={(e) => setIndicationPhone(e.target.value)} 
                                    fullWidth required />
                            </Stack>
                            <TextField 
                                sx={{ pb: 2}} 
                                id='limit' 
                                type={'text'} 
                                label='Limite'
                                variant='outlined' 
                                placeholder='R$ 0' 
                                value={client_limit} 
                                onChange={(e) => setLimit(e.target.value)} 
                                fullWidth/>
                            <FormControl sx={{ pb: 2}} fullWidth>
                                <InputLabel id="category-label">Categoria</InputLabel>
                                <Select
                                    labelId='category-label'
                                    id='category'
                                    value={client_category}
                                    label='Categoria'
                                    onChange={(e) => setCategory(e.target.value)}
                                    required>
                                        <MenuItem key={0} value={"#"} disabled selected>Escolha a categoria</MenuItem>
                                    {
                                        listCategory.map( c => <MenuItem key={c.categoria_id} value={c.categoria_id}>{c.categoria_nome}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                            <Button sx={{ width: '100%'}} variant='contained' size='large' type='submit'>Salvar alterações</Button>
                        </form>
                    </Box>
                </Drawer>
                {/* <Drawer
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
                                value={e_costcenter_name} 
                                onChange={(e) => setEName(e.target.value)} 
                                autoFocus fullWidth required />
                            <TextField 
                                sx={{ pb: 2}} 
                                id='e_description' 
                                type={'text'} 
                                label='Descrição' 
                                variant='outlined' 
                                placeholder='Digite a descrição'
                                value={e_costcenter_description} 
                                onChange={(e) => setEDescription(e.target.value)} 
                                fullWidth required />
                            <FormControl sx={{ pb: 2}} fullWidth>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId='status-label'
                                    id='e_status'
                                    value={e_costcenter_status}
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
                </Drawer> */}
            </main>
        </>
    );
}