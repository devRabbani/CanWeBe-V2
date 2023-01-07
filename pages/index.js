import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useCallback } from 'react'
import Modal from '../components/modal'
import ProjectScroll from '../components/projectScroller'
import { getColData, getProjectList } from '../helpers'
import styles from '../styles/Home.module.css'
import LatestTech from '../components/svg/latestTech'
import FreeSvg from '../components/svg/freeSvg'
import Testimony from '../components/testimony'
import Footer from '../components/footer'
import thumb from '../public/assets/thumb.webp'
import ServiceSection from '../components/serviceSection'

export default function Home({ data, testimonyData }) {
  const [isModal, setIsModal] = useState(false)
  const [isImgLoad, setIsImgLoad] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const handleImg = useCallback(() => {
    setIsImgLoad(true)
  }, [])

  const handleVideo = useCallback(() => {
    setIsReady(true)
  }, [])

  return (
    <>
      <Head>
        <title>Home | CanWeBe</title>
        <link
          rel="preload"
          href="/assets/bgvideo.mp4"
          as="video"
          type="video/mp4"
        />
      </Head>
      <>
        <section className={styles.heroSection}>
          <div className={styles.videooverlay} />
          <div
            style={{ opacity: !isReady ? 1 : 0 }}
            className={styles.thumbnail}
          >
            <Image src={thumb} alt={'Thumbnail'} layout="fill" priority />
          </div>
          <video
            onLoadedData={handleVideo}
            className={styles.video}
            style={{ opacity: isReady ? 1 : 0 }}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/assets/bgvideo.mp4" type="video/mp4" />
          </video>
          <div className="wrapper">
            <div className={styles.heroDiv}>
              <div className={styles.heroLeft}>
                <p className={styles.heroSubline}>
                  A Software Development Organization
                </p>
                <h1 className={styles.heroH1}>
                  Welcome to <span className={styles.canwebe}>CanWeBe</span>
                </h1>
                <p className={styles.subpara}>
                  We assist you to remodel everyday problems into modern techy
                  solution.We help the society by presenting cost-free cutting
                  edge applications.
                </p>
                <div className={styles.heroBtnDiv}>
                  <Link href="/products">
                    <a className={styles.heroBtnProjects}>Our Products</a>
                  </Link>

                  <Link href="/form/contact">
                    <a className={styles.heroBtnContact}>Contact</a>
                  </Link>
                </div>
              </div>
              <div
                className={styles.heroRight}
                style={{ opacity: isImgLoad ? '1' : '0' }}
              >
                <Image
                  src="/logo.webp"
                  alt="logo"
                  layout="responsive"
                  width={500}
                  height={500}
                  onLoad={handleImg}
                />
              </div>
            </div>
          </div>
        </section>
        <section className={styles.maintainence}>
          <div className="wrapper">
            <p className={styles.maintainenceP}>
              Over 40+ projects , 2k commits and real world contribution by
              CanWeBe
            </p>
          </div>
        </section>
        <section className={styles.projectSection}>
          <ServiceSection />
          <div className="wrapper">
            <h3 className="header">Latest Products</h3>
            <ProjectScroll data={data} />
          </div>
        </section>
        <section className={styles.whyus}>
          <div className={styles.whyusleft}>
            <p className={styles.whyusleftp}>Why Us</p>
            <p className={styles.whyusleftsubp}>
              What make us different from others
            </p>
          </div>
          <div className={styles.whyusright}>
            <div className={styles.point1}>
              <div className={styles.point1Svg}>
                <LatestTech />
              </div>
              <h4 className={styles.point1H4}>Cutting Edge Tech</h4>
              <p className={styles.point1P}>
                We use latest tech stacks for our projects. Most of our project
                is PWA , Which is future of web app and our developers are
                skilled in latest tech and tools.
              </p>
            </div>
            <div className={styles.point2}>
              <p className={styles.problemQ}>
                What
                <br />
                type of
                <br />
                software we generally <br />
                build ?
              </p>
              <p className={styles.problemA}>
                We target general problems which occur everyday in our life.
                Most of our app solve these everyday life problems. We follow
                the motto &quot; Tech for Good &quot;
              </p>
            </div>
            <div className={styles.point3}>
              <div className={styles.point3Svg}>
                <FreeSvg />
              </div>
              <h4 className={styles.point1H4}>Cost Free Products</h4>
              <p className={styles.point1P}>
                Most of our softwares are cost free and open sourced. Our app is
                easily accessible by general users with modern UI/UX and easy to
                use Interface.
              </p>
            </div>
          </div>
        </section>
        <Testimony data={testimonyData} />
        <section className={styles.feedbackSection}>
          <div className="wrapper">
            <div className={styles.feedbackCard}>
              <p>How was your experience with our services ?</p>
              <Link href="/form/review">
                <a className={styles.feedbackBtn}>Rate Us</a>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </>

      {isModal && <Modal setIsModal={setIsModal} />}
    </>
  )
}

export async function getStaticProps() {
  let data = []
  let testimonyData = []

  try {
    const newdata = await getProjectList(6)
    testimonyData = await getColData('testimony')
    data = await JSON.parse(JSON.stringify(newdata))
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      data,
      testimonyData,
    },
  }
}
