<template>
    <div class="header">
        <div class="header-left">
            <div class="header-left__iconmenu" tittle="Menu"></div>
            <div class="header-left__brandname" 
                :title="this.theHeaderContent.companyName">
                {{this.theHeaderContent.companyName}}</div>
            <div class="header-left__icondropdown"></div>
        </div>
        <div class="header-right">
            <div class="header-right__iconnotice"></div>
            <div class="header-right__avatar"></div>
            <div class="header-right__username">{{this.theHeaderContent.userName}}</div>
            <div class="header-left__icondropdown"></div>
        </div>
    </div>
</template>

<script>
    import {TheHeaderContent} from './../../resource.js';
    
    export default {
        name: "TheHeader",
        methods: {
//Region UI
            /**
             * Bắt sự kiện ô input search in focus
             * Author: doduyhung1292 (13/11/2022)
             */
             inputSearchFocus: function() {
                try {
                    this.isSearchButtonFocus = "borderFocus";
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Bắt sự kiện ô input search out focus
             * Author: doduyhung1292 (13/11/2022)
             */

            inputSearchFocusOut: function() {
                try {
                    this.isSearchButtonFocus = null
                } catch (error) {
                    console.log(error)
                }
            }
//End region UI
        },
        data() {
            return{
                isSearchButtonFocus: null,
                theHeaderContent: TheHeaderContent
            }
        }
    }
</script>

<style scope>
    @import url(../../css/layout/TheHeader.css);

    .borderFocus {
       border-color: #2ca10c!important;
    }
    .header__search {
        height: 29px!important;
    }
</style>