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
const sessionUser:any = useUserSession().user;
// useProfileStore().loadData()
// const profiles = useProfileStore().profiles

// Chips
//= section fund
const choosenChip_section = ref('available')
// = 
const affiliationBandChips = ref([
  {
    id: 1,
    bandID: 0,
    name: 'all',
    title: 'Всего'
  },
  {
    id: 2,
    bandID: 0,
    name: 'personal',
    title: 'Личные'
  }
])
// const affiliationFundsChips = ref([
//   {
//     name: 'all',
//     title: 'Всего',
//     id: 0
//   },
//   {
//     name: 'mine',
//     title: 'Мои',
//     id: 1
//   },
//   {
//     name: 'unidrum',
//     title: 'Unidrum',
//     id: 2
//   },
//   {
//     name: 'AC',
//     title: 'АС',
//     id: 3
//   },
//   {
//     name: 'EC',
//     title: 'ЕС',
//     id: 4
//   },
//   {
//     name: 'IS',
//     title: 'ИС',
//     id: 5
//   },
//   {
//     name: 'Conspirators',
//     title: 'Соучастники',
//     id: 6
//   },
//   {
//     name: 'JD',
//     title: 'ЮД',
//     id: 7
//   },
//   {
//     name: 'JS',
//     title: 'ЮС',
//     id: 7
//   }
// ]) 
const currentAffiliation = ref({
  name: 'all',
  title: 'Всего',
  bandID: 0,
  id: 1
})
//= fund paragraph
const fundParagraph = ref([
  {
    id: 1,
    name: 'meshes',
    title: 'Мешки'
  },
  {
    id: 2,
    name: 'history',
    title: 'Транзакции'
  }
])
//= current fund paragraph
const currentFundParagraph = ref('meshes')

// WALLET
//= wallet articles
const wallet_sections = ref([
  {
    id: 1,
    title: 'Свободные средства',
    name: 'available',
    total: 136187.50,
    aticles: [

    ]
  },
  {
    id: 2,
    title: 'Фонда',
    total: 203705.14,
    name: 'invested_stock',
    aticles: [

    ]
  },
  {
    id: 3,
    title: 'Крипта',
    total: 203705.14,
    name: 'invested_crypto',
    aticles: [

    ]
  },
  {
    id: 4,
    title: 'Вклады',
    total: 203705.14,
    name: 'invested_deposit',
    aticles: [

    ]
  },
  {
    id: 5,
    title: 'Валюта',
    total: 203705.14,
    name: 'invested_currency',
    aticles: [

    ]
  },
  {
    id: 6,
    title: 'Выдано займов',
    total: 203705.14,
    name: 'credits',
    aticles: [

    ]
  },
  {
    id: 6,
    title: 'Займы',
    total: 203705.14,
    name: 'invested_loan',
    aticles: [

    ]
  },
  {
    id: 7,
    title: 'Старт проекты',
    total: 203705.14,
    name: 'projects',
    aticles: [

    ]
  },
  { 
    id: 8,
    title: 'Долг',
    total: 0.00,
    name: 'debt',
    aticles: [

    ]
  },
  // { 
  //   id: 9,
  //   title: 'Вывод',
  //   total: 0.00,
  //   name: 'withdraw',
  //   aticles: [

  //   ]
  // },
  // { 
  //   id: 10,
  //   title: '+Депозит',
  //   total: 0.00,
  //   name: 'deposit',
  //   aticles: [

  //   ]
  // },
  // { 
  //   id: 11,
  //   title: 'Расходы',
  //   total: 0.00,
  //   name: 'expenses',
  //   aticles: [

  //   ]
  // }
])



//= wallet articles child (fund group)
// id: String, 
//== group-#
// tagName: String,
//== available, invested_stock, debt
// tagType: String,
//== saving_account, cash
// name: 'Накопительные счета'
const currency_to_show =  ref({
  ticket:  'RUB'
})
const wallet_fund_group = ref([
  {
    id: 1,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Накопительные счета'
  },
  {
    id: 2,
    section_id: 1,
    tagName: 'available',
    tagType: 'cash',
    name: 'Наличка'
  },
  {
    id: 3,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'mutual_funds',
    name: 'ПИФы'
  },
  {
    id: 4,
    section_id: 2 ,
    tagName: 'invested_stock',
    tagType: 'brokerage_account',
    name: 'Брокерские счета'
  },
  {
    id: 5,
    section_id: 3,
    tagName: 'invested_crypto',
    tagType: 'crypto-wallet',
    name: 'Кошельки'
  },
  {
    id: 6,
    section_id: 3,
    tagName: 'invested_crypto',
    tagType: 'crypto-stock',
    name: 'Балансы бирж'
  },
  {
    id: 7,
    section_id: 3,
    tagName: 'invested_crypto',
    tagType: 'crypto-stacking',
    name: 'Стэйкинг'
  },
  {
    id: 8,
    section_id: 4,
    tagName: 'invested_deposit',
    tagType: 'deposit-capitalize',
    name: 'С капитализацией'
  },
  {
    id: 9,
    section_id: 4,
    tagName: 'invested_deposit',
    tagType: 'deposit-wocapitalize',
    name: 'Без капитализации'
  },
  {
    id: 10,
    section_id: 5,
    tagName: 'invested_currency',
    tagType: 'currency-usd',
    name: 'Доллар'
  },
  {
    id: 11,
    section_id: 5,
    tagName: 'invested_currency',
    tagType: 'currency-cny',
    name: 'Юань'
  },
  {
    id: 12,
    section_id: 5,
    tagName: 'invested_currency',
    tagType: 'currency-hkd',
    name: 'Гонконский доллар'
  },
  {
    id: 13,
    section_id: 6,
    tagName: 'credits',
    tagType: 'credits-interest',
    name: 'Кредит Процентный'
  },
  {
    id: 14,
    section_id: 6,
    tagName: 'credits',
    tagType: 'credits-free',
    name: 'Кредит Беспроцентный'
  },
  {
    id: 15,
    section_id: 9,
    tagName: 'withdraw',
    tagType: 'withdraw-salary',
    name: 'Зарплаты'
  },
  {
    id: 16,
    section_id: 9,
    tagName: 'withdraw',
    tagType: 'withdraw-dividends',
    name: 'Дивиденды'
  },
  {
    id: 16,
    section_id: 10,
    tagName: 'deposit',
    tagType: 'deposit-weekly-contributions',
    name: 'Еженедельные взносы'
  },
  {
    id: 17,
    section_id: 10,
    tagName: 'deposit',
    tagType: 'deposit-gift',
    name: 'Дар'
  },
  {
    id: 19,
    section_id: 1,
    tagName: 'available',
    tagType: 'debet_card',
    name: 'Дебетовая карта'
  },
])
//= conspirators funds

