<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink
          :to="nav.href"
          active-class="active"  
          :class="{ atcive: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
          <!-- active-class="active" 은 원래는 router 의 기본 속성인 클래스 이름이들어가 있다. router-link-active 이렇게
          들어가 있으면 부트스트랩의 속성이 적용이 안되므로 active 클래스 명을 변경을 해준다. -->
        </RouterLink>
      </div>
    </div>
    <!-- 링크 이동시 보통 RouterLink를 많이 사용하지만 밑에와 같이도 사용이 가능하다. 
        밑에와 같이 사용을 하면 링크를 이동하기전에 다른 모션을 줄 수 있다.
        그 모션은 메소드안에 추가를 해서 사용이 가능하다.-->
    <!-- <RouterLink
      to="/about"
      class="user">
      <img
        :src="image"
        :alt="name" />
    </RouterLink> -->
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image"
        :alt="name" />
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
          href: '/movie/tt4520988',
          path: /^\/movie/  // 'movie'
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  computed: {
    image() {
      return this.$store.state.about.image
    },
    name() {
      return this.$store.state.about.name
    }
  },
  methods: {
    isMatch(path) {
      if(!path) return false
      console.log(this.$route)
      return path.test(this.$route.fullPath) 
    },
    toAbout() {
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
    }
  }
  @include media-breakpoint-down(sm ) {
    .nav {
      display: none;
    }
  }
}
</style>