import axios from 'axios'

const url = "//191.252.196.91:3000/"
//const url = "//localhost:3000/"
const user = JSON.parse(localStorage.getItem('user'));


export const partidasService = {
  getPartidas,
  createPartida,
  updatePartida,
  deletePartida,
  getPorRodada
}

function getPartidas() {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*"}
  };


  return axios.get(url + "partidas", requestOptions)
    .then( (response) => {
      return response.data
    })
}

function getPorRodada(id) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*"}
  };


  return axios.get(url + "partidas?rodada=" + id, requestOptions)
    .then( (response) => {
      return response.data
    })
}

function createPartida(partida) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Authorization': user.user.token
    },

  };


  return axios.post(url + "partidas",{partida: partida}, requestOptions)
    .then( (response) => {
      return response.data
    })
}

function updatePartida(resultado) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Authorization': user.user.token
    },

  };


  return axios.put(url+"partidas/" + resultado.partida.partida_id, {partida: resultado.partida}, requestOptions)
    .then( (response) => {
      console.warn(response.data)
      return response.data
    })
}

function deletePartida(id) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Authorization': user.user.token
    }
  };


  return axios.delete(url+"partidas/" + id, requestOptions)
    .then( (response) => {
      return response.data
    })
}
