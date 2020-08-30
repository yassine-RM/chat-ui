<template>
<div class="side-bar">

    <v-navigation-drawer v-if="isMobile" v-model="show" absolute temporary width="370" app>
        <v-row class="no-gutters pa-2">
            <v-col md="3">

                <v-avatar size="60" @click="profile(userConnected)">
                    <img :src="'http://localhost:5000/images/'+userConnected.image" alt="user" />
                </v-avatar>
            </v-col>
            <v-col md="9" class="pt-5">
                <span class="grey--text text-capitalize">{{userConnected.name}}</span>
            </v-col>
        </v-row>
        <v-row class="px-2 pt-0">
            <v-col md="12 pt-0">
                <v-divider></v-divider>
                <v-text-field v-model="search" class="mt-3 search" prepend-inner-icon="mdi-account-search-outline" label="Search ..." outlined dense></v-text-field>
            </v-col>
        </v-row>
        <v-list subheader dense class="pl-2">
            <div class="overline mb-3 caption">Online Users</div>
            <perfect-scrollbar>
                <div v-if="false">
                    <v-skeleton-loader v-for="(item, index) in filterUsers" :key="index" ref="skeleton" :boilerplate="false" type="list-item-avatar" :tile="false" class="mx-auto"></v-skeleton-loader>
                </div>
                <template v-else v-for="(user,index) in filterUsers">
                    <v-divider v-if="user.email!=userConnected.email" :key="index"></v-divider>
                    <v-list-item v-if="user.email!=userConnected.email" :key="index" @click="setUser_setConv(user)">
                        <v-list-item-avatar>
                            <v-img :src="'http://localhost:5000/images/'+user.image"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title class="font-weight-light" v-text="user.name"></v-list-item-title>
                            <v-spacer></v-spacer>
                            <span class="caption msg-time">12:00</span>

                            <div class="caption msg-content-text" v-if="false">
                                <v-icon small>mdi-check-all</v-icon>
                                <span class="ml-1">{{String('hhhhnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn').length>=30 ? String('hhhhnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn').substr(0,30)+" ..." : String('hhhh')}}</span>
                            </div>
                            <div class="caption msg-content-img" v-if="false">
                                <v-icon small>mdi-check-all</v-icon>
                                <v-icon small>mdi-tooltip-image-outline</v-icon>
                                <span class="caption">Photo</span>
                            </div>
                            <div class="caption msg-content-video" v-if="true">
                                <v-icon small>mdi-check-all</v-icon>
                                <v-icon small>mdi-video-outline</v-icon>
                                <span class="caption">Video</span>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </perfect-scrollbar>
        </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer v-else width="370" flat app mobile-break-point="650">
        <v-row class="no-gutters pa-2">
            <v-col md="3">
                <v-avatar size="60" @click="profile(userConnected)">
                    <img :src="'http://localhost:5000/images/'+userConnected.image" alt="user" />
                </v-avatar>
            </v-col>
            <v-col md="9" class="pt-5">
                <span class="grey--text text-capitalize">{{userConnected.name}}</span>
            </v-col>
        </v-row>
        <v-row class="px-2 pt-0">
            <v-col md="12 pt-0">
                <v-divider></v-divider>
                <v-text-field v-model="search" class="mt-3 search" prepend-inner-icon="mdi-account-search-outline" label="Search ..." outlined dense></v-text-field>
            </v-col>
        </v-row>
        <v-list subheader dense class="pl-2">
            <div class="overline mb-3 caption">Online Users</div>
            <perfect-scrollbar>
                <div v-if="false">
                    <v-skeleton-loader v-for="(item, index) in filterUsers" :key="index" ref="skeleton" :boilerplate="false" type="list-item-avatar" :tile="false" class="mx-auto"></v-skeleton-loader>
                </div>
                <template v-else v-for="(user,index) in filterUsers">
                    <v-divider v-if="user.email!=userConnected.email" :key="index"></v-divider>
                    <v-list-item v-if="user.email!=userConnected.email" :key="index" @click="setUser_setConv(user)">
                        <v-list-item-avatar>
                            <v-img :src="'http://localhost:5000/images/'+user.image"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title class="font-weight-light" v-text="user.name"></v-list-item-title>
                            <v-spacer></v-spacer>
                            <span class="caption msg-time">12:00</span>

                            <div class="caption msg-content-text" v-if="false">
                                <v-icon small>mdi-check-all</v-icon>
                                <span class="ml-1">{{String('hhhhnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn').length>=30 ? String('hhhhnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn').substr(0,30)+" ..." : String('hhhh')}}</span>
                            </div>
                            <div class="caption msg-content-img" v-if="false">
                                <v-icon small>mdi-check-all</v-icon>
                                <v-icon small>mdi-tooltip-image-outline</v-icon>
                                <span class="caption">Photo</span>
                            </div>
                            <div class="caption msg-content-video" v-if="true">
                                <v-icon small>mdi-check-all</v-icon>
                                <v-icon small>mdi-video-outline</v-icon>
                                <span class="caption">Video</span>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </perfect-scrollbar>
        </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    data() {
        return {
            show: true,
            search: "",
            users: [],
        };
    },
    mounted() {
        this.$socket.client.emit("getUsers");
        this.$socket.client.on("getUsers", (users) => {
            this.users = users;
            console.log("users online :", users);
            if (this.userSelected != null) {
                this.users.filter((user) => {
                    if (user.email == this.userSelected.email) {
                        this.$store.commit("setUserSelected", user);
                    }
                });
            }
        });

    },
    methods: {
        profile(user) {
            console.log('get profile')
            this.$store.commit("setProfile", user);
            this.$router.push({
                name: "profile"
            })
        },
        setUser_setConv(user) {
            this.$store.commit("setLoadChat", true);
            this.$store.commit("setUserSelected", user);
            this.$store.commit("setConversationUsers", {
                user1: this.userConnected,
                user2: user,
            });
            this.$socket.client.emit("getConvesation", {
                user1: this.userConnected,
                user2: user,
            });
            this.$router.push({
                name: "chat"
            })
            console.log("between : ", {
                user1: this.userConnected.email,
                user2: user.email,
            });
        },
    },
    computed: {
        ...mapState(["userConnected", "userSelected"]),
        filterUsers() {
            return this.users.filter((user) => user.name.match(this.search));
        },
    },
};
</script>

<style lang="scss" scoped>
.side-bar ::v-deep {
    background: whitesmoke !important;

    .v-avatar {
        cursor: pointer;
    }

    .msg-time {
        float: right;
        position: absolute;
        right: 10px;
    }

    .search .v-text-field__details {
        display: none !important;
    }

    .ps {
        height: 500px !important;
    }
}
</style>
