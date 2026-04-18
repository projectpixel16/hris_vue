<template>
    <div class="space-y-4">
        <div v-for="category in fileCategories" :key="category" class="bg-white border rounded-2xl p-6 shadow-sm relative">
            <!-- CARD HEADER -->
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold text-gray-800">{{ category }}</h3>
                <button
                @click="openUploadModal(category)"
                class="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                >
                Upload
                </button>
            </div>

            <!-- FILE GRID -->
            <div class="grid grid-cols-4 gap-4">
                <div
                v-for="(file, i) in getFilesByCategory(category)"
                :key="i"
                class="border rounded-xl p-3 text-center text-sm hover:bg-gray-50 cursor-pointer"
                @click="openFileViewer(category, i)"
                >
                📄 {{ file.name }}
                <button
                    @click.stop="confirmRemoveFile(category, i)"
                    class="block mt-2 text-red-500 text-xs hover:underline"
                >
                    Remove
                </button>
                </div>
                <div v-if="!getFilesByCategory(category).length" class="col-span-4 text-gray-400 text-sm">
                No files uploaded.
                </div>
            </div>

        </div>

        <BaseModal
            v-model="showUploadModal"
            :title="`Upload Files - ${uploadCategory}`"
            >
            <!-- FILE INPUT -->
            <div
                @dragover.prevent
                @drop.prevent="handleDrop"
                class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400 cursor-pointer"
            >
                Drag & Drop files here or
                <input type="file" multiple @change="handleFilesUpload" class="hidden" ref="fileInput" />
                <button @click="$refs.fileInput.click()" class="text-blue-600 underline ml-1">Browse</button>
            </div>

            <!-- PREVIEW -->
            <div v-if="uploadFiles.length" class="space-y-2 max-h-48 overflow-y-auto border rounded p-2 mt-3">
                <div v-for="(f, idx) in uploadFiles" :key="idx" class="flex justify-between text-sm">
                <span>{{ f.name }}</span>
                <button @click="removeFile(idx)" class="text-red-500 text-xs">Remove</button>
                </div>
            </div>

            <template #footer>
                <button @click="cancelUpload" class="px-4 py-2 bg-gray-200 rounded-lg text-sm">
                Cancel
                </button>
                <button @click="saveFiles" class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">
                Upload
                </button>
            </template>
        </BaseModal>

        <!-- FILE VIEWER MODAL -->
        <BaseModal
            v-model="showFileViewer"
            :title="fileViewerCategory"
            width="w-full max-w-3xl"
            >
            <div class="border rounded p-4 text-center">
                <p class="text-gray-600">{{ currentFile.name }}</p>

                <img
                v-if="isImage(currentFile)"
                :src="currentFileURL"
                class="max-h-96 mx-auto mt-2"
                />
            </div>

            <div v-if="hasMultipleFiles" class="flex justify-between mt-4">
                <button
                @click="prevFile"
                class="px-4 py-2 bg-gray-200 rounded-lg"
                :disabled="fileIndex === 0"
                >
                Previous
                </button>

                <button
                @click="nextFile"
                class="px-4 py-2 bg-gray-200 rounded-lg"
                :disabled="fileIndex === getFilesByCategory(fileViewerCategory).length - 1"
                >
                Next
                </button>
            </div>
        </BaseModal>
    </div>
</template>
<script setup>
    import { ref, computed, onMounted, onBeforeUnmount   } from "vue";
    import BaseModal from '@/components/BaseModal.vue'
    const props = defineProps({
        employee: Object
    });
    const fileCategories = ['Main', 'Certificates', 'Evaluation', 'Other Documents']

    const emit = defineEmits(['add-file', 'remove-file']);
    // Upload modal state
    const showUploadModal = ref(false)
    const uploadCategory = ref('')
    const uploadFiles = ref([])

    // File viewer state
    const showFileViewer = ref(false)
    const fileViewerCategory = ref('')
    const fileIndex = ref(0)

    // Get files by category
    const getFilesByCategory = (category) => props.employee.files.filter(f => f.category === category)
    const hasMultipleFiles = computed(() => getFilesByCategory(fileViewerCategory.value).length > 1)
    const currentFile = computed(() => getFilesByCategory(fileViewerCategory.value)[fileIndex.value])
    const currentFileURL = computed(() => currentFile.value?.url || '')

    // Open file viewer modal
    const openFileViewer = (category, idx) => {
    fileViewerCategory.value = category
    fileIndex.value = idx
    showFileViewer.value = true
    }

    // Next / Previous for file viewer
    const nextFile = () => {
    if (fileIndex.value < getFilesByCategory(fileViewerCategory.value).length - 1) fileIndex.value++
    }
    const prevFile = () => {
    if (fileIndex.value > 0) fileIndex.value--
    }

    // Check if file is image
    const isImage = (file) => {
    return file.name.match(/\.(jpeg|jpg|png|gif)$/i)
    }

    // Upload modal
    const openUploadModal = (category) => {
    uploadCategory.value = category
    showUploadModal.value = true
    }
    const handleFilesUpload = (event) => {
    uploadFiles.value.push(...event.target.files)
    }
    const handleDrop = (event) => {
    uploadFiles.value.push(...Array.from(event.dataTransfer.files))
    }
    const removeFile = (idx) => {
    if (window.confirm(`Are you sure you want to delete "${uploadFiles.value[idx].name}"?`)) {
        uploadFiles.value.splice(idx, 1)
    }
    }
    const cancelUpload = () => {
    uploadFiles.value = []
    uploadCategory.value = ''
    showUploadModal.value = false
    }
    const saveFiles = () => {
        if (!uploadCategory.value) return alert('Please select a category')

        uploadFiles.value.forEach(file => {
            emit('add-file', {
                name: file.name,
                category: uploadCategory.value,
                url: URL.createObjectURL(file)
            });
        });

        cancelUpload();
    };

    // Remove file from main grid
    const confirmRemoveFile = (category, idx) => {
        const targetFile = getFilesByCategory(category)[idx];

        if (window.confirm(`Are you sure you want to delete "${targetFile.name}"?`)) {
            emit('remove-file', targetFile);
        }
    };
</script>