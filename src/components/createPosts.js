// createPosts.js
export async function createAuctionPosts() {
    try {
        const response = await fetch('https://api.noroff.dev/api/v1/auction/listings?_seller=true&_bids=true');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const listings = await response.json();

        //Shows only the 10 first auction posts
        const latestListings = listings.slice(0, 10);

        return latestListings.map(listing => {
            const timeLeft = calculateTimeLeft(listing.endsAt);
            const highestBid = listing._count && listing._count.bids > 0 ? `${listing._count.bids} NOK` : 'No bids yet';


            return `
            <div class="bg-purple-500 flex flex-col">
            <div class="flex-1 relative">
              <img
                src="${listing.media[0]}"
                alt="${listing.title}"
                class="absolute w-full h-full object-cover"
              />
            </div>
            <div class="bg-red-500 flex-[0.6]">
              <h1>${listing.title}</h1>
              <span class="block">${highestBid}</span>
              <span>${timeLeft}</span>
            </div>
          </div>
          `;
        }).join('');
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function calculateTimeLeft(endsAt) {
    const endDate = new Date(endsAt);
    const now = new Date();
    const timeLeftInMillis = endDate.getTime() - now.getTime();
    if (timeLeftInMillis < 0) {
        return 'Auction ended';
    }

    const daysLeft = Math.floor(timeLeftInMillis / (1000 * 60 * 60 * 24));
    return daysLeft > 1 ? `${daysLeft} days left` : `${daysLeft} day left`;
}
