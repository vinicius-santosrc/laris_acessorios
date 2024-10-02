/**
 * Creation Date: 14/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useEffect, useState } from "react"
import { auth, CheckIfUserIsLogged, loginIn } from "../lib/firebase";
import { GetUserAtual } from "../lib/database";
import AlertComponent from "../components/alertComponent";

export default function AdminLogin() {
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null);
    const [isAlert, setIsAlert] = useState(false);
    const [typeAlert, settypeAlert] = useState("error");
    const [alertMessage, setMessageAlert] = useState("");

    async function signIn() {
        if (!email || !password) {

            setIsAlert(true)
            settypeAlert("error")
            setMessageAlert("Preencha todas as informações solicitadas")
            setTimeout(() => {
                setIsAlert(false)
            }, 4000);
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
                    .then(() => {
                        setIsAlert(true)
                        settypeAlert("success")
                        setMessageAlert("Login realizado com sucesso.")
                        setTimeout(() => {
                            setIsAlert(false)
                        }, 3000);
                        window.location.href = window.location.origin + "/admin"
                    })
                    .catch((err) => {
                        if (err == "FirebaseError: Firebase: Error (auth/invalid-email).") {
                            setIsAlert(true)
                            settypeAlert("error")
                            setMessageAlert("Senha ou usuário incorretos. ")
                            setTimeout(() => {
                                setIsAlert(false)
                            }, 4000);
                        }
                    })
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

    if (user) {
        window.location.href = '/admin'
    }

    return (
        <section className="AdminLoginPage">
            {isAlert ?
                <AlertComponent
                    message={alertMessage}
                    type={typeAlert}
                    close={() => setIsAlert()}
                />
                : null
            }
            <div className="AdminLogin-flexbox">
                <div className="AdminLogin-left-side">
                    <img className="LogoAdmin" src={window.location.origin + "/static/media/logolaris.png"} alt="logolaris" />
                    <section className="modalFormLogin">
                        <div className="AdminLogin-top">
                            <h2>Seja bem-vindo(a)</h2>
                            <p>Preencha as informações abaixo para entrar na plataforma</p>
                        </div>
                        <div className="AdminLogin-middle">
                            <div className="AdminLogin-input-box">
                                <p>E-mail</p>
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
                        <div className="AdminLogin-forgot-password">
                            <a href="#">Esqueceu sua senha?</a>
                        </div>
                    </section>
                </div>
                <div className="AdminLogin-right-side">
                    <img src={window.location.origin + "/static/media/RightSideImage.png"} alt="rightsideimage" />
                </div>
            </div>
        </section>
    )
}