<!-- 重定向 -->
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
router.replace({
  path: "/" + route.params.path,
  query: route.query,
});
</script>
<template></template>
