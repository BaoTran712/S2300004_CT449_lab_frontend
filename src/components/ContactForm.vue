<template>
  <Form :validation-schema="schema" :initial-values="initialValues" @submit="onSubmit">
    <div class="form-group">
      <label for="name">Tên</label>
      <Field name="name" v-model="contactLocal.name" type="text" class="form-control" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="email">E-mail</label>
      <Field name="email" v-model="contactLocal.email" type="email" class="form-control" />
      <ErrorMessage name="email" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field name="address" v-model="contactLocal.address" type="text" class="form-control" />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="phone">Điện thoại</label>
      <Field name="phone" v-model="contactLocal.phone" type="tel" class="form-control" />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>
    <div class="form-group form-check">
      <Field name="favorite" v-model="contactLocal.favorite" type="checkbox" class="form-check-input" />
      <label class="form-check-label">
        <strong>Liên hệ yêu thích</strong>
      </label>
      <ErrorMessage name="favorite" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary btn-block" type="submit">Lưu</button>
      <button v-if="contactLocal.id" type="button" class="mr-2 btn btn-danger" @click="deleteContact">
        Xóa
      </button>
      <button type="button" class="btn btn-secondary" @click="cancel">Thoát</button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: 'ContactForm',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact", "delete:contact"],
  props: {
    contact: {
      type: Object,
      required: true,
      default: () => ({ name: '', email: '', phone: '', address: '', favorite: false, id: null })
    }
  },
  data() {
    const contactLocal = { ...this.contact };
    const schema = yup.object().shape({
      name: yup.string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên tối đa 50 ký tự."),
      email: yup.string()
        .required("E-mail bắt buộc.")
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      address: yup.string()
        .max(100, "Địa chỉ tối đa 100 ký tự."),
      phone: yup.string()
        .matches(/^((09|03|07|08|05)[0-9]{8})$/, "Số điện thoại không hợp lệ (09xxx xxx xxx)."),
      favorite: yup.boolean(),
    });
    return {
      schema,
      contactLocal,
      initialValues: contactLocal,
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit:contact", this.contactLocal);
    },
    deleteContact() {
      this.$emit("delete:contact", this.contactLocal.id);
    },
    cancel() {
      const reply = window.confirm('Bạn có thay đổi chưa lưu! Bạn có muốn rời khỏi?');
      if (reply) {
        this.$router.push({ name: "contactbook" });
      }
    }
  },
};
</script>

<style scoped>
.error-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
.form-group {
  margin-bottom: 1rem;
}
</style>

