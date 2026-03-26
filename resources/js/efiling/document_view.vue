<template> 
<navigation>
    <div class="space-y-6">

        <!-- HEADER -->
        <div class="glass px-8 py-6 rounded-3xl shadow-sm">
            <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                <div>
                    <div class="flex flex-wrap items-center gap-2">
                        <h2 class="text-xl font-bold text-gray-800">
                            {{ form.subject || "Untitled Document" }}
                        </h2>

                        <span class="rounded-full bg-green-100 text-green-700 text-xs font-semibold px-3 py-1">
                            Original
                        </span>
                        <span class="rounded-full bg-red-100 text-red-700 text-xs font-semibold px-3 py-1">
                            Confidential
                        </span>
                    </div>

                    <p class="text-gray-500 mt-1 text-sm">
                        {{ form.company }}
                    </p>
                </div>

                <a href="/filing/document_update" class="btn-primary h-fit" @click="toggleEdit">
                    Edit
                </a>
            </div>

            <!-- CONTENT -->
            <div class="grid lg:grid-cols-2 gap-x-12 gap-y-2 mt-6 text-gray-700 text-sm">
                <div class="flex"><label class="font-medium w-40 text-gray-600">Document Date</label><div class="flex-1">January 16, 2026</div></div>
                <div class="flex"><label class="font-medium w-40 text-gray-600">Logged Date</label><div class="flex-1">January 16, 2026</div></div>
                <div class="flex"><label class="font-medium w-40 text-gray-600">Document Location</label><div class="flex-1 break-all">CNPR-ACC-APV-2013-1001</div></div>
                <div class="flex"><label class="font-medium w-40 text-gray-600">Sender</label><div class="flex-1">John Doe</div></div>
                <div class="flex"><label class="font-medium w-40 text-gray-600">Document Type</label><div class="flex-1">Internal Memo</div></div>
                <div class="flex"><label class="font-medium w-40 text-gray-600">Addressee</label><div class="flex-1">Jane Smith</div></div>
                <div class="flex"><label class="font-medium w-40 text-gray-600">Department</label><div class="flex-1">Accounting</div></div>
                <div class="flex"><label class="font-medium w-40 text-gray-600">Signatory</label><div class="flex-1">Manager</div></div>
                <div class="flex"><label class="font-medium w-40 text-gray-600">Shared With</label><div class="flex-1">Team A</div></div>
                <div class="flex"><label class="font-medium w-40 text-gray-600">Email Sender</label><div class="flex-1">email@company.com</div></div>
            </div>
        </div>

        <!-- MAIN GRID -->
        <div class="grid lg:grid-cols-2 gap-6">

            <!-- REMARKS -->
            <div class="glass p-6 rounded-3xl">
                <h3 class="font-semibold mb-3">Document Remarks</h3>
                <div class="remark-box text-sm" v-html="form.remark || 'No remarks'"></div>
            </div>

            <!-- ATTACHMENTS -->
            <div class="glass p-6 rounded-3xl">
                <h3 class="font-semibold mb-3">Attachments</h3>

                <div class="grid grid-cols-6 gap-3">
                    <div
                        v-for="(file,i) in form.attachments"
                        :key="i"
                        class="file-card"
                        @click="openPreview(i)"
                    >
                        <component 
                            :is="getFileIcon(file.name)" 
                            :class="[
                                'w-8 h-8',
                                isImage(file.name) ? 'text-blue-500' :
                                isPDF(file.name) ? 'text-red-500' :
                                'text-gray-500'
                            ]"
                        />
                        <p class="text-xs truncate">{{ file.name }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- PREVIEW MODAL -->
        <transition name="modal">
            <div 
                v-if="previewModal" 
                class="glass-backdrop fixed inset-0 flex justify-center items-center z-50 !m-0"
                @click.self="closeModal"
            >
                <div class="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">

                    <!-- HEADER (STICKY) -->
                    <div class="flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur sticky top-0 z-10">
                        <div class="flex flex-col">
                            <h3 class="text-lg font-semibold text-gray-800">
                                Document Preview
                            </h3>
                            <p class="text-sm text-gray-500 truncate max-w-md">
                                {{ currentFile.name }}
                            </p>
                        </div>

                        <button 
                            @click="closeModal"
                            class="text-gray-400 hover:text-gray-700 text-xl"
                        >
                            ✕
                        </button>
                    </div>

                    <!-- CONTENT -->
                    <div class="flex-1 flex items-center justify-center bg-gray-100 relative overflow-hidden">

                        <!-- IMAGE -->
                        <img
                            v-if="isImage(currentFile.name)"
                            :src="currentFile.url"
                            class="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                        />

                        <!-- PDF -->
                        <iframe
                            v-else-if="isPDF(currentFile.name)"
                            :src="currentFile.url"
                            class="w-full h-full"
                        ></iframe>

                        <!-- FALLBACK -->
                        <div v-else class="text-gray-400 text-sm">
                            Preview not supported
                        </div>

                    </div>

                    <!-- FOOTER (STICKY) -->
                    <div class="flex items-center justify-between px-6 py-4 border-t bg-white/80 backdrop-blur sticky bottom-0">

                        <!-- NAVIGATION -->
                        <div class="flex gap-2">
                            <button 
                                class="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-sm"
                                @click="prevFile"
                            >
                                ← Prev
                            </button>

                            <button 
                                class="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-sm"
                                @click="nextFile"
                            >
                                Next →
                            </button>
                        </div>

                        <!-- ACTIONS -->
                        <div class="flex gap-2">
                            <a 
                                :href="currentFile.url"
                                target="_blank"
                                class="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm"
                            >
                                Open
                            </a>

                            <button 
                                @click="closeModal"
                                class="px-4 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 text-sm"
                            >
                                Close
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </transition>
    </div>
</navigation>
</template>

<script setup>
    import { reactive, ref, computed, watch } from 'vue'
    import navigation from "../components/layouts/navigation_filing.vue"
    import { 
        PhotoIcon, 
        DocumentTextIcon, 
        FolderIcon 
    } from '@heroicons/vue/24/outline'

    /* STATE */
    const previewModal = ref(false)
    const currentIndex = ref(0)
    const isEditing = ref(false)

    /* FORM */
    const form = reactive({
        subject:"Sample Document",
        company:"San Miguel Corporation",
        remark:"<p>This is a long remark... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>",
        attachments:[
            {name:"sample1.jpg", url:"https://via.placeholder.com/600x400"},
            {name:"sample2.png", url:"https://via.placeholder.com/600x400"},
            {name:"sample.pdf", url:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
            {name:"", url:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"}
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

    function closeModal(){
        previewModal.value = false
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

    function getFileIcon(name) {
        if (isImage(name)) return PhotoIcon
        if (isPDF(name)) return DocumentTextIcon
        return FolderIcon
    }

    /* LOCK BODY SCROLL */
    watch(previewModal, (val)=>{
        document.body.style.overflow = val ? 'hidden' : ''
    })
    </script>

    <style scoped>
    .glass-backdrop {
        background: rgba(16,16,16,0.05);
        backdrop-filter: blur(5px);

        position: fixed;
        inset: 0;

        overflow-y: auto;

        display: flex;
        justify-content: center;
        align-items: flex-start;

        padding: 80px 20px;
    }
    .glass-backdrop{
        scroll-behavior: smooth;
    }

    .glass-modal {
        background: rgba(255,255,255,0.76);
        backdrop-filter: blur(30px);
        border-radius: 24px;
        box-shadow: 0 8px 32px rgba(42,42,42,0.13);

        width: 100%;
        max-width: 850px;
    }
    .modal-content{
        line-height: 1.6;
    }

    /* REMARK SCROLL */
    .remark-box{
        max-height: 350px;
        overflow-y: auto;
        padding-right: 4px;
    }
    .remark-box::-webkit-scrollbar {
        width: 6px;
    }
    .remark-box::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.2);
        border-radius: 10px;
    }

    /* FILE CARD */
    .file-card{
        @apply bg-white/40 backdrop-blur p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer transition;
    }
    .file-card:hover{
        transform: scale(1.05);
    }

    /* MODAL */
    .modal{
        @apply fixed inset-0 bg-black/50 flex items-center justify-center z-50;
    }
    .modal-content{
        @apply bg-white p-6 rounded-2xl w-[90%] max-w-3xl flex flex-col;
        max-height: 90vh;
    }

    /* MODAL ANIMATION */
    .modal-enter-active,
    .modal-leave-active{
        transition: all 0.25s ease;
    }

    .modal-enter-from{
        opacity:0;
        transform: scale(0.95) translateY(20px);
    }

    .modal-enter-to{
        opacity:1;
        transform: scale(1) translateY(0);
    }

    .modal-leave-from{
        opacity:1;
    }

    .modal-leave-to{
        opacity:0;
        transform: scale(0.95) translateY(20px);
    }

</style>