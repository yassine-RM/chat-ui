<template>
<div class="sign-in">
    <v-snackbar top color="red" v-model="error">
        Login or password incorrect !!!
        <template v-slot:action="{ attrs }">
            <v-btn color="white" icon v-bind="attrs" @click="error = false">X</v-btn>
        </template>
    </v-snackbar>
    <v-form v-model="valid" ref="form" lazy-validation class="mt-12">
        <v-text-field outlined dense label="E-mail" v-model="user.email" :rules="rules.email" required></v-text-field>
        <v-text-field outlined dense @click:append="showPassword=!showPassword" :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" :type="showPassword ? 'password' : 'text'" label="Password" v-model="user.password" :rules="rules.password" :counter="10" required></v-text-field>
        <v-btn outlined color="indigo" @click="login" :disabled="!valid">Sign In</v-btn>
        <v-btn outlined color="pink" class="ml-2" @click="clear">clear</v-btn>
        <router-link class="float-right" :to="{name:'signUp'}">sign up?</router-link>
    </v-form>
</div>
</template>

<script>
export default {
    data: () => ({
        error: false,
        valid: true,
        showPassword: true,
        user: {
            email: null,
            password: null,
        },
        rules: {
            email: [
                (v) => !!v || "E-mail is required",
                (v) =>
                !v ||
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "E-mail must be valid",
            ],
            password: [
                (v) => !!v || "Password is required",
                (v) =>
                (v && v.length >= 6) || "Password must be better than 6 characters",
            ],
        },
    }),
    mounted() {
        this.$store.commit("setUserSelected", null);
        this.$store.commit("setUserConnected", null);
        this.$socket.client.on("loginUser", (user) => {
            console.log("userConnected : ", user);
            this.setUsers(user);
            this.$router.push({
                name: "chat"
            });
        });
        this.$socket.client.on("loginError", () => {
            this.error = true;
        });
    },
    methods: {
        setUsers(user) {
            this.$store.commit("setUserConnected", user);
            this.$store.commit("setConversationUsers", null);
        },
        login() {
            if (this.$refs.form.validate()) {
                this.$socket.client.emit("loginUser", this.user);
            }
        },
        clear() {
            this.$refs.form.reset();
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