const conspirators_fund = ref([
  {
    id: 1,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'LambOfArt BOT',
    brokerTag: 'SBER',
    invested: 4000.00,
    price: 4178.70,
    currency: 'RUB',
    conspirators: [
      {
        userID: 2,
        userType: 'conspirator'
      }
    ]
  },
  {
    id: 2,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'brokerage_account',
    name: 'BOT',
    brokerTag: 'T-Bank',
    invested: 123383.61,
    price: 141694.55,
    currency: 'RUB',
    conspirators: [
      {
        userID: 1,
        userType: 'user'
      },
      {
        userID: 2,
        userType: 'conspirator'
      }
    ]
  },
  {
    id: 2,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Запасы',
    brokerTag: 'SBER',
    invested: 34.05,
    price: 34.05,
    currency: 'RUB'
  },
  {
    id: 4,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'mutual_funds',
    name: 'Фонд локальный',
    brokerTag: 'SBER',
    invested: 300.00,
    price: 308.75,
    currency: 'RUB'
  },
  {
    id: 5,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЕС',
    brokerTag: 'SBER',
    invested: 4681.41,
    price: 4681.41, 
    currency: 'RUB'
  },
  {
    id: 6,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'АС',
    brokerTag: 'SBER',
    invested: 5385.01,
    price: 5385.01,
    currency: 'RUB'
  },
  {
    id: 7,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЮС',
    brokerTag: 'SBER',
    invested: 513.46,
    price: 513.46,
    currency: 'RUB'
  },
  {
    id: 8,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ДомИнввест',
    brokerTag: 'SBER',
    invested: 3362.37,
    price: 3362.37,
    currency: 'RUB'
  },
  {
    id: 9,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Юнидрам',
    brokerTag: 'VTB',
    invested: 3090.64,
    price: 3090.64,
    currency: 'RUB'
  },
  {
    id: 10,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЕС',
    brokerTag: 'VTB',
    invested: 350.55,
    price: 350.55,
    currency: 'RUB'
  },
  {
    id: 11,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЮС',
    brokerTag: 'VTB',
    invested: 5.08,
    price: 5.08,
    currency: 'RUB'
  },
  {
    id: 12,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЮД',
    brokerTag: 'VTB',
    invested: 1.43,
    price: 1.43,
    currency: 'RUB'
  },
  {
    id: 13,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Купоны',
    brokerTag: 'Yandex',
    invested: 531.73,
    price: 531.73,
    currency: 'RUB'
  },
  {
    id: 14,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Станция',
    brokerTag: 'Yandex',
    invested: 53599.28,
    price: 53599.28,
    currency: 'RUB'
  },
  {
    id: 15,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЕС',
    brokerTag: 'Yandex',
    invested: 23767.03,
    price: 23767.03,
    currency: 'RUB'
  },
  {
    id: 16,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЕС ФИИ',
    brokerTag: 'Yandex',
    invested: 265.48,
    price: 265.48,
    currency: 'RUB'
  },
  {
    id: 17,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЮС',
    brokerTag: 'Yandex',
    invested: 1726.05,
    price: 1726.05,
    currency: 'RUB'
  },
  {
    id: 18,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Соучастники',
    brokerTag: 'Yandex',
    invested: 2194.12,
    price: 2194.12,
    currency: 'RUB'
  },
  {
    id: 19,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Соучастники ФИИ',
    brokerTag: 'Yandex',
    invested: 1421.14,
    price: 1421.14,
    currency: 'RUB'
  },
  {
    id: 20,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЮД',
    brokerTag: 'Yandex',
    invested: 1128.00,
    price: 1128.00,
    currency: 'RUB'
  },
  {
    id: 21,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ЮС',
    brokerTag: 'T-Bank',
    invested: 510.66,
    price: 510.66,
    currency: 'RUB'
  },
  {
    id: 22,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Юнидрам',
    brokerTag: 'T-Bank',
    invested: 5547.09,
    price: 5547.09,
    currency: 'RUB'
  },
  {
    id: 23,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ИС',
    brokerTag: 'Renesans',
    invested: 9467.49,
    price: 9467.49,
    currency: 'RUB'
  },
  {
    id: 24,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'Магнит',
    brokerTag: 'Renessans',
    invested: 3687.60,
    price: 3687.60,
    currency: 'RUB'
  },
  {
    id: 25,
    section_id: 1,
    tagName: 'available',
    tagType: 'saving_account',
    name: 'ИС',
    brokerTag: 'BCS',
    invested: 379.51,
    price: 379.51,
    currency: 'RUB'
  },
  {
    id: 26,
    section_id: 1,
    tagName: 'available',
    tagType: 'cash',
    name: 'ЮС',
    brokerTag: 'SBER',
    invested: 4970.00,
    price: 4970.00,
    currency: 'RUB'
  },
  {
    id: 27,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'mutual_funds',
    name: 'Фонд российских облигаций',
    brokerTag: 'SBER',
    invested: 300.00,
    price: 321.63,
    currency: 'RUB'
  },
  {
    id: 28,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'mutual_funds',
    name: 'Фонд Накопительный',
    brokerTag: 'SBER',
    invested: 300.00,
    price: 329.89,
    currency: 'RUB'
  },
  {
    id: 29,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'brokerage_account',
    name: 'Инвесткопилка',
    brokerTag: 'T-Bank',
    invested: 866.46,
    price: 866.46,
    currency: 'RUB'
  },
  {
    id: 30,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'brokerage_account',
    name: 'Валюта',
    brokerTag: 'T-Bank',
    invested: 0.60,
    price: 0.60,
    currency: 'RUB'
  },
  {
    id: 31,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'brokerage_account',
    name: 'Камини',
    brokerTag: 'T-Bank',
    // invested: 2679.00,
    invested: 2700.00,
    price: 2679.00,
    currency: 'RUB'
  },
  {
    id: 32,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'brokerage_account',
    name: 'Сбер Личный',
    brokerTag: 'T-Bank',
    invested: 108054.97,
    price: 108054.97,
    currency: 'RUB'
  },
  {
    id: 33,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'brokerage_account',
    name: 'Альфа-инвестиции Личный',
    brokerTag: 'Alfa-bank',
    invested: 217.56,
    price: 217.56,
    currency: 'RUB'
  },
  {
    id: 34,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'brokerage_account',
    name: 'ИС Без имени',
    brokerTag: 'BCS',
    invested: 15092.99,
    price: 15092.99,
    currency: 'RUB'
  },
  {
    id: 35,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'brokerage_account',
    name: 'ИИС Личный',
    brokerTag: 'BCS',
    invested: 5660.71,
    price: 5660.71,
    currency: 'RUB'
  },
  {
    id: 36,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'brokerage_account',
    name: 'Кит финанс Личный',
    brokerTag: 'KF',
    invested: 0.00,
    price: 0.00,
    currency: 'RUB'
  },
  {
    id: 37,
    section_id: 2,
    tagName: 'invested_stock',
    tagType: 'brokerage_account',
    name: 'Цифра брокер Личный',
    brokerTag: 'CB',
    invested: 0.00,
    price: 0.00,
    currency: 'RUB'
  },
  {
    id: 38,
    section_id: 3,
    tagName: 'invested_crypto',
    tagType: 'crypto-wallet',
    name: 'BOT',
    brokerTag: 'Metamask BSC',
    invested: 234.91,
    price: 234.91,
    currency: 'USD'
  },
  {
    id: 39,
    section_id: 3,
    tagName: 'invested_crypto',
    tagType: 'crypto-wallet',
    name: 'BOT',
    brokerTag: 'Telegram Wallet',
    invested: 93.42,
    price: 93.42,
    currency: 'USD'
  },
  {
    id: 40,
    section_id: 3,
    tagName: 'invested_crypto',
    tagType: 'crypto-wallet',
    name: 'Личный',
    brokerTag: 'Phantom Wallet',
    invested: 53.34,
    price: 249.13,
    currency: 'USD'
  },
  {
    id: 41,
    section_id: 3,
    tagName: 'invested_crypto',
    tagType: 'crypto-stock',
    name: 'BOT',
    brokerTag: 'Binance',
    invested: 0.00,
    price: 0.00,
    currency: 'USD'
  },
  {
    id: 42,
    section_id: 3,
    tagName: 'invested_crypto',
    tagType: 'crypto-stacking',
    name: 'BOT',
    brokerTag: 'MTT',
    invested: 0.00,
    price: 0.00,
    currency: 'MTT',
    ownerType: 'conspirators',
    ownerId: 2
  },
  {
    id: 43,
    section_id: 4,
    tagName: 'invested_deposit',
    tagType: 'deposit-capitalize',
    name: 'Личный',
    brokerTag: 'SBER',
    invested: 0.00,
    price: 0.00,
    currency: 'RUB'
  },
  {
    id: 44,
    section_id: 4,
    tagName: 'invested_deposit',
    tagType: 'deposit-wocapitalize',
    name: 'Личный',
    brokerTag: 'SBER',
    invested: 0.00,
    price: 0.00,
    currency: 'RUB'
  },
  {
    id: 45,
    section_id: 5,
    tagName: 'invested_currency',
    tagType: 'currency-usd',
    name: 'Личный',
    brokerTag: 'T-Bank',
    invested: 10.00,
    price: 10.00,
    currency: 'USD',
    ownerType: 'user',
    ownerId: 1
  },
  {
    id: 46,
    section_id: 5,
    tagName: 'invested_currency',
    tagType: 'currency-cny',
    name: 'Личный',
    brokerTag: 'T-Bank',
    invested: 271.00,
    price: 271.00,
    currency: 'CNY'
  },
  {
    id: 47,
    section_id: 5,
    tagName: 'invested_currency',
    tagType: 'currency-hkd',
    name: 'Личный',
    brokerTag: 'T-Bank',
    invested: 21.00,
    price: 21.00,
    currency: 'HKD'
  },
  {
    id: 48,
    section_id: 9,
    tagName: 'withdraw',
    tagType: 'withdraw-dividends',
    name: 'Sergey Anfalov',
    brokerTag: 'Банковская карта',
    invested: 1000.00,
    price: 1000.00,
    currency: 'RUB'
  },
  {
    id: 49,
    section_id: 10,
    tagName: 'deposit',
    tagType: 'deposit-weekly-contributions',
    name: 'Sergey Anfalov',
    brokerTag: 'ЕС',
    invested: 100.00,
    price: 100.00,
    currency: 'RUB'
  },
  {
    id: 50,
    section_id: 10,
    tagName: 'deposit',
    tagType: 'deposit-weekly-contributions',
    name: 'Dzagi',
    brokerTag: 'ЕС',
    invested: 100.00,
    price: 100.00,
    currency: 'RUB'
  },
  {
    id: 51,
    section_id: 10,
    tagName: 'deposit',
    tagType: 'deposit-weekly-contributions',
    name: 'Sergy Anfalov',
    brokerTag: 'ЕС',
    invested: 1000.00,
    price: 1000.00,
    currency: 'RUB',
  },
  {
    id: 52,
    section_id: 19,
    tagName: 'available',
    tagType: 'debet_card',
    name: 'Serey Anfalov',
    brokerTag: 'SBER',
    invested: 1000.00,
    price: 1000.00,
    currency: 'RUB',
    ownerType: 'user',
    ownerId: 1
  },
])

