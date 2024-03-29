import React from "react"
import Link from "next/link"
import publicaciones from "../../utils/publicaciones.json"
import insights from "../../utils/insights.json"
import { useRouter } from "next/router"
import useTranslation from "next-translate/useTranslation"

const BlogGrid = ({section}) => {
  const { locale } = useRouter()

  const data = section === 'insights' ? insights : publicaciones;
  const urlFragment = section === 'insights' ? 'insights' : 'publicaciones';
  const style = section === 'insights' ? {paddingTop: 30} : {};

  const { t } = useTranslation("common")
  const vermas = t("vermas")
  return (
    <>
      <div className="blog-area ptb-100" style={style}>
        <div className="container">
          <div className="row justify-content-center">
            {data.map((publi, i) => (
              <div className="col-lg-4 col-md-6" key={i}>
                <div className="single-blog-item ">
                  <div className="blog-image">
                    <Link href={`/${urlFragment}/${publi["path-url"]}`}>
                      <a>
                        <img src={publi.img} alt="image" />
                      </a>
                    </Link>
                    {/* 
                    <div className="post-tag">
                      <Link href="/blog">
                        <a>Technology</a>
                      </Link>
                    </div> */}
                  </div>

                  <div
                    className={`blog-post-content ${
                      locale == "es" ? "blog" : null
                    }`}
                  >
                    <span className="date">
                      {locale == "es"
                        ? publi?.metadata.date
                        : publi?.metadata.dateEN}
                    </span>
                    <h3>
                      <Link href={`/${urlFragment}/${publi["path-url"]}`}>
                        <a>{locale == "en" ? publi.titleEN : publi.title}</a>
                      </Link>
                    </h3>

                    <p>
                      {locale == "es"
                        ? publi.desc
                        : "*This article is written in Spanish"}
                    </p>

                    <Link href={`/${urlFragment}/${publi["path-url"]}`}>
                      <a className="read-more-btn">
                        {vermas}
                        <i className="fa-solid fa-angles-right"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {/* <div className="col-lg-12 col-md-12">
              <div className="pagination-area">
                <Link href="#">
                  <a className="prev page-numbers">
                    <i className="fa-solid fa-angles-left"></i>
                  </a>
                </Link>
                <Link href="#">
                  <a className="page-numbers">1</a>
                </Link>
                <span className="page-numbers current">2</span>
                <Link href="#">
                  <a className="page-numbers">3</a>
                </Link>
                <Link href="#">
                  <a className="page-numbers">4</a>
                </Link>
                <Link href="#">
                  <a className="next page-numbers">
                    <i className="fa-solid fa-angles-right"></i>
                  </a>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogGrid
