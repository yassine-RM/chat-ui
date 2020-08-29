<template>
<v-app-bar app flat class="nav-bar">
    <v-row class="no-gutters pt-2" v-if="userSelected!=null && showNav">
        <v-col md="2">
            <v-avatar size="60" @click="profile(userSelected)">
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
import {
    mapState
} from 'vuex';
export default {
    methods: {
        profile(user) {
            console.log('get profile')
            this.$store.commit("setProfile", user);
            this.$router.push({
                name: "profile"
            })
        },
        exitApp() {
            this.$store.commit("setUserConnected", null);
            this.$store.commit("setUserSelected", null);
            this.$router.push({
                name: "signIn"
            });
        },
    },
    computed: {
        ...mapState(['userSelected', 'showNav'])
    },
};
</script>

<style lang="scss" scoped>
.nav-bar ::v-deep {
    .v-avatar {
        cursor: pointer;
    }
}
</style>