const ledger = ref([
{
    id: 1,
    created_at: '2024-12-07 17:48:02',
    //
    fund_type: 'invested_stock',
    fund_tag: 'brokerage_account',
    fund_id: 2,
    recieved_amount: 1.00,
    recieved_amount_price: 500.00,
    recieved_amount_currency: 'RUB',
    //
    operation_type: 'invest',
    operator_id: 1,
    //
    from_fund_type: 'available',
    from_fund_tag: 'saving_account',
    from_fund_id: 5,
    send_amount: 1.00,
    send_amount_price: 500.00,
    send_amount_currency: 'RUB',
  },
  {
    id: 2,
    created_at: '2024-12-07 17:48:02', 
    // 
    fund_type: 'invested_stock',
    fund_tag: 'brokerage_account',
    fund_id: 4,
    recieved_amount: 1.00,
    recieved_amount_price: 300.00,
    recieved_amount_currency: 'RUB',
    //
    operation_type: 'invest',
    operator_id: 1,
    //
    from_fund_type: 'available',
    from_fund_tag: 'debet_card',
    from_fund_id: 47,
    ssend_amount: 1.00,
    send_amount_price: 300.00,
    send_amount_currency: 'RUB',
  },
  {
    id: 3,
    created_at: '2024-12-07 17:48:02',
    //
    fund_type: 'deposit',
    fund_tag: 'saving_account',
    fund_id: 1,
    recieved_amount: 1.00,
    recieved_amount_price: 1000.00,
    recieved_amount_currency: 'RUB',
    //
    operation_type: 'deposit',
    operator_id: 1,
    //
    from_fund_type: 'available',
    from_fund_tag: 'saving_account',
    from_fund_id: 5,
    send_amount: 1.00,
    send_amount_price: 1000.00,
    send_amount_currency: 'RUB',
  },
  {
    id: 4,
    created_at: '2024-12-07 17:48:02',
    //
    fund_type: 'deposit',
    fund_tag: 'saving_account',
    fund_id: 1,
    recieved_amount: 1.00,
    recieved_amount_price: 4000.00,
    recieved_amount_currency: 'RUB',
    //
    operation_type: 'deposit',
    operator_id: 1,
    //
    from_fund_type: 'available',
    from_fund_tag: 'saving_account',
    from_fund_id: 5,
    send_amount: 1,
    send_amount_price: 4000.00,
    send_amount_currency: 'RUB',
  },
  {
    id: 5,
    created_at: '2024-12-07 17:48:02',
    //
    fund_type: 'available',
    fund_tag: 'saving_account',
    fund_id: 5,
    recieved_amount: 1.00,
    recieved_amount_price: 15000.00,
    recieved_amount_currency: 'RUB',
    //
    operation_type: 'withdraw',
    operator_id: 1,
    //
    from_fund_type: 'invested_stock',
    from_fund_tag: 'brokerage_account',
    from_fund_id: 2,
    send_amount: 1.00,
    send_amount_price: 15000.00,
    send_amount_currency: 'RUB',
  },
  {
    id: 6,
    created_at: '2024-12-07 17:48:02',
    //
    fund_type: 'invested_crypto',
    fund_tag: 'crypto-wallet',
    fund_id: 35,
    recieved_amount: 1.00,
    recieved_amount_price: 91.72,
    recieved_amount_currency: 'USD',
    //
    operation_type: 'invest',
    operator_id: 1,
    //
    from_fund_type: 'available',
    from_fund_tag: 'saving_account',
    from_fund_id: 5,
    send_amount: 1.00,
    send_amount_price: 10000.00,
    send_amount_currency: 'RUB',
    // sign
    sign_user_id: 'conspirator',
    sign_user_type: 2
  },
  {
    id: 7,
    created_at: '2024-12-08 17:48:02',
    //
    fund_type: 'deposit',
    fund_tag: 'saving_account',
    fund_id: 15,
    recieved_amount: 1.00,
    recieved_amount_price: 100.00,
    recieved_amount_currency: 'RUB',
    //
    operation_type: 'donation weekly',
    operator_id: 1,
    //
    from_fund_type: 'available',
    from_fund_tag: 'debet_card',
    from_fund_id: 52,
    send_amount: 1.00,
    send_amount_price: 100.00,
    send_amount_currency: 'RUB',
  },
  {
    id: 8,
    created_at: '2024-12-08 17:48:02',
    //
    fund_type: 'deposit',
    fund_tag: 'saving_account',
    fund_id: 15,
    recieved_amount: 1.00,
    recieved_amount_price: 100.00,
    recieved_amount_currency: 'RUB',
    //
    operation_type: 'donation',
    operator_id: 1,
    //
    from_fund_type: 'available',
    from_fund_tag: 'debet_card',
    from_fund_id: 52,
    send_amount: 1.00,
    send_amount_price: 100.00,
    send_amount_currency: 'RUB',
  }
])

