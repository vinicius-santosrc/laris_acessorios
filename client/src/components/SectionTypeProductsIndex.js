export default function SectionTypeProductsIndex() {

    const categorias = [
        {
            categoria: "Colares",
            url: "colares",
            imageRef: "https://cloud.appwrite.io/v1/storage/buckets/651df9c4741bb296da03/files/657381ccdab02cab0573/view?project=651c17501139519bc5a2&mode=admin"
        },
        {
            categoria: "Brincos",
            url: "brincos",
            imageRef: "https://cloud.appwrite.io/v1/storage/buckets/651df9c4741bb296da03/files/65736d38bd5c8625cf8f/view?project=651c17501139519bc5a2&mode=admin"
        },
        {
            categoria: "Anéis",
            url: "aneis",
            imageRef: "https://cloud.appwrite.io/v1/storage/buckets/651df9c4741bb296da03/files/654570679ec415ff7f49/view?project=651c17501139519bc5a2"
        },
        {
            categoria: "Pulseiras",
            url: "pulseiras",
            imageRef: "https://cloud.appwrite.io/v1/storage/buckets/651df9c4741bb296da03/files/6554eeba632e96321ac8/view?project=651c17501139519bc5a2"
        },
        {
            categoria: "Braceletes",
            url: "braceletes",
            imageRef: "https://cloud.appwrite.io/v1/storage/buckets/651df9c4741bb296da03/files/6524151fb038ce29bc90/view?project=651c17501139519bc5a2"
        },
        {
            categoria: "Tornozeleiras",
            url: "tornozeleiras",
            imageRef: "https://cloud.appwrite.io/v1/storage/buckets/651df9c4741bb296da03/files/6535a09ec0a1236f0567/view?project=651c17501139519bc5a2"
        },
        {
            categoria: "Piercing",
            url: "piercing",
            imageRef: "https://cloud.appwrite.io/v1/storage/buckets/651df9c4741bb296da03/files/65457194d2b8b73b513e/view?project=651c17501139519bc5a2"
        }
    ]

    return (
        <>
            <section>
                <div className="index-select-type">
                    <div className='title-index-type'>
                        <h1>Acessórios que te representam</h1>
                        <h1>Loja virtual</h1>
                    </div>
                    <div className="right-side-categorias-show">
                        {categorias.map(card => {
                            return (
                                <a href={window.location.origin + '/pratas-' + card.url}>
                                    <div className="card-categorias">
                                        <img src={card.imageRef} alt="" />
                                        <h2>{card.categoria}</h2>
                                    </div>
                                </a>
                            )
                        })}
                    </div>

                </div>
            </section>

            <section>
                <div className="title-index titulo-produtos-laris">
                    <h1>COMPRE POR CATEGORIAS</h1>
                </div>
            </section>


            <section className='opções-itens'>
                {categorias.map(card => {
                    return (
                        <div className='novidade-inicio-cell'>
                            <a href={window.location.origin + '/pratas-' + card.url}>
                                <img src={card.imageRef} alt="" />
                                <h2>{card.categoria}</h2>
                            </a>
                        </div>
                    )
                })}



            </section>


        </>
    )
}