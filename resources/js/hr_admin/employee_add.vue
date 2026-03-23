<template>
    <navigation>
        <div class="flex justify-between mb-6">
            <div>
                <h1 class="text-2xl font-semibold text-gray-800">
                    Add New Employee
                </h1>
                <p class="text-sm text-gray-500">
                    Complete the employee information below
                </p>
            </div>
            <div>
                <button
                    @click="resetForm"
                    class="p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-600  hover:text-white  flex items-center justify-center"
                    title="Reset Form"
                >
                    <!-- Heroicons Refresh Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>

                </button>
            </div>
        </div>
        
        <transition
            enter-active-class="transition transform duration-300"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition transform duration-300"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-4"
            >
            <div
                v-if="savedToast"
                class="fixed top-12 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
            >
                Progress saved!
            </div>
        </transition>
        <!-- STICKY STEPPER -->
        <div
        class="sticky top-[72px] z-20 w-full px-0 sm:px-0 transition-all duration-500 ease-in-out !mt-0"
        :class="isScrolled ? 'py-2' : 'py-0'"
        >
            <div
                class="transition-all duration-500 ease-in-out mx-auto w-full max-w-full overflow-hidden"
                :class="isScrolled
                ? 'bg-white/30 backdrop-blur-md shadow-md rounded-full px-4 sm:px-6 py-3 !w-72'
                : 'bg-white rounded-full px-0 sm:px-0 '"
            >
                <!-- ===== NORMAL LARGE STEPPER ===== -->
                <div v-if="!isScrolled" class="relative flex items-center justify-between w-full">
                <!-- Base Line -->
                <div class="absolute left-0 right-0 top-4 h-[3px] bg-gray-200 rounded-full"></div>

                <!-- Active Line -->
                <div
                    class="absolute left-0 top-4 h-[3px] bg-indigo-500 rounded-full transition-all duration-500 ease-in-out"
                    :style="{ width: progressWidth + '%' }"
                ></div>

                <!-- Steps -->
                <div
                    v-for="(step, index) in steps"
                    :key="index"
                    class="relative flex flex-col items-center flex-1 min-w-[30px]"
                >
                    <div
                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ease-in-out"
                    :class="currentStep >= index
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-400'"
                    >
                    {{ index + 1 }}
                    </div>

                    <span
                    class="text-xs mt-2 transition-colors duration-300 ease-in-out"
                    :class="currentStep >= index
                        ? 'text-indigo-600 font-medium'
                        : 'text-gray-400'"
                    >
                    {{ step }}
                    </span>
                </div>
                </div>

                <!-- ===== MINIMAL GLASS VERSION ===== -->
                <div v-else class="flex items-center gap-3 sm:gap-4 w-full">
                <span class="text-xs font-medium text-gray-700 whitespace-nowrap">
                    Step {{ currentStep + 1 }} of {{ steps.length }}
                </span>

                <div class="flex-1 bg-white/40 rounded-full h-2 overflow-hidden">
                    <div
                    class="bg-indigo-500 h-2 rounded-full transition-all duration-500 ease-in-out"
                    :style="{ width: progressWidth + '%' }"
                    ></div>
                </div>

                <span class="text-xs text-gray-600 min-w-[30px] text-right">
                    {{ Math.round(progressWidth) }}%
                </span>
                </div>
            </div>
        </div>
        <!-- CARD CONTAINER -->
        <div class="bg-white rounded-xl shadow p-6">

            <!-- PERSONAL DATA -->
            <div v-if="currentStep === 0" class="space-y-8">

                <h2 class="text-xl font-bold text-gray-800">
                    APPLICATION FOR EMPLOYMENT
                </h2>

                <!-- ================= POSITION DETAILS ================= -->
                <div class="space-y-4">
                    <h3 class="font-semibold text-gray-700">Position Details</h3>

                    <div class="grid md:grid-cols-2 gap-4">

                        <!-- Position Applied -->
                        <div class="relative">
                            <input v-model="form.positionApplied"
                                type="text"
                                class="peer floating-input"
                                @blur="validateField('positionApplied', form.positionApplied)"
                                :class="errors.positionApplied ? 'input-error' : ''" />

                            <label :class="[
                                'floating-label',
                                form.positionApplied ? 'floating-active' : '',
                                errors.positionApplied ? 'label-error' : ''
                            ]">
                                Position Applied For *
                            </label>
                        </div>

                        <div class="relative">
                            <select v-model="form.company"
                                class="peer floating-input appearance-none"
                                @blur="validateField('company', form.company)"
                                :class="errors.company ? 'input-error' : ''">

                                <option value="" disabled></option>
                                <option>Company A</option>
                                <option>Company B</option>
                            </select>

                            <label :class="[
                                'floating-label',
                                form.company ? 'floating-active' : '',
                                errors.company ? 'label-error' : ''
                            ]">
                                Company *
                            </label>
                        </div>
                        <div class="grid md:grid-cols-2 gap-4">
                            <!-- Date Applied -->
                            <div class="relative">
                                <input v-model="form.dateApplied"
                                    type="date"
                                    class="peer floating-input"
                                    @blur="validateField('dateApplied', form.dateApplied)"
                                    :class="errors.dateApplied ? 'input-error' : ''" />

                                <label :class="[
                                    'floating-label',
                                    form.dateApplied ? 'floating-active' : '',
                                    errors.dateApplied ? 'label-error' : ''
                                ]">
                                    Date Applied *
                                </label>
                            </div>

                            <!-- Date Available -->
                            <div class="relative">
                                <input v-model="form.dateAvailable"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="[
                                    'floating-label',
                                    form.dateAvailable ? 'floating-active' : ''
                                ]">
                                    Date Available
                                </label>
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 gap-4">
                            <!-- Expected Salary From -->
                            <div class="relative">
                                <input v-model="form.expectedSalaryFrom"
                                    type="text"
                                    class="peer floating-input" />
                                <label :class="[
                                    'floating-label',
                                    form.expectedSalaryFrom ? 'floating-active' : ''
                                ]">
                                    Expected Salary From
                                </label>
                            </div>

                            <!-- Expected Salary To -->
                            <div class="relative">
                                <input v-model="form.expectedSalaryTo"
                                    type="text"
                                    class="peer floating-input" />
                                <label :class="[
                                    'floating-label',
                                    form.expectedSalaryTo ? 'floating-active' : ''
                                ]">
                                    Expected Salary To
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ================= PERSONAL DATA ================= -->
                <div class="space-y-4">
                    <h3 class="font-semibold text-gray-700">Personal Data</h3>

                    <div class="grid md:grid-cols-2 gap-4">

                        <!-- Last Name -->
                        <div class="relative">
                            <input v-model="form.lastName"
                                class="peer floating-input"
                                @blur="validateField('lastName', form.lastName)"
                                :class="errors.lastName ? 'input-error' : ''" />
                            <label :class="[
                                'floating-label',
                                form.lastName ? 'floating-active' : '',
                                errors.lastName ? 'label-error' : ''
                            ]">
                                Last Name *
                            </label>
                        </div>

                        <!-- First Name -->
                        <div class="relative">
                            <input v-model="form.firstName"
                                class="peer floating-input"
                                @blur="validateField('firstName', form.firstName)"
                                :class="errors.firstName ? 'input-error' : ''" />
                            <label :class="[
                                'floating-label',
                                form.firstName ? 'floating-active' : '',
                                errors.firstName ? 'label-error' : ''
                            ]">
                                First Name *
                            </label>
                        </div>

                        <!-- Middle Name -->
                        <div class="relative">
                            <input v-model="form.middleName"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.middleName ? 'floating-active' : ''
                            ]">
                                Middle Name
                            </label>
                        </div>

                        <!-- Name Ext -->
                        <div class="relative">
                            <input v-model="form.nameExt"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.nameExt ? 'floating-active' : ''
                            ]">
                                Name Extension
                            </label>
                        </div>

                    </div>

                    <!-- More Personal -->
                    <div class="grid md:grid-cols-3 gap-4">

                        <!-- Date of Birth -->
                        <div class="relative">
                            <input v-model="form.dateOfBirth"
                                type="date"
                                class="peer floating-input"
                                @blur="validateField('dateOfBirth', form.dateOfBirth)"
                                :class="errors.dateOfBirth ? 'input-error' : ''" />
                            <label :class="[
                                'floating-label',
                                form.dateOfBirth ? 'floating-active' : '',
                                errors.dateOfBirth ? 'label-error' : ''
                            ]">
                                Date of Birth *
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.placeOfBirth"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.placeOfBirth ? 'floating-active' : ''
                            ]">
                                Place of Birth
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.contactNumber"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.contactNumber ? 'floating-active' : ''
                            ]">
                                Contact Number
                            </label>
                        </div>

                    </div>

                    <!-- Selects -->
                    <div class="grid md:grid-cols-4 gap-4">

                        <div class="relative">
                            <select v-model="form.sex"
                                class="peer floating-input appearance-none"
                                @blur="validateField('sex', form.sex)"
                                :class="errors.sex ? 'input-error' : ''">
                                <option value="" disabled></option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <label :class="[
                                'floating-label',
                                form.sex ? 'floating-active' : '',
                                errors.sex ? 'label-error' : ''
                            ]">
                                Sex *
                            </label>
                        </div>

                        <div class="relative">
                            <select v-model="form.civilStatus"
                                class="peer floating-input appearance-none"
                                @blur="validateField('civilStatus', form.civilStatus)"
                                :class="errors.civilStatus ? 'input-error' : ''">
                                <option value="" disabled></option>
                                <option>Single</option>
                                <option>Married</option>
                                <option>Widowed</option>
                            </select>
                            <label :class="[
                                'floating-label',
                                form.civilStatus ? 'floating-active' : '',
                                errors.civilStatus ? 'label-error' : ''
                            ]">
                                Civil Status *
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.nationality"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.nationality ? 'floating-active' : ''
                            ]">
                                Nationality
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.religion"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.religion ? 'floating-active' : ''
                            ]">
                                Religion
                            </label>
                        </div>

                    </div>
                </div>
                
                <!-- ADDRESS --> 
                <div class="space-y-4">
                    <h3 class="font-semibold text-gray-700">
                        Present Address
                    </h3>

                    <div class="grid md:grid-cols-2 gap-4">

                        <!-- Present Province -->
                        <div class="relative">
                            <select
                                v-model="form.presentProvince"
                                class="peer floating-input appearance-none"
                                @blur="validateField('presentProvince', form.presentProvince)"
                                :class="errors.presentProvince ? 'input-error' : ''"
                            >
                                <option value="" disabled></option>
                                <option>Cebu</option>
                                <option>Manila</option>
                                <option>Davao</option>
                            </select>

                            <label :class="[
                                'floating-label',
                                form.presentProvince ? 'floating-active' : '',
                                errors.presentProvince ? 'label-error' : ''
                            ]">
                                Province *
                            </label>
                        </div>

                        <!-- Present City -->
                        <div class="relative">
                            <select
                                v-model="form.presentCity"
                                class="peer floating-input appearance-none"
                                @blur="validateField('presentCity', form.presentCity)"
                                :class="errors.presentCity ? 'input-error' : ''"
                            >
                                <option value="" disabled></option>
                                <option>Cebu City</option>
                                <option>Mandaue</option>
                                <option>Lapu-Lapu</option>
                            </select>

                            <label :class="[
                                'floating-label',
                                form.presentCity ? 'floating-active' : '',
                                errors.presentCity ? 'label-error' : ''
                            ]">
                                City *
                            </label>
                        </div>

                    </div>

                    <!-- Present Complete Address -->
                    <div class="relative">
                        <input
                            v-model="form.presentAddress"
                            class="peer floating-input"
                            @blur="validateField('presentAddress', form.presentAddress)"
                            :class="errors.presentAddress ? 'input-error' : ''"
                        />

                        <label :class="[
                            'floating-label',
                            form.presentAddress ? 'floating-active' : '',
                            errors.presentAddress ? 'label-error' : ''
                        ]">
                            Complete Address *
                        </label>
                    </div>
                </div>
                <div class="space-y-4">
                    <h3 class="font-semibold text-gray-700">
                        Permanent / Home Address
                    </h3>

                    <div class="grid md:grid-cols-2 gap-4">

                        <!-- Permanent Province -->
                        <div class="relative">
                            <select
                                v-model="form.permanentProvince"
                                class="peer floating-input appearance-none"
                                @blur="validateField('permanentProvince', form.permanentProvince)"
                                :class="errors.permanentProvince ? 'input-error' : ''"
                            >
                                <option value="" disabled></option>
                                <option>Cebu</option>
                                <option>Manila</option>
                                <option>Davao</option>
                            </select>

                            <label :class="[
                                'floating-label',
                                form.permanentProvince ? 'floating-active' : '',
                                errors.permanentProvince ? 'label-error' : ''
                            ]">
                                Province *
                            </label>
                        </div>

                        <!-- Permanent City -->
                        <div class="relative">
                            <select
                                v-model="form.permanentCity"
                                class="peer floating-input appearance-none"
                                @blur="validateField('permanentCity', form.permanentCity)"
                                :class="errors.permanentCity ? 'input-error' : ''"
                            >
                                <option value="" disabled></option>
                                <option>Cebu City</option>
                                <option>Mandaue</option>
                                <option>Lapu-Lapu</option>
                            </select>

                            <label :class="[
                                'floating-label',
                                form.permanentCity ? 'floating-active' : '',
                                errors.permanentCity ? 'label-error' : ''
                            ]">
                                City *
                            </label>
                        </div>

                    </div>

                    <!-- Complete Address -->
                    <div class="relative">
                        <input
                            v-model="form.permanentAddress"
                            class="peer floating-input"
                            @blur="validateField('permanentAddress', form.permanentAddress)"
                            :class="errors.permanentAddress ? 'input-error' : ''"
                        />

                        <label :class="[
                            'floating-label',
                            form.permanentAddress ? 'floating-active' : '',
                            errors.permanentAddress ? 'label-error' : ''
                        ]">
                            Complete Address *
                        </label>
                    </div>
                </div>
            </div>

            <!-- FAMILY BACKGROUND -->
            <div v-if="currentStep === 1">
                <div class="space-y-4">

                    <h3 class="font-semibold text-gray-700">Family Background</h3>

                    <!-- ================= FATHER ================= -->
                    <div class="grid md:grid-cols-3 gap-4">

                        <div class="relative">
                            <input v-model="form.fatherName"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.fatherName ? 'floating-active' : ''
                            ]">
                                Father's Name
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.fatherBirthdate"
                                type="date"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.fatherBirthdate ? 'floating-active' : ''
                            ]">
                                Birthdate
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.fatherOccupation"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.fatherOccupation ? 'floating-active' : ''
                            ]">
                                Occupation
                            </label>
                        </div>

                    </div>

                    <!-- ================= MOTHER ================= -->
                    <div class="grid md:grid-cols-3 gap-4">

                        <div class="relative">
                            <input v-model="form.motherName"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.motherName ? 'floating-active' : ''
                            ]">
                                Mother's Name
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.motherBirthdate"
                                type="date"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.motherBirthdate ? 'floating-active' : ''
                            ]">
                                Birthdate
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.motherOccupation"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.motherOccupation ? 'floating-active' : ''
                            ]">
                                Occupation
                            </label>
                        </div>

                    </div>

                    <!-- ================= SIBLINGS ================= -->
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <h4 class="font-semibold text-gray-700">
                                Siblings (With Age & Occupation)
                            </h4>

                            <button type="button"
                                @click="addSibling"
                                class="px-3 py-1 bg-green-600 text-white rounded-lg text-sm">
                                + Add
                            </button>
                        </div>

                        <div v-for="(sibling, index) in form.siblings" :key="index" class="flex justify-between space-x-4 mb-2"  >
                            <div class="relative w-full">
                                <input v-model="sibling.name"
                                    class="peer floating-input w-full" />
                                <label :class="[
                                    'floating-label',
                                    sibling.name ? 'floating-active' : ''
                                ]">
                                    Name
                                </label>
                            </div>

                            <div class="relative w-full">
                                <input v-model="sibling.birthdate"
                                    type="date"
                                    class="peer floating-input w-full" />
                                <label :class="[
                                    'floating-label',
                                    sibling.birthdate ? 'floating-active' : ''
                                ]">
                                    Birthdate
                                </label>
                            </div>

                            <div class="relative w-full">
                                <input v-model="sibling.occupation"
                                    class="peer floating-input w-full" />
                                <label :class="[
                                    'floating-label',
                                    sibling.occupation ? 'floating-active' : ''
                                ]">
                                    Occupation
                                </label>
                            </div>

                            <div class="relative w-full">
                                <input v-model="sibling.employer"
                                    class="peer floating-input w-full" />
                                <label :class="[
                                    'floating-label',
                                    sibling.employer ? 'floating-active' : ''
                                ]">
                                    Employer Name & Address
                                </label>
                            </div>
                            <div class="col-span-full text-right" v-if="form.siblings.length > 1">
                                <button
                                    type="button"
                                    @click="removeSibling(index)"
                                    class="text-red-500 hover:text-red-600 mt-2 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-5 h-5">
                                        <path stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr class="!my-10">
                    <!-- ================= SPOUSE ================= -->
                    <div class="grid md:grid-cols-4 gap-4">

                        <div class="relative">
                            <input v-model="form.spouseName"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.spouseName ? 'floating-active' : ''
                            ]">
                                Spouse Name (If Married)
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.spouseBirthdate"
                                type="date"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.spouseBirthdate ? 'floating-active' : ''
                            ]">
                                Birthdate
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.spouseOccupation"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.spouseOccupation ? 'floating-active' : ''
                            ]">
                                Occupation
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.spouseEmployer"
                                class="peer floating-input" />
                            <label :class="[
                                'floating-label',
                                form.spouseEmployer ? 'floating-active' : ''
                            ]">
                                Employer Name & Address
                            </label>
                        </div>
                    </div>

                    <!-- ================= CHILDREN ================= -->
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <h4 class="font-semibold text-gray-700">
                                Children (With Birthdate)
                            </h4>

                            <button type="button"
                                @click="addChild"
                                class="px-3 py-1 bg-green-600 text-white rounded-lg text-sm">
                                + Add
                            </button>
                        </div>

                        <div v-for="(child, index) in form.children" :key="index"  class="flex justify-between space-x-4 mb-2">

                            <div class="relative w-full">
                                <input v-model="child.name"
                                    class="peer floating-input" />
                                <label :class="[
                                    'floating-label',
                                    child.name ? 'floating-active' : ''
                                ]">
                                    Name
                                </label>
                            </div>

                            <div class="relative w-full">
                                <input v-model="child.birthdate"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="[
                                    'floating-label',
                                    child.birthdate ? 'floating-active' : ''
                                ]">
                                    Birthdate
                                </label>
                            </div>

                            <div class="col-span-full text-right" v-if="form.children.length > 1">
                                <button 
                                    type="button"
                                    @click="removeChild(index)"
                                    class="text-red-500 text-sm">
                                   <svg xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-5 h-5">
                                        <path stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <!-- EDUCATION -->
            <div v-if="currentStep === 2  " class="space-y-2">

                <h3 class="text-xl font-bold text-gray-700">
                    Educational Background
                </h3>

                <!-- ================= COLLEGE ================= -->
                <div class="space-y-4">
                    <h3 class="font-semibold text-gray-700">College</h3>
                    <div class="relative">
                        <input v-model="form.collegeSchool"
                            class="peer floating-input" />
                        <label :class="['floating-label', form.collegeSchool ? 'floating-active' : '']">
                            Name of School / Address
                        </label>
                    </div>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="relative">
                            <input v-model="form.collegeCourse"
                                class="peer floating-input" />
                            <label :class="['floating-label', form.collegeCourse ? 'floating-active' : '']">
                                Course
                            </label>
                        </div>
                        <div class="grid md:grid-cols-3 gap-4">
                            <div class="relative">
                                <input v-model="form.collegeDateGraduated"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="['floating-label', form.collegeDateGraduated ? 'floating-active' : '']">
                                    Date Graduated
                                </label>
                            </div>
                            <div class="relative">
                                <input v-model="form.collegeFrom"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="['floating-label !pr-16', form.collegeFrom ? 'floating-active !pr-2' : '']">
                                    From
                                </label>
                            </div>

                            <div class="relative">
                                <input v-model="form.collegeTo"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="['floating-label !pr-20', form.collegeTo ? 'floating-active !pr-2' : '']">
                                    To
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ================= HIGH SCHOOL ================= -->
                <div class="space-y-4">
                    <h3 class="font-semibold text-gray-700">High School</h3>

                    <div class="relative">
                        <input v-model="form.highSchoolSchool"
                            class="peer floating-input" />
                        <label :class="['floating-label', form.highSchoolSchool ? 'floating-active' : '']">
                            Name of School / Address
                        </label>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="relative">
                            <input v-model="form.highSchoolCourse"
                                class="peer floating-input" />
                            <label :class="['floating-label', form.highSchoolCourse ? 'floating-active' : '']">
                                Course
                            </label>
                        </div>
                        <div class="grid md:grid-cols-3 gap-4">
                            <div class="relative">
                                <input v-model="form.highSchoolDateGraduated"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="['floating-label', form.highSchoolDateGraduated ? 'floating-active' : '']">
                                    Date Graduated
                                </label>
                            </div>
                            <div class="relative">
                                <input v-model="form.highSchoolFrom"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="['floating-label !pr-16', form.highSchoolFrom ? 'floating-active' : '']">
                                    From
                                </label>
                            </div>
                            <div class="relative">
                                <input v-model="form.highSchoolTo"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="['floating-label !pr-20', form.highSchoolTo ? 'floating-active' : '']">
                                    To
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ================= ELEMENTARY ================= -->
                <div class="space-y-4">
                    <h3 class="font-semibold text-gray-700">Elementary</h3>
                    <div class="relative">
                        <input v-model="form.elementarySchool"
                            class="peer floating-input" />
                        <label :class="['floating-label', form.elementarySchool ? 'floating-active' : '']">
                            Name of School / Address
                        </label>
                    </div>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="relative">
                            <input v-model="form.elementaryCourse"
                                class="peer floating-input" />
                            <label :class="['floating-label', form.elementaryCourse ? 'floating-active' : '']">
                                Course
                            </label>
                        </div>
                        <div class="grid md:grid-cols-3 gap-4">
                            <div class="relative">
                                <input v-model="form.elementaryDateGraduated"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="['floating-label', form.elementaryDateGraduated ? 'floating-active' : '']">
                                    Date Graduated
                                </label>
                            </div>
                            <div class="relative">
                                <input v-model="form.elementaryFrom"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="['floating-label !pr-16', form.elementaryFrom ? 'floating-active' : '']">
                                    From
                                </label>
                            </div>

                            <div class="relative">
                                <input v-model="form.elementaryTo"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="['floating-label !pr-20', form.elementaryTo ? 'floating-active' : '']">
                                    To
                                </label>
                            </div>
                        </div>
                        
                    </div>

                    
                </div>

                <!-- ================= POST GRAD / VOCATIONAL ================= -->
                <div class="space-y-4">
                    <h3 class="font-semibold text-gray-700">Post Grad / Vocational</h3>

                    <div class="relative">
                        <input v-model="form.postGradSchool"
                            class="peer floating-input" />
                        <label :class="['floating-label', form.postGradSchool ? 'floating-active' : '']">
                            Name of School / Address
                        </label>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="relative">
                            <input v-model="form.postGradCourse"
                                class="peer floating-input" />
                            <label :class="['floating-label', form.postGradCourse ? 'floating-active' : '']">
                                Course
                            </label>
                        </div>
                        <div class="grid md:grid-cols-3 gap-4">
                            <div class="relative">
                                <input v-model="form.postGradDateGraduated"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="['floating-label', form.postGradDateGraduated ? 'floating-active' : '']">
                                    Date Graduated
                                </label>
                            </div>
                            <div class="relative">
                                <input v-model="form.postGradFrom"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="['floating-label !pr-16', form.postGradFrom ? 'floating-active' : '']">
                                    From
                                </label>
                            </div>

                            <div class="relative">
                                <input v-model="form.postGradTo"
                                    type="date"
                                    class="peer floating-input" />
                                <label :class="['floating-label !pr-20', form.postGradTo ? 'floating-active' : '']">
                                    To
                                </label>
                            </div>
                        </div>
                        
                    </div>

                    
                </div>

            </div>

            <!-- EMPLOYMENT HISTORY -->
            <div v-if="currentStep === 3" class="space-y-4">
                <div class="space-y-4">
                    <div class="flex justify-between items-center ">
                        <h2 class="text-xl font-bold text-gray-800">
                            Employment History (From Recent to Past)
                        </h2>
                        <button type="button"
                            @click="form.employmentHistory.push({ employer: '', position: '', from: '', to: '', remarks: '' })"
                            class="px-3 py-1 bg-green-600 text-white rounded-lg text-sm">
                            + Add
                        </button>
                    </div>
                    <div v-for="(job, index) in form.employmentHistory" :key="index" class="space-y-4 pb-4">

                        <!-- Employer Name / Address -->
                        <div class="relative">
                            <input v-model="job.employer"
                                class="peer floating-input" />
                            <label :class="['floating-label', job.employer ? 'floating-active' : '']">
                                Name / Address of Employer
                            </label>
                        </div>

                        <div class="grid md:grid-cols-2 gap-4">
                            <!-- Position -->
                            <div class="relative">
                                <input v-model="job.position"
                                    class="peer floating-input" />
                                <label :class="['floating-label', job.position ? 'floating-active' : '']">
                                    Position
                                </label>
                            </div>

                            <!-- From / To -->
                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="relative">
                                    <input v-model="job.from"
                                        type="date"
                                        class="peer floating-input" />
                                    <label :class="['floating-label', job.from ? 'floating-active' : '']">
                                        From
                                    </label>
                                </div>

                                <div class="relative">
                                    <input v-model="job.to"
                                        type="date"
                                        class="peer floating-input" />
                                    <label :class="['floating-label', job.to ? 'floating-active' : '']">
                                        To
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!-- Remarks -->
                        
                        <div class="flex justify-between items-center space-x-2 mb-2">
                            <div class="relative w-full">
                                <input v-model="job.remarks"
                                    class="peer floating-input" />
                                <label :class="['floating-label', job.remarks ? 'floating-active' : '']">
                                    Remarks
                                </label>
                            </div>

                            <!-- Remove Job Button -->
                            <button type="button"
                                @click="form.employmentHistory.splice(index, 1)"
                                class="text-red-500 text-sm hover:underline">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5">
                                    <path stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <br>
                        <hr class="mt-1">
                    </div>
                </div>
            </div>

            <!-- TRAININGS -->
            <div v-if="currentStep === 4" class="space-y-2">
                <div class="space-y-4">
                    <!-- Header -->
                    <div class="flex justify-between items-center">
                        <h2 class="text-xl font-bold text-gray-800">
                            Trainings / Seminars
                        </h2>

                        <button
                            type="button"
                            @click="form.trainings.push({ title: '', venue: '', organizer: '', date: '' })"
                            class="px-3 py-1 bg-green-600 text-white rounded-lg text-sm">
                            + Add
                        </button>
                    </div>

                    <!-- List -->
                    <div
                        v-for="(training, index) in form.trainings"
                        :key="index"
                        class="grid md:grid-cols-4 gap-4 items-start border-b pb-4"
                    >

                        <!-- TITLE -->
                        <div class="relative">
                            <input
                                v-model="training.title"
                                class="peer floating-input"
                            />
                            <label
                                :class="['floating-label', training.title ? 'floating-active' : '']">
                                Title
                            </label>
                        </div>

                        <!-- VENUE -->
                        <div class="relative">
                            <input
                                v-model="training.venue"
                                class="peer floating-input"
                            />
                            <label
                                :class="['floating-label', training.venue ? 'floating-active' : '']">
                                Venue
                            </label>
                        </div>

                        <!-- ORGANIZER -->
                        <div class="relative">
                            <input
                                v-model="training.organizer"
                                class="peer floating-input"
                            />
                            <label
                                :class="['floating-label', training.organizer ? 'floating-active' : '']">
                                Organizer
                            </label>
                        </div>

                        <!-- DATE + REMOVE -->
                        <div class="flex items-center space-x-2">
                            <div class="relative w-full">
                                <input
                                    v-model="training.date"
                                    type="date"
                                    class="peer floating-input"
                                />
                                <label
                                    :class="['floating-label !pr-20', training.date ? 'floating-active' : '']">
                                    Date
                                </label>
                            </div>

                            <!-- Remove Button -->
                            <button
                                type="button"
                                @click="form.trainings.splice(index, 1)"
                                class="text-red-500 hover:text-red-700">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5">
                                    <path stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <!-- ADDITIONAL INFO -->
            <div v-if="currentStep === 5" class="space-y-2">
                <div class="space-y-4">
                    <!-- SECTION TITLE -->
                    <h2 class="text-xl font-bold text-gray-800">
                        Additional Information
                    </h2>

                    <!-- GOVERNMENT IDS -->
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="relative">
                            <input v-model="form.tin" class="peer floating-input" />
                            <label :class="['floating-label', form.tin ? 'floating-active' : '']">
                                TIN
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.sss" class="peer floating-input" />
                            <label :class="['floating-label', form.sss ? 'floating-active' : '']">
                                SSS
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.philhealth" class="peer floating-input" />
                            <label :class="['floating-label', form.philhealth ? 'floating-active' : '']">
                                PHILHEALTH
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.pagibig" class="peer floating-input" />
                            <label :class="['floating-label', form.pagibig ? 'floating-active' : '']">
                                PAGIBIG (HDMF)
                            </label>
                        </div>
                    </div>

                    <!-- PHYSICAL INFO -->
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="relative">
                            <input v-model="form.height" class="peer floating-input" />
                            <label :class="['floating-label', form.height ? 'floating-active' : '']">
                                Height
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.weight" class="peer floating-input" />
                            <label :class="['floating-label', form.weight ? 'floating-active' : '']">
                                Weight
                            </label>
                        </div>
                    </div>

                    <!-- DIALECT -->
                    <div class="relative">
                        <input v-model="form.dialect" class="peer floating-input" />
                        <label :class="['floating-label', form.dialect ? 'floating-active' : '']">
                            Types of Dialect Spoken / Can Understand
                        </label>
                    </div>

                    <!-- DRIVER LICENSE -->
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="relative">
                            <input v-model="form.hasDriversLicense" class="peer floating-input" />
                            <label :class="['floating-label', form.hasDriversLicense ? 'floating-active' : '']">
                                Do you have Driver's License?
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.licenseDetails" class="peer floating-input" />
                            <label :class="['floating-label', form.licenseDetails ? 'floating-active' : '']">
                                Date Issued / License Number
                            </label>
                        </div>
                    </div>

                    <!-- SKILLS -->
                    <div class="relative">
                        <input v-model="form.specialSkills" class="peer floating-input" />
                        <label :class="['floating-label', form.specialSkills ? 'floating-active' : '']">
                            Special Skills
                        </label>
                    </div>

                    <!-- MEDICAL -->
                    <div class="relative">
                        <input v-model="form.hospitalized" class="peer floating-input" />
                        <label :class="['floating-label', form.hospitalized ? 'floating-active' : '']">
                            Have you ever been hospitalized? What major illness?
                        </label>
                    </div>

                    <!-- BUSINESS -->
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="relative">
                            <input v-model="form.hasBusiness" class="peer floating-input" />
                            <label :class="['floating-label', form.hasBusiness ? 'floating-active' : '']">
                                Do you own a business?
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.businessNature" class="peer floating-input" />
                            <label :class="['floating-label', form.businessNature ? 'floating-active' : '']">
                                Nature of Business
                            </label>
                        </div>
                    </div>

                    <!-- PROFESSION -->
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="relative">
                            <input v-model="form.profession" class="peer floating-input" />
                            <label :class="['floating-label', form.profession ? 'floating-active' : '']">
                                Profession
                            </label>
                        </div>

                        <div class="relative">
                            <input v-model="form.licensedNumber" class="peer floating-input" />
                            <label :class="['floating-label', form.licensedNumber ? 'floating-active' : '']">
                                Licensed Number
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CHARACTER REFERENCE -->
            <div v-if="currentStep === 6"class="space-y-2">

                <!-- ========================= -->
                <!-- CHARACTER REFERENCE -->
                <!-- ========================= -->
                <div class="space-y-4">

                    <div class="flex justify-between items-center">
                        <h2 class="text-xl font-bold text-gray-800">
                            Character Reference
                        </h2>

                        <button
                            type="button"
                            @click="form.characterReferences.push({
                                name: '',
                                employer: '',
                                position: '',
                                relationship: '',
                                contactNumber: ''
                            })"
                            class="px-3 py-1 bg-green-600 text-white rounded-lg text-sm">
                            +
                        </button>
                    </div>

                    <!-- Reference List -->
                    <div
                        v-for="(ref, index) in form.characterReferences"
                        :key="index"
                        class="grid md:grid-cols-5 gap-4 border-b pb-4 items-start"
                    >

                        <!-- Name -->
                        <div class="relative">
                            <input v-model="ref.name" class="peer floating-input" />
                            <label :class="['floating-label', ref.name ? 'floating-active' : '']">
                                Name
                            </label>
                        </div>

                        <!-- Employer -->
                        <div class="relative">
                            <input v-model="ref.employer" class="peer floating-input" />
                            <label :class="['floating-label', ref.employer ? 'floating-active' : '']">
                                Employer
                            </label>
                        </div>

                        <!-- Position -->
                        <div class="relative">
                            <input v-model="ref.position" class="peer floating-input" />
                            <label :class="['floating-label', ref.position ? 'floating-active' : '']">
                                Position
                            </label>
                        </div>

                        <!-- Relationship -->
                        <div class="relative">
                            <input v-model="ref.relationship" class="peer floating-input" />
                            <label :class="['floating-label', ref.relationship ? 'floating-active' : '']">
                                Relationship
                            </label>
                        </div>

                        <!-- Contact Number + Remove -->
                        <div class="flex items-center space-x-2">
                            <div class="relative w-full">
                                <input v-model="ref.contactNumber" class="peer floating-input" />
                                <label :class="['floating-label', ref.contactNumber ? 'floating-active' : '']">
                                    Contact Number
                                </label>
                            </div>

                            <button
                                type="button"
                                @click="form.characterReferences.splice(index, 1)"
                                class="text-red-500 hover:text-red-700 text-sm">
                                ✕
                            </button>
                        </div>

                    </div>
                </div>

                <div class="space-y-4">

                    <h2 class="text-xl font-bold text-gray-800">
                        Person to contact in case of emergency
                    </h2>

                    <div class="grid md:grid-cols-2 gap-4">

                        <!-- Name -->
                        <div class="relative">
                            <input v-model="form.emergencyName" class="peer floating-input" />
                            <label :class="['floating-label', form.emergencyName ? 'floating-active' : '']">
                                Name
                            </label>
                        </div>

                        <!-- Relationship -->
                        <div class="relative">
                            <input v-model="form.emergencyRelationship" class="peer floating-input" />
                            <label :class="['floating-label', form.emergencyRelationship ? 'floating-active' : '']">
                                Relationship
                            </label>
                        </div>

                        <!-- Contact Number -->
                        <div class="relative">
                            <input v-model="form.emergencyContactNumber" class="peer floating-input" />
                            <label :class="['floating-label', form.emergencyContactNumber ? 'floating-active' : '']">
                                Contact Number
                            </label>
                        </div>

                        <!-- Address -->
                        <div class="relative">
                            <input v-model="form.emergencyAddress" class="peer floating-input" />
                            <label :class="['floating-label', form.emergencyAddress ? 'floating-active' : '']">
                                Address
                            </label>
                        </div>

                    </div>

                </div>
            </div>

            <!-- ACTION BUTTONS -->
            <div class="flex justify-between mt-8">
                <button
                v-if="currentStep > 0"
                @click="prevStep"
                class="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                Back
                </button>

                <div class="ml-auto flex gap-3">

                <!-- SAVE DRAFT -->
                <button
                    @click="saveDraft"
                    class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                    Save Draft
                </button>

                <!-- NEXT OR REVIEW -->
                <button
                    v-if="currentStep < steps.length - 1"
                    @click="nextStep"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Next
                </button>

                <button
                    v-else
                    @click="openReview"
                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Review & Submit
                </button>

                </div>
            </div>

        </div>

        <!-- REVIEW MODAL -->
        <div  v-if="showReview" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 !m-0"  >
            <div class="bg-white rounded-xl p-6 w-[600px] max-h-[80vh] overflow-y-auto">
                <h2 class="text-lg font-semibold mb-4">
                Review Employee Information
                </h2>

                <pre class="text-sm bg-gray-100 p-4 rounded">
        {{ form }}
                </pre>

                <div class="flex justify-end gap-3 mt-6">
                <button
                    @click="showReview = false"
                    class="px-4 py-2 border rounded-lg"
                >
                    Close
                </button>

                <button
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Submit Employee
                </button>
                </div>
            </div>
        </div>

    </navigation>
