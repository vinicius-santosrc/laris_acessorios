import React, { useEffect, useState } from "react";
import Loading from "../components/AdminPage/Loading";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import HeaderTop from "../components/AdminPage/PlanejamentosComponents/HeaderTop";
import ContentPlanejamentos from "../components/AdminPage/PlanejamentosComponents/ContentPlanejamentos";
import { getUser, GetUserAtual } from "../lib/database";
import { auth, CheckIfUserIsLogged } from "../lib/firebase";

export default function AdminPlanejamentos() {
    const [user, setUser] = useState(null)
    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState([])

    const [userAtual, setuserAtual] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const res = await GetUserAtual(user.uid);
                    setuserAtual(res);
                } catch (error) {
                    console.warn("Erro ao pegar usuário: ", error);
                }
            } else {
                setuserAtual(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (CheckIfUserIsLogged()) {
                return
            } else {
                return window.location.href = window.location.origin + "/admin/login";
            }
        });

        return () => unsubscribe();
    }, []);

    if (!userAtual) {
        return <Loading />

    }

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Planejamentos-Page">
                <HeaderTop />
                <ContentPlanejamentos />
            </div>
        </div>
    )
}