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
            <h1 style="margin: 0;">Дизайнить</h1> 
        </div>

        <h2 style="display: block; font-size: 2rem;">
    
            <span style="font-weight: 200; line-height: 1.5; color: var(--color-global-text_second)">
                До 75% заказчиков принимают решение о покупке увидев упаковку?*                Самый верный способ реализовать всю айдентику (фирменный стиль) -
                <span style="color: var(--color-btn-bg); background-color: var(--color-btn-hover-bg); width: fit-content;">творить визуал.</span> 
                Единый концепт корпоративного визуала (базовые, расширенные и дополнительные элементы) для каждой ниши или канала коммуникации
                <p style="color: var(--color-btn-bg); background-color: var(--color-btn-hover-bg); width: fit-content;">Чего дизайнить изволите, сэр?</p>
            </span>
        </h2>

        <div class="main-banner_container">
            
            <div class="main-banner_el">
                <h4 style="text-wrap: wrap; font-size: 4.5rem; font-weight: bold;">Запускаешь или обновляешь проект?</h4>
            </div>

            <div class="main-banner_el">
                
                <div class="gallery">
                    <!--  -->
                    <details class="gallery-item" name="gallery" open>
                        <summary class="gallery-item__summary"> 
                            <img src="@/assets/img/cards_project_1/01_1.webp" width="300" height="400" alt="Дизайн карточек товара для OZON/WILDBERRIES/Я.Маркет">
                        </summary>
                        <div class="gallery-item__info">
                            <h3>Визуализация твоих идей, друг</h3>
                            <p>Опиши свои хотелки, получи результат. Вноси правки и приближайся к томум самому визуалу.</p>
                        </div>
                    </details>
                    <!--  -->
                    <details class="gallery-item" name="gallery">
                        <summary class="gallery-item__summary"> 
                            <img src="@/assets/img/cards_project_1/02_1.webp" width="300" height="400" alt="Дизайн карточек товара для OZON/WILDBERRIES/Я.Маркет">
                        </summary>
                        <div class="gallery-item__info">
                            <h3>Упайкуйся, сэр!</h3>
                            <p>Визуализируя ваши пожелания - делаем упаковку, которую покупают.</p>
                        </div>
                    </details>
                    <!--  -->
                    <details class="gallery-item" name="gallery">
                        <summary class="gallery-item__summary"> 
                            <img src="@/assets/img/cards_project_1/03_1.webp" width="300" height="400" alt="Дизайн карточек товара для OZON/WILDBERRIES/Я.Маркет">
                        </summary>
                        <div class="gallery-item__info">
                            <h3>Ведем единую концепцию</h3>
                            <p>Все элементы должны работать как единая система и поддерживать общую концепцию бренда сквозь всю коммуникацию</p>
                        </div>
                    </details>
                    <!--  -->
                    <details class="gallery-item" name="gallery" open style="background-color: var(--color-btn-hover-bg)">
                        <summary class="gallery-item__summary" style="display: flex;align-items: center; justify-content: center;"> 
                            <div>
                                <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var( --color-btn-bg)"/>
                            </div>
                            <!-- <img src="@/assets/img/cards_project_1/01_1.webp" width="300" height="400" alt="Дизайн карточек товара для OZON/WILDBERRIES/Я.Маркет"> -->
                        </summary>
                        <div class="gallery-item__info">
                            <h3 style="color: var( --color-btn-bg)">Составить ТЗ на пробный дизайн</h3>
                            <p style="color: var( --color-btn-bg)">Начнем сначала, дабы понять ваш вектор</p>
                        </div>
                        <div class="gallery-item_btn" @click.stop="openPopup" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
                            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var( --color-btn-bg)"/>
                        </div>
                    </details>
                </div>
            </div>
        </div>


        <div style="margin-top: 3rem;">

            <h3 style="background-color: var(--color-btn-hover-bg); color:var(--color-btn-bg); width: fit-content;">Мы займемся разработкой визуала</h3>
            <p style="font-weight: 200;width: fit-content;"><span>C тебя</span> - мысль, перебирать варианты и выбирать лучшее. Конспираторы высвободят твое время.</p>
        </div>

        <!--  -->
        <div id="features-block" class="features_container" style="color:var(--color-global-text_second);">

            <!--  -->
            <div class="feature_wrapper">
                <div class="feature_header">
                    <div class="feature_text">
    
                        <p>Отправьте нам ТЗ для тестовых набросков</p>
                        <p>Почасовая оплата работы консиратора</p>
                        <p>Предоставляет отчет и чек (если надо)</p>
                    </div>
                    <div class="feature_media"></div>
                    <div class="feature_btn" @click.prevent="openPopup">
                        <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="red"/>
                    </div>
                </div>  
                <div class="feature_body">123</div>
            </div>
            <!--  -->
            <div class="feature_wrapper">
                <div class="feature_header">

                    <div class="feature_text">
                        <p>Концепции фирменного стиля в полиграфии</p>
                        <p>(приводим элементы образа предприятия к общему визуалу)</p>
                    </div>
                    <div class="feature_media">
    
                    </div>
                </div>
                <div class="feature_body">
                    123
                </div>
            </div>            
            <!--  -->
            <div class="feature_wrapper">
                <div class="feature_header">
                    <div class="feature_text">
                        <p>Дизайн упаковки, сэр!</p>
                        <p>Делаем вместе упаковку, которую покупают</p>
                        <p>Разработка визуальной упаковки проектов</p>
                        <p>Сопровождение стиля для всех каналов коммуникации</p>
                    </div>
                    <div class="feature_media">
    
                    </div>
                </div>
                <div class="feature_body">123</div>
            </div>
            <!--  -->
            <div class="feature_wrapper">
                <div class="feature_header">
                    <div class="feature_text">
                        <p>Продаешь на маркетплейсах?</p>
                        <p>Карточки товаров для маркетплейсов</p>
                        <p>Визуализация твоих идей для карточек товара, милорд :P</p>
                    </div>
                    <div class="feature_media">
    
                    </div>
                </div>
                <div class="feature_body">123</div>
            </div>
            <!--  -->
            <div class="feature_wrapper">
                <div class="feature_header">
                    <div class="feature_text">
                        <p>Web и визуальное сопровождениe</p>
                        <p>Лендинги с карточками товаров</p>
                        <p>Информационные лендинги</p>
                        <p>Лендинги лид-формы</p>
                    </div>
                    <div class="feature_media">
    
                    </div>
                </div>
                <div class="featuree_body">123</div>
            </div>
            <!--  -->
            <div class="feature_wrapper">
                <div class="feature_header">
                    <div class="feature_text">
                        <p>Соцсети и вмизуальный концепт развития аккаунтов</p>
                        <p>Фото- и видео- разработка материалов</p>
                    </div>
                    <div class="feature_media">
    
                    </div>
                </div>
                <div class="feature_body">123</div>
            </div>
            <!--  -->
            <div class="feature_wrapper">
                <div class="feature_header">
                    <div class="feature_text">
                        <p>Медиа материалы для усиления визала бренда</p>
                        <p>Съемка и продакшн видео</p>
                        <p>Фотосъемки + применение в каналах коммуникации</p>
                    </div>
                    <div class="feature_media">
    
                    </div>
                </div>
                <div class="feature_body">1232</div>
            </div>

        </div>

        <p style="font-weight: 200; font-size: .8rem; margin-top: 1rem;">
            <span>*Библиографические ссылки</span>
            <ul>
                <li>1. Глазами покупателя: как упаковка влияет на продажи. URL: https://p-pspb.ru/blog/glazami-pokupatelya-kak-upakovka-vliyaet-na-prodazhi/ (дата обращения: 10. 03. 2023).</li>
                <li>2. Как дизайн упаковки влияет на продажи. URL: https://artsdelka.ru/kak-dizaynupakovki-vliyaet-na-prodazhi (дата обращения: 10. 03. 2023).</li>
                <li>3. Сироткина И. В. Рекламные возможности упаковки // Современная торговля.2007. № 4..</li>
                <li>4. Влияние дизайна упаковки на объем продаж. URL: https://brandexpert.livejournal.com/2918.html (дата обращения: 10. 03. 2023).</li>
            </ul>
        </p>


        <!-- <Button @click.prevent="openPopup" type="original-btn">Хочу дизайн</Button> -->



        <p>
            Единый концепт корпоративного визуального стиля (фирменный стиль) – это целостная система визуальных элементов, которые формируют узнаваемый образ компании. Он включает несколько ключевых компонентов:

