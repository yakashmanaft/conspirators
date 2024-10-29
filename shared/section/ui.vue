<template>
    <div class="section_wrapper">
        <div class="section shadow py-4 px-4 mb-4 bg-body-tertiary rounded">

            <slot></slot>
        </div>
    </div>
  </template>
  
  <style scoped>

  /* .section-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  } */
  .section {
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