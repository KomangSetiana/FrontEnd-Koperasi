<template>
    <div>
        <vue-awesome-paginate :total-items="total_items" :items-per-page="per_page" :max-pages-shown="5"
            v-model="new_current_page" @click="handleClick()" />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// Define emits
const emit = defineEmits(['onClickHandler']);

const handleClick = () => {
    ref(emit.onClickHandler)
}
// Define props
const props = defineProps({
    total_items: {
        type: Number,
        default: 0
    },
    per_page: {
        type: Number,
        default: null
    },
    currentPage: {
        type: Number,
        default: 1
    }
});

// Define reactive current page
let new_current_page = ref(props.currentPage);

// Watch for changes in the currentPage prop to update new_current_page
watch(() => props.currentPage, (newVal) => {
    new_current_page.value = newVal;
});

// Emit the current page change event when new_current_page changes
watch(new_current_page, (newVal) => {
    emit('onClickHandler', newVal);
});
</script>

<style>
.pagination-container {
    display: flex;
    column-gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.paginate-buttons:hover {
    background-color: #d8d8d8;
}

.active-page {
    background-color: #34db45;
    border: 1px solid #45db34;
    color: white;
}

.active-page:hover {
    background-color: #29c841;
}
</style>
