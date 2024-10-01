/**
 * Creation Date: 20/05/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import FooterIndexPage from "../components/FooterIndexPage";
import Header from "../components/Header";
import BannerTopPage from "../components/TypeProductPage/BannerTopPage";
import ProductsShow from "../components/TypeProductPage/ProductsShow";

export default function Promocoes() {
    return (
        <>
            <Header />
            <BannerTopPage />
            <ProductsShow />
            <FooterIndexPage />
        </>
    )
}