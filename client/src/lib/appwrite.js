/**
 * Creation Date: 18/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { Account, Client, Databases } from 'appwrite'
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const client = new Client()
const db = new Databases(client);

export const login = async (email, password) => {
    try {
        const account = new Account(client)
        return account.createEmailSession(email, password)
    }
    catch (error) {
        console.log(error)
    }
}

export const getUserData = async () => {
    try {
        const account = new Account(client)
        return account.get()
    }
    catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    try {
        await signOut(auth);
        window.location.href = window.location.origin;
      } catch (error) {
        console.error("Logout error:", error);
        throw error;
      }
}

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("651c17501139519bc5a2")

export default db