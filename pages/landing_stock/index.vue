<template>


    <!-- Content of the page -->
    <Container>

        <div style="margin-bottom: 0.5rem;">
            <BreadCrumbs class="show-max-767"/>
            <h1 style="font-weight: bold; font-size: 42px;">Маркетплейс соучастников</h1>
            <p></p> 
        </div>


        <!-- lENGTH TRUE -->
        <div class="item_search">

            <Search @searchInputChanged="onInputFunc"/>
        </div>

        
        <div class="item_container" style="grid-template-columns: 1fr;">

            <div style="margin-bottom: 20.5rem" v-if="searchInput && !computed_landing_list?.length">
                По запросу ничего не найдено
            </div>

            <div class="item_wrapper" v-for="item in computed_landing_list" @click.stop="$router.push(`/${item.name}`)" :style="set_item_styles('border', item.name)">
                <div :style="set_item_styles('background', item.name)">

                    <Icon 
                        v-for="icon in set_item_icons(item.name)"
                        style="padding: 0; box-shadow: var(--hover-shadow); padding: .5rem; border-radius: .5rem;" 
                        size="42px"
                        :name="icon.name"
                        color="var(--color-global-baackground_light)"
                    />
                </div>
                <h2>{{ item.title }}</h2>
                <p style="margin: 0;">{{ item.desc }}</p>
            </div>

            <!-- ELSEs -->
            <div class="no-landing_wrapper" style="margin-bottom: 20.5rem" v-if="searchInput === '' && !computed_landing_list?.length">В магазине пусто</div>
        </div>



    </Container>
</template>

