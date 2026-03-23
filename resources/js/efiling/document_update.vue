<template>
<navigation>
    <div class="max-w-7xl mx-auto space-y-6">
        
        <!-- HEADER -->
        <div class="glass px-8 py-6 rounded-3xl">
            <div class="flex justify-between items-start">
                <div>
                    <div class="flex space-x-2 items-start">
                        <h2 class="text-2xl font-bold text-gray-700">
                            {{ form.subject || "Untitled Document" }}
                        </h2>
                        <span class="rounded-full bg-gradient-to-r from-green-500 to-green-700 text-sm mt-2 text-white px-2 py-0">Original</span>
                        <span class="rounded-full bg-gradient-to-r from-red-500 to-red-700 text-sm mt-2 text-white px-2 py-0">Confidentail</span>
                    </div>
                    <p class="text-gray-500">{{ form.company }}</p>
                </div>
                <button class="btn-primary" @click="toggleEdit">
                    {{ isEditing ? "Cancel" : "Edit" }}
                </button>
            </div>
            <div class="grid lg:grid-cols-2 gap-0 mt-4 text-gray-700">
                <div class="flex space-x-2">
                    <label for="" class="w-36">Document Date</label>
                    <div class="font-medium">January 16, 2026</div>
                </div>
                <div class="flex space-x-2">
                    <label for="" class="w-24">Logged Date</label>
                    <div class="font-medium">January 16, 2026</div>
                </div>

                <div class="flex space-x-2">
                    <label for="" class="w-36">Document Location</label>
                    <div class="font-medium">CNPR-ACC-APV-2013-1001</div>
                </div>
                <div class="flex space-x-2">
                    <label for="" class="w-24">Sender</label>
                    <div class="font-medium">January 16, 2026</div>
                </div>

                <div class="flex space-x-2">
                    <label for="" class="w-36">Document Type</label>
                    <div class="font-medium">January 16, 2026</div>
                </div>
                <div class="flex space-x-2">
                    <label for="" class="w-24">Addressee</label>
                    <div class="font-medium">January 16, 2026</div>
                </div>

                <div class="flex space-x-2">
                    <label for="" class="w-36">Department</label>
                    <div class="font-medium">January 16, 2026</div>
                </div>
                <div class="flex space-x-2">
                    <label for="" class="w-24">Signatory</label>
                    <div class="font-medium">January 16, 2026</div>
                </div>

                <div class="flex space-x-2">
                    <label for="" class="w-36">Shared With</label>
                    <div class="font-medium">January 16, 2026</div>
                </div>
                <div class="flex space-x-2">
                    <label for="" class="w-24">Email Sender</label>
                    <div class="font-medium">January 16, 2026</div>
                </div>
            </div>
        </div>

        <!-- MAIN GRID -->
        <div class="grid lg:grid-cols-2 gap-6">
            <!-- REMARKS -->
            <div class="glass p-6 rounded-3xl">
                <h3 class="font-semibold border-b pb-2 mb-3">
                    Document Remarks
                </h3>

                <div
                    class="remark-box text-sm"
                    v-html="form.remark || 'No remarks'"
                ></div>
            </div>
            <!-- ATTACHMENTS -->
            <div class="glass p-6 rounded-3xl">
                <h3 class="font-semibold border-b pb-2 mb-3">
                    Attachments
                </h3>

                <div class="grid grid-cols-5 gap-3">
                    <div
                        v-for="(file,i) in form.attachments"
                        :key="i"
                        class="file-card"
                        @click="openPreview(i)"
                    >
                        <div class="text-3xl">
                            {{ getFileIcon(file.name) }}
                        </div>
                        <p class="text-xs truncate">
                            {{ file.name }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- PREVIEW MODAL -->
        <div v-if="previewModal" class="modal">
            <div class="modal-content">

                <!-- HEADER -->
                <div class="flex justify-between items-center mb-3">
                    <p class="font-medium text-sm">
                        {{ currentFile.name }}
                    </p>
                    <button @click="previewModal=false">✕</button>
                </div>

                <!-- CONTENT -->
                <div class="flex-1 flex items-center justify-center overflow-hidden">

                    <!-- IMAGE -->
                    <img
                        v-if="isImage(currentFile.name)"
                        :src="currentFile.url"
                        class="max-h-[70vh] rounded-xl"
                    />

                    <!-- PDF -->
                    <iframe
                        v-else-if="isPDF(currentFile.name)"
                        :src="currentFile.url"
                        class="w-full h-[70vh] rounded-xl"
                    ></iframe>

                    <!-- OTHER -->
                    <div v-else class="text-gray-400">
                        Preview not supported
                    </div>
                </div>

                <!-- NAVIGATION -->
                <div class="flex justify-between mt-4">
                    <button class="btn-secondary" @click="prevFile">
                        Prev
                    </button>
                    <button class="btn-secondary" @click="nextFile">
                        Next
                    </button>
                </div>

            </div>
        </div>

    </div>
</navigation>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import navigation from "../components/layouts/navigation_filing.vue"

/* STATE */
const previewModal = ref(false)
const currentIndex = ref(0)
const isEditing = ref(false)

/* FORM */
const form = reactive({
    subject:"Sample Document",
    company:"San Miguel Corporation",
    date:"2026-03-17",
    location:"Manila",
    type:"Memo",
    department:"HR",
    signatory:"Juan Dela Cruz",
    sender_person:"sender@email.com",
    copy:"Original",
    remark:"<p>This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a long remark... hover me to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
    attachments:[
        {name:"sample1.jpg", url:"https://via.placeholder.com/600x400"},
        {name:"sample2.png", url:"https://via.placeholder.com/600x400"},
        {name:"sample.pdf", url:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"}
    ]
})

/* COMPUTED */
const currentFile = computed(()=> form.attachments[currentIndex.value])

/* METHODS */
function toggleEdit(){
    isEditing.value = !isEditing.value
}

function openPreview(i){
    currentIndex.value = i
    previewModal.value = true
}

function nextFile(){
    if(currentIndex.value < form.attachments.length - 1){
        currentIndex.value++
    }
}

function prevFile(){
    if(currentIndex.value > 0){
        currentIndex.value--
    }
}

function isImage(name){
    return /\.(jpg|jpeg|png)$/i.test(name)
}

function isPDF(name){
    return /\.pdf$/i.test(name)
}

function getFileIcon(name){
    if(isImage(name)) return "🖼️"
    if(isPDF(name)) return "📄"
    return "📁"
}
</script>

<style scoped>
/* REMARK SCROLL ON HOVER */
.remark-box{
    max-height: 120px;
    overflow: hidden;
}
.remark-box:hover{
    overflow-y: auto;
}

/* FILE CARD */
.file-card{
    @apply bg-white/40 backdrop-blur p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition;
}

/* MODAL */
.modal{
    @apply fixed inset-0 bg-black/50 flex items-center justify-center z-50;
}
.modal-content{
    @apply bg-white p-6 rounded-2xl w-[90%] max-w-3xl flex flex-col;
}
</style>