<template>
    <!-- Search -->
    <div class="search-container">

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
})

// CONST
const modelValue = ref('')

// watch(modelValue, () => {
//     console.log(modelValue.value)
// })

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
  border-radius: unset;
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

@media screen and (max-width: 575px) {
 .search_wrapper {
    margin: 0.5rem;
 }
}

@media screen and (max-width: 767px) {
    .search_wrapper {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .search_wrapper > input {
        /* background-color: var(--color-btn-disabled-bg); */
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 1rem;
        border-bottom: unset;
    }
}
</style>