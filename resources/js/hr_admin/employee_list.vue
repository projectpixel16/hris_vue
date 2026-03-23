<template>
    <navigation>
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-2xl font-semibold text-gray-800">
                Employee Management
                </h1>
                <p class="text-sm text-gray-500">
                Manage employee records and information
                </p>
            </div>

            <div class="flex gap-3">
                <!-- Filter -->
                <select
                v-model="filterStatus"
                class="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Status</option>
                    <option>Active</option>
                    <option>Applicant</option>
                    <option>Separated</option>
                </select>

                <select
                    class="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <option value="">Employment Status</option>
                    <option value="Regular">Regular</option>
                    <option value="Probationary">Probationary</option>
                    <option value="Trainee">Trainee</option>
                    <option value="Project Based">Project Based</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Pass">Pass</option>
                    <option value="Fail">Fail</option>
                    <option value="For Pooling">For Pooling</option>
                    <option value="For Interview">For Interview</option>
                    <option value="For Exam">For Exam</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Retainer">Retainer</option>
                    <option value="OJT / Student Intern">OJT / Student Intern</option>
                    <option value="Fixed-Term Worker">Fixed-Term Worker</option>
                </select>
                <!-- Add Employee -->
                <a href="/admin/employee_add"
                class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition"
                >
                + Add New Employee
                </a>
            </div>
        </div>

        <!-- Draft Notification -->
        <div
        v-if="draftCount > 0"
        class="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex justify-between items-center"
        >
        <div>
            <strong>{{ draftCount }}</strong> employee record(s) are incomplete.
            Please review and complete their details.
        </div>
        <button class="text-sm underline hover:text-yellow-900">
            Review Drafts
        </button>
        </div>

        <!-- DataTable Controls -->
        <div class="bg-white rounded-xl shadow mb-4 p-4">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <!-- Left Controls -->
            <div class="flex items-center gap-3">
            <label class="text-sm text-gray-600">Show</label>
            <select
                v-model="perPage"
                class="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
            <span class="text-sm text-gray-600">entries</span>
            </div>

            <!-- Search -->
            <div class="relative w-full md:w-64">
            <input
                v-model="search"
                type="text"
                placeholder="Search employees..."
                class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            </div>
        </div>
        </div>

        <!-- Employee Table -->
        <div class="bg-white rounded-xl shadow">
            <table class="min-w-full divide-y divide-gray-200 text-sm">
                <thead class="bg-gray-50">
                <tr>
                    <th class="px-4 py-3 text-left font-medium text-gray-500">Emp No.</th>
                    <th class="px-4 py-3 text-left font-medium text-gray-500">Full Name</th>
                    <th class="px-4 py-3 text-left font-medium text-gray-500">Date Hired</th>
                    <th class="px-4 py-3 text-left font-medium text-gray-500">Position</th> 
                    <th class="px-4 py-3 text-left font-medium text-gray-500">Profession</th>
                    <th class="px-4 py-3 text-left font-medium text-gray-500">Contact</th>
                    <th class="px-4 py-3 text-right font-medium text-gray-500">Action</th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr
                        v-for="(employee, index) in paginatedEmployees"
                        :key="index"
                        class="hover:bg-gray-50"
                    >
                        <td class="px-4 py-3">{{ employee.employeeNo }}</td>

                        <td class="px-4 py-3">
                            <div class="font-medium text-gray-800">
                                {{ employee.fullName }}
                            </div>
                            <div class="flex gap-2 mt-1">
                                <span
                                class="px-2 py-0.5 rounded-full text-xs font-medium"
                                :class="{
                                    'bg-green-100 text-green-700': employee.status === 'Active',
                                    'bg-yellow-100 text-yellow-700': employee.status === 'Applicant',
                                    'bg-red-100 text-red-700': employee.status === 'Separated'
                                }"
                                >
                                {{ employee.status }}
                                </span>

                                <span
                                class="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                                >
                                {{ employee.employmentType }}
                                </span>
                            </div>
                        </td>

                        <td class="px-4 py-3">{{ employee.dateHired || '-' }}</td>
                        <td class="px-4 py-3">{{ employee.position || '-' }}</td>
                        <td class="px-4 py-3">{{ employee.profession }}</td>

                        <td class="px-4 py-3">
                        <div>{{ employee.contact }}</div>
                        <div class="text-blue-600 text-xs">
                            {{ employee.email }}
                        </div>
                        </td>

                        <!-- Action -->
                        <td class="px-4 py-3 text-right relative">
                        <button
                            @click.stop="toggleDropdown(index)"
                            class="border border-gray-300 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-100 transition"
                        >
                            Actions
                        </button>

                        <div
                            v-if="activeDropdown === index"
                            class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
                        >
                            <ul class="text-sm text-gray-700 text-left">
                                <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Employee</li>
                                <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Files</li>
                                <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Amend</li>
                                <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add Allowance</li>
                                <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add Evaluation</li>
                                <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add Disciplinary</li>
                            </ul>
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div class="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>
                Showing {{ startEntry }} to {{ endEntry }} of {{ filteredEmployees.length }} entries
            </div>

            <div class="flex gap-2">
                <button
                @click="prevPage"
                class="px-3 py-1 border rounded-lg hover:bg-gray-100"
                >
                Previous
                </button>

                <button
                @click="nextPage"
                class="px-3 py-1 border rounded-lg hover:bg-gray-100"
                >
                Next
                </button>
            </div>
        </div>


        
    </navigation>
