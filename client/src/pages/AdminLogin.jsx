/**
 * Creation Date: 14/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useEffect, useState } from "react"
import { getUserData, login } from "../lib/appwrite";
import { Models } from "appwrite";
import { auth, CheckIfUserIsLogged, loginIn } from "../lib/firebase";
import { GetUserAtual } from "../lib/database";

export default function AdminLogin() {
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)

    async function signIn() {
        if(!email || !password) {
            alert("Preencha todos os dados")
            return;
        }
        await loginAccount();
        async function loginAccount() {
            const User = {
                email: email,
                password: password
            }
            if (User.email && User.password) {
                await loginIn(User)
                .then(() => window.location.href = window.location.origin + "/admin")
                .catch((err) => alert(err))
            }
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user && user.uid) {
                const u = await GetUserAtual(user.uid);
            if (u) {
                if (CheckIfUserIsLogged()) {
                    window.location.href = window.location.origin + "/admin";
                }
            }
            }
        });

        return () => unsubscribe();
    }, []);

    if(user) {
        window.location.href = '/admin'
    }
     
    return (
        <section className="AdminLoginPage">
            <div className="AdminLogin-flexbox">
                <div className="AdminLogin-left-side">
                    <img className="LogoAdmin" src={window.location.origin + "/static/media/logolaris.png"} />
                    <div className="AdminLogin-top">
                        <h2>Entrar</h2>
                        <p>Seja bem-vindo(a)! Insira seus dados para continuar</p>
                    </div>
                    <div className="AdminLogin-middle">
                        <div className="AdminLogin-input-box">
                            <p>Email</p>
                            <input
                                onChange={
                                    (e) => {
                                        setEmail(e.target.value)
                                    }
                                } />
                        </div>
                        <div className="AdminLogin-input-box">
                            <p>Senha</p>
                            <input
                                onChange={
                                    (e) => {
                                        setPassword(e.target.value)
                                    }
                                } />
                        </div>
                    </div>
                    <div className="AdminLogin-bottom">
                        <button onClick={signIn}>Entrar</button>
                    </div>
                </div>
                <div className="AdminLogin-right-side">
                    <img src={window.location.origin + "/static/media/admin-images/AdminLogin-fileright-afjeht1ht14ty4y4.webp"} />
                </div>
            </div>
        </section>
    )
}