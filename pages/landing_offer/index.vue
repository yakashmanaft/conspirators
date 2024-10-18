<template>
    <Container>
        <h1 style="margin-top: 5rem;">landing offer</h1>
        <h2>Ваш отдел маркетинга</h2>
        <p>Настроим связку взаимодействий Бизнес - Заказчик</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam molestias fugit expedita quasi delectus culpa iste unde consequatur amet aliquam quisquam dolorem ullam odit voluptatem provident deleniti quos, hic sit repellat debitis eum sapiente? Blanditiis, doloribus asperiores. Dignissimos laudantium nobis autem iste voluptatem pariatur ratione, recusandae fuga at debitis? Labore delectus numquam voluptas? Sapiente magni corrupti deleniti, excepturi, dolores, omnis ipsa aut reprehenderit nisi qui perferendis culpa doloremque expedita aliquam beatae ducimus laborum eius saepe. Vel velit fuga rem quod praesentium? Amet illum beatae hic, cupiditate atque excepturi consectetur, cumque voluptates facere officia in? Vitae nihil rerum labore ea tempore!</p>
        
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
    import { Container } from '@/shared/container'
</script>

<style scoped>

</style>