<template>
  <div v-if="contact" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <ContactForm :contact="contact" @submit:contact="updateContact" @delete:contact="deleteContact" />
    <p v-if="message" :class="['alert', message.includes('thành công') ? 'alert-success' : 'alert-danger']">{{ message }}</p>
  </div>
  <div v-else class="alert alert-warning">Đang tải liên hệ...</div>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue';
import ContactService from '@/services/contact.service.js';

export default {
  components: {
    ContactForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      contact: null,
      message: "",
      loading: true,
    };
  },
  methods: {
    async getContact(id) {
      try {
        this.contact = await ContactService.get(id);
      } catch (error) {
        console.error(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1)
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      } finally {
        this.loading = false;
      }
    },
    async updateContact(data) {
      try {
        await ContactService.update(data.id, data);
        this.message = 'Liên hệ được cập nhật thành công.';
        setTimeout(() => this.$router.push({ name: "contactbook" }), 2000);
      } catch (error) {
        console.error(error);
        this.message = 'Lỗi cập nhật liên hệ.';
      }
    },
    async deleteContact(id) {
      if (confirm("Bạn muốn xóa Liên hệ này?")) {
        try {
          await ContactService.delete(id);
          this.$router.push({ name: "contactbook" });
        } catch (error) {
          console.error(error);
          this.message = 'Lỗi xóa liên hệ.';
        }
      }
    },
  },
  created() {
    this.getContact(this.id);
    this.message = "";
  },
};
</script>

<style scoped>
.page {
  max-width: 500px;
}
.alert {
  margin-top: 1rem;
}
</style>

