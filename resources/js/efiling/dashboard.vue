<template>
    <navigation>
        <div class="space-y-4">

            <!-- WELCOME MESSAGE -->
            <transition name="fade">
                <div v-if="showWelcome"
                    class="glass p-6 rounded-3xl flex justify-between items-center backdrop-blur-xl border border-white/30">
                    <div>
                        <h2 class="text-2xl font-semibold text-white">
                            Welcome back, {{ userName }} 👋
                        </h2>
                        <p class="text-sm text-white/70 mt-1">
                            Here's what's happening today.
                        </p>
                    </div>

                    <button @click="showWelcome = false"
                        class="text-white/60 hover:text-white transition">
                        ✕
                    </button>
                </div>
            </transition>

            <!-- TOP COUNTERS (REDESIGNED) -->
            <div class="grid md:grid-cols-3 gap-4">

                <div class="glass stat-card group">
                    <div>
                        <p class="stat-title">Overall Records</p>
                        <h3 class="stat-value">{{ animatedOverall }}</h3>
                    </div>
                    <div class="stat-icon bg-indigo-500/20 text-indigo-400">
                        📁
                    </div>
                </div>

                <div class="glass stat-card group">
                    <div>
                        <p class="stat-title">Encoded</p>
                        <h3 class="stat-value text-emerald-400">
                            {{ animatedEncoded }}
                        </h3>
                    </div>
                    <div class="stat-icon bg-emerald-500/20 text-emerald-400">
                        ✅
                    </div>
                </div>

                <div class="glass stat-card group">
                    <div>
                        <p class="stat-title">Emails Sent</p>
                        <h3 class="stat-value text-sky-400">
                            {{ animatedEmails }}
                        </h3>
                    </div>
                    <div class="stat-icon bg-sky-500/20 text-sky-400">
                        📧
                    </div>
                </div>

            </div>

            <!-- BREAKDOWN SECTION (4 SCROLLABLE CARDS) -->
            <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

                <!-- COMPANY -->
                <div class="glass breakdown-card">
                    <h3 class="section-title">Per Company</h3>
                    <div class="scroll-area">
                        <div v-for="company in recordsByCompany"
                            :key="company.name"
                            class="breakdown-row">
                            <span>{{ company.name }}</span>
                            <span class="font-semibold">{{ company.total }}</span>
                        </div>
                    </div>
                </div>

                <!-- LOCATION -->
                <div class="glass breakdown-card">
                    <h3 class="section-title">Per Location</h3>
                    <div class="scroll-area">
                        <div v-for="loc in recordsByLocation"
                            :key="loc.name"
                            class="breakdown-row">
                            <span>{{ loc.name }}</span>
                            <span class="font-semibold">{{ loc.total }}</span>
                        </div>
                    </div>
                </div>

                <!-- DEPARTMENT -->
                <div class="glass breakdown-card">
                    <h3 class="section-title">Per Department</h3>
                    <div class="scroll-area">
                        <div v-for="dept in recordsByDepartment"
                            :key="dept.name"
                            class="breakdown-row">
                            <span>{{ dept.name }}</span>
                            <span class="font-semibold">{{ dept.total }}</span>
                        </div>
                    </div>
                </div>

                <!-- DOCUMENT -->
                <div class="glass breakdown-card">
                    <h3 class="section-title">Per Document</h3>
                    <div class="scroll-area">
                        <div v-for="doc in recordsByDocument"
                            :key="doc.name"
                            class="breakdown-row">
                            <span>{{ doc.name }}</span>
                            <span class="font-semibold">{{ doc.total }}</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </navigation>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
	import navigation from "../components/layouts/navigation_filing.vue";

    const userName = "Jason"
    const showWelcome = ref(true)

    const overall = 1250
    const encoded = 980
    const emails = 430

    const animatedOverall = ref(0)
    const animatedEncoded = ref(0)
    const animatedEmails = ref(0)

    const animateCounter = (target, refVar) => {
    let start = 0
    const duration = 800
    const step = target / (duration / 16)

    const counter = setInterval(() => {
        start += step
        if (start >= target) {
        refVar.value = target
        clearInterval(counter)
        } else {
        refVar.value = Math.floor(start)
        }
    }, 16)
    }

    onMounted(() => {
    animateCounter(overall, animatedOverall)
    animateCounter(encoded, animatedEncoded)
    animateCounter(emails, animatedEmails)

    // Welcome disappears after 5 seconds
    setTimeout(() => {
        showWelcome.value = false
    }, 5000)
    })

    /* SAMPLE DATA */
    const recordsByCompany = ref([
    { name: "Company A", total: 320 },
    { name: "Company B", total: 210 }
    ])

    const recordsByLocation = ref([
    { name: "Manila", total: 400 },
    { name: "Manila", total: 400 },
    { name: "Manila", total: 400 },
    { name: "Manila", total: 400 },
    { name: "Manila", total: 400 },
    { name: "Manila", total: 400 },
    { name: "Manila", total: 400 },
    { name: "Cebu", total: 280 }
    ])

    const recordsByDepartment = ref([
    { name: "HR", total: 150 },
    { name: "IT", total: 220 }
    ])

    const recordsByDocument = ref([
    { name: "Contracts", total: 500 },
    { name: "Reports", total: 350 }
    ])
</script>
 