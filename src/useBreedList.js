import { useQuery } from '@tanstack/react-query'
import fetchBreedList from './fetchBreedList'

export default function useBreedList(animal) {
    const results = useQuery(["breeds", animal], fetchBreedList)// eslint-disable-line react-hooks/exhaustive-deps

    return [results?.data?.breeds ?? [], results.status]
}
