<template>
    <div class="notice-success">
        <div class="icon-success"></div>
        <div class="content">
            <div class="content-title">Thành công! </div>
            <div class="content-body-text">{{this.contentToastSuccess}}</div>
        </div>
        <div class="icon-close close-notice" v-on:click="this.closeToast"></div>
    </div>
</template>

<script>
    export default {
        name: "ToastNotice",
        props: ["contentToastSuccess"],
        methods: {
            /**
             * Close toast
             * Author: doduyhung1292 (25/11/2022)
             */
             closeToast: function() {
                try {
                    this.$emit('closeToast');
                } catch (error) {
                    console.log(error)
                }
            }
        },
    }
</script>

<style>
    @import url(../../../css/ui/toast/ToastNotice.css);
</style>

