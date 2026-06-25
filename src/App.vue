<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.loadTasks();
})
</script>
