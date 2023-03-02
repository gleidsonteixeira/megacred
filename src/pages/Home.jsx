import { Container } from '@mui/material';
import React from 'react';
import Header from '../components/Header';

import '../css/base.css';
import '../css/home.css';

export default function Home() {


    return (
        <>
            <main>
                <Header />
                <Container sx={{ pt: 10}}>
                    meu conteudo
                </Container>
            </main>
        </>
    );
}

