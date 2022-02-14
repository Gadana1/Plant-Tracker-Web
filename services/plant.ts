import axios from 'axios'
import { Failed, Success } from '../models/Generic'
import { Plant, PlantList } from '../models/Plant'
import { URL_PLANT, URL_PLANT_LIST } from '../utils/urls'

export const GET_PLANT_LIST: ((url?: string) => Promise<PlantList>) = (url = URL_PLANT_LIST()) => axios.get(url).then(res => res.data)
export const ADD_PLANT: ((data: FormData) => Promise<Success | Failed>) = (data: FormData) => axios.post(URL_PLANT(), data).then(res => res.data)

