<template>
    <Container>
        <h1>Вот мы тут</h1>
        <p><span><nuxt-link to="tg://resolve?domain=Kashmanaft">@Kashmanaft</nuxt-link></span></p>
    </Container>
</template>

<script lang="ts" setup>
    useHead({
        title: "Кто? Где? Как?",
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
    import { Container } from '@/shared/container'
</script>

<style scoped>

</style>