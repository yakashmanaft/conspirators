<template>
    <Container>

        <h1>Мои посевы</h1>

        <p>{{ props?.auth_user_profile }}</p>

        <div v-for="page in landing_list" style="border-bottom: 1px solid var(--color-global-text); margin-top: 1rem; display: flex; align-items: center; gap: 1rem; padding-bottom: 1rem;">
            <Button type="pseudo-btn" :link="`/landing_${page.name}`">{{ page.name }}</Button>
            
            <div>{{ page }}</div>
        </div>

        <h2>type: вид лида (возможно отдельный леджер)</h2>

        <pre>
        {
            created_at: string,
            from: number  (id of landing in db Landing)
            name: string (имя или как обращаться)
            content: Json (вопрос - ответ)
            contact: string (ссылка, значение, номер мобилки)
            contactType: string (тип контакта (телега, телефон, другое))
        }
        </pre>

        <p>https://qna.habr.com/q/1163286</p>

    </Container>
</template>

<style scoped></style>

<script lang="ts" setup>
    useHead({
        title: "landing all",
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

    // components
    import { Button } from '@/components/button'

    // PROPS
    const props = defineProps({
        auth_user_profile: {
            type: Object,
            default: {}
        },
    })

    // ******* DB
    // *** GET
    // landing
    const { data: landing_list } = useFetch("/api/landing/landing", {
        lazy: false,
        transform: (landing_list) => {
            return landing_list.filter((el) => {
                // session user is a sharer
                if(el.sharers && el.sharers.find((item) => item.userType === 'conspirator' && item.userId === props.auth_user_profile.userId)) {
                    return el
                }
            })
        }
    })

    
</script>