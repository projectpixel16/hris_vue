<template>
    <navigation>
        <div class="space-y-4">
            <!-- HEADER -->
            <div class="glass p-6 rounded-3xl space-y-4">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-700">
                            Employee Records
                        </h2>
                        <p class="text-xs text-gray-500 mt-1">
                            The list shows records from
                            <span>{{ displayStartDate }}</span>
                            to
                            <span>{{ displayEndDate }}</span>
                        </p>
                    </div>
                    <div class="flex gap-2">
                        <button class="btn-filter" @click="toggleFilter">
                            Filter
                        </button>

                        <a href="/filing/form" class="btn-primary">
                            + Add New Record
                        </a>
                    </div>
                </div>

                <!-- FILTER -->
                <transition name="slide">
                    <div
                        v-if="showFilter"
                        class="grid md:grid-cols-5 gap-4 pt-4 border-t"
                    >
                        <div>
                            <label class="label">Search</label>
                            <input
                                type="text"
                                placeholder="Search subject..."
                                class="input w-full"
                            />
                        </div>
                        <div>
                            <label class="label">Company</label>
                            <select class="input w-full">
                                <option>All</option>
                                <option>San Miguel Corporation</option>
                                <option>Ayala Corporation</option>
                                <option>SM Investments</option>
                                <option>Jollibee Foods Corporation</option>
                            </select>
                        </div>
                        <div>
                            <label class="label">Type</label>
                            <select class="input w-full">
                                <option>All</option>
                                <option>Memo</option>
                                <option>Contract</option>
                                <option>Letter</option>
                                <option>Report</option>
                            </select>
                        </div>
                        <div>
                            <label class="label">Date From</label>
                            <input type="date" class="input w-full"/>
                        </div>
                        <div>
                            <label class="label">Date To</label>
                            <input type="date" class="input w-full"/>
                        </div>
                    </div>
                </transition>
            </div>

            <!-- DATATABLE -->
            <div class="glass p-6 rounded-3xl">
                <!-- NOTIFICATION -->
                <div class="draft-alert mb-4 flex justify-between">
                    <span>3 employee record(s) are incomplete. Please review and complete their details.</span>
                    <a href="" class="font-medium">View Record</a>
                </div>
                <!-- TABLE TOP -->
                <div class="flex justify-between items-center mb-4">
                    <div class="text-sm text-gray-500">
                        Showing 1 to 5 of 5 entries
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Quick search..."
                            class="input w-96"
                        />
                    </div>
                </div>
                <div class="rounded-xl overflow-hidden border">
                    <table class="w-full text-sm">
                        <thead class="bg-white/40 text-gray-600">
                            <tr class="text-left">
                                <th class="p-4">Company</th>
                                <th class="p-4">Date</th>
                                <th class="p-4">Subject</th>
                                <th class="p-4">Department</th>
                                <th class="p-4">Type</th>
                                <th class="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(row,index) in rows"
                                :key="index"
                                class="border-t hover:bg-white/20  transition"
                            >
                                <td class="p-4">{{ row.company }}</td>
                                <td class="p-4">{{ row.date }}</td>
                                <td class="p-4">{{ row.subject }}</td>
                                <td class="p-4">{{ row.department }}</td>
                                <td class="p-4">{{ row.type }}</td>
                                <td class="p-4 flex justify-center gap-2">
                                    <a href="/filing/document_view" class="bg-white rounded-full p-1 text-gray-600" title="View Document">
                                        <EyeIcon class="size-4"></EyeIcon>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- PAGINATION -->
                <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <div>
                        Showing 1 to 5 of 5 entries
                    </div>
                    <div class="flex gap-1">
                        <button class="page-btn">Prev</button>
                        <button class="page-btn active">1</button>
                        <button class="page-btn">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </navigation>
</template>

<script setup>
    import { ref } from "vue"
    import navigation from "../components/layouts/navigation_filing.vue"
    import { EyeIcon } from "@heroicons/vue/24/solid"

    const showFilter = ref(false)

    function toggleFilter(){
        showFilter.value = !showFilter.value
    }


    /* STATIC DATA */

    const rows = [

    {
    company:"San Miguel Corporation",
    date:"2026-03-01",
    subject:"Employee Policy Update",
    department:"HR Department",
    type:"Memo"
    },

    {
    company:"Ayala Corporation",
    date:"2026-03-03",
    subject:"Contract Renewal",
    department:"Legal Department",
    type:"Contract"
    },

    {
    company:"SM Investments",
    date:"2026-03-05",
    subject:"Project Completion Report",
    department:"Engineering",
    type:"Report"
    },

    {
    company:"Jollibee Foods Corporation",
    date:"2026-03-06",
    subject:"Internal Announcement",
    department:"Corporate Affairs",
    type:"Letter"
    },

    {
    company:"Petron Corporation",
    date:"2026-03-08",
    subject:"Operational Memo",
    department:"Operations",
    type:"Memo"
    }

    ]


    /* DISPLAY DATE */

    const today = new Date()
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 3)

    const displayStartDate = startDate.toLocaleDateString()
    const displayEndDate = today.toLocaleDateString()

</script>


<style>

    .label{
    @apply text-xs text-gray-500 block mb-1;
    }

    .input{
    @apply bg-white/40 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400;
    }

    .draft-alert{
    @apply bg-yellow-100 border border-yellow-300 text-yellow-800 px-5 py-3 rounded-2xl text-sm;
    }

    .btn-primary{
    @apply bg-blue-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-700 transition;
    }

    .btn-filter{
    @apply bg-gray-200 px-4 py-2 rounded-xl text-sm hover:bg-gray-300;
    }

    .btn-view{
    @apply px-3 py-1 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600;
    }

    .btn-secondary{
    @apply px-3 py-1 bg-gray-200 rounded-lg text-xs hover:bg-gray-300;
    }

    .btn-danger{
    @apply px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600;
    }

    .page-btn{
    @apply px-3 py-1 border rounded-lg hover:bg-gray-100;
    }

    .page-btn.active{
    @apply bg-blue-600 text-white border-blue-600;
    }

    /* FILTER ANIMATION */

    .slide-enter-active,
    .slide-leave-active{
    transition: all .3s ease;
    }

    .slide-enter-from{
    opacity:0;
    transform:translateY(-10px);
    }

    .slide-leave-to{
    opacity:0;
    transform:translateY(-10px);
    }

</style>