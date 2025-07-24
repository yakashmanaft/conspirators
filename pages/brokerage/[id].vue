<script setup lang="ts">
// shared
import {Container} from '@/shared/container'

// components
import { BreadCrumbs } from '~/components/breadcrumbs';
import { Button } from '~/components/button';
import { Chip } from '~/components/chip';
import { AccessDeniedPlug } from '~/components/plug_access_denied';
import { ChartTest } from "~/components/chart";

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

    const currency_to_show =  ref({
    ticket:  'RUB'
    })
    //= stocks list
    // const 
    //= bonds list
    const bonds_list  = ref([
        {
            id: 1,

        }
    ])

    const colors = ref({
        unit1: '#86cfa3',
        unit2: '#a2c6e0',
        unit3: '#ffc7ec',
        unit4: '#f8faa0',
        unit5: '#adffd8',
        unit6: '#f2c48f',
        unit7: '#e3bfe2',
        unit8: '#6f75ad',
    },) 

    // current_task
    const current_mesh = ref()

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

    // ONMOUNTED
    //
    onMounted(( ) => {
        
        setTimeout(() => {

            setStrokeDashArrayAndOffset()
        }, 1000)
    })
    // onBeforeMount(() => {
    //     setTimeout(() => {

    //         setStrokeDashArrayAndOffset()
    //     }, 160)
    // })

    let body = document.querySelector('body')
    body?.addEventListener('click', (e) => {
        // Убираем ховер на unit в диаграме (если нету класс unit + если попап не открыт)
        if(!e.target.classList?.contains('unit')) {
            const unitsList = document.querySelectorAll('.unit');
            current_mesh.value = {}
            for(let i = 0; i <= unitsList.length; i++) {
                if(unitsList[i] && unitsList[i].classList.contains('unit__hovered')) {
                    unitsList[i].classList.remove('unit__hovered');
                }
            }
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
    //= setStrokeDashArrayAndOffset
    const setStrokeDashArrayAndOffset = () => {
        let chart = document.querySelector('.chart')

        if(chart) {

            let units = chart.querySelectorAll('.unit')
            
            // console.log(units)
            // console.log(brokerage?.value?.invested_mash)

            for(let i = 0; i <= brokerage?.value?.invested_mash?.length; i++) {

                if(brokerage?.value?.invested_mash[i]) {

                    let ratio = calcInvestorInvested(brokerage?.value?.invested_mash[i].id) / calcTotalInvested() * 100

                    units[i].setAttribute('stroke-dasharray', `${ratio},100`)
                    units[i].setAttribute('stroke-dashoffset', 0);

                    if(i === 0) {
                        units[i].setAttribute('stroke-dashoffset', 0);
                    } else {
                        // Получаем значение 'stroke-dasharray' предыдущего элемента
                        let sdArrPrev = parseFloat(units[i - 1].getAttribute('stroke-dasharray')) * (-1);
                         // Получаем значение 'stroke-dashoffset' предыдущего элемента
                        let sdOffPrev = parseFloat(units[i - 1].getAttribute('stroke-dashoffset'));
                        // Суммируем значения
                        let sumParam = sdArrPrev + sdOffPrev;
                        // console.log(sumParam );
                        // Устанавливаем значения в текущий элемент
                        units[i].setAttribute('stroke-dashoffset', sumParam);
                    }
                }
            }
            // setTimeout(() => {

            // }, 110)
        }
    }
    //= set_current_mesh(el, index)
    const set_current_mesh = (el: any, index: number) => {
        // console.log(el)
        // console.log(index)
        
        const unitsList = document.querySelectorAll('.unit');
        // Очищаем все элементы от класса 
        unitsList.forEach(item => item.classList.remove('unit__hovered'))
        // Действуем
        if(unitsList[index].classList.contains('unit__hovered')) {
            unitsList[index].classList?.remove('unit__hovered');
            current_mesh.value = null
            // if(popup_opened.value) {
            //     popup_opened.value = false
            // }
        } else if(!unitsList[index].classList.contains('unit__hovered')){
            unitsList[index].classList.add('unit__hovered');
            current_mesh.value = el
        }
    }

    // CREATE
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

        if(current_mesh) {

            // console.log(current_mesh?.ownerType)
            // console.log(current_mesh?.ownerID)

            if(current_mesh.ownerType === 'conspirator') {

                let band_investor = band.value?.find(el => el.id === current_mesh.ownerID)

                router.push(`/band/${band_investor.id}`)
                console.log(band_investor)
            }
            else if (current_mesh.ownerType === 'user') {

                let user_investor = partner.value?.find(el => el.userId === current_mesh.ownerID)
                router.push(`/partners/${user_investor.id}`)
                // console.log(user_investor)
            }
        }
        // if(mesh?.ownerType === 'conspirator') {

        //     let band_investor = band.value?.find(el => el.id === mesh.id)

        //     router.push(`/band/${band_investor?.id}`)
        // }
        // else if (mesh?.ownerType === 'user') {
        //     let user_investor = partner.value?.find(el => el.userId === mesh.id)

        //     router.push(`/partners/${user_investor?.id}`)
        // }

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

            return `${user_investor?.surname} ${user_investor?.name?.[0]}. ${user_investor?.middleName?.[0]}.`
        }

    }

    // CALC
    //
    //= calc total invested
    const calcTotalInvested = () => {
        
        let invested_amount = transaction_ledger?.value?.reduce((acc, current) => {
            
            if(current.purpose.slice(0,6) === 'Выдача') {
                acc += current.target_item_qty * current.target_item_amount
            }

            return acc  
        }, 0)

        return invested_amount
    }
    //= calcTotalInvested graf data
    const calcTotalByGraphDate = () => {
        let dates = transaction_ledger?.value.map(tr => tr.created_at.slice(0,10))
        // return ['2021-02-01', '2021-02-16', '2021-03-01', '2021-03-16', '2021-04-01', '2021-04-16']

        return dates
    }
    //= calc total withdraw
    const calcTotalWithdraw = () => {

        let withdraw_amount = transaction_ledger?.value?.reduce((acc, current) => {

            if(current.purpose.slice(0,5) === 'Вывод') {
                acc += current.target_item_qty * current.target_item_amount
            }

            return acc
        }, 0)
        return withdraw_amount
    }
    //= calc Allocation of mesh investor
    const calcInvestorAllocation = (mesh_id: number) => {
        let invested_amount = 0;
        let withdraw = 0;

        transaction_ledger?.value?.forEach((tr: any) => {
            if(tr.target_item_id === mesh_id) {

                invested_amount += tr.target_item_qty * tr.target_item_amount
            }
            else if (tr.from_item_id === mesh_id) {
                if(tr.purpose.slice(0,5) === 'Вывод') {
                    withdraw += tr.target_item_qty * tr.target_item_amount
                }
            }
        })
        return invested_amount - withdraw
    }
    //= calc investor invested
    const calcInvestorInvested = (mesh_id: number) => {
        let invested_amount = 0;

        transaction_ledger?.value?.forEach(tr => {
            if(tr.target_item_id === mesh_id) {

                invested_amount += tr.target_item_qty * tr.target_item_amount
            }
        })

        return invested_amount
    }
    //= calc investor withdraw
    const calcInvestorWithdraw = (mesh_id: number) =>{
        let withdraw = 0;

        transaction_ledger?.value?.forEach(tr => {

            if (tr.from_item_id === mesh_id) {
                if(tr.purpose.slice(0,5) === 'Вывод') {
                    withdraw += tr.target_item_qty * tr.target_item_amount
                }
            }
        })
        return withdraw
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

    // transactions
    const { data: transaction_ledger } = useFetch("/api/transaction/transaction", {
    lazy: true,
    transform: (transaction_ledger) => {
        let array:any = []

        brokerage?.value?.invested_mash?.forEach(el => {
                transaction_ledger.filter(tr => {
                if(el.id === tr.from_item_id || el.id === tr.target_item_id) {

                    
                    if(
                        (tr.target_item_tag === 'invested_stock' && tr.target_item_type === 'brokerage_account') || 
                        (tr.from_item_tag === 'invested_stock' && tr.from_item_type === 'brokerage_account') 
                    ) {
                        
                        array.push(tr)
                    }
                }
            })
        })
        return array;
    }
    })

    // WATCH
    // watch(transaction_ledger, () => {

    // })
    // 
    watch(current_mesh, () => {
        // console.log(current_mesh.value)
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

            <!-- PAPERS -->
            <article class="papers_container">
                <header>
                    <!-- <p>Фонды | Акции | Облигации | Валюта</p> -->
                    <h2>Состав ценных бумаг</h2>
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex;">
                        <li>
                            <input id="bonds" type="checkbox">
                            <label for="bonds">Облигации</label>
                        </li>
                        <li>
                            <input id="stocks" type="checkbox">
                            <label for="stocks">Акции</label>
                        </li>
                        <li>
                            <input id="mutual" type="checkbox">
                            <label for="mutual">ПИФы</label>
                        </li>
                        <li>
                            <input id="currency" type="checkbox">
                            <label for="currency">Валюта</label>
                        </li>
                    </ul>
                </header>

                <section>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li>
                            <h3 style="margin: 0;">Акции</h3>
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: .5rem; background-color: var(--color-btn-text);">РусГидро</li>
                                <li style="margin-top: .5rem; background-color: var(--color-btn-text);">КАМАЗ</li>
                            </ul>
                        </li>
                        <li style="margin-top: 1rem;">
                            <h3 style="margin: 0;">Облигации</h3>
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: .5rem; background-color: var(--color-btn-text);">АФК Система выппуск 7</li>
                            </ul>
                        </li>
                        <li style="margin-top: 1rem;">
                            <h3 style="margin: 0;">Фонды</h3>
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: .5rem; background-color: var(--color-btn-text);">Вечный портфель</li>
                            </ul>
                        </li>
                        <li style="margin-top: 1rem;">
                            <h3 style="margin: 0;">Валюта и металлы</h3>
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: .5rem; background-color: var(--color-btn-text);">Доллар</li>
                                <li style="margin-top: .5rem; background-color: var(--color-btn-text);">Рубль</li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </article>

            <!-- ABOUNT BROKERAGE ACCOUNT -->
            <article class="about_container">

                <header>
                    <h2>О счете</h2>
                    <p>Действующие правила по счету / фонду</p>
                </header>

                <div class="about_el_container">

                    <div class="about_el_wrapper">
                        <p>{{ brokerage.broker_tag }}</p>
                    </div>
    
                    <div class="about_el_wrapper">
                        <p style="margin: 0;">Тарифы</p>
                        <ul>
                            <li>fee: {{ brokerage.fee }}</li>
                            <li>tax: {{ brokerage.tax }}</li>
                            <li>Тариф у брокера: Инвестор</li>
                        </ul>
                    </div>

                    <div class="about_el_wrapper" style="grid-column: span 3">
                         {{ brokerage }}
                    </div>
                </div>
            </article>

            <!-- Invested band and conspirators -->
            <article style="margin: 1rem; border-radius: var(--bs-border-radius); ">
                <header>
                    <h2>Доли</h2>
                    <p>Распределение средств, согласно текущей аллокации</p>
                </header>
                <div class="investor_container">
                    <!-- ДОЛИ -->
                    <!-- DIAGRAM -->
                    <section class="diagram_wrapper">
                        <!-- <h3>Заголовок</h3> -->
                        <svg class="chart" viewBox="0 0 40 50">
    
                            <circle 
                                v-for="(mesh, index) in brokerage.invested_mash"  
                                class="unit" 
                                r="15.9" 
                                cx="50%" 
                                cy="50%" 
                                @click.stop="set_current_mesh(mesh, index)"
                                @mouseover="current_mesh = mesh"
                            >
                               {{ mesh }}
                            </circle>
                        </svg>
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
    
                            <div v-if="current_mesh?.id">
                                <p style="margin: 0;">
                                    <span style="color:var(--color-global-text_second); font-size: .8rem;">{{ (calcInvestorAllocation(current_mesh.id) * 100 / (calcTotalInvested() - calcTotalWithdraw())).toFixed(2) }} %</span> <br>
                                    <span>{{ translate_invested_meshes(current_mesh.id) }}</span> <br>
                                    <span style="font-weight: bold;">{{(calcInvestorInvested(current_mesh.id) - calcInvestorWithdraw(current_mesh.id)).toFixed(2)}} {{ currency_to_show.ticket }}</span> 
                                </p>
                            </div>
                            <div v-else>
                                <p style="margin: 0;">
                                    <span style="color:var(--color-global-text_second); font-size: .8rem;">100%</span> <br>
                                    <span>TOTAL</span> <br> 
                                    <span style="font-weight: bold;">{{calcTotalInvested() - calcTotalWithdraw() }} {{ currency_to_show.ticket }}</span>
                                </p>
                            </div>
                            <div style="font-size: .8rem; margin-top: 1rem;">
                                <p style="margin: 0; color: var(--color-global-text_second);">+12 345.99 / +57.89%</p>
                            </div>
                        </div>
                    </section>
                    <!-- LIST -->
                     <br>
                    <section class="list-diagram_wrapper">
                        <ul style="border-bottom: 1px solid var(--color-global-text_second); padding-bottom: 1rem;">
                            <li>
                                <div class="list-diagram-el_allocation">100%</div>
                                <div class="list-diagram-el_investor">
                                    <div style="text-transform: uppercase;">Total</div>
                                    <div class="list-diagram-el_investor_amount">
                                        {{calcTotalInvested() - calcTotalWithdraw() }} {{ currency_to_show.ticket }}
                                    </div>
                                </div>
                                <div class="list-diagram-el_amount">
                                    <div class="list-diagram-el_profit">
                                        +0.00 / +0.00%
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul style="margin-top: 1rem;" v-if="brokerage?.invested_mash?.length">
                            <li 
                                v-for="mesh in brokerage.invested_mash"
                                @click="link_to_investor(mesh.id)"
                            >
                                <div class="list-diagram-el_allocation">{{ (calcInvestorAllocation(mesh.id) * 100 / (calcTotalInvested() - calcTotalWithdraw())).toFixed(2) }}%</div>
                                <div class="list-diagram-el_investor">
                                    <div>
                                        {{ translate_invested_meshes(mesh?.id) }}
                                    </div>
                                    <div class="list-diagram-el_investor_amount">{{(calcInvestorInvested(mesh.id) - calcInvestorWithdraw(mesh.id)).toFixed(2)}} {{ currency_to_show.ticket }}</div>
                                </div>
                                <div class="list-diagram-el_profit">+12 345.99 / +57.89%</div>
                            </li>
                        </ul>
                        <ul style="margin-top: 1rem;" v-else>
                            Нет инвесторов
                        </ul>
                    </section>
                    
                </div>
            </article>

            <!-- historical graph -->
            <article class="historical-graph_container">

                <header>
                    <h2>Анализ</h2>
                    
                </header>
                
                <section>
                    <h3>График стоимости портфеля</h3>

                    <div>
                        <ul style="padding-left: 1rem; display: flex; gap: 2rem;">
                            <li>
                                Инвестировано
                            </li>
                            <li>
                                Профит
                            </li>
                        </ul>
                        
                        <ChartTest
                            :chart_type="'line'"
                            :chart_height="350"
                            :chart_title="'График стоимости портфеля'"
                            :chart_categories="calcTotalByGraphDate()"
                        />

                        <div>
                            {{ calcTotalByGraphDate() }}
                        </div>
                    </div>
                </section>
            </article>

            <!-- TRANSACTIONS -->
            <article class="transaction_container">
                <header>
                    <h2>Транзакции</h2>
                    <p>Пополнения, приобретения, продажи, доходы, выводы</p>
                </header>

                <section>
                    <ul class="transaction-list_container">
                        <li 
                            v-for="tr in transaction_ledger?.sort(function(a,b){
                                return new Date(b.created_at) - new Date(a.created_at);
                            })" 
                            style=""
                            class="transaction-list_el"
                        >
                            <p style="margin: 0;">{{ tr.created_at }}</p>
                            <p style="margin: 0;" v-if="tr.purpose.slice(0, 5) === 'Вывод'">
                                -{{ (tr.from_item_qty * tr.from_item_amount).toFixed(2) }} {{ currency_to_show.ticket }}
                            </p>
                            <p style="margin: 0;" v-else-if="tr.purpose.slice(0, 6) === 'Выдача'">
                                +{{ (tr.from_item_qty * tr.from_item_amount).toFixed(2) }} {{ currency_to_show.ticket }} 
                            </p>
                            <p style="margin: 0;" v-else>
                                {{ (tr.from_item_qty * tr.from_item_amount).toFixed(2) }} {{ currency_to_show.ticket }} 
                            </p>
                            <p style="margin: 0;">{{ tr.comments }}</p>
        
                            <!--  -->
                            <div style="position: absolute; top: 1rem; right: 1rem;">
                                <p style="margin: 0;" v-if="tr.purpose.slice(0, 5) === 'Вывод'">mesh: {{ tr.target_item_id }}</p>
                                <p style="margin: 0;" v-else-if="tr.purpose.slice(0, 6) === 'Выдача'">mesh: {{ tr.from_item_id }}</p>
                            </div>
                            <!-- {{ tr }} -->
                        </li>
                    </ul>

                </section>
            </article>
            


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

/* DIAGRAM */
.unit {
    fill: none;
    stroke-width: 5;
    transition: all 0.5s ease;
    cursor: pointer;
}
/* #1 */
.unit:nth-child(1) {
    stroke: v-bind('colors.unit1');
}
/* #2 */
.unit:nth-child(2) {
    stroke: v-bind('colors.unit2');
}
/* #3 */
.unit:nth-child(3) {
    /* stroke: #ffc7ec; */
    stroke: v-bind('colors.unit3');
}
/* #4 */
.unit:nth-child(4) {
    stroke: v-bind('colors.unit4');
}
/* 5 */
.unit:nth-child(5) {
    stroke: v-bind('colors.unit5');
}
/* #6 */
.unit:nth-child(6) {
    stroke: v-bind('colors.unit6');
}
/* #7 */
.unit:nth-child(7) {
    stroke: v-bind('colors.unit7');
}
/* #8 */
.unit:nth-child(8) {
    stroke: v-bind('colors.unit8');
}
.unit__hovered {
    stroke-width: 8;
}

@media screen and (max-width: 575px) {
  .show-max-767 {
    display: none;
  }

  /* investor section style */
  .investor_container {
      /* background-color: var(--color-btn-wo-bg); */
    }

    /* DIAGRAM */
    /* round */
    .diagram_wrapper {
        display: flex; 
        background-color: var(--color-global-baackground_light);
        /* background-color: var(--color-btn-hover-bg);  */
        width: 25rem; 
        height: 25rem; 
        position: relative;
        width: 100%;
        border-radius: var(--bs-border-radius);
    }
    .diagram_wrapper svg{
        margin: 0 auto;
    }
    /* list */
    .list-diagram_wrapper {
        background-color: var(--color-global-baackground_light);
        border-radius: var(--bs-border-radius);
        padding: 2rem 1.5rem;
    }
    .list-diagram_wrapper ul {
        list-style: none; 
        padding: 0;
        margin: 0;
    }
    .list-diagram_wrapper ul li {
        display: grid;
        grid-template-columns: 50px 1fr 1fr;
        align-items: center;
        gap: 1rem;
    }
    .list-diagram_wrapper ul li:not(:first-child) {
        padding: .45rem 0;

    }
    .list-diagram_wrapper ul li div:last-child {
        text-align: end;

    }
    .list-diagram-el_allocation {
        color: var(--color-global-text_second);
        font-size: .8rem;
    }
    .list-diagram-el_investor {
        display: flex;
        flex-direction: column;
        align-items: flex-start
    }
    .list-diagram-el_investor_amount {
        font-weight: bold;
        font-size: .8rem;
    }
    .list-diagram-el_profit {
        color: var(--color-global-text_second);
        font-size: .8rem;
    }

    /* BTN switch diagram / list */
    /* .investor_container {
        position: relative;
    }
    .switch-btn_container {
        position: absolute;
        top: 5rem;
        right: 0;
        background-color: red;
    } */

    /* ABOUT SECTION */
    .about_container {
        display: flex;
        flex-direction: column;
        margin: 1rem;
        
    }
    .about_el_container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
    }
    .about_el_wrapper {
        background-color: var(--color-global-baackground_light);
        border-radius: var(--bs-border-radius);
        padding: 1rem;
    }
    .about_el_wrapper:nth-child(2) {
        grid-column: span 2;
    }

    /* PAPERS */
    .papers_container {
        margin: 0 1rem;
    }
    .papers_container section {
        background-color: var(--color-global-baackground_light);
        border-radius: var(--bs-border-radius);
        padding: 1rem;
    }

    /* historical graph */
    .historical-graph_container {
        margin: 0 1rem;

    }


    /* ОПЕРАЦИИ */
    .transaction_container {
        margin: 0 1rem;

    }
    .transaction-list_container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        list-style: none;
        margin: 0;
        padding: 0;
        /* padding: 0 1rem; */
    }
    .transaction-list_el {
        background-color: var(--color-global-baackground_light);
        border-radius: 1rem;
        padding: 1rem;
        position: relative;
    }
    .transaction-list_el p:first-child {
        font-size: .8rem;
        margin-bottom: .5rem!important;
    }
    .transaction-list_el p:last-child {
        
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
        /* margin-left: 1rem; */
        padding: 0 1rem;
        background-color: yellow;
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
    .investor_container {
        display: flex;
        gap: 1rem;
    }
    .diagram_wrapper {
        flex: 50%;
        display: flex; 
        background-color: var(--color-global-baackground_light);
        /* background-color: var(--color-btn-hover-bg);  */
        width: 25rem; 
        height: 25rem; 
        position: relative;
        width: 100%;
        border-radius: var(--bs-border-radius);
    }
    .diagram_wrapper svg{
        margin: 0 auto;
    }
    .list-diagram_wrapper {
        flex: 50%;
        background-color: var(--color-global-baackground_light);
        border-radius: var(--bs-border-radius);
        padding: 2rem 0;
    }
    .list-diagram_wrapper ul {
        list-style: none; 
        padding: 0;
        margin: 0;
    }
    .list-diagram_wrapper ul li {
        display: grid;
        grid-template-columns: 50px 1fr 1fr;
        align-items: center;
        gap: 1rem;
        transition: all .2s ease-in;
    }
    .list-diagram_wrapper ul li:hover {
        background-color :white;
        cursor: pointer;
    }
    .list-diagram_wrapper ul li {
        padding: .45rem 1.5rem;
    }
    .list-diagram_wrapper ul li div:last-child {
        text-align: end;

    }
    .list-diagram-el_allocation {
        color: var(--color-global-text_second);
        font-size: .8rem;
    }
    .list-diagram-el_investor {
        display: flex;
        flex-direction: column;
        align-items: flex-start
    }
    .list-diagram-el_investor_amount {
        font-weight: bold;
        font-size: .8rem;
    }
    .list-diagram-el_profit {
        color: var(--color-global-text_second);
        font-size: .8rem;
    }
}
@media screen and (min-width: 1200px) {

}
</style>