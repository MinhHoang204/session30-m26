<template>
  <div>
    <UploadFile></UploadFile>
    <UploadImage></UploadImage>
    <UploadMultipleImages></UploadMultipleImages>
    <ImageList></ImageList>
    <UplaodPDF></UplaodPDF>
  </div>
</template>

<script setup>
import UploadImage from './components/baitap/UploadImage.vue';
import UploadFile from './components/UploadFile.vue';
import UploadMultipleImages from './components/baitap/UploadMultipleImages.vue';
import ImageList from './components/baitap/ImageList.vue';
import UploadPDF from './components/baitap/UploadPDF.vue';
</script>

<style></style>