window.onload = function() {
    const categories = {
        'Body Temple': ["INTP", "ENTJ", "ISFP", "ESFJ"],
        'Mind Temple': ["ISTP", "ESTJ", "INFP", "ENFJ"],
        'Soul Temple': ["ISTJ", "ESTP", "INFJ", "ENFP"],
        'Heart Temple': ["ENTP", "INTJ", "ESFP", "ISFJ"],
        'Crusaders': ["ENTP", "INTP", "ESFJ", "ISFJ"],
        'Wayfarers': ["ENTJ", "INTJ", "ESFP", "ISFP"],
        'Templars': ["ESTP", "INFJ", "ENFJ", "ISTP"],
        'Philosophers': ["ESTJ", "INFP", "ENFP", "ISTJ"]
    };

    const personalityTypes = [
        "INTJ", "INTP", "ENTJ", "ENTP",
        "INFJ", "INFP", "ENFJ", "ENFP",
        "ISTJ", "ISFJ", "ESTJ", "ESFJ",
        "ISTP", "ISFP", "ESTP", "ESFP"
    ];

    const gallery = document.getElementById('gallery');

    // Function to load images for a type
    function loadImagesForType(type) {
        const folderPath = `Types/${type}/`;
        fetch(`${folderPath}${type}.txt`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch names: ${response.statusText}`);
                }
                return response.text();
            })
            .then(text => {
                const names = text.split('\n');
                displayImagesAndNames(names, folderPath); // Pass names and folder path
            })
            .catch(error => {
                console.error(error);
                displayImagesAndNames([], folderPath); // Pass empty names and folder path
            });
    }

    // Function to display images for names in a folder
    function displayImagesAndNames(names, folderPath) {
        names.forEach(name => {
            const img = new Image();
            img.src = `${folderPath}${name}.jpg`;
            gallery.appendChild(img);
        });
    }

    // Handle tab switching logic
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            gallery.innerHTML = ''; // Clear the gallery
            categories[tabName].forEach(type => {
                loadImagesForType(type); // Load images for each type in the selected category
            });
        });
    });
};
