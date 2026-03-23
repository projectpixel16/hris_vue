<template>
    <navigation>
        <div class="space-y-4">
            <!-- STEP 1 COMPANY SELECTION -->
            <div v-if="!form.company" class="glass py-10 px-14 rounded-3xl !h-96">
                <h3 class="text-lg font-semibold text-gray-700 mb-2">
                    Select Company
                </h3>
                <div class="flex flex-wrap gap-3">
                    <button
                        v-for="company in companies"
                        :key="company"
                        @click="selectCompany(company)"
                        class="company-btn">
                        {{ company }}
                    </button>

                </div>
            </div>

            <div v-if="form.company" class="glass py-10 px-14 rounded-3xl space-y-6  mb-20">
                <!-- COMPANY DISPLAY -->
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-bold text-gray-700">
                        {{ form.company }}
                    </h2>
                    <button
                        @click="resetCompany"
                        class="text-sm text-gray-700/60 hover:text-gray-700">
                        Change Company
                    </button>
                </div>
                <!-- FORM GRID -->
                <div class="grid md:grid-cols-2 gap-2">
                    <!-- DATE -->
                    <div class="grid md:grid-cols-2 gap-2">
                        <div>
                            <label class="label">Document Date</label>
                            <input type="date" v-model="form.date" class="input"/>
                        </div>
                        <div>
                            <label class="label">Type of Document</label>
                            <select v-model="form.type" class="input">
                                <option>Memo</option>
                                <option>Contract</option>
                                <option>Letter</option>
                                <option>Report</option>
                            </select>
                        </div>
                    </div>

                    <!-- SUBJECT -->
                    <div>
                        <label class="label">Subject</label>
                        <input type="text" v-model="form.subject" class="input" placeholder="e.g. Cash Vouchers"/>
                    </div>

                    <div class="grid md:grid-cols-2 gap-2">
                        <div>
                            <label class="label">Document Location</label>
                            <input type="text" v-model="form.location" class="input" placeholder="e.g. Admin Office"/>
                        </div>

                        <div>
                            <label class="label">Department</label>
                            <input type="text" v-model="form.department" class="input" placeholder="e.g. IT Office"/>
                        </div>
                    </div>

                    <!-- SIGNATORY -->
                    <div>
                        <label class="label">Signatory</label>
                        <input type="text" v-model="form.signatory" class="input" placeholder="Name of Employee/s"/>
                    </div>

                    <!-- SENDER -->
                    <div>
                        <label class="label">Sender</label>
                        <input type="text" v-model="form.sender_company" class="input" placeholder="Company"/>
                        <input type="text" v-model="form.sender_person" class="input mt-1" placeholder="Person"/>
                    </div>

                    <!-- ADDRESSEE -->
                    <div>
                        <label class="label">Addressee</label>
                        <input type="text" v-model="form.addressee_company" class="input" placeholder="Company"/>
                        <input type="text" v-model="form.addressee_person" class="input mt-1" placeholder="Person"/>
                    </div>


                    <div class="grid md:grid-cols-2 gap-2 mt-3">
                        <div>
                            <label class="label">Type of Copy</label>
                            <div class="flex gap-2 mt-2">

                                <button
                                    type="button"
                                    @click="form.copy='Original'"
                                    :class="copyBtn(form.copy==='Original')">
                                    Original
                                </button>

                                <button
                                    type="button"
                                    @click="form.copy='Photocopy'"
                                    :class="copyBtn(form.copy==='Photocopy')">
                                    Photocopy
                                </button>

                            </div>
                        </div>

                        <div>
                            <label class="label">Confidential?</label>

                            <div class="flex gap-3 mt-2">

                                <button
                                    type="button"
                                    @click="form.confidential='Yes'"
                                    :class="copyBtn(form.confidential==='Yes')">
                                    Yes
                                </button>

                                <button
                                    type="button"
                                    @click="form.confidential='No'"
                                    :class="copyBtn(form.confidential==='No')">
                                    No
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- WYSIWYG REMARK -->
                <div>
                    <label class="label">Remarks</label>
                    <div class="editor">
                        <div class="editor-toolbar">

                            <button @click="format('bold')">B</button>
                            <button @click="format('italic')">I</button>
                            <button @click="format('underline')">U</button>

                        </div>

                        <div
                            contenteditable="true"
                            class="editor-input"
                            ref="editor"
                            @input="updateRemark">
                        </div>
                    </div>
                </div>
                <!-- ATTACHMENTS -->
                <div>
                    <label class="label">Attachments</label>
                    <div
                        class="upload-zone"
                        @dragover.prevent
                        @drop.prevent="handleDrop"
                    >

                        <input
                            type="file"
                            multiple
                            ref="fileInput"
                            class="hidden"
                            @change="addFiles"
                        />

                        <p class="text-sm text-gray-600">
                            Drag & Drop files here or
                            <span
                                class="text-indigo-500 cursor-pointer"
                                @click="$refs.fileInput.click()"
                            >
                                Browse
                            </span>
                        </p>

                    </div>
                    <!-- FILE GRID -->
                    <div class="grid grid-cols-8 gap-3 mt-4">
                        <div v-for="(file,i) in form.attachments" :key="i" class="file-card" >
                            <button class="file-remove" @click="removeFile(i)" >
                                <XMarkIcon class="size-3"></XMarkIcon>
                            </button>

                            <div class="file-icon">📄</div>

                            <p class="file-name">
                                {{ file.name }}
                            </p>

                        </div>

                    </div>

                </div>
                
                <div class="flex justify-between items-center pt-6">
                    <!-- LEFT -->
                    <button
                        @click="resetForm"
                        class="btn-secondary !px-2 !text-red-500"
                        title="Reset Form"
                    >
                        <ArrowPathIcon class="size-4"></ArrowPathIcon>
                    </button>
                    <!-- RIGHT -->
                    <div class="flex gap-3">
                        <button
                            @click="saveDraft"
                            class="btn-secondary">
                            Save Draft
                        </button>
                        <button
                            @click="previewModal=true"
                            class="btn-primary">
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <transition name="modal">
            <div v-if="previewModal" class="glass-backdrop fixed inset-0 flex justify-center z-50" @click.self="previewModal=false">
                <div class="glass-modal rounded-3xl w-full modal-content">
                    <div class="p-8 space-y-4">
                        <h3 class="text-xl font-semibold text-gray-700">
                            Document Preview
                        </h3>
                        <div class="text-sm">
                            <p><span class="font-semibold">Company:</span> {{form.company || "SMC"}}</p>
                            <p><span class="font-semibold">Date:</span> {{form.date || "2026-03-14"}}</p>
                            <p><span class="font-semibold">Subject:</span> {{form.subject || "Contract Agreement"}}</p>
                        </div>
                        <div class="grid grid-cols-2 gap-1 text-sm">
                            <p><span class="font-semibold">Department:</span> {{form.department || "HR Department"}}</p>
                            <p><span class="font-semibold">Location:</span> {{form.location || "Main Office"}}</p>
                            <p><span class="font-semibold">Type:</span> {{form.type || "Memo"}}</p>
                            <p><span class="font-semibold">Signatory:</span> {{form.signatory || "Juan Dela Cruz"}}</p>
                            <p><span class="font-semibold">Copy:</span> {{form.copy || "Original"}}</p>
                            <p><span class="font-semibold">Confidential:</span> {{form.confidential || "No"}}</p>
                            <p><span class="font-semibold">Sender:</span> {{form.sender_person}} ({{form.sender_company}})</p>
                            <p><span class="font-semibold">Addressee:</span> {{form.addressee_person}} ({{form.addressee_company}})</p>

                        </div>
                        <!-- REMARKS -->
                        <div>
                            <span class="font-semibold text-sm">Remarks</span>
                            <div class="text-sm" v-html="form.remark || 'No remarks added.'"></div>
                        </div>
                        <!-- ATTACHMENTS -->
                        <div v-if="form.attachments.length">
                            <b class="text-sm">Attachments</b>
                            <ul class="text-sm mt-2 list-disc ml-4">
                                <li v-for="(file,i) in form.attachments" :key="i">
                                    {{file.name}} 
                                </li>
                            </ul>
                        </div>
                        <div class="flex justify-end gap-3 pt-4">
                            <button
                                @click="previewModal=false"
                                class="btn-secondary">
                                Cancel
                            </button>
                            <button
                                @click="submitForm"
                                class="btn-primary">
                                Confirm Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </navigation>
