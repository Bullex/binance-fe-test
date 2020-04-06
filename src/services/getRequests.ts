import Axios from 'axios'
import { ENDPOINTS } from '../config'

/*************** Get requests ***************************/
export const getProducts = () => {
  return Axios.get(ENDPOINTS.GET_PRODUCTS)
}
