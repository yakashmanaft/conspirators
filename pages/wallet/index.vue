<script setup lang="ts">
// shared
import { Container } from "@/shared/container";
import { Section } from '@/shared/section';

// components
// import { HorizontalCard } from "@/components/card";
// import { StackedCard } from "@/components/card"
import { BreadCrumbs } from "@/components/breadcrumbs"; 
import { Button } from "@/components/button";


// components
import { Chip } from "~/components/chip";

//
const route = useRoute();
const router = useRouter();
// 
const sessionUser = useUserSession().user;
// useProfileStore().loadData()
// const profiles = useProfileStore().profiles

// Chips
//= section fund
const choosenChip_section = ref('available')
// = affiliation
const affiliationFundsChips = ref([
  {
    name: 'all',
    title: 'Всего',
    id: 0
  },
  {
    name: 'mine',
    title: 'Мои',
    id: 1
  },
  {
    name: 'unidrum',
    title: 'Unidrum',
    id: 2
  },
  {
    name: 'AC',
    title: 'АС',
    id: 3
  },
  {
    name: 'EC',
    title: 'ЕС',
    id: 4
  },
  {
    name: 'IS',
    title: 'ИС',
    id: 5
  },
  {
    name: 'Conspirators',
    title: 'Соучастники',
    id: 6
  },
  {
    name: 'JD',
    title: 'ЮД',
    id: 7
  },
  {
    name: 'JS',
    title: 'ЮС',
    id: 7
  }
]) 
const currentAffiliation = ref({
  name: 'all',
  title: 'Всего',
  id: 0
})

// WALLET
//= wallet articles
const wallet_sections = ref([
  {
    title: 'Свободные средства',
    name: 'available',
    total: 136187.50,
    aticles: [

    ]
  },
  {
    title: 'Фонда',
    total: 203705.14,
    name: 'invested_stock',
    aticles: [

    ]
  },
  {
    title: 'Крипта',
    total: 203705.14,
    name: 'invested_crypto',
    aticles: [

    ]
  },
  {
    title: 'Вклады',
    total: 203705.14,
    name: 'invested_deposit',
    aticles: [

    ]
  },
  {
    title: 'Валюта',
    total: 203705.14,
    name: 'invested_currency',
    aticles: [

    ]
  },
  {
    title: 'Выдано кредитов',
    total: 203705.14,
    name: 'credits',
    aticles: [

    ]
  },
  {
    title: 'Старт проекты',
    total: 203705.14,
    name: 'projects',
    aticles: [

    ]
  },
  { 
    title: 'Долг',
    total: 0.00,
    name: 'debt',
    aticles: [

    ]
  }
])



//= wallet articles child (fund group)
// id: String, 
//== group-#
// tagName: String,
//== available, invested_stock, debt
// tagType: String,
//== saving_account, cash
// name: 'Накопительные счета'
const wallet_fund_group = ref([
  {
    id: 'group-1',
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Накопительные счета'
  },
  {
    id: 'group-2',
    tagName: 'available',
    tagType: 'cash',
    name: 'Наличка'
  },
  {
    id: 'group-3',
    tagName: 'invested_stock',
    tagType: 'mutual_funds',
    name: 'ПИФы'
  },
  {
    id: 'group-4',
    tagName: 'invested_stock',
    tagType: 'brokerage_account',
    name: 'Брокерские счета'
  },
  {
    id: 'group-4',
    tagName: 'invested_crypto',
    tagType: 'crypto-wallet',
    name: 'Кошельки'
  },
])
//= conspirators funds

