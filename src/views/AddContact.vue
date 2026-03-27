<template>
  <div class="page">
    <h2>
      <i class="fas fa-plus"></i> Thêm liên hệ mới
    </h2>
    <ContactForm :contact="{ name: '', email: '', phone: '', address: '', favorite: false }" @submit:contact="handleSubmit" />
  </div>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue';
import ContactService from '@/services/contact.service.js';

export default {
  components: {
    ContactForm
  },
  methods: {
    async handleSubmit(contact) {
      try {
        await ContactService.create(contact);
        this.$router.push({ name: 'contactbook' });
      } catch (error) {
        console.error('Lỗi tạo liên hệ:', error);
        alert('Lỗi tạo liên hệ mới!');
      }
    }
  }
};
</script>

<style scoped>
.page {
  max-width: 500px;
}
</style>

