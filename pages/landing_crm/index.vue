<template>

<!--  -->
    <Container >

        <!-- TITLE PAGE SECTION -->
        <div class="show-max-767 title-page-section" style="margin-bottom: 0.5rem;">
            <BreadCrumbs/>
            <h1 style="margin: 0;">conspirators.CRM</h1> 
        </div>

        <!-- HEADER BANNER -->
        <div class="header-banner_wrapper" style="position: relative; display: flex; align-items: center;">

            <!-- ART -->
            <div class="header-banner_art" style="position: absolute; top: 0; width: 50%; height: 100%; background-color: var(--color-operation-type-donation); z-index: -1;">

            </div>

            <!-- CONTENT -->
            <div>
                <h2 style="font-size: 3rem; font-weight: bold; margin: 0; text-transform: uppercase;">Дэй Бай Дилс</h2>
                <!-- <p style="color: var(--color-global-text_second);">Менеджмент дел и управление финансами</p> -->
                <p style="color: var(--color-global-text_second);">#Твой финпульс</p>
                <div>
                    <Button 
                        style="margin-top: 2rem;" 
                        v-if="useAuthStore().loggedIn !== true" 
                        type="pseudo-btn" 
                        link="/login" 
                        bg="bg-stroke" 
                        :disabled="false"
                    >
                        Войти
                    </Button>
                    <div 
                        v-else @click="$router.push(`/wallet`)" 
                        style="cursor: pointer; margin-top: 1rem; width: fit-content;"
                    >
                        <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-global-text)"/>
                    </div>
                </div>
            </div>

        </div>

        <!-- FEATURES SCROLLED BANNER  -->
         <!-- Допилить роутер на раззделы для sessionUser и заглушки для неавторизованных -->
        <div class="articles_container" style="margin-top: 2rem;">
            <h3>Выбирай фичи под себя</h3>
            <ul id="article-block" class="blocks_wrapper">
                <li 
                    v-for="feature in features_list_onServer" 
                    :key="feature.id" style="border: none;" :style="user_features_computed?.find(el => el.feature_id === feature.id) ? 'background-color: var(--color-urgency-low-10);': ' '"
                    @click.stop="popup_feature_opened = !popup_feature_opened; feature_in_popup = feature"
                    >
                    <Icon size="32px" :name="feature.icon"/>
                    <p style="margin: 0; margin-top: .5rem;">{{ feature.name_rus }}</p>

                    <!-- ДЛЯ НЕАВТОРИЗОВАННОГО ЮЗЕРА -->
                    <div v-if="!useAuthStore().user" class="block_available">
                        <p v-if="feature.available" style="background-color: var(--color-btn-bg); opacity: .8">
                            <span>{{ feature.price.toFixed(2) }}</span>
                            <span v-if="feature.per_month"> руб. / мес.</span>
                            <span v-else> руб.</span>
                        </p>
                        <p v-else style="background-color: var(--color-btn-wo-bg)">
                            <span>В разработке</span>
                        </p>
                    </div>
                    <!-- ДЛЯ АВТОРИЗОВАННОГО, КОГДА ЕСТЬ СЕССИОННЫЙ ЮЗЕР -->
                    <div v-else class="block_available">
                        <p v-if="
                            user_features_computed?.find(el => el.feature_id === feature.id)
                        " style="background-color: var(--color-urgency-low);">
                            <span>В подписке</span>
                        </p>
                        <p v-else-if="feature.available && !user_features_computed?.find(el => el.feature_id === feature.id)" style="background-color: var(--color-btn-bg); opacity: .8">
                            <span>{{ feature.price.toFixed(2) }}</span>
                            <span v-if="feature.per_month"> руб. / мес.</span>
                            <span v-else> руб.</span>
                        </p>
                        <p v-else style="background-color: var(--color-btn-wo-bg)">
                            <span>В разработке</span>
                        </p>

                    </div>
                </li>
            </ul>
            <!-- <p>СЕССИЯ: {{ useAuthStore().user }}</p>
            <p v-if="useAuthStore().session.user">{{ useProfileStore().profiles.find(el => el.userId === useAuthStore().session.user.id).subscription }}</p>
            <p>user_features_computed:{{ user_features_computed }}</p>
            <p>features_list_onServer: {{ features_list_onServer }}</p> -->

            <!-- ПОПАП -->
            <DefaultPopup
                v-if="popup_feature_opened"
                id="popup_feature"
                :popup_title="feature_in_popup?.name_rus"
                @emitClosePopup="close_feature_popup"
            >
                <main>
                    <p>
                        {{ feature_in_popup }}
                    </p>

                    <div v-if="!useAuthStore().user">
                        <div v-if="feature_in_popup?.available">
                            <p>Приобрести</p>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <div style="background-color: var(--color-wallet-fund-invested-wo)">
                                    <p>12 месяцев</p>
                                    <p>Скидка 30% </p>
                                    <p style="text-decoration: line-through;">{{ feature_in_popup?.price.toFixed(2) }} x 12 = {{ feature_in_popup?.price * 12 }}</p>
                                    <p>{{ feature_in_popup?.price * 0.7 }} x 12 = {{ (feature_in_popup?.price * 0.7) * 12 }}</p>
                                </div>

                                <div style="background-color: gray;">
                                    <p>1 месяц</p>
                                    <span>{{ feature_in_popup?.price.toFixed(2) }}</span>
                                    <span v-if="feature_in_popup?.per_month"> руб. / мес.</span>
                                    <span v-else> руб.</span>
                                </div>
                            </div>
                        </div>
                        <p v-else style="background-color: var(--color-btn-wo-bg)">
                            <span>О гость, фича находится в разработке... и купить её пока невозможно!</span>
                        </p>
                    </div>
                    <div v-else>
                        <div v-if="
                            user_features_computed?.find(el => el.feature_id === feature_in_popup?.id)
                        ">
                            <p style="background-color: var(--color-urgency-low);">
                                <span>В подписке</span>
                                <span> до:                             {{ user_features_computed.find(el => el.feature_id === feature_in_popup?.id).feature_deadline }}</span>  
                            </p>
                            <p>Продлить</p>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <div style="background-color: var(--color-wallet-fund-invested-wo)">
                                    <p>12 месяцев</p>
                                    <p>Скидка 50% </p>
                                    <p style="text-decoration: line-through;">{{ feature_in_popup?.price.toFixed(2) }} x 12 = {{ feature_in_popup?.price * 12 }}</p>
                                    <p>{{ feature_in_popup?.price * 0.5 }} x 12 = {{ (feature_in_popup?.price * 0.5) * 12 }}</p>
                                </div>
                                <div style="background-color: gray;">
                                    <p>1 месяц</p>
                                    <p>Скидка 10%</p>
                                    <span>{{ feature_in_popup?.price * 0.9 }}</span>
                                    <span v-if="feature_in_popup?.per_month"> руб. / мес.</span>
                                    <span v-else> руб.</span>
                                </div>
                            </div>
                            <p>Продлить всю подписку со скидкой до 50% сейчас</p>
                            <!-- <p>Продлить всю действующую подписку</p>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <div style="background-color: var(--color-wallet-fund-invested-wo)">
                                    <p>12 месяцев</p>
                                    <p>Скидка 50% </p>
                                    <p style="text-decoration: line-through;">{{ feature_in_popup?.price.toFixed(2) }} x 12 = {{ feature_in_popup?.price * 12 }}</p>
                                    <p>{{ feature_in_popup?.price * 0.5 }} x 12 = {{ (feature_in_popup?.price * 0.5) * 12 }}</p>
                                </div>
                                <div style="background-color: gray;">
                                    <p>1 месяц</p>
                                    <span>{{ feature_in_popup?.price.toFixed(2) }}</span>
                                    <span v-if="feature_in_popup?.per_month"> руб. / мес.</span>
                                    <span v-else> руб.</span>
                                </div>
                            </div>
                            <br>
                            <br>
                            <br> -->
                        </div>
                        <div v-else-if="feature_in_popup?.available && !user_features_computed?.find(el => el.feature_id === feature_in_popup?.id)">
                            <p>Приобрести за</p>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <div style="background-color: var(--color-wallet-fund-invested-wo)">
                                    <p>12 месяцев</p>
                                    <p>Скидка 30% </p>
                                    <p style="text-decoration: line-through;">{{ feature_in_popup?.price.toFixed(2) }} x 12 = {{ feature_in_popup?.price * 12 }}</p>
                                    <p>{{ feature_in_popup?.price * 0.7 }} x 12 = {{ (feature_in_popup?.price * 0.7) * 12 }}</p>
                                </div>

                                <div style="background-color: gray;">
                                    <p>1 месяц</p>
                                    <span>{{ feature_in_popup?.price.toFixed(2) }}</span>
                                    <span v-if="feature_in_popup?.per_month"> руб. / мес.</span>
                                    <span v-else> руб.</span>
                                </div>
                            </div>
                        </div>
                        <p v-else style="background-color: var(--color-btn-wo-bg)">
                            <span>Фича находится в разработке... и купить её пока невозможно!</span>
                        </p>
                    </div>

                </main>
                <footer style="padding: 1rem;">
                    <!-- ДЛЯ НЕАВТОРИЗОВАННОГО ЮЗЕРА -->
                    <div v-if="!useAuthStore().user">
                        <!-- <p>ДЛЯ НЕАВТОРИЗОВАННОГО ЮЗЕРА</p> -->
                        <div v-if="feature_in_popup?.available">
                            <p style="background-color: var(--color-btn-bg); opacity: .8">
                                <span>{{ feature_in_popup?.price.toFixed(2) }}</span>
                                <span v-if="feature_in_popup?.per_month"> руб. / мес.</span>
                                <span v-else> руб.</span>
                                
                            </p>
                            <p>
                                <span>Добавить в корзину</span>
                                <span> | </span>
                                <span>Оплатить сейчас</span>
                            </p>
                        </div>
                        <p v-else style="background-color: var(--color-btn-wo-bg)">
                            <span>В разработке</span>
                        </p>
                    </div>
                    <!-- ДЛЯ АВТОРИЗОВАННОГО, КОГДА ЕСТЬ СЕССИОННЫЙ ЮЗЕР -->
                    <div v-else>
                        <!-- <p>ДЛЯ АВТОРИЗОВАННОГО, КОГДА ЕСТЬ СЕССИОННЫЙ ЮЗЕР</p> -->
                        <p v-if="
                            user_features_computed?.find(el => el.feature_id === feature_in_popup?.id)
                        " style="background-color: var(--color-urgency-low);">
                            <span>В подписке</span>
                        </p>
                        <div v-else-if="feature_in_popup?.available && !user_features_computed?.find(el => el.feature_id === feature_in_popup?.id)">
                            <p style="background-color: var(--color-btn-bg); opacity: .8">
                                <span>{{ feature_in_popup?.price.toFixed(2) }}</span>
                                <span v-if="feature_in_popup?.per_month"> руб. / мес.</span>
                                <span v-else> руб.</span>
                            </p>
                            <p>
                                <span>Добавить в корзину</span>
                                <span> | </span>
                                <span>Оплатить сейчас</span>
                            </p>
                        </div>
                        <p v-else style="background-color: var(--color-btn-wo-bg)">
                            <span>В разработке</span>
                        </p>
                    </div>
                </footer>
            </DefaultPopup>
        </div>

        <!--  -->
        <div class="value_wrapper">
            <h3>Польза</h3>
            <div id="value-block">
                <!-- Финансовая грамотность -->
                <div>        
                    <h4>Финансовая грамотность</h4>
                    <p class="value_tag">Статья</p>
                    <p>Помогает увидеть реальное положение дел: потоки текущих и инвестированных средств, вложенные в различные инструменты. Наличие или отсутствие долговых обязательств. Записи помогают видеть траты и доходы по категориям, распределять их по бандам и быть в курсе изменений в фондах.</p>
                    <ul>
                        <li>Учимся инвестировать</li>
                        <li>Магия сложного процента</li>
                    </ul>
                    <div class="value_btn" @click="$router.push(`/journal`)">
                        <div style="background-color: var(--color-wallet-fund-debt-wo); width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 100%;">
                            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-text)"/>
                        </div>
                        <p style="color: var(--color-btn-text); margin: 0; font-size: .8rem;">Читать</p>
                    </div>
                </div>
                <div>
                    <h4>Самоконтроль</h4>
                    <p class="value_tag">База знаний</p>
                    <p>Анализ своих привычек, выявление основных трат. Запись доходов и расходов помогают планировать будущие инвестиции и траты.</p>
                    <ul>
                        <li>Контроль еженедельных взносов</li>
                        <li>Анализ данных</li>
                    </ul>
                    <div class="value_btn" @click="$router.push(`/help`)">
                        <div style="background-color: var(--color-wallet-fund-debt-wo); width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 100%;">
                            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-text)"/>
                        </div>
                        <p style="color: var(--color-btn-text); margin: 0; font-size: .8rem;">Изучать</p>
                    </div>
                </div>
                <div>
                    <h4>Высвобождение памяти</h4>
                    <p class="value_tag">Дэй бай Дилс</p>
                    <p>Фиксация заявок и задач, запись их выполнения - отличный способ высвободить как время от контроля других участников банд, так и памят от постоянных попыток контролировать реализацию проектов</p>
                    <ul>
                        <li>Записывай все транзакции</li>
                        <li>Следи за развитием проектов</li>
                        <li>Контролируй работу с ресурсами</li>
                    </ul>
                    <div v-if="!useAuthStore().user" class="value_btn" @click="$router.push(`/login`)">
                        <!-- <div style="background-color: var(--color-wallet-fund-debt-wo); width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 100%;">
                            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-text)"/>
                        </div> -->
                        
                        <p style="color: var(--color-btn-text); margin: 0;">Войти</p>
                    </div>
                    <div v-else class="value_btn" @click="$router.push('/demands')">
                        <p style="color: var(--color-btn-text); margin: 0;">Доска задач</p>
                    </div>
                </div>
                <div>
                    <h4>Высвобождение памяти</h4>
                    <p class="value_tag">Дэй бай Дилс</p>
                    <p>Фиксация заявок и задач, запись их выполнения - отличный способ высвободить как время от контроля других участников банд, так и памят от постоянных попыток контролировать реализацию проектов</p>
                    <ul>
                        <li>Записывай все транзакции</li>
                        <li>Следи за развитием проектов</li>
                        <li>Контролируй работу с ресурсами</li>
                    </ul>
                    <div v-if="!useAuthStore().user" class="value_btn" @click="$router.push(`/login`)">
                        <!-- <div style="background-color: var(--color-wallet-fund-debt-wo); width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 100%;">
                            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-text)"/>
                        </div> -->
                        
                        <p style="color: var(--color-btn-text); margin: 0;">Войти</p>
                    </div>
                    <div v-else class="value_btn" @click="$router.push('/demands')">
                        <p style="color: var(--color-btn-text); margin: 0;">Доска задач</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- PRICE -->
        <!-- Одиночка -->
        <!-- Банда -->
        <!--  -->
        <div class="articles_container price_wrapper" style="background-color: var(--color-btn-disabled-bg);">
            <h3>Подписка</h3>
            <ul style=" list-style: none; padding: 0; margin-top: 1rem;">
                <Section
                    fDirection="column"
                    fAlignItems="flex-start"
                >

                    <h4>Один воин - одна фича</h4>

                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; border: 1px solid red;">
                        <Icon size="32px" :name="features_list_onServer[2].icon"/>
                        <p style="margin: 0; color: var(--color-global-text)">{{ features_list_onServer[2].name_rus }}</p>
                    </div>
                    
                    <div>
                        <p style="margin: 0;text-decoration: line-through;">
                            <span></span>{{ features_list_onServer[2].price }} * 12 = 
                            <span style="">{{ features_list_onServer[2].price * 12 }} за год </span>
                        </p>
                        <p style="margin: 0;">
                            <span>250.00 х 12 = 3000.00 за год</span>
                        </p>
                    </div>
                    <p style="font-size: .8rem;">Каждая добавленная фича оплчивается отдельно </p>
                </Section>

                <li>
                    <h4>Банда + 3 фичи</h4>
                    <div style="display: flex; gap: 1rem;">
                        <div>
                            <Icon size="32px" :name="features_list_onServer[2].icon"/>
                            <p style="margin: 0; color: var(--color-btn-text)">{{ features_list_onServer[2].name_rus }}</p>
                        </div>
                        <div>
                            <Icon size="32px" :name="features_list_onServer[5].icon"/>
                            <p style="margin: 0; color: var(--color-btn-text)">{{ features_list_onServer[5].name_rus }}</p>
                        </div>
                        <div>
                            <Icon size="32px" :name="features_list_onServer[4].icon"/>
                            <p style="margin: 0; color: var(--color-btn-text)">{{ features_list_onServer[4].name_rus }}</p>
                        </div>
                    </div>
                    <p style="margin: 0; color: var(--color-btn-text)">Со скидкой 30% на всё</p>
                </li>
                <li>
                    <h4>Полный доступ</h4>
                    <p style="margin: 0; color: var(--color-btn-text)">799.00 руб. / мес.</p>

                    <!-- ТИКЕТ ВАША ПОДПИСКА -->
                    <div v-if="useAuthStore().user && useProfileStore().profiles.find(el => el.userId === useAuthStore().user.id)?.subscription" style="margin: 1rem;">
                        <ul>
                            <h5 style="font-weight: bold;">Ваша подписка</h5>
                            <li>

                                <p>Статус: {{ useProfileStore().profiles.find(el => el.userId === useAuthStore().user.id).status.status_id }}</p>
                            </li>
                            <li>
                                <p>Начиная: {{ useProfileStore().profiles.find(el => el.userId === useAuthStore().user.id).status.status_created_at }}</p>
                            </li>
                        </ul>
                        <ul>
                            <h5 style="font-weight: bold;">Фичи</h5>
                            <li v-for="el in useProfileStore().profiles.find(el => el.userId === useAuthStore().user.id)?.subscription">
                                <p style="margin: 0;">{{ translate_feature(el.feature_id) }} </p>
                                <p>До {{ el.feature_deadline }}</p>
                            </li>
                        </ul>
                        <!-- <p>{{ useAuthStore().user }}</p> -->
                        <!-- <p>{{ useProfileStore().profiles.find(el => el.userId === useAuthStore().user.id) }}</p> -->
                    </div>
                </li>
            </ul>
            <p style="margin: 0; margin-left: 1rem;">Актуальный прайс от 16.05.2026</p>
        </div>

        <!--  -->
        <ul class="about-section_container">
            <li>
                <p style="color: var(--color-btn-text)">О проекте</p>
                <ul>
                    <li style="color: var(--color-btn-text);margin-left: 1rem;" @click.stop="$router.push(`/help`)">Дэй Бай Дилс Хэлп</li>
                    <li style="color: var(--color-btn-text);margin-left: 1rem;" @click.stop="$router.push('/whitepaper')" >Белая бумага</li>
                    <li style="color: var(--color-btn-text);margin-left: 1rem;" @click.stop="scrollToElement('value-block')">Чем полезен проект</li>
                    <li style="color: var(--color-btn-text);margin-left: 1rem;" @click.stop="$router.push('/journal')">Журнал историй</li>
                </ul>
            </li>
            <li>
                <p style="color: var(--color-btn-text)">Склад</p>
                <ul>
                    <li  style="color: var(--color-btn-text);margin-left: 1rem;" >Учет товаров по локациям</li>
                    <li style="color: var(--color-btn-text);margin-left: 1rem;" @click.stop="$router.push('/landing_stock')">Ставь предметы на продажу</li>
                </ul>
            </li>
            <li>
                <p style="color: var(--color-btn-text)">Лендинги</p>
                <ul>
                    <li  style="color: var(--color-btn-text);margin-left: 1rem;" >Сад с аналитикой лидов</li>
                    <li style="color: var(--color-btn-text);margin-left: 1rem;" @click.stop="$router.push('/landing_stock')">Все лендинги как услуги</li>
                </ul>
            </li>
            <li>
                <p style="color: var(--color-btn-text)">Доска задач</p>
                <ul>
                    <li  style="color: var(--color-btn-text);margin-left: 1rem;" >Список задач к выполнению</li>
                    <li style="color: var(--color-btn-text);margin-left: 1rem;" >Статистика проектов</li>
                    <li style="color: var(--color-btn-text);margin-left: 1rem;" >История задач по проектам</li>
                    <li style="color: var(--color-btn-text);margin-left: 1rem;">Движение средств по задачам</li>
                </ul>
            </li>
            <li>
                <p style="color: var(--color-btn-text)">Кошелек</p>
                <ul>
                    <li  style="color: var(--color-btn-text);margin-left: 1rem;" >История транзакций</li>
                    <li style="color: var(--color-btn-text);margin-left: 1rem;" >Работа бандами</li>
                </ul>
            </li>
        </ul>
    
    </Container>


    <!--  -->
    <!-- <div class="main-banner_container" style="margin-top: -5rem; margin-bottom: -3rem;">

        <div class="main-banner_wrapper">

            <h2 style="color: var(--color-btn-text);">Прокачай осознанность в финансах</h2>

            <div class="main-banner_subtitle">
                <p style="font-size: .8rem; font-weight: normal; color: var(--color-global-text_second);">Формируй привычки вместе с conspirators</p>
                <Button 
                    style="margin-top: 2rem;" 
                    v-if="useAuthStore().loggedIn !== true" 
                    type="pseudo-btn" 
                    link="/login" 
                    bg="bg-stroke" 
                    :disabled="false"
                >
                    Войти
                </Button>
                <div v-else @click="$router.push(`/wallet`)" style="cursor: pointer;">
                    <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-text)"/>
                </div>
            </div>
        </div>
    </div> -->

    <!--  -->
    <Container>







    </Container>
