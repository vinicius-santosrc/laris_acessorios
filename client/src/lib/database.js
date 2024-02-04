import { useState, useEffect } from "react";

const url = process.env.REACT_APP_API_ENDPOINT;
const secretKey = process.env.REACT_APP_API_SECRET_KEY;
//const url = process.env.REACT_APP_API_ENDPOINT_TEST;

const GetProduct = async (URL) => {

    try {
        const response = await fetch(`${url}/api/v1/${secretKey}/products`);
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

const GetProductById = async (id) => {

    try {
        const response = await fetch(`${url}/api/v1/${secretKey}/products`);
        const data = await response.json();
        // Encontrando o produto pelo URL usando find
        const foundProduct = data.find((PRODUCT) => PRODUCT.id == id);

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
        const response = await fetch(`${url}/api/v1/${secretKey}/admins`);
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


const GetUserAtual = async (uid) => {
    try {
        const response = await fetch(`${url}/api/v1/${secretKey}/users`);
        const data = await response.json();

        const foundUser = data.find((user) => user.uid === uid)

        return foundUser;
    }
    catch(error) {
        console.log(error)
    }
}

const GetAllUsers = async () => {
    try {
        const response = await fetch(`${url}/api/v1/${secretKey}/users`);
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}


const getAllProducts = async () => {
    try {
        const response = await fetch(`${url}/api/v1/${secretKey}/products`);
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

const getMetas = async () => {
    try {
        const response = await fetch(`${url}/api/v1/${secretKey}/metas`);
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

const getPlanilhaDespesas = async () => {
    try {
        const response = await fetch(`${url}/api/v1/${secretKey}/planilha-despesas`);
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

const getPlanilhaItens = async () => {
    try {
        const response = await fetch(`${url}/api/v1/${secretKey}/planilha-itens`);
        const data = await response.json();
        // Encontrando a planilha

        // Verificando se a planilha foi encontrado antes de atualizar o estado
        return data.reverse();

    } catch (err) {
        console.error(err);
        // Lançar o erro novamente para que o chamador possa lidar com ele, se necessário
        throw err;
    }
}

const getPlanejamentos = async () => {
    try {
        const response = await fetch(`${url}/api/v1/${secretKey}/planejamentos`);
        const data = await response.json();

        return data;
    } catch(err) {
        throw err;
    }
}

const getPedidos = async () => {
    try {
        const response = await fetch(`${url}/api/v1/${secretKey}/orders`);
        const data = await response.json();

        return data;
    } catch(err) {
        throw err;
    }
}


export { GetProduct, getPedidos, GetUserAtual, getUser, getAllProducts, getMetas, getPlanilhaDespesas, getPlanilhaItens, getPlanejamentos, GetProductById};
