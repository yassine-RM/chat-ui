<template>
  <v-app-bar app flat>
    <v-row class="no-gutters pt-2" v-if="userSelected!=null">
      <v-col md="2">
        <v-avatar size="60">
          <v-img :src="'http://localhost:5000/images/'+userSelected.image"></v-img>
        </v-avatar>
      </v-col>
      <v-col md="10" class="pt-2">
        <span class="grey--text text-capitalize">{{userSelected.name}}</span>
        <br />
        <span class="green--text caption" v-if="false">
          Online
          <br />
        </span>
        <span class="green--text caption" v-else>Is typing ...</span>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-btn @click="exitApp()" outlined small icon class="mx-1">
      <v-icon small>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
export default {
  methods: {
    exitApp() {
      this.$store.commit("setUserConnected", null);
      this.$router.push({ name: "signIn" });
    },
  },
  computed: {
    ...mapState(['userSelected'])
  },
};
</script>

<style lang="scss" scoped>
</style>