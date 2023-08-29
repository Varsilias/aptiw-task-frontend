<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import ProgressSpinner from "primevue/progressspinner";
import { useRouter, useRoute } from "vue-router";
import { DATETIME_FORMAT } from "../../utils/index";
import { GET_TASK_QUERY, UPDATE_TASK_MUTATION } from "../../graphql";
import { formatDate } from "../../utils/index";

const route = useRoute();
const router = useRouter();

let taskId = ref<string | string[]>();

let inputs = reactive({
  title: "",
  description: "",
  due_date: "",
  status: "",
});

onMounted(() => {
  taskId.value = route.params.taskId;
  const { result: task } = useQuery(GET_TASK_QUERY, { id: taskId });

  if (task.value) {
    const data = task.value.task;

    inputs.title = data.title;
    inputs.description = data.description;
    inputs.due_date = data.due_date;
    inputs.status = data.status;
  }
});

const { mutate: updateTask, loading, error } = useMutation(UPDATE_TASK_MUTATION);

const onSubmit = async () => {
  // Perform further validation before login
  // and handle error appropriately

  await updateTask({
    ...inputs,
    due_date: formatDate(inputs.due_date).format(DATETIME_FORMAT),
    id: taskId.value,
  });
  router.push({ path: "/tasks" });
};

const reload = () => window.location.reload();
</script>

<template>
  <div class="h-screen flex justify-center bg-[#20212C] px-4 py-12 rounded-md md:mx-32">
    <div class="w-full md:w-[70%]">
      <div v-if="error" class="flex flex-col space-y-4 items-center">
        <p>Something went wrong...</p>
        <button
          @click="reload"
          class="flex justify-center cursor-pointer bg-[#635FC7] text-white font-bold text-sm px-4 py-2 rounded-[20px] hover:bg-[#A8A4FF]"
        >
          Reload this page
        </button>
      </div>
      <form v-else @submit.prevent="onSubmit">
        <h2 class="font-bold text-lg mb-6 text-white">Edit Task</h2>

        <div className="title flex flex-col mb-4">
          <label for="title" class="text-sm font-bold pb-2 text-white">Title</label>
          <input
            type="text"
            name="title"
            autocomplete="false"
            v-model.trim="inputs.title"
            class="p-2 outline-none border rounded text-sm text-white bg-[#2B2C37] border-[#828FA340]"
          />
        </div>

        <div className="description flex flex-col mb-4">
          <label for="description" class="text-sm font-bold pb-2 text-white">Description</label>
          <textarea
            type="text"
            name="description"
            autocomplete="false"
            v-model.trim="inputs.description"
            class="p-2 outline-none border rounded text-sm text-white bg-[#2B2C37] border-[#828FA340]"
          ></textarea>
        </div>

        <div className="due_date flex flex-col mb-4">
          <label for="due_date" class="text-sm font-bold pb-2 text-white">Due Date</label>
          <input
            type="datetime-local"
            name="due_date"
            autocomplete="false"
            v-model.trim="inputs.due_date"
            step="any"
            class="p-2 outline-none border rounded text-sm text-white bg-[#2B2C37] border-[#828FA340]"
          />
        </div>

        <div className="Status flex flex-col mb-4">
          <label for="Status" class="text-sm font-bold pb-2 text-white">Status</label>
          <select
            name="status"
            id="status"
            v-model.trim="inputs.status"
            class="p-2 outline-none border rounded text-sm text-white bg-[#2B2C37] border-[#828FA340]"
          >
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <button
          class="flex w-full items-center justify-center cursor-pointer bg-[#635FC7] text-white font-bold text-sm px-4 py-2 rounded-[20px] hover:bg-[#A8A4FF]"
          type="submit"
        >
          <div class="flex space-x-1 items-center">
            <ProgressSpinner
              v-if="loading"
              style="width: 25px; height: 25px"
              strokeWidth="4"
              animationDuration=".5s"
              aria-label="logging in"
            />
            <div>Update Task</div>
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
