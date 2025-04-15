<script setup lang="ts">
// shared
import {Container} from '@/shared/container'

// components
import { BreadCrumbs } from '~/components/breadcrumbs';
import { Button } from '~/components/button';
import { Chip } from '~/components/chip';

import { ChartTest } from '~/components/chart';

// utils
import { translateName } from '@/utils/translators';

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

    //
    const sessionUser:any = useUserSession().user;

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
    const project_role_chip_computed = computed(() => {

        let array:any = []

        if(projects?.value?.length) {

            projects?.value.forEach(item => {

                if(item.sharers.find(el => el.userType === 'conspirator' && el.userId === +route.params.id)) {
                    array.push('sharers')
                }
                if(item.executor.find(el => el.userType === 'conspirator' && el.userId === +route.params.id)) {
                    array.push('executor')
                }
                if(item.customer.find(el => el.userType === 'conspirator' && el.userId === +route.params.id)) {
                    array.push('customer')
                }
            })
            
        }
        let new_array = [...new Set(array)]

        return new_array.map((obj, index) => {
            if(obj === 'executor') {
                currentChipProjectRole.value = {
                    id: index + 1,
                    name: obj,
                    title: 'Исполняем'
                }
                return {
                    id: index + 1,
                    name: obj,
                    title: 'Исполняем'
                }
            }
            else if (obj === 'customer') {
                currentChipProjectRole.value = {
                    id: index + 1,
                    name: obj,
                    title: 'Заказываем'
                }
                return {
                    id: index + 1,
                    name: obj,
                    title: 'Заказываем'
                }
            } 
            else if (obj === 'sharers') {
                currentChipProjectRole.value = {
                    id: index + 1,
                    name: obj,
                    title: 'Соучаствуем'
                }
                return {
                    id: index + 1,
                    name: obj,
                    title: 'Соучаствуем'
                }
            }
            else {
                currentChipProjectRole.value = {
                    id: index + 1,
                    name: obj,
                    title: obj
                }
                return {
                    id: index + 1,
                    name: obj,
                    title:  obj
                }
            }
        })
    })
    //= fund paragraph
    const band_paragraph = ref([
        {
            id: 1,
            name: 'income_expenses',
            title: 'Доходы-расходы'
        },
        {
            id: 2,
            name: 'mesh',
            title: 'Мешки'
        },
        {
            id: 3,
            name: 'structure',
            title: 'Кооперативы'
        },
        {
            id: 4,
            name: 'projects',
            title: 'Проекты'
        },
        {
            id: 5,
            name: 'warehouse',
            title: 'Склад'
        }
    ])
    //= current bad paragraph
    const currentBandParagraph = ref('income_expenses')
    // const currentChip = ref({
    //     title: 'Выполнение'
    // })
    const currentChipProjectRole = ref()

    const route = useRoute()
    const router = useRouter()

    onMounted(async () => {
        await useBandStore().loadBandData()
        await usePartnerStore().loadPartnerData()
        
        
        // ПРОКРУТКА ПО ГОРИЗОНТАЛИ
        //= ПЕРМЕННЫЕ
        const historyGrapContainer = document.getElementById('history-graph');
        const capitalizationGraphContainer = document.getElementById('capitalization-graph')
        const sharersItemListWrapper = document.getElementById('sharers-item_list')
        // ДЕЙСТВИЯ
        historyGrapContainer?.addEventListener('wheel', (evt) => {
                evt.preventDefault();
                historyGrapContainer.scrollLeft += evt.deltaY;
            })
        capitalizationGraphContainer?.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            capitalizationGraphContainer.scrollLeft += evt.deltaY; 
        })
        sharersItemListWrapper?.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            sharersItemListWrapper.scrollLeft += evt.deltaY;    
        })

        // КЛИК ПО ПОДЛОЖКЕ ПОЛУПРОЗРАЧНОЙ
        //= ПЕРЕМЕННЫЕ
        const filter_cap_chip_menu = document.getElementById('popup_input-btn')
        const sharers_list_btn = document.getElementById('sharers_list-btn')

        //= ДЕЙСТВИЕ
        document.addEventListener('click', (e) => {


            if(e.target?.classList?.contains('popup-container')) {
                filter_cap_chip_menu.checked = !filter_cap_chip_menu.checked
            }

            if(e.target?.classList.contains('sharers_list-container')) {
                sharers_list_btn.checked = !sharers_list_btn.checked
            }

        })

        if(project_role_chip_computed.value) {

            currentChipProjectRole.value = project_role_chip_computed.value[0]
        }
    })

    // CLICK
    const addTaskLedgerItem = () => {
        alert('В разработке')
    }
    // const changeChip = (obj: any) => {
    //     currentChip.value = obj
    // }

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
    //= band_list_computed
    const band_list_computed = computed(() => {


        return band_list.value?.filter(item => {
            if(item.sharers && route.params.id) {
                let sharers = Object.values(item.sharers)

                if(sharers.find(sharer => sharer.userType === 'conspirator' && sharer.userId === +route.params.id)) {
                    return item
                }
            }
        })
    })
    //=m y_band_list_computed
    const my_band_list_computed = computed(() => {

        return band_list.value?.filter(item => {
            if(item.sharers && route.params.id) {
                let sharers = Object.values(item.sharers)

                if(sharers.find(sharer => sharer.userType === 'conspirator' && sharer.userId === +route.params.id)) {

                    return item
                }
            }
        })
    })

    // partner_list_computed
    const partner_list_computed = computed(() => {
        
        return partner_list.value
    })
    //= project_list_conputed
    const project_list_computed = computed(() => {
        
        return projects.value
    })


    // HELPERS
    //= translate Sharer Name
    const translateSharerName = (userID:number, userType: string) => {
        // user, conspirator, bank
        if(userType === 'conspirator') {
            let sharer = band_list_computed?.value?.find(el => el.id === userID)
            return sharer ? sharer?.name : 'Неизвестная банда'
        } 
        else if (userType === 'user') {
            let sharer = partner_list_computed?.value?.find(el => el.userId === userID)
            return sharer ? `${sharer?.name} ${sharer?.surname}` : 'Неизвестный'
        }
        else {

            return `Мутный${userType} ${userID}`
        }
    }

    // SET
    //= set route eto sharer
    const setSharerRoute = (userID:number, userType: string) => {

        if(userType === "conspirator") {
            let sharer = band_list_computed?.value?.find(el => el.id === userID)

            if(sharer) {
                router.push(`/band/${sharer.id}`)
            } else {
                alert('Не могу найти такую банду...')
            }
        } 
        else if (userType === 'user') {
            let sharer = partner_list_computed?.value?.find(el => el.userId === userID)

            if(sharer) {

                if(sharer?.userId === props.auth_user_profile.userId) {
                    router.push('/account')
                } else {
                    router.push(`/partners/${sharer.id}`)
                }
            } else {
                alert('Не могу найти такого соучастника в контактах...')
            }
        } else {
            alert('Куда ты хочешь? Некуда же...')
        }
    }

    //= set_measure
    const set_measure = (number) => {
        console.log(number % 10)

        if(number % 10 === 1) {
            return 'участник'
        }
        else if (number % 10 >= 2 && number % 10 < 5) {
            return 'участника'
        } 
        else {
            return 'участников'
        }
    }


    //= changeChipProjectRole
    const changeChipProjectRole = (obj: any) => {
        currentChipProjectRole.value = obj
    }


    // ******* DB
    // *** GET

    // task list
    // const { data: task_list } = useFetch("/api/taskGuarded/task", {
    //     lazy: false,
    //     transform: (task_list) => {
    //         // return landing_list.filter((el) => {
    //         //     // session user is a sharer
    //         //     if(el.sharers && el.sharers.find((item) => item.userType === 'conspirator' && item.userId === props.auth_user_profile.userId)) {
    //         //         return el
    //         //     }
    //         // })
    //         return task_list.find(el => el.id === +route.params.id)
    //     }
    // })

    // task ledger item
    // const { data: task_ledger } = useFetch("/api/taskLedgerGuarded/taskElement", {
    //     lazy: false,
    //     transform: (task_ledger) => {

    //         if(current_task.value) {

    //             return task_ledger.filter(el => el.taskId === current_task.value.id)
    //         }
    //     }
    // }) 

    //HELPERS
    // restart wheel event

    // DB
    //
    //= current band
    const { data: band } = useFetch("/api/band/band", {
        lazy: false,
        transform: (band) => {
            // console.log(sessionUser.value)
            return band.find(el => {
                if(el.id === +route.params.id) {

                    if(el.sharers && sessionUser.value) {

                        let sharers = Object.values(el.sharers)

                        if(sharers.find(sharer => sharer.userType === 'user' && sharer.userId === sessionUser.value.id )) {
                            return el

                        } else {
                            router.push('/band')
                        }

                    } else {

                        router.push('/band')
                    }
                } 
            })
        }
    })
    //= all bands (реализовать для переиспользования)
    const { data: band_list } = useFetch("/api/band/band", {
        lazy: false,
        transform: (band_list) => {
            return band_list
        }
    })
    //= all partners
    const { data: partner_list } = useFetch('/api/partnerGuarded/partner', {
        lazy: false,
        transform: (partner_list) => {
            return partner_list
        }
    })
    //= band's projects
    const { data: projects } = useFetch("/api/projectGuarded/project", {
        lazy: false,
        transform: (project_list) => {
            return project_list.filter((el) => {

                if(
                    (el.sharers && el.sharers.find(item => item.userType === 'conspirator' && item.userId === +route.params.id)) ||
                    el.customer && el.customer.find(item => item.userType === 'conspirator' && item.userId === +route.params.id) ||
                    el.executor && el.executor.find(item => item.userType === 'conspirator' && item.userId === +route.params.id)
                ) {
                    return el
                }
            })
        }
    })

    // WATHERS
    //= currentBandParagraph
    watch(currentBandParagraph, () => {

        
        if(currentBandParagraph.value === 'income_expenses') {
            setTimeout(() => {
                const historyGrapContainer = document.getElementById('history-graph');

                historyGrapContainer?.addEventListener('wheel', (evt) => {
                    evt.preventDefault();
                    historyGrapContainer.scrollLeft += evt.deltaY;
                })
            }, 100)
        }
    })
