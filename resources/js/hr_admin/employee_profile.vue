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
                    <!-- PERSONAL DATA (CLEAN UI - NO GLASS) -->
                    <div v-if="activeTab === 'Personal Data'" class="space-y-6 text-sm">

                        <!-- PERSONAL INFO -->
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
                    <!-- ATTACHMENTS -->
                    <!-- ATTACHMENTS / FILES -->
                    <div v-if="activeTab === 'Attachments / Files'" class="space-y-4">

                            <div v-for="category in fileCategories" :key="category" class="bg-white border rounded-2xl p-6 shadow-sm relative">
            
                                <!-- CARD HEADER -->
                                <div class="flex justify-between items-center mb-4">
                                    <h3 class="font-semibold text-gray-800">{{ category }}</h3>
                                    <button
                                    @click="openUploadModal(category)"
                                    class="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                                    >
                                    Upload
                                    </button>
                                </div>

                                <!-- FILE GRID -->
                                <div class="grid grid-cols-4 gap-4">
                                    <div
                                    v-for="(file, i) in getFilesByCategory(category)"
                                    :key="i"
                                    class="border rounded-xl p-3 text-center text-sm hover:bg-gray-50 cursor-pointer"
                                    @click="openFileViewer(category, i)"
                                    >
                                    📄 {{ file.name }}
                                    <button
                                        @click.stop="confirmRemoveFile(category, i)"
                                        class="block mt-2 text-red-500 text-xs hover:underline"
                                    >
                                        Remove
                                    </button>
                                    </div>
                                    <div v-if="!getFilesByCategory(category).length" class="col-span-4 text-gray-400 text-sm">
                                    No files uploaded.
                                    </div>
                                </div>

                            </div>

                            <transition name="fade">
                                <div
                                    v-if="showUploadModal"
                                    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                                >
                                    <div class="bg-white rounded-2xl p-6 w-96 space-y-4">
                                        <h3 class="text-lg font-semibold text-gray-800">Upload Files - {{ uploadCategory }}</h3>

                                        <!-- FILE INPUT / DRAG & DROP -->
                                        <div
                                            @dragover.prevent
                                            @drop.prevent="handleDrop($event)"
                                            class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400 cursor-pointer"
                                    >
                                        Drag & Drop files here or
                                        <input type="file" multiple @change="handleFilesUpload" class="hidden" ref="fileInput" />
                                        <button @click="$refs.fileInput.click()" class="text-blue-600 underline ml-1">Browse</button>
                                    </div>

                                    <!-- UPLOADED FILES PREVIEW -->
                                    <div v-if="uploadFiles.length" class="space-y-2 max-h-48 overflow-y-auto border rounded p-2">
                                        <div v-for="(f, idx) in uploadFiles" :key="idx" class="flex justify-between items-center text-sm">
                                        <span>{{ f.name }}</span>
                                        <button @click="removeFile(idx)" class="text-red-500 text-xs">Remove</button>
                                        </div>
                                    </div>

                                    <!-- MODAL ACTIONS -->
                                    <div class="flex justify-end gap-2">
                                        <button @click="cancelUpload" class="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300">Cancel</button>
                                        <button @click="saveFiles" class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">Upload</button>
                                    </div>
                                    </div>
                                </div>
                            </transition>

                            <!-- FILE VIEWER MODAL -->
                            <transition name="fade">
                                <div
                                    v-if="showFileViewer"
                                    class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                                >
                                    <div class="bg-white rounded-2xl p-6 w-3/4 max-w-3xl space-y-4">
                                    <div class="flex justify-between items-center">
                                        <h3 class="font-semibold text-gray-800">{{ fileViewerCategory }}</h3>
                                        <button @click="showFileViewer = false" class="text-red-500 font-bold text-lg">✕</button>
                                    </div>

                                    <div class="border rounded p-4 text-center">
                                        <!-- File display -->
                                        <p class="text-gray-600">{{ currentFile.name }}</p>
                                        <!-- If image, show preview -->
                                        <img v-if="isImage(currentFile)" :src="currentFileURL" class="max-h-96 mx-auto" />
                                        <!-- Other file types could be handled differently or just show name -->
                                    </div>

                                    <!-- Navigation for multi-file categories -->
                                    <div v-if="hasMultipleFiles" class="flex justify-between mt-4">
                                        <button
                                        @click="prevFile"
                                        class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                        :disabled="fileIndex === 0"
                                        >
                                        Previous
                                        </button>
                                        <button
                                        @click="nextFile"
                                        class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                        :disabled="fileIndex === getFilesByCategory(fileViewerCategory).length - 1"
                                        >
                                        Next
                                        </button>
                                    </div>
                                    </div>
                                </div>
                            </transition>

                    </div>
                    <!-- TIME / ATTENDANCE -->
                    <div v-if="activeTab === 'Attendance'" class="space-y-4 text-sm">

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

                    <!-- JOB HISTORY -->
                    <div v-if="activeTab === 'Job History'" class="space-y-4">

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


    /* ACTIVE TAB */
    const activeTab = ref("Personal Data");

    const tabs = [
        "Personal Data",
        "Attachments / Files",
        "Attendance",
        "Job History",
        "Evaluation History",
        "Allowance",
        "Disciplinary Action"
    ];

    /* =========================
    EMPLOYEE DATA
    ========================= */
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

        /* OLD EMPLOYMENT (KEEPED) */
        employmentHistory: [
            {
                employer: "ABC Corp",
                position: "Developer",
                from: "2022",
                to: "2023"
            }
        ],

        /* NEW JOB HISTORY */
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
        ]
    });

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
            date: "2026-03-20",
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
            date: "2026-03-21",
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
            date: "2026-03-22",
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
            date: "2026-03-23",
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
            date: "2026-03-24",
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
            date: "2026-03-25",
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
            date: "2026-03-26",
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
            date: "2026-03-27",
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
            date: "2026-03-28",
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





    // Renamed employee to employeeData
    const employeeData = ref({
    files: [
        { name: 'Resume.pdf', category: 'Main', url: '/files/Resume.pdf' },
        { name: 'MapSketch.png', category: 'Main', url: '/files/MapSketch.png' },
        { name: 'Certificate1.pdf', category: 'Certificates', url: '/files/Certificate1.pdf' },
        { name: 'Evaluation1.docx', category: 'Evaluation', url: '/files/Evaluation1.docx' },
    ]
    })

    const fileCategories = ['Main', 'Certificates', 'Evaluation', 'Other Documents']

    // Upload modal state
    const showUploadModal = ref(false)
    const uploadCategory = ref('')
    const uploadFiles = ref([])

    // File viewer state
    const showFileViewer = ref(false)
    const fileViewerCategory = ref('')
    const fileIndex = ref(0)

    // Get files by category
    const getFilesByCategory = (category) => employeeData.value.files.filter(f => f.category === category)
    const hasMultipleFiles = computed(() => getFilesByCategory(fileViewerCategory.value).length > 1)
    const currentFile = computed(() => getFilesByCategory(fileViewerCategory.value)[fileIndex.value])
    const currentFileURL = computed(() => currentFile.value?.url || '')

    // Open file viewer modal
    const openFileViewer = (category, idx) => {
    fileViewerCategory.value = category
    fileIndex.value = idx
    showFileViewer.value = true
    }

    // Next / Previous for file viewer
    const nextFile = () => {
    if (fileIndex.value < getFilesByCategory(fileViewerCategory.value).length - 1) fileIndex.value++
    }
    const prevFile = () => {
    if (fileIndex.value > 0) fileIndex.value--
    }

    // Check if file is image
    const isImage = (file) => {
    return file.name.match(/\.(jpeg|jpg|png|gif)$/i)
    }

    // Upload modal
    const openUploadModal = (category) => {
    uploadCategory.value = category
    showUploadModal.value = true
    }
    const handleFilesUpload = (event) => {
    uploadFiles.value.push(...event.target.files)
    }
    const handleDrop = (event) => {
    uploadFiles.value.push(...Array.from(event.dataTransfer.files))
    }
    const removeFile = (idx) => {
    if (window.confirm(`Are you sure you want to delete "${uploadFiles.value[idx].name}"?`)) {
        uploadFiles.value.splice(idx, 1)
    }
    }
    const cancelUpload = () => {
    uploadFiles.value = []
    uploadCategory.value = ''
    showUploadModal.value = false
    }
    const saveFiles = () => {
    if (!uploadCategory.value) return alert('Please select a category')
    uploadFiles.value.forEach(file => {
        if (uploadCategory.value === 'Main') {
        const allowed = ['Resume', 'Map Sketch', 'Essay', 'Photo']
        if (!allowed.some(a => file.name.includes(a))) return
        }
        employeeData.value.files.push({ name: file.name, category: uploadCategory.value, url: URL.createObjectURL(file) })
    })
    cancelUpload()
    }

    // Remove file from main grid
    const confirmRemoveFile = (category, idx) => {
    if (window.confirm(`Are you sure you want to delete "${getFilesByCategory(category)[idx].name}"?`)) {
        const targetFile = getFilesByCategory(category)[idx]
        employeeData.value.files = employeeData.value.files.filter(f => f !== targetFile)
    }
    }
</script>