import axios from 'axios'

const url = "//191.252.196.91:3000/"
//const url = "//localhost:3000/"

const user = JSON.parse(localStorage.getItem('user'));


export const rodadaService = {
  getRodadas,
  createRodada,
  updateRodada,
  deleteRodada
}

function getRodadas() {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*"}
  };


  return axios.get(url + "/rodadas", requestOptions)
    .then( (response) => {
      console.warn(response.data)
      return response.data
    })
}

function createRodada(rodada) {

  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
    'Authorization': user.user.token}
  };


  return axios.post(url + "/rodadas", { rodada: rodada.rodada}, requestOptions)
    .then( (response) => {
      return response.data
    },
      (err) => {
          return err
      }
  )
}

function addRodadaToPartida(partida) {

  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*"},
    partida: partida
  };

  return axios.post(url + "/partidas", requestOptions)
    .then( (response) => {
      console.warn(response.data)
      return response.data
    })
}

function updateRodada(rodada) {
  const requestOptions = {
    headers: { 'Authorization': user.user.token },
    rodada: rodada,
  };
  console.warn(requestOptions)


  return axios.put(url + "/rodadas/" + rodada.id, requestOptions, requestOptions)
    .then( (response) => {
        return response.data
      },
      (err) => {
        return err
      }
    )
}

function deleteRodada(id) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Authorization': user.user.token }
  };


  return axios.delete(url+"rodadas/" + id, requestOptions)
    .then( (response) => {
      return response.data
    })
}
