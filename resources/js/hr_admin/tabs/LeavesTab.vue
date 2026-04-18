<template>
    <div class="space-y-4">
        <!-- HEADER -->
        <div class="bg-white border rounded-2xl p-4 flex justify-between items-center">
            <div>
                <h3 class="text-base font-semibold text-gray-800">
                    {{ new Date(filters.year, filters.month - 1).toLocaleString('en-US', { month: 'long', year: 'numeric' }) }}
                </h3>
                <p class="text-xs text-gray-500">
                    Leave Summary Overview
                </p>
            </div>

            <!-- FILTER -->
            <div class="flex gap-2">
                <select v-model="filters.year" class="border rounded-lg px-3 py-1">
                    <option :value="2025">2025</option>
                    <option :value="2026">2026</option>
                </select>

                <select v-model="filters.month" class="border rounded-lg px-3 py-1">
                    <option v-for="m in 12" :key="m" :value="m">
                        {{ new Date(0, m - 1).toLocaleString('en-US', { month: 'long' }) }}
                    </option>
                </select>
            </div>
        </div>

        <!-- LEAVE CARDS -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <!-- SICK LEAVE -->
            <div class="bg-white border rounded-2xl p-4">
                <h4 class="text-xs text-gray-500">Sick Leave</h4>

                <p class="text-2xl font-bold text-red-500">
                    {{ leaveSummary.sick.used }} / {{ leaveSummary.sick.allocated }}
                </p>

                <div class="text-xs text-gray-400 mt-1">
                    <span>Used</span> • 
                    <span class="font-medium text-gray-600">
                        {{ leaveSummary.sick.remaining }} Remaining
                    </span>
                </div>
            </div>

            <!-- VACATION LEAVE -->
            <div class="bg-white border rounded-2xl p-4">
                <h4 class="text-xs text-gray-500">Vacation Leave</h4>

                <p class="text-2xl font-bold text-blue-500">
                    {{ leaveSummary.vacation.used }} / {{ leaveSummary.vacation.allocated }}
                </p>

                <div class="text-xs text-gray-400 mt-1">
                    <span>Used</span> • 
                    <span class="font-medium text-gray-600">
                        {{ leaveSummary.vacation.remaining }} Remaining
                    </span>
                </div>
            </div>

            <!-- EMERGENCY LEAVE -->
            <div class="bg-white border rounded-2xl p-4">
                <h4 class="text-xs text-gray-500">Emergency Leave</h4>

                <p class="text-2xl font-bold text-orange-500">
                    {{ leaveSummary.emergency.used }} / {{ leaveSummary.emergency.allocated }}
                </p>

                <div class="text-xs text-gray-400 mt-1">
                    <span>Used</span> • 
                    <span class="font-medium text-gray-600">
                        {{ leaveSummary.emergency.remaining }} Remaining
                    </span>
                </div>
            </div>
        </div>

        <!-- LEAVE TABLE -->
        <div class="bg-white border rounded-2xl overflow-x-auto">
            <table class="w-full text-sm">
                <thead class="bg-gray-100 text-gray-600">
                    <tr>
                        <th class="p-3 text-left">Date</th>
                        <th class="p-3 text-left">Leave Type</th>
                        <th class="p-3 text-left">Reason</th>
                        <th class="p-3 text-left">Status</th>
                        <th class="p-3 text-left">Days</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(leave, i) in filteredLeaves" :key="i" class="border-t">

                        <!-- DATE -->
                        <td class="p-3 font-medium">
                            {{ leave.date }}
                        </td>

                        <!-- TYPE -->
                        <td class="p-3">
                            <span
                                class="text-xs px-2 py-1 rounded-full"
                                :class="{
                                    'bg-red-100 text-red-700': leave.type === 'Sick',
                                    'bg-blue-100 text-blue-700': leave.type === 'Vacation',
                                    'bg-orange-100 text-orange-700': leave.type === 'Emergency'
                                }"
                            >
                                {{ leave.type }}
                            </span>
                        </td>

                        <!-- REASON -->
                        <td class="p-3 text-gray-500">
                            {{ leave.reason || '—' }}
                        </td>

                        <!-- STATUS -->
                        <td class="p-3">
                            <span
                                :class="{
                                    'text-green-600': leave.status === 'Approved',
                                    'text-yellow-600': leave.status === 'Pending',
                                    'text-red-600': leave.status === 'Rejected'
                                }"
                            >
                                {{ leave.status }}
                            </span>
                        </td>

                        <!-- DAYS -->
                        <td class="p-3 font-medium">
                            {{ leave.days }}
                        </td>

                    </tr>

                    <tr v-if="!filteredLeaves.length">
                        <td colspan="5" class="text-center p-4 text-gray-400">
                            No leave records
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed, onMounted, onBeforeUnmount   } from "vue";  
    const today = new Date();

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const filters = ref({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        week: ""
    });
    const leaveSummary = {
        sick: {
            allocated: 10,
            used: 2,
            remaining: 8
        },
        vacation: {
            allocated: 15,
            used: 5,
            remaining: 10
        },
        emergency: {
            allocated: 5,
            used: 1,
            remaining: 4
        }
    }
    const filteredLeaves = [
        {
            date: 'Apr 02, 2026',
            type: 'Sick',
            reason: 'Flu',
            status: 'Approved',
            days: 1
        },
        {
            date: 'Apr 10, 2026',
            type: 'Vacation',
            reason: 'Family trip',
            status: 'Pending',
            days: 3
        }
    ]
</script>