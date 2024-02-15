import React, { useEffect, useState } from "react";
import ContentDashboard from "../components/AdminPage/ContentDashboard";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import Loading from "../components/AdminPage/Loading";
import { getUser } from "../lib/database";

// Rest of your code goes here

export default function AdminPage() {
    const [user, setUser] = useState(null)
    const [pageClosed, setPageClosed] = useState(false)

    useEffect(() => {
        getUserData()
            .then(async (account) => {
                setUser(account)
                const user = await getUser(account.email)
                if (!account) {
                    window.location.href = window.location.origin + "/admin/login"
                }
            })

    }, [])

    if (!user) {
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