<script setup>
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils/class-helpers";
import { computed, ref, watch, defineExpose, defineProps } from "vue";

const props = defineProps({
  formData: Object,
  open: Boolean,
  className: String,
  close: Function,
  submit: Function,
});

const openAlert = ref(false);
const variant = ref("");
const title = ref("");
const message = ref("");
const timer = ref("");

const alertVariants = computed(() => {
  return cva("w-[20rem] h-[15rem] rounded", {
    variants: {
      variant: {
        success: "bg-green-200",
        error: "bg-red-200",
        warning: "bg-yellow-200",
        question: "bg-blue-200",
        default: "bg-gray-200",
      },
    },
    defaultVariant: {
      variant: "default",
    },
  });
});

const icons = computed(() => {
  return {
    success: "✅",
    warning: "⚠️",
    error: "🚨",
    question: "❓",
  }[variant.value];
});

const borderVariant = computed(() => {
  return {
    success: "border-green-200",
    warning: "border-yellow-200",
    error: "border-red-200",
    question: "border-blue-200",
  }[variant.value];
});

const textVariant = computed(() => {
  return {
    success: "text-green-200",
    warning: "text-yellow-600",
    error: "text-red-200",
    question: "text-blue-200",
  }[variant.value];
});

const buttonVariant = computed(() => {
  return {
    success: "bg-green-400 hover:bg-green-600",
    warning: "bg-yellow-400 hover:bg-yellow-600",
    error: "bg-red-400 hover:bg-red-600",
    question: "bg-blue-400 hover:bg-blue-600",
  }[variant.value];
});

const alert = (data) => {
  variant.value = data.status;
  title.value = data.title;
  message.value = data.message;
  timer.value = data.timer;
  console.log(variant.value, title.value, message.value, timer.value);
};

const closeAlert = () => {
  props.close();
};

watch(
  () => props.open,
  () => {
    openAlert.value = props.open;
  }
);

defineExpose({
  alert,
});
</script>

<template>
  <Teleport to="#alert">
    <div
      v-if="openAlert"
      class="absolute top-0 left-0 h-screen w-screen bg-black/30 backdrop-blur-[2px] flex items-center justify-center"
    >
      <div :class="cn(alertVariants({ variant, className }))">
        <div
          :class="`w-full flex items-center bg-white justify-center h-[40%] border-4 ${borderVariant}`"
        >
          <p class="text-[3rem] animate-pulse">{{ icons }}</p>
        </div>

        <div>
          <p :class="`text-center font-bold ${textVariant}`">{{ title }}</p>
          <p class="text-center">{{ message }}</p>
        </div>
        <div class="flex items-center justify-evenly mt-2">
          <button class="p-2 bg-gray-200 hover:bg-gray-400 rounded" @click="closeAlert">
            Cancel
          </button>
          <button :class="`p-2 rounded ${buttonVariant}`" @click="submit">Confirm</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
