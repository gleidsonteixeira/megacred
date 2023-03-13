import React from 'react';
import { AccountBalanceWallet, AccountCircle, BarChart, CurrencyExchange, MonetizationOn, PieChart } from '@mui/icons-material';
import { Divider, Grid, Paper, Typography, Stack, Snackbar, Alert } from '@mui/material';
import { amber, cyan, green, red } from '@mui/material/colors';
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend }from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import Header from '../components/Header';
import API from "../services";
import '../css/base.css';
import '../css/home.css';
ChartJS.register(CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {

    const [clientesAtivos, setClienteAtivos] = React.useState(0);
    const [clientesTotal, setClienteTotal] = React.useState([]);
    const [alert, setAlert] = React.useState({});

    const NovosClientesChart = () => {
        let labels = ['01/03/2023', '02/03/2023', '03/03/2023', '04/03/2023', '05/03/2023', '06/03/2023', '07/03/2023'];
        let options = {
            plugins: {
                legend: {
                    position: 'bottom',
                    display: false
                },
            },
        };
        let data = {
            labels,
            datasets: [
                {
                label: "Cadastros",
                data: [1,2,3,4,5,6,7],
                backgroundColor: [cyan[500]],
                }
            ],
        };
        return <Pie width={100} height={30} options={options} data={data} />
    }

    const InvestidoPorContaChart = () => {
        let labels = ['01/03/2023', '02/03/2023', '03/03/2023', '04/03/2023', '05/03/2023', '06/03/2023', '07/03/2023'];
        let options = {
            plugins: {
                legend: {
                    position: 'bottom',
                    display: false
                },
            },
        };
        let data = {
            labels,
            datasets: [
                {
                label: "Conta",
                data: [1,2,3,4,5,6,7],
                backgroundColor: [green[500]],
                }
            ],
        };
        return <Pie width={100} height={30} options={options} data={data} />
    }

    const GastoPorContaChart = () => {
        let labels = ['01/03/2023', '02/03/2023', '03/03/2023', '04/03/2023', '05/03/2023', '06/03/2023', '07/03/2023'];
        let options = {
            plugins: {
                legend: {
                    position: 'bottom',
                    display: false
                },
            },
        };
        let data = {
            labels,
            datasets: [
                {
                label: "Gasto",
                data: [1,2,3,4,5,6,7],
                backgroundColor: [amber[500]],
                }
            ],
        };
        return <Pie width={100} height={30} options={options} data={data} />
    }

    const GastoPorCatgoriaChart = () => {
        let labels = ['01/03/2023', '02/03/2023', '03/03/2023', '04/03/2023', '05/03/2023', '06/03/2023', '07/03/2023'];
        let options = {
            plugins: {
                legend: {
                    position: 'bottom',
                    display: false
                },
            },
        };
        let data = {
            labels,
            datasets: [
                {
                label: "Conta",
                data: [1,2,3,4,5,6,7],
                backgroundColor: [red[500]],
                }
            ],
        };
        return <Pie width={100} height={30} options={options} data={data} />
    }

    const VencimentosDoMesChart = () => {
        let labels = ['01/03/2023', '02/03/2023', '03/03/2023', '04/03/2023', '05/03/2023', '06/03/2023', '07/03/2023'];
        let options = {
            plugins: {
              legend: {
                position: 'top',
              },
            },
          };
          
          let data = {
            labels,
            datasets: [
              {
                label: 'Vencidos de Março',
                data: [1,2,1,0,1,4,2],
                backgroundColor: red[500],
              },
            ],
          };
          return <Bar width={100} height={30} options={options} data={data} />
    }

    const ReceitasDoMesChart = () => {
        let labels = ['01/03/2023', '02/03/2023', '03/03/2023', '04/03/2023', '05/03/2023', '06/03/2023', '07/03/2023'];
        let options = {
            plugins: {
              legend: {
                position: 'top',
              },
            },
          };
          
          let data = {
            labels,
            datasets: [
              {
                label: 'Receitas de Março',
                data: [50,80,30,150,125,90,70],
                backgroundColor: green[500],
              },
            ],
          };
          return <Bar width={100} height={30} options={options} data={data} />
    }

    const ReceitasDespesasChart = () => {
        let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        let options = {
            plugins: {
              legend: {
                position: 'top',
              },
            },
          };
          
          let data = {
            labels,
            datasets: [
              {
                label: 'Receitas',
                data: [1,2,3,4,5,6,7],
                backgroundColor: cyan[500],
              },
              {
                label: 'Despesas',
                data: [1,2,3,4,5,6,7],
                backgroundColor: red[500],
              },
              {
                label: 'Lucro',
                data: [1,2,3,4,5,6,7],
                backgroundColor: green[500],
              },
            ],
          };
          return <Bar width={100} height={30} options={options} data={data} />
    }

    async function getDados()
    {
        let response = await API.get("dashboard");
        if(response.data != null){
            setClienteAtivos(response.data.clientesAtivos);
            setClienteTotal(response.data.clientesTotal);
            return;
        }
        setAlert({status: true, type: 'error', message: 'Falha ao carregar dados!'});
    }

    React.useEffect(() => {
        getDados();
    }, []);


    return (
        <>
            <Header />
            <main>

                <Grid
                    sx={{ p: '16px'}}
                    container
                    spacing={{md: 2}}>
                    <Grid item md={3}>
                        <Paper elevation={0} className="paper">
                            <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
                                <AccountCircle 
                                    sx={{ 
                                        width: '60px',
                                        height: '60px',
                                        textAlign: 'center',
                                        color: amber[600],
                                        borderRadius: '5px'}} />
                                <Typography variant='p' fontSize={'14px'}>Empréstimos em andamento: <h2>{clientesAtivos}</h2></Typography>
                            </Stack>
                            <Divider sx={{mt: 1, mb: 1}} />
                            <Typography textAlign={'center'}>Clientes ativos | Clientes cadastrados: <br /><strong>{clientesAtivos} | {clientesTotal.length}</strong></Typography>
                        </Paper>
                    </Grid>
                    <Grid item md={3}>
                        <Paper elevation={0} className="paper">
                            <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
                                <AccountBalanceWallet 
                                    sx={{ 
                                        width: '60px',
                                        height: '60px',
                                        textAlign: 'center',
                                        color: cyan[600],
                                        borderRadius: '5px'}} />
                                <Typography variant='p' fontSize={'14px'}>Total já recebido - Março: <h2>R$ 1300,00</h2></Typography>
                            </Stack>
                            <Divider sx={{mt: 1, mb: 1}} />
                            <Typography textAlign={'center'}>Não recebidos ontem: <br /><strong>0</strong></Typography>
                        </Paper>
                    </Grid>
                    <Grid item md={3}>
                        <Paper elevation={0} className="paper">
                            <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
                                <MonetizationOn 
                                    sx={{ 
                                        width: '60px',
                                        height: '60px',
                                        textAlign: 'center',
                                        color: red[600],
                                        borderRadius: '5px'}} />
                                <Typography variant='p' fontSize={'14px'}>Total já gasto - Março: <h2>R$ 0</h2></Typography>
                            </Stack>
                            <Divider sx={{mt: 1, mb: 1}} />
                            <Typography textAlign={'center'}>Despesas: <br /><strong>0</strong></Typography>
                        </Paper>
                    </Grid>
                    <Grid item md={3}>
                        <Paper elevation={0} className="paper">
                            <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
                                <CurrencyExchange 
                                    sx={{ 
                                        width: '60px',
                                        height: '60px',
                                        textAlign: 'center',
                                        color: green[600],
                                        borderRadius: '5px'}} />
                                <Typography variant='p' fontSize={'14px'}>Receitas | Despesas - Março: <h2>R$ 1300,00</h2></Typography>
                            </Stack>
                            <Divider sx={{mt: 1, mb: 1}} />
                            <Typography textAlign={'center'}>Receitas - Despesas - Empréstimos: <br /><strong>R$ 1300,00</strong></Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid
                    sx={{ p: '16px', pt: '0'}}
                    container
                    spacing={{md: 2}}>
                    <Grid item md={3}>
                        <Paper elevation={0} className="paper">
                            <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
                                <PieChart 
                                    sx={{ 
                                        width: '60px',
                                        height: '60px',
                                        textAlign: 'center',
                                        color: cyan[600],
                                        borderRadius: '5px'}} />
                                <Typography variant='p' fontSize={'14px'}>Novos clientes - Março:</Typography>
                            </Stack>
                            <NovosClientesChart />
                        </Paper>
                    </Grid>
                    <Grid item md={3}>
                        <Paper elevation={0} className="paper">
                            <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
                                <PieChart 
                                    sx={{ 
                                        width: '60px',
                                        height: '60px',
                                        textAlign: 'center',
                                        color: green[600],
                                        borderRadius: '5px'}} />
                                <Typography variant='p' fontSize={'14px'}>Total investido por conta bancária - Março:</Typography>
                            </Stack>
                            <InvestidoPorContaChart />
                        </Paper>
                    </Grid>
                    <Grid item md={3}>
                        <Paper elevation={0} className="paper">
                            <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
                                <PieChart 
                                    sx={{ 
                                        width: '60px',
                                        height: '60px',
                                        textAlign: 'center',
                                        color: amber[600],
                                        borderRadius: '5px'}} />
                                <Typography variant='p' fontSize={'14px'}>Gastos por centro de custos - Março:</Typography>
                            </Stack>
                            <GastoPorContaChart />
                        </Paper>
                    </Grid>
                    <Grid item md={3}>
                        <Paper elevation={0} className="paper">
                            <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
                                <PieChart 
                                    sx={{ 
                                        width: '60px',
                                        height: '60px',
                                        textAlign: 'center',
                                        color: red[600],
                                        borderRadius: '5px'}} />
                                <Typography variant='p' fontSize={'14px'}>Gastos por categoria - Março:</Typography>
                            </Stack>
                            <GastoPorCatgoriaChart />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid
                    sx={{ p: '16px', pt: '0'}}
                    container
                    spacing={{md: 2}}>
                    <Grid item md={6}>
                        <Paper elevation={0} className="paper">
                            <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
                                <PieChart 
                                    sx={{ 
                                        width: '60px',
                                        height: '60px',
                                        textAlign: 'center',
                                        color: red[600],
                                        borderRadius: '5px'}} />
                                <Typography variant='p' fontSize={'14px'}>Emprestimos vencidos - Março:</Typography>
                            </Stack>
                            <VencimentosDoMesChart />
                        </Paper>
                    </Grid>
                    <Grid item md={6}>
                        <Paper elevation={0} className="paper">
                            <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
                                <PieChart 
                                    sx={{ 
                                        width: '60px',
                                        height: '60px',
                                        textAlign: 'center',
                                        color: green[600],
                                        borderRadius: '5px'}} />
                                <Typography variant='p' fontSize={'14px'}>Recebimentos - Março:</Typography>
                            </Stack>
                            <ReceitasDoMesChart />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid 
                    sx={{ p: '16px', pt: '0'}}
                    container>
                    <Grid item md={12}>
                        <Paper elevation={0} className="paper">
                            <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
                                <BarChart
                                    sx={{ 
                                        width: '60px',
                                        height: '60px',
                                        textAlign: 'center',
                                        color: green[600],
                                        borderRadius: '5px'}} />
                                <Typography variant='p' fontSize={'14px'}>Receitas / Despesas / Lucro:</Typography>
                            </Stack>
                            <ReceitasDespesasChart />
                        </Paper>
                    </Grid>
                </Grid>
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
            </main>
        </>
    );
}

