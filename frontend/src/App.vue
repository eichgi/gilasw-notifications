<script setup lang="ts">
import NotificationForm from './components/NotificationForm.vue'
import LogsTable from './components/LogsTable.vue'
import axios from "axios";
import {onMounted, ref} from "vue";

interface Log {
  time: string;
  message: string;
}

const logs = ref<Log[]>([]);
const readLogs = async () => {
  try {
    const response = await axios.get('http://localhost:3000/notifications');

    logs.value = transformData(response.data.logs);
  } catch (error) {
    console.warn("error", error);
  }
}

const transformData = (data: any): Log[] => {
  data.sort((a, b) => b.time - a.time);

  return data.map((item) => {
    const date = new Date(item.time);
    return {
      time: `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      message: item.msg
    }
  });
}

onMounted(() => {
  readLogs();
});
</script>

<template>
  <header>
    <div class="wrapper">
      <NotificationForm msg="New Notification Form" @reload-logs="readLogs"/>
    </div>
  </header>

  <main>
    <LogsTable :logs="logs"/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
