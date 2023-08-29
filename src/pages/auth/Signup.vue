<script setup lang="ts">
import { reactive } from "vue";
import { useMutation } from "@vue/apollo-composable";
import ProgressSpinner from "primevue/progressspinner";
import { useRouter } from "vue-router";
import { SIGN_UP_MUTATION } from "../../graphql";

const router = useRouter();

const inputs = reactive({ firstname: "", lastname: "", email: "", password: "" });

const { mutate: signUp, loading, error } = useMutation(SIGN_UP_MUTATION);

const onSubmit = async () => {
  await signUp({ ...inputs, name: `${inputs.firstname} ${inputs.lastname}` });
  router.push({ path: "/auth/login" });
};

const reload = () => window.location.reload();
</script>

<template>
  <div class="flex justify-center bg-[#20212C] px-4 py-12 rounded-md md:mx-32">
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
        <h2 class="font-bold text-lg mb-6 text-white">Sign Up</h2>

        <div className="firstname flex flex-col mb-4">
          <label for="firstname" class="text-sm font-bold pb-2 text-white">Firstname</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            autocomplete="false"
            v-model.trim="inputs.firstname"
            class="p-1.5 outline-none border rounded text-sm text-white bg-[#2B2C37] border-[#828FA340]"
          />
        </div>

        <div className="lastname flex flex-col mb-4">
          <label for="lastname" class="text-sm font-bold pb-2 text-white">Lastname</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            :autocomplete="'false'"
            v-model.trim="inputs.lastname"
            class="p-1.5 outline-none border rounded text-sm text-white bg-[#2B2C37] border-[#828FA340]"
          />
        </div>

        <div className="email flex flex-col mb-4">
          <label for="email" class="text-sm font-bold pb-2 text-white">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            :autocomplete="'false'"
            v-model.trim="inputs.email"
            class="p-1.5 outline-none border rounded text-sm text-white bg-[#2B2C37] border-[#828FA340]"
          />
        </div>

        <div className="password flex flex-col mb-4">
          <label for="password" class="text-sm font-bold pb-2 text-white">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            :autocomplete="'false'"
            v-model.trim="inputs.password"
            class="p-1.5 outline-none border rounded text-sm text-white bg-[#2B2C37] border-[#828FA340]"
          />
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
            <div>Sign up</div>
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
