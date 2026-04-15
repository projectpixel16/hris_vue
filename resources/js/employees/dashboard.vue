<template>
    <navigation>

        <!-- PAGE -->
        <div class="space-y-6">

            <!-- HEADER -->
            <div>
                <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p class="text-sm text-gray-500">Welcome back, Employee 👋</p>
            </div>

            <!-- STATS -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div class="card">
                    <p class="text-sm text-gray-500">Present Days</p>
                    <h2 class="text-2xl font-bold text-green-700">22</h2>
                </div>

                <div class="card">
                    <p class="text-sm text-gray-500">Leaves Taken</p>
                    <h2 class="text-2xl font-bold text-yellow-600">3</h2>
                </div>

                <div class="card">
                    <p class="text-sm text-gray-500">Pending Requests</p>
                    <h2 class="text-2xl font-bold text-red-500">2</h2>
                </div>

            </div>

            <!-- MAIN GRID -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- ANNOUNCEMENTS -->
                <div class="lg:col-span-2 card">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="font-semibold text-gray-700">📢 Announcements</h2>
                        <a href="/employee/announcements" class="text-sm text-green-600 hover:underline">
                            View All
                        </a>
                    </div>

                    <div class="space-y-3">
                        <div class="announcement">
                            <p class="font-medium">Holiday Notice</p>
                            <p class="text-sm text-gray-500">Office will be closed on Friday.</p>
                        </div>

                        <div class="announcement">
                            <p class="font-medium">New Policy Update</p>
                            <p class="text-sm text-gray-500">Updated leave policy is now available.</p>
                        </div>

                        <div class="announcement">
                            <p class="font-medium">Team Meeting</p>
                            <p class="text-sm text-gray-500">Meeting scheduled tomorrow at 10 AM.</p>
                        </div>
                    </div>
                </div>

                <!-- PROFILE / QUICK INFO -->
                <div class="card">
                    <h2 class="font-semibold text-gray-700 mb-4">My Info</h2>

                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div>
                            <p class="font-medium">Employee</p>
                            <p class="text-sm text-gray-500">Frontend Dev</p>
                        </div>
                    </div>

                    <div class="text-sm text-gray-600 space-y-2">
                        <p><strong>Email:</strong> employee@email.com</p>
                        <p><strong>Status:</strong> Active</p>
                        <p><strong>Department:</strong> IT</p>
                    </div>
                </div>

            </div>

        </div>

    </navigation>
</template>

<script setup>
import navigation from "../components/layouts/navigation_employee.vue";
</script>

<style scoped>
.card {
  @apply bg-white p-5 rounded-xl shadow-sm;
}

.announcement {
  @apply p-3 rounded-lg border hover:bg-gray-50 transition cursor-pointer;
}
</style>