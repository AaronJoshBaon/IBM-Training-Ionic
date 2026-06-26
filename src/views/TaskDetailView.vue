<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="/tabs/taskListView" />
        </IonButtons>

        <IonTitle>Task Details</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <template v-if="task">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {{ task.name }}
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>ID: {{ task.id }}</p>

            <p>
              Status:
              <strong>
                {{ task.done ? 'Completed' : 'Pending' }}
              </strong>
            </p>
          </IonCardContent>

          <IonImg v-if="task.photo" :src="task.photo" />
          <IonButton expand="block" @click="takePhoto">
            {{ task.photo ? 'Change Photo' : 'Take Photo' }}
          </IonButton>
        </IonCard>
      </template>

      <IonText color="danger" v-else>
        <p>Task not found.</p>
      </IonText>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonImg 
} from '@ionic/vue'

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { useTaskStore } from '@/stores/taskStore'

const route = useRoute()
const taskStore = useTaskStore()

const task = computed(() =>
  taskStore.tasks.find(
    t => t.id === Number(route.params.id)
  )
)

const takePhoto = async () => {
  try {
    const photo = await Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Photos
    })

    if (photo.dataUrl && task.value) {
        taskStore.setTaskPhoto(task.value.id, photo.dataUrl)
    }
  } catch (error) {
    console.log('Photo cancelled or error:', error);
  }
};
</script>