/**
 * Creation Date: 12/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const url = process.env.REACT_APP_API_ENDPOINT;
const secretKey = process.env.REACT_APP_API_SECRET_KEY;
const preEndpoint = process.env.REACT_APP_API_PREENDPOINT;
//const url = process.env.REACT_APP_API_ENDPOINT_TEST;

const GetProduct = async (URL) => {
    try {
        const response = await fetch(`${url}${preEndpoint}${secretKey}/products`);
        const data = await response.json();
        const foundProduct = data.find((produto) => produto.url == URL);
        return foundProduct;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const GetProductById = async (id) => {
    try {
        const response = await fetch(`${url}${preEndpoint}${secretKey}/products`);
        const data = await response.json();
        const foundProduct = data.find((PRODUCT) => PRODUCT.id == id);
        return foundProduct;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


const getUser = async (email) => {
    try {
        const response = await fetch(`${url}${preEndpoint}${secretKey}/admins`);
        const data = await response.json();
        const foundProduct = data.find((user) => user.email == email);
        return foundProduct;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


const GetUserAtual = async (uid) => {
    try {
        const response = await fetch(`${url}${preEndpoint}${secretKey}/users`);
        const data = await response.json();
        const foundUser = data.find((user) => user.uid === uid);
        if(window.location.origin.includes("admin") && foundUser.label === "client") {
            window.location.href = window.location.origin;
        }
        return foundUser;
    }
    catch(error) {
        console.log(error)
    }
}

const GetAllUsers = async () => {
    try {
        const response = await fetch(`${url}${preEndpoint}${secretKey}/users`);
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
        const response = await fetch(`${url}${preEndpoint}${secretKey}/products`);
        const data = await response.json();
        return data.reverse();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getMetas = async () => {
    try {
        const response = await fetch(`${url}${preEndpoint}${secretKey}/metas`);
        const data = await response.json();
        return data.reverse();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getPlanilhaDespesas = async () => {
    try {
        const response = await fetch(`${url}${preEndpoint}${secretKey}/planilha-despesas`);
        const data = await response.json();
        return data.reverse();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getPlanilhaItens = async () => {
    try {
        const response = await fetch(`${url}${preEndpoint}${secretKey}/planilha-itens`);
        const data = await response.json();
        return data.reverse();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getPlanejamentos = async () => {
    try {
        const response = await fetch(`${url}${preEndpoint}${secretKey}/planejamentos`);
        const data = await response.json();
        return data;
    } catch(err) {
        throw err;
    }
}

const getPedidos = async () => {
    try {
        const response = await fetch(`${url}${preEndpoint}${secretKey}/orders`);
        const data = await response.json();
        return data;
    } catch(err) {
        throw err;
    }
}

const getCupons = async () => {
    try {
        const response = await fetch(`${url}${preEndpoint}${secretKey}/cupons`);
        const data = await response.json();
        return data;
    } catch(err) {
        throw err;
    }
}

export { GetProduct, GetAllUsers, getCupons, getPedidos, GetUserAtual, getUser, getAllProducts, getMetas, getPlanilhaDespesas, getPlanilhaItens, getPlanejamentos, GetProductById};
