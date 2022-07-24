<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
  <button @click="goToDayBook" class="btn btn-primary">Primary</button>
  <button @click="goToDayBook" class="btn btn-secondary">Secondary</button>
  <button @click="goToDayBook" class="btn btn-success">Success</button>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  methods: {
    goToDayBook() {
      this.$router.push({ name: "daybook" });
    },
  },
};
</script>
