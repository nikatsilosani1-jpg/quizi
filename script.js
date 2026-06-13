document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchPopup = document.getElementById('searchResultsPopup');
    const searchStatus = document.getElementById('searchStatus');
    const cards = document.querySelectorAll('.series-grid .card');
    const gridContainer = document.querySelector('.series-grid');


    if (searchInput && searchPopup && searchStatus) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();

            if (query.length > 0) {
                searchPopup.classList.add('is-visible');
                let matchCount = 0;

                cards.forEach(card => {
                    const titleElement = card.querySelector('.card-title');
                    if (titleElement) {
                        const titleText = titleElement.textContent.toLowerCase().trim();
                        
                        if (titleText.startsWith(query)) {
                            card.classList.remove('is-hidden');
                            matchCount++;
                        } else {
                            card.classList.add('is-hidden');
                        }
                    }
                });

                searchStatus.textContent = `Found ${matchCount} result${matchCount === 1 ? '' : 's'} matching "${searchInput.value}"`;
            } else {
                searchPopup.classList.remove('is-visible');
                cards.forEach(card => card.classList.remove('is-hidden'));
            }
        });

        document.addEventListener('click', (event) => {
            if (!searchInput.contains(event.target) && !searchPopup.contains(event.target)) {
                searchPopup.classList.remove('is-visible');
            }
        });
    }


    if (gridContainer) {
        gridContainer.addEventListener('click', (event) => {
            const button = event.target.closest('.bookmark-btn');
            if (!button) return;
            button.classList.toggle('is-active');
        });
    }
});