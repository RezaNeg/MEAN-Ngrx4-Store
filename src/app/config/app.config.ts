export const AppSetting = {
    socialIcons: [
        { imageFile: 'assets/img/social-facebook.png', alt: 'Facebook', link: 'http://www.facebook.com'},
        { imageFile: 'assets/img/social-google.png', alt: 'Google +', link: 'http://www.google.com' },
        { imageFile: 'assets/img/social-linkedin.png', alt: 'Linkedin', link: 'https://www.linkedin.com/company-beta/11096782/' }
        ],
        socialLogins: [
        { title: 'Facebook', imageFile: 'assets/img/social-facebook.png', alt:'Facebook login' },
        { title: 'Google', imageFile: 'assets/img/social-google.png', alt:'Google login' },
        { title: 'LinkedIn', imageFile: 'assets/img/social-linkedin.png', alt:'LinkedIn login' }
        ],
        providers: {
        google: {
            clientId: ""
        },
        facebook: {
            clientId: "",
            apiVersion: "v2.9",
            xfbml : true
        },
        linkedin: {
        clientId: ""
        }
        },
        profileDetails:["LOCAL", "FACEBOOK", "GOOGLE", "LINKEDIN"],
        showLanguageSelector: false,
        showUserControls: false,
        showStatusBar: true,
        showNavbar: true,
        backgroundImageURL: "../../assets/img/hotsauceBG.jpg",
        logo: "../../assets/img/LogoSentence_Yellow30px.png",
        defaultProfileImage: "../../assets/img/defaultProfileImage.png"
    }; 
