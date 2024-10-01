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
            <section class="topinstitucional">
                <h1>Fale Conosco</h1>
                <div class='content-institucional'>
                    <div class='opcoesinstitucional'>
                        <a href="../institucional/duvidas-frequentes"><i class="fa-regular fa-circle-question"></i> Duvidas Frequentes</a>
                        <a href="../pages/privacidade-seguranca"><i class="fa-solid fa-file-contract"></i> Política de Privacidade</a>
                        <a href="../institucional/guia-de-tamanhos/colares"><i class="fa-solid fa-book"></i> Guia de Tamanhos</a>
                        <a href="../institucional/cuidado-joias"><i class="fa-solid fa-gem"></i> Cuidados com as Joias e Miçangas</a>
                        <a href="../institucional/fale-conosco"><i class="fa-solid fa-comment"></i> Fale Conosco</a>
                    </div>
                    <div class="items-content-inst">
                        <div class="top-item-content">
                            <h1>Fale Conosco</h1>
                        </div>
                        <div class="content-inside-item">
                            <div class='content-inside-item-left-side'>
                                <h2>Entre em contato: </h2>
                                <a href="https://api.whatsapp.com/send/?phone=5535997394181&text&type=phone_number&app_absent=0" target="_blank"><i class="fa-brands fa-square-whatsapp"></i> WhatsApp</a>
                                <a href="https://www.instagram.com/laris.acessorioss/" target="_blank"><i class="fa-brands fa-square-instagram"></i> Instagram</a>
                                <a href="mailto:contato.larisacessorios@gmail.com"><i class="fa-solid fa-envelope"></i> E-mail</a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <FooterIndexPage />
        </>
    )
}