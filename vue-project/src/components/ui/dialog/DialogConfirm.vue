<template>
    <div class="dialog-notice">
        <div class="content-notice">
            <div class="content-header">
                <div>{{this.dialogConfirm.titleDialog}}</div>
                <div class="icon-close" 
                    v-on:click="$emit('closeDialogConfirm')"
                    :title="this.dialogConfirm.titleButtonCloseDialog"></div>
            </div>
            <div class="content-main">
                <div class="content-warning">
                    <div>{{this.msgConfirmDelete}}</div>
                </div>
            </div>
            <div class="content-footer">
                <button v-on:click="$emit('closeDialogConfirm')" 
                        class="btn-cancel"
                        :title="this.dialogConfirm.titleButtonCancel">{{this.dialogConfirm.buttonCancel}}</button>
                <button class="close-dialog"  
                    v-on:click="$emit('callApiDelete')" 
                    :title="this.dialogConfirm.titleButtonDelete">{{this.dialogConfirm.buttonDelete}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {DialogConfirm} from '../../../resource.js';
    export default {
        name: "DialogConfirm",
        props: ["msgConfirmDelete"],
        data() {
            return {
                dialogConfirm: DialogConfirm
            }
        },
    }
</script>

<style scoped>
    @import url(../../../css/ui/dialog/DialogConfirm.css);

    .close-dialog {
        margin-left: 8px;
        background-color: #E81E1E;
        width: auto;
        padding: 0 16px;
    }
    .close-dialog:hover, .close-dialog:focus {
        background-color: #EB3333!important;
    }

    button {
        min-width: 80px;
    }
</style>