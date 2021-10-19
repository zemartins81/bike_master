/* eslint-disable no-underscore-dangle */
import httpService from './httpService'

const { get, post } = { ...httpService }

export async function getPaths() {
  return get('http://localhost:3001/paths')
}

export async function postPoll(poll) {
  return post('http://localhost:3001/poll', poll)
}

export async function getPoll(id) {
  return get(`http://localhost:3001/poll/${id}`)
}

export async function putPoll(poll) {
  return post(`http://localhost:3001/${poll._id}`, poll)
}
