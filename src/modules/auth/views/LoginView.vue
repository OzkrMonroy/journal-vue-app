<template>
  <span class="login100-form-title p-b-41"> Login </span>
  <form
    class="login100-form validate-form p-b-33 p-t-5"
    @submit.prevent="onSubmit"
  >
    <div class="wrap-input100 validate-input" data-validate="Enter email">
      <input
        v-model="useForm.email"
        class="input100"
        type="text"
        placeholder="Email"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        v-model="useForm.password"
        class="input100"
        type="password"
        placeholder="Password"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button class="login100-form-btn" type="submit">Login</button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'register' }"
        >Don't have an account yet?</router-link
      >
    </div>
  </form>
</template>

<script>
import Swal from "sweetalert2";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables";

export default {
  setup() {
    const { loginUser } = useAuth();
    const router = useRouter();

    const useForm = ref({
      email: "",
      password: "",
    });

    return {
      useForm,
      onSubmit: async () => {
        const { ok, message } = await loginUser(useForm.value);
        if (!ok) {
          Swal.fire("Error", message, "error");
          return;
        }
        router.push({ name: "no-entry" });
      },
    };
  },
};
</script>

<style></style>
