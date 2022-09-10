<template>
  <span class="login100-form-title p-b-41"> Register </span>
  <form
    class="login100-form validate-form p-b-33 p-t-5"
    @submit.prevent="onSubmit"
  >
    <div class="wrap-input100 validate-input" data-validate="Enter name">
      <input
        v-model="useForm.name"
        class="input100"
        type="text"
        placeholder="Name"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter email">
      <input
        v-model="useForm.email"
        class="input100"
        type="email"
        placeholder="Email"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe818;"></span>
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
      <button class="login100-form-btn" type="submit">Register</button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'login' }"
        >Already have an account?</router-link
      >
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useAuth } from "@/modules/auth/composables";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { createUser } = useAuth();
    const router = useRouter();

    const useForm = ref({
      name: "",
      email: "",
      password: "",
    });

    return {
      useForm,
      onSubmit: async () => {
        const { ok, message } = await createUser(useForm.value);
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
