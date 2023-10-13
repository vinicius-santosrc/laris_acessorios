import { useEffect, useState } from "react";
import ContentDashboard from "../components/AdminPage/ContentDashboard";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import Loading from "../components/AdminPage/Loading";

export default function AdminPage() {
    const [user, setUser] = useState(null)
    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState([])
    



    useEffect(() => {
        getUserData()
            .then((account) => {
                setUser(account)
                userStatus(account.status ? 'Online' : 'Offline')
                db.getDocument(
                    "651ca99af19b7afad3f1",
                    "652102213eeea3189590",
                    account.$id
                )
                    .then((r) => {
                        setUserDBAccount(r)
                    })

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
            <ContentDashboard />
        </div>
    )
}