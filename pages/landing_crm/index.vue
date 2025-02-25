<template>
    <Container>

        <!-- TITLE PAGE SECTION -->
        <div class="show-max-767" style="margin-bottom: 0.5rem;">
            <BreadCrumbs/>
            <h1 style="margin: 0;">conspirators.CRM</h1> 
        </div>

        <div class="main-banner_container">

            <div class="main-banner_wrapper">

                <h2 style="color: var(--color-btn-text);">Прокачай осознанность в финансах</h2>
    
                <div class="main-banner_subtitle">
                    <p style="font-size: .8rem; font-weight: normal; color: var(--color-global-text_second);">Формируй привычки вместе с conspirators.CRM</p>
                    <Button v-if="useAuthStore().loggedIn !== true" type="pseudo-btn" link="/login" bg="bg-stroke" :disabled="false">Войти</Button>
                </div>
            </div>
        </div>

        <ul class="article-list_wrapper" style="margin-top: 1rem;">
            <li>
                <Button type="pseudo-btn" link="/help">Что умеет CRM?</Button>
            </li>
            <li>
                <Button type="pseudo-btn" link="#anchor_blocks">Блоки</Button>
            </li>
            <li>
                <Button type="pseudo-btn" link="#anchor_starts">С чего начать</Button>
            </li>
        </ul>

        <div id="anchor_blocks" class="articles_container">
            <h3>CRM: block</h3>
            <div class="blocks_wrapper">
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
                    <p style="margin: 0;">Сад (Огород)</p>
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

        <div id="anchor_starts" style="margin-top: 1rem;" class="articles_container">
            <h3>CRM: for what</h3>
            <p style="background-color: var(--color-btn-hover-bg); color: var(--color-btn-bg); padding: 1rem; border-radius: 1rem;">Знания - как опора жизни. Записывай - это не требует много усилий, достаточно уделять несколько минут в день. Контроль финансов для понимания привычек, целей и задач. Обладай всей картиной дел.</p>
            <ul style="list-style: none; padding: 0; ">
                <li>        
                    <div style="background-color: var(--color-global-text); width: 100%; height: 100px;">

                    </div>
                    <h4>Финансовая грамотность</h4>
                    <p>Помогает увидеть реальное положение дел. Потоки собственных финансов и инввевстиционные средства, вложенные в различные инструменты. Наличие или отсутствие долговых средств. Записи помогают видеть траты и доходы по категориям, распределять их по бандам и быть в курсе изменений в фондах. Давайте вместе погружаться в мир инвестиций</p>
                    <ul>
                        <li>Учимся инвестировать</li>
                        <li>Магия сложного процента</li>
                    </ul>
                </li>
                <li>
                    <h4>Самоконтроль</h4>
                    <p>Анализ своих привычек, выяввление основных трат. Запись доходов и расходов помогают планировать будущие инвестиции и траты.</p>
                    <ul>
                        <li>Контроль еженедельных взносов</li>
                        <li>Анализ данных</li>
                    </ul>
                </li>
                <li>
                    <h4>Высвобождение памяти</h4>
                    <p>Фиксация заявок и задач, запись их выполнения - отличныйы способ высвободить как время от контроля других участников банд, так и памят от постоянных попыток контролировать выполнения и оплаты по проектам</p>
                    <ul>
                        <li>Записывай все транзакции</li>
                        <li>Следи за развитием проектов</li>
                        <li>Контролируй работу с ресурсами</li>
                    </ul>
                </li>
            </ul>
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
        height: 200px;
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

    @media screen and (max-width: 575px) {

        .show-max-767 {
            display: none;
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
        .blocks_wrapper > div {
            display: flex;
            flex-direction: column;
            border-radius: .8rem;
            align-items: center;
            padding: 1rem;
            justify-content: center;
            color: var(--color-btn-bg);
            background-color: var(--color-btn-hover-bg);
        }
        .blocks_wrapper > div > p {
            font-size: .8rem;
            color: var(--color-btn-bg);
        }
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
        .show-max-767 {
            display: none;
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
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {

    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
        .main-banner_wrapper h2 {
            width: 50%;
            line-height: 150%;
        }
        .main-banner_subtitle {
            text-align: right;
        }
    }
    @media screen and (min-width: 992px) and (max-width: 1199px) {
        .main-banner_wrapper {
            gap: 5rem;
        }
        .main-banner_subtitle {
            text-align: right;
        }
    }
    @media screen and (min-width: 1200px) {
        .main-banner_wrapper {
            gap: 5rem;
        }
        .main-banner_subtitle {
            text-align: right;
        }
    }
</style>