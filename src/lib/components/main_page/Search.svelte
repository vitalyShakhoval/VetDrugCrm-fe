<script lang="ts">

</script>

<input type="text" class="search" placeholder="Поиск">

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
	
	* {
		transition: 200ms ease;
		margin: 0px;
		padding: 0px;
	}

	.search{
		width: 15vw;
		height: 2.5vw;
		border: 1px solid #D9D9D9;
		border-radius: 10px;
		background-image: url('src/lib/assets/Search.svg');
		background-repeat: no-repeat;
		background-size: 2vw;
		background-position: 0.5vw center;
		font-family: "Montserrat", sans-serif;
		font-size: 1.5vw;
		text-indent: 3vw;
	}

	.search:focus {
		outline: none;
		border: 1px solid #D9D9D9;
	}
</style>