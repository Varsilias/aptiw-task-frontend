import { createRouter, createWebHistory } from "vue-router";

import Signup from "../pages/auth/Signup.vue";
import Login from "../pages/auth/Login.vue";
import Task from "../pages/tasks/Task.vue";
import TaskForm from "../pages/tasks/CreateTask.vue";
import EditTaskForm from "../pages/tasks/EditTask.vue";
import AuthLayout from "../components/layout/AuthLayout.vue";
import MainLayout from "../components/layout/MainLayout.vue";
const Tasks = () => import("../pages/tasks/Tasks.vue");

const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "", redirect: "/auth/sign-up" },
      { path: "sign-up", component: Signup },
      { path: "login", component: Login },
    ],
  },
  {
    path: "/tasks",
    component: MainLayout,
    beforeEnter: () => {
      const token = localStorage.getItem("access_token");
      if (token !== null) {
        return true;
      }

      return { path: "/auth/login" };
    },
    children: [
      { path: "", component: Tasks },
      { path: ":taskId", component: Task },
      { path: "new", component: TaskForm },
      { path: ":taskId/edit", component: EditTaskForm },
    ],
  },
  { path: "/", redirect: "/tasks" },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
