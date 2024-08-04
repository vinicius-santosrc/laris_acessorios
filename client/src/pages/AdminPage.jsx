import React, { useEffect, useState } from "react";
import ContentDashboard from "../components/AdminPage/ContentDashboard";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import Loading from "../components/AdminPage/Loading";
import { getUser, GetUserAtual } from "../lib/database";
import { auth, CheckIfUserIsLogged } from "../lib/firebase";

// Rest of your code goes here

export default function AdminPage() {
    const [pageClosed, setPageClosed] = useState(false)

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
                setuserAtual(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (CheckIfUserIsLogged()) {
                return
            } else {
                return window.location.href = window.location.origin + "/admin/login";
            }
        });

        return () => unsubscribe();
    }, []);

    if (!userAtual) {
        return <Loading />

    }

    if (pageClosed) {
        return (
            <div className="ManutencaoPage-Section">
                <div className="flexBox-Manutencao">
                    <div className="ContentManutencaoImages">
                        <img id="monitor" src={window.location.origin + "/static/media/admin-images/monitor.svg"} />
                        <img id="cellphone" src={window.location.origin + "/static/media/admin-images/cellphone.svg"} />
                    </div>
                    <div className="ContentManutencaoText">
                        <p>Opss...</p>
                        <h1>503</h1>
                        <p id="boldtext">PÁGINA EM MANUTENÇÃO</p>
                        <p>Contate um desenvolvedor e tente novamente mais tarde</p>
                        <button onClick={() => {window.location.href = window.location.origin}}>VOLTAR PARA PÁGINA PRINCIPAL</button>
                    </div>
                </div>
                <div className="logolaris"><img src={window.location.origin + "/static/media/logolaris.png"} /></div>
            </div>
        )
    }

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <ContentDashboard />
        </div>
    )
}