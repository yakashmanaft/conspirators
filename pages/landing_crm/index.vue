<template>

<!--  -->
    <Container>

        <!-- TITLE PAGE SECTION -->
        <div class="show-max-767 title-page-section" style="margin-bottom: 0.5rem;">
            <BreadCrumbs/>
            <h1 style="margin: 0;">conspirators.CRM</h1> 
        </div>

        <!--  -->
        <div class="header-banner_wrapper" style="position: relative; display: flex; align-items: center;">

            <div class="header-banner_art" style="position: absolute; top: 0; width: 50%; height: 100%; background-color: var(--color-operation-type-donation); z-index: -1;">

            </div>

            <div>
                <h2 style="font-size: 3rem; font-weight: bold; margin: 0; padding-top: 1rem;">Десять минут в день</h2>
                <p style="color: var(--color-global-text_second);">Достаточно для того, чтобы быть в курсе дел и финансов</p>
            </div>
            <!-- <p style="font-size: 2rem; font-weight: bold; margin: 0; padding-top: 1rem;">Фиксируй</p>
            <p style="color: var(--color-global-text_second); margin: 0;">Не требует много усилий, достаточно уделять несколько минут в день</p> -->
            <!-- <p style="font-size: 2rem; font-weight: bold; margin: 0;">Контролируй</p>
            <p style="color: var(--color-global-text_second); margin: 0;">Все финансы для понимания привычек, целей и задач в одном месте</p>
            <p style="font-size: 2rem; font-weight: bold; margin: 0;">Владей</p>
            <p style="color: var(--color-global-text_second); margin: 0; padding-bottom: 2rem;">Полной картиной о состоянии текущих и запланированных дел</p> -->
        </div>
    
    </Container>


    <!--  -->
    <div class="main-banner_container" style="margin-top: -5rem; margin-bottom: -3rem;">

        <div class="main-banner_wrapper">

            <h2 style="color: var(--color-btn-text);">Прокачай осознанность в финансах</h2>

            <div class="main-banner_subtitle">
                <p style="font-size: .8rem; font-weight: normal; color: var(--color-global-text_second);">Формируй привычки вместе с conspirators</p>
                <Button style="margin-top: 2rem;" v-if="useAuthStore().loggedIn !== true" type="pseudo-btn" link="/login" bg="bg-stroke" :disabled="false">Войти</Button>
                <div v-else @click="$router.push(`/wallet`)" style="cursor: pointer;">
                    <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-text)"/>
                </div>
            </div>
        </div>
    </div>

    <!--  -->
    <Container>


        <!--  -->
        <div style="margin-top: 1rem;" class="value_wrapper">
            <h3>Чем полезен conspirator.CRM</h3>
            <div id="value-block">
                <div>        
                    <h4>Финансовая грамотность</h4>
                    <p class="value_tag">Статья</p>
                    <p>Помогает увидеть реальное положение дел. Потоки собственных финансов и инввевстиционные средства, вложенные в различные инструменты. Наличие или отсутствие долговых средств. Записи помогают видеть траты и доходы по категориям, распределять их по бандам и быть в курсе изменений в фондах. Давайте вместе погружаться в мир инвестиций</p>
                    <ul>
                        <li>Учимся инвестировать</li>
                        <li>Магия сложного процента</li>
                    </ul>
                    <div class="value_btn" @click="$router.push(`/journal`)">
                        <div style="background-color: var(--color-wallet-fund-debt-wo); width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 100%;">
                            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-text)"/>
                        </div>
                        <p style="color: var(--color-btn-text); margin: 0; font-size: .8rem;">Читать</p>
                    </div>
                </div>
                <div>
                    <h4>Самоконтроль</h4>
                    <p class="value_tag">База знаний</p>
                    <p>Анализ своих привычек, выяввление основных трат. Запись доходов и расходов помогают планировать будущие инвестиции и траты.</p>
                    <ul>
                        <li>Контроль еженедельных взносов</li>
                        <li>Анализ данных</li>
                    </ul>
                    <div class="value_btn" @click="$router.push(`/help`)">
                        <div style="background-color: var(--color-wallet-fund-debt-wo); width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 100%;">
                            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-text)"/>
                        </div>
                        <p style="color: var(--color-btn-text); margin: 0; font-size: .8rem;">Изучать</p>
                    </div>
                </div>
                <div>
                    <h4>Высвобождение памяти</h4>
                    <p class="value_tag">conspirator.CRM</p>
                    <p>Фиксация заявок и задач, запись их выполнения - отличныйы способ высвободить как время от контроля других участников банд, так и памят от постоянных попыток контролировать выполнения и оплаты по проектам</p>
                    <ul>
                        <li>Записывай все транзакции</li>
                        <li>Следи за развитием проектов</li>
                        <li>Контролируй работу с ресурсами</li>
                    </ul>
                    <div class="value_btn" @click="$router.push(`/login`)">
                        <div style="background-color: var(--color-wallet-fund-debt-wo); width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 100%;">
                            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-text)"/>
                        </div>
                        <p style="color: var(--color-btn-text); margin: 0; font-size: .8rem;">Войти</p>
                    </div>
                </div>
            </div>
        </div>

        <!--  -->
        <ul style="background-color: var(--color-global-text); margin: 1rem; border-radius: 1rem; padding:0; padding: 1rem; margin-top: 2rem; font-weight: 100;">
            <p style="color: var(--color-btn-text)">Подключай блоки, расширяй контроль финансового управления</p>
            <li  style="color: var(--color-btn-text);margin-left: 1rem;" @click="$router.push(`/help`)">Что умеет conspirators.CRM</li>
            <li style="color: var(--color-btn-text);margin-left: 1rem;" >Что умеет conspirators.CRM</li>
        </ul>

        <!--  -->
        <div class="articles_container" style="margin-top: 2rem;">
            <h3>Используй то, что тебе действительно требуется</h3>
            <div id="article-block" class="blocks_wrapper" style="margin-top: 2rem;">
                <div>
                    <Icon size="32px" name="material-symbols-light:calendar-month-outline"/>
                    <p style="margin: 0;">Календарь</p>
                </div>
                <div>
                    <Icon size="32px" name="material-symbols-light:event-note-outline-rounded"/>
                    <p style="margin: 0;">Гант</p>
                </div>
                <div>
                    <Icon size="32px" name="material-symbols-light:account-balance-wallet-outline"/>
                    <p style="margin: 0;">Кошелек</p>
                </div>
                <div>
                    <Icon size="32px" name="material-symbols-light:action-key-outline-rounded"/>
                    <p style="margin: 0;">Огород</p>
                </div>
                <div>
                    <Icon size="32px" name="material-symbols-light:folder-managed-outline-sharp"/>
                    <p style="margin: 0;">Проекты</p>
                </div>
                <div>
                    <Icon size="32px" name="material-symbols-light:group-outline-rounded"/>
                    <p style="margin: 0;">Контакты</p>
                </div>
                <div>
                    <Icon size="32px" name="material-symbols-light:personal-places-outline-rounded"/>
                    <p style="margin: 0;">Доска</p>
                </div>
                <div>
                    <Icon size="32px" name="material-symbols-light:warehouse-outline-rounded"/>
                    <p style="margin: 0;">Склад</p>
                </div>
            </div>
        </div>
    </Container>
