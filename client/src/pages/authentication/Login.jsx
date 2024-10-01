/**
 * Creation Date: 14/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import React from "react"
import Header from "../../components/Header"
import LoginForm from "../../components/AuthPage/LoginForm"

const LoginPage = () => {
    return (
        <React.Fragment>
            <Header />
            <LoginForm />
        </React.Fragment>
    )
}

export default LoginPage