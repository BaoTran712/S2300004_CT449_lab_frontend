<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">
      Ứng dụng Quản lý danh bạ
    </a>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link
          :to="{ name: 'contactbook' }"
          class="nav-link"
        >
          Danh bạ
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
