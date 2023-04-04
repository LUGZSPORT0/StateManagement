// need to register this in main.js
import {ref, reactive} from 'vue'
export function PiniaHistoryPlugin({pinia, app, store, options}) {
    if(!options.historyEnabled) return;
    const history = reactive([])
    const future = reactive([])
    const doingHistory = ref(false)
    history.push(JSON.stringify(store));
    store.$subscribe((mutation, state) => {
      // console.log({mutation});
      // console.log({state});
      if (!doingHistory.value) {
        history.push(JSON.stringify(state))
        future.splice(0, future.length); //clear out future 
      }
    });
    return {
        history,
        future,
        undo: () => {
            if(history.length === 1) return
            doingHistory.value = true
            future.push(history.pop())
            // history.pop()
            store.$state = JSON.parse(history.at(-1))
            doingHistory.value = false
            },
        redo: () => {
            const latestState = future.pop()
            if (!latestState) return
                doingHistory.value = true
                history.push(latestState)
                store.$state = JSON.parse(latestState)
                doingHistory.value = false
            }
    }

}