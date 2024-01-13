import { useEffect, useState } from "react";
import Loading from "../components/AdminPage/Loading";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import HeaderTop from "../components/AdminPage/PlanejamentosComponents/HeaderTop";
import ContentPlanejamentos from "../components/AdminPage/PlanejamentosComponents/ContentPlanejamentos";
import { getUser } from "../lib/database";

export default function AdminPlanejamentos() {
    const [user, setUser] = useState(null)
    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState([])

    useEffect(() => {
        getUserData()
            .then(async (account) => {
                setUser(account)
                userStatus(account.status ? 'Online' : 'Offline')
                const user = await getUser(account.email)
                setUserDBAccount(user)
                if (!account) {
                    window.location.href = window.location.origin + "/admin/login"
                }
            })

    }, [])


    if (!user) {
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