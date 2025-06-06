<template>


    <!-- Content of the page -->
    <Container>

        <div style="margin-bottom: 0.5rem;">
            <BreadCrumbs class="show-max-767"/>
            <h1 class="show-max-767" style="font-weight: bold; font-size: 42px;">Whitepaper</h1>
            <p></p> 
        </div>

        <div>
            123
        </div>

        <!-- lENGTH TRUE -->
        <!-- <div v-if="computed_landing_list?.length" class="item_container">
            
            <div class="item_wrapper" v-for="item in computed_landing_list">
                {{ item }}
                <p style="margin: 0;" @click.stop="$router.push(`/${item.name}`)">Перейти</p>
            </div>
        </div> -->

        <!-- ELSEs -->
        <!-- <div class="no-landing_wrapper" v-else>В магазине пусто</div> -->


    </Container>
</template>

<style scoped>

    @media screen and (max-width: 575px) {
        h1 {
            margin: 0 1rem!important;
        }
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
        h1 {
            margin: 0 1rem;
        }
    }
    @media screen and (max-width: 767px) {
        .show-max-767 {
            display: none;
        }
    }
    @media screen and (min-width: 768px) {

    }
    @media screen and (min-width: 768px) and (max-width: 991px) {

    }

    @media screen and (min-width: 992px) {

    }
    @media screen and (min-width: 992px) and (max-width: 1199px) {

    }
    @media screen and (min-width: 1200px) {

    }
</style>

<script lang="ts" setup>
    useHead({
        title: "Whitepaper",
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

    // VARIABLES
    const router = useRouter()


    // shared
    import { Container } from '@/shared/container'
    import { Section } from '@/shared/section'
    import { InfoPopup } from '~/shared/popup';

    // components
    import { Button } from '@/components/button'
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


    // ******* COMPUTED
    // landing_list
    // const computed_landing_list = computed(() => {
        // if(landing_list.value) {

            // type Obj = {
            //     id: Number,
            //     // leads: {}[]
            // }

            // let result: any = []

            // landing_list.value?.forEach(landing => {
                
            //     let leads = lead_list.value?.reduce((arr: {}[], lead) => {
            //         if(lead.landingId === landing.id) {
            //             arr.push({
            //                 lead_id: lead.id,
            //                 created_at: lead.created_at,
            //                 status: lead.status,
            //                 urgency: lead.urgency
            //                 // landing_id: lead.landingId
            //             })
            //         }

            //         return arr
            //     }, [])

            //     result.push({
            //         id: landing.id,
            //         name: landing.name,
            //         leads: leads,
            //         created_at: landing.created_at,
            //         update_at: landing.update_at
            //     })
            // });
            
            // console.log(result)
            // return landing_list.value
        // }
    // })
    





    // // ******* DB
    // // *** GET
    // // landing
    // const { data: landing_list } = useFetch("/api/landing/landing", {
    //     lazy: false,
    //     transform: (landing_list) => {
    //         return landing_list
    //         // .filter((el) => {
    //         //     // session user is a sharer
    //         //     if(el.sharers && el.sharers.find((item) => item.userType === 'user' && item.userId === props.auth_user_profile.userId)) {
    //         //         return el
    //         //     }
    //         // })
    //     }
    // })


    
</script>