<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue"
import DocumentationIcon from "./icons/IconCommunity.vue"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props = defineProps(['logs']);
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon/>
    </template>
    <template #heading>Notifications Logs</template>

    <DataTable id="table" :value="logs" tableStyle="min-width: 50rem">
      <Column field="time" header="Time"></Column>
      <Column field="msg" header="Message"></Column>
    </DataTable>
  </WelcomeItem>

</template>
