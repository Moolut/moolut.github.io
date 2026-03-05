<script>
  import {
    currentChannelInfo,
    contentVisible,
    decrementChannel,
    incrementChannel,
    toggleSpace,
    toggleContent,
  } from '../modules/tv.js'
</script>

<div class="header-controls">
  <div class="channel-controller">
    <button
      class="previous"
      aria-label="previous channel"
      onclick={decrementChannel}
    >
      ◄
    </button>
    <div class="channel">
      CHANNEL <span>{$currentChannelInfo.displayName}</span>
    </div>
    <button class="next" aria-label="next channel" onclick={incrementChannel}>
      ►
    </button>
  </div>

  <!-- SPACE MODE button moved to footer -->

  <button class="show-hide-button" onclick={toggleContent}>
    {$contentVisible ? 'HIDE TEXT' : 'SHOW TEXT'}
  </button>
</div>

<style>
  .header-controls {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
  }

  .channel-controller {
    display: flex;
    width: 15ch;
    align-items: center;
    justify-content: space-between;
  }

  button {
    position: relative;
    appearance: none;
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    text-shadow: inherit;
    font-family: inherit;
    font-size: 0.9rem;
    cursor: var(--cursor-pointer);

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
    }
  }

  .space-mode-button {
    font-family: var(--font-primary);
    opacity: 0.2;
    transition: opacity 0.3s ease;
    font-size: 1rem;

    &:hover {
      opacity: 1;
      /* preload the stars background on button hover */
      background-image: url(/assets/images/stars.jpg);
      background-size: 0 0;
      background-repeat: no-repeat;

      :global(html.webp) & {
        background-image: url(/assets/images/stars.webp);
      }

      :global(html.avif) & {
        background-image: url(/assets/images/stars.avif);
      }
    }

    :global(body.hide-content) & {
      visibility: visible;
    }
  }

  .show-hide-button {
    font-family: var(--font-primary);
    opacity: 0.2;
    transition: opacity 0.3s ease;
    font-size: 1rem;

    &:hover {
      opacity: 1;
    }

    /* When content is hidden: escape the header flow, pin to top-right corner,
       styled identically to the other header buttons (no box, just text) */
    :global(body.hide-content) & {
      position: fixed;
      top: 1.5rem;
      right: 1.75rem;
      z-index: 9998;
      visibility: visible;
      opacity: 1;
    }
  }
</style>
