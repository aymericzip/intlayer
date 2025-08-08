<script setup lang="ts">
import { ref, computed, useSlots, onMounted, onBeforeUnmount } from 'vue';
type Props = {
  onClickOutside?: () => void;
  pressDuration?: number;
  isSelecting?: boolean;
};

const DEFAULT_PRESS_DETECT_DURATION = 250;

const props = defineProps<Props>();
const emit = defineEmits(['click', 'press', 'hover', 'unhover']);

const containerRef = ref<HTMLElement | null>(null);
const isHovered = ref(false);
const isSelectingState = ref(props.isSelecting ?? false);
const pressTimerRef = ref<ReturnType<typeof setTimeout> | null>(null);

const isSelecting = computed(() => props.isSelecting ?? isSelectingState.value);

const isStringSlot = computed(() => {
  // If there's only one default slot child and it's a string
  const slot = useSlots().default?.();
  return slot?.length === 1 && typeof slot[0].children === 'string';
});

const handleOnLongPress = () => {
  isSelectingState.value = true;

  emit('press');
};

const startPressTimer = () => {
  pressTimerRef.value = setTimeout(() => {
    handleOnLongPress();
  }, props.pressDuration ?? DEFAULT_PRESS_DETECT_DURATION);
};

const clearPressTimer = () => {
  if (pressTimerRef.value) {
    clearTimeout(pressTimerRef.value);
    pressTimerRef.value = null;
  }
};

const handleMouseDown = () => {
  clearPressTimer();
  startPressTimer();
};

const handleMouseUp = () => {
  if (isHovered.value) {
    isHovered.value = false;
    emit('unhover');
  }
  clearPressTimer();
};

const handleMouseLeave = () => {
  if (isHovered.value) {
    isHovered.value = false;
    emit('unhover');
  }
  clearPressTimer();
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    containerRef.value &&
    !containerRef.value.contains(event.target as Node)
  ) {
    isSelectingState.value = false;
    props.onClickOutside?.();
  }
};

const handleClick = (e: MouseEvent) => {
  if (isSelecting.value) {
    e.preventDefault();
    e.stopPropagation();
  }
};

const handleBlur = () => {
  isSelectingState.value = false;
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
  clearPressTimer();
});
</script>

<template>
  <span
    ref="containerRef"
    role="button"
    tabindex="0"
    @click="handleClick"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseLeave"
    @touchstart="handleMouseDown"
    @touchend="handleMouseUp"
    @touchcancel="handleMouseLeave"
    @blur="handleBlur"
    @mouseenter="
      () => {
        isHovered = true;
        emit('hover');
      }
    "
    :style="{
      display: isStringSlot ? 'inline' : 'inline-block',
      cursor: 'pointer',
      userSelect: 'none',
      borderRadius: '0.375rem',
      outlineWidth: '2px',
      outlineOffset: '4px',
      outlineStyle: 'solid',
      outlineColor: isSelecting || isHovered ? 'inherit' : 'transparent',
      transition: 'all 100ms 50ms ease-in-out',
    }"
  >
    <slot />
  </span>
</template>
