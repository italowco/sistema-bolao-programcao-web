import axios from 'axios'

const url = "//localhost:3000/"
const user = JSON.parse(localStorage.getItem('user'));

export const apostasService = {
  getApostasFolhas,
  getAllApostasFolhas,
  createApostaFolha,
  deleteAposta
}



function getAllApostasFolhas() {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"}
    };


    return axios.get(url+"aposta_folhas", requestOptions)
        .then( (response) => {
            return response.data
        })
}

function getApostasFolhas(rodadaId) {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"}
    };


    return axios.get(url+"aposta_folhas?rodada=" + rodadaId, requestOptions)
        .then( (response) => {
            return response.data
        })
}


function deleteAposta(rodadaId) {
  const requestOptions = {
   headers: { 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
    'Authorization': user.user.token },
  };


  return axios.delete(url+"aposta_folhas/" + rodadaId, requestOptions)
    .then( (response) => {
      return response.data
    })
}

function createApostaFolha(folha) {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Authorization': user.user.token },
    };
    return axios.post(url+"aposta_folhas", {aposta_folha: folha}, requestOptions)
        .then( (response) => {
            return response.data
        })
}
