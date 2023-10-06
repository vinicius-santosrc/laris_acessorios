export default function BannerFooter() {
    return (
        <>
            <section className="banner-footer-pc">
                <a href={window.location.origin + "/pratas"}>
                    <img src="/static/media/product-images/banner-footer-site.png" alt="" />
                </a>
            </section>

            <section className="banner-footer-cell">
                <a href={window.location.origin + "/pratas"}>
                    <img src={"/static/media/product-images/banner-footer-site-cell.png"} alt="" />
                </a>
            </section>
        </>
    )
}