</script>


<template>
    <Container>

        <!-- TITLE PAGE SECTION -->
        <div  class="title-section_container" style="margin-bottom: 0.5rem;">
            <BreadCrumbs class="show-max-767"/>

            <h1 style="margin: 0; margin-top: 1rem; font-weight: bold; font-size: 42px;">

                {{ band?.name }}
            </h1> 
            <p v-if="band?.name === 'guest-band'" style="width: fit-content;background-color: var(--color-wallet-fund-debt-wo); color: var(--color-btn-text); padding: 2px 8px; border-radius: 1rem; margin-top: .5rem; font-size: .8rem;">Демонстрационная страница банды</p>
        </div>

        <!-- TOTAL CAP -->
        <div class="cap_container">
            <div class="cap-header_wrapper">

                <!-- ЗАГОЛОВОК + КАПА -->
                <div>
                    <h2 style="margin: 0; color: var(--color-global-text_second); ">Стоимость портфеля</h2>
                    <p style="margin: 0;font-size: 2rem; font-weight: bold;">~2 468.75 RUB</p>
                </div>
                <!-- ФИЛЬТР СЕКЦИЙ МЕШКОВ -->
                <div class="popup_label-btn">
                    <label for="popup_input-btn">
                        <div style="display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;">

                            <Icon             
                                name="material-symbols-light:filter-alt"
                                size="2rem"
                                color="var(--color-global-text)"
                            />
                            <div style="position: absolute; bottom: .2rem; right: .2rem; height: .6rem; width: .6rem; background-color: var(--color-urgency-middle); border-radius: 100%;"></div>
                        </div>
                    </label>
                    <input id="popup_input-btn" type="checkbox">
                    <div class="popup-container">

                        <div class="popup_wrapper">
                            <h4>Выберите <br>типы мешков <br>к показу</h4>
                            <div>
                                <input type="checkbox" id="available_cap">
                                <label for="available_cap">available</label>
                            </div>
                            <div>
                                <input type="checkbox" id="deposit_cap">
                                <label for="deposit_cap">deposit</label>
                            </div>
                            <div>
                                <input type="checkbox" id="invested_stock_market_cap">
                                <label for="invested_stock_market_cap">invested_stock</label>
                            </div>
                            <div>
                                <input type="checkbox" id="invested_currency_cap">
                                <label for="invested_currency_cap">invested_currency</label>
                            </div>
                            <div>
                                <input type="checkbox" id="invested_loan_cap">
                                <label for="invested_loan_cap">invested_loan</label>
                            </div>
                            <div>
                                <input type="checkbox" id="invested_crypto_cap">
                                <label for="invested_crypto_cap">invested_crypto</label>
                            </div>
                            <div>
                                <input type="checkbox" id="invested_project_cap">
                                <label for="invested_project_cap">invested_project</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div id="capitalization-graph" class="capitalization-container graph-container">
                <div class="year_balance-wrapper graph_year-wrapper ">
                    <ul>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 30%"></div>
                            </div>
                            <p>Янв.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 40%"></div>
                            </div>
                            <p>Фев.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 43%"></div>
                            </div>
                            <p>Мар.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 55%"></div>
                            </div>
                            <p>Апр.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 58%"></div>
                            </div>
                            <p>Май.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 60%"></div>
                            </div>
                            <p>Июн.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 67%"></div>
                            </div>
                            <p>Июл.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 45%"></div>
                            </div>
                            <p>Авг.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 69%"></div>
                            </div>
                            <p>Сен.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 70%"></div>
                            </div>
                            <p>Окт.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 89%"></div>
                            </div>
                            <p>Ноя.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 70%"></div>
                            </div>
                            <p>Дек.</p>
                        </li>
                    </ul>
                    <p>2023</p>
                </div>
        
                <div class="year_balance-wrapper graph_year-wrapper ">
                    <ul>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 40%"></div>
                            </div>
                            <p>Янв.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 50%"></div>
                            </div>
                            <p>Фев.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 43%"></div>
                            </div>
                            <p>Мар.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 55%"></div>
                            </div>
                            <p>Апр.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 58%"></div>
                            </div>
                            <p>Май.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 60%"></div>
                            </div>
                            <p>Июн.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 67%"></div>
                            </div>
                            <p>Июл.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 75%"></div>
                            </div>
                            <p>Авг.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 29%"></div>
                            </div>
                            <p>Сен.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 70%"></div>
                            </div>
                            <p>Окт.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 20%"></div>
                            </div>
                            <p>Ноя.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 97%"></div>
                            </div>
                            <p>Дек.</p>
                        </li>
                    </ul>
                    <p>2024</p>
                </div>
        
                <div class="year_balance-wrapper graph_year-wrapper ">
                    <ul>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 30%"></div>
                            </div>
                            <p>Янв.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value" style="height: 100%"></div>
                            </div>
                            <p>Фев.</p>
                        </li>
                        <li>
                            <div>
                                <div class="cap_value cap_choosen_month" style="height: 43%"></div>
                            </div>
                            <p>Мар.</p>
                        </li>
                        <li>
                            <div></div>
                        </li>
                        <li>
                            <div></div>
                        </li>
                        <li>
                            <div></div>
                        </li>
        
                    </ul>
                    <p>2025</p>
                </div>
            </div>
        </div>

        <!-- SHARERS -->
        <div class="sharers_container">
            <div class="sharers-header_wrapper">
                <h2 style="margin: 0; color: var(--color-global-text_second); ">Состав участников</h2>
                <div>
                    <label for="sharers_list-btn">Список</label>
                    <input id="sharers_list-btn" type="checkbox">

                    <div class="popup_1-container sharers_list-container">

                        <div class="popup_1-wrapper sharers_list-wrapper">
                            <h3>Список соучастников <br> {{ band?.name }}</h3>
                            <ul>
                                <li 
                                    v-for="(sharer, index) in band?.sharers"
                                    class="sharers-list_item"
                                >
                                    <div class="sharers-list_item-el">
                                        <p>{{ index + 1 }}. <span @click="setSharerRoute(sharer.userId, sharer.userType)">{{ translateSharerName(sharer.userId, sharer.userType) }}</span></p>
                                    </div>
                                    <div class="sharers-list_item-el">
                                        <p>{{ sharer.position }} <span>{{ sharer.allocation }}</span></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ul id="sharers-item_list" class="sharers-item_wrapper">
                <li 
                    v-for="sharer in band?.sharers" 
                    class="sharers_item"
                    @click="setSharerRoute(sharer.userId, sharer.userType)"
                >
                    <div class="avatar">
                        <Icon
                            v-if="sharer.userType === 'user'"
                            size="54px"
                            color="var(--color-btn-text)"
                            name="material-symbols-light:person-rounded"
                        />
                        <Icon
                            v-else
                            size="54px"
                            color="var(--color-btn-text)"
                            name="material-symbols-light:group-rounded"
                        />
                    </div>
                    <div class="sharers-item_name">
                        {{ translateSharerName(sharer.userId, sharer.userType) }}
                    </div>
                </li>
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

        <!-- CHIP titles -->
        <div class="current_band_paragraph" style="margin-top: 2rem;">
            <h2 v-for="el in band_paragraph" :class="currentBandParagraph === el.name ? 'title_active' : ''" style="cursor:pointer;">
                <span @click="currentBandParagraph = el.name;">{{ el.title }}</span>
            </h2>
        </div>

        <!-- current Band Paragraph -->
        <!-- INCOME-EXPENSE -->
        <div style="margin-top: 2rem;" v-if="currentBandParagraph === 'income_expenses'">

            <!-- cap -->
            <p style="margin-left: 1rem; margin-right: 1rem; font-size: .8rem;">
                <span style="background-color: var(--color-urgency-low-wo); color: var(--color-btn-text); padding: 2px 8px;">+2 468.99 RUB</span> 
                <span style="background-color: var(--color-wallet-fund-debt-wo); color: var(--color-btn-text); padding: 2px 8px;">-2 468.00 RUB</span>
            </p>

            <!-- history graph -->
            <div id="history-graph" class="history_balance-container graph-container">
        
                <div class="year_balance-wrapper graph_year-wrapper">
                    <p>2023</p>
                    <ul>
                        <li>
                            <div>
                                <div class="income" style="height: 20%;"></div>
                                <div class="expense" style="height: 30%;"></div>
                            </div>
                            <p>Янв.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 50%;"></div>
                                <div class="expense" style="height: 20%;"></div>
                            </div>
                            <p>Фев.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 60%;"></div>
                                <div class="expense" style="height: 25%;"></div>
                            </div>
                            <p>Мар.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 30%;"></div>
                                <div class="expense" style="height: 25%;"></div>
                            </div>
                            <p>Апр.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 20%;"></div>
                                <div class="expense" style="height: 55%;"></div>
                            </div>
                            <p>Май.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 70%;"></div>
                                <div class="expense" style="height: 85%;"></div>
                            </div>
                            <p>Июн.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 60%;"></div>
                                <div class="expense" style="height: 25%;"></div>
                            </div>
                            <p>Июл.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 45%;"></div>
                                <div class="expense" style="height: 15%;"></div>
                            </div>
                            <p>Авг.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 70%;"></div>
                                <div class="expense" style="height: 25%;"></div>
                            </div>
                            <p>Сен.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 60%;"></div>
                                <div class="expense" style="height: 25%;"></div>
                            </div>
                            <p>Окт.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 77%;"></div>
                                <div class="expense" style="height: 35%;"></div>
                            </div>
                            <p>Ноя.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 25%;"></div>
                                <div class="expense" style="height: 25%;"></div>
                            </div>
                            <p>Дек.</p>
                        </li>
                    </ul>
                </div>
        
                <div class="year_balance-wrapper graph_year-wrapper">
                    <p>2024</p>
                    <ul>
                        <li>
                            <div>
                                <div class="income" style="height: 20%;"></div>
                                <div class="expense" style="height: 30%;"></div>
                            </div>
                            <p>Янв.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 50%;"></div>
                                <div class="expense" style="height: 20%;"></div>
                            </div>
                            <p>Фев.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 60%;"></div>
                                <div class="expense" style="height: 25%;"></div>
                            </div>
                            <p>Мар.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 30%;"></div>
                                <div class="expense" style="height: 25%;"></div>
                            </div>
                            <p>Апр.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 20%;"></div>
                                <div class="expense" style="height: 55%;"></div>
                            </div>
                            <p>Май.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 70%;"></div>
                                <div class="expense" style="height: 85%;"></div>
                            </div>
                            <p>Июн.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 60%;"></div>
                                <div class="expense" style="height: 25%;"></div>
                            </div>
                            <p>Июл.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 45%;"></div>
                                <div class="expense" style="height: 15%;"></div>
                            </div>
                            <p>Авг.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 70%;"></div>
                                <div class="expense" style="height: 25%;"></div>
                            </div>
                            <p>Сен.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 60%;"></div>
                                <div class="expense" style="height: 25%;"></div>
                            </div>
                            <p>Окт.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 77%;"></div>
                                <div class="expense" style="height: 35%;"></div>
                            </div>
                            <p>Ноя.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 25%;"></div>
                                <div class="expense" style="height: 25%;"></div>
                            </div>
                            <p>Дек.</p>
                        </li>
                    </ul>
                </div>
        
                <div class="year_balance-wrapper graph_year-wrapper">
                    <p>2025</p>
                    <ul>
                        <li>
                            <div>
                                <div class="income" style="height: 20%;"></div>
                                <div class="expense" style="height: 30%;"></div>
                            </div>
                            <p>Янв.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 50%;"></div>
                                <div class="expense" style="height: 20%;"></div>
                            </div>
                            <p>Фев.</p>
                        </li>
                        <li>
                            <div>
                                <div class="income" style="height: 60%;"></div>
                                <div class="expense" style="height: 25%;"></div>
                            </div>
                            <p>Мар.</p>
                        </li>
                        <li>
                            <div></div>
                        </li>
                        <li>
                            <div></div>
                        </li>
                        <li>
                            <div></div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- transaction -->
            <div style="margin-top: 1rem; margin-left: 1rem; margin-right: 1rem;">
                <h3>История транзакций</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="background-color: red;">01.01.2025</li>
                    <li>12.12.2024</li>
                </ul>
            </div>


        </div>

        <!-- КООПЕРАТИВЫ -->
        <div 
            v-if="currentBandParagraph === 'structure'"
            style="margin-top: 1rem;"
        >
            <ul v-if="my_band_list_computed.length">
                <li v-for="(item, j) in my_band_list_computed">
                    <!-- <h3>Мешок 1</h3> -->
                    <p>{{ item.name }} | {{ item.sharers.length }} {{ set_measure(item.sharers.length) }} | CAP: 999 999 999.99 RUB |
                        <div v-for="sharer in item?.sharers.filter(el => el.userType === 'conspirator' && el.userId === +route.params.id)">
                            {{ sharer.position }} {{ sharer.allocation }}
                        </div>
                    </p>
                </li>
            </ul>
            <ul v-else>
                <li>Не состоит в бандах</li>
            </ul>
        </div>

        <!-- PROJECTS -->
        <div 
            v-if="currentBandParagraph === 'projects'"
            style="margin-top: 1.5rem;"    
        >
            <!-- <h2>Проекты</h2> -->
            <ul v-if="project_role_chip_computed?.length > 0" style="list-style: none; margin: 0; padding: 0;">

                <!-- chip tag -->
                <!-- this band is customer / executor / sharer -->
                <Chip
                    style="margin-bottom: 1rem;"
                    id="project-role-chip"
                    :tabs="project_role_chip_computed"
                    :default="currentChipProjectRole"
                    @changed="changeChipProjectRole"
                />

                <!-- {{ currentChipProjectRole }} -->
                <li v-for="el in project_list_computed?.filter(el => {

                    if(currentChipProjectRole.name === 'customer') {
                        return el.customer?.find(c => c.userType === 'conspirator' && c.userId === +route.params.id)
                    }
                    else if (currentChipProjectRole.name === 'executor') {
                        return el.executor?.find(c => c.userType === 'conspirator' && c.userId === +route.params.id)
                    }
                    else if (currentChipProjectRole.name === 'sharers') {
                        return el.sharers?.find(c => c.userType === 'conspirator' && c.userId === +route.params.id)
                    }
                    // return el
                })" style="margin-left: 1rem; margin-right: 1rem;">
                    <p>
                        <b>{{ el.name }}</b> 
                        <br>
                        <span style="color: var(--color-global-text_second); font-size: .8rem;">Заказчик: 
                            <span 
                                v-for="customer in el.customer"
                                style="cursor: pointer;"
                                @click="setSharerRoute(customer.userId, customer.userType)"
                            >
                                <!-- {{ customer.userType }} {{ customer.userId }} -->
                                {{ translateName(customer.userType, customer.userId) }}
                            </span>
                        </span> 
                        <br>
                        <span style="color: var(--color-global-text_second); font-size: .8rem;">Исполнитель:
                            <span 
                                v-for="executor in el.executor" 
                                style="cursor: pointer;"
                                @click="setSharerRoute(executor.userId, executor.userType)"
                            >
                                <!-- {{ executor.userType }} {{ executor.userId }} -->
                                {{ translateName(executor.userType, executor.userId) }}
                            </span>
                        </span>
                        <br>
                        <span style="color: var(--color-global-text_second); font-size: .8rem;">Соучастники проекта: 
                            <span 
                                v-for="sharer in el.sharers"
                                style="cursor: pointer;"
                                @click="setSharerRoute(sharer.userId, sharer.userType)"
                            >
                                <!-- {{ sharer.userType }} {{ sharer.userId }} -->
                                {{ translateName(sharer.userType, sharer.userId) }}
                            </span>
                        </span>
                        <br>
                        <span @click="$router.push(`/projects/${el.id}`)" style="font-size: .8rem; cursor: pointer;">Перейти</span>
                    </p>
                    
                    <!-- {{ el }} -->
                </li>
            </ul>
            <ul v-else>
                <li>Нет проектов</li>
            </ul>
        </div>

        <!-- WAREHOUSE -->
        <div 
            v-if="currentBandParagraph === 'warehouse'"
            style="margin-top: 1rem;"
        >
            <h2>Имущество</h2>
            <ul>
                <li>Имущество 1</li>
                <li>Имущество 2</li>
            </ul>
        </div>

        <!-- WAREHOUSE -->
        <div 
            v-if="currentBandParagraph === 'mesh'"
            style="margin-top: 1rem;"
        >
            <h2>Мешки</h2>
            <ul>
                <li>Мешок 1</li>
                <li>Мешок 2</li>
            </ul>
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

