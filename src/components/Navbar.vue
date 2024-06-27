<template lang="">

  <nav class="flex max-[388px]:flex-col items-center p-3 bg-green-200 gap-3"> 
  <strong>Navbar</strong> 
  <div class="`flex max-[388px]:flex-col p-2 max-[388px]:text-center w-full bg-white ${navState ? '' : 'max-[388px]:hidden'}` gap-2`">
  <router-link :to="{name:'home'}">Home </router-link> 
  <router-link :to="{name:'employees'}">Employees </router-link> 
  <router-link :to="{name:'sections'}">Sections </router-link>
  <router-link :to="{name:'responsive'}">Responsive</router-link>
  <router-link :to="{name:'sectionlayout'}">Section Layout</router-link>
   
  
  </div>
  </nav>


</template>

<style lang=""></style>
