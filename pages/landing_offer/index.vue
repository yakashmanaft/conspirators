<template>
    <Container>
        <h1>landing offer</h1>
        <h2>Ваш отдел маркетинга</h2>
        <h3>Настроим связку взаимодействий Бизнес - Заказчик</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam molestias fugit expedita quasi delectus culpa iste unde consequatur amet aliquam quisquam dolorem ullam odit voluptatem provident deleniti quos, hic sit repellat debitis eum sapiente? Blanditiis, doloribus asperiores. Dignissimos laudantium nobis autem iste voluptatem pariatur ratione, recusandae fuga at debitis? Labore delectus numquam voluptas? Sapiente magni corrupti deleniti, excepturi, dolores, omnis ipsa aut reprehenderit nisi qui perferendis culpa doloremque expedita aliquam beatae ducimus laborum eius saepe. Vel velit fuga rem quod praesentium? Amet illum beatae hic, cupiditate atque excepturi consectetur, cumque voluptates facere officia in? Vitae nihil rerum labore ea tempore!</p>

        <Button @click.prevent="openPopup" type="original-btn">Хочу лиды</Button>

        <h4 style="margin-top: 1rem;" >LLorem</h4>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo ea eos quae expedita odit. s mollitia voluptate vitae error ex blanditiis quidem, excepturi quas tenetur maiores facere ratione, tempora aut! Pariatur, quisquam? Quos, facere officiis fuga nisi cupiditate, provident nulla facilis id ad, eos vel. Quis ipsum rem minus dignissimos tempore ab optio pariatur natus nisi magni molestias sint asperiores sequi, voluptatibus esse eveniet! Delectus ratione, ducimus earum voluptate officiis iste rerum voluptatum necessitatibus tempore debitis mollitia, molestiae minima id accusamus voluptatibus exercitationem? Neque totam vel quae isi illo repellendus fugiat, id repudiandae temporibus autem neque sint facere repellat provident molestias inventore mpedit. Nesciunt voluptatem praesentium laudantium rerum quibusdam soluta. Recusandae fugit eligendi delectus explicabo error impedit esse iusto, aliquam perferendis non. Dolore, inventore! Ratione nobis architecto expedita iste veniam voluptatem modi sapiente!</p>

        <!-- POPUP -->
         <div v-if="popup_opened">

            <!-- <DefaultPopup
                id="popup-default-callback_offer"  
                popup_title="Форма обратной связи"
                @emitClosePopup="closePopup"
            /> -->

             <DefaultPopup
                id="popup-default-callback_offer"  
                popup_title="Форма обратной связи"
                @emitClosePopup="closePopup"
                 
             >
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores porro ad ea ipsam enim veniam quidem recusandae. Ipsum perspiciatis illo veritatis quis sequi quam </p>
                <Form_landing_offer
                    :path="route?.path"
                    :list="landing_list"
                    @emitClosePopup="closePopup"
                />   

            </DefaultPopup>
        </div>
        <!-- <Form_landing_offer
            :path="route.path"
            @emitClosePopup="closePopup"
        ></Form_landing_offer> -->

    </Container>
</template>

<script lang="ts" setup>
    useHead({
        title: "offer",
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
    import { DefaultPopup } from '@/shared/popup';

    // components
    import { Button } from '@/components/button';
    import { Form_landing_offer } from '@/components/form'

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
            body.style.position = 'fixed';
        } else {
            body.style.position = 'unset'
        }
    })


</script>

<style scoped>

</style>