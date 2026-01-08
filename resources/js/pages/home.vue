<template>
    <div class="scroll-smooth text-gray-700">
        <!-- NAVBAR -->
        <header
        :class="[  'fixed top-0 w-full z-50 transition-colors duration-300',
            scrolled ? 'bg-white border-b' : 'bg-transparent' ]"
        >
        <div class="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center gap-2">
            <img src="" class="h-9" />
            <span
                :class="[
                'font-semibold tracking-wide',
                scrolled ? 'text-green-800' : 'text-white'
                ]"
            >
                CENPRI
            </span>
            </div>

            <!-- Desktop Nav -->
            <nav class="hidden md:flex gap-10 text-sm">
            <a v-for="l in links" :key="l.id" :href="l.href"
                :class="[
                'transition',
                scrolled ? 'text-gray-700 hover:text-green-700'
                            : 'text-white hover:opacity-80'
                ]">
                {{ l.label }}
            </a>
            </nav>

            <!-- Mobile Menu Button -->
            <button
            @click="mobileOpen = !mobileOpen"
            :class="scrolled ? 'text-gray-800' : 'text-white'"
            class="md:hidden text-2xl"
            >
            ☰
            </button>
        </div>

        <!-- Mobile Menu -->
        <div v-show="mobileOpen" class="md:hidden bg-white border-t">
            <a v-for="l in links" :key="l.id"
            :href="l.href"
            @click="mobileOpen = false"
            class="block px-6 py-4 text-sm hover:bg-gray-50">
            {{ l.label }}
            </a>
        </div>
        </header>

        <!-- HERO / LANDING -->
        <section
        id="home"
        class="relative h-screen flex items-center"
        >
        <!-- Background Image -->
        <img
            src=""
            alt="Power Infrastructure"
            class="absolute inset-0 w-full h-full object-cover"
        />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/50"></div>

        <!-- Content -->
        <div class="relative max-w-4xl px-6 md:px-12">
            <h1 class="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
            Reliable Power<br />
            Engineered for the Future
            </h1>

            <p class="text-gray-200 max-w-xl mb-10 text-sm md:text-base">
            Central Energy & Power Resources Inc. delivers dependable electrical
            engineering and power solutions for industries, institutions,
            and critical infrastructure.
            </p>

            <a
            href="#services"
            class="inline-block px-6 py-3 text-sm font-medium
                    bg-yellow-400 text-green-900 rounded
                    hover:bg-yellow-500 transition"
            >
            Explore Our Services
            </a>
        </div>
        </section>

        <!-- ABOUT -->
        <section id="about" class="py-24 bg-white">
        <div class="max-w-5xl mx-auto px-6">
            <h2 class="text-2xl font-semibold text-green-800 mb-6">
            About CENPRI
            </h2>

            <p class="text-lg text-gray-600 leading-relaxed mb-6">
            Central Energy & Power Resources Inc. (CENPRI) is a professionally
            managed power solutions company delivering reliable electrical
            engineering services to commercial, industrial, and institutional
            clients.
            </p>

            <p class="text-lg text-gray-600 leading-relaxed mb-8">
            With a strong focus on safety, compliance, and long-term system
            performance, CENPRI supports mission-critical operations through
            engineering excellence, proven methodologies, and continuous
            improvement.
            </p>

            <button class="text-green-700 font-medium hover:underline mb-14">
            Read more about our company →
            </button>

            <!-- ABOUT CARDS -->
            <div class="grid md:grid-cols-3 gap-8">
            <div class="border rounded-lg p-6">
                <h3 class="text-lg font-medium text-gray-800 mb-2">Our Mission</h3>
                <p class="text-base text-gray-600">
                To deliver safe, reliable, and compliant power solutions
                that support sustainable growth.
                </p>
            </div>

            <div class="border rounded-lg p-6">
                <h3 class="text-lg font-medium text-gray-800 mb-2">Our Vision</h3>
                <p class="text-base text-gray-600">
                To be a trusted power engineering partner for industries
                and institutions nationwide.
                </p>
            </div>

            <div class="border rounded-lg p-6">
                <h3 class="text-lg font-medium text-gray-800 mb-2">Core Values</h3>
                <p class="text-base text-gray-600">
                Safety, integrity, technical excellence, and accountability.
                </p>
            </div>
            </div>
        </div>
        </section>
        <!-- SERVICES -->
        <section id="services" class="py-24 bg-gray-50">
        <div class="max-w-6xl mx-auto px-6">
            <h2 class="text-2xl font-semibold text-green-800 mb-14">
            Our Services
            </h2>

            <div class="grid md:grid-cols-3 gap-10">
            <div
                v-for="s in services"
                :key="s.title"
                class="bg-white border rounded-lg p-8 hover:shadow-md transition"
            >
                <h3 class="text-lg font-medium text-gray-800 mb-3">
                {{ s.title }}
                </h3>
                <p class="text-base text-gray-600 leading-relaxed">
                {{ s.desc }}
                </p>
            </div>
            </div>
        </div>
        </section>
        <!-- EVENTS -->
        <section id="events" class="py-24 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <h2 class="text-2xl font-semibold text-green-800 mb-6">
            Company Events
            </h2>

            <p class="text-lg text-gray-600 max-w-2xl mb-12">
            Highlights of CENPRI’s trainings, project milestones,
            and industry participation.
            </p>

            <div class="grid md:grid-cols-3 gap-8">
            <div class="group">
                <img src="" class="rounded-lg mb-4 object-cover h-56 w-full" />
                <h3 class="text-lg font-medium text-gray-800">
                Safety & Compliance Training
                </h3>
                <p class="text-base text-gray-600">
                Annual internal training on electrical safety standards.
                </p>
            </div>

            <div class="group">
                <img src="" class="rounded-lg mb-4 object-cover h-56 w-full" />
                <h3 class="text-lg font-medium text-gray-800">
                Industry Conference
                </h3>
                <p class="text-base text-gray-600">
                Participation in national power and energy forums.
                </p>
            </div>

            <div class="group">
                <img src="" class="rounded-lg mb-4 object-cover h-56 w-full" />
                <h3 class="text-lg font-medium text-gray-800">
                Project Completion
                </h3>
                <p class="text-base text-gray-600">
                Successful turnover of critical infrastructure projects.
                </p>
            </div>
            </div>
        </div>
        </section>
        <!-- CAREERS -->
        <section id="careers" class="py-24 bg-green-800 text-white">
        <div class="max-w-5xl mx-auto px-6">
            <h2 class="text-2xl font-semibold mb-4">
            Careers at CENPRI
            </h2>

            <p class="text-lg text-green-100 max-w-xl mb-12">
            Be part of a professional team committed to engineering
            excellence, safety, and continuous growth.
            </p>

            <div class="space-y-10">
                <div
                    v-for="job in jobs"
                    :key="job.title"
                    class="border-b border-green-600 pb-6"
                >
                    <h3 class="text-lg font-medium">
                    {{ job.title }}
                    </h3>
                    <p class="text-sm text-green-200 mb-2">
                    {{ job.type }} • {{ job.location }}
                    </p>
                    <p class="text-base text-green-100 max-w-2xl">
                    {{ job.desc }}
                    </p>
                    <button
                    @click="apply(job.title)"
                    class="px-5 py-2 text-sm font-medium
                            bg-yellow-400 text-green-900 rounded
                            hover:bg-yellow-500 transition mt-2"
                    >
                    Apply
                    </button>
                </div>
                
            </div>
        </div>
        </section>
        <!-- CONTACT -->
        <section id="contact" class="py-24 bg-white">
        <div class="max-w-5xl mx-auto px-6">
            <h2 class="text-2xl font-semibold text-green-800 mb-14">
            Contact Us
            </h2>

            <div class="grid md:grid-cols-2 gap-10">
            <div class="border rounded-lg p-8">
                <h3 class="text-lg font-medium text-gray-800 mb-2">
                Bacolod Office
                </h3>
                <p class="text-base text-gray-600 mb-2">
                Bacolod City, Negros Occidental
                </p>
                <p class="text-base text-gray-600">
                📞 +63 900 000 0000<br />
                ✉️ bacolod@cenpri.com
                </p>
            </div>

            <div class="border rounded-lg p-8">
                <h3 class="text-lg font-medium text-gray-800 mb-2">
                Bago Office
                </h3>
                <p class="text-base text-gray-600 mb-2">
                Bago City, Negros Occidental
                </p>
                <p class="text-base text-gray-600">
                📞 +63 900 000 0001<br />
                ✉️ bago@cenpri.com
                </p>
            </div>
            </div>
        </div>
        </section>



        <!-- FOOTER -->
        <footer class="py-8 text-center text-xs text-gray-400 border-t">
        © 2025 Central Energy & Power Resources Inc.
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const mobileOpen = ref(false);
const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 40;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const links = [
  { id: 1, label: "Home", href: "#home" },
  { id: 2, label: "About", href: "#about" },
  { id: 3, label: "Services", href: "#services" },
  { id: 4, label: "Careers", href: "#careers" }
];

const services = [
  {
    title: "Electrical Engineering",
    desc: "Design, analysis, and review of compliant power systems."
  },
  {
    title: "Installation & Commissioning",
    desc: "Safe execution and system validation for critical facilities."
  },
  {
    title: "Operations & Maintenance",
    desc: "Preventive maintenance and long-term system reliability."
  }
];

const jobs = [
  {
    title: "Electrical Engineer",
    type: "Full-time",
    location: "On-site",
    desc: "Responsible for system design, testing, and documentation."
  },
  {
    title: "Project Coordinator",
    type: "Contract",
    location: "Hybrid",
    desc: "Coordinates schedules, reports, and stakeholder communication."
  }
];
</script>
