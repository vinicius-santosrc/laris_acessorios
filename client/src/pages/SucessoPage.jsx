import FooterIndexPage from "../components/FooterIndexPage";
import Header from "../components/Header";

export default function SucessoPage() {
    return (
        <>
            <Header />
            <div class='alert'>
                <div class='img'>
                    <i class="fas fa-star"></i>
                </div>

                <h1>Pedido realizado com sucesso!</h1>
                <p>Agradecemos por fazer seu pedido na LARI'S</p>
                <p>Para mais informações <a href="https://api.whatsapp.com/send/?phone=5535997394181&app_absent=0">clique aqui para ser redirecionado para o WhatsApp</a></p>

                <div class='botaodevoltar'>
                    <a href={window.location.origin}><label>VOLTAR</label></a>
                </div>

            </div>
            <FooterIndexPage />
        </>
    )
}