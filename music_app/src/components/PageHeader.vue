<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        :to="{ name: 'home' }"
        class="text-white font-bold uppercase text-2xl mr-4"
        exact-active-class="no-active"
        >Music</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <router-link :to="{ name: 'about' }" class="px-2 text-white"
              >About</router-link
            >
          </li>
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn">
            <a
              class="px-2 text-white"
              href="#"
              @click.prevent="onToggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link :to="{ name: 'manage' }" class="px-2 text-white"
                >Manage</router-link
              >
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="onLogout"
                >Log out</a
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from 'pinia';
import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';

export default {
  name: 'PageHeader',

  computed: {
    ...mapStores(useModalStore, useUserStore),
  },
  methods: {
    onToggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },
    onLogout() {
      this.userStore.signOut();
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>
