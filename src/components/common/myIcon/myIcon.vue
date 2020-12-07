<template>
    <svg class="mw-svg" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
export default {
    name: 'm-svg',
    props: {
        //放置在 @/assets/icons 文件夹下的文件名
        name: { type: String, default: '' },
    },
    computed: {
        iconName() {
            return `#${this.name}`
        },
    },
}
</script>
<style lang="scss" scoped>
.mw-svg {
    width: 1.4em;
    height: 1.4em;
    fill: currentColor;
    overflow: hidden;
    line-height: 1em;
    display: inline-block;
}
</style>
