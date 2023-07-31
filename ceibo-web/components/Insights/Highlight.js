import React from "react";
import Link from "next/link";
import insights from "../../utils/insights.json";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const Hightlight = () => {
  const { t } = useTranslation("common");
  const featureInsights = t("insightHightLight");
  const vermas = t("leerArt");
  const seccion = "insights";
  const publicaciones = [insights[0], insights[1]]; // TODO: show hightlight insights
  const { locale } = useRouter();
  return (
      <div className="blog-area pt-100">
        <div className="container hightlight-conteiner">
          <h2 className="hightlight-title">{featureInsights}</h2>
          <div className="hightlight">
            {publicaciones.map((publi, i) => (
              <div className="single-blog-item" style={{ width: "45%" }} key={i}>
                <div className="blog-image">
                  <Link href={`/${seccion}/${publi["path-url"]}`}>
                    <a>
                      <img src={publi.img} alt="image" />
                    </a>
                  </Link>
                </div>
                <div
                  className={`blog-post-content ${
                    locale == "es" ? "blog" : ""
                  }`}
                >
                  <h3>
                    <Link href={`/${seccion}/${publi["path-url"]}`}>
                      <a>{locale == "en" ? publi.titleEN : publi.title}</a>
                    </Link>
                  </h3>
                  <p>
                    {locale == "es"
                      ? publi.desc
                      : "*This article is written in Spanish"}
                  </p>
                  <Link href={`/${seccion}/${publi["path-url"]}`}>
                    <a className="read-more-btn-high hightlight-read">
                      {vermas}
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Hightlight;
