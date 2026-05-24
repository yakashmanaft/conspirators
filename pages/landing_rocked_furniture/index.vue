<template>
    
    <!--  -->
    <Toast
        :id="`toast_${route.path}`"
        :duration="2000"
        title="Заявка отправлена"
        content="Придумываем варианты предложения :)"
    />

    <Container>

        <!-- TITLE PAGE SECTION -->
        <div class="title_page_section show-max-767" style="margin-bottom: 0.5rem;">
            <BreadCrumbs/>
            <h1 style="margin: 0;">{{ landing_list?.title }}</h1> 
        </div>

        <div class="banner">
            <div class="banner_img_container">
                <img alt="Страница на доработке..." src="@/assets/img/banner_rocked/bc449d9a769d039121d99041de2r--dlya-doma-i-interera-prikrovatnaya-tumba-deep-forest-s-radius.png"/>  
                <div class="product-of-day" v-if="day_product_exist">
                    <p>Товар дня</p>
                    <p>88000 RUB</p>
                    <h4>Прикроватная тумба "Deep Forest" с радиусными углами</h4>
                    <p>Мебель / Спальня / Тумбы / Камень, металл, дерево / Напольный</p>
                    <!-- CARD ADD TO CART -->
                    <div class="card_cart">
                        <p 
                            class="card_cart-add_btn"
                        >В корзину</p>
                        <p class="card_cart-change-count_btn">
                        <span>-</span>
                        <span>1</span>
                        <span>+</span>
                        </p>
                    </div>
                    <p>*Цена на товар действительна сутки с момента выставления товара в качестве товара дня</p>
                </div>
            </div>
            <div>
                <h2 style="text-transform: uppercase; font-weight: bold; font-size: 4rem;">{{ landing_list?.title.slice(0, 15) }}</h2>

                <h3 style="width: fit-content; background-color: var(--color-operation-type-donation);color: var(--color-global-baackground_light)">
                    Изделия 
                    <span style="background-color: var(--color-operation-type-donation)">в наличии</span> 
                    и 
                    <span style="background-color: var(--color-status-finished)">на заказ</span>
                </h3>
                <p>Гранит, мрамор, Кварцит, Оникс, Травертин, Габбро, Базальт</p>
                <p>Металл, дерево</p>
                <Button 
                    @click.prevent="openPopup" 
                    type="original-btn"
                    bgc="--color-global-text"
                >
                    Заказать индивидуальный проект
                </Button>
            </div>
    
        </div>

        <!-- <h3>Изделия из наличия</h3> -->
        <!-- filter -->


        <div 
            ref="elementRef" 
            :class="{ 'highlighted': isFixed }"
            class="product-item_filter"
            id="product_item_features"
        >
            <div>
                <!-- SEARCH ITEM -->
                <div class="product-item_search-wrapper">
                    <Search 
                        style="margin-top: 1rem;" 
                        @searchInputChanged="onInputSearchProductFunc"
                        type="primary"
                    />
                    <div class="filter_by_available_container">
                        <div class="radio-option">
                            <input v-model=filter_by_available type="radio" id="opt1" name="options" value="all">
                            <label for="opt1">Все</label>
                        </div>
                        <div class="radio-option">
                            <input v-model=filter_by_available type="radio" id="opt2" name="options" value="available">
                            <label for="opt2">В наличии</label>
                        </div>
                        <div class="radio-option">
                            <input v-model=filter_by_available type="radio" id="opt3" name="options" value="order">
                            <label for="opt3">Под заказ</label>
                        </div>
                    </div>
                </div>
                <!-- Filter Type -->
                <div class="filter_by_tag_container">
                    <!-- ТОМ -->
                    <div class="filter_by_tag_wrapper">
                        <!-- button -->
                         <label @click.stop="popup_volume_opened = !popup_volume_opened; current_filter_group = 'Том'" for="filter_item_by_tag">
                            <span >{{ current_volume }}</span>
                            <Icon name="material-symbols-light:arrow-back-rounded" size="25px" color="var(--color-global-text)"/>
                         </label>
                         <!-- label -->
                        <DefaultPopup
                            v-if="popup_volume_opened"
                            id="popup_book"
                            popup_title="Тома, которые мы развиваем"
                            @emitClosePopup="close_volume_popup"
                        >
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: 1rem;">
                                    <input :checked="current_volume === 'Все тома'" type="radio" id="volume-0">
                                    <label style="margin-left: .5rem;" @click="current_volume = 'Все тома'; popup_volume_opened = !popup_volume_opened" for="volume-0">
                                        <span>Все тома</span>
                                    </label>
                                </li>
                                <li  style="margin-top: 1rem;"v-for="(el, index) in computed_filter_pocket">
                                    <input :checked="el === current_volume" type="radio" :id="`volume-${index + 1}`">
                                    <label style="margin-left: .5rem;" @click="current_volume = el.toString(); popup_volume_opened = !popup_volume_opened" :for="`volume-${index}`">
                                        <span>{{ el }}</span>
                                    </label>
                                </li>
                            </ul>
                        </DefaultPopup>
                    </div>
                    <!-- КНИГА -->
                    <div class="filter_by_tag_wrapper">
                        <!-- КНОПКА открывет модалку и показывает текущий ввыбранный -->
                        <label 
                            @click.stop="popup_book_opened = !popup_book_opened; current_filter_group = 'Книга'"
                            for="filter-by-item-category"
                        >
                            <span >{{current_book}}</span>
                            <Icon name="material-symbols-light:arrow-back-rounded" size="25px" color="var(--color-global-text)"/>
                        </label>
    
                        <!-- MODAL POPUP -->
                        <DefaultPopup
                            v-if="popup_book_opened"
                            id="popup_book"
                            popup_title="Книги, которые мы пишем"
                            @emitClosePopup="close_book_popup"
                        >
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: 1rem;">
                                    <input :checked="current_book === 'Все книги'" type="radio" id="book-0">
                                    <label style="margin-left: .5rem;" @click="current_book = 'Все книги'; popup_book_opened = !popup_book_opened" for="book-0">
                                        <span>Все книги</span>
                                    </label>
                                </li>
                                <li style="margin-top: 1rem;" v-for="el in computed_filter_pocket">
                                    <input :checked="el === current_book" type="radio" :id="`book-${0 + 1}`">
                                    <label style="margin-left: .5rem;" @click="current_book = el.toString(); popup_book_opened = !popup_book_opened" :for="`book-${0 + 1}`">
                                        <span>{{ el }}</span>
                                    </label>
                                </li>
                            </ul>
                        </DefaultPopup>
                    </div>
                    <!-- ЧАСТЬ -->
                    <div class="filter_by_tag_wrapper">
                        <!-- КНОПКА открывет модалку и показывает текущий ввыбранный -->
                        <label for="filter-by-item-category">
                            <span @click.stop="popup_part_opened = !popup_part_opened; current_filter_group = 'Часть'">{{current_part}}</span>
                            <Icon name="material-symbols-light:arrow-back-rounded" size="25px" color="var(--color-global-text)"/>
                        </label>
    
                        <!-- MODAL POPUP -->
                         <DefaultPopup
                            v-if="popup_part_opened"
                            id="popup_part"
                            popup_title="Часть книги - одно целое"
                            @emitClosePopup="close_part_popup"
                         >
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: 1rem;">
                                    <input :checked="current_part === 'Все части'" type="radio" id="part-0">
                                    <label style="margin-left: .5rem;" @click="current_part = 'Все части'; popup_part_opened = !popup_part_opened" for="part-0">
                                        <span>Все книги</span>
                                    </label>
                                </li>
                                <li style="margin-top: 1rem;" v-for="el in computed_filter_pocket">
                                    <input :checked="el === current_part" type="radio" :id="`part-${0 + 1}`">
                                    <label style="margin-left: .5rem;" @click="current_part = el.toString(); popup_part_opened = !popup_part_opened" :for="`part-${0 + 1}`">
                                        <span>{{ el }}</span>
                                    </label>
                                </li>
                            </ul>
                         </DefaultPopup>
                    </div>
                    <!-- ГЛАВА -->
                    <div class="filter_by_tag_wrapper">
                        <!-- КНОПКА открывет модалку и показывает текущий ввыбранный -->
                        <label 
                            for="filter-by-item-category"
                        >
                            <span @click.stop="popup_chapter_opened = !popup_chapter_opened; current_filter_group = 'Глава'">{{current_chapter}}</span>
                            <Icon name="material-symbols-light:arrow-back-rounded" size="25px" color="var(--color-global-text)"/>
                        </label>
    
                        <!-- MODAL POPUP -->
                        <DefaultPopup
                            v-if="popup_chapter_opened"
                            id="popup_chapter"
                            popup_title="Главы, которые украшают"
                            @emitClosePopup="close_chapter_popup"
                        >
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: 1rem;">
                                    <input :checked="current_chapter === 'Все главы'" type="radio" id="chapter-0">
                                    <label style="margin-left: .5rem;" @click="current_chapter = 'Все книги'; popup_chapter_opened = !popup_chapter_opened" for="chapter-0">
                                        <span>Все главы</span>
                                    </label>
                                </li>
                                <li style="margin-top: 1rem;" v-for="el in computed_filter_pocket">
                                    <input :checked="el === current_chapter" type="radio" :id="`chapter-${0 + 1}`">
                                    <label style="margin-left: .5rem;" @click="current_chapter = el.toString(); popup_chapter_opened = !popup_chapter_opened" :for="`chapter-${0 + 1}`">
                                        <span>{{ el }}</span>
                                    </label>
                                </li>
                            </ul>
                        </DefaultPopup>
                    </div>
                    <!-- ПАРАГРАФ -->
                    <div class="filter_by_tag_wrapper">
                        <!-- КНОПКА открывет модалку и показывает текущий ввыбранный -->
                        <label 
                            for="filter-by-item-category"
                        >
                            <span @click.stop="popup_paragraph_opened = !popup_paragraph_opened; current_filter_group = 'Параграф'">{{current_paragraph}}</span>
                            <Icon name="material-symbols-light:arrow-back-rounded" size="25px" color="var(--color-global-text)"/>
                        </label>
    
                        <!-- MODAL POPUP -->
                        <DefaultPopup
                            v-if="popup_paragraph_opened"
                            id="popup_paragraph"
                            popup_title="Параграфы - это уже детали"
                            @emitClosePopup="close_paragraph_popup"
                        >
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: 1rem;">
                                    <input :checked="current_paragraph === 'Все параграфы'" type="radio" id="paragraph-0">
                                    <label style="margin-left: .5rem;" @click="current_paragraph = 'Все параграфы'; popup_paragraph_opened = !popup_paragraph_opened" for="paragraph-0">
                                        <span>Все параграфы</span>
                                    </label>
                                </li>
                                <li style="margin-top: 1rem;" v-for="el in computed_filter_pocket">
                                    <input :checked="el === current_paragraph" type="radio" :id="`paragraph-${0 + 1}`">
                                    <label style="margin-left: .5rem;" @click="current_paragraph = el.toString(); popup_paragraph_opened = !popup_paragraph_opened" :for="`paragraph-${0 + 1}`">
                                        <span>{{ el }}</span>
                                    </label>
                                </li>
                            </ul>
                        </DefaultPopup>
                    </div>
                    <br>
                    {{ filter_by_available }}
                    <br>
                    {{ current_volume }} | {{ current_book }} | {{current_part}} | {{ current_chapter }} | {{ current_paragraph }}
                </div>
            </div>
            <!-- filter -->
        </div>
        <!--  -->
        <div class="product-item_section">
            <!-- data is loading -->
            <div v-if="pending_warehouse_onSale">
                <p>Loading...</p>
            </div>
            <!-- data -->
            <div class="product_item-container">
                <!-- no search result -->
                 <div 
                    class="product_item_search_wrong"
                    v-if="searchProductInput && !computed_warehouse_onSale?.length"    
                >
                    По запросу ничего не найдено
                 </div>
    
                <!-- data -->
                
                <Product_card 
                    v-for="product_card in computed_warehouse_onSale"
                    :item_data="product_card"
                    @click.stop="$router.push(`/product/${product_card.id}`)"
                >
                 <div style="background-color: #fff;">Это слот</div>
                </Product_card>
            </div>
        </div>


        <!-- POPUP -->
         <div v-if="popup_opened">

             <DefaultPopup
                id="popup-default-callback_design"  
                popup_title="Форма обратной связи" 
                @emitClosePopup="closePopup"
                 
             >
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores porro ad ea ipsam enim veniam quidem recusandae. Ipsum perspiciatis illo veritatis quis sequi quam </p>
                
                <Form_landing_offer
                    :path="route?.path"
                    :list="landing_list || {}"
                    @emitClosePopup="closePopup"
                />   
            </DefaultPopup>
        </div>

    </Container>
