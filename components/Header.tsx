import React from 'react'
import { PlusCircleIcon } from '@heroicons/react/solid'

export const Header = (props: { onClickAdd: () => void }) => {
  return (
    <header className="p-4 shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a href="#" className="flex">
          <h1 className="mx-4 text-left text-3xl font-semibold text-lime-700">
            Xplants
          </h1>
        </a>
        <div className="w-auto" id="mobile-menu">
          <ul className="flex flex-row space-x-8 text-lg font-medium">
            <li>
              <button className="m-auto flex" onClick={props.onClickAdd}>
                <PlusCircleIcon className="m-auto w-10  text-lime-700" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
