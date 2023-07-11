import React from "react"
import NavbarTwo from "../../components/Layouts/NavbarTwo"
import Footer from "../../components/Layouts/Footer"
import InsightDetailsContent from "../../components/Blog/InsightDetailsContent"
import insights from "../../utils/insights.json"
import { useRouter } from "next/router"
import InsightPageBanner from "../../components/Common/InsightPageBanner"
import Head from "next/head"
import LatestNewsSlider from '../../components/Common/LatestNewsSlider';

const Insight = () => {
  const router = useRouter()
  const { locale } = useRouter()
  const pathInsight = router.asPath.split("/")[2]

  const [data, setdata] = React.useState({})

  React.useEffect(() => {
    insights.forEach((insight) => {
      if (insight["path-url"] === pathInsight) {
        setdata(insight)
      }
    })
  }, [pathInsight])

  const TITLE_TAG = `${data?.title} - Ceibo Digital`
  const META_DESC = `${data?.desc}`
  return (
    <>
      <Head>
        <title>{TITLE_TAG}</title>
        <meta name="description" content={META_DESC} />
      </Head>
      <NavbarTwo />
      <InsightPageBanner
        pageTitle={data.title}
        BGImage={data.metadata?.bannerImg}
        textcenter={true}
      />
      <InsightDetailsContent publicacion={data} date={`${
          locale == "es" ? data?.metadata?.date : data?.metadata?.dateEN
        }  ${
          data.metadata?.fuenteOriginal
            ? "- " + data.metadata?.fuenteOriginal
            : ""
        }`}/>
      <LatestNewsSlider type={'insights'}/>
      <Footer />
    </>
  )
}

export default Insight
