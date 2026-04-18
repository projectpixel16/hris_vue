<template>
    <div class="space-y-4">
        <div 
            v-for="(job, i) in employee.jobHistory" 
            :key="i"
            class="bg-white border rounded-2xl p-5"
        >

            <!-- HEADER -->
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h3 class="font-semibold text-gray-800 text-lg">
                        {{ job.position }}
                    </h3>
                    <p class="text-sm text-gray-500">
                        {{ job.department }} • {{ job.businessUnit }}
                    </p>
                </div>

                <!-- BUTTON -->
                <button
                    v-if="job.status !== 'Regular'"
                    class="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                >
                    Amend
                </button>
            </div>

            <!-- DETAILS GRID -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

                <div>
                    <p class="text-gray-500 text-xs">Effective Date</p>
                    <p class="font-medium">{{ job.effectiveDate }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-xs">End Date</p>
                    <p class="font-medium">{{ job.endDate || '-' }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-xs">Status</p>
                    <p class="font-medium">{{ job.status }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-xs">Location</p>
                    <p class="font-medium">{{ job.location }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-xs">Salary</p>
                    <p class="font-medium">₱ {{ job.salary }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-xs">Per Day</p>
                    <p class="font-medium">₱ {{ job.perDay }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-xs">Supervisor</p>
                    <p class="font-medium">{{ job.supervisor }}</p>
                </div>

            </div>

        </div>
        <div v-if="!employee.jobHistory?.length" class="text-gray-400 text-sm">
            No job history records
        </div>
    </div>
</template>
<script setup>
    defineProps({
        employee: Object
    })
</script>