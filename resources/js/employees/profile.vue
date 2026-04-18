<template>
    <navigation>
        <div class="space-y-6">
            <div class="flex gap-4 transition-all duration-300 bg-white rounded-2xl shadow-sm border p-6"">
                <!-- LEFT -->
                <div class="flex items-center gap-5 w-2/3">
                    <!-- PROFILE PIC -->
                    <div class="w-48 h-48 rounded-xl bg-gray-200 overflow-hidden">
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
                            <div class="flex justify-start space-x-2">
                                <PhoneIcon class="size-4"></PhoneIcon>
                                <span>{{ employee.contactNumber }}</span>
                            </div>
                            <div class="flex justify-start space-x-2">
                                <EnvelopeIcon class="size-4"></EnvelopeIcon>
                                <span>{{ employee.email }}</span>
                            </div>
                            <div class="flex justify-start space-x-2">
                                <MapPinIcon class="size-4"></MapPinIcon>
                                <span>{{ employee.presentAddress }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT -->
                <div class="gap-5 w-1/3 text-sm text-right space-y-4 p-5 py-6 border-r-4">
                    <div>
                        <div class="text-gray-500 m-0">Employee No.</div>
                        <div class="font-medium text-gray-500">{{ employee.employeeNo }}</div>
                    </div>

                    <div>
                        <div class="text-gray-500 m-0">Date Hired</div>
                        <div class="font-medium text-gray-500">{{ employee.dateHired }}</div>
                    </div>

                    <div>
                        <div class="text-gray-500 m-0">Current Position</div>
                        <div class="font-medium text-gray-500">{{ employee.position }}</div>
                    </div>
                </div>
            </div>

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

        </div>
    </navigation>
</template>
<style>
    .fade-slide-enter-active,
    .fade-slide-leave-active {
        transition: all 0.25s ease;
    }

    .fade-slide-enter-from {
        opacity: 0;
        transform: translateY(-10px) translateX(-50%);
    }

    .fade-slide-leave-to {
        opacity: 0;
        transform: translateY(-10px) translateX(-50%);
    }
</style>
<script setup>
    import { ref, computed, onMounted, onBeforeUnmount   } from "vue";
    import navigation from "../components/layouts/navigation_employee.vue";
    import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/vue/24/solid";

    /* ✅ SCROLL STATE */
    const isScrolled = ref(false);

    const handleScroll = () => {
        isScrolled.value = window.scrollY > 120; // adjust trigger
    };

    onMounted(() => {
        window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
        window.removeEventListener("scroll", handleScroll);
    });

    const employee = ref({
        fullName: "John Schumacher Bandola Dojillo",
        employeeNo: "EMP-001",
        status: "Active",
        position: "System Implementer",
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
        ],

        jobHistory: [
            {
                position: "HR Assistant",
                department: "HR",
                businessUnit: "Corporate",
                effectiveDate: "2024-01-01",
                endDate: "2024-12-31",
                status: "Probationary",
                location: "Head Office",
                salary: "18000",
                perDay: "820",
                supervisor: "John Doe"
            },
            {
                position: "System Implementer",
                department: "IT",
                businessUnit: "Operations",
                effectiveDate: "2025-01-01",
                endDate: null,
                status: "Regular",
                location: "Head Office",
                salary: "25000",
                perDay: "1100",
                supervisor: "Jane Smith"
            }
        ],
        files: [
            { name: 'Resume.pdf', category: 'Main', url: '/files/Resume.pdf' },
            { name: 'MapSketch.png', category: 'Main', url: '/files/MapSketch.png' },
            { name: 'Certificate1.pdf', category: 'Certificates', url: '/files/Certificate1.pdf' },
            { name: 'Evaluation1.docx', category: 'Evaluation', url: '/files/Evaluation1.docx' },
        ]
    });
    
</script>