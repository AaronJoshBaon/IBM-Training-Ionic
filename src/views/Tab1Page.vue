<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="todo-view">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Task Counter</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="app">
        <h1>Task Counter</h1>

        <div class="input-row">
          <input v-model="newTaskName" @keyup.enter="handleAdd" placeholder="Enter a new task" />
          <ion-button @click="handleAdd">
            <ion-icon :icon="addOutline" color="light"></ion-icon>
          </ion-button>
        </div>

        <div class="filters">
          <ion-button @click="selectedFilter = 'all'" :class="{ active: selectedFilter === 'all' }">All</ion-button>
          <ion-button @click="selectedFilter = 'done'" :class="{ active: selectedFilter === 'done' }">Done</ion-button>
          <ion-button @click="selectedFilter = 'pending'" :class="{ active: selectedFilter === 'pending' }">Pending</ion-button>
        </div>

        <div class="stats">
          Total: {{ totalCount }} | Done: {{ doneCount }} | Pending: {{ pendingCount }}
        </div>

        <div v-if="tasks.length === 0" class="empty">
          <p class="empty">No tasks yet. Add one above!</p>
        </div>

        <div v-else-if="filteredTasks.length === 0" class="empty">
          <p class="empty">No task found</p>
        </div>

        <ion-List v-else class="task-list">
          <ion-item v-for="task in filteredTasks" :key="task.id">
            <ion-checkbox slot="start" :checked="task.done" @ionChange="toggleTask(task.id)"/>
            <IonLabel :class="{ done: task.done }">
              {{ task.name }}
            </IonLabel>
            <ion-button slot="end" @click="removeTask(task.id)" fill="clear"><ion-icon :icon="trashOutline" color="danger"></ion-icon></ion-button>
          </ion-item>
        </ion-List>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonButton, IonIcon } from '@ionic/vue';
import { addOutline, trashOutline } from 'ionicons/icons';
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useTaskStore } from '@/stores/taskStore'

const newTaskName = ref("")
const selectedFilter = ref("all")

const taskStore = useTaskStore()
const { tasks, totalCount, doneCount, pendingCount } = storeToRefs(taskStore)
const { addTask, toggleTask, removeTask } = taskStore

const filteredTasks = computed(() => {
  return tasks.value.filter(t => {
    if(selectedFilter.value === "all") return t;
    else if(selectedFilter.value === "done") return t.done;
    return !t.done
  })
})

function handleAdd() {
  if(newTaskName.value.trim().length <= 0) return
  addTask(newTaskName.value)
  newTaskName.value = ""
}
</script>

<style scoped>
.app {
  max-width: 480px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

h1 { color: #1B2A4A; margin-bottom: 20px; }

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.input-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.input-row button {
  padding: 8px 16px;
  background: #42B883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.stats {
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #e9f7f0;
  border-radius: 6px;
}

.empty {
  text-align: center;
  color: #aaa;
  font-style: italic;
  margin: 32px 0;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #eee;
}

.task-list li span {
  flex: 1;
  font-size: 14px;
}

.done {
  text-decoration: line-through;
  color: #aaa;
}

.task-list li button {
  padding: 4px 10px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.filters button {
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  background: #e5e7eb;
  color: #374151;
  transition: background 0.25s, transform 0.15s;
  margin-right: 8px;
  margin-bottom: 10px;
}

.filters button:hover {
  background: #d1d5db;
}
.filters button:active {
  transform: scale(0.96);
}
.filters button.active {
  background: #42b883;
  color: white;
}
</style>
