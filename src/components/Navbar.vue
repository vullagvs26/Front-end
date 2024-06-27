<template lang="">

  <nav class="flex max-[388px]:flex-col items-center p-3 bg-green-200 gap-3"> 
  <strong>Navbar</strong> 
<div class="flex flex-col p-2 text-center w-fit bg-white gap-2 max-[388px] sm:flex-row sm:max-[388px]:hidden">
  <router-link :to="{name:'home'}" class="block px-4 py-2 rounded
               hover:bg-gray-200"
               :class="{ 'bg-green-200': $route.name === 'home' }">Home</router-link>
  <router-link :to="{name:'employees'}" class="block px-4 py-2 rounded
               hover:bg-gray-200"
               :class="{ 'bg-green-200': $route.name === 'employees' }">Employees</router-link>
  <router-link :to="{name:'sections'}" class="block px-4 py-2 rounded
               hover:bg-gray-200"
               :class="{ 'bg-green-200': $route.name === 'sections' }">Sections</router-link>
  <router-link :to="{name:'responsive'}" class="block px-4 py-2 rounded
               hover:bg-gray-200"
               :class="{ 'bg-green-200': $route.name === 'responsive' }">Responsive</router-link>
  <router-link :to="{name:'sectionlayout'}" class="block px-4 py-2 rounded
               hover:bg-gray-200"
               :class="{ 'bg-green-200': $route.name === 'sectionlayout' }">Section Layout</router-link>
</div>


  </nav>


</template>

<style lang=""></style>
