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

            <div style="margin-top: 1rem;">

                <!-- specification-first content -->
                <div v-if="currentParagraphChip === 'specification-first'" class="specification-first-content_container">
                    <div class="table-contents_wrapper">
                        <ol>
                            <li>
                                <h4>Условия</h4>
                                <ol>
                                    <li>Стороны и контакты</li>
                                    <li>Предмет договора</li>
                                </ol>
                            </li>
                            <li>
                                <h4>ТЗ</h4>
                                <ol>
                                    <li>Продукт</li>
                                    <li>Площадки</li>
                                </ol>
                            </li>
                            <li>Подтверждение</li>
                        </ol>
                    </div>
                </div>

                <!--  -->
                <div v-if="currentParagraphChip === 'choose-pattern'" class="choose-pattern-content_container">
                    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ore nulla aut suscipit placeat? Deleniti, error. Rem nisi dolor soluta uaerat voluptatibus fuga? Eius, ipsum, ea, quidem provident commodi cupiditate beatae quos obcaecati repellendus ipsa dolores natus esse sed voluptas reprehenderit assumenda temporibus ad consequuntur velit repellat labore. Fugit ex officiis sed, quam numquam aliquid neque excepturi iure mollitia ut, quibusdam at dolores, repellat nemo!</p>

                    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ore nulla aut suscipit placeat? Deleniti, error. Rem nisi dolor soluta uaerat voluptatibus fuga? Eius, ipsum, ea, quidem provident commodi cupiditate beatae quos obcaecati repellendus ipsa dolores natus esse sed voluptas reprehenderit assumenda temporibus ad consequuntur velit repellat labore. Fugit ex officiis sed, quam numquam aliquid neque excepturi iure mollitia ut, quibusdam at dolores, repellat nemo!</p>

                    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ore nulla aut suscipit placeat? Deleniti, error. Rem nisi dolor soluta uaerat voluptatibus fuga? Eius, ipsum, ea, quidem provident commodi cupiditate beatae quos obcaecati repellendus ipsa dolores natus esse sed voluptas reprehenderit assumenda temporibus ad consequuntur velit repellat labore. Fugit ex officiis sed, quam numquam aliquid neque excepturi iure mollitia ut, quibusdam at dolores, repellat nemo!</p>

                </div>
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
            title: 'Выбрать шаблон'
        }
    ])
    //= currentParagraphChip
    const currentParagraphChip = ref('specification-first')
</script>

<style scoped>

/* ОБЩЕЕ */
/* CHIP FOR PARAGRAPH */
.chip_paragraph {
    display: flex;
    -ms-overflow-style: none;  /* IE and Edge */
    overflow: scroll; 
    scrollbar-width: none; 
    max-width: 90vw!important;
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
.table-contents_wrapper {
}
.table-contents_wrapper ol{
    counter-reset: item; 
}
.table-contents_wrapper li {
    display: block
}
.table-contents_wrapper li:before {
    content: counters(item, ".") ". "; counter-increment: item
}

@media screen and (max-width: 575px) {
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