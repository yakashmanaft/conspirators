<template>
    <Container>

        <h1>Мои огород</h1>

        <p>{{ props?.auth_user_profile }}</p>

        <div class="diagram-wrapper">

            <!-- Canvas -->
            <!-- DIAGRAM (LEFT SIDE) -->
            <div class="canvas">
                <!-- chart -->
                <svg class="chart" viewBox="0 0 60 40">
                    <circle v-for="(el, index) in computed_landing_list" :key="el.id" class="unit" r="15.9" cx="50%" cy="50%" @click="onClickEl(el, index)">
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
            <div>
                <!-- SHOW ALL -->
                <div v-if="!choosenEl">
                    <div v-for="(el, index) in computed_landing_list" style="margin-bottom: 1rem; border: 1px solid gray;" @click="onClickDescItem(el, index)">
                        <Button type="pseudo-btn" :link="`/${el.name}`">{{ el.name }}</Button> 
                        <p style="margin: 0;">landing_id: {{ el.id }}</p>
                        <p style="margin: 0;">leads({{ el.leads.length }})</p>
                        <p style="margin: 0;">created_at: {{ el.created_at }}</p>
                    </div>
                </div>
                <!-- SHOW CURRENT -->
                <div v-else style="border: 1px solid gray;">
                    <div @click="choosenEl = null">К списку</div>
                    <Button type="pseudo-btn" :link="`/${choosenEl.name}`">{{ choosenEl.name }}</Button>
                    <p style="margin: 0;">landing_id: {{ choosenEl.id }}</p>
                    <p style="margin: 0;">leads({{ choosenEl.leads.length }})</p>
                    <p style="margin: 0;">created_at: {{ choosenEl.created_at }}</p>

                    <div>
                        <p>update_at: {{ choosenEl.update_at }}</p>
                        <p>{{  choosenEl.sharers  }}</p>
                        <p>{{ choosenEl.leads }}</p>
                    </div>
                </div>

                <!-- IMITATION -->
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis blanditiis fugit suscipit maxime aut quidem sapiente ratione repellendus unde sed labore illum, non repellat expedita incidunt doloribus officia voluptatem odit et doloremque quibusdam sit ea. Odio cum asperiores optio minima at molestiae eum itaque atque, culpa, id porro? At voluptatum ab quibusdam culpa fugiat maiores. Odio quis rem optio iste vel dolor suscipit alias qui perferendis asperiores, perspiciatis ea nisi commodi consectetur neque mollitia sequi quaerat id animi cum nesciunt? Molestiae, omnis obcaecati. Iste suscipit fuga nihil, doloremque ut recusandae ipsam expedita a exercitationem enim vero at voluptatem soluta quae magni atque reiciendis, ullam deleniti quo iusto? Sunt blanditiis animi sapiente vitae rerum odit atque ullam eius, labore voluptatem delectus! Repellendus, distinctio, mollitia, nobis laborum saepe enim asperiores est facere ex vero minus deserunt vitae quae sunt explicabo officia optio recusandae iusto quisquam? Earum doloremque reiciendis quasi, porro velit ipsam officia rerum laudantium omnis voluptates consequuntur numquam enim possimus laborum ab molestias? Architecto obcaecati aliquid aut non aperiam ipsum ullam laboriosam alias minima a hic cumque incidunt ipsa sit, accusamus nobis asperiores numquam aspernatur corporis fugit est? Laboriosam tenetur blanditiis ad! Facilis voluptate, eligendi consequuntur similique in voluptates unde illo soluta debitis cum aut adipisci numquam! Et expedita eligendi, sunt amet temporibus, rerum molestias ea laborum saepe, magnam porro? Aliquam in dolor deserunt aliquid illum, iure natus! Adipisci, eos odio magnam quibusdam corrupti illo cumque. Porro, totam. Pariatur architecto sequi atque, dicta beatae, at minus vel ad possimus veritatis ex? Ad odio id perferendis dolor! Consequuntur quidem dicta ab tenetur, illum aut. Natus doloribus non, voluptatibus voluptatem quia similique praesentium tempora voluptatum, eveniet delectus corporis neque velit possimus. Deserunt quaerat perspiciatis iure nulla natus, illo velit doloribus quia possimus quam, repudiandae libero? Porro perferendis error, vel delectus veniam quibusdam natus dolores commodi repellat quaerat deserunt tempore quisquam, soluta ut, facere exercitationem officia et tempora consequuntur nam. Adipisci similique quidem totam nihil magnam nulla cum autem libero nobis laboriosam, impedit commodi alias quae consectetur placeat maiores cumque! Commodi laboriosam facere mollitia. Autem necessitatibus, voluptatem molestias quae enim totam alias delectus, labore, minus esse ipsa recusandae nesciunt harum saepe vel facere? Ipsum, accusamus ex. Suscipit commodi perferendis veritatis beatae eum accusamus est magni vel provident odio? Fuga itaque voluptatem hic. Molestias perspiciatis ullam optio debitis nostrum natus aliquid molestiae! Ratione excepturi hic voluptatibus iusto velit quisquam nobis aliquam sint totam odio perspiciatis officia voluptate ab rem animi dolores tenetur omnis impedit, dicta quibusdam sapiente fuga aliquid harum. Laborum ratione iste commodi blanditiis corporis officiis, quae corrupti impedit, minus debitis sed. Architecto, culpa amet quae pariatur esse eius quasi doloribus provident ea placeat quod dolor deleniti quidem delectus rerum nobis omnis qui, illo ab, minima facere a et. Quidem incidunt reprehenderit quis excepturi voluptatum animi consequatur accusantium reiciendis possimus suscipit sunt aut cumque distinctio eaque eligendi, exercitationem omnis veritatis similique officiis iusto nobis tempora voluptate odit corrupti. Nihil possimus laudantium molestias voluptatibus nemo nobis, corrupti, quidem laborum error voluptates alias enim consequuntur vero. Repellat fugiat in ratione doloremque maxime molestias minima. Asperiores, quibusdam fugit quod, id autem, odit atque ea repellat excepturi repellendus minus pariatur! Ad minus cupiditate culpa. Facere aliquid labore a officia nihil voluptatum rem, harum ipsam necessitatibus quasi sit! Dolores saepe error enim quia natus illo veniam hic porro perspiciatis vero adipisci iusto ab aliquid asperiores possimus, quae sint, minus dolore a id voluptatibus provident neque dignissimos harum. Hic, iusto. Quaerat doloribus iste quae illo, natus molestias porro sunt quidem excepturi eius nihil ea, omnis illum sequi non animi, aspernatur qui voluptate nesciunt facere? Magnam esse placeat repellendus. Eligendi, esse dolorum voluptatem totam neque, obcaecati odit laboriosam error cupiditate tempora cumque, vero consequatur. Eligendi labore recusandae excepturi laudantium qui commodi reprehenderit perferendis voluptatem soluta, accusantium ducimus delectus quasi unde, officia neque voluptas odio deserunt, ex repellendus voluptatibus officiis quos. Porro, tempore labore earum unde, laborum accusantium praesentium quae reiciendis omnis molestiae ea suscipit? Esse odio nulla facilis. Voluptas est magni eveniet alias optio consequatur voluptatum deleniti a, ab numquam, necessitatibus minima quasi sunt vitae voluptatem aspernatur, assumenda eius. Enim dolor, consequatur earum tempore numquam animi sunt error vel recusandae, dolorum quod ex iste, ea unde et magnam nulla laborum? Dolore ullam, reiciendis tempora inventore ut a voluptatum aspernatur nulla officiis maxime eius. Atque beatae ut est vitae! Aliquam velit, ut eveniet quam sint doloremque vitae! Modi animi reiciendis in quaerat facere architecto nihil sit obcaecati neque dolor saepe distinctio ea veritatis magni eos dignissimos ab soluta ipsam eaque numquam ipsa, tempora quia pariatur nesciunt. Veritatis suscipit facere recusandae sint ratione incidunt necessitatibus repellat cumque in? Qui pariatur iste natus ab iusto repudiandae consequatur et, voluptate obcaecati delectus voluptatum, dignissimos mollitia dolorem eveniet eum labore veritatis laudantium in unde maiores eligendi suscipit vel recusandae sequi? Molestiae aut perferendis totam facilis vel minus minima. Atque, consequatur ad unde voluptas dolor eaque tempora ut velit corporis sequi hic tempore. Perspiciatis distinctio ratione assumenda ut repudiandae quia dolore. Ut obcaecati ullam tempora esse amet iure dolorum placeat sequi explicabo eius quibusdam fuga error sit doloribus ipsum accusantium suscipit reprehenderit ducimus temporibus, enim minima voluptatum tenetur facere dolores? Voluptas quos, voluptatum commodi beatae quisquam quo aperiam, fuga optio ab cum, sapiente eveniet repellendus soluta! Ipsam hic vel accusamus rerum nesciunt asperiores dolores ad pariatur ipsa, iste eum, est sit tenetur id error libero dolorem earum repudiandae! At harum hic tenetur minus facere sunt expedita veniam asperiores saepe nisi cumque nam consequatur, reprehenderit ducimus, architecto quas repudiandae suscipit qui consectetur! Accusantium veniam sint quasi possimus aut dicta minima delectus iusto repudiandae, doloremque amet at soluta pariatur voluptatibus iste similique optio fugit odio autem nostrum quas magni exercitationem sapiente. Repellendus iusto reprehenderit facere inventore suscipit ab eum blanditiis odit autem sint modi dignissimos, dolorum pariatur ipsum minima vitae doloremque maiores commodi quibusdam. Repudiandae architecto dolor nisi doloremque aperiam magni in? Sunt iure minus vitae culpa ut corrupti unde, at laboriosam hic fugit aspernatur tenetur rem porro recusandae, ullam ratione dignissimos architecto, eligendi corporis doloremque explicabo? Doloribus, minus.</p>
            </div>
        </div>

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
    /* padding: 1rem 0; */
    /* height: 100vh; */
}

