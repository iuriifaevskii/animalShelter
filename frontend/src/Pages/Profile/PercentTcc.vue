<template>
<div :class="procentClassObject">
    <i v-if="makeProcent.type !== 'constant'" :class="iconClassObject"></i> {{makeProcent.procent}} %
</div>
</template>

<script>
export default {
    name: 'percent-tcc',
    props: {
        historyArr: {
            type: Array,
            default: []
        },
    },
    computed: {
        makeProcent() {
        	const newHistoryArr = this.historyArr.slice(0, 2).map(item => item.tcc);
                const currentTcc = newHistoryArr[0] || 0;
                const prevTcc = newHistoryArr[1] || 0;
                
                let procent = Math.round(100-prevTcc*100/currentTcc);

                procent = isFinite(procent) ? procent : 0;
                let type = 'constant';

                if (prevTcc > currentTcc) {
                    type = 'decrease';
                    procent = Math.abs(procent)
                } else if (prevTcc < currentTcc) {
                    type = 'increase';
                } else {
                    type = 'constant';
                }

        		return {
                    procent,
                    type
                };
        },
        procentClassObject() {
            return {
                [`${this.makeProcent.type}-percent-text`]: true,
            };
        },
        iconClassObject() {
            return {
                [`fa fa-${this.makeProcent.type === 'increase' ? 'angle-up': 'angle-down'}`]: true,
            };
        }
    },
    
}
</script>

<style>
    .decrease-percent-text {
        color: red;
    }
    
    .constant-percent-text {
        color: gray;
    }

    .increase-percent-text {
        color: green;
    }
</style>
