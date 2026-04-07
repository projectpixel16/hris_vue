<template>
    <div class="flex gap-3 mb-4">
        <button 
            onclick="window.print()" 
            class="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
            Print ID
        </button>

        <!-- CHANGE BACKGROUND -->
        <input 
            type="file" 
            @change="handleBgUpload" 
            class="text-sm"
        />
    </div>

    <!-- PRINT AREA -->
    <div class="print flex gap-6 flex-wrap">

        <!-- FRONT -->
        <div 
            class="w-[350px] h-[550px] rounded-2xl shadow relative overflow-hidden text-gray-800"
            :style="cardStyle"
        >

            <!-- OVERLAY -->
            <div class="absolute inset-0 bg-white/70"></div>

            <div class="relative p-5 flex flex-col h-full">

                <!-- HEADER -->
                <div class="text-center">
                    <h1 class="text-3xl font-bold text-green-700 tracking-wide">
                        {{ company.short }}
                    </h1>
                    <p class="text-xs font-semibold">
                        {{ company.name }}
                    </p>
                </div>

                <!-- PHOTO -->
                <div class="mt-4 flex justify-center">
                    <img 
                        :src="employee_id.photo" 
                        class="w-40 h-44 object-cover rounded-xl shadow border"
                    />
                </div>

                <!-- NAME -->
                <div class="mt-4 text-center">
                    <h2 class="font-bold text-lg tracking-wide">
                        {{ employee_id.name }}
                    </h2>
                    <p class="text-sm text-gray-600">
                        {{ employee_id.position }}
                    </p>
                </div>

                <!-- DETAILS -->
                <div class="mt-6 text-sm space-y-2">
                    <p><span class="font-semibold">Employee ID No:</span> {{ employee_id.id }}</p>
                    <p><span class="font-semibold">Birth Date:</span> {{ employee_id.birthdate }}</p>
                    <p><span class="font-semibold">Address:</span> {{ employee_id.address }}</p>
                </div>

                <!-- SIGNATURE -->
                <div class="mt-auto">
                    <div class="border-t mt-6 pt-1 text-xs text-center">
                        Signature
                    </div>
                </div>

            </div>
        </div>


        <!-- BACK -->
        <div 
            class="w-[350px] h-[550px] rounded-2xl shadow relative overflow-hidden text-gray-800"
            :style="cardStyle"
        >

            <div class="absolute inset-0 bg-white/80"></div>

            <div class="relative p-5 flex flex-col h-full text-sm">

                <!-- PERSONAL INFO -->
                <div>
                    <h3 class="font-bold text-gray-700 mb-2">PERSONAL INFORMATION</h3>

                    <div class="grid grid-cols-2 gap-2 text-xs">
                        <p><span class="font-semibold">TIN:</span> {{ employee_id.tin }}</p>
                        <p><span class="font-semibold">SSS:</span> {{ employee_id.sss }}</p>
                        <p><span class="font-semibold">PhilHealth:</span> {{ employee_id.philhealth }}</p>
                        <p><span class="font-semibold">Pag-IBIG:</span> {{ employee_id.pagibig }}</p>
                        <p class="col-span-2"><span class="font-semibold">Contact:</span> {{ employee_id.contact }}</p>
                    </div>
                </div>

                <!-- EMERGENCY -->
                <div class="mt-4">
                    <h3 class="font-bold text-gray-700 mb-2">
                        PERSON TO NOTIFY IN CASE OF EMERGENCY
                    </h3>

                    <div class="text-xs space-y-1">
                        <p><span class="font-semibold">Name:</span> {{ employee_id.emergency.name }}</p>
                        <p><span class="font-semibold">Contact:</span> {{ employee_id.emergency.contact }}</p>
                        <p><span class="font-semibold">Address:</span> {{ employee_id.emergency.address }}</p>
                    </div>
                </div>

                <!-- FOOTER -->
                <div class="mt-auto flex justify-between items-end">

                    <!-- NOTE -->
                    <p class="text-[10px] w-2/3">
                        This card is property of {{ company.short }} and must be surrendered upon request.
                    </p>

                    <!-- QR -->
                    <img :src="employee_id.qr" class="w-20 h-20 border rounded" />
                </div>

                <!-- SIGNATORY -->
                <div class="mt-4 text-right text-xs">
                    <p class="font-semibold">{{ company.signatory }}</p>
                    <p class="text-gray-500">{{ company.position }}</p>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
    const backgroundImage = ref('/default-bg.png')

    const company = ref({
        short: 'CENPRI',
        name: 'Central Negros Power Reliability, Inc.',
        signatory: 'David C. Tan',
        position: 'Executive Director'
    })

    const employee_id = ref({
        name: "Juan Dela Cruz",
        position: "Software Developer",
        id: "EMP-00123",
        department: "IT Department",
        contact: "09123456789",
        emergency: "Maria Dela Cruz - 09987654321",
        photo: ""
    })

    /* =========================
    COMPUTED
    ========================= */
    const cardStyle = computed(() => ({
        backgroundImage: `url(${backgroundImage.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }))

    // Auto QR generator
    const qrCode = computed(() => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${employee_id.value.id}`
    })

    /* =========================
    METHODS
    ========================= */
    const handleBgUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            backgroundImage.value = URL.createObjectURL(file)
        }
    }

    /* =========================
    LIFECYCLE (optional)
    ========================= */
    onMounted(() => {
        // example: fetch employee later
    })

    onBeforeUnmount(() => {
        // cleanup if needed
    })   
</script>