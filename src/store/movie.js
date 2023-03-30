export default {
  //movie.js 가 하나의 store 에서  module 화 되서 사용이 될 수 있다 라고 명사적으로 나타내는 옵션이다.
  namespaced: true,  

  //취급해야하는 각각의 데이터를 의미한다.
  state: () => ({
    movies: []
  }),       

  //computed 처럼 계산된 상태를 만들어 내는 옵션이다.
  getters: {
    movieIds(state) {
      return state.movies.map(m =>m.imdbID)
    }
  },    

  //method와 유사한 옵션이다.
  //변이 
  //관리하는 데이터를 변경시켜줄 수 있다.
  //주의점은 데이터는 mutations 에서만 변경이 가능하고 다른 곳 에서는 변경을 못하게 막아 놓는다.
  //불편할 수 있지만 데이터 관리의 복잡성을 줄여줄 수 있다.
  mutations:  {
    resetMovies(){

    }
  },  

  //method와 유사한 옵션이다.
  //비동기로 동작을 한다.
  actions: {
    searchMovies() {

    }
  }    
}