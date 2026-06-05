<template>
    <!--  -->
    <!-- .card_wrapper h3 -->
    <!-- .card_wrapper p -->
    <div class="card_wrapper">
        <!-- CARD IMG -->
        <div class="card_img">
            <img 
                :src="item_data.img_src" 
                alt="">
        </div>
        <!-- CARD PRICE -->
        <p class="card_price">{{ item_data.price }} {{ item_data.currency }}</p>

        <!-- CARD REMAIN -->
        <div class="card_remain">

            <p v-if="item_data.qty == 0" style="background-color: var(--color-operation-type-donation)">Доступно для заказа</p>
            <p v-else>В наличии: {{ item_data.qty }} {{ item_data.measure }}</p>
        </div>


        <h3 style="font-size: 1.25rem;">{{ item_data.title }}</h3>
        <p style="margin: 0; font-size: .8rem;color: var(--color-global-text_second);">{{ item_data.type }}</p>

        <!-- CARD ADD TO CART -->
        <div class="card_cart">
            <p 
                class="card_cart-add_btn"
                @click.stop="add_to_cart_func(item_data)"
            >В корзину</p>
            <p class="card_cart-change-count_btn">
               <span>-</span>
               <span>1</span>
               <span @click.stop="add_to_cart_func(item_data)">+</span>
            </p>
        </div>
            <!-- {{ item_data }} <br> -->
            <!-- {{ item_data.id }} <br>
            <p style="margin: 0; font-size: .8rem;">{{ item_data.type }}</p>

            <div>
                <p style="margin: 0;">в наличии: <span>{{ item_data.qty }}</span> <span>{{ item_data.measure }}</span></p>
            </div>
            {{ item_data.price }}{{ item_data.currency }} <br>
            {{ item_data.description }} <br>
            {{ item_data.features }} <br>
            <p style="font-size: .8rem;">{{ item_data.productionDate }}</p> -->
        <slot></slot>
    </div>
  </template>
  
  <style scoped>

        @media screen and (max-width: 319px) {
        }

        @media (min-width: 320px) and (max-width: 575px) {
        }
        @media (min-width: 576px) and (max-width: 767px) {

        }
        @media (min-width: 768px) and (max-width: 991px) {

        }
        @media (min-width: 992px) and (max-width: 1199px) {
            
        }
        @media (min-width: 1200px) and (max-width: 1399px) {
            .card_wrapper {
                overflow: hidden;
                cursor: pointer;
                background-color: var(--color-global-baackground_light);
                /* border-radius: .75rem; */
            }
            .card_wrapper:hover {
                box-shadow: var(--hover-shadow);
            }
            .card_img {
                background-color: red;
                width: 100%;
                height: 10rem; 
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .card_img img{
                transition: all .2s ease-in;
                pointer-events: none;
                width: 100%;
                height: auto;
                object-fit: cover; 
                /* Заполняет контейнер, обрезая края */
                /* object-fit: contain; */
                /* object-fit: contain; — поместить целиком без обрезки */
                object-position: center; /* Позиционирование внутри контейнера */
            }
            .card_wrapper:hover .card_img img {
                transform: scale(1.25);
            }
            .card_wrapper h3 {
                /* margin-top: .5rem; */
                margin: 0;
                font-size: .9rem!important;
                line-height: 1.5;
                font-weight: normal;
            }
            .card_wrapper p {
                margin: 0;
            }
            .card_price {
                /* position: absolute;
                left: 0;
                top: 0; */
                font-size: 1.2rem;
                margin: 0;
            }
            .card_remain {
                background-color: var(--color-status-finished);
            }
            .card_remain p {
                font-size: .8rem;
                padding: 0 .25rem;
            }
            .card_cart {
                margin-top: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                background-color: var(--color-global-text_second);
                padding: 5px;
            }
            .card_cart-add_btn {
                background-color: rgba(54, 195, 77, 0.6);;
                width: 100%;
                text-align: center;
                color: white;
                padding: .25rem;
                font-size: .8rem;
            }
            .card_cart-add_btn:hover {
                background-color: rgba(54, 195, 77, 0.8);
            }
            .card_cart-change-count_btn {
                display: flex;
                gap: .5rem;
                width: fit-content;
            }
            .card_cart-change-count_btn span{
                background-color: var(--color-wallet-fund-debt);
                height: 100%;
                width: 1rem;
                text-align: center;
            }
        }
        @media (min-width: 1400px) {
            
        }
  </style>
  
<script lang="ts" setup>

    //props
    const props = defineProps({
    item_data: {
        type: Object,
        default: {}
    }

    })

    // COUNT CART ITEM
    const item_to_cart_qty = ref(0)


    // onClick cart-add_btn
    const add_to_cart_func = (item: any) => {
        console.log(item)
    }

</script>
  <!-- https://github.com/vadimkaKharitonenko/severyanochka/tree/master -->