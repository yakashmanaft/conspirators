<template>
    <!-- Search -->
    <div class="search-container" v-if='modelType === "active_btn"'>

        <!-- Search -->
        <div class="search_wrapper active_btn">
          <div class="search_btn">
            <Icon
              @click="onClick_search_icon()"
              name="ic:baseline-search"
              size="24px"
              color="var(--color-global-text_second)"
            />
          </div>
          <input
            ref="searchInputRef"
            type="text"
            :class="isInputOpened ? 'input-opened_true' : 'input-opened_false'"
            class="form-control"
            placeholder="Поиск"
            v-model="modelValue"
            @input="emit_inputString"
            autofocus="true"
          />
        </div>
    </div>
    <!-- Search -->
    <div class="search-container" v-if='modelType === "primary"'>
      
      <!-- Search -->
      <div class="search_wrapper">
        <input
          type="text"
          class="form-control"
          placeholder="Поиск"
          v-model="modelValue"
          @input="emit_inputString"
        />
        <Icon
          name="ic:baseline-search"
          size="24px"
          color="var(--color-global-text_second)"
        />
      </div>
    </div>

</template>

<script setup>
// PROPS
const props = defineProps({
    // searchInputProps: {
    //     type: String,
    //     default: ''
    // }
    string: {
      type: String,
      default: ''
    },
    type: {
      type:  String,
      default: 'primary'
    }
})

// CONST
const modelType = ref(props.type)
const modelValue = ref(props.string)
const isInputOpened = ref(false)
const searchInputRef = ref(null)

// watch(modelValue, () => {
//     console.log(modelValue.value)
// })

// FUNCs
const onClick_search_icon = () => {
  isInputOpened.value = !isInputOpened.value
  console.log(isInputOpened.value)
  focusInput()
}
const focusInput = () => {
  // Проверяем, что ссылка на элемент существует и он смонтирован
  if (searchInputRef.value) {
    // Устанавливаем фокус
    searchInputRef.value.focus()
    // Опционально: выделяем весь текст в поле
    // searchInputRef.value.select();
  }
}

watch(modelValue, () => {
  if(modelValue.value === '') {
    isInputOpened.value = false
    searchInputRef.value.blur();
  } 
})

onMounted(() => {
  window.addEventListener('click', e => {
    if(isInputOpened.value) {
      if(!e.target.classList.contains('input-opened_true')) {
        // console.log(e.target)
      //   isInputOpened.value = false
      //   searchInputRef.value.blur();
      }
    }
  })
})


// EMITs
//= search event Input
const emit = defineEmits(['searchInputChanged'])

// FUNCs
const  emit_inputString = (name) => {
    if(name) {

        emit('searchInputChanged', modelValue.value)
        // console.log(name)
    }
}

</script>

<style scoped>
.search-container {

}
.search_wrapper {
    position: relative;
}
.search_wrapper input {
  padding-left: 2.2rem;
  border: unset;
  /* border-radius: unset; */
  outline-width: 0 !important;
  outline: none !important;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  border-bottom: 1px solid var(--bs-border-color);
}

.search_wrapper input::placeholder {
  color :var(--color-global-text_second);
}

.search_wrapper svg {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.5rem;
}
/* 
 */
.input-opened {
  background-color: green;
}

@media screen and (max-width: 575px) {
  .search_wrapper {
      margin: 0.5rem;
    }
    .search_wrapper input {
      border-radius: 2rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      background-color: rgba(0, 0, 0, 0.05);
      border-bottom: unset;
    }
}

@media (min-width: 576px) and (max-width: 768px) {
  .search_wrapper {
    margin: 0 1rem;
  }
  .search_wrapper > input {
    background-color: rgba(0, 0, 0, 0.05);
    border-bottom: unset;
    border-radius: 2rem;
    padding-top: .75rem;
    padding-bottom: .75rem;
  }
}
@media (min-width: 768px) {
  .search-container {
    /* margin: 0!important; */
    /* padding: .5rem; */
    /* background-color: red; */
  }
  .active_btn {
    /* background-color: blue; */
    /* padding: 1rem; */
    width: 32px;
    /* height: 64px; */
    position: relative;
    display: flex;
    align-items: center;
  }
  .active_btn > .search_btn {
    /* background-color: yellow; */
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .active_btn > .search_btn > svg{
    cursor: pointer;
    /* background: #000; */
  }
  .active_btn > input {
    position: absolute;
    /* background-color: orange; */
    top: 50%;
    transform: translateY(-50%);
    left: 2rem;
    z-index: 1001;
    width: 0;
    padding-left: 1rem;
    border-radius: 0;
  }
  .input-opened_true {
    display: block;
    min-width: 768px;
  }
  .input-opened_false {
    /* display: none; */
    min-width: 0;
    padding: 0!important;
    translate: all .2s ease-in;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .search_wrapper {
      /* margin-left: 1rem; */
      /* margin-right: 1rem; */
  }
  .search_wrapper > input {
    /* background-color: rgba(0, 0, 0, 0.05); */
    border-bottom: unset; 
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .search_wrapper > input {
    /* background-color: rgba(0, 0, 0, 0.05); */
    border-bottom: unset; 
  }
}
@media (min-width: 1200px) and (max-width: 1399px) {
  .search_wrapper > input {
    /* background-color: rgba(0, 0, 0, 0.05); */
    border-bottom: unset; 
  }
}
@media (min-width: 1400px) {
  .search_wrapper > input {
    /* background-color: rgba(0, 0, 0, 0.05); */
    border-bottom: unset; 
  }
}
</style>