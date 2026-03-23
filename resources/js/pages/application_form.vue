<template>
    <div class="min-h-screen bg-gray-50 text-gray-700">

      <!-- HERO HEADER -->
	<section class="bg-green-900 text-white py-16">
	<div class="max-w-4xl mx-auto px-6">
		<p class="text-sm text-green-200">CENPRI Careers</p>
		<h1 class="text-3xl md:text-4xl font-semibold mt-2">
		Application Form
		</h1>
		<p class="text-green-200 mt-2">
		Complete the form below to apply for {{ position }}
		</p>
	</div>
	</section>

      <!-- FORM CONTAINER -->
	<section class="py-14">
	<div class="max-w-4xl mx-auto px-6">

		<!-- PROGRESS -->
		<div class="mb-10">
		<div class="flex justify-between text-xs font-medium mb-2">
			<span
			v-for="(step, index) in steps"
			:key="index"
			:class="currentStep >= index ? 'text-green-800' : 'text-gray-400'"
			>
			{{ step }}
			</span>
		</div>

		<div class="w-full bg-gray-200 h-2 rounded-full">
			<div
			class="bg-green-800 h-2 rounded-full transition-all"
			:style="{ width: progressWidth + '%' }"
			></div>
		</div>
		</div>

		<!-- CARD -->
		<div class="bg-white rounded-xl shadow p-8">

		<!-- STEP 1 PERSONAL -->
		<div v-if="currentStep === 0">
			<h2 class="card-title">Personal Data</h2>
			<div class="grid md:grid-cols-2 gap-6">
			<input v-model="form.firstName" placeholder="First Name" class="input-style" />
			<input v-model="form.lastName" placeholder="Last Name" class="input-style" />
			<input v-model="form.birthDate" type="date" class="input-style" />
			<input v-model="form.contact" placeholder="Contact Number" class="input-style" />
			<input v-model="form.email" type="email" placeholder="Email Address" class="input-style md:col-span-2" />
			<input v-model="form.address" placeholder="Complete Address" class="input-style md:col-span-2" />
			</div>
		</div>

		<!-- STEP 2 FAMILY -->
		<div v-if="currentStep === 1">
			<h2 class="card-title">Family Background</h2>
			<div class="grid md:grid-cols-2 gap-6">
			<input v-model="form.fatherName" placeholder="Father's Name" class="input-style" />
			<input v-model="form.motherName" placeholder="Mother's Name" class="input-style" />
			<input v-model="form.spouse" placeholder="Spouse (if married)" class="input-style md:col-span-2" />
			</div>
		</div>

		<!-- STEP 3 EDUCATION -->
		<div v-if="currentStep === 2">
			<h2 class="card-title">Educational Background</h2>
			<div class="space-y-4">
			<input v-model="form.college" placeholder="College / University" class="input-style" />
			<input v-model="form.course" placeholder="Course" class="input-style" />
			<input v-model="form.yearGraduated" placeholder="Year Graduated" class="input-style" />
			</div>
		</div>

		<!-- STEP 4 EMPLOYMENT -->
		<div v-if="currentStep === 3">
			<h2 class="card-title">Employment History</h2>
			<div class="space-y-4">
			<input v-model="form.company" placeholder="Previous Company" class="input-style" />
			<input v-model="form.positionHeld" placeholder="Position Held" class="input-style" />
			<input v-model="form.employmentPeriod" placeholder="Employment Period" class="input-style" />
			</div>
		</div>

		<!-- STEP 5 TRAININGS -->
		<div v-if="currentStep === 4">
			<h2 class="card-title">Trainings & Seminars</h2>
			<input v-model="form.training" placeholder="Training / Seminar Attended" class="input-style" />
		</div>

		<!-- STEP 6 ADDITIONAL -->
		<div v-if="currentStep === 5">
			<h2 class="card-title">Additional Information</h2>
			<div class="grid md:grid-cols-2 gap-6">
			<input v-model="form.tin" placeholder="TIN" class="input-style" />
			<input v-model="form.sss" placeholder="SSS" class="input-style" />
			<input v-model="form.philhealth" placeholder="PhilHealth" class="input-style" />
			<input v-model="form.pagibig" placeholder="Pag-IBIG" class="input-style" />
			</div>
		</div>

		<!-- STEP 7 CHARACTER -->
		<div v-if="currentStep === 6">
			<h2 class="card-title">Character Reference</h2>
			<div class="space-y-4">
			<input v-model="form.referenceName" placeholder="Reference Name" class="input-style" />
			<input v-model="form.referenceContact" placeholder="Contact Number" class="input-style" />
			<input v-model="form.referenceCompany" placeholder="Company / Relationship" class="input-style" />
			</div>
		</div>

		<!-- NAVIGATION -->
		<div class="flex justify-between mt-10">
			<button
			v-if="currentStep > 0"
			@click="prevStep"
			class="px-4 py-2 border rounded-lg hover:bg-gray-100"
			>
			Back
			</button>

			<div class="ml-auto">
			<button
				v-if="currentStep < steps.length - 1"
				@click="nextStep"
				class="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900"
			>
				Next
			</button>

			<button
				v-else
				@click="showReview = true"
				class="px-6 py-2 bg-yellow-400 text-green-900 font-medium rounded-lg hover:bg-yellow-500"
			>
				Review Application
			</button>
			</div>
		</div>

		</div>
	</div>
	</section>

      <!-- REVIEW MODAL -->
      <div v-if="showReview" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-8 w-[700px] max-h-[80vh] overflow-y-auto shadow-xl">
          <h2 class="text-xl font-semibold mb-4">Review Your Application</h2>

          <div class="space-y-4 text-sm">
            <div><strong>Full Name:</strong> {{ form.firstName }} {{ form.lastName }}</div>
            <div><strong>Email:</strong> {{ form.email }}</div>
            <div><strong>Contact:</strong> {{ form.contact }}</div>
            <div><strong>Education:</strong> {{ form.college }} - {{ form.course }}</div>
            <div><strong>Previous Company:</strong> {{ form.company }}</div>
            <div><strong>Reference:</strong> {{ form.referenceName }}</div>
          </div>

          <div class="flex justify-end gap-4 mt-6">
            <button
              @click="showReview = false"
              class="px-4 py-2 border rounded-lg"
            >
              Edit
            </button>

            <button
              @click="submitApplication"
              class="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900"
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>

    </div>
