




<script>
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import { StarterKit } from '@tiptap/starter-kit'
  import BubbleMenu from '@tiptap/extension-bubble-menu'

  import {UPDATE_Item} from '../../lib/crud' 
  import EmojBox from '../wrappers/EmojBox.svelte';

  let emojiKeyboard = $state(true) // have to set to $state to be reactive in 

  let bubbleMenu = $state()
  let element = $state()
  let editorState = $state({editor: null})
  let placeholder = `
        <p>sjhAJKISHKS&nbsp;</p>
<div>
<div>💁👌🎍😍</div>
</div>`



  let {myContent = placeholder, myId} = $props() // modern svelte runes
  console.log("Raw myContent:", myContent)

  function update(newContent) {
    UPDATE_Item('website',myId, "Notes", newContent)  // (target_collection: string, id: string, field: string, newValue: any) 
  }

  function toggleEmoji() {
    emojiKeyboard = !emojiKeyboard
    
  }
  





  onMount(() => {
    editorState.editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        BubbleMenu.configure({
          element: bubbleMenu,
        }),
      ],
      content: "", // init empty
      onTransaction: ({editor}) => {
        // Increment the state signal to force a re-render
        editorState = { editor }
      },
    })
    editorState.editor.commands.setContent(myContent)
  })
  onDestroy(() => {
    editorState.editor?.destroy()
  })
</script>

<div style="position: relative" class="app">
  {#if editorState.editor}
    <div class="fixed-menu">
      <button
        onclick={() => editorState.editor.chain().focus().toggleHeading({ level: 1 }).run()}
        class:active={editorState.editor.isActive('heading', { level: 1 })}
      >
        H1
      </button>
      <button
        onclick={() => editorState.editor.chain().focus().toggleHeading({ level: 2 }).run()}
        class:active={editorState.editor.isActive('heading', { level: 2 })}
      >
        H2
      </button>
      <button onclick={() => editorState.editor.chain().focus().setParagraph().run()} class:active={editorState.editor.isActive('paragraph')}>
        P
      </button>
      <button onclick={() => update(editorState.editor.getHTML())}>
        SAVE
      </button>
      <button onclick={()=> toggleEmoji()}>
        EMOJI
      </button>
      {#if emojiKeyboard}
        <EmojBox/>
      {/if}
      
    </div>
  {/if}

  <div bind:this={element}></div>
</div>

<style>
  button.active {
    background: black;
    color: white;
  }
</style>
