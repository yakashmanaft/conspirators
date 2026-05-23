<template>


    <!-- Content of the page -->
    <Container>

        <div style="margin-bottom: 0.5rem;">
            <BreadCrumbs class="show-max-767"/>
            <h1 style="font-weight: bold; font-size: 42px;">Каталог</h1>
            <p></p> 
        </div>

        <!-- computed_landing_list lENGTH TRUE -->
        <h2>Услуги</h2>
        <!-- SEARCH ITEM -->
        <div class="item_search">
            <Search 
                @searchInputChanged="onInputFunc"
                type="primary"    
            />
        </div>

        <!-- ITEM GRID -->
        <div class="item_container">

            <div class="item_search_wrong" style="margin-bottom: 20.5rem" v-if="searchInput && !computed_landing_list?.length">
                По запросу ничего не найдено
            </div>
            <div class="item_wrapper" v-for="item in computed_landing_list" @click.stop="$router.push(`/${item?.name}`)" :style="set_item_styles('border', item.name)">
                <div :style="set_item_styles('background', item.name)">

                    <Icon 
                        v-for="icon in set_item_icons(item.name)"
                        style="padding: 0; box-shadow: var(--hover-shadow); padding: .5rem;" 
                        size="42px"
                        :name="icon.name"
                        color="var(--color-global-baackground_light)"
                    />
                </div>
                <h3>{{ item.title }}</h3>
                <p style="margin: 0;">{{ item.desc }}</p>
            </div>

            <!-- ELSEs -->
            <div class="no-landing_wrapper" style="margin-bottom: 20.5rem" v-if="searchInput === '' && !computed_landing_list?.length">В магазине пусто</div>
        </div>

        <h2>Товары</h2>
        <div style="background-color: red;">
            <img 
                :src="fullImageUrl" 
                alt=""
                class="displayed-image"
            />
        </div>
        <img src="https://s1251sas.storage.yandex.net/rdisk/" alt="">
        <!-- FILTER ITEM -->
        <div 
            ref="elementRef" 
            :class="{ 'highlighted': isFixed }"
            class="product-item_filter"
            id="product_item_features"
        >
            <div class="product-item_search-wrapper">
                <!-- SEARCH ITEM -->
                <Search 
                    style="margin-top: 1rem;" 
                    @searchInputChanged="onInputSearchProductFunc"
                    type="active_btn"
                />
            </div>
            <div class="product-item_filters-wrapper">
                
                <!-- ФИЛЬТР по тегам -->
                <div class="filter_container">
                    <!-- ТОМ -->
                    <div class="filter-wrapper">
    
                        <!-- КНОПКА открывет модалку и показывает текущий ввыбранный -->
                        <label for="filter-by-item-category">
                            <span @click.stop="popup_volume_opened = !popup_volume_opened; current_filter_group = 'Том'">{{ current_volume }}</span>
                            <Icon name="material-symbols-light:arrow-back-rounded" size="25px" color="var(--color-global-text)"/>
                        </label>
    
                        <!-- MODAL POPUP -->
                        <DefaultPopup
                            v-if="popup_volume_opened"
                            id="popup_book"
                            popup_title="Тома, которые мы развиваем"
                            @emitClosePopup="close_volume_popup"
                        >
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: 1rem;">
                                    <input :checked="current_volume === 'Все тома'" type="radio" id="volume-0">
                                    <label style="margin-left: .5rem;" @click="current_volume = 'Все тома'; popup_volume_opened = !popup_volume_opened" for="volume-0">
                                        <span>Все тома</span>
                                    </label>
                                </li>
                                <li  style="margin-top: 1rem;"v-for="(el, index) in computed_filter_pocket">
                                    <input :checked="el === current_volume" type="radio" :id="`volume-${index + 1}`">
                                    <label style="margin-left: .5rem;" @click="current_volume = el.toString(); popup_volume_opened = !popup_volume_opened" :for="`volume-${index}`">
                                        <span>{{ el }}</span>
                                    </label>
                                </li>
                            </ul>
                        </DefaultPopup>
    
                    </div>
                    <!-- КНИГА -->
                    <div class="filter-wrapper">
                        <!-- КНОПКА открывет модалку и показывает текущий ввыбранный -->
                        <label 
                            for="filter-by-item-category"
                        >
                            <span @click.stop="popup_book_opened = !popup_book_opened; current_filter_group = 'Книга'">{{current_book}}</span>
                            <Icon name="material-symbols-light:arrow-back-rounded" size="25px" color="var(--color-global-text)"/>
                        </label>
    
                        <!-- MODAL POPUP -->
                        <DefaultPopup
                            v-if="popup_book_opened"
                            id="popup_book"
                            popup_title="Книги, которые мы пишем"
                            @emitClosePopup="close_book_popup"
                        >
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: 1rem;">
                                    <input :checked="current_book === 'Все книги'" type="radio" id="book-0">
                                    <label style="margin-left: .5rem;" @click="current_book = 'Все книги'; popup_book_opened = !popup_book_opened" for="book-0">
                                        <span>Все книги</span>
                                    </label>
                                </li>
                                <li style="margin-top: 1rem;" v-for="el in computed_filter_pocket">
                                    <input :checked="el === current_book" type="radio" :id="`book-${0 + 1}`">
                                    <label style="margin-left: .5rem;" @click="current_book = el.toString(); popup_book_opened = !popup_book_opened" :for="`book-${0 + 1}`">
                                        <span>{{ el }}</span>
                                    </label>
                                </li>
                            </ul>
                        </DefaultPopup>
                    </div>
                    <!-- ЧАСТЬ -->
                    <div class="filter-wrapper">
                        <!-- КНОПКА открывет модалку и показывает текущий ввыбранный -->
                        <label for="filter-by-item-category">
                            <span @click.stop="popup_part_opened = !popup_part_opened; current_filter_group = 'Часть'">{{current_part}}</span>
                            <Icon name="material-symbols-light:arrow-back-rounded" size="25px" color="var(--color-global-text)"/>
                        </label>
    
                        <!-- MODAL POPUP -->
                         <DefaultPopup
                            v-if="popup_part_opened"
                            id="popup_part"
                            popup_title="Часть книги - одно целое"
                            @emitClosePopup="close_part_popup"
                         >
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: 1rem;">
                                    <input :checked="current_part === 'Все части'" type="radio" id="part-0">
                                    <label style="margin-left: .5rem;" @click="current_part = 'Все части'; popup_part_opened = !popup_part_opened" for="part-0">
                                        <span>Все книги</span>
                                    </label>
                                </li>
                                <li style="margin-top: 1rem;" v-for="el in computed_filter_pocket">
                                    <input :checked="el === current_part" type="radio" :id="`part-${0 + 1}`">
                                    <label style="margin-left: .5rem;" @click="current_part = el.toString(); popup_part_opened = !popup_part_opened" :for="`part-${0 + 1}`">
                                        <span>{{ el }}</span>
                                    </label>
                                </li>
                            </ul>
                         </DefaultPopup>
                    </div>
                    <!-- ГЛАВА -->
                    <div class="filter-wrapper">
                        <!-- КНОПКА открывет модалку и показывает текущий ввыбранный -->
                        <label 
                            for="filter-by-item-category"
                        >
                            <span @click.stop="popup_chapter_opened = !popup_chapter_opened; current_filter_group = 'Глава'">{{current_chapter}}</span>
                            <Icon name="material-symbols-light:arrow-back-rounded" size="25px" color="var(--color-global-text)"/>
                        </label>
    
                        <!-- MODAL POPUP -->
                        <DefaultPopup
                            v-if="popup_chapter_opened"
                            id="popup_chapter"
                            popup_title="Главы, которые украшают"
                            @emitClosePopup="close_chapter_popup"
                        >
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: 1rem;">
                                    <input :checked="current_chapter === 'Все главы'" type="radio" id="chapter-0">
                                    <label style="margin-left: .5rem;" @click="current_chapter = 'Все книги'; popup_chapter_opened = !popup_chapter_opened" for="chapter-0">
                                        <span>Все главы</span>
                                    </label>
                                </li>
                                <li style="margin-top: 1rem;" v-for="el in computed_filter_pocket">
                                    <input :checked="el === current_chapter" type="radio" :id="`chapter-${0 + 1}`">
                                    <label style="margin-left: .5rem;" @click="current_chapter = el.toString(); popup_chapter_opened = !popup_chapter_opened" :for="`chapter-${0 + 1}`">
                                        <span>{{ el }}</span>
                                    </label>
                                </li>
                            </ul>
                        </DefaultPopup>
                    </div>
                    <!-- ПАРАГРАФ -->
                    <div class="filter-wrapper">
                        <!-- КНОПКА открывет модалку и показывает текущий ввыбранный -->
                        <label 
                            for="filter-by-item-category"
                        >
                            <span @click.stop="popup_paragraph_opened = !popup_paragraph_opened; current_filter_group = 'Параграф'">{{current_paragraph}}</span>
                            <Icon name="material-symbols-light:arrow-back-rounded" size="25px" color="var(--color-global-text)"/>
                        </label>
    
                        <!-- MODAL POPUP -->
                        <DefaultPopup
                            v-if="popup_paragraph_opened"
                            id="popup_paragraph"
                            popup_title="Параграфы - это уже детали"
                            @emitClosePopup="close_paragraph_popup"
                        >
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-top: 1rem;">
                                    <input :checked="current_paragraph === 'Все параграфы'" type="radio" id="paragraph-0">
                                    <label style="margin-left: .5rem;" @click="current_paragraph = 'Все параграфы'; popup_paragraph_opened = !popup_paragraph_opened" for="paragraph-0">
                                        <span>Все параграфы</span>
                                    </label>
                                </li>
                                <li style="margin-top: 1rem;" v-for="el in computed_filter_pocket">
                                    <input :checked="el === current_paragraph" type="radio" :id="`paragraph-${0 + 1}`">
                                    <label style="margin-left: .5rem;" @click="current_paragraph = el.toString(); popup_paragraph_opened = !popup_paragraph_opened" :for="`paragraph-${0 + 1}`">
                                        <span>{{ el }}</span>
                                    </label>
                                </li>
                            </ul>
                        </DefaultPopup>
                    </div>
                </div>
    
                <!-- ФИЛЬТР по наличию -->
                <div class="filter_by_available_container">
                    <div class="radio-option">
                        <input v-model=filter_by_available type="radio" id="opt1" name="options" value="all">
                        <label for="opt1">Все</label>
                    </div>
                    <div class="radio-option">
                        <input v-model=filter_by_available type="radio" id="opt2" name="options" value="available">
                        <label for="opt2">В наличии</label>
                    </div>
                    <div class="radio-option">
                        <input v-model=filter_by_available type="radio" id="opt3" name="options" value="order">
                        <label for="opt3">Под заказ</label>
                    </div>
                </div>
            </div>
        </div>

        <div style="padding: 0 .5rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between;">
            <p style="margin: 0; color: var(--color-global-text_second);">
                <span style="color: var(--color-global-text_second);">{{ current_volume }}</span> | 
                <span style="color: var(--color-global-text_second);">{{ current_book }}</span> | 
                <span style="color: var(--color-global-text_second);">{{ current_part }}</span> |
                <span style="color: var(--color-global-text_second);">{{ current_chapter }}</span> |
                <span style="color: var(--color-global-text_second);">{{ current_paragraph }}</span>
            </p> 
            <p style="margin: 0; color: var(--color-global-text_second);">{{ filter_by_available }}</p>
        </div>
        <!-- ITEM GRID -->
        <div class="product-item_section">
            <!-- data is loading -->
            <div v-if="pending_product" style="margin-left: 1rem; margin-right: 1rem;">
                <p style="margin-top: 1rem">Loading...</p>
            </div>

            <div class="product-item_container">

                <!-- Поиск ничего не находит -->
                <div class="item_search_wrong" style="margin-bottom: 20.5rem"   v-if="searchProductInput && !computed_products?.length">
                    По запросу ничего не найдено
                </div>

                <!-- Есть товары, показываем -->
                <div
                    class="product-item_wrapper"
                    v-for="product in computed_products"
                    @click.stop="$router.push(`/product/${product.id}`);"
                >
                    <div 
                        class="product-item_img"
                    >
                        <img :src="`${product.img_src}`" :alt="product.title"
                    >
                    </div>
                    <p class="product-item_price">{{ product.price }} {{ product.currency }}</p>
                    <div class="product-item_remain">
    
                        <p v-if="product.qty == 0" style="background-color: var(--color-operation-type-donation)">Доступно для заказа</p>
                        <p v-else>В наличии: {{ product.qty }} {{ product.measure }}</p>
                    </div>
                    <h3 style="font-size: 1.25rem;">{{ product.title }}</h3>
                    <p style="margin: 0; font-size: .8rem;color: var(--color-global-text_second);">{{ product.type }}</p>

                    <div class="product-item_cart">
                        <p 
                            class="cart-add_btn"
                            @click.stop="add_to_cart_func()"
                        >В корзину</p>
                        <p class="cart-change-count_btn" style="width: fit-content;">- 1 +</p>
                    </div>
                    <!-- <p>{{ product.description }}</p>
                    <p>Характеристики:</p>
                    <ul>
                        <li v-for="feature in product.features">
                            {{ feature }}
                        </li>
                    </ul> -->
                   <!-- <p> {{ product }}</p> -->
                </div>
            </div> 

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
        color: var(--color-global-text_second); 
        font-size: 0.8rem; 
        padding-bottom: 0.5rem
    }

    .lead-item_wrapper {
        margin-top: 0.5rem; 
    }

    .lead-item_wrapper:hover {
        background-color: var(--color-btn-hover-bg);
        cursor: pointer;
    }
  
    .leads-qty_wrapper {
        width: 3rem; 
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .landing-diagram_wrapper {
        display: flex; 
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

    }  
    /* 
    */
    .item_container {
        display: grid;
    }
    .item_wrapper {
        transition: all .2s ease-in-out;
        overflow: hidden;
    }
    .item_wrapper:hover {
        cursor: pointer;
        border-radius: .5rem;
        /* box-shadow: var(--hover-shadow); */
    }
    .item_wrapper:hover div svg {
        transform: scale(1.1);
        border-radius: .5rem;
    }
    .item_wrapper:hover div svg{
         transition: all .2s ease-in-out;
    }
    .item_wrapper div {
        margin-top: -1rem;
        margin-left: -1rem;
        margin-right: -1rem;
        display: flex;  
        align-items: center; 
        justify-content: center; 
        gap: .5rem;
        height: 250px;
    }

    /* .popup_content ul li label span{

    } */

    @media screen and (max-width: 319px) {
        h1 {
            font-size: 32px!important;
            margin: 0 1rem!important;
        }

        .item_container {
            margin-top: 1.5rem;
            grid-template-columns: 1fr;
            gap: 1.5rem; 
            /* display: grid; */
        }
        .item_wrapper {

        }
        .item_wrapper h3{
            font-size: 1.3rem;
        }
        .item_search_wrong {
            /* position: absolute; */
            /* display: inline!important; */
            padding: 0 1rem; 
        }
        .no-landing_wrapper {

        }
    }
    @media screen and (min-width:320px) and (max-width: 574px) {
        h1 {
            margin: 0 1rem!important;
        }
        .item_container {
            margin-top: 2rem;
            grid-template-columns: 1fr 1fr;
            gap: .5rem; 
            /* display: grid;*/
        }
        .item_search_wrong {
            position: absolute;
            padding: 0 1rem;
        }

    }
    @media screen and (max-width: 575px) {
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
            /* margin: 0 1rem;
            margin-top: 1.5rem; */
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
        .item_wrapper h3 {
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
            margin-top: 2.5rem;
            grid-template-columns: 1fr 1fr 1fr;
            padding: 0 1rem;
            gap: 1.5rem;
        }
        .item_wrapper {
            padding-left: .2rem;
            border-radius: .75rem;
        }
        .item_wrapper div {
            display: flex;  
            align-items: center; 
            justify-content: center; 
            gap: .5rem;
            height: 12rem;
        }
        /* .item_wrapper div img {
            width: 100%;
        } */
        .item_wrapper h3 {
            margin-top: 1rem;
        }

        /* .item_wrapper p {
            margin-top: .5rem!important;
        } */
        .item_search_wrong {
            position: absolute;
            padding: 0 1rem;
        }
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
    @media screen and (min-width: 768px) and (max-width: 991px) {
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
        .lead-item-header_wrapper,
        .lead-item_wrapper {
            display: grid; 
            grid-template-columns: 3rem 1fr 1fr 1fr
        }
        /* 
        */
        .item_search {
            /* margin-top: 2rem;  */
        }
        .item_container {
            grid-template-columns: 1fr 1fr 1fr 1fr!important;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        .item_wrapper {
            padding: .5rem;
        }
        .item_wrapper div {
            display: flex;  
            align-items: center; 
            justify-content: center; 
            gap: .5rem;
            height: 12rem;
        }
        /* .item_wrapper div img {
            width: 100%;
        } */
        .item_wrapper h3 {
            margin-top: .5rem;
            font-size: 1.3rem;
        }

        .item_wrapper p {
            color: var(--color-global-text_second);
            font-size: .9rem;
        }
        .item_search_wrong {
            position: absolute;
            padding: 0 1rem;
        }
    }
    @media screen and (min-width: 992px) and (max-width: 1199px) {
        /* 
        */
        .item_search {
            margin-top: 2rem; 
        }
        .item_container {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr!important;
            gap: .7rem;
            margin-top: 1.5rem;
            /* display: grid;
            margin-top: 1.5rem; */
        }
        .item_wrapper {
            /* background-color: var(--color-operation-type-donation); */
            /* background-color: red; */
            /* border-radius: 1rem; */
            padding: .5rem;
        }
        .item_wrapper div {
            /* width: 50% */

            /* background-color: var(--color-global-baackground_light); */
            /* border-radius: .5rem; */
            display: flex;  
            align-items: center; 
            justify-content: center; 
            gap: .5rem;
            height: 12em;
        }
        /* .item_wrapper div img {
            width: 100%;
        } */
        .item_wrapper h3 {
            margin-top: .5rem;
            font-size: 1.25rem;
        }

        .item_wrapper p {
            margin-top: .5rem!important;
            font-size: .9rem;
        }
        .item_search_wrong {
            position: absolute;
            padding: 0 1rem;
        }
    }
    @media screen and (min-width: 1200px) and (max-width: 1399px) {
        /* 
        */
        .item_search {
            margin-top: 2rem; 
        }
        .item_container {
            grid-template-columns: repeat(7, 1fr)!important;
            gap: 1rem;
            margin-top: 2rem;
            min-height: 300px;
        }
        .item_wrapper {
            padding: .5rem;
            width: 100%;
        }
        .item_wrapper div {
            display: flex;  
            align-items: center; 
            justify-content: center; 
            gap: .5rem;
            height: 11rem;
        }
        .item_wrapper h3 {
            margin-top: .5rem;
            font-size: 1rem;
        }

        .item_wrapper p {
            margin-top: .5rem!important;
            font-size: .8rem;
        }
        .item_search_wrong {
            position: absolute;
            padding: 0 1rem;
        }
        .item_search_wrong {
            position: absolute;
            padding: 0 1rem;
        }
        /* 
         */
        .product-item_section {
            height: 100vh
        }
        .product-item_filter {
            /* background-color: green; */
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
        .product-item_filter .product-item_search-wrapper {
            /* background-color: red;  */
            /* margin-left: 1rem; */

        }
        .product-item_filter .product-item_filters-wrapper {
            display: flex; 
            justify-content: space-between; 
            width: 100%;
        }
        .product-item_filter .filter_container {
            padding: 1rem .5rem;
        }
        .product-item_filter .filter_by_available_container {
            padding: 1rem 1rem;
        }
        /* 
        FILTER highlighted
        */
        .highlighted {
            /* position: fixed; */
            background-color: var(--color-btn-text);
            position: sticky;
            top: 4.5rem;
            left: 0;
            z-index: 1000;
            width: 100%;
            /* padding: 0 1rem; */
        }
        /* 
        FILTER by type
         */
         .filter_container {
            display: flex;
            gap: .5rem;
            padding: 1rem;
        }
        .filter-wrapper label span,
        .filter-wrapper label svg {
            transition: all .2s ease-in;
        }
        .filter-wrapper label svg{
            margin-left: .25rem;
            transform: rotate(180deg)
        }
        .filter-wrapper label span:hover {
            cursor: pointer;
        }
        .filter-wrapper label:hover span,
        .filter-wrapper label:hover svg {
            color: var(--color-wallet-fund-invested)!important;
            transform: rotate(180deg) scale(1.5);
        }
        /* 
        FILTER by available
         */
        .filter_by_available_container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: .75rem;
        }
        .filter_by_available_container div {

        }
         .filter_by_available_container div input {
            display: none;
        }
        .filter_by_available_container div input:checked + label {
            border-bottom: 1px solid var(--color-wallet-fund-invested);
            color: var(--color-wallet-fund-invested);
        }
         .filter_by_available_container div label {
            cursor: pointer;
            border-bottom: 1px solid rgba(255, 255, 255, 0);
            transition: all .2s ease-in;
        }
         .filter_by_available_container div label:hover {
            border-bottom: 1px solid var(--color-wallet-fund-invested);
            color: var(--color-wallet-fund-invested);
        }
        /* 
         */
        .product-item_container {
            display: grid;
            grid-template-columns: repeat(6, 1fr)!important;
            gap: 1.5rem;
            row-gap: 2rem;
            padding: 0 1rem;
            /* margin-top: 2rem; */
            /* min-height: 390px; */
        }
        .product-item_wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            background-color: var(--color-item-hover-bg);
            cursor: pointer;
            min-width: 150px;
            display: relative;
            /* margin-top: -2rem; */
        }
        .product-item_img {
            background-color: red;
            width: 100%;
            height: 13rem; 
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .product-item_img img {
            transition: all .2s ease-in;
            pointer-events: none;
            width: 100%;
            height: auto;
            object-fit: cover; 
            /* Заполняет контейнер, обрезая края */
            /* object-fit: contain; */
            /* object-fit: contain; — поместить целиком без обрезки */
            object-position: center; /* Позиционирование внутри контейнера */
        }
        .product-item_wrapper:hover .product-item_img img {
            transform: scale(1.25);
        }
        .product-item_wrapper h3 {
            /* margin-top: .5rem; */
            margin: 0;
            font-size: .9rem!important;
            line-height: 1.5;
            font-weight: normal;
        }
        .product-item_wrapper p {
            margin: 0;
        }
        .product-item_price {
            /* position: absolute;
            left: 0;
            top: 0; */
            font-size: 1.2rem;
            margin: 0;
        }
        .product-item_remain {
            background-color: var(--color-status-finished);
        }
        .product-item_remain p {
            font-size: .8rem;
            padding: 0 .25rem;
        }
        .product-item_cart {
            margin-top: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            background-color: var(--color-global-text_second);
            padding: 5px;
        }
        .cart-add_btn {
            background-color: rgba(54, 195, 77, 0.6);;
            width: 100%;
            text-align: center;
            color: white;
            padding: .25rem;
            font-size: .8rem;
        }
        .cart-add_btn:hover {
            background-color: rgba(54, 195, 77, 0.8);
        }
        .cart-change-count_btn {
            background-color: var(--color-wallet-fund-debt);
        }
    }
    @media screen and (min-width: 1400px) {
        /* 
        */
        .item_search {
            margin-top: 2rem; 
        }
        .item_container {
            grid-template-columns: repeat(6, 1fr)!important;
            gap: .75rem;
            margin-top: 2rem;
        }
        .item_wrapper {
            /* background-color: var(--color-operation-type-donation); */
            /* background-color: red; */
            /* border-radius: 1rem; */
            padding: 1rem .25rem;
            /* width: 320px; */
        }
        .item_wrapper div {
            /* width: 50% */
            /* background-color: var(--color-global-baackground_light); */
            /* border-radius: .5rem; */
            display: flex;  
            align-items: center; 
            justify-content: center; 
            gap: .5rem;
            height: 200px;
        }
        /* .item_wrapper div img {
            width: 100%;
        } */
        .item_wrapper h3 {
            margin-top: .5rem;
            font-size: 1.25rem;
        }

        .item_wrapper p {
            margin-top: .5rem!important;
            font-size: .9rem;
        }
        /* 
         */
         .product-item_wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            /* max-width: 300px; */
            background-color: var(--color-global-baackground_light);
         }
        .product-item_img {
            background-color: red; 
            /* width: 300px;  */
            width: 100%;
            height: 14rem; 
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .product-item_img img {
            width: 100%;
            height: auto;
            object-fit: cover; 
            /* Заполняет контейнер, обрезая края */
            /* object-fit: contain; */
            /* object-fit: contain; — поместить целиком без обрезки */
            object-position: center; /* Позиционирование внутри контейнера */
        }
        /* 
         */
        .item_search_wrong {
            position: absolute;
            padding: 0 1rem;
        }
        .item_search_wrong {
            position: absolute;
            padding: 0 1rem;
        }
    }
</style>

<script lang="ts" setup>
    import { useImageDisplay } from '@/utils/useImageDisplay'
    useHead({
        title: "Каталог",
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
        },
        {
            name: 'rocked_furniture',
            color: 'var(--color-global-text_second)'
        }
    ])

    // POPUPs
    // 
    //= trigger popup vars
    const popup_opened = ref(false)
    // VOLUME
    const popup_volume_opened = ref(false)
    const current_volume = ref('Все тома')
    // BOOK
    const popup_book_opened = ref(false);
    const current_book = ref('Все книги')
    // PART
    const popup_part_opened = ref(false)
    const current_part = ref("Все части")
    // CHAPTER
    const popup_chapter_opened = ref(false) 
    const current_chapter = ref("Все главы")
    // PARAGRAPH
    const popup_paragraph_opened = ref(false) 
    const current_paragraph = ref("Все параграфы");
    // 
    // const { fullImageUrl, setImage } = useImageDisplay(props.imageFileName)
    const { fullImageUrl, setImage } = useImageDisplay('bc449d9a769d039121d99041de2r--dlya-doma-i-interera-prikrovatnaya-tumba-deep-forest-s-radius.jpg')
    // 
    //= close popup func
    const close_volume_popup = () => {
        popup_volume_opened.value = false
    }
    const close_book_popup = () => {
        popup_book_opened.value = false
    }
    const close_part_popup = () => {
        popup_part_opened.value = false
    }
    const close_chapter_popup = () => {
        popup_chapter_opened.value = false
    }
    const close_paragraph_popup = () => {
        popup_paragraph_opened.value = false
    }
    // 1.   book_volume
    // 1.1. Все
    // 1.2. Мебель
    // 1.3. Системы хранения
    // 1.4. Декор
    // 1.5  Акксессуары
    // 1.5. Освещение
    // Прочее

    // 2.   book
    // 2.1. Все
    // 2.2. Ванная 
    // 2.3. Спальня
    // 2.4. Гостиная
    // 2.5. Прихожая
    // 2.6. Кухня
    // 2.7. Двор
    // 2.8. Интерьер
    // 2.9. Экстерьер
    // Прочее
    const filter_book_items = ref([
        { 
            id: 1,
            name: 'Все'
        },
        {
            id: 2,
            name: 'Интерьер'
        }
    ])

    // 3.   part
    // 3.1. Все
    // 3.2. Тумбы
    // 3.3. Зеркала
    // 3.4. Кашпо
    // 3.4. Лампы
    // 3.5. Полки
    // 3.6. Диспенсеры
    // 3.7. Мыльницы
    // 3.7. Стаканы
    // 3.8. Пепельницы
    // Прочее
    
    // 4.   chapter
    // 4.1. Камень, металл, дерево
    // 4.2. Камень 
    // 4.3. Камень, металл, пластик
    // 4.4. Дерево, металл
    // 4.5. Керамика
    // Прочее
    
    // 5.   paragraph
    // 5.1. Все
    // 5.2. Расходники
    // 5.3. Напольный
    // 5.4. Настольный
    // 5.5. Подвесной
    // 5.6. Скрытый монтаж
    // Прочее

    // {
            // "book_volume":"Интерьер",
            // "book": "Ванная",
            // "part": "Мебель",
            // "chapter": "Тумбы",
            // "paragraph": "Основной"


// Системы хранения / Ванная  / Полки / Дерево, металл / Скрытый монтаж
// Декор / Интерьер / Кашпо / Камень, металл, пластик / Напольный           
// Мебель / Спальня / Тумбы / Камень, металл, дерево / Подвесной
// Мебель / Спальня / Тумбы / Камень, металл, дерево / Напольный
// Аксессуары / Ванная / Диспенсеры / Камень / Настольный
// Аксессуары / Кухня / Диспенсеры / Камень / Настольный
// Аксессуары / Ванная / Мыльницы / Камень / Настольный
// Аксессуары / Ванная / Стаканы / Камень / Настольный
// Аксессуары / Двор / Пепельницы / Камень / Настольный
// Системы хранения / Ванная  / Полки / Керамика / Скрытый монтаж
// Мебель / Ванная / Тумбы / Камень, металл, дерево / Подвесной
    // }

    // pocket of filters
    const current_filter_group = ref('Все')
    const computed_filter_pocket = computed(() => {

        // ТОМ
        if(current_filter_group.value === 'Том') {

            let list = products_on_sale_list.value.map(el => el.type ? el.type.split(' / ')[0] : el.type)
            return [... new Set(list)]
        }
        // КНИГА
        else if(current_filter_group.value === 'Книга') {

            let list = products_on_sale_list.value.map(el => el.type ? el.type.split(' / ')[1] : el.type)
            return [... new Set(list)]
        }
        // ЧАСТЬ
        else if(current_filter_group.value === 'Часть') {

            let list = products_on_sale_list.value.map(el => el.type ? el.type.split(' / ')[2] : el.type)
            return [... new Set(list)]
        }
        // ГЛАВА
        else if(current_filter_group.value === 'Глава') {

            let list = products_on_sale_list.value.map(el => el.type ? el.type.split(' / ')[3] : el.type)
            return [... new Set(list)]
        }
        // ПАРАГРАФ
        else if(current_filter_group.value === 'Параграф') {

            let list = products_on_sale_list.value.map(el => el.type ? el.type.split(' / ')[4] : el.type)
            return [... new Set(list)]
        }
    })

    // shared
    import { Container } from '@/shared/container'
    import { Section } from '@/shared/section'
    import { DefaultPopup, InfoPopup } from '@/shared/popup';

    // components
    import { Button } from '@/components/button'
    import { BreadCrumbs } from '~/components/breadcrumbs';
    import { Search } from '~/components/search'
    import { onUnmounted } from 'vue';


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
    const searchProductInput = ref("")

    const filter_by_available = ref('all')

    // Intersection Observer
    // const targetRef = ref(null)
    // let observer:any = null
    // Инициализация Intersection Observer
    // const initObserver = () => {
    //     if (!targetRef.value) return

    //     observer = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {

    //             if(!entry.isIntersecting) {
    //                 entry.target.classList.add('highlighted')
    //                 // Переключаем класс в зависимости от видимости
    //                 // entry.target.classList.remove('highlighted')
    //             } 
    //             console.log(entry)
    //             // else {
    //             //     console.log(entry)
    //             //     entry.target.classList.add('highlighted')
    //             //     observer.unobserve(entry.target); // Отключаем наблюдение
    //             // }
    //         })
    //     }, {
    //         threshold: 0.8 // Срабатывает при 20 % видимости
    //     })

    //     // Начинаем наблюдение
    //     observer.observe(targetRef.value)
    // }
    const elementRef = ref(null);
    const isFixed = ref(false);
    let observer = null;
    // ON MOUNTED
    onMounted(() => {
        // let ticking = false;

        // window.addEventListener('scroll', () => {
        // if (!ticking) {
        //     requestAnimationFrame(() => {
        //     updatePosition();
        //     ticking = false;
        //     });
        //     ticking = true;
        // }
        // });
        if (!elementRef.value) return;
        observer = new IntersectionObserver(([entry]) => {
            // // Инвертируем: фиксируем, когда элемент уходит из зоны видимости
            isFixed.value = !entry.isIntersecting;
            // entry.target.classList.toggle('highlighted', !entry.isIntersecting); 
        }, {
            rootMargin: '-200px 0px 0px 0px', // Отступ сверху
            threshold: 0
        });

        observer.observe(elementRef.value);
        // window.addEventListener('scroll', () => {
        // const element = document.querySelector('.product-item_filter');
        // const rect = element?.getBoundingClientRect();
        // const triggerPoint = 100; // Пиксели от верха
    
        // if (rect.top <= triggerPoint) {
        //     element?.classList.add('highlighted');
        // } else {
        //     element?.classList.remove('highlighted');
        // }
        // });
        // // Отслеживавние скролла для плашки product_item_features раздел с фильтрацией товаров 
        // const element = document.querySelector('.product-item_filter');
        // const observer = new IntersectionObserver((entries) => {
        // entries.forEach(entry => {
        //     // Добавляем класс 'fixed', когда элемент выходит из зоны видимости сверху
        //     entry.target.classList.toggle('highlighted', !entry.isIntersecting);
        // });
        // }, {
        // // rootMargin: '-100px 0px 0px 0px', // Срабатывает, когда элемент на 100 px выше viewport
        //     threshold: 0.1,        // Срабатывает при 20 % видимости
        //     rootMargin: '50px 0px 50px 0px' // Отступы сверху и снизу
        // });
        // observer.observe(element);
        // if (!targetRef.value) return;
        // // initObserver()
        // observer = new IntersectionObserver((entries) => {
        //     entries.forEach(entry => {
        //         console.log(entry)
        //         entry.target.classList.toggle('highlighted', entry.isIntersecting);
        //     });
        // }, {
        //     threshold: 0.2 // Оптимальное значение
        // });

        // observer.observe(targetRef.value);
        //
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
    onUnmounted(() => {
        // // Отключаем observer при уничтожении компонента
        // if (observer) {
        //     observer.disconnect()
        // }
        // if (observer) observer.disconnect();
        if (observer) observer.disconnect();
    })

    // ACTIONs ON BODY
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
            return landing_list?.value

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
    

    // Products list
    //= computed
    const computed_products = computed(() => {
        if(searchProductInput.value === '') {
            return products_on_sale_list.value
        } else {
            return products_on_sale_list.value?.filter((item) => 
                item.title
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(searchProductInput.value.toLowerCase().replace(/\s+/g, ""))
            )
        }
    })
    //= db get
    const { data: products_on_sale_list, pending_product, error_product} = await useFetch("/api/warehouse_onsale/item", {
        lazy: false,
        transform: (products: any) => {
            return products
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
            },
            {
                group: 'rocked_furniture',
                name: 'hugeicons:pathfinder-minus-front'
            }
        ]

        return icon_name_list.filter(el => el.group === item_name.slice(8, item_name.length))
    }

    //= set_item_styles
    const set_item_styles = (subject: string, group_name: string) => {
        console.log(subject)
        console.log(group_name)
        // console.log(group_name.slice(8, group_name.length))
        // console.log(group.value)

        let curent_item = group.value.find(el => el.name === group_name.slice(8, group_name.length))

        if(curent_item) {

            
                    if(subject === 'border') {
            
                        // border: 1px solid ${curent_item.color};
                        return `
                        `
                    } 
                    else if (subject === 'background') {
                        return `
                            background-color: ${curent_item.color};
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

    // onClick cart-add_btn
    const add_to_cart_func = () => {
        console.log('функция не добавлена...')
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
    const onInputSearchProductFunc = (e: any) => {
        searchProductInput.value = e
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