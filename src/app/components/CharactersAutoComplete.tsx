'use client'
import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'

type Character = {
  personagem: string
  imagem_url: string
}

export default function CharacterAutocomplete({
  characters,
  onSelect
}: {
  characters: Character[]
  onSelect: (c: Character) => void
}) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Character | null>(null)

  const filtered =
    query === ''
      ? characters
      : characters.filter((c) =>
          c.personagem.toLowerCase().includes(query.toLowerCase())
        )

  function handleSelect(c: Character) {
    setSelected(c)
    onSelect(c)
  }

  return (
    <div className="w-72">
      <Combobox value={selected} onChange={handleSelect}>
        <div className="relative">
          <Combobox.Input
            className="w-full border rounded-md px-3 py-2 bg-white text-black
             focus:outline-none focus:ring-2 focus:ring-yellow-500"
            // 👇 aqui precisa retornar string
            displayValue={(c: Character | null) => (c ? c.personagem : '')}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o personagem..."
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute bottom-full mb-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
              {filtered.length === 0 && query !== '' ? (
                <div className="cursor-default select-none px-4 py-2 text-gray-500">
                  Nenhum personagem encontrado.
                </div>
              ) : (
                filtered.map((c) => (
                  <Combobox.Option
                    key={c.personagem}
                    value={c}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-3 pr-4 flex items-center gap-2 ${
                        active ? 'bg-yellow-100 text-black' : 'text-gray-900'
                      }`
                    }
                  >
                    <img
                      src={c.imagem_url}
                      alt={c.personagem}
                      className="w-12 h-12 border-2 object-cover"
                    />
                    <span className="block truncate font-medium">
                      {c.personagem}
                    </span>
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
