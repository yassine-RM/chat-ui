<template>
<v-footer padless>
    <v-row>
        <v-col class="text-center pl-10" cols="10">
            <v-text-field @keyup.enter="sendMessage()" v-model="message.content" prepend-inner-icon="mdi-tooltip-text-outline" label="Type a message" hide-details outlined dense rounded></v-text-field>
            <v-file-input v-if="false" id="file" hidden @change="customFile"></v-file-input>
        </v-col>
        <v-col cols="2">
            <v-btn @click="openFile()" color="red" outlined class="mr-1" icon>
                <v-icon color="red">mdi-attachment</v-icon>
            </v-btn>
            <v-btn @click="sendMessage()" color="green" outlined class="mr-1" icon>
                <v-icon color="success">mdi-send</v-icon>
            </v-btn>
            <v-btn outlined icon class>
                <v-icon>mdi-microphone</v-icon>
            </v-btn>
        </v-col>
    </v-row>
</v-footer>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    data() {
        return {
            message: {
                content: "",
                read: 0,
                type: "text",
            },
        };
    },
    mounted() {},
    computed: {
        ...mapState(["userConnected", "userSelected"]),
    },
    methods: {
        customFile(event) {
            let type = "";
            if (event.type.substring(0, 5) === "image") type = "image";
            else if (event.type.substring(0, 5) === "video") type = "video";
            else if (event.type === "application/pdf") type = "pdf";
            var file = event;

            var reader = new FileReader();
            reader.onload = function (e) {
                let fileSrc = e.target.result;
                this.message = {
                    content: {
                        name: file.name,
                        src: fileSrc,
                    },
                    type: type,
                };
            }.bind(this);

            reader.readAsDataURL(file);
        },
        openFile: function () {
            document.getElementById("file").click();
        },
        sendMessage() {
            console.log("ref selected uer is : ", this.userSelected.ref)
            this.message.from = this.userConnected;
            this.message.to = this.userSelected;
            if (this.message.content.length > 0 || this.message.content.name.length > 0)
                this.$socket.client.emit("sendMessage", this.message);
            this.message.content = "";
        },
        onResult(data) {
            this.audio = window.URL.createObjectURL(data);
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