const conspirators_fund = ref([
  {
    id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'LambOfArt BOT',
    brokerTag: 'SBER',
    invested: 4178.70
  },
  {
    id: 2,
    tagName: 'invested_stock',
    tagType: 'brokerage_account',
    name: 'BOT',
    brokerTag: 'T-Bank',
    invested: 141694.55
  },
  {
    id: 2,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Запасы',
    brokerTag: 'SBER',
    invested: 34.05
  },
  {
    id: 4 ,
    tagName: 'invested_stock',
    tagType: 'mutual_funds',
    name: 'Фонд локальный',
    brokerTag: 'SBER',
    invested: 308.75
  },
  {
    id: 5,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЕС',
    brokerTag: 'SBER',
    invested: 4681.41
  },
  {
    id: 6,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'АС',
    brokerTag: 'SBER',
    invested: 5385.01
  },
  {
    id: 7,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЮС',
    brokerTag: 'SBER',
    invested: 513.46
  },
  {
    id: 8,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ДомИнввест',
    brokerTag: 'SBER',
    invested: 3362.37
  },
  {
    id: 9,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Юнидрам',
    brokerTag: 'VTB',
    invested: 3090.64
  },
  {
    id: 10,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЕС',
    brokerTag: 'VTB',
    invested: 350.55
  },
  {
    id: 11,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЮС',
    brokerTag: 'VTB',
    invested: 5.08
  },
  {
    id: 12,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЮД',
    brokerTag: 'VTB',
    invested: 1.43
  },
  {
    id: 13,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Купоны',
    brokerTag: 'Yandex',
    invested: 531.73
  },
  {
    id: 14,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Станция',
    brokerTag: 'Yandex',
    invested: 53599.28
  },
  {
    id: 14,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЕС',
    brokerTag: 'Yandex',
    invested: 23767.03
  },
  {
    id: 15,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЕС ФИИ',
    brokerTag: 'Yandex',
    invested: 265.48
  },
  {
    id: 16,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЮС',
    brokerTag: 'Yandex',
    invested: 1726.05
  },
  {
    id: 17,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Соучастники',
    brokerTag: 'Yandex',
    invested: 2194.12
  },
  {
    id: 18,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Соучастники ФИИ',
    brokerTag: 'Yandex',
    invested: 1421.14
  },
  {
    id: 19,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЮД',
    brokerTag: 'Yandex',
    invested: 1128.00
  },
  {
    id: 20,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЮС',
    brokerTag: 'T-Bank',
    invested: 510.66
  },
  {
    id: 21,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Юнидрам',
    brokerTag: 'T-Bank',
    invested: 5547.09
  },
  {
    id: 21,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ИС',
    brokerTag: 'Renesans',
    invested: 9467.49
  },
  {
    id: 21,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Магнит',
    brokerTag: 'Renessans',
    invested: 3687.60
  },
  {
    id: 22,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ИС',
    brokerTag: 'BCS',
    invested: 379.51
  },
])

// COMPUTED
// conspirators_fund
const conspirators_fund_computed = computed(() => {


  const array = [...conspirators_fund.value].filter((fund) => {
    return fund.tagName === choosenChip_section.value
  })

  return array
})

// HELPERS
//= filter funds by group
const filteredFundByGroupName = (groupType: string, fundsArray: any) => {
  const result = [...fundsArray].filter(el => el.tagType === groupType)
  
  return result
}


// data base

useHead({
  title: "Мой кошелек",
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

onMounted(() => {
  const scrollContainer = document.getElementById("fund-block");
  const scrollAffiliationContainer = document.getElementById("affiliation-chip-block")

  scrollContainer?.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
  });

  scrollAffiliationContainer?.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollAffiliationContainer.scrollLeft += evt.deltaY;
  });
})

// EMITS FUNCTIONs

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

// CLICK
//= changeChipAffiliation
const changeChipAffiliation = (obj: any) => {
  currentAffiliation.value = obj
}

