import { useState, useEffect } from "react";

const url = "https://api-laris-acessorios.vercel.app";

const GetProduct = async (URL) => {

    try {
        const response = await fetch(`${url}/api/products`);
        const data = await response.json();
        // Encontrando o produto pelo URL usando find
        const foundProduct = data.find((produto) => produto.url == URL);

        // Verificando se o produto foi encontrado antes de atualizar o estado
        return foundProduct;

    } catch (err) {
        console.error(err);
        // Lançar o erro novamente para que o chamador possa lidar com ele, se necessário
        throw err;
    }
};

const getUser = async (email) => {

    try {
        const response = await fetch(`${url}/api/admins`);
        const data = await response.json();
        // Encontrando o produto pelo URL usando find
        const foundProduct = data.find((user) => user.email == email);

        // Verificando se o produto foi encontrado antes de atualizar o estado
        return foundProduct;

    } catch (err) {
        console.error(err);
        // Lançar o erro novamente para que o chamador possa lidar com ele, se necessário
        throw err;
    }
};

const getAllProducts = async () => {
    try {
        const response = await fetch(`${url}/api/products`);
        const data = await response.json();
        // Encontrando o produto pelo URL usando find

        // Verificando se o produto foi encontrado antes de atualizar o estado
        return data.reverse();

    } catch (err) {
        console.error(err);
        // Lançar o erro novamente para que o chamador possa lidar com ele, se necessário
        throw err;
    }
}

export { GetProduct, getUser, getAllProducts};
