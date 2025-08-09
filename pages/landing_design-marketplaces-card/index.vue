<template>
    <!--  -->
      <Toast
        :id="`toast_${route.path}`"
        :duration="2000"
        title="Заявка отправлена"
        content="В ближайшее время порешаем свою рутину и займемся вами :)"
      />
    
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

                    <h1 style="margin: 0; font-weight: bold;">Готовим <br><span>карточки товаров </span><br><span style="padding: 0; font-size: 2rem; text-wrap: nowrap; background: unset; color: var(--color-global-text)">для маркетплейсов</span></h1> 
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

    <!-- PORTFOLIO -->
    <div style="background-color: var(--color-global-baackground_light);">

        <Container style="" class="container_portfolio">

            <!-- LEFT -->
            <!-- portfolio_chip -->
            <ul class="portfolio_chip">
    
                <li v-for="item in carousel_content">
                    <input 
                        :id="`item_${item.id}`" 
                        type="radio" 
                        :name="`carousel_content`" 
                        style="accent-color: #C56FFF;"
                        :value="`item_${item.id}`"
                        :checked="item.id === carousel_current_item.id"
                    >
                    <label 
                        :for="`item_${item.id}`"
                        @click="carousel_current_item = item"
                        :class="item.id === carousel_current_item.id ? 'current_portfolio_chip' : ''"
                    >
                        <!-- <div class="section_icon">
                            <Icon size="48px" name="hugeicons:direction-left-01"/>
                        </div> -->
                        <div style="width: 3rem; height: 3rem; border: 3px solid var(--color-wallet-fund-invested); border-radius: 1rem; opacity: .6">

                        </div>
                        <h3>{{ item.title }}</h3>
                    </label>
                </li>
    
            </ul>
    
            <!-- RIGHT -->
            <!-- portfolio_content -->
            <div class="portfolio_content">
                <div class="portfolio_content_img-container">
                    <img :src="img_computed" width="100%" height="100%" alt="Дизайн карточек товара для OZON/WILDBERRIES/Я.Маркет">
                     <!-- <div :style=""></div> -->
                </div>
                <h3>{{ carousel_current_item.title }}</h3>
                <p>{{ carousel_current_item.desc }}</p>
            </div>

        </Container>
        
        <!-- price_offer_container -->
        <div class="price_offer_container">

            <Container>

                <div class="price_offer_wrapper">
                    <div class="price_offer_el">
                        <p style="margin: 0;">Набор слайдов</p>
                        <p style="margin: 0;" class="price_offer_el-price"> 7 299,00 <span style="font-size: 2rem;">руб.</span></p>
                        <p style="margin: 0; color: var(--color-global-text_second)">Это 5 часов работы специалиста</p>
                        <div style="margin-top: 2rem;">

                            <a href="#start" style="padding: 16px 32px; background-color: var(--color-global-text); color: var(--color-btn-text); border-radius: 2rem;">Заказать</a>
                        </div>
                    </div>
                    <div class="price_offer_el">
                        <p style="margin: 0;" class="price_offer_el-price">1 500,00 <span style="font-size: 2rem;">руб. / час.</span></p>
                        <p style="margin: 0; color: var(--color-global-text_second);" class="price_offer_el-offer">Дополнительные слайды по ставке</p>
                    </div>
                </div>
            </Container>

        </div>
    </div>

    <!-- QIZZZ -->
    <Container class="container-inside" id="start">


        <!-- QUIZZZ -->
         <!-- chip -->
            <div class="chip_paragraph">
                <h3 
                    :class="currentParagraphChip === el.name ? 'paragraph-title_active' : ''" style="cursor: pointer;"
                    v-for="el in paragraphChipList">
                    <span @click="currentParagraphChip = el.name" style="white-space: nowrap;">{{ el.title }}</span>
                </h3>
            </div>

            <div class="chip_content_wrapper" >

                <!-- contact us -->
                <div v-if="currentParagraphChip === 'contact-us'" class="contact-us-content_container">

                    <form action="" id="contact-us_form">

                        <ul>
                            <!-- NAME -->
                            <li>
                                <label for="form_name">Как к вам обращаться?</label>
                                <input type="text"
                                    v-model="form_obj.customer_name"
                                    id="form_name"
                                    placeholder="Имя"
                                    autocomplete="name"
                                    class="form-control"
                                >
                            </li>
                            <!-- PHONE -->
                            <li class="contact-us_phone">
                                <label for="form_phone">Номер телефона</label>
                                <input 
                                    v-model="form_obj.customer_phone"
                                    id="form_phone" 
                                    type="text" 
                                    placeholder="+7( . . ."
                                    autocomplete="tel"
                                    v-maska=options
                                    class="form-control"
                                >
    
                                <p>Спишемся может в мессенджерах?</p>
                                <ul>
                                    <li>
                                        <input id="choose_mes_app_max" type="radio" name="preferred_communciation" v-model="form_obj.preferred_communciation" value="max">
                                        <label for="choose_mes_app_max">MAX</label>
                                    </li>
                                    <li>
        
                                        <input id="choose_mes_app_tg" type="radio" name="preferred_communciation" v-model="form_obj.preferred_communciation"  value="tg"checked>
                                        <label for="choose_mes_app_tg">TELEGRAM</label>
                                    </li>
                                    <li>
        
                                        <input id="choose_mes_app_vk" type="radio" name="preferred_communciation" v-model="form_obj.preferred_communciation" value="vk">
                                        <label for="choose_mes_app_vk">VK</label>
                                    </li>
                                    <li>
                                        <input id="choose_mes_app_no" type="radio" name="preferred_communciation" v-model="form_obj.preferred_communciation"  value="no" checked>
                                        <label for="choose_mes_app_no">Никакой</label>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <label for="form_email">Адрес эл.почты</label>
                                <input 
                                    id="form_email" 
                                    type="text" 
                                    placeholder="your@email.ru" 
                                    autocomplete="email" 
                                    class="form-control"
                                >
                            </li>
                            <li class="agreement_wrapper">
                                <input v-model="form_obj.customer_agreement" id="agreement" type="checkbox" checked>
                                <label for="agreement">
                                    <nuxt-link :to="'/policy'">Согласен c политикой конфиденциальности и на обработку персональных данных</nuxt-link>
                                </label>
                            </li>
                            <li style="margin-top: 2rem;">
                                <!-- sending -->
                                <p v-if="loadSubmit" class="contact-us-btn_sending">Отправка...</p>
                                <!-- w/o customer_name -->
                                <p v-else-if="form_obj.customer_name === ''" class="contact-us-btn_wrong">!Укажите имя</p>
                                <!-- w/o customer_phone -->
                                <p v-else-if="form_obj.customer_phone === ''" class="contact-us-btn_wrong">!Укажите телефон для связи</p>
                                <!-- w/o customer_agreement -->
                                <p v-else-if="form_obj.customer_agreement != true" class="contact-us-btn_wrong">Согласие на обработку обязательно!</p>
                                <!-- submit -->
                                <p v-else @click.prevent="submitForm('contact-us')" class="contact-us-btn_submit">Отправить</p>
                            </li>
                        </ul>
                    </form>

                    <div class="contact-us_tg">
                        <p style="margin-top: 1rem;">Не хотите ждать <br> обратного звонка?</p>
                        <p>Пишите нам в telegram</p>
                        <p><span><nuxt-link to="tg://resolve?domain=Kashmanaft">@Kashmanaft</nuxt-link></span></p>
                    </div>
                </div>

                <!-- specification-first content -->
                <div v-if="currentParagraphChip === 'specification-first'" class="specification-first-content_container">
                    <div v-if="!current_specification_step?.id">
                        <p>Придумываем как преподнести для вас анкету</p> 
                    </div>
                    <div v-else class="table-contents_wrapper">

                        <!-- OL table contents -->
                        <ol class="ol-step_wrapper" id="specification_step_container">
                            <li v-for="(group, idx) in [...new Set([...specification_step.map((obj: any) => {return obj.group})])]">
                                <h4>{{idx + 1}}. {{ group }}</h4>
                                <ol>
                                    <li v-for="(step, index) in specification_step.filter(el => el.group === group)" @click="current_specification_step = step">
                                        <label 
                                            :class="step === current_specification_step ? 'checked_input' : ''"
                                            :for="`${group}_${index}`"
                                            style="white-space: nowrap;"
                                        >
                                            {{ idx + 1 }}. {{ index + 1 }}. {{ step.name }}
                                        </label>
                                        <input 
                                            type="radio" 
                                            :id="`${group}_${index}`" v-model="current_specification_step"
                                            :checked="step === current_specification_step"
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

                                <br>
                                <div v-if="specification_step_content">

                                    <div v-for="el in specification_step_content.filter(el => el.specification_step_id === current_specification_step.id)">

                                        <p>{{ el.title }}</p>
                                        <p>{{ el.text }}</p>
                                    </div>
                                </div>
                                <br>
                                <label for="">Заказчик</label>
                                <input type="text" placeholder="Как к вам обращаться">

                                <div>
                                    <ul>
                                        <li>
                                            1. Отрисовка эскиза . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7 500,00
                                        </li>
                                    </ul>
                                </div>
                            </form>
                            <div class="step_prev_next_container">

                                <div class="step_prev_next_wrapper">
                                    <div 
                                        class="step_prev_next_el" 
                                        :class="specification_step[0].id === current_specification_step.id ? 'step_prev_next_el-disabled' : ''" @click="step_func(current_specification_step.id, 'prev')">
                                        <
                                    </div>
                                    <!-- <div class="step_prev_next_el">
                                        |
                                    </div> -->
                                    <div 
                                        class="step_prev_next_el" 
                                        :class="specification_step[specification_step.length - 1].id ===  current_specification_step.id ? 'step_prev_next_el-disabled' : ''"
                                        @click="step_func(current_specification_step.id, 'next')">
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- choose-pattern content -->
                <div v-if="currentParagraphChip === 'choose-pattern'" class="choose-pattern-content_container">

                    <h4 style="color :var(--color-urgency-high);">Раздел шаблонов в разработке</h4>
                    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ore nulla aut suscipit placeat? Deleniti, error. Rem nisi dolor soluta uaerat voluptatibus fuga? Eius, ipsum, ea, quidem provident commodi cupiditate beatae quos obcaecati repellendus ipsa dolores natus esse sed voluptas reprehenderit assumenda temporibus ad consequuntur velit repellat labore. Fugit ex officiis sed, quam numquam aliquid neque excepturi iure mollitia ut, quibusdam at dolores, repellat nemo!</p>

                    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ore nulla aut suscipit placeat? Deleniti, error. Rem nisi dolor soluta uaerat voluptatibus fuga? Eius, ipsum, ea, quidem provident commodi cupiditate beatae quos obcaecati repellendus ipsa dolores natus esse sed voluptas reprehenderit assumenda temporibus ad consequuntur velit repellat labore. Fugit ex officiis sed, quam numquam aliquid neque excepturi iure mollitia ut, quibusdam at dolores, repellat nemo!</p>

                    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ore nulla aut suscipit placeat? Deleniti, error. Rem nisi dolor soluta uaerat voluptatibus fuga? Eius, ipsum, ea, quidem provident commodi cupiditate beatae quos obcaecati repellendus ipsa dolores natus esse sed voluptas reprehenderit assumenda temporibus ad consequuntur velit repellat labore. Fugit ex officiis sed, quam numquam aliquid neque excepturi iure mollitia ut, quibusdam at dolores, repellat nemo!</p>

                </div>

                <!-- check-status -->
                <div v-if="currentParagraphChip === 'check-status'" class="check-status-content_container">
                    <h4 style="color :var(--color-urgency-high);">Проверка статус заказа в разработке</h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate exercitationem distinctio minus? Odio dignissimos error eius minima veritatis natus, maiores asperiores aspernatur vel ipsa consectetur voluptates laboriosam et quidem cupiditate, itaque praesentium placeat sint repellat tempora eaque minus! Iure incidunt hic quidem, sunt suscipit ab praesentium. Repellat quisquam quo id a nesciunt, quos, ex dolore excepturi repellendus debitis blanditiis ipsum porro deleniti ut vitae ea facere enim deserunt sit reiciendis exercitationem molestias, expedita modi. Ullam obcaecati maxime consequatur numquam quo iste maiores laboriosam assumenda, veniam possimus adipisci. Aspernatur molestias culpa esse vitae iure voluptatum ratione repudiandae, reprehenderit dicta, aliquam explicabo saepe assumenda aperiam molestiae rem, voluptatem sequi? Iusto eos quos ut accusamus, dolores debitis quod nulla et maiores veritatis rerum amet doloribus quia rem neque deserunt praesentium beatae, asperiores deleniti reprehenderit provident velit. Nemo porro accusamus explicabo itaque doloremque, voluptatem ratione, maiores quam praesentium dolorum ea vitae fuga suscipit corporis quas ipsum fugiat omnis perferendis alias. Soluta atque earum ipsa esse tempora sequi alias inventore odit hic. Omnis expedita eum a doloribus saepe nostrum, suscipit quis earum exercitationem, iure distinctio alias nisi repellat culpa? Iste quasi numquam beatae ipsam veniam sed animi sint blanditiis molestiae? Veniam id voluptatem consequatur quaerat!</p>
                </div>
            </div>

            <!-- {{ form_obj }} -->
        
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
        meta: [
            {
                name: 'description', content: 'Рисуем карточки товаров для маркетплейсов: OZON, WILDBERRIES, Яндекс. Маркет'
            }
        ],
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
        ],
    })

    // shared
    import { Container } from '@/shared/container'

    // components
    import { Toast } from '@/components/toast'
    // import { Button } from '@/components/button';

    // Utils
    import { vMaska } from 'maska/vue'

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

    // CONST
    //
    // route
    const route = useRoute()
    //= paragraphChipList
    const paragraphChipList = ref([
        {
            name: 'contact-us', 
            title: 'Связаться с нами'
        },
        {
            name: 'specification-first', 
            title: 'Создать ТЗ вместе'
        },
        {
            name: 'choose-pattern', 
            title: 'Выбрать готовый шаблон'
        },
        {
            name: 'check-status', 
            title: 'Проверить статус'
        }
    ])
    //= slides carousel
    const carousel_content = ref([
        {
            id: 1,
            title: 'Самый первый',
            desc: 'Первое о продукте, что видит пользователь на маркетплейсе или вашем собственном web-ресурсе',
            img: '01_1'
        },
        {
            id: 2,
            title: 'Характеристики',
            desc: 'Более детальная информация о Вашем продукте',
            img: '02_1'
        },
        {
            id: 3,
            title: 'Еще характеристики',
            desc: 'Можно добавить еще характеристик о Вашем продукте',
            img: '03_1'
        },
        {
            id: 4,
            title: 'Выгоды',
            desc: 'То, что получает конечным пользваотель от вашего продукта',
            img: '05_1'
        },
        {
            id: 5,
            title: 'Инструкция к применению',
            desc: 'Описываем каким образов или с какими материалами работает продукт',
            img: '04_1'
        },
       {
            id: 6,
            title: 'Дополнительные слайды',
            desc: 'Это могут быть повторения слоганов или просто галерея с фото продукта в разных ракурсах - увеличиваем запоминаемость о продукте',
            img: '06_1'
        },
       {
            id: 7,
            title: 'Еще преимущества',
            desc: 'Как точка в предложении продукта',
            // img: '07_1'
            img: '07_1'
        }
    ])
    const carousel_current_item = ref(carousel_content.value[0])

    import img_01_1 from '~/assets/img/cards_project_1/01_1.webp'
    import img_02_1 from '~/assets/img/cards_project_1/02_1.webp'
    import img_03_1 from '~/assets/img/cards_project_1/03_1.webp'
    import img_04_1 from '~/assets/img/cards_project_1/04_1.webp'
    import img_05_1 from '~/assets/img/cards_project_1/05_1.webp'
    import img_06_1 from '~/assets/img/cards_project_1/06_1.webp'
    import img_07_1 from '~/assets/img/cards_project_1/07_1.webp'

    const img_computed = computed(() => {

        switch(carousel_current_item.value.id) {
            case 1:
                return img_01_1
            case 2:
                return img_02_1
            case 3:
                return img_03_1
            case 4: 
                return img_05_1
            case 5: 
                return img_04_1
            case 6: 
                return img_06_1
            case 7: 
                return img_07_1
        }
    })
    //= currentParagraphChip
    const currentParagraphChip = ref('contact-us')
    //= content by paragraph
    const specification_step = ref([
        {
            id: 1,
            group: 'Условия',
            name: 'Предмет договора',
        },
        {
            id: 2,
            group: 'Условия',
            name: 'Стороны и контакты'
        },
        {
            id: 3,
            group: 'ТЗ',
            name: 'Продукт'
        },
        {
            id: 4,
            group: 'ТЗ',
            name: 'Площадки'
        },
        {
            id: 5,
            group: 'ТЗ',
            name: 'Артикул и прочие пометки'
        },
        {
            id: 6,
            group: 'ТЗ',
            name: 'Описание и характеристики'
        },
        {
            id: 7,
            group: 'ТЗ',
            name: 'Что вас привлекает'
        },
        {
            id: 8,
            group: 'ТЗ',
            name: 'Фото и другие исходники'
        },
        {
            id: 9,
            group: 'Итого',
            name: 'Заказ'
        },
        {
            id: 10,
            group: 'Итого',
            name: 'Оплата'
        },
    ])
    //= specification_step
    const current_specification_step = ref(specification_step?.value ? specification_step.value[0] : null)

    //= specification_step_content
    const specification_step_content = ref([
        {
            specification_step_id: 1,
            title: 'Отрисовка эскиза',
            text: 'Для 1 (Одного) уникального товара, при наличии исходных фото (несколько ракурсов): карточка товара с 5 (Пятью) слайдами (1.Титульный, 2.Характеристики, 3.Применение, 4.Фото + описание, 5. Фото + описание). Заявка на выполнение работ попадает в график специалиста только после оплаты. Отрисованный эскиз вы получаете не позднее 7(Семи) рабочих дней с момента получения оплаты исполнителем.'
        },
        {
            specification_step_id: 1,
            title: 'Условия оплаты',
            text: '7 500,00 (5 часов работы специалиста, ставка - 1 500,00 (Тысяча пятьсот рублей 00 копеек) в час. Оплата производится любыми указанными в пункте 3.2. способами.',
        },
        {
            specification_step_id: 1,
            title: 'Дополнительные слайды к карточке товара',
            text: 'Каждый дополнительный слайд является доработкой эскиза, отрисовывается согласно разработанному к нему ТЗ по ставке, аналогичной ставке отрисовки эскиза  - 1 500,00.'
        },
        {
            specification_step_id: 1,
            title: 'Доработки / правки',
            text: 'Доработки и правки к выполненному эскизу отрисовываются согласно разработанному к нему ТЗ (по сути, в данном случае список хотелок к изменению разработанного эскиза) по ставке, аналогичной ставке отрисовки эскиза  - 1 500,00'
        },
        {
            specification_step_id: 1,
            title: 'Примечание 1',
            text: 'Выполнение работы согласно загруженности специалиста (Другими словами, оплата работ по отрисовке эскиза не гарантирует, что через 5 часов после оплаты заказа у вас на руках окажутся эскизы, оплата гарантирует выполнение специалистом работ и получение эскиза).',
        },
        {
            specification_step_id: 1,
            title: 'Примечание 2',
            text: 'Доработки, правки, дополнительные слайды и другое, выполняются согласно загруженности специалиста, аналогично примечанию 1 и только после осуществления работ по отрисовке эскиза',
        },
        {
            specification_step_id: 1,
            title: 'Примечание 3',
            text: 'Эскиз является самостоятельным элементом визуальной составляющей вашего продукта / услуги и может сразу использовать на площадках (маркетплейсы или ваш сайт)',
        },
        // //
        // {
        //     specification_step_id: 9,
        //     title: 'Отрисовка эскиза',
        //     text: '7 500,00 (5 часов работы специалиста, ставка - 1 500,00 (Тысяча пятьсот рублей 00 копеек) в час',
        // }
    ])

    // FORM DATA CONST

    const options = { mask: '+7(###)###-##-##' };
    // TYPES
    type FormObj = {
        customer_id: number | null,
        customer_name: string,
        customer_type: string,
        customer_email: string,
        customer_phone: string,
        preferred_communciation: string,
        executor_id: number | null,
        executor_type: string,
        executor: string,
        landing_id: number | null,
        mark: string,
        customer_agreement: boolean
    }
    //= form_obj
    const form_obj = ref<FormObj>({
        customer_id: null,
        customer_name: '',
        customer_type: 'ФЛ',
        customer_email: 'Не указан',
        customer_phone: '',
        preferred_communciation: 'no',
        executor_id: 6,
        executor_type: 'conspirator',
        executor: 'noname',
        landing_id: null,
        mark: '',
        customer_agreement: true
    })
    // VARIABLES
    const loadSubmit = ref(false)
    

    // 
    onMounted(() => {
        // specification_step_container
        const specificationStepContainer = document.getElementById('specification_step_container');

        specificationStepContainer?.addEventListener('wheel', (e) => {
            e.preventDefault();
            specificationStepContainer.scrollLeft += e.deltaY;
        })

        let body = document.getElementsByTagName('body')[0]
        body.style.margin = 'unset'
        body.style.height = 'unset'
        body.style.overflow = 'unset'
    })

    // FUNCs
    // const step_next_func = (current_id: number) => {

    //     if(specification_step.value[specification_step.value.length - 1].id === +current_id) {
    //         alert ('Это последний шаг :)')
    //     } else {

    //         current_specification_step.value = specification_step.value.find(el => el.id === current_id + 1)
    //         document.getElementById('specification_step_container').scrollIntoView();
    //     }
    // }
    // const step_prev_func = (current_id: number) => {
    //     if(specification_step.value[0].id === +current_id) {
    //         alert ('Это первый шаг же только куда... :)')
    //     } else {
    //         current_specification_step.value = specification_step.value.find(el => el.id === current_id - 1)
    //         document.getElementById('specification_step_container').scrollIntoView();
    //     }
    // }

    const step_func = (current_id: number, type: string) => {
        if(type === 'next') {
            if(specification_step.value[specification_step.value.length - 1].id === +current_id) {
                alert ('Это последний шаг :)')
            } else {
                document.getElementById('start')?.scrollIntoView();
                current_specification_step.value = specification_step.value.find(el => el.id === current_id + 1)
            }
        }
        else if (type === 'prev') {
            if(specification_step.value[0].id === +current_id) {
                alert ('Это первый шаг же только куда... :)')
            } else {
                document.getElementById('start')?.scrollIntoView();
                current_specification_step.value = specification_step.value.find(el => el.id === current_id - 1)
            }
        }
    }

    // current_landing_id
    // 
    const current_landing_id = () => {

        let current_landing_name = route.path.split('/', 2)[1]

        let current_landing_id = landing_list?.value?.filter((item: any) => {
            if(item.name === current_landing_name) {
                return item
            }
        })

        if(current_landing_id) {
            return current_landing_id[0].id
        } else {

            return null
        }
    }

    // submitForm contact US
    //
    const submitForm = async (mark: string) => {

        // 
        form_obj.value.landing_id = current_landing_id()
        form_obj.value.mark = mark
        // 
        await addLeadToBD(form_obj.value)
        //
        // Сбрасываем значения в форме
        form_obj.value = {
            customer_id: null,
            customer_name: '',
            customer_type: 'ФЛ',
            customer_email: 'Не указан',
            customer_phone: '',
            preferred_communciation: 'no',
            executor_id: 6,
            executor_type: 'conspirator',
            executor: 'noname',
            landing_id: null,
            mark: '',
            customer_agreement: true
        }
    }
    // test send
    //
    const mail = useMail()
    const testSend = async (item: FormObj) => {
        await mail.send({
            from: '<ya.kashmanaft@gmail.com>', // Всегда такой будет
            // from: `<${item.customer_email}>`,
            to: '<ya.kashmanaft@gmail.com>', // dont work at me
            subject: 'Конспиратор, тебе заявка!',
            html: `
                <b>Откуда: </b>
                <p><a href='conspirators.su/${route.path}'>${route.path}</a></p>
                <b>Имя: </b>
                <p>${item.customer_name}</p>
                <b>Телефон: </b>
                <p><a href='tel:${item.customer_phone}'>${item.customer_phone}</a></p>   
                <p>Списаться в мессенджере: ${item.preferred_communciation}</p>
                <b>Эл. почта: </b>
                <p><a href="mailto:${item.customer_email}">${item.customer_email}</a></p>
            `
        })
    }

    // addLeadToBD contact US
    //
    const addLeadToBD = async (item: FormObj) => {

        // Создаем пустой объект для БД заявок
        let addedItem = null

        // Наполняем объект
        addedItem = await $fetch("/api/lead/lead", {
            method: 'POST',
            body: {
                name: item.customer_name,
                email: item.customer_email,
                mobile: item.customer_phone,
                landingId: item.landing_id,
                status: 'lead',
                urgency: 'high'
            }
        })

        // Запускаем заглушку
        loadSubmit.value = true

        // Отправляем письмо
        await testSend(item)

        
        // показываем toast
        let toast = document.getElementById(`toast_${route.path}`)
        if(toast) {
            toast.style.display = 'block'

            setTimeout(() => {
                toast.style.display = 'none'
            }, 5000)
        }
        // Отключаем заглушку
        loadSubmit.value = false
    }

    // testSend


    // DB
    // 
    //= landing_list
    const { data: landing_list } = useFetch("/api/landing/landing", {
        lazy: false,
        transform: (landing_list) => {
            return landing_list
        }
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
    max-width: 100vw!important;
    /* width: 100%; */
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
    border-radius: 1rem;
    /* background-color: var(--color-wallet-fund-available-wo); */
    background-color: var(--color-global-text)
}
.paragraph-title_active span {
    /* color: var(--color-wallet-fund-available-wo); */
    color: var(--color-global-text);
    font-weight: bold;
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
.step_prev_next_el {
    background-color: var(--color-wallet-fund-invested);
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-btn-text);
    font-size: 1rem;
    font-weight: normal;
    transition: all .3s ease-in-out;
} 
.step_prev_next_el:hover {
    cursor: pointer;
    background-color: var(--color-btn-bg)
}
.step_prev_next_el-disabled {
    color: var(--color-global-text_second);
    border: 1px solid var(--color-global-text_second);
    background-color: unset;
    opacity: .3;
}

@media screen and (max-width: 575px) {
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
        line-height: 4rem;
    }
    .main-banner_area-right h1 span {
        color :var(--color-as-ym-white);
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        padding: 0 .5rem;
    }
    .main-banner_area-right p {
        margin: 0;
        margin-top: -.2rem;
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
        transition: all .2s ease-in-out;
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
        width: 180px;
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
        margin-top: 1.5rem!important;
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

    /* 
        chip_paragraph
    */
    .chip_paragraph {
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 3rem!important;
        border-bottom: unset;
    }
    /* 
        Связаться с нами 
    */
    .contact-us-content_container {
        margin: 1rem;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .contact-us-content_container form {
        background-color: var(--color-global-baackground_light);
        border-radius: 2rem;
        padding: 1rem;
    }
    .contact-us-content_container form ul {
        list-style: none;
        padding: 0;
    }
    .contact-us-content_container form ul li,
    .contact-us-content_container form ul li input {
        margin-top: .5rem;
    }
    .contact-us-content_container form ul li label {
        color: var(--color-global-text_second);
        font-size: .8rem;
        margin-left: .5rem;
    }
    /* contact-us_phone */
    .contact-us_phone p {
        margin: 0;
        margin-left: .5rem;
        margin-top: 1rem;
        color: var(--color-global-text_second);
        font-size: .8rem;
    }
    .contact-us_phone ul {
        margin-top: .5rem;
        display: flex;
        gap: 1rem;
        border: 1px solid var(--bs-border-color);
        border-radius: var(--bs-border-radius);
        padding: .5rem!important;
        flex-wrap: wrap;
    }
    .contact-us_phone ul li {
        margin: 0!important;
        display: flex;
    }
    .contact-us_phone ul li input {
        margin: 0!important;
    }
    .contact-us_phone ul li label {
        color: var(--color-global-text)!important;
        margin-left: .3rem;
    }
    .contact-us_phone ul li input,
    .contact-us_phone ul li label:hover {
        cursor: pointer;
    }
    /* agreement_wrapper */
    .agreement_wrapper {
        display: flex;
        align-items: flex-start;
        gap: .5rem;
        margin-left: .5rem;
        /* max-width: 500px; */
    }
    .agreement_wrapper > input {
        margin-top: .2rem!important;
    }
    .agreement_wrapper > label {
        margin: 0!important;
    }
    /* contact-us-btn_submit */
    .contact-us-btn_submit,
    .contact-us-btn_wrong,
    .contact-us-btn_sending {
        /* width: fit-content; */
        padding: 1rem;
        text-align: center;
    }
    .contact-us-btn_submit {
        background-color: var(--color-global-text);
        color: var(--color-btn-text);
        border-radius: 2rem;
        transition: all .3s ease-in-out;
    }
    .contact-us-btn_submit:hover {
        cursor: pointer;
        color: var(--color-btn-wo-bg)
    }
    .contact-us-btn_sending {
    }
    .contact-us-btn_wrong {
        color: var(--color-urgency-high);
    }
    /* contact-us_tg */
    .contact-us_tg {
        height: fit-content;
        border-radius: 2rem;
        padding: 1rem 0;
        padding-bottom: 2rem;
        background-color: var(--color-wallet-fund-invested);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .contact-us_tg p{
        color: var(--color-btn-text);
    }
    .contact-us_tg p:first-child {
        margin-bottom: 3rem;
        font-weight: bold;
        font-size: 1.5rem;
        text-align: center;
    }
    .contact-us_tg p:last-child {
        margin-top: 1rem;
    }
    .contact-us_tg p span a {
        background-color: var(--color-global-text);
        color: var(--color-btn-text);
        padding: 1rem;
        border-radius: 2rem;
    }

    /* 
        Создать ТЗ ВМЕСТЕ
    */
    .table-contents_wrapper{
        display: flex;
        flex-direction: column;
        margin-top: .5rem;
    }
    .ol_content {
        margin-right: 1rem;
        margin-left: 1rem;
        margin-top: 1rem;
        padding: 2rem 1rem;
        background-color: var(--color-global-baackground_light);
        border-radius: 2rem;
    }
    .ol-step_wrapper {
        display: flex;
        gap: .5rem;
        width: 95vw!important;
        margin: 0 auto;
        margin-top: 1.5rem;
        overflow-x: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none; 
        padding: 1rem!important;
        background-color: var(--color-global-baackground_light);
        border-radius: 2rem;
    }
    .ol-step_wrapper ::-webkit-scrollbar {
        display: none;
        -webkit-appearance: none;
        width: 0;
        height: 0;
    }
    .ol-step_wrapper li {

    }
    .ol-step_wrapper li h4 {
        margin: 0;
        margin-left: 1rem;
    }
    .ol-step_wrapper li ol {
        display: flex;
        gap: .5rem;
        margin-top: .5rem;
    }
    .ol-step_wrapper li ol li {
        /* border-radius: 1rem; */
        text-wrap: nowrap;
        position: relative;
    }
    .ol-step_wrapper > li > ol > li:after {
        content: '>';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        color: var(--color-global-text_second);
    }
    .ol-step_wrapper > li:last-child > ol > li:last-child:after {
        content: '';
    }
    .ol-step_wrapper > li > ol > li > label {
        transition: all .2s ease-in-out;
        padding: 6px 18px;
        border-radius: 1rem;
        margin-right: 1rem;
        background-color: var(--color-global-baackground_light)
    }
    .ol-step_wrapper > li:last-child > ol > li:last-child > label {
        margin-right: 0;
    }
    .ol-step_wrapper > li > ol > li > label:hover {
        background-color: var(--color-btn-disabled-text);
        color :var(--color-btn-text);
        cursor: pointer;
    }
    .ol-step_wrapper li ol li input {
        display: none;
    }
    .checked_input {
        font-weight: bold;
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        color: white;
        padding: 2px 4px;
    }
    /* Переключатели Назад / Дальше  */
    .step_prev_next_container {
        padding: 1rem 0;
    }
    .step_prev_next_wrapper {
        margin: 0 auto;
        width: fit-content;
        display: flex;
        gap: .5rem;
    }
    
    /* 
        Выбрать готовый шаблон
    */
    .choose-pattern-content_container {
        margin: 1rem;
        margin-top: 1.5rem;
    }
    /* 
        Проверить статус
    */
    .check-status-content_container {
        margin: 1rem;
        margin-top: 1.5rem;
    }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
    .chip_paragraph {
        /* margin-left: 1rem;
        margin-right: 1rem; */
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
        line-height: 4rem; 
    }
    .main-banner_area-right h1 span {
        color :var(--color-as-ym-white);
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        padding: 0 .5rem;
    }
    .main-banner_area-right p {
        margin: 0;
        margin-top: -.5rem;
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
        /* height: 175px;   */
        height: 250px;
        display: flex;
        align-items: flex-end;
        box-shadow: var(--hover-shadow);
        position: relative;
        border-radius: 1rem;
        transition: all .2s ease-in-out;
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
        margin-left: -10rem;
        margin-top: -10.5rem;
        margin-bottom: -9rem;
        z-index: 1;
    }
    h2 span:nth-child(3) {
        margin-left: 10rem;
        /* width: 400px; */
    }
    h2 span img {
        width: 250px;
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
        margin-top: 2rem!important;
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

    /* 
        chip paragraph 
    */
    .chip_paragraph {
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 3rem!important;
        border-bottom: unset;
    }

    /* 
        Связаться с нами 
    */
    .contact-us-content_container {
        margin: 1rem;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .contact-us-content_container form {
        background-color: var(--color-global-baackground_light);
        border-radius: 2rem;
        padding: 1rem;
    }
    .contact-us-content_container form ul {
        list-style: none;
        padding: 0;
    }
    .contact-us-content_container form ul li,
    .contact-us-content_container form ul li input {
        margin-top: .5rem;
    }
    .contact-us-content_container form ul li label {
        color: var(--color-global-text_second);
        font-size: .8rem;
        margin-left: .5rem;
    }

    /* contact-us_phone */
    .contact-us_phone p {
        margin: 0;
        margin-left: .5rem;
        margin-top: 1rem;
        color: var(--color-global-text_second);
        font-size: .8rem;
    }
    .contact-us_phone ul {
        margin-top: .5rem;
        display: flex;
        gap: 1rem;
        border: 1px solid var(--bs-border-color);
        border-radius: var(--bs-border-radius);
        padding: .5rem!important
    }
    .contact-us_phone ul li {
        margin: 0!important;
        display: flex;
    }
    .contact-us_phone ul li input {
        margin: 0!important;
    }
    .contact-us_phone ul li label {
        color: var(--color-global-text)!important;
        margin-left: .3rem;
    }
    .contact-us_phone ul li input,
    .contact-us_phone ul li label:hover {
        cursor: pointer;
    }

    /* agreement_wrapper */
    .agreement_wrapper {
        display: flex;
        align-items: flex-start;
        gap: .5rem;
        margin-left: .5rem;
        max-width: 500px;
    }
    .agreement_wrapper > input {
        margin-top: .2rem!important;
    }
    .agreement_wrapper > label {
        margin: 0!important;
    }

    /* contact-us-btn_submit */
    .contact-us-btn_submit,
    .contact-us-btn_wrong,
    .contact-us-btn_sending {
        width: fit-content;
        padding: 1rem;
    }
    .contact-us-btn_submit {
        background-color: var(--color-global-text);
        color: var(--color-btn-text);
        border-radius: 2rem;
        transition: all .3s ease-in-out;
    }
    .contact-us-btn_submit:hover {
        cursor: pointer;
        color: var(--color-btn-wo-bg)
    }
    .contact-us-btn_sending {
    }
    .contact-us-btn_wrong {
        color: var(--color-urgency-high);
    }

    /* contact-us_tg */
    .contact-us_tg {
        height: fit-content;
        border-radius: 2rem;
        padding: 1rem 0;
        padding-bottom: 2rem;
        background-color: var(--color-wallet-fund-invested);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* max-width: 300px; */
    }

    .contact-us_tg p{
        color: var(--color-btn-text);
    }
    .contact-us_tg p:first-child {
        margin-bottom: 3rem;
        font-weight: bold;
        font-size: 1.5rem;
        text-align: center;
    }
    .contact-us_tg p:last-child {
        margin-top: 1rem;
    }
    .contact-us_tg p span a {
        background-color: var(--color-global-text);
        color: var(--color-btn-text);
        padding: 1rem;
        border-radius: 2rem;
    }

    /* 
        Создать ТЗ ВМЕСТЕ
    */
    .specification-first-content_container {
        padding: 0 .5rem;
    }
    .table-contents_wrapper{
        display: flex;
        flex-direction: column;
    }
    .ol_content {
        margin-top: 1rem;
        padding: 2rem 1rem;
        background-color: var(--color-global-baackground_light);
        border-radius: 2rem;
    }
    .ol-step_wrapper {
        display: flex;
        gap: .5rem;
        width: 97vw!important;
        margin-top: 2rem;
        margin-bottom: unset!important;
        overflow-x: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none; 
        padding: 1rem!important;
        background-color: var(--color-global-baackground_light);
        border-radius: 2rem;
    }
    .ol-step_wrapper ::-webkit-scrollbar {
        display: none;
        -webkit-appearance: none;
        width: 0;
        height: 0;
    }
    .ol-step_wrapper li {

    }
    .ol-step_wrapper li h4 {
        margin: 0;
        margin-left: 1rem;
    }
    .ol-step_wrapper li ol {
        display: flex;
        gap: .5rem;
        margin-top: .5rem;
    }
    .ol-step_wrapper li ol li {
        /* border-radius: 1rem; */
        text-wrap: nowrap;
        position: relative;
    }
    .ol-step_wrapper > li > ol > li:after {
        content: '>';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        color: var(--color-global-text_second);
    }
    .ol-step_wrapper > li:last-child > ol > li:last-child:after {
        content: '';
    }
    .ol-step_wrapper > li > ol > li > label {
        transition: all .2s ease-in-out;
        padding: 6px 18px;
        border-radius: 1rem;
        margin-right: 1rem;
        background-color: var(--color-global-baackground_light)
    }
    .ol-step_wrapper > li:last-child > ol > li:last-child > label {
        margin-right: 0;
    }
    .ol-step_wrapper > li > ol > li > label:hover {
        background-color: var(--color-btn-disabled-text);
        color :var(--color-btn-text);
        cursor: pointer;
    }
    .ol-step_wrapper li ol li input {
        display: none;
    }
    .checked_input {
        font-weight: bold;
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        color: white;
        padding: 2px 4px;
    }
    /* Переключатели Назад / Дальше  */
    .step_prev_next_container {
        padding: 1rem 0;
    }
    .step_prev_next_wrapper {
        margin: 0 auto;
        width: fit-content;
        display: flex;
        gap: .5rem;
    }
    /* 
        Выбрать готовый шаблон
    */
    .choose-pattern-content_container {
        margin: 1rem;
        margin-top: 1.5rem;
    }
    /* 
        Проверить статус
    */
    .check-status-content_container {
        margin: 1rem;
        margin-top: 1.5rem;
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
        line-height: 4rem;
    }
    .main-banner_area-right h1 span {
        color :var(--color-as-ym-white);
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        padding: 0 .5rem;
    }
    .main-banner_area-right p {
        margin: 0;
        margin-top: -.5rem;
    }
    .main-banner_area-right ul {
        margin-top: 1rem;
        padding-bottom: 5rem;
    }
    .main-banner_area-right > a {
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-215%);
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
        height: 250px;  
        width:250px;
        display: flex;
        align-items: flex-end;
        box-shadow: var(--hover-shadow);
        position: relative;
        border-radius: 1rem;
        transition: all .2s ease-in-out;
    }
    h2 span:hover {
        cursor: pointer;  
        opacity: .8;      
    }
    h2 span:nth-child(1) {
        border-bottom-left-radius: 2.7rem;
        border-bottom-right-radius: 7px;
         margin-right:-9rem;
        z-index: 2;
    }
    h2 span:nth-child(2) {
        /* margin-left: 3.2rem; */
        margin-right: 7rem;
        margin-top: -8rem;
        margin-bottom: -9rem;
        z-index: 1;
    }
    h2 span:nth-child(3) {
        margin-left: 7rem;
        width: 250px;
        margin-top: 3.5rem;
        margin-right: 7rem;
    }
    h2 span img {
        width: 250px;
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
        /* margin-top: 4rem!important; */
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

    /* 
        Связаться с нами 
    */
    .contact-us-content_container {
        margin: 1rem;
        margin-top: 2.5rem;
        display: flex;
        gap: 1rem;
    }
    .contact-us-content_container form {
        background-color: var(--color-global-baackground_light);
        border-radius: 2rem;
        padding: 1rem;
    }
    .contact-us-content_container form ul {
        list-style: none;
        padding: 0;
    }
    .contact-us-content_container form ul li,
    .contact-us-content_container form ul li input {
        margin-top: .5rem;
    }
    .contact-us-content_container form ul li label {
        color: var(--color-global-text_second);
        font-size: .8rem;
        margin-left: .5rem;
    }

    /* contact-us_phone */
    .contact-us_phone p {
        margin: 0;
        margin-left: .5rem;
        margin-top: 1rem;
        color: var(--color-global-text_second);
        font-size: .8rem;
    }
    .contact-us_phone ul {
        margin-top: .5rem;
        display: flex;
        gap: 1rem;
        border: 1px solid var(--bs-border-color);
        border-radius: var(--bs-border-radius);
        padding: .5rem!important
    }
    .contact-us_phone ul li {
        margin: 0!important;
        display: flex;
    }

    .contact-us_phone ul li input {
        margin: 0!important;
        /* margin-top: .3rem!important; */
    }
    .contact-us_phone ul li label {
        color: var(--color-global-text)!important;
        margin-left: .3rem;
        /* margin-top: .3rem; */
    }
    .contact-us_phone ul li input,
    .contact-us_phone ul li label:hover {
        cursor: pointer;
    }

    /* agreement_wrapper */
    .agreement_wrapper {
        display: flex;
        align-items: flex-start;
        gap: .5rem;
        margin-left: .5rem;
    }
    .agreement_wrapper > input {
        margin-top: .3rem!important;
    }
    .agreement_wrapper > label {
        margin: 0!important;
    }

    /* contact-us-btn_submit */
    .contact-us-btn_submit,
    .contact-us-btn_wrong,
    .contact-us-btn_sending {
        width: fit-content;
        padding: 1rem;
    }
    .contact-us-btn_submit {
        background-color: var(--color-global-text);
        color: var(--color-btn-text);
        border-radius: 2rem;
        transition: all .3s ease-in-out;
    }
    .contact-us-btn_submit:hover {
        cursor: pointer;
        color: var(--color-btn-wo-bg)
    }
    .contact-us-btn_sending {
    }
    .contact-us-btn_wrong {
        color: var(--color-urgency-high);
    }

    /* contact-us_tg */
    .contact-us_tg {
        height: fit-content;
        border-radius: 2rem;
        padding: 1rem 0;
        padding-bottom: 2rem;
        background-color: var(--color-wallet-fund-invested);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 300px;
    }

    .contact-us_tg p{
        color: var(--color-btn-text);
    }
    .contact-us_tg p:first-child {
        margin-bottom: 5rem;
        font-weight: bold;
        font-size: 1.5rem;
        text-align: center;
    }
    .contact-us_tg p:last-child {
        margin-top: 1rem;
    }
    .contact-us_tg p span a {
        background-color: var(--color-global-text);
        color: var(--color-btn-text);
        padding: 1rem;
        border-radius: 2rem;
    }


    /* specification-first-content_container */
    .specification-first-content_container {

    }
    
    /* 
        Создать ТЗ ВМЕСТЕ
    */
    .table-contents_wrapper{
        display: flex;
        flex-direction: column;
        margin-top: .5rem;
    }
    .ol_content {
        margin-top: 1rem;
        padding: 2rem 1rem;
        background-color: var(--color-global-baackground_light);
        border-radius: 2rem;
    }
    .ol-step_wrapper {
        display: flex;
        gap: .5rem;
        width: 97vw!important;
        margin-top: 2rem;
        margin-bottom: unset!important;
        overflow-x: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none; 
        padding: 1rem!important;
        background-color: var(--color-global-baackground_light);
        border-radius: 2rem;
    }
    .ol-step_wrapper ::-webkit-scrollbar {
        display: none;
        -webkit-appearance: none;
        width: 0;
        height: 0;
    }
    .ol-step_wrapper li {
        /* margin-top: .5rem; */
        /* background-color :red; */
    }
    .ol-step_wrapper li h4 {
        margin: 0;
        margin-left: 1rem;
    }
    .ol-step_wrapper li ol {
        display: flex;
        gap: .5rem;
        margin-top: .5rem;
    }
    .ol-step_wrapper li ol li {
        /* border-radius: 1rem; */
        text-wrap: nowrap;
        position: relative;
    }
    .ol-step_wrapper > li > ol > li:after {
        content: '>';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        color: var(--color-global-text_second);
    }
    .ol-step_wrapper > li:last-child > ol > li:last-child:after {
        content: '';
    }
    .ol-step_wrapper > li > ol > li > label {
        transition: all .2s ease-in-out;
        /* border: 1px solid blue; */
        padding: 6px 18px;
        border-radius: 1rem;
        margin-right: 1rem;
        background-color: var(--color-global-baackground_light)
    }
    .ol-step_wrapper > li:last-child > ol > li:last-child > label {
        margin-right: 0;
    }
    .ol-step_wrapper > li > ol > li > label:hover {
        background-color: var(--color-btn-disabled-text);
        color :var(--color-btn-text);
        cursor: pointer;
    }
    .ol-step_wrapper li ol li input {
        display: none;
    }
    .chip_paragraph {
        /* margin-left: 1em;
        margin-right: 1rem; */
        padding-top: 3.5rem!important;
        border-bottom: unset;
    }
    .chip_content_wrapper {
        /* margin-left: 1.5rem;
        margin-right: 1.5rem;
        margin-top: 1.5rem; */
    }
    .checked_input {
        font-weight: bold;
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        color: white;
        padding: 2px 4px;
    }
    .step_prev_next_container {
        /* background-color: blue; */
        padding: 1rem 0;
    }
    .step_prev_next_wrapper {
        margin: 0 auto;
        width: fit-content;
        display: flex;
        gap: .5rem;
    }
    .step_prev_next_el {
        /* background-color:red; */
    }
    /* 
        Выбрать готовый шаблон
    */
    .choose-pattern-content_container {
        /* margin: 1rem; */
        margin-top: 2rem;
    }

    /* 
        Проверить статус
    */
    .check-status-content_container {
        /* margin: 1rem; */
        margin-top: 2rem;
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
        text-align: left;
    }
    .main-banner_area-right h1 {
        font-size: 4rem;
        line-height: 5rem;
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
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
    h2 span {
        width: fit-content;
        height: 250px; 
        width: 250px; 
        display: flex;
        align-items: flex-end;
        box-shadow: var(--hover-shadow);
        position: relative;
        border-radius: 1rem;
        transition: all .2s ease-in-out;
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
        margin-left: 5.5rem;
        margin-top: -5.5rem;
        margin-bottom: -7.5rem;
        z-index: 1;
    }
    h2 span:nth-child(3) {
        margin-left: 3rem;
        /* width: 400px; */
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
        margin-top: -1rem;
    }
    .main-banner_area-right ul {
        margin-top: 1rem;
        padding-bottom: 5rem;
    }

    /* 
        Связаться с нами 
    */
    .contact-us-content_container {
        /* margin: 1rem; */
        margin-top: 2.5rem!important;
        display: flex;
        justify-content: space-between;
        gap: 2rem;
    }
    .contact-us-content_container form {
        background-color: var(--color-global-baackground_light);
        border-radius: 2rem;
        padding: 1rem;
    }
    .contact-us-content_container form ul {
        list-style: none;
        padding: 0;
    }
    .contact-us-content_container form ul li,
    .contact-us-content_container form ul li input {
        margin-top: .5rem;
    }
    .contact-us-content_container form ul li label {
        color: var(--color-global-text_second);
        font-size: .8rem;
        margin-left: .5rem;
    }
    /* contact-us_phone */
    .contact-us_phone p {
        margin: 0;
        margin-left: .5rem;
        margin-top: 1rem;
        color: var(--color-global-text_second);
        font-size: .8rem;
    }
    .contact-us_phone ul {
        margin-top: .5rem;
        display: flex;
        gap: 1rem;
        border: 1px solid var(--bs-border-color);
        border-radius: var(--bs-border-radius);
        padding: .5rem!important
    }
    .contact-us_phone ul li {
        margin: 0!important;
        display: flex;
    }

    .contact-us_phone ul li input {
        margin: 0!important;
        /* margin-top: .3rem!important; */
    }
    .contact-us_phone ul li label {
        color: var(--color-global-text)!important;
        margin-left: .3rem;
        /* margin-top: .3rem; */
    }
    .contact-us_phone ul li input,
    .contact-us_phone ul li label:hover {
        cursor: pointer;
    }

    /* agreement_wrapper */
    .agreement_wrapper {
        display: flex;
        align-items: flex-start;
        gap: .5rem;
        margin-left: .5rem;
        max-width: 500px;
    }
    .agreement_wrapper > input {
        margin-top: .3rem!important;
    }
    .agreement_wrapper > label {
        margin: 0!important;
    }

    /* contact-us-btn_submit */
    .contact-us-btn_submit,
    .contact-us-btn_wrong,
    .contact-us-btn_sending {
        width: fit-content;
        padding: 1rem;
    }
    .contact-us-btn_submit {
        background-color: var(--color-global-text);
        color: var(--color-btn-text);
        border-radius: 2rem;
        transition: all .3s ease-in-out;
    }
    .contact-us-btn_submit:hover {
        cursor: pointer;
        color: var(--color-btn-wo-bg)
    }
    .contact-us-btn_sending {
    }
    .contact-us-btn_wrong {
        color: var(--color-urgency-high);
    }

    /* contact-us_tg */
    .contact-us_tg {
        height: fit-content;
        border-radius: 2rem;
        padding: 1rem 0;
        padding-bottom: 2rem;
        background-color: var(--color-wallet-fund-invested);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 300px;
    }

    .contact-us_tg p{
        color: var(--color-btn-text);
    }
    .contact-us_tg p:first-child {
        margin-bottom: 5rem;
        font-weight: bold;
        font-size: 1.5rem;
        text-align: center;
        /* width: 300px; */
    }
    .contact-us_tg p:last-child {
        margin-top: 1rem;
    }
    .contact-us_tg p span a {
        background-color: var(--color-global-text);
        color: var(--color-btn-text);
        padding: 1rem;
        border-radius: 2rem;
    }

    /* 
        Создать ТЗ ВМЕСТЕ
    */
    .table-contents_wrapper{
        display: flex;
        margin-top: 2rem!important;
    }
    .ol_content {
        /* background-color: var(--color-btn-disabled-bg); */
        background-color: var(--color-global-baackground_light);
        width: 100%;
    }
    .ol-step_wrapper {
        width: 33%;
    }
    .ol-step_wrapper li {
        margin-top: .5rem;
    }
    .ol-step_wrapper li:first-child {
        margin: unset;
    }
    .ol-step_wrapper li h4 {

    }
    .ol-step_wrapper li ol {

    }
    .ol-step_wrapper li ol li {

    }
    .ol-step_wrapper > li > ol > li > label {
        transition: all .2s ease-in-out;
        padding: 2px 4px;
    }
    .ol-step_wrapper > li > ol > li > label:hover {
        /* background-color: var(--color-urgency-low-wo); */
        background-color: var(--color-btn-disabled-text);
        color :var(--color-btn-text);
        cursor: pointer;
    }
    .ol-step_wrapper li ol li input {
        display: none;
    }
    .chip_paragraph {
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        padding-top: 3.5rem!important;
        border-bottom: unset;
    }
    .chip_content_wrapper {
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        margin-top: 1.5rem;
    }
    .checked_input {
        font-weight: bold;
        /* background-color: var(--color-urgency-low-wo); */
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        color: white;
        padding: 2px 4px;
    }
    /* Кнопки переключения шагов */
    .step_prev_next_wrapper {
        display: flex;
        gap: .5rem;
    }
    /* 
        Выбрать готовый шаблон
    */
    .choose-pattern-content_container {
        /* margin: 1rem; */
        margin-top: 1.5rem!important;
    }
        /* 
        Проверить статус
    */
    .check-status-content_container {
        /* margin: 1rem; */
        margin-top: 1.5rem;
    }
}
@media screen and (min-width: 1200px) {
    .container-inside {
        margin-top: 0!important;
        margin-bottom: 0!important;
        /* padding-top: 3rem; */
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
        margin-top: 3rem;
    }
    h2 span {
        width: fit-content;
        height: 300px;  
        width: 300px;
        display: flex;
        align-items: flex-end;
        box-shadow: var(--hover-shadow);
        position: relative;
        border-radius: 1rem;
        transition: all .2s ease-in-out;
    }
    h2 span:hover {
        cursor: pointer;  
        opacity: .8;      
    }
    h2 span:nth-child(1) {
        border-bottom-left-radius: 2.7rem;
        border-bottom-right-radius: 7px;
        z-index: 2;
        margin-left: 3rem;
    }
    h2 span:nth-child(2) {
        margin-left: 9.5rem;
        margin-top: -10.5rem;
        margin-bottom: -5.5rem;
        z-index: 1;
    }
    h2 span:nth-child(3) {
        margin-left: 1rem;
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
        line-height: 5.5rem;
    }
    .main-banner_area-right h1 span {
        color :var(--color-as-ym-white);
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        padding: 0 .5rem;
    }
    .main-banner_area-right p {
        margin: 0;
        margin-top: -1rem;
    }
    .main-banner_area-right ul {
        margin-top: 1rem;
        padding-bottom: 5rem;
    }
    h2 span img {
        width: 300px;
    }

    /* 
        PORTFOLIO
    */
    .container_portfolio {
        padding-top: 10rem;
        margin: 0 auto; 
        display: flex; 
        align-items: center; 
        justify-content: space-between;
        position: relative;
    }
    .portfolio_chip {
        /* background-color: var(--color-wallet-fund-available);  */
        list-style: none;
        margin: 0;
        padding: 0;
        width: 50%;
        padding-left: 10%;
        position: relative;
    }
    .portfolio_chip:after {
        content: '';
        position: absolute;
        top: -10%;
        right: -1px;
        border-right: 1px solid var(--color-global-text_second);
        height: 120%;
        width: 1px;
    }

    .portfolio_chip > li > input {
        display: none;
    }
    /* current_portfolio_chip */
    .current_portfolio_chip {
        border-right: 3px solid var(--color-wallet-fund-invested);
        margin-right: 3px; 
    }
    .current_portfolio_chip > h3{
        color: var(--color-global-text)!important;
    }
    .current_portfolio_chip > .section_icon > svg {
        color: var(--color-wallet-fund-invested);
    }
    .current_portfolio_chip > div {
        background-color: var(--color-wallet-fund-invested);
    }
    /* other chip */
    .portfolio_chip > li > label {
        cursor: pointer;    
        display: flex;
        gap: 1rem;
        align-items: center;
        transition: all .1s ease-in;
        padding-top: .25rem;
        padding-bottom: .25rem;
    }   
    /* other chip hover */
    .portfolio_chip > li > label:hover {
        border-right: 3px solid var(--color-bg-popup);
        margin-right: 3px; 
    }
    .portfolio_chip > li > label:hover > h3 {
        color: var(--color-bg-popup);
    }
    .portfolio_chip > li > label:hover > .section_icon > svg {
        color: var(--color-bg-popup);
    }
    .portfolio_chip > li > label > .section_icon {
        color: var(--color-global-text_second);
    }
    .portfolio_chip > li > label > h3 {
        font-size: 1rem;
        margin: 0;
        font-weight: normal;
        transition: all .1s ease-in;
        color: var(--color-global-text_second);
    }

    .portfolio_content {
        /* background-color: var(--color-status-canceled);   */
        display: flex; 
        flex-direction: column;
        align-items: center;
        width: 50%;
    }
    .portfolio_content_img-container {
        flex: 1; 
        background-color: red; 
        max-width: 310px; 
        /* 310 / 620 / 930 */
        /* max-height: 410px;  */
        /* 410 / 820 / 1230 */
        display: flex; 
        align-items: center; 
        justify-content: center; 
        border-radius: 2rem; 
        overflow: hidden; 
        /* padding: 1rem; */
    }
    .portfolio_content h3 {
        font-weight: bold;
        margin-top: 1rem;
    }
    .portfolio_content p {
        height: 7rem;
        width: 50%;
        text-align: center;
    }

    /*  */
    .price_offer_container {
        background-color: var(--color-global-baackground_light);
    }   
    .price_offer_wrapper {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 5rem;
        padding-left: 5%;
        padding-bottom: 10%;
    }
    .price_offer_wrapper > .price_offer_el {
        background-color: var(--color-global-baackground_light);
    }
    .price_offer_wrapper > .price_offer_el > .price_offer_el-price {
        font-size: 4rem;
    }
    .price_offer_wrapper > .price_offer_el > .price_offer_el-offer {

    }

    /* CHIP PARAGRAPH */
    .chip_paragraph {
        justify-content: center;
    }

    /* 
        Связаться с нами 
    */
    .contact-us-content_container {
        /* margin: 1rem; */
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        gap: 2rem;
        /* background-color: red; */
        margin-top: 3.5rem;
    }
    .contact-us-content_container form {
        background-color: var(--color-global-baackground_light);
        border-radius: 2rem;
        padding: 1rem;
        max-width: 500px;
    }
    .contact-us-content_container form ul {
        list-style: none;
        padding: 0;
    }
    .contact-us-content_container form ul li,
    .contact-us-content_container form ul li input {
        margin-top: .5rem;
    }
    .contact-us-content_container form ul li label {
        color: var(--color-global-text_second);
        font-size: .8rem;
        margin-left: .5rem;
    }

    /* contact-us_phone */
    .contact-us_phone p {
        margin: 0;
        margin-left: .5rem;
        margin-top: 1rem;
        color: var(--color-global-text_second);
        font-size: .8rem;
    }
    .contact-us_phone ul {
        margin-top: .5rem;
        display: flex;
        gap: 1rem;
        border: 1px solid var(--bs-border-color);
        border-radius: var(--bs-border-radius);
        padding: .5rem!important
    }
    .contact-us_phone ul li {
        margin: 0!important;
        display: flex;
    }
    .contact-us_phone ul li input {
        margin: 0!important;
        /* margin-top: .3rem!important; */
    }
    .contact-us_phone ul li label {
        color: var(--color-global-text)!important;
        margin-left: .3rem;
        /* margin-top: .3rem; */
    }
    .contact-us_phone ul li input,
    .contact-us_phone ul li label:hover {
        cursor: pointer;
    }
    /* agreement_wrapper */
    .agreement_wrapper {
        display: flex;
        align-items: flex-start;
        gap: .5rem;
        margin-left: .5rem;
    }
    .agreement_wrapper > input {
        margin-top: .2rem!important;
    }
    .agreement_wrapper > label {
        margin: 0!important;
    }

    /* contact-us-btn_submit */
    .contact-us-btn_submit,
    .contact-us-btn_wrong,
    .contact-us-btn_sending {
        width: fit-content;
        padding: 1rem;
    }
    .contact-us-btn_submit {
        background-color: var(--color-global-text);
        color: var(--color-btn-text);
        border-radius: 2rem;
        transition: all .3s ease-in-out;
    }
    .contact-us-btn_submit:hover {
        cursor: pointer;
        color: var(--color-btn-wo-bg)
    }
    .contact-us-btn_sending {
    }
    .contact-us-btn_wrong {
        color: var(--color-urgency-high);
    }

    /* contact-us_tg */
    .contact-us_tg {
        height: fit-content;
        border-radius: 2rem;
        padding: 1rem 0;
        padding-bottom: 2rem;
        background-color: var(--color-wallet-fund-invested);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 300px;
    }
    .contact-us_tg p{
        color: var(--color-btn-text);
    }
    .contact-us_tg p:first-child {
        margin-bottom: 5rem;
        font-weight: bold;
        font-size: 1.5rem;
        text-align: center;
    }
    .contact-us_tg p:last-child {
        margin-top: 1rem;
    }
    .contact-us_tg p span a {
        background-color: var(--color-global-text);
        color: var(--color-btn-text);
        padding: 1rem;
        border-radius: 2rem;
    }
    /* 
        Создать ТЗ ВМЕСТЕ
    */
    .table-contents_wrapper{
        display: flex;
        margin-top: 3.5rem;
    }
    .ol_content {
        /* background-color: var(--color-btn-disabled-bg); */
        background-color: var(--color-global-baackground_light);
        width: 100%;
    }
    .ol-step_wrapper {
        width: 33%;
    }
    .ol-step_wrapper li {
        margin-top: .5rem;
    }
    .ol-step_wrapper li:first-child {
        margin: unset;
    }
    .ol-step_wrapper li h4 {

    }
    .ol-step_wrapper li ol {

    }
    .ol-step_wrapper li ol li {

    }
    .ol-step_wrapper > li > ol > li > label {
        transition: all .2s ease-in-out;
        padding: 2px 4px;
    }
    .ol-step_wrapper > li > ol > li > label:hover {
        background-color: var(--color-btn-disabled-text);
        color :var(--color-btn-text);
        cursor: pointer;
    }
    .ol-step_wrapper li ol li input {
        display: none;
    }
    .checked_input {
        font-weight: bold;
        background: linear-gradient(90deg,rgba(0, 105, 255, 1) 0%, rgba(255, 22, 191, 1) 53%, rgba(237, 221, 83, 1) 100%);
        color: white;
        padding: 2px 4px;
    }
    /* Кнопки переключения шагов */
    .step_prev_next_wrapper {
        display: flex;
        gap: .5rem;
    }
    /* 
        Выбрать готовый шаблон
    */
    .choose-pattern-content_container {
       margin-top: 3.5rem;
    }
    /* 
        Проверить статус
    */
    .check-status-content_container {
        margin-top: 3.5rem;
    }
}
</style>