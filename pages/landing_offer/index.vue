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
    
            <div>
                <p>"Умеет человек объяснять, 100%"</p>
                <p>Светлана Тарасова - ученица авторского курса <a rel="nofollow" href="https://vk.com/mikolenko_max">Максима Миколенко</a> по таргетированной рекламе</p>
            </div>

            <div class="block-offer_container">
                <h3>Организация маркетинга в бизнесе</h3>
                <Button @click.prevent="openPopup" type="original-btn">Обсудим боли?</Button>
            </div>  
    
        </div>
        
    </div>
    <div class="block-about_wrapper">

        <h2 style="background-color: rgba(84, 184, 82, .8); padding: 2px 4px; width: fit-content; color: #fff;">Привет, мы Максим и Сергей</h2>
        <h2 style="background-color: rgba(84, 184, 82, .8); padding: 2px 4px; width: fit-content; color: #fff;">- основатели агентства Conspirators</h2>
        <h3>Мы ваш отдел маркетинга по дизайну и продвижению бизнеса на рынке</h3>
        <p>“Три причины почему не работает маркетинг”</p>
        <div style="background-color: var(--color-urgency-low); width: 400px; height: 200px;">

        </div>
        <p>Что мы умеем:</p>
        <ul>
            <li>Оценка эффективности действующих каналов коммуникации или отдела продаж</li>
            <li>Определение вектора развития бизнеса на основании оценки текущих показателей</li>
            <li>Создание контента для вашего маркетинга(для онлайн или оффлайн концепций)</li>
            <li>Помощь в создании отдела продаж / маркетинга</li>
            <li>Подключение и сопровождение каналов коммуникации (WEB, SMM, Директ, Таргеты)</li>
            <li>Обучение персонала</li>
        </ul>
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

@media screen and (max-width: 575px) {
    .gradient-box_container {
        padding-top: 6rem;
    }
    .block-about_wrapper {
        padding-top: 2rem;
        padding-bottom: 2rem;
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
}
@media screen and (min-width: 768px) and (max-width: 991px) {
    .gradient-box_container {
        padding-top: 6rem;
    }
    .block-about_wrapper {
        padding-top: 2rem;
        padding-bottom: 2rem;
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