</template>

<script lang="ts" setup>
    useHead({
        title: "conspirators.CRM",
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
    import { Button } from '@/components/button';
    import { BreadCrumbs } from '~/components/breadcrumbs';

    // PROPS
    const props = defineProps({
        auth_user_profile: {
            type: Object,
            default: {}
        },
    })

    // onMounted
    onMounted(() => {
        // на всякий случай сбрасываем фиксацию прокрутки страницы при открытой модалке...
        let body = document.getElementsByTagName('body')[0]
        body.style.margin = 'unset'
        body.style.height = 'unset'
        body.style.overflow = 'unset'

        //
        const scrollValueContainer = document.getElementById("value-block");
        const scrollArticlesContainer = document.getElementById("article-block");

        scrollValueContainer?.addEventListener("wheel", (evt) => {
            evt.preventDefault();
            scrollValueContainer.scrollLeft += evt.deltaY;
        });

        scrollArticlesContainer?.addEventListener('wheel', (evt) => {
            evt.preventDefault()
            scrollArticlesContainer.scrollLeft += evt.deltaY
        })
    })

</script>

<style scoped>

    .article-list_wrapper {

    }
    .article-list_wrapper li::marker {
        color: var(--color-btn-wo-bg);
    }

    .main-banner_container {
        background-color: var(--color-global-text);
        width: 100%; 
        position: relative;
    }
    .main-banner_wrapper {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    /*  */
    .articles_container > ul > li{
        margin-top: 1rem;
        border: 1px solid black;
        border-radius: 1rem;
        overflow: hidden;
        padding-bottom: 1rem;
    }
    .articles_container > ul > li > h4,
    .articles_container > ul > li > p,
    .articles_container > ul > li > ul {
        margin: 0 1rem;
        margin-top: 1rem;
    }

    /*  */
    .value_wrapper > div > div > .value_btn {
        cursor: pointer;
        width: fit-content
    }

    @media screen and (max-width: 575px) {

        .show-max-767 {
            display: none;
        }
        .main-banner_container {
            height: 300px;
            margin-top: -1rem!important;
        }
        .main-banner_wrapper {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
        .main-banner_wrapper h2 {
            text-align: center;
        }
        .main-banner_subtitle {
            text-align: center;
        }
        .articles_container {
            margin-left: 1rem;
            margin-right: 1rem;
        }
        /* blocks_wrapper */
        .blocks_wrapper {
            width: 100vw;
            margin-left: -1rem;
            margin-right: -1rem;
            padding-left: 1rem;
            padding-right: 1rem;
            display: flex;
            overflow-x: scroll;
            gap: 1rem;
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none; 
        }
        .blocks_wrapper::-webkit-scrollbar {
            display: none;
            -webkit-appearance: none;
            width: 0;
            height: 0;
        }
        .blocks_wrapper > div {
            height: 200px;
            min-width: 200px;
            display: flex;
            flex-direction: column;
            border-radius: .8rem;
            align-items: center;
            padding: .5rem;
            justify-content: center;
            color: var(--color-btn-bg);
            background-color: var(--color-btn-hover-bg);
        }
        .blocks_wrapper > div > p {
            font-size: .8rem;
            color: var(--color-btn-bg);
        }

        /*  */
        .value_wrapper {
            margin: 1rem;
        }
        .value_wrapper > div{
            margin-top: 2rem;
            width: 100vw;
            margin-left: -1rem;
            margin-right: -1rem;
            padding-left: 1rem;
            padding-right: 1rem;
            display: flex;
            overflow-x: scroll;
            gap: 1rem;
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none; 
        }

        .value_wrapper > div::-webkit-scrollbar {
            display: none;
            -webkit-appearance: none;
            width: 0;
            height: 0;
        }

        .value_wrapper > div > div{
            min-width: 300px;
            background-color: var(--color-operation-type-donation);
            border-radius: 1rem;
            padding: 1rem;
            position: relative; 
            padding-bottom: 4rem;
        }
        .value_wrapper > div > div > .value_tag {
            background-color: var(--color-wallet-fund-invested); 
            width: fit-content; 
            color: var(--color-btn-text); 
            font-size: .8rem; 
            border-radius: 1rem; 
            padding: 2px 8px;
        }
        .value_wrapper > div > div > ul {
            padding: 0;
            padding-left: 1rem
        }
        .value_wrapper > div > div > .value_btn {
            display: flex; 
            align-items: center; 
            gap: .5rem; 
            position: absolute; 
            bottom: 1rem; 
            left: 1rem;
            display: flex; 
            align-items: center; 
            gap: .5rem; 
            position: absolute; 
            bottom: 1rem; 
            left: 1rem;
            cursor: pointer;
        }
        /* 
         */
         .header-banner_wrapper {
            margin-left: 2.5rem;
            height: 320px; 
        }
        .header-banner_art {
            border-radius: 4.5rem 0 0 4.5rem;
            right: -2rem!important;
        }
        .header-banner_wrapper div p {
            margin: 0;
            margin-top: 1rem;
            width: 200px;
        }
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
        .show-max-767 {
            display: none;
        }
        .main-banner_container {
            height: 400px;
            margin-top: -1rem!important;
        }
        .main-banner_wrapper {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
        .main-banner_wrapper h2 {
            text-align: center;
        }
        .main-banner_subtitle {
            text-align: center;
        }
        .articles_container {
            margin-left: 1rem;
            margin-right: 1rem;
        }
        /* blocks_wrapper */
        .blocks_wrapper {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }
        /* 
         */
         .header-banner_wrapper {
            margin-left: 2.5rem;
            height: 400px; 
        }
        .header-banner_art {
            border-radius: 6rem;
            right: 1rem!important;
        }
        .header-banner_wrapper div p {
            margin: 0;
            margin-top: 1rem;
            width: 300px;
        }
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
        h1 {
            font-size: 1.5rem;
        }
        .main-banner_container {
            height: 400px;
            margin-top: 7rem!important;
        }
        .main-banner_wrapper {
            justify-content: flex-end;
            flex-direction: column;
        }
        .main-banner_wrapper h2 {
            /* width: 50%; */
            line-height: 150%;
            text-align: right;
        }
        .main-banner_subtitle {
            /* background-color: var(--color-btn-text); */
            /* height: 400px; */
            display: flex;
            gap: 2rem;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            /* padding: 1.5rem 2rem!important; */
            /* margin-right: 2rem; */
        }
        .main-banner_subtitle p {
            margin: 0;
            /* font-size: 1rem!important; */
        }
        .main-banner_subtitle div {
            margin-top: 1rem!important
        }
        /* 
         */
         .title-page-section {
            margin-left: 2.5rem;
         }
         .header-banner_wrapper {
            margin-left: 2.5rem;
            height: 400px; 
            margin-top: 5rem;
        }
        .header-banner_art {
            border-radius: 5rem;
            right: 2rem!important;
        }
        .header-banner_wrapper div p {
            margin: 0;
            margin-top: 1rem;
            width: 300px;
        }
    }
    @media screen and (min-width: 992px) and (max-width: 1199px) {
        .main-banner_container {
            height: 400px;
            margin-top: 1rem!important;
        }
        .main-banner_wrapper {
            gap: 5rem;
        }
        .main-banner_subtitle {
            /* background-color: var(--color-btn-text); */
            height: 400px;
            display: flex;
            /* gap: .5rem; */
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            padding: 1.5rem 2rem!important;
            margin-right: 2rem;
        }
        .main-banner_subtitle p {
            margin: 0;
            /* font-size: 1rem!important; */
        }
        .main-banner_subtitle div {
            margin-top: 1rem!important
        }
        /* 
         */
         .title-page-section {
            margin-left: 2rem;
         }
         .header-banner_wrapper {
            margin-left: 2.5rem;
            height: 500px; 
            margin-top: 3rem;
        }
        .header-banner_art {
            border-radius: 10rem;
            right: 1rem!important;
        }
        .header-banner_wrapper div h2 {
            font-size: 5rem!important;
        }
        .header-banner_wrapper div p {
            margin: 0;
            margin-top: 1rem;
            width: 450px;
            font-size: 1.5rem;
        }
    }
    @media screen and (min-width: 1200px) {
        .main-banner_container {
            height: 400px;
            margin-top: 0rem!important;
        }
        .main-banner_wrapper {
            gap: 5rem;
        }
        .main-banner_subtitle {
            /* background-color: var(--color-btn-text); */
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            padding: 1.5rem 2rem!important;
            margin-right: 2rem;
        }
        .main-banner_subtitle p {
            margin: 0;
            /* font-size: 1rem!important; */
        }
        .main-banner_subtitle div {
            margin-top: 1rem!important
        }
        /* 
         */
         .title-page-section {
            margin-left: 2.5rem;
         }
         .header-banner_wrapper {
            margin-left: 2.5rem;
            height: 600px; 
            margin-top: 3rem;
        }
        .header-banner_art {
            border-radius: 7rem;
            width: 300px!important;
            right: 1rem!important;
        }
        .header-banner_wrapper div h2 {
            font-size: 7rem!important
        }
        .header-banner_wrapper div p {
            margin: 0;
            margin-top: 1rem;
            font-size: 2rem;
            /* width: 650px; */
        }
    }
</style>