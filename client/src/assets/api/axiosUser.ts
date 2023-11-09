import axios from 'axios'
import { BASEURL } from './baseURL'


export const baseURL= axios.create({
    baseURL:BASEURL
})