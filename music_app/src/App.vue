<template>
  <PageHeader></PageHeader>

  <router-view></router-view>
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