// COMPUTED
// conspirators_fund
// const conspirators_fund_computed = computed(() => {


//   const array = [...conspirators_fund.value].filter((fund) => {
//     return fund.tagName === choosenChip_section.value
//   })

//   return array
// })

//= transaction ledger
const transaction_ledger_computed = computed(() => {
  let array:any = new Array()

  transaction_ledger.value?.forEach(transaction => {
    
    meshes_computed.value?.forEach(mesh => {
      let from_obj = translateMeshByID(transaction?.from_mesh_id)
      let receive_obj = translateMeshByID(transaction?.receive_mesh_id)
      if(mesh.id === transaction.from_mesh_id || mesh.id === transaction.receive_mesh_id || receive_obj?.storageID === mesh.id) {


        if(from_obj && receive_obj) {

          array.push({
            id: transaction.id,
            // DETAILS
            created_at: transaction.created_at,
            purpose: transaction.purpose,
            fee: transaction.fee,
            comments: transaction.comments,
            storageID: receive_obj?.storageID,
            bid: receive_obj?.bid,
            // FROM
            from_mesh_type: from_obj?.type,
            from_mesh_tag: from_obj?.tag,
            from_mesh_name: from_obj?.name,
            from_mesh_broker_tag: from_obj?.broker_tag,
            from_mesh_currency: transaction.from_mesh_currency,
            from_mesh_amount: transaction.from_mesh_amount,
            from_mesh_price: transaction.from_mesh_price,
            from_mesh_owner_id: from_obj?.ownerID, 
            from_mesh_owner_type: from_obj?.ownerType,
            // RECIEVE
            receive_mesh_type: receive_obj?.type,
            receive_mesh_tag: receive_obj?.tag,
            receive_mesh_name: receive_obj?.name,
            receive_mesh_broker_tag: receive_obj?.broker_tag,
            receive_mesh_currency: transaction.receive_mesh_currency,
            receive_mesh_amount: transaction.receive_mesh_amount,
            receive_mesh_price: transaction.receive_mesh_price,
            receive_mesh_owner_id: receive_obj?.ownerID, 
            receive_mesh_owner_type: receive_obj?.ownerType, 
            // AUTHOR
            authorID: transaction.authorID,
            authorType: transaction.authorType
          })
        } else {
          array.push({
            id: transaction.id,
            // DETAILS
            created_at: transaction.created_at,
            purpose: transaction.purpose,
            fee: transaction.fee,
            comments: transaction.comments,
            storageID: receive_obj?.storageID,
            // FROM
            from_mesh_type: from_obj?.type,
            from_mesh_tag: from_obj?.tag,
            from_mesh_name: from_obj?.name,
            from_mesh_broker_tag: from_obj?.broker_tag,
            from_mesh_currency: transaction.from_mesh_currency,
            from_mesh_amount: transaction.from_mesh_amount,
            from_mesh_price: transaction.from_mesh_price,
            from_mesh_owner_id: from_obj?.ownerID, 
            from_mesh_owner_type: from_obj?.ownerType,
            // RECIEVE
            receive_mesh_type: receive_obj?.type,
            receive_mesh_tag: receive_obj?.tag,
            receive_mesh_name: receive_obj?.name,
            receive_mesh_broker_tag: receive_obj?.broker_tag,
            receive_mesh_currency: transaction.receive_mesh_currency,
            receive_mesh_amount: transaction.receive_mesh_amount,
            receive_mesh_price: transaction.receive_mesh_price,
            receive_mesh_owner_id: receive_obj?.ownerID, 
            receive_mesh_owner_type: receive_obj?.ownerType, 
            // AUTHOR
            authorID: transaction.authorID,
            authorType: transaction.authorType
          })
        }

      }
    })
  })
  if(array.length) {

    array.reverse()

    const unique = array.filter((obj, idx, arr) => 
    idx === arr.findIndex((t) => t.id === obj.id));
    return unique
  }
})

//= meshes array
const meshes_computed = computed(() => {
  return mesh_list.value?.filter(el => el.tag === choosenChip_section.value)
})
// band list
const band_computed = computed(() => {
  return band.value
})
//= affiliation band chips
const affiliation_computed = computed(() => {
  let array:any = []

  // Добавляем стоковые позиции
  affiliationBandChips.value.forEach(item => {
    array.push(item)
  })
  // Добавлям позиции на основе банд в БД
  band_computed.value?.forEach(item => {
    // if(item.sharers) {
    //   let sharers = Object.values(item.sharers)

    //   if(sharers.filter(sharer => sharer.userType === 'conspirator' && sharer.userId === sessionUser.id )) {
    //     console.log(sharers)
    //   }
    // }
    if([...affiliationBandChips.value].find(el => el.name !== item.name)) {
      array.push({
        id: array.length + 1,
        bandID: item.id,
        name: item.name,
        title: item.name
      })
    }
  })

  return array
})



// HELPERS
//= filter funds by group
// const filteredFundByGroupName = (groupType: string, fundsArray: any) => {
//   const result = [...fundsArray].filter(el => el.tagType === groupType)
  
//   return result
// }
const filterMeshByWalletType = (type: string, array: any) => {
  const result = [...array].filter(el => el.type === type)

  return result
}

//  CALC
//= calc Profit
// const calcProfit = (fundPrice, fundInvested, fundCurrency) => {
//   if(fundInvested !== 0) {

//     let result = fundPrice - fundInvested

//     if(fundPrice - fundInvested > 0) {
//       return `+${result.toFixed(2)}${fundCurrency}`

//     } else if (fundPrice - fundInvested === 0) {
//       return `0.00${fundCurrency}`

//     } else if (fundPrice - fundInvested < 0 ) {
//       return `${result.toFixed(2)}${fundCurrency}`
//     } else {
//       return `Нет инвестиций`
//     }

//   } else {
//     return 
//   }
// }
//= calc Profit Percent
// const calcProfitPercent = (fundPrice, fundInvested, fundCurrency) => {
//   if(fundInvested !== 0) {
//     let result = (fundPrice - fundInvested)/fundInvested * 100
//     return `${result.toFixed(2)}%`
//   } else {

//     return 'Нет инвестиций'
//   }
// }
//= calc color by profit
// const calcColorByProfit = (fundPrice, fundInvested) => {
//   if(fundInvested !== 0) {
//     if(fundPrice - fundInvested > 0) {
//       return 'var(--color-urgency-low)'
//     } 
//     else if (fundPrice - fundInvested === 0) {
//       return 'var(--color-btn-wo-bg)'
//     }
//     else if (fundPrice - fundInvested < 0) {
//       return 'var(--color-urgency-high)'
//     } else {

//       return 'orange!important'
//     }
//   } else {
//     return 'var(--color-btn-wo-bg)'
//   }
// }

