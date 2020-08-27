<template>
  <div class="not-found">
    <h6 class="text-center">
      <router-link :to="{name:'chat'}">Go To Home Page</router-link>
    </h6>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.not-found {
  background-image: url("../assets/images/404.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 300px;
}
</style>