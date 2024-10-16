<template>
    <div>
      <h2>Upload PDF</h2>
      <input type="file" @change="handleFileChange" accept="application/pdf" />
      <button @click="uploadPDF" :disabled="!pdf">Upload</button>
      <p v-if="message" :class="{'success': success, 'error': !success}">{{ message }}</p>
      <div v-if="pdfUrl">
        <h3>PDF đã upload:</h3>
        <canvas id="pdf-render"></canvas>
      </div>
    </div>
</template>
  
<script>
  import { ref } from 'vue';
  import { storage } from '../firebase';
  import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  import * as pdfjsLib from 'pdfjs-dist/webpack';
  
  export default {
    name: 'UploadPDF',
    setup() {
      const pdf = ref(null);
      const message = ref('');
      const success = ref(false);
      const pdfUrl = ref('');
  
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
          pdf.value = file;
        } else {
          pdf.value = null;
          alert('Vui lòng chọn file PDF.');
        }
      };
  
      const uploadPDF = async () => {
        if (!pdf.value) return;
  
        const storageReference = storageRef(storage, `pdfs/${pdf.value.name}`);
        try {
          await uploadBytes(storageReference, pdf.value);
          pdfUrl.value = await getDownloadURL(storageReference);
          message.value = 'Upload thành công!';
          success.value = true;
          renderPDF(pdfUrl.value);
        } catch (error) {
          console.error('Upload thất bại:', error);
          message.value = 'Upload thất bại!';
          success.value = false;
        }
      };
  
      const renderPDF = async (url) => {
        const pdf = await pdfjsLib.getDocument(url).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.getElementById('pdf-render');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
  
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
  
        page.render(renderContext);
      };
  
      return {
        pdf,
        message,
        success,
        pdfUrl,
        handleFileChange,
        uploadPDF
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
  canvas {
    border: 1px solid #000;
    margin-top: 20px;
  }
</style>