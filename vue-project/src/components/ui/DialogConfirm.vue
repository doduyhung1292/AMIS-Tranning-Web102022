<template>
    <div class="dialog-notice">
        <div class="content-notice">
            <div class="content-header">
                <div>Xóa nhân viên</div>
                <div class="icon-close" v-on:click="$emit('closeDialogConfirm')"></div>
            </div>
            <div class="content-main">
                <div class="content-warning">
                    <div>{{this.msgConfirmDelete}}</div>
                </div>
            </div>
            <div class="content-footer">
                <button v-on:click="$emit('closeDialogConfirm')" class="btn-cancel">Hủy bỏ</button>
                <button class="close-dialog"  v-on:click="$emit('callApiDelete')" >Xóa</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DialogConfirm",
        props: ["msgConfirmDelete"]
    }
</script>

<style scoped>
    @import url(../../css/ui/DialogEmployees.css);

    .close-dialog {
        margin-left: 8px;
        background-color: #E81E1E;
        width: auto;
        padding: 0 16px;
    }
    .close-dialog:hover {
        background-color: #EB3333;
    }

    button {
        min-width: 80px;
    }
</style>