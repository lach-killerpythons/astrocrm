<script>
    import { record } from 'astro:schema';
import PocketBase from 'pocketbase';
import { onMount } from 'svelte';
const pb = new PocketBase('http://127.0.0.1:8090');

let records = [];
let selectedCell = { id: null, field: null };

let placeHolderId = 0;
let editMode = false; // toggle the edit bar
let addMode = false; // toggle the edit bar
let newCellValue = ""; // update_item edit
let oldCellValue = ""; // update_item value

let add_name_value = "";
let add_email_value = "";
let add_phone_value = "";

// C

async function createContact() {
  // do something
  if (add_name_value == "") {
    return
  }
  if (!add_email_value.includes('@')) {
    console.log("invalid email");
    return;
  }
  const data = {
    "Name":add_name_value,
    "Email":add_email_value,
    "Phone":add_phone_value,
  };

  try {
	  const record = await pb.collection('contacts').create(data);
	  console.log(data);
    addMode = false;
	} 
  catch (err) {
    const status = err.status || 500;
	  const message = err.response?.message || 'Unknown error';
	  console.log(message, status);
	}
}


// R 
async function getContacts() {
    records = await pb.collection('contacts').getFullList(200, {
        sort: '-created',
    });
}

// U
async function updateContact(targetId, field, newVal) {
  const obj = { [field]: newVal };
  try {
    const updated = await pb.collection('contacts').update(targetId.placeHolderId, JSON.stringify(obj));
    records = records.map(c => c.id === targetId.placeHolderId ? updated : c);
    console.log("updated")
    editMode = false;
  } 
  catch (err) {
    console.log(err)
  }

}

// D
async function delContact(targetId) {
  console.log(targetId.placeHolderId)
  try {
    await pb.collection('contacts').delete(targetId.placeHolderId);
    records = records.filter(record => record.id !== targetId.placeHolderId);
    console.log("deleted!", targetId)
  }
  catch (err) {
    console.log(err)
  }
}

function createButton () {
  const data = {
    "Name":add_name_value,
    "Email":add_email_value,
    "Phone":add_phone_value,
  }
  console.log(data);
}

function cancelButton () {
  add_email_value = ""
  add_phone_value = ""
  add_name_value = ""
  addMode = false;
}


onMount(() => {
    getContacts(); // load on component mount
});

function handleCellClick(recordId, column, value) {
  placeHolderId = recordId
  newCellValue = value
    console.log("Clicked record:", recordId, "column:", column);
    if (selectedCell.id === recordId && selectedCell.field === column) {
      selectedCell = { id: null, field: null }; // deselect
      editMode = false;
    } else {
      selectedCell = { id: recordId, field: column };
      editMode = true;
    }
    console.log(selectedCell)
    // Do something here
};

let activeCells = {};

function toggleCell(recordId, column) {
    if (!activeCells[recordId]) activeCells[recordId] = {};
    activeCells[recordId][column] = !activeCells[recordId][column];
}

</script>

<h1>Tasty Contact🫑</h1>
<!-- svelte is different syntax to jsx  -->
<div class="bg-red-500 p-2 hover:bg-purple-800">test button</div>

<table class="min-w-full table-fixed border border-gray-700 rounded-lg bg-gray-900 text-gray-100">
  
  <colgroup>
    <col class="w-1/4">
    <col class="w-1/4">
    <col class="w-1/4">
    <col class="w-1/4">
  </colgroup>
  <thead class="bg-gray-800">

    {#if editMode}
      <tr class="bg-green-950">
        <th>Edit</th>
        <th>
          <!-- {placeHolderId} -->
          <input
            type="text"
            placeholder={oldCellValue}
            bind:value={newCellValue}
            on:keydown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // prevents newline insertion
                updateContact({ placeHolderId }, selectedCell.field, newCellValue);}
            }}
        
            class="bg-gray-800 text-white p-1 rounded w-full"
        />
        </th>
        <!-- UPDATE CONTACT BUTTON, double click update button or press enter -->
        <th class = "hover:bg-blue-400" 
        on:dblclick={() => updateContact({placeHolderId},selectedCell.field,newCellValue)}

        >
        UPDATE✏️
      </th>
        <th class="hover:bg-red-400"
          on:dblclick={() => delContact({placeHolderId})}
        >DEL🗑️</th>
      </tr>
    {/if}
    <tr>
      <!-- <th class="px-4 py-2 text-left">ID</th> -->
      <th class="px-4 py-2 text-left">Contact Name</th>
      <th class="px-4 py-2 text-left">Email</th>
      <th class="px-4 py-2 text-left">Phone</th>
      <th class="w-1/4 px-4 py-2 text-left">Website</th>
    </tr>
  </thead>
  <tbody>
    {#each records as record}
    <tr>
      <!-- <td class="px-4 py-2 text-left">{record.id}</td> -->
        <!-- <td class="px-4 py-2 text-left hover:bg-gray-700 hover:cursor-pointer"
        on:dblclick={() => handleCellClick(record.id, 'Name')}
        >
            {record.Name}
        </td> -->
        <td
          class={`px-4 py-2 text-left hover:bg-gray-700 hover:cursor-pointer ${
            selectedCell.id === record.id && selectedCell.field === 'Name'
              ? 'bg-red-600 hover:bg-green-300'
              : ''
          }`}
          on:click={() => handleCellClick(record.id, 'Name', record.Name)}
        >
          {record.Name}
        </td>
        <td 
          class={`px-4 py-2 text-left hover:bg-gray-700 hover:cursor-pointer ${
            selectedCell.id === record.id && selectedCell.field === 'Email'
              ? 'bg-red-600 hover:bg-green-300'
              : ''
          }`}
          on:click={() => handleCellClick(record.id, 'Email', record.Email)}
        >
            {record.Email}
        </td>
        <td class="px-4 py-2 text-left hover:bg-gray-700 hover:cursor-pointer"
        on:dblclick={() => handleCellClick(record.id, 'Phone', record.Phone)}
        >
            {record.Phone}
        </td>
    </tr>
    {/each}
    <tr class="bg-blue-700">
      
      <th class="hover:bg-blue-300"
      on:click={() => addMode = !addMode}
      > Add Contact</th>
      <th class="hover:bg-green-300"
      on:click={() => createContact()}
      > ✅ Confirm</th>
      <th class="hover:bg-red-300"
      on:click={() => cancelButton()}
      > ❌ Cancel</th>
      <th></th>

    </tr>

    {#if addMode}
      <tr class="bg-gray-400 text-blue-600">
        <th>  
        <input 
            type="text"
            placeholder="name"
            bind:value={add_name_value}
          >
        </th>
        <th>
        <input 
            type="text"
            placeholder="email"
            bind:value={add_email_value}
        >
        </th>
        <th>
        <input 
            type="text"
            placeholder="phone"
            bind:value={add_phone_value}
        >
        </th>
        <th>
          P
        </th>
      </tr>
    {/if}
      
    
  </tbody>
</table>
