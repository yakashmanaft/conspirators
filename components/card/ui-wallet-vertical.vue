<template>
    <!-- @click="$router.push(`/product/${$props.item_id}`);" -->
    <div 
        class="item_wrapper"
    >
        <!-- Картинка позиции -->
        <div 
            class="item_img"
        >
            <img :src="`${$props.item?.img_src}`" :alt="$props.item?.title"
        >
        </div>
        <!-- Цена позиции -->
        <p class="product-item_price">{{ $props.item.price }} {{ $props.item.currency }}</p>

        <!-- Остаток по позиции -->
        <div class="product-item_remain">

            <p v-if="$props.item.qty == 0" style="background-color: var(--color-operation-type-donation)">Доступно для заказа</p>
            <p v-else style="background-color: var(--color-status-finished);">В наличии: {{ $props.item.qty }} {{ $props.item.measure }}</p>
        </div>


        <slot></slot>

    </div>
  </template>

<script setup>

    // PROPS
    const props = defineProps({
        // auth_user_profile: {
        //     type: Object,
        //     default: {}
        // },
        // auth_user: {
        //     type: Object,
        //     default: {}
        // }
        // item_id: {
        //     type: Number,
        //     default: null
        // },
        // item_title: {
        //     type: String,
        //     default: ''
        // },
        // item_imgSrc: {
        //     type: String,
        //     default: ''
        // }
        item: {
            type: Object,
            default: {}
        }
    })
</script>
  
  <style scoped>

        @media screen and (max-width: 319px) {

        }
        /* @media screen and (max-width: 575px) {
        } */
        @media screen and (min-width: 320px) and (max-width: 575px) {

        }

        /* @media screen and (max-width: 767px) {
        } */
        @media screen and (min-width: 576px) and (max-width: 767px) {

        }

        @media screen and (min-width: 768px) and (max-width: 991px) {

        }

        @media screen and (min-width: 992px) and (max-width: 1199px) {

        }

        @media screen and (min-width: 1200px) and (max-width: 1399px) {
            .item_wrapper {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                background-color: var(--color-item-hover-bg);
                cursor: pointer;
                min-width: 150px;
                display: relative;
            }
            .item_img {
                background-color: red;
                width: 100%;
                height: 13rem; 
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .item_img img {
                transition: all .2s ease-in;
                pointer-events: none;
                width: 100%;
                height: 100%    ;
                object-fit: cover; 
                /* Заполняет контейнер, обрезая края */
                /* object-fit: contain; */
                /* object-fit: contain; — поместить целиком без обрезки */
                object-position: center; /* Позиционирование внутри контейнера */
            }
            .item_wrapper:hover .item_img img {
                transform: scale(1.25);
            }
        }

        @media screen and (min-width: 1400px) {
            .item_wrapper {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                background-color: var(--color-item-hover-bg);
                cursor: pointer;
                min-width: 150px;
                display: relative;
            }
        }
  </style>
  
  <!-- https://github.com/vadimkaKharitonenko/severyanochka/tree/master -->