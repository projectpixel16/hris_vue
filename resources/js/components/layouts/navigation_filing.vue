<template>
    <div class="min-h-screen bg-abstract relative overflow-hidden text-gray-800">
        <!-- CLICK OUTSIDE OVERLAY -->
        <div v-if="sidebarOpen"
            class="fixed inset-0 z-40"
            @click="closeSidebar"></div>

        <!-- SIDEBAR -->
        <aside
        ref="sidebar"
        @mouseenter="openSidebar"
        class="fixed top-6 left-6 h-[90vh]
                transition-all duration-300 ease-in-out
                glass rounded-3xl shadow-2xl
                flex flex-col justify-between
                py-4 px-2 z-50"
        :class="sidebarOpen ? 'w-64' : 'w-16'"
        >

            <!-- TOP -->
            <div>
                <!-- LOGO -->
                <div class="flex items-center mb-10 px-2">
                    <div class="w-8 h-8 rounded-2xl shrink-0 flex items-center justify-center
                                bg-gradient-to-br from-emerald-400/60 to-green-700/60
                                backdrop-blur-lg
                                border border-white/30
                                shadow-lg shadow-emerald-500/30
                                text-white">
                        <ArchiveBoxIcon class="w-5 h-5"></ArchiveBoxIcon>
                    </div>

                    <transition name="fade">
                        <span v-if="sidebarOpen"
                            class="ml-3 font-semibold text-lg whitespace-nowrap text-gray-700">
                        E-Filing System
                        </span>
                    </transition>
                </div>
                    <!-- SVG GRADIENT DEFINITIONS -->
                    <svg width="0" height="0" class="absolute">
                        <defs>

                            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#3b82f6"/>
                            <stop offset="100%" stop-color="#1e40af"/>
                            </linearGradient>

                            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#10b981"/>
                            <stop offset="100%" stop-color="#065f46"/>
                            </linearGradient>

                            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#a855f7"/>
                            <stop offset="100%" stop-color="#6b21a8"/>
                            </linearGradient>

                            <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#fbbf24"/>
                            <stop offset="100%" stop-color="#b45309"/>
                            </linearGradient>

                            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#06b6d4"/>
                            <stop offset="100%" stop-color="#1e3a8a"/>
                            </linearGradient>

                            <linearGradient id="grayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#9ca3af"/>
                            <stop offset="100%" stop-color="#374151"/>
                            </linearGradient>

                        </defs>
                    </svg>
                <!-- NAV -->
                <nav class="flex flex-col gap-2">

                    <!-- Dashboard -->
                    <a href="/filing/dashboard" class="menu-item">
                        <div>
                            <svg width="0" height="0">
                                <defs>
                                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#3b82f6"/>
                                    <stop offset="100%" stop-color="#1e40af"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <HomeIcon class="icon-bevel" style="fill: url(#blueGradient);" />
                        </div>
                        <span v-if="sidebarOpen" class="menu-text">Dashboard</span>
                    </a>


                    <!-- MASTERFILE DROPDOWN -->
                    <div>
                        <button
                            @click="toggleMasterfile"
                            class="menu-item w-full justify-between"
                        >
                            <div class="flex items-center gap-4">
                                <Square3Stack3DIcon class="icon-bevel" style="fill: url(#greenGradient);" />
                                <span v-if="sidebarOpen">Masterfile</span>
                            </div>

                            <ChevronDownIcon
                                v-if="sidebarOpen"
                                class="w-4 h-4 transition-transform duration-300"
                                :class="{ 'rotate-180': masterfileOpen }"
                            />
                        </button>

                        <div
                            class="overflow-hidden transition-all duration-300 ease-in-out "
                            :style="{ height: masterfileHeight + 'px', opacity: masterfileOpen ? 1 : 0 }"
                        >
                            <div ref="masterfileContent" class="ml-9 mt-2 pb-2 flex flex-col gap-1">
                                <a href="/filing/users" class="submenu-item">User</a>
                                <a href="/filing/company" class="submenu-item">Company</a>
                                <a href="/filing/departments" class="submenu-item">Department</a>
                            </div>
                        </div>
                    </div>
                    <!-- Employees -->
                    <a href="/filing/form" class="menu-item">
                        <DocumentPlusIcon class="icon-bevel" style="fill: url(#purpleGradient);" />
                        <span v-if="sidebarOpen" class="menu-text">New Record</span>
                    </a>
                    <a href="/filing/document_list" class="menu-item">
                        <ClipboardDocumentCheckIcon class="icon-bevel" style="fill: url(#amberGradient);" />
                        <span v-if="sidebarOpen" class="menu-text">View Record</span>
                    </a>

                   <!-- REPORTS DROPDOWN -->
                    <div>
                        <button
                            @click="toggleReports"
                            class="menu-item w-full justify-between"
                        >
                            <div class="flex items-center gap-4">
                                <ChartBarIcon class="icon-bevel" style="fill: url(#cyanGradient);" />
                                <span v-if="sidebarOpen">Reports</span>
                            </div>

                            <ChevronDownIcon
                                v-if="sidebarOpen"
                                class="w-4 h-4 transition-transform duration-300"
                                :class="{ 'rotate-180': reportsOpen }"
                            />
                        </button>

                        <div
                            class="overflow-hidden transition-all duration-300 ease-in-out"
                            :style="{ height: reportsHeight + 'px', opacity: reportsOpen ? 1 : 0 }"
                        >
                            <div ref="reportsContent" class="ml-9 mt-2 pb-2 flex flex-col gap-1">
                                <a href="#" class="submenu-item">Monthly</a>
                                <a href="#" class="submenu-item">Annual</a>
                                <a href="#" class="submenu-item">Export</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <!-- SETTINGS -->
            <div>
                <div
                    class="overflow-hidden transition-all duration-300 ease-in-out"
                    :style="{ height: settingsHeight + 'px', opacity: settingsOpen ? 2 : 0 }"
                >
                    <div ref="settingsContent" class="mb-10 flex flex-col gap-1">
                        <a href="#" class="submenu-item">Profile</a>
                        <a href="#" class="submenu-item">Account</a>
                        <a href="#" class="submenu-item">Backup Database</a>
                        <a href="#" class="submenu-item text-red-400 hover:text-red-300">
                            Logout
                        </a>
                    </div>
                </div>
                <button
                    @click="toggleSettings"
                    class="menu-item w-full justify-between"
                >
                    <div class="flex items-center gap-4">
                        <Cog6ToothIcon class="icon-bevel" style="fill: url(#grayGradient);" />
                    <span v-if="sidebarOpen">Settings</span>
                    </div>

                    <ChevronUpIcon
                    v-if="sidebarOpen"
                    class="w-4 h-4 transition-transform duration-300"
                    :class="{ 'rotate-180': settingsOpen }"
                    />
                </button>

                <!-- Smooth Animated Dropup -->
                
            </div>
        </aside>

        <!-- MAIN -->
        <main class="ml-20 pl-6 pr-4 pt-6">
            <slot />
        </main>

    </div>
