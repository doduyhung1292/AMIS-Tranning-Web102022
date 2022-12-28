<template>
    <div class="dialog-notice">
        <div class="content-notice">
            <div class="content-header">
                <div>{{this.dialogNotice.titleDialog}}</div>
                <div class="icon-close"  v-on:click="$emit('closeDialogNotice')" :title="this.dialogNotice.titleButtonCloseDialog"></div>
            </div>
            <div class="content-main">
                <div class="content-warning">
                    <div  v-for="err in this.errMsg">- {{err}}.</div>
                </div>
            </div>
            <div class="content-footer">
                <button class="close-dialog" v-on:click="$emit('closeDialogNotice')" :title="this.dialogNotice.titleButtonCloseDialog">{{this.dialogNotice.buttonCloseDialog}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {DialogNotice} from '../../../resource.js';

    export default {
        name: "DialogNotice",
        props: ["errMsg"],
        data() {
            return {
                dialogNotice: DialogNotice
            }
        },
    }
</script>

<style scoped>
    @import url(../../../css/ui/dialog/DialogNotice.css);

    button {
        min-width: 80px;
    }
</style>