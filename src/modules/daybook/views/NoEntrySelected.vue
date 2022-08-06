<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">Nothing is selected</h1>
    <FabButton @on:click="createNewEntry" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "NoEntrySelected",
  components: {
    FabButton: defineAsyncComponent(() =>
      import("../components/FabButton.vue")
    ),
  },
  methods: {
    createNewEntry() {
      this.$router.push({ name: "entry", params: { id: "new" } });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>
