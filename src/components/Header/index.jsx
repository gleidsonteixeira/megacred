import React from 'react';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography, Drawer, ListItem, ListItemIcon, List, ListItemText, ListItemButton, Divider, Collapse, ListSubheader } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle, AddCircle, Create, Dashboard, Inbox, Sell, StarBorder, SubdirectoryArrowLeft, SubdirectoryArrowRight } from '@mui/icons-material';

import './index.css';
import logo from './logo_megacred.png';
import { Box } from '@mui/system';

export default function Header(){
    const [drawer, setDrawer] = React.useState(false);
    const [cadastros, setCadastros] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    return(
        <>
            <AppBar position='fixed' elevation={0} color={'transparent'}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Megacred
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor={'left'}
                open={drawer}
                onClose={() => setDrawer(false)}>
                <Box
                    sx={{
                        width: '300px'
                    }}>
                    {/* <div className='logo'>
                        <img src={logo} alt="Megacred" />
                    </div> */}
                    <List>
                        <ListItemButton href='/dashboard'>
                            <ListItemIcon>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText>Dashboard</ListItemText>
                        </ListItemButton>
                        {/* <ListItemButton onClick={() => setCadastros(!cadastros)}>
                            <ListItemIcon><AddCircle /></ListItemIcon>
                            <ListItemText primary="Cadastros" />
                        </ListItemButton> */}
                        <ListSubheader>Cadastros</ListSubheader>
                        <Collapse in={cadastros} timeout="auto" unmountOnExit>
                            <List component="div">
                                <ListItemButton href='/users'>
                                    <ListItemIcon><AccountCircle /></ListItemIcon>
                                    <ListItemText primary="Usuários" />
                                </ListItemButton>
                                <ListItemButton href='/categories'>
                                    <ListItemIcon><Sell /></ListItemIcon>
                                    <ListItemText primary="Categorias de Pagamento" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <ListItem>
                        </ListItem>
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </>
    );
}
