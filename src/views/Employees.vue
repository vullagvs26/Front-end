<script setup>
import { useEmployeeStore } from "@/Modules/employee";
import { useSectionStore } from "@/Modules/section";
import { onMounted, ref } from "vue";

const employeeStore = useEmployeeStore();
const sectionStore = useSectionStore();

const employeeForm = ref({
  employee_id: null,
  first_name: "",
  middle_name: "",
  last_name: "",
  section_id: null,
});

const addNewEmployee = () => {
  console.log(employeeForm.value);
  employeeStore.setStoreEmployee(employeeForm.value).then((res) => {
    if (res.status == "success") {
      employeeStore.setLoadEmployee().then((res) => console.log(res));
    } else {
      console.log(res);
    }
  });
};

const editData = (data) => {
  employeeStore.setShowEmployee(data).then(() => {
    employeeForm.value = {};
  });
};

onMounted(() => {
  employeeStore.setLoadEmployee();
  sectionStore.setLoadSection().then((res) => console.log(res));
});
</script>

<template>
  <div class="flex p-2">
    <form
      @submit.prevent="addNewEmployee"
      class="w-[50%] flex flex-col items-center border px-10 py-2 gap-1"
    >
      <strong>Add New Employee</strong>
      <div class="flex gap-2 items-center w-full justify-between">
        <p>Employee ID</p>
        <input
          v-model="employeeForm.employee_id"
          required
          class="py-2 border border-black rounded"
        />
      </div>

      <div class="flex gap-2 items-center w-full justify-between">
        <p>First Name</p>
        <input
          v-model="employeeForm.first_name"
          required
          class="py-2 border border-black rounded"
        />
      </div>
      <div class="flex gap-2 items-center w-full justify-between">
        <p>Middle Name</p>
        <input
          v-model="employeeForm.middle_name"
          required
          class="py-2 border border-black rounded"
        />
      </div>
      <div class="flex gap-2 items-center w-full justify-between">
        <p>Last Name</p>
        <input
          v-model="employeeForm.last_name"
          required
          class="py-2 border border-black rounded"
        />
      </div>
      <div class="flex gap-2 items-center w-full justify-between">
        <p>Section</p>
        <select
          v-model="employeeForm.section_id"
          required
          class="py-1 px-2 border border-black w-[11.5rem] rounded"
        >
          <option
            v-for="(section, i) in sectionStore.getLoadSection"
            :key="i"
            :value="section.id"
          >
            {{ section.section_name }}
          </option>
        </select>
      </div>
      <input
      v-if="!employeeForm.id"
        @click="addNewEmployee"
        type="Submit"
        class="py-2 bg-red-200 w-full hover:bg-red-400 cursor-pointer"
      />
    </form>

    <div class="w-[50%]">
      <table class="w-full">
        <thead class="bg-gray-200">
          <tr>
            <th>Employee ID</th>
            <th>Full Name</th>
            <th>Section</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(employee, i) in employeeStore.getLoadEmployee"
            :key="i"
            class="text-center border-b"
          >
            <td>{{ employee.employee_id }}</td>
            <td>{{ employee.full_name }}</td>
            <td>{{ employee.section }}</td>
            <td class="flex gap-1 px-2 itens-center justify-center">
              <button
                @click="editData(employee.employee_id)"
                class="px-2 bg-yellow-200 hover:bg-yellow-400 rounded"
              >
                Edit
              </button>
              <button class="px-2 bg-red-200 hover:bg-red-400 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
