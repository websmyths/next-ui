import CryptoTable from '@/app/components/CryptoTable'
import { Crypto } from './columns'
import useSWR from "swr"

async function getCrypto(): Promise<Crypto[]> {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', {
    headers: {
      'Content-Type': 'application/json', // Example header
      'x-cg-demo-api-key': 'CG-P9AymJMWW3gdCBaFjnCax5aF',
    }
  }); const data = await res.json()

  return data
}

export default async function CryptoPrices() {
  const crypto = await getCrypto()

  return (
    <section className='py-24'>
      <div className='container'>
        <CryptoTable crypto={crypto} />
      </div>
    </section>
  )
}