<style scoped>
    /* .landing_container {

    } */
    .chip_container {
        margin-top: 1rem; 
        display: flex; 
        align-items: center; 
        gap: 1rem;
    }
    .landing-list-el_wrapper {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        width: fit-content;
        /* padding: 1rem; */
    }
    .landing-list-el_wrapper:first-child {
        margin: unset;
    }
    .landing-list-el_wrapper:hover {
        cursor:pointer; 
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
    /* #1 */
    .unit:nth-child(1) {
        stroke: v-bind('colors.unit1');
    }
    .landing-list-el_wrapper:nth-child(1) .leads-qty_wrapper {
        background-color: v-bind('colors.unit1');
    }
    /* #2 */
    .unit:nth-child(2) {
        stroke: v-bind('colors.unit2');
    }
    .landing-list-el_wrapper:nth-child(2) .leads-qty_wrapper {
        background-color: v-bind('colors.unit2');
    }
    /* #3 */
    .unit:nth-child(3) {
        /* stroke: #ffc7ec; */
        stroke: v-bind('colors.unit3');
    }
    .landing-list-el_wrapper:nth-child(3) .leads-qty_wrapper {
        background-color: v-bind('colors.unit3');
    }
    /* #4 */
    .unit:nth-child(4) {
        stroke: v-bind('colors.unit4');
    }
    .landing-list-el_wrapper:nth-child(4) .leads-qty_wrapper {
        background-color: v-bind('colors.unit4');
    }
    /* 5 */
    .unit:nth-child(5) {
        stroke: v-bind('colors.unit5');
    }
    .landing-list-el_wrapper:nth-child(5) .leads-qty_wrapper {
        background-color: v-bind('colors.unit5');
    }
    /* #6 */
    .unit:nth-child(6) {
        stroke: v-bind('colors.unit6');
    }
    .landing-list-el_wrapper:nth-child(6) .leads-qty_wrapper {
        background-color: v-bind('colors.unit6');
    }
    /* #7 */
    .unit:nth-child(7) {
        stroke: v-bind('colors.unit7');
    }
    .landing-list-el_wrapper:nth-child(7) .leads-qty_wrapper {
        background-color: v-bind('colors.unit7');
    }
    /* #8 */
    .unit:nth-child(8) {
        stroke: v-bind('colors.unit8');
    }
    .landing-list-el_wrapper:nth-child(8) .leads-qty_wrapper {
        background-color: v-bind('colors.unit8');
    }
    .unit__hovered {
        stroke-width: 8;
    }

  .lead-item-header_wrapper{
    display: grid; 
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
  
  .leads-qty_wrapper {
    width: 3rem; 
    height: 3rem;
    /* height: 100%;  */
    /* position: absolute;  */
    /* margin-left: -0.5rem; */
    /* top: 0; */
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: red; */
  }

  .landing-diagram_wrapper {
    display: flex; 
    /* align-items: center;
    justify-content: center; */
    background-color: var(--color-btn-hover-bg); 
    width: 25rem; 
    height: 25rem; 
    position: relative;
  }
  .landing-diagram_wrapper svg{
    margin: 0 auto;
  }
  .landing-list_wrapper {
    width: 100%;
    list-style: none; 
    align-self: flex-start;
    margin: 0;
  }
  .landing-diagram_container {
    /* display: flex;
    gap: 1rem;
    width: 100%; */
  }  
  /* 
   */
   .item_wrapper {
        transition: all .2s ease-in-out;
        /* border: 1px solid var(--color-operation-type-donation); */
        border-radius: 1rem;
        overflow: hidden;
   }
    .item_wrapper:hover {
        cursor: pointer;
        box-shadow: var(--hover-shadow);
    }
    .item_wrapper div {
        margin-top: -1rem;
        margin-left: -1rem;
        margin-right: -1rem;
        /* background-color: var(--color-operation-type-donation) */
        display: flex;  
        align-items: center; 
        justify-content: center; 
        gap: .5rem;
        height: 250px;
    }

    @media screen and (max-width: 320px) {
    h1 {
        font-size: 32px!important;
    }

    .item_container {
        display: grid;
        grid-template-columns: 1fr!important;
        gap: 1rem;
    }
    }
    @media screen and (min-width:320px) and (max-width: 574px) {
        .item_container {
            display: grid;
            grid-template-columns: 1fr!important;
            gap: 1rem;
        }
    }
  @media screen and (max-width: 575px) {
    h1 {
        margin: 0 1rem!important;
    }
    .chip_container {
        margin-left: 1rem;
        margin-right: 1rem;
    }
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
        /* grid-template-columns: 2rem 1fr 1fr 1fr    */
    }
    .landing-diagram_container {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .no-landing_wrapper {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .landing-list_wrapper {
        padding: 0 .5rem;
        margin-bottom: 1rem;
    }
    .landing-diagram_wrapper {
        height: 15rem;
    }

    /* 
     */
     .item_search {
         /* background-color: red; */
     }
    .item_container {
        margin: 0 1rem;
        margin-top: 1.5rem;
    }
    .item_wrapper {
        /* background-color: var(--color-operation-type-donation); */
        /* background-color: red; */
        /* border-radius: 1rem; */
        padding: 1rem;
    }
    .item_wrapper div {
        display: flex;  
        align-items: center; 
        justify-content: center; 
        gap: .5rem;
        height: 200px;
    }

    /* .item_wrapper div img {
        width: 100%;
    } */

    .item_wrapper p {
        margin-top: .5rem!important;
    }
    .item_wrapper h2 {
        margin-top: 1rem;
    }
  }

  @media screen and (min-width: 576px) and (max-width: 767px) {
    h1 {
        margin: 0 1rem;
    }
    .chip_container {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .list_container {
        padding: 0 1rem;
    }
    .lead-item-header_wrapper,
    .lead-item_wrapper {
        display: grid; 
        grid-template-columns: 3rem 1fr 1fr 1fr
    }
    .landing-diagram_container {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .no-landing_wrapper {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    /* 
     */
     .item_search {
        margin-top: 1.5rem;
     }
     .item_container {
        display: grid;
        grid-template-columns: 1fr 1fr!important;
        gap: 1rem;
        margin: 0 1rem;
        margin-top: 2rem;
    }
    .item_wrapper {
        /* background-color: var(--color-operation-type-donation); */
        /* background-color: red; */
        /* border-radius: 1rem; */
        padding: 1rem;
    }
    .item_wrapper div {
        display: flex;  
        align-items: center; 
        justify-content: center; 
        gap: .5rem;
        height: 250px;
    }
    /* .item_wrapper div img {
        width: 100%;
    } */
    .item_wrapper h2 {
        margin-top: 1rem;
    }

    /* .item_wrapper p {
        margin-top: .5rem!important;
    } */
  }

  @media screen and (max-width: 767px) {
    .show-max-767 {
        display: none;
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
    .list_container {
        margin-top: 1rem;
    }
    .landing-list_wrapper {
        padding: 0 1rem;
        margin-bottom: 1rem;
    }
    .landing-list-el_wrapper {
        width: 100%;
        justify-content: space-between;
    }
    .landing-list-el_wrapper div:nth-child(2) {
        /* background-color: red; */
        flex: 1 0;
    }
    .landing-diagram_wrapper {
        width: 100%;
    }

  }
  @media screen and (min-width: 768px) {
    .canvas {
        display: flex;
        flex-direction: column;
        width: 50%;
        position: fixed;
    }
    .caption {
        /* margin: 0 auto; */
        display: none; 
    }
    .list_container {
        margin-left: 50vw;
    }
    .landing-list_wrapper {
        padding: 1rem 1rem 1rem 0;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    .lead-item-header_wrapper,
    .lead-item_wrapper {
        display: grid; 
        grid-template-columns: 3rem 1fr 1fr 1fr
    }
    /* 
     */
     .item_search {
        margin-top: 2rem; 
     }
     .item_container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr!important;
        gap: 1rem;
        margin-top: 1.5rem;
    }
    .item_wrapper {
        /* background-color: var(--color-operation-type-donation); */
        /* background-color: red; */
        /* border-radius: 1rem; */
        padding: 1rem;
    }
    .item_wrapper div {
        display: flex;  
        align-items: center; 
        justify-content: center; 
        gap: .5rem;
        height: 230px;
    }
    /* .item_wrapper div img {
        width: 100%;
    } */
    .item_wrapper h2 {
        margin-top: 1rem;
    }

    /* .item_wrapper p {
        margin-top: .5rem!important;
    } */
  }
  @media screen and (min-width: 992px) {
    .landing-list-el_wrapper {
        /* width: 480px; */
    }
    .lead-item-header_wrapper,
    .lead-item_wrapper {
        display: grid; 
        grid-template-columns: 3rem 1fr 1fr 1fr
    }
    }
    @media screen and (min-width: 992px) and (max-width: 1199px) {
        /* 
        */
            .item_search {
            margin-top: 2rem; 
        }
        .item_container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr!important;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        .item_wrapper {
            /* background-color: var(--color-operation-type-donation); */
            /* background-color: red; */
            /* border-radius: 1rem; */
            padding: 1rem;
        }
        .item_wrapper div {
            /* width: 50% */

            /* background-color: var(--color-global-baackground_light); */
            /* border-radius: .5rem; */
            display: flex;  
            align-items: center; 
            justify-content: center; 
            gap: .5rem;
            height: 250px;
        }
        /* .item_wrapper div img {
            width: 100%;
        } */
    .item_wrapper h2 {
        margin-top: 1rem;
    }

        .item_wrapper p {
            margin-top: .5rem!important;
        }
    }
  @media screen and (min-width: 1200px) and (max-width: 1399px) {
      /* 
       */
        .item_search {
           margin-top: 2rem; 
       }
       .item_container {
          display: grid;
          grid-template-columns: repeat(3, 1fr)!important;
          gap: 2rem;
          margin-top: 3rem;
      }
        .item_wrapper {
            /* background-color: var(--color-operation-type-donation); */
            /* background-color: red; */
            /* border-radius: 1rem; */
            padding: 1rem;
            width: 100%;
        }
        .item_wrapper div {
            /* width: 50% */

            /* background-color: var(--color-global-baackground_light); */
            /* border-radius: .5rem; */
            display: flex;  
            align-items: center; 
            justify-content: center; 
            gap: .5rem;
            height: 250px;
        }
        /* .item_wrapper div img {
            width: 100%;
        } */

        .item_wrapper h2 {
            margin-top: 1rem;
        }

        .item_wrapper p {
            margin-top: .5rem!important;
        }
  }
  @media screen and (min-width: 1400px) {
      /* 
       */
        .item_search {
           margin-top: 2rem; 
       }
       .item_container {
          display: grid;
          grid-template-columns: repeat(4, 1fr)!important;
          gap: 2rem;
          margin-top: 3rem;
      }
        .item_wrapper {
            /* background-color: var(--color-operation-type-donation); */
            /* background-color: red; */
            /* border-radius: 1rem; */
            padding: 1rem;
            width: 320px;
        }
        .item_wrapper div {
            /* width: 50% */

            /* background-color: var(--color-global-baackground_light); */
            /* border-radius: .5rem; */
            display: flex;  
            align-items: center; 
            justify-content: center; 
            gap: .5rem;
            height: 250px;
        }
        /* .item_wrapper div img {
            width: 100%;
        } */

        .item_wrapper h2 {
            margin-top: 1rem;
        }

        .item_wrapper p {
            margin-top: .5rem!important;
        }
  }
</style>

<script lang="ts" setup>
    useHead({
        title: "Маркетплейс соучастников | Conspirators",
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
    const router = useRouter()

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

    const group = ref([
        {
            name: 'dev',
            color: colors.value.unit2
        },
        {
            name: 'design',
            color: colors.value.unit7
        },
        {
            name: 'design-marketplaces-card',
            color: colors.value.unit7
        },
        {
            name: 'offer',
            color: colors.value.unit3
        },
        {
            name: 'crm',
            color: colors.value.unit1
        }
    ])

    // trigger popup
    const popup_opened = ref(false)

    // shared
    import { Container } from '@/shared/container'
    import { Section } from '@/shared/section'
    import { InfoPopup } from '~/shared/popup';

    // components
    import { Button } from '@/components/button'
    import { BreadCrumbs } from '~/components/breadcrumbs';
    import { Search } from '~/components/search'


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

    // VARIABLES
    const searchInput = ref("");

    // ON MOUNTED
    onMounted(() => {
        // на всякий случай сбрасываем фиксацию прокрутки страницы при открытой модалке...
        let body = document.getElementsByTagName('body')[0]
        body.style.margin = 'unset'
        body.style.height = 'unset'
        body.style.overflow = 'unset'
        // Рисуем диаграмму
        setTimeout(() => {

            setStrokeDashArrayAndOffset()
        }, 160)
        // mouse actions on legend of unit
        const legendItems = document.querySelectorAll('.landing-list-el_wrapper')
        legendItems.forEach((el, index) => {

            const unitsList = document.querySelectorAll('.unit');
            
            el.addEventListener('mouseenter', (e) => {
                unitsList[index].classList.toggle('unit__hovered')
                legendItems[index].style.backgroundColor = 'var(--color-item-hover-bg)'
                legendItems[index].style.transition = 'background-color .3s'
            })
            el.addEventListener('mouseleave', (e) => {
                unitsList[index].classList.remove('unit__hovered');
                legendItems[index].style.backgroundColor = 'unset'
            })
        })
        const unitItems = document.querySelectorAll('.unit')
        unitItems.forEach((el, index) => {
            
            const unitsList = document.querySelectorAll('.unit');
            const legendItems = document.querySelectorAll('.landing-list-el_wrapper')
            
            el.addEventListener('mouseenter', (e) => {
                unitsList[index].classList.toggle('unit__hovered')
                legendItems[index].style.backgroundColor = 'var(--color-item-hover-bg)'
                legendItems[index].style.transition = 'background-color .3s'
            })
            el.addEventListener('mouseleave', (e) => {
                unitsList[index].classList.remove('unit__hovered');
                legendItems[index].style.backgroundColor = 'unset'
            })
        })
    })

    let body = document.querySelector('body')

    // BODY LISTENER CLICK
    body?.addEventListener('click', (e) => {
        // Убираем ховер на unit в диаграме (если нету класс unit + если попап не открыт)
        if(
            !e.target.classList?.contains('unit') && !e.target.parentNode.classList?.contains('popup_wrapper')
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
        // if(landing_list.value) {

            // type Obj = {
            //     id: Number,
            //     // leads: {}[]
            // }

            // let result: any = []

            // landing_list.value?.forEach(landing => {
                
            //     let leads = lead_list.value?.reduce((arr: {}[], lead) => {
            //         if(lead.landingId === landing.id) {
            //             arr.push({
            //                 lead_id: lead.id,
            //                 created_at: lead.created_at,
            //                 status: lead.status,
            //                 urgency: lead.urgency
            //                 // landing_id: lead.landingId
            //             })
            //         }

            //         return arr
            //     }, [])

            //     result.push({
            //         id: landing.id,
            //         name: landing.name,
            //         leads: leads,
            //         created_at: landing.created_at,
            //         update_at: landing.update_at
            //     })
            // });
            
            // console.log(result)


            // }
        if(searchInput.value === '') {
            return landing_list.value

        } else {
            return landing_list.value?.filter((item) =>
                item.title
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(searchInput.value.toLowerCase().replace(/\s+/g, ""))
                ||
                item.desc
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(searchInput.value.toLowerCase().replace(/\s+/g, ""))
            )
        //     console.log(searchInput.value)
        //     console.log(landing_list.value?.filter((item) => {
        //         return item ? item.name
        //   .toLowerCase()
        //   .replace(/\s+/g, "")
        //   .includes(searchInput.value.toLowerCase().replace(/\s+/g, "")) : []
        //     }))
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
    // const onClickEl = (el: any, index: number) => {

    //     if(!popup_opened.value) {
    //         popup_opened.value = true
    //     }

    //     const unitsList = document.querySelectorAll('.unit');
        

    //     if(unitsList) {

    //         if(unitsList[index].classList.contains('unit__hovered')) {
    //             unitsList[index].classList.remove('unit__hovered');
    //             choosenEl.value = null
    //         } else if(!unitsList[index].classList.contains('unit__hovered')){
    //             unitsList[index].classList.add('unit__hovered');
    //             choosenEl.value = el
    //         }
    //     }
    // }
    // colors.value
    const set_item_icons = (item_name: string) => {

        let icon_name_list = [
            // dev
            {
                group: 'dev',
                name: 'hugeicons:developer'
            },

            {
                group: 'dev',
                name: 'hugeicons:web-security'
            },
            {
                group: 'dev',
                name: 'hugeicons:game-controller-03'
            },
            // design
            {
                group: 'design',
                name: 'hugeicons:paint-board'
            },
            {
                group: 'design',
                name: 'hugeicons:paint-brush-01'
            },
            {
                group: 'design',
                name: 'hugeicons:paint-brush-02'
            }, 
            {
                group: 'design-marketplaces-card',
                name: 'hugeicons:paint-board'
            }, 
            {
                group: 'design-marketplaces-card',
                name: 'hugeicons:paint-brush-01'
            },
            {
                group: 'design-marketplaces-card',
                name: 'hugeicons:paint-brush-02'
            }, 
            // offer
            {
                group: 'offer',
                name: 'hugeicons:paragraph-bullets-point-02'
            },
            {
                group: 'offer',
                name: 'hugeicons:stop-watch'
            },
            {
                group: 'offer',
                name: 'hugeicons:start-up-01'
            },
            {
                group: 'crm',
                name: 'hugeicons:wallet-02'
            },
            {
                group: 'crm',
                name: 'hugeicons:microsoft'
            },
            {
                group: 'crm',
                name: 'hugeicons:chart-line-data-01'
            }
        ]

        return icon_name_list.filter(el => el.group === item_name.slice(8, item_name.length))
    }

    //= set_item_styles
    const set_item_styles = (subject: string, group_name: string) => {


        // console.log(group_name.slice(8, group_name.length))
        // console.log(group.value)

        let currnt_item = group.value.find(el => el.name === group_name.slice(8, group_name.length))

        if(currnt_item) {

            
                    if(subject === 'border') {
            
                        return `
                            border: 1px solid ${currnt_item.color};
                        `
                    } 
                    else if (subject === 'background') {
                        return `
                            background-color: ${currnt_item.color};
                        `
                    }
        }
    }

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
        return tempArray?.reverse()
    }
    // landing links
    const generateLandingLink = (name: string) => {
        return `/${name}`
    }
    // change direction of diagram section
    //= landing diagram section
    const setFlexDirection = () => {
        const screenWidth = window.screen.width
        if(screenWidth <= 767) {

            return `column`
        } else {
            return `row`
        }
    }

    // WATHERS
    // on search input
    const onInputFunc = (e: any) => {
        searchInput.value = e
    }

    // ******* DB
    // *** GET
    // landing
    const { data: landing_list } = useFetch("/api/landing/landing", {
        lazy: false,
        transform: (landing_list) => {
            return landing_list
            // .filter((el) => {
            //     // session user is a sharer
            //     if(el.sharers && el.sharers.find((item) => item.userType === 'user' && item.userId === props.auth_user_profile.userId)) {
            //         return el
            //     }
            // })
        }
    })

    // leads
    // const { data: lead_list } = useFetch("/api/leadGuarded/lead", {
    // lazy: false,
    // transform: (lead_list) => {
    //     return lead_list
    // }
    // })

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