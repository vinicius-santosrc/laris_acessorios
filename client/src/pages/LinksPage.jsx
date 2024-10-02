/**
 * Creation Date: 17/07/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import "../style/stylelink.css"

export default function LinksPage() {
    return (
        <div className="Links-Page">
            <section className="background">
                <img src="https://laris-acessorios.netlify.app/imgs/Colar Ponto De Luz Rosa (2).jpeg" alt="" />
            </section>
            <section className="card-links">
                <div className="title-cards">
                    <div className="imgsback">
                        <img src="https://laris-acessorios.netlify.app/imgs/ico.jpeg" alt="" />
                    </div>
                    <div className="words-back">
                        <h1>LARI’S ACESSÓRIOS</h1>
                        <p>Escolha sua opção</p>
                    </div>
                </div>
                <div className="container">
                    <div className="card">
                        <div className="card-imagem">
                            <a className="LinkHref" href={window.location.origin}>
                                <img src={"https://laris-acessorios.netlify.app/imgs/site.png"} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-imagem">
                            <a className="LinkHref" target="_blank" rel="noreferrer" href={"https://api.whatsapp.com/send/?phone=5535997394181&text&type=phone_number&app_absent=0"}>
                                <img src="https://laris-acessorios.netlify.app/imgs/whats.png" alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-imagem">
                            <a className="LinkHref" target="_blank" rel="noreferrer" href={"https://www.tiktok.com/@laris.acessorioss"}>
                                <img src="https://laris-acessorios.netlify.app/imgs/tiktok-link.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}