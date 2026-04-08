<template>
    <navigation>
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-2xl font-semibold text-gray-800">
                    Applicants List
                </h1>
                <p class="text-sm text-gray-500">
                    Manage job applicants and their submissions
                </p>
            </div>
        </div>

        <!-- Controls -->
        <div class="bg-white rounded-xl shadow mb-4 p-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <label class="text-sm text-gray-600">Show</label>
                    <select v-model="perPage" class="border rounded-lg px-2 py-1 text-sm">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                    </select>
                    <span class="text-sm text-gray-600">entries</span>
                </div>

                <input
                    v-model="search"
                    type="text"
                    placeholder="Search applicants..."
                    class="border rounded-lg px-3 py-2 text-sm w-64"
                />
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-xl shadow">
            <table class="min-w-full text-sm">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 text-left">Applicant</th>
                        <th class="px-4 py-3 text-left">Address</th>
                        <th class="px-4 py-3 text-left">Position</th>
                        <th class="px-4 py-3 text-left">Date Applied</th>
                        <th class="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(applicant, index) in paginatedApplicants"
                        :key="index"
                        class="border-t hover:bg-gray-50 transition"
                    >
                        <!-- NAME + CONTACT -->
                        <td class="px-4 py-3">
                            <div class="font-medium text-gray-800">
                                {{ applicant.name }}
                            </div>
                            <div class="text-xs text-gray-500">
                                {{ applicant.email }}
                            </div>
                            <div class="text-xs text-gray-500">
                                {{ applicant.contact }}
                            </div>
                        </td>

                        <td class="px-4 py-3 text-gray-600">
                            {{ applicant.address }}
                        </td>

                        <td class="px-4 py-3">
                            <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                                {{ applicant.position }}
                            </span>
                        </td>

                        <td class="px-4 py-3 text-gray-600">
                            {{ applicant.dateApplied }}
                        </td>

                        <!-- ACTIONS -->
                        <td class="px-4 py-3 text-right space-x-2">
                            <button
                                @click="openResume(applicant)"
                                class="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-xs"
                            >
                                View Resume
                            </button>

                            <button
                                @click="sendForm(applicant)"
                                class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                            >
                                Send Form
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>
                Showing {{ startEntry }} to {{ endEntry }} of {{ filteredApplicants.length }} entries
            </div>

            <div class="flex gap-2">
                <button @click="prevPage" class="px-3 py-1 border rounded">Previous</button>
                <button @click="nextPage" class="px-3 py-1 border rounded">Next</button>
            </div>
        </div>

    </navigation>
</template>
<script setup>
    import { ref, computed } from "vue";
    import navigation from "../components/layouts/navigation_admin.vue";

    /* Sample Applicants */
    const applicants = ref([
        {
            name: "Juan Dela Cruz",
            address: "Taguig City",
            position: "Frontend Developer",
            email: "juan@email.com",
            contact: "09123456789",
            resume: "/resumes/juan.pdf"
        },
        {
            name: "Maria Santos",
            address: "Makati City",
            position: "HR Assistant",
            email: "maria@email.com",
            contact: "09987654321",
            resume: "/resumes/maria.pdf"
        }
    ]);

    /* Actions */
    const viewResume = (applicant) => {
        window.open(applicant.resume, "_blank");
    };

    const sendForm = (applicant) => {
        alert(`Application form sent to ${applicant.email}`);
    };

    /* Search & Pagination */
    const search = ref("");
    const perPage = ref(5);
    const currentPage = ref(1);

    const filteredApplicants = computed(() => {
        return applicants.value.filter(a =>
            a.name.toLowerCase().includes(search.value.toLowerCase())
        );
    });

    const paginatedApplicants = computed(() => {
        const start = (currentPage.value - 1) * perPage.value;
        return filteredApplicants.value.slice(start, start + perPage.value);
    });

    const startEntry = computed(() =>
        filteredApplicants.value.length === 0
            ? 0
            : (currentPage.value - 1) * perPage.value + 1
    );

    const endEntry = computed(() =>
        Math.min(currentPage.value * perPage.value, filteredApplicants.value.length)
    );

    const nextPage = () => {
        if (currentPage.value * perPage.value < filteredApplicants.value.length) {
            currentPage.value++;
        }
    };

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--;
        }
    };
</script>