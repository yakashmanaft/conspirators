<template>
    
    <!--  -->
    <Toast
        :id="`toast_${route.path}`"
        :duration="2000"
        title="Заявка отправлена"
        content="Придумываем варианты предложения :)"
    />
    
    <div class="gradient-box_container" >


        <div class="gradient-box_wrapper">

            <!-- TITLE PAGE SECTION -->
            <div class="show-max-767" style="margin-bottom: 0.5rem;">
                <BreadCrumbs style="background-color: #fff; width: fit-content; padding: 2px 4px;"/>
                <!--  -->
                <h1 style="padding: 2px 4px; margin: 0; margin-top: 1rem; background-color: #fff; width: fit-content">Ваш отдел маркетинга</h1> 
                <!--  -->
                <h2 style="padding: 2px 4px; margin-top: 1rem; background-color: #fff; width: fit-content;">по цене специалиста</h2>
            </div>
    
            <div class="comment-main_wrapper">
                <p>"Умеет человек объяснять, 100%"</p>
                <p>Светлана Тарасова - ученица авторского курса <a target="_blank" rel="nofollow" href="https://vk.com/mikolenko_max">Максима Миколенко</a> по таргетированной рекламе</p>
            </div>

            <div class="block-offer_container">
                <h3>Организация маркетинга в бизнесе</h3>
                <Button @click.prevent="openPopup" bg="bg-stroke" type="pseudo-btn">Обсудим боли?</Button>
            </div>  
    
        </div>
        
    </div>
    <div class="block-about_wrapper">

        <div>

            <h2 style="background-color: rgba(84, 184, 82, .8); padding: 2px 4px; width: fit-content; color: #fff;">Привет, мы Максим и Сергей</h2>
            <h2 style="background-color: rgba(84, 184, 82, .8); padding: 2px 4px; width: fit-content; color: #fff;">- основатели агентства Conspirators</h2>
        </div>

        <div class="contact-block_wrapper" style="margin-top: 2rem;">
            <ul>
                <li>
                    <p><span><nuxt-link to="tg://resolve?domain=Kashmanaft">Сергей Анфалов</nuxt-link></span></p>
                </li>
                <li>
                    <p><span><nuxt-link to="https://vk.com/mikolenko_max">Максим Миколенко</nuxt-link></span></p>
                </li>
            </ul>
        </div>

        <section class="section-video_wrapper" style="margin-top: 2rem; display: flex; gap: 2rem;">
            
            
            <video id="aboutVideo" style="width: 50%;" controls="controls" src="@/assets/video/01_three-reasons.mp4"></video>
            
            <div class="video_desc" style="width: 50%; display: flex; flex-direction: column; align-items: flex-end">

                <h3 style="background-color: var(--color-status-canceled); padding: 2px 4px; text-align: right;">Три причины почему не работает маркетинг</h3>
                <p style="background-color: var(--color-status-canceled); padding: 2px 4px;">по версии <a rel="nofollow" target="blank" href="https://vk.com/mikolenko_max">Максима Миколенко</a></p>
            </div>
        </section>

        <!--  -->
        <section style="margin-top: 2rem;">

            <h3>Мы ваш отдел маркетинга по дизайну и упаковке бизнеса на рынке</h3>
            <ul style="margin-top: 2rem;">
                <li><p>Оценка эффективности действующих каналов коммуникации или отдела продаж</p></li>
                <li><p>Определение вектора развития бизнеса на основании оценки текущих показателей</p></li>
                <li><p>Создание контента для вашего маркетинга(для онлайн или оффлайн концепций)</p></li>
                <li><p>Помощь в создании отдела продаж / маркетинга</p></li>
                <li><p>Подключение и сопровождение каналов коммуникации (WEB, SMM, Директ, Таргеты)</p></li>
                <li><p>Обучение персонала</p></li>
            </ul>
            <div style="margin-top: 3rem; margin-bottom: 2rem;">
                <Button @click.prevent="openPopup" bg="bg-stroke" type="pseudo-btn">Обсудим?</Button>
            </div>
        </section>
    </div>

    <!-- POPUP -->
     <div v-if="popup_opened">

         <DefaultPopup
            id="popup-default-callback_offer"  
            popup_title="Форма обратной связи" 
            @emitClosePopup="closePopup"
             
         >
            <p>А чем вы занимаетесь?</p>
            <input type="text" placeholder="Укажите сферу деятельности"/>
            <br/>
            <p>У вас был опыт работы с таргетированной рекламой?</p>
            <p>Да / Нет</p>
            <br/>
            <p>Для первого знакомства не хватает способа с вами связаться:</p>
            <input type="text" placeholder="Вы берите вариант для связи"/>
            <br/>
            <p>Благодарим за интерес, значит нам с вами по пути. Мы записали созвон с вами в свой ежедневник. Нам необходимо некоторое время, дабы подобрать наиболее актуальное для вашей сферы</p>
            <p>С уважением, ваш отдел маркетинга</p>
            <br/>
            <p>А пока, предлагаем поглядеть наши кейсы: BUTTON</p>
            
            <Form_landing_offer
                :path="route?.path"
                :list="landing_list || []"
                @emitClosePopup="closePopup"
            />   
        </DefaultPopup>
    </div>
