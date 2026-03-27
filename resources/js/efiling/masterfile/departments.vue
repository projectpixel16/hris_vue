<template>
    <navigation>
        <div class="space-y-4">

            <!-- HEADER -->
            <div class="glass p-6 rounded-3xl space-y-4">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-700">
                            Department Management
                        </h2>
                        <p class="text-xs text-gray-500 mt-1">
                            Manage company departments
                        </p>
                    </div>

                    <div class="flex gap-2">
                        <button class="btn-primary" @click="openAddModal">
                            + Add Department
                        </button>
                    </div>
                </div>
            </div>

            <!-- TABLE -->
            <div class="glass p-6 rounded-3xl">

                <div class="flex justify-between mb-4">
                    <div class="text-sm text-gray-500">
                        Showing {{ departments.length }} departments
                    </div>

                    <input type="text" class="input w-80" placeholder="Quick search..." />
                </div>

                <div class="rounded-xl overflow-hidden border">
                    <table class="w-full text-sm">
                        <thead class="bg-white/40 text-gray-600">
                            <tr class="text-left">
                                <th class="p-4">Department Name</th>
                                <th class="p-4">Code</th>
                                <th class="p-4">Description</th>
                                <th class="p-4">Status</th>
                                <th class="p-4 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(dept,index) in departments" :key="index"
                                class="border-t hover:bg-white/20 transition">

                                <td class="p-4">{{ dept.name }}</td>
                                <td class="p-4">{{ dept.code }}</td>
                                <td class="p-4">{{ dept.description }}</td>
                                <td class="p-4">
                                    <span class="px-2 py-1 rounded-full text-xs"
                                        :class="dept.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'">
                                        {{ dept.status }}
                                    </span>
                                </td>

                                <td class="p-4 flex justify-center gap-2">
                                    <button class="bg-white rounded-full p-1 text-gray-600" @click="editDepartment(dept)">
                                        <PencilIcon class="size-4"/>
                                    </button>
                                    <button class="bg-red-500 rounded-full p-1 text-white" @click="deleteDepartment(index)">
                                        <XMarkIcon class="size-4"/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <div>
                        Showing {{ departments.length }} entries
                    </div>
                    <div class="flex gap-1">
                        <button class="page-btn">Prev</button>
                        <button class="page-btn active">1</button>
                        <button class="page-btn">Next</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL -->
        <transition name="modal">
        <div 
            v-if="departmentModal" 
            class="glass-backdrop fixed inset-0 flex justify-center items-center z-50 !m-0"
            @click.self="closeModal"
        >
            <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col overflow-hidden">

                <!-- HEADER -->
                <div class="flex justify-between items-center px-6 py-4 border-b">
                    <h3 class="text-lg font-semibold text-gray-800">
                        {{ isEdit ? "Update Department" : "Add Department" }}
                    </h3>

                    <button @click="closeModal" class="text-gray-400 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <!-- FORM -->
                <div class="p-6 space-y-4">

                    <div>
                        <label class="label">Department Name</label>
                        <input v-model="form.name" class="input w-full border" />
                    </div>

                    <div>
                        <label class="label">Code</label>
                        <input v-model="form.code" class="input w-full border" />
                    </div>

                    <div>
                        <label class="label">Description</label>
                        <textarea v-model="form.description" class="input w-full border"></textarea>
                    </div>

                    <div>
                        <label class="label">Status</label>
                        <select v-model="form.status" class="input w-full border">
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                </div>

                <!-- FOOTER -->
                <div class="flex justify-end gap-2 px-6 py-4 border-t">
                    <button class="btn-secondary" @click="closeModal">Cancel</button>

                    <button class="btn-primary" @click="saveDepartment">
                        {{ isEdit ? "Update" : "Save" }}
                    </button>
                </div>

            </div>
        </div>
        </transition>

    </navigation>
</template>

<script setup>
import { ref } from "vue"
import navigation from "../../components/layouts/navigation_filing.vue"
import { XMarkIcon, PencilIcon } from "@heroicons/vue/24/solid"

const departmentModal = ref(false)
const isEdit = ref(false)
const editIndex = ref(null)

function openAddModal(){
    isEdit.value = false
    form.value = { name:"", code:"", description:"", status:"Active" }
    departmentModal.value = true
}

function editDepartment(dept){
    isEdit.value = true
    editIndex.value = departments.value.indexOf(dept)
    form.value = { ...dept }
    departmentModal.value = true
}

function deleteDepartment(index){
    departments.value.splice(index,1)
}

function closeModal(){
    departmentModal.value = false
}

function saveDepartment(){
    if(isEdit.value){
        departments.value[editIndex.value] = { ...form.value }
    } else {
        departments.value.push({ ...form.value })
    }
    closeModal()
}

const departments = ref([
    { name:"Human Resources", code:"HR", description:"Handles recruitment and employee relations", status:"Active" },
    { name:"IT Department", code:"IT", description:"Manages systems and infrastructure", status:"Active" },
    { name:"Finance", code:"FIN", description:"Handles company finances", status:"Inactive" }
])

const form = ref({
    name:"",
    code:"",
    description:"",
    status:"Active"
})
</script>