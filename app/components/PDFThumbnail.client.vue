<template>
  <div class="pdf-thumbnail">
    <canvas ref="canvasRef" class="w-full max-h-[400px] rounded-2xl"></canvas>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  pdfUrl: string;
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  width: 300,
});

const canvasRef = ref<HTMLCanvasElement>();

const renderPDF = async () => {
  // Only run on client side
  if (!import.meta.client || !canvasRef.value || !props.pdfUrl) return;

  try {
    // Dynamically import pdfjs-dist only on client side
    const pdfjsLib = await import("pdfjs-dist");

    // Set up the worker for PDF.js
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.mjs`;

    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument(props.pdfUrl);
    const pdf = await loadingTask.promise;

    // Get the first page
    const page = await pdf.getPage(1);

    // Calculate scale to fit the desired width
    const viewport = page.getViewport({ scale: 0.5 });
    const scale = props.width / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    // Set canvas dimensions
    const canvas = canvasRef.value;
    const context = canvas.getContext("2d");
    canvas.height = scaledViewport.height;
    canvas.width = scaledViewport.width;

    // Render the page
    const renderContext = {
      canvasContext: context!,
      viewport: scaledViewport,
      canvas: canvas,
    };

    await page.render(renderContext).promise;
  } catch (error) {
    console.error("Error rendering PDF:", error);
  }
};

onMounted(() => {
  renderPDF();
});

// Watch for changes in pdfUrl prop and re-render
watch(
  () => props.pdfUrl,
  () => {
    renderPDF();
  },
  { immediate: false }
);
</script>
