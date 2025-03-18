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

    onMounted(() => {
        const historyGrapContainer = document.getElementById('history-graph');
        const capitalizationGraphContainer = document.getElementById('capitalization-graph')

        historyGrapContainer.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            historyGrapContainer.scrollLeft += evt.deltaY;
        })

        capitalizationGraphContainer.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            capitalizationGraphContainer.scrollLeft += evt.deltaY; 
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

        <!-- TOTAL CAP -->
        <div>
        <div class="container_header">
            <h2>Капитализация</h2>
            <div style="display: flex; align-items: center;">
                <p style="margin: 0;font-size: 2rem; font-weight: bold;">~2 468.RUB</p>
                <div style="display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;">
                    <!-- name="material-symbols-light:filter-alt-outline" -->
                    <Icon             
                        name="material-symbols-light:filter-alt"
                        size="2.5rem"
                        color="var(--color-global-text)"/>
                        <div style="position: absolute; bottom: .3rem; right: .3rem; height: .8rem; width: .8rem; background-color: var(--color-urgency-middle); border-radius: 100%;"></div>
                </div>
            </div>

        </div>

        <div class="capitalization_chip-container">
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

        <div style="margin-top: 2rem;" id="capitalization-graph" class="capitalization-container">
    
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
    
                </ul>
                <p>2023</p>
            </div>
        </div>
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
    <!-- INCOME-EXPENSE -->
    <div>
        <div class="container_header">
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

    /* GRAPH */
    .container_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .container_header > p {
        margin: 0;
    }
    .capitalization_chip-container {
        display: flex;
        align-items: center;
        overflow-x: scroll;
        max-width: 100vw!important;
        -ms-overflow-style: none; 
        scrollbar-width: none;
    }
    .capitalization_chip-container::-webkit-scrollbar  {
        display: none;
    }
    .capitalization_chip-container > div {
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
    }
    .history_balance-container::-webkit-scrollbar,
    .capitalization-container::-webkit-scrollbar  {
        display: none;
    }
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
        width: 2rem;
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
        background-color: var(--color-paused-wrapper-bg);
    }
    .year_balance-wrapper > ul > li > div > .cap_value:hover {
        background-color: var(--color-operation-type-donation);
        cursor: pointer;
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