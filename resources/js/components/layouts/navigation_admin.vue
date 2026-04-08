<template>
	<div class="flex min-h-screen text-gray-700">
		<div v-if="sidebarOpen" class="fixed inset-0 bg-black/30 z-40" @click="closeOverlays"
			>
		</div>
		<!-- SIDEBAR -->
		<aside :class="[ 'fixed inset-y-0 left-0 z-40 w-60 border-l bg-white  text-gray-200 transform transition-transform duration-300 md:translate-x-0',
			sidebarOpen ? 'translate-x-0' : '-translate-x-full' ]" >
			<!-- Logo -->
			<div class="h-16 flex items-center px-6 border-b">
				<div class="flex items-center gap-2">
					<div class="h-9 w-9 flex items-center justify-center rounded-lg bg-green-900 text-white font-bold">
						H
					</div>
					<span class="text-3xl font-extrabold tracking-wide text-green-900">
						HRIS
					</span>
				</div>

				<button class="md:hidden ml-auto text-gray-400 hover:text-gray-600" @click="sidebarOpen = false"  > 
                    ✕
				</button>
			</div>

			<div class="px-4 py-4 ">
				<div class="relative">
					<input
					type="text"
					placeholder="Search menu..."
					class="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-900
							focus:outline-none focus:ring-1 focus:ring-green-800 focus:border-green-800"
					/>
					<svg
					class="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					>
					<path stroke-linecap="round" stroke-linejoin="round"
						d="M21 21l-4.35-4.35M16.65 10.825A5.825 5.825 0 1110.825 5a5.825 5.825 0 015.825 5.825z" />
					</svg>
				</div>
			</div>

			<!-- Navigation -->
			<nav class="flex-1 flex flex-col space-y-2 pb-3 px-2 text-sm">
				<!-- Dashboard -->
				<a href="/admin/dashboard" class="menu-link">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
					viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round"
					d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m4 0h5a1 1 0 001-1V10" />
				</svg>
				Dashboard
				</a>
				<a href="/admin/applicants" class="menu-link" >
					<UserIcon class="size-5"></UserIcon>
					Applicants 
				</a> 
				<hr>
				<!-- HR Masterfile Dropdown -->
				<div>
					<button
						@click="masterfileOpen = !masterfileOpen"
						class="w-full flex items-center justify-between menu-link"
					>
						<span class="flex items-center gap-3">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
							viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
						</svg>
						HR Masterfile
						</span>
						<svg
						class="w-4 h-4 transform transition-transform"
						:class="{ 'rotate-180': masterfileOpen }"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
						>
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					<transition name="fade">
						<div v-if="masterfileOpen" class="ml-6 mt-1 flex flex-col space-y-1">
							<a href="/admin/employee_list" class="submenu-link">Employees</a>
							<a href="#" class="submenu-link">Departments</a>
							<a href="#" class="submenu-link">Positions</a>
							<a href="#" class="submenu-link">Employment Type</a>
							<a href="#" class="submenu-link">Salary Grades</a>
							<a href="#" class="submenu-link">Users & Roles</a>
						</div>
					</transition>
				</div>
				<a href="/admin/employee_list" class="menu-link" >
					<UserGroupIcon class="size-5"></UserGroupIcon>
					Employees 
				</a> 
				
				<!-- Attendance --> 
				<a href="#" class="menu-link" >
					<CalendarIcon class="size-5"></CalendarIcon> Attendance 
				</a> 
				<!-- Payroll --> 
				<a href="#" class="menu-link" > 
					<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> 
						<path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a5 5 0 00-10 0v2M5 11h14v10H5z" /> 
					</svg> Payroll 
				</a> 
				<!-- Reports --> 
				<a href="#" class="menu-link" > 
					<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> 
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-6m4 6V7m4 10v-4" /> 
					</svg> Reports 
				</a> 
				<!-- Settings --> 
				<a href="#" class="menu-link flex items-center gap-2">
					<svg 
						xmlns="http://www.w3.org/2000/svg"
						class="w-5 h-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path 
							stroke-linecap="round" 
							stroke-linejoin="round" 
							d="M11.983 3.06c.414-1.343 2.32-1.343 2.734 0a1.724 1.724 0 002.573 1.066c1.18-.73 2.653.743 1.923 1.923a1.724 1.724 0 001.066 2.573c1.343.414 1.343 2.32 0 2.734a1.724 1.724 0 00-1.066 2.573c.73 1.18-.743 2.653-1.923 1.923a1.724 1.724 0 00-2.573 1.066c-.414 1.343-2.32 1.343-2.734 0a1.724 1.724 0 00-2.573-1.066c-1.18.73-2.653-.743-1.923-1.923a1.724 1.724 0 00-1.066-2.573c-1.343-.414-1.343-2.32 0-2.734a1.724 1.724 0 001.066-2.573c-.73-1.18.743-2.653 1.923-1.923a1.724 1.724 0 002.573-1.066z"
						/>
						<circle cx="13" cy="10" r="3" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					System Settings
				</a>
			</nav>
		</aside>

		<!-- MAIN CONTENT -->
		<div class="flex-1 md:ml-60 border-l  ">
		<!-- TOP BAR -->
			<header class="bg-white sticky top-0 z-30 h-16 flex items-center justify-between px-6 border-b">
				<button class="md:hidden text-2xl" @click="sidebarOpen = !sidebarOpen">
				☰
				</button>

				<h1 class="text-lg font-semibold text-slate-800">Dashboard</h1>

				<div class="flex items-center gap-4">
				<!-- Notifications -->
				<div class="relative" ref="notificationRef">
					<button @click="toggleNotifications" class="relative">
					<svg class="w-6 h-6 text-gray-600 hover:text-gray-800" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
					</svg>
					<span v-if="notifications.length > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
						{{ notificationCount }}
					</span>
					</button>

					<!-- Notification Dropdown -->
					<transition name="fade">
						<div v-if="notificationsOpen" class="absolute right-0 mt-2 w-80 bg-white shadow-lg border border-gray-200 z-50">
							<div class="p-4 font-semibold border-b border-gray-100">Notifications</div>
							<div class="max-h-60 overflow-y-auto">
								<div v-for="note in notifications" :key="note.id" class="p-3 hover:bg-green-900 hover:font-semibold hover:shadow-sm font-medium text-gray-600 cursor-pointer">
									<p class="text-sm text-gray-700">{{ note.text }}</p>
									<span class="text-xs text-gray-400">{{ note.time }}</span>
								</div>
							</div>
							<div class="p-2 text-center text-sm text-blue-600 cursor-pointer  hover:bg-green-900 hover:font-semibold hover:shadow-sm font-medium text-gray-600">View All</div>
						</div>
					</transition>
				</div>

				<!-- Profile -->
				<span class="text-sm text-gray-600 hidden md:inline">Admin</span>
				<div class="h-9 w-9 rounded-full bg-slate-300"></div>
				</div>
			</header>
			<!-- CONTENT -->
			<main class="p-6 space-y-6  rounded-xl">

                <slot/>

			</main>

		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted, onUnmounted } from "vue";
	import { UserIcon, UserGroupIcon, CalendarIcon } from "@heroicons/vue/24/outline";

	const sidebarOpen = ref(false);
	const masterfileOpen = ref(false);

	// Example notifications
	const notifications = ref([
	{ id: 1, text: "New employee added", time: "1h ago" },
	{ id: 2, text: "Payroll processed", time: "3h ago" },
	{ id: 3, text: "Department updated", time: "1d ago" },
	// Add more notifications as needed
	]);

	// Computed max 99+ badge
	const notificationCount = computed(() =>
	notifications.value.length > 99 ? "99+" : notifications.value.length
	);


	const notificationsOpen = ref(false);
	const notificationRef = ref(null);

	const toggleNotifications = () => {
	notificationsOpen.value = !notificationsOpen.value;
	};

	const handleClickOutside = (event) => {
	if (
		notificationsOpen.value &&
		notificationRef.value &&
		!notificationRef.value.contains(event.target)
	) {
		notificationsOpen.value = false;
	}
	};

	onMounted(() => {
	document.addEventListener("click", handleClickOutside);
	});

	onUnmounted(() => {
	document.removeEventListener("click", handleClickOutside);
	});
	const closeOverlays = () => {
		sidebarOpen.value = false;
	};
</script>

