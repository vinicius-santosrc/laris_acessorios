/**
 * Creation Date: 19/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import FooterIndexPage from "../../../components/FooterIndexPage";
import Header from "../../../components/Header";

export default function GuiaAneis() {
    document.querySelector("title").innerText = "Guia de Tamanhos | LARI'S ACESSÓRIOS"

    return (
        <>
            <Header />
            <section class="topinstitucional">
                <h1>Guia de Tamanhos</h1>
                <div class='content-institucional'>
                    <div class='opcoesinstitucional'>
                        <a href="../duvidas-frequentes"><i class="fa-regular fa-circle-question"></i> Duvidas Frequentes</a>
                        <a href="../../pages/privacidade-seguranca"><i class="fa-solid fa-file-contract"></i> Política de Privacidade</a>
                        <a href="../../institucional/guia-de-tamanhos/colares"><i class="fa-solid fa-book"></i> Guia de Tamanhos</a>
                        <a href="../../institucional/cuidado-joias"><i class="fa-solid fa-gem"></i> Cuidados com as Joias e Miçangas</a>
                        <a href="../../institucional/fale-conosco"><i class="fa-solid fa-comment"></i> Fale Conosco</a>
                    </div>
                    <div class="items-content-inst">
                        <div class="top-item-content">
                            <h1>Anéis</h1>
                            <div class="ref-item-content">
                                <a href="./pulseiras">Pulseiras</a>
                                <a href="./colares">Colares</a>
                                <a id="selected" href="./aneis">Anéis</a>
                                <a href="./tornozeleiras">Tornozeleiras</a>
                            </div>
                        </div>
                        <div class="content-inside-item">
                            <div class='content-inside-item-left-side'>
                                <h2>Como descobrir o tamanho do seu dedo para anéis:</h2>
                                <p class="childinside">O tamanho do anél varia de pessoa para pessoa; portanto, existem algumas maneiras de descobrir qual é o tamanho ideal para você. Siga as instruções abaixo.</p>

                                <div class='option-inside'>
                                    <h3>Pratas 925:</h3><p>Tamanhos únicos.</p>
                                </div>
                            </div>

                        </div>
                        <div class="content-inside-item-img-fora">
                            <img src="https://silviojoalheiro.com.br/media/wysiwyg/blog/POST3.1.jpg" alt="" />
                        </div>
                        <div class="passos-content">
                            <p><b>Passo 1: </b>Encontre um anel que se encaixe perfeitamente.</p><br />
                            <p><b>Passo 2: </b>Coloque o anel em cima de uma régua e meça a área mais ampla dentro do anel, da borda interna até a borda interna. Arredonde para o milímetro inteiro mais próximo.</p></div>
                    </div>

                </div>
            </section>
            <FooterIndexPage />
        </>
    )
}