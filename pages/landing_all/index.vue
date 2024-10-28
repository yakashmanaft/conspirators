<template>
    <Container>

        <h1>Мои огород</h1>

        <p>{{ props?.auth_user_profile }}</p>

        <div class="diagram-wrapper">

            <!-- Canvas -->
            <div class="canvas">
                <!-- chart -->
                <svg class="chart" viewBox="0 0 100 100">
                    <circle v-for="(el, index) in landing_list" :key="el.id" class="unit" r="15.9" cx="50%" cy="50%" @click="onClickEl(el, index)">
                        {{ el }}
                    </circle>
                </svg>
                <!-- legend -->
                <div class="legend">
                    <div class="legend_contant" v-if="choosenEl">
                        <div >{{ choosenEl.name }}</div>
                        <!-- <div>{{ choosenEl.status }}</div> -->
                    </div>
                    <div class="legend_contant" v-else>
                        <div>Все</div>
                        <!-- <div>Места</div> -->
                    </div>
                </div>
            </div>

            <!-- Legend -->
            <div style="width: 100%;">
                <div v-if="!choosenEl">
                    <div v-for="el in landing_list">
                        <Button type="pseudo-btn" :link="`/${el.name}`">{{ el.name }}</Button>

                        <div>
                            <p>created_at: {{ el.created_at }}</p>
                            <!-- <p>{{ el }}</p> -->
                        </div>
                    </div>
                </div>
                <div v-else>
                    <Button type="pseudo-btn" :link="`/${choosenEl.name}`">{{ choosenEl.name }}</Button>
                    
                    <div>
                        <p>created_at: {{ choosenEl.created_at }}</p>
                        <!-- <p>{{choosenEl}}</p> -->
                    </div>
                </div>
            </div>
        </div>

<!--
        <div class="landing_container">

            <div v-for="page in landing_list" class="landing_wrapper">
                <Button type="pseudo-btn" :link="`/landing_${page.name}`">{{ page.name }}</Button>
                
                <div>{{ page }}</div>
            </div>
        </div> -->

        <h2>type: вид лида (возможно отдельный леджер)</h2>

        <pre>
        {
            created_at: string,
            from: number  (id of landing in db Landing)
            name: string (имя или как обращаться)
            content: Json (вопрос - ответ)
            contact: string (ссылка, значение, номер мобилки)
            contactType: string (тип контакта (телега, телефон, другое))
        }
        </pre>

        <p>https://qna.habr.com/q/1163286</p>

    </Container>
</template>

<style scoped>
.landing_container {
    /* ... */
}
.landing_wrapper {
    background-color: var(--color-btn-disabled-bg);
    border-bottom: 1px solid var(--color-global-text); 
    display: flex; 
    align-items: flex-start; 
    justify-content: space-between;
    gap: 1rem; 
    padding: 1rem 0;
    height: 100vh;
}

/*  */
.diagram-wrapper {
    display: flex;
    /* position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    left: 0; */
    width: 100%;
  }
.canvas {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    width: 100vw;
    /* overflow: hidden; */
    margin-top: 1rem;
  }

  .svg .chart {
    /* position: relative; */
  }
  .legend {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .legend_contant {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .unit {
    width: 300px;
    fill: none;
    stroke-width: 5;
    transition: all 0.5s ease;
  }
  .unit:nth-child(1) {
    /* stroke: #86cfa3; */
    /* stroke: v-bind('colors.unit1'); */
    stroke: v-bind('colors.unit1');
    /* stroke-dasharray: 30 100; */
    /* stroke-dashoffset: 0!important; */
  }
  .unit:nth-child(2) {
    stroke: v-bind('colors.unit2');
      /* stroke-dasharray: 22 100;  */
      /* stroke-dashoffset: -14; */
  }
  .unit:nth-child(3) {
      /* stroke: #ffc7ec; */
      stroke: v-bind('colors.unit3');
      /* stroke-dasharray: 25 100; */
      /* stroke-dashoffset: -30; */
  }
  .unit:nth-child(4) {
      /* stroke: #f8faa0; */
      stroke: v-bind('colors.unit4');
      /* stroke-dasharray: 14 100; */
      /* stroke-dashoffset: -48; */
  }
  .unit:nth-child(5) {
      /* stroke: #adffd8; */
      stroke: v-bind('colors.unit5');
      /* stroke-dasharray: 20 100; */
      /* stroke-dashoffset: -81;    */
  }
  .unit:nth-child(6) {
      /* stroke: #f2c48f; */
      stroke: v-bind('colors.unit6');
      /* stroke-dasharray: 5 100; */
      /* stroke-dashoffset: -55 */
  }
  .unit:nth-child(7) {
      /* stroke: #e3bfe2; */
      stroke: v-bind('colors.unit7');
      /* stroke-dasharray: 30 100; */
      /* stroke-dashoffset: -60; */
  }
  .unit:nth-child(8) {
      /* stroke: #6f75ad; */
      stroke: v-bind('colors.unit8');
      /* stroke-dasharray: 10 100; */
      /* stroke-dashoffset: -60; */
  }
  .unit__hovered {
    stroke-width: 8;
  }
  /* .caption-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .caption-item {
    position: absolute;
    z-index: 999999;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    padding: 2rem;
  }
  .caption-item_title {
    font-weight: bold;
  }
  .caption-item_value {
    margin-top: 10px;
    font-size: 16px;
  } */

  /* .visible {
    display: block!important;
  }  */
</style>

<script lang="ts" setup>
    useHead({
        title: "landing all",
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

    // shared
    import { Container } from '@/shared/container'

    // components
    import { Button } from '@/components/button'

    // PROPS
    const props = defineProps({
        auth_user_profile: {
            type: Object,
            default: {}
        },
    })

    // ON MOUNTED
    onMounted(() => {

        setStrokeDashArrayAndOffset()
    })

    let body = document.querySelector('body')

    body?.addEventListener('click', (e) => {

        // Убираем ховер на unit в диаграме
        if(!e.target.classList.contains('unit')) {
            const unitsList = document.querySelectorAll('.unit');
            for(let i = 0; i <= unitsList.length; i++) {
                choosenEl.value = null
                if(unitsList[i] && unitsList[i].classList.contains('unit__hovered')) {
                    unitsList[i].classList.remove('unit__hovered');
                }
            }
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

                for(let i = 0; i <= landing_list.value?.length; i++) {

                    if(landing_list.value?.[i]) {
                        let ratio = 1 / landing_list.value?.length * 100;
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

    // ******* ACTIONS ON PAGE

    const onClickEl = (el: any, index: number) => {
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

     watch(landing_list, () => {
        setStrokeDashArrayAndOffset()
     })

    
</script>