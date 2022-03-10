import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { Button, Col, FormElement, Input, Loading, Row, Text } from '@nextui-org/react'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import AddPlantDialog from '../components/AddPlantDialog'
import PlantItemList from '../components/PlantItemList'
import { PlantList } from '../models/Plant'
import { GOOGLE_FONT_NUNITO, URL_PLANT_LIST } from '../utils/urls'
import { GET_PLANT_LIST } from '../services/plant'
import ViewPlantDialog from '../components/ViewPlantDialog'
import { PER_PAGE_COUNT } from '../utils/constants'
import { PlusCircleIcon } from '@heroicons/react/solid'

// SWR params for Plan List
const plantListFetcher = (query: string, page: number): Promise<PlantList> => GET_PLANT_LIST(query, page)
const plantListKey = (index: number, prev: PlantList): { next: number; current: number } | null => {
  // console.log("Plant key index", index)
  if (prev && (!prev.data || prev.data.length === 0)) return null
  else if (index === 0) return { next: 0, current: 0 }
  return {
    next: (prev.current_page || index) + 1,
    current: prev.current_page || index,
  }
}

const Home: NextPage = () => {
  const [isAddPlantOpen, setAddPlantIsOpen] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [query, setQuery] = useState('')
  const { isValidating, data, size, setSize, mutate } = useSWRInfinite(
    (index: number, prev: PlantList) => plantListKey(index, prev),
    ({ next }) => {
      console.log('Plant fetcher next', next)
      return plantListFetcher(query, next)
    }
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
  const onAddPlant = async () => {
    setAddPlantIsOpen(false)
    await mutate()
  }

  /**
   * On Search plant completed - Mutate list
   */
  const onSearchPlant = async (event: ChangeEvent<FormElement>) => {
    if (isValidating) return
    setTimeout(() => {
      setQuery(String(event.target.value))
      mutate()
    }, 500)
  }

  /**
   * On Load More Plants completed - Mutate list
   */
  const onLoadMorePlant = async () => {
    if (isValidating) return
    await setSize(size + 1)
  }

  return (
    <div>
      <Head>
        <title>Plant Tracker</title>
        <meta name="description" content="Plant tracker application" />
        <link rel="icon" href="/favicon.ico" />
        <link href={GOOGLE_FONT_NUNITO} rel="stylesheet" />
      </Head>
      <Header onSearch={onSearchPlant} />
      <div
        style={{ opacity: isValidating ? 1 : 0 }}
        className="fixed top-20 left-0 right-0 z-10 mt-3 flex justify-center"
      >
        <Loading type="gradient" color="success" css={{ margin: 'auto' }} />
      </div>
      <main className="flex min-h-screen items-center justify-center p-3 md:mx-auto">
        {data ? (
          totalItems > 0 ? (
            <div className="p-3">
              <PlantItemList data={data} onSelectPlant={(plant: any) => setSelectedPlant(plant)} />
              <Button
                disabled={isValidating}
                ghost={!isValidating}
                flat
                ripple
                onClick={onLoadMorePlant}
                color="success"
                className="mx-auto my-2"
              >
                {isValidating ? 'Loading' : 'Load More'}
              </Button>
            </div>
          ) : (
            <Text h2> No data Available </Text>
          )
        ) : !isValidating ? (
          'Failed to load data'
        ) : (
          ''
        )}
      </main>
      <AddPlantDialog isOpen={isAddPlantOpen} onCancel={() => setAddPlantIsOpen(false)} onSuccess={onAddPlant} />
      <ViewPlantDialog
        plant={selectedPlant || {}}
        isOpen={selectedPlant ? true : false}
        onClose={() => setSelectedPlant(null)}
      />

      <button
        className="fixed bottom-4 right-4 z-50 rounded-full bg-white shadow-md"
        onClick={() => setAddPlantIsOpen(true)}
      >
        <PlusCircleIcon className="m-auto w-14 text-lime-700" />
      </button>
      <Footer />
    </div>
  )
}

export default Home
