import { CategoryWrapper } from "./component/CategoryWrapper.js";

new Vue ({
  el: "#app",
  components: {
    "category-wrapper": CategoryWrapper,
  },
  data: {
    categories: [
      "Todo",
      "InProgress",
      "Completed"
    ]
  }
});
