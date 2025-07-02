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
  // {
  //   id: 1,
  //   bandID: 0,
  //   name: 'all',
  //   title: 'Всего'
  // },
  {
    id: 1,
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
  // name: 'all',
  // title: 'Всего',
  // bandID: 0,
  // id: 1
  name: 'personal',
  title: 'Личные',
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
// const wallet_sections = ref([
//   {
//     id: 1,
//     title: 'Свободные средства',
//     name: 'available',
//     total: 136187.50,
//     aticles: [

//     ]
//   },
//   {
//     id: 2,
//     title: 'Фонда',
//     total: 203705.14,
//     name: 'invested_stock',
//     aticles: [

//     ]
//   },
//   {
//     id: 3,
//     title: 'Крипта',
//     total: 203705.14,
//     name: 'invested_crypto',
//     aticles: [

//     ]
//   },
//   {
//     id: 4,
//     title: 'Вклады',
//     total: 203705.14,
//     name: 'invested_deposit',
//     aticles: [

//     ]
//   },
//   {
//     id: 5,
//     title: 'Валюта',
//     total: 203705.14,
//     name: 'invested_currency',
//     aticles: [

//     ]
//   },
//   {
//     id: 6,
//     title: 'Выдано займов',
//     total: 203705.14,
//     name: 'credits',
//     aticles: [

//     ]
//   },
//   {
//     id: 6,
//     title: 'Займы',
//     total: 203705.14,
//     name: 'invested_loan',
//     aticles: [

//     ]
//   },
//   {
//     id: 7,
//     title: 'Старт проекты',
//     total: 203705.14,
//     name: 'projects',
//     aticles: [

//     ]
//   },
//   { 
//     id: 8,
//     title: 'Долг',
//     total: 0.00,
//     name: 'debt',
//     aticles: [

//     ]
//   },
//   // { 
//   //   id: 9,
//   //   title: 'Вывод',
//   //   total: 0.00,
//   //   name: 'withdraw',
//   //   aticles: [

//   //   ]
//   // },
//   // { 
//   //   id: 10,
//   //   title: '+Депозит',
//   //   total: 0.00,
//   //   name: 'deposit',
//   //   aticles: [

//   //   ]
//   // },
//   // { 
//   //   id: 11,
//   //   title: 'Расходы',
//   //   total: 0.00,
//   //   name: 'expenses',
//   //   aticles: [

//   //   ]
//   // }
// ])



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
// const wallet_fund_group = ref([
//   {
//     id: 1,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'Накопительные счета'
//   },
//   {
//     id: 2,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'cash',
//     name: 'Наличка'
//   },
//   {
//     id: 3,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'mutual_funds',
//     name: 'ПИФы'
//   },
//   {
//     id: 4,
//     section_id: 2 ,
//     tagName: 'invested_stock',
//     tagType: 'brokerage_account',
//     name: 'Брокерские счета'
//   },
//   {
//     id: 5,
//     section_id: 3,
//     tagName: 'invested_crypto',
//     tagType: 'crypto-wallet',
//     name: 'Кошельки'
//   },
//   {
//     id: 6,
//     section_id: 3,
//     tagName: 'invested_crypto',
//     tagType: 'crypto-stock',
//     name: 'Балансы бирж'
//   },
//   {
//     id: 7,
//     section_id: 3,
//     tagName: 'invested_crypto',
//     tagType: 'crypto-stacking',
//     name: 'Стэйкинг'
//   },
//   {
//     id: 8,
//     section_id: 4,
//     tagName: 'invested_deposit',
//     tagType: 'deposit-capitalize',
//     name: 'С капитализацией'
//   },
//   {
//     id: 9,
//     section_id: 4,
//     tagName: 'invested_deposit',
//     tagType: 'deposit-wocapitalize',
//     name: 'Без капитализации'
//   },
//   {
//     id: 10,
//     section_id: 5,
//     tagName: 'invested_currency',
//     tagType: 'currency-usd',
//     name: 'Доллар'
//   },
//   {
//     id: 11,
//     section_id: 5,
//     tagName: 'invested_currency',
//     tagType: 'currency-cny',
//     name: 'Юань'
//   },
//   {
//     id: 12,
//     section_id: 5,
//     tagName: 'invested_currency',
//     tagType: 'currency-hkd',
//     name: 'Гонконский доллар'
//   },
//   {
//     id: 13,
//     section_id: 6,
//     tagName: 'credits',
//     tagType: 'credits-interest',
//     name: 'Кредит Процентный'
//   },
//   {
//     id: 14,
//     section_id: 6,
//     tagName: 'credits',
//     tagType: 'credits-free',
//     name: 'Кредит Беспроцентный'
//   },
//   {
//     id: 15,
//     section_id: 9,
//     tagName: 'withdraw',
//     tagType: 'withdraw-salary',
//     name: 'Зарплаты'
//   },
//   {
//     id: 16,
//     section_id: 9,
//     tagName: 'withdraw',
//     tagType: 'withdraw-dividends',
//     name: 'Дивиденды'
//   },
//   {
//     id: 16,
//     section_id: 10,
//     tagName: 'deposit',
//     tagType: 'deposit-weekly-contributions',
//     name: 'Еженедельные взносы'
//   },
//   {
//     id: 17,
//     section_id: 10,
//     tagName: 'deposit',
//     tagType: 'deposit-gift',
//     name: 'Дар'
//   },
//   {
//     id: 19,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'debet_card',
//     name: 'Дебетовая карта'
//   },
// ])
//= conspirators funds

// const conspirators_fund = ref([
//   {
//     id: 1,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'LambOfArt BOT',
//     brokerTag: 'SBER',
//     invested: 4000.00,
//     price: 4178.70,
//     currency: 'RUB',
//     conspirators: [
//       {
//         userID: 2,
//         userType: 'conspirator'
//       }
//     ]
//   },
//   {
//     id: 2,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'brokerage_account',
//     name: 'BOT',
//     brokerTag: 'T-Bank',
//     invested: 123383.61,
//     price: 141694.55,
//     currency: 'RUB',
//     conspirators: [
//       {
//         userID: 1,
//         userType: 'user'
//       },
//       {
//         userID: 2,
//         userType: 'conspirator'
//       }
//     ]
//   },
//   {
//     id: 2,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'Запасы',
//     brokerTag: 'SBER',
//     invested: 34.05,
//     price: 34.05,
//     currency: 'RUB'
//   },
//   {
//     id: 4,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'mutual_funds',
//     name: 'Фонд локальный',
//     brokerTag: 'SBER',
//     invested: 300.00,
//     price: 308.75,
//     currency: 'RUB'
//   },
//   {
//     id: 5,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'ЕС',
//     brokerTag: 'SBER',
//     invested: 4681.41,
//     price: 4681.41, 
//     currency: 'RUB'
//   },
//   {
//     id: 6,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'АС',
//     brokerTag: 'SBER',
//     invested: 5385.01,
//     price: 5385.01,
//     currency: 'RUB'
//   },
//   {
//     id: 7,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'ЮС',
//     brokerTag: 'SBER',
//     invested: 513.46,
//     price: 513.46,
//     currency: 'RUB'
//   },
//   {
//     id: 8,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'ДомИнввест',
//     brokerTag: 'SBER',
//     invested: 3362.37,
//     price: 3362.37,
//     currency: 'RUB'
//   },
//   {
//     id: 9,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'Юнидрам',
//     brokerTag: 'VTB',
//     invested: 3090.64,
//     price: 3090.64,
//     currency: 'RUB'
//   },
//   {
//     id: 10,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'ЕС',
//     brokerTag: 'VTB',
//     invested: 350.55,
//     price: 350.55,
//     currency: 'RUB'
//   },
//   {
//     id: 11,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'ЮС',
//     brokerTag: 'VTB',
//     invested: 5.08,
//     price: 5.08,
//     currency: 'RUB'
//   },
//   {
//     id: 12,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'ЮД',
//     brokerTag: 'VTB',
//     invested: 1.43,
//     price: 1.43,
//     currency: 'RUB'
//   },
//   {
//     id: 13,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'Купоны',
//     brokerTag: 'Yandex',
//     invested: 531.73,
//     price: 531.73,
//     currency: 'RUB'
//   },
//   {
//     id: 14,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'Станция',
//     brokerTag: 'Yandex',
//     invested: 53599.28,
//     price: 53599.28,
//     currency: 'RUB'
//   },
//   {
//     id: 15,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'ЕС',
//     brokerTag: 'Yandex',
//     invested: 23767.03,
//     price: 23767.03,
//     currency: 'RUB'
//   },
//   {
//     id: 16,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'ЕС ФИИ',
//     brokerTag: 'Yandex',
//     invested: 265.48,
//     price: 265.48,
//     currency: 'RUB'
//   },
//   {
//     id: 17,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'ЮС',
//     brokerTag: 'Yandex',
//     invested: 1726.05,
//     price: 1726.05,
//     currency: 'RUB'
//   },
//   {
//     id: 18,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'Соучастники',
//     brokerTag: 'Yandex',
//     invested: 2194.12,
//     price: 2194.12,
//     currency: 'RUB'
//   },
//   {
//     id: 19,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'Соучастники ФИИ',
//     brokerTag: 'Yandex',
//     invested: 1421.14,
//     price: 1421.14,
//     currency: 'RUB'
//   },
//   {
//     id: 20,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'ЮД',
//     brokerTag: 'Yandex',
//     invested: 1128.00,
//     price: 1128.00,
//     currency: 'RUB'
//   },
//   {
//     id: 21,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'ЮС',
//     brokerTag: 'T-Bank',
//     invested: 510.66,
//     price: 510.66,
//     currency: 'RUB'
//   },
//   {
//     id: 22,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'Юнидрам',
//     brokerTag: 'T-Bank',
//     invested: 5547.09,
//     price: 5547.09,
//     currency: 'RUB'
//   },
//   {
//     id: 23,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'ИС',
//     brokerTag: 'Renesans',
//     invested: 9467.49,
//     price: 9467.49,
//     currency: 'RUB'
//   },
//   {
//     id: 24,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'Магнит',
//     brokerTag: 'Renessans',
//     invested: 3687.60,
//     price: 3687.60,
//     currency: 'RUB'
//   },
//   {
//     id: 25,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'saving_account',
//     name: 'ИС',
//     brokerTag: 'BCS',
//     invested: 379.51,
//     price: 379.51,
//     currency: 'RUB'
//   },
//   {
//     id: 26,
//     section_id: 1,
//     tagName: 'available',
//     tagType: 'cash',
//     name: 'ЮС',
//     brokerTag: 'SBER',
//     invested: 4970.00,
//     price: 4970.00,
//     currency: 'RUB'
//   },
//   {
//     id: 27,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'mutual_funds',
//     name: 'Фонд российских облигаций',
//     brokerTag: 'SBER',
//     invested: 300.00,
//     price: 321.63,
//     currency: 'RUB'
//   },
//   {
//     id: 28,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'mutual_funds',
//     name: 'Фонд Накопительный',
//     brokerTag: 'SBER',
//     invested: 300.00,
//     price: 329.89,
//     currency: 'RUB'
//   },
//   {
//     id: 29,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'brokerage_account',
//     name: 'Инвесткопилка',
//     brokerTag: 'T-Bank',
//     invested: 866.46,
//     price: 866.46,
//     currency: 'RUB'
//   },
//   {
//     id: 30,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'brokerage_account',
//     name: 'Валюта',
//     brokerTag: 'T-Bank',
//     invested: 0.60,
//     price: 0.60,
//     currency: 'RUB'
//   },
//   {
//     id: 31,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'brokerage_account',
//     name: 'Камини',
//     brokerTag: 'T-Bank',
//     // invested: 2679.00,
//     invested: 2700.00,
//     price: 2679.00,
//     currency: 'RUB'
//   },
//   {
//     id: 32,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'brokerage_account',
//     name: 'Сбер Личный',
//     brokerTag: 'T-Bank',
//     invested: 108054.97,
//     price: 108054.97,
//     currency: 'RUB'
//   },
//   {
//     id: 33,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'brokerage_account',
//     name: 'Альфа-инвестиции Личный',
//     brokerTag: 'Alfa-bank',
//     invested: 217.56,
//     price: 217.56,
//     currency: 'RUB'
//   },
//   {
//     id: 34,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'brokerage_account',
//     name: 'ИС Без имени',
//     brokerTag: 'BCS',
//     invested: 15092.99,
//     price: 15092.99,
//     currency: 'RUB'
//   },
//   {
//     id: 35,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'brokerage_account',
//     name: 'ИИС Личный',
//     brokerTag: 'BCS',
//     invested: 5660.71,
//     price: 5660.71,
//     currency: 'RUB'
//   },
//   {
//     id: 36,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'brokerage_account',
//     name: 'Кит финанс Личный',
//     brokerTag: 'KF',
//     invested: 0.00,
//     price: 0.00,
//     currency: 'RUB'
//   },
//   {
//     id: 37,
//     section_id: 2,
//     tagName: 'invested_stock',
//     tagType: 'brokerage_account',
//     name: 'Цифра брокер Личный',
//     brokerTag: 'CB',
//     invested: 0.00,
//     price: 0.00,
//     currency: 'RUB'
//   },
//   {
//     id: 38,
//     section_id: 3,
//     tagName: 'invested_crypto',
//     tagType: 'crypto-wallet',
//     name: 'BOT',
//     brokerTag: 'Metamask BSC',
//     invested: 234.91,
//     price: 234.91,
//     currency: 'USD'
//   },
//   {
//     id: 39,
//     section_id: 3,
//     tagName: 'invested_crypto',
//     tagType: 'crypto-wallet',
//     name: 'BOT',
//     brokerTag: 'Telegram Wallet',
//     invested: 93.42,
//     price: 93.42,
//     currency: 'USD'
//   },
//   {
//     id: 40,
//     section_id: 3,
//     tagName: 'invested_crypto',
//     tagType: 'crypto-wallet',
//     name: 'Личный',
//     brokerTag: 'Phantom Wallet',
//     invested: 53.34,
//     price: 249.13,
//     currency: 'USD'
//   },
//   {
//     id: 41,
//     section_id: 3,
//     tagName: 'invested_crypto',
//     tagType: 'crypto-stock',
//     name: 'BOT',
//     brokerTag: 'Binance',
//     invested: 0.00,
//     price: 0.00,
//     currency: 'USD'
//   },
//   {
//     id: 42,
//     section_id: 3,
//     tagName: 'invested_crypto',
//     tagType: 'crypto-stacking',
//     name: 'BOT',
//     brokerTag: 'MTT',
//     invested: 0.00,
//     price: 0.00,
//     currency: 'MTT',
//     ownerType: 'conspirators',
//     ownerId: 2
//   },
//   {
//     id: 43,
//     section_id: 4,
//     tagName: 'invested_deposit',
//     tagType: 'deposit-capitalize',
//     name: 'Личный',
//     brokerTag: 'SBER',
//     invested: 0.00,
//     price: 0.00,
//     currency: 'RUB'
//   },
//   {
//     id: 44,
//     section_id: 4,
//     tagName: 'invested_deposit',
//     tagType: 'deposit-wocapitalize',
//     name: 'Личный',
//     brokerTag: 'SBER',
//     invested: 0.00,
//     price: 0.00,
//     currency: 'RUB'
//   },
//   {
//     id: 45,
//     section_id: 5,
//     tagName: 'invested_currency',
//     tagType: 'currency-usd',
//     name: 'Личный',
//     brokerTag: 'T-Bank',
//     invested: 10.00,
//     price: 10.00,
//     currency: 'USD',
//     ownerType: 'user',
//     ownerId: 1
//   },
//   {
//     id: 46,
//     section_id: 5,
//     tagName: 'invested_currency',
//     tagType: 'currency-cny',
//     name: 'Личный',
//     brokerTag: 'T-Bank',
//     invested: 271.00,
//     price: 271.00,
//     currency: 'CNY'
//   },
//   {
//     id: 47,
//     section_id: 5,
//     tagName: 'invested_currency',
//     tagType: 'currency-hkd',
//     name: 'Личный',
//     brokerTag: 'T-Bank',
//     invested: 21.00,
//     price: 21.00,
//     currency: 'HKD'
//   },
//   {
//     id: 48,
//     section_id: 9,
//     tagName: 'withdraw',
//     tagType: 'withdraw-dividends',
//     name: 'Sergey Anfalov',
//     brokerTag: 'Банковская карта',
//     invested: 1000.00,
//     price: 1000.00,
//     currency: 'RUB'
//   },
//   {
//     id: 49,
//     section_id: 10,
//     tagName: 'deposit',
//     tagType: 'deposit-weekly-contributions',
//     name: 'Sergey Anfalov',
//     brokerTag: 'ЕС',
//     invested: 100.00,
//     price: 100.00,
//     currency: 'RUB'
//   },
//   {
//     id: 50,
//     section_id: 10,
//     tagName: 'deposit',
//     tagType: 'deposit-weekly-contributions',
//     name: 'Dzagi',
//     brokerTag: 'ЕС',
//     invested: 100.00,
//     price: 100.00,
//     currency: 'RUB'
//   },
//   {
//     id: 51,
//     section_id: 10,
//     tagName: 'deposit',
//     tagType: 'deposit-weekly-contributions',
//     name: 'Sergy Anfalov',
//     brokerTag: 'ЕС',
//     invested: 1000.00,
//     price: 1000.00,
//     currency: 'RUB',
//   },
//   {
//     id: 52,
//     section_id: 19,
//     tagName: 'available',
//     tagType: 'debet_card',
//     name: 'Serey Anfalov',
//     brokerTag: 'SBER',
//     invested: 1000.00,
//     price: 1000.00,
//     currency: 'RUB',
//     ownerType: 'user',
//     ownerId: 1
//   },
// ])

// const ledger = ref([
// {
//     id: 1,
//     created_at: '2024-12-07 17:48:02',
//     //
//     fund_type: 'invested_stock',
//     fund_tag: 'brokerage_account',
//     fund_id: 2,
//     recieved_amount: 1.00,
//     recieved_amount_price: 500.00,
//     recieved_amount_currency: 'RUB',
//     //
//     operation_type: 'invest',
//     operator_id: 1,
//     //
//     from_fund_type: 'available',
//     from_fund_tag: 'saving_account',
//     from_fund_id: 5,
//     send_amount: 1.00,
//     send_amount_price: 500.00,
//     send_amount_currency: 'RUB',
//   },
//   {
//     id: 2,
//     created_at: '2024-12-07 17:48:02', 
//     // 
//     fund_type: 'invested_stock',
//     fund_tag: 'brokerage_account',
//     fund_id: 4,
//     recieved_amount: 1.00,
//     recieved_amount_price: 300.00,
//     recieved_amount_currency: 'RUB',
//     //
//     operation_type: 'invest',
//     operator_id: 1,
//     //
//     from_fund_type: 'available',
//     from_fund_tag: 'debet_card',
//     from_fund_id: 47,
//     ssend_amount: 1.00,
//     send_amount_price: 300.00,
//     send_amount_currency: 'RUB',
//   },
//   {
//     id: 3,
//     created_at: '2024-12-07 17:48:02',
//     //
//     fund_type: 'deposit',
//     fund_tag: 'saving_account',
//     fund_id: 1,
//     recieved_amount: 1.00,
//     recieved_amount_price: 1000.00,
//     recieved_amount_currency: 'RUB',
//     //
//     operation_type: 'deposit',
//     operator_id: 1,
//     //
//     from_fund_type: 'available',
//     from_fund_tag: 'saving_account',
//     from_fund_id: 5,
//     send_amount: 1.00,
//     send_amount_price: 1000.00,
//     send_amount_currency: 'RUB',
//   },
//   {
//     id: 4,
//     created_at: '2024-12-07 17:48:02',
//     //
//     fund_type: 'deposit',
//     fund_tag: 'saving_account',
//     fund_id: 1,
//     recieved_amount: 1.00,
//     recieved_amount_price: 4000.00,
//     recieved_amount_currency: 'RUB',
//     //
//     operation_type: 'deposit',
//     operator_id: 1,
//     //
//     from_fund_type: 'available',
//     from_fund_tag: 'saving_account',
//     from_fund_id: 5,
//     send_amount: 1,
//     send_amount_price: 4000.00,
//     send_amount_currency: 'RUB',
//   },
//   {
//     id: 5,
//     created_at: '2024-12-07 17:48:02',
//     //
//     fund_type: 'available',
//     fund_tag: 'saving_account',
//     fund_id: 5,
//     recieved_amount: 1.00,
//     recieved_amount_price: 15000.00,
//     recieved_amount_currency: 'RUB',
//     //
//     operation_type: 'withdraw',
//     operator_id: 1,
//     //
//     from_fund_type: 'invested_stock',
//     from_fund_tag: 'brokerage_account',
//     from_fund_id: 2,
//     send_amount: 1.00,
//     send_amount_price: 15000.00,
//     send_amount_currency: 'RUB',
//   },
//   {
//     id: 6,
//     created_at: '2024-12-07 17:48:02',
//     //
//     fund_type: 'invested_crypto',
//     fund_tag: 'crypto-wallet',
//     fund_id: 35,
//     recieved_amount: 1.00,
//     recieved_amount_price: 91.72,
//     recieved_amount_currency: 'USD',
//     //
//     operation_type: 'invest',
//     operator_id: 1,
//     //
//     from_fund_type: 'available',
//     from_fund_tag: 'saving_account',
//     from_fund_id: 5,
//     send_amount: 1.00,
//     send_amount_price: 10000.00,
//     send_amount_currency: 'RUB',
//     // sign
//     sign_user_id: 'conspirator',
//     sign_user_type: 2
//   },
//   {
//     id: 7,
//     created_at: '2024-12-08 17:48:02',
//     //
//     fund_type: 'deposit',
//     fund_tag: 'saving_account',
//     fund_id: 15,
//     recieved_amount: 1.00,
//     recieved_amount_price: 100.00,
//     recieved_amount_currency: 'RUB',
//     //
//     operation_type: 'donation weekly',
//     operator_id: 1,
//     //
//     from_fund_type: 'available',
//     from_fund_tag: 'debet_card',
//     from_fund_id: 52,
//     send_amount: 1.00,
//     send_amount_price: 100.00,
//     send_amount_currency: 'RUB',
//   },
//   {
//     id: 8,
//     created_at: '2024-12-08 17:48:02',
//     //
//     fund_type: 'deposit',
//     fund_tag: 'saving_account',
//     fund_id: 15,
//     recieved_amount: 1.00,
//     recieved_amount_price: 100.00,
//     recieved_amount_currency: 'RUB',
//     //
//     operation_type: 'donation',
//     operator_id: 1,
//     //
//     from_fund_type: 'available',
//     from_fund_tag: 'debet_card',
//     from_fund_id: 52,
//     send_amount: 1.00,
//     send_amount_price: 100.00,
//     send_amount_currency: 'RUB',
//   }
// ])

// COMPUTED
// conspirators_fund
// const conspirators_fund_computed = computed(() => {


//   const array = [...conspirators_fund.value].filter((fund) => {
//     return fund.tagName === choosenChip_section.value
//   })

//   return array
// })
// const ledger = ref([
//     // qty             Int      @default(0)
//     // amount           Decimal  @default(0)
//     // measure         String   @db.VarChar(255)
//     // {
//     //   id: 1,
//     //   created_at: '2017-05-28T18:33:53.000Z',
//     //   //
//     //   from_item_id: 0,
//     //   from_item_tag: 'income',
//     //   from_item_type: 'cash',
//     //   from_item_qty: 1,
//     //   from_item_amount: 100.00,
//     //   from_item_currency: 'RUB',
//     //   //
//     //   target_item_id: 26,
//     //   target_item_tag: 'available',
//     //   target_item_type: 'cash',
//     //   target_item_qty: 1,
//     //   target_item_amount: 100.00,
//     //   target_item_currency: 'RUB',
//     //   //
//     //   fee: 0.00,
//     //   purpose: 'Личные сбережения',
//     //   comments: '',
//     //   //
//     //   author_id: 2,
//     //   author_type: 'user'
//     // },
//     // {
//     //   id: 2,
//     //   created_at: '2017-05-28T18:53:53.000Z',
//     //   //
//     //   from_item_id: 26,
//     //   from_item_tag: 'available',
//     //   from_item_type: 'cash',
//     //   from_item_qty: 1,
//     //   from_item_amount: 100.00,
//     //   from_item_currency: 'RUB',
//     //   //
//     //   target_item_id: 11,
//     //   target_item_tag: 'available',
//     //   target_item_type: 'cash',
//     //   target_item_qty: 1,
//     //   target_item_amount: 100.00,
//     //   target_item_currency: 'RUB',
//     //   //
//     //   fee: 0.00,
//     //   purpose: 'donation',
//     //   comments: '',
//     //   //
//     //   author_id: 2,
//     //   author_type: 'user'
//     // },
//     // {
//     //   id: 3,
//     //   created_at: '2017-05-28T19:33:53.000Z',
//     //   //
//     //   from_item_id: 0,
//     //   from_item_tag: 'income',
//     //   from_item_type: 'cash',
//     //   from_item_qty: 1,
//     //   from_item_amount: 15.00,
//     //   from_item_currency: 'RUB',
//     //   //
//     //   target_item_id: 26,
//     //   target_item_tag: 'available',
//     //   target_item_type: 'cash',
//     //   target_item_qty: 1,
//     //   target_item_amount: 15.00,
//     //   target_item_currency: 'RUB',
//     //   //
//     //   fee: 0.00,
//     //   purpose: 'Личные сбережения',
//     //   comments: '',
//     //   //
//     //   author_id: 2,
//     //   author_type: 'user'
//     // },
//     // {
//     //   id: 4,
//     //   created_at: '2017-05-28T18:53:53.000Z',
//     //   //
//     //   from_item_id: 26,
//     //   from_item_tag: 'available',
//     //   from_item_type: 'cash',
//     //   from_item_qty: 1,
//     //   from_item_amount: 15.00,
//     //   from_item_currency: 'RUB',
//     //   //
//     //   target_item_id: 11,
//     //   target_item_tag: 'available',
//     //   target_item_type: 'cash',
//     //   target_item_qty: 1,
//     //   target_item_amount: 15.00,
//     //   target_item_currency: 'RUB',
//     //   //
//     //   fee: 0.00,
//     //   purpose: 'donation',
//     //   comments: '',
//     //   //
//     //   author_id: 2,
//     //   author_type: 'user'
//     // },
//     // {
//     //   id: 5,
//     //   created_at: '2017-06-02T12:00:00.000Z',
//     //   //
//     //   from_item_id: 0,
//     //   from_item_tag: 'income',
//     //   from_item_type: 'cash',
//     //   from_item_qty: 1,
//     //   from_item_amount: 300.00,
//     //   from_item_currency: 'RUB',
//     //   //
//     //   target_item_id: 27,
//     //   target_item_tag: 'available',
//     //   target_item_type: 'cash',
//     //   target_item_qty: 1,
//     //   target_item_amount: 300.00,
//     //   target_item_currency: 'RUB',
//     //   //
//     //   fee: 0.00,
//     //   purpose: 'Личные сбережения',
//     //   comments: '',
//     //   //
//     //   author_id: 1,
//     //   author_type: 'user'
//     // },
//     // {
//     //   id: 6,
//     //   created_at: '2017-06-02T12:01:00.000Z',
//     //   //
//     //   from_item_id: 27,
//     //   from_item_tag: 'available',
//     //   from_item_type: 'cash',
//     //   from_item_qty: 1,
//     //   from_item_amount: 300.00,
//     //   from_item_currency: 'RUB',
//     //   //
//     //   target_item_id: 11,
//     //   target_item_tag: 'available',
//     //   target_item_type: 'cash',
//     //   target_item_qty: 1,
//     //   target_item_amount: 300.00,
//     //   target_item_currency: 'RUB',
//     //   //
//     //   fee: 0.00,
//     //   purpose: 'donation',
//     //   comments: '',
//     //   //
//     //   author_id: 1,
//     //   author_type: 'user'
//     // },
//     // {
//     //   id: 7,
//     //   created_at: '2017-06-02T12:02:00.000Z',
//     //   //
//     //   from_item_id: 0,
//     //   from_item_tag: 'income',
//     //   from_item_type: 'cash',
//     //   from_item_qty: 1,
//     //   from_item_amount: 50.00,
//     //   from_item_currency: 'RUB',
//     //   //
//     //   target_item_id: 27,
//     //   target_item_tag: 'available',
//     //   target_item_type: 'cash',
//     //   target_item_qty: 1,
//     //   target_item_amount: 50.00,
//     //   target_item_currency: 'RUB',
//     //   //
//     //   fee: 0.00,
//     //   purpose: 'Личные сбережения',
//     //   comments: '',
//     //   //
//     //   author_id: 1,
//     //   author_type: 'user'
//     // },
//     // {
//     //   id: 8,
//     //   created_at: '2017-06-02T12:03:00.000Z',
//     //   //
//     //   from_item_id: 27,
//     //   from_item_tag: 'available',
//     //   from_item_type: 'cash',
//     //   from_item_qty: 1,
//     //   from_item_amount: 50.00,
//     //   from_item_currency: 'RUB',
//     //   //
//     //   target_item_id: 11,
//     //   target_item_tag: 'available',
//     //   target_item_type: 'cash',
//     //   target_item_qty: 1,
//     //   target_item_amount: 50.00,
//     //   target_item_currency: 'RUB',
//     //   //
//     //   fee: 0.00,
//     //   purpose: 'donation',
//     //   comments: '',
//     //   //
//     //   author_id: 1,
//     //   author_type: 'user'
//     // },
//     // {
//     //   id: 9,
//     //   created_at: '2017-06-05T12:00:00.000Z',
//     //   //
//     //   from_item_id: 0,
//     //   from_item_tag: 'income',
//     //   from_item_type: 'cash',
//     //   from_item_qty: 1,
//     //   from_item_amount: 1000.00,
//     //   from_item_currency: 'RUB',
//     //   //
//     //   target_item_id: 26,
//     //   target_item_tag: 'available',
//     //   target_item_type: 'cash',
//     //   target_item_qty: 1,
//     //   target_item_amount: 1000.00,
//     //   target_item_currency: 'RUB',
//     //   //
//     //   fee: 0.00,
//     //   purpose: 'Личные сбережения',
//     //   comments: '',
//     //   //
//     //   author_id: 2,
//     //   author_type: 'user'
//     // },
//     // {
//     //   id: 10,
//     //   created_at: '2017-06-05T12:01:00.000Z',
//     //   //
//     //   from_item_id: 26,
//     //   from_item_tag: 'available',
//     //   from_item_type: 'cash',
//     //   from_item_qty: 1,
//     //   from_item_amount: 1000.00,
//     //   from_item_currency: 'RUB',
//     //   //
//     //   target_item_id: 11,
//     //   target_item_tag: 'available',
//     //   target_item_type: 'cash',
//     //   target_item_qty: 1,
//     //   target_item_amount: 1000.00,
//     //   target_item_currency: 'RUB',
//     //   //
//     //   fee: 0.00,
//     //   purpose: 'donation',
//     //   comments: '',
//     //   //
//     //   author_id: 2,
//     //   author_type: 'user'
//     // },
//     // {
//     //   id: 11,
//     //   created_at: '2017-06-05T12:02:00.000Z',
//     //   //
//     //   from_item_id: 0,
//     //   from_item_tag: 'income',
//     //   from_item_type: 'cash',
//     //   from_item_qty: 1,
//     //   from_item_amount: 151.00,
//     //   from_item_currency: 'RUB',
//     //   //
//     //   target_item_id: 26,
//     //   target_item_tag: 'available',
//     //   target_item_type: 'cash',
//     //   target_item_qty: 1,
//     //   target_item_amount: 151.00,
//     //   target_item_currency: 'RUB',
//     //   //
//     //   fee: 0.00,
//     //   purpose: 'donation',
//     //   comments: '',
//     //   //
//     //   author_id: 2,
//     //   author_type: 'user'
//     // },
//     // {
//     //   id: 12,
//     //   created_at: '2017-06-05T12:03:00.000Z',
//     //   //
//     //   from_item_id: 26,
//     //   from_item_tag: 'available',
//     //   from_item_type: 'cash',
//     //   from_item_qty: 1,
//     //   from_item_amount: 151.00,
//     //   from_item_currency: 'RUB',
//     //   //
//     //   target_item_id: 11,
//     //   target_item_tag: 'available',
//     //   target_item_type: 'cash',
//     //   target_item_qty: 1,
//     //   target_item_amount: 151.00,
//     //   target_item_currency: 'RUB',
//     //   //
//     //   fee: 0.00,
//     //   purpose: 'donation',
//     //   comments: '',
//     //   //
//     //   author_id: 2,
//     //   author_type: 'user'
//     // },
//   //  {
//   //     id: 13,
//   //     created_at: '2017-06-05T12:04:00.000Z',
//   //     //
//   //     from_item_id: 11,
//   //     from_item_tag: 'available',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 1145.13,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 28,
//   //     target_item_tag: 'invested_project',
//   //     target_item_type: 'start_up',
//   //     target_item_qty: 1,
//   //     target_item_amount: 1145.13,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: '0506Проект2017',
//   //     comments: '',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 14,
//   //     created_at: '2017-06-05T12:05:00.000Z',
//   //     //
//   //     from_item_id: 28,
//   //     from_item_tag: 'invested_project',
//   //     from_item_type: 'start_up',
//   //     from_item_qty: 1,
//   //     from_item_amount: 1145.13,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 0,
//   //     target_item_tag: 'expenses',
//   //     target_item_type: 'goods',
//   //     target_item_qty: 1,
//   //     target_item_amount: 1145.13,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Закуп0506Проект2017',
//   //     comments: 'Закупили брелки разные',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 15,
//   //     created_at: '2017-06-07T12:00:00.000Z',
//   //     //
//   //     from_item_id: 0,
//   //     from_item_tag: 'income',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 50.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 27,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 50.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Личные сбережения',
//   //     comments: '',
//   //     //
//   //     author_id: 1,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 16,
//   //     created_at: '2017-06-07T12:01:00.000Z',
//   //     //
//   //     from_item_id: 27,
//   //     from_item_tag: 'available',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 50.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 11,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 50.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'donation',
//   //     comments: '',
//   //     //
//   //     author_id: 1,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 17,
//   //     created_at: '2017-06-10T12:00:00.000Z',
//   //     //
//   //     from_item_id: 0,
//   //     from_item_tag: 'income',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 100.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 26,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 100.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Личные сбережения',
//   //     comments: '',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 18,
//   //     created_at: '2017-06-10T12:01:00.000Z',
//   //     //
//   //     from_item_id: 26,
//   //     from_item_tag: 'available',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 100.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 11,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 100.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'donation',
//   //     comments: '',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 19,
//   //     created_at: '2017-06-10T12:02:00.000Z',
//   //     //
//   //     from_item_id: 0,
//   //     from_item_tag: 'income',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 29.13,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 26,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 29.13,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Личные сбережения',
//   //     comments: '',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 20,
//   //     created_at: '2017-06-10T12:03:00.000Z',
//   //     //
//   //     from_item_id: 26,
//   //     from_item_tag: 'available',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 29.13,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 11,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 29.13,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'donation',
//   //     comments: '',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 21,
//   //     created_at: '2017-06-15T12:00:00.000Z',
//   //     //
//   //     from_item_id: 0,
//   //     from_item_tag: 'income',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 100.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 26,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 100.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Личные сбережения',
//   //     comments: '',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 22,
//   //     created_at: '2017-06-15T12:01:00.000Z',
//   //     //
//   //     from_item_id: 26,
//   //     from_item_tag: 'available',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 100.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 11,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 100.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'donation',
//   //     comments: '',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 23,
//   //     created_at: '2017-06-18T12:00:00.000Z',
//   //     //
//   //     from_item_id: 0,
//   //     from_item_tag: 'income',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 260.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 27,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 260.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Личные сбережения',
//   //     comments: '',
//   //     //
//   //     author_id: 1,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 24,
//   //     created_at: '2017-06-18T12:01:00.000Z',
//   //     //
//   //     from_item_id: 27,
//   //     from_item_tag: 'available',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 260.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 11,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 260.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'donation',
//   //     comments: '',
//   //     //
//   //     author_id: 1,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 25,
//   //     created_at: '2017-06-24T12:00:00.000Z',
//   //     //
//   //     from_item_id: 0,
//   //     from_item_tag: 'income',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 190.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 27,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 190.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Личные сбережения',
//   //     comments: '',
//   //     //
//   //     author_id: 1,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 26,
//   //     created_at: '2017-06-24T12:01:00.000Z',
//   //     //
//   //     from_item_id: 27,
//   //     from_item_tag: 'available',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 190.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 11,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 190.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'donation',
//   //     comments: '',
//   //     //
//   //     author_id: 1,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 27,
//   //     created_at: '2017-06-24T12:02:00.000Z',
//   //     //
//   //     from_item_id: 0,
//   //     from_item_tag: 'income',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 500.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 26,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 500.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Личные сбережения',
//   //     comments: '',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 28,
//   //     created_at: '2017-06-24T12:03:00.000Z',
//   //     //
//   //     from_item_id: 26,
//   //     from_item_tag: 'available',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 500.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 11,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 500.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'donation',
//   //     comments: '',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 29,
//   //     created_at: '2017-06-30T12:00:00.000Z',
//   //     //
//   //     from_item_id: 0,
//   //     from_item_tag: 'income',
//   //     from_item_type: 'cash_sale',
//   //     from_item_qty: 1,
//   //     from_item_amount: 250.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 11,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 250.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Доход0506Проект2017',
//   //     comments: '',
//   //     //
//   //     author_id: 1,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 30  ,
//   //     created_at: '2017-06-30T12:00:00.000Z',
//   //     //
//   //     from_item_id: 0,
//   //     from_item_tag: 'income',
//   //     from_item_type: 'cash_sale',
//   //     from_item_qty: 1,
//   //     from_item_amount: 200.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 11,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 200.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Доход0506Проект2017',
//   //     comments: '',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 31,
//   //     created_at: '2017-07-04T12:00:00.000Z',
//   //     //
//   //     from_item_id: 0,
//   //     from_item_tag: 'income',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 200.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 27,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 200.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Личные сбережения',
//   //     comments: '',
//   //     //
//   //     author_id: 1,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 32,
//   //     created_at: '2017-07-04T12:01:00.000Z',
//   //     //
//   //     from_item_id: 27,
//   //     from_item_tag: 'available',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 200.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 11,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 200.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'donation',
//   //     comments: '',
//   //     //
//   //     author_id: 1,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 33,
//   //     created_at: '2017-09-04T12:01:00.000Z',
//   //     //
//   //     from_item_id: 0,
//   //     from_item_tag: 'income',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 200.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 27,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 200.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Личные сбережения',
//   //     comments: '',
//   //     //
//   //     author_id: 1,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 34,
//   //     created_at: '2017-09-04T12:01:00.000Z',
//   //     //
//   //     from_item_id: 27,
//   //     from_item_tag: 'available',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 200.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 11,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 200.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'donation',
//   //     comments: '',
//   //     //
//   //     author_id: 1,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 35,
//   //     created_at: '2017-09-04T12:02:00.000Z',
//   //     //
//   //     from_item_id: 0,
//   //     from_item_tag: 'income',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 50.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 26,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 50.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Личные сбережения',
//   //     comments: '',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 36,
//   //     created_at: '2017-09-04T12:03:00.000Z',
//   //     //
//   //     from_item_id: 26,
//   //     from_item_tag: 'available',
//   //     from_item_type: 'cash',
//   //     from_item_qty: 1,
//   //     from_item_amount: 50.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 11,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 50.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'donation',
//   //     comments: '',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
//   //  {
//   //     id: 37  ,
//   //     created_at: '2017-09-09T12:00:00.000Z',
//   //     //
//   //     from_item_id: 0,
//   //     from_item_tag: 'income',
//   //     from_item_type: 'cash_sale',
//   //     from_item_qty: 1,
//   //     from_item_amount: 200.00,
//   //     from_item_currency: 'RUB',
//   //     //
//   //     target_item_id: 11,
//   //     target_item_tag: 'available',
//   //     target_item_type: 'cash',
//   //     target_item_qty: 1,
//   //     target_item_amount: 200.00,
//   //     target_item_currency: 'RUB',
//   //     //
//   //     fee: 0.00,
//   //     purpose: 'Доход0506Проект2017',
//   //     comments: '',
//   //     //
//   //     author_id: 2,
//   //     author_type: 'user'
//   //   },
// ])

// POPUP
// info total amount
const info_total_popup_isOpened = ref(false)


//= transaction popup
const transaction_popup_isOpened = ref(false)
const transaction_el = ref({})
const transaction_onClick = (transaction) => {
  transaction_popup_isOpened.value = !transaction_popup_isOpened.value
  transaction_el.value = transaction

}

const isOwnerExist = () => {

}

//= transaction ledger
const transaction_ledger_computed = computed(() => {

  // transaction_ledger.value?.forEach(transaction => {
    
  //   meshes_computed.value?.forEach(mesh => {
  //     let from_obj = translateMeshByID(transaction?.from_mesh_id)
  //     let receive_obj = translateMeshByID(transaction?.receive_mesh_id)
  //     if(mesh.id === transaction.from_mesh_id || mesh.id === transaction.receive_mesh_id) {


  //       if(from_obj && receive_obj) {

  //         array.push({
  //           id: transaction.id,
  //           // DETAILS
  //           created_at: transaction.created_at,
  //           purpose: transaction.purpose,
  //           fee: transaction.fee,
  //           comments: transaction.comments,
  //           storageID: receive_obj?.storageID,
  //           bid: receive_obj?.bid,
  //           // FROM
  //           from_mesh_type: from_obj?.type,
  //           from_mesh_tag: from_obj?.tag,
  //           from_mesh_name: from_obj?.name,
  //           from_mesh_broker_tag: from_obj?.broker_tag,
  //           from_mesh_currency: transaction.from_mesh_currency,
  //           from_mesh_amount: transaction.from_mesh_amount,
  //           from_mesh_price: transaction.from_mesh_price,
  //           from_mesh_owner_id: from_obj?.ownerID, 
  //           from_mesh_owner_type: from_obj?.ownerType,
  //           // RECIEVE
  //           receive_mesh_type: receive_obj?.type,
  //           receive_mesh_tag: receive_obj?.tag,
  //           receive_mesh_name: receive_obj?.name,
  //           receive_mesh_broker_tag: receive_obj?.broker_tag,
  //           receive_mesh_currency: transaction.receive_mesh_currency,
  //           receive_mesh_amount: transaction.receive_mesh_amount,
  //           receive_mesh_price: transaction.receive_mesh_price,
  //           receive_mesh_owner_id: receive_obj?.ownerID, 
  //           receive_mesh_owner_type: receive_obj?.ownerType,
  //           // LOANER
  //           loaner_id: receive_obj?.loanerID,
  //           loaner_type: receive_obj?.loanerType,
  //           loaner_mesh_id: receive_obj?.loanerMeshID,
  //           // AUTHOR
  //           authorID: transaction.authorID,
  //           authorType: transaction.authorType
  //         })
  //       } else {
  //         array.push({
  //           id: transaction.id,
  //           // DETAILS
  //           created_at: transaction.created_at,
  //           purpose: transaction.purpose,
  //           fee: transaction.fee,
  //           comments: transaction.comments,
  //           storageID: receive_obj?.storageID,
  //           // FROM
  //           from_mesh_type: from_obj?.type,
  //           from_mesh_tag: from_obj?.tag,
  //           from_mesh_name: from_obj?.name,
  //           from_mesh_broker_tag: from_obj?.broker_tag,
  //           from_mesh_currency: transaction.from_mesh_currency,
  //           from_mesh_amount: transaction.from_mesh_amount,
  //           from_mesh_price: transaction.from_mesh_price,
  //           from_mesh_owner_id: from_obj?.ownerID, 
  //           from_mesh_owner_type: from_obj?.ownerType,
  //           // RECIEVE
  //           receive_mesh_type: receive_obj?.type,
  //           receive_mesh_tag: receive_obj?.tag,
  //           receive_mesh_name: receive_obj?.name,
  //           receive_mesh_broker_tag: receive_obj?.broker_tag,
  //           receive_mesh_currency: transaction.receive_mesh_currency,
  //           receive_mesh_amount: transaction.receive_mesh_amount,
  //           receive_mesh_price: transaction.receive_mesh_price,
  //           receive_mesh_owner_id: receive_obj?.ownerID, 
  //           receive_mesh_owner_type: receive_obj?.ownerType, 
  //           // AUTHOR
  //           authorID: transaction.authorID,
  //           authorType: transaction.authorType
  //         })
  //       }

  //     }
  //   })
  // })
  // if(array.length) {

  //   array.reverse()

  //   const unique = array.filter((obj, idx, arr) => 
  //   idx === arr.findIndex((t) => t.id === obj.id));
  //   return unique
  // }

  let array:any = []
//[...ledger.value]
  array = transaction_ledger?.value?.filter((transaction: any) => {

    let tr;

    meshes_computed.value.forEach((mesh: any) => {

      // mesh.id === transaction.from_item_id 
      // mesh.id === transaction.target_item_id

      // mesh.id === transaction.from_item_id && transaction.target_item_id === 0
      // mesh.id === transaction.target_item_id && transaction.from_item_id === 0
      // mesh.id === transaction.from_item_id || mesh.id === transaction.target_item_id

      if(
        (
          (mesh.id === transaction.from_item_id && transaction.target_item_id === 0) ||
          (mesh.id === transaction.target_item_id && transaction.from_item_id === 0) ||
          (mesh.id === transaction.from_item_id || mesh.id === transaction.target_item_id)
        ) && 
        (mesh.type === transaction.from_item_type || mesh.type === transaction.target_item_type) && (mesh.tag === transaction.from_item_tag || mesh.tag === transaction.target_item_tag)
      ) {

        if(mesh.tag === transaction.from_item_tag && choosenChip_section.value === transaction.from_item_tag) {
          // console.log(
          //   {
          //     transactionID: transaction.id,
          //     from_id: transaction.from_item_id,
          //     target_id: transaction.target_item_id
          //   }
          // )
          tr = transaction
        }
        if(mesh.tag === transaction.target_item_tag && choosenChip_section.value === transaction.target_item_tag) {
          // console.log(
          //   {
          //     transactionID: transaction.id,
          //     from_id: transaction.from_item_id,
          //     target_id: transaction.target_item_id
          //   }
          // )
          tr = transaction
        }
        if (choosenChip_section.value === 'debt_loan' && (transaction.from_item_tag === 'invested_loan' || transaction.target_item_tag === 'invested_loan')) {
          // console.log(
          //   {
          //     transactionID: transaction.id,
          //     from_id: transaction.from_item_id,
          //     target_id: transaction.target_item_id
          //   }
          // )
          tr = transaction
        }
      }
      if(choosenChip_section.value === 'invested_loan' ) {
        // if(transaction.purpose === `РезервСредств${mesh.name}` || transaction.purpose === `Погашение${mesh.name}` || transaction.purpose === `ПереводНаПогашение${mesh.name}`) {
  
        //   tr = transaction
        //   // ПереводНаПогашение
        //   // Погашение
        //   // Выдача
        //   // РезерСредств
        // }
        if (transaction.from_item_tag === 'debt_loan' || transaction.target_item_tag === 'debt_loan') {
          // console.log(
          //   {
          //     transactionID: transaction.id,
          //     from_id: transaction.from_item_id,
          //     target_id: transaction.target_item_id
          //   }
          // )
          tr = transaction
        }
      }
      // else if(mesh.tag === 'invested_loan' && transaction.purpose === `Погашение${mesh.name}`) {
      //   tr = transaction
      // }
      else if (choosenChip_section.value === 'invested_project') {
        if(transaction.purpose === `Доход${mesh.name}`) {
          tr = transaction
        }
      }

    })

    return tr
    // 
    // if(transaction.from_item_tag === choosenChip_section.value || transaction.target_item_tag === choosenChip_section.value) { 
    //   // console.log(transaction)
    //   // console.log(meshes_computed.value)
    //   return transaction
    // }
    // else if (choosenChip_section.value === 'debt_loan' && (transaction.from_item_tag === 'invested_loan' || transaction.target_item_tag === 'invested_loan')) {
    //   // console.log(transaction)
    //   // console.log(meshes_computed.value)
    //   return transaction
    // }
    // else{
      
    // }

  })

  return array
})

//= meshes tags
const mesh_tag_computed = computed(() => {

  if(meshes_computed.value) {

    return [...new Set([...meshes_computed.value.map((obj: any) => {
      return obj.tag
    })])]
  }
  // return [
  //   'available', 'invested_stock', 'invested_loan', 'invested_crypto', 'debt_loan'
  // ]
}) 

//= meshes array
const meshes_computed = computed(() => {
  // Собираем всевозможные mesh (available, invested, debt)
  
  let result:any = []
  if(mesh_list.value, loan_list.value) {
    // Дебеторки
    mesh_list.value?.forEach(item => {
      result.push(item)
    })
    // Изначально дебиторка, но если пользователь или банда являются заемщиками - переквалифицируем tag как долговой mesh
    loan_list.value.forEach(item => {
      if(currentAffiliation.value.name === 'personal' && (item.loanerType === 'user' && item.loanerID === sessionUser.value.id) || currentAffiliation.value.name !== 'personal' && (item.loanerType === 'conspirator' && item.loanerID === currentAffiliation.value.bandID)) {
        result.push({
          id: item.id,
          created_at: item.created_at,
          name: item.name,
          type: item.type,
          // Для должников меняем tag invested_loan на debt_loan
          tag: 'debt_loan',
          ownerID: item.ownerID,
          ownerType: item.ownerType,
          loanerID: item.loanerID,
          loanerType: item.loanerType,
          bid: item.bid,
          amount: item.amount
        })
      } else{
        result.push(item)
      }
    })
    // Фильтруем полученный массив мешков (result)
    // Если Мешки являются личными и принадлежат session user или есть займы...
    if(currentAffiliation.value.name === 'personal') {
      return result.filter((item: any) => (item.ownerType === 'user' && item.ownerID === sessionUser.value.id) || (item.loanerType === 'user' && item.loanerID === sessionUser.value.id))
    } 
    // Если мешки принадлежат банде или у банды есть займы
    else {
      return result.filter((item: any) => (item.ownerType === 'conspirator' && item.ownerID === currentAffiliation.value.bandID) || (item.loanerType === 'conspirator' && item.loanerID === currentAffiliation.value.bandID))
    }
  }

  // return mesh_list.value
    // if(el.tag === choosenChip_section.value) {

      // if(currentAffiliation.value.name === 'all' && el.ownerID === sessionUser.value.id) {
      //   return el
      // }
      // if (currentAffiliation.value.name === 'personal' && el.ownerType === 'user' && el.ownerID === sessionUser.value.id) {
      //   return el
      // } 
      // else if (el.ownerType === 'conspirator' && el.ownerID === currentAffiliation.value.bandID) {

      //   return el
      // }
    // } 
    // else if (choosenChip_section.value === 'debt_loan') {
    //   if(currentAffiliation.value.name === 'personal' && el.loanerType === 'user' && el.loanerID === sessionUser.value.id) {
    //     return el
    //   }
    //   else if (currentAffiliation.value.name === 'band' && el.loanerType === 'conspirator' && el.loanerID === el.loanerID) {
    //     return el
    //   }
    // }
  // })
})
//= band list
const band_computed = computed(() => {
  return band.value
})
//= partner list
const partner_computed = computed(() => {
  return partner.value
})
//= bank list
const bank_computed = computed(() => {
  return bank.value
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
// const filterMeshByWalletType = (type: string, array: any) => {
//   const result = [...array].filter(el => el.type === type)

//   return result
// }

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
  // let mesh = mesh_list?.value?.find(el => {
  //   if(el.id === meshID) {
  //     // if(currentAffiliation.value.name === 'all' && el.ownerID === sessionUser.value.id) {
  //     //   return el
  //     // }
  //     if (currentAffiliation.value.name === 'personal' && el.ownerID === sessionUser.value.id) {
  //       return el
  //     } 
  //     else if (el.ownerType === 'conspirator' && el.ownerID === currentAffiliation.value.bandID) {

  //       return el
  //     }
  //   }
  // })

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
  let mesh = mesh_list?.value?.find(el => {
    if(el.id === meshID) {
      // if(currentAffiliation.value.name === 'all' && el.ownerID === sessionUser.value.id) {
      //   return el
      // }
      if (currentAffiliation.value.name === 'personal' && el.ownerID === sessionUser.value.id) {
        return el
      } 
      else if (el.ownerType === 'conspirator' && el.ownerID === currentAffiliation.value.bandID) {

        return el
      }
    } 
  })

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

        // PAYMENT (оплата займа)
        if(transaction.purpose === 'payment') {
          if(transaction.receive_mesh_id === meshID) {
            
            result -= transaction.receive_mesh_amount * transaction.receive_mesh_price
          } 
          // находим mesh, который указан как storage кредитного счета
          if(mesh_list?.value?.find(el => {
            if(el.id === mesh?.storageID) {
              // if(currentAffiliation.value.name === 'all') {
              //   return el
              // }
              if (currentAffiliation.value.name === 'personal' && el.ownerID === sessionUser.value.id) {
                return el
              } 
              else if (el.ownerType === 'conspirator' && el.ownerID === currentAffiliation.value.bandID) {

                return el
              }
            }
          })) {
            // переназначаем мешок получения
            // transaction.from_mesh_id = mesh?.storageID
            // уменьшаем долг по кредиту
            result -= transaction.receive_mesh_amount * transaction.receive_mesh_price
            transaction.receive_mesh_id = mesh?.storageID
            
          }

        } 
        // ISSUE (Выдача займа)
        else if (transaction.purpose === 'issue') {
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
  // let result = 0;
  // let mesh;
  // if(mesh_list.value?.length) {
  //   mesh = mesh_list.value.find(mesh => {
  //       if(mesh.id === meshID) {
  //       //   if(currentAffiliation.value.name === 'all') {
  //       //   return mesh
  //       // }
  //       if (currentAffiliation.value.name === 'personal' && mesh.ownerID === sessionUser.value.id) {
  //         return mesh
  //       } 
  //       else if (mesh.ownerType === 'conspirator' && mesh.ownerID === currentAffiliation.value.bandID) {

  //         return mesh
  //       }
  //     }
  //   })
  // }
  // let invested = calcMeshInvested(meshID)
  // let available = calcMeshAvailable(meshID)

  // if(mesh?.bid) {
  //   result = -(available - (invested + invested * mesh.bid))

  // } else {

  //   result = available - invested
  // }


  // return result

}
// calc mesh profit in percentage
// const calcMeshProfitPercent = (meshID: number) => {
//= cal cTransaction Amount
const calcTransactionAmount = (qty: number, amount, from_item_id, target_item_id) => {
  if(from_item_id === 0 && target_item_id > 0) {
    return `+${qty * amount}`
  } else if(from_item_id > 0 && target_item_id === 0){
    return `-${qty * amount}`
  } else {
    if(meshes_computed.value.find(item => item.tag === choosenChip_section.value && item.id === from_item_id)) {
      return `-${qty * amount}`
    } else {
      return `+${qty * amount}`
    }
  }
}
// calc crypto pair
const calcCryptoPair = (tr: any) => {
 //transaction.target_item_currency, transaction.target_item_qty, transaction.target_item_amount, transaction.fee
  let btcrub = 718286.59999

  if(tr.target_item_currency === 'BTC') {
    
    return (tr.target_item_qty * tr.target_item_amount - tr.fee) * btcrub;
  }
  else if(tr.from_item_currency === 'BTC') {
    
    return (tr.from_item_qty * tr.from_item_amount - tr.fee) * btcrub;
  }
  else {
    // return tr.from_item_qty * tr.from_item_amount - tr.fee
    return 0
  }

}
// CALC MESH
//=  calc mesh amount
const calcMeshAmount = (mesh_id:number, mesh_type:string, mesh_tag:string, mesh_name: string, mesh_bid: any) => {
  
  let acc = 0
  transaction_ledger_computed?.value?.forEach((transaction: any) => {

    // FROM
    if(mesh_id === transaction.from_item_id) {
      if(transaction.target_item_tag === 'expenses') {
        acc -= transaction.from_item_qty * transaction.from_item_amount
      }

      else if (transaction.from_item_tag === 'available') {


        if(mesh_tag !== 'invested_loan' ) {
          acc -= transaction.from_item_qty * transaction.from_item_amount
        }

      }

      else if (transaction.from_item_tag === 'invested_project') {
        if(transaction.purpose.slice(0,5) === `Закуп`) {
          acc -= transaction.from_item_qty * transaction.from_item_amount
        }
      }
      else if (transaction.target_item_tag === 'invested_loan') {
        // if(transaction.purpose.slice(0,5) === `Выдача`) {
          // }
        if(mesh_tag === 'invested_loan' && mesh_id === transaction.target_item_id) {
          acc -= transaction.from_item_qty * transaction.from_item_amount
        }
      }
      else if (mesh_tag === 'invested_crypto') {

        if(mesh_id === transaction.from_item_id && transaction.from_item_tag === 'invested_crypto') {
          acc -= transaction.from_item_qty * transaction.from_item_amount
        }
        if(mesh_id === transaction.target_item_id && transaction.target_item_tag === 'invested_crypto') {
          if(transaction.purpose.slice(0,4) === `Свап`) {

            acc += calcCryptoPair(transaction)
          } else {
            acc += transaction.from_item_qty * transaction.from_item_amount
          }
        }
      }
      
    }
    // TARGET
    else if(mesh_id === transaction.target_item_id) {
      if (transaction.from_item_tag === 'income') {
        acc += transaction.from_item_qty * transaction.from_item_amount
      }
      else if(transaction.target_item_tag === 'available' && mesh_tag !== 'invested_loan') {
        acc += transaction.target_item_qty * transaction.target_item_amount
      }
      else if(transaction.target_item_tag === 'invested_project') {
        if(transaction.purpose.slice(0,6) === `Выдача`) {
          acc += transaction.target_item_qty * transaction.target_item_amount
        } 
      }
      else if(transaction.target_item_tag === 'invested_loan') {

        // EPMTY / ПУСТО
      }
      else if(transaction.target_item_tag === 'debt_loan') {
        if(transaction.purpose === `Погашение${mesh_name}`) {
          acc += transaction.target_item_qty * transaction.target_item_amount
        }
      }
      else if (transaction.target_item_tag === 'invested_crypto') {
        
        if(transaction.purpose.slice(0,6) === `Выдача`) {
          acc += transaction.from_item_qty * transaction.from_item_amount
        } 

      }
      else if (transaction.target_item_tag === 'invested_stock') {
        
        if(transaction.purpose.slice(0,6) === `Выдача`) {
          acc += transaction.from_item_qty * transaction.from_item_amount
        } 

      }
    }
    // 
    else if(transaction.purpose === `Доход${mesh_name}`) {
        acc += transaction.from_item_qty * transaction.from_item_amount
    }
  })

  // return `${mesh_tag}-${mesh_type}_${mesh_id}`
  if(mesh_tag === 'debt_loan' || mesh_tag === 'invested_loan') {
    // return acc * -1
    return acc
  } else {
    return acc
  }
}
//== actual invested project mesh amount
const calc_mesh_invested_project_amount_actual = (mesh_id: number) => {
  let invested_amount = 0;
  let invested_returned = 0;

  let mesh = meshes_computed.value.find(el => el.id === mesh_id)

  if(mesh) {
    transaction_ledger?.value?.forEach(transaction => {
      if(mesh.id === transaction.target_item_id && transaction.target_item_tag === 'invested_project') {
        invested_amount += +transaction.from_item_qty * +transaction.from_item_amount
      }
      // CALC invested_returned
      if(transaction.purpose === `Доход${mesh.name}`) {
        invested_returned += +transaction.from_item_qty * +transaction.from_item_amount
      }

    })
  }


  if(invested_returned - invested_amount === 0) {
    return `${(invested_returned - invested_amount).toFixed(2)} ${currency_to_show.value.ticket} / 0.00%`
  } 
  else if (invested_returned - invested_amount > 0) {
    if(invested_amount === 0) {
      return `+${(invested_returned - invested_amount).toFixed(2)} ${currency_to_show.value.ticket} / +0.00%`
    } else {
      return `+${(invested_returned - invested_amount).toFixed(2)} ${currency_to_show.value.ticket} / +${((invested_returned - invested_amount) / invested_amount * 100).toFixed(2)}%`
    }
  }
  else {

    return `${(invested_returned - invested_amount).toFixed(2)} ${currency_to_show.value.ticket} / ${((invested_returned - invested_amount) / invested_amount * 100).toFixed(2)}%`
  }
}
//= actual invested crypto mesh amount
const calc_mesh_invested_crypto_actual = (mesh_id: number) => {
  let invested_amount = 0;
  let withdraw = 0;
  let invested_returned = 0;
  let acc = 0
  transaction_ledger_computed?.value?.forEach((transaction: any) => {

    if(mesh_id === transaction.target_item_id && transaction.target_item_tag === 'invested_crypto') {
    // invested_returned += 1
      if(transaction.purpose.slice(0,4) === `Свап`) {
        invested_returned += calcCryptoPair(transaction)
      } 
      else {
        invested_returned += +transaction.target_item_qty * +transaction.target_item_amount
      }
    }
    if(mesh_id === transaction.from_item_id && transaction.from_item_tag === 'invested_crypto') {

      invested_amount += +transaction.from_item_qty * +transaction.from_item_amount
      if(transaction.purpose.slice(0,5) === `Доход`) {
        invested_returned += +transaction.from_item_qty * +transaction.from_item_amount
      }
    }
  })
  // if(!Number.isNaN(invested_returned / invested_amount)) {
  //   return `${((invested_returned - invested_amount) - invested_amount).toFixed(2)} ${currency_to_show.value.ticket} / ${(((invested_returned - invested_amount) - invested_amount) * 100 / invested_amount).toFixed(2)}%`
  // } 
  // else {
  //   return `${invested_amount.toFixed(2)} ${currency_to_show.value.ticket} / 0.00%`
  // }
  return `Инвестировано: ${invested_amount} | withdraw: ${withdraw} | returned: ${invested_returned}`
}
//== actual invested stock mesh amount
const calc_mesh_invested_stock_actual = (mesh_id: number) => {
  let invested_amount = 0;
  let withdraw = 0;
  let invested_returned = 0;

  let meshes_group = meshes_computed.value.filter(el => el.tag === 'invested_stock')

  transaction_ledger_computed?.value?.forEach((transaction: any) => {
    meshes_group?.forEach(mesh => {
        if (mesh.id === transaction.from_item_id && transaction.from_item_tag === 'invested_stock' && mesh.id === mesh_id)
        {
          // Вывод1002Брокерскийсчет2021
          if(transaction.purpose.slice(0,5) === `Вывод`) {
            withdraw += +transaction.from_item_qty * +transaction.from_item_amount
          }
        }
    })
  })

  return `withdraw: ${withdraw} | returned: ${invested_returned}`
}



// CALC in SECTIONs
//= section amount
const calcSectionAmount = (current_section: any) => {
  
  let amount = 0
  let meshes_group = meshes_computed.value.filter(el => el.tag === current_section)

  if(current_section === 'available') {


    transaction_ledger?.value?.forEach(transaction => {

      meshes_group?.forEach(mesh => {

        // FROM
        if(mesh.id === transaction.from_item_id) {
          if(transaction.target_item_tag === 'expenses') {
            amount -= transaction.from_item_qty * transaction.from_item_amount
          }
          else if (transaction.from_item_tag === 'available') {
            if(mesh.tag !== 'invested_loan' ) {
              amount -= transaction.from_item_qty * transaction.from_item_amount
            }
          }
          else if (transaction.from_item_tag === 'invested_project') {
            if(transaction.purpose.slice(0,5) === `Закуп`) {
              amount -= transaction.from_item_qty * transaction.from_item_amount
            }
          }
          else if (transaction.target_item_tag === 'invested_loan') {
            // if(transaction.purpose.slice(0,5) === `Выдача`) {
              // }
            if(mesh.tag === 'invested_loan' && mesh.id === transaction.target_item_id) {
              amount -= transaction.from_item_qty * transaction.from_item_amount
            }
          }
        }
        // TARGET
        else if(mesh.id === transaction.target_item_id) {
          if (transaction.from_item_tag === 'income') {
            amount += transaction.from_item_qty * transaction.from_item_amount
          }
          else if(transaction.target_item_tag === 'available') {
            amount += transaction.target_item_qty * transaction.target_item_amount
          }
          else if(transaction.target_item_tag === 'invested_project') {
            if(transaction.purpose.slice(0,6) === `Выдача`) {
              amount += transaction.target_item_qty * transaction.target_item_amount
            } 
          }
          else if(transaction.target_item_tag === 'invested_loan') {


          }
          else if(transaction.target_item_tag === 'debt_loan') {
            if(transaction.purpose === `Погашение${mesh.name}`) {
              amount += transaction.target_item_qty * transaction.target_item_amount
            }
          }
        }
        // ETC
        else if(transaction.purpose === `Доход${mesh.name}`) {
            amount += transaction.from_item_qty * transaction.from_item_amount
        }
      })

    })

    return `${amount.toFixed(2)}`
  } 
  if (current_section === 'invested_stock') {
    transaction_ledger?.value?.forEach(transaction => {

      meshes_group?.forEach((mesh: any) => {
        
        if(mesh.id === transaction.from_item_id) {
          amount -= +transaction.from_item_qty * +transaction.from_item_amount
        }
        else if (mesh.id === transaction.target_item_id) {
          amount = +transaction.target_item_qty * +transaction.target_item_amount
        }
        
      })

    })

    // return `${amount.toFixed(2)} ${ currency_to_show.value.ticket }`
    return 'В разработке...'
  }
  if(current_section === 'invested_project') {
    // CALC INVESTED MONEY IN ALL PROJECTS
    transaction_ledger?.value?.forEach(transaction => {
      meshes_group?.forEach((mesh:any) => {
        // if(mesh.id === transaction.target_item_id && transaction.target_item_tag === 'invested_project') {
        //   amount += +transaction.from_item_qty * +transaction.from_item_amount
        // }
        if (transaction.purpose === `Выдача${mesh.name}`) {
          amount += +transaction.target_item_qty * +transaction.target_item_amount
          // +2,356.25
        } 
        else if (transaction.purpose === `Доход${mesh.name}`) {
          amount += +transaction.target_item_qty * +transaction.target_item_amount
          // +2,300.00
          // +400.00
          // +800.00
          // +50.00
        } 
        else if (transaction.purpose === `Закуп${mesh.name}`) {
          amount -= +transaction.from_item_qty * +transaction.from_item_amount
          // -2,356.25
        }
      })
    })

    return `${amount.toFixed(2)} ${ currency_to_show.value.ticket }`
    // return 0
  }
  if (current_section === 'invested_loan') {
    let invested_amount = 0;
    let waiting_amount = 0;
    let overage = 0;

    transaction_ledger?.value?.forEach(transaction => {
      
      
      meshes_group?.forEach(mesh => {

        if(mesh.id === transaction.target_item_id && transaction.target_item_tag === 'invested_loan') {

          invested_amount += mesh.amount
          waiting_amount += mesh.amount + (mesh.amount * mesh.bid)

          amount += +transaction.target_item_qty * +transaction.target_item_amount
          amount += +transaction.target_item_qty * +transaction.target_item_amount * mesh.bid
        }
        else if (mesh.id === transaction.target_item_id && transaction.target_item_tag === 'invested_loan') {
          amount -= +transaction.target_item_qty * +transaction.target_item_amount

        }
        
        else if (transaction.purpose === `Погашение${mesh.name}`) {
          amount -= +transaction.target_item_qty * +transaction.target_item_amount

        }

        else if (mesh.id === transaction.target_item_id) {
          if(amount < 0) {
            overage = amount
          }
        }
      })
      
    })
    if(amount < 0) {

      return `К получению: 0.00 ${ currency_to_show.value.ticket }`
    } else {

      // return `К получению: ${(amount - overage).toFixed(2)} ${ currency_to_show.value.ticket }`
      return `overage: ${overage} | invested_amount: ${invested_amount} | waiting_amount: ${waiting_amount}`
    }
  }
  if (current_section === 'debt_loan') {
    let invested_amount = 0;
    let waiting_amount = 0;
    let overage = 0;

    transaction_ledger?.value?.forEach(transaction => {

      meshes_group?.forEach(mesh => {

        if(mesh.id === transaction.target_item_id && transaction.target_item_tag === 'invested_loan') {

          invested_amount += mesh.amount
          waiting_amount += mesh.amount + (mesh.amount * mesh.bid)

          amount += +transaction.target_item_qty * +transaction.target_item_amount
          amount += +transaction.target_item_qty * +transaction.target_item_amount * mesh.bid
        }
        else if (mesh.id === transaction.target_item_id && transaction.target_item_tag === 'debt_loan' && transaction.purpose === `Погашение${mesh.name}`) {
          amount -= +transaction.target_item_qty * +transaction.target_item_amount

        }

        else if (mesh.id === transaction.target_item_id) {
          if(amount < 0) {
            overage = amount
          }
        }
        
      })

    })

    // return `${((amount * -1) + overage).toFixed(2)} ${currency_to_show.value.ticket}`
    return `invested: ${invested_amount} | waiting: ${waiting_amount} | overage: ${overage}`
  }
  if (current_section === 'invested_crypto') {
    transaction_ledger?.value?.forEach(transaction => {
      meshes_group?.forEach((mesh:any) => {
        

        if(mesh.id === transaction.from_item_id && transaction.from_item_tag === 'invested_crypto') {
          amount -= transaction.from_item_qty * transaction.from_item_amount
        }
        if(mesh.id === transaction.target_item_id && transaction.target_item_tag === 'invested_crypto') {
          if(transaction.purpose.slice(0,4) === `Свап`) {

            amount += calcCryptoPair(transaction)
          } else {
            amount += transaction.from_item_qty * transaction.from_item_amount
          }
        }
      })
    })

    // return `${amount.toFixed(2)} ${ currency_to_show.value.ticket }`
    return 'В разработке...'
  }
  else {
    return 'В разработке...'
  }
}
//= invested project
//== section
const calcSectionInvested_project = (current_section: any) => {
  // Доход0506Проект2017
  // Закуп0506Проект2017
  // 0506Проект2017
  let invested_amount = 0
  let invested_returned = 0
  let meshes_group = meshes_computed.value.filter(el => el.tag === current_section)
  if (current_section === 'invested_project') {
    transaction_ledger?.value?.forEach(transaction => {

      meshes_group?.forEach((mesh: any) => {

        //  income transactions
        if(mesh.id === transaction.target_item_id && transaction.target_item_tag === 'invested_project' ) {
          invested_amount += +transaction.from_item_qty * +transaction.from_item_amount
        }

        // CALC invested_returned
        if(transaction.purpose === `Доход${mesh.name}`) {
          invested_returned += +transaction.from_item_qty * +transaction.from_item_amount
        }

      })


    })

    if(invested_returned - invested_amount === 0) {
      return `${(invested_returned - invested_amount).toFixed(2)} ${currency_to_show.value.ticket} / 0.00%`
    } 
    else if (invested_returned - invested_amount > 0) {
      if(invested_amount === 0) {
        return `+${(invested_returned - invested_amount).toFixed(2)} ${currency_to_show.value.ticket} / +0.00%`
      } else {
        return `+${(invested_returned - invested_amount).toFixed(2)} ${currency_to_show.value.ticket} / +${((invested_returned - invested_amount) / invested_amount * 100).toFixed(2)}%`
      }
    }
    else {

      return `${(invested_returned - invested_amount).toFixed(2)} ${currency_to_show.value.ticket} / ${((invested_returned - invested_amount) / invested_amount * 100).toFixed(2)}%`
    }





  }
}
//==  invested loan
const calcSectionInvested_loan = (current_section: any) => {
  let amount = 0;
  let invested_amount = 0;
  let waiting_amount = 0;
  let overage = 0;
  let returned_amount = 0;
  if(current_section === 'invested_loan') {
  
  
    let meshes_group = meshes_computed.value.filter(el => el.tag === current_section)
  
    transaction_ledger?.value?.forEach(transaction => {
  
      meshes_group?.forEach(mesh => {
  
          // if(mesh.id === transaction.target_item_id && transaction.target_item_tag === 'invested_loan') {
  
          //   invested_amount += mesh.amount
          //   waiting_amount += mesh.amount + (mesh.amount * mesh.bid)
          // }

          // if(mesh.id === transaction.from_item_id && transaction.from_item_tag !== 'invested_loan' ) {
          //   amount -= +transaction.from_item_qty * +transaction.from_item_amount
          // }
          // else if (mesh.id === transaction.target_item_id) {
          //   if(transaction.purpose.substring(0, 9) === 'Погашение') {
          //     amount -= +transaction.target_item_qty * +transaction.target_item_amount
          //     returned_amount += +transaction.target_item_qty * +transaction.target_item_amount
          //   } else {

          //     amount += +transaction.target_item_qty * +transaction.target_item_amount + (+transaction.target_item_qty * +transaction.target_item_amount * mesh.bid)
          //   }
          //   if(amount < 0) {
          //     overage += amount
          //   }
          // }
        if(mesh.id === transaction.target_item_id && transaction.target_item_tag === 'invested_loan') {

          invested_amount += mesh.amount
          waiting_amount += mesh.amount + (mesh.amount * mesh.bid)

          amount += +transaction.target_item_qty * +transaction.target_item_amount
          amount += +transaction.target_item_qty * +transaction.target_item_amount * mesh.bid
        }
        else if (mesh.id === transaction.target_item_id && transaction.target_item_tag === 'invested_loan') {
          amount -= +transaction.target_item_qty * +transaction.target_item_amount

        }
        
        else if (transaction.purpose === `Погашение${mesh.name}`) {
          amount -= +transaction.target_item_qty * +transaction.target_item_amount

        }

        else if (mesh.id === transaction.target_item_id) {
          if(amount < 0) {
            overage = amount
          }
        }
      })
  
    })
  }
  return `
    Итого: ${(((invested_amount - amount + overage) / invested_amount - 1) * 100).toFixed(2)}% 
    `
    // Факт: ${((invested_amount - amount + overage) - invested_amount).toFixed(2)} ${currency_to_show.value.ticket} / 
    // Инвестировано: ${invested_amount} | 
    // Ожидается: ${waiting_amount} |
    // Вернулось: ${invested_amount - amount + overage} | 
    // Остаток: ${invested_amount - (invested_amount - amount + overage)} |

    // ${((returned_amount + overage) - invested_amount).toFixed(2)} ${currency_to_show.value.ticket} / ${(((returned_amount + overage)/ invested_amount - 1)*100).toFixed(2)}%
}
//== invested crypto
const calcSectionInvested_crypto = (current_section: any) => {
  //Выдача0809Крипта2019
  //Свап0809Крипта2019
  let invested_amount = 0;
  let invested_returned = 0;
  let meshes_group = meshes_computed.value.filter(el => el.tag === current_section)

  if(current_section === 'invested_crypto') {
    transaction_ledger?.value?.forEach(transaction => {
      meshes_group?.forEach((mesh: any) => {

        if(mesh.id === transaction.target_item_id && transaction.target_item_tag === 'invested_crypto') {
          // invested_returned += 1
          if(transaction.purpose.slice(0,4) === `Свап`) {
            invested_returned += calcCryptoPair(transaction)
          } 
          else {
            invested_returned += +transaction.target_item_qty * +transaction.target_item_amount
          }
        }
        if(mesh.id === transaction.target_item_id && transaction.target_item_tag === 'invested_crypto') {
          invested_amount += +transaction.from_item_qty * +transaction.from_item_amount
          if(transaction.purpose.slice(0,5) === `Доход`) {
            invested_returned += +transaction.from_item_qty * +transaction.from_item_amount
          }
        }


      })
    })
  }
  // return `${((invested_returned - invested_amount) - invested_amount).toFixed(2)} ${currency_to_show.value.ticket} / ${(((invested_returned - invested_amount) - invested_amount) * 100 / invested_amount).toFixed(2)}%`
  return `Инвестировано: ${invested_amount} | Вернулось: ${invested_returned}`

}
//== invested stock
const calcSectionInvested_stock = (current_section: any) => {
  //Выдача0902Брокерскийсчет2020
  let invested_amount = 0;
  let invested_returned = 0;
  let withdraw = 0;
  let meshes_group = meshes_computed.value.filter(el => el.tag === current_section)

  if(current_section === 'invested_stock') {
    transaction_ledger?.value?.forEach(transaction => {
      meshes_group?.forEach(mesh => {
        
        if(mesh.id === transaction.target_item_id && transaction.target_item_tag === 'invested_stock') {
          if(transaction.purpose.slice(0,6) === `Выдача`) {
            invested_amount += +transaction.from_item_qty * +transaction.from_item_amount
          }
        }
        else if (mesh.id === transaction.from_item_id && transaction.from_item_tag === 'invested_stock')
        {
          // Вывод1002Брокерскийсчет2021
          if(transaction.purpose.slice(0,5) === `Вывод`) {
            withdraw += +transaction.from_item_qty * +transaction.from_item_amount
          }
        }
          
      })
    })
  } 

  return `invested: ${invested_amount} | withdraw: ${withdraw} | returned: xxx`
}

// TRANSLATE
//= mesh group name
const translateMeshesGroupName = (name: string) => {
  if(name === 'available') {
    return 'Свободные средства'
  } 
  if(name === 'invested_stock') {
    return 'Инвестировано на рынке ценных бумаг'
  }
  if(name === 'invested_project') {
    return 'Баланс проектов'
  }
  if(name === 'invested_crypto') {
    return 'Баланс крипты'
  }
  if(name === 'invested_loan') {
    return 'Финансирование соучастников'
  }
  if(name === 'debt_loan') {
    return 'Долговые обязательства'
  }
  else {
    return name
  }
    
}
// mesh sub group
const translateMashesSubGroup = (type: string) => {
  // available
  if(type === 'cash') {
    return 'Наличка'
  } 
  else if (type === 'saving_account') {
    return 'Накопительные счета'
  }
  else if (type === 'debet_card') {
    return 'Банковские карты'
  }
  // invested_stock
  else if (type === 'brokerage_account') {
    return 'Брокерские счета'
  }
  else if (type === 'cfa_account') {
    return 'Цифровые финансовые активы'
  }
  else if (type === 'mutual_fund') {
    return 'Паевые фонды'
  }
  // LOAN
  else if (type === 'loan_free') {
    return 'Ссуды'
  }
  else if (type === 'loan_interest') {
    return 'Процентные'
  }
  // CRYPTO
  else if (type === 'crypto_wallet') {
    return 'Криптокошельки'
  }
  else if (type === 'crypto_stock') {
    return 'Биржы криптовалют'
  }
  else if (type === 'crypto-stacking') {
    return 'Стейкинг криптовалют'
  }
  else {
    return type
  }
}
// transaction meshes
const translateTransactionMeshes = (tag: string, from_item_type:string, from_item_id:number) => {
  // let mesh;
  // if(mesh_list.value?.length) {
  //   mesh = mesh_list.value.find(mesh => mesh.id === id)
  // }
  // return mesh
  return `${tag}-${from_item_type}_${from_item_id}`
}
//= storageID
// const translateStorageID = (storageID: number) => {
//   let mesh;
//   if(mesh_list.value?.length) {
//     mesh = mesh_list.value.find(mesh => mesh.id === storageID)
//   }
//   return mesh?.name
// }

// HELPERS
//
//= transform number to float
// const transformToFixed = (num: number) => {
//   return num.toFixed(2)
// }

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

  if(mesh_list.value) {
    scrollContainer?.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
    });

  }

  scrollAffiliationContainer?.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollAffiliationContainer.scrollLeft += evt.deltaY;
  });

  choosenChip_section.value = mesh_tag_computed.value ? mesh_tag_computed.value[0] : 'available'


  // POPUP TRANSACTION
  // const transactionPopupContainer = document.getElementById('transaction_popup')
  // console.log(transactionPopupContainer)
  window.addEventListener('click', (event) => {
  
    // transaction popup close
    if(event.target.classList.contains('transaction_popup_container')) {
      transaction_popup_isOpened.value = false; 
      transaction_el.value = {}
    }
    // total popup close
    if(event.target.classList.contains('info_total_popup_container')) {
      info_total_popup_isOpened.value = false; 
    }
  })

  // CRYPTO PRICES GET
  getCoinPrice()
})


