<template>
  <v-app id="inspire">
    <v-app-bar app>
      <router-link style="text-decoration: none !important;" to="/">
        <v-toolbar-title>
          <h1 class="headline">ระบบร้านหนังสือ</h1>
        </v-toolbar-title>
      </router-link>
    </v-app-bar>
    <v-main class="main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "หน้าแรก", icon: "mdi-home", link: "/" },
      { title: "เพิ่มหนังสือ", icon: "mdi-note-plus", link: "/addbook" },
    ],
  }),
};
</script>

<style lang="scss">
.main {
  background: #fbe9e7;
}
.router-link {
  text-decoration: none !important;
}
</style>
