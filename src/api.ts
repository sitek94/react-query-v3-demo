import axios from 'axios'

const client = axios.create({
  baseURL: 'https://swapi.dev/api/',
})

export const api = {
  async getPeople() {
    const response = await client.get('people')
    return response.data
  },

  async getFilms() {
    const response = await client.get('films')
    return response.data
  },
}
