// Get form and input elements
var resumeForm = document.getElementById('resumeForm');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var profilePhotoInput = document.getElementById('profilePhoto');
var educationInput = document.getElementById('education');
var experienceInput = document.getElementById('experience');
var skillsInput = document.getElementById('skills');
// Get resume output element
var resumeOutput = document.getElementById('resumeOutput');
// Function to generate resume output
var generateResumeHTML = function (data, photoUrl) {
    if (photoUrl === void 0) { photoUrl = null; }
    return "\n        <div class=\"resume\">\n            ".concat(photoUrl ? "<img src=\"".concat(photoUrl, "\" alt=\"Profile Photo\" class=\"profile-photo\" />") : '', "\n            <h2 contenteditable=\"true\">").concat(data.name, "</h2>\n            <p><strong>Email:</strong> <span contenteditable=\"true\">").concat(data.email, "</span></p>\n            <p><strong>Phone:</strong> <span contenteditable=\"true\">").concat(data.phone, "</span></p>\n            <h3>Education</h3>\n            <p contenteditable=\"true\">").concat(data.education, "</p>\n            <h3>Experience</h3>\n            <p contenteditable=\"true\">").concat(data.experience, "</p>\n            <h3>Skills</h3>\n            <p contenteditable=\"true\">").concat(data.skills, "</p>\n        </div>\n    ");
};
// Check if the form element exists
if (resumeForm && resumeOutput) {
    // Handle form submission
    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        // Ensure all input fields are available
        if (nameInput && emailInput && phoneInput && profilePhotoInput && educationInput && experienceInput && skillsInput) {
            // Collect resume data
            var resumeData_1 = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                profilePhoto: profilePhotoInput.files ? profilePhotoInput.files[0] : undefined,
                education: educationInput.value,
                experience: experienceInput.value,
                skills: skillsInput.value
            };
            // If profile photo exists, generate its URL
            if (resumeData_1.profilePhoto) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var _a;
                    var photoUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                    // Debug: Check if the photo URL is valid
                    console.log('Photo URL:', photoUrl);
                    resumeOutput.innerHTML = generateResumeHTML(resumeData_1, photoUrl);
                    alert('Resume generated successfully!');
                    makeContentEditable(); // Make content editable after generating
                };
                reader.readAsDataURL(resumeData_1.profilePhoto);
            }
            else {
                // Generate the resume without photo
                resumeOutput.innerHTML = generateResumeHTML(resumeData_1);
                alert('Resume generated successfully!');
                makeContentEditable(); // Make content editable after generating
            }
        }
        else {
            alert('Please fill in all required fields.');
        }
    });
}
// Function to make the resume content editable without refresh
function makeContentEditable() {
    var editableElements = resumeOutput === null || resumeOutput === void 0 ? void 0 : resumeOutput.querySelectorAll('[contenteditable]');
    editableElements === null || editableElements === void 0 ? void 0 : editableElements.forEach(function (element) {
        element.addEventListener('input', function () {
            // Optionally, you can save changes to local storage or handle updates here
            console.log('Content updated:', element.textContent);
        });
    });
}
