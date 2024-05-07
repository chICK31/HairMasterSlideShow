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

    const buttonsContainer = document.getElementById('buttons');
    const gallery = document.getElementById('gallery');

    // Create category buttons
    Object.keys(categories).forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.onclick = function() {
            gallery.innerHTML = ''; // Clear the gallery
            categories[category].forEach(type => {
                loadImagesForType(type); // Load images for each type
            });
        };
        buttonsContainer.appendChild(button);
    });

    // Create individual type buttons
    personalityTypes.forEach(type => {
        const button = document.createElement('button');
        button.textContent = type;
        button.onclick = function() {
            gallery.innerHTML = ''; // Clear the gallery first for transition
            loadImagesForType(type); // Load images for the selected type
        };
        buttonsContainer.appendChild(button);
    });

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

    function displayImagesAndNames(names, folderPath) {
        names.forEach(name => {
            const img = new Image();
            img.src = `${folderPath}${name}.jpg`;
            gallery.appendChild(img);
        });
    }
};
