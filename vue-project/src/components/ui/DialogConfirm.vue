<template>
    <div class="dialog-notice">
        <div class="content-notice">
            <div class="content-main">
                <div class="icon-warning"></div>
                <div class="content-warning">
                    <div>Có chắc chắn xóa?</div>
                </div>
            </div>
            <div class="content-footer">
                <button v-on:click="$emit('callApiDelete')">Xóa</button>
                <button class="close-dialog" v-on:click="$emit('closeDialogConfirm')">Đóng</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DialogConfirm",
    }
</script>

<style scoped>
    @import url(../../css/ui/DialogEmployees.css);
</style>