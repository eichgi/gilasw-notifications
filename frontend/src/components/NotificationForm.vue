<script setup lang="ts">
import {ref} from "vue";
import Button from "primevue/button";
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import axios from "axios";

defineProps<{
  msg: string
}>()

const emit = defineEmits(['reloadLogs']);

const text = ref<string>("This is a new message");
const categories = ref<string[]>(["SPORTS", "MOVIES"]);
const options = ref<string[]>(["SPORTS", "MOVIES", "FINANCE"]);
const loading = ref<boolean>(false);

const sendNotification = async () => {
  console.warn("data", {text, categories});

  if (loading.value) {
    return;
  }

  try {
    loading.value = true;
    const response = await axios.post('http://localhost:3000/notifications/new', {
      text: text.value,
      categories: categories.value
    });

    loading.value = false;
    emit('reloadLogs');
  } catch (error) {
    console.warn("error", error);
    loading.value = false;
  }
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>

    <div class="margin-top">
      <label for="text">Text</label>
      <InputText id="text" type="text" v-model="text" style="display: block"/>
    </div>
    <div class="margin-top">
      <label for="categories">Categories:</label>
      <MultiSelect v-model="categories"
                   :options="options"
                   style="display: block"
                   display="chip"
                   id="categories"
                   placeholder="Select categories"/>
    </div>
    <div class="margin-top">
      <Button id="submit-form" @click="sendNotification" :disabled="loading">Send notification</Button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

.margin-top {
  margin-top: 1em;
}
</style>