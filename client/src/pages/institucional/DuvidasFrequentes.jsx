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

export default function DuvidasFrequentes() {
    document.querySelector("title").innerText = "Dúvidas Frequentes | LARI'S ACESSÓRIOS"
    return (
        <>
            <Header />
            <section class="topinstitucional">
                <h1>Dúvidas Frequentes</h1>
                <div class='content-institucional'>
                    <div class='opcoesinstitucional'>
                        <a href="duvidas-frequentes"><i class="fa-regular fa-circle-question"></i> Duvidas Frequentes</a>
                        <a href="../pages/privacidade-seguranca"><i class="fa-solid fa-file-contract"></i> Política de Privacidade</a>
                        <a href="../institucional/guia-de-tamanhos/colares"><i class="fa-solid fa-book"></i> Guia de Tamanhos</a>
                        <a href="../institucional/cuidado-joias"><i class="fa-solid fa-gem"></i> Cuidados com as Joias e Miçangas</a>
                        <a href="../institucional/fale-conosco"><i class="fa-solid fa-comment"></i> Fale Conosco</a>
                    </div>
                    <div class="items-content-inst">
                        <div class="top-item-content">
                            <h1>Dúvidas Frequentes</h1>
                        </div>
                        <div class="content-inside-item">
                            <div class='content-inside-item-left-side'>
                                <div class="duvida">
                                    <h2>É REALMENTE PRATA?</h2>
                                    <p>Sim, trabalhamos com PRATA 925, ou seja, 92,5% de prata e 7,5% de outros materiais.</p>
                                </div>
                                <div class="duvida">
                                    <h2>A PRATA ENFERRUJA OU FICA PRETA?</h2>
                                    <p>Não, a prata não enferruja, porém, se não for bem cuidada, pode oxidar, dando aspecto de "suja". Mas fazemos a limpeza das mesmas em nossa loja.</p>
                                </div>
                                <div class="duvida">
                                    <h2>TEM GARANTIA?</h2>
                                    <p>Somente em PRATAS 925 com defeitos de fábrica.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <FooterIndexPage />
        </>


    )
}