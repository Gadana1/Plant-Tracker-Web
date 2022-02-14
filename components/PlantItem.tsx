import React from 'react'
import { Button, Card, Col, Row, Text } from '@nextui-org/react'
import { Plant } from '../models/Plant'

export default function PlantItem(props: {
  item: Plant
  onSelectPlant: (plant: Plant) => void
}) {
  return (
    <Card
      className="m-auto border-none"
      cover
      css={{ minWidth: '250px', maxWidth: '500px', height: '300px', p: 0 }}
    >
      <Card.Body>
        <Card.Image
          showSkeleton
          src={String(props.item.image)}
          height="100%"
          width="100%"
          alt={props.item.name}
        />
      </Card.Body>
      <Card.Footer
        blur
        css={{
          position: 'absolute',
          bgBlur: '#0f1114',
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Row>
              <Col>
                <Text color="#fff" size={20}>
                  {props.item.name}
                </Text>
                <Text color="#d1d1d1" size={16}>
                  {props.item.species}
                </Text>
              </Col>
            </Row>
          </Col>
          {props.item.instructions && props.item.instructions.length > 0 && (
            <Col>
              <Row
                className="flex items-center"
                justify="flex-end"
                align="center"
              >
                <Button
                  flat
                  auto
                  rounded
                  className="text-lime-100"
                  css={{ color: 'rgb(236 252 203)', bg: '#94f9f026' }}
                  onClick={() => props.onSelectPlant(props.item)}
                >
                  <Text
                    css={{ color: 'inherit' }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    More
                  </Text>
                </Button>
              </Row>
            </Col>
          )}
        </Row>
      </Card.Footer>
    </Card>
  )
}
