/**
 * Creation Date: 12/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const ApiKey = process.env.REACT_APP_FIREBASE_API;
const endpoint = process.env.REACT_APP_API_ENDPOINT;
//const endpoint = process.env.REACT_APP_API_ENDPOINT_TEST;
const secretKey = process.env.REACT_APP_API_SECRET_KEY;
const preEndpoint = process.env.REACT_APP_API_PREENDPOINT;

const firebaseConfig = {
    apiKey: "AIzaSyBTeUye3l9AOgcyGVQza-ped-IUG65yGq8",
    authDomain: "laris-acessorios.firebaseapp.com",
    projectId: "laris-acessorios",
    storageBucket: "laris-acessorios.appspot.com",
    messagingSenderId: "71738326405",
    appId: "1:71738326405:web:4c6e520ffb5c453aa0d8ec"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const CreateNewAccount = async (user) => {
    await createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(async (userCredential) => {
            await fetch(`${endpoint}${preEndpoint}${secretKey}/users/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: userCredential.user.uid,
                    nome_completo: user.nome_completo,
                    cpf: user.cpf,
                    email: user.email
                }),
            })
                .then((res) => {
                    window.location.href = window.location.origin;
                })
                .catch((err) => console.error(err))
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error)
        });
}

const loginIn = async (user) => {
    await signInWithEmailAndPassword(auth, user.email, user.password)
    .then(async (userCredential) => {
        window.location.href = window.location.origin
    })
}

const CheckIfUserIsLogged = () => {
    if (auth.currentUser && auth.currentUser.uid && auth.currentUser.email) {
        return true;
    } else {
        return false;
    }
};


export { auth, CreateNewAccount, loginIn, CheckIfUserIsLogged }
