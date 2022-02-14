import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { Button, Text } from '@nextui-org/react'

import styles from '../styles/Home.module.scss'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import AddPlantDialog from '../components/AddPlantDialog'
import PlantItemList from '../components/PlantItemList'
import { PlantList } from '../models/Plant'
import { GOOGLE_FONT_NUNITO, URL_PLANT_LIST } from '../utils/urls'
import { GET_PLANT_LIST } from '../services/plant'
import ViewPlantDialog from '../components/ViewPlantDialog'

// SWR params for Plan List
const plantListFetcher: (url: string) => Promise<PlantList> = (url: string) =>
  GET_PLANT_LIST(url)
const plantListKey = (pageIndex: number, previousPageData: PlantList) => {
  // Reached the end
  if (
    previousPageData &&
    (!previousPageData.data || previousPageData.data.length === 0)
  )
    return null
  // First page, we don't have `previousPageData`
  else if (pageIndex === 0) return URL_PLANT_LIST()
  // Get API ENDPOINT for next page
  return URL_PLANT_LIST((previousPageData.current_page || pageIndex) + 1)
}

const Home: NextPage = () => {
  const [isAddPlantOpen, setAddPlantIsOpen] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState(null)
  const { data, size, setSize, mutate } = useSWRInfinite(
    plantListKey,
    plantListFetcher
  )

  // We can now calculate the number of all items
  let totalItems = 0
  if (data) {
    for (let i = 0; i < data.length; i++) {
      totalItems += data[i].data ? data[i].data.length : 0
    }
  }

  /**
   * On Add plant completed - Mutate list
   */
  const onAddPlant = () => {
    setAddPlantIsOpen(false)
    mutate()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Plant Tracker</title>
        <meta name="description" content="Plant tracker application" />
        <link rel="icon" href="/favicon.ico" />
        <link href={GOOGLE_FONT_NUNITO} rel="stylesheet" />
      </Head>
      <Header onClickAdd={() => setAddPlantIsOpen(true)} />
      <main className={styles.main}>
        {data ? (
          totalItems > 0 ? (
            <div className="p-3">
              <h1 className="ml-3 px-4 py-2 text-3xl">
                <strong>{totalItems}</strong> results
              </h1>
              <PlantItemList data={data} onSelectPlant={(plant: any)=> setSelectedPlant(plant)}/>
              <Button
                ghost
                flat
                ripple
                onClick={() => setSize(size + 1)}
                color="success"
                className="mx-auto my-2"
              >
                Load More
              </Button>
            </div>
          ) : (
            <Text h2> No data Available </Text>
          )
        ) : (
          <Text h2> Loading ... </Text>
        )}
      </main>
      <AddPlantDialog
        isOpen={isAddPlantOpen}
        onCancel={() => setAddPlantIsOpen(false)}
        onSuccess={onAddPlant}
      />
      <ViewPlantDialog
        plant={selectedPlant || {}}
        isOpen={selectedPlant ? true : false}
        onClose={() => setSelectedPlant(null)}
      />
      <Footer />
    </div>
  )
}

export default Home
