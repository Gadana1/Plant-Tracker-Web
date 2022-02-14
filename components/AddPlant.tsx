import { Input, Row, Textarea } from '@nextui-org/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import MarkdownIt from 'markdown-it';
// Import MD editor dynamicaly
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});
// Import MD editor style manually
import 'react-markdown-editor-lite/lib/index.css';

// Init MD parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function AddPlant(props: {
  submit: boolean
  onComplete: () => void
}) {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [instuctions, setInstructions] = useState('')
  const [image, setImage] = useState(null)
  const [imageFileURL, setImageFileURL] = useState('')

  /**
   * Upload image to client
   * @param event
   */
  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]
      setImage(i)
      setImageFileURL(URL.createObjectURL(i))
    }
  }

  useEffect(() => {
    if (props.submit) {
      processForm()
    }
  })

  /**
   * Process add plant
   */
  function processForm(e?: any) {
    if (e) e.preventDefault()
    // TODO process form
  }

  /**
   * Cancel form
   */
  function cancel() {
    props.onComplete()
  }

  return (
    <form onSubmit={processForm}  className='m-auto lg:w-3/5'>
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

      {/* Name */}
      <Input
        clearable
        fullWidth
        color="primary"
        size="lg"
        placeholder="Name"
        className="mt-4"
        onChange={(str) => setName(str.target.value || '')}
      />

      {/* Species */}
      <Input
        clearable
        fullWidth
        color="primary"
        size="lg"
        placeholder="Species"
        className="mt-4"
        onChange={(str) => setSpecies(str.target.value || '')}
      />

      {/* Watering Instructions */}
      <div className="mt-4"> 
        <MdEditor 
        style={{ height: '500px' }} 
        placeholder="Watering Instructions"
        className="rounded-xl p-2"
        renderHTML={text => mdParser.render(text)} onChange={(str) => setInstructions(str.text || '')} />
      </div>

      <Row justify="space-between"></Row>
    </form>
  )
}
