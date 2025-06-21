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

        <h1>Название статьи</h1>

        <p>Ты с теми, кому доверяешь. Идея банка: начните со 100 рублей в неделю. Можете обьединиться с другом, можете с кем-то из семейных...</p>
        <p>Здесь растет ответственность, так как ты ответственнен за деньги не только перед собой, но и перед человеком, которого уважаешь и не хочешь подставлять.</p>
        <p>Так вот, начали мы со 100 рублей в неделю, посмотрим на что способен сложный процент в долгосроке</p>
        <p>Незаметные суммы в будущем сделают твою жизнь интереснее, можешь даже кому-то помочь</p>
        <p>Кстати, вот сборы на благотворительность или коммерческие проекты</p>

        <p>Возвраст идеи банка двоих уже 7 лет</p>
        <p>Собрано еженедельными взносами 1000000</p>
        <p>Собрано донатами 10000</p>
        <p>+ % с развития получается, так как не делаешь банк, не вносишь суммы, не мыслишь в сторону развития банка, а значит, как следствие, упускаешь всевозможные проекты, которые можшь реализовать в рамках данных банков...</p>
        <p>Вот и получается что 100: это быстрее нежели под подушку откладывать и тратить самому по своим хотелкам</p>



        <h4 style="margin-top: 1rem;" >YFpdfybt</h4>


        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo ea eos quae expedita odit. s mollitia voluptate vitae error ex blanditiis quidem, excepturi quas tenetur maiores facere ratione, tempora aut! Pariatur, quisquam? Quos, facere officiis fuga nisi cupiditate, provident nulla facilis id ad, eos vel. Quis ipsum rem minus dignissimos tempore ab optio pariatur natus nisi magni molestias sint asperiores sequi, voluptatibus esse eveniet! Delectus ratione, ducimus earum voluptate officiis iste rerum voluptatum necessitatibus tempore debitis mollitia, molestiae minima id accusamus voluptatibus exercitationem? Neque totam vel quae isi illo repellendus fugiat, id repudiandae temporibus autem neque sint facere repellat provident molestias inventore mpedit. Nesciunt voluptatem praesentium laudantium rerum quibusdam soluta. Recusandae fugit eligendi delectus explicabo error impedit esse iusto, aliquam perferendis non. Dolore, inventore! Ratione nobis architecto expedita iste veniam voluptatem modi sapiente!</p>



    </Container>
</template>

<script lang="ts" setup>
    useHead({
        title: "Название статьи",
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