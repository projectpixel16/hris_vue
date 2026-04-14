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
                        <th class="px-4 py-3 text-left font-medium text-gray-500">Applicant</th>
                        <th class="px-4 py-3 text-left font-medium text-gray-500">Position Applied</th>
                        <th class="px-4 py-3 text-left font-medium text-gray-500">Date Applied</th>
                        <th class="px-4 py-3 text-left font-medium text-gray-500">Address</th>
                        <th class="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
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
                            <div class="flex justify-start space-x-2">
                                <div class="text-xs text-gray-500">
                                    {{ applicant.contact }}
                                </div>
                                <div class="text-xs text-gray-500">
                                    {{ applicant.email }}
                                </div>
                            </div>                            
                        </td>

                        
                        <td class="px-4 py-3">
                            <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                                {{ applicant.position }}
                            </span>
                        </td>

                        <td class="px-4 py-3 text-gray-600">
                            {{ applicant.dateApplied }}
                        </td>

                        <td class="px-4 py-3 text-gray-600">
                            {{ applicant.address }}
                        </td>


                        <!-- ACTIONS -->
                        <td class="px-4 py-3 text-right space-x-2">
                            <button
                                @click="openResume(applicant)"
                                title="View Resume"
                                class="bg-gray-100 hover:bg-gray-200 px-1 py-1 rounded-full text-xs"
                            >
                                <EyeIcon class="size-4" />
                            </button>

                            <button
                                @click="sendForm(applicant)"
                                title="Send Application"
                                class="bg-blue-600 hover:bg-blue-700 text-white px-1 py-1 rounded-full text-xs"
                            >
                                <PaperAirplaneIcon class="size-4"></PaperAirplaneIcon>
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


        <Modal
            v-model="showResumeModal"
            title="Applicant Resume"
            width="w-full max-w-4xl"
        >
            <!-- BODY SLOT CONTENT -->
            <div class="h-[500px] flex items-center justify-center">

                <!-- PDF VIEW -->
                <iframe
                    v-if="fileType === 'pdf'"
                    :src="selectedResume"
                    class="w-full h-full rounded-lg"
                ></iframe>

                <!-- IMAGE VIEW -->
                <img
                    v-else-if="fileType === 'image'"
                    :src="selectedResume"
                    class="max-h-full rounded-lg"
                />

                <!-- OTHER FILES -->
                <div v-else class="text-center space-y-3">
                    <p class="text-gray-600 text-sm">
                        Preview not available for this file type.
                    </p>

                    <a
                        :href="selectedResume"
                        target="_blank"
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Open File
                    </a>
                </div>

            </div>

            <!-- OPTIONAL FOOTER SLOT -->
            <template #footer>
                <a
                    :href="selectedResume"
                    target="_blank"
                    class="bg-gray-200 px-4 py-2 rounded-lg text-sm"
                >
                    Download
                </a>

                <button
                    @click="showResumeModal = false"
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Close
                </button>
            </template>
        </Modal>
    </navigation>
</template>
<script setup>
    import { ref, computed } from "vue";
    import navigation from "../components/layouts/navigation_admin.vue";
    import { EyeIcon, PaperAirplaneIcon } from "@heroicons/vue/24/solid";
    import Modal from "../components/BaseModal.vue";

    /* Sample Applicants */
    const applicants = ref([
        {
            name: "Juan Dela Cruz",
            address: "Taguig City",
            dateApplied: "April 13, 2026",
            position: "Frontend Developer",
            email: "juan@email.com",
            contact: "09123456789",
            resume: "/resumes/juan.pdf"
        },
        {
            name: "Maria Santos",
            address: "Makati City",
            dateApplied: "April 13, 2026",
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
        alert(`Application form has been sent to ${applicant.name} (${applicant.email})`);
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

    const showResumeModal = ref(false);
    const selectedResume = ref("");
    const fileType = ref("");

    const openResume = (applicant) => {
        selectedResume.value = applicant.resume;

        const ext = applicant.resume.split('.').pop().toLowerCase();

        if (ext === "pdf") {
            fileType.value = "pdf";
        } else if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
            fileType.value = "image";
        } else {
            fileType.value = "other";
        }

        showResumeModal.value = true;
    };
</script>