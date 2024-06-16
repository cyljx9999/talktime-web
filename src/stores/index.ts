import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'
let store = createPinia();
store.use(piniaPersist)
export default store;

