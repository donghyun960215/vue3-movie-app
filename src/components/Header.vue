<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav-item"
        class="nav-item">
        <RouterLink
          :to="nav.href"
          active-class="active"  
          class="nav-link">
          {{ nav.name }}
          <!-- active-class="active" 은 원래는 router 의 기본 속성인 클래스 이름이들어가 있다. router-link-active 이렇게
          들어가 있으면 부트스트랩의 속성이 적용이 안되므로 active 클래스 명을 변경을 해준다. -->
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie'
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  .logo {
    margin-right: 40px;
  }
}
</style>