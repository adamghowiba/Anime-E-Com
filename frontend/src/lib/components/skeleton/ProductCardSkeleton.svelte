<script lang="ts">
import Skeleton from "./Skeleton.svelte";


</script>

<div class="skeleton">
    <div class="skeleton__image">
        <Skeleton height="300px" width="100%"/>
    </div>
    
    <div class="skeleton__details">
        <Skeleton height="10px" width="60%"/>
        <Skeleton height="10px" width="54%"/>
        <Skeleton height="10px" width="40px"/>
    </div>
</div>

<style lang="scss">
    .skeleton {
        display: flex;
        flex-direction: column;
        gap: 12px;

        &__details {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
    }
</style>