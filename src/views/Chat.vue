<template>
<div class="chat">
    <div class="background" v-if="userSelected==null"></div>
    <perfect-scrollbar v-else class="px-5 py-2">
        <v-overlay v-if="loadChat" absolute :value="true">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-row v-for="(message, index) in messages" :key="index" :class="message.time==null ? 'no-gutters mt-2' :'no-gutters'">
            <v-col md="12">
                <v-card v-if="message.time!=null" dense class="mx-auto msg-date text-center pa-1" color="#9ff4f1" width="100">
                    <v-card-text class="px-0">
                        <span class="caption">{{ getDate(message.createdAt) }}</span>
                    </v-card-text>
                </v-card>
                <v-card dense class="float-left msg-sended" max-width="400" v-if="userConnected.email==message.to">
                    <v-card-text class="pa-2">
                        <div class="mt-1 pdf" v-if="message.type=='text'">
                            <span class="text-content">{{message.content}}</span>
                        </div>
                        <div class="mt-1 pdf" v-if="message.type=='pdf'">
                            <img src="../assets/images/pdf.png" width="30" alt="img" />
                            <span class="pdf-name">{{message.content}}</span>
                            <v-btn small class="ml-4 float-right" outlined icon>
                                <v-icon small>mdi-download</v-icon>
                            </v-btn>
                        </div>
                        <img v-if="message.type=='image'" :src="'http://localhost:5000/files/'+message.content" class="image img-chat" alt="img" />
                        <video v-if="message.type=='video'" :src="'http://localhost:5000/files/'+message.content" class="video vid-chat" controls></video>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <span class="caption mr-1 time">{{getTime(message.createdAt)}}</span>
                    </v-card-actions>
                </v-card>
                <v-card dense class="float-right msg-recived" color="#dcf8c6" max-width="400" v-else>
                    <v-card-text class="pa-2">
                        <div class="mt-1 pdf" v-if="message.type=='text'">
                            <span class="text-content">{{message.content}}</span>
                        </div>
                        <div class="mt-1 pdf" v-if="message.type=='pdf'">
                            <img src="../assets/images/pdf.png" width="30" alt="img" />
                            <span class="pdf-name">{{message.content}}</span>
                            <v-btn small class="ml-4 float-right" outlined icon>
                                <v-icon small>mdi-download</v-icon>
                            </v-btn>
                        </div>
                        <img v-if="message.type=='image'" :src="'http://localhost:5000/files/'+message.content" class="image img-chat" alt="img" />
                        <video v-if="message.type=='video'" :src="'http://localhost:5000/files/'+message.content" class="video vid-chat" controls></video>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <span class="caption mr-1 time">{{getTime(message.createdAt)}}</span>
                        <v-icon small :color="message.read==1 ? 'cyan' : '' ">mdi-check-all</v-icon>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </perfect-scrollbar>
    <footer-app v-if="userSelected!=null" />
</div>
</template>

<script>
import footer from "../components/chat-app/Footer";
import {
    mapState
} from "vuex";
import moment from "moment";

export default {
    components: {
        "footer-app": footer,
    },
    name: "chat",
    data() {
        return {
            messages: [],
        };
    },
    mounted() {
        this.$store.commit('setShowNav', true)
        this.$socket.client.emit("refreshRef", this.userConnected);
        this.$socket.client.on("refreshRef", (user) => {
            this.$store.commit('setUserConnected', user)
            console.log('new ref : ', user)
        });
        if (this.conversationUsers != null) {
            this.$store.commit("setConversationUsers", {
                user1: this.userConnected,
                user2: this.userSelected,
            });
            console.log("this.conversationUsers : ", this.conversationUsers);
            this.$socket.client.emit("getConvesation", this.conversationUsers);
        }
        this.$socket.client.on("getConvesation", (conversation) => {
            this.messages = conversation;
            this.$store.commit("setLoadChat", false);
            console.log('conversation btw : ', conversation)
        });
        this.$socket.client.on("sendMessage", (message) => {
            console.log('users updated : ', message.from, this.userSelected.email)
            if (message.from == this.userSelected.email) {
                this.updateReadConv(message.from, this.userConnected.email)
            } else
                this.$socket.client.emit("getConvesation", this.conversationUsers);
        });

        this.$socket.client.on("getConvesationUpdated", (users) => {
            let data = {
                user1: users.user1,
                user2: users.user2
            }
            this.$socket.client.emit("getConvesation", data);
        });
    },

    methods: {
        updateReadConv(user1Email, user2Email) {
            this.$socket.client.emit("updateReadConv", {
                user1_email: user1Email,
                user2_email: user2Email
            });
        },
        getDate(date) {
            return moment(date).format("ll");
        },
        getTime(date) {
            return moment(date).format("LT");
        },
    },
    computed: {
        ...mapState(["userConnected", "userSelected", "conversationUsers", "loadChat"]),
    },
};
</script>

<style lang="scss" scoped>
.chat ::v-deep {
    background-image: url(../assets/images/back_chat.png);
    background-repeat: repeat-x;
    background-size: contain;

    span.time {
        font-size: 9px !important;
    }

    .background {
        background-image: url(../assets/images/chatBody.jpg);
        background-repeat: no-repeat;
        background-size: 1000px 551px;
        background-position: center;
        height: 550px;
        width: 100%;
    }

    .pdf-name {
        top: -10px;
        position: relative;
    }

    .video.vid-chat,
    .image.img-chat {
        width: inherit !important;
    }

    .v-card .v-card__text {
        font-family: sans-serif;
        color: #3b3737;
    }

    .ps .v-card div {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }

    .ps {
        height: 485px !important;
    }

    .showRecivedMsg {
        .showRecivedMessage {
            font-size: 12px;
            background-color: white;
            max-width: 525px;
            min-height: 40px;
            min-width: 70px;
            border-radius: 0 8px 8px 8px;
            padding: 5px 5px;
            float: left;
        }

        .showRecivedMessageIcon {
            left: 12px;
            top: 8px;
            position: absolute;
            width: 12px;
            height: 12px;
            border: 0 solid transparent;
            border-left-width: 14px;
            border-right-width: 0px;
            border-top: 16px solid white;
            position: absolute;
        }
    }

    .showSendedMsg {
        .showSendedMessageIcon {
            right: 12px;
            top: 8px;
            position: absolute;
            width: 12px;
            height: 12px;
            border: 0 solid transparent;
            border-left-width: 0px;
            border-right-width: 14px;
            border-top: 16px solid #dcf8c6;
            position: absolute;
        }

        .showSendedMessage {
            border: 0px solid;
            font-size: 12px;
            float: right;
            background-color: #dcf8c6;
            max-width: 525px;
            min-height: 40px;
            min-width: 70px;
            border-radius: 8px 0 8px 8px;
            padding: 5px 5px;
        }
    }
}
</style>
