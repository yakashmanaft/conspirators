<template>
    <!-- MAIN LIKE A BANNER -->
    <div class="main-banner_container" style="background-color: var(--color-btn-disabled-bg); border-top: 1px solid red;">

        <Container class="container-insside">

            <div class="main-banner_wrapper">
                <p>made on cnsprtrs  by <span>@kashmanaft</span></p>
                <h2>
                    <span>WILDBERRIES</span>
                    <span>OZON</span>
                    <span>Яндекс.Маркет</span>
                </h2>
                <h1>Карточки товаров для маркетплейсов</h1>
                <p>Или для вашего собственного web-ресурса</p>
        
                <ul>
                    <li>PS</li>
                    <li>AI</li>
                    <li>FIGMA</li>
                    <li>CorelDdraw</li>
                </ul>
        
                <button>С чего начать</button>
            </div>
        </Container>
    </div>

    <!-- QIZZZ -->
    <Container class="container-insside">


        <!-- QUIZZZ -->
         <!-- chip -->
            <div class="chip_paragraph" style="margin-top: 1rem;">
                <h3 
                    :class="currentParagraphChip === el.name ? 'paragraph-title_active' : ''" style="cursor: pointer;"
                    v-for="el in paragraphChipList">
                    <span @click="currentParagraphChip = el.name">{{ el.title }}</span>
                </h3>
            </div>

            <div style="margin-top: 1rem;" >

                <!-- specification-first content -->
                <div v-if="currentParagraphChip === 'specification-first'" class="specification-first-content_container">
                    <div v-if="current_specification_step === ''">
                        <p>Придумываем как преподнести для вас анкету</p> 
                    </div>
                    <div v-else class="table-contents_wrapper">

                        <!-- OL table contents -->
                        <ol class="ol-step_wrapper">
                            <li v-for="(group, idx) in [...new Set([...specification_step.map((obj: any) => {return obj.group})])]">
                                <h4>{{idx + 1}}. {{ group }}</h4>
                                <ol>
                                    <li v-for="(step, index) in specification_step.filter(el => el.group === group)" @click="current_specification_step = step.name">
                                        <label 
                                            :class="step.name === current_specification_step ? 'checked_input' : ''"
                                            :for="`${group}_${index}`"
                                        >
                                            {{ idx + 1 }}. {{ index + 1 }}. {{ step.name }}
                                        </label>
                                        <input 
                                            type="radio" 
                                            :id="`${group}_${index}`" v-model="current_specification_step"
                                            :checked="step.name === current_specification_step"
                                        >
                                    </li>
                                </ol>
                            </li>
                        </ol>

                        <!-- show details of table content -->
                        <div class="ol_content">
                            <form action="">
                                {{ current_specification_step }}
                                <br>
                                <label for="">Заказчик</label>
                                <input type="text" placeholder="Как к вам обращаться">
                            </form>
                        </div>
                    </div>
                </div>

                <!-- choose-pattern content -->
                <div v-if="currentParagraphChip === 'choose-pattern'" class="choose-pattern-content_container">
                    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ore nulla aut suscipit placeat? Deleniti, error. Rem nisi dolor soluta uaerat voluptatibus fuga? Eius, ipsum, ea, quidem provident commodi cupiditate beatae quos obcaecati repellendus ipsa dolores natus esse sed voluptas reprehenderit assumenda temporibus ad consequuntur velit repellat labore. Fugit ex officiis sed, quam numquam aliquid neque excepturi iure mollitia ut, quibusdam at dolores, repellat nemo!</p>

                    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ore nulla aut suscipit placeat? Deleniti, error. Rem nisi dolor soluta uaerat voluptatibus fuga? Eius, ipsum, ea, quidem provident commodi cupiditate beatae quos obcaecati repellendus ipsa dolores natus esse sed voluptas reprehenderit assumenda temporibus ad consequuntur velit repellat labore. Fugit ex officiis sed, quam numquam aliquid neque excepturi iure mollitia ut, quibusdam at dolores, repellat nemo!</p>

                    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ore nulla aut suscipit placeat? Deleniti, error. Rem nisi dolor soluta uaerat voluptatibus fuga? Eius, ipsum, ea, quidem provident commodi cupiditate beatae quos obcaecati repellendus ipsa dolores natus esse sed voluptas reprehenderit assumenda temporibus ad consequuntur velit repellat labore. Fugit ex officiis sed, quam numquam aliquid neque excepturi iure mollitia ut, quibusdam at dolores, repellat nemo!</p>

                </div>
            </div>

            {{ form_obj }}
        
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

