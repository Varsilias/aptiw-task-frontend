<script setup lang="ts">
import gql from "graphql-tag";
import { useQuery, useMutation } from "@vue/apollo-composable";
import ProgressSpinner from "primevue/progressspinner";
import StatusButton from "../../components/buttons/StatusButton.vue";
import { DATE_FORMAT } from "../../utils/index";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useRouter } from "vue-router";

const router = useRouter();

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

const TASKS_QUERY = gql`
  query getTasks {
    tasks {
      id
      title
      description
      status
      due_date
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation {
    logout {
      id
      name
      email
    }
  }
`;

const { loading, result, error } = useQuery(TASKS_QUERY);
const { loading: logoutLoading, mutate: logout } = useMutation(LOGOUT_MUTATION);

console.log({ loading, result, error });

const onLogout = async () => {
  await logout({});
  localStorage.clear();
  router.push({ path: "/auth/login" });
};

const reload = () => window.location.reload();
</script>

<template>
  <div class="h-full">
    <div class="flex justify-between mb-6">
      <h1 class="font-bold text-lg text-white">All Tasks</h1>
      <div class="flex space-x-4">
        <router-link
          to="/tasks/new"
          class="flex items-center justify-center cursor-pointer bg-[#635FC7] text-white font-bold text-sm px-4 py-2 rounded-[20px] hover:bg-[#A8A4FF]"
          type="submit"
        >
          <div>Create Task</div>
        </router-link>

        <button
          @click.prevent="onLogout"
          class="flex items-center justify-center cursor-pointer bg-red-500 text-white font-bold text-sm px-4 py-2 rounded-[20px] hover:bg-opacity-50"
          type="submit"
        >
          <div class="flex space-x-1 items-center">
            <ProgressSpinner
              v-if="logoutLoading"
              style="width: 25px; height: 25px"
              strokeWidth="4"
              animationDuration=".5s"
              aria-label="logging in"
            />
            <div>Logout</div>
          </div>
        </button>
      </div>
    </div>
    <div v-if="error" class="flex flex-col h-screen space-y-4 items-center">
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
    <div v-else v-for="task in result?.tasks" :key="task.id">
      <RouterLink :to="{ path: `/tasks/${task.id}` }">
        <div
          class="p-4 flex rounded-lg justify-between items-center mb-6 border bg-[#20212C] border-[#828FA340]"
        >
          <div class="title_due w-[70%] text-left space-y-8">
            <p class="text-lg font-bold">{{ task.title }}</p>
            <p class="font-medium text-sm text-gray-400 justify-items-start">
              {{ task.description }}
            </p>
          </div>
          <div class="title_due space-y-8">
            <p class="text-sm text-gray-300">
              <strong>Due: </strong>{{ dayjs(task?.due_date).format(DATE_FORMAT) }}
            </p>
            <p><StatusButton :text="task.status" /></p>
          </div>
          <div
            v-if="
              dayjs(task?.due_date).isAfter(dayjs()) && dayjs(task?.due_date).diff(dayjs()) <= 3
            "
            class="h-5 w-5 bg-red-950 rounded-full"
          ></div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
