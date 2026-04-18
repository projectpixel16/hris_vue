<template>
    <navigation>
        <div class="space-y-6">
            <div class="flex gap-4 transition-all duration-300"
                :class="isScrolled ? 'opacity-40 scale-95' : ''">
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


            <transition name="fade-slide">
                <div 
                    v-if="isScrolled"
                    class="fixed top-4 left-[55%] -translate-x-[50%] z-50 
                        bg-white shadow-lg border rounded-xl 
                        px-4 py-2 flex items-center gap-3 w-[350px]"
                >
                    <div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-200">
                        <img v-if="employee.photo" :src="employee.photo" class="w-full h-full object-cover" />
                    </div>

                    <div class="flex-1">
                        <div class="text-sm font-semibold text-gray-800">
                            {{ employee.fullName }}
                        </div>
                        <div class="text-xs text-gray-500">
                            {{ employee.status }}
                        </div>
                    </div>
                </div>
            </transition>

            <!-- TABS -->
            <div class="">
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
                <div class="py-4">
                    <component :is="currentTabComponent"  :employee="employee" @add-file="addFile" @remove-file="removeFile"/>
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
    import navigation from "../components/layouts/navigation_admin.vue";
    import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/vue/24/solid";
    import PersonalData from "../hr_admin/tabs/PersonalDataTab.vue";
    import Attachments from "../hr_admin/tabs/AttachmentsTab.vue";
    import Attendance from "../hr_admin/tabs/AttendanceTab.vue";
    import Leaves from "../hr_admin/tabs/LeavesTab.vue";
    import JobHistory from "../hr_admin/tabs/JobHistoryTab.vue";
    import Disciplinary from "../hr_admin/tabs/DisciplinaryActionTab.vue";
    import Evaluation from "../hr_admin/tabs/EvaluationHistoryTab.vue";
    import Allowance from "../hr_admin/tabs/AllowanceTab.vue";
    import IDcard from "../hr_admin/tabs/IdCardTab.vue";

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

    const activeTab = ref("Personal Data");
    /* ACTIVE TAB */
    const tabComponents = {
        "Personal Data": PersonalData,
        "Attachments / Files": Attachments,
        "Attendance": Attendance,
        "Leaves": Leaves,
        "Job History": JobHistory,
        "Evaluation History": Evaluation,
        "Allowance": Allowance,
        "ID Card": IDcard,
        "Disciplinary Action": Disciplinary,
    };

    const currentTabComponent = computed(() => {
        return tabComponents[activeTab.value] || PersonalData;
    });

    const tabs = [
        "Personal Data",
        "Attachments / Files",
        "Attendance",
        "Leaves",
        "Job History",
        "Allowance",
        "ID Card",
        "Evaluation History",
        "Disciplinary Action",
    ];

    const addFile = (file) => {
        employee.value.files.push(file);
    };

    const removeFile = (file) => {
        employee.value.files = employee.value.files.filter(f => f !== file);
    }; 

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