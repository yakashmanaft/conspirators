<template>
  <Container>

    <div class="show-max-767">
      <BreadCrumbs/>
      <h1 style="font-weight: bold; font-size: 42px; margin: 0;" >Помощь</h1>
    </div>

    <Chip
      style="margin-top: 1rem;"
      :tabs="[
        {
          id: 1,
          name: 'knowledge_base',
          title: 'База знаний'
        }, 
        {
          id: 2,
          name: 'faq',
          title: 'FAQ'
        },
        {
          id: 3,
          name: 'about',
          title: 'О проекте'
        },
        {
          id: 4,
          name: 'safety',
          title: 'Безопасность'
        }
      ]"
      :default="current_article"
      :btn_all_exist="false"
      @changed="change_article_func"
    ></Chip>

    <div class="section_container">
      
      <!-- knowledge_base -->
      <div v-if="current_article.name === 'knowledge_base'">
        knowledge_base
      <!--  -->
      <div>
        <h2>База знаний</h2>
  
        <h3>For people</h3>
        <h4>Мой кошелек</h4>
        <p>Сводим в едином виде свободные средства, инвестированные деньги в различные инвестиционные темчики, а также осуществлякется учет долгов</p>
        <ul>
          <li>
            <h5>Группировка фондов по личному фонду или бандам</h5>
            <p>Выбор банды, в которой участвует пользваотель или демонстрация его личных средств</p>
          </li>
          <li>
            <h5>Показывает total cap</h5>
            <p>Всех средств по выбранному личном фонду или бандывсех средств по выбранному личном фонду или банды</p>
          </li>
          <li>
            <h5>Переключатель групп мешков</h5>
            <p>Всех средств по выбранному личном фонду или бандывсех средств по выбранному личном фонду или банды</p>
            <!--  -->
            <h6>Available CAP</h6>
            <p>Изначально выбранный переключатель, отображает капитализацию свободных средств (на накопительных счетах, на картах, в наличке... то есть все то, к чему имеется быстрый доступ и вы можете воспользоваться деньгами немедленно)</p>
            <h6>Invested deposit CAP</h6>
            <p>Объем средств на вкладах. Чобы изьять понадобится время</p>
            <h6>Invested crypto CAP</h6>
            <p>Общая сумма в крипте (биржи, кошельки, стейкинг)</p>
            <h6>Invested loan CAP</h6>
            <p>Показывает сумму общего долга. По сути это капитал  выраженный в долгах.ы</p>  
          </li>
          <li>
            <h5>Список мешков</h5>
            <!--  -->
            <p>Каждая элемент фонда называем Мешок. Мешок может быть иметь быстрый доступ (Накопительные счета или наличка), а также инвестиционные мешки (Брокерские счета, Криптокошельки и другие). По сути, мешки - это ваши и накопления и вложения. Накапливайте средства в мешках, зарабатывайте и складывайте в мешки.</p>
            <p>Однако, бывают и долговые мешки... следиите за ними, чтобы значит кому вы или ваши общаки задолжали.</p>
            <!--  -->
            <h6>Свободные средства</h6>
            <p>денежныее средства, операции с которым вы можете совершить прямо сейчас, без потребности в выводне / снятии</p>
            <ul>
              <li>Накопительные счета</li>
              <li>Наличка</li>
            </ul>
            <!--  -->
            <h6>Фонда</h6>
            <p>Брокерские счета разных участников. Участники могут иметь разный статус, доли. Участниками могут быть как Частные лица, так и Соучастники в разных долях. Все средства лежат на брокерский счетах одного, из выбранных в качестве управленца, соучастника</p>
            <p>Кнопка "Обноввить котировки"</p>
            <p>Так как это всё хэнд-мэйд... то и котировки по фонде мы получаем от оракула по запросу... и пока только московская биржа...</p>
  
            <h6>invested-loan</h6>
            <p>Выданные кредиты считаются немного по-другому; В БД всех мешков указан storageID, езде ноль, но для кредита указывается месссто куда ппроисходит оплата кредита, по сути тот же мешок. А так как возвращенные средства по кредиту тут  же становятся available (Высвободившимися средствами) - помещаем их в указанный storageID</p>
            <p>Процентные или без</p>
            <p>В общей оценке стоимости по группе, показываем суммы инвестирования + % по финансированию (По сути, ожидаемая к возврату капитал...)</p>
            <p>Аналогично, по каждой группировке мешков...</p>
            <p>Все мешки в листе показывают остаток к возврату (тело + %). Если погашен - показываем статус "Завершен" и указываем результат финансирования, выраженный в текущей выбранной валюте.</p>
            <p>Если, по какой-то причине конспиратор прислал больше средств, чем указано в качестве остатка - на главной панели секции к выплате будет указано 0.00, так как ну спасибо помог богатству семьи. </p>
            <p>Процентные или без</p>
            <h6>debt-loan</h6>
            <p>В общей оценке стоимости по группе, показывает суммы со знаком минус, если увмидели знак плюс - возможно какой-то кредитор даже и должен вам)</p>
            <p>Аналогично, с конкретным финансированием в отдельности</p>
            <p></p>
            <p>Если, по какой-то причине конспиратор прислал больше средств, чем указано в качестве остатка - на главной панели секции долговые обязательства будет указано 0.00, так как ну спасибо помог богатству семьи. </p>
            <p>В самих мешках из листа... </p>
            <p>В обычной ситуации в мешках указываем сколько уже выплатили, сколько уже выплатили, %, тело</p>
            <p>При погашении - стоит статус "Завершен" и шутливая надпись "+1 к карме", за отсутствие задолженности... Может в дальнейшем получится реализовать каку-либо механику по баллам кармы :D. Либо, +1 к щедрости (сумму переплаты), при случайном переводе сверх задолженности</p>
            
            <p>Процентные или без</p>
          </li>
          <li><h5>Транзакции по выбранной группе мемшков</h5></li>
        </ul>
  
        <h3>Development for marketing</h3>
        <p></p>
  
        <h3>development for builders</h3>
        <div
          class="article_wrapper"
          v-for="article in articles.sort((x, y) => {
            if (x.title < y.title) {
              return -1;
            }
            if (x.title > y.title) {
              return 1;
            }
          })"
        >
          <h3>{{ article.title }}</h3>
          <p>{{ article.text }}</p>
          <!--  -->
          <div
            v-for="element in article_elements.filter(
              (element) => element.parent_article_id === article.id
            )"
          >
            <h4>{{ element.title }}</h4>
            <p>{{ element.text }}</p>
            <!--  -->
            <div
              v-for="part in element_parts.filter(
                (part) => part.parent_element_id === element.id
              )"
            >
              <h5>{{ part.title }}</h5>
              <!-- <img :src="part.img_code" alt=""> -->
              {{ part.img_code }}
              <p>{{ part.desc }}</p>
              <ul>
                <!-- Как сделать сплит через переиспользуемую в дальнейшем функцию? п типу make_text_splt(part.text, '*|*') -->
                <li v-for="part_paragraph in part.text?.split('*|*')">
                  {{ part_paragraph }}
                </li>
              </ul>
              <!--  -->
              <div
                v-for="segment in part_segments.filter(
                  (segment) => segment.parent_part_id === part.id
                )"
              >
                <h6>{{ segment.title }}</h6>
                <ul>
                  <li v-for="segment_paragraph in segment.text?.split('*|*')">
                    {{ segment_paragraph }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
      </div>
      <!-- faq -->
      <div v-if="current_article.name === 'faq'">
        faq
        <section>
          <ul>
            <li>
              <p style="margin: 0;">как получить аллокацию от соучастников</p>
              <p style="margin: 0;">Следить за новостями и быть среди первых. <span>Whitepaper</span></p>
            </li>
          </ul>
        </section>
        <!-- FOUNDERS -->
        <section>
          <h3>Не нашли своего ответа? напишите нам в тг</h3>
          <ul>
            <li>
              <p><span><nuxt-link to="tg://resolve?domain=Kashmanaft">@Kashmanaft</nuxt-link></span></p>
            </li>
            <!-- <li>
              <p><span><nuxt-link to="tg://resolve?domain=JohnnyHypnotic">@JohnnyHypnotic</nuxt-link></span></p>
            </li> -->
          </ul>
        </section>
      </div>
      <!-- about -->
       <div v-if="current_article.name === 'about'">
        aabouut
        <!-- FOUNDERS -->
        <section>
          <h3>Founders of conspirators:</h3>
          <ul>
            <li>
              <p><span><nuxt-link to="tg://resolve?domain=Kashmanaft">@Kashmanaft</nuxt-link></span></p>
            </li>
            <li>
              <p><span><nuxt-link to="tg://resolve?domain=JohnnyHypnotic">@JohnnyHypnotic</nuxt-link></span></p>
            </li>
          </ul>
        </section>
  
        <!-- cnsprtrs.CRM -->
        <section>
          <h3>cnsprtrs.CRM</h3>
          <ul>
            <li>
            <nuxt-link to="/landing_crm">О проекте </nuxt-link>
          </li>
          </ul>
        </section>
  
        <!-- TG BOTs -->
        <section>
          <h3>Bots to help:</h3>
          <p>Упрощают работу с сервисом</p>
          <ul>
            <li @click="run_bot_func()">
              <nuxt-link to="tg://resolve?domain=Conspirators_bot">@Conspirators_bot</nuxt-link>
            </li>
          </ul>
        </section>
  
        <!-- ICONS, IMG -->
        <section>
          <h3>Материалы</h3>
          <p>Используемые в conspirators</p>
          <ul>
            <li>
              <p>Иконки:            <span>
            <nuxt-link to="https://ru.freepik.com/icon/feature_16993811#fromView=keyword&page=1&position=50&uuid=5381befd-cda2-46de-bc16-3d8fd1409101" target="_blank">sonnycandra</nuxt-link>
          <!-- https://ru.freepik.com/author/sonnycandra/icons -->
          </span></p>
            </li>
          </ul>
        </section>
  
        <!-- REFERENCES -->
        <section>
          <h3>References:</h3>
          <ul>
  
            <li><p><span><nuxt-link to="https://texterra.ru/privacy-policy/" target="_blank">https://texterra.ru/privacy-policy/</nuxt-link></span></p></li>
          </ul>
        </section>
       </div>
       <!-- safety -->
       <div v-if="current_article.name === 'safety'">
        safety
        <ul>
          <li>
            <nuxt-link to="/policy">Политика конфиденциальности</nuxt-link>
          </li>
        </ul>
       </div>
    </div>



    <br />
    <br />
  </Container>
</template>

<script lang="ts" setup>
useHead({
  title: "Помощь",
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      integrity:
      "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH",
      crossorigin: "anonymous",
      type: "text/css",
    },
  ],
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
      integrity:
      "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz",
      crossorigin: "anonymous",
    },
  ],
});
// Shared
import { Container } from "@/shared/container";

