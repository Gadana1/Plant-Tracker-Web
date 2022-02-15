import React, { ChangeEvent, useState } from 'react'
import { Col, FormElement, Input, Row } from '@nextui-org/react'

export const Header = (props: { onSearch: (e: ChangeEvent<FormElement>) => void }) => {
  const [searchToggled, setSearchToggled] = useState(false)

  return (
    <div className="sticky top-0 z-10 w-full bg-white px-4 py-4 shadow-sm">
      <Row justify="space-between" align="center" className="container mx-auto">
        <Col span={searchToggled ? 0 : 4} className="px-4 transition-all duration-200">
          <a href="#" className="flex">
            <h1 className="text-left text-3xl font-semibold text-lime-700">Xplants</h1>
          </a>
        </Col>
        <Col span={searchToggled ? 12 : 5} className="px-4 transition-all duration-200">
          <Input
            clearable
            fullWidth
            name="search"
            color="primary"
            size="lg"
            placeholder="Search"
            onChange={props.onSearch}
            onFocus={() => setSearchToggled(true)}
            onBlur={() => setSearchToggled(false)}
          />
        </Col>
      </Row>
    </div>
  )
}
