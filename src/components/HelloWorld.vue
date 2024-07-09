<script setup lang="ts">
import { ref } from "vue";
import { getPetById } from "@/service/petstore/pet";

defineProps<{ msg: string }>();

const msg = ref<string>('');
function handleGetApi() {
  getPetById({
    petId: 1,
  }).then((res) => {
    msg.value = JSON.stringify(res);
  }).catch((err) => {
    msg.value = JSON.stringify(err);
  });
}
</script>

<template>
  <div>
    <textarea class="text" width="500px" v-model="msg" readonly></textarea>
  </div>
  <button class="btn" @click="handleGetApi">点击发送请求</button>
</template>

<style scoped>
.text {
  color: #888;
  margin-top: 20px;
  width: 500px;
  height: 300px;
}

.btn {
  margin-top: 20px;
  border: 1px solid #04a2f7;
}
</style>
