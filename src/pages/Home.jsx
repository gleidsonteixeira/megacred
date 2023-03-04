import { AccountBalanceWallet, AccountCircle, AccountCircleOutlined, BarChart, CurrencyExchange, MonetizationOn, MonetizationOnRounded, PieChart, Wallet } from '@mui/icons-material';
import { Divider, Grid, Paper, Typography } from '@mui/material';
import { amber, blue, cyan, green, red, yellow } from '@mui/material/colors';
import { Stack } from '@mui/system';
import React from 'react';
import Header from '../components/Header';

import '../css/base.css';
import '../css/home.css';

export default function Home() {


    return (
        <>
            <Header />
            <Grid
                sx={{ p: '16px', pt: 8}}
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
                            <Typography variant='p' fontSize={'14px'}>Empréstimos em andamento: <h2>0</h2></Typography>
                        </Stack>
                        <Divider sx={{mt: 1, mb: 1}} />
                        <Typography textAlign={'center'}>Clientes ativos cadastrados: <strong>0</strong></Typography>
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
                            <Typography variant='p' fontSize={'14px'}>Total já recebido - Março: <h2>R$000,000</h2></Typography>
                        </Stack>
                        <Divider sx={{mt: 1, mb: 1}} />
                        <Typography textAlign={'center'}>Não recebidos ontem: <strong>0</strong></Typography>
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
                            <Typography variant='p' fontSize={'14px'}>Total já gasto - Março: <h2>R$000,000</h2></Typography>
                        </Stack>
                        <Divider sx={{mt: 1, mb: 1}} />
                        <Typography textAlign={'center'}>Despesas: <strong>0</strong></Typography>
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
                            <Typography variant='p' fontSize={'14px'}>Receitas | Despesas - Março: <h2>R$000,000</h2></Typography>
                        </Stack>
                        <Divider sx={{mt: 1, mb: 1}} />
                        <Typography textAlign={'center'}>Receitas - Despesas - Empréstimos: <strong>0</strong></Typography>
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
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

