<template>
<div class="profile">
    <v-card :loading="loading" class="mx-auto my-12" max-width="700">
        <v-img height="250" :src="'http://localhost:5000/images/'+userProfile.image"></v-img>

        <v-card-title>Username : {{userProfile.name}}</v-card-title>

        <v-card-text>
            <div class="my-4 subtitle-1">
                Email : {{userProfile.email}}
            </div>

            <div>Created At : {{userProfile.createdAt}}</div>
            <div>Updated At : {{userProfile.updatedAt}}</div>
        </v-card-text>
    </v-card>
</div>
</template>

<script>
import {
    mapState
} from 'vuex';
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.$store.commit('setShowNav', false)
    },
    computed: {
        ...mapState(['userProfile'])
    },
};
</script>

<style lang="scss" scoped>
</style>
