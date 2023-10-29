export default function SectionTypeProductsIndex() {
    return (
        <>
            <section>
                <div className="index-select-type">
                    <div className='title-index-type'>
                        <h1>Acessórios que te representam</h1>
                        <h1>Loja virtual</h1>
                    </div>
                    <a href={window.location.origin + '/pratas'}>
                        <div className="card-categorias">
                            <img src="https://cloud.appwrite.io/v1/storage/buckets/653eccb57f4ab270eb1a/files/PRATAS-INDEX-CAT-CARD/view?project=651c17501139519bc5a2&mode=admin" alt="" />
                            <h2>PRATAS 925</h2>
                        </div>
                    </a>
                    <a href={window.location.origin + '/micangas'}>
                        <div className="card-categorias">
                            <img src="https://cloud.appwrite.io/v1/storage/buckets/653eccb57f4ab270eb1a/files/MICANGAS-INDEX-CAT-CARD/view?project=651c17501139519bc5a2&mode=admin" alt="" />
                            <h2>MIÇANGAS</h2>
                        </div>
                    </a>
                    <a href={window.location.origin + '/cetim'}>
                        <div className="card-categorias">
                            <img src="https://cloud.appwrite.io/v1/storage/buckets/653eccb57f4ab270eb1a/files/CETIM-INDEX-CAT-CARD/view?project=651c17501139519bc5a2&mode=admin" alt="" />
                            <h2>CETIM</h2>
                        </div>
                    </a>
                </div>
            </section>

            <section>
                <div className="title-index titulo-produtos-laris">
                    <h1>COMPRE POR CATEGORIAS</h1>
                </div>
            </section>
            <section className='opções-itens'>
                <div className='novidade-inicio'>
                    <div className="info-inicioside2">
                        <h1>PRATAS 925</h1>
                        <p>PRESENTES INESQUECÍVEIS PARA PESSOA QUE VOCÊ MAIS AMA</p>
                        <a href={window.location.origin + '/pratas'}>
                            <label>VER MAIS</label>
                        </a>
                    </div>
                    <div className="info-inicio2">
                        <a href={window.location.origin + '/pratas'}>
                            <img src={"/static/media/product-images/prata-index.png"} alt="" />
                        </a>
                    </div>
                </div>
                <div className='novidade-inicio'>

                    <div className="info-inicio2">
                        <a href={window.location.origin + '/micangas'}>
                            <img src={"/static/media/product-images/miganca-index.png"} alt="" />
                        </a>
                    </div>
                    <div className="info-inicioside1">
                        <h1>MIÇANGAS</h1>
                        <p>CRIE SEU ESTILO PRÓPRIO COM NOSSAS MIÇANGAS</p>
                        <a href={window.location.origin + '/micangas'}>
                            <label>VER MAIS</label>
                        </a>
                    </div>
                </div>
                <div className='novidade-inicio'>
                    <div className="info-inicioside2">
                        <h1>CETIM</h1>
                        <p>VENHA CONHECER NOSSAS NOVIDADES</p>
                        <a href={window.location.origin + '/cetim'}>
                            <label>VER MAIS</label>
                        </a>
                    </div>
                    <div className="info-inicio2">
                        <a href={window.location.origin + '/cetim'}>
                            <img src="/static/media/product-images/cetim-index.png" alt="" />
                        </a>
                    </div>
                </div>
            </section>

            <section className='opções-itens'>
                <div className='novidade-inicio-cell'>
                    <a href={window.location.origin + '/pratas'}>
                        <img src="https://cloud.appwrite.io/v1/storage/buckets/653eccb57f4ab270eb1a/files/PRATAS-INDEX-CAT-CARD/view?project=651c17501139519bc5a2&mode=admin" alt="" />
                        <h2>PRATAS 925</h2>
                    </a>
                </div>
                <div className='novidade-inicio-cell'>
                    <a href={window.location.origin + '/micangas'}>
                        <img src="https://cloud.appwrite.io/v1/storage/buckets/653eccb57f4ab270eb1a/files/MICANGAS-INDEX-CAT-CARD/view?project=651c17501139519bc5a2&mode=admin" alt="" />
                        <h2>MIÇANGAS</h2>
                    </a>
                </div>
                <div className='novidade-inicio-cell'>
                    <a href={window.location.origin + '/cetim'}>
                        <img src="https://cloud.appwrite.io/v1/storage/buckets/653eccb57f4ab270eb1a/files/CETIM-INDEX-CAT-CARD/view?project=651c17501139519bc5a2&mode=admin" alt="" />
                        <h2>CETIM</h2>
                    </a>
                </div>
            </section>
        </>
    )
}