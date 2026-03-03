<script>
  import { fade } from 'svelte/transition'
  import {
    currentChannelInfo,
    loadingChannel,
    LOADING_STATE,
  } from '../../../modules/tv.js'

  let visible = $state(false)
  let title = $state('')
  let hideTimer = null

  $effect(() => {
    const isDone = $loadingChannel === LOADING_STATE.Done
    const osdTitle = $currentChannelInfo.osdTitle

    if (isDone && osdTitle) {
      title = osdTitle
      visible = true
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => {
        visible = false
      }, 3500)
    } else if (!osdTitle) {
      clearTimeout(hideTimer)
      visible = false
    }
  })
</script>

{#if visible}
  <div
    class="osd"
    in:fade={{ duration: 80 }}
    out:fade={{ duration: 700 }}
  >
    <span class="osd-title">{title}</span>
  </div>
{/if}

<style>
  .osd {
    position: absolute;
    /* align with the header__container which is sticky at top: 100px */
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 14; /* above --layer-content (13), below --layer-top (55) */
    pointer-events: none;
    user-select: none;
    white-space: nowrap;

    font-family: 'Courier New', Courier, monospace;
    font-size: clamp(0.6rem, 1vw, 0.78rem);
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;

    color: #ffcc00;
    text-shadow:
      0 0 3px #ffcc00,
      0 0 10px rgba(255, 204, 0, 0.6);

    background-color: rgba(0, 0, 0, 0.55);
    padding: 0.28em 0.6em;
    border: 1px solid rgba(255, 204, 0, 0.25);

    animation: osd-flicker 0.1s steps(1) infinite;
  }

  @keyframes osd-flicker {
    0%   { opacity: 1; }
    92%  { opacity: 1; }
    93%  { opacity: 0.85; }
    94%  { opacity: 1; }
    96%  { opacity: 0.9; }
    100% { opacity: 1; }
  }
</style>