// Components
import { BreadCrumbs } from "@/components/breadcrumbs";
import { Chip } from "@/components/chip"

// Func
import {launch_bot}  from '@/server/bot'

const run_bot_func =  () => {
  console.log(123)
  launch_bot()
}


// ПЕРЕМЕННЫЕ
const current_article = ref({
  id: 3,
  name: 'about',
  title: 'О проекте',
})

// Парсить несколько бд и мапить новый массив
// db список разделов
// id | article_name | article_paragraph
const articles = ref([
  {
    id: 1,
    name: "projects-list",
    title: "Список проектов",
    type: "modules",
    text: "",
  },
  {
    id: 2,
    name: "current-project",
    title: "Конкретный проект",
    type: "modules",
    text: "",
  },
  {
    id: 3,
    name: "warehouse",
    title: "Список тмц",
    type: "modules",
    text: "",
  },
  {
    id: 4,
    name: "warehouse-item",
    title: "Конкретный тмц",
    type: "modules",
    text: "",
  },
  {
    id: 5,
    name: "list-sharers",
    title: "Соучастники",
    type: "modules",
    text: "",
  },
  {
    id: 6,
    name: "current-sharer",
    title: "Конкретный соучастник",
    type: "modules",
    text: "Общая информация по соучастнику",
  },
  {
    id: 7,
    name: "current-band",
    title: "Конкретная банда",
    type: "modules",
    text: "",
  },
  {
    id: 8,
    name: "dasboard",
    title: "Доска",
    type: "modules",
    text: "",
  },
]);

