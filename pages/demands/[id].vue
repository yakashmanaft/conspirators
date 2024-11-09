<script setup>
import {Container} from '@/shared/container'

useHead({
        title: "Проект - ",
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

        <h1 class="show-max-767">Заявка #{{ $route.params.id  }}</h1> 

        <div v-if="current_lead">

            <p>Дата создания: {{ current_lead.created_at }}</p> 
            <p>Статус: {{  current_lead.status  }}</p>
            <p>Связать с заказчиком</p>
            <!-- <p>Deadline: xxx</p>
            <p>Автор: xxx</p>
            <p>Контроль реализации: xxx</p>-->
            <h2>This is a lead from: {{ current_lead.landing_name }}</h2>
        </div>

        {{ current_lead  }}
        <!-- <div v-for="(item, index) in currentDemand.itemsList">
            <p>{{index + 1 }}.{{ item }}</p>
        </div> -->
        <!-- <br>
        {{ landing_list }} -->
    </Container>
</template>

<style scoped>

@media screen and (max-width: 767px) {
    /* h1 {
        margin-top: 4rem;
    } */
         .show-max-767 {
      display: none;
    }
}
@media screen and (min-width: 768px) {
  /* h1 {
    margin-top: 6rem;
  } */
}
</style>