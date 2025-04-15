<template>
    
    <!--  -->
    <!-- <Toast
        :id="`toast_${route.path}`"
        :duration="2000"
        title="Заявка отправлена"
        content="Придумываем варианты предложения :)"
    /> -->

    <Container>

        <!-- TITLE PAGE SECTION -->
        <div class="show-max-767" style="margin-bottom: 0.5rem;">
            <BreadCrumbs/>
             
        </div>


        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
                
                <div style="grid-column: span 2;">
                    <p style="font-weight: bold; font-size: 5rem;">Журнал</p>
                    <h1 style="color: var(--color-wallet-fund-invested-wo)">А ты ведешь бортовой журнал конcпиратора?</h1>
                    <p style="width: fit-content;" @click="connect_to_journal">Присоединиться</p>
                </div>

                <div>
                    <div class="img_container"></div>
                    <h2 style="font-size: 1rem; margin-top: 1rem; text-align: center;">Ты даже не заметишь как сложный процент сделает своё дело</h2>
                    <p style="text-align: center;">Рассказ конспиратора</p>
                </div>
                <div>
                    <div class="img_container"></div>
                    <h2 style="font-size: 1rem; margin-top: 1rem; text-align: center;">Ты даже не заметишь как сложный процент сделает своё дело</h2>
                    <p style="text-align: center;">Рассказ конспиратора</p>
                </div>
                <div>
                    <div class="img_container"></div>
                    <h2 style="font-size: 1rem; margin-top: 1rem; text-align: center;">Ты даже не заметишь как сложный процент сделает своё дело</h2>
                    <p style="text-align: center;">Рассказ конспиратора</p>
                </div>
                <div>
                    <div class="img_container"></div>
                    <h2 style="font-size: 1rem; margin-top: 1rem; text-align: center;">Ты даже не заметишь как сложный процент сделает своё дело</h2>
                    <p style="text-align: center;">Рассказ конспиратора</p>
                </div>
                <div>
                    <div class="img_container"></div>
                    <h2 style="font-size: 1rem; margin-top: 1rem; text-align: center;">Ты даже не заметишь как сложный процент сделает своё дело</h2>
                    <p style="text-align: center;">Рассказ конспиратора</p>
                </div>
                <div>
                    <div class="img_container"></div>
                    <h2 style="font-size: 1rem; margin-top: 1rem; text-align: center;">Ты даже не заметишь как сложный процент сделает своё дело</h2>
                    <p style="text-align: center;">Рассказ конспиратора</p>
                </div>                <div>
                    <div class="img_container"></div>
                    <h2 style="font-size: 1rem; margin-top: 1rem; text-align: center;">Ты даже не заметишь как сложный процент сделает своё дело</h2>
                    <p style="text-align: center;">Рассказ конспиратора</p>
                </div>

                <div style="border-top: 1px solid var( --color-status-canceled); padding-top: 1rem; grid-column: span 3; display : flex; align-items: center; justify-content: space-around; gap: 2rem;">
                    <h3 style="">Авторы проекта</h3>
                    <p style="flex: 1; margin: 0;">Автор 1, Автор 2, Автор 3</p>
                </div>

                <div style="grid-column: span 3; display: grid; grid-template-columns: 1fr 1fr 1fr;">
                    <div>
                        <h4>Больше чем благотворитель</h4>
                        <p>Автор 1</p>
                    </div>
                    <div>
                        <h4>Благотворитель</h4>
                        <p>Автор 2</p>
                    </div>
                    <div>
                        <h4>Благотворитель</h4>
                        <p>Автор 3</p>
                    </div>
                </div>
                <div style="grid-column: span 2;">
                    <h4>Соучастники</h4>
                    <p>Автор 1, Автор 2, Автор 3, Автор 1, Автор 2, Автор 3, Автор 1, Автор 2, Автор 3, Автор 1, Автор 2, Автор 3, Автор 1, Автор 2, Автор 3, Автор 1, Автор 2, Автор 3, Автор 1, Автор 2, Автор 3, Автор 1, Автор 2, Автор 3, Автор 1, Автор 2, Автор 3, Автор 1, Автор 2, Автор 3, Автор 1, Автор 2, Автор 3, Автор 1, Автор 2, Автор 3</p>
                </div>
                <div>
                    <h4>Рейтинг:</h4>
                    <p style="margin: 0;">999 999 999.99 RUB</p>
                    <p style="margin: 0;">1000 проектов</p>
                    <p style="">100 соучастников</p>
                    <p>Подробнее о рейтинге</p>
                </div>
            </div>
            <div style="background-color: var(--color-operation-type-donation)">
                
                <div>
                    Предложить сбор средств
                    Инвестировать
                </div>
            </div>
        </div>

        <div class="yandex_banners-container">
            <div style="background-color: var(--color-wallet-fund-debt-wo); width: 240px; height: 400px;">

            </div>
            <div style="background-color: var(--color-wallet-fund-debt-wo); width: 300px; height: 250px;">

            </div>
            <div style="background-color: var(--color-wallet-fund-debt-wo); width: 300px; height: 300px;">

            </div>
            <div style="background-color: var(--color-wallet-fund-debt-wo); width: 300px; height: 600px;">

            </div>
        </div>


        <h4 style="margin-top: 1rem;" >LLorem</h4>



        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo ea eos quae expedita odit. s mollitia voluptate vitae error ex blanditiis quidem, excepturi quas tenetur maiores facere ratione, tempora aut! Pariatur, quisquam? Quos, facere officiis fuga nisi cupiditate, provident nulla facilis id ad, eos vel. Quis ipsum rem minus dignissimos tempore ab optio pariatur natus nisi magni molestias sint asperiores sequi, voluptatibus esse eveniet! Delectus ratione, ducimus earum voluptate officiis iste rerum voluptatum necessitatibus tempore debitis mollitia, molestiae minima id accusamus voluptatibus exercitationem? Neque totam vel quae isi illo repellendus fugiat, id repudiandae temporibus autem neque sint facere repellat provident molestias inventore mpedit. Nesciunt voluptatem praesentium laudantium rerum quibusdam soluta. Recusandae fugit eligendi delectus explicabo error impedit esse iusto, aliquam perferendis non. Dolore, inventore! Ratione nobis architecto expedita iste veniam voluptatem modi sapiente!</p>

        <!-- POPUP -->
         <!-- <div v-if="popup_opened">

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
        </div> -->

    </Container>
</template>

<script lang="ts" setup>
    useHead({
        title: "journal",
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

    // ON CLICK
    //
    //= connect_to_journal
    const connect_to_journal = () => {
        alert('journal_connect... в разработке')
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
.yandex_banners-container {
    display: none;
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
    .img_container {
        background-color: var(--color-btn-hover-bg);
        width: 100%;
        height: 15rem;
        background: url('https://cdn1.ozone.ru/s3/multimedia-l/6263146341.jpg');
        background-position: center;
        background-size: cover;  
    }

    .yandex_banners-container {
        margin-top: 1rem;
        display: flex;
        gap: 1rem;
        align-items: flex-end;
        justify-content: space-between;
    }
}
</style>