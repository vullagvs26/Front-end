<script setup>
import { useEmployeeStore } from "@/Modules/employee";
import { useSectionStore } from "@/Modules/section";
import { onMounted, ref } from "vue";

const employeeStore = useEmployeeStore();
const sectionStore = useSectionStore();

const employeeForm = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
  section_id: null,
});

const addNewEmployee = () => {
  console.log(employeeForm.value);
  employeeStore.setStoreEmployee(employeeForm.value).then((res) => {
    if (res.status === "success") {
      employeeStore.setLoadEmployee().then(() => {
        clearEmployeeForm();
      });
    } else {
      console.log(res);
      // Handle error scenarios if necessary
    }
  });
};

const editEmployee = (employeeId) => {
  employeeStore.setShowEmployee(employeeId).then(() => {
    employeeForm.value = { ...employeeStore.getShowEmployee()[0] }; // Ensure to clone object
  });
};

const updateEmployee = () => {
  employeeStore.setUpdateEmployee(employeeForm.value).then((res) => {
    if (res.status === "success") {
      employeeStore.setLoadEmployee().then(() => {
        clearEmployeeForm();
      });
    } else {
      console.log(res);
      // Handle error scenarios if necessary
    }
  });
};

const deleteEmployee = (employeeId) => {
  employeeStore.setDeleteEmployee(employeeId).then((res) => {
    if (res.status === "success") {
      employeeStore.setLoadEmployee().then(() => {
        clearEmployeeForm();
      });
    } else {
      console.log(res);
      // Handle error scenarios if necessary
    }
  });
};

const clearEmployeeForm = () => {
  employeeForm.value = {
    first_name: "",
    middle_name: "",
    last_name: "",
    section_id: null,
  };
};

onMounted(() => {
  employeeStore.setLoadEmployee();
  sectionStore.setLoadSection();
});
</script>

<template>
  <div class="flex p-2 gap-1">
    <!-- Add New Employee Form -->
    <form
      @submit.prevent="addNewEmployee"
      class="w-[50%] flex flex-col items-center border px-10 py-2 gap-1"
    >
      <strong>Add New Employee</strong>

      <!-- First Name Input -->
      <div class="flex gap-2 items-center w-full justify-between">
        <p>First Name</p>
        <input
          v-model="employeeForm.first_name"
          required
          class="py-2 border border-black rounded"
        />
      </div>

      <!-- Middle Name Input -->
      <div class="flex gap-2 items-center w-full justify-between">
        <p>Middle Name</p>
        <input
          v-model="employeeForm.middle_name"
          required
          class="py-2 border border-black rounded"
        />
      </div>

      <!-- Last Name Input -->
      <div class="flex gap-2 items-center w-full justify-between">
        <p>Last Name</p>
        <input
          v-model="employeeForm.last_name"
          required
          class="py-2 border border-black rounded"
        />
      </div>

      <!-- Section Selection -->
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

      <!-- Submit Button -->
      <input
        v-if="!employeeForm.id"
        type="submit"
        class="py-2 bg-red-200 w-full hover:bg-red-400 cursor-pointer"
        value="Add"
      />
      <input
        v-else
        type="button"
        @click="updateEmployee"
        value="Update"
        class="py-2 bg-yellow-200 w-full hover:bg-yellow-400 cursor-pointer"
      />
      <button
        type="button"
        @click="clearEmployeeForm"
        class="py-2 bg-gray-200 w-full hover:bg-gray-400 cursor-pointer"
      >
        Clear
      </button>
    </form>

    <!-- Employee Table -->
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
            <td class="flex gap-1 px-2 items-center justify-center">
              <!-- Edit Button -->
              <button
                @click="editEmployee(employee.employee_id)"
                class="px-2 bg-yellow-200 hover:bg-yellow-400 rounded"
              >
                Edit
              </button>
              <!-- Delete Button -->
              <button
                @click="deleteEmployee(employee.employee_id)"
                class="px-2 bg-red-200 hover:bg-red-400 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
