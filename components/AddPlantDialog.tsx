import { Button, Modal, Text } from '@nextui-org/react'
import React from 'react'
import AddPlant from './AddPlant'

export default function AddPlantDialog(props: { isOpen: boolean; onCancel: () => void; onSuccess: () => void }) {
  const [submit, setSubmit] = React.useState(false)

  /**
   * Add plant completed
   */
  const onComplete = (status: boolean) => {
    setSubmit(false)
    if (status) {
      props.onSuccess()
    }
  }

  return (
    <Modal aria-labelledby="modal-title" open={props.isOpen} preventClose fullScreen>
      <Modal.Header autoMargin className="p-4 shadow-sm">
        <Text color="nono" id="modal-title" size={20} className="font-semibold text-lime-700">
          Add Plant
        </Text>
      </Modal.Header>
      <Modal.Body>
        <AddPlant submit={submit} onComplete={onComplete} />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onCancel}>
          Close
        </Button>
        <Button className="border-lime-700" color="success" auto disabled={submit} onClick={() => setSubmit(true)}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
