<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ year }}</span>
      </div>
      <div>
        <button
          class="btn btn-danger mx-2"
          @click="onDeleteEntry"
          v-if="entry.id"
        >
          Delete
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary">
          Upload photo
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea
        placeholder="what happened today?"
        v-model="entry.text"
      ></textarea>
    </div>
    <img
      src="https://estaticos.muyinteresante.es/uploads/images/gallery/5e723bc25cafe8a3f89605a5/flores_0.jpg"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </template>
  <FabButton icon="fa-save" @on:click="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { getFormattedDate } from "../helpers/getFormattedDate";
import Swal from "sweetalert2";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    FabButton: defineAsyncComponent(() =>
      import("../components/FabButton.vue")
    ),
  },
  methods: {
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
    getEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },
    async saveEntry() {
      new Swal({
        title: "Wait please...",
        allowOutsideClick: false,
      });
      Swal.showLoading();
      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const id = await this.createEntry(this.entry);
        this.$router.push({ name: "entry", params: { id } });
      }
      Swal.fire("Saved!", "The entry has been saved", "success");
    },
    async onDeleteEntry() {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone",
        showDenyButton: true,
        confirmButtonText: "Yes, I'm sure",
        reverseButtons: true,
      });
      if (isConfirmed) {
        new Swal({
          title: "Wait please...",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        try {
          await this.deleteEntry(this.entry.id);
          this.$router.push({ name: "no-entry" });
          Swal.fire("Deleted", "", "success");
        } catch (error) {
          console.log({ error }, "An error occured while deleting...");
        }
      }
    },
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      return getFormattedDate(this.entry.date).day;
    },
    month() {
      return getFormattedDate(this.entry.date).month;
    },
    year() {
      return getFormattedDate(this.entry.date).year;
    },
  },
  data() {
    return {
      entry: null,
    };
  },
  created() {
    this.getEntry();
  },
  watch: {
    id() {
      this.getEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;
  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
