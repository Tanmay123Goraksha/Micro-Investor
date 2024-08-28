document.addEventListener('DOMContentLoaded', function () {
    const addCardBtn = document.getElementById('addCardBtn');
    const submitCardBtn = document.getElementById('submitCardBtn');
    const cardContainer = document.getElementById('cardContainer');
    const cardModalElement = document.getElementById('cardModal');
    const cardModal = new bootstrap.Modal(cardModalElement);
    const cardForm = document.getElementById('cardForm');

    // Function to create a new card element
    function createNewCard(title, type, startDate, endDate, totalSpent) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-md-4');

        cardDiv.innerHTML = `
            <subscription-card 
                title="${title}" 
                type="${type}" 
                start-date="${startDate}" 
                end-date="${endDate}" 
                total-spent="${totalSpent}">
            </subscription-card>
        `;

        cardContainer.appendChild(cardDiv);
    }

    // Event listener for Add Card button
    addCardBtn.addEventListener('click', function () {
        cardModal.show();
    });

    // Event listener for Submit button in the modal
    submitCardBtn.addEventListener('click', function () {
        const title = document.getElementById('cardTitle').value;
        const type = document.getElementById('cardType').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const totalSpent = document.getElementById('totalSpent').value;

        // Validate form
        if (title && type && startDate && endDate && totalSpent) {
            // Create the new card and add it to the container
            createNewCard(title, type, startDate, endDate, totalSpent);

            // Hide the modal and reset the form
            cardModal.hide();
            cardForm.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });

    class SubscriptionCard extends HTMLElement {
        constructor() {
            super();
    
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card', 'mb-2');
            cardContainer.style.width = '18rem';
    
            const img = document.createElement('img');
            img.src = this.getAttribute('image') || '...';
            img.classList.add('card-img-top');
            img.alt = this.getAttribute('title') || 'Subscription Image';
    
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = this.getAttribute('title') || 'Subscription';
    
            cardBody.appendChild(cardTitle);
    
            const listGroup = document.createElement('ul');
            listGroup.classList.add('list-group', 'list-group-flush');
    
            const details = [
                { label: 'Type', value: this.getAttribute('type') },
                { label: 'Start Date', value: this.getAttribute('start-date') },
                { label: 'End Date', value: this.getAttribute('end-date') },
                { label: 'Total Spent', value: this.getAttribute('total-spent') },
            ];
    
            details.forEach(detail => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.textContent = `${detail.label}: ${detail.value || 'N/A'}`;
                listGroup.appendChild(listItem);
            });
    
            cardContainer.appendChild(img);
            cardContainer.appendChild(cardBody);
            cardContainer.appendChild(listGroup);
    
            this.appendChild(cardContainer);
        }
    }
    
    customElements.define('subscription-card', SubscriptionCard);
});
