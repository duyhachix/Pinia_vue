<template>
  <div class="ml-auto">
    <el-select v-model="value" placeholder="Select">
      <el-option
        v-for="language in languages"
        :key="language.value"
        :label="language.label"
        :value="language.value"
        @click="changeLocale(language)"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'multi-language',

  data() {
    return {
      value: 'English',
      languages: [
        {
          value: 'en',
          label: 'English',
        },
        {
          value: 'vn',
          label: 'VietNamese',
        },
      ],
    };
  },
  computed: {},

  methods: {
    changeLocale(language) {
      this.$i18n.locale = language.value;
      this.value = language.label;
    },
  },
};
</script>

<style></style>
