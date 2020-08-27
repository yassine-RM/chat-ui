<template>
  <v-app class="auth-layout">
    <v-row justify="center">
      <v-col md="5">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.auth-layout {
}
</style>