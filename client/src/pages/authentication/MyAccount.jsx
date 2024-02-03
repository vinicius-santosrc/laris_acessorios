import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import { CheckIfUserIsLogged, auth } from "../../lib/firebase";
import { GetUserAtual } from "../../lib/database";

const MyAccount = () => {

    const [userAtual, setuserAtual] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const res = await GetUserAtual(user.uid);
                    setuserAtual(res);
                } catch (error) {
                    console.warn("Erro ao pegar usuário: ", error);
                }
            } else {
                setuserAtual(null); // No user is logged in
            }
        });

        return () => unsubscribe(); // Cleanup the subscription when the component unmounts
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (CheckIfUserIsLogged()) {
                return
            } else {
                return window.location.href = window.location.origin;
            }
        });

        return () => unsubscribe();
    }, []);

    window.document.title = "LARIS-ACESSORIOS: Minha conta"

    return (
        <React.Fragment>
            <Header />
            <div className="myaccount--page">
                <h1>Dados pessoais</h1>
                <p>Gerencie as configurações e os dados da sua conta.</p>
                {userAtual != "" &&
                    <>
                        <div className="myaccount-information">
                            <div className="information-input">
                                <h1>Nome:</h1>
                                <p>{userAtual ? userAtual.nome_completo : null}</p>
                            </div>
                            <div className="information-input">
                                <h1>E-mail:</h1>
                                <p>{userAtual ? userAtual.email : null}</p>
                            </div>
                            <div className="information-input">
                                <h1>CPF:</h1>
                                <p>{userAtual ? userAtual.cpf : null}</p>
                            </div>
                        </div>
                    </>
                }
            </div>
        </React.Fragment>
    )
}

export default MyAccount