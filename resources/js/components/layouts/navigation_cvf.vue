<template>
<div class="flex min-h-screen bg-gray-50">

    <!-- SIDEBAR -->
    <aside
        class="bg-white border-r shadow-sm flex flex-col justify-between transition-all duration-300"
        :class="collapsed ? 'w-20' : 'w-64'"
    >

        <!-- LOGO -->
        <div class="h-16 flex items-center px-4 border-b">
            <ArchiveBoxIcon class="w-7 h-7 text-emerald-600"/>
            <span v-if="!collapsed" class="ml-3 font-semibold text-gray-700 text-lg tracking-wide">
                CVF System
            </span>
        </div>

        <!-- NAVIGATION -->
        <nav class="flex-1 px-3 py-4 space-y-1">

            <!-- DASHBOARD -->
            <a href="/filing/dashboard" class="menu active">
                <HomeIcon class="icon"/>
                <span v-if="!collapsed">Dashboard</span>
            </a>

            <!-- MASTERFILE -->
            <div>
                <button @click="toggle('master')" class="menu justify-between w-full">
                    <div class="flex items-center gap-3">
                        <Square3Stack3DIcon class="icon"/>
                        <span v-if="!collapsed">Masterfile</span>
                    </div>
                    <span v-if="!collapsed" class="text-xs text-gray-400">⌄</span>
                </button>

                <transition name="fade">
                    <div v-show="open.master" class="submenu">
                        <a href="/filing/users">Users</a>
                        <a href="/filing/company">Company</a>
                        <a href="/filing/departments">Departments</a>
                    </div>
                </transition>
            </div>

            <!-- RECORDS -->
            <div class="pt-2">
                <p v-if="!collapsed" class="section-title">Records</p>

                <a href="/filing/form" class="menu">
                    <DocumentPlusIcon class="icon"/>
                    <span v-if="!collapsed">New Record</span>
                </a>

                <a href="/filing/document_list" class="menu">
                    <ClipboardDocumentCheckIcon class="icon"/>
                    <span v-if="!collapsed">View Records</span>
                </a>
            </div>

            <!-- REPORTS -->
            <div>
                <button @click="toggle('reports')" class="menu justify-between w-full">
                    <div class="flex items-center gap-3">
                        <ChartBarIcon class="icon"/>
                        <span v-if="!collapsed">Reports</span>
                    </div>
                    <span v-if="!collapsed" class="text-xs text-gray-400">⌄</span>
                </button>

                <transition name="fade">
                    <div v-show="open.reports" class="submenu">
                        <a href="#">Monthly</a>
                        <a href="#">Annual</a>
                        <a href="#">Export</a>
                    </div>
                </transition>
            </div>
        </nav>

        <!-- FOOTER -->
        <div class="border-t p-3 space-y-2">

            <button @click="toggle('settings')" class="menu justify-between w-full">
                <div class="flex items-center gap-3">
                    <Cog6ToothIcon class="icon"/>
                    <span v-if="!collapsed">Settings</span>
                </div>
                <span v-if="!collapsed" class="text-xs text-gray-400">⌃</span>
            </button>

            <transition name="fade">
                <div v-show="open.settings" class="submenu">
                    <a href="#">Profile</a>
                    <a href="#">Account</a>
                    <a href="#">Backup</a>
                    <a href="#" class="text-red-500 hover:text-red-600">Logout</a>
                </div>
            </transition>

            <!-- COLLAPSE -->
            <button
                @click="collapsed = !collapsed"
                class="w-full text-xs text-gray-400 hover:text-gray-600 pt-2"
            >
                {{ collapsed ? 'Expand →' : 'Collapse ←' }}
            </button>

        </div>

    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 p-6">
        <slot />
    </main>

</div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import {
    HomeIcon,
    Cog6ToothIcon,
    ChartBarIcon,
    ArchiveBoxIcon,
    DocumentPlusIcon,
    ClipboardDocumentCheckIcon,
    Square3Stack3DIcon
} from '@heroicons/vue/24/solid'

const collapsed = ref(false)

const open = reactive({
    master: false,
    reports: false,
    settings: false
})

const toggle = (menu) => {
    open[menu] = !open[menu]
}
</script>

<style>
.menu {
    @apply flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all;
}

.menu.active {
    @apply bg-emerald-50 text-emerald-600 font-medium;
}

.icon {
    @apply w-5 h-5;
}

.submenu {
    @apply ml-8 mt-1 flex flex-col text-sm text-gray-500 space-y-1;
}

.submenu a {
    @apply px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-800 transition;
}

.section-title {
    @apply text-xs uppercase text-gray-400 px-3 pb-1;
}

/* smooth dropdown */
.fade-enter-active, .fade-leave-active {
    transition: all 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}
</style>