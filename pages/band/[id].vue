<script setup lang="ts">
// shared
import {Container} from '@/shared/container'

// components
import { BreadCrumbs } from '~/components/breadcrumbs';
import { Button } from '~/components/button';
import { Chip } from '~/components/chip';

useHead({
        title: "Кооператив конспираторов",
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

    //CHIPS
    const chips = [
        {
            title: 'Общее'
        },
        {
            title: 'ТЗ'
        },
        {
            title: 'Выполнение'
        }
    ]
    const currentChip = ref({
        title: 'Выполнение'
    })

    const route = useRoute()

    // CLICK
    const addTaskLedgerItem = () => {
        alert('В разработке')
    }
    const changeChip = (obj: any) => {
        currentChip.value = obj
    }

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

        // return task_list.value
        return []
    })



    // ******* DB
    // *** GET

    // task list
    const { data: task_list } = useFetch("/api/taskGuarded/task", {
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

    // task ledger item
    const { data: task_ledger } = useFetch("/api/taskLedgerGuarded/taskElement", {
        lazy: false,
        transform: (task_ledger) => {

            if(current_task.value) {

                return task_ledger.filter(el => el.taskId === current_task.value.id)
            }
        }
    }) 

    //= projects
    const { data: current_project } = useFetch("/api/projectGuarded/project", {
        lazy: false,
        transform: (project_list) => {
            return project_list.find((el) => {
                // session user is a sharer
                return el.id === current_task.value.projectId
            })
        }
    })

    //HELPERS


    // DB
    //
    //= current mesh
    const { data: band } = useFetch("/api/band/band", {
        lazy: false,
        transform: (band) => {
            return band.find(el => el.id === +route.params.id)
        }
    })

</script>


<template>
    <Container v-if="band">

        <!-- TITLE PAGE SECTION -->
        <div  class="title-section_container" style="margin-bottom: 0.5rem;">
            <BreadCrumbs class="show-max-767"/>

            <h1 style="font-weight: bold; font-size: 42px;">

                {{ band.name }}
            </h1> 
        </div>

    <!-- OWNER -->
    <div>
        <h2>Состав участников</h2>
        <h3>Соучастники</h3>
        <ul>
            <li v-for="sharer in band.sharers">
                {{ sharer }} Доля xxx.xxRUB / 50%
            </li>
        </ul>
        <h3>Управляющий</h3>
        <ul>
            <li>Сергей Анфалов</li>
        </ul>
        <!-- conspirators/bands -->
        <!-- <div v-if="mesh.ownerType === 'conspirator'">
            <Button type="pseudo-btn" :link="`/band/${mesh.ownerID}`">{{mesh.ownerType}}{{ mesh.ownerID }}</Button>
        </div> -->
        <!-- user -->
        <!-- <div v-if="mesh.ownerType === 'user'">
            <Button type="pseudo-btn" :link="`/partners/${mesh.ownerID}`">{{mesh.ownerType}}{{ mesh.ownerID }}</Button>
        </div> -->
    </div>
    <!-- CAP -->
    <!-- TOTAL CAP -->
    <div>
        <h2>Капитализация</h2>
        <p>~2 468.RUB</p>

    </div>
    
    <!-- CHIP SECTION -->
    <!-- <Chip :tabs="chips" :default="currentChip" :btn_all_exist="false" @changed="changeChip" style="margin-top: 1rem;"/> -->
    <!-- {{ currentChip }} -->
    <h2>Структура</h2>
    <ul>
        <li><h3>Мешок 1</h3></li>
        <li><h3>Мешок 2</h3></li>
    </ul>
    
    <h2>Сделки</h2>
    <ul>
        <li>Транзакция 1</li>
        <li>Транзакция 2</li>
    </ul>

    <h2>Имущество</h2>
    <ul>
        <li>Имущество 1</li>
        <li>Имущество 2</li>
    </ul>

    <br>
    {{ band }}
        
    </Container>
</template>

<style scoped>

.content-setion_container  {
    margin-top: 1rem;
}

.title-section_container h1{
    /* position: relative;
    padding: .5rem;
    padding-top: 3rem;
    margin: 0;
    margin-top: .5rem;
    background-color: var(--color-global-text);
    height: 250px; */
}
@media screen and (max-width: 575px) {
  .show-max-767 {
    display: none;
  }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
  .show-max-767 {
    display: none;
  }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
    .title-section_container {
        /* padding-left: 0.5rem; */
        /* padding-right: 0.5rem; */
    }
    .content-setion_container {
        /* padding-left: 1rem; */
        /* padding-right: 1rem; */
    }
}
@media screen and (min-width: 768px) {
    .content-setion_container {
        /* padding-left: unset; */
        /* padding-right: unset; */
    }
}
</style>