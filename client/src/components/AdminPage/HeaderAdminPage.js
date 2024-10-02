/**
 * Creation Date: 09/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import React, { useEffect, useState } from "react"
import db, { getUserData } from "../../lib/appwrite"
import { GetUserAtual } from "../../lib/database";
import { auth } from "../../lib/firebase";

export default function HeaderAdminPage() {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('Online');
    const [searchBox, setSearchBox] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const res = await GetUserAtual(user.uid);
                    setUser(res);
                } catch (error) {
                    console.warn("Erro ao pegar usuário: ", error);
                    window.location.href = window.location.origin
                }
            } else {
                setUser(null);
                if (window.location.origin.includes("admin")) {
                    window.location.href = window.location.origin
                }
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <header>
            <div className="leftside-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <input placeholder="Buscar" onChange={(e) => {
                    setSearchBox(e.target.value)
                }}/>
            </div>
            <div className="right-side-header">
                {auth.currentUser && user ?
                    <React.Fragment>
                        <button><i className="fa-regular fa-bell" onclick="notificacaoopen()"></i></button>
                        <button onClick={() => { auth.signOut(); window.location.href = window.location.origin + "/admin/login" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.9469 1.25C13.5799 1.25 12.4769 1.25 11.6099 1.367C10.7099 1.487 9.95192 1.747 9.34992 2.348C8.82592 2.873 8.55992 3.518 8.42092 4.276C8.28592 5.013 8.25992 5.914 8.25392 6.996C8.25286 7.19491 8.33086 7.3861 8.47076 7.5275C8.61066 7.6689 8.801 7.74894 8.99992 7.75C9.19883 7.75106 9.39002 7.67306 9.53142 7.53316C9.67282 7.39326 9.75286 7.20291 9.75392 7.004C9.75992 5.911 9.78792 5.136 9.89592 4.547C10.0009 3.981 10.1679 3.652 10.4109 3.409C10.6879 3.132 11.0769 2.952 11.8109 2.853C12.5659 2.752 13.5669 2.75 15.0019 2.75H16.0019C17.4379 2.75 18.4389 2.752 19.1939 2.853C19.9279 2.952 20.3159 3.133 20.5939 3.409C20.8699 3.686 21.0499 4.074 21.1489 4.809C21.2509 5.563 21.2519 6.565 21.2519 8V16C21.2519 17.435 21.2509 18.436 21.1489 19.192C21.0499 19.926 20.8699 20.314 20.5929 20.591C20.3159 20.868 19.9279 21.048 19.1939 21.147C18.4389 21.248 17.4379 21.25 16.0019 21.25H15.0019C13.5669 21.25 12.5659 21.248 11.8099 21.147C11.0769 21.048 10.6879 20.867 10.4109 20.591C10.1679 20.347 10.0009 20.019 9.89592 19.453C9.78792 18.864 9.75992 18.089 9.75392 16.996C9.75339 16.8975 9.73347 16.8001 9.6953 16.7093C9.65712 16.6185 9.60143 16.5361 9.53142 16.4668C9.4614 16.3976 9.37843 16.3428 9.28723 16.3056C9.19604 16.2684 9.09841 16.2495 8.99992 16.25C8.90143 16.2505 8.804 16.2704 8.71321 16.3086C8.62242 16.3468 8.54003 16.4025 8.47076 16.4725C8.40149 16.5425 8.34668 16.6255 8.30948 16.7167C8.27227 16.8079 8.25339 16.9055 8.25392 17.004C8.25992 18.086 8.28592 18.987 8.42092 19.724C8.56092 20.482 8.82592 21.127 9.35092 21.652C9.95192 22.254 10.7109 22.512 11.6109 22.634C12.4769 22.75 13.5799 22.75 14.9469 22.75H16.0569C17.4249 22.75 18.5269 22.75 19.3939 22.634C20.2939 22.512 21.0519 22.254 21.6539 21.652C22.2559 21.05 22.5139 20.292 22.6359 19.392C22.7519 18.525 22.7519 17.422 22.7519 16.055V7.945C22.7519 6.578 22.7519 5.475 22.6359 4.608C22.5149 3.708 22.2559 2.95 21.6539 2.348C21.0519 1.746 20.2939 1.488 19.3939 1.367C18.5269 1.25 17.4239 1.25 16.0569 1.25H14.9469Z" fill="black" />
                                <path d="M15.0006 11.2499C15.1995 11.2499 15.3902 11.3289 15.5309 11.4695C15.6715 11.6102 15.7506 11.801 15.7506 11.9999C15.7506 12.1988 15.6715 12.3896 15.5309 12.5302C15.3902 12.6709 15.1995 12.7499 15.0006 12.7499H4.02756L5.98856 14.4299C6.13973 14.5593 6.2333 14.7435 6.24868 14.9419C6.26405 15.1403 6.19998 15.3367 6.07056 15.4879C5.94113 15.639 5.75695 15.7326 5.55854 15.748C5.36013 15.7634 5.16373 15.6993 5.01256 15.5699L1.51256 12.5699C1.43022 12.4995 1.36412 12.4121 1.31879 12.3137C1.27347 12.2153 1.25 12.1082 1.25 11.9999C1.25 11.8915 1.27347 11.7845 1.31879 11.6861C1.36412 11.5877 1.43022 11.5003 1.51256 11.4299L5.01256 8.42987C5.08741 8.36579 5.17415 8.31708 5.26783 8.28651C5.36151 8.25595 5.4603 8.24414 5.55854 8.25176C5.65678 8.25937 5.75257 8.28626 5.84042 8.33089C5.92827 8.37552 6.00647 8.43702 6.07056 8.51187C6.13464 8.58673 6.18336 8.67347 6.21392 8.76715C6.24448 8.86083 6.25629 8.95961 6.24868 9.05786C6.24106 9.1561 6.21417 9.25188 6.16954 9.33974C6.12491 9.42759 6.06341 9.50579 5.98856 9.56987L4.02856 11.2499H15.0006Z" fill="black" />
                            </svg>
                        </button>
                        <div>
                            <a className="account-details-header" href="#">
                                <img src={user.photoURL} alt="avatar image" />
                                <div className="flex-details-account">
                                    <p>{user.nome_completo}</p>
                                    {status == "Online" ?
                                        <p id="useronline">Conectado</p>
                                        :
                                        <p id="useroffline">Sem conexão</p>
                                    }
                                </div>
                            </a>


                        </div>
                    </React.Fragment>
                    :
                    <></>
                }

            </div>
        </header >
    )
}