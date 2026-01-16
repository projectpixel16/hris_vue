<template>
	<navigation>
		<!-- Stats Cards -->
		<div class="grid md:grid-cols-4 gap-6">
			<div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
			<p class="text-gray-500 text-sm">Total Employees</p>
			<p class="text-2xl font-bold text-gray-800">248</p>
			</div>
			<div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
			<p class="text-gray-500 text-sm">Departments</p>
			<p class="text-2xl font-bold text-gray-800">12</p>
			</div>
			<div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
			<p class="text-gray-500 text-sm">On Leave</p>
			<p class="text-2xl font-bold text-gray-800">8</p>
			</div>
			<div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
			<p class="text-gray-500 text-sm">Open Positions</p>
			<p class="text-2xl font-bold text-gray-800">5</p>
			</div>
		</div>

		<!-- Recent Employee Activity Table -->
		<div class="bg-white rounded-xl shadow p-6">
			<h2 class="text-base font-semibold mb-4">
			Recent Employee Activity
			</h2>

			<!-- Example Table -->
			<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead>
				<tr class="bg-gray-50">
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
					Name
					</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
					Department
					</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
					Status
					</th>
					<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
					Last Login
					</th>
				</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">IT</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">Active</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-11 08:30</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">HR</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">On Leave</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-10 17:45</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">IT</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">Active</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-11 08:30</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">HR</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">On Leave</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-10 17:45</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">IT</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">Active</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-11 08:30</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">HR</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">On Leave</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-10 17:45</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">IT</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">Active</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-11 08:30</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">HR</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">On Leave</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-10 17:45</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">IT</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">Active</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-11 08:30</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">HR</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">On Leave</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-10 17:45</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">IT</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">Active</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-11 08:30</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">HR</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">On Leave</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-10 17:45</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">IT</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">Active</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-11 08:30</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">HR</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">On Leave</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-10 17:45</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">IT</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">Active</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-11 08:30</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">HR</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">On Leave</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-10 17:45</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">IT</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">Active</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-11 08:30</td>
				</tr>
				<tr>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">HR</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">On Leave</td>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-10 17:45</td>
				</tr>

				<!-- Add more rows dynamically -->
				</tbody>
			</table>
			</div>
		</div>
	</navigation>
</template>

<script setup>
	import { ref } from "vue";
	import navigation from "../components/layouts/navigation_admin.vue";
</script>
