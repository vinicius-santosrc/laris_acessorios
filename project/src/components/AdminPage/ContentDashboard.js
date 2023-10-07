import { useEffect } from "react"


export default function ContentDashboard() {
    return (
        <div className="Admin-ContentDashBoard">
            <header>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input placeholder="Buscar" />
                <img src="" />
            </header>
            <div className="Cards-Dashboards">
                <div className="Top-Side-Dashboard">
                    <div className="Card-Dashboard-Mid">

                    </div>
                    <div className="Card-Dashboard-High">

                    </div>
                </div>
                <div className="Bottom-Side-Dashboard">
                    <div className="Card-Dashboard-Low">

                    </div>
                    <div className="Card-Dashboard-Low">

                    </div>

                    <div className="Card-Dashboard-High">

                    </div>

                </div>


            </div>

        </div>

    )
}