// MESH ITEM FUNC
//= calc mesh invested
const calcMeshInvested = (meshID: number) => {

  let result  = 0;
  let transactions = transaction_ledger?.value
  let mesh = mesh_list?.value?.find(el => el.id === meshID)

  // currency_to_show.ticket

  // transaction.purpose
  // transaction.storageID
  
  // transaction.from_mesh_id
  // transaction.from_mesh_currency
  // transaction.from_mesh_amount
  // transaction.from_mesh_price
  
  // transaction.receive_mesh_id
  // transaction.receive_mesh_currency
  // transaction.receive_mesh_amount
  // transaction.receive_mesh_price

  // Пока считает  в рублях....
  if(transactions) {

    transactions.forEach(transaction => {
    // deposit
    // deposit weekly
    // gift
    // withdraw



      if(transaction.purpose === 'deposit' || transaction.purpose === 'deposit weekly'|| transaction.purpose === 'gift' || transaction.purpose === 'withdraw' ) {
        if(transaction.from_mesh_id === meshID) {
          result -= transaction.from_mesh_amount * transaction.from_mesh_price
        }
        if(transaction.receive_mesh_id === meshID) {
          result += transaction.receive_mesh_amount * transaction.receive_mesh_price
        }
      } 
      else if(transaction.purpose === 'issue'){
        if(transaction.receive_mesh_id === meshID) {
          result += transaction.receive_mesh_amount * transaction.receive_mesh_price
        }
      }
  
    })
  }

  return result
}
// calc mesh available
const calcMeshAvailable = (meshID: number) => {
  let result  = 0;
  let transactions = transaction_ledger?.value
  let mesh = mesh_list?.value?.find(el => el.id === meshID)

  // currency_to_show.ticket

  // transaction.purpose
  // transaction.storageID
  
  // transaction.from_mesh_id
  // transaction.from_mesh_currency
  // transaction.from_mesh_amount
  // transaction.from_mesh_price
  
  // transaction.receive_mesh_id
  // transaction.receive_mesh_currency
  // transaction.receive_mesh_amount
  // transaction.receive_mesh_price

  // Пока считает  в рублях....
  if(transactions){

    transactions.forEach(transaction => {
      // LOAN TRANSACTIONs
      if(mesh?.storageID !== 0) {
        if(transaction.purpose === 'payment') {
          if(transaction.receive_mesh_id === meshID) {
            
            result -= transaction.receive_mesh_amount * transaction.receive_mesh_price
          } 
          // находим mesh, который указан как storage кредитного счета
          if(mesh_list?.value?.find(el => el.id === mesh?.storageID)) {
            // назначаем куда сумму оплаты добавить
            transaction.receive_mesh_id = mesh?.storageID
            // уменьшаем долг по кредиту
            result -= transaction.receive_mesh_amount * transaction.receive_mesh_price
          }

        } else if (transaction.purpose === 'issue') {
          if(transaction.receive_mesh_id === meshID) {
            result += transaction.receive_mesh_amount * transaction.receive_mesh_price

            if(mesh?.bid) {
              result += result * mesh?.bid
            }
          }   
        }
      } 
      // OTHER TRANSACTIONs
      else {

        if(transaction.receive_mesh_id === meshID) {
          result += transaction.receive_mesh_amount * transaction.receive_mesh_price
        } 
        else if(transaction.from_mesh_id === meshID) {
          result -= transaction.from_mesh_amount * transaction.from_mesh_price
        } 
      }

    })
  }

  return result
}
// calc mesh profit
const calcMeshProfit = (meshID: number) => {
  let result = 0;
  let mesh;
  if(mesh_list.value?.length) {
    mesh = mesh_list.value.find(mesh => mesh.id === meshID)
  }
  let invested = calcMeshInvested(meshID)
  let available = calcMeshAvailable(meshID)

  if(mesh?.bid) {
    result = -(available - (invested + invested * mesh.bid))

  } else {

    result = available - invested
  }


  return result

}
// calc mesh profit in percentage
const calcMeshProfitPercent = (meshID: number) => {

  let result = 0;
  let mesh;
  if(mesh_list.value?.length) {
    mesh = mesh_list.value.find(mesh => mesh.id === meshID)
  }
  let invested = calcMeshInvested(meshID)
  let available = calcMeshAvailable(meshID)

  if(mesh?.bid) {

    result = -(available - (invested + invested * mesh.bid)) / (invested + invested * mesh.bid) * 100

  } else {

    result = (available - invested) / invested * 100
  }

  return result

}

// TRANSLATE
//
//= meshes id in transactions
const translateMeshByID = (id: number) => {
  let mesh;
  if(mesh_list.value?.length) {
    mesh = mesh_list.value.find(mesh => mesh.id === id)
  }
  return mesh
}
//= storageID
const translateStorageID = (storageID: number) => {
  let mesh;
  if(mesh_list.value?.length) {
    mesh = mesh_list.value.find(mesh => mesh.id === storageID)
  }
  return mesh?.name
}

// HELPERS
//
//= transform number to float
const transformToFixed = (num: number) => {
  return num.toFixed(2)
}

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

// TRANSLATORS
//
//= translate Fund Name
// const translateFundName = (fundId) => {
//   let el = conspirators_fund.value.find(el => el.id === fundId)
//     return el?.name
// }
//= translate fund broker tag
// const translateFundBrokerTag = (fundId) => {
//   let el = conspirators_fund.value.find(el => el.id === fundId)
//     return el?.brokerTag
// }
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
//
//= changeChipAffiliation
const changeChipAffiliation = (obj: any) => {
  currentAffiliation.value = obj
}

// COLLRIZED
//
//= set_section_bgColor
const set_section_bgColor = (section: any) => {
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
    if(section.name === 'invested_loan') {
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
    if(section.name === 'withdraw') {
      if(choosenChip_section.value === section.name) {

        color = `var(--color-global-text)`
      } else {

      }
    }
    if(section.name === 'deposit') {
      if(choosenChip_section.value === section.name) {

        color = `var(--color-global-text)`
      } else {

      }
    }
    if(section.name === 'expenses') {
      if(choosenChip_section.value === section.name) {

        color = `var(--color-global-text)`
      } else {

      }
    }
    else {
      // color = null
    }
  }

  return color
}
const setChoosenWalletSectionColor = (tag: any) => {
  let color;

  if(tag) {
    // AVAILABLE
    if(tag === 'available') {
      if(choosenChip_section.value === tag) {
        // color = `var(--color-wallet-fund-available-wo)`
        color = `var(--color-wallet-fund-available)`
      } else {
        // color = `var(--color-wallet-fund-available)`
      }
    } 
    // INVESTED STOCK
    if(tag === 'invested_stock') {
      if(choosenChip_section.value === tag) {
        // color = `var(--color-wallet-fund-invested-wo)`
        color = `var(--color-wallet-fund-invested)`
      } else {
        // color = `var(--color-wallet-fund-invested)`
      }
    }
    // INVESTED CRYPTO
    if(tag === 'invested_crypto') {
      if(choosenChip_section.value === tag) {
        // color = `var(--color-wallet-fund-invested-wo)`
        color = `var(--color-wallet-fund-invested)`
      } else {
        // color = `var(--color-wallet-fund-invested)`
      }
    }
    // INVESTED DEPOSIT
    if(tag === 'invested_deposit') {
      if(choosenChip_section.value === tag) {
        // color = `var(--color-wallet-fund-invested-wo)`
        color = `var(--color-wallet-fund-invested)`
      } else {
        // color = `var(--color-wallet-fund-invested)`
      }
    }
    // INVESTED CURRENCY
    if(tag === 'invested_currency') {
      if(choosenChip_section.value === tag) {
        // color = `var(--color-wallet-fund-invested-wo)`
        color = `var(--color-wallet-fund-invested)`
      } else {
        // color = `var(--color-wallet-fund-invested)`
      }
    }
    // INVESTED LOAN
    if(tag === 'invested_loan') {
      if(choosenChip_section.value === tag) {
        // color = `var(--color-wallet-fund-invested-wo)`
        color = `var(--color-wallet-fund-invested)`
      } else {
        // color = `var(--color-wallet-fund-invested)`
      }
    }
  }

  return color;
}
//= set Color By Operation Type
const setBgColorByOperationType = (operationType: string) => {
  if(operationType === 'invest') {
    return 'background-color: var(--color-wallet-fund-invested)'
  }
  else if (operationType === 'deposit') {
    return 'background-color: var(--color-wallet-fund-available)'
  }
  else if (operationType === 'withdraw') {
    return 'background-color: var(--color-wallet-fund-debt)'
  }
  // PROFIT
  else if (operationType === 'dividend') {
    return 'background-color: var(--color-wallet-fund-available)'
  }

  else {
    return 'background-color: var(--color-btn-disabled-bg)'
  }

}
//= set color by profit
const calcColorByMeshProfit = (meshID: number) => {

  let result = calcMeshProfit(meshID)
  if(result > 0) {
    return `var(--color-urgency-low)`
  } else if (result  < 0) {
    return `var(--color-urgency-high)`
  } else if (result === 0) {
    return `var(--color-btn-wo-bg)`
  } else {
    return `orange!important`
  }
}

