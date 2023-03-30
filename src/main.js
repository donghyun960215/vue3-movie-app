import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'  //특정한 폴더의 index 파일을 가져올 때에는 파일명 생략이 가능하다.
import store from './store'


createApp(App)
  .use(router)
  .use(store)
  .mount('#app')