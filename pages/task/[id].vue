<script setup lang="ts">
// shared
import {Container} from '@/shared/container'

// components
import { BreadCrumbs } from '~/components/breadcrumbs';
import { Button } from '~/components/button';
import { Chip } from '~/components/chip';


// helpers func
import { calc_working_hours } from '@/helpers/calc_working_hours'

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
            id: 1,
            title: 'Общее'
        },
        {
            id: 2,
            title: 'ТЗ'
        },
        {
            id: 3,
            title: 'Выполнение'
        }
    ]
    const currentChip = ref({
        id: 3,
        title: 'Выполнение'
    })

    const route = useRoute()

    //= Accomplishment
    // const accomplishmentParagraph = ref([{
    //     name: 'all'
    // }])
    const accomplishmentParagraphComputed = computed(() => {

        if(task_ledger.value) {
            let result = [...new Set([...task_ledger.value.map((obj: any) => {
                return obj.status
            })])]
            return result.map(el => {
                return {
                    name: el
                }
            })
        }
    })
    const currentAccomplishmentParagraph = ref('waiting')

    // CLICK
    const addTaskLedgerItem = () => {
        alert('В разработке')
    }
    const changeChip = (obj: any) => {
        currentChip.value = obj
    }
    //= change task el status
    const changeCurrentTaskElStatus = (task_el: any) => {
        console.log(task_el)
        alert('Измение статуса выполнения: в разработке...')
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
    //= project by task
    const current_project = computed(() => {
        return project_list.value?.find(el => el.id === task_list?.value?.projectId)
    })

    // HELPERS
    //= count выполнение by status tasks
    const countAccomplishmentTask = (taskLedger: any) => {

        let sum:number = 0

        taskLedger?.forEach((item: any) => {
            if(item.status === currentAccomplishmentParagraph.value) {
                sum += Math.abs((new Date(item.ended_at) - new Date(item.created_at)) / (1000 * 60 * 60) % 24)
            } 
            // else if (currentAccomplishmentParagraph.value === 'all') {
            //     sum += Math.abs((new Date(item.ended_at) - new Date(item.created_at)) / (1000 * 60 * 60) % 24)
            // }
        })

        return sum.toFixed(2)
    } 
    // countPaidedTaskByHours
    const countPaidedTaskByHours = () => {
        let endedSum:number = 0;
        let paided:number = 0;

        endedSum = task_ledger?.value?.reduce((acc, el) => {

            acc += (new Date(el.ended_at) - new Date(el.created_at)) / (1000 * 60 * 60) % 24

            return acc
        }, 0)

        paided = task_ledger?.value?.reduce((acc, el) => {

            if(el.status === 'finished') {

                acc += (new Date(el.ended_at) - new Date(el.created_at)) / (1000 * 60 * 60) % 24
            }


        return acc
        }, 0)

        return `Paided: ${paided.toFixed(2)} из ${endedSum.toFixed(2)} (${(paided - endedSum).toFixed(2)})`
    }
    //= set status color in accomplishment item
    const set_bgColor_by_status = (status: string) => {
        // status finished
        if (status === 'finished') {
            return `color: var(--color-urgency-low-wo); background-color: unset`
        } 
        // status waiting
        else if (status === 'waiting') {
            return `color: var(--color-urgency-middle); background-color: unset`
        }
        // status agreement
        else if (status === "agreement") {
            return `color: var(--color-urgency-middle); background-color: unset;`
        }
        // status paused
        else if (status === 'paused') {
            return `background-color: var(--color-status-paused); `
        }
        //else
        else {
            return 
        }
    }

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
                let taskLedger = Object.values(task_ledger)
                return taskLedger.filter(el => el.taskId === current_task?.value?.id)
            }
        }
    }) 

    //= projects
    const { data: project_list } = useFetch("/api/projectGuarded/project", {
        lazy: false,
        transform: (project_list) => {

            // let projectList = Object.values(project_list)

            // project_list.find((el) => {
            //     // session user is a sharer
            //     return el.id === task_list?.value?.projectId
            // })

            // return project_list
            // return project_list.filter(el => el.id === task_list?.value?.projectId)[0]
            return project_list
        }
    })
    