</template>


<script setup>
    import { reactive, watch, ref, onMounted } from 'vue'
    import navigation from "../components/layouts/navigation_filing.vue"
    import { ArrowPathIcon, XMarkIcon } from '@heroicons/vue/24/solid'

    const previewModal = ref(false)

    const companies = [
        "San Miguel Corporation (SMC)",
        "Ayala Corporation",
        "SM Investments Corporation",
        "Jollibee Foods Corporation",
        "Petron Corporation"
    ]

    const form = reactive({
        company: "",
        date:"",
        subject:"",
        location:"",
        type:"",
        department:"",
        signatory:"",
        sender_company:"",
        sender_person:"",
        addressee_company:"",
        addressee_person:"",
        copy:"",
        confidential:"",
        remark:"",
        attachments:[]
    })

    const fileInput = ref(null)
    function addFiles(e){

            const files = Array.from(e.target.files)

            files.forEach(file=>{
            form.attachments.push({
            file:file,
            name:file.name
            })
        })

    }

    function handleDrop(e){

        const files = Array.from(e.dataTransfer.files)

            files.forEach(file=>{
            form.attachments.push({
            file:file,
            name:file.name
            })
        })

    }
    /* SELECT COMPANY */
    function selectCompany(company){
        form.company = company
    }

    /* CHANGE COMPANY */
    function resetCompany(){
        form.company=""
    }

    function removeFile(i){
        form.attachments.splice(i,1)
    }


    /* WYSIWYG */
    function format(command){
        document.execCommand(command)
    }


    /* BUTTON STYLE */
    function copyBtn(active){
        return active
            ? "btn-primary"
            : "btn-secondary"
    }


    /* SAVE DRAFT */
    function saveDraft(){
        localStorage.setItem("documentDraft", JSON.stringify(form))
        alert("Draft Saved")
    }


    /* LOAD DRAFT */
    onMounted(()=>{

        const saved = localStorage.getItem("documentDraft")

        if(saved){

            Object.assign(form, JSON.parse(saved))

        }

    })


    /* AUTO SAVE */
    watch(form,(val)=>{

        localStorage.setItem("documentDraft", JSON.stringify(val))

    },{deep:true})


    /* RESET */
    function resetForm(){

        localStorage.removeItem("documentDraft")

        Object.keys(form).forEach(key=>{
            form[key]=""
        })

        form.attachments=[]

    }


    /* SUBMIT */
    function submitForm(){

        console.log("submit",form)

        previewModal.value=false

        alert("Document Submitted")

    }
    const editor = ref(null)

    function updateRemark(e){
        form.remark = e.target.innerHTML
    }

    onMounted(()=>{

        const saved = localStorage.getItem("documentDraft")

        if(saved){
            Object.assign(form, JSON.parse(saved))
        }

        if(editor.value){
            editor.value.innerHTML = form.remark
        }

    })
    watch(previewModal,(val)=>{

        if(val){
            document.body.style.overflow = "hidden"
        }else{
            document.body.style.overflow = ""
        }

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
    .label{
        @apply text-sm text-gray-700 block mb-1;
    }

    .input{
        @apply w-full bg-white/40 rounded-2xl px-4 py-2 text-gray-700 text-sm ;
    }


    select,textarea, .editor-input,input:focus-visible{
        outline: none;
        /* box-shadow: 0px 1px 2px 0px #f89060; */
    }

    .company-btn{
        @apply px-5 py-3 rounded-xl bg-white/30 text-gray-700 transition text-xl ;
    }
    .company-btn:hover{
        @apply px-5 py-3 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-xl text-white;
    }
    button{
        @apply text-sm;
    }

    .btn-primary{
    @apply px-4 py-2 bg-indigo-500 rounded-xl text-white;
    }

    .btn-secondary{
    @apply px-4 py-2 bg-white/30 text-gray-700 rounded-xl;
    }

    .btn-danger{
    @apply px-4 py-2 bg-red-500 rounded-xl text-white;
    }

    .editor{
        @apply bg-white/30 rounded-2xl p-3 min-h-[120px] text-gray-700 text-sm;
    }

    .editor-input{
        @apply bg-white/30 rounded-2xl p-3 min-h-[120px] text-gray-700 text-sm;
    }

    .editor-toolbar button{
    @apply bg-white/20 text-gray-700 px-3 py-1 rounded mr-2 mb-2;
    }
    .upload-zone{
    @apply border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-white/20 cursor-pointer;
    }

    .file-card{
    @apply relative bg-white/40 rounded-xl p-3 flex flex-col items-center text-center text-xs;
    }

    .file-icon{
    @apply text-2xl;
    }

    .file-name{
    @apply truncate w-full mt-1;
    }

    .file-remove{
    @apply absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center;
    }

    .btn-icon{
        @apply w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-xl;
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