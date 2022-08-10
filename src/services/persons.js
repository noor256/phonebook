import axios from 'axios'

const baseUrl = 'https://backphonebook.herokuapp.com/api/persons'



const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject =>{
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
  getAll, create, update}