<template>
    <navigation>
        <div class="space-y-6">

            <!-- HEADER -->
            <div class="glass p-6 rounded-3xl space-y-4">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-700">
                            Company Management
                        </h2>
                        <p class="text-xs text-gray-500 mt-1">
                            Manage company records and details
                        </p>
                    </div>

                    <div class="flex gap-2">
                        <button class="btn-primary" @click="openAddModal">
                            + Add Company
                        </button>
                    </div>
                </div>
            </div>

            <!-- TABLE -->
            <div class="glass p-6 rounded-3xl">

                <div class="flex justify-between mb-4">
                    <div class="text-sm text-gray-500">
                        Showing {{ companies.length }} companies
                    </div>

                    <input type="text" class="input w-80" placeholder="Quick search..." />
                </div>

                <div class="rounded-xl overflow-hidden border">
                    <table class="w-full text-sm">
                        <thead class="bg-white/40 text-gray-600">
                            <tr class="text-left">
                                <th class="p-4">Company Name</th>
                                <th class="p-4">Code</th>
                                <th class="p-4">Address</th>
                                <th class="p-4">Status</th>
                                <th class="p-4 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(company,index) in companies" :key="index"
                                class="border-t hover:bg-white/20 transition">

                                <td class="p-4">{{ company.name }}</td>
                                <td class="p-4">{{ company.code }}</td>
                                <td class="p-4">{{ company.address }}</td>
                                <td class="p-4">
                                    <span class="px-2 py-1 rounded-full text-xs"
                                        :class="company.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'">
                                        {{ company.status }}
                                    </span>
                                </td>

                                <td class="p-4 flex justify-center gap-2">
                                    <button class="bg-white rounded-full p-1 text-gray-600" @click="editCompany(company)">
                                        <PencilIcon class="size-4"/>
                                    </button>
                                    <button class="bg-red-500 rounded-full p-1 text-white" @click="deleteCompany(index)">
                                        <XMarkIcon class="size-4"/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <div>
                        Showing {{ companies.length }} entries
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
            v-if="companyModal" 
            class="glass-backdrop fixed inset-0 flex justify-center items-center z-50 !m-0"
            @click.self="closeModal"
        >
            <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col overflow-hidden">

                <!-- HEADER -->
                <div class="flex justify-between items-center px-6 py-4 border-b">
                    <h3 class="text-lg font-semibold text-gray-800">
                        {{ isEdit ? "Update Company" : "Add Company" }}
                    </h3>

                    <button @click="closeModal" class="text-gray-400 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <!-- FORM -->
                <div class="p-6 space-y-4">

                    <div>
                        <label class="label">Company Name</label>
                        <input v-model="form.name" class="input w-full border" />
                    </div>

                    <div>
                        <label class="label">Code</label>
                        <input v-model="form.code" class="input w-full border" />
                    </div>

                    <div>
                        <label class="label">Address</label>
                        <textarea v-model="form.address" class="input w-full border"></textarea>
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

                    <button class="btn-primary" @click="saveCompany">
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

const companyModal = ref(false)
const isEdit = ref(false)
const editIndex = ref(null)

function openAddModal(){
    isEdit.value = false
    form.value = { name:"", code:"", address:"", status:"Active" }
    companyModal.value = true
}

function editCompany(company){
    isEdit.value = true
    editIndex.value = companies.value.indexOf(company)
    form.value = { ...company }
    companyModal.value = true
}

function deleteCompany(index){
    companies.value.splice(index,1)
}

function closeModal(){
    companyModal.value = false
}

function saveCompany(){
    if(isEdit.value){
        companies.value[editIndex.value] = { ...form.value }
    } else {
        companies.value.push({ ...form.value })
    }
    closeModal()
}

const companies = ref([
    { name:"ABC Corporation", code:"ABC", address:"Manila, Philippines", status:"Active" },
    { name:"XYZ Solutions", code:"XYZ", address:"Cebu, Philippines", status:"Active" },
    { name:"Global Tech", code:"GT", address:"Davao, Philippines", status:"Inactive" }
])

const form = ref({
    name:"",
    code:"",
    address:"",
    status:"Active"
})
</script>