</template>

<script setup>
    import { ref, computed, onMounted, onBeforeUnmount } from "vue";
    import navigation from "../components/layouts/navigation_admin.vue";

    const filterStatus = ref("");
    const activeDropdown = ref(null);

    const toggleDropdown = (index) => {
    activeDropdown.value =
        activeDropdown.value === index ? null : index;
    };

    /* Close dropdown when clicking outside */
    const closeDropdown = () => {
    activeDropdown.value = null;
    };

    onMounted(() => {
    document.addEventListener("click", closeDropdown);
    });

    onBeforeUnmount(() => {
    document.removeEventListener("click", closeDropdown);
    });

    /* Sample Data */
    const employees = ref([
    {
        fullName: "John Doe",
        dateHired: "2024-01-15",
        position: "Software Engineer",
        profession: "IT",
        contact: "09123456789",
        email: "john.doe@company.com",
        employeeNo: "EMP-001",
        status: "Active",
        employmentType: "Regular",
        isDraft: false,
    },
    {
        fullName: "Jane Smith",
        dateHired: "",
        position: "",
        profession: "Human Resources",
        contact: "09987654321",
        email: "jane.smith@company.com",
        employeeNo: "EMP-002",
        status: "Applicant",
        employmentType: "Probationary",
        isDraft: true,
    },
    ]);

    /* Draft Counter */
    const draftCount = computed(() =>
    employees.value.filter((e) => e.isDraft).length
    );

    const search = ref("");
    const perPage = ref(5);
    const currentPage = ref(1);

    /* Filter */
    const filteredEmployees = computed(() => {
    return employees.value.filter((e) =>
        e.fullName.toLowerCase().includes(search.value.toLowerCase())
    );
    });

    /* Pagination */
    const paginatedEmployees = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    return filteredEmployees.value.slice(
        start,
        start + parseInt(perPage.value)
    );
    });

    const startEntry = computed(() =>
    filteredEmployees.value.length === 0
        ? 0
        : (currentPage.value - 1) * perPage.value + 1
    );

    const endEntry = computed(() =>
    Math.min(
        currentPage.value * perPage.value,
        filteredEmployees.value.length
    )
    );

    const nextPage = () => {
    if (currentPage.value * perPage.value < filteredEmployees.value.length) {
        currentPage.value++;
    }
    };

    const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
    };
</script>