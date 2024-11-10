<template>

    <!-- POPUP -->
     <InfoPopup
        v-if="popup_opened"
        id="popup-info_landing_all" 
        popup_title="Грядка" 
        @emitClosePopup="closePopup"
     >
        <!-- SLOT -->
        <!-- Перейти на landing -->
        <div style="display: flex; align-items: center;">
            <Button type="pseudo-btn" :link="`${generateLandingLink(choosenEl?.name)}`">{{ choosenEl?.name }}</Button>
            <div>
            <Icon
                class="link"
                name="material-symbols-light:arrow-back-ios"
                size="24px"
                color="var(--color-global-text_second)"
                style="transform: rotate(-180deg)"
            />
            </div>
        </div>

        <!-- leads -->
        <div class="leads_container" style="margin-top: 1rem;">
            
            <!-- LENGTH > 0 -->
            <div v-if="choosenEl?.leads.length">
                <ul style="list-style: none; padding: 0;">
                    <li class="lead-item-header_wrapper">
                        <div>id</div>
                        <div>Статус</div>
                        <div>Важность</div>
                        <div>Дата заявки</div>
                    </li>
                    <li 
                        v-for="(item, index) in reversedArray(choosenEl.leads)"
                        @click="$router.push(`/demands/${item.lead_id}`)"
                        class="lead-item_wrapper"    
                    >
                        <div>
                            {{ index + 1 }}
                        </div>
                        <div>
                            {{ item.status }}
                        </div>
                        <div>
                            <span :style="`background-color: ${set_bgColor_by_Urgency(item)}`">{{ item.urgency }}</span>
                        </div>
                        <div style="white-space: nowrap;">
                            {{ item.created_at.split('T')[0] }}
                        </div>
                    </li>
                </ul>
            </div>
            <!-- LENGTH === 0 -->
            <div v-else>
                <p>Нет лидов...</p>
            </div>
        </div>

    </InfoPopup>

    <!-- Content of the page -->
    <Container>
        <h1>Мой огород</h1>

        <div v-if="computed_landing_list?.length">

            <ul style="list-style: none; padding: 0; display: flex; align-items: center; margin-left: 1rem; gap: 1rem;">
                <li style="border: 1px solid gray; border-radius: 16px; padding: 2px 12px;">Лиды</li>
                <li style="border: 1px solid gray; border-radius: 16px; padding: 2px 12px;">Деньги</li>
            </ul>
    
            <div class="diagram-wrapper">
    
                <!-- Canvas -->
                <!-- DIAGRAM (LEFT SIDE) -->
                <div class="canvas">
                    <!-- chart -->
                    <svg class="chart" viewBox="0 0 60 40">
                        <circle v-for="(el, index) in computed_landing_list" :key="el.id" class="unit" r="15.9" cx="50%" cy="50%" @click.stop="onClickEl(el, index)">
                            {{ el }}
                        </circle>
                    </svg>
                    <!-- caption -->
                    <div class="caption">
                        <div class="caption_content" v-if="choosenEl">
                            <div >{{ choosenEl.name }}</div>
                        </div>
                        <div class="caption_content" v-else>
                            <div>Все</div>
                        </div>
                    </div>
                </div>
    
                <!-- DESC (RIGHT SIDE)-->
    
                <!--  -->
                <div class="list_container">
    
                    <!-- SHOW ALL -->
                    <div>
                        <!-- SECTION -->
                        <Section class="landing-list-el_wrapper" v-for="(el, index) in computed_landing_list" @click.stop="chooseCurrentLanding(el, index)">
    
                            <!-- SECTION HEADER -->
                            <div class="landing-list-el_header" style="position: relative;">
    
                                <!-- LEADS QTY GROUP -->
                                <div 
                                    style="
                                        width: 3rem; 
                                        height: 100%; 
                                        /* background-color:red;  */
                                        position: absolute; 
                                        margin-left: -0.5rem;
                                        top: 0;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                    "
                                >
                                    <p style="margin: 0; font-size: 32px; font-weight: normal;">{{ el.leads.length }}</p>
                                </div>
    
                                <!-- GROUP CONTENT -->
                                <div style="flex: 1 0; margin-left: 3rem;">
                                    <p style="margin: 0;">{{ el.name }}</p>
                                    <p style="margin: 0;">999999999.99 руб.</p>
                                </div>
                                
                                <!-- ROUTER BTN GROUP-->
                                 <div class="router-btn_group">
    
                                     <Icon
                                         class="link"
                                         name="material-symbols-light:arrow-back-ios"
                                         size="32px"
                                         color="var(--color-global-text_second)"
                                         style="transform: rotate(180deg)"
                                     />
                                 </div>
                            </div>
                        </Section>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>На вашем огороде нет посадок...</div>


    </Container>
