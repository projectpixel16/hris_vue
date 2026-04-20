<template>
    <navigation>
        <div class="space-y-6">
            <div class="flex flex-col md:flex-row gap-6">

                <!-- LEFT SIDE -->
                <div class="md:w-8/12 space-y-6">

                    <!-- 🔵 BIG CARD 1 (PROFILE) -->
                    <div class="bg-white rounded-lg shadow-sm border p-6">
                        <div class="flex gap-6">

                            <!-- PHOTO -->
                            <div class="w-40 h-40 rounded-full bg-gray-200 overflow-hidden">
                                <img 
                                    v-if="employee.photo"
                                    :src="employee.photo"
                                    class="w-full h-full object-cover"
                                />
                            </div>

                            <!-- INFO -->
                            <div class="flex-1">
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

                                <div class="text-sm text-gray-500 mt-4 space-y-2">
                                    <div class="flex gap-2 items-center">
                                        <PhoneIcon class="size-4"/>
                                        <span>{{ employee.contactNumber }}</span>
                                    </div>
                                    <div class="flex gap-2 items-center">
                                        <EnvelopeIcon class="size-4"/>
                                        <span>{{ employee.email }}</span>
                                    </div>
                                    <div class="flex gap-2 items-center">
                                        <MapPinIcon class="size-4"/>
                                        <span>{{ employee.presentAddress }}</span>
                                    </div>
                                </div>
                            </div>

                        
                        </div>
                    </div>

                    <!-- 🟢 BIG CARD 2 (PERSONAL INFO) -->
                    <div class="bg-white rounded-lg shadow-sm border p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            Personal Information
                        </h3>

                        <div class="grid grid-cols-2 gap-4 text-sm">

                            <div>
                                <p class="text-gray-500">Birthdate</p>
                                <p class="font-medium">{{ employee.dateOfBirth }}</p>
                            </div>

                            <div>
                                <p class="text-gray-500">Place of Birth</p>
                                <p class="font-medium">{{ employee.placeOfBirth }}</p>
                            </div>

                            <div>
                                <p class="text-gray-500">Sex</p>
                                <p class="font-medium">{{ employee.sex }}</p>
                            </div>

                            <div>
                                <p class="text-gray-500">Civil Status</p>
                                <p class="font-medium">{{ employee.civilStatus }}</p>
                            </div>

                            <div>
                                <p class="text-gray-500">Nationality</p>
                                <p class="font-medium">{{ employee.nationality }}</p>
                            </div>

                            <div>
                                <p class="text-gray-500">Religion</p>
                                <p class="font-medium">{{ employee.religion }}</p>
                            </div>

                            <div class="col-span-2">
                                <p class="text-gray-500">Present Address</p>
                                <p class="font-medium">{{ employee.presentAddress }}</p>
                            </div>

                            <div class="col-span-2">
                                <p class="text-gray-500">Permanent Address</p>
                                <p class="font-medium">{{ employee.permanentAddress }}</p>
                            </div>

                        </div>
                    </div>

                </div>

                <!-- RIGHT SIDE -->
                <div class="md:w-4/12">
                    <div class="bg-white rounded-lg shadow-sm border p-6 h-full">
                        <!-- RIGHT META -->
                        <div class="text-sm space-y-3 mb-4">
                            <div>
                                <div class="text-gray-500">Employee No.</div>
                                <div class="font-medium">{{ employee.employeeNo }}</div>
                            </div>
                            <div>
                                <div class="text-gray-500">Date Hired</div>
                                <div class="font-medium">{{ employee.dateHired }}</div>
                            </div>
                            <div>
                                <div class="text-gray-500">Position</div>
                                <div class="font-medium">{{ employee.position }}</div>
                            </div>
                        </div>
                        <hr class="mb-4">
                        <!-- 🟡 COMBINED CARD -->
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            Additional Details
                        </h3>

                        <!-- ADDITIONAL -->
                        <div class="mb-6 space-y-2 text-sm">
                            <p><span class="text-gray-500">Skills:</span> {{ employee.skills }}</p>
                            <p><span class="text-gray-500">Hobbies:</span> {{ employee.hobbies }}</p>
                            <p><span class="text-gray-500">Notes:</span> {{ employee.notes }}</p>
                        </div>

                        <!-- CHARACTER REF -->
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-2">
                                Character Reference
                            </h4>

                            <div class="divide-y max-h-64 overflow-y-auto">
                                <div v-for="(ref, i) in employee.characterRefs" :key="i" class="py-3">
                                    <div class="font-medium text-gray-800">{{ ref.name }}</div>
                                    <div class="text-xs text-gray-500">{{ ref.company }}</div>
                                    <div class="text-xs text-gray-400">{{ ref.contact }}</div>
                                </div>

                                <div v-if="!employee.characterRefs?.length" class="text-gray-400 text-sm py-3">
                                    No records
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div class="md:w-6/12">
                <div class="bg-white rounded-lg shadow-sm border p-6 h-full">
                        <!-- RIGHT META -->
                    <div class="text-sm space-y-3 mb-4">
                        <div>
                            <div class="text-gray-500">Employee No.</div>
                            <div class="font-medium">{{ employee.employeeNo }}</div>
                        </div>
                        <div>
                            <div class="text-gray-500">Date Hired</div>
                            <div class="font-medium">{{ employee.dateHired }}</div>
                        </div>
                        <div>
                            <div class="text-gray-500">Position</div>
                            <div class="font-medium">{{ employee.position }}</div>
                        </div>
                    </div>
                    <hr class="mb-4">
                    <!-- 🟡 COMBINED CARD -->
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">
                        Additional Details
                    </h3>

                    <!-- ADDITIONAL -->
                    <div class="mb-6 space-y-2 text-sm">
                        <p><span class="text-gray-500">Skills:</span> {{ employee.skills }}</p>
                        <p><span class="text-gray-500">Hobbies:</span> {{ employee.hobbies }}</p>
                        <p><span class="text-gray-500">Notes:</span> {{ employee.notes }}</p>
                    </div>

                    <!-- CHARACTER REF -->
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-2">
                            Character Reference
                        </h4>

                        <div class="divide-y max-h-64 overflow-y-auto">
                            <div v-for="(ref, i) in employee.characterRefs" :key="i" class="py-3">
                                <div class="font-medium text-gray-800">{{ ref.name }}</div>
                                <div class="text-xs text-gray-500">{{ ref.company }}</div>
                                <div class="text-xs text-gray-400">{{ ref.contact }}</div>
                            </div>

                            <div v-if="!employee.characterRefs?.length" class="text-gray-400 text-sm py-3">
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