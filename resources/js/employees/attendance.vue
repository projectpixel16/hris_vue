<template>
<navigation>
<div class="space-y-6 ">

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
            <h1 class="text-2xl font-semibold text-gray-800">
                {{ currentMonth }}
            </h1>
            <p class="text-sm text-gray-500">
                Schedule: {{ selectedSchedule }}
            </p>
        </div>

        <div class="flex gap-2">
            <select class="px-3 py-1.5 rounded-lg bg-gray-100 text-sm" name="" id="">
                <option value="">March</option>
            </select>
            <select class="px-3 py-1.5 rounded-lg bg-gray-100 text-sm" name="" id="">
                <option value="">2026</option>
            </select>
        </div>

    </div>

    <!-- SUMMARY -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">

        <div class="bg-white p-4 rounded-xl shadow-sm">
            <p class="text-xs text-gray-500">Total Leaves Taken</p>
            <p class="text-sm font-semibold text-gray-800 mt-1">
                SL: {{ summary.sick }} • VL: {{ summary.vacation }}
            </p>
            view forms - into modal
        </div>
        <div class="bg-white p-4 rounded-xl shadow-sm">
            <p class="text-xs text-gray-500">Remaining Leave</p>
            <p class="text-sm font-semibold text-gray-800 mt-1">
                SL: {{ summary.sick }} • VL: {{ summary.vacation }}
            </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="bg-white p-4 rounded-xl shadow-sm">
                <p class="text-xs text-gray-500">Lates</p>
                <p class="text-lg font-semibold text-yellow-600 mt-1">
                    {{ summary.lates }}
                </p>
            </div>

            <div class="bg-white p-4 rounded-xl shadow-sm">
                <p class="text-xs text-gray-500">Undertime</p>
                <p class="text-lg font-semibold text-orange-600 mt-1">
                    {{ summary.undertime }}
                </p>
            </div>

            <div class="bg-white p-4 rounded-xl shadow-sm">
                <p class="text-xs text-gray-500">Absents</p>
                <p class="text-lg font-semibold text-red-500 mt-1">
                    {{ summary.absent }}
                </p>
            </div>
        </div>
    </div>

    <!-- TABLE CARD -->
    <div class="bg-white rounded-2xl shadow-sm">

        <!-- TABLE HEADER -->
        <div class="px-6 py-4 border-b flex justify-between items-center">
            <h3 class="text-sm font-semibold text-gray-700">
                Attendance Logs
            </h3>

            <button class="text-xs px-3 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800">
                File Incomplete Logs
            </button>
        </div>

        <!-- TABLE -->
        <div class="overflow-x-auto">
            <table class="w-full text-sm">

                <thead>
                    <tr class="text-gray-400 text-xs uppercase">
                        <th class="px-6 py-3 text-left">Date</th>
                        <th class="px-6 py-3 text-left">Logs</th>
                        <th class="px-6 py-3 text-left">Status</th>
                        <th class="px-6 py-3 text-left">Hours</th>
                        <th class="px-6 py-3 text-left"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(day, i) in attendanceLogs"
                        :key="i"
                        class="border-t hover:bg-gray-50 transition"
                    >

                        <!-- DATE -->
                        <td class="px-6 py-4 font-medium text-gray-700">
                            {{ day.date }}
                        </td>

                        <!-- LOGS -->
                        <td class="px-6 py-4">
                            <div v-if="day.logs?.length" class="flex flex-wrap gap-1">
                                <span class="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                                    8:00 
                                </span>
                                <span class="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                                    9:15 
                                </span>
                                <span class="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                                    10:40 
                                </span>
                                <span class="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                                    10:40 
                                </span>
                            </div>
                            <!-- <span class="text-xs text-gray-300">
                                —
                            </span> -->
                        </td>

                        <!-- STATUS -->
                        <td class="px-6 py-4">
                            <span :class="badgeColor(day.status)" class="px-2.5 py-1 rounded-full text-xs font-medium">
                                {{ day.status }}
                            </span>
                        </td>

                        <!-- HOURS -->
                        <td class="px-6 py-4 text-gray-700">
                            {{ computeHours(day.logs) }}h
                        </td>

                        <!-- ACTION -->
                        <td class="px-6 py-4">

                            <span v-if="day.status === 'Present'" class="text-gray-300 text-xs">
                                —
                            </span>

                            <button
                                v-else-if="day.status === 'Incomplete'"
                                class="text-xs text-yellow-700 hover:underline"
                            >
                                File
                            </button>

                            <span
                                v-else-if="day.status === 'Filed'"
                                class="text-xs text-blue-600"
                            >
                                Filed
                            </span>

                            <span
                                v-else-if="day.status === 'Processing'"
                                class="text-xs text-purple-600"
                            >
                                Processing
                            </span>

                            <button
                                v-else-if="day.status === 'Absent'"
                                class="text-xs text-red-600 hover:underline"
                            >
                                View
                            </button>

                        </td>

                    </tr>
                </tbody>

            </table>
        </div>

    </div>

</div>
</navigation>
</template>

<script setup>
import { ref, computed } from "vue";
import navigation from "../components/layouts/navigation_employee.vue";

/* MONTH */
const current = ref(new Date());

const currentMonth = computed(() => {
    return current.value.toLocaleString("default", {
        month: "long",
        year: "numeric"
    });
});

const prevMonth = () => {
    current.value = new Date(current.value.setMonth(current.value.getMonth() - 1));
};

const nextMonth = () => {
    current.value = new Date(current.value.setMonth(current.value.getMonth() + 1));
};

/* SCHEDULE */
const selectedSchedule = "8:00 - 17:00";

/* MOCK MULTI-LOG DATA */
const attendanceLogs = ref([
    {
        date: "Mar 1",
        logs: [
            { in: "08:00", out: "12:00" },
            { in: "13:00", out: "17:00" }
        ],
        status: "Present"
    },
    {
        date: "Mar 2",
        logs: [
            { in: "08:30", out: null }
        ],
        status: "Incomplete"
    },
    {
        date: "Mar 3",
        logs: [],
        status: "Absent"
    },
    {
        date: "Mar 4",
        logs: [
            { in: "08:00", out: null }
        ],
        status: "Processing"
    },
    {
        date: "Mar 5",
        logs: [
            { in: "08:00", out: "12:00" }
        ],
        status: "Filed"
    }
]);

/* HOURS CALC */
const computeHours = (logs) => {
    if (!logs?.length) return 0;

    let total = 0;

    logs.forEach(log => {
        if (log.in && log.out) {
            const [h1, m1] = log.in.split(":").map(Number);
            const [h2, m2] = log.out.split(":").map(Number);

            const start = h1 * 60 + m1;
            const end = h2 * 60 + m2;

            total += (end - start) / 60;
        }
    });

    return total.toFixed(1);
};

/* SUMMARY */
const summary = computed(() => {
    return {
        sick: 1,
        vacation: 2,
        lates: 3,
        undertime: 1,
        absent: attendanceLogs.value.filter(d => d.status === "Absent").length
    };
});

/* COLORS */
const badgeColor = (status) => {
    return {
        "Present": "bg-green-100 text-green-700",
        "Incomplete": "bg-yellow-100 text-yellow-700",
        "Absent": "bg-red-100 text-red-700",
        "Filed": "bg-blue-100 text-blue-700",
        "Processing": "bg-purple-100 text-purple-700",
    }[status] || "bg-gray-100";
};
</script>
<style>
    
</style>