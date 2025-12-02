<script lang="ts">
		type Props = {
		icon?:string;
	}

	let {
		icon ="src/lib/assets/user_icon.svg",
	}: Props = $props();
</script>

<button class="user__avatar">
	<img src={icon} alt="" class="user__icon">
</button>

<style>
	* {
		transition: 200ms ease;
		margin: 0px;
		padding: 0px;
	}
	.user__avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3.2vw;
		height: 3.2vw;
		border-radius: 5vw;
		border: 1px solid #D9D9D9;
		background-color: transparent;
	}

	.user__icon {
		width: 2.2vw;
		height: 2.2vw;
	}

	.user__avatar:hover {
		cursor: pointer;
	}
</style>