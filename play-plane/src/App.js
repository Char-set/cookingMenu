// 跟组件

import { computed, defineComponent, h, ref } from '@vue/runtime-core'
import StartPage from "./page/StartPage";
import GamePage from "./page/GamePage";
import EndPage from "./page/EndPage";
export default defineComponent({
    setup() {
        const currentPageName = ref("GamePage");
        // console.log(currentPageName)
        const currentPage = computed(() => {
            if(currentPageName.value === "StartPage") {
                return StartPage;
            } else if(currentPageName.value === "GamePage") {
                return GamePage;
            } else if(currentPageName.value === "EndPage") {
                return EndPage;
            }
        });

        return {
            currentPage,
            currentPageName
        }
    },
    render(ctx) {
        return h("Container", [ h(ctx.currentPage, {
            onChangePage(page) {
                
                ctx.currentPageName = page;
            }
        })]);
    }
})