<template>
  <div id="notFound">
    <img src="../../public/assets/img/404.png" alt="notfound_img" />
    <div class="back">
      <button class="p-1 rounded-lg bg-sky-600 min-h-fit">
        <router-link class="text-white" :to="{ name: 'home' }">Back to home</router-link>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'not-found',
};
</script>

<style scoped>
#notFound {
  width: 100%;
  height: 100%;
  display: grid;
  align-content: space-between;
  grid-auto-rows: 90% 5%;
}
#notFound img {
  justify-self: center;
  align-self: center;
  height: 100%;
}
#notFound .back {
  height: 100%;
  justify-self: center;
  align-self: center;
}
</style>
