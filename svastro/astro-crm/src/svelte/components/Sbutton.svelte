


<script>

import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// example create data
const data = {
    "Name": "test",
    "Email": "test@example.com",
    "Phone": "test",
};



async function createTestContact() {
	try {
		const record = await pb.collection('contacts').create(data);
		console.log("it worked!!")
	} catch {
		console.log("createTestContact Failed")
	}

}

async function createContactX(name, email, phone) {
	const data = {
    	"Name": name,
    	"Email": email,
    	"Phone": phone,
	};
	try {
		const record = await pb.collection('contacts').create(data);
		console.log(data)
	} catch {
		console.log("createTestContact Failed")
	}

}



//variable Init
	let count = 0;
	//function to be called on click
	function incrementCount() {
		//incremtent
		count++
		createContactX("Jimson", "jimson@fartmail.com", "123456" )
	}
</script>
<!-- the function will be called on click -->
<!-- 
client:load → Hydrate immediately on page load.
client:idle → Hydrate when the browser is idle.
client:visible → Hydrate when the component enters the viewport. -->

<button class="inline-block px-4 py-2 rounded transition-colors bg-red-600 hover:bg-red-700 text-white" on:click={incrementCount}>
	Clicked  {count} {count === 1 ? 'time': 'times'}
</button>