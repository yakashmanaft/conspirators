<template>
    <!-- MAIN LIKE A BANNER -->
    <div class="main-banner_container" style="background-color: var(--color-global-baackground_light); border-top: 1px solid red;">

        <Container class="container-inside">

            <div class="main-banner_wrapper">

                <!-- MARK -->
                <p class="author-mark" style="font-size: .8rem;color: var(--color-global-text_second); margin: 0; grid-area: mark" @click.stop="$router.push('/')">made on cnsprtrs by <span style="font-weight: bold;">@kashmanaft</span></p>

                <!-- LEFT -->
                <h2 style="grid-area: left">
                    <span style="border: 1px solid var(--color-as-ozon); background-color: var(--color-as-ozon_03);">
                        <img src="assets/img/logo/ozon.svg" alt="ozon">
                    </span>
                    <span style="border: 1px solid var(--color-as-wb); background-color: var(--color-as-wb_03);">
                        <img src="assets/img/logo/wb.svg" alt="wildberries">  
                    </span>
                    <span style="border: 1px solid var(--color-as-ym-yellow); background-color: var(--color-as-ym-yellow_03);">
                        <img src="assets/img/logo/ya_market.svg" alt="yandex market">
                    </span>
                </h2>

                <!-- RIGHT -->
                <div class="main-banner_area-right">

                    <h1 style="margin: 0; font-weight: bold;">Готовим <br><span>карточки товаров для маркетплейсов</span></h1>
                    <p>Или для вашего собственного web-ресурса</p>
                    <ul class="main-banner_icon-wrapper">
                        <!--  -->
                        <li class="icon_el">
                            <img 
                                src="assets/icons/app_icon/photoshop.webp" 
                                alt="Работаем в photoshop (Фотошоп)">
                        </li>
                        <li class="icon_el">
                            <img 
                                src="assets/icons/app_icon/illustrator.webp" 
                                alt="Работаем в illustrator (Иллюстратор)">
                        </li>
                        <li class="icon_el">
                            <img 
                                src="assets/icons/app_icon/figma.webp" 
                                alt="Работаем в figma (Фигма)">
                        </li>
                        <li class="icon_el">
                            <img 
                                src="assets/icons/app_icon/coreldraw.webp" 
                                alt="Работаем в coreldraw (Корелдро)">
                        </li>
    
                    </ul>
            
                    <a href="#start" style="padding: 16px 32px; background-color: var(--color-global-text); color: var(--color-btn-text); border-radius: 2rem;">Начать</a>
                </div>
            </div>
        </Container>
    </div>

    <!-- QIZZZ -->
    <Container class="container-inside" id="start">


        <!-- QUIZZZ -->
         <!-- chip -->
            <div class="chip_paragraph" style="margin-top: 1rem;">
                <h3 
                    :class="currentParagraphChip === el.name ? 'paragraph-title_active' : ''" style="cursor: pointer;"
                    v-for="el in paragraphChipList">
                    <span @click="currentParagraphChip = el.name">{{ el.title }}</span>
                </h3>
            </div>

            <div style="margin-top: 1rem;" >

                <!-- specification-first content -->
                <div v-if="currentParagraphChip === 'specification-first'" class="specification-first-content_container">
                    <div v-if="current_specification_step === ''">
                        <p>Придумываем как преподнести для вас анкету</p> 
                    </div>
                    <div v-else class="table-contents_wrapper">

                        <!-- OL table contents -->
                        <ol class="ol-step_wrapper">
                            <li v-for="(group, idx) in [...new Set([...specification_step.map((obj: any) => {return obj.group})])].reverse()">
                                <h4>{{idx + 1}}. {{ group }}</h4>
                                <ol>
                                    <li v-for="(step, index) in specification_step.filter(el => el.group === group)" @click="current_specification_step = step.name">
                                        <label 
                                            :class="step.name === current_specification_step ? 'checked_input' : ''"
                                            :for="`${group}_${index}`"
                                        >
                                            {{ idx + 1 }}. {{ index + 1 }}. {{ step.name }}
                                        </label>
                                        <input 
                                            type="radio" 
                                            :id="`${group}_${index}`" v-model="current_specification_step"
                                            :checked="step.name === current_specification_step"
                                        >
                                        
                                    </li>
                                </ol>
                            </li>
                        </ol>

                        <!-- show details of table content -->
                        <div class="ol_content">
                            <form action="">
                                {{ current_specification_step }}
                                <br>
                                <label for="">Заказчик</label>
                                <input type="text" placeholder="Как к вам обращаться">
                            </form>
                        </div>
                    </div>
                </div>

                <!-- choose-pattern content -->
                <div v-if="currentParagraphChip === 'choose-pattern'" class="choose-pattern-content_container">
                    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ore nulla aut suscipit placeat? Deleniti, error. Rem nisi dolor soluta uaerat voluptatibus fuga? Eius, ipsum, ea, quidem provident commodi cupiditate beatae quos obcaecati repellendus ipsa dolores natus esse sed voluptas reprehenderit assumenda temporibus ad consequuntur velit repellat labore. Fugit ex officiis sed, quam numquam aliquid neque excepturi iure mollitia ut, quibusdam at dolores, repellat nemo!</p>

                    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ore nulla aut suscipit placeat? Deleniti, error. Rem nisi dolor soluta uaerat voluptatibus fuga? Eius, ipsum, ea, quidem provident commodi cupiditate beatae quos obcaecati repellendus ipsa dolores natus esse sed voluptas reprehenderit assumenda temporibus ad consequuntur velit repellat labore. Fugit ex officiis sed, quam numquam aliquid neque excepturi iure mollitia ut, quibusdam at dolores, repellat nemo!</p>

                    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ore nulla aut suscipit placeat? Deleniti, error. Rem nisi dolor soluta uaerat voluptatibus fuga? Eius, ipsum, ea, quidem provident commodi cupiditate beatae quos obcaecati repellendus ipsa dolores natus esse sed voluptas reprehenderit assumenda temporibus ad consequuntur velit repellat labore. Fugit ex officiis sed, quam numquam aliquid neque excepturi iure mollitia ut, quibusdam at dolores, repellat nemo!</p>

                </div>
            </div>

            {{ form_obj }}
        
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
    </Container>
