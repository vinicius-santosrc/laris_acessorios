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
                   
                </div>
            </section>

            <section>
                <div className="title-index titulo-produtos-laris">
                    <h1>COMPRE POR CATEGORIAS</h1>
                </div>
            </section>
           

            <section className='opções-itens'>
                <div className='novidade-inicio-cell'>
                    <a href={window.location.origin + '/pratas'}>
                        <img src="https://cloud.appwrite.io/v1/storage/buckets/653eccb57f4ab270eb1a/files/PRATAS-INDEX-CAT-CARD/view?project=651c17501139519bc5a2&mode=admin" alt="" />
                        <h2>PRATAS 925</h2>
                    </a>
                </div>
                
            </section>
            
         
        </>
    )
}