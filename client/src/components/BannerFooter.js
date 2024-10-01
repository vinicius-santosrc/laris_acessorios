/**
 * Creation Date: 05/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

export default function BannerFooter() {
    return (
        <>
            <section className="banner-footer-pc">
                <a href={window.location.origin + "/pratas"}>
                    <img src="/static/media/product-images/banner-footer-site.png" alt="" />
                </a>
            </section>

            <section className="banner-footer-cell">
                <a href={window.location.origin + "/pratas"}>
                    <img src={"/static/media/product-images/banner-footer-site-cell.png"} alt="" />
                </a>
            </section>
        </>
    )
}