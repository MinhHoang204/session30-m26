<template>
    <div>
      <h2>Upload Ảnh</h2>
      <input type="file" @change="handleFileChange" accept="image/*" />
      <button @click="uploadImage" :disabled="!image">Upload</button>
      <p v-if="message" :class="{'success': success, 'error': !success}">{{ message }}</p>
    </div>
</template>
  
<script>
  import { ref } from 'vue';
  import { storage } from '../firebase';
  import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  
  export default {
    name: 'UploadImage',
    setup() {
      const image = ref(null);
      const message = ref('');
      const success = ref(false);
  
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          image.value = file;
        }
      };
  
      const uploadImage = async () => {
        if (!image.value) return;
  
        const storageReference = storageRef(storage, `images/${image.value.name}`);
        try {
          await uploadBytes(storageReference, image.value);
          const url = await getDownloadURL(storageReference);
          message.value = 'Upload thành công!';
          success.value = true;
          console.log('File available at', url);
        } catch (error) {
          console.error('Upload thất bại:', error);
          message.value = 'Upload thất bại!';
          success.value = false;
        }
      };
  
      return {
        image,
        message,
        success,
        handleFileChange,
        uploadImage
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
  