useHead({
        // title: current_task.value.name,
        title: 'Текуща задача',
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

</script>


<template>
    <Container v-if="current_task">

        <!-- TITLE PAGE SECTION -->
        <div  class="title-section_container" style="margin-bottom: 0.5rem;">
            <BreadCrumbs class="show-max-767"/>

            <h1>
                <p style="text-wrap: wrap;">
                    <span style="font-size: 0.7rem; margin: 0 0.5rem 0 0; color: var(--color-btn-disabled-bg);">Решаем задачу</span>
                    <!--  -->
                    <span style="margin: 0 0.5rem; color: var(--color-btn-disabled-bg)">{{ current_task?.name  }}</span>
                    <!--  -->
                    <span style="font-size: 0.7rem; margin: 0 0.5rem; color: var(--color-btn-disabled-bg)">для проекта</span>
                    <!--  -->
                    <!-- <Button style="margin: 0 0.5rem;" type="pseudo-btn" :link="`/projects/${project_list?.id}`">{{ project_list?.name }}</Button> -->
                    <span style="margin: 0 0.5rem; color: var(--color-btn-wo-bg); cursor: pointer;" @click.stop="$router.push(`/projects/${current_project?.id}`)">{{ current_project?.name }}</span>
                </p>
                <!--  -->
                <div style="color: #fff; font-size: 1rem;font-weight: normal; position: absolute; bottom: 1rem; left: 1rem; display: flex; gap: .5rem; font-size: .8rem;">
                    <p style="margin: 0; background-color: var(--color-btn-hover-bg); border-radius: 1rem; padding: 2px 8px;">{{ current_task.urgency }}</p>
                    <p style="margin: 0; background-color: var(--color-btn-hover-bg); border-radius: 1rem; padding: 2px 8px;">{{ current_task.status }}</p>
                </div>
            </h1> 
            <!-- <h2 style="margin-top: 1rem;font-size: 0.8rem; font-weight: normal;">
                Кратко: <span>{{ current_task.desc }}</span>
            </h2> -->
        </div>


        <!-- CHIP SECTION -->
         <Chip :tabs="chips" :default="currentChip" :btn_all_exist="false" @changed="changeChip" style="margin-top: 1.5rem;"/>
        <!-- {{ currentChip }} -->
        
        <!-- CONTENT SECTION -->
        <div class="content-section_container">

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
                <h2 style="margin: 0;">Выполнение:</h2>
                <!-- PAIDED -->
                <div>
                    {{ countPaidedTaskByHours() }}
                </div>
                <!-- CHIP -->
                <!-- ACCOMPLISHMENT  -->
                <div class="current_affiliation_title" style="margin-top: 1rem;">

                    <h3 v-for="el in accomplishmentParagraphComputed"
                        :class="currentAccomplishmentParagraph === el.name ? 'title_active' : ''"
                    >
                        <span @click="currentAccomplishmentParagraph = el.name">{{ el.name }}</span>
                    </h3>
                </div>
                
                <!-- <div class="current_affiliation_title" style="display: flex; gap: 1rem; align-items: center;">
                    
                    <h3 v-for="el in fundParagraph" :class="currentFundParagraph === el.name ? 'title_active' : ''" style="cursor:pointer;">
                        <span @click="currentFundParagraph = el.name">
                            
                            {{ el.title }}
                        </span>
                    </h3>
                    
                </div> -->

                <!-- ACCOMPLISHMENT COUNT -->
                <div style="display: flex; align-items :center; font-size: 0.8rem; margin-top: 1rem; gap: .5rem;">
                    <!-- КОЛ-ВО ВЫПОЛНЕНИЙ -->
                    <p style="margin: 0; color: var(--color-global-text_second); padding: 4px 8px;">Выполнений: {{ task_ledger?.filter(el => {
                        if(el.status === currentAccomplishmentParagraph) {
                            return el
                        }
                        else if (currentAccomplishmentParagraph === 'all') {
                            return el
                        }
                    }).length }}</p>
                    <!-- ЧАСЫ РАБОТЫ -->
                    <p style="margin: 0; padding: 4px 8px; border-radius: 1rem; color: var(--color-global-text_second)">Итого: {{ countAccomplishmentTask(task_ledger) }} часа работы</p>
                    <!-- КНОПКА ДОБАВИТЬ ВЫОЛНЕНИЕ -->
                    <div
                        v-if="currentAccomplishmentParagraph !== 'finished'" 
                        style="background-color: var(--color-btn-hover-bg); border-radius: 100%; cursor: pointer;">
                        <Icon name="material-symbols-light:add-2-rounded" size="24px" @click="addTaskLedgerItem"/>
                    </div>
                </div>

                <!-- ACCOMPLISHMENT LIST -->
                <ul v-if="task_ledger?.length" style="list-style: none; padding: 0; margin-top: 1rem;">
                    <li 
                        v-for="item in task_ledger.filter(el => {
                            if(el.status === currentAccomplishmentParagraph) {
                                return el
                            } 
                            else if (currentAccomplishmentParagraph === 'all') {
                                return el
                            }
                        }).reverse()"
                        class="accomplishment-el_wrapper"
                    >

                        <!--  -->
                        <div class="accomplishment-el_hours">
                            <p>{{ item.ended_at.slice(0,10) }}</p>
                            <p>
                                {{ item.created_at.slice(11, 16)}} - {{ item.ended_at.slice(11,16) }} 
                                {{ calc_working_hours(item.created_at, item.ended_at) }}
                            </p>
                        </div>
                        <!--  -->
                        <div class="accomplishment-el_subject">{{ item.subject }}</div>
                        <!--  -->
                        <div 
                            v-if="currentAccomplishmentParagraph === 'all'"
                            class="accomplishment-el_status"
                            style="cursor: pointer;"
                            :style="set_bgColor_by_status(item.status)"
                            @click="changeCurrentTaskElStatus(item)"
                        >
                            {{ item.status }}
                        </div>
                    </li>
                </ul>
                <div v-else style="margin-top: 1rem;">
                    <p>Еще ничего не сделали...</p>
                </div>
            </section>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br> 
        <br> 
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
    </Container>