// db элементы разделов
// id | element_title | element_paragraph
const article_elements = ref([
  {
    id: 1,
    parent_article_id: 2,
    title: "Вкладки",
    text: "Доступны в зависимости от статуса пользователя: partner / creator / curator / else",
  },
  {
    id: 2,
    parent_article_id: 3,
    title: "Фильтрация предметов",
    text: 'При загрузке страницы <router-link to="/warehouse" class="link">ТМЦ</router-link> пользователю выводится список предметов',
  },
  {
    id: 3,
    parent_article_id: 5,
    title: "Банды",
    text: "К показу представляется список банд",
  },
  {
    id: 4,
    parent_article_id: 5,
    title: "Соучастники",
    text: "К показу представляется список соучастников",
  },
  {
    id: 5,
    parent_article_id: 6,
    title: "Вкладки",
    text: "Доступны в зависимости от статуса пользователя: partner / creator / curator / else",
  },
  {
    id: 6,
    parent_article_id: 7,
    title: "Вкладки",
    text: "Доступны в зависимости от статуса пользователя: partner / creator / curator / else",
  },
  {
    id: 7,
    parent_article_id: 8,
    title: "Проекты",
    text: 'Модуль называется "Текущие", так как отображаются текущие преокты, которые на данный момент в процессе. Показыаем просто количество, при клике на модуль - попадаем в раздел проектов.',
  },
]);

