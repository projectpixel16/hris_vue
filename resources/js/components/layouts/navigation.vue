<template>
	<div class="min-h-screen bg-gray-50 text-gray-800">

		<!-- TOP NAV -->
		<header class="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
		<div class="flex items-center justify-between h-16 px-6">

			<!-- Logo -->
			<span class="text-lg font-bold whitespace-nowrap">MyWebsite</span>

			<!-- Desktop Menu -->
			<nav class="hidden md:flex items-center gap-6">
			<!-- Static links -->
			<a
				v-for="item in staticMenu"
				:key="item.name"
				href="#"
				class="flex items-center gap-2 hover:text-gray-300 transition"
			>
				<component :is="item.icon" class="w-5 h-5" />
				<span>{{ item.name }}</span>
			</a>

			<!-- Dropdown 1 -->
			<div class="relative group">
				<button
				@click="toggleDropdown('services')"
				class="flex items-center gap-2 hover:text-gray-300 transition"
				>
				<Briefcase class="w-5 h-5" />
				<span>Services</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-4 h-4 transform transition-transform duration-200"
					:class="{ 'rotate-90': dropdowns.services }"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
				</button>

				<!-- Dropdown -->
				<transition name="dropdown">
				<ul
					v-show="dropdowns.services"
					class="absolute left-0 mt-2 w-40 bg-gray-800 shadow-lg rounded border border-gray-700 overflow-hidden"
				>
					<li><a href="#" class="block px-4 py-2 hover:bg-gray-700">Web Design</a></li>
					<li><a href="#" class="block px-4 py-2 hover:bg-gray-700">Marketing</a></li>
					<li><a href="#" class="block px-4 py-2 hover:bg-gray-700">Consulting</a></li>
				</ul>
				</transition>
			</div>

			<!-- Dropdown 2 -->
			<div class="relative group">
				<button
				@click="toggleDropdown('reports')"
				class="flex items-center gap-2 hover:text-gray-300 transition"
				>
				<Info class="w-5 h-5" />
				<span>Reports</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-4 h-4 transform transition-transform duration-200"
					:class="{ 'rotate-90': dropdowns.reports }"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
				</button>

				<!-- Dropdown -->
				<transition name="dropdown">
				<ul
					v-show="dropdowns.reports"
					class="absolute left-0 mt-2 w-40 bg-gray-800 shadow-lg rounded border border-gray-700 overflow-hidden"
				>
					<li><a href="#" class="block px-4 py-2 hover:bg-gray-700">Sales</a></li>
					<li><a href="#" class="block px-4 py-2 hover:bg-gray-700">Performance</a></li>
				</ul>
				</transition>
			</div>
			</nav>

			<!-- Mobile Menu Toggle -->
			<button
			@click="mobileOpen = !mobileOpen"
			class="p-2 rounded-md text-gray-300 hover:bg-gray-700 md:hidden"
			>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
				viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M4 6h16M4 12h16m-7 6h7" />
			</svg>
			</button>
		</div>

		<!-- Mobile Dropdown -->
		<transition name="dropdown">
			<div
			v-show="mobileOpen"
			class="md:hidden bg-gray-800 border-t border-gray-700"
			>
			<!-- Static links -->
			<a
				v-for="item in staticMenu"
				:key="item.name"
				href="#"
				class="block px-6 py-3 hover:bg-gray-700 flex items-center gap-3"
			>
				<component :is="item.icon" class="w-5 h-5" />
				<span>{{ item.name }}</span>
			</a>

			<!-- Services -->
			<button
				@click="toggleDropdown('services')"
				class="w-full text-left px-6 py-3 hover:bg-gray-700 flex items-center justify-between"
			>
				<span>Services</span>
				<span v-if="dropdowns.services">▲</span>
				<span v-else>▼</span>
			</button>

			<div v-show="dropdowns.services" class="pl-8 bg-gray-700">
				<a href="#" class="block py-2">Web Design</a>
				<a href="#" class="block py-2">Marketing</a>
				<a href="#" class="block py-2">Consulting</a>
			</div>

			<!-- Reports -->
			<button
				@click="toggleDropdown('reports')"
				class="w-full text-left px-6 py-3 hover:bg-gray-700 flex items-center justify-between"
			>
				<span>Reports</span>
				<span v-if="dropdowns.reports">▲</span>
				<span v-else>▼</span>
			</button>

			<div v-show="dropdowns.reports" class="pl-8 bg-gray-700">
				<a href="#" class="block py-2">Sales</a>
				<a href="#" class="block py-2">Performance</a>
			</div>
			</div>
		</transition>
		</header>

		<!-- MAIN CONTENT -->
		<main class="pt-20 p-6">
		<slot />
		</main>
	</div>
</template>

<script setup>
import { ref } from "vue"
import { Home, Info, Briefcase, Phone } from "lucide-vue-next"

const mobileOpen = ref(false)

const dropdowns = ref({
  services: false,
  reports: false,
})

const toggleDropdown = (menu) => {
  dropdowns.value[menu] = !dropdowns.value[menu]
}

const staticMenu = [
  { name: "Home", icon: Home },
  { name: "Contact", icon: Phone },
]
</script>

<style scoped>
/* Smooth dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.dropdown-enter-from,
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-5px);
}
.dropdown-enter-to,
.dropdown-leave-from {
  max-height: 200px;
  opacity: 1;
  transform: translateY(0);
}
</style>
