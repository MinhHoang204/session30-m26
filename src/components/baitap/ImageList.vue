<template>
    <div>
      <h2>Danh Sách Ảnh</h2>
      <div v-if="images.length">
        <div v-for="(image, index) in images" :key="index" class="image-item">
          <img :src="image.url" :alt="image.name" width="200" />
          <p>{{ image.name }}</p>
          <button @click="deleteImage(image.ref)">Xóa</button>
        </div>
      </div>
      <p v-else>Không có ảnh nào được upload.</p>
    </div>
</template>
  
<script>
  import { ref, onMounted } from 'vue';
  import { storage } from '../firebase';
  import { listAll, ref as storageRef, getDownloadURL, deleteObject } from 'firebase/storage';
  
  export default {
    name: 'ImageList',
    setup() {
      const images = ref([]);
  
      const fetchImages = async () => {
        const listRef = storageRef(storage, 'images/');
        try {
          const res = await listAll(listRef);
          const promises = res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url, ref: itemRef };
          });
          images.value = await Promise.all(promises);
        } catch (error) {
          console.error('Lấy danh sách ảnh thất bại:', error);
        }
      };
  
      const deleteImage = async (itemRef) => {
        if (confirm(`Bạn có chắc chắn muốn xóa ${itemRef.name}?`)) {
          try {
            await deleteObject(itemRef);
            alert('Xóa thành công!');
            // Cập nhật danh sách ảnh
            fetchImages();
          } catch (error) {
            console.error('Xóa ảnh thất bại:', error);
            alert('Xóa thất bại!');
          }
        }
      };
  
      onMounted(() => {
        fetchImages();
      });
  
      return {
        images,
        deleteImage
      };
    }
  };
</script>
  
<style scoped>
  .image-item {
    margin-bottom: 20px;
  }
  img {
    display: block;
    margin-bottom: 10px;
  }
</style>