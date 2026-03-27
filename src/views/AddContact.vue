<template>
  <div class="page">
    <h2>
      <i class="fas fa-plus"></i> Thêm liên hệ mới
    </h2>

    <form @submit.prevent="saveContact">
      <div class="form-group mb-3">
        <label>Tên:</label>
        <input v-model="contact.name" type="text" class="form-control" required />
      </div>

      <div class="form-group mb-3">
        <label>Email:</label>
        <input v-model="contact.email" type="email" class="form-control" required />
      </div>

      <div class="form-group mb-3">
        <label>Điện thoại:</label>
        <input v-model="contact.phone" type="tel" class="form-control" />
      </div>

      <div class="form-group mb-3">
        <label>Địa chỉ:</label>
        <textarea v-model="contact.address" class="form-control"></textarea>
      </div>

      <div class="form-group mb-3">
        <label>
          <input type="checkbox" v-model="contact.favorite" /> Yêu thích
        </label>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-success" :disabled="submitting">
          <i class="fas fa-save"></i> Lưu
        </button>
        <router-link to="/" class="btn btn-secondary ml-2">
          <i class="fas fa-arrow-left"></i> Hủy
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ContactService from "@/services/contact.service";

export default {
  data() {
    return {
      contact: {
        name: "",
        email: "",
        phone: "",
        address: "",
        favorite: false,
      },
      submitting: false,
    };
  },
  methods: {
    async saveContact() {
      this.submitting = true;
      try {
        await ContactService.create(this.contact);
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.error("Lỗi tạo liên hệ:", error);
        alert("Lỗi tạo liên hệ mới!");
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 500px;
}
</style>