</template>

<script setup>
    import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
    import navigation from "@/components/layouts/navigation_admin.vue";

    const steps = [
        "Personal",
        "Family",
        "Education",
        "Employment",
        "Trainings",
        "Additional",
        "Character Ref"
    ];

    const currentStep = ref(0);
    const showReview = ref(false);

    // ---- Toast for saved draft ----
    const savedToast = ref(false); // <-- Add this line

    const form = reactive({
        fullName: "",
        dateHired: "",
        position: "",
        contact: "",
        fatherName: '',
        fatherBirthdate: '',
        fatherOccupation: '',
        motherName: '',
        motherBirthdate: '',
        motherOccupation: '',
        spouseName: '',
        spouseBirthdate: '',
        spouseOccupation: '',
        spouseEmployer: '',
        siblings: [
            { name: '', birthdate: '', occupation: '', employer: '' }
        ],
        children: [
            { name: '', birthdate: '' }
        ],
        college: '',
        previousCompany: '',
        trainingTitle: '',
        tin: '',
        referenceName: '',
        positionApplied: '',
        dateApplied: '',
        company: '',
        lastName: '',
        firstName: '',
        middleName: '',
        nameExt: '',
        dateOfBirth: '',
        placeOfBirth: '',
        contactNumber: '',
        sex: '',
        civilStatus: '',
        nationality: '',
        religion: '',
        presentProvince: '',
        presentCity: '',
        presentAddress: '',
        permanentProvince: '',
        permanentCity: '',
        permanentAddress: '',
        employmentHistory: [ {employer: '', position: '', from: '', to: '', remarks: '' }],
        trainings: [
        { title: '', venue: '', organizer: '', date: '' }
        ],
        tin: '',
        sss: '',
        philhealth: '',
        pagibig: '',
        height: '',
        weight: '',
        dialect: '',
        hasDriversLicense: '',
        licenseDetails: '',
        specialSkills: '',
        hospitalized: '',
        hasBusiness: '',
        businessNature: '',
        profession: '',
        licensedNumber: '',
        characterReferences: [
        { name: '', employer: '', position: '', relationship: '', contactNumber: '' }
        ],

        emergencyName: '',
        emergencyRelationship: '',
        emergencyContactNumber: '',
        emergencyAddress: '',
    });

    const errors = reactive({})

    const validateField = (field, value) => {
    errors[field] = !value;
    }

    const nextStep = () => {
    if (currentStep.value < steps.length - 1) currentStep.value++;
    saveProgress();
    };
    const prevStep = () => {
    if (currentStep.value > 0) currentStep.value--;
    saveProgress();
    };

    const progressWidth = computed(() =>
    ((currentStep.value + 1) / steps.length) * 100
    );

    const isScrolled = ref(false);
    const handleScroll = () => {
    isScrolled.value = window.scrollY > 80;
    };

    // -------------- LOCAL STORAGE FUNCTIONS --------------
    const saveProgress = () => {
        localStorage.setItem('currentStep', currentStep.value);
        localStorage.setItem('formData', JSON.stringify(form));

        // Show toast
        savedToast.value = true;
        setTimeout(() => {
            savedToast.value = false;
        }, 1500); // toast disappears after 1.5s
    };

    const loadProgress = () => {
    const savedStep = localStorage.getItem('currentStep');
    const savedForm = localStorage.getItem('formData');

    if (savedStep !== null) {
        currentStep.value = Number(savedStep);
    }

    if (savedForm) {
        const parsedForm = JSON.parse(savedForm);
        Object.keys(parsedForm).forEach(key => {
        if (form[key] !== undefined) {
            form[key] = parsedForm[key];
        }
        });
    }
    };


    const saveDraft = () => {
    saveProgress();
    console.log("Draft Saved:", form);
    };

    const submitForm = () => {
    console.log("Submitting form:", form);
    // Clear localStorage on submit
    localStorage.removeItem('currentStep');
    localStorage.removeItem('formData');
    showReview.value = false;
    };

    // -------------- FAMILY / CHILD FUNCTIONS --------------
    const addSibling = () => {
    form.siblings.push({ name: '', birthdate: '', occupation: '', employer: '' });
    };
    const removeSibling = (index) => {
    form.siblings.splice(index, 1);
    };

    const addChild = () => {
    form.children.push({ name: '', birthdate: '' });
    };
    const removeChild = (index) => {
    form.children.splice(index, 1);
    };

    // -------------- REVIEW MODAL --------------
    const openReview = () => {
    showReview.value = true;
    };

    // -------------- LIFECYCLE --------------
    onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    loadProgress();
    });

    onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    });

    const resetForm = () => {
    // Reset all primitive fields
    Object.keys(form).forEach(key => {
        if (Array.isArray(form[key])) {
        form[key] = []; // clear arrays
        } else {
        form[key] = ''; // clear strings/numbers
        }
    });

    // Add default empty entries for siblings and children
    form.siblings = [{ name: '', birthdate: '', occupation: '', employer: '' }];
    form.children = [{ name: '', birthdate: '' }];

    // Reset stepper
    currentStep.value = 0;

    // Clear errors
    Object.keys(errors).forEach(key => errors[key] = false);

    // Clear saved localStorage
    localStorage.removeItem('currentStep');
    localStorage.removeItem('formData');

    // Optionally hide review modal if open
    showReview.value = false;
    };
</script>