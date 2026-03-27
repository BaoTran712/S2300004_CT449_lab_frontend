import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import AddContact from "@/views/AddContact.vue";
import EditContact from "@/views/EditContact.vue";

const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  {
    path: "/add",
    name: "contact.add",
    component: AddContact,
  },
  {
    path: "/edit/:id",
    name: "contact.edit",
    component: EditContact,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
