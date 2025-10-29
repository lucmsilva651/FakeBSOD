<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const urlError = new URLSearchParams(document.location.search).get('error');
const possibleErrors = ['CRITICAL_PROCESS_DIED', 'DPC_WATCHDOG_VIOLATION', 'MEMORY_MANAGEMENT', 'KMODE_EXCEPTION_NOT_HANDLED', 'IRQL_NOT_LESS_OR_EQUAL'];
const error = urlError || possibleErrors[Math.floor(Math.random() * possibleErrors.length)];

const progress = ref(0);
let running = true;
let nextTimer = null;
let freezeTimeout = null;

function scheduleNextTick() {
  if (!running) return;

  const freezeChance = 0.06;
  if (Math.random() < freezeChance) {
    const freezeMs = 1000 + Math.floor(Math.random() * 5000);
    freezeTimeout = setTimeout(() => {
      freezeTimeout = null;
      scheduleNextTick();
    }, freezeMs);
    return;
  }

  const delay = 50 + Math.floor(Math.random() * 750);

  nextTimer = setTimeout(() => {
    nextTimer = null;
    tick();
  }, delay);
}

function tick() {
  if (!running) return;

  const stallChance = 0.25;
  if (Math.random() < stallChance) {
    scheduleNextTick();
    return;
  }

  let increment = Math.random() < 0.03 ? 5 + Math.floor(Math.random() * 8) : 1 + Math.floor(Math.random() * 3);

  if (progress.value > 85) {
    if (Math.random() < 0.85) increment = 1;
  }

  if (Math.random() < 0.12) increment = Math.max(0, increment - 1);

  progress.value = Math.min(100, progress.value + increment);

  if (progress.value >= 100) {
    setTimeout(() => {
      window.location.reload();
    }, 800 + Math.floor(Math.random() * 1200));
    return;
  }

  scheduleNextTick();
}

function onKeyDown(e) {
  const blockedKeys = [
    'Esc', 'F5', 'F11', 'F12', 'ContextMenu'
  ];

  const ctrlCombos = [
    'r', 'R', 'w', 'W', 't', 'T', 'n', 'N', 'u', 'U'
  ];

  const ctrlShiftCombos = ['I', 'J', 'C'];

  if (blockedKeys.includes(e.key)) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return;
  }

  if (e.ctrlKey && !e.altKey && !e.metaKey) {
    if (ctrlCombos.includes(e.key) || ctrlShiftCombos.includes(e.key) || e.key === 'p' || e.key === 'P') {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
  }

  if (e.ctrlKey && e.shiftKey) {
    if (ctrlShiftCombos.map(x => x.toLowerCase()).includes(e.key.toLowerCase())) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
  }

  if (e.altKey && e.key === 'F4') {
    e.preventDefault();
    e.stopImmediatePropagation();
    return;
  }

  if (e.metaKey) {
    if (ctrlCombos.includes(e.key) || ctrlShiftCombos.includes(e.key)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
  }
}

function onContextMenu(e) {
  e.preventDefault();
}

function onMouseDown(e) {
  e.preventDefault();
}

function onSelectStart(e) {
  e.preventDefault();
}

onMounted(() => {
  scheduleNextTick();
  
  window.addEventListener('keydown', onKeyDown, { capture: true, passive: false });
  window.addEventListener('contextmenu', onContextMenu, { capture: true });
  window.addEventListener('mousedown', onMouseDown, { capture: true, passive: false });
  window.addEventListener('selectstart', onSelectStart, { capture: true });

  document.documentElement.style.cursor = 'none';
  if (new URLSearchParams(document.location.search).get('w11') === "true") {
    document.body.style.backgroundColor = '#000000';
  }
});

onBeforeUnmount(() => {
  running = false;
  if (nextTimer) clearTimeout(nextTimer);
  if (freezeTimeout) clearTimeout(freezeTimeout);

  window.removeEventListener('keydown', onKeyDown, { capture: true });
  window.removeEventListener('contextmenu', onContextMenu, { capture: true });
  window.removeEventListener('mousedown', onMouseDown, { capture: true });
  window.removeEventListener('selectstart', onSelectStart, { capture: true });

  document.documentElement.style.cursor = '';
});
</script>

<template>
  <div class="bsod-container" role="dialog" aria-modal="true" tabindex="-1">
    <h1 class="bsod-title">:(</h1>
    <p>{{ $t('mainText') }}</p>
    <p>{{ progress }}% {{ $t('percentageText') }}</p>

    <div class="stop-code">
      <img src="/qr.avif" alt="QR code" />
      <div class="more-info">
        <p>{{ $t('toObtainMoreInfo') }} https://www.windows.com/stopcode</p>
        <div class="need-support">
          <p>{{ $t('ifYouNeedToContact') }}</p>
          <p>{{ $t('stopCode') }}: {{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  font-family: 'Segoe UI', sans-serif;
  font-weight: 300;
  color: #fff;
}

html, body {
  cursor: none !important;
  height: 100%;
}

body {
  background-color: #0180f3;
  overflow: hidden;
}
</style>

<style scoped>
.bsod-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 4.75rem 32rem 4.75rem 8.4rem;
  outline: none;
}

.bsod-title {
  font-size: 9.2rem;
  font-weight: 350;
}

.bsod-container p {
  font-size: 1.8rem;
  margin-top: .4rem;
  line-height: 2.6rem;
  margin-left: .75rem;
  word-spacing: .064rem;
  letter-spacing: .009rem;
}

.bsod-container p:nth-child(3) {
  margin-top: 1.48rem;
}

.stop-code {
  margin-top: 1.9rem;
  margin-left: .8rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

img {
  width: 5.11rem;
  height: 5.11rem;
  -webkit-user-drag: none;
}

.more-info {
  margin-top: -.45rem;
  margin-left: .2rem;
}

.more-info p {
  margin-top: unset;
  letter-spacing: 0;
  word-spacing: -.03rem;
  line-height: 1.6rem;
  font-size: .9rem;
}

.need-support {
  margin-left: -.1rem;
  margin-top: 1.2rem;
}

.need-support p {
  letter-spacing: 0.012rem;
  line-height: 1.5rem;
  font-size: .7rem;
}
</style>
