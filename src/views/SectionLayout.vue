<script setup>
import { useSectionStore } from "@/Modules/section";
import { onMounted, ref } from "vue";
import Alert from "@/components/Alert.vue";

const sectionStore = useSectionStore();

// Alert edit
const editAlert = ref();
const openEditAlert = ref(false);
const closedEditAlert = () => {
  openEditAlert.value = false;
};
//Alert delete
const deleteAlert = ref();
const sectionForDelete = ref(null)
const openDeleteAlert = ref(false);
const closedDeleteAlert = () => {
  openDeleteAlert.value = false;
};

const sectionForm = ref({
  id: null,
  section_code: "",
  section_name: "",
});

const submitEditedSection = () => {
  openEditAlert.value = true;
  editAlert.value.alert({
    status: "warning",
    title: "Update?",
    message: "Are you sure you want to make changes?",
  });
};

const confirmEditSection = () => {
  sectionStore.setUpdateSection(sectionForm.value).then(() => {
    closedEditAlert();
    sectionStore.setLoadSection();
    clearForm()
  });
};

//edit 
const editSection = (id) => {
  sectionStore
    .setShowSection(id)
    .then(() => (sectionForm.value = sectionStore.getShowSection[0]));
};

//delete
const closeDeleteAlert = () => {
  openDeleteAlert.value = false;
};

const deleteSection = (id) => {
  openDeleteAlert.value = true;
  deleteAlert.value.alert({
    status: "error",
    title: "Delete?",
    message: "Are you sure you want to delete this user?",
  });
  sectionForDelete.value = id
};

const confirmDeleteSection = () => {
  sectionStore.setDeleteSection(sectionForDelete.value).then(() => {
    closeDeleteAlert();
    sectionStore.setLoadSection();
    clearForm()
    sectionForDelete.value = null
  });
};

//clearForm
const clearForm = () => {
  sectionForm.value = {
    id: null,
    section_code: "",
    section_name: "",

  };
};

onMounted(() => {
  sectionStore.setLoadSection();
});
</script>

<template>
 <Alert
    ref="editAlert"
    :open="openEditAlert"
    :close="closedEditAlert"
    :submit="confirmEditSection"
  />
   <Alert
    ref="deleteAlert"
    :open="openDeleteAlert"
    :close="closedDeleteAlert"
    :submit="confirmDeleteSection"
  />
  <!-- Card -->
  <div class="h-[10rem] flex items-center justify-center bg-green-100 px5 mt-2 ">
    <p class="text-[1.2rem] font-bold">Welcome to Section Layout</p>
  </div>
  <!-- Card Layout -->
  <div class="flex flex-wrap gap-2 text-[.9rem] mt-2">
    <div
      :id="`${data.section_id}_${i}`"
      class="w-[12rem] bg-green-100 p-2"
      v-for="(data, i) in sectionStore.getLoadSection"
      :key="i"
    >
      <div class="bg-white flex items-center justify-between gap-2">
        <div class="flex gap-2">
          <button @click="editSection(data.id)" class="active:bg-gray-100 cursor-pointer hover:scale-[110%]">📝</button>
          <button  @click="deleteSection(data.id)" class="cursor-pointer hover:scale-[110%]">❌</button>
        </div>
        <button  @click="submitEditedSection" :hidden="sectionForm.id !== data.id">✅</button>
      </div>
      <!-- If user is not editing -->
      <div v-if="sectionForm.id !== data.id" class="p-2 flex flex-col gap-1">
        <input
          disabled
          class="text-center disabled:bg-white"
          :value="data.section_code"
        />
        <input
          disabled
          class="text-center disabled:bg-white"
          :value="data.section_name"
        />
      </div>
      <div v-else class="p-2 flex flex-col gap-1">
        <input class="text-center" v-model="sectionForm.section_code" />
        <input class="text-center" v-model="sectionForm.section_name" />
      </div>
    </div>
  </div>
</template>
