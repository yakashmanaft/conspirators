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
            <p v-else style="background-color: var(--color-status-finished);">В наличии: {{ item_data.qty }} {{ item_data.measure }}</p>
        </div>

        <h3 style="font-size: 1.25rem;">{{ item_data.title }}</h3>
        <p style="margin: 0; font-size: .8rem;color: var(--color-global-text_second);">{{ item_data.type }}</p>

        <div class="action_btn_group">

            <!-- QTY === 0 -->
            <p 
            v-if="item_data.qty == 0"
                class="cart-add_btn cart-item_request-btn"
            @click.stop=""
            >Оставить заявку</p>  

            <!--  -->
            <div v-else-if="cart.items.find(el => el.id === item_data.id) && cart.items.find(el => el.id === item_data.id).qty > 0" class="cart-change-count_btn" style="width: fit-content;">
                <div 
                    class="count_btn"
                    @click.stop="deacrease_cart_item_qty(cart.items.find(el => el.id === item_data.id)?.id, cart.items.find(el => el.id === item_data.id)?.qty, cart.items.find(el => el.id === item_data.id)?.max_qty);"
                >-</div>
                <div class="count_count">{{ cart.items.find(el => el.id === item_data.id).qty }}</div>
                <div 
                class="count_btn"
                :style="cart.items.find(el => el.id === item_data.id).qty === cart.items.find(el => el.id === item_data.id).max_qty ? 'background-color: var(--color-btn-disabled-bg)' : ''"
                @click.stop="increase_cart_item_qty(cart.items.find(el => el.id === item_data.id)?.id, cart.items.find(el => el.id === item_data.id)?.qty, cart.items.find(el => el.id === item_data.id)?.max_qty)"
                >+</div>
            </div>

            <!-- OTHER -->
            <p 
                v-else
                class="cart-add_btn"
                @click.stop="add_to_cart_func(item_data)"
            >В корзину</p>
        </div>

        <!-- CARD ADD TO CART -->
        <!-- <div class="card_cart">
            <p 
                class="card_cart-add_btn"
                @click.stop="add_to_cart_func(item_data)"
            >В корзину</p>
            <p class="card_cart-change-count_btn">
               <span>-</span>
               <span>1</span>
               <span @click.stop="add_to_cart_func(item_data)">+</span>
            </p>
        </div> -->
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
            .card_wrapper {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                background-color: var(--color-item-hover-bg);
                cursor: pointer;
                min-width: 150px;
                display: relative;
            }
            .card_img {
                background-color: var(--color-global-text_second);
                width: 100%;
                height: 13rem; 
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .card_img img{
                transition: all .2s ease-in;
                pointer-events: none;
                width: 100%;
                height: 100%;
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
                margin: 0 .5rem;
                margin-top: .5rem;
                font-size: .9rem!important;
                line-height: 1.5;
                font-weight: normal;
                align-self: flex-start;
            }
            .card_wrapper p {
                margin: 0;
                padding: 0 .5rem;
            }
            .card_price {
                font-size: 1.2rem;
                margin: 0;
            }
            .card_remain {
                background-color: var(--color-status-finished);
                margin: 0 .5rem;
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
                background-color: rgba(54, 195, 77, 0.6);
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
            .action_btn_group {
                margin-top: 1rem;
                display: flex;
                align-items: flex-end;
                flex: 1 auto;
                width: 100%;
                justify-content: flex-end;
                user-select: none;
            }
            .cart-item_request-btn {
                background-color: rgba(114, 166, 245, 0.3)!important;
            }
            .cart-item_request-btn:hover {
                background-color: rgba(89, 151, 245, 0.3)!important;
            }
            .cart-add_btn {
                background-color: rgba(54, 195, 77, 0.6);
                width: 100%;
                text-align: center;
                color: white;
                padding: .5rem .25rem!important;
                font-size: .8rem;
            }
            .cart-add_btn:hover {
                background-color: rgba(54, 195, 77, 0.8);
            }
            .cart-change-count_btn {
                display: flex;
                align-items: center;
            }
            .cart-change-count_btn .count_btn {
                color: var(--color-global-baackground_light);
                background-color: var(--color-global-text);
                width: 2rem;
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .cart-change-count_btn .count_count {
                width: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        @media (min-width: 992px) and (max-width: 1199px) {
            .card_wrapper {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                background-color: var(--color-item-hover-bg);
                cursor: pointer;
                min-width: 150px;
                display: relative;
            }
            .card_img {
                background-color: var(--color-global-text_second);
                width: 100%;
                height: 13rem; 
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .card_img img{
                transition: all .2s ease-in;
                pointer-events: none;
                width: 100%;
                height: 100%;
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
                margin: 0 .5rem;
                margin-top: .5rem;
                font-size: .9rem!important;
                line-height: 1.5;
                font-weight: normal;
                align-self: flex-start;
            }
            .card_wrapper p {
                margin: 0;
                padding: 0 .5rem;
            }
            .card_price {
                font-size: 1.2rem;
                margin: 0;
            }
            .card_remain {
                background-color: var(--color-status-finished);
                margin: 0 .5rem;
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
                background-color: rgba(54, 195, 77, 0.6);
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
            .action_btn_group {
                margin-top: 1rem;
                display: flex;
                align-items: flex-end;
                flex: 1 auto;
                width: 100%;
                justify-content: flex-end;
                user-select: none;
            }
            .cart-item_request-btn {
                background-color: rgba(114, 166, 245, 0.3)!important;
            }
            .cart-item_request-btn:hover {
                background-color: rgba(89, 151, 245, 0.3)!important;
            }
            .cart-add_btn {
                background-color: rgba(54, 195, 77, 0.6);
                width: 100%;
                text-align: center;
                color: white;
                padding: .5rem .25rem!important;
                font-size: .8rem;
            }
            .cart-add_btn:hover {
                background-color: rgba(54, 195, 77, 0.8);
            }
            .cart-change-count_btn {
                display: flex;
                align-items: center;
            }
            .cart-change-count_btn .count_btn {
                color: var(--color-global-baackground_light);
                background-color: var(--color-global-text);
                width: 2rem;
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .cart-change-count_btn .count_count {
                width: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        @media (min-width: 1200px) and (max-width: 1399px) {
            .card_wrapper {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                background-color: var(--color-item-hover-bg);
                cursor: pointer;
                min-width: 150px;
                display: relative;
            }
            .card_img {
                background-color: var(--color-global-text_second);
                width: 100%;
                height: 13rem; 
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .card_img img{
                transition: all .2s ease-in;
                pointer-events: none;
                width: 100%;
                height: 100%;
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
                margin: 0 .5rem;
                margin-top: .5rem;
                font-size: .9rem!important;
                line-height: 1.5;
                font-weight: normal;
                align-self: flex-start;
            }
            .card_wrapper p {
                margin: 0;
                padding: 0 .5rem;
            }
            .card_price {
                font-size: 1.2rem;
                margin: 0;
            }
            .card_remain {
                background-color: var(--color-status-finished);
                margin: 0 .5rem;
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
                background-color: rgba(54, 195, 77, 0.6);
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
            .action_btn_group {
                margin-top: 1rem;
                display: flex;
                align-items: flex-end;
                flex: 1 auto;
                width: 100%;
                justify-content: flex-end;
                user-select: none;
            }
            .cart-item_request-btn {
                background-color: rgba(114, 166, 245, 0.3)!important;
            }
            .cart-item_request-btn:hover {
                background-color: rgba(89, 151, 245, 0.3)!important;
            }
            .cart-add_btn {
                background-color: rgba(54, 195, 77, 0.6);
                width: 100%;
                text-align: center;
                color: white;
                padding: .5rem .25rem!important;
                font-size: .8rem;
            }
            .cart-add_btn:hover {
                background-color: rgba(54, 195, 77, 0.8);
            }
            .cart-change-count_btn {
                display: flex;
                align-items: center;
            }
            .cart-change-count_btn .count_btn {
                color: var(--color-global-baackground_light);
                background-color: var(--color-global-text);
                width: 2rem;
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .cart-change-count_btn .count_count {
                width: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        @media (min-width: 1400px) {
            .card_wrapper {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                background-color: var(--color-item-hover-bg);
                cursor: pointer;
                min-width: 150px;
                display: relative;
            }
            .card_img {
                background-color: var(--color-global-text_second);
                width: 100%;
                height: 13rem; 
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .card_img img{
                transition: all .2s ease-in;
                pointer-events: none;
                width: 100%;
                height: 100%;
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
                margin: 0 .5rem;
                margin-top: .5rem;
                font-size: .9rem!important;
                line-height: 1.5;
                font-weight: normal;
                align-self: flex-start;
            }
            .card_wrapper p {
                margin: 0;
                padding: 0 .5rem;
            }
            .card_price {
                font-size: 1.2rem;
                margin: 0;
            }
            .card_remain {
                background-color: var(--color-status-finished);
                margin: 0 .5rem;
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
                background-color: rgba(54, 195, 77, 0.6);
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
            .action_btn_group {
                margin-top: 1rem;
                display: flex;
                align-items: flex-end;
                flex: 1 auto;
                width: 100%;
                justify-content: flex-end;
                user-select: none;
            }
            .cart-item_request-btn {
                background-color: rgba(114, 166, 245, 0.3)!important;
            }
            .cart-item_request-btn:hover {
                background-color: rgba(89, 151, 245, 0.3)!important;
            }
            .cart-add_btn {
                background-color: rgba(54, 195, 77, 0.6);
                width: 100%;
                text-align: center;
                color: white;
                padding: .5rem .25rem!important;
                font-size: .8rem;
            }
            .cart-add_btn:hover {
                background-color: rgba(54, 195, 77, 0.8);
            }
            .cart-change-count_btn {
                display: flex;
                align-items: center;
            }
            .cart-change-count_btn .count_btn {
                color: var(--color-global-baackground_light);
                background-color: var(--color-global-text);
                width: 2rem;
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .cart-change-count_btn .count_count {
                width: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
  </style>
  
<script lang="ts" setup>
    import { useCart } from '@/stores/cart'

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
    const cart = useCart()
    const add_to_cart_func = (product: any) => {
        cart.addToCart({ 
            id: product.id,
            title: product.title,
            qty: product.qty,
            measure: product.measure,
            article: product.article,
            imgUrl: product.img_src,
            currency: product.currency,
            price: product.price
         })
    }
    // Helpers product cart card item qty counts
    const deacrease_cart_item_qty = (item_id: number, item_qty:number, item_max_qty:number) => {
    if(item_qty <= 0) {
        cart.removeFromCart(item_id)
    } else {

        cart.updateQuantity(item_id, -1)
    }
    }
    const increase_cart_item_qty = (item_id: number, item_qty:number, item_max_qty:number) => {
    if(item_qty === item_max_qty) {

    } else {

        cart.updateQuantity(item_id, 1)
    }
    }

</script>
  <!-- https://github.com/vadimkaKharitonenko/severyanochka/tree/master -->