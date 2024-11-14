<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="profile">
      <p><strong>Display Name:</strong> {{ profile.display_name }}</p>
      <p><strong>Email:</strong> {{ profile.email }}</p>
      <p><strong>Country:</strong> {{ profile.country }}</p>
      <img
        v-if="profile.images.length"
        :src="profile.images[0].url"
        alt="Profile Picture"
      />
    </div>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: null,
      error: null,
    };
  },
  async mounted() {
    const accessToken =
      localStorage.getItem("spotifyAccessToken") ||
      new URLSearchParams(window.location.search).get("access_token");

    if (!accessToken) {
      this.error = "Access token not found. Please log in.";
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/me?access_token=${accessToken}`
      );

      console.log("ttest");
      console.log(response);

      const data = await response.json();

      this.profile = data;
    } catch (error) {
      this.error = "Could not load profile data.";
    }
  },
};
</script>