// db подэлементы элементов
// text must be splited by sign *|*
const element_parts = ref([
  {
    id: 1,
    parent_element_id: 1,
    title: "Условия доступа к вкладкам",
    img_code: "#img#id0234#",
    text: 'Если пользователь является partner / creator / curator видит все Вкладки *|* Если пользователь числится в соучастниках по проекту видит: "План-график", "Заявки", "Соучастники", "ТМЦ" *|* Если пользователь является else - только "Соучастники"',
  },
  {
    id: 2,
    parent_element_id: 1,
    title: "План-график",
    img_code: "",
    text: null,
  },
  {
    id: 3,
    parent_element_id: 1,
    title: "Соучастники",
    img_code: "",
    text: null,
  },
  {
    id: 4,
    parent_element_id: 2,
    title: "Условия показа",
    img_code: "#img#id0234#",
    text: 'Пользователь является собственником предмета *|* Пользователь является ответственным по предмету (в случае, если флаг "Показывать всем в банде" отключен) *|* Предметы банды, если пользователь является участников банды *|* Предметы яльянса, если банда, соучастником которой является пользователь *|* Предметы других пользователей, если они состоят в банде или альянсе, как и сам пользователь',
  },
  {
    id: 5,
    parent_element_id: 2,
    title: "Скрытие показа предмета на складе",
    img_code: "#img#id0234#",
    text: "Если пользователем является собственником предмета, он может скрыть предмет от показза другим участникам банды/альянса. *|* Скрытый предмет будет видеть только собствевннику и, если указан,  ответственному по данному предмету.",
  },
  {
    id: 6,
    parent_element_id: 5,
    title: "Заявки",
    text: "Доступна, если пользователь находится на своей странице соучастника",
  },
  {
    id: 7,
    parent_element_id: 5,
    title: "Проекты",
    text: "Доступна всем",
  },
  {
    id: 8,
    parent_element_id: 5,
    title: "Банды",
    text: "Доступна всем",
  },
  {
    id: 9,
    parent_element_id: 5,
    title: "Фонды",
    text: "Доступна, если пользователь находится на своей странице соучастника",
  },
  {
    id: 10,
    parent_element_id: 5,
    title: "ТМЦ",
    text: "Доступна, если пользователь находится на своей странице соучастника",
  },
  {
    id: 11,
    parent_element_id: 6,
    title: "Соучастники",
    text: "Всем. Показываем список соучастников (соучастники, банды). В случае, если никог онет - В банде нет соучастников / В составе нет банд",
  },
  {
    id: 12,
    parent_element_id: 6,
    title: "Проекты",
    text: "Если сессионный пользователь состоит в данной банде или явялется её создателем",
  },
  {
    id: 13,
    parent_element_id: 6,
    title: "ФОТ",
    desc: null,
    text: "Когда нет ни одной таблицы ФОТ - можно добавлять новый. Только после этого будет отображаться какая-либо информация, а именно таблица ФОТ по соучастникам",
  },
  {
    id: 14,
    parent_element_id: 6,
    title: "Учет времени",
    desc: null,
    text: "Когда нет ни одной таблицы ФОТ - можно добавлять новый. Только после этого будет отображаться какая-либо информация, а именно таблица по учету соучастников.",
  },
  {
    id: 15,
    parent_element_id: 6,
    title: "Выполнение",
    desc: null,
    text: 'Когда нет ни одной таблицы ФОТ - можно добавлять новый. Только после этого будет отображаться какая-либо информация. Однако, если нет еще пока Выполнения - при наличии таблиц ФОТ, будет отображаться "Здесь нет выполненных задач."',
  },
  {
    id: 16,
    parent_element_id: 6,
    title: "Фонды",
    desc: null,
    text: null,
  },
  {
    id: 17,
    parent_element_id: 6,
    title: "ТМЦ",
    desc: null,
    text: null,
  },
  {
    id: 18,
    parent_element_id: 7,
    title:
      "Какие проекты учитываются в расчете количества проектов к показу для пользователя:",
    text: "Когда пользователь - создатель проекта *|* Когда пользвоатель является партнером по проекту (просто партнер или заказчик например) *|* Когда пользваотель является участником проекта *|* Когда пользваотель является участником банды, которая участвует в проекте",
  },
]);