1. Базовые элементы:
- Логотип (основной идентификатор бренда)
- Фирменный знак или эмблема
- Цветовая палитра
- Набор шрифтов
- Корпоративные бланки и визитки

2. Расширенные элементы:
- POS-материалы
- Корпоративная форма
- Паттерны и текстуры
- Иконки и иллюстрации
- Правила вёрстки веб-страниц
- Стандарты фотосъёмки

3. Дополнительные компоненты:
- Модульные сетки для оформления
- Шаблоны для разных носителей
- Правила использования элементов
- Дизайн-система (для крупных компаний)

Такой единый концепт необходим для:
- Узнаваемости бренда
- Экономии времени и ресурсов при разработке материалов
- Создания целостного образа компании
- Унификации всех коммуникаций
- Повышения доверия клиентов

При разработке важно учитывать, что все элементы должны работать как единая система и поддерживать общую концепцию бренда. Это помогает компании выделиться на рынке и создать сильный визуальный образ, который будет легко узнаваться целевой аудиторией.
        </p>

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
                    :list="landing_list || []"
                    @emitClosePopup="closePopup"
                />   
            </DefaultPopup>
        </div>

    </Container>
</template>

<script lang="ts" setup>
    useHead({
        title: "Landing design",
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

    // onMoiunted
    onMounted(() => {
        // на всякий случай сбрасываем фиксацию прокрутки страницы при открытой модалке...
        let body = document.getElementsByTagName('body')[0]
        body.style.margin = 'unset'
        body.style.height = 'unset'
        body.style.overflow = 'unset'

        const scrollFeaturesContainer = document.getElementById("features-block");

        scrollFeaturesContainer?.addEventListener("wheel", (evt) => {
            evt.preventDefault();
            scrollFeaturesContainer.scrollLeft += evt.deltaY;
        });
    })

    // form data
    console.log(route.path)

    const { data: landing_list } = useFetch("/api/landing/landing", {
        lazy: false,
        transform: (landing_list) => {
            // return landing_list.filter((el) => {
            //     // session user is a sharer
            //     if(el.sharers && el.sharers.find((item) => item.userType === 'conspirator' && item.userId === props.auth_user_profile.userId)) {
            //         return el
            //     }
            // })
            return landing_list
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
.main-banner_container {
    /* background-color: var(--color-btn-hover-bg); */
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 450px;
}
.main-banner_el {
    /* background-color: var(--color-urgency-low-wo); */
    display: flex;
    align-items: center;
}
.main-banner_el h4 {

}


/* GALLERY */
.gallery {
    height: 500px;
  display: flex;
  gap: 20px;
  width: min-content;
  margin: 0 auto;
  padding: 30px;
  align-items: center;
}

.gallery-item {
position: relative;
width: 120px;
height: 160px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: width 0.4s;
}

.gallery-item::marker {
    content: "";
  }

.gallery-item[open] {
  width: 300px;
  height: 400px;
}

.gallery-item[open] .gallery-item_btn {
    left: 50%;
}

.gallery-item__summary {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.gallery-item__summary img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 1s;
}

.gallery-item:hover img {
  filter: brightness(1.2);
}

.gallery-item[open] img {
  filter: brightness(0.5);
}

.gallery-item__info {
  position: relative;
  padding: 24px 16px;
  /* color: #ffffff; */
}

.gallery-item__info h3,
.gallery-item__info p {
    color: var(--color-btn-text);
}

@media screen and (max-width: 575px) {

}
@media screen and (min-width: 576px) and (max-width: 767px) {

}
@media screen and (min-width: 768px) and (max-width: 991px) {

}
@media screen and (min-width: 992px) and (max-width: 1199px) {

}
@media screen and (min-width: 1200px) {
    .features_container {
        /* background-color: var(--color-btn-hover-bg); */
        display: flex;
        gap: 3rem;
        /* margin-top: 8rem; */
        -ms-overflow-style: none;  /* IE and Edge */
        overflow: scroll; 
        scrollbar-width: none; 
        max-width: 100vw!important;
    }
    .features_container::-webkit-scrollbar {
        display: none;
        -webkit-appearance: none;
        width: 0;
        height: 0;
    }
    .feature_wrapper {
    }
    .feature_header  {
        background-color: gray;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 450px;
        height: 250px;
        border-radius: 1rem;
        overflow: hidden;
        position: relative;

    }
    .feature_body {

    }
    .feature_btn {
        position: absolute;
        bottom: .5rem;
        left: .5rem;
    }
    .feature_text {
        width: 60%;
    }
    .feature_media {
        border-radius: 1rem;
        width: 40%;
        height: 100%;
        background-color: black; 
    }
}
</style>