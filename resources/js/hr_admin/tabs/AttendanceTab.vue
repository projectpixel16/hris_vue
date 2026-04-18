<template>
    <div class="space-y-4">
        <!-- HEADER -->
        <div class="bg-white border rounded-2xl p-4 flex justify-between items-center">
            <div>
                <h3 class="text-base font-semibold text-gray-800">
                    {{ new Date(filters.year, filters.month - 1).toLocaleString('en-US', { month: 'long', year: 'numeric' }) }}
                </h3>
                <p class="text-xs text-gray-500">
                    Days Present: 
                    <span class="font-medium text-gray-700">
                        {{ daysPresent }}
                    </span>
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

        <!-- TABLE -->
        <div class="bg-white border rounded-2xl overflow-x-auto">
            <table class="w-full text-sm">
                <thead class="bg-gray-100 text-gray-600">
                    <tr>
                        <th class="p-3 text-left">Date</th>
                        <th class="p-3 text-left">Schedule</th>
                        <th class="p-3 text-left">Type</th>
                        <th class="p-3 text-left">Logs</th>
                        <th class="p-3 text-left">Status</th>
                        <th class="p-3 text-left">Hours</th>
                        <th class="p-3 text-left">Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(day, i) in filteredAttendance" :key="i" class="border-t">

                        <!-- DATE -->
                        <td class="p-3 font-medium">{{ day.date }}</td>

                        <!-- SCHEDULE -->
                        <td class="p-3 text-gray-500">
                            {{ day.schedule || 'Flexible' }}
                        </td>

                        <!-- Type -->
                        <td class="p-3">
                            <span
                                class="text-xs px-2 py-1 rounded-full"
                                :class="{
                                    'bg-blue-100 text-blue-700': day.type === 'Regular',
                                    'bg-purple-100 text-purple-700': day.type === 'Supervisor',
                                    'bg-orange-100 text-orange-700': day.type === 'Trader'
                                }"
                            >
                                {{ day.type }}
                            </span>
                        </td>

                        <!-- LOGS -->
                        <td class="p-3">
                            <div v-if="day.logs.length">
                                <div v-for="(log, j) in day.logs" :key="j">
                                    {{ log.in || '---' }} - {{ log.out || '---' }}
                                </div>
                            </div>
                            <div v-else class="text-gray-400">No logs</div>
                        </td>

                        <!-- STATUS -->
                        <td class="p-3">
                            <span
                                :class="{
                                    'text-green-600': getStatus(day) === 'Present',
                                    'text-red-600': getStatus(day) === 'Absent',
                                    'text-yellow-600': getStatus(day) === 'Incomplete',
                                    'text-gray-400': getStatus(day) === 'No Schedule'
                                }"
                            >
                                {{ getStatus(day) }}
                            </span>
                        </td>

                        <!-- HOURS -->
                        <td class="p-3 font-medium">
                            {{ calculateHours(day.logs) || '-' }}
                        </td>

                        <!-- ACTION -->
                        <td class="p-3">
                            <button
                                v-if="getStatus(day) === 'Incomplete'"
                                @click="sendReminder(day)"
                                class="text-xs bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                            >
                                Email
                            </button>
                        </td>

                    </tr>

                    <tr v-if="!filteredAttendance.length">
                        <td colspan="6" class="text-center p-4 text-gray-400">
                            No records
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed, onMounted, onBeforeUnmount   } from "vue";
     /* =========================
    FILTER (DEFAULT CURRENT MONTH)
    ========================= */
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

    /* =========================
    ATTENDANCE DATA
    ========================= */
    const attendance = ref([

        /* =========================
        REGULAR EMPLOYEE (STRICT)
        ========================= */
        {
            date: "2026-04-20",
            type: "Regular",
            schedule: "8:00 - 17:00",
            required: true,
            logs: [
                { in: "08:00", out: "10:00" },
                { in: "10:15", out: "12:00" },
                { in: "13:00", out: "15:00" },
                { in: "15:15", out: "17:00" }
            ] // ✅ even → OK
        },
        {
            date: "2026-04-21",
            type: "Regular",
            schedule: "7:30 - 16:30",
            required: true,
            logs: [
                { in: "07:30", out: "11:00" },
                { in: "11:15", out: "13:00" },
                { in: "14:00", out: null }
            ] // ❌ odd → incomplete
        },
        {
            date: "2026-04-22",
            type: "Regular",
            schedule: "8:30 - 17:30",
            required: true,
            logs: [
                { in: "08:30", out: "12:00" }
            ] // ❌ only 1 pair → incomplete
        },

        /* =========================
        SUPERVISOR (FLEXIBLE)
        ========================= */
        {
            date: "2026-04-23",
            type: "Supervisor",
            schedule: "Flexible",
            required: false,
            logs: [
                { in: "09:00", out: "11:00" },
                { in: "12:00", out: "15:00" },
                { in: "16:00", out: "18:00" }
            ] // ✅ many sessions
        },
        {
            date: "2026-04-24",
            type: "Supervisor",
            schedule: "Flexible",
            required: false,
            logs: [
                { in: "10:00", out: "12:00" },
                { in: "13:00", out: "16:00" },
                { in: "17:00", out: null }
            ] // ❌ incomplete
        },

        /* =========================
        TRADER (NO STRICT PAIRING)
        ========================= */
        {
            date: "2026-04-25",
            type: "Trader",
            schedule: "14:00 - 22:00",
            required: true,
            logs: [
                { in: "14:00", out: "15:30" },
                { in: "15:45", out: "17:00" },
                { in: "17:30", out: "18:15" },
                { in: "19:00", out: "20:30" },
                { in: "21:00", out: "22:00" }
            ] // ✅ allowed many logs
        },
        {
            date: "2026-04-26",
            type: "Trader",
            schedule: "22:00 - 06:00",
            required: true,
            logs: [
                { in: "22:00", out: "23:30" },
                { in: "00:00", out: "02:00" },
                { in: "02:30", out: "04:00" },
                { in: "04:30", out: "06:00" }
            ] // overnight handled
        },
        {
            date: "2026-04-27",
            type: "Trader",
            schedule: "06:00 - 14:00",
            required: true,
            logs: [
                { in: "06:00", out: "08:00" },
                { in: "08:30", out: "10:30" },
                { in: "11:00", out: "13:30" }
            ] // uneven but still OK
        },

        /* =========================
        ABSENT CASE
        ========================= */
        {
            date: "2026-04-28",
            type: "Regular",
            schedule: "8:00 - 17:00",
            required: true,
            logs: []
        }
    ]);

    /* =========================
    FILTERED DATA
    ========================= */
    const filteredAttendance = computed(() => {
        return attendance.value.filter((d) => {
            const date = new Date(d.date);

            return (
                date.getFullYear() == filters.value.year &&
                date.getMonth() + 1 == filters.value.month
            );
        });
    });

    /* =========================
    STATUS LOGIC
    ========================= */
    const getStatus = (day) => {
        const logs = day.logs || [];

        // No logs
        if (!logs.length) {
            return day.required ? "Absent" : "No Schedule";
        }

        // ❗ Traders are exempted from strict pairing
        if (day.type === "Trader") {
            return "Present";
        }

        // ❗ Count total timestamps (IN + OUT)
        let total = 0;

        logs.forEach(l => {
            if (l.in) total++;
            if (l.out) total++;
        });

        // ❌ If odd → incomplete
        if (total % 2 !== 0) {
            return "Incomplete";
        }

        // ❌ If any missing pair
        for (let log of logs) {
            if (!log.in || !log.out) {
                return "Incomplete";
            }
        }

        return "Present";
    };

    /* =========================
    COUNT DAYS PRESENT
    ========================= */
    const daysPresent = computed(() => {
        return filteredAttendance.value.filter(
            (d) => getStatus(d) === "Present"
        ).length;
    });

    /* =========================
    CALCULATE HOURS
    ========================= */
    const calculateHours = (logs) => {
        let total = 0;

        for (let log of logs) {
            if (!log.in || !log.out) return null;

            let inTime = new Date(`1970-01-01T${log.in}:00`);
            let outTime = new Date(`1970-01-01T${log.out}:00`);

            if (outTime < inTime) {
                outTime.setDate(outTime.getDate() + 1);
            }

            total += (outTime - inTime) / (1000 * 60 * 60);
        }

        return total ? total.toFixed(2) + " hrs" : null;
    };

    /* =========================
    EMAIL ACTION (MOCK)
    ========================= */
    const sendReminder = (day) => {
        alert(`Reminder email sent for ${day.date}`);
    };
</script>