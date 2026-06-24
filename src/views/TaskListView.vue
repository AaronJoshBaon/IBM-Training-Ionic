<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="task-view">
        <h1>📝 Tasks</h1>

        <!-- Stats -->
        <IonCard>
          <IonCardContent class="stats">
            Total: {{ totalCount }} |
            Done: {{ doneCount }} |
            Pending: {{ pendingCount }}
          </IonCardContent>
        </IonCard>

        <!-- Add Task -->
        <div class="input-row">
          <IonInput
            v-model="newTaskName"
            placeholder="New task..."
            @keyup.enter="handleAdd"
          />
          <IonButton @click="handleAdd">
            <ion-icon :icon="addOutline" color="light"></ion-icon>
          </IonButton>
        </div>

        <IonList v-if="tasks.length" class="task-list">
          <IonItem
            v-for="task in tasks"
            :key="task.id"
          >
            <IonCheckbox
              slot="start"
              v-model="task.done"
            />

            <IonLabel :class="{ done: task.done }">
              {{ task.name }}
            </IonLabel>

            <IonButton
              fill="clear"
              @click="openTask(task.id)"
            >
              View
            </IonButton>

            <IonButton
              slot="end"
              fill="clear"
              color="danger"
              @click="removeTask(task.id)"
            >
              <ion-icon :icon="trashOutline"></ion-icon>
            </IonButton>
          </IonItem>
        </IonList>

        <IonText color="medium" v-else>
          <p>No Tasks Available.</p>
        </IonText>
      </div>

    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonCard,
  IonCardContent,
  IonText,
  IonIcon
} from '@ionic/vue'
import { addOutline, trashOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router'

import { useTaskStore } from '@/stores/taskStore'

const router = useRouter()

const taskStore = useTaskStore()

const { tasks, doneCount, pendingCount, totalCount } =
  storeToRefs(taskStore)

const { addTask, removeTask } = taskStore

const newTaskName = ref('')

function handleAdd() {
  if (!newTaskName.value.trim()) return

  addTask(newTaskName.value)
  newTaskName.value = ''
}

function openTask(taskId) {
  router.push(`/tabs/task/${taskId}`)
}
</script>

<style scoped>
.task-view { max-width: 480px; margin: 40px auto; padding: 24px; font-family: Arial, sans-serif; }
h1 { color: #1B2A4A; }
.stats { font-size: 13px; color: #555; padding: 8px 12px; background: #e9f7f0; border-radius: 6px; margin-bottom: 16px; }
.input-row { display: flex; gap: 8px; margin-bottom: 16px; }
.input-row ion-input {
  --padding-start: 12px;
  --padding-end: 12px;
  --border-radius: 6px;
  border: 1px solid #ddd;
}
.input-row button { padding: 8px 16px; background: #42B883; color: white; border: none; border-radius: 6px; cursor: pointer; }
.task-list { list-style: none; padding: 0; margin: 0; }
.task-list li { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: white; border-radius: 6px; margin-bottom: 8px; border: 1px solid #eee; }
.task-list li span { flex: 1; font-size: 14px; }
.done { text-decoration: line-through; color: #9ca3af; }
.task-list li .remove { padding: 4px 10px; background: #fee2e2; color: #dc2626; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; }
.login {
  padding: 8px 16px; background-color: transparent; color: black; border: 1px solid black; border-radius: 6px; cursor: pointer; 
}
</style>