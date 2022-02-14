import { Button, Modal } from '@nextui-org/react'
import React from 'react'
import { Plant } from '../models/Plant'
import dynamic from 'next/dynamic'
import MarkdownIt from 'markdown-it'

// Import MD editor dynamicaly
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
})

// Init MD parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

export default function ViewPlantDialog(props: {
  plant: Plant,
  isOpen: boolean
  onClose: () => void
}) {

  return (
    <Modal
      aria-labelledby="modal-title"
      open={props.isOpen}
      onClose={props.onClose}
      className='m-4'
    >
    <MdEditor
        style={{ minHeight: '400px' }}
        className="rounded-t-xl bg-gray-100 "
        renderHTML={(text) => mdParser.render(text)}
        value={props.plant.instructions}
        readOnly
        autoFocus
        view={{menu:false, md: false, html: true}}
      />
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
