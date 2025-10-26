<script>
    import Emoj from "../components/Emoj.svelte";
    import { lastEmoji } from "../../lib/stores"; // last emoji selected store
    let selectedEmoj = "❌"
    let currentEmoji;

</script>

<!-- <h1>LAST {$lastEmoji}</h1> -->
 <br>
<Emoj emoji="✅"/>
<Emoj emoji="🔥"/>
<Emoj emoji="❌"/>
<Emoj emoji="🧊"/>
<Emoj emoji="🥶"/>
<Emoj emoji="💩"/>
<Emoj emoji="💦"/>
<Emoj emoji="✉️"/>
<Emoj emoji="📞"/>
<Emoj emoji="👻"/>
<Emoj emoji="💬"/>
<Emoj emoji="🧾"/>
<Emoj emoji="💵"/>
<Emoj emoji="🗓️"/>

