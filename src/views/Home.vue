<script setup>
import { ref } from "vue";

const count = ref(0);
const inputValue = ref(0);
const inputValue2 = ref(0);

const add = () => {
  count.value++;
};

const minus = () => {
  count.value--;
};

const submit = () => {
  count.value += Number(inputValue.value);
  inputValue.value = 0; // Reset input after submit
};

const submit2 = () => {
  count.value += Number(inputValue2.value);
  inputValue2.value = 0; // Reset input after submit
};
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center text-center">
    <h1 class="text-4xl font-bold mb-4">Hello</h1>
    <p class="text-lg mb-8">World</p>
    <div class="flex gap-4">
      <button
        @click="add"
        class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
      >
        Add
      </button>
      <button
        @click="minus"
        class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
      >
        Minus
      </button>
    </div>
    <div class="flex flex-col gap-4 mt-8">
      <form @submit.prevent="submit" class="flex gap-2">
        <input
          v-model.number="inputValue"
          type="number"
          class="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
      <form @submit.prevent="submit2" class="flex gap-2">
        <input
          v-model.number="inputValue2"
          type="number"
          class="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
    <div class="mt-8">
      <h2 class="text-2xl font-semibold">Count:</h2>
      <p class="text-4xl font-bold">{{ count }}</p>
    </div>
  </div>
</template>

<style>
/* You can add additional styles here if needed */
</style>
