<template>
    <div class="section_wrapper">
        <div class="section shadow mb-4 rounded" :class="[props.padding ? 'py-4 px-4' : '', props.bg ? 'backgroundUrgencyColor' : '']" >

            <slot></slot>
        </div>
    </div>
  </template>

<script lang="ts" setup>
  const props = defineProps({
    padding: {
      type: Boolean,
      default: true
    },
    bg: {
      type: String,
      default: '#fff'
    }
  })
</script>
  
  <style scoped>
  .backgroundUrgencyColor {
    background-color: v-bind('props.bg');
  }

  .section-wrapper {
  } 
  .section {
    background-color: var(v-bind('props.bg'));
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
}
@media screen and (max-width: 575px) {
}

@media screen and (max-width: 767px) {
    .section {
        /* background-color: unset!important;
        padding: unset!important;
        box-shadow: unset!important; */
    }
    
}
  </style>
  
  <!-- https://github.com/vadimkaKharitonenko/severyanochka/tree/master -->