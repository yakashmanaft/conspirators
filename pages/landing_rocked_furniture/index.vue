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
        <div class="show-max-767" style="margin-bottom: 0.5rem;">
            <BreadCrumbs/>
            <h1 style="margin: 0;">{{ landing_list?.title }}</h1> 
        </div>
        <!-- <p>{{ route.path }}</p>  -->
        <h2>{{ landing_list }}</h2>
        <h3>Изделия на заказ</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam molestias fugit expedita quasi delectus culpa iste unde consequatur amet aliquam quisquam dolorem ullam odit voluptatem provident deleniti quos, hic sit repellat debitis eum sapiente? Blanditiis, doloribus asperiores. Dignissimos laudantium nobis autem iste voluptatem pariatur ratione, recusandae fuga at debitis? Labore delectus numquam voluptas? Sapiente magni corrupti deleniti, excepturi, dolores, omnis ipsa aut reprehenderit nisi qui perferendis culpa doloremque expedita aliquam beatae ducimus laborum eius saepe. Vel velit fuga rem quod praesentium? Amet illum beatae hic, cupiditate atque excepturi consectetur, cumque voluptates facere officia in? Vitae nihil rerum labore ea tempore!</p>

        <Button @click.prevent="openPopup" type="original-btn">
            Заказать индивидуальный проект
        </Button>

        <h3>Изделия из наличия</h3>
        <!-- filter -->


        <div 
            style="position: relative;"
            ref="elementRef" 
            :class="{ 'highlighted': isFixed }"
            class="product-item_filter"
            id="product_item_features"
        >
            <div style="background-color: blue;">
                <div class="product-item_search-wrapper">
                    <!-- SEARCH ITEM -->
                    <Search 
                        style="margin-top: 1rem;" 
                        @searchInputChanged="onInputSearchProductFunc"
                        type="primary"
                    />
                </div>
            </div>
            <!-- filter -->
            <div style="background-color: red;position: absolute; top: 1.5rem; left: 0;">
                Vertiical Fiilter / Search
            </div>
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
                    v-if="searchProductInput && !warehouse_onSale?.length"    
                >
                    По запросу ничего не найдено
                 </div>
    
                <!-- data -->
                
                <ProductCard 
                    v-for="product_card in warehouse_onSale"
                    :item_data="product_card"
                    @click.stop="$router.push(`/product/${product_card.id}`)"
                >
                 <div style="background-color: #fff;">Это слот</div>
                </ProductCard>
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
    import { ProductCard } from '~/components/product_card';
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
            /* .product-item_section {
                height: 100vh
            } */
            .product_item-container {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                /* background-color: gray; */
                gap: 1rem;
                margin-left: 11rem;
            }
            .product_item_search_wrong {

            }
            .product_item_wrapper {
                border: 1px solid red;
            }
            .product-item_filter {
                display: flex;
                align-items: center;
                justify-content: flex-start;
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