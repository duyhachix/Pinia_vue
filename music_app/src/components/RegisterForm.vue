<template>
  <!-- Registration Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_message }}
  </div>
  <vee-form
    :validation-schema="registerSchema"
    @submit="onRegister"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-400 text-xs" name="name"></ErrorMessage>
    </div>
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
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-400 text-xs" name="age"></ErrorMessage>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-400 text-xs" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
      <ErrorMessage class="text-red-400 text-xs" name="password"></ErrorMessage>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirmPassword"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-400 text-xs" name="confirmPassword" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="France">France</option>
        <option value="HongKong">HongKong</option>
        <option value="Singapore">Singapore</option>
      </vee-field>
      <ErrorMessage class="text-red-400 text-xs" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <i18n-t class="inline-block" keypath="register.accept" tag="label"> 
        <a href="#"> {{ $t('register.tos') }}</a>
      </i18n-t>
      <ErrorMessage class="text-red-400 text-xs block" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia';
import useUserStore from '@/stores/user';

export default {
  name: 'RegisterForm',

  data() {
    return {
      registerSchema: {
        name: 'required|min:6|max:20|alpha_spaces',
        email: 'required|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:6|max:20|excluded:password',
        confirmPassword: 'password_mismatch:@password',
        country: 'required|country_excluded:HongKong,Singapore',
        tos: 'tos',
      },
      // vee-validate have the initial values to set the init value for field in form
      userData: {
        country: 'USA',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-red-400',
      reg_alert_message: 'Please wait, your account is being created.',
    };
  },

  computed: {},

  methods: {
    ...mapActions(useUserStore, {
      createUser: 'register',
    }),

    async onRegister(values) {
      // values exist only when all field validated
      console.log(values);
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = 'bg-indigo-400';
      this.reg_alert_message = 'Please wait, your account is being created.';

      try {
        await this.createUser(values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-400';
        this.reg_alert_message = error.message;
        return;
      }
      // insert additional information into db

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_message = 'Success, your account has been created.';
      window.location.reload();
    },
  },
};
</script>
