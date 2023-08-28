<script setup lang="ts">
import { onMounted, ref } from "vue";
import gql from "graphql-tag";
import { DATE_FORMAT, formatString } from "../../utils/index";
import { useQuery, useMutation } from "@vue/apollo-composable";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useRoute, useRouter } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

const route = useRoute();
const router = useRouter();

let taskId = ref<string | string[]>();

onMounted(() => {
  taskId.value = route.params.taskId;
});

const TASKS_QUERY = gql`
  query getTaskById($id: ID!) {
    task(id: $id) {
      title
      description
      due_date
      status
    }
  }
`;

const DELETE_TASK_MUTATION = gql`
  mutation ($id: ID!) {
    deleteTask(id: $id) {
      id
      title
      description
      status
      user {
        id
        name
      }
    }
  }
`;

const {
  mutate: deleteTask,
  loading: deleteLoading,
  error: deleteError,
} = useMutation(DELETE_TASK_MUTATION);

const { loading, result, error } = useQuery(TASKS_QUERY, { id: taskId });

const onDeleteTask = async () => {
  const data = await deleteTask({ id: taskId.value });
  console.log("DELETE_RESULT", data);
  router.push("/tasks");
};

const reload = () => window.location.reload();
</script>

<template>
  <div class="h-screen">
    <div class="flex justify-between mb-6">
      <h1 class="font-bold text-lg text-white">Tasks {{ taskId }}</h1>
      <div class="flex space-x-4">
        <router-link
          :to="{ path: `/tasks/${taskId}/edit` }"
          class="flex items-center justify-center cursor-pointer bg-[#635FC7] text-white font-bold text-sm px-4 py-2 rounded-[20px] hover:bg-[#A8A4FF]"
          type="submit"
        >
          <div>Edit Task</div>
        </router-link>

        <button
          @click.prevent="onDeleteTask"
          class="flex items-center justify-center cursor-pointer bg-red-500 text-white font-bold text-sm px-4 py-2 rounded-[20px] hover:bg-opacity-50"
          type="submit"
        >
          <div class="flex space-x-1 items-center">
            <ProgressSpinner
              v-if="deleteLoading"
              style="width: 25px; height: 25px"
              strokeWidth="4"
              animationDuration=".5s"
              aria-label="logging in"
            />
            <div>Delete Task</div>
          </div>
        </button>
      </div>
    </div>

    <div v-if="error || deleteError" class="flex flex-col space-y-4 items-center">
      <p>Something went wrong...</p>
      <button
        @click="reload"
        class="flex justify-center cursor-pointer bg-[#635FC7] text-white font-bold text-sm px-4 py-2 rounded-[20px] hover:bg-[#A8A4FF]"
      >
        Reload this page
      </button>
    </div>

    <div class="flex flex-col space-y-4 my-auto h-screen items-center" v-if="loading">
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="4"
        animationDuration=".5s"
        aria-label="Task Loading"
      />
    </div>

    <div v-else>
      <ul class="p-4 rounded-lg mb-6 border bg-[#20212C] border-[#828FA340]">
        <li
          v-for="(task, index) in Object.entries(result?.task).slice(1)"
          :key="index"
          class="flex mb-4 w-full justify-between"
        >
          <span class="capitalize font-bold w-1/3">{{ formatString(task[0]) }}:</span>
          <span class="font-medium text-sm text-gray-400 text-right">{{
            Number.isNaN(Date.parse(task[1] as string))
              ? task[1]
              : dayjs(task[1] as string).format(DATE_FORMAT)
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
