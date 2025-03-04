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

    </Container>

    <div class="features_container" style="color:var(--color-global-text_second);">


    </div>
    
    <Container>
        <h2 style="display: block; font-size: 2rem;">
    
            <span style="font-weight: 200; line-height: 1.5; color: var(--color-global-text_second)">
                До 75% заказчиков принимают решение о покупке увидев упаковку?*                Самый верный способ реализовать всю айдентику (фирменный стиль) -
                <span style="background-color: var(--color-btn-hover-bg); width: fit-content;">творить визуал.</span> 
                Единый концепт корпоративного визауала (базовые, расширенные и дополнительные элементы) для каждой ниши или канала коммуникации
                <p style="background-color: var(--color-btn-hover-bg); width: fit-content;">Чего дизайнить изволите, сэр?</p>
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
                            <h3>Визуализация твоих идей для карточек товара, милорд :P</h3>
                            <p>Отрисовываем слайды карточки товарова для всех популярных маркетплейсов (OZON, WILDBERRIES)</p>
                        </div>
                    </details>
                    <!--  -->
                    <details class="gallery-item" name="gallery">
                        <summary class="gallery-item__summary"> 
                            <img src="@/assets/img/cards_project_1/02_1.webp" width="300" height="400" alt="Дизайн карточек товара для OZON/WILDBERRIES/Я.Маркет">
                        </summary>
                        <div class="gallery-item__info">
                            <h3>Дизайн упаковки, сэр!</h3>
                            <p>Делаем вместе упаковку, которую покупают</p>
                        </div>
                    </details>
                    <!--  -->
                    <details class="gallery-item" name="gallery">
                        <summary class="gallery-item__summary"> 
                            <img src="@/assets/img/cards_project_1/03_1.webp" width="300" height="400" alt="Дизайн карточек товара для OZON/WILDBERRIES/Я.Маркет">
                        </summary>
                        <div class="gallery-item__info">
                            <h3> Фирменный стиль, создатель</h3>
                            <p>Запускаете или обновляете проект?  Закроем вопрос реализации фирменного визуала</p>
                        </div>
                    </details>
                    <!--  -->
                    <details class="gallery-item" name="gallery" open style="background-color: var(--color-btn-hover-bg)">
                        <summary class="gallery-item__summary" style="display: flex;align-items: center; justify-content: center;"> 
                            <div>></div>
                            <!-- <img src="@/assets/img/cards_project_1/01_1.webp" width="300" height="400" alt="Дизайн карточек товара для OZON/WILDBERRIES/Я.Маркет"> -->
                        </summary>
                        <div class="gallery-item__info">
                            <h3>Составить ТЗ на пробный дизвайн</h3>
                            <p>Начнем с тз, оплата у нас почасовая</p>
                        </div>
                    </details>
                </div>
            </div>
        </div>



        <h3>Мы займемся разработкой визуала, с тебя - мысль, перебирать варианты, выбирать лучшее</h3>
        <h4 style="font-weight: 200">Визуальных дел конспираторы высвободят твое время</h4>
        <br>
        <br>
        <br>
        <ul>
            <li>
                <p>Составить ТЗ на пробный дизайн</p>
                <p>Набросать концепции  визуального сопровождения товаров или услуг</p>
            </li>
            <li>
                <p>Концепции фирменного стиля в полиграфии (приводим элементы образа предприятия к общему визуалу)</p>
            </li>
            <li>
                <p>Дизайн упаковки, сэр!</p>
                <p>Делаем вместе упаковку, которую покупают</p>
                <p>Разработка визуальной упаковки проектов</p>
                <p>Сопровождение стиля для всех каналов коммуникации</p>
            </li>
            <li>
                <p>Продаешь на маркетплейсах?</p>
                <p>Карточки товаров для маркетплейсов</p>
                <p>Визуализация твоих идей для карточек товара, милорд :P</p>
            </li>
            <li>
                <p>Web и визуальное сопровождение в сети</p>
                <p>Лендинги с карточками товаров</p>
                <p>Информационные лендинги</p>
                <p>Лендинги лид-формы</p>
            </li>
            <li>
                <p>Медиа материалы для усиления визала бренда</p>
                <p>Съемка и продакшн видео</p>
                <p>Фотосъемки + применение в каналах коммуникации</p>
            </li>
        </ul>

        <p>
            <span>*Библиографические ссылки</span>
            <ul>
                <li>1. Глазами покупателя: как упаковка влияет на продажи. URL: https://p-pspb.ru/blog/glazami-pokupatelya-kak-upakovka-vliyaet-na-prodazhi/ (дата обращения: 10. 03. 2023).</li>
                <li>2. Как дизайн упаковки влияет на продажи. URL: https://artsdelka.ru/kak-dizaynupakovki-vliyaet-na-prodazhi (дата обращения: 10. 03. 2023).</li>
                <li>3. Сироткина И. В. Рекламные возможности упаковки // Современная торговля.2007. № 4..</li>
                <li>4. Влияние дизайна упаковки на объем продаж. URL: https://brandexpert.livejournal.com/2918.html (дата обращения: 10. 03. 2023).</li>
            </ul>
        </p>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam molestias fugit expedita quasi delectus culpa iste unde consequatur amet aliquam quisquam dolorem ullam odit voluptatem provident deleniti quos, hic sit repellat debitis eum sapiente? Blanditiis, doloribus asperiores. Dignissimos laudantium nobis autem iste voluptatem pariatur ratione, recusandae fuga at debitis? Labore delectus numquam voluptas? Sapiente magni corrupti deleniti, excepturi, dolores, omnis ipsa aut reprehenderit nisi qui perferendis culpa doloremque expedita aliquam beatae ducimus laborum eius saepe. Vel velit fuga rem quod praesentium? Amet illum beatae hic, cupiditate atque excepturi consectetur, cumque voluptates facere officia in? Vitae nihil rerum labore ea tempore!</p>

        <Button @click.prevent="openPopup" type="original-btn">Хочу дизайн</Button>

        <h4 style="margin-top: 1rem;" >LLorem</h4>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo ea eos quae expedita odit. s mollitia voluptate vitae error ex blanditiis quidem, excepturi quas tenetur maiores facere ratione, tempora aut! Pariatur, quisquam? Quos, facere officiis fuga nisi cupiditate, provident nulla facilis id ad, eos vel. Quis ipsum rem minus dignissimos tempore ab optio pariatur natus nisi magni molestias sint asperiores sequi, voluptatibus esse eveniet! Delectus ratione, ducimus earum voluptate officiis iste rerum voluptatum necessitatibus tempore debitis mollitia, molestiae minima id accusamus voluptatibus exercitationem? Neque totam vel quae isi illo repellendus fugiat, id repudiandae temporibus autem neque sint facere repellat provident molestias inventore mpedit. Nesciunt voluptatem praesentium laudantium rerum quibusdam soluta. Recusandae fugit eligendi delectus explicabo error impedit esse iusto, aliquam perferendis non. Dolore, inventore! Ratione nobis architecto expedita iste veniam voluptatem modi sapiente!</p>

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

/* features_container */
.features_container {
    margin-top: -5rem;
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
</style>