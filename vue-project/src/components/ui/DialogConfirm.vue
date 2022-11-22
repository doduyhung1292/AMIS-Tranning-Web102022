<template>
    <div class="dialog-notice">
        <div class="content-notice">
            <div class="content-main">
                <div class="icon__warning-delete"></div>
                <div class="content-warning">
                    <div>{{this.msgConfirmDelete}}</div>
                </div>
            </div>
            <div class="content-footer">
                <button v-on:click="$emit('closeDialogConfirm')" class="btn-cancel">Không</button>
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

    .content-footer {
        display: flex;
        justify-content: space-between;
    }
</style>