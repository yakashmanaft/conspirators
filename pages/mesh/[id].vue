<script setup lang="ts">
// shared
import {Container} from '@/shared/container'

// components
import { BreadCrumbs } from '~/components/breadcrumbs';
import { Button } from '~/components/button';
import { Chip } from '~/components/chip';
import { AccessDeniedPlug } from '~/components/plug_access_denied';
// import { ChartTest } from '@/components/chart'

useHead({
        title: "Available mesh",
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
    const accessPlug = ref(false)

    //= stocks list
    // const 
    //= bonds list
    const bonds_list  = ref([
        {
            id: 1,

        }
    ])

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
    // sharers list
    const sharer_list_computed = computed(() => {
        
        let owner = [];

        if(mesh?.value?.ownerType === 'conspirator') {

            let array = band?.value?.find(el => el.id === mesh?.value?.ownerID)

            array?.sharers?.forEach(item => {

                let el = translateOwner(item.userType, item.userId)

                owner.push(el)
            })
            return owner
        }
        else if (mesh?.value?.ownerType === 'user') {

            let el = partner?.value?.find(el => el.userId === mesh.value?.ownerID)

            owner.push(`${el?.surname} ${el?.name?.[0]}. ${el?.middleName?.[0]}`)

            return owner
        } 
        else {
            return 'Неизвестный соучастник'
        }
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

    // HELPERS
    //
    // TRANSLATORS
    //
    //= mesh owner
    const translateOwner = (ownerType: string, ownerID: number) => {
        if(band.value && partner.value) {
            let result = 'Неизвестный'
            if(ownerType === "user") {
                let owner = partner?.value.find(el => el.userId === ownerID)

                if(owner) {
                    result = `${owner.surname} ${owner?.name?.[0]}. ${owner?.middleName?.[0]}.`
                }
            }
            if(ownerType === 'conspirator') {
                let owner = band?.value.find(el => el.id === ownerID)

                if(owner) {
                    result = owner.name
                }
            }
            return result
        }
    }
    // SET
    // create link to owner
    const linkToOwner = (ownerType: string, ownerID: number) => {
        if(ownerType === 'user') {
            return `/partners/${ownerID}`
        } 
        if(ownerType === 'conspirator') {
            return `/band/${ownerID}`
        }  
    }

    // DB
    //
    //= current mesh
    const { data: mesh } = useFetch("/api/mesh/mesh", {
        lazy: false,
        transform: (mesh) => {
            // accessPlug

            let current_mesh = mesh.filter(el => el.id === +route.params.id)


            if(current_mesh[0].ownerType === 'conspirator') {

                let band_by_mesh = band.value?.find(el => el.id === current_mesh[0].ownerID)

                if(band_by_mesh) {

                    if(band_by_mesh?.sharers?.find((sharer: any) => sharer.userType === 'user' && sharer.userId === props.auth_user_profile.userId)) {
                        return current_mesh[0]
                    } else {
                        accessPlug.value = true
    
                    }
                } else {
                    accessPlug.value = true
                }
            } 
            else if(current_mesh[0].ownerType === 'user') {

                if(current_mesh[0].ownerID === props.auth_user_profile.userId) {

                    return current_mesh[0]
                } else {
                    accessPlug.value = true
                }
            }
        }
    })
    //= band 
    const { data: band } = useFetch("/api/band/band", {
        lazy: false,
        transform: (band) => {
            return band
        }
    })
    // partner
    const { data: partner } = useFetch("/api/partnerGuarded/partner", {
        lazy: false,
        transform: (partner) => {
            return partner
        }
    })

</script>


<template>
    <Container>

        <!-- Псевдозащита -->
        <AccessDeniedPlug v-if="accessPlug === true"/>

        <!-- {{props.auth_user_profile}} -->
        <div v-if="mesh && !accessPlug">

            <!-- TITLE PAGE SECTION -->
            <div  class="title-section_container" style="margin-bottom: 0.5rem;">
                <BreadCrumbs class="show-max-767"/>
    
                <h1 style="font-weight: bold; font-size: 42px;">
    
                    {{ mesh.name }}
                </h1> 

                <h2 style="margin-top: 1rem;font-size: 0.8rem; font-weight: normal;">

                    <p style="margin: 0; display: flex; align-items: center; gap: .5rem;">
                        <Button
                            type="pseudo-btn"
                            :link="linkToOwner(mesh.ownerType, mesh.ownerID)"
                        >
                            {{ translateOwner(mesh.ownerType, mesh.ownerID) }}
                        </Button>
                        <span style="background-color: var(--color-btn-hover-bg)">{{ mesh.tag }}</span>
                        <span style="background-color: var(--color-btn-hover-bg)">{{mesh.type}}</span>
                        <span style="background-color: var(--color-btn-hover-bg)">{{ mesh.broker_tag }}</span>
                    </p>
                </h2>

                <p>2 468.RUB</p>
                <p>Соучастники: 
                    <ul>
                        <li v-for="sharer in sharer_list_computed">
                            {{ sharer }} 0.00%
                        </li>
                    </ul>
                </p>
            </div>
            {{ mesh }}
    
            <!-- CHIP SECTION -->
             <!-- <Chip :tabs="chips" :default="currentChip" :btn_all_exist="false" @changed="changeChip" style="margin-top: 1rem;"/> -->
            <!-- {{ currentChip }} -->
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <h3>Структура / Сделки</h3>
                <div>
                    Выбрать период
                </div>
            </div>
            
            <!--  -->
            <div class="graph_container">

                <!--  -->
                <div style="background-color: gray">
                    <!-- LEGEND -->
                    <h4>Категория доходов</h4>
                    <ul>
                        <li>Дивидендны
                            <ul>
                                <li></li>
                            </ul>
                        </li>
                        <li>Проекты
                            <ul>
                                <li></li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <!--  -->
                <div style="background-color: red;">
                    Graphic
                </div>
            </div>

        </div>

        
    </Container>
</template>

<style scoped>

.title-section_container h1{
    /* position: relative;
    padding: .5rem;
    padding-top: 3rem;
    margin: 0;
    margin-top: .5rem;
    background-color: var(--color-global-text);
    height: 250px; */
}
.invested_container {

}
.invested_wrapper {

}
.invested_wrapper ul {
    padding: 0;
    list-style-type: none;
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
  .title-section_container {
      /* padding-left: 0.5rem; */
      /* padding-right: 0.5rem; */
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {

}
@media screen and (min-width: 992px) and (max-width: 1199px) {
    .graph_container {
        /* background-color: red; */
        display: flex;
        align-items: center;
    }
}
@media screen and (min-width: 1200px) {

}
</style>