</template>

<style scoped>

.title-section_container h1{
    position: relative;
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding-top: 3rem; */
    margin: 0;
    margin-top: .5rem;
    background-color: var(--color-global-text);
    height: 250px;
}

.content-section_container {
    margin-top: 1rem;
}

/* accomplishment title */
.current_affiliation_title {
    display: flex; 
    gap: 1rem; 
    align-items: center;
    /* justify-content: flex-start; */
    overflow-x: scroll;
    max-width: calc(100vw - 1rem)!important;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none; 
    padding-bottom: .5rem;
    border-bottom: 1px solid var(--color-btn-disabled-bg)
}
.current_affiliation_title::-webkit-scrollbar {
  display: none;
}
.current_affiliation_title h3 {
    font-size: 1rem;
    font-weight: normal;
    position: relative;
} 
.current_affiliation_title h3 span {
    cursor: pointer;
}
.current_affiliation_title h3:after {

}
.title_active:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-wallet-fund-available-wo)
}
.title_active span {
    color: var(--color-wallet-fund-available-wo);
}

.accomplishment-el_wrapper {
    margin-top: 1rem;
    display: flex;
}

@media screen and (max-width: 575px) {
    /* ACCOMPLISHMENT */
    .accomplishment-el_wrapper  {
        flex-direction: column;
        border: .5px solid var(--color-btn-hover-bg);
        border-radius: 1rem;
        padding: .5rem 1rem;
    }
    .accomplishment-el_hours {
        display: flex;
        gap: .5rem;
    }
    .accomplishment-el_hours > p {
        margin: 0;
        color: var(--color-btn-disabled-text);
        text-wrap: nowrap; 
        font-size: .8rem;
    }
    .accomplishment-el_subject {
    }
    .accomplishment-el_status {
        font-size: .8rem;
    }
}