<script lang="ts" setup>
    useHead({
        title: "Рисуем карточки товаров для маркетплейсов: OZON, WILDBERRIES, Яндекс. Маркет",
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

    // shared
    import { Container } from '@/shared/container'

    // components
    // import { Button } from '@/components/button';

    // CONST
    //
    //= paragraphChipList
    const paragraphChipList = ref([
        {
            name: 'specification-first', 
            title: 'Начнем с ТЗ'
        },
        {
            name: 'choose-pattern', 
            title: 'Купить шаблон'
        }
    ])
    //= currentParagraphChip
    const currentParagraphChip = ref('specification-first')
    //= content by paragraph
    const specification_step = ref([
        {
            group: 'Условия',
            name: 'Предмет договора'
        },
        {
            group: 'Условия',
            name: 'Оплата'
        },
        {
            group: 'Условия',
            name: 'Стороны и контакты'
        },
        {
            group: 'ТЗ',
            name: 'Продукт'
        },
        {
            group: 'ТЗ',
            name: 'Площадки'
        },
        {
            group: 'ТЗ',
            name: 'Артикул и прочие пометки'
        },
        {
            group: 'ТЗ',
            name: 'Описание и характеристики'
        },
        {
            group: 'ТЗ',
            name: 'Что вас привлекает'
        },
        {
            group: 'ТЗ',
            name: 'Фото и другие исходники'
        },
        {
            group: 'Итого',
            name: 'Завершаем постановку задачи'
        }
    ])
    //= specification_step
    const current_specification_step = ref(specification_step?.value ? specification_step.value[0].name : '')
    //= form_obj
    const form_obj = ref({
        customer_id: null,
        customer_name: 'noname',
        executor_id: 6,
        executor: 'noname'
    })
</script>

<style scoped>

/* ОБЩЕЕ */
/* CHIP FOR PARAGRAPH */
.chip_paragraph {
    display: flex;
    -ms-overflow-style: none;  /* IE and Edge */
    overflow: scroll; 
    scrollbar-width: none; 
    max-width: 99vw!important;
    gap: 1rem;
    padding-bottom: .5rem;
    border-bottom: 1px solid var(--color-btn-disabled-bg);
}
.chip_paragraph::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
    width: 0;
    height: 0;
}
.chip_paragraph h3 {
    font-size: 1rem;
    font-weight: normal;
    position: relative;
} 
.chip_paragraph h3 span {
    text-wrap: nowrap;
}
.paragraph-title_active:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-wallet-fund-available-wo)
}
.paragraph-title_active span {
    color: var(--color-wallet-fund-available-wo);
}

/* specification-first sf */
/* .table-contents_wrapper {
}

    */
/* .table-contents_wrapper li {
    position: relative;
    display: block;
    padding-left: 1rem;
    margin-top: .5rem;
} */
/* .table-contents_wrapper li:before {
    content: counters(item, ".") ". "; counter-increment: item;
    position: absolute;
    top: 0;
    left: -1rem;
} */
.table-contents_wrapper ol{
    list-style: none;
    padding: 0;
} 

@media screen and (max-width: 575px) {
    .chip_paragraph {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .container-insside {
        margin-top: 0!important;
        margin-bottom: 0!important;
        padding-top: 0!important;
    }
    /* MAIN BANNER */
    .main-banner_container {
        padding-top: 5rem;
        padding-bottom: 1rem;
    }
    .main-banner_wrapper {
        background-color: cyan;
    }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
    .chip_paragraph {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .container-insside {
        margin-top: 0!important;
        margin-bottom: 0!important;
        padding-top: 0!important;
    }
    /* MAIN BANNER */
    .main-banner_container {
        padding-top: 5rem;
        padding-bottom: 1rem;
    }
    .main-banner_wrapper {
        background-color: cyan;
    }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
    .container-insside {
        margin-top: 0!important;
        margin-bottom: 0!important;
    }

    /* MAIN BANNER */
    .main-banner_container {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    .main-banner_wrapper {
        margin-top: 4.5rem;
        background-color: cyan;
    }

    /* specification-first-content_container */
    .specification-first-content_container {

    }
    /* choose-pattern-content_container */
    .choose-pattern-content_container {

    }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
    .container-insside {
        margin-top: 0!important;
        margin-bottom: 0!important;
    }

    /* MAIN BANNER */
    .main-banner_container {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    .main-banner_wrapper {
        margin-top: 4.5rem;
        background-color: cyan;
    }
    /* 
        TABLE CONTENTS
    */
    .table-contents_wrapper{
        display: flex;
    }
    .ol_content {
        background-color: var(--color-btn-disabled-bg);
        width: 100%;
    }
    .ol-step_wrapper {

    }
    .ol-step_wrapper li {

    }
    .ol-step_wrapper li h4 {

    }
    .ol-step_wrapper li ol {

    }
    .ol-step_wrapper li ol li {

    }
    .ol-step_wrapper > li > ol > li > label {
        transition: all .2s ease-in-out;
    }
    .ol-step_wrapper > li > ol > li > label:hover {
        background-color: var(--color-urgency-low-wo);
        cursor: pointer;
    }
    /* .ol-step_wrapper > li > ol > li > input:checked + .ol-step_wrapper > li > ol > li > label{
        background-color: red!important;
    } */
    .checked_input {
        font-weight: bold;
        background-color: var(--color-urgency-low-wo);
    }
    .ol-step_wrapper li ol li input {
        display: none;
    }
}
@media screen and (min-width: 1200px) {
    .container-insside {
        margin-top: 0!important;
        margin-bottom: 0!important;
    }
    /* MAIN BANNER */
    .main-banner_container {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    .main-banner_wrapper {
        margin-top: 4.5rem;
        background-color: cyan;
    }
}
</style>