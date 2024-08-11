import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

const axios_instance = axios.create({baseURL: BASE_URL})

export default axios_instance ;