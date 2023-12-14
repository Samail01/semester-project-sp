import { createAuctionPosts } from "./components/createPosts.js";

async function loadAuctionPosts() {
  try {
    const auctionContainer = document.getElementById('auction-container');
    if (!auctionContainer) {
      throw new Error("The auction container element doesn't exist on this page.");
    }
    const postsHTML = await createAuctionPosts();
    auctionContainer.innerHTML = postsHTML;
  } catch (error) {
    console.error('Could not load auction posts:', error);
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
      errorContainer.textContent = error.message;
    }
  }
}


if (document.readyState === 'loading') {

  document.addEventListener('DOMContentLoaded', loadAuctionPosts);
} else {
  loadAuctionPosts();
}
