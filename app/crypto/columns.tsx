import { Checkbox, Tooltip } from '@nextui-org/react'

export type Crypto = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  price_change_24h: number
  price_change_percentage_24h: number
}

/*
{
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    "current_price": 42478,
    "market_cap": 831689656165,
    "market_cap_rank": 1,
    "fully_diluted_valuation": 891929422601,
    "total_volume": 28186917663,
    "high_24h": 43646,
    "low_24h": 41820,
    "price_change_24h": -1156.4970559854191,
    "price_change_percentage_24h": -2.65043,
    "market_cap_change_24h": -24168468782.515747,
    "market_cap_change_percentage_24h": -2.82389,
    "circulating_supply": 19581687.0,
    "total_supply": 21000000.0,
    "max_supply": 21000000.0,
    "ath": 69045,
    "ath_change_percentage": -38.4782,
    "ath_date": "2021-11-10T14:24:11.849Z",
    "atl": 67.81,
    "atl_change_percentage": 62542.98909,
    "atl_date": "2013-07-06T00:00:00.000Z",
    "roi": null,
    "last_updated": "2023-12-26T23:01:26.128Z"
}
*/

export const columns = [
  {
    key: 'watch_list',
    label: 'Watch'
  },
  {
    key: 'market_cap_rank',
    label: '#'
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'current_price',
    label: 'Price'
  },
  {
    key: 'price_change_percentage_24h',
    label: 'Change'
  },
  {
    key: 'total_volume',
    label: 'Volume'
  },
  {
    key: 'market_cap',
    label: 'Market Cap'
  }
]

const handleWatchList = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.checked)
  console.log(e.target.value)
}

export const renderCell = (crypto: Crypto, columnKey: React.Key) => {
  const cellValue = crypto[columnKey as keyof Crypto]
  var spanColor = "text-green-500"

  switch (columnKey) {
    case 'watch_list':
      return (
        <span className='justify-center'>
          <input
            type="checkbox"
            className="star justify-center"
            value={crypto.id}
            onChange={handleWatchList}
          />
        </span>
      )
    case 'market_cap_rank':
      return crypto.market_cap_rank
    case 'name':
      return cellValue
    case 'current_price':
      return (
        <span>{new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 8
        }).format(crypto.current_price)}
        </span>
      )
    case 'price_change_percentage_24h':
      if (crypto.price_change_percentage_24h > 0) {
        spanColor = "text-green-500"
      } else if (crypto.price_change_percentage_24h < 0) {
        spanColor = "text-red-500"
      } else {
        spanColor = ""
      }
      return (
        <span className={spanColor}>
          {crypto.price_change_percentage_24h.toFixed(1) + '%'}
        </span>
      )
    case 'total_volume':
      return (
        <span>{new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 8
        }).format(crypto.total_volume)}
        </span>
      )
    case 'market_cap':
      return (
        <span>{new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 8
        }).format(crypto.market_cap)}
        </span>
      )
    default:
      return cellValue
  }
}
