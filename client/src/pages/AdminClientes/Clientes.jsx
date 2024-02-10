import { useEffect, useState } from "react"
import NavigationLeft from "../../components/AdminPage/NavigationLeft"
import { GetAllUsers } from "../../lib/database";

const Clientes = () => {

    const [allClientes, setallClientes] = useState(null);

    async function getAllClientes() {
        try {
            const response = await GetAllUsers();
            setallClientes(response)
        }
        catch (error) {
            console.error("ERROR: ", error)
        }
    }

    useEffect(() => {
        getAllClientes()
    }, [])

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Content-Orders-Page">
                <div className="toppage-products">
                    <div className="top-top-product-header">
                        <div>
                            <h2>Clientes Cadastrados</h2>
                            <p>Visualize todos os clientes da sua loja.</p>
                        </div>
                    </div>
                </div>
                <div className="search-box-table">
                    <input type="text" placeholder="Procurar" />
                </div>


                <div className="list-pedidos">
                    <table>
                        <tr>
                            <td>FOTO</td>
                            <td>ID</td>
                            <td>LABEL</td>
                            <td>NOME-COMPLETO</td>
                            <td>CPF</td>
                            <td>E-MAIL</td>
                        </tr>
                        {allClientes && allClientes.map((user) => {
                            return (
                                <tr>
                                    <td><img src={'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp'}/></td>
                                    <td>{user.id}</td>
                                    <td>{user.label}</td>
                                    <td>{user.nome_completo}</td>
                                    <td>{user.cpf}</td>
                                    <td>{user.email}</td>
                                </tr>
                            )
                        })}

                    </table>
                </div>
            </div>
        </div>
    )
}

export default Clientes