<script>
   let brandName = "Aries Cards"
   let isOpen = false;

</script>
<body class="bg-gray-900 text-white">

  <!-- Navbar -->
 
<header class="bg-gray-800">
  <nav class="container mx-auto p-5 flex justify-between items-center">
    <h1 class="text-3xl font-bold text-blue-400 tracking-wider">{brandName}</h1>
    <!-- Desktop Menu -->
    <ul class="hidden md:flex space-x-6">
      <li><a href="/" class="hover:text-red-600">Home</a></li>
      <li><a href="#features" class="hover:text-red-600">Features</a></li>
      <li><a href="#how-to-play" class="hover:text-red-600">How to Play</a></li>
      <li><a href="#signup" class="hover:text-red-600">Contact</a></li>
    </ul>

    <!-- Hamburger Icon for Mobile -->
    <button class="md:hidden text-blue-600" on:click={() => isOpen = !isOpen}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
  </nav>

  <!-- Mobile Menu -->
  {#if isOpen}
    <ul class="md:hidden flex flex-col items-center space-y-4 bg-gray-700 py-4">
      <li><a href="/" class="hover:text-red-600">Home</a></li>
      <li><a href="#features" class="hover:text-red-600">Features</a></li>
      <li><a href="#how-to-play" class="hover:text-red-600">How to Play</a></li>
      <li><a href="#signup" class="hover:text-red-600">Contact</a></li>
    </ul>
  {/if}
</header>

  <!-- Hero Section -->
  <section class="bg-hero-pattern bg-cover bg-center h-screen flex items-center justify-center text-center p-6">
    <div>
      <h2 class="text-5xl font-bold mb-6">Challenge. Play. Win!</h2>
      <p class="text-lg mb-8">Join the ultimate card battle and prove you're the best!</p>
      <a href="/game" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
        Start Playing Now
      </a>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="container mx-auto py-16">
    <h3 class="text-4xl font-bold text-center mb-12">Features</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div class="bg-gray-800 p-6 rounded-lg">
        <h4 class="text-2xl font-bold mb-4">Real-Time Battles</h4>
        <p class="text-gray-400">Face off with opponents around the world in real-time card duels.</p>
      </div>
      <div class="bg-gray-800 p-6 rounded-lg">
        <h4 class="text-2xl font-bold mb-4">Strategic Deck Building</h4>
        <p class="text-gray-400">Build the perfect deck with powerful cards to dominate your foes.</p>
      </div>
      <div class="bg-gray-800 p-6 rounded-lg">
        <h4 class="text-2xl font-bold mb-4">Ranked Matches</h4>
        <p class="text-gray-400">Climb the ranks and prove you are a master of MyCard.</p>
      </div>
    </div>
  </section>

  <!-- How to Play Section -->
  <section id="how-to-play" class="bg-gray-800 py-16">
    <div class="container mx-auto text-center">
      <h3 class="text-4xl font-bold text-white mb-12">How to Play</h3>
      <p class="text-lg text-gray-400 mb-6">Get started in just 3 simple steps!</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="text-red-500 text-6xl mb-4">1</div>
          <h4 class="text-2xl font-bold mb-2">Create an Account</h4>
          <p class="text-gray-400">Sign up in seconds and jump into the action.</p>
        </div>
        <div>
          <div class="text-red-500 text-6xl mb-4">2</div>
          <h4 class="text-2xl font-bold mb-2">Build Your Deck</h4>
          <p class="text-gray-400">Choose from hundreds of cards to build your unique deck.</p>
        </div>
        <div>
          <div class="text-red-500 text-6xl mb-4">3</div>
          <h4 class="text-2xl font-bold mb-2">Battle Your Opponents</h4>
          <p class="text-gray-400">Use strategy and skill to defeat your opponents in card duels.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section id="signup" class="bg-gray-900 py-16 text-center">
    <div class="container mx-auto">
      <h3 class="text-4xl font-bold text-red-500 mb-6">Ready to Play?</h3>
      <p class="text-gray-400 text-lg mb-8">Sign up now and start your card battle journey!</p>
      <a href="/auth/signup" class="bg-red-500 hover:bg-red-500 text-white font-bold py-4 px-10 rounded-full">
        Sign Up for Free
      </a>
    </div>
  </section>
</body>
  <!-- Footer -->
  <footer class="bg-gray-800 py-6">
    <div class="container mx-auto text-center">
      <p class="text-gray-400">&copy; 2024 MyCard. All rights reserved.</p>
    </div>
  </footer>