</template>

<script lang="ts" setup>
    useHead({
        title: "conspirators.CRM",
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
    import { Section } from '~/shared/section';
    import { DefaultPopup } from '@/shared/popup'

    // components
    import { Button } from '@/components/button';
    import { BreadCrumbs } from '~/components/breadcrumbs';

    // PROPS
    const props = defineProps({
        auth_user_profile: {
            type: Object,
            default: {}
        },
    })
    const popup_feature_opened = ref(false)
    

    // onMounted
    onMounted(() => {
        // на всякий случай сбрасываем фиксацию прокрутки страницы при открытой модалке...
        let body = document.getElementsByTagName('body')[0]
        body.style.margin = 'unset'
        body.style.height = 'unset'
        body.style.overflow = 'unset'

        //
        // const scrollValueContainer = document.getElementById("value-block");
        const scrollArticlesContainer = document.getElementById("article-block");

        // scrollValueContainer?.addEventListener("wheel", (evt) => {
        //     evt.preventDefault();
        //     scrollValueContainer.scrollLeft += evt.deltaY;
        // });

        scrollArticlesContainer?.addEventListener('wheel', (evt) => {
            evt.preventDefault()
            scrollArticlesContainer.scrollLeft += evt.deltaY
        })
    })

    // FEATURES AVAILABLE
    const features_list_onServer = ref([
        {
            id: 1,
            name: 'calendar',
            name_rus: 'Календарь',
            icon: 'material-symbols-light:calendar-month-outline',
            price: 299.99,
            per_month: true,
            available: false
        },
        {
            id: 2,
            name: 'gant',
            name_rus: 'Гант',
            icon: 'material-symbols-light:event-note-outline-rounded',
            price: 399.99,
            per_month: true,
            available: false
        },
        {
            id: 3,
            name: 'wallet',
            name_rus: 'Кошелек',
            icon: 'material-symbols-light:account-balance-wallet-outline',
            price: 599.99,
            per_month: true,
            available: true
        },
        {
            id: 4,
            name: 'gardern',
            name_rus: 'Сад',
            icon: 'material-symbols-light:action-key-outline-rounded',
            price: 99.99,
            per_month: true,
            available: true
        },
        {
            id: 5,
            name: 'projects',
            name_rus: 'Проекты',
            icon: 'material-symbols-light:folder-managed-outline-sharp',
            price: 199.99,
            per_month: false,
            available: true
        },
        {
            id: 6,
            name: 'contacts',
            name_rus: 'Контакты',
            icon: 'material-symbols-light:group-outline-rounded',
            price: 99.99,
            per_month: false,
            available: true
        },
        {
            id: 7,
            name: 'dashboard',
            name_rus: 'Доска',
            icon: 'material-symbols-light:personal-places-outline-rounded',
            price: 399.99,
            per_month: true,
            available: true
        },
        {
            id: 8,
            name: 'warehouse',
            name_rus: 'Склад',
            icon: 'material-symbols-light:warehouse-outline-rounded',
            price: 169.99,
            per_month: true,
            available: true
        }
    ])
    const feature_in_popup = ref(null)
    // [
    //     {
    //         "feature_id": 3,
    //         "feature_deadline": "2026-04-22 15:27:05"
    //     },
    //     {
    //         "feature_id": 4,
    //         "feature_deadline": "2026-04-22 15:27:05"
    //     },
    //     {
    //         "feature_id": 5,
    //         "feature_deadline": "2026-04-22 15:27:05"
    //     },
    //     {
    //         "feature_id": 6,
    //         "feature_deadline": "2026-04-22 15:27:05"
    //     },
    //     {
    //         "feature_id": 7,
    //         "feature_deadline": "2026-04-22 15:27:05"
    //     },
    //     {
    //         "feature_id": 8,
    //         "feature_deadline": "2026-04-22 15:27:05"
    //     }
    // ]
    const user_features = ref(null)
    const user_features_computed = computed(() => {
        if(useAuthStore().user) {
            return user_features.value = useProfileStore().profiles.find(el => el.userId === useAuthStore().session.user.id).subscription
        } else {
            return []
        }
    })

    // USER STATUS

    // TRANSLATORS FUNC

    //== features_list_onServer
    const translate_feature = (feature_id: number) => {

        return features_list_onServer.value.find(el => el. id === feature_id).name_rus
    }

    // 
    //= close_feature_popup
    const close_feature_popup = () => {
        feature_in_popup.value = null
        popup_feature_opened.value = false
    }

    //
    //= scrollToElement
    const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    }
    };

