import { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db from "../lib/appwrite";
import { Query } from "appwrite";
import { useParams } from "react-router-dom";

export default function AdminProductEditPage() {
    const { product } = useParams();
    const [ProdutoAtual, setProdutoAtual] = useState([])


    const DBUID = '651ca99af19b7afad3f1';
    const PRODUTOSUID = '651ca9adf3de7aad17d9';

    useEffect(() => {

        db.getDocument(
            DBUID,
            PRODUTOSUID,
            product
        )
            .then((pdt) => {
                setProdutoAtual(
                    <>
                        <h2>{pdt.TYPE}</h2>
                        <h2>{pdt.NAME_PRODUCT}</h2>
                        <h2>R$ {pdt.PRICE}</h2>
                        
                    </>
                )
            })

    }, [product])

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Admin-ContentDashBoard">
                {ProdutoAtual}
            </div>
        </div>
    )
}