<script setup>
// components
import { BreadCrumbs } from "@/components/breadcrumbs";

// shared
import { Container } from "@/shared/container";

//
const route = useRoute();

useHead({
  title: "Фонд",
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

// COMPUTED
const current_fund = computed(() => {
  return true
})

// choose title
// const titles = ref([
//   {
//     title: "Активы",
//     name: "assets",
//   },
//   {
//     title: "История",
//     name: "history",
//   },
// ]);
// const currentTitle = ref("assets");

// const listItemType = ref([])

// Инструмент
// tools

// Расходники
// consumables

// Техника
// technic

// Материалы
// stuff

// Находим выбранный ФОНД фондового рынка
// const computedFund = computed(() => funds.value[0]);
// const {
//   pending,
//   error,
//   refresh,
//   data: funds,
//   status,
// } = await useFetch("/api/funds/partnerStockFunds", {
//   lazy: false,
//   transform: (funds) => {
//     return funds.filter((fund) => fund.id === +route.params.id);
//   },
// });

// Ищем транзакции по фонду в трех леджерах (бонды, акции, деньги)
// const computedTransactions = computed(() => {
//     let array = []

//     array = [...transactions_shares.value, ...transactions_bonds.value, ...transactions_fiat.value].filter(transaction => transaction.fundID === +route.params.id)

//     return array
// })
// const { data: transactions_bonds } = await useFetch("/api/funds/stockBondsLedger", {
//     lazy: false,
//     transform: (transactions) => {
//         return transactions
//     }
// })
// const { data: transactions_shares } = await useFetch("/api/funds/stockShareLedger", {
//     lazy: false,
//     transform: (transactions) => {
//         return transactions
//     }
// })
// const { data: transactions_fiat } = await useFetch("/api/funds/stockFiatLedger", {
//     lzay: false,
//     transform: (transactions) => {
//         return transactions
//     }
// })

// Translaters
// const translateStockFundType = (type) => {
//   if(type) {
//     if(type === 'iia') {
//       return 'ИИС'
//     } else if (type === 'ba') {
//       return 'Брокерский счет'
//     }
//   }
// }
</script>

<template>
  <Container v-if="current_fund">

    <!-- TITLE PAGE SECTION -->
    <div class="title-section_container" style="margin-bottom: 0.5rem;">
      <!-- BreadCrumbs -->
      <BreadCrumbs class="show-max-767"/>

      <!--  -->
      <h1 class="show-max-767">Фонд соучастников</h1>
    </div>

    <!-- <h1 class="show-max-767">Фонд {{ computedFund.title }}</h1> -->
    <p>id{{ route.params.id }}</p>
    <!-- <div>
      {{ computedFund }}
    </div> -->

    
    <h2>Параметры фонда</h2>
    <div>
      <p>Капитал: 999 999.00RUB</p>
      <p>Задолженность: 99 999.00RUB</p>
    </div>
    <div>
      <p>Название: ЕС</p>
      <p>Дата старта: ##.##.####</p>
      <p>Текущая доходность: 999%</p>
    </div>

    <h2>Условия фонда</h2>
    <div>
      <p>Еженедельный взнос соучастника: 100.00RUB</p>
      <p>Кредиты: 17%</p>
      <p>Комиссия за управление 0.00RUB</p>
    </div>

    <h3>Структура / Сделки</h3>
    <div>
      <p>Соучастники: Евгений Павловский (50%), Сергей Анфалов(50%)</p>
      <p>Управляющий фонда: Сергей Анфалов</p>
    </div>
    <p>Активы / Стоимость активов / Остаток (свободные средства)</p>

    <!-- Если выбрана структура -->
    <h4>График стоимости фонда</h4>
    <h4>Общая информация(диаграма ппо активам)</h4>

    <!-- Если выбрана Сделки -->
    <h4>Лист сделок</h4>

    <!-- <div>
      <p>Дата создания: {{ computedFund.created_at }}</p>
      <p>Основатель: {{ computedFund.creatorID }}</p>
      <p>Брокер: {{ computedFund.stockBroker.title }}</p>
      <p>Тип счета: {{ translateStockFundType(computedFund.accountType) }}</p>
    </div> -->

    <!-- Кнопки - заголовки -->
    <!-- <h2 class="switch-title_container">
      <div v-for="(title, i) in titles" class="switch-title_el">
        <input
          type="radio"
          :id="i"
          :value="title.name"
          v-model="currentTitle"
        />
        <label :for="i">{{ title.title }}</label>
      </div>
    </h2> -->

    <!-- list of assets -->
    <!-- <div v-if="currentTitle === 'assets'"> -->

        <!--  -->
        <!-- <div v-for="(asset, index) in computedFund.assets">
            {{ asset }}
        </div>
    </div> -->
    <!-- list of history -->
    <!-- <div v-else-if="currentTitle === 'history'"> -->

        <!--  -->
        <!-- <div v-if="!computedTransactions.length">
            Ничего нет...
        </div> -->

        <!--  -->
        <!-- <div v-else>

            <div v-for="(transaction) in computedTransactions">
                {{ transaction.type }} | {{ transaction }}
            </div>
        </div> -->
    <!-- </div> -->
    <!-- list of else -->
    <!-- <div v-else>Ни того, ни другого...</div> -->
  </Container>
</template>

<style scoped>
/*  */
/* .switch-title_container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.switch-title_el input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}
.switch-title_el label {
  color: var(--bs-tertiary-color);
}
.switch-title_el label:hover {
  cursor: pointer;
}
.switch-title_el input[type="radio"]:checked + label {
  color: unset;
} */

@media screen and (max-width: 575px) {
  .show-max-767 {
    display: none;
  }
}
/*  */
@media screen and (min-width: 576px) and (max-width: 767px) {
  .show-max-767 {
    display: none;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {

}
@media screen and (min-width: 992px) and (max-width: 1199px) {

}
@media screen and (min-width: 1200px)  {

}
</style>
