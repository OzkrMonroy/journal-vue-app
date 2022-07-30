<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">Nothing is selected</h1>
    <FabButton />
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
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>
