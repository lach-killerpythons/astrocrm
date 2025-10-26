<script>
  let {emoji = "🫐"} = $props()
  import { lastEmoji } from "../../lib/stores";

  function handleClick() {
    lastEmoji.set(emoji)
    console.log(emoji)
  }
</script>


<button on:click={handleClick}>

  <br>
  {emoji}
</button>