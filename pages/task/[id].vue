<script setup>
// shared
import {Container} from '@/shared/container'

// components
import { BreadCrumbs } from '~/components/breadcrumbs';
import { Button } from '~/components/button';

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

    const route = useRoute()

    // CLICK
    const addTaskLedgerItem = () => {
        alert('В разработке')
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

        return task_list.value
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
</script>


<template>
    <Container>

        <!-- TITLE PAGE SECTION -->
        <div class="show-max-767" style="margin-bottom: 0.5rem;">
            <BreadCrumbs/>
            <h1 style="margin: 0;">{{ current_task?.name  }}</h1> 
            <p>{{ current_task?.desc }}</p>

            <Button type="pseudo-btn" :link="`/projects/${current_task?.projectId}`">Проект: {{ current_task?.projectId }}</Button>
        </div>


        <div v-if="current_task">

            <p>Дата создания: {{ current_task.created_at }}</p> 
            <p>Deadline: {{ current_task.deadline }}</p>
            <p>Статус: {{  current_task.status  }}</p>
            <p>Важность: {{ current_task.urgency }}</p>
            <!-- <p>Автор: xxx</p>
            <p>Контроль реализации: xxx</p>-->
            <!-- <h2>This is a lead from: {{ current_task.landing_name }}</h2> -->
        </div>

        <div v-if="task_ledger?.length">
            <h2>Выполнение:</h2>

            <ul>
                <li v-for="item in task_ledger">{{ item }}</li>
            </ul>
        </div>
        <div>
            <Button type="pseudo-btn" @click="addTaskLedgerItem">Добавить выполнение</Button>
        </div>
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