<template>
  <v-app class="master-layout">
    <side-bar />
    <nav-bar />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import sideBar from "./chat-app/Side-Bar";
import navBar from "./chat-app/Nav-Bar";
export default {
  components: {
    "nav-bar": navBar,
    "side-bar": sideBar,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    test() {},
  },
};
</script>
<style lang="scss" scoped>
.master-layout ::v-deep {
  .v-main {
    background: whitesmoke !important;
    margin: 0 -12px;
    width: 1367px;
    max-width: 1367px !important;
    .container--fluid{
        padding: 0;
    }
  }
  .ps {
    height: 420px;
  }
  .v-list-item.theme--light {
    padding: 0 8px !important;
  }

  .v-navigation-drawer__content {
    height: 100%;
    overflow: hidden;
  }
}
</style>