/* POPUP MENU */
    /* 
    */
    #popup_input-btn {
        display: none;
    }
    #sharers_list-btn:checked + .popup_1-container,
    #popup_input-btn:checked + .popup-container{
        display: flex;
        position: fixed;
        opacity: 1;
        left: 0;
        top: 0;
        z-index: 999;
        transition: all .2s ease-in-out;
    }
    #sharers_list-btn:checked + .popup_1-container > .popup_1-wrapper,
    #popup_input-btn:checked + .popup-container > .popup_wrapper {
        left: 0;
    }
    .popup_label-btn {
        position: relative;
    }
    .popup_label-btn label {
        cursor: pointer;
    }
    .popup-container,
    .popup_1-container {
        position: fixed;
        z-index: -1;
        background: var(--color-bg-popup);
        backdrop-filter: blur(2px);
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .popup-container::-webkit-scrollbar,
    .popup_1-container::-webkit-scrollbar  {
        display: none;
    }
    .popup-container > .popup_wrapper,
    .popup_1-container > .popup_1-wrapper {
        transition: all .5s ease-in-out;
        position: absolute;
        height: 100%;
        left: -100%;
        background-color: var(--color-btn-text);
        box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.2);
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }

    /* 
    GRAPH 
    */
    .graph-container {
        color: var(--color-global-text);
        display: flex;
        gap: .5rem;
        overflow-x: scroll;
        margin-left: 0;
        margin-right: 0;
        -ms-overflow-style: none; 
        scrollbar-width: none;
    }
    .graph-container::-webkit-scrollbar {
        display: none;
    }
    .graph_year-wrapper {
        border-left: .5px solid var(--color-btn-disabled-bg);
        padding-left: .5rem;
    }
    .graph_year-wrapper > p {
        color: var(--color-global-text_second);
        font-size: .8rem;
        margin: 0;
    }
    .graph_year-wrapper ul{
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
        gap: 1rem;
    }
    .graph_year-wrapper ul li {
        height: 15rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }
    .graph_year-wrapper ul li div {
        width: 1.5rem;
        gap: .1rem;
        height: 100%;
        display: flex;
        align-items:  flex-end;
    }
    /* 
    CAP 
    */
    .graph_year-wrapper > ul > li > div > .cap_value {
        border-top-left-radius: .3rem;
        border-top-right-radius: .3rem;
        transition: all .2s ease-in;
        background-color: var(--color-operation-type-donation);
    }
    .graph_year-wrapper > ul > li > div > .cap_value:hover {
        background-color: var(--color-status-paused);
        cursor: pointer;
    }
    .graph_year-wrapper > ul > li > div > .cap_choosen_month {
        background-color: var(--color-urgency-low-wo);
    }
    .graph_year-wrapper ul li p{
        font-size: .8rem;
        margin: 0;
        color: var(--color-global-text_second);
    }
    /* 
    INCOME
    */
    .graph_year-wrapper > ul > li > div > .income {
        background-color: var(--color-wallet-fund-available);
        border-top-left-radius: .3rem;
        border-top-right-radius: .3rem;
        transition: all .2s ease-in;
    }
    .graph_year-wrapper ul li div > .income:hover {
        cursor: pointer;    
        background-color: var(--color-urgency-low);
    }
    /* 
    EXPENSE 
    */
    .graph_year-wrapper > ul > li > div > .expense {
        background-color: var(--color-wallet-fund-debt);
        border-top-left-radius: .3rem;
        border-top-right-radius: .3rem;
        transition: all .2s ease-in;
    }
    .graph_year-wrapper ul li div > .expense:hover {
        cursor: pointer;    
        background-color: var(--color-urgency-high);
    }

    /* CHIPS */
    /* 
     */
    .current_band_paragraph {
        display: flex;
        -ms-overflow-style: none;  /* IE and Edge */
        overflow: scroll; 
        scrollbar-width: none; 
        max-width: 100vw!important;
        gap: 1rem;
        padding-bottom: .5rem;
        border-bottom: 1px solid var(--color-btn-disabled-bg);
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .current_band_paragraph::-webkit-scrollbar {
        display: none;
        -webkit-appearance: none;
        width: 0;
        height: 0;
    }
    .current_band_paragraph h2 {
        font-size: 1rem;
        font-weight: normal;
        position: relative;
    } 
    .current_band_paragraph h2 span {
        text-wrap: nowrap;
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

    /* 
    SHARERS
    */
    .sharers_container {
        /* display: none; */
        margin-top: 2rem;
        border-radius: 1rem;
        background-color: var(--color-global-text);
        overflow: hidden;
        padding-bottom: 2rem;
    }
    .sharers_container > .sharers-header_wrapper {
        margin-left: 1rem;
        margin-right: 1rem;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .sharers_container > .sharers-header_wrapper > div > label {
        color: var(--color-btn-text);
        font-size: .8rem;
        padding: 2px 8px;
        border-radius: 1rem;
        background-color: var(--color-operation-type-donation);
        cursor: pointer;
    }
    .sharers_container > .sharers-header_wrapper > div > input {
        display: none;
    }
    .sharers_container > .sharers-item_wrapper {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 1.5rem;
        margin-top: 1rem;
        -ms-overflow-style: none;  /* IE and Edge */
        overflow: scroll; 
        scrollbar-width: none; 
        max-width: 100vw!important;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .sharers_container > .sharers-item_wrapper::-webkit-scrollbar {
        display: none;
        -webkit-appearance: none;
        width: 0;
        height: 0;
    }
    .sharers_item {
        border-radius: .5rem;
        display: flex; 
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .sharers_item:hover {
        cursor: pointer;    
    }
    .sharers_item > .avatar {
        width: 64px;
        height: 64px;
        background-color: var(--color-operation-type-donation);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
    }
    .sharers-item_name {
        color: var(--color-global-text_second);
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: .8rem;
        width: 20px;
        text-align: center;
        margin-top: .5rem;
    }

    /* MODAL SHARER LIST */
    .sharers_list-container > .sharers_list-wrapper > h3 {
        border-bottom: 1px solid var(--color-status-paused);
        margin: 0;
        padding-bottom: 1rem;
        font-weight: bold;
    }
    .sharers_list-container > .sharers_list-wrapper > ul {
        padding: 0;
        margin: 0;
        margin-top: 1rem;
    }
    .sharers_list-container > .sharers_list-wrapper > ul >.sharers-list_item {
        display: flex;
        flex-direction: column;
        /* gap: 1rem; */
        /* grid-template-columns: 1rem 5fr 2fr 30px; */
        /* align-items: center; */
        list-style: none;
        color: var(--color-global-text_second);
        /* margin-top: 1rem; */
        /* margin-left: -1rem; */
        /* margin-right: -1rem; */
        /* padding: .2rem 0 .2rem 1rem; */
        transition: all .2s ease-in-out;
        padding: .5rem;
        /* border: 1px solid red; */
        border-radius: 1rem;
    }   
    .sharers_list-container > .sharers_list-wrapper > ul >.sharers-list_item:first-child {
        margin-top: unset;
    }
    .sharers_list-container > .sharers_list-wrapper > ul >.sharers-list_item:hover {
        border-radius: 1rem;
        background-color: var(--color-btn-hover-bg);
    }
    .sharers_list-container > .sharers_list-wrapper > ul >.sharers-list_item > .sharers-list_item-index {
        grid-area: index;
    }
    .sharers_list-container > .sharers_list-wrapper > ul >.sharers-list_item:hover {
        color: var(--color-btn-bg);
        cursor: pointer;
    }
    .sharers-list_item-el p {
        margin: 0;
    }
    .sharers-list_item-el:nth-child(2) {
        margin-left: 1rem;
    }
    .sharers-list_item-el:nth-child(2) p, 
    .sharers-list_item-el:nth-child(2) p span{
        font-size: .8rem;
        color: var(--color-global-text_second);
    }
    

@media screen and (max-width: 575px) {
    .show-max-767 {
        display: none;
    }
    .title-section_container {
        margin: 0 1rem;
    }

    /* 
     */
     .cap-header_wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
    }
    .cap-header_wrapper div h2{
        font-size: 1rem;
        font-weight: normal;
    }
    .cap-header_wrapper > p {
        margin: 0;
    }
    /* 
     */
    .popup_1-container > .popup_1-wrapper,
    .popup-container > .popup_wrapper {
        width: 80%;
    }
    /* 
     */
    .graph-container {
        width: 100vw!important;
        padding-right: 1rem;
    }
    /* 
    CURRNT BAND DPARAGRAPH
     */
    /* 
    SHARERS
    */
    .sharers_container {
        margin: 0 1rem;
        margin-top: 2rem;
    }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
    .show-max-767 {
      display: none;
    }
    .title-section_container {
        margin: 0 1rem;
    }
    .content-setion_container {
        /* padding-left: 1rem; */
        /* padding-right: 1rem; */
    }
    /* 
     */
     .cap-header_wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
    }
    .cap-header_wrapper div h2{
        font-size: 1rem;
        font-weight: normal;
    }
    .cap-header_wrapper > p {
        margin: 0;
    }

    /* GRAPH */
    .cap_container {

    }
    /* 
    SHARERS
    */
    .sharers_container {
        margin: 0 1rem;
        margin-top: 2rem;
    }

    /* 
     */
    .popup-container > .popup_wrapper,
    .popup_1-container > .popup_1-wrapper {
        width: 60%;
    }

    /* 
     */
     .graph-container {
        padding-left: .5rem;
        padding-right: 1rem;
        width: 100vw!important;
    }
    .graph_year-wrapper:first-child {
        border-left: none!important;
    }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
    /* 
     */
     .popup-container > .popup_wrapper,
     .popup_1-container > .popup_1-wrapper {
        width: 50%;
    }
    /* 
     */
     .cap-header_wrapper {
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
        align-items: center;
        padding: 1rem 0;
    }
    .cap-header_wrapper div h2{
        font-size: 1rem;
        font-weight: normal;
    }
    .cap-header_wrapper > p {
        margin: 0;
    }
    /* 
     */
    .graph-container {
        width: 100vw!important;
    }
    .graph_year-wrapper:first-child {
        margin-left: none!important;
        border-left: none!important;
    }
    /* 
    SHARERS
    */
    .sharers_container {
        margin: 0;
        margin-right: 1.5rem;
        margin-top: 2rem;
    }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
    /* 
     */
     .popup-container > .popup_wrapper,
     .popup_1-container > .popup_1-wrapper {
        width: 50%;
    }
    /* 
     */
     .cap-header_wrapper {
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
        align-items: center;
        padding: 1rem 0;
    }
    .cap-header_wrapper div h2{
        font-size: 1rem;
        font-weight: normal;
    }
    .cap-header_wrapper > p {
        margin: 0;
    }
    /* 
     */
     .graph-container {
        width: 100vw!important;
     }
     .graph_year-wrapper:first-child {
        margin-left: none!important;
        border-left: none!important;
    }
    /* 
    SHARERS
    */
    .sharers_container {
        margin: 0;
        margin-right: 1.5rem;
        margin-top: 2rem;
    }
}
@media screen and (min-width: 1200px) {
    /* 
     */
     .popup-container > .popup_wrapper,
     .popup_1-container > .popup_1-wrapper {
        width: 50%;
    }
    /* 
     */
     .cap-header_wrapper {
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
        align-items: center;
        padding: 1rem 0;
    }
    .cap-header_wrapper div h2{
        font-size: 1rem;
        font-weight: normal;
    }
    .cap-header_wrapper > p {
        margin: 0;
    }
    /* 
     */
     .graph_year-wrapper:first-child {
        margin-left: none!important;
        border-left: none!important;
    }
    /* 
    SHARERS
    */
    .sharers_container {
        margin: 0;
        margin-top: 2rem;
    }
}
</style>