// components/tab/tab.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tarbar: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handTab(e) {
            // 获取选项卡点击索引
            const { index } = e.currentTarget.dataset;
            console.log(index)
                // 子传父
            this.triggerEvent("tabtrigger", { index })
        }
    }
})