// CALCULATE
//
//= sum total
const sumTotal = (id: number) => {

  const array = conspirators_fund.value.filter(el => el.section_id === id)
  
  const sum = array.reduce((acc, el) => {
    return acc + el.invested
  }, 0)
  return sum.toFixed(2)

}
//= available funds
const sumTotalAvailable = (id: number) => {
  const array = conspirators_fund.value.filter(el => el.section_id === id)
  
  const sum = array.reduce((acc, el) => {
    return acc + el.price
  }, 0)
  return sum.toFixed(2)
}

// AMOUNT
//
//= calc total capitalization
const sumTotalCap = () => {
  // let result  = 0;

  let result = mesh_list.value?.reduce((acc, mesh) => {
    return acc + calcMeshAvailable(mesh.id)
  }, 0)

  return result
}
//= calc amount by section 
const sumSectionAmount = (groupType: string) => {
  let result = 0;
  mesh_list.value?.filter(el => el.tag === groupType).forEach(mesh => {
    result += calcMeshAvailable(mesh.id)
  })
  return result
}

// WATCH
//= choosenChip_section
watch(choosenChip_section, () => {
  console.log(`Переключили вкладку на ${choosenChip_section.value}`)
  currentFundParagraph.value = 'meshes'
})
watch(currentAffiliation, () => {
  console.log(currentAffiliation.value)
  currentFundParagraph.value = 'meshes'
})

// BD
//
// mesh
const { data: mesh_list } = useFetch("/api/mesh/mesh", {
  lazy: false,
  transform: (mesh_list) => {
    return mesh_list
  }
})
// transaction_ledger
const { data: transaction_ledger } = useFetch("/api/transaction/transaction", {
  lazy: false,
  transform: (transaction_ledger) => {
    return transaction_ledger
  }
})
// band
const { data: band } = useFetch("/api/band/band", {
  lazy: false,
  transform: (band) => {

    return band.filter(item => {
      if(item.sharers && sessionUser.value) {
        let sharers = Object.values(item.sharers)

          if(sharers.find(sharer => sharer.userType === 'conspirator' && sharer.userId === sessionUser.value.id )) {

            return item
          } 
        }
    })
  }
})
</script>

