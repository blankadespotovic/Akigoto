import { postignuca } from "./PostignucaPodaci"

async function get() {
    return { data: postignuca }
}

export default {
    get
}