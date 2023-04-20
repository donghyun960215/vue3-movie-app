import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'  // 중복제거

const _defaultMessage = 'Search for the movie title!'

export default {
  namespaced: true,  
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),       
  getters: {
  },    
  mutations:  {
    updateState(state, payload) {
      //['movies', 'message', 'loading'] key를 사용하면 각각의 키의 이름들이 문자데이터로 이루어져 있는 하나의 배열로 된다.
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state){
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },  
  actions: {
    async searchMovies({state, commit}, payload) {
      if(state.loading) return
      
      commit('updateState', {
        message: '',
        loading: true
      })

      try{
        const res =  await _fetchMovie({
          ...payload,
          page: 1
        })
        const {Search, totalResults} = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
  
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)
        //추가요청 
        if(pageLength > 1){
          for(let page = 2; page <= pageLength; page +=1){
            if(page > (payload.number / 10)) break
            const res =  await _fetchMovie({
              ...payload,
              page
            })
            const {Search} = res.data
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      }catch ({message}) {            //네트워크로 넘어오는 오기떄문에 거기에 포함된 error message는 하나의 error객체로 반환이 된다.
        commit('updateState',{        //그래서 실제 error의 객체의 message를 사용을 하기 위해서는 error.message를 사용해여한다.
          movies: [],                 // 하지만 객체 구조분해를 사용하여 바로 message를 가져온 후 사용을 해도된다. 속성 이름과 데이터의 이름이 같은 경우에는 합쳐도 된다.
          message
        })
      }finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMoviesWithId({state, commit}, payload) {
      if(state.loading) return

      commit('updateState', {
        theMovie: {},
        loading: true
      })

      try {
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState',{
          theMovie: res.data
        })
      }catch(error) {
        commit('updateState',{
          theMovie: {}
        })
      }finally{
        commit('updateState',{
          loading: false
        })
      }
    }
  }    
}

async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)

  // 기존에 있던 로직이며 위의 로직은  netlify를 사용하기 위한 로직이다.
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

/*

  movie.js 가 하나의 store 에서  module 화 되서 사용이 될 수 있다 라고 명사적으로 나타내는 옵션이다.
  namespaced: true, 
  
  취급해야하는 각각의 데이터를 의미한다.
  state: () => ({
    movies: []
  }),       

  computed 처럼 계산된 상태를 만들어 내는 옵션이다.
  getters: {
    movieIds(state) {
      return state.movies.map(m =>m.imdbID)
    }
  },    

  method와 유사한 옵션이다.
  변이 
  관리하는 데이터를 변경시켜줄 수 있다.
  주의점은 데이터는 mutations 에서만 변경이 가능하고 다른 곳 에서는 변경을 못하게 막아 놓는다.
  불편할 수 있지만 데이터 관리의 복잡성을 줄여줄 수 있다.
  mutations:  {
    resetMovies(state){
      state.movies = []
    }
  },  

  method와 유사한 옵션이다.
  비동기로 동작을 한다.
  actions: {
    async searchMovies(context, payload) {
      const {title, type, number, year} = payload
      const OMDB_API_KEY = '7035c60c'

      const res =  await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const {Search, totalResults} = res.data
    }
  } 


*/