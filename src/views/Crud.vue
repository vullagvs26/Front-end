<script setup>
import { useEmployeeStore } from "@/modules/employee.js"
import Datatable from '@/components/Datatable.vue'

const employeeStore = useEmployeeStore()

const employeeSubmit = () => {
  employeeStore.insertEmployee()
}
</script>

<template>
  <div class="h-[95vh] w-screen grid grid-cols-3">
    <div class="col-span-1 bg-green-100 p-3 flex flex-col items-center">
      <strong class="mt-5">Employee Form</strong>
      <form @submit.prevent="employeeSubmit" 
      class="mt-[2rem] flex flex-col gap-3 p-5 shadow-lg">
        <label class="flex flex-col">
          First Name:
          <input 
          required 
          v-model="employeeStore.employeeForm.first_name" 
          class="ml-5 rounded w-[15rem] hover:border-2 hover:border-green-500 h-[2rem]" />
        </label>
        <label class="flex flex-col">
          Middle Name:
          <input 
          required 
          v-model="employeeStore.employeeForm.middle_name" 
          class="ml-5 rounded w-[15rem] hover:border-2 hover:border-green-500 h-[2rem]" />
        </label>
        <label class="flex flex-col">
          Last Name:
          <input 
          required 
          v-model="employeeStore.employeeForm.last_name" 
          class="ml-5 rounded w-[15rem] hover:border-2 hover:border-green-500 h-[2rem]" />
        </label>
        <label class="flex flex-col">
          Employee Number:
          <input 
          required 
          v-model="employeeStore.employeeForm.employee_number" 
          class="ml-5 rounded w-[15rem] hover:border-2 hover:border-green-500 h-[2rem]" />
        </label>
        <label class="flex flex-col">
          Section ID:
          <input 
          required 
          v-model="employeeStore.employeeForm.section_id" 
          class="ml-5 rounded w-[15rem] hover:border-2 hover:border-green-500 h-[2rem]" />
        </label>
        <button type="submit" class="bg-red-400 text-white p-3 rounded">Submit</button>
        <button type="button" class="bg-gray-200 text-black p-3 rounded">Clear</button>
      </form>
    </div>

    <div class="col-span-2">
        <Datatable :fields="employeeStore.getFields" :items="employeeStore.getItems">
         <template #cell(#)="data">{{data.index + 1 }}</template>
         <template #cell(action)="data">
          <button class="bg-yellow-300 p-2 rounded" 
          @click="employeeStore.editRow(data.item, data.index)"
          >
            Edit
          </button>
          <button
          class="bg-red-500 p-2 rounded text-white ml-1"
          @click="employeeStore.deleteRow(data.index)"
          >
            Delete
          </button>
         </template>
        </Datatable>
    </div>
  </div>
</template>


