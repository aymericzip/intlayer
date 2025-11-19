<script lang="ts">
import { onDestroy, onMount } from 'svelte';

// Props
// biome-ignore lint/style/useConst: Svelte props need let
export let onClickOutside: (() => void) | undefined = undefined;
// biome-ignore lint/style/useConst: Svelte props need let
export let pressDuration = 250;
// biome-ignore lint/style/useConst: Svelte props need let
export let isSelecting = false;

// Event props
// biome-ignore lint/style/useConst: Svelte props need let
export let onPress: (() => void) | undefined = undefined;
// biome-ignore lint/style/useConst: Svelte props need let
export let onUnhover: (() => void) | undefined = undefined;
// biome-ignore lint/style/useConst: Svelte props need let
export let onHover: (() => void) | undefined = undefined;
// biome-ignore lint/style/useConst: Svelte props need let
export let onClick: ((event: MouseEvent) => void) | undefined = undefined;

// biome-ignore lint/style/useConst: don't transform to const
let containerRef: HTMLElement | null = null;
let isHovered = false;
let isSelectingState = isSelecting;
let pressTimerRef: ReturnType<typeof setTimeout> | null = null;

$: currentIsSelecting = isSelecting || isSelectingState;

const handleOnLongPress = () => {
  isSelectingState = true;
  onPress?.();
};

const startPressTimer = () => {
  pressTimerRef = setTimeout(() => {
    handleOnLongPress();
  }, pressDuration);
};

const clearPressTimer = () => {
  if (pressTimerRef) {
    clearTimeout(pressTimerRef);
    pressTimerRef = null;
  }
};

const handleMouseDown = () => {
  clearPressTimer();
  startPressTimer();
};

const handleMouseUp = () => {
  if (isHovered) {
    isHovered = false;
    onUnhover?.();
  }
  clearPressTimer();
};

const handleMouseLeave = () => {
  if (isHovered) {
    isHovered = false;
    onUnhover?.();
  }
  clearPressTimer();
};

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef && !containerRef.contains(event.target as Node)) {
    isSelectingState = false;
    if (onClickOutside) onClickOutside();
  }
};

const handleClick = (e: MouseEvent) => {
  if (currentIsSelecting) {
    e.preventDefault();
    e.stopPropagation();
  } else {
    onClick?.(e);
  }
};

onMount(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onDestroy(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('mousedown', handleClickOutside);
  }
  clearPressTimer();
});
</script>

<span
  bind:this={containerRef}
  role="button"
  tabindex="0"
  onclick={handleClick}
  onkeydown={() => {}}
  onmousedown={handleMouseDown}
  onmouseup={handleMouseUp}
  onmouseleave={handleMouseLeave}
  ontouchstart={handleMouseDown}
  ontouchend={handleMouseUp}
  ontouchcancel={handleMouseLeave}
  onmouseenter={() => {
    isHovered = true;
    onHover?.();
  }}
  style={`display: inline-block;
    cursor: pointer;
    user-select: none;
    border-radius: 0.375rem;
    outline-width: 2px;
    outline-offset: 4px;
    outline-style: solid;
    outline-color: ${currentIsSelecting || isHovered ? 'inherit' : 'transparent'};
    transition: all 100ms 50ms ease-in-out;
  `}
>
  <slot />
</span>