</template>

<script setup>
	import { ref, computed } from "vue";
	import { useRoute } from "vue-router";

	const route = useRoute();
	const position = route.query.position || "Open Position";

	const steps = [  
		"Personal",
		"Family",
		"Education",
		"Employment",
		"Trainings",
		"Additional",
		"Reference"
	];

	const currentStep = ref(0);
	const showReview = ref(false);

	const form = ref({
	firstName: "",
	lastName: "",
	birthDate: "",
	contact: "",
	email: "",
	address: "",
	fatherName: "",
	motherName: "",
	spouse: "",
	college: "",
	course: "",
	yearGraduated: "",
	company: "",
	positionHeld: "",
	employmentPeriod: "",
	training: "",
	tin: "",
	sss: "",
	philhealth: "",
	pagibig: "",
	referenceName: "",
	referenceContact: "",
	referenceCompany: ""
	});

	const nextStep = () => currentStep.value++;
	const prevStep = () => currentStep.value--;

	const progressWidth = computed(() =>
	((currentStep.value + 1) / steps.length) * 100
	);

	const submitApplication = () => {
	console.log("Submitted:", form.value);
	showReview.value = false;
	};
</script>

<style>
	.input-style {
	@apply w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-800;
	}

	.card-title {
	@apply text-lg font-semibold mb-6;
	}
</style>