<template>
  <Container>

    <div class="show-max-767" >
      <BreadCrumbs/>
      <!-- TITLE -->
      <h1 style="font-weight: bold; font-size: 42px;">Мой кошелек</h1>
    </div>

    <p style="margin: 0; margin-left: 1rem;">session: {{ sessionUser }}</p>



    <!-- CHIPs -->
    <Chip
      id="affiliation-chip-block"
      :tabs="affiliation_computed"
      :default="currentAffiliation"
      :btn_all_exist="false"
      @changed="changeChipAffiliation"
      style="margin-top: 1rem;"
    />
    {{ currentAffiliation }}
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
    <!--  -->
    <div class="total-cap_container" style="margin-top: 1rem; display: flex; align-items: center; gap: 1rem;">
      <p style="margin: 0;">TOTAL CAP: ~{{ sumTotalCap() }}{{ currency_to_show.ticket }}</p>
      <Button v-if="currentAffiliation.bandID !== 0" type="pseudo-btn" :link="`/band/${currentAffiliation?.bandID}`">Подробнее</Button>

    </div>

    <!-- SECTIONs -->
    <!--  -->
    <div v-if="mesh_list" id="fund-block" class="wallet-section_container">

      <Section 
        v-for="el in [...new Set([...mesh_list?.map(obj => obj.tag)])]"
        :fDirection="`column`"
        :fAlignItems="`flex-start`"
        :bg="setChoosenWalletSectionColor(el)"
        @click="choosenChip_section = el"
      >
        <p style="margin: 0;">{{ el }} cap</p>
        <p style="margin: 0;">{{transformToFixed(sumSectionAmount(el))}}{{ currency_to_show.ticket }}</p>
      </Section>

    </div> 
    

    <!-- === INFO SECTION === -->
    <div id="fund-block" class="wallet-section_container">

      <Section 
        v-for="section in wallet_sections" 
        :bg="set_section_bgColor(section)" 
        :fDirection="`column`" 
        class="section-header_wrapper"
        @click="choosenChip_section = section.name"
      >
        
        <!-- section header -->
        <header>
          <h2 :style="choosenChip_section === section.name ? 'color: #fff' : 'color: unset'" style="text-wrap: nowrap; font-size: unset; font-weight: unset;">{{ section.title }}</h2>
          <!-- available -->
          <p v-if="section.name  === 'available'" :style="choosenChip_section === section.name ? 'color: #fff' : 'color: unset'" style="margin: 0; text-wrap: nowrap;">{{ sumTotalAvailable(section.id) }} {{ currency_to_show.ticket }}</p>
          <!-- deposit -->
          <p v-else-if="section.name === 'invested_deposit'" :style="choosenChip_section === section.name ? 'color: #fff' : 'color: unset'" style="margin: 0; text-wrap: nowrap;">{{ sumTotal(section.id) }} {{ currency_to_show.ticket }}</p>
          <!-- else -->
          <p v-else :style="choosenChip_section === section.name ? 'color: #fff' : 'color: unset'" style="margin: 0; text-wrap: nowrap;">{{ 0.00 }} {{ currency_to_show.ticket }}</p>
          
          <!--  -->
          <p 
            v-if="section.name === 'invested_stock' || section.name === 'invested_currency'" 
            style="font-size: 0.8rem; font-weight: normal;"
          >
            Инвестировано: {{sumTotal(section.id)}} {{ currency_to_show.ticket }} <br> +3736.00RUB  / +10%
          </p>
          <p 
            v-if="section.name === 'invested_crypto'" 
            style="font-size: 0.8rem; font-weight: normal;"
          >
            Инвестировано: {{sumTotal(section.id)}} USD / ~0.00 RUB<br> +3736.00RUB  / +10%
          </p>
        </header>

        <!-- section articles -->   
        <!-- <HorizontalCard>123</HorizontalCard>
        <StackedCard>2704Кредит2024 | 275 734.00 P</StackedCard>
        <StackedCard>Брокерский счет (Тинькофф) | 275 734.00 P</StackedCard> -->
      </Section>

    </div>

    <!-- CHIP btn -->
    <!-- mesh && transactions  -->
    <div class="current_affiliation_title" style="display: flex; gap: 1rem; align-items: center;">

      <h3 v-for="el in fundParagraph" :class="currentFundParagraph === el.name ? 'title_active' : ''">
        <span @click="currentFundParagraph = el.name">

          {{ el.title }}
        </span>
      </h3>

    </div>

    <!-- CURRENT SECTION CONTENT-->
    <!-- ledger && meshes -->
     <section class="current-fund_container">

      <!-- TRANSACTION LEDGER -->
      <div v-if="currentFundParagraph === 'history'" class="current-fund_wrapper">

        <!--if length -->
        <div class="transaction_container" v-if="transaction_ledger_computed?.length">

          <!-- TRANSACTION -->
          <section 
            v-for="transaction in transaction_ledger_computed"
            class="transaction_wrapper"  
          >
            <!-- tFirst -->
            <div class="transaction-first">
              <!-- DATE -->
              
              <p class="transaction_date">{{ transaction.created_at }}</p>
              
              <!-- PURPOSE -->
              <p 
              class="transacion_purpose"
              :style="setBgColorByOperationType(transaction.purpose)"
              >
                  {{ transaction.purpose }} 
                </p>
            </div>

            <!-- DETAILS -->
            <div class="transaction_details">
              <div>
                <p v-if="transaction.from_mesh_name" style="margin: 0;">
                  <span>{{ transaction.from_mesh_owner_id }}{{ transaction.from_mesh_owner_type }}</span>
                  <span>Комиссия: {{ transaction.fee }}{{ currency_to_show.ticket }}</span>
                  <span>{{ transaction.from_mesh_name }}</span>
                  <span>{{ transaction.from_mesh_type }}</span>
                  <span>{{ transaction.from_mesh_broker_tag }}</span>
                  <span>({{ transaction.from_mesh_price }}{{transaction.from_mesh_currency}} x {{ transaction.from_mesh_amount }} = {{ transaction.from_mesh_price * transaction.from_mesh_amount }}{{transaction.from_mesh_currency}})</span>
                </p>
                <p style="margin: 0;" v-else>Неизвестный</p> 
              </div>
              <div>>>></div>
              <div>
                <p v-if="transaction.receive_mesh_name" style="margin: 0;">
                  <span>{{ transaction.receive_mesh_owner_id }}{{ transaction.receive_mesh_owner_type }}</span>
                  <span style="background-color: var(--color-btn-hover-bg)">Storage:{{ transaction.storageID }}</span>
                  <span>{{ transaction.receive_mesh_name }}</span>
                  <span>{{ transaction.receive_mesh_type }}</span>
                  <span>{{ transaction.receive_mesh_broker_tag }}</span>
                  <span>({{ transaction.receive_mesh_price }}{{transaction.receive_mesh_currency}} x {{ transaction.receive_mesh_amount }} = {{ transaction.receive_mesh_price * transaction.receive_mesh_amount }}{{transaction.receive_mesh_currency}})</span>
                </p>
                <p style="margin: 0;" v-else>Неизвестный</p> 
              </div>
            </div>

            <!-- AUTHOR -->
            <div>
              <div>{{ transaction.authorType }}{{ transaction.authorID }}</div>
            </div>

          </section>
        </div>
        <!-- else -->
        <div class="transaction_container" v-else>Нет операций</div>

      </div>

      <!-- MESHES -->
      <div v-if="currentFundParagraph === 'meshes'" class="current-fund_wrapper">

        <!-- LENGTH -->
        <div v-if="meshes_computed?.length">

          <section
            v-for="group in [...new Set([...meshes_computed.map(obj => {
              return {
                type: obj.type, 
                tag: obj.tag
              }
            }) ])]"
            style="margin-top: 1rem;"
            class="mesh_group_container"
          >
            <!-- mesh group name -->
            <header>
              <h4>{{ group.type }}</h4>
            </header>

            <!-- mesh array container -->
            <main style="margin-top: 1rem;">

              <!-- MESH ITEM -->
              <Section 
                v-for="mesh in filterMeshByWalletType(group.type, meshes_computed)"
                @click="$router.push(`mesh/${mesh.id}`)"
                fGap=".5rem"  
                fDirection="row"
                fJustifyContent="space-between"
                fAlignItems="center"
              >
                <!-- MESH INFO -->
                <div class="mesh_info">
                  <!-- BROKER TAG -->
                  <div class="mesh_broker-tag" style="text-wrap: nowrap">{{ mesh.broker_tag }}</div>
                  <!--  -->
                  <div>
                    <!-- CURRENT AMOUNT -->
                    <div style="font-weight: bold;">
                      {{transformToFixed(calcMeshAvailable(mesh.id))}}{{ currency_to_show.ticket }}
                    </div>
                    <!-- MESH NAME -->
                    <div style="display: flex; align-items: center; gap: .5rem;">
                      <span class="mesh_name">{{ mesh.name }}</span>
                      <span v-if="mesh.bid !== 0.00" style="font-size: 0.8rem; background-color: var(--color-btn-hover-bg); border-radius: 1rem; padding: 2px 6px;">
                      {{ mesh.bid * 100 }}%
                      </span>
                    </div>
                    <!-- MESH OWNER && MESH STORAGE -->
                    <div 
                      class="mesh_footer"
                      style="font-size: 0.8rem; display: flex;  gap: .5rem; margin-top: .5rem;"
                    >
                      <span style="color: var(--color-btn-wo-bg)">{{ mesh.ownerType }}{{ mesh.ownerID }}</span>
                      <span 
                        v-if="mesh.storageID !== 0"
                        style="color: var(--color-btn-text); background-color: var(--color-btn-disabled-text); border-radius: 1rem; padding: 3px 6px; text-wrap: nowrap;"
                        @click.stop="$router.push(`mesh/${mesh.storageID}`)"
                      >
                        {{ translateStorageID(mesh.storageID) }}
                      </span>
                    </div>
                  </div>
                </div>
                <!-- MESH TOTAL -->
                <div
                  v-if="mesh.type !== 'debet_card' && mesh.type !== 'cash'" 
                  style="text-wrap: nowrap; text-align: right;"
                >
                  <!-- PROFIT -->
                  <div class="mesh_profit" style="font-size: .8rem;" :style="`color: ${calcColorByMeshProfit(mesh.id)}`">
                    <!-- amount -->
                    <div>{{transformToFixed(calcMeshProfit(mesh.id))}}{{ currency_to_show.ticket }}</div>
                    <!-- el separator -->
                    <div class="mesh_profit-separator" style="width: 5px; height: 5px; border-radius: 50%;" :style="`background-color: ${calcColorByMeshProfit(mesh.id)}`"></div>
                    <!-- percentage -->
                    <div>{{ transformToFixed(calcMeshProfitPercent(mesh.id)) }}%</div>
                  </div>
                  <!-- INVESTED -->
                  <div class="mesh_invested">dep: {{transformToFixed(calcMeshInvested(mesh.id))}}{{ currency_to_show.ticket }}</div>
                </div>
              </Section>

            </main>
          </section>
        </div>
        <!-- ELSE -->
        <div v-else>
          <p style="margin-top: 1rem;">У вас нет мешков</p>
        </div>

      <!-- ОБРАБОТАТЬ! -->
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

      <!-- CREDITS -->
      <!--  -->
      <div v-if="choosenChip_section === 'withdraw'">

        <!-- ВЫДАННЫЕ КРЕДИТЫ -->
        <div class="fund-el_contatiner">

          <section>
            <header>История выводов</header>
            <main>
              <ul>
                <li><p><span>25.12.2024 ЮС 1002Кредит22</span> Кто: Сергей Анфалов <span>-7501,411RUB</span></p></li>
                <li>Не было выводов</li>
              </ul>
            </main>
          </section>

        </div>
      </div>
      <div v-if="choosenChip_section === 'deposit'">

      <!-- ВЫДАННЫЕ КРЕДИТЫ -->
      <div class="fund-el_contatiner">

        <section>
          <header>История выводов</header>
          <main>
            <ul>
              <li><p><span>25.12.2024 ЮС 1002Кредит22</span> Кто: Сергей Анфалов <span>-7501,411RUB</span></p></li>
              <li>Не было выводов</li>
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

