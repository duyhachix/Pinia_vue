<template>
  <PageHeader></PageHeader>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <div :key="route.name">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
  <player></player>
  <Auth></Auth>
</template>

<script>
// import components
import PageHeader from '@/components/PageHeader.vue';
import Auth from '@/components/Auth.vue';
import Player from '@/components/Player.vue';

import { mapWritableState } from 'pinia';
import useUserStore from '@/stores/user';

import { auth } from './includes/firebase';

export default {
  name: 'App',
  components: {
    PageHeader,
    Auth,
    Player,
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },

  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
