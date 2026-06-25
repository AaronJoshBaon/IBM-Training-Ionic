// @ts-nocheck
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences'

const STORAGE_KEY = 'taskflow_tasks'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])
  const nextId = ref(1)

  const totalCount = computed(() => tasks.value.length)
  const doneCount = computed(() => tasks.value.filter(t => t.done).length)
  const pendingCount = computed(() => tasks.value.filter(t => !t.done).length)

  async function addTask(name) {
    if (!name || !name.trim()) return
    tasks.value.push({ id: nextId.value++, name: name.trim(), done: false, photo: null })
    await saveTasks()
  }

  async function loadTasks() {
    const { value } = await Preferences.get({ key: STORAGE_KEY })
    if (value) {
      tasks.value = JSON.parse(value)
      nextId.value = tasks.value.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1
    }
  }

  async function saveTasks() {
    await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(tasks.value) })
  }

  async function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.done = !task.done
      await saveTasks()
    }
  }

  async function removeTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    await saveTasks()
  }

  async function setTaskPhoto(id, photo) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.photo = photo
      await saveTasks()
    }
  }

  return { tasks, totalCount, doneCount, pendingCount, addTask, loadTasks, toggleTask, removeTask, setTaskPhoto }
})