</template>

<script lang="ts" setup>
    useHead({
        title: "Рисуем карточки товаров для маркетплейсов: OZON, WILDBERRIES, Яндекс. Маркет",
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

    // components
    // import { Button } from '@/components/button';

    // CONST
    //
    //= paragraphChipList
    const paragraphChipList = ref([
        {
            name: 'specification-first', 
            title: 'Создать ТЗ вместе'
        },
        {
            name: 'choose-pattern', 
            title: 'Выбрать готовое решение'
        }
    ])
    //= currentParagraphChip
    const currentParagraphChip = ref('specification-first')
    //= content by paragraph
    const specification_step = ref([
        {
            group: 'Условия',
            name: 'Предмет договора'
        },
        {
            group: 'Условия',
            name: 'Оплата'
        },
        {
            group: 'Условия',
            name: 'Стороны и контакты'
        },
        {
            group: 'ТЗ',
            name: 'Продукт'
        },
        {
            group: 'ТЗ',
            name: 'Площадки'
        },
        {
            group: 'ТЗ',
            name: 'Артикул и прочие пометки'
        },
        {
            group: 'ТЗ',
            name: 'Описание и характеристики'
        },
        {
            group: 'ТЗ',
            name: 'Что вас привлекает'
        },
        {
            group: 'ТЗ',
            name: 'Фото и другие исходники'
        },
        {
            group: 'Итого',
            name: 'Завершаем постановку задачи'
        }
    ])
    //= specification_step
    const current_specification_step = ref(specification_step?.value ? specification_step.value[0].name : '')

    //= specification_step_content
    const specification_step_content = ref([
        {
            specification_step_name_id: 1,
            title: '',
        }
    ])

    //= form_obj
    const form_obj = ref({
        customer_id: null,
        customer_name: 'noname',
        executor_id: 6,
        executor: 'noname'
    })
</script>

<style scoped>

/* ОБЩЕЕ */
/* CHIP FOR PARAGRAPH */
.chip_paragraph {
    display: flex;
    -ms-overflow-style: none;  /* IE and Edge */
    overflow: scroll; 
    scrollbar-width: none; 
    max-width: 99vw!important;
    gap: 1rem;
    padding-bottom: .5rem;
    border-bottom: 1px solid var(--color-btn-disabled-bg);
}
.chip_paragraph::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
    width: 0;
    height: 0;
}
.chip_paragraph h3 {
    font-size: 1rem;
    font-weight: normal;
    position: relative;
} 
.chip_paragraph h3 span {
    text-wrap: nowrap;
}
.paragraph-title_active:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-wallet-fund-available-wo)
}
.paragraph-title_active span {
    color: var(--color-wallet-fund-available-wo);
}