.wallet-section_container::-webkit-scrollbar {
  display: none;
  -webkit-appearance: none;
  width: 0;
  height: 0;
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

/* FUND LIST */
.fund-list {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
  }
  .fund-list_el {
    display: grid; 
    grid-template-columns: 10% 50% 40%; 
    grid-template-rows: 40% 60%;
    grid-template-areas: "logo price price" 
                          "logo title invested";
  }
  .el_logo {
    grid-area: logo;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .el_title {
    grid-area: title;
    /* background-color: red; */
  }
  .el_price {
    grid-area: price;
    /* background-color: cyan; */
    display: flex;
    justify-content: space-between;
  }
  .el_invested {
    grid-area: invested;
    /* background-color: blue; */
  }

  /* fund list */
  .current_affiliation_title {
    padding-bottom: .5rem;
    border-bottom: 1px solid var(--color-btn-disabled-bg)
  }
  .current_affiliation_title h3 {
    font-size: 1rem;
    font-weight: normal;
    position: relative;
  } 
  .current_affiliation_title h3:after {

  }
  .title_active:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-wallet-fund-available-wo)
  }
  .title_active span {
    color: var(--color-wallet-fund-available-wo);
  }
  .current_affiliation_title,
  .fund_group_container {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  /* CURRENT FUND CONTAINER */
  .current-fund_container {
    /* margin-left: 0.5rem;
    margin-right: 0.5rem; */
  }

  /* MESH */
  .mesh_group_container {

  }
  .mesh_info {
    display: flex;
  }
  
  /* TRANSACTION */
  .transaction_container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
  .transaction_wrapper {
    display: grid;
    align-items: center;
    grid-template-columns: 20% 20% 1fr 20%;
    grid-template-areas: 't_first details details detatils';
  }
  .transaction-first {
    grid-area: t_first;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .transacion_purpose {
    align-self: left;
    justify-self: center;
    width: max-content;
    padding: 0px 6px;
    border-radius: .5rem;
    font-size: 0.8rem;
    margin: 0;
  }
  .transaction_date {
    align-self: left;
    font-size: 0.8rem; 
    margin-bottom: 0.5rem;
    margin-bottom: 0;
  }
  .transaction_details {
    grid-area: details;
  }

/*  */
@media screen and (max-width: 575px) {
  .show-max-767 {
    display: none;
  }
  .total-cap_container {
    margin-left: .5rem;
    margin-right: .5rem;
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

  /* CURRENT FUND CONTAINER */
  .current-fund_container {
    margin-left: .5rem;
    margin-right: .5rem;
  }

  /* TRANSACTION */
  .transaction_container {
    /* margin-left: .5rem;
    margin-right: .5rem; */
  }

  /* MESH */
  .mesh_info {
   flex-direction: column;
   align-items: flex-start;
   gap: unset; 
  }
  .mesh_broker-tag,
  .mesh_info .mesh_name {
    font-size: 0.8rem;
  }
  .mesh_profit {
    flex-direction: column;
    gap: unset;
  }
  .mesh_profit-separator {
    display: none;
  }
  .mesh_invested {
    font-size: 0.8rem;
  }
  .mesh_footer {
    flex-direction: column;
    align-items: flex-start;
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
  .total-cap_container {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .wallet-section_container {
    margin-top: 1rem;
    padding: 0 1rem;
    padding-bottom: 1.5rem;
  }
  .section-header_wrapper p {
    font-size: 32px;
  }
  /* fund list */
  .current_affiliation_title,
  .fund_group_container {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .fund_list {
    gap: 1rem;
    grid-template-columns: 1fr;
    /* grid-template-columns: repeat(2, 1fr); */
  }

  /* CURRENT FUND CONTAINER */
  .current-fund_container {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  /* MESH */
  .mesh_group_container {

  }
  .mesh_info {
    align-items: center; 
    gap: 24px;
  }
  .mesh_profit {
    gap: .5rem;
    display: flex; 
    align-items: center;
  }
  .mesh_footer {
    align-items: center;
  }

  /* TRANSACTION */
  .transaction_container {

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
  .fund_list {
    gap: 1rem;
    grid-template-columns: 1fr;
    /* grid-template-columns: repeat(3, 1fr); */
  }
  .el_logo {
    justify-content: center;
  }

  /* CURRENT FUND CONTAINER */
  .current-fund_container {
    margin-left: .5rem;
    margin-right: .5rem;
  }

  /* TRANSACTION */
  .transaction_container {
    /* margin-left: .5rem;
    margin-right: .5rem; */
  }
  /* MESH */
  .mesh_info {
    align-items: center; 
    gap: 24px;
  }
  .mesh_profit {
    gap: .5rem;
    display: flex; 
    align-items: center;
  }
  .mesh_footer {
    align-items: center;
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px){
  .wallet-section_container {
    margin-top: 1rem;
    margin-left: -1rem;
    padding-left: 1rem;
    padding-bottom: 1.5rem;
  }
  .fund_list {
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
  }
  .el_logo {
    justify-content: center;
  }

  /* CURRENT FUND CONTAINER */
  .current-fund_container {
    margin-left: .5rem;
    margin-right: .5rem;
  }

  /* TRANSACTION */
  .transaction_container {
    /* margin-left: .5rem;
    margin-right: .5rem; */
  }
  /* MESH */
  .mesh_info {
    align-items: center; 
    gap: 24px;
  }
  .mesh_profit {
    gap: .5rem;
    display: flex; 
    align-items: center;
  }
  .mesh_footer {
    align-items: center;
  }
}
@media screen and (min-width: 1200px) {
  .wallet-section_container {
    margin-top: 1rem;
    margin-left: -1rem;
    padding-left: 1rem;
    padding-bottom: 1.5rem;
  }
  .fund_list {
    gap: 1rem;
    grid-template-columns: repeat(5, 1fr);
  }
  .el_logo {
    justify-content: center;
  }

  /* CURRENT FUND CONTAINER */
  .current-fund_container {
    margin-left: .5rem;
    margin-right: .5rem;
  }

  /* TRANSACTION */
  .transaction_container {
    /* margin-left: .5rem;
    margin-right: .5rem; */
  }
  /* MESH */
  .mesh_info {
    align-items: center; 
    gap: 24px;
  }
  .mesh_profit {
    gap: .5rem;
    display: flex; 
    align-items: center;
  }
  .mesh_footer {
    align-items: center;
  }
}
</style>