// Colorized
//= set_bgColor
const set_bgColor = (section: any) => {
  let color;

  // ****** Title ******
  if(section.name) {

    // Свободные средства
    if(section.name === 'available') {
      if(choosenChip_section.value === section.name) {
        // color = `var(--color-wallet-fund-available-wo)`
        color = `var(--color-wallet-fund-available)`
      } else {
        // color = `var(--color-wallet-fund-available)`
      }
    } 
    if(section.name === 'invested_stock') {
      if(choosenChip_section.value === section.name) {
        // color = `var(--color-wallet-fund-invested-wo)`
        color = `var(--color-wallet-fund-invested)`
      } else {
        // color = `var(--color-wallet-fund-invested)`
      }
    }
    if(section.name === 'invested_crypto') {
      if(choosenChip_section.value === section.name) {
        // color = `var(--color-wallet-fund-invested-wo)`
        color = `var(--color-wallet-fund-invested)`
      } else {
        // color = `var(--color-wallet-fund-invested)`
      }
    }
    if(section.name === 'invested_deposit') {
      if(choosenChip_section.value === section.name) {
        // color = `var(--color-wallet-fund-invested-wo)`
        color = `var(--color-wallet-fund-invested)`
      } else {
        // color = `var(--color-wallet-fund-invested)`
      }
    }
    if(section.name === 'invested_currency') {
      if(choosenChip_section.value === section.name) {
        // color = `var(--color-wallet-fund-invested-wo)`
        color = `var(--color-wallet-fund-invested)`
      } else {
        // color = `var(--color-wallet-fund-invested)`
      }
    }
    if(section.name === 'credits') {
      if(choosenChip_section.value === section.name) {
        // color = `var(--color-wallet-fund-invested-wo)`
        color = `var(--color-wallet-fund-invested)`
      } else {
        // color = `var(--color-wallet-fund-invested)`
      }
    }
    if(section.name === 'projects') {
      if(choosenChip_section.value === section.name) {
        // color = `var(--color-wallet-fund-invested-wo)`
        color = `var(--color-wallet-fund-invested)`
      } else {
        // color = `var(--color-wallet-fund-invested)`
      }
    }
    if(section.name === 'debt') {
      if(choosenChip_section.value === section.name) {
        // color = `var(--color-wallet-fund-debt-wo)`
        color = `var(--color-wallet-fund-debt)`
      } else {
        // color = `var(--color-wallet-fund-debt)`
      }
    }
    else {
      // color = null
    }
  }

  return color
}

// WATCh
//= choosenChip_section
watch(choosenChip_section, () => {
  console.log(`Переключили вкладку на ${choosenChip_section.value}`)
})
</script>