@media screen and (max-width: 767px) {
    /* h1 {
        margin-top: 4rem;
    } */
    .show-max-767 {
      display: none;
    }
    .title-section_container h1{
        margin-top: -1rem;
    }
    .content-section_container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .title-section_container{
        /* height: 180px; */
    }
    .title-section_container h1{
        /* color: var(--color-global-text_second); */
    }
    .title-section_container h2 {
        margin-left: 1rem;
    }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
    .title-section_container {
        /* padding-left: 0.5rem; */
        /* padding-right: 0.5rem; */
    }
    .content-section_container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
    /* ACCOMPLISHMENT */
    .accomplishment-el_wrapper  {
        flex-direction: column;
        border: .5px solid var(--color-btn-hover-bg);
        border-radius: 1rem;
        padding: .5rem 1rem;
    }
    .accomplishment-el_hours {
        display: flex;
        gap: .5rem;
    }
    .accomplishment-el_hours > p {
        margin: 0;
        color: var(--color-btn-disabled-text);
        text-wrap: nowrap; 
        font-size: .8rem;
    }
    .accomplishment-el_subject {
    }
    .accomplishment-el_status {
        font-size: .8rem;
    }
}
@media screen and (min-width: 768px) {
    .content-section_container {
        padding-left: unset;
        padding-right: unset;
    }
    .title-section_container h1{
        margin-top: 1rem;
    }
}
@media screen and (min-width: 768px) and (max-width: 991px){
    /* ACCOMPLISHMENT */
    .accomplishment-el_wrapper  {
        flex-direction: column;
        border: .5px solid var(--color-btn-hover-bg);
        border-radius: 1rem;
        padding: .5rem 1rem;
    }
    .accomplishment-el_hours {
        display: flex;
        gap: .5rem;
    }
    .accomplishment-el_hours > p {
        margin: 0;
        color: var(--color-btn-disabled-text);
        text-wrap: nowrap; 
        font-size: .8rem;
    }
    .accomplishment-el_subject {
    }
    .accomplishment-el_status {
        font-size: .8rem;
    }
}
@media screen and (min-width: 992px) and (max-width: 1199px){
    /* ACCOMPLISHMENT */
    .accomplishment-el_wrapper  {
        flex-direction: column;
        border: .5px solid var(--color-btn-hover-bg);
        border-radius: 1rem;
        padding: .5rem 1rem;
    }
    .accomplishment-el_hours {
        display: flex;
        gap: .5rem;
    }
    .accomplishment-el_hours > p {
        margin: 0;
        color: var(--color-btn-disabled-text);
        text-wrap: nowrap; 
        font-size: .8rem;
    }
    .accomplishment-el_subject {
    }
    .accomplishment-el_status {
        font-size: .8rem;
    }
}
@media screen and (min-width: 1200px) {
    /* ACCOMPLISHMENT */
    .accomplishment-el_wrapper  {
        flex-direction: column;
        border: .5px solid var(--color-btn-hover-bg);
        border-radius: 1rem;
        padding: .5rem 1rem;
    }
    .accomplishment-el_hours {
        display: flex;
        gap: .5rem;
    }
    .accomplishment-el_hours > p {
        margin: 0;
        color: var(--color-btn-disabled-text);
        text-wrap: nowrap; 
        font-size: .8rem;
    }
    .accomplishment-el_subject {
    }
    .accomplishment-el_status {
        font-size: .8rem;
    }
}
</style>