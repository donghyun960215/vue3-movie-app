const axios = require('axios')

exports.handler = async function (event) {
  console.log(event)
  const payload = JSON.parse(event.body) //문자데이터로 넘어오는 데이터를 JSON.parse를 사용하여 다시 객체데이터로 변환
  const {title, type, year, page, id} = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`


  try {
    const { data } =  await axios.get(url)
    if(data.Error) {
      return {
        statusCode: 400,
        body: data.Error 
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data) // 객체데이터로 넘어오는 데이터를 JSON.stringify를 사용하여 다시 문자데이터로 변환
    }
  }catch(error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  } 
  //store/movie.js 애서 사용중이던 로직을 위와 같이 변경 해준다.
  // return new Promise((resolve, reject) => {
  //   axios.get(url)
  //     .then((res) => {
  //       if(res.data.Error){
  //         reject(res.data.Error)
  //       }
  //       resolve(res)
  //     })
  //     .catch((err) => {
  //       reject(err.message)
  //     })

  // })
}