<template>
  <Container>

    <div class="show-max-767" >
      <BreadCrumbs/>
      <!-- TITLE -->
      <h1 style="font-weight: bold; font-size: 42px;">Мой кошелек</h1>
    </div>

    <!-- <p style="margin: 0; margin-left: 1rem;">session: {{ sessionUser }}</p>
    <p style="margin: 0; margin-left: 1rem;">{{ currentAffiliation }}</p> -->



    <!-- CHIPs -->
    <Chip
      id="affiliation-chip-block"
      :tabs="affiliationFundsChips"
      :default="currentAffiliation"
      :btn_all_exist="false"
      @changed="changeChipAffiliation"
      style="margin-top: 1rem;"
    />
    <!-- <chip
      :tabs="[
        {
          title: 'Личный',
          name: 'personal',
          id: null
        },
        {
          title: 'bankOfTwo(EC)',
          name: 'bank-of-two_ec',
          id: 1
        },
        {
          title: 'bankOfTwo(MC)',
          name: 'bank-of-two_mc',
          id: 7 
        },
        {
          title: 'bankOfTwo(EC)',
          name: 'bank-of-two_ec',
          id: 1
        },
      ]"
      :default="{
        title: 'Все',
        name: 'all',
        id: null,
      }" 
      :btn_all_exist="true"
      @changed="emittedChip_bank"
    /> -->
    <!-- TOTAL -->
    <div style="margin-top: 1rem; display: flex; align-items: center; gap: 1rem;">
      <p style="margin: 0;">~1 500 000.00RUB</p>
      <Button v-if="currentAffiliation.id !== 0" type="pseudo-btn" :link="`/fund/${currentAffiliation?.id}`">Подробнее</Button>

    </div>

    <!-- === INFO SECTION === -->
    <div id="fund-block" class="wallet-section_container">

      <Section 
        v-for="section in wallet_sections" 
        :bg="set_bgColor(section)" 
        :fDirection="`column`" 
        class="section-header_wrapper"
        @click="choosenChip_section = section.name"
      >
        
        <!-- section header -->
        <header>
          <h2 :style="choosenChip_section === section.name ? 'color: #fff' : 'color: unset'" style="text-wrap: nowrap; font-size: unset; font-weight: unset;">{{ section.title }}</h2>
          <p :style="choosenChip_section === section.name ? 'color: #fff' : 'color: unset'" style="margin: 0; text-wrap: nowrap;">{{ section.total }} RUB</p>
          <p v-if="section.name === 'invested_stock'" style="font-size: 0.8rem; font-weight: normal;">ROI 10%(+3736.00RUB)</p>
        </header>

        <!-- section articles -->   
        <!-- <HorizontalCard>123</HorizontalCard>
        <StackedCard>2704Кредит2024 | 275 734.00 P</StackedCard>
        <StackedCard>Брокерский счет (Тинькофф) | 275 734.00 P</StackedCard> -->
      </Section>

    </div>

    <!--  -->
    <div>

      <!-- available -->
      <h3 style="font-size: 2rem; font-weight: bold;" v-if="choosenChip_section === 'available'">Available by {{ currentAffiliation.title }}</h3>
      <h3 style="font-size: 2rem; font-weight: bold;" v-if="choosenChip_section === 'invested_stock'">Invested stock by {{ currentAffiliation.title }}</h3>
      <h3 style="font-size: 2rem; font-weight: bold;" v-if="choosenChip_section === 'invested_crypto'">Invested crypto by {{ currentAffiliation.title }}</h3>
      <h3 style="font-size: 2rem; font-weight: bold;" v-if="choosenChip_section === 'invested_deposit'">Invested deposit by {{ currentAffiliation.title }}</h3>
      <h3 style="font-size: 2rem; font-weight: bold;" v-if="choosenChip_section === 'invested_currency'">Invested currency by {{ currentAffiliation.title }}</h3>
      <h3 style="font-size: 2rem; font-weight: bold;" v-if="choosenChip_section === 'credits'">Given credits by {{ currentAffiliation.title }}</h3>
      <h3 style="font-size: 2rem; font-weight: bold;" v-if="choosenChip_section === 'projects'">Start projects by {{ currentAffiliation.title }}</h3>
      <h3 style="font-size: 2rem; font-weight: bold;" v-if="choosenChip_section === 'debt'">Debt by {{ currentAffiliation.title }}</h3>
    </div>


    <!-- ALL -->
    <!--  -->
     <section class="current-fund_container">
       <div class="current-fund_wrapper">

        <!-- GROUP FUND -->
        <section v-for="group in wallet_fund_group.filter(el => el.tagName === choosenChip_section)">
          <header>
            <h4>{{ group.name }}</h4>
          </header>

          <main>
            <!-- LENGTH -->
            <section 
              v-if="filteredFundByGroupName(group.tagType, conspirators_fund_computed).length"
              style="display: flex; gap: 1rem; flex-wrap: wrap;"  
            >

              <Section 
                style="cursor: pointer; max-width: 200px"
                v-for="fund in filteredFundByGroupName(group.tagType, conspirators_fund_computed)"
                @click="$router.push(`mesh/${fund.id}`)"  
              >
                {{ fund }}
              </Section>
            </section>
            <!-- !LENGTH -->
            <section v-else>
              <div>В этом мешке пусто...</div>
            </section>

          </main>

        </section>
   
        
        <!-- INVESTED STOCk-->
        <!--  -->
        <div v-if="choosenChip_section === 'invested_stock'">

          <!-- ПИФЫ -->
          <div class="fund-el_contatiner">
            <section>
              <header>ПИФЫ</header>
              <main>
                <ul>
                  <li><p>Фонд Локальнй <span>308,75RUB</span></p></li>
                  <li><p>Фонд российских облигаций <span>321,63RUB</span></p></li>
                  <li><p>Фонд Накопительный <span>329,89RUB</span></p></li>
                </ul>
              </main>
            </section>
          </div>

          <!-- БРОКЕРСКИЕ СЧЕТА -->
          <div class="fund-el_contatiner">
            <section>
              <header>Брокерские счета</header>
              <main>
                <ul>
                  <li><p>Инвесткопилка <span>866,46RUB</span></p></li>
                  <li><p>Валюта <span>0,60RUB</span></p></li>
                  <li><p>Камини <span>2679,06RUB</span></p></li>
                  <li><p>BOT <span>141694,55RUB</span></p></li>
                  <li><p>Сбер Личный <span>108054,97RUB</span></p></li>
                  <li><p>Альфа-Инвестиции Личный <span>217,56RUB</span></p></li>
                  <li><p>ИС Без имени <span>5660,71</span></p></li>
                  <li><p>ИС <span>15092,99RUB</span></p></li>
                  <li><p>Кит Финанс Личный <span>0,00RUB</span></p></li>
                  <li><p>Цифра Брокер Личный <span>0,00RUB</span></p></li>
                </ul>
              </main>
            </section>
          </div>

        </div>

        <!-- INVEVSTED CRYPTO -->
        <div v-if="choosenChip_section === 'invested_crypto'">
          <!-- КРИПТА -->
          <div class="fund-el_contatiner">


          <section>
          <header>Крипта</header>
          <main>
          <!-- Кошельки -->
          <ul>
          <li>
          <p>Кошельки <span>51265.46RUB</span></p>
          <ul>
          <li><p>MetaMask <span>234.91USD (~23164.57)RUB</span></p></li>
          <li><p>Phantom <span>284.97USD (~28100.89RUB)</span></p></li>
          </ul>
          </li>
          <li>
          <p>Балансы Бирж <span>0,00RUB</span></p>
          <ul>
          <li><p>Binance <span>0,00RUB</span></p></li>
          </ul>
          </li>
          <li>
          <p>Стейкинг <span>~2289,72RUB</span></p>
          <ul>
          <li><p>MTT Network <span>258 MTT (~2289,72RUB)</span></p></li>
          </ul>
          </li>
          </ul>
          <ul>
          <li>Не вкидывали в крипту</li>
          </ul>
          </main>
          </section>

          </div>
        </div>

        <!-- INVESTED DEPOSIT -->
        <!--  -->
        <div v-if="choosenChip_section === 'invested_deposit'">
          <!-- БАНКОВСКИЕ ВКЛАДЫ -->
          <div class="fund-el_contatiner">
          <section>
            <header>Банковские вклады</header>
            <main>
              <ul>
                <!-- <li>Сбербанк</li> -->
                  <li>Нет вкладов</li>
              </ul>
            </main>
          </section>
          </div>
        </div>

        <!-- INVESTED CURRENCY -->
        <div v-if="choosenChip_section === 'invested_currency'">
          <!-- ВАЛЮТНЫЕ СЧЕТА -->
          <div class="fund-el_contatiner">
            <section>
              <header>Валютные счета</header>
              <main>
                <ul>
                  <li><p>Доллар <span>10,00USD (982,64RUB)</span></p></li>
                  <li><p>Юань <span>271,00CNY (3661,24RUB)</span></p></li>
                  <li><p>Гонконгский доллар <span>21,00HKD (265,41)</span></p></li>
                </ul>
              </main>
            </section>
          </div>
        </div>

        <!-- CREDITS -->
        <!--  -->
        <div v-if="choosenChip_section === 'credits'">

          <!-- ВЫДАННЫЕ КРЕДИТЫ -->
          <div class="fund-el_contatiner">

            <section>
              <header>Выданные кредиты</header>
              <main>
                <ul>
                  <li><p><span>ЮС</span> 1002Кредит22 <span>-7501,411RUB</span></p></li>
                  <li>Не выдавали кредиты</li>
                </ul>
              </main>
            </section>

          </div>
        </div>
   
        <!-- PROJECTS -->
        <!--  -->
        <div v-if="choosenChip_section === 'projects'">

          <!-- ПРОЕКТЫ -->
          <div class="fund-el_contatiner">
          <section>
            <header>Проекты</header>
            <main>
              <ul>
                <li><p><span>ЕС</span> 1602РАТСА19 <span>-1206.34RUB</span></p></li>
                <li>Не инвестировали в проекты</li>
              </ul>
            </main>
          </section>
          </div>

          <!-- ПРОЧЕЕ -->
          <div class="fund-el_contatiner">

          <section>
            <header>Прочее</header>
            <main>
              <ul>
                <li>Нет инвестиций</li>
              </ul>
            </main>
          </section>

          </div>
        </div>

        <!-- DEBT -->
        <!--  -->
        <div v-if="choosenChip_section === 'debt'">

          <!-- ПРОПУЩЕННЫЕ ВЗНОСЫ -->
          <div class="fund-el_contatiner">

            <section>
              <header>Пропущенные взносы</header>
              <main>
                <ul>
                  <li>
                    <p>Мои</p>
                    <ul>
                      <li>
                        <p>ЮС</p>
                        <ul>
                          <li><p>18.01.2025 <span>100.00RUB</span>  </p></li>
                          <li><p>25.01.2025 <span>100.00RUB</span>  </p></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>Юлия</p>
                    <ul>
                      <li>
                        <p>ЮС</p>
                        <ul>
                          <li><p>18.01.2025 <span>100.00RUB</span>  </p></li>
                          <li><p>25.01.2025 <span>100.00RUB</span>  </p></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>Глеб</p>
                    <ul>
                      <li>
                        <p>Юнидрам</p>
                        <ul>
                          <li><p>18.11.2024 <span>100.00RUB</span>  </p></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>Нет пропусков</li>
                </ul>
              </main>

            </section>
          </div>
          <!-- КРЕДИТЫ -->
          <div class="fund-el_contatiner">

            <section>
              <header>Кредиты</header>
              <main>
                <ul>
                  <li>
                    <p>Мои</p>
                    <ul>
                      <li>

                        <p>ЕС <span>7032,43RUB</span></p>
                        <ul>
                          <li><p>0611Кредит24   <span>5850,00RUB</span></p></li>
                          <li><p>2008Кредит24 <span>1182,42RUB</span> </p></li>
  
                        </ul>
                        <!-- 1157,57RUB - 2340,00RUB  = -1182,42RUB-->
                      </li>
                      <li>
                        <p>Ренессанс <span>24151,89RUB</span></p>
                        <ul>
                          <li>Кредит на товар <span>24151,89RUB</span></li>
                          <!-- 29115,11RUB - 53967,00RUB =  -24151,89RUB-->
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>Глеб</p>
                    <ul>
                      <li>
                        <p>Юнидрам <span>4165,00RUB</span></p>
                        <ul>
                          <li><p>0501Кредит24   <span>1404,00RUB</span></p></li>
                          <li><p>0402Кредит24 <span>304,00RUB</span> </p></li>
                          <li><p>0405Кредит24 <span>117,00RUB</span> </p></li>
                          <li><p>1212Кредит24 <span>2340,00RUB</span> </p></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </main>
            </section>
          </div>
        </div>
       </div>
     </section>

    <!-- <div>
      {{ computedFund }}
    </div> -->


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
.switch-title_container {
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
}

