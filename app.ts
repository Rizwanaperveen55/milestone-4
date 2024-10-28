// Define the ResumeData interface
interface ResumeData {
    name: string;
    email: string;
    phone: string;
    profilePhoto?: File;
    education: string;
    experience: string;
    skills: string;
}

// Get form and input elements
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement | null;
const nameInput = document.getElementById('name') as HTMLInputElement | null;
const emailInput = document.getElementById('email') as HTMLInputElement | null;
const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
const profilePhotoInput = document.getElementById('profilePhoto') as HTMLInputElement | null;
const educationInput = document.getElementById('education') as HTMLTextAreaElement | null;
const experienceInput = document.getElementById('experience') as HTMLTextAreaElement | null;
const skillsInput = document.getElementById('skills') as HTMLTextAreaElement | null;

// Get resume output element
const resumeOutput = document.getElementById('resumeOutput');

// Function to generate resume output
const generateResumeHTML = (data: ResumeData, photoUrl: string | null = null) => {
    return `
        <div class="resume">
            ${photoUrl ? `<img src="${photoUrl}" alt="Profile Photo" class="profile-photo" />` : ''}
            <h2 contenteditable="true">${data.name}</h2>
            <p><strong>Email:</strong> <span contenteditable="true">${data.email}</span></p>
            <p><strong>Phone:</strong> <span contenteditable="true">${data.phone}</span></p>
            <h3>Education</h3>
            <p contenteditable="true">${data.education}</p>
            <h3>Experience</h3>
            <p contenteditable="true">${data.experience}</p>
            <h3>Skills</h3>
            <p contenteditable="true">${data.skills}</p>
        </div>
    `;
};

// Check if the form element exists
if (resumeForm && resumeOutput) {
    // Handle form submission
    resumeForm.addEventListener('submit', (event: Event) => {
        event.preventDefault(); // Prevent default form submission

        // Ensure all input fields are available
        if (nameInput && emailInput && phoneInput && profilePhotoInput && educationInput && experienceInput && skillsInput) {
            // Collect resume data
            const resumeData: ResumeData = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                profilePhoto: profilePhotoInput.files ? profilePhotoInput.files[0] : undefined,
                education: educationInput.value,
                experience: experienceInput.value,
                skills: skillsInput.value
            };

            // If profile photo exists, generate its URL
            if (resumeData.profilePhoto) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const photoUrl = e.target?.result as string;

                    // Debug: Check if the photo URL is valid
                    console.log('Photo URL:', photoUrl);

                    resumeOutput.innerHTML = generateResumeHTML(resumeData, photoUrl);
                    alert('Resume generated successfully!');
                    makeContentEditable(); // Make content editable after generating
                };
                reader.readAsDataURL(resumeData.profilePhoto);
            } else {
                // Generate the resume without photo
                resumeOutput.innerHTML = generateResumeHTML(resumeData);
                alert('Resume generated successfully!');
                makeContentEditable(); // Make content editable after generating
            }
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Function to make the resume content editable without refresh
function makeContentEditable() {
    const editableElements = resumeOutput?.querySelectorAll('[contenteditable]');

    editableElements?.forEach((element) => {
        element.addEventListener('input', () => {
            // Optionally, you can save changes to local storage or handle updates here
            console.log('Content updated:', element.textContent);
        });
    });
}