// db сегментов part
// text must be splited by sign *|*
const part_segments = ref([
  {
    id: 1,
    parent_part_id: 14,
    desc: null,
    title: "Условия показа",
    text: "Пользователь является создателем текущей банды *|* Пользователь является участником текущей банды *|* Пользователь является участником банды (альянса), в которую входит текущая банда",
  },
  {
    id: 2,
    parent_part_id: 15,
    desc: null,
    title: "Условия показа",
    text: "Пользователь является создателем текущей банды *|* Пользователь является участником текущей банды *|* Пользователь является участником банды (альянса), в которую входит текущая банда",
  },
  {
    id: 3,
    parent_part_id: 16,
    desc: null,
    title: "Условия показа",
    text: "Пользователь является создателем текущей банды *|* Пользователь является участником текущей банды *|* Пользователь является участником банды (альянса), в которую входит текущая банда",
  },
  {
    id: 4,
    parent_part_id: 17,
    desc: null,
    title: "Условия показа",
    text: "Пользователь является создателем текущей банды *|* Пользователь является участником текущей банды *|* Пользователь является участником банды (альянса), в которую входит текущая банда",
  },
]);

// MAKE FUNCs
// ***********************
// make_string_split
const make_string_split = (string: string, sign: string) => {
  let result = string.split("sign");
  return [result];
};
const change_article_func = (obj: any) => {
  current_article.value = obj
}
</script>

<style scoped>
.link {
  text-decoration: none;
}
.link:hover {
  color: var(--bs-primary);
  cursor: pointer;
}

/* ARTICLE */
.article_wrapper {
  border-bottom: 1px solid var(--bs-border-color);
  padding: 1rem 0;
}

.section_container {
  margin-top: 1rem;
}

@media screen and (max-width: 767px) {
  /*  */
  .show-max-767 {
    display: none;
  }
}
</style>
