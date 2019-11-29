import axios from 'axios'

const url = "//191.252.196.91:3000/"
//const url = "//localhost:3000/"

const user = JSON.parse(localStorage.getItem('user'));

export const bilhetesService = {
  getBilhetes,
  createBilhete,
  updateBilhete,
  deleteBilhete,
  getBilhetesPorRodada
}

function getBilhetes() {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*"}
  };


  return axios.get(url+"bilhetes", requestOptions)
    .then( (response) => {
      return response.data
    })
}

function getBilhetesPorRodada(rodadaId) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*"}
  };


  return axios.get(url+"bilhetes?rodada=" + rodadaId, requestOptions)
      .then( (response) => {
        return response.data
      })
}


function createBilhete(bilhete) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
     'Authorization': user.user.token },
  };

  return axios.post(url+"bilhetes", {bilhete: bilhete}, requestOptions)
    .then( (response) => {
      return response.data
    })
}

function updateBilhete(bilhete) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Authorization': user.user.token },
  };
  console.warn(bilhete)
  return axios.put(url+ "bilhetes",{bilhete: bilhete}, requestOptions)
    .then( (response) => {
      return response.data
    })
}

function deleteBilhete(id) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Authorization': user.user.token }
  };


  return axios.delete(url+"bilhetes/" + id, requestOptions)
    .then( (response) => {
      return response.data
    })
}
