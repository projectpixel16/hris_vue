<template>
    <!-- PERSONAL INFO -->
    <div class="space-y-4">
        <div class="bg-white rounded-2xl shadow-sm border p-6">
            <h3 class="text-gray-800 font-semibold text-lg mb-4">
                Personal Information
            </h3>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">

                <div>
                    <p class="text-gray-500 text-xs">Birthdate</p>
                    <p class="font-medium text-gray-800">{{ employee.dateOfBirth }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-xs">Place of Birth</p>
                    <p class="font-medium text-gray-800">{{ employee.placeOfBirth }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-xs">Sex</p>
                    <p class="font-medium text-gray-800">{{ employee.sex }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-xs">Civil Status</p>
                    <p class="font-medium text-gray-800">{{ employee.civilStatus }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-xs">Nationality</p>
                    <p class="font-medium text-gray-800">{{ employee.nationality }}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-xs">Religion</p>
                    <p class="font-medium text-gray-800">{{ employee.religion }}</p>
                </div>

                <div class="col-span-3">
                    <p class="text-gray-500 text-xs">Present Address</p>
                    <p class="font-medium text-gray-800">{{ employee.presentAddress }}</p>
                </div>

                <div class="col-span-3">
                    <p class="text-gray-500 text-xs">Permanent Address</p>
                    <p class="font-medium text-gray-800">{{ employee.permanentAddress }}</p>
                </div>

            </div>
        </div>

        <!-- GRID -->
        <div class="grid md:grid-cols-2 gap-6">

            <!-- FAMILY -->
            <div class="bg-white rounded-2xl shadow-sm border">
                <div class="p-5 border-b font-semibold text-gray-700">Family</div>

                <div class="divide-y max-h-72 overflow-y-auto">
                    <div v-for="(fam, i) in employee.family" :key="i" class="p-4">
                        <div class="font-medium text-gray-800">{{ fam.name }}</div>
                        <div class="text-xs text-gray-500">
                            {{ fam.relationship }} • {{ fam.age }} yrs
                        </div>
                        <div class="text-xs text-gray-400">{{ fam.occupation }}</div>
                    </div>

                    <div v-if="!employee.family?.length" class="p-4 text-gray-400 text-sm">
                        No records
                    </div>
                </div>
            </div>

            <!-- EDUCATION -->
            <div class="bg-white rounded-2xl shadow-sm border">
                <div class="p-5 border-b font-semibold text-gray-700">Education</div>

                <div class="divide-y max-h-72 overflow-y-auto">
                    <div v-for="(edu, i) in employee.education" :key="i" class="p-4">
                        <div class="font-medium text-gray-800">{{ edu.school }}</div>
                        <div class="text-xs text-gray-500">{{ edu.course }}</div>
                        <div class="text-xs text-gray-400">{{ edu.year }}</div>
                    </div>

                    <div v-if="!employee.education?.length" class="p-4 text-gray-400 text-sm">
                        No records
                    </div>
                </div>
            </div>

            <!-- EMPLOYMENT -->
            <div class="bg-white rounded-2xl shadow-sm border">
                <div class="p-5 border-b font-semibold text-gray-700">Employment</div>

                <div class="divide-y max-h-72 overflow-y-auto">
                    <div v-for="(job, i) in employee.employmentHistory" :key="i" class="p-4">
                        <div class="font-medium text-gray-800">{{ job.employer }}</div>
                        <div class="text-xs text-gray-500">{{ job.position }}</div>
                        <div class="text-xs text-gray-400">{{ job.from }} - {{ job.to }}</div>
                    </div>

                    <div v-if="!employee.employmentHistory?.length" class="p-4 text-gray-400 text-sm">
                        No records
                    </div>
                </div>
            </div>

            <!-- TRAININGS -->
            <div class="bg-white rounded-2xl shadow-sm border">
                <div class="p-5 border-b font-semibold text-gray-700">Trainings</div>

                <div class="divide-y max-h-72 overflow-y-auto">
                    <div v-for="(train, i) in employee.trainings" :key="i" class="p-4">
                        <div class="font-medium text-gray-800">{{ train.title }}</div>
                        <div class="text-xs text-gray-500">{{ train.organizer }}</div>
                        <div class="text-xs text-gray-400">{{ train.date }}</div>
                    </div>

                    <div v-if="!employee.trainings?.length" class="p-4 text-gray-400 text-sm">
                        No records
                    </div>
                </div>
            </div>

        </div>

        <!-- BOTTOM -->
        <div class="grid md:grid-cols-2 gap-6">

            <!-- ADDITIONAL -->
            <div class="bg-white rounded-2xl shadow-sm border p-5">
                <h3 class="font-semibold text-gray-700 mb-3">Additional</h3>

                <div class="space-y-2">
                    <p><span class="text-gray-500">Skills:</span> {{ employee.skills }}</p>
                    <p><span class="text-gray-500">Hobbies:</span> {{ employee.hobbies }}</p>
                    <p><span class="text-gray-500">Notes:</span> {{ employee.notes }}</p>
                </div>
            </div>

            <!-- CHARACTER REF -->
            <div class="bg-white rounded-2xl shadow-sm border">
                <div class="p-5 border-b font-semibold text-gray-700">Character Reference</div>

                <div class="divide-y max-h-72 overflow-y-auto">
                    <div v-for="(ref, i) in employee.characterRefs" :key="i" class="p-4">
                        <div class="font-medium text-gray-800">{{ ref.name }}</div>
                        <div class="text-xs text-gray-500">{{ ref.company }}</div>
                        <div class="text-xs text-gray-400">{{ ref.contact }}</div>
                    </div>

                    <div v-if="!employee.characterRefs?.length" class="p-4 text-gray-400 text-sm">
                        No records
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
    defineProps({
        employee: Object
    })
</script>