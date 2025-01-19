<script setup lang="ts">
// shared
import {Container} from '@/shared/container'

// components
import { BreadCrumbs } from '~/components/breadcrumbs';
import { Button } from '~/components/button';
import { Chip } from '~/components/chip';

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
        title: 'Общее'
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

</script>


<template>
    <Container v-if="current_task">

        <!-- TITLE PAGE SECTION -->
        <div  class="title-section_container" style="margin-bottom: 0.5rem;">
            <BreadCrumbs class="show-max-767"/>

            <h1>
                <span style="font-size: 0.7rem; margin: 0 0.5rem; color: var(--color-btn-disabled-bg);">Делаем</span>
                <span style="margin: 0 0.5rem; color: var(--color-btn-disabled-bg)">{{ current_task?.name  }}</span>
                <span style="font-size: 0.7rem; margin: 0 0.5rem; white-space: nowrap; color: var(--color-btn-disabled-bg)">для проекта</span>
                <Button style="margin: 0 0.5rem;" type="pseudo-btn" :link="`/projects/${current_task?.projectId}`">{{ current_project?.name }}</Button>
                <div style="color: #fff; font-size: 1rem;font-weight: normal; position: absolute; bottom: 1rem; left: 1rem; display: flex; gap: .5rem;">
                    <div>{{ current_task.urgency }}</div>
                    <div>{{ current_task.status }}</div>
                </div>
            </h1> 

        </div>

        <!-- CHIP SECTION -->
         <Chip :tabs="chips" :default="currentChip" :btn_all_exist="false" @changed="changeChip" style="margin-top: 1rem;"/>
        <!-- {{ currentChip }} -->
        
        <!-- CONTENT SECTION -->
        <div class="content-setion_container">

            <!-- Общее SECTION -->
            <section v-if="currentChip.title === 'Общее'">
                
                <p>Дата создания: {{ current_task.created_at }}</p> 
                <p>Deadline: {{ current_task.deadline }}</p>
                <p>Ставка задачи: Почасовая (# ###,## RUB / час)</p>
            </section>
    
            <!-- ТЗ SECTION-->
            <section v-if="currentChip.title === 'ТЗ'">
    
                <h2>ТЗ</h2>
                <p>{{ current_task?.desc }}</p>
            </section>
            
            <!-- Выполнение SECTION -->
            <section v-if="task_ledger?.length && currentChip.title === 'Выполнение'">
                <h2>Выполнение:</h2>
        
                <ul>
                    <li v-for="item in task_ledger">{{ item }}</li>
                </ul>
                <div>
                    <Button type="pseudo-btn" @click="addTaskLedgerItem">Добавить выполнение</Button>
                </div>
            </section>
        </div>
        
    </Container>
</template>

<style scoped>

.content-setion_container  {
    margin-top: 1rem;
}

.title-section_container h1{
    position: relative;
    padding: .5rem;
    padding-top: 3rem;
    margin: 0;
    margin-top: .5rem;
    background-color: var(--color-global-text);
    height: 250px;
}

@media screen and (max-width: 767px) {
    /* h1 {
        margin-top: 4rem;
    } */
    .show-max-767 {
      display: none;
    }
    .content-setion_container {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
    .title-section_container{
        height: 200px;
    }
    .title-section_container h1{
        /* color: var(--color-global-text_second); */
    }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
    .title-section_container {
        /* padding-left: 0.5rem; */
        /* padding-right: 0.5rem; */
    }
    .content-setion_container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
@media screen and (min-width: 768px) {
    .content-setion_container {
        padding-left: unset;
        padding-right: unset;
    }
}
</style>