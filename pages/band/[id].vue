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
    const router = useRouter()

    onMounted(() => {

        
        
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
        const filter_cap_chip_menu = document.getElementById('filter_cap_chip-menu')
        const sharers_list_btn = document.getElementById('sharers_list-btn')

        //= ДЕЙСТВИЕ
        document.addEventListener('click', (e) => {


            if(e.target?.classList?.contains('capitalization_chip-container')) {
                filter_cap_chip_menu.checked = !filter_cap_chip_menu.checked
            }

            if(e.target?.classList.contains('sharers_list-container')) {
                sharers_list_btn.checked = !sharers_list_btn.checked
            }

        })
    })

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
    //= band_list_computed
    const band_list_computed = computed(() => {

        return band_list.value
    })
    // partner_list_computed
    const partner_list_computed = computed(() => {
        
        return partner_list.value
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
    //= current band
    const { data: band } = useFetch("/api/band/band", {
        lazy: false,
        transform: (band) => {
            return band.find(el => el.id === +route.params.id)
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

</script>


<template>
    <Container>

        <!-- TITLE PAGE SECTION -->
        <div  class="title-section_container" style="margin-bottom: 0.5rem;">
            <BreadCrumbs class="show-max-767"/>

            <h1 style="margin: 0; margin-top: 1rem; font-weight: bold; font-size: 42px;">

                {{ band?.name }}
            </h1> 
        </div>

        <!-- TOTAL CAP -->
        <div class="cap_container">
            <div class="cap-header_wrapper">

                <!-- ЗАГОЛОВОК + КАПА -->
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <h2 style="margin: 0; color: var(--color-global-text_second); ">Капитализация</h2>
                    <p style="margin: 0;font-size: 2rem; font-weight: bold;">~2 468.RUB</p>
                </div>
                <!-- ФИЛЬТР СЕКЦИЙ МЕШКОВ -->
                <div class="filter_cap-container">
                    <label for="filter_cap_chip-menu">
                        <div style="display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;">

                            <Icon             
                                name="material-symbols-light:filter-alt"
                                size="2rem"
                                color="var(--color-global-text)"
                            />
                            <div style="position: absolute; bottom: .2rem; right: .2rem; height: .6rem; width: .6rem; background-color: var(--color-urgency-middle); border-radius: 100%;"></div>
                        </div>
                    </label>
                    <input id="filter_cap_chip-menu" type="checkbox">
                    <div class="capitalization_chip-container">

                        <div class="capitalization_chip">
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

            
            <div id="capitalization-graph" class="capitalization-container">
                <div class="year_balance-wrapper">
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
        
                <div class="year_balance-wrapper">
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
        
                <div class="year_balance-wrapper">
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

                    <!-- МОДАЛКА СО СПИСКОМ СОУЧАСТНИКОВ В БАНДЕ -->
                    <div class="sharers_list-container">

                        <div class="sharers_list-wrapper">
                            <h3>Список соучастников <br> {{ band?.name }}</h3>
                            <ul>
                                <li v-for="(sharer, index) in band?.sharers">
                                    {{ index + 1 }}
                                    {{ sharer }}
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
                    <div class="sharers-item_position">
                        <!-- viewer, founder, investor и другие-->
                        {{ sharer.position }}
                    </div>
                    <div class="sharers-item_name">
                        <div class="avatar">
                            <Icon
                                v-if="sharer.userType === 'user'"
                                size="24px"
                                color="var(--color-btn-text)"
                                name="material-symbols-light:person-rounded"
                            />
                            <Icon
                                v-else
                                size="24px"
                                color="var(--color-btn-text)"
                                name="material-symbols-light:group-rounded"
                            />
                        </div>
                        {{ translateSharerName(sharer.userId, sharer.userType) }}
                    </div>
                    <div class="sharers-item_allocation">
                        <p style="margin: 0;" v-if="sharer.allocation > 0">
                            <span v-if="sharer.userId === props.auth_user_profile.userId">
                                Доля {{ sharer.allocation * 100 }}%
                            </span>
                            <span v-else>В доле</span>
                        </p>
                        <p style="margin: 0;" v-else>

                            <span v-if="sharer.position !== 'viewer'">
                                Сотрудник
                            </span>
                            <span v-else>Прочее</span>
                        </p>
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


    <!-- CAP -->
    <!-- INCOME-EXPENSE -->
    <div style="margin-top: 1rem;">
        <div class="cap-header_wrapper">
            <h2>Доход-Расходы</h2>
            <p style="display: flex; flex-direction: column; align-items: flex-end;"><span>Доход: ~2 468.RUB</span> <span>Расход: ~2 468.RUB</span></p>
        </div>
        <div id="history-graph" class="history_balance-container">
    
            <div class="year_balance-wrapper">
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
    
            <div class="year_balance-wrapper">
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
    
            <div class="year_balance-wrapper">
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
                </ul>
            </div>
        </div>
    </div>
    
    <!-- CHIP SECTION -->
    <!-- <Chip :tabs="chips" :default="currentChip" :btn_all_exist="false" @changed="changeChip" style="margin-top: 1rem;"/> -->
    <!-- {{ currentChip }} -->
    <h2>Структура</h2>
    <ul>
        <li><h3>Мешок 1</h3></li>
        <li><h3>Мешок 2</h3></li>
    </ul>

    <h2>Проекты</h2>
    <ul>
        <li>
            <h3>Проект 1</h3>
            <h4>Задачи</h4>
            <ul>
                <li><h5>Задача 1</h5></li>
                <li><h5>Задача 2</h5></li>
            </ul>
        </li>
        <li>
            <h3>Проект 2</h3>
            <h4>Задачи</h4>
            <ul>
                <li><h5>Задача 1</h5></li>
                <li><h5>Задача 2</h5></li>
            </ul>
        </li>
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
  .title-section_container {
    margin: 0 1rem;
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

    /* GRAPH */
    .cap_container {

    }
    .cap-header_wrapper {
        display: flex;
        flex-direction: column;
        /* align-items: flex-end; */
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .cap-header_wrapper > p {
        margin: 0;
    }

    /*  */
    #filter_cap_chip-menu {
        display: none;
    }
    #filter_cap_chip-menu:checked + .capitalization_chip-container{
        display: flex;
        position: fixed;
        opacity: 1;
        left: 0;
        top: 0;
        z-index: 999;
        transition: all .2s ease-in-out;
    }
    #filter_cap_chip-menu:checked + .capitalization_chip-container > .capitalization_chip {
        left: 0;
    }

    .filter_cap-container {
        position: relative;
        align-self: flex-end;
    }
    .filter_cap-container label {
        cursor: pointer;
    }
    .capitalization_chip-container {
        /* display: none; */
        /* left: -100%; */
        /* align-items: flex-start; */
        /* overflow-x: scroll; */
        /* max-width: 100vw!important; */
        /* -ms-overflow-style: none;  */
        /* scrollbar-width: none; */
        /* padding: 1rem; */
        /* left: -100%; */
        position: fixed;
        z-index: -1;
        background: var(--color-bg-popup);
        backdrop-filter: blur(2px);
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .capitalization_chip-container::-webkit-scrollbar  {
        display: none;
    }
    .capitalization_chip-container > .capitalization_chip {
        transition: all .5s ease-in-out;
        position: absolute;
        height: 100%;
        left: -100%;
        background-color: var(--color-btn-text);
        box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.2);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        width: 50%;
    }
    .capitalization_chip-container > .capitalization_chip > div {
        display: flex;
        align-items: center;
    }
    .history_balance-container,
    .capitalization-container {
        /* background-color: var(--color-btn-hover-bg); */
        color: var(--color-global-text);
        display: flex;
        gap: .5rem;
        overflow-x: scroll;
        margin-left: 0;
        margin-right: 0;
        max-width: 100vw!important;
        -ms-overflow-style: none; 
        scrollbar-width: none;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .history_balance-container::-webkit-scrollbar,
    .capitalization-container::-webkit-scrollbar  {
        display: none;
    }
    .capitalization-container {
        margin-top: 1rem;
    }

    /*  */
    .sharers_container {

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
        color: var(--color-btn-bg);
        font-size: .8rem;
        padding: 2px 8px;
        border-radius: 1rem;
        background-color: var(--color-btn-hover-bg);
        cursor: pointer;
    }
    .sharers_container > .sharers-header_wrapper > div > input {
        display: none;
    }
    #sharers_list-btn:checked +.sharers_list-container {
        display: flex;
        position: fixed;
        opacity: 1;
        left: 0;
        top: 0;
        z-index: 999;
        transition: all .2s ease-in-out;
    }
    .sharers_container > .sharers-header_wrapper > div > .sharers_list-container {
        position: fixed;
        z-index: -1;
        background: var(--color-bg-popup);
        backdrop-filter: blur(2px);
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    #sharers_list-btn:checked +.sharers_list-container > .sharers_list-wrapper {
        left: 0;
    }
    .sharers_container > .sharers-header_wrapper > div > .sharers_list-container > .sharers_list-wrapper {
        transition: all .5s ease-in-out;
        position: absolute;
        height: 100%;
        left: -100%;
        background-color: var(--color-btn-text);
        box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.2);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        /* width: 50%; */
    }
    .sharers_container > .sharers-item_wrapper {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 1rem;
        margin-top: .5rem;
        -ms-overflow-style: none;  /* IE and Edge */
        overflow: scroll; 
        scrollbar-width: none; 
        max-width: 100vw!important;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-bottom: 1rem;
    }
    .sharers_container > .sharers-item_wrapper::-webkit-scrollbar {
        display: none;
        -webkit-appearance: none;
        width: 0;
        height: 0;
    }
    .sharers_item {
        border: 1px solid var(--color-operation-type-donation);
        padding: .5rem 1rem;
        border-radius: .5rem;
    }
    .sharers_item:hover {
        cursor: pointer;    
        box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    }
    .sharers-item_name {
        text-wrap: nowrap;
        color: var(--color-btn-bg);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    .sharers-item_name > .avatar {
        width: 32px;
        height: 32px;
        background-color: var(--color-operation-type-donation);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
    }
    .sharers-item_allocation {
        font-size: .8rem;
        text-align: right;
    }
    .sharers-item_allocation p span{
        color: var(--color-global-text_second);
    }
    .sharers-item_position {
        text-align: right;
        color: var(--color-global-text_second);
        font-size: .8rem;
    }

    /*  */
    .year_balance-wrapper {

    }
    .year_balance-wrapper > p {
        color: var(--color-global-text_second);
        font-size: .8rem;
    }
    .year_balance-wrapper ul{
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
        gap: 1rem;
    }
    .year_balance-wrapper ul li {
        height: 10rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }
    .year_balance-wrapper ul li div {
        width: 1.5rem;
        gap: .1rem;
        height: 100%;
        display: flex;
        align-items:  flex-end;
    }
    .year_balance-wrapper > ul > li > div > .income {
        background-color: var(--color-wallet-fund-available);
        border-top-left-radius: .3rem;
        border-top-right-radius: .3rem;
        transition: all .2s ease-in;

    }
    .year_balance-wrapper > ul > li > div > .expense {
        background-color: var(--color-wallet-fund-debt);
        border-top-left-radius: .3rem;
        border-top-right-radius: .3rem;
        transition: all .2s ease-in;
    }
    .year_balance-wrapper ul li div > .income:hover {
        cursor: pointer;    
        background-color: var(--color-urgency-low);
    }
    .year_balance-wrapper ul li div > .expense:hover {
        cursor: pointer;    
        background-color: var(--color-urgency-high);
    }
    .year_balance-wrapper > ul > li > div > .cap_value {
        border-top-left-radius: .3rem;
        border-top-right-radius: .3rem;
        transition: all .2s ease-in;
        background-color: var(--color-operation-type-donation);
    }
    .year_balance-wrapper > ul > li > div > .cap_value:hover {
        background-color: var(--color-status-paused);
        cursor: pointer;
    }
    .year_balance-wrapper > ul > li > div > .cap_choosen_month {
        background-color: var(--color-urgency-low-wo);
    }
    .year_balance-wrapper ul li p{
        font-size: .8rem;
        margin: 0;
        color: var(--color-global-text_second);
    }
}
@media screen and (min-width: 768px) and (max-width: 991px) {

}
@media screen and (min-width: 992px) and (max-width: 1199px) {

}
@media screen and (min-width: 1200px) {

}
</style>