import axios from 'axios'
import { Failed, Success } from '../models/Generic'
import { PlantList } from '../models/Plant'
import { PER_PAGE_COUNT } from '../utils/constants'
import { URL_PLANT, URL_PLANT_LIST } from '../utils/urls'

export const GET_PLANT_LIST: (
  query?: string,
  page?: number,
  limit?: number
) => Promise<PlantList> = (query = '', page = 0, limit = PER_PAGE_COUNT) =>
  axios.get(URL_PLANT_LIST(query, page, limit)).then((res) => res.data)
export const ADD_PLANT: (data: FormData) => Promise<Success | Failed> = (
  data: FormData
) => axios.post(URL_PLANT(), data).then((res) => res.data)
