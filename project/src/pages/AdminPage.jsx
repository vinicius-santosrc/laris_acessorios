import { useEffect, useState } from "react";
import ContentDashboard from "../components/AdminPage/ContentDashboard";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import { getUserData } from "../lib/appwrite";
import Loading from "../components/AdminPage/Loading";

export default function AdminPage() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserData()
            .then((account) => {
                setUser(account)
                if (!account) {
                    window.location.href = window.location.origin + "/admin/login"
                }
            })

    })


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