'use client'

import { useCallback, useMemo, useState } from 'react'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  SortDescriptor
} from '@nextui-org/react'

import { useAsyncList } from "@react-stately/data"
import { Crypto, columns, renderCell } from '../crypto/columns'
import { SearchIcon } from './icons'

export default function CryptoTable({ crypto }: { crypto: Crypto[] }) {
  const [filterValue, setFilterValue] = useState('')
  const hasSearchFilter = Boolean(filterValue)

  const filteredItems = useMemo(() => {
    let filteredCrypto = [...crypto]

    if (hasSearchFilter) {
      filteredCrypto = filteredCrypto.filter(crypto =>
        crypto.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    }

    return filteredCrypto
  }, [crypto, filterValue, hasSearchFilter])

  const rowsPerPage = 25
  const [page, setPage] = useState(1)
  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems])

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'market_cap_rank',
    direction: 'ascending'
  })

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Crypto, b: Crypto) => {
      const first = a[sortDescriptor.column as keyof Crypto] as string
      const second = b[sortDescriptor.column as keyof Crypto] as string
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex items-end justify-between gap-3'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder='Search by name...'
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    )
  }, [filterValue, onSearchChange, onClear])

  return (
    <Table
      isStriped
      aria-label='Crypto table'
      topContent={topContent}
      topContentPlacement='outside'
      bottomContent={
        <div className='flex w-full justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            color='secondary'
            page={page}
            total={pages}
            onChange={page => setPage(page)}
          />
        </div>
      }
      bottomContentPlacement='outside'
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      classNames={{
        wrapper: 'min-h-[222px]'
      }}
    >
      <TableHeader columns={columns}>
        {column => (
          <TableColumn
            key={column.key}
            {...(column.key === 'watch_list' ? { width: `5` } : {})}
            {...(column.key === 'market_cap_rank' ? { allowsSorting: true, width: `5` } : {})}
            {...(column.key === 'name' ? { allowsSorting: true } : {})}
            {...(column.key === 'current_price' ? { allowsSorting: true } : {})}
            {...(column.key === 'price_change_percentage_24h' ? { allowsSorting: true } : {})}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedItems} emptyContent={'No data to display.'}>
        {crypto => (
          <TableRow key={crypto.id}>
            {columnKey => <TableCell>{renderCell(crypto, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
