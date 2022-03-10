import { PER_PAGE_COUNT } from './constants'

export const GOOGLE_FONT_NUNITO = 'https://fonts.googleapis.com/css?family=Nunito'

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const URL_PLANT = (id = null) => {
  return API_BASE_URL + (id ? `/plant/${id}` : `/plant`)
}
export const URL_PLANT_LIST = (query = '', page = 0, limit = PER_PAGE_COUNT) => {
  return URL_PLANT() + `/list?query=${query}&page=${page}&limit=${limit}`
}
