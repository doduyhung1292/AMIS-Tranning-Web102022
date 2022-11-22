<template>
    <div class="notice-success">
        <div class="icon-success"></div>
        <div class="content">{{this.contentToastSuccess}}</div>
        <div class="icon-close close-notice"></div>
    </div>
</template>

<script>
    export default {
        name: "ToastNotice",
        props: ["contentToastSuccess"]
    }
</script>

<style>
    @import url(../../css/ui/MISAToast.css);
</style>

