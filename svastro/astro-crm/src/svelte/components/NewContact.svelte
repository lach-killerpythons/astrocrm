<script>

import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


// bindable input fields
let name = '';
let email = '';
let phone = '';

async function createContactX() {
	const data = {
    	"Name": name,
    	"Email": email,
    	"Phone": phone,
	};
    if (!email.includes('@')) {
        console.log("invalid email");
        return;
    }
	try {
		const record = await pb.collection('contacts').create(data);
		console.log(data);
	} catch (err) {
        const status = err.status || 500;
		const message = err.response?.message || 'Unknown error';
		console.log(message, status);
	}

}

</script>


<label for="Contact">New Contact</label>
<input 
    type="text"
    id="name"
    name="name"
    placeholder="Name"
    bind:value={name}
>
<input
    type="email"
    id="email"
    name="email"
    placeholder="Email"
    bind:value={email}
>
<input
    type="text"
    id="phone"
    name="phone"
    placeholder="Phone"
    bind:value={phone}
>
<button 
    class ="inline-block px-4 py-2 rounded transition-colors bg-yellow-400 hover:bg-yellow-500 text-black"
    on:click={createContactX}
    >
    Submit
</button>