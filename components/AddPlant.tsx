import { Input } from '@nextui-org/react'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import MarkdownIt from 'markdown-it'
// Import MD editor dynamicaly
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
})
// Import MD editor style manually
import 'react-markdown-editor-lite/lib/index.css'

import { Plant } from '../models/Plant'
import { ADD_PLANT } from '../services/plant'
import { Failed, Success } from '../models/Generic'
import { FILE_MAX_SIZE } from '../utils/constants'

// Init MD parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

export default function AddPlant(props: {
  submit: boolean
  onComplete: (status: boolean) => void
}) {
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('Failed to add plant')
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [instuctions, setInstructions] = useState('')
  const [image, setImage] = useState()
  const [imageFileURL, setImageFileURL] = useState('')

  /**
   * Upload image to client
   * @param event
   */
  const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      // Validate size
      if(file.size > FILE_MAX_SIZE) {
        showError(`File is must be less than ${Math.floor(FILE_MAX_SIZE/(1000*1000))}mb`)
        return;
      }

      setImage(Object(file))
      setImageFileURL(URL.createObjectURL(file))
    }
  }

  /**
   * Show error message
   */
  const showError = (msg?: string) => {
    if (msg && typeof msg === 'string') {
      setErrorMsg(msg)
    }
    setError(true)
    setTimeout(() => {
      setError(false)
    }, 5000)
  }

  /**
   * Process add plant
   */
  const processForm = async (e?: any) => {
    if (e) e.preventDefault()
    const done = await doUpload({
      name: name,
      species: species,
      instructions: instuctions,
      image: image || undefined,
    })
      .then(() => {
        setError(false)
        return true
      })
      .catch((err: any) => {
        if (err) {
          if (err.data && err.data.error) showError(err.data.error)
          else if (err.error) showError(err.error)
          else if (err.message) showError(err.message)
          else showError(err)
        }
        return false
      })
    props.onComplete(done)
  }

  useEffect(() => {
    if (props.submit) {
      processForm()
    }
  })

  /**
   * Perform upload
   * @param {UploadType} type
   * @param {Upload} upload
   * @param {Number} index
   * @returns {Promise<AxiosResponse<ActionResponse>>}
   */
  const doUpload = async (plant: Plant): Promise<Success | Failed> => {
    const form = new FormData()

    if (plant.image) form.append('image', plant.image)
    else throw 'Image required'

    if (plant.name) form.append('name', plant.name && plant.name.trim())
    else throw 'Name required'

    if (plant.species)
      form.append('species', plant.species && plant.species.trim())
    else throw 'Species required'

    if (plant.instructions)
      form.append(
        'instructions',
        plant.instructions && plant.instructions.trim()
      )
    else throw 'Instructions required'

    return ADD_PLANT(form).catch((err) => {
      throw err
    })
  }

  return (
    <form onSubmit={processForm} className="m-auto lg:w-3/5">
      {/* Uploader */}
      <div className="bg-grey-lighter mb-4 flex w-full items-center justify-center">
        {imageFileURL && (
          <Image
            src={imageFileURL}
            width={200}
            height={200}
            objectFit="cover"
            alt=""
            className="m-auto rounded-2xl"
          />
        )}
      </div>
      <div className="bg-grey-lighter flex  w-full items-center justify-center">
        <label className="text-blue flex w-40 cursor-pointer flex-col items-center rounded-lg border border-gray-50 bg-white px-2 py-3 uppercase shadow-md ">
          <svg
            className="h-5 w-5"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-xs leading-normal">Upload Image</span>
          <input
            type="file"
            name="image"
            className="hidden"
            onChange={uploadToClient}
          />
        </label>
      </div>

      {/* Message */}
      <div
        style={{ opacity: error ? 1 : 0 }}
        className="m-2 rounded-md bg-red-100 p-2 text-center text-sm text-red-500 transition-opacity duration-150"
        onClick={() => setError(false)}
      >
        {errorMsg}
      </div>

      {/* Name */}
      <div className="mt-2">
        <label htmlFor="p-name">Name</label>
        <Input
          required
          name="p-name"
          clearable
          fullWidth
          color="primary"
          size="lg"
          placeholder="Enter Plant Name"
          onChange={(str) => setName(str.target.value || '')}
        />
      </div>

      {/* Species */}
      <div className="mt-4">
        <label htmlFor="p-species">Species</label>
        <Input
          required
          name="p-species"
          clearable
          fullWidth
          color="primary"
          size="lg"
          placeholder="Enter Plant Species"
          onChange={(str) => setSpecies(str.target.value || '')}
        />
      </div>

      {/* Watering Instructions */}
      <div className="mt-4">
        <label htmlFor="p-instructions">Watering Instructions</label>
        <MdEditor
          name="p-instructions"
          style={{ minHeight: '400px' }}
          placeholder="Enter Plant Watering Instructions"
          className="rounded-xl bg-gray-100 p-2"
          renderHTML={(text) => mdParser.render(text)}
          onChange={(str) => setInstructions(str.text || '')}
        />
      </div>
    </form>
  )
}
