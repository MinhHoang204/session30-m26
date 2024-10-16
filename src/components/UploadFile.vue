<template>
    <div>
        <img :src="imageUrl" alt="">
        <input @change="handleGetFile" type="file"/>
        <button @click="handleUpload">Upload</button> 
        <button @click="handleSubmit">Submit</button>
    </div>
</template>

<script setup>
import { ref } from "vue";

import { getDownloadURL, ref as storageRef, uploadBytes} from "firebase/storage";
import { storage } from "@/firebase";

const imageUrl = ref("");
const file = ref(null);
const downloadUrl = ref("");

// Lấy giá trị trong ô input type file và preview hình ảnh
const handleGetFile = () => {
    imageUrl.value = URL.createObjectURL(e.target.files[0]);

    file.name = e.target.files[0];
};

// Lưu hình ảnh lên firebase storage
const handleUpload = async () => {
    if (!file) {
        alert("Chưa có file được chọn");
    } else {
        try {
            // Tạo tham chiếu đến folder được lưu trữ trên firebase
            const storageReference = storageRef(
                storage, 
                `images/${imageUrl.value.name}`
            );
    
            // Lưu hình ảnh lên firebase
            await uploadBytes(storageReference, imageUrl.value.name);

            // Lấy url sau khi đã upload xong

            downloadUrl.value = await getDownloadURL(storageReference);
        } catch (error) {
            console.log(error);
        }
    }
};

const handleSubmit = () => {
    console.log("Image url", downloadUrl.value);
}
</script>

<style></style>