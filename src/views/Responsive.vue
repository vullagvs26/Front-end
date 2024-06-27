<script setup>
import { useEmployeeStore } from "@/Modules/employee";
import { useSectionStore } from "@/Modules/section";
import { onMounted, ref } from "vue";

import Alert from "@/components/Alert.vue";

const employeeStore = useEmployeeStore();
const sectionStore = useSectionStore();

const employeeForm = ref({
  id: null,
  employee_id: null,
  first_name: "",
  middle_name: "",
  last_name: "",
  section_id: null,
});

// Alert
const editAlert = ref();
const openEditAlert = ref(false);
const closedEditAlert = () => {
  openEditAlert.value = false;
};
//Delete
const deleteAlert = ref();
const employeeForDelete = ref(null)
const openDeleteAlert = ref(false);
const closedDeleteAlert = () => {
  openDeleteAlert.value = false;
};

const submitEditedEmployee = () => {
  openEditAlert.value = true;
  editAlert.value.alert({
    status: "warning",
    title: "Update?",
    message: "Are you sure you want to make changes?",
  });
};

const confirmEditEmployee = () => {
  employeeStore.setUpdateEmployee(employeeForm.value).then(() => {
    closedEditAlert();
    employeeStore.setLoadEmployee();
    clearForm()
  });
};
//edit
const editEmployee = (id) => {
  employeeStore
    .setShowEmployee(id)
    .then(() => (employeeForm.value = employeeStore.getShowEmployee[0]));
};

const clearForm = () => {
  employeeForm.value = {
    id: null,
    employee_id: null,
    first_name: "",
    middle_name: "",
    last_name: "",
    section_id: null,
  };
};

//delete func
const deleteEmployee = (id) => {
  openDeleteAlert.value = true;
  deleteAlert.value.alert({
    status: "error",
    title: "Delete?",
    message: "Are you sure you want to delete this user?",
  });
  employeeForDelete.value = id
};

const confirmDeleteEmployee = () => {
  employeeStore.setDeleteEmployee(employeeForDelete.value).then(() => {
    closeDeleteAlert();
    employeeStore.setLoadEmployee();
    clearForm()
    employeeForDelete.value = null
  });
};



onMounted(() => {
  employeeStore.setLoadEmployee();
  sectionStore.setLoadSection();
});
</script>

<template>
  <Alert
    ref="editAlert"
    :open="openEditAlert"
    :close="closedEditAlert"
    :submit="confirmEditEmployee"
  />
  <Alert
    ref="deleteAlert"
    :open="openDeleteAlert"
    :close="closedDeleteAlert"
    :submit="confirmDeleteEmployee"
  />
  <!-- Card -->
  <div class="h-[10rem] flex items-center justify-center bg-green-100 px5">
    <p class="text-[1.2rem] font-bold">Welcome to responsive layout</p>
  </div>
  <div class="flex flex-wrap gap-2 text-[.9rem]">
    <!-- Card Layout -->
    <div
      :id="`${data.employee_id}_${i}`"
      class="w-[12rem] bg-green-100 p-2"
      v-for="(data, i) in employeeStore.getLoadEmployee"
      :key="i"
    >
      <div class="bg-white flex items-center justify-between gap-2">
        <div class="flex gap-2">
          <button
            @click="editEmployee(data.id)"
            class="active:bg-gray-100 cursor-pointer hover:scale-[110%]"
          >
            📝
          </button>
          <button @click="deleteEmployee(data.id)" class="cursor-pointer hover:scale-[110%]">❌</button>
        </div>
        <button @click="submitEditedEmployee" :hidden="employeeForm.id !== data.id">
          ✅
        </button>
      </div>
      <!-- If user is not editing -->
      <div v-if="employeeForm.id !== data.id" class="p-2 flex flex-col gap-1">
        <input disabled class="text-center disabled:bg-white" :value="data.employee_id" />
        <input disabled class="text-center disabled:bg-white" :value="data.full_name" />
        <input disabled class="text-center disabled:bg-white" :value="data.section" />
      </div>
      <!-- If user is editing -->
      <div v-else class="p-2 flex flex-col gap-1">
        <input class="text-center" v-model="employeeForm.employee_id" />
        <input class="text-center" v-model="employeeForm.first_name" />
        <input class="text-center" v-model="employeeForm.middle_name" />
        <input class="text-center" v-model="employeeForm.last_name" />
        <select
          v-model="employeeForm.section_id"
          required
          class="text-center"
          v-for="(section, i) in sectionStore.getLoadSection"
          :key="i"
        >
          <option :value="section.id">{{ section.section_name }}</option>
          >
        </select>
      </div>
    </div>
  </div>
</template>
