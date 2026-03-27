<template>
    <navigation>
        <div class="space-y-4">

            <!-- HEADER -->
            <div class="glass p-6 rounded-3xl space-y-4">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-700">
                            Users Management
                        </h2>
                        <p class="text-xs text-gray-500 mt-1">
                            Manage system users, roles, and access
                        </p>
                    </div>

                    <div class="flex gap-2">
                        <button class="btn-primary" @click="openAddModal">
                            + Add User
                        </button>
                    </div>
                </div>
            </div>

            <!-- TABLE -->
            <div class="glass p-6 rounded-3xl">

                <div class="flex justify-between mb-4">
                    <div class="text-sm text-gray-500">
                        Showing {{ users.length }} users
                    </div>

                    <input type="text" class="input w-80" placeholder="Quick search..." />
                </div>

                <div class="rounded-xl overflow-hidden border">
                    <table class="w-full text-sm">
                        <thead class="bg-white/40 text-gray-600">
                            <tr class="text-left">
                                <th class="p-4">Name</th>
                                <th class="p-4">Email</th>
                                <th class="p-4">Role</th>
                                <th class="p-4">Status</th>
                                <th class="p-4 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(user,index) in users" :key="index"
                                class="border-t hover:bg-white/20 transition">

                                <td class="p-4">{{ user.name }}</td>
                                <td class="p-4">{{ user.email }}</td>
                                <td class="p-4">{{ user.role }}</td>
                                <td class="p-4">
                                    <span class="px-2 py-1 rounded-full text-xs"
                                        :class="user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'">
                                        {{ user.status }}
                                    </span>
                                </td>

                                <td class="p-4 flex justify-center gap-2">
                                    <button class="bg-white rounded-full p-1 text-gray-600" @click="editUser(user)">
                                        <PencilIcon class="size-4"></PencilIcon>
                                    </button>
                                    <button class="bg-red-500 rounded-full p-1 text-white" @click="deleteUser(index)">
                                        <XMarkIcon class="size-4"></XMarkIcon>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <div>
                        Showing 1 to 5 of 5 entries
                    </div>
                    <div class="flex gap-1">
                        <button class="page-btn">Prev</button>
                        <button class="page-btn active">1</button>
                        <button class="page-btn">Next</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- USER MODAL -->
        <transition name="modal">
        <div 
            v-if="userModal" 
            class="glass-backdrop fixed inset-0 flex justify-center items-center z-50 !m-0"
            @click.self="closeModal"
        >
            <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col overflow-hidden">

                <!-- HEADER -->
                <div class="flex justify-between items-center px-6 py-4 border-b">
                    <h3 class="text-lg font-semibold text-gray-800">
                        {{ isEdit ? "Update User" : "Add New User" }}
                    </h3>

                    <button @click="closeModal" class="text-gray-400 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <!-- FORM -->
                <div class="p-6 space-y-4">

                    <div>
                        <label class="label">Name</label>
                        <input v-model="form.name" class="input w-full border" />
                    </div>

                    <div>
                        <label class="label">Email</label>
                        <input v-model="form.email" class="input w-full border" />
                    </div>

                    <div>
                        <label class="label">Role</label>
                        <select v-model="form.role" class="input w-full border">
                            <option>Admin</option>
                            <option>User</option>
                        </select>
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

                    <button class="btn-primary" @click="saveUser">
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

    const showFilter = ref(false)
    const userModal = ref(false)
    const isEdit = ref(false)
    const editIndex = ref(null)

    function toggleFilter(){
        showFilter.value = !showFilter.value
    }

    function openAddModal(){
        isEdit.value = false
        form.value = { name:"", email:"", role:"User", status:"Active" }
        userModal.value = true
    }

    function editUser(user){
        isEdit.value = true
        editIndex.value = users.value.indexOf(user)
        form.value = { ...user }
        userModal.value = true
    }

    function deleteUser(index){
        users.value.splice(index,1)
    }

    function closeModal(){
        userModal.value = false
    }

    function saveUser(){
        if(isEdit.value){
            users.value[editIndex.value] = { ...form.value }
        } else {
            users.value.push({ ...form.value })
        }
        closeModal()
    }

    const users = ref([
        { name:"Juan Dela Cruz", email:"juan@gmail.com", role:"Admin", status:"Active" },
        { name:"Maria Santos", email:"maria@gmail.com", role:"User", status:"Active" },
        { name:"Pedro Reyes", email:"pedro@gmail.com", role:"User", status:"Inactive" }
    ])

    const form = ref({
        name:"",
        email:"",
        role:"User",
        status:"Active"
    })
</script>

<style>
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
    @apply text-xs text-gray-500 block mb-1;
    }

    .input{
    @apply bg-white/40 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400;
    }

    .btn-primary{
    @apply bg-blue-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-700;
    }

    .btn-secondary{
    @apply px-3 py-1 bg-gray-200 rounded-lg text-xs hover:bg-gray-300;
    }

    .btn-danger{
    @apply px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600;
    }

    .btn-filter{
    @apply bg-gray-200 px-4 py-2 rounded-xl text-sm hover:bg-gray-300;
    }

    /* ANIMATIONS */
    .modal-enter-active,
    .modal-leave-active{
    transition: all .25s ease;
    }

    .modal-enter-from,
    .modal-leave-to{
    opacity:0;
    transform: scale(.95);
    }

    .slide-enter-active,
    .slide-leave-active{
    transition: all .3s ease;
    }

    .slide-enter-from,
    .slide-leave-to{
    opacity:0;
    transform:translateY(-10px);
    }
</style>