<template>
    <div class="min-h-screen flex bg-gray-50">

        <!-- MOBILE OVERLAY -->
        <div v-if="sidebarOpen" class="fixed inset-0 bg-black/40 z-40 md:hidden" @click="sidebarOpen = false"></div>

        <!-- SIDEBAR -->
        <aside
        :class="[
            'fixed md:sticky top-0 left-0 h-screen w-72 bg-white border-r shadow-sm flex flex-col transition-transform duration-300 z-50',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]"
        >

        <!-- LOGO -->
        <div class="h-16 px-6 py-5 border-b">
            <h1 class="text-xl font-bold text-green-800">HRIS</h1>
        </div>

        <!-- PROFILE -->
        <a href="/employee/profile" class="px-6 py-4 border-b flex items-center gap-3">
            <div class="w-11 h-11 rounded-full bg-gray-300"></div>
            <div>
                <p class="text-sm font-semibold">Employee</p>
                <p class="text-xs text-gray-500">Frontend Dev</p>
            </div>
        </a>

        <!-- MENU -->
        <nav class="flex-1 px-4 py-4 space-y-1 text-sm overflow-y-auto">

            <!-- SECTION -->
            <p class="text-xs text-gray-400 px-3 mb-2">MAIN MENU</p>

            <a href="/employee/dashboard" class="sidebar-link active">
            <HomeIcon class="w-5 h-5" />
            Dashboard
            </a>

            <a href="/employee/attendance" class="sidebar-link">
            <CalendarIcon class="w-5 h-5" />
            Attendance
            </a>

            <a href="/employee/leaves" class="sidebar-link">
            <DocumentTextIcon class="w-5 h-5" />
            Leaves
            </a>

            <!-- DROPDOWN -->
            <div>
            <button
                @click="toggleDropdown('forms')"
                class="sidebar-link w-full justify-between"
            >
                <span class="flex items-center gap-2">
                <ClipboardDocumentListIcon class="w-5 h-5" />
                Forms
                </span>

                <ChevronDownIcon
                class="w-4 h-4 transition-transform"
                :class="dropdowns.forms ? 'rotate-180' : ''"
                />
            </button>

            <div
                v-show="dropdowns.forms"
                class="mt-1 ml-9 space-y-1"
            >
                <a href="/employee/requests" class="dropdown-link">
                Requests
                </a>
                <a href="/employee/payslips" class="dropdown-link">
                Payslips
                </a>
            </div>
            </div>

            <a href="/employee/announcements" class="sidebar-link">
            <BellIcon class="w-5 h-5" />
            Announcements
            </a>

            <!-- OTHER -->
            <p class="text-xs text-gray-400 px-3 mt-6 mb-2">OTHER</p>

            <a href="/employee/settings" class="sidebar-link">
            Settings
            </a>

        </nav>

        <!-- FOOTER -->
        <div class="px-4 py-4 border-t">
            <a href="/logout" class="sidebar-link text-red-500">
            Logout
            </a>
        </div>

        </aside>

        <!-- MAIN CONTENT -->
        <div class="flex-1 flex flex-col">

            <!-- TOPBAR -->
            <header class="flex items-center justify-between px-6 h-16 bg-white border-b">

                <!-- MOBILE MENU BUTTON -->
                <button class="md:hidden" @click="sidebarOpen = true">
                    <Bars3Icon class="w-6 h-6"/>
                </button>

                <h2 class="font-semibold">Dashboard</h2>

                <!-- RIGHT -->
                <div class="flex items-center gap-4">

                    <!-- NOTIFICATIONS -->
                    <div class="relative" ref="notificationRef">
                        <button @click="toggleNotifications">
                            <BellIcon class="w-6 h-6 text-gray-600"/>
                        </button>

                        <div v-if="notificationsOpen"
                            class="absolute right-0 mt-3 w-72 bg-white border rounded-xl shadow-lg z-50">

                            <div class="p-3 font-semibold border-b">Notifications</div>

                            <div v-for="n in notifications" :key="n.id"
                                class="p-3 text-sm hover:bg-gray-50">
                                {{ n.text }}
                            </div>
                        </div>
                    </div>

                    <!-- PROFILE -->
                    <div class="relative" ref="profileRef">
                        <button @click="toggleProfile" class="flex items-center gap-2">
                            <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
                        </button>

                        <div v-if="profileOpen"
                            class="absolute right-0 mt-3 w-40 bg-white border rounded-xl shadow-lg">
                            <a href="/employee/profile" class="dropdown-link">Profile</a>
                            <a href="/logout" class="dropdown-link text-red-500">Logout</a>
                        </div>
                    </div>

                </div>
            </header>

            <!-- PAGE -->
            <main class="p-6">
                <slot />
            </main>

        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from "vue";
    import {
        HomeIcon,
        CalendarIcon,
        DocumentTextIcon,
        ClipboardDocumentListIcon,
        BellIcon,
        Bars3Icon,
        ChevronDownIcon
    } from "@heroicons/vue/24/outline";

    // Sidebar
    const sidebarOpen = ref(false);

    // Dropdowns
    const dropdowns = ref({
        forms: false
    });

    const toggleDropdown = (menu) => {
        dropdowns.value[menu] = !dropdowns.value[menu];
    };

    // Notifications
    const notificationsOpen = ref(false);
    const notificationRef = ref(null);

    const notifications = ref([
        { id: 1, text: "Leave approved" },
        { id: 2, text: "New announcement" }
    ]);

    const toggleNotifications = () => {
        notificationsOpen.value = !notificationsOpen.value;
    };

    // Profile
    const profileOpen = ref(false);
    const profileRef = ref(null);

    const toggleProfile = () => {
        profileOpen.value = !profileOpen.value;
    };

    // Click outside
    const handleClickOutside = (e) => {
        if (notificationRef.value && !notificationRef.value.contains(e.target)) {
            notificationsOpen.value = false;
        }
        if (profileRef.value && !profileRef.value.contains(e.target)) {
            profileOpen.value = false;
        }
    };

    onMounted(() => {
        document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
        document.removeEventListener("click", handleClickOutside);
    });
</script>
<style scoped>
    .sidebar-link {
    @apply flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition;
    }

    .sidebar-link.active {
    @apply bg-green-100 text-green-800 font-semibold;
    }

    .dropdown-link {
    @apply block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition;
    }
</style>