</template>

<style scoped>
    .landing_container {
        /* ... */
    }

    .landing-list-el_wrapper {
        margin-bottom: 1rem;
        /* background-color: var(--color-btn-disabled-bg);  */
        cursor:pointer; 
    }
    .landing-list-el_header {
        gap: 1rem; 
        display: flex; 
        align-items: center; 
        justify-content: space-between;
    }

    /*  */
    .diagram-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }


    svg.icon   {
        padding-left: 0.5rem;
    }

    .unit {
        fill: none;
        stroke-width: 5;
        transition: all 0.5s ease;
        cursor: pointer;
    }
    .unit:nth-child(1) {
        stroke: v-bind('colors.unit1');
    }
    .unit:nth-child(2) {
        stroke: v-bind('colors.unit2');
    }
    .unit:nth-child(3) {
        /* stroke: #ffc7ec; */
        stroke: v-bind('colors.unit3');
    }
    .unit:nth-child(4) {
        stroke: v-bind('colors.unit4');
    }
    .unit:nth-child(5) {
        stroke: v-bind('colors.unit5');
    }
    .unit:nth-child(6) {
        stroke: v-bind('colors.unit6');
    }
    .unit:nth-child(7) {
        stroke: v-bind('colors.unit7');
    }
    .unit:nth-child(8) {
        stroke: v-bind('colors.unit8');
    }
    .unit__hovered {
        stroke-width: 8;
    }

  .lead-item-header_wrapper,
  .lead-item_wrapper {
    display: grid; 
    /* grid-template-columns: 2rem 6rem 6rem 1fr */
  }

  .lead-item-header_wrapper {
    /* display: grid;  */
    /* grid-template-columns: 2rem 6rem 6rem 1fr;  */
    color: var(--color-global-text_second); 
    font-size: 0.8rem; 
    padding-bottom: 0.5rem
  }

  .lead-item_wrapper {
    margin-top: 0.5rem; 
    /* display: grid;  */
    /* grid-template-columns: 2rem 6rem 6rem 1fr */
  }

  .lead-item_wrapper:hover {
    background-color: var(--color-btn-hover-bg);
    cursor: pointer;
  }
  


  @media screen and (max-width: 575px) {
    .canvas {
        /* height: 100vh; */
    }
    .unit__hovered {
        stroke-width: 7;
    }
    .list_container {
        padding: 0 1rem;
    }
    .lead-item-header_wrapper,
    .lead-item_wrapper {
        grid-template-columns: 2rem 1fr 1fr 1fr   
    }
  }

  @media screen and (min-width: 576px) and (max-width: 767px) {
    .list_container {
        padding: 0 1rem;
    }
    .lead-item-header_wrapper,
    .lead-item_wrapper {
        display: grid; 
        grid-template-columns: 3rem 1fr 1fr 1fr
    }
  }

  @media screen and (max-width: 767px) {
    h1 {
        margin-left: 1rem;
    }
    .diagram-wrapper {
        grid-template-columns: 1fr;
    }
    .canvas {
        position: relative;
    }
    .caption {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .landing-list-el_wrapper {
        width: 100%;
    }
  }
  @media screen and (min-width: 768px) {
    .canvas {
        display: flex;
        flex-direction: column;
    }
    .caption {
        margin: 0 auto;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    .diagram-wrapper {
        justify-content: space-between;
    }
    .lead-item-header_wrapper,
    .lead-item_wrapper {
        display: grid; 
        grid-template-columns: 3rem 1fr 1fr 1fr
    }
  }
  @media screen and (min-width: 992px) {
    .landing-list-el_wrapper {
        width: 480px;
    }
    .lead-item-header_wrapper,
    .lead-item_wrapper {
        display: grid; 
        grid-template-columns: 3rem 1fr 1fr 1fr
    }
  }
</style>

<script lang="ts" setup>
    useHead({
        title: "Мой огород",
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

    // VARIABLES
    const choosenEl = ref()

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

    // trigger popup
    const popup_opened = ref(false)

    // shared
    import { Container } from '@/shared/container'
    import { Section } from '@/shared/section'
    import { InfoPopup } from '~/shared/popup';

    // components
    import { Button } from '@/components/button'

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

    // ON MOUNTED
    onMounted(() => {
        // на всякий случай сбрасываем фиксацию при открытой модалке...
        let body = document.getElementsByTagName('body')[0]
        body.style.margin = 'unset'
        body.style.height = 'unset'
        body.style.overflow = 'unset'
        // Рисуем диаграмму
        setStrokeDashArrayAndOffset()
    })

    let body = document.querySelector('body')

    // BODY LISTENER CLICK
    body?.addEventListener('click', (e) => {
        // Убираем ховер на unit в диаграме (если нету класс unit + если попап не открыт)
        if(
            !e.target.classList.contains('unit') && !e.target.parentNode.classList?.contains('popup_wrapper')
        ) {
            const unitsList = document.querySelectorAll('.unit');
            choosenEl.value = null
            for(let i = 0; i <= unitsList.length; i++) {
                if(unitsList[i] && unitsList[i].classList.contains('unit__hovered')) {
                    unitsList[i].classList.remove('unit__hovered');
                }
            }
        }
    })

    // ******* COMPUTED
    // landing_list
    const computed_landing_list = computed(() => {
        if(landing_list.value && lead_list.value) {

            // type Obj = {
            //     id: Number,
            //     // leads: {}[]
            // }

            let result: any = []

            landing_list.value?.forEach(landing => {
                
                let leads = lead_list.value?.reduce((arr: {}[], lead) => {
                    if(lead.landingId === landing.id) {
                        arr.push({
                            lead_id: lead.id,
                            created_at: lead.created_at,
                            status: lead.status,
                            urgency: lead.urgency
                            // landing_id: lead.landingId
                        })
                    }

                    return arr
                }, [])

                result.push({
                    id: landing.id,
                    name: landing.name,
                    leads: leads,
                    created_at: landing.created_at,
                    update_at: landing.update_at
                })
            });
            
            // console.log(result)
            return result
        }
    })
    
    // ******* DIAGRAM
    //= filters
    //  по текущему статусу... (вариант...)
    //  разработать еще варианты...
    const setStrokeDashArrayAndOffset = () => {

        let chart = document.querySelector('.chart')

        if(chart) {
            setTimeout(() => {
                let units = chart.querySelectorAll('.unit')

                for(let i = 0; i <= computed_landing_list.value?.length; i++) {

                    if(computed_landing_list.value?.[i]) {
                        // let ratio = 1 / computed_landing_list.value?.length * 100;
                        let ratio = setMinValueLandingLeads(computed_landing_list.value?.[i].leads) / sumQtyLandingLeadsFunc() * 100

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
            },110)
        }
    }
    // sum qty all landing leads
    const sumQtyLandingLeadsFunc = () => {

        let sum = computed_landing_list.value.reduce((acc: number, landing: any) => {
            return acc += setMinValueLandingLeads(landing.leads)
        }, 0)

        return sum
    }
    // min value for non lead landings in the diagram
    const setMinValueLandingLeads = (leads: any) => {
        if(leads.length === 0) {
            return 0.1
        } else {
            return leads.length
        }
    }

    // ******* COLORIZED
    // set_bgColor_by_Urgency(item)
    const set_bgColor_by_Urgency = (lead: any) => {
        // console.log(lead.urgency)
        let color;

        // ****** URGENCY ******
        if(lead.urgency) {

            // LOW
            if(lead.urgency === 'low') {
                color = `var(--color-urgency-low)`
            } 
            // MIDDLE
            else if (lead.urgency === 'middle') {
                color = `var(--color-urgency-middle)`
            }
            // HIGH
            else if (lead.urgency === 'high') {
                color = `var(--color-urgency-high)`
            }
            else {
            // color = null
            }
        }

        return color
    }

    // ******* ACTIONS ON PAGE
    // onClick diagram by unit
    const onClickEl = (el: any, index: number) => {

        if(!popup_opened.value) {
            popup_opened.value = true
        }
        //  
        // const captionList = document.querySelectorAll('.caption-item'), 
        const unitsList = document.querySelectorAll('.unit');
        
        // unitsList[index].classList.toggle('unit__hovered')
        // captionList[index].classList.toggle('visible');
        
        // Очищаем все элементы от класса 
        unitsList.forEach(item => item.classList.remove('unit__hovered'))
        // Действуем
        if(unitsList[index].classList.contains('unit__hovered')) {
            unitsList[index].classList.remove('unit__hovered');
            choosenEl.value = null
        } else if(!unitsList[index].classList.contains('unit__hovered')){
            unitsList[index].classList.add('unit__hovered');
            choosenEl.value = el
        }
    }

    //
    // const resetChoosenEl = (e: any) => {
    //     if(e.target.parentNode.parentNode.classList.contains('landing-list-el_header')) {
    //         console.log(e.target.parentNode.parentNode)
            
    //     }
    //     // const unitsList = document.querySelectorAll('.unit');
    //     // if(choosenEl.value && choosenEl.value.id === el.id) {

    //     //     console.log(unitsList[index])
    //     // }
    //     // unitsList[index].classList.toggle('unit__hovered')
    //     // captionList[index].classList.toggle('visible');
    //     // Очищаем все элементы от класса 
    //     // unitsList.forEach(item => item.classList.remove('unit__hovered'))
    //     // // Действуем
    //         // if(unitsList[index].classList.contains('unit__hovered')) {
    //         //     unitsList[index].classList.remove('unit__hovered');
    //         //     choosenEl.value = null
    //         // } else if(!unitsList[index].classList.contains('unit__hovered')){
    //         //     unitsList[index].classList.add('unit__hovered');
    //         //     choosenEl.value = el
    //         // }
    // }

    // onClick in desc section item 
    const chooseCurrentLanding = (el: any, index: number) => {
        choosenEl.value = el
        if(!popup_opened.value) {

            popup_opened.value = true
        }
        const unitsList = document.querySelectorAll('.unit');
        // Очищаем все элементы от класса 
        unitsList.forEach(item => item.classList.remove('unit__hovered'))
        // Действуем
        if(unitsList[index].classList.contains('unit__hovered')) {
            unitsList[index].classList?.remove('unit__hovered');
            choosenEl.value = null
            if(popup_opened.value) {
                popup_opened.value = false
            }
        } else if(!unitsList[index].classList.contains('unit__hovered')){
            unitsList[index].classList.add('unit__hovered');
            choosenEl.value = el
        }
    }

    // HELPERS
    // reverse array
    const reversedArray = (arr: []) => {
        let tempArray = [...arr]
        return tempArray.reverse()
    }
    // landing links
    const generateLandingLink = (name: string) => {
        return `/${name}`
    }

    // ******* DB
    // *** GET
    // landing
    const { data: landing_list } = useFetch("/api/landingGuarded/landing", {
        lazy: false,
        transform: (landing_list) => {
            return landing_list.filter((el) => {
                // session user is a sharer
                if(el.sharers && el.sharers.find((item) => item.userType === 'conspirator' && item.userId === props.auth_user_profile.userId)) {
                    return el
                }
            })
        }
    })

    // leads
    const { data: lead_list } = useFetch("/api/leadGuarded/lead", {
    lazy: false,
    transform: (lead_list) => {
        return lead_list
    }
    })

    // POPUP FUNCs
    const closePopup = () => {

        //
        popup_opened.value = false
    }

    // WATHERS
    //= landing_list
    watch(landing_list, () => {
        setStrokeDashArrayAndOffset()
    })

    //= popup_opened
    watch(popup_opened, () => {
        let body = document.getElementsByTagName('body')[0]
        if(popup_opened.value) {

            body.style.margin = '0'
            body.style.height = '100%'
            body.style.overflow = 'hidden'

        } else {
            body.style.margin = 'unset'
            body.style.height = 'unset'
            body.style.overflow = 'unset'
        }
    })
    
</script>