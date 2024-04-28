<script setup lang="ts">
import NotificationForm from './components/NotificationForm.vue'
import LogsTable from './components/LogsTable.vue'
import {onMounted, ref} from "vue";
import {httpClient} from "@/http/client";
import {type Log, type LogResponse} from "@/types";

const logs = ref<Log[]>([]);
const readLogs = async () => {
  try {
    const response = await httpClient.get<LogResponse>('/notifications');
    logs.value = transformData(response.data.logs);
  } catch (error) {
    console.warn("error", error);
  }
}

const transformData = (data: Log[]): Log[] => {
  data.sort((a, b) => Number(b.time) - Number(a.time));

  return data.map((item: Log) => {
    const date = new Date(item.time);
    return {
      time: `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      msg: item.msg
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
