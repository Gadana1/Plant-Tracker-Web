import React from 'react'
import { Grid, Text } from '@nextui-org/react'
import PlantItem from './PlantItem'
import { PlantList } from '../models/Plant'

export default function PlantItemList(props: { data: PlantList[] }) {
  return (
    <Grid.Container wrap='wrap' gap={2} justify="center">
      {props.data.map((list, i) => {
        return list.data.map((plant, j) => {
          return (
            <Grid key={`${i+1}${j+1}`}  >
              <PlantItem item={plant} />
            </Grid>
          )
        })
      })}
    </Grid.Container>
  )
}
