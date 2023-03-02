import React from 'react';
import { Link } from 'react-router-dom';

import './../css/base.css';
import './../css/login.css';

export default function Login()
{
    const [email, setEmail] = React.useState();
    const [senha, setSenha] = React.useState();

    async function logar(e){
        e.preventDefault();
        try{
            let user = await fetch("http://localhost:3001/users/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: senha,
                })
            });
            console.log(user);
        } catch (err){
            console.log(err.message)
        }
        
    }

    return(
        <>
            <div id='login'>
                <form onSubmit={logar}>
                    <h1>Bem-vindo ao <span>Megacred</span></h1>
                    <div className='input-form'>
                        <label htmlFor='email'>Email</label>
                        <input className='suave' type='email' name='email' id='email' placeholder='Digite seu email' onKeyUp={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className='input-form'>
                        <label htmlFor='senha'>Senha</label>
                        <input className='suave' type='password' name='senha' id='senha' placeholder='Digite sua senha'  onKeyUp={(e) => setSenha(e.target.value)} required/>
                    </div>
                    <Link to={'/recuperar'}>Esqueci minha senha</Link>
                    <button className='suave btn waves' type='submit'>Entrar</button>
                </form>
            </div>
        </>
    );
}