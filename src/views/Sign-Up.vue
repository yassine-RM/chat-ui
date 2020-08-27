<template>
<div class="sign-up">
    <v-snackbar top color="red" v-model="error.state">
        {{ error.message }}
        <template v-slot:action="{ attrs }">
            <v-btn color="white" icon v-bind="attrs" @click="error = false">X</v-btn>
        </template>
    </v-snackbar>
    <v-form v-model="valid" ref="form" lazy-validation class="mt-12">
        <v-text-field outlined dense label="Name" v-model="user.name" :rules="rules.name" required></v-text-field>
        <v-text-field outlined dense label="E-mail" v-model="user.email" :rules="rules.email" required></v-text-field>
        <v-file-input accept="image/*" outlined dense label="Image" @change="customImage" required></v-file-input>
        <v-text-field outlined dense @click:append="showPassword=!showPassword" :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" :type="showPassword ? 'password' : 'text'" label="Password" v-model="user.password" :rules="rules.password" :counter="10" required></v-text-field>
        <v-btn outlined color="indigo" @click="register" :disabled="!valid">Sign Un</v-btn>
        <v-btn outlined color="pink" class="ml-2" @click="clear">clear</v-btn>
    </v-form>
</div>
</template>

<script>
export default {
    data: () => ({
        error: {
            state: false,
            message: null
        },
        valid: true,
        showPassword: true,
        user: {
            name: null,
            email: null,
            image: {},
            password: null,
        },
        rules: {
            name: [
                (v) => !!v || "Name is required",
                (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
                (v) => (v && v.length > 2) || "Name must be better than 2 characters",
            ],
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
        this.$socket.client.on("registerUser", (user) => {
            console.log(user);
            this.$router.push({
                name: "signIn"
            });
        });
        this.$socket.client.on("registerErrorEmail", () => {
            this.error = {
                state: true,
                message: 'The email has been exist !!!'
            }
        });
        this.$socket.client.on("registerError", () => {
            this.error = {
                state: true,
                message: 'Error durring register,Please try again !!!'
            }
        });
    },

    methods: {
        register() {
            if (this.$refs.form.validate()) {
                this.$socket.client.emit("registerUser", this.user);
            }
        },
        customImage(event) {
            var file = event;
            this.user.image.name = file.name;

            var reader = new FileReader();
            reader.onload = function (e) {
                let imageSrc = e.target.result;
                this.user.image.src = imageSrc;
                console.log("user : ", this.user);
            }.bind(this);

            reader.readAsDataURL(file);
        },
        clear() {
            this.$refs.form.reset();
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
