<script setup lang="ts">
// shared
import {Container} from '@/shared/container'

// components
import { BreadCrumbs } from '~/components/breadcrumbs';
import { Button } from '~/components/button';
import { Chip } from '~/components/chip';
import { AccessDeniedPlug } from '~/components/plug_access_denied'

useHead({
        title: "brokerage mesh",
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
    const router = useRouter()
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
    const sharers_list_computed = computed(() => {
        return 
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
                let owner = partner?.value.find(el => el.id === ownerID)

                if(owner) {
                    result = `${owner.name} ${owner.surname}`
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
    //= create link to owner
    const linkToOwner = (ownerType: string, ownerID: number) => {
        if(ownerType === 'user') {
            return `/partners/${ownerID}`
        } 
        if(ownerType === 'conspirator') {
            return `/band/${ownerID}`
        }  
    }
    //= create link to investor
    const link_to_investor = (mesh_id: number) => {
        let current_mesh = mesh?.value?.find(el => el.id === mesh_id)

        if(current_mesh?.ownerType === 'conspirator') {

            let band_investor = band.value?.find(el => el.id === current_mesh.ownerID)

            router.push(`/band/${band_investor?.id}`)
        }
        else if (current_mesh?.ownerType === 'user') {
            let user_investor = partner.value?.find(el => el.userId === current_mesh.ownerID)

            router.push(`/partners/${user_investor?.id}`)
        }
    }

    // TRANSLATE
    //= translate invested meshes
    const translate_invested_meshes = (mesh_id: number) => {
        let current_mesh = mesh?.value?.find(el => el.id === mesh_id)

        if(current_mesh?.ownerType === 'conspirator') {

            let band_investor = band.value?.find(el => el.id === current_mesh.ownerID)
            return band_investor?.name
        } 
        else if (current_mesh?.ownerType === 'user') {

            let user_investor = partner.value?.find(el => el.userId === current_mesh.ownerID)

            return `${user_investor?.surname} ${user_investor?.name}`
        }

    }

    // DB
    //
    //= current mesh
    const { data: mesh } = useFetch("/api/mesh/mesh", {
        lazy: false,
        transform: (mesh) => {
            // return mesh.find(el => el.id === +route.params.id)
            return mesh
        }
    })
    const { data: brokerage } = useFetch("/api/funds/brokerage", {
        lazy: false,
        transform: (brokerage) => {
            // accessPlug.value = true
            return brokerage.filter(el => el.id === +route.params.id)[0]
            // let current_loan = loan.filter(el => el.id === +route.params.id)
            
            // if(current_loan[0].ownerType === 'user' || current_loan[0].loanerType === 'user') {
            //     if(current_loan[0].ownerID === props.auth_user_profile.userId || current_loan[0].loanerID === props.auth_user_profile.userId) {
            //         return current_loan[0]
            //     } else {
            //         // accessPlug.value = true
            //         if (current_loan[0].ownerType === 'conspirator' || current_loan[0].loanerType === 'conspirator') {
        
        
            //             let loan_by_mesh = band.value?.find(el => el.id === current_loan[0].ownerID)
                        
        
            //             if(loan_by_mesh) {
            //                 if(loan_by_mesh?.sharers?.find(sharer => sharer.userType === 'user' && sharer.userId === props.auth_user_profile.userId)) {
            //                     return current_loan[0]
            //                 } else {
            //                     accessPlug.value = true
            //                 }
            //             }
            //         }
            //     }
            // } 
            // else if ()
            // else if (current_loan[0].ownerType === 'conspirator') {
            //     let loan_by_mesh = band.value?.find(el => el.id === current_loan[0].ownerID)

            //     if(loan_by_mesh) {
            //         if(loan_by_mesh?.sharers?.find((sharer: any) => sharer.userType === 'user' && sharer.userId === props.auth_user_profile.userId)) {
            //             return current_loan[0]
            //         } else  {
            //             accessPlug.value = true
            //         }
            //     }
            // }
            // else if (current_loan[0].loanerType === 'user') {
            //     if(current_loan[0].loanerID === props.auth_user_profile.userId) {
            //         return current_loan[0]
            //     } else {
            //         accessPlug.value = true
            //     }
            // }
            // else if (current_loan[0].loanerType === 'conspirator') {
            //     let loan_by_mesh = band.value?.find(el => el.id === current_loan[0].loanerID)

            //     if(loan_by_mesh) {
            //         if(loan_by_mesh?.sharers?.find((sharer: any) => sharer.userType === 'user' && sharer.userId === props.auth_user_profile.userId)) {
            //             return current_loan[0]
            //         } else  {
            //             accessPlug.value = true
            //         }
            //     }
            // }
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
        <div v-if="brokerage && !accessPlug">

            <div class="title-section_container">
                <BreadCrumbs class="show-max-767"/>
                <h1 style="font-weight: bold; font-size: 42px;">
                    {{ brokerage.name }} <span style="font-size: .8rem; font-weight: normal; cursor: pointer">(Изм.)</span>
                </h1>
            </div>
            <div style="width: fit-content; border-radius: 1rem; margin-top: 1rem; margin-left: 1rem;">
                <p style="margin: 0; font-size: 1.5rem; font-weight: bold;">999,999,999.00 RUB</p>
                <p style="margin: 0; color: var(--color-global-text_second);">+999 999.99 RUB</p>
            </div>

            <div>
                <ul>
                    <li>Операции</li>
                    <li>Пополнить</li>
                    <li>Аналитика</li>
                </ul>
            </div>

            <div style="margin-top: 1rem;">
                <ul>
                    <li>
                        <h3 style="margin: 0;">Акции</h3>
                        <ul>
                            <li>РусГидро</li>
                        </ul>
                    </li>
                    <li>
                        <h3 style="margin: 0;">Облигации</h3>
                        <ul>
                            <li>АФК Система выппуск 7</li>
                        </ul>
                    </li>
                    <li>
                        <h3 style="margin: 0;">Фонды</h3>
                    </li>
                    <li>
                        <h3 style="margin: 0;">Валюта и металлы</h3>
                    </li>
                </ul>
            </div>

            <div class="about_container">

                <div class="about_wrapper">
                    <p style="margin: 0;">Инвесторы:</p>
                    <ul>
                        <li v-for="investor in brokerage.invested_mash" 
                        @click="link_to_investor(investor.id)">
                            {{translate_invested_meshes(investor.id)}} 0.00%
                        </li>
                    </ul>
                </div>
                <div class="about_wrapper">
                    <p>{{ brokerage.broker_tag }}</p>
                </div>

                <div class="about_wrapper">
                    <p style="margin: 0;">Тарифы</p>
                    <ul>
                        <li>fee: {{ brokerage.fee }}</li>
                        <li>tax: {{ brokerage.tax }}</li>
                        <li>Тариф у брокера: Инвестор</li>
                    </ul>
                </div>
            </div>





            {{ brokerage }}

            <div style="position: fixed; bottom: 4rem; left: 0; width: 100%; padding: 0 1rem 1rem 1rem;">

                <div style="display: flex; align-items: center;background-color: var(--color-wallet-fund-invested-wo); border-radius: 2rem; height: 32px; box-shadow: var(--hover-shadow); cursor: pointer; padding: 1.5rem 1rem; justify-content: center; gap: 1rem;">
                    <p style="color: var(--color-btn-text); margin: 0;">
                        Обновить котировки
                    </p>
                    <Icon
                        name="material-symbols-light:directory-sync-rounded"
                        size="24px"
                        color="var(--color-btn-text)"
                    />
                </div>
            </div>
            <!-- <div  class="title-section_container" style="margin-bottom: 0.5rem;">
                <BreadCrumbs class="show-max-767"/>
    
                <h1 style="font-weight: bold; font-size: 42px;">
    
                    {{ mesh.name }}
                </h1> 
                <h2 style="margin-top: 1rem;font-size: 0.8rem; font-weight: normal;">
    

                    <div style="display: flex; gap: 0.5rem;">
                        <p>Собственность:</p>
                        <Button
                            type="pseudo-btn"
                            :link="linkToOwner(mesh.ownerType, mesh.ownerID)"
                        >
                            {{ translateOwner(mesh.ownerType, mesh.ownerID) }}
                        </Button>
                    </div>
                    <p style="margin: 0; display: flex; align-items: center; gap: .5rem;">
                        <span style="background-color: var(--color-btn-hover-bg)">{{ mesh.tag }}</span>
                        <span style="background-color: var(--color-btn-hover-bg)">{{mesh.type}}</span>
                        <span style="background-color: var(--color-btn-hover-bg)">{{ mesh.broker_tag }}</span>
                    </p>
                    <p>2 468.RUB</p>
                    <p>Ваша доля: 50% (1 234.00RUB)</p>
                    <p>Соучастники: 
                        <ul>
                            <li></li>

                        </ul>
                    </p>
                    <p>Управляющий: Сергей Анфалов</p>
                </h2>
            </div> -->
            <!-- <div style="border: 1px solid gray; margin: 1rem;">

                <p>Инвестиционный мешок #{{ mesh?.id }}</p>
                <ul>
                    <li>name: {{ mesh?.name }}</li>
                    <li>type: {{ mesh?.type }}</li>
                    <li>tag: {{ mesh?.tag }}</li>
                    <li>broker_tag: {{ mesh?.broker_tag }}</li>
                    <li>owner: {{ mesh?.ownerType }} {{ mesh?.ownerID }}</li>
                </ul>
            </div> -->

            <!-- Брокерские счета в мешке -->
            <!-- <p>Брокерские счета</p>
            <div v-for="el in brokerage" style="border: 1px solid gray; margin: 1rem;">
                <ul>
                    <li>{{ el.name }}</li>
                    <li>creted_at: {{ el.created_at }}</li>
                    <li>Ставка налога: {{ el.tax }}</li>
                    <li>
                        Тарифы:
                        <ul v-for="item in el.rate">
                            <li>{{ item?.name }} - {{ item?.value }}%</li>
                        </ul>
                    </li>
                    <li>Связан с мешком #{{ el.owner_mash_id }}</li>
                    <li>owner: {{ el.owner_type }} {{ el.owner_id }}</li>
                    <li>tag: {{ el.tag }}</li>
                    <li>broker tag: {{ el.broker_tag }}</li>
                </ul>

                <h3>Структура / Сделки</h3>
                <div class="invested_container">

                <div class="invested_wrapper">
                <p>Акции</p>
                <ul>
                <li>Borussia Dortmund GmbH | BVB@DE | 3.23 EUR | 1шт | 3.23 EUR | (T-Bank) ПАО СПБ Биржа | -2.35 EUR (42.11%)</li>
                <li>Hello Group | MOMO | 6,98 USD | 1шт | 16.26 USD | (T-Bank) ПАО СПБ Биржа | -6.46 USD (28.99%)</li>
                <li>Газпром | GAZP | 170,53 RUB | 1шт | 16.26 RUB | (T-Bank) ПАО СПБ Биржа | +494.10 (40.47%)</li>
                </ul>
                </div>

                <div class="invested_wrapper">
                <p>Облигации</p>
                <ul>
                <li>АФК Система | Выпуск 7 - RU000A0ZYQY7 | 930.00 RUB | 6.1 RUB (НКД) | 1шт | 936.10 RUB (936.05 RUB) | (T-Bank) ПАО Московская биржа |  -44.40RUB (4.56%)</li>
                <li>Все Инструменты.ру | 001Р -  RU000A107GJ7 | 968.50 RUB | 5.2 RUB (НКД) | 1шт | 973.70 RUB (973.65 RUB) | (T-Bank) ПАО Московская биржа | -33.50 RUB (3.34%)</li>
                </ul>
                </div>

                <div class="invested_wrapper">
                <p>Фонды</p>
                <ul>
                <li>Пассивный | TPAY | 97.02 RUB | 3шт | 291.06 RUB (Отклонение указанной цены) | (T-Bank) ПАО Московская биржа | +2.03 RUB ()</li>
                </ul>
                </div>
                </div>
            </div> -->


            <!-- CHIP SECTION -->
             <!-- <Chip :tabs="chips" :default="currentChip" :btn_all_exist="false" @changed="changeChip" style="margin-top: 1rem;"/> -->
            <!-- {{ currentChip }} -->
            <!-- <h3>Структура / Сделки</h3>
    
            <div class="invested_container">
    
                <div class="invested_wrapper">
                    <p>Акции</p>
                    <ul>
                        <li>Borussia Dortmund GmbH | BVB@DE | 3.23 EUR | 1шт | 3.23 EUR | (T-Bank) ПАО СПБ Биржа | -2.35 EUR (42.11%)</li>
                        <li>Hello Group | MOMO | 6,98 USD | 1шт | 16.26 USD | (T-Bank) ПАО СПБ Биржа | -6.46 USD (28.99%)</li>
                        <li>Газпром | GAZP | 170,53 RUB | 1шт | 16.26 RUB | (T-Bank) ПАО СПБ Биржа | +494.10 (40.47%)</li>
                    </ul>
                </div>
    
                <div class="invested_wrapper">
                    <p>Облигации</p>
                    <ul>
                        <li>АФК Система | Выпуск 7 - RU000A0ZYQY7 | 930.00 RUB | 6.1 RUB (НКД) | 1шт | 936.10 RUB (936.05 RUB) | (T-Bank) ПАО Московская биржа |  -44.40RUB (4.56%)</li>
                        <li>Все Инструменты.ру | 001Р -  RU000A107GJ7 | 968.50 RUB | 5.2 RUB (НКД) | 1шт | 973.70 RUB (973.65 RUB) | (T-Bank) ПАО Московская биржа | -33.50 RUB (3.34%)</li>
                    </ul>
                </div>
    
                <div class="invested_wrapper">
                    <p>Фонды</p>
                    <ul>
                        <li>Пассивный | TPAY | 97.02 RUB | 3шт | 291.06 RUB (Отклонение указанной цены) | (T-Bank) ПАО Московская биржа | +2.03 RUB ()</li>
                    </ul>
                </div>
            </div> -->
        </div>

        
    </Container>
</template>

<style scoped>

.content-setion_container  {
    margin-top: 1rem;
}

.title-section_container {
    margin-left: 1rem;
    margin-right: 1rem;
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
  .about_container {
    display: flex;
    flex-direction: column;
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
    .content-setion_container {
        /* padding-left: 1rem; */
        /* padding-right: 1rem; */
    }
    /* 
     */
     .about_container {
        /* background-color: red; */
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        margin-left: 1rem;
    }
     .about_wrapper {
        border: 1px solid var(--color-global-text_second);
        background-color: var(--color-wallet-fund-invested);
        border-radius: 1rem;
        padding: 1rem;
     }
}
@media screen and (min-width: 768px) and (max-width: 991px)  {
    .content-setion_container {
        /* padding-left: unset; */
        /* padding-right: unset; */
    }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {

}
@media screen and (min-width: 1200px) {

}
</style>