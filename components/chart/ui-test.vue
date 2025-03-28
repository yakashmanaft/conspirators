<template>
    <div>
      <apexchart :options="chartOptions" :series="chartSeries"></apexchart>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';

  const props = defineProps({
    chart_type: {
        type: String,
        default: 'area' 
    }
  })

  const chartSeries = ref([
    {
      name: 'Available',
      data: [50, 60, 85, 50, 49, 40, 70 , 91, 125],

    },
    {
      name: 'Deposit',
      data: [30, 10, 15, 30, 59, 30, 50, 51, 325]
    }
  ]);

  const chartOptions = {
    chart: {
        type: `${props.chart_type}`,
        tooltip: {
            shared: true,
            // intersect: false,
        },
        dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
        toolbar: {
            show: true
        },
    },
    title: {
      text: 'Тест график',
      align: 'left'
    },
    xaxis: {
      categories: ['Jan, 24', 'Feb, 24', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    }
  };
  </script>

  <style scoped>
  </style> 