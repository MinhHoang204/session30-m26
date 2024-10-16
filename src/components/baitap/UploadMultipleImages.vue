<template>
    <div>
      <h2>Upload Nhiều Ảnh</h2>
      <input type="file" @change="handleFilesChange" accept="image/*" multiple />
      <button @click="uploadImages" :disabled="!images.length">Upload</button>
      <div v-if="uploadStatus.length">
        <div v-for="(status, index) in uploadStatus" :key="index">
          <p>
            {{ status.name }}: 
            <span :class="{'success': status.success, 'error': !status.success}">
              {{ status.message }}
            </span>
          </p>
        </div>
      </div>
    </div>
</template>
  
<script>
  import { ref } from 'vue';
  import { storage } from '../firebase';
  import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  
  export default {
    name: 'UploadMultipleImages',
    setup() {
      const images = ref([]);
      const uploadStatus = ref([]);
  
      const handleFilesChange = (e) => {
        images.value = Array.from(e.target.files);
        uploadStatus.value = images.value.map(file => ({ name: file.name, success: false, message: '' }));
      };
  
      const uploadImages = async () => {
        const promises = images.value.map(async (file, index) => {
          const storageReference = storageRef(storage, `images/${file.name}`);
          try {
            await uploadBytes(storageReference, file);
            const url = await getDownloadURL(storageReference);
            uploadStatus.value[index].message = 'Upload thành công!';
            uploadStatus.value[index].success = true;
            console.log('File available at', url);
          } catch (error) {
            console.error('Upload thất bại:', error);
            uploadStatus.value[index].message = 'Upload thất bại!';
            uploadStatus.value[index].success = false;
          }
        });
  
        await Promise.all(promises);
      };
  
      return {
        images,
        uploadStatus,
        handleFilesChange,
        uploadImages
      };
    }
  };
</script>
  
<style scoped>
  .success {
    color: green;
  }
  .error {
    color: red;
  }
</style>