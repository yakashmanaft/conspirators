<template>
    <Container>
        <h1>landing unidrum</h1>
        <h2>Звуки всленной в ваших руках</h2>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam molestias fugit expedita quasi delectus culpa iste unde consequatur amet aliquam quisquam dolorem ullam odit voluptatem provident deleniti quos, hic sit repellat debitis eum sapiente? Blanditiis, doloribus asperiores. Dignissimos laudantium nobis autem iste voluptatem pariatur ratione, recusandae fuga at debitis? Labore delectus numquam voluptas? Sapiente magni corrupti deleniti, excepturi, dolores, omnis ipsa aut reprehenderit nisi qui perferendis culpa doloremque expedita aliquam beatae ducimus laborum eius saepe. Vel velit fuga rem quod praesentium? Amet illum beatae hic, cupiditate atque excepturi consectetur, cumque voluptates facere officia in? Vitae nihil rerum labore ea tempore!</p>

        <!-- <Button @click.prevent="openPopup" type="original-btn">Хочу лиды</Button> -->


        <!-- POPUP -->
        <!-- <DefaultPopup
            id="popup-default-callback_offer"        
            v-if="popup_opened"
            popup_title="Форма обратной связи"
            @emitClosePopup="closePopup"
        >


            <Form_landing_offer></Form_landing_offer>

            <br>
        </DefaultPopup> -->

    </Container>
</template>

<script lang="ts" setup>
    useHead({
        title: "unidrum",
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
    // import { DefaultPopup } from '@/shared/popup';

    // components
    // import { Button } from '@/components/button';
    // import { Form_landing_offer } from '@/components/form'

    // // variables
    // const popup_opened = ref(false)

    // // pop-up
    // const openPopup = () => {
    //     popup_opened.value = true
    // }
    // const closePopup = () => {
    //     popup_opened.value = false
    // }

    // watch(popup_opened, () => {
    //     let body = document.getElementsByTagName('body')[0]
    //     if(popup_opened.value) {
    //         body.style.position = 'fixed';
    //     } else {
    //         body.style.position = 'unset'
    //     }
    // })

    // onMoiunted
    onMounted(() => {
        // на всякий случай сбрасываем фиксацию прокрутки страницы при открытой модалке...
        let body = document.getElementsByTagName('body')[0]
        body.style.margin = 'unset'
        body.style.height = 'unset'
        body.style.overflow = 'unset'
    })

</script>

<style scoped>

</style>