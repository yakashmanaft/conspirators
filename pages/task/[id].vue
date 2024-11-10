<script setup>
import {Container} from '@/shared/container'

useHead({
        title: "Задача - ",
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


    const route = useRoute()

    // COMPUTED
    //= current lead
    const current_task = computed(() => {
        // if(lead_list.value && landing_list.value) {
        //     landing_list.value.forEach(el => {

        //         if(lead_list.value.landingId === el.id) {

        //             // ДОБАВИЛИ ИМЯ ИЗ ДРУГОЙ БД
        //             lead_list.value.landing_name = el.name
        //         }
        //     })
        // }

        return task_list.value
    })

    // ******* DB
    // *** GET

    // landing
    const { data: task_list } = useFetch("/api/task/task", {
        lazy: false,
        transform: (task_list) => {
            // return landing_list.filter((el) => {
            //     // session user is a sharer
            //     if(el.sharers && el.sharers.find((item) => item.userType === 'conspirator' && item.userId === props.auth_user_profile.userId)) {
            //         return el
            //     }
            // })
            return task_list.find(el => el.id === +route.params.id)
        }
    })

    // leads
    // const { data: lead_list } = useFetch("/api/leadGuarded/lead", {
    // lazy: false,
    // transform: (lead_list) => {
    //     return lead_list.find(el => el.id === +route.params.id)
    // }
    // })
</script>


<template>
    <Container>

        <h1 class="show-max-767">Задача #{{ $route.params.id  }}</h1> 

        <div v-if="current_task">

            <p>Дата создания: {{ current_task.created_at }}</p> 
            <p>Deadline: {{ current_task.deadline }}</p>
            <p>Статус: {{  current_task.status  }}</p>
            <!-- <p>Автор: xxx</p>
            <p>Контроль реализации: xxx</p>-->
            <!-- <h2>This is a lead from: {{ current_task.landing_name }}</h2> -->
        </div>

        {{ current_task  }}
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