import { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db from "../lib/appwrite";




export default function AdminPlanilhas() {
    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <section className="Admin-ContentDashBoard">
                <div className="right-side-flex-box">
                    <img src={window.location.origin + "/static/media/admin-images/undraw_organizing_projects_re_9p1k.svg"} />
                    <h1>PLANILHAS</h1>
                    <h2>Organize, Planeje e Crie</h2>
                </div>
                <div className="left-side-flex-box">
                    <div className="exists-planilhas">
                        <h4>Planilhas Existentes</h4>
                        <div className="planilhas-exists-flex">
                            <button onClick={() => { window.location.href = '/admin/planilhas/planilha-itens' }}>
                                <h2><i className="fa-regular fa-gem"></i> Planilha Itens</h2>
                                <p>Armazenamento de dados de itens para compras</p>

                            </button>
                            <button onClick={() => { window.location.href = '/admin/planilhas/planilha-despesas' }}>
                                <h2><i className="fa-solid fa-hand-holding-dollar"></i> Planilha de Despesas</h2>
                                <p>Despesas e Receitas</p>

                            </button>
                        </div>


                    </div>
                </div>
            </section>
        </div>
    )
}