/* conspirators v1.0.0 */
.wallet-section_container {
  display: flex;
  -ms-overflow-style: none;  /* IE and Edge */
  overflow: scroll; 
  scrollbar-width: none; 
  max-width: 100vw!important;
  gap: 1rem;
}

.wallet-section_container:-webkit-scrollbar {
  display: none;
}

.section-header_wrapper:hover {
  cursor: pointer;
}

.section-header_wrapper p{
  font-size: 36px; 
  font-weight: bold;
}

.current-fund_container {
}

.current-fund_wrapper {
}
.fund-el_contatiner {

}

/*  */
@media screen and (max-width: 575px) {
  .show-max-767 {
    display: none;
  }
  .wallet-section_container {
    margin-top: 1rem;
    padding: 0 0.5rem;
    padding-bottom: 1.5rem;
    gap: .5rem;
  }
  .section-header_wrapper {
    min-width: 220px;
  }
  .section-header_wrapper p {
    font-size: 16px;
  }
}
@media screen and (min-width: 576px) {
  .section-header_wrapper {
    min-width: 330px;
  }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
  .show-max-767 {
    display: none;
  }
  .wallet-section_container {
    margin-top: 1rem;
    padding: 0 1rem;
    padding-bottom: 1.5rem;
  }
  .section-header_wrapper p {
    font-size: 32px;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
  .wallet-section_container {
    margin-top: 1rem;
    margin-left: -1rem;
    padding-left: 1rem;
    margin-right: -.5rem;
    padding-right: .5rem;
    padding-bottom: 1.5rem;
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px){
  .wallet-section_container {
    margin-top: 1rem;
    margin-left: -1rem;
    padding-left: 1rem;
    padding-bottom: 1.5rem;
  }
}
@media screen and (min-width: 1200px) {
  .wallet-section_container {
    margin-top: 1rem;
    margin-left: -1rem;
    padding-left: 1rem;
    padding-bottom: 1.5rem;
  }
}
</style>
