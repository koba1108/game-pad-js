<script lang='ts'>
  import { onMount } from 'svelte'
  import { controllerStore, setStateByGamePad } from '$stores/controller-store'
  import JSONTree from 'svelte-json-tree'

  let connected = false

  function loop() {
    const [gamepad] = navigator.getGamepads()
    if (gamepad) {
      setStateByGamePad('ps4', gamepad)
    }
    requestAnimationFrame(loop)
  }

  onMount(() => {
    window.addEventListener('gamepadconnected', () => {
      connected = true
      const [gamepad] = navigator.getGamepads()
      console.log(gamepad)
      loop()
      window.addEventListener('gamepaddisconnected', () => {
        connected = false
      })
    })
  })
</script>

<div class='w-full flex flex-col items-center justify-center'>
  <div>Connected: {connected}</div>
  <JSONTree value={$controllerStore} />
</div>
