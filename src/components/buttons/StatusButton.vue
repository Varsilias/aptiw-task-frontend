<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <button
    class="capitalize text-sm-variant rounded-md px-4 py-3 w-full"
    :class="
      text === 'COMPLETED'
        ? 'text-[#33D69F] bg-[#33D69F] bg-opacity-[0.06]'
        : text === 'IN_PROGRESS'
        ? 'text-[#FF8F00] bg-[#FF8F00] bg-opacity-[0.06]'
        : 'text-[#373B53] dark:text-white bg-[#373B53] bg-opacity-[0.1]'
    "
  >
    {{ text.split("_").join(" ") }}
  </button>
</template>
