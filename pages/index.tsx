import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import AddPlantDialog from '../components/AddPlantDialog'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  let [isAddPlantOpen, setAddPlantIsOpen] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>Plant Tracker</title>
        <meta name="description" content="Plant tracker application" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito|Monoton"
          rel="stylesheet"
        />
      </Head>
      <Header onClickAdd={() => setAddPlantIsOpen(true)} />
      <AddPlantDialog isOpen={isAddPlantOpen} setIsOpen={setAddPlantIsOpen} />
      <main className={styles.main}>
        {/* TODO Add content */}
      </main>
      <Footer />
    </div>
  )
}

export default Home
