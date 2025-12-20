<template>
  <div class="w-full h-full">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
Chart.register(
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

interface Props {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }>;
  title?: string;
  horizontal?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  horizontal: false,
});

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const createChart = () => {
  if (!chartCanvas.value) return;

  // Destroy existing chart
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: "bar",
    data: {
      labels: props.labels,
      datasets: props.datasets,
    },
    options: {
      indexAxis: props.horizontal ? "y" : "x",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            font: {
              family: "Poppins, sans-serif",
              size: 12,
            },
            boxWidth: 12,
            padding: 15,
          },
        },
        title: {
          display: !!props.title,
          text: props.title,
          font: {
            family: "Delight, sans-serif",
            size: 16,
            weight: "bold",
          },
          padding: {
            top: 10,
            bottom: 20,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 12,
          titleFont: {
            size: 13,
            family: "Poppins, sans-serif",
          },
          bodyFont: {
            size: 12,
            family: "Poppins, sans-serif",
          },
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          grid: {
            display: !props.horizontal,
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            font: {
              family: "Poppins, sans-serif",
              size: 11,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: props.horizontal,
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            font: {
              family: "Poppins, sans-serif",
              size: 11,
            },
            precision: 0,
          },
        },
      },
    },
  });
};

onMounted(() => {
  createChart();
});

watch(
  () => [props.labels, props.datasets, props.horizontal],
  () => {
    createChart();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>