</script>

<style scoped>

    .article-list_wrapper {

    }
    .article-list_wrapper li::marker {
        color: var(--color-btn-wo-bg);
    }

    .main-banner_container {
        background-color: var(--color-global-text);
        width: 100%; 
        position: relative;
    }
    .main-banner_wrapper {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    /*  */
    .articles_container > ul > li{
        margin-top: 1rem;
        border: 1px solid black;
        border-radius: 1rem;
        overflow: hidden;
        padding-bottom: 1rem;
    }
    .articles_container > ul > li > h4,
    .articles_container > ul > li > p,
    .articles_container > ul > li > ul {
        margin: 0 1rem;
        margin-top: 1rem;
    }

    /*  */
    .value_wrapper > div > div > .value_btn {
        cursor: pointer;
        width: fit-content
    }

    @media screen and (max-width: 575px) {

        .show-max-767 {
            display: none;
        }
        .main-banner_container {
            height: 300px;
            margin-top: -1rem!important;
        }
        .main-banner_wrapper {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
        .main-banner_wrapper h2 {
            text-align: center;
        }
        .main-banner_subtitle {
            text-align: center;
        }
        .articles_container {
            /* margin-left: 1rem;
            margin-right: 1rem; */
            padding: 1rem;
        }
        /* blocks_wrapper */
        .blocks_wrapper {
            width: 100vw;
            margin-left: -1rem;
            margin-right: -1rem;
            padding-left: 1rem;
            padding-right: 1rem;
            display: flex;
            overflow-x: scroll;
            gap: 1rem;
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none; 
        }
        .blocks_wrapper::-webkit-scrollbar {
            display: none;
            -webkit-appearance: none;
            width: 0;
            height: 0;
        }
        .blocks_wrapper > li {
            height: 200px;
            min-width: 200px;
            display: flex;
            flex-direction: column;
            border-radius: .8rem;
            align-items: center;
            /* padding: .5rem; */
            justify-content: center;
            color: var(--color-btn-bg);
            background-color: var(--color-btn-hover-bg);
            position: relative;
        }
        .blocks_wrapper > li .block_available {
            position: absolute;
            bottom: 0;
            left: 0;
            /* padding: .2rem 0; */
            /* background-color: var(--color-btn-bg); */
            width: 100%;
            margin: 0;
            text-align: center;
        }
        .blocks_wrapper > li .block_available p {
            margin: 0;
            padding: .2rem 0;
        }
        .blocks_wrapper > li .block_available p span {
            color: var(--color-btn-text);
        }
        .blocks_wrapper > div > p {
            font-size: .8rem;
            color: var(--color-btn-bg);
        }

        /*  */
        .value_wrapper {
            margin: 1rem;
        }
        .value_wrapper > div{
            margin-top: 2rem;
            width: 100vw;
            margin-left: -1rem;
            margin-right: -1rem;
            padding-left: 1rem;
            padding-right: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            /* overflow-x: scroll;
            -ms-overflow-style: none; 
            scrollbar-width: none;  */
        }

        /* .value_wrapper > div::-webkit-scrollbar {
            display: none;
            -webkit-appearance: none;
            width: 0;
            height: 0;
        } */

        .value_wrapper > div > div{
            min-width: 300px;
            background-color: var(--color-operation-type-donation);
            border-radius: 1rem;
            padding: 1rem;
            position: relative; 
            padding-bottom: 4rem;
        }
        .value_wrapper > div > div > .value_tag {
            background-color: var(--color-wallet-fund-invested); 
            width: fit-content; 
            color: var(--color-btn-text); 
            font-size: .8rem; 
            border-radius: 1rem; 
            padding: 2px 8px;
        }
        .value_wrapper > div > div > ul {
            padding: 0;
            padding-left: 1rem
        }
        .value_wrapper > div > div > .value_btn {
            display: flex; 
            align-items: center; 
            gap: .5rem; 
            position: absolute; 
            bottom: 1rem; 
            left: 1rem;
            cursor: pointer;
        }
        /* 
         */
         .header-banner_wrapper {
            margin-left: 2rem;
            height: 320px; 
        }
        .header-banner_art {
            border-radius: 4.5rem 0 0 4.5rem;
            right: -2rem!important;
        }
        .header-banner_wrapper div p {
            margin: 0;
            margin-top: 1rem;
            width: 250px;
        }
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
        .show-max-767 {
            display: none;
        }
        .main-banner_container {
            height: 400px;
            margin-top: -1rem!important;
        }
        .main-banner_wrapper {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
        .main-banner_wrapper h2 {
            text-align: center;
        }
        .main-banner_subtitle {
            text-align: center;
        }
        .articles_container {
            margin-left: 1rem;
            margin-right: 1rem;
        }
        /* blocks_wrapper */
        .blocks_wrapper {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }
        /* 
         */
         .header-banner_wrapper {
            margin-left: 2.5rem;
            height: 400px; 
        }
        .header-banner_art {
            border-radius: 6rem;
            right: 1rem!important;
        }
        .header-banner_wrapper div p {
            margin: 0;
            margin-top: 1rem;
            width: 300px;
        }
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
        h1 {
            font-size: 1.5rem;
        }
        .main-banner_container {
            height: 400px;
            margin-top: 7rem!important;
        }
        .main-banner_wrapper {
            justify-content: flex-end;
            flex-direction: column;
        }
        .main-banner_wrapper h2 {
            /* width: 50%; */
            line-height: 150%;
            text-align: right;
        }
        .main-banner_subtitle {
            /* background-color: var(--color-btn-text); */
            /* height: 400px; */
            display: flex;
            gap: 2rem;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            /* padding: 1.5rem 2rem!important; */
            /* margin-right: 2rem; */
        }
        .main-banner_subtitle p {
            margin: 0;
            /* font-size: 1rem!important; */
        }
        .main-banner_subtitle div {
            margin-top: 1rem!important
        }
        /* 
         */
         .title-page-section {
            margin-left: 2.5rem;
         }
         .header-banner_wrapper {
            margin-left: 2.5rem;
            height: 400px; 
            margin-top: 5rem;
        }
        .header-banner_art {
            border-radius: 5rem;
            right: 2rem!important;
        }
        .header-banner_wrapper div p {
            margin: 0;
            margin-top: 1rem;
            width: 300px;
        }
    }
    @media screen and (min-width: 992px) and (max-width: 1199px) {
        .main-banner_container {
            height: 400px;
            margin-top: 1rem!important;
        }
        .main-banner_wrapper {
            gap: 5rem;
        }
        .main-banner_subtitle {
            /* background-color: var(--color-btn-text); */
            height: 400px;
            display: flex;
            /* gap: .5rem; */
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            padding: 1.5rem 2rem!important;
            margin-right: 2rem;
        }
        .main-banner_subtitle p {
            margin: 0;
            /* font-size: 1rem!important; */
        }
        .main-banner_subtitle div {
            margin-top: 1rem!important
        }
        /* 
         */
         .title-page-section {
            margin-left: 2rem;
         }
         .header-banner_wrapper {
            margin-left: 2.5rem;
            height: 500px; 
            margin-top: 3rem;
        }
        .header-banner_art {
            border-radius: 10rem;
            right: 1rem!important;
        }
        .header-banner_wrapper div h2 {
            font-size: 5rem!important;
        }
        .header-banner_wrapper div p {
            margin: 0;
            margin-top: 1rem;
            width: 450px;
            font-size: 1.5rem;
        }
    }
    @media screen and (min-width: 1200px) {
        .container {
            padding: 0!important;
        }
        .main-banner_container {
            height: 400px;
            margin-top: 0rem!important;
        }
        .main-banner_wrapper {
            gap: 5rem;
        }
        .main-banner_subtitle {
            /* background-color: var(--color-btn-text); */
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            padding: 1.5rem 2rem!important;
            margin-right: 2rem;
        }
        .main-banner_subtitle p {
            margin: 0;
            /* font-size: 1rem!important; */
        }
        .main-banner_subtitle div {
            margin-top: 1rem!important
        }
        /* 
         */
         .title-page-section {
            /* margin-left: 2.5rem; */
            display: none;
         }
         .header-banner_wrapper {
            margin-left: 2.5rem;
            height: 400px; 
            margin-top: 3rem;
        }
        .header-banner_art {
            border-radius: 5rem;
            height: 350px;
            width: 30%!important;
            /* width: 350px!important; */
            right: 3rem!important;
        }
        .header-banner_wrapper div h2 {
            font-size: 7rem!important;
            font-weight: 100!important;
            background-color: var(--color-status-finished);
            padding: 0 1rem!important;
        }
        .header-banner_wrapper div p {
            /* margin-top: 1rem; */
            margin: 0;
            font-size: 1.25rem;
            font-weight: 100;
            text-transform: uppercase;
            /* width: 650px; */
        }
        .header-banner_wrapper div div svg {
            border: 1px solid var(--color-global-text); 
            border-radius: .5rem;
            transition: all .2s ease-in;
            cursor: pointer;
        }
        .header-banner_wrapper div div svg:hover {
            border: 1px solid var(--color-wallet-fund-available-wo);
            background-color: var(--color-wallet-fund-available-wo);
        }
        .header-banner_wrapper div div svg:hover {
            color: var(--color-btn-text)!important;
        } 
        /* 
         */
        .articles_container {
            /* margin-left: 1rem;
            margin-right: 1rem; */
            padding: 1rem;
        }
        .articles_container h3 {
            font-weight: 100;
            margin-left: 1.5rem;
        }
         .blocks_wrapper {
            width: 135vh;
            margin-left: -1rem;
            margin-right: -1rem;
            padding-left: 1rem;
            padding-right: 1rem;
            display: flex;
            overflow-x: scroll;
            gap: 1rem;
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none; 
            padding-bottom: 1rem;
         }
        .blocks_wrapper::-webkit-scrollbar {
            display: none;
            -webkit-appearance: none;
            width: 0;
            height: 0;
        }
        .blocks_wrapper > li {
            height: 200px;
            min-width: 200px;
            display: flex;
            flex-direction: column;
            border-radius: var(--bs-border-radius);
            align-items: center;
            /* padding: .5rem; */
            justify-content: center;
            color: var(--color-btn-bg);
            background-color: var(--color-btn-hover-bg);
            position: relative;
            cursor: pointer;
            transition: box-shadow .2s ease-in;
        }
        .blocks_wrapper > li:hover {
            box-shadow: var(--hover-shadow);
        }
        .blocks_wrapper > li .block_available {
            position: absolute;
            bottom: 0;
            left: 0;
            /* padding: .2rem 0; */
            /* background-color: var(--color-btn-bg); */
            width: 100%;
            margin: 0;
            text-align: center;
        }
        .blocks_wrapper > li .block_available p {
            margin: 0;
            padding: .2rem 0;
        }
        .blocks_wrapper > li .block_available p span {
            color: var(--color-btn-text);
        }
        .blocks_wrapper > div > p {
            font-size: .8rem;
            color: var(--color-btn-bg);

        }
        /* 
         */
         .price_wrapper {
            border-radius: var(--bs-border-radius);
            margin: 0 1rem;
            margin-top: 1rem;
        }
        .price_wrapper h3 {
            margin-left: 1rem;
            margin-top: 1rem;
            color: var(--color-global-text);
        }
        .price_wrapper ul{
            display: grid;
            grid-template-columns: repeat(3, 1fr)!important;
            gap: 1rem;
        }
        /* 
         */
        #popup_feature main {
            background-color: lightblue;
        }
        #popup_feature footer {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: var(--color-global-baackground_light);
            border-bottom-left-radius: var(--bs-border-radius);
            border-bottom-right-radius: var(--bs-border-radius);
        }

        /* 
         */
        .about-section_container {
            background-color: var(--color-global-text)!important; 
            margin: 1rem; 
            margin-top: 2rem; 
            border-radius: 1rem; 
            padding: 1.5rem; 
            font-weight: 100;
            display: flex;
            gap: 1rem;
        }
        .about-section_container li ul {
            padding: 0;
        }
        .about-section_container li ul li {
            cursor: pointer;
        }
        /* .about-section_container li ul li:hover {
            border-bottom: 1px solid red;
        } */

        /* 
         */
        .value_wrapper {
            padding: 1rem;
        }
        .value_wrapper h3 {
            margin-left: 1.5rem;
            font-weight: 100;
        }
        .value_wrapper > div{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            width: 100%;
            margin-top: 1rem;
            gap: 1rem;
            row-gap: 2rem;
            /* width: 100vw; */
            /* margin-left: -1rem; */
            /* margin-right: -1rem; */
            /* padding-left: 1rem; */
            /* padding-right: 1rem; */
            /* display: flex; */
            /* gap: 1rem; */
            /* display: grid; */
            /* grid-template-columns: repeat(4, 1fr); */
            /* overflow-x: none;
            -ms-overflow-style: none;
            scrollbar-width: unset;  */
        }
        .value_wrapper > div > div{
            /* min-width: 300px; */
            background-color: var(--color-operation-type-donation);
            /* border: 1px solid var(--color-btn-wo-bg); */
            border-radius: var(--bs-border-radius);
            padding: 1rem;
            padding-bottom: 5rem;
            position: relative; 
            /* padding-bottom: 4rem; */
        }
        .value_wrapper > div > div > .value_btn {
            background-color: var(--color-urgency-low-10);
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            border-bottom-left-radius: var(--bs-border-radius);
            border-bottom-right-radius: var(--bs-border-radius);
            padding: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .value_wrapper > div > div > .value_btn:hover {
            background-color: var(--color-wallet-fund-available-wo);
        }
        .value_wrapper > div > div > .value_btn > p {
            text-align: center;
        }
    }
</style>