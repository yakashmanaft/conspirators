<script setup>
// shared
import {Container} from '@/shared/container'
import { Section } from '@/shared/section';

//components
import { BreadCrumbs } from '~/components/breadcrumbs';
import { Button } from '~/components/button';

useHead({
        title: `Заявка`,
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

    // const listItemType = ref([])

    // Инструмент
    // tools

    // Расходники
    // consumables

    // Техника
    // technic

    // Материалы
    // stuff

    const currentDemand = {
        id: 1,
        title: 'заявка #111 от 21.02.2024',
        itemsList: [
            {
                id: 1,
                title: 'Бетон B25F150W4 п4',
                itemMeasure: 'куб.м.',
                qty: 22,
            },
            {
                id: 2,
                title: 'Круг на циркулярку D190 по деревув с мелкии зубьями',
                itemMeasure: 'шт.',
                qty: 10,
            },
            {
                id: 3,
                title: 'УШМ 230',
                itemMeasure: 'шт.',
                qty: 2,
            },
            {
                id: 4,
                title: 'Огнебиозащита Сенеж, 25л',
                itemMeasure: 'кан',
                qty: 4,
            },
            {
                id: 5,
                title: 'Металлочерепица Монтерей, 0,5мм, Призма, RAL',
                itemMeasure: 'кв.м.',
                qty: 582.4,
            },
            {
                id: 6,
                title: 'Автокран, ГП 25т., стрела 21,7м.',
                itemMeasure: 'маш/час',
                qty: 1560,
            },
            {
                id: 7,
                title: 'Доска обрезная 25х100х3000, I сорт',
                itemMeasure: 'шт.',
                qty: 120,
            }
        ]
    }

    const route = useRoute()

    // COMPUTED
    //= current lead
    const current_lead = computed(() => {
        if(lead_list.value && landing_list.value) {
            landing_list.value.forEach(el => {

                if(lead_list.value.landingId === el.id) {

                    // ДОБАВИЛИ ИМЯ ИЗ ДРУГОЙ БД
                    lead_list.value.landing_name = el.name
                }
            })
        }
        return lead_list.value
    })

    //  CLICK
    //= current_lead to project
    const connectToProject = () => {
        alert('В разработке...')
    }
    // change Current Lead Status
    const changeCurrentLeadStatus = () => {
        alert('В разработке...')
    }

    // ******* DB
    // *** GET

    // landing
    const { data: landing_list } = useFetch("/api/landingGuarded/landing", {
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

    // leads
    const { data: lead_list } = useFetch("/api/leadGuarded/lead", {
    lazy: false,
    transform: (lead_list) => {
        return lead_list.find(el => el.id === +route.params.id)
    }
    })
</script>


<template>
    <Container>

        <div class="show-max-767" style="margin-bottom: 0.5rem;">
            <BreadCrumbs/>
            <h1 style="margin: 0;">Заявка с огорода</h1> 
            
        </div>

        <div v-if="current_lead" class="section_container">

            <!-- current lead info -->
            <Section 
                fDirection = "column"
            >

            
                <div class="status_container">
                    <div>
                        <p style="margin: 0;">От: {{ current_lead.created_at }}</p> 

                        <p style="margin: 0;">Статус: <span style="text-decoration: underline; text-decoration-style: dotted;" @click="changeCurrentLeadStatus()">{{  current_lead.status  }}</span></p>
                    </div>
                    <div>
                        <!-- if status LEAD -->
                        <Button style="margin: 0;" @click="connectToProject()" v-if="current_lead.status === 'lead'" type="original-btn">Прикрепить к проекту</Button>
                        <!-- if status PROJECT -->
                        <Button v-else-if="current_lead.status === 'project'" type="original-btn" link="/projects"><nuxt-link to="/projects">В проект</nuxt-link></Button>
                        
                    </div>
                </div>
            </Section>

            <!-- current lead грядка -->
            <Section style="margin-top: 1rem;">
                <!-- ABOUT ГРЯДКА -->
                <div style="margin-top: 1rem;">
                    <h2>Грядка: {{ current_lead.landing_name }}</h2>
                    {{ current_lead  }}
                </div>

            </Section>

        </div>

        <!-- <div v-for="(item, index) in currentDemand.itemsList">
            <p>{{index + 1 }}.{{ item }}</p>
        </div> -->
        <!-- <br>
        {{ landing_list }} -->
    </Container>
</template>

<style scoped>

.status_container {
    /* background-color: red; */
    display: flex;
    align-items: center;
    justify-content: space-between;
}

@media screen and (max-width: 575px) {
    .show-max-767 {
      display: none;
    }
    .section_container {
        padding-left: .5rem;
        padding-right: .5rem;
        display: flex;
        flex-direction: column;
    }
    .section_wrapper {

    }
    .status_container {
        /* padding-left: .5rem;
        padding-right: .5rem; */
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }
}   
@media screen and (min-width: 576px) and (max-width: 767px) {
    .show-max-767 {
      display: none;
    }
    .section_container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
    /* .status_container {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    } */
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
    .status_container {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
}
@media screen and (min-width: 1200px) {
    .status_container {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
}
</style>