</template>

<script lang="ts" setup>


    useHead({
        title: "Мебель и аксессуары из камня",
        link: [
            { 
                rel: 'stylesheet', 
                href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
                integrity: "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH",
                crossorigin: "anonymous",
                type: "text/css"
            }
        ],
        script: [
            {
                src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
                integrity: "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz",
                crossorigin: "anonymous",
            }
        ]
    })

    // shared
    import { Container } from '@/shared/container'
    import { DefaultPopup } from '~/shared/popup';

    // components
    import { Button } from '@/components/button';
    import { Form_landing_offer } from '@/components/form'
    import { Toast } from '@/components/toast'
    import { BreadCrumbs } from '~/components/breadcrumbs';
    import { Product_card } from '~/components/product_card';
    import { Search } from '~/components/search';

    // PROPS
    const props = defineProps({
        auth_user_profile: {
            type: Object,
            default: {}
        },
        auth_user: {
            type: Object,
            default: {}
        }
    })
    //
    const route = useRoute()

    // variables
    const popup_opened = ref(false)
    const current_data = ref({});
    const elementRef = ref(null);
    const isFixed = ref(false);
    let observer = null;
    const searchProductInput = ref("")
    const filter_by_available = ref('all')
    const day_product_exist = ref(true)

    // variables, popup item tag
    const popup_item_tag_opened = ref(false)
    const current_filter_group = ref('Все')
    // volume
    const popup_volume_opened = ref(false)
    const current_volume = ref('Все тома')
    const close_volume_popup = () => {
        popup_volume_opened.value = false
    }
    // book
    const popup_book_opened = ref(false);
    const current_book = ref('Все книги')
    const close_book_popup = () => {
        popup_book_opened.value = false
    }
    // part
    const popup_part_opened = ref(false)
    const current_part = ref("Все части")
    const close_part_popup = () => {
        popup_part_opened.value = false
    }
    // chapter
    const popup_chapter_opened = ref(false) 
    const current_chapter = ref("Все главы")
    const close_chapter_popup = () => {
        popup_chapter_opened.value = false
    }
    // paragraph
    const popup_paragraph_opened = ref(false) 
    const current_paragraph = ref("Все параграфы");
    const close_paragraph_popup = () => {
        popup_paragraph_opened.value = false
    }

    // pop-up
    const openPopup = () => {
        popup_opened.value = true
    }
    const closePopup = () => {
        popup_opened.value = false

        // // TOAST OPENED
        // let toast = document.getElementById(`toast_${route.path}`)
        // if(toast) {
        //     toast.style.display = 'block'
        // }

        // TOAST CLOSED
        setTimeout(() => {
            let toast = document.getElementById(`toast_${route.path}`)
            if(toast) {
                toast.style.display = 'none'
            }
        }, 5000)
    }
    // search section
    const onInputSearchProductFunc = (e: any) => {
        searchProductInput.value = e
    }

    // Computed
    const computed_warehouse_onSale = computed(() => {
        if(searchProductInput.value === '') {
            
            return warehouse_onSale.value
        } else {

            return warehouse_onSale.value?.filter((item) => item.title.toLowerCase().replace(/\s+/g, "").includes(searchProductInput.value.toLowerCase().replace(/\s+/g, ""))
            )
        }
    })
    const computed_filter_pocket = computed(() => {
        // warehouse_onSale
        // ТОМ
        if(current_filter_group.value === 'Том') {

            let list = warehouse_onSale.value?.map(el => el.type ? el.type.split(' / ')[0] : el.type)
            return [... new Set(list)]
        }
       // КНИГА
        else if(current_filter_group.value === 'Книга') {

            let list = warehouse_onSale.value?.map(el => el.type ? el.type.split(' / ')[1] : el.type)
            return [... new Set(list)]
        }
        // ЧАСТЬ
        else if(current_filter_group.value === 'Часть') {

            let list = warehouse_onSale.value?.map(el => el.type ? el.type.split(' / ')[2] : el.type)
            return [... new Set(list)]
        }
        // ГЛАВА
        else if(current_filter_group.value === 'Глава') {

            let list = warehouse_onSale.value?.map(el => el.type ? el.type.split(' / ')[3] : el.type)
            return [... new Set(list)]
        }
        // ПАРАГРАФ
        else if(current_filter_group.value === 'Параграф') {

            let list = warehouse_onSale.value?.map(el => el.type ? el.type.split(' / ')[4] : el.type)
            return [... new Set(list)]
        }
    })

    // onMoiunted
    onMounted(() => {
        // на всякий случай сбрасываем фиксацию прокрутки страницы при открытой модалке...
        let body = document.getElementsByTagName('body')[0]
        body.style.margin = 'unset'
        body.style.height = 'unset'
        body.style.overflow = 'unset'

        // 
        if (!elementRef.value) return;
        observer = new IntersectionObserver(([entry]) => {
            // // Инвертируем: фиксируем, когда элемент уходит из зоны видимости
            isFixed.value = !entry.isIntersecting;
            // entry.target.classList.toggle('highlighted', !entry.isIntersecting); 
        }, {
            rootMargin: '-200px 0px 0px 0px', // Отступ сверху
            threshold: 0
        });

        observer.observe(elementRef.value);
    })

    // form data
    // console.log(route.path)  

    const { data: landing_list } = useFetch("/api/landing/landing", {
        lazy: false,
        transform: (landing_list) => {
            // return landing_list.filter((el) => {
            //     // session user is a sharer
            //     if(el.sharers && el.sharers.find((item) => item.userType === 'conspirator' && item.userId === props.auth_user_profile.userId)) {
            //         return el
            //     }
            // })
            return landing_list.find(el => el.name === route.path.slice(1))
        }
    })

    const { data: warehouse_onSale, pending_warehouse_onSale, error_warehouse_onSale } = useFetch("/api/warehouse_onsale/item", {
        lazy: false,
        transform: (warehouse_onSale) => {
            return warehouse_onSale.filter(el => 
                el.showToAll === true
            )
        }
    })

    watch(popup_opened, () => {
        let body = document.getElementsByTagName('body')[0]
        if(popup_opened.value) {
            body.style.margin = '0'
            body.style.height = '100%'
            body.style.overflow = 'hidden'
        } else {
            body.style.margin = 'unset'
            body.style.height = 'unset'
            body.style.overflow = 'unset'
        }
    })


