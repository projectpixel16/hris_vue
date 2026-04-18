<template>
    <transition name="fade">
        <div
        v-if="modelValue"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 !mt-0"
        @click="handleBackdrop"
        >
        <!-- MODAL CONTENT -->
        <div
            class="bg-white rounded-2xl p-6 shadow-lg"
            :class="width"
            @click.stop
        >
            <!-- HEADER -->
            <div v-if="title" class="flex justify-between items-center mb-4">
            <h3 class="font-semibold text-gray-800">{{ title }}</h3>
            <button @click="close" class="text-red-500 font-bold">✕</button>
            </div>

            <!-- BODY SLOT -->
            <slot />

            <!-- FOOTER SLOT -->
            <div v-if="$slots.footer" class="mt-4 flex justify-end gap-2">
            <slot name="footer" />
            </div>
        </div>
        </div>
    </transition>
</template>

<script setup>
    const props = defineProps({
    modelValue: Boolean,
    title: String,
    width: {
        type: String,
        default: "w-full max-w-md"
    },
    closeOnBackdrop: {
        type: Boolean,
        default: true
    }
    })

    const emit = defineEmits(['update:modelValue'])

    const close = () => emit('update:modelValue', false)

    const handleBackdrop = () => {
    if (props.closeOnBackdrop) close()
    }
</script>