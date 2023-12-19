<template>
  <!-- Login Form -->
  <div
    class="text-white text-center font-bold p-2 mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_message }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="onLogin">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-400 text-xs" name="email"></ErrorMessage>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-400 text-xs" name="password"></ErrorMessage>
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia';
import useUserStore from '@/stores/user';

export default {
  name: 'LoginForm',

  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:6|max:20',
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-red-400',
      login_alert_message: 'Successfully login.',
    };
  },

  methods: {
    ...mapActions(useUserStore, ['authenticate']),

    async onLogin(values) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = 'bg-blue-400';
      this.login_alert_message = 'Please wait...';

      try {
        await this.authenticate(values);
      } catch (e) {
        this.login_in_submission = false;
        this.login_alert_variant = 'bg-red-400';
        this.login_alert_message = e.message;
        return;
      }

      this.login_alert_variant = 'bg-green-500';
      this.login_alert_message = 'Successfully you are now logged in.';
      window.location.reload();
    },
  },
};
</script>