// CRYPTO PRICES GET
const getCoinPrice = async () => {
  
  const {data: crypto_price_list} = await useFetch("/api/cryptoPrice/crypto_price", {
    lazy: false,
    transform: (crypto_price_list) => {
      // return Object.entries(crypto_price_list)
      return crypto_price_list
    }
  })

  console.log(`Цена BTC: ${crypto_price_list?.value?.BTCRUB}`)
}

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

// SET
//= set_mesh_link_by_tag
const set_mesh_link_by_tag = (mesh_type: string, mesh_id: number, mesh_tag: string) => {
  switch (mesh_tag) {
    case 'available':
      router.push(`mesh/${mesh_id}`)
      break
    case 'invested_loan': 
      router.push(`loan/${mesh_id}`)
      break
    case 'debt_loan':
      router.push(`loan/${mesh_id}`)
      break
    case 'invested_stock':

      if(mesh_type === 'cfa_account') {
        // alert('Мешок не привязан к CFA-кошельку')

        let cfa_account_id = 0

        cfa.value?.forEach(item => {
          if(item.invested_mash){
            if(item.invested_mash.find(el => el.id === mesh_id)) {
              cfa_account_id = item.id
            }
          }
        })

        if(cfa_account_id === 0) {
          alert('Привязанный cfa кошелек неверный')
        } else {
          router.push(`cfa/${cfa_account_id}`)
        }
      } 
      else if (mesh_type === 'brokerage_account') {

        let brokerage_id = 0
  
  
        brokerage.value?.forEach(item => {
          if(item.invested_mash) {
            if(item.invested_mash.find(el => el.id === mesh_id)) {
              brokerage_id = item.id
            }
          }
        })
  
        if(brokerage_id === 0) {
          alert('Привязанный брокерский счет неверный')
        } else {
          router.push(`brokerage/${brokerage_id}`)
        }
      } 
      else if (mesh_type === 'mutual_fund') {
        alert('Мешок не подвязан к ПИФу')
      } 
      else {
        alert('А сбой какой-то... напишите нам, приложите скрин')
      }
      break
    case 'invested_crypto':
      let crypto_mesh_id = 0

      crypto_mesh.value?.forEach(item => {
        if(item.invested_mash) {
          if(item.invested_mash.find(el => el.id === mesh_id)) {
            crypto_mesh_id = item.id
          }
        }
      })

      if(crypto_mesh_id === 0) {
        alert('Мешок не привязан к крипто-аккаунту')
      } else {
        router.push(`crypto/${crypto_mesh_id}`)
      }
      break
    case 'invested_project':
      let project_mesh_id = 0

      project_mesh.value?.forEach(item => {
        if(item.invested_mesh) {
          if(item.invested_mesh.find(el => el.id === mesh_id)) {
            project_mesh_id = item.id
          }
        }
      })

      if(project_mesh_id === 0) {
        alert('Мешок не привязан к кошельку')
      } else {
        router.push(`projects/${project_mesh_id}`)
      }
      break
    default: 
      alert('некуда')
  }
}
//= set loaner subject by 
const set_attr_data = (item: any) => {
  if(item.tag === 'invested_loan') {

    let loaner

    if(item.loanerType === 'conspirator') {

      loaner = band_computed?.value?.find(el => el.id === item.loanerID)
      return loaner ? loaner.name : 'Неизвестная банда'

    } 

    else if (item.loanerType === 'user') {
      loaner = partner_computed?.value?.find(el => el.userId === item.loanerID)

      return loaner ? `${loaner.surname} ${loaner?.name[0]}. ${loaner?.middleName?.[0]}.` : 'Неизвестный участник'
    }

  } 
  else if (item.tag === 'debt_loan') {

    let owner;

    if(item.ownerType === 'conspirator') {
      owner = band_computed?.value?.find(el => el.id === item.ownerID)
      return owner ? owner.name : 'Неизвестная банда'
    } 
    else if (item.ownerType === 'user') {
      owner = partner_computed?.value?.find(el => el.userId === item.ownerID)
      return owner ? `${owner.surname} ${owner?.name[0]}. ${owner?.middleName?.[0]}.` : 'Неизвестный участник'
    } 
    else if (item.ownerType === 'bank') {
      owner = bank_computed?.value?.find(el => el.id === item.ownerID)
      return owner ? owner.name : 'Неизвестный банк'
    }

  }
}
//= set mesh broker sign bgc
const set_mesh_broker_sign_bgc = (tag: string) => {

  if(tag === 'debt_loan') {
   return 'background-color: var(--color-wallet-fund-debt);'
  } 
  else if (tag.includes('invested')) {
    return 'background-color: var(--color-wallet-fund-invested);'
  }
  else if (tag === 'available') {
    return 'background-color: var(--color-wallet-fund-available);'
  }  
  else {

    return 'background-color: red'
  }
}
//= set route to owner (user / conspirator)
const set_owner_route = () => {
  // Если фонды 
  if(currentAffiliation?.value.bandID !== 0) {
    router.push(`/band/${currentAffiliation?.value.bandID}`)
  } 
  // Если на личную страницу
  else if (currentAffiliation?.value.name === 'personal') {
    
    router.push(`/account`)
  }
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
    // INVESTED  PROJECT
    if(tag === 'invested_project') {
      if(choosenChip_section.value === tag) {
        color = `var(--color-wallet-fund-invested)`
      }
      else {
        //
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
    // // DEBT LOAN
    if(tag === 'debt_loan') {
      if(choosenChip_section.value === tag) {
        // color = `var(--color-wallet-fund-invested-wo)`
        color = `var(--color-wallet-fund-debt)`
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

  // let result = calcMeshProfit(meshID)
  // if(result > 0) {
  //   return `var(--color-urgency-low)`
  // } else if (result  < 0) {
  //   return `var(--color-urgency-high)`
  // } else if (result === 0) {
  //   return `var(--color-btn-wo-bg)`
  // } else {
  //   return `orange!important`
  // }
}

// CALCULATE
//
//= sum total
const sumTotal = (id: number) => {

  // const array = conspirators_fund.value.filter(el => el.section_id === id)
  
  // const sum = array.reduce((acc, el) => {
  //   return acc + el.invested
  // }, 0)
  // return sum.toFixed(2)

}
//= available funds
const sumTotalAvailable = (id: number) => {
  // const array = conspirators_fund.value.filter(el => el.section_id === id)
  
  // const sum = array.reduce((acc, el) => {
  //   return acc + el.price
  // }, 0)
  // return sum.toFixed(2)
}

// AMOUNT
//
//= calc total capitalization
const sumTotalCap = () => {
  // let result  = 0;

  // let result = mesh_list.value?.reduce((acc, mesh) => {
  //   return acc + calcMeshAvailable(mesh.id)
  // }, 0)

  // return result
}
//= calc amount by section 
const sumSectionAmount = (groupType: string) => {
  // let result = 0;
  // mesh_list.value?.filter(el => {
  //   if(el.tag === groupType) {
  //     // if(currentAffiliation.value.name === 'all' && el.ownerID === sessionUser.value.id) {
  //     //   return el
  //     // }
  //     if (currentAffiliation.value.name === 'personal' && el.ownerID === sessionUser.value.id) {
  //       return el
  //     } 
  //     else if (el.ownerType === 'conspirator' && el.ownerID === currentAffiliation.value.bandID) {

  //       return el
  //     }
  //   }
  // }).forEach(mesh => {
  //   result += calcMeshAvailable(mesh.id)
  // })
  // return result
}

// WATCH
//= choosenChip_section
watch(choosenChip_section, () => {
  console.log(`Переключили вкладку на ${choosenChip_section.value}`)
  currentFundParagraph.value = 'meshes'
  // console.log(transaction_ledger_computed.value)
  // console.log(meshes_computed.value)
})
watch(currentAffiliation, () => {
  console.log(currentAffiliation.value)
  // Сбрасываем CAP на ервый ээлемент если есть
  if(mesh_tag_computed?.value?.length) {
    choosenChip_section.value = mesh_tag_computed?.value[0]
  }
  currentFundParagraph.value = 'meshes'
})
watch(transaction_popup_isOpened, () => {
  console.log(`watcher: trasaction popup ${transaction_popup_isOpened.value}`)
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
// loan
const { data: loan_list } = useFetch("/api/loan/loan", {
  lazy: false,
  transform: (loan_list) => {
    return loan_list
  }
})
// brokerage
const {data: brokerage} = useFetch("/api/funds/brokerage", {
  lazy: false,
  transform: (brokerage) => {
    return brokerage
  }
})
// cfa
const { data: cfa } = useFetch("/api/funds/cfa", {
  lazy: false,
  transform: (cfa) => {
    return cfa
  }
})
// crypto_mesh
const { data: crypto_mesh} = useFetch("/api/funds/crypto_mesh", {
  lazy: false,
  transform: (crypto_mesh)  => {
    return crypto_mesh
  }
})
//project
const { data: project_mesh } = useFetch("/api/projectGuarded/project", {
  lazy: false,
  transform: (project_mesh) => {
    return project_mesh
  }
})

// 
// transaction_ledger
const { data: transaction_ledger } = useFetch("/api/transaction/transaction", {
  lazy: false,
  transform: (transaction_ledger) => {
    return transaction_ledger
  }
})


//
//= band
const { data: band } = useFetch("/api/band/band", {
  lazy: false,
  transform: (band) => {

    return band.filter(item => {
      if(item.sharers && sessionUser.value) {
          let sharers = Object.values(item.sharers)

          if(sharers.find(sharer => sharer.userType === 'user' && sharer.userId === sessionUser.value.id )) {

            return item
          } 
        }
    })
  }
})
//= user
const { data: partner } = useFetch("/api/partnerGuarded/partner", {
  lazy: false,
  transform: (partner) => {
    return partner
  }
})
//= bank
const { data: bank } = useFetch("/api/banks/bank", {
  lazy: false,
  transform: (bank) => {
    return bank
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

    <!-- <p style="margin: 0; margin-left: 1rem;">session: {{ sessionUser }}</p> -->



    <!-- ПЕРЕКЛЮЧАТЕЛЬ ФОНДОВ (ЛИЧНЫЕ / БАНДЫ, где session id состоит)-->
    <Chip
      id="affiliation-chip-block"
      :tabs="affiliation_computed"
      :default="currentAffiliation"
      :btn_all_exist="false"
      @changed="changeChipAffiliation"
      style="margin-top: 2rem;"
    />
    <!-- <p>currentAffiliation: {{ currentAffiliation }}</p> -->

    <!-- TOTAL КАПИТАЛИЗАЦИЯ ПО ФОНДУ -->
    <!--  -->
    <div class="total-cap_container">
      
      
      <div class="total-cap_wrapper">
        <div class="total-cap_avatar">
          
          <!-- USER: 7671d7d0538011f08c8dda33849e98dc_1 -->
           <!-- CONSPIRATORS: d2536b5d538611f09581aa35b3d6ca3e_1 -->
          
          <img v-if="currentAffiliation.name === 'personal'" width="256" height="256" alt="Страница на доработке..." src="@/assets/img/band_avatar/7671d7d0538011f08c8dda33849e98dc_1.jpeg"/>
          <img v-else-if="currentAffiliation.name !== 'personal'" width="256" height="256" alt="Страница на доработке..." src="@/assets/img/band_avatar/d2536b5d538611f09581aa35b3d6ca3e_1.jpeg"/>
        </div>
        <div style="margin-top: 1rem; position: relative;">
          <!-- {{ currentAffiliation }} -->
          <!-- <h2 class="total-cap_subtitle">Total:</h2> -->
          <h2 class="total-cap_subtitle">{{currentAffiliation.title}}</h2>
          <p class="total-cap_count">999 999 999.99 {{ currency_to_show.ticket }}</p>
          <p class="total-cap_help" style="cursor: pointer;" @click="info_total_popup_isOpened = true">?</p>
          <div class="action_btn open-details" style="cursor: pointer;" @click="set_owner_route" >
            <p>Перейти в фонд 
              <span>        
                <Icon
                  class="link"
                  name="material-symbols-light:arrow-back-ios"
                  size="18px"
                  color="var(--color-global-baackground_light)"
                />
              </span>
            </p>
          </div>
        </div>
      </div>

    
    </div>

    <!-- POPUP -->
    <!-- TOTAL INFO -->
    <div v-if="info_total_popup_isOpened" id="info_total_popup" class="info_total_popup_container">

      <div class="info_total_popup_wrapper">
        
        <div class="info_total_popup_btn-close" @click.stop="info_total_popup_isOpened = false">
          <p style="margin: 0; color: var(--color-global-text_second);">Как считается:</p>
          <Icon             
            name="material-symbols-light:cancel-outline-rounded"
            size="2rem"
            color="var(--color-global-text)"
          />
        </div>
        <div class="info_total_popup_content">

          <p>В TOTAL не входит: </p>
          <ul>
            <li>Баланс проектов</li>
            <li>Задолежнность по кредитам в разделе "Долговые обязательства"</li>
          </ul>
          <p>В TOTAL входит: </p>
          <ul>
            <li>Сумма из раздела "Свободные средства"</li>
            <li>
              Сумма к получению из раздела "Финансирование соучастников"
            </li>
          </ul>
          <p>Не нашли что искали? Давайте попробуем посомтреть в разделе <nuxt-link to="/help">Помощь</nuxt-link></p>
          <p>Либо напишите нам в разделе <nuxt-link to="/about">Контакты</nuxt-link></p>
        </div>
      </div>
    </div>

    <!-- СЕКЦИИ (ГРУППЫ МЕШКОВ) В КОНКРЕТНОМ ФОНДЕ -->
    <!--  -->
    <div v-if="mesh_list" id="fund-block" class="wallet-section_container">
      <!-- MESH GROUP TAG -->
      <Section 
        v-for="el in mesh_tag_computed"
        :fDirection="`column`"
        :fAlignItems="`flex-start`"
        :fJustifyContent="`space-between`"
        :fGap="`2rem`"
        :bg="setChoosenWalletSectionColor(el)"
        @click="choosenChip_section = el"
        style="cursor: pointer;"
      >
        <p style="width: 160px; height: 3rem; margin: 0; ">{{ translateMeshesGroupName(el) }}</p>

          <!-- FIRST ROW -->
          <p style="white-space: nowrap; margin: 0; font-weight: bold; font-size: 1.6rem;">{{ calcSectionAmount(el) }} {{ currency_to_show.ticket }}</p>

          <!-- SECOND ROW -->
          <!-- INVESTED PROJECT-->
          <p 
            v-if="el === 'invested_project'"
            style="text-wrap: nowrap; margin: 0; margin-top: -2rem; font-size: .8rem;"
            >
            {{ calcSectionInvested_project(el) }}
          </p>
          <!-- INVESTED CRYPTO -->
          <p
            v-else-if="el === 'invested_crypto'"
            style="text-wrap: nowrap; margin: 0; margin-top: -2rem; font-size: .8rem;"
          >
            {{ calcSectionInvested_crypto(el) }}
          </p>

          <!-- INVESTED LOAN -->
          <p
            v-else-if="el === 'invested_loan'"
            style="text-wrap: nowrap; margin: 0; margin-top: -2rem; font-size: .8rem;"
          >
            {{ calcSectionInvested_loan(el) }}
          </p>

          <!-- INVESTED STOCK -->
          <p v-else-if="el === 'invested_stock'" style="text-wrap: nowrap; margin: 0; margin-top: -2rem; font-size: .8rem;">
            {{ calcSectionInvested_stock(el) }}
          </p>
      </Section>
    </div> 
    <!-- {{ choosenChip_section }} -->


    <!-- CHIP -->
    <!-- ПЕРЕКЛЮЧАТЕЛЬ MESH && TRANSACTION  -->
    <div class="current_affiliation_title" style="display: flex; gap: 1rem; align-items: center;">

      <h3 v-for="el in fundParagraph" :class="currentFundParagraph === el.name ? 'title_active' : ''" style="cursor:pointer;">
        <span @click="currentFundParagraph = el.name">

          {{ el.title }}
        </span>
      </h3>

    </div>

    <!-- CURRENT SECTION CONTENT -->
    <!-- ledger && meshes -->
     <section class="current-fund_container">

      <!-- TRANSACTION LEDGER -->
      <div v-if="currentFundParagraph === 'history'" class="current-fund_wrapper">

        <!--if length -->
        <div class="transaction_container" v-if="transaction_ledger_computed?.length">

          <div class="transaction_group_by-date" v-for="date in new Set(transaction_ledger_computed.map(item => item.created_at.slice(0,10)).reverse())">
            <!-- by date -->
             <h4 style="margin: 0;">
               {{ date }}
             </h4>
            <div>
              <!-- TRANSACTION -->
              <section 
                v-for="transaction in transaction_ledger_computed.filter(item => item.created_at.slice(0 ,10) === date).reverse()"
                class="transaction_wrapper"  
                @click="transaction_onClick(transaction)"
              >
 

                <div>
                  {{ translateTransactionMeshes(transaction.from_item_tag, transaction.from_item_type, transaction.from_item_id) }}
                    > 
                  {{ translateTransactionMeshes(transaction.target_item_tag, transaction.target_item_type, transaction.target_item_id) }}
                </div>

                <!-- PURPOSE -->
                <div style="color: var(--color-global-text_second);">
                  {{ transaction.purpose }}
                </div>
                <!-- AMOUNT -->
                <div style="font-weight: bold;">

                  <div v-if="transaction.from_item_id > 0 && transaction.target_item_id > 0">
                    <div v-if="transaction.from_item_currency === transaction.target_item_currency">
                      {{ calcTransactionAmount(transaction.from_item_qty, transaction.from_item_amount, transaction.from_item_id, transaction.target_item_id) }}
                      {{ transaction.from_item_currency }}
                    </div>
                    <div v-else>
                      {{ calcTransactionAmount(transaction.from_item_qty, transaction.from_item_amount, transaction.from_item_id, transaction.target_item_id) }}
                      {{ transaction.from_item_currency }}
                      >
                      {{ calcTransactionAmount(transaction.target_item_qty, transaction.target_item_amount, transaction.from_item_id, transaction.target_item_id) }}
                      {{ transaction.target_item_currency }}
                    </div>
                  </div>

                  <div v-else-if="transaction.from_item_id === 0">
                    {{ calcTransactionAmount(transaction.target_item_qty, transaction.target_item_amount, transaction.from_item_id, transaction.target_item_id) }}
                    {{ transaction.target_item_currency }}
                  </div>

                  <div v-else-if="transaction.target_item_id === 0">
                    {{ calcTransactionAmount(transaction.target_item_qty, transaction.target_item_amount, transaction.from_item_id, transaction.target_item_id) }}
                    {{ transaction.target_item_currency }}
                  </div>
                </div>
    
              </section>
            </div>
          </div>

          <!-- POPUP -->
           <!-- TRANSACTION INFO -->
          <div v-if="transaction_popup_isOpened" class="transaction_popup_container"
          id="transaction_popup"
          >

            <div class="transaction_popup_wrapper">

              <div class="transaction_popup_btn-close" @click.stop="transaction_popup_isOpened = false; transaction_el = {}">
                <p style="margin: 0; color: var(--color-global-text_second);">TID: {{ transaction_el.id }}</p>
                <Icon             
                  name="material-symbols-light:cancel-outline-rounded"
                  size="2rem"
                  color="var(--color-global-text)"
                />
              </div>

              <div class="transaction_popup_content">

                {{ transaction_el.created_at }}
                <br>
                {{ transaction_el.purpose }}
                <br>
                {{ transaction_el.comments }}
                <br>
                <br>

                {{ transaction_el }}

                <!--  -->
                <!-- /// вывнести вв попап

                ///
                TRANSFER
                <div class="transfer_avatar_container">
                  {{ transaction.from_item_qty * transaction.from_item_amount}}{{ transaction.from_item_currency }}
                </div>
                <div class="transfer_avatar_container" v-if="transaction.from_item_id > 0 && transaction.target_item_id > 0">
                
                  <div class="transfer_avatar">
                    {{ transaction.from_item_id }}
                  </div>
                  <div>
                    >
                  </div>
                  <div class="transfer_avatar">
                    {{ transaction.target_item_id }}
                  </div>
                </div>
                              <div>
                  {{ transaction.comments }}
                </div>
                //// -->
              </div>
            </div>
          </div>

        </div>
        <!-- else -->
        <div class="transaction_container" v-else>Нет операций</div>

      </div>

      <!-- MESHES -->
      <div v-if="currentFundParagraph === 'meshes'" class="current-fund_wrapper">
        <!-- LENGTH -->
        <div v-if="meshes_computed?.length">
          <div style="margin-top: 2rem; cursor: pointer;">
            
            <ul style="list-style: none; padding: 0; display: flex; gap: 1rem;">
              <li>
                <input type="checkbox" id="mesh_status_completed">
                <label for="mesh_status_completed">Завершенные</label>
              </li>
              <li>
                <input type="checkbox" id="mesh_status_process">
                <label for="mesh_status_process">В процессе</label>
              </li>
            </ul>
          </div>

          <section 
            v-for="type in [...new Set([...meshes_computed.filter((item: any) => item.tag === choosenChip_section).map(obj => {
              return obj.type
            }) ])]"
            class="mesh_group_container"
          > 
            <header><h4>{{ translateMashesSubGroup(type) }}</h4></header>
            <main>
              <ul class="mesh_container" style="padding: 0; list-style: none;">
                <li 
                  class="mesh_wrapper"
                  style="cursor: pointer; position: relative;"
                  v-for="item in meshes_computed.filter(el => el.type === type).reverse()"
                  @click="set_mesh_link_by_tag(item.type, item.id, item.tag)"
                > 
                  <div
                  class="mesh_broker-sign"
                  :style="set_mesh_broker_sign_bgc(item.tag)"
                  >
                    {{ item.broker_tag?.[0] }}
                  </div>
                  <div class="mesh_content">
                    <!-- {{ item }} -->
                      
                    <p class="mesh_content-el">{{ item.id }} | {{ item.name }}</p>
                    <p class="mesh_content-el" style="">

                      <!-- invested)loan or debt_loan -->
                      <span v-if="item.tag === 'debt_loan' || item.tag === 'invested_loan'">
                        <span v-if="calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid) - ((item.amount * item.bid) + item.amount) >= 0" style="color: var(--color-global-text_second); text-transform: uppercase;">Завершен</span>
                        <span v-else>
                          <span v-if="item.tag === 'invested_loan'" style="color: var(--color-urgency-high);"> 
                            {{ (calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid) - (item.amount + (item.amount * item.bid))).toFixed(2) }} {{ currency_to_show.ticket }}
                            /
                            {{ ((calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid) / (item.amount) - 1) * 100).toFixed(2) }}%
                          </span>
                          <span v-if="item.tag === 'debt_loan'" style="color: var(--color-urgency-high);">
                            {{ (calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid) - (item.amount + (item.amount * item.bid))).toFixed(2) }} {{ currency_to_show.ticket }}
                          </span>
                        </span>
                      </span>
                      <!-- invested crypto -->
                      <span v-else-if="item.tag === 'invested_crypto'" style="display: flex; flex-direction: column; align-items: flex-end">
                      {{ (calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid)).toFixed(2) }} {{ currency_to_show.ticket }}
                      </span>
                      <!-- invested stock -->
                      <span v-else-if="item.tag === 'invested_stock'" style="display: flex; flex-direction: column; align-items: flex-end">
                        Инвестировано: {{ calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid) }}
                      </span>
                      
                      
                      <span>
                        <!-- debt_loan -->
                        <span v-if="item.tag === 'debt_loan'">

                          <!-- <span v-if="calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid) === 0" style="color: var(--color-urgency-low);">
                            +1 к карме
                          </span> -->
                          <span v-if="(calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid) - (item.amount + (item.amount * item.bid))) > 0" style="color: var(--color-urgency-low);">
                            +1 к щедрости 
                            <!-- ({{ (calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid) - (item.amount + (item.amount * item.bid))).toFixed(2)}} {{ currency_to_show.ticket }}) -->
                          </span>
                          <span v-else-if="(calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid) - (item.amount + (item.amount * item.bid))) === 0" style="color: var(--color-urgency-low);">
                            +1 к карме
                          </span>
                          <span v-else>
                            {{(calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid).toFixed(2))}} из 
                            <span style="padding: 1px 3px; color: var(--color-global-baackground_light);border-radius: 5px; background-color: var(--color-urgency-high-10);">{{(item.amount * item.bid).toFixed(2)}} + {{ item.amount.toFixed(2) }}</span> {{ currency_to_show.ticket }}
                          </span>
                        </span>
                        <!-- invested_loan -->
                        <span v-else-if="item.tag === 'invested_loan'">
                          <span v-if="calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid) - ((item.amount * item.bid) + item.amount) >= 0" style="color: var(--color-urgency-low);">
                            +{{(calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid) - item.amount).toFixed(2)}} {{ currency_to_show.ticket }} / +{{ ((calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid) - item.amount) / item.amount * 100).toFixed(2) }}%
                          </span>
                          <span v-else>
                            {{(calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid).toFixed(2))}} из 
                            <span style="padding: 1px 3px; color: var(--color-global-baackground_light);border-radius: 5px; background-color: var(--color-wallet-fund-invested);">{{(item.amount * item.bid).toFixed(2)}} + {{ item.amount.toFixed(2) }}</span> {{ currency_to_show.ticket }}
                          </span>
                        </span>
                        <!-- invested project -->
                        <span v-else-if="item.tag === 'invested_project'" style="display: flex; flex-direction: column; align-items: flex-end">
                          <span>
                            {{(calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid).toFixed(2))}} {{ currency_to_show.ticket }}
                          </span>
                          <span style="color: var(--color-global-text_second);">
                            {{ calc_mesh_invested_project_amount_actual(item.id) }}
                          </span>
                        </span>
                        <!-- invested crypto -->
                        <span v-else-if="item.tag === 'invested_crypto'" style="color: var(--color-global-text_second);">{{ calc_mesh_invested_crypto_actual(item.id) }}
                        </span>
                        <!-- invested stock -->
                        <span v-else-if="item.tag === 'invested_stock'" style="color: var(--color-global-text_second);">
                          {{ calc_mesh_invested_stock_actual(item.id) }}
                        </span>
                        <!-- else -->
                        <span v-else>
                          {{(calcMeshAmount(item.id, item.type, item.tag, item.name, item?.bid).toFixed(2))}}
                          {{ currency_to_show.ticket }}
                        </span>
                      </span>
                    </p>
                  </div>
                  <p style="font-size: .8rem; margin: 0;">

                    <span style=" color: var(--color-global-text_second); width: fit-content; text-transform: uppercase;">{{ item?.broker_tag ? item?.broker_tag : set_attr_data(item) }}
                    </span>
                    <span v-if="item.tag === 'invested_project'" style="margin-left: 3px; color: var(--color-wallet-fund-invested); border-radius: 5px"> {{ item.desc }}</span>
                  </p>
                </li>
              </ul>
            </main>
            
          </section>
          
        </div>
        <!-- ELSE -->
        <div v-else>
          <p style="margin-top: 1rem;">У вас нет мешков</p>
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