</script>

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
            .title_page_section {
                display: none;
            }
            .container {
                margin-top: -1rem!important;
            }
            .banner {
                margin-top: 6rem;
                height: 620px;
                background-color: var(--color-bg-popup);
                /* position: relative; */
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
                justify-content: space-between;
            }
            .banner_img_container {
                /* position: absolute;
                top: 0;
                right: 0; */
                width: 50%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                position: relative;
                /* padding: 1rem; */
            }
            .banner_img_container img{
                height: 100%;
            }
            .product-of-day {
                overflow: hidden;
                width: 50%;
                position: absolute;
                bottom: 5   rem;
                right: 0;
                background-color: var(--color-operation-type-donation);
                /* background-color: rgba(142, 47, 47, 0.5); */
            }
            .product-item_section {
                /* height: 130vh */
            }
            .product_item-container {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                /* background-color: gray; */
                gap: 1rem;
                margin-left: 20rem;
                margin-top: 1rem;
            }
            .product_item_search_wrong {
                grid-column: 1 / 3;
                height: 45vh;
            }
            .product_item_wrapper {
                border: 1px solid red;
            }
            .product-item_filter {
                /* display: flex;
                align-items: center;
                justify-content: flex-start; */
                /* width: 100%; */
                position: relative;
                margin-top: 1rem;
            }
            .product-item_search-wrapper {
                /* background-color: var(--color-global-baackground_light); */
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .search_wrapper {
                background-color: red;
            }
            .search_wrapper input {
                background-color: red;
            }
            .filter_by_available_container {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: .75rem;
            }
            .filter_by_available_container div {

            }
            .filter_by_available_container div input {
                display: none;
            }
            .filter_by_available_container div input:checked + label {
                border-bottom: 1px solid var(--color-wallet-fund-invested);
                color: var(--color-wallet-fund-invested);
            }
            .filter_by_available_container div label {
                cursor: pointer;
                border-bottom: 1px solid rgba(255, 255, 255, 0);
                transition: all .2s ease-in;
            }
            .filter_by_available_container div label:hover {
                border-bottom: 1px solid var(--color-wallet-fund-invested);
                color: var(--color-wallet-fund-invested);
            }
            .filter_by_tag_container {
                background-color: var(--color-global-baackground_light); 
                border-radius: .75rem;
                width: fit-content;
                position: absolute;
                top: 3.3rem;
                left: 0;
                width: 310px;
            }
            .filter_by_tag_wrapper {
                display: flex;
                gap: .5rem;
                padding: 1rem;
            }
            .filter_by_tag_wrapper label span,
            .filter_by_tag_wrapper label svg {
                transition: all .2s ease-in;
            }
            .filter_by_tag_wrapper label svg{
                margin-left: .25rem;
                transform: rotate(180deg)
            }
            .filter_by_tag_wrapper label span:hover {
                cursor: pointer;
            }
            .filter_by_tag_wrapper label:hover span,
            .filter_by_tag_wrapper label:hover svg {
                color: var(--color-wallet-fund-invested)!important;
                transform: rotate(180deg) scale(1.5);
                cursor: pointer;
            }
            /* 
            FILTER highlighted
            */
            .highlighted {
                /* position: fixed; */
                background-color: var(--color-btn-text);
                position: sticky;
                top: 4.5rem;
                left: 0;
                z-index: 1000;
                width: 100%;
                /* padding: 0 1rem; */
            }
        }
        @media (min-width: 1400px) {
            
        }
</style>