/*  */
.diagram-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    left: 0; */
    /* width: 100vw; */
  }
.canvas {
    /* position: relative; */
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
    /* max-width: 100%; */
    /* width: 100vw; */
    /* overflow: hidden; */
    /* margin-top: 1rem; */
  }

  .svg .chart {
    /* position: relative; */
  }
  .caption {
    /* position: absolute; */
    /* top: 0; */
    /* transform: translateY(-50%); */
  }
  .caption_content {
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
  }
  .unit {
    fill: none;
    stroke-width: 5;
    transition: all 0.5s ease;
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

    // VARIABLES
    // const sumQtyLandingLeads

    // ON MOUNTED
    onMounted(() => {

        // Рисуем диаграмму
        setStrokeDashArrayAndOffset()
    })

    let body = document.querySelector('body')

    // BODY LISTENER CLICK
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
                            created_at: lead.created_at
                            // landing_id: lead.landingId
                        })
                    }

                    return arr
                }, [])

                result.push({
                    id: landing.id,
                    name: landing.name,
                    sharers: landing.sharers,
                    leads: leads,
                    created_at: landing.created_at,
                    update_at: landing.update_at
                })
            });
            
            console.log(result)
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

    // ******* ACTIONS ON PAGE
    // onClick diagram by unit
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

    // onClick in desc section item 
    const onClickDescItem = (el: any, index: number) => {
        choosenEl.value = el
        console.log(choosenEl.value)

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

     watch(landing_list, () => {
        setStrokeDashArrayAndOffset()
     })

    
</script>