/* specification-first sf */
/* .table-contents_wrapper {
}

    */
/* .table-contents_wrapper li {
    position: relative;
    display: block;
    padding-left: 1rem;
    margin-top: .5rem;
} */
/* .table-contents_wrapper li:before {
    content: counters(item, ".") ". "; counter-increment: item;
    position: absolute;
    top: 0;
    left: -1rem;
} */
.table-contents_wrapper ol{
    list-style: none;
    padding: 0;
} 

@media screen and (max-width: 575px) {
    .chip_paragraph {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .container-inside {
        margin-top: 0!important;
        margin-bottom: 0!important;
        padding-top: 0!important;
    }
    /* MAIN BANNER */
    .main-banner_container {
        padding-top: 2rem;
        padding-bottom: 1rem;
    }
    .main-banner_wrapper {
        padding: 0 2rem;
        margin-top: 4.5rem;
        /* background-color: red; */
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        justify-content: space-between;
        grid-template-areas: 
        "mark mark"
        "left left"
        "right right"
        ;
    }
    .main-banner_area-right {
        grid-area: right; 
        text-align: right;
        text-align: left;
        /* position: relative; */
        margin-top: 2.5rem;
        padding-bottom: 2.5rem;
    }
    .author-mark {
        text-align: center!important;
    }
    .main-banner_area-right h1 {
        font-size: 3rem;
    }
    .main-banner_area-right h1 span {
        color :var(--color-as-ym-white);
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        padding: 0 .5rem;
    }
    .main-banner_area-right p {
        margin: 0;
        margin-top: 1rem;
    }
    .main-banner_area-right ul {
        margin-top: 1rem;
        padding-bottom: 3rem;
    }
    .main-banner_area-right > a {
        /* position: absolute; */
        /* top: 50%; */
        /* right: 0; */
        /* transform: translateY(-200%); */
        display: flex;
        justify-content: center;
    }
    /*  */
    h2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 2.5rem;;
    }
    h2 span {
        width: fit-content;
        height: 175px;  
        display: flex;
        align-items: flex-end;
        box-shadow: var(--hover-shadow);
        position: relative;
        border-radius: 1rem;
        transition: all .5s ease-in-out;
    }
    h2 span:hover {
        cursor: pointer;  
        opacity: .8;      
    }
    h2 span:nth-child(1) {
        margin-left: -8rem;
        border-bottom-left-radius: 1.5rem;
        border-bottom-right-radius: 7px;
        z-index: 2;
    }
    h2 span:nth-child(2) {
        /* margin-left: 3.2rem; */
        margin-left: 10rem;
        margin-top: -4rem;
        margin-bottom: -4rem;
        z-index: 1;
    }
    h2 span:nth-child(3) {
        margin-left: 1rem;
        /* width: 400px; */
        margin-top: -1rem;
        margin-left: -5rem;
    }
    h2 span img {
        width: 200px;
    }
    /*  */
    /* APP ICON wrapper */
    .main-banner_icon-wrapper {
        /* background-color: blue; */
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        list-style: none;
        margin: 0;
        padding: 0;
        /* margin-top: 3rem!important; */
    }
    .icon_el {
        width: 32px;
        height: 32px;
        /* background-color: red; */
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon_el img {
        width: 100%;
        height: 100%;
    }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
    .chip_paragraph {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .container-inside {
        margin-top: 0!important;
        margin-bottom: 0!important;
        padding-top: 0!important;
    }
    /* MAIN BANNER */
    .main-banner_container {
        padding-top: 2rem;
        padding-bottom: 1rem;
    }
    .main-banner_wrapper {
        padding: 0 2rem;
        margin-top: 4.5rem;
        /* background-color: red; */
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        justify-content: space-between;
        grid-template-areas: 
        "mark mark"
        "left left"
        "right right"
        ;
    }
    .main-banner_area-right {
        grid-area: right; 
        text-align: right;
        text-align: left;
        /* position: relative; */
        margin-top: 2.5rem;
        padding-bottom: 2.5rem;
    }
    .author-mark {
        text-align: center!important;
    }
    .main-banner_area-right h1 {
        font-size: 3rem;
    }
    .main-banner_area-right h1 span {
        color :var(--color-as-ym-white);
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        padding: 0 .5rem;
    }
    .main-banner_area-right p {
        margin: 0;
        margin-top: 1rem;
    }
    .main-banner_area-right ul {
        margin-top: 1rem;
        padding-bottom: 3rem;
    }
    .main-banner_area-right > a {
        /* position: absolute; */
        /* top: 50%; */
        /* right: 0; */
        /* transform: translateY(-200%); */
    }
    /*  */
    h2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 2.5rem;;
    }
    h2 span {
        width: fit-content;
        height: 175px;  
        display: flex;
        align-items: flex-end;
        box-shadow: var(--hover-shadow);
        position: relative;
        border-radius: 1rem;
        transition: all .5s ease-in-out;
    }
    h2 span:hover {
        cursor: pointer;  
        opacity: .8;      
    }
    h2 span:nth-child(1) {
        border-bottom-left-radius: 2.7rem;
        border-bottom-right-radius: 7px;
        z-index: 2;
    }
    h2 span:nth-child(2) {
        margin-left: 3.2rem;
        margin-top: -4rem;
        margin-bottom: -4rem;
        z-index: 1;
    }
    h2 span:nth-child(3) {
        margin-left: 1rem;
        width: 400px;
    }
    /*  */
    /* APP ICON wrapper */
    .main-banner_icon-wrapper {
        /* background-color: blue; */
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        list-style: none;
        margin: 0;
        padding: 0;
        /* margin-top: 3rem!important; */
    }
    .icon_el {
        width: 32px;
        height: 32px;
        /* background-color: red; */
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon_el img {
        width: 100%;
        height: 100%;
    }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
    .container-inside {
        margin-top: 0!important;
        margin-bottom: 0!important;
    }

    /* MAIN BANNER */
    .main-banner_container {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    .main-banner_wrapper {
        padding: 0 2rem;
        margin-top: 4.5rem;
        /* background-color: red; */
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        justify-content: space-between;
        grid-template-areas: 
        "mark mark"
        "left left"
        "right right"
        ;
    }
    .main-banner_area-right {
        grid-area: right; 
        text-align: right;
        text-align: left;
        position: relative;
        margin-top: 2.5rem;
    }
        /*  */
    .main-banner_area-right .author-mark {
        text-align: left!important;
    }
    .main-banner_area-right h1 {
        font-size: 3rem;
    }
    .main-banner_area-right h1 span {
        color :var(--color-as-ym-white);
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        padding: 0 .5rem;
    }
    .main-banner_area-right p {
        margin: 0;
        margin-top: 1rem;
    }
    .main-banner_area-right ul {
        margin-top: 1rem;
        padding-bottom: 5rem;
    }
    .main-banner_area-right > a {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-200%);
    }
    /*  */
    h2 {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-top: 2.5rem;;
    }
    h2 span {
        width: fit-content;
        height: 220px;  
        display: flex;
        align-items: flex-end;
        box-shadow: var(--hover-shadow);
        position: relative;
        border-radius: 1rem;
        transition: all .5s ease-in-out;
    }
    h2 span:hover {
        cursor: pointer;  
        opacity: .8;      
    }
    h2 span:nth-child(1) {
        border-bottom-left-radius: 2.7rem;
        border-bottom-right-radius: 7px;
        z-index: 2;
    }
    h2 span:nth-child(2) {
        /* margin-left: 3.2rem; */
        margin-right: 7rem;
        margin-top: -8rem;
        margin-bottom: -8rem;
        z-index: 1;
    }
    h2 span:nth-child(3) {
        margin-left: 1rem;
        width: 400px;
        margin-top: 3.5rem;
        margin-right: 3rem;
    }
    /*  */
    /* APP ICON wrapper */
    .main-banner_icon-wrapper {
        /* background-color: blue; */
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        list-style: none;
        margin: 0;
        padding: 0;
        margin-top: 3rem!important;
    }
    .icon_el {
        width: 32px;
        height: 32px;
        /* background-color: red; */
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon_el img {
        width: 100%;
        height: 100%;
    }

    /* specification-first-content_container */
    .specification-first-content_container {

    }
    /* choose-pattern-content_container */
    .choose-pattern-content_container {

    }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
    .container-inside {
        margin-top: 0!important;
        margin-bottom: 0!important;
    }

    /* MAIN BANNER */
    .main-banner_container {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    /* .main-banner_wrapper {
        margin-top: 4.5rem;
        background-color: cyan;
    } */
    /* 
        TABLE CONTENTS
    */
    .table-contents_wrapper{
        display: flex;
    }
    .ol_content {
        background-color: var(--color-btn-disabled-bg);
        width: 100%;
    }
    .ol-step_wrapper {

    }
    .ol-step_wrapper li {

    }
    .ol-step_wrapper li h4 {

    }
    .ol-step_wrapper li ol {

    }
    .ol-step_wrapper li ol li {

    }
    .ol-step_wrapper > li > ol > li > label {
        transition: all .2s ease-in-out;
    }
    .ol-step_wrapper > li > ol > li > label:hover {
        background-color: var(--color-urgency-low-wo);
        cursor: pointer;
    }
    /* .ol-step_wrapper > li > ol > li > input:checked + .ol-step_wrapper > li > ol > li > label{
        background-color: red!important;
    } */
    .checked_input {
        font-weight: bold;
        background-color: var(--color-urgency-low-wo);
    }
    .ol-step_wrapper li ol li input {
        display: none;
    }

    /* MAIN BANNER */
    .main-banner_container {
        padding-top: 1rem;
        padding-bottom: 3rem;
    }
    .main-banner_wrapper {
        padding: 0 2rem;
        margin-top: 4.5rem;
        /* background-color: red; */
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        justify-content: space-between;
        grid-template-areas: 
        "mark mark"
        "left right"
        ;
    }
    .main-banner_area-right {
        grid-area: right; 
        text-align: right;
    }
    .main-banner_area-right h1 {
        font-size: 4rem;
    }
    .main-banner_area-right h1 span {
        color :var(--color-as-ym-white);
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        padding: 0 .5rem;
    }
    .main-banner_area-right p {
        margin: 0;
        margin-top: 1rem;
    }
    .main-banner_area-right ul {
        margin-top: 1rem;
        padding-bottom: 5rem;
    }
    /*  */
    h2 {
        display: flex;
        flex-direction: column;
    }
    h2 span {
        width: fit-content;
        height: 220px;  
        display: flex;
        align-items: flex-end;
        box-shadow: var(--hover-shadow);
        position: relative;
        border-radius: 1rem;
        transition: all .5s ease-in-out;
    }
    h2 span:hover {
        cursor: pointer;  
        opacity: .8;      
    }
    h2 span:nth-child(1) {
        border-bottom-left-radius: 2.7rem;
        border-bottom-right-radius: 7px;
        z-index: 2;
    }
    h2 span:nth-child(2) {
        margin-left: 3.2rem;
        margin-top: -2rem;
        margin-bottom: -2rem;
        z-index: 1;
    }
    h2 span:nth-child(3) {
        margin-left: 1rem;
        width: 400px;
    }
    /*  */
    /* APP ICON wrapper */
    .main-banner_icon-wrapper {
        /* background-color: blue; */
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .icon_el {
        width: 32px;
        height: 32px;
        /* background-color: red; */
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon_el img {
        width: 100%;
        height: 100%;
    }
    .main-banner_area-right {
        grid-area: right; 
        text-align: right;
    }
    .main-banner_area-right h1 {
        font-size: 4rem;
    }
    .main-banner_area-right h1 span {
        color :var(--color-as-ym-white);
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        padding: 0 .5rem;
    }
    .main-banner_area-right p {
        margin: 0;
        margin-top: 1rem;
    }
    .main-banner_area-right ul {
        margin-top: 1rem;
        padding-bottom: 5rem;
    }
}
@media screen and (min-width: 1200px) {
    .container-inside {
        margin-top: 0!important;
        margin-bottom: 0!important;
        padding-top: 3rem;
    }
    /* MAIN BANNER */
    .main-banner_container {
        padding-top: 1rem;
        padding-bottom: 3rem;
    }
    .main-banner_wrapper {
        padding: 0 2rem;
        margin-top: 4.5rem;
        /* background-color: red; */
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        justify-content: space-between;
        grid-template-areas: 
        "mark mark"
        "left right"
        ;
    }
    /*  */
    h2 {
        display: flex;
        flex-direction: column;
    }
    h2 span {
        width: fit-content;
        height: 220px;  
        display: flex;
        align-items: flex-end;
        box-shadow: var(--hover-shadow);
        position: relative;
        border-radius: 1rem;
        transition: all .5s ease-in-out;
    }
    h2 span:hover {
        cursor: pointer;  
        opacity: .8;      
    }
    /* h2 span:hover:before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        background-color: gray;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        opacity: 0.5;
    } */
    h2 span:nth-child(1) {
        border-bottom-left-radius: 2.7rem;
        border-bottom-right-radius: 7px;
        z-index: 2;
    }
    h2 span:nth-child(2) {
        margin-left: 3.2rem;
        margin-top: -2rem;
        margin-bottom: -2rem;
        z-index: 1;
    }
    h2 span:nth-child(3) {
        margin-left: 1rem;
        width: 400px;
    }

    /*  */
    /* APP ICON wrapper */
    .main-banner_icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .icon_el {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon_el img {
        width: 100%;
        height: 100%;
    }
    .main-banner_area-right {
        grid-area: right; 
        text-align: right;
        /* margin-right: 7rem; */
    }
    .main-banner_area-right h1 {
        font-size: 4rem;
    }
    .main-banner_area-right h1 span {
        color :var(--color-as-ym-white);
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        padding: 0 .5rem;
    }
    .main-banner_area-right p {
        margin: 0;
        margin-top: 1rem;
    }
    .main-banner_area-right ul {
        margin-top: 1rem;
        padding-bottom: 5rem;
    }
    /* .main-banner_area-right a {
        margin-top: 5rem!important;
    } */
}
</style>