</template>

<script setup>
    import { ref, nextTick, watch } from 'vue'
    import {
        HomeIcon,
        UsersIcon,
        Cog6ToothIcon,
        ChartBarIcon,
        ChevronDownIcon,
        ChevronUpIcon,
        ArchiveBoxIcon,
        DocumentPlusIcon,
        ClipboardDocumentCheckIcon,
        ChartBarSquareIcon,
        Square3Stack3DIcon
    } from '@heroicons/vue/24/solid'

    const sidebarOpen = ref(false)

    /* MASTERFILE */
    const masterfileOpen = ref(false)
    const masterfileHeight = ref(0)
    const masterfileContent = ref(null)

    /* REPORTS */
    const reportsOpen = ref(false)
    const reportsHeight = ref(0)
    const reportsContent = ref(null)

    /* SETTINGS */
    const settingsOpen = ref(false)
    const settingsHeight = ref(0)
    const settingsContent = ref(null)

    const openSidebar = () => {
        sidebarOpen.value = true
    }

    const closeSidebar = () => {
        sidebarOpen.value = false
        masterfileOpen.value = false
        reportsOpen.value = false
        settingsOpen.value = false
    }

    /* MASTERFILE TOGGLE */
    const toggleMasterfile = async () => {
        if (!sidebarOpen.value) return

        masterfileOpen.value = !masterfileOpen.value
        reportsOpen.value = false

        await nextTick()

        masterfileHeight.value = masterfileOpen.value
            ? masterfileContent.value.scrollHeight
            : 0

        reportsHeight.value = 0
    }

    /* REPORTS TOGGLE */
    const toggleReports = async () => {
        if (!sidebarOpen.value) return

        reportsOpen.value = !reportsOpen.value
        masterfileOpen.value = false

        await nextTick()

        reportsHeight.value = reportsOpen.value
            ? reportsContent.value.scrollHeight
            : 0

        masterfileHeight.value = 0
    }

    /* SETTINGS TOGGLE */
    const toggleSettings = async () => {
        if (!sidebarOpen.value) return

        settingsOpen.value = !settingsOpen.value

        await nextTick()

        settingsHeight.value = settingsOpen.value
            ? settingsContent.value.scrollHeight
            : 0
    }

    watch(sidebarOpen, (val) => {
        if (!val) {
            masterfileOpen.value = false
            reportsOpen.value = false
            settingsOpen.value = false

            masterfileHeight.value = 0
            reportsHeight.value = 0
            settingsHeight.value = 0
        }
    })
</script>