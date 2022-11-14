<template>
    <div class="header">
        <div class="header-left">
            <div class="header-left__iconmenu" tittle="Menu"></div>
            <div class="header-left__brandname" tittle="CÔNG TY SẢN XUẤT-THƯƠNG MẠI-DỊCH VỤ QUI PHÚC">CÔNG TY SẢN XUẤT-THƯƠNG MẠI-DỊCH VỤ QUI PHÚC</div>
            <div class="header-left__icondropdown"></div>
        </div>
        <div class="header-right">
            <input class="header__icon input-search" placeholder="Nhập từ khóa tìm kiếm"  v-on:focusin="inputSearchFocus"  v-on:focusout="inputSearchFocusOut">
            <div class="icon__search header__search"  :class="isSearchButtonFocus"></div>
            <div class="icon__extend-feature"></div>
            <div class="icon__set-up header__icon"></div>
            <div class="icon-message"></div>
            <div class="icon-help" tittle="Giúp"></div>
            <div class="header-right__iconnotice"></div>
            <div class="header-right__avatar"></div>
            <div class="header-right__username">Nguyễn Văn Mạnh</div>
            <div class="header-left__icondropdown"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TheHeader",
        methods: {
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
        },
        data() {
            return{
                isSearchButtonFocus: null
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