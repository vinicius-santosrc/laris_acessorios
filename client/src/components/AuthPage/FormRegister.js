/**
 * Creation Date: 11/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useEffect, useState } from "react";
import { CheckIfUserIsLogged, CreateNewAccount, auth } from "../../lib/firebase";
import { GetUserAtual } from "../../lib/database";

const FormRegister = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [cpf, setCPF] = useState(null);
    const [password, setPassword] = useState(null);

    const [ErrorMessage, setErrorMessage] = useState(false);

    async function createAccount() {
        const User = {
            nome_completo: name,
            email: email,
            cpf: cpf,
            password: password
        }
        if (User.nome_completo && User.email && User.cpf && User.password) {
            await CreateNewAccount(User)
                .catch((error) => {
                    setTimeout(() => {
                        setErrorMessage(true)
                    }, 5000);
                    setErrorMessage(false)
                    console.log('ERRO:', error)
                })
        }
        else {
            console.log("ERRO AO CRIAR O USUÁRIO: DADOS INCOMPLETOS");
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user && user.uid) {
                const u = await GetUserAtual(user.uid);
            if (u) {
                if (CheckIfUserIsLogged()) {
                    window.location.href = window.location.origin;
                }
            }
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="AccountsRegisterForm__Content">
            <div className="logoUpLogin">
                <img src={window.location.origin + "/static/media/logolaris.png"} />
            </div>
            <h2>Criação de Conta</h2>
            <p>Faça seu cadastro em nosso site</p>
            {ErrorMessage &&
                <div className="ErrorMessageBox">
                    <h1>ERRO!</h1>
                    <p>Verifique todos os dados e tente novamente.</p>
                </div>
            }
            <div className="AccountsInputs-Content">
                <div className="Account-Box-Input-Show">
                    <label
                        htmlFor="name">
                        Nome Completo: *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        required
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <div className="Account-Box-Input-Show">
                    <label htmlFor="name">Endereço de e-mail *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        required
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                <div className="Account-Box-Input-Show">
                    <label htmlFor="name">CPF: *</label>
                    <input
                        type="number"
                        id="cpf"
                        name="cpf"
                        value={cpf}
                        required
                        onChange={(e) => { setCPF(e.target.value) }}
                    />
                </div>
                <div className="Account-Box-Input-Show">
                    <label htmlFor="name">Senha de acesso *</label>
                    <input
                        type="text"
                        id="senha"
                        name="senha"
                        value={password}
                        required
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
            </div>
            <div className="ButtonsAction">
                <button onClick={createAccount} className="Button-Wrapper-Content">
                    <span>CRIAR CONTA</span>
                </button>
                <div className="already-account-box">
                    <p>Já possui uma conta cadastrada em nosso site?</p>
                    <a href={window.location.origin + "/accounts/login"}>Entre agora</a>
                </div>
            </div>
        </div>
    )
}

export default FormRegister