</template>

<script lang="ts" setup>
    useHead({
        title: "Ваш отдел маркeтинга",
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
    import { DefaultPopup } from '~/shared/popup';
    import { Container } from '~/shared/container';

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
.gradient-box_container {
    position: relative;
    background-image: linear-gradient(90deg, rgba(84, 184, 82, 100) 10%, rgba(0,0,0,0)); 
    height: 100vh; 
}
.block-about_wrapper,
.gradient-box_wrapper {
    max-width: 1399px;
    margin: 0 auto; 
}
.block-offer_container {
    position: absolute; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
    background-color: #fff;
}

.comment-main_wrapper {
    position: absolute;
    bottom: 2rem;
    right: 0;
    background-color: var(--color-btn-disabled-bg);
}

ul {
    list-style: none;
    padding: 0;
}
ul li {
    margin-top: 0.2rem;
    padding-left: 2rem;
    position: relative;
}
ul li:before {
    content: '';
    position: absolute;
    left: 0;
    width: 1.5rem;
    height: 1.5rem;
    background-color: rgba(84, 184, 82, .8);
}

@media screen and (max-width: 575px) {
    .gradient-box_container {
        padding-top: 6rem;
    }
    .block-about_wrapper {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
    .contact-block_wrapper,
    section {
        padding: 0 0.5rem;
    }
    .section-video_wrapper {
        flex-direction: column;
        gap: 1rem!important;
    }
    .section-video_wrapper video {
        width: 100%!important;
    }
    .section-video_wrapper .video_desc {
        width: 100%!important;
        align-items: flex-start!important;
    }
    .section-video_wrapper .video_desc h3 {
        text-align: unset!important;
    }
}
@media screen and (min-width: 576px) and (max-width: 767px){
    .gradient-box_container {
        padding-top: 6rem;
    }
    .block-about_wrapper {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
    .contact-block_wrapper,
    section {
        padding: 0 1rem;
    }
    .section-video_wrapper {
        flex-direction: column;
        gap: 1rem!important;
    }
    .section-video_wrapper video {
        width: 100%!important
    }
    .section-video_wrapper .video_desc {
        width: 100%!important;
    }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
    .gradient-box_container {
        padding-top: 6rem;
    }
    .block-about_wrapper {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
    .contact-block_wrapper,
    section {
        padding: 0 2rem;
    }
    .section-video_wrapper {
        flex-direction: column;
        gap: 1rem!important;
    }
    .section-video_wrapper video {
        width: 100%!important
    }
    .section-video_wrapper .video_desc {
        width: 100%!important;
    }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
    .gradient-box_container {
        padding-top: 6rem;
    }
    .block-about_wrapper {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
    .contact-block_wrapper,
    section {
        padding: 0 2rem;
    }
}
@media screen and (min-width: 1200px) {
    .gradient-box_container {
        padding-top: 6rem;
    }
    .block-about_wrapper {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
}
</style>