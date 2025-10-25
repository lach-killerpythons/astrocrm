<!-- for rendering and editing notes inside website -->

<script>
    import { GET_Item } from "../../lib/crud";
    let website_note = "";
    //export const website_id = "abx";

    const test_id = "2hgmqwh2jub2fzi";
    const test_collection = "website";
    let promise = GET_Item(test_collection, test_id)
</script>

{#await promise}
    .. loading .. 
{:then record} 
    <!-- {console.log(record)} -->
    <article class="prose">{@html record.Notes}</article>
{/await}