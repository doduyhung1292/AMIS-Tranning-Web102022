<template>
    <div class="dialog-notice">
        <div class="content-notice">
            <div class="content-header">
                <div>Xác thực dữ liệu</div>
                <div class="icon-close"  v-on:click="$emit('closeDialogNotice')"></div>
            </div>
            <div class="content-main">
                <div class="content-warning">
                    <div  v-for="err in this.errMsg">{{err}}</div>
                </div>
            </div>
            <div class="content-footer">
                <button class="close-dialog" v-on:click="$emit('closeDialogNotice')">Đóng</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DialogNotice",
        props: ["errMsg"],
    }
</script>

<style scoped>
    @import url(../../css/ui/DialogEmployees.css);

    button {
        min-width: 80px;
    }
</style>