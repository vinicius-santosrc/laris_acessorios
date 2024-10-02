/**
 * Creation Date: 19/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import FooterIndexPage from "../../components/FooterIndexPage";
import Header from "../../components/Header";

export default function FaleConosco() {
    return (
        <>
            <Header />
            <section className="topinstitucional">
                <h1>Fale Conosco</h1>
                <div className='content-institucional'>
                    <div className='opcoesinstitucional'>
                        <a href="../institucional/duvidas-frequentes"><i className="fa-regular fa-circle-question"></i> Duvidas Frequentes</a>
                        <a href="../pages/privacidade-seguranca"><i className="fa-solid fa-file-contract"></i> Política de Privacidade</a>
                        <a href="../institucional/guia-de-tamanhos/colares"><i className="fa-solid fa-book"></i> Guia de Tamanhos</a>
                        <a href="../institucional/cuidado-joias"><i className="fa-solid fa-gem"></i> Cuidados com as Joias e Miçangas</a>
                        <a href="../institucional/fale-conosco"><i className="fa-solid fa-comment"></i> Fale Conosco</a>
                    </div>
                    <div className="items-content-inst">
                        <div className="top-item-content">
                            <h1>Fale Conosco</h1>
                        </div>
                        <div className="content-inside-item">
                            <div className='content-inside-item-left-side'>
                                <h2>Entre em contato: </h2>
                                <a href="https://api.whatsapp.com/send/?phone=5535997394181&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer"><i className="fa-brands fa-square-whatsapp"></i> WhatsApp</a>
                                <a href="https://www.instagram.com/laris.acessorioss/" target="_blank" rel="noreferrer"><i className="fa-brands fa-square-instagram"></i> Instagram</a>
                                <a href="mailto:contato.larisacessorios@gmail.com"><i className="fa-solid fa-envelope"></i> E-mail</a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <FooterIndexPage />
        </>
    )
}