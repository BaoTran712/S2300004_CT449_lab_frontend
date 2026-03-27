<template>
  <div class="page">
    <h2>
      <i class="fas fa-edit"></i> Sửa liên hệ
    </h2>

    <form @submit.prevent="updateContact">
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
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          <i class="fas fa-save"></i> Cập nhật
        </button>
        <router-link :to="{ name: 'contactbook' }" class="btn btn-secondary ml-2">
          <i class="fas fa-arrow-left"></i> Quay lại
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
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
  async mounted() {
    try {
      const contactId = this.$route.params.id;
      this.contact = await ContactService.get(contactId);
    } catch (error) {
      console.error("Lỗi tải liên hệ:", error);
      alert("Không tìm thấy liên hệ!");
      this.$router.push({ name: 'contactbook' });
    }
  },
  methods: {
    async updateContact() {
      this.submitting = true;
      try {
        const contactId = this.$route.params.id;
        await ContactService.update(contactId, this.contact);
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.error("Lỗi cập nhật:", error);
        alert("Lỗi cập nhật liên hệ!");
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