<style scoped>
/* POPUP */
.transaction_popup_container,
.info_total_popup_container {
  position: fixed;
  /* z-index: -1; */
  z-index: 999;
  background: var(--color-bg-popup);
  backdrop-filter: blur(2px);
  width: 100%;
  height: 100%;
  opacity: 1;
  top: 0;
  left: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.transaction_popup_wrapper,
.info_total_popup_wrapper {
  border-radius: 1rem;
  padding: 1rem;
  max-width: 500px;
  background-color:  var(--color-global-baackground_light);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.transaction_popup_btn-close,
.info_total_popup_btn-close {
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.transaction_popup_content,
.info_total_popup_content {
  margin-top: 1rem;
  max-height: 60vh;
  overflow: scroll;
}
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
    margin-top: 2rem!important;
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
    grid-template-columns: 1fr;
    grid-template-areas: 't_first details details detatils';
    margin-top: 1rem;
    background-color: var(--color-global-baackground_light);
    border-radius: 1rem;
    padding: 1rem 1rem;
    cursor: pointer;
    transition: all .2s ease-in;
  }
  .transaction_wrapper:hover {
    box-shadow: var(--hover-shadow)
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

  .mesh_wrapper {
    /* background-color: rgb(244, 153, 153); */
    position: relative;
  }
  .mesh_broker-sign {
    width: 3rem;
    height: 3rem;
    background-color: var(--color-btn-hover-bg);
    color: var(--color-btn-text);
  }

  .mesh_content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

/*  */
@media screen and (max-width: 575px) {
  .show-max-767 {
    display: none;
  }
  .total-cap_container {
    margin-top: 2rem;
    padding-right: 1rem;
    padding-left: 1rem;
    justify-content: space-between;
    flex-direction: column;
    gap: 0;
  }

  /*  TOTAL CAP */
  .total-cap_wrapper {
    border-radius: 1rem;
    width: 100%;
    /* background-color: blue; */
    /* padding: 1rem; */
    overflow: hidden;
  }
  .total-cap_avatar {
    margin: 0 auto;
    background-color: var(--color-global-text);
    width: 15rem;
    height: 15rem;
    border-radius: 100%;
    overflow: hidden;
    display: flex; 
    align-items: center;
  }
  .total-cap_avatar img {
    width: 100%;
    height: 100%;
  }
  .action_btn {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: var(--color-global-text);
    border-radius: 1rem;
    padding: .4rem;
  }
  .action_btn p{
    color: var(--color-global-baackground_light);
    margin: 0;
    text-align: center;
    margin: 0 auto;
  }
  .action_btn p span > svg {
    transform: rotate(180deg);
    margin-bottom: 3px;
  }
  .total-cap_subtitle {
    color: var(--color-global-text_second);
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
  }
  .total-cap_count {
    font-size: 1.5rem;
    font-weight: normal;
    text-align: center;
  }
  .total-cap_help {
    position: absolute;
    color: var(--color-global-text_second);
    top: 0;
    right: 1rem;
    margin: 0;
    border: 1px solid var(--color-global-text_second);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: lighter;
  }

  /* WALLET SECTION */

  .wallet-section_container {
    margin-top: 2rem;
    padding: 0 1rem 0 1rem;
    padding-bottom: 2rem;
    gap: .5rem;
  }
  .section-header_wrapper {
    min-width: 220px;
  }
  .section-header_wrapper p {
    font-size: 16px;
  }

  /* current_affiliation_title */
  .current_affiliation_title {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  /* CURRENT FUND CONTAINER */
  .current-fund_container {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  /* MESH */
  .mesh_container {
    margin-top: 2rem;
  }
  .mesh_wrapper {
    padding-left: calc(3rem + .6rem);
    margin-top: 1.5rem;
  }
  .mesh_broker-sign {

    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    /* border-radius: 100%; */
    border-radius: .5rem;
    transition: all .2s ease-in;
  }
  .mesh_content {
    /* background-color: rgb(165, 165, 243); */
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .mesh_content-el {
    margin: 0;
    align-self: center;
  }
  .mesh_content-el:last-child {
    font-size: .8rem;
    color: var(--color-global-text_second);
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }


  /* TRANSACTION */
  .transaction_container {
    /* margin-left: .5rem;
    margin-right: .5rem; */
  }
  .transaction_group_by-date {
    display: flex;
    flex-direction: column;
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
  .transfer_avatar_container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
  }
  .transfer_avatar {
    background-color: orange;
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .transfer_avatar_container {
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
    margin-top: 2rem;
  }

  /* TOTAL CAP */
  .total-cap_wrapper {
    border-radius: 1rem;
    width: 100%;
    /* background-color: blue; */
    /* padding: 1rem; */
    overflow: hidden;
  }
  .total-cap_avatar {
    margin: 0 auto;
    background-color: var(--color-global-text);
    width: 15rem;
    height: 15rem;
    border-radius: 100%;
    overflow: hidden;
    display: flex; 
    align-items: center;
  }
  .total-cap_avatar img {
    width: 100%;
    height: 100%;
  }
  .action_btn {
    /* width: 100%; */
    width: fit-content;
    margin: 0 auto;
    display: flex;
    align-items: center;
    background-color: var(--color-global-text);
    border-radius: 1rem;
    padding: .4rem 2rem;
  }
  .action_btn p{
    color: var(--color-global-baackground_light);
    margin: 0;
    text-align: center;
    margin: 0 auto;
  }
  .action_btn p span > svg {
    transform: rotate(180deg);
    margin-bottom: 3px;
  }
  .total-cap_subtitle {
    color: var(--color-global-text_second);
    text-transform: uppercase;
    /* font-size: 1rem; */
    text-align: center;
  }
  .total-cap_count {
    font-size: 1.5rem;
    font-weight: normal;
    text-align: center;
  }
  .total-cap_help {
    position: absolute;
    color: var(--color-global-text_second);
    top: 0;
    right: 1rem;
    margin: 0;
    border: 1px solid var(--color-global-text_second);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: lighter;
  }

  /* WALLET SECTION */
  .wallet-section_container {
    margin-top: 2rem;
    padding: 0 1rem;
    padding-bottom: 2rem;
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
    gap: .5rem;
    grid-template-columns: 1fr;
    /* grid-template-columns: repeat(2, 1fr); */
  }

  /* CURRENT FUND CONTAINER */
  .current-fund_container {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  /* MESH */
  .mesh_container {
    margin-top: 2rem;
  }
  .mesh_wrapper {
    margin-left: -1rem;
    margin-right: -1rem;
    padding-left: calc(3rem + .6rem + 1rem);
    padding-right: 1rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    margin-top: 1rem;
    transition: all .2s ease-in;
  }

  .mesh_wrapper:hover {
    background-color: var(--color-btn-hover-bg);
  }
  .mesh_wrapper > p {
    margin: 0;
  }
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
  .mesh_broker-sign {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1rem;
    /* border-radius: 100%; */
    border-radius: .7rem;
  }
  .mesh_content-el {
    margin: 0;
  }
  .mesh_content-el:last-child {
    position: absolute;
    top: 0;
    right: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .mesh_content {

  }
  .mesh_footer {
    align-items: center;
  }

  /* TRANSACTION */
  .transaction_container {

  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
  .total-cap_container {
    margin-top: 2rem;
    position: relative;
  }

  /* TOTAL CAP */
  .total-cap_wrapper {
    border-radius: 1rem;
    width: 100%;
    /* background-color: blue; */
    /* padding: 1rem; */
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .total-cap_wrapper div:last-child {
    align-items: flex-start;
    margin: 0!important;
  }
  .total-cap_avatar {
    /* margin: 0 auto; */
    background-color: var(--color-global-text);
    width: 15rem;
    height: 15rem;
    border-radius: 100%;
    overflow: hidden;
    display: flex; 
    align-items: center;
  }
  .total-cap_avatar img {
    width: 100%;
    height: 100%;
  }
  .action_btn {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: var(--color-global-text);
    border-radius: 1rem;
    padding: .4rem;
  }
  .action_btn p{
    color: var(--color-global-baackground_light);
    margin: 0;
    text-align: center;
    margin: 0 auto;
  }
  .action_btn p span > svg {
    transform: rotate(180deg);
    margin-bottom: 3px;
  }
  .total-cap_subtitle {
    color: var(--color-global-text_second);
    text-transform: uppercase;
    /* font-size: 1rem; */
    /* text-align: center; */
  }
  .total-cap_count {
    font-size: 1.5rem;
    font-weight: normal;
    text-align: center;
  }
  .total-cap_help {
    position: absolute;
    color: var(--color-global-text_second);
    top: -2rem;
    left: 0;
    margin: 0;
    border: 1px solid var(--color-global-text_second);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: lighter;
  }

  /* WALLET SECTION */

  .wallet-section_container {
    margin-top: 2rem;
    margin-left: -1rem;
    padding-left: 1rem;
    margin-right: -.5rem;
    padding-right: .5rem;
    padding-bottom: 2rem;
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
  .mesh_container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2rem;
  }
  .mesh_wrapper {
    border-radius: 1rem;
    border: 1px solid var(--color-btn-hover-bg);
    padding: 1rem;
    transition: all .2s ease-in;
  }
  .mesh_wrapper  > p {
    margin: 0;
    margin-top: .5rem;
  }
  .mesh_wrapper > .mesh_broker-sign {
    border-radius: .5rem;
  }
  .mesh_wrapper:hover {
    background-color: var(--color-btn-hover-bg);
  }
  .mesh_wrapper:hover > .mesh_broker-sign {
    border: 1px solid var(--color-btn-text);
  }
  .mesh_content {
    flex-direction: column;
    margin-top: 1rem;
  }
  .mesh_content {
    flex-direction: column;
    margin-top: 1rem;
  }
  .mesh_content-el {
    margin: 0;
  }
  .mesh_content-el:last-child {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: .8rem;
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
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
  .total-cap_container {
    margin-top: 3rem;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
  }


  /* TOTAL CAP */
  .total-cap_wrapper {
    border-radius: 1rem;
    width: 100%;
    /* background-color: blue; */
    /* padding: 1rem; */
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .total-cap_wrapper div:last-child {
    align-items: flex-start;
    margin: 0!important;
  }
  .total-cap_avatar {
    /* margin: 0 auto; */
    background-color: var(--color-global-text);
    width: 15rem;
    height: 15rem;
    border-radius: 100%;
    overflow: hidden;
    display: flex; 
    align-items: center;
  }
  .total-cap_avatar img {
    width: 100%;
    height: 100%;
  }
  .action_btn {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: var(--color-global-text);
    border-radius: 1rem;
    padding: .4rem;
  }
  .action_btn p{
    color: var(--color-global-baackground_light);
    margin: 0;
    text-align: center;
    margin: 0 auto;
  }
  .action_btn p span > svg {
    transform: rotate(180deg);
    margin-bottom: 3px;
  }
  .total-cap_subtitle {
    color: var(--color-global-text_second);
    text-transform: uppercase;
    font-weight: bold;
    /* font-size: 1rem; */
    /* text-align: center; */
  }
  .total-cap_count {
    font-size: 1.5rem;
    font-weight: normal;
    text-align: center;
  }
  .total-cap_help {
    position: absolute;
    color: var(--color-global-text_second);
    top: -2rem;
    left: 0;
    margin: 0;
    border: 1px solid var(--color-global-text_second);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: lighter;
  }

  /* WALLET SECTION */
  .wallet-section_container {
    margin-top: 3rem;
    margin-left: -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 2rem;
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
  .mesh_container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .mesh_wrapper {
    border-radius: 1rem;
    border: 1px solid var(--color-btn-hover-bg);
    padding: 1rem;
    transition: all .2s ease-in;
  }
  .mesh_wrapper  > p {
    margin: 0;
    margin-top: .5rem;
  }
  .mesh_wrapper > .mesh_broker-sign {
    border-radius: .5rem;
  }
  .mesh_wrapper:hover {
    background-color: var(--color-btn-hover-bg);
  }
  .mesh_wrapper:hover > .mesh_broker-sign {
    border: 1px solid var(--color-btn-text);
  }
  .mesh_content {
    flex-direction: column;
    margin-top: 1rem;
  }
  .mesh_content-el {
    margin: 0;
  }
    .mesh_content-el:last-child {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: .8rem;
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
}
@media screen and (min-width: 1200px) {
  .total-cap_container {
    margin-top: 3rem;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
  }

  /* TOTAL CAP */
  .total-cap_wrapper {
    border-radius: 1rem;
    width: 100%;
    /* background-color: blue; */
    /* padding: 1rem; */
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .total-cap_wrapper div:last-child {
    align-items: flex-start;
    margin: 0!important;
  }
  .total-cap_avatar {
    /* margin: 0 auto; */
    background-color: var(--color-global-text);
    width: 15rem;
    height: 15rem;
    border-radius: 100%;
    overflow: hidden;
    display: flex; 
    align-items: center;
  }
  .total-cap_avatar img {
    width: 100%;
    height: 100%;
  }
  .action_btn {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: var(--color-global-text);
    border-radius: 1rem;
    padding: .4rem;
  }
  .action_btn p{
    color: var(--color-global-baackground_light);
    margin: 0;
    text-align: center;
    margin: 0 auto;
  }
  .action_btn p span > svg {
    transform: rotate(180deg);
    margin-bottom: 3px;
  }
  .total-cap_subtitle {
    color: var(--color-global-text_second);
    text-transform: uppercase;
    font-weight: bold;
    /* font-size: 1rem; */
    /* text-align: center; */
  }
  .total-cap_count {
    font-size: 1.5rem;
    font-weight: normal;
    text-align: center;
  }
  .total-cap_help {
    position: absolute;
    color: var(--color-global-text_second);
    top: -2rem;
    left: 0;
    margin: 0;
    border: 1px solid var(--color-global-text_second);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: lighter;
  }

  /* WALLET SECTION */
  .wallet-section_container {
    margin-top: 3rem;
    margin-left: -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 2rem;
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
  .mesh_container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-top: 2rem;
  }
  .mesh_wrapper {
    border-radius: 1rem;
    border: 1px solid var(--color-btn-hover-bg);
    padding: 1rem;
    transition: all .2s ease-in;
  }
  .mesh_wrapper  > p {
    margin: 0;
    margin-top: .5rem;
  }
  .mesh_wrapper > .mesh_broker-sign {
    border-radius: .5rem;
  }
  .mesh_wrapper:hover {
    background-color: var(--color-btn-hover-bg);
  }
  .mesh_wrapper:hover > .mesh_broker-sign {
    border: 1px solid var(--color-btn-text);
  }
  .mesh_content {
    flex-direction: column;
    margin-top: 1rem;
  }
  .mesh_content-el {
    margin: 0;
  }
  .mesh_content-el:last-child {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: .8rem;
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
}
</style>
