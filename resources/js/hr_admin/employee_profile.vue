<template>
<navigation>
    <div class="space-y-6">

        <!-- PROFILE HEADER -->
        <div class="shadow p-6 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            <!-- LEFT -->
            <div class="flex items-center gap-5">
                <!-- PROFILE PIC -->
                <div class="w-28 h-28 rounded-full bg-gray-200 overflow-hidden">
                    <img 
                        v-if="employee.photo"
                        :src="employee.photo" 
                        class="w-full h-full object-cover"
                    />
                </div>

                <!-- INFO -->
                <div>
                    <h1 class="text-2xl font-semibold text-gray-800">
                        {{ employee.fullName }}
                    </h1>

                    <div class="flex gap-2 mt-2">
                        <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                            {{ employee.status }}
                        </span>
                        <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                            {{ employee.employmentType }}
                        </span>
                    </div>

                    <div class="text-sm text-gray-500 mt-2 space-y-1">
                        <div>📞 {{ employee.contactNumber }}</div>
                        <div>📧 {{ employee.email }}</div>
                    </div>
                </div>
            </div>

            <!-- RIGHT -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <div class="text-gray-500">Employee No.</div>
                    <div class="font-medium">{{ employee.employeeNo }}</div>
                </div>

                <div>
                    <div class="text-gray-500">Date Hired</div>
                    <div class="font-medium">{{ employee.dateHired }}</div>
                </div>
            </div>
        </div>

        <!-- TABS -->
        <div class="shadow rounded-xl">
            
            <!-- TAB HEADERS -->
            <div class="flex overflow-x-auto border-b">
                <button
                    v-for="tab in tabs"
                    :key="tab"
                    @click="activeTab = tab"
                    class="px-5 py-3 text-sm whitespace-nowrap transition"
                    :class="activeTab === tab 
                        ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                        : 'text-gray-500 hover:text-gray-700'"
                >
                    {{ tab }}
                </button>
            </div>

            <!-- TAB CONTENT -->
            <div class="p-6">

                <!-- PERSONAL DATA -->
                <div v-if="activeTab === 'Personal Data'" class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div><strong>Birthdate:</strong> {{ employee.dateOfBirth }}</div>
                    <div><strong>Place of Birth:</strong> {{ employee.placeOfBirth }}</div>
                    <div><strong>Sex:</strong> {{ employee.sex }}</div>
                    <div><strong>Civil Status:</strong> {{ employee.civilStatus }}</div>
                    <div><strong>Nationality:</strong> {{ employee.nationality }}</div>
                    <div><strong>Religion:</strong> {{ employee.religion }}</div>

                    <div class="col-span-2 md:col-span-3">
                        <strong>Present Address:</strong>
                        {{ employee.presentAddress }}
                    </div>

                    <div class="col-span-2 md:col-span-3">
                        <strong>Permanent Address:</strong>
                        {{ employee.permanentAddress }}
                    </div>
                </div>

                <!-- ATTACHMENTS -->
                <div v-if="activeTab === 'Attachments / Files'">
                    <div v-if="employee.files.length === 0" class="text-gray-500 text-sm">
                        No files uploaded.
                    </div>

                    <div class="grid grid-cols-4 gap-4">
                        <div
                            v-for="(file, i) in employee.files"
                            :key="i"
                            class="border rounded-xl p-3 text-center text-sm hover:bg-gray-50 cursor-pointer"
                        >
                            📄 {{ file.name }}
                        </div>
                    </div>
                </div>

                <!-- TIME -->
                <div v-if="activeTab === 'Time'" class="text-sm text-gray-500">
                    Time logs / attendance module goes here.
                </div>

                <!-- JOB HISTORY -->
                <div v-if="activeTab === 'Job History'">
                    <div v-for="(job, i) in employee.employmentHistory" :key="i" class="mb-3">
                        <div class="font-medium">{{ job.employer }}</div>
                        <div class="text-sm">
                            {{ job.position }} ({{ job.from }} - {{ job.to }})
                        </div>
                    </div>
                </div>

                <!-- EVALUATION -->
                <div v-if="activeTab === 'Evaluation History'" class="text-sm text-gray-500">
                    No evaluation records yet.
                </div>

                <!-- ALLOWANCE -->
                <div v-if="activeTab === 'Allowance'" class="text-sm text-gray-500">
                    Allowance records will appear here.
                </div>

                <!-- DISCIPLINARY -->
                <div v-if="activeTab === 'Disciplinary Action'" class="text-sm text-gray-500">
                    No disciplinary records.
                </div>

            </div>
        </div>

    </div>
</navigation>
</template>

<script setup>
import { ref } from "vue";
import navigation from "../components/layouts/navigation_admin.vue";

const activeTab = ref("Personal Data");

const tabs = [
    "Personal Data",
    "Attachments / Files",
    "Time",
    "Job History",
    "Evaluation History",
    "Allowance",
    "Disciplinary Action"
];

/* SAMPLE DATA */
const employee = ref({
    fullName: "John Doe",
    employeeNo: "EMP-001",
    status: "Active",
    employmentType: "Regular",
    contactNumber: "09123456789",
    email: "john@company.com",
    dateHired: "2024-01-15",
    photo: "",

    dateOfBirth: "1995-05-10",
    placeOfBirth: "Manila",
    sex: "Male",
    civilStatus: "Single",
    nationality: "Filipino",
    religion: "Catholic",

    presentAddress: "Taguig City",
    permanentAddress: "Laguna",

    files: [
        { name: "Resume.pdf" },
        { name: "ID.png" }
    ],

    employmentHistory: [
        {
            employer: "ABC Corp",
            position: "Developer",
            from: "2022",
            to